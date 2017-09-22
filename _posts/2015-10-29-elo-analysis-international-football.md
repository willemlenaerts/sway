---
layout: post-lg-header-title-box
title: "The History of World Football, 1872-2015"
subtitle: "143 years of Mostly Friendly Tribalism"
category: project
tags: [football, soccer, analysis, elo, world, international]
alias: [/2015/10/29/]
author: "Willem Lenaerts"
utilities: highlight
header-img: "img/post-bg-voetbalelo-wereld.gif"
thumbnail-img: "img/world-football-thumbnail.jpg"
---

<!--<script type="text/javascript" src="/js/jQuery/jquery-1.11.1.min.js"></script>-->
<link rel="stylesheet" type="text/css" href="/css/custom.css" />

<!--<script type="text/javascript" src="/js/bootstrap.table.js"></script>-->
<link rel="stylesheet" type="text/css" href="/css/bootstrap.table.css" />

<script src="/js/moment/moment.js"></script>
<script type="text/javascript" src="/js/voetbalelo/elo-world-football.js"></script>
<script>
  // {#On document ready, load stuff#}
  country_table = {{ site.data.elo-world-football.country_table | jsonify }}
  max_elo_data ={{ site.data.elo-world-football.max_elo_data | jsonify}}
  min_elo_data ={{ site.data.elo-world-football.min_elo_data | jsonify}}
  dates = {{site.data.elo-world-football.dates | jsonify}}
  dates_reversed = {{site.data.elo-world-football.dates_reversed | jsonify}}
  countries = {{site.data.elo-world-football.countries | jsonify}}
  years = {{site.data.elo-world-football.years | jsonify}}
  colors = {{site.data.elo-world-football.colors | jsonify}}
</script>

<script>
  $(window).load(function() {
    $.ajax({
        url: "/js/bootstrap.table.js",
        dataType: 'script',
        // success: success,
        // async: false
      }).done(function() {
        $('#country-table').bootstrapTable('resetView');
      })
      // Resize table after image in header has loaded (header not correctly positioned otherwhise)
    // while (document.images["trophy-img"] == null) {
      
    // }  
    
    // // Games table
    // game_table = {{ site.data.elo-world-football.game_table | jsonify }}
    // table_string = "<table id='games-table' data-height='299' data-search='true'>"+"<thead><tr>" + 
    //                 "<th data-field='datum'>Datum</th>" + 
    //                 "<th data-field='type'>Type</th>" + 
    //                 "<th data-field='wedstrijd'>Wedstrijd</th>" + 
    //                 "<th data-field='score'>Uitslag</th></tr></thead>" + "</table>"
      
    //   $("#games-table-wrapper").append(table_string)         
          
    // // Initialize table
    // $('#games-table').bootstrapTable({
    //     data: game_table
    // });          
  })
  
  
  $(window).resize(function() {
    // What to do on resize:
    // Resize select-country and select-country-comp
    $(".dd-select").width($("#select-country-wrapper").width())
    $("#select-country").width($("#select-country-wrapper").width())
    $("#select-country-comp").width($("#select-country-comp-wrapper").width())
    // $("#select-country-comp").css("float","left")
    
    // Resize kamp-country and kamp-country-comp
    $("#kamp-country").width($("#kamp-country-wrapper").width())
    $("#kamp-country-comp").width($("#kamp-country-comp-wrapper").width())
    
    // Resize graph container (rather: redraw it)
    drawEloChart($("#select-country").find(".dd-selected-text").text(),$("#select-country-comp").find(".dd-selected-text").text());
    
    // Make sure table resizes (esp. header)
    $.ajax({
        url: "/js/bootstrap.table.js",
        dataType: 'script',
        // success: success,
        // async: false
      }).done(function() {
        $('#country-table').bootstrapTable('resetView');
      })
    
    // country select options resize
    $(".dd-options").width($("#select-country").width())
  });
  
  
  $( document ).ready(function() {
    // start_competition based on hash in URL
        if (window.location.hash == "") {
            start_country = "England"
        } else {
            start_country = window.location.hash.replace("#","")
            if (countries.indexOf(start_country) == -1) {
                start_country = "England"
            }
        }
        
    // Create tables
    $.ajax({
        url: "/js/bootstrap.table.js",
        dataType: 'script',
        // success: success,
        // async: false
      }).done(function() {
    // country Table
    // // ELO Ranking Tabel
    table_string = "<table id='country-table' data-height='500' data-search='true' data-sort-name='nuelo' data-sort-order='desc'>"+"<thead><tr>" + 
                    "<th colspan='2' data-field='country' data-sortable='true'>Country</th>" + 
                    "<th data-field='nuelo' data-sortable='true'>actualElo</th>" + 
                    "<th data-field='gemelo' data-sortable='true'>avgElo</th>" + 
                    "<th data-field='maxelo' data-sortable='true'>maxElo</th>" + 
                    "<th data-field='minelo' data-sortable='true'>minElo</th>" + 
                    "<th data-field='jaren' data-sortable='true'>S</th>" + 
                    "<th data-field='wedstrijden' data-sortable='true'>W</th>" + 
                    "<th data-field='winperc' data-sortable='true'>Win%</th>" + 
                    "<th data-field='doelpuntensaldo' data-sortable='true'>DS</th>" + 
                    // "<th data-field='wedstrijdenwinst' data-sortable='true'>W+</th>" + 
                    // "<th data-field='wedstrijdengelijk' data-sortable='true'>W=</th>" + 
                    // "<th data-field='wedstrijdenverlies' data-sortable='true'>W-</th>" + 
                    // "<th data-field='goalsvoor' data-sortable='true'>D+</th>" + 
                    // "<th data-field='goalstegen' data-sortable='true'>D-</th>" 
                    "</tr></thead>" + "</table>"
                    
    $("#country-table-wrapper").append(table_string)    
    // Add images
    for (i=0;i<countries.length;i++) {
        country = country_table[i]["country"]
        country_table[i]["country"] = "<img src='/img/World Flags/" + country + ".png'" + "</img>&nbsp;" + country
    }
    // Initialize table
    $('#country-table').bootstrapTable({
        data: country_table
    });


    // // Games table
    // table_string = "<table id='games-table' data-height='299' data-search='true'>"+"<thead><tr>" + 
    //                 "<th data-field='datum'>Datum</th>" + 
    //                 "<th data-field='type'>Type</th>" + 
    //                 "<th data-field='wedstrijd'>Wedstrijd</th>" + 
    //                 "<th data-field='score'>Uitslag</th></tr></thead>" + "</table>"
      
    //   $("#games-table-wrapper").append(table_string)         
          
    // // Initialize table
    // $('#games-table').bootstrapTable({
    //     data: game_table
    // });          
          
      })
      
      
    // ResetZoom button for chart
    // zoom_click is global variable that stores whether chart is zoomed (1: yes, 0: no)
    $('#resetZoom').click(function() {
        $("#resetZoomWrapper").hide()
        
        setTimeout(function() {
                chart1.zoomOut();
                    }, 0);
        // chart1.zoomOut();
    });
      
    
    //Dropdown plugin data
    var ddData = [];
    
      for (i = 0;i<countries.length;i++) {
          if (countries[i] == start_country) {
            ddData.push({text: countries[i], value: i, selected:false, description:" ", imageSrc: "/img/World Flags/" + countries[i] + ".png"})
            
            var country_select = countries[i]
            var country_count = i
              
          } else  {
            ddData.push({text: countries[i], value: i, selected:false, description:" ",imageSrc: "/img/World Flags/" + countries[i] + ".png"})
          }
      }
      
      
      // Set select menu
      $.ajax({
        url: "/js/ddSlick/ddSlick.js",
        dataType: 'script',
        // success: success,
        // async: false
      }).done(function() {
          $.ajax({
            url: "/js/highstock/highstock.js",
            dataType: 'script',
            // success: success,
            // async: false
          }).done(function() {
              $('#select-country').ddslick({
                data: ddData,
                width: $('#select-country-wrapper').width(),
                height: 300,
                imagePosition: "left",
                selectText: "Selecteer ploeg",
                onSelected: function (data) {
                    
                    $("#resetZoomWrapper").hide()
                    $("#hth").hide()
                    $("#kamp-country").hide()
                    
                    // Make right color
                    $("#select-country").find("div.dd-select").css("background",colors[data.selectedData.text].replace("1)","0.1)"))
                    
                    // Check if first load
                    if ($("#select-country-comp").find(".dd-option").hasClass("dd-option-selected") == false && $("#kamp-country").text() == "") {
                        $("#loading-head-to-head").css("height",0)
                        timer = 0
                    } else {
                        $("#loading-head-to-head").css("height",$("#container").height())
                        $("#container").hide()
                        timer = 100
                    }
                    
                    // unselect select-country-comp
                    $("#select-country-comp").find(".dd-option").removeClass("dd-option-selected");
                    $("#select-country-comp").find(".dd-selected").html("Compare with");
                    $("#select-country-comp").find("div.dd-select").css("background","rgb(240,240,240)")
                    $("#kamp-country-comp").hide()
                    
                    // Change color of kamp
                    $("#kamp-country").css("background-color",colors[data.selectedData.text].replace("1)","0.1)"))
                    $("#kamp-country").css("width",$("#select-country").width())
                    
                    // Hide table
                    // (and stop page from freezing, so use setTimeout)
                    $("#select-country").find("ul").hide()
                    
                    // $("#head-to-head-header").hide()
                    // $("#head-to-head-body").hide()
                    $("#ow-table-wrapper").hide()
                    $("#loading-head-to-head").show()
                    
                    setTimeout(function() {
                        drawEloChart(data.selectedData.text,$("#select-country-comp").find(".dd-selected-text").text());
                        $("#wrapper").css('background',"none");
                    }, timer);
                    // drawEloChart(data.selectedData.text,$("#select-country-comp").find(".dd-selected-text").text()); // $("#select-country-comp").find(".dd-selected-text").text()
                }
              })
              
              $('#select-country-comp').ddslick({
                data: ddData,
                width: $('#select-country-comp-wrapper').width(),
                height: 300,
                imagePosition: "left",
                selectText: "Compare with",
                onSelected: function (data) {
                    $("#resetZoomWrapper").hide()
                    $("#hth").html("")
                    $("#hth").hide()
                    $("#kamp-country-comp").hide()
                    // Check if first 
                    if ($("#ow-table-wrapper").is(":visible") == false) {
                        $("#loading-head-to-head").css("height",$("#container").height())
                    } else {
                        $("#loading-head-to-head").css("height",$("#head-to-head-header").height()+body_height+$("#container").height())
                    }
                    
                    // CSS Stuff
                    $("#select-country-comp").find("div.dd-select").css("background",colors[data.selectedData.text].replace("1)","0.1)"))
                    $("#kamp-country").css("margin-bottom","10px")
                    
                    // $("#kamp-country-comp").text(String(elo_evolution[data.selectedData.text]["kampioenschappen"]) + "x Kampioen")
                    $("#kamp-country-comp").css("background-color",colors[data.selectedData.text].replace("1)","0.1)"))
                    $("#kamp-country-comp").css("width",$("#select-country-comp").width())
                    $("#kamp-country-comp").css("margin-bottom","10px")
                    
                    
                    // Display loading message
                    body_height = Math.min(150,$("#ow-table-wrapper").height())
                    // $("#head-to-head-header").hide()
                    // $("#head-to-head-body").hide()
                    $("#ow-table-wrapper").hide()
                    $("#container").hide()
                    $("#select-country-comp").find("ul").hide()
                    $("#loading-head-to-head").show()

                    // (and stop page from freezing, so use setTimeout)
                    setTimeout(function() {
                        drawEloChart($("#select-country").find(".dd-selected-text").text(),data.selectedData.text);

                    },10);
                  // console.log(data.selectedData.text)
                    
                }
              })
              
              $('#select-country').ddslick('select', {index: country_count });
                
              // Show right stuff
            //   $('#container').ready(function() {
            //     $("#wrapper").css('background',"none");
            //     // Do some css stuff
            //     $('#select-country').css("display","inline-block");
            //     // $('#select-country').css("float","left");
            //     $('#select-country').css("margin-bottom","10px");
                
            //     $('#select-country-comp').css("display","inline-block");
            //     // $('#select-country-comp').css("float","right");   
            //     $('#select-country-comp').css("margin-bottom","10px");
                
            //     $('#select-country').show();
            //     $('#span-vs').show();
            //     $('#select-country-comp').show();
            //     $('#container').show();
            //   })
          })
      })
});
</script>

<div class="row">
<div class="col-lg-8 col-lg-offset-2">

<p>What is the best international football team of all time?
How does Germany in the 2014 World Cup compare to Pele's Brazil, Maradona's Argentina or the Mighty Magyars led by Ferenc Puskás? 
A great way to get to know this is to use the Elo parameter, a measure for the strength of a team on a game-by-game basis.
The results of such an analysis<a href="#comment1"><sup>1</sup></a> are right here!</p>

<p>Select a country in the interactive graph below and explore.
Zooming is done by clicking and dragging across the wanted time interval.
When comparing between teams you can see the head-to-head results and an adjusted graph.</p>

<p style="font-size: 16px;">Last update: <strong>23/11/2015</strong></p>
</div>
</div>

<hr style="border-width:3px">
<hr style="border-width:3px">

<div id="wrapper" style='background: url(/img/ajax-loader.gif) no-repeat center center;'>
    <div class="row">
        <div id="col1" class="col-lg-4 col-md-12 col-xs-12">
            <div class="row">
                <div id="select-country-wrapper" class="col-lg-12 col-md-12 col-xs-12" style="margin-bottom:10px;">
                    <select id="select-country" style="display:none;"></select>
                </div>
            </div>
            
            <div class="row">
                <div id="kamp-country-wrapper" class="col-lg-12 col-md-12 col-xs-12" style="margin-bottom:10px;">
                    <div id="kamp-country" style="text-align:center;display:none;border:solid 1px #ccc;"></div>
                </div>
            </div>
        
        </div>
        
        <div id="col2" class="col-lg-4 col-md-12 col-xs-12">
            <div class="row">
                <div id="hth-wrapper" class="col-lg-12 col-md-12 col-xs-12" style="margin-bottom:10px;">
                    <div id="hth" class="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-xs-10 col-xs-offset-1" style="text-align: center;"></div>
                </div>
            </div>
        </div>
        
        <div id="col3" class="col-lg-4 col-md-12 col-xs-12">
            <div class="row">
                <div id="select-country-comp-wrapper" class="col-lg-12 col-md-12 col-xs-12" style="margin-bottom:10px;">
                    <select id="select-country-comp" style="display:none;"></select>
                </div>
            </div>
            
            <div class="row">
                <div id="kamp-country-comp-wrapper" class="col-lg-12 col-md-12 col-xs-12" style="margin-bottom:10px;">
                    <div id="kamp-country-comp" style="text-align:center;display:none;border:solid 1px #ccc;"></div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="row">
        <div class="col-lg-12 col-md-12 col-xs-12">
            <div id="loading-head-to-head" style="background: url(/img/ajax-loader.gif) no-repeat center center;display:none;"></div>
         </div>
    </div>
    
    <div class="row">
        <div class="col-lg-12 col-md-12 col-xs-12">
            <div id="ow-table-wrapper"></div>
        </div>
    </div>
    
    <div class="row">
        <div id="resetZoomWrapper" class="col-lg-12 col-md-12 col-xs-12" style="text-align: center;display:none;">
            <button id="resetZoom" type="button" class="btn btn-default" style="padding: 0px 0px !important;font-family: Lora !important;margin-top:15px !important">Reset Zoom</button>
        </div>
    </div>    
    
    <div class="row">
        <div class="col-lg-12 col-md-12 col-xs-12">
            <div id="container" style="height: 600px; margin: 0 auto;"></div>
        </div>
    </div>
</div>

<hr style="border-width:3px">
<hr style="border-width:3px">

<div class="row">
<div class="col-lg-8 col-lg-offset-2">

<p>Elo ratings have a simple formula; the only inputs are the final score of each game, and where and when it was played.
Teams always gain Elo points for winning, but they get more credit for upset victories and for winning by larger margins. 
Elo ratings are zero-sum, however: what one team wins, the other loses.<a href="#comment2"><sup>2</sup></a>.</p>

<p> An Elo rating of 1500 is average.</p>

<hr style="border-width:3px">

<h2>Compare Teams</h2>

<!--<p>Voor zij die nog wat meer willen analyseren is er volgende tabel. -->
<!--Maak een rangschikking op basis van gemiddelde, maximum of minimum Elo, aantal kampioenschappen (K), aantal seizoenen in eerste klasse (S), winpercentage (Win%) of doelpuntensaldo per wedstrijd (DS). Sorteer zelf de gewenste kolom of ga op zoek naar jouw favoriete ploeg.</p>-->

</div>
</div>
<div id="country-table-wrapper"></div>


<div class="row">
<div class="col-lg-8 col-lg-offset-2">
<br>
<hr style="border-width:3px">
<a name ="comment1" style="text-decoration:none;font-size:15px;">1 - This analysis is based on a similar one by </a><a href="http://fivethirtyeight.com/" style="text-decoration:underline;font-size:15px;">FiveThirtyEight</a><a style="text-decoration:none;font-size:15px;"> for NBA teams.</a><br>
<a name ="comment2" style="text-decoration:none;font-size:15px;">2 - Example: if Belgium beats the USA 2-1 during the World Cup 2014 it gains 32 points, and this in turn means the USA loses 32.</a>
</div>
</div>