---
layout: post-lg-header-title-box
title: "The Complete History of European Football, 1955-2015"
subtitle: "60 Years of European Clashes"
categories: [interactive]
tags: [voetbal, football, analyse, analysis, elo]
alias: [/2015/07/01/]
author: "Willem Lenaerts"
utilities: highlight
header-img: "img/post-bg-voetbalelo-uefa.jpg"
---
<!--<script type="text/javascript" src="/js/jQuery/jquery-1.11.1.min.js"></script>-->
<link rel="stylesheet" type="text/css" href="/css/custom.css" />

<!--<script type="text/javascript" src="/js/bootstrap.table.js"></script>-->
<link rel="stylesheet" type="text/css" href="/css/bootstrap.table.css" />

<script src="/js/moment/moment.js"></script>
<script type="text/javascript" src="/js/voetbalelo/elo-uefa-football.js"></script>
<script>
  // {#On document ready, load stuff#}
  team_table = {{ site.data.elo-uefa-football.team_table | jsonify }}
  max_elo_data ={{ site.data.elo-uefa-football.max_elo_data | jsonify}}
  min_elo_data ={{ site.data.elo-uefa-football.min_elo_data | jsonify}}
  date_index = {{site.data.elo-uefa-football.date_index | jsonify}}
  date_index_reversed = {{site.data.elo-uefa-football.date_index_reversed | jsonify}}
  teams = {{site.data.elo-uefa-football.teams | jsonify}}
  seasons = {{site.data.elo-uefa-football.seasons | jsonify}}
  colors = {{site.data.elo-uefa-football.colors | jsonify}}
</script>

<script>
  $(window).load(function() {
    $.ajax({
        url: "/js/bootstrap.table.js",
        dataType: 'script',
        // success: success,
        // async: false
      }).done(function() {
        $('#team-table').bootstrapTable('resetView');
      })
      // Resize table after image in header has loaded (header not correctly positioned otherwhise)
    // while (document.images["trophy-img"] == null) {
      
    // }  
    
    // // Games table
    // game_table = {{ site.data.elo-uefa-football.game_table | jsonify }}
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
    // Resize select-team and select-team-comp
    $(".dd-select").width($("#select-team-wrapper").width())
    $("#select-team").width($("#select-team-wrapper").width())
    $("#select-team-comp").width($("#select-team-comp-wrapper").width())
    // $("#select-team-comp").css("float","left")
    
    // Resize kamp-team and kamp-team-comp
    $("#kamp-team").width($("#kamp-team-wrapper").width())
    $("#kamp-team-comp").width($("#kamp-team-comp-wrapper").width())
    
    // Resize graph container (rather: redraw it)
    drawEloChart($("#select-team").find(".dd-selected-text").text(),$("#select-team-comp").find(".dd-selected-text").text());
    
    // Make sure table resizes (esp. header)
    $.ajax({
        url: "/js/bootstrap.table.js",
        dataType: 'script',
        // success: success,
        // async: false
      }).done(function() {
        $('#team-table').bootstrapTable('resetView');
      })
    
    // Team select options resize
    $(".dd-options").width($("#select-team").width())
  });
  
  
  $( document ).ready(function() {
    // Create tables
    $.ajax({
        url: "/js/bootstrap.table.js",
        dataType: 'script',
        // success: success,
        // async: false
      }).done(function() {
    // Team Table
    // // ELO Ranking Tabel
    table_string = "<table id='team-table' data-height='500' data-search='true' data-sort-name='gemelo' data-sort-order='desc'>"+"<thead><tr>" + 
                    "<th colspan='2' data-field='team' data-sortable='true'>Team</th>" + 
                    "<th data-field='gemelo' data-sortable='true'>gemElo</th>" + 
                    "<th data-field='maxelo' data-sortable='true'>maxElo</th>" + 
                    "<th data-field='minelo' data-sortable='true'>minElo</th>" + 
                    "<th data-field='kamp' data-sortable='true'>K</th>" + // <img id='trophy-img' src='/img/trophy_16.png' </img>
                    "<th data-field='seizoenen' data-sortable='true'>S</th>" + 
                    "<th data-field='wedstrijden' data-sortable='true'>W</th>" + 
                    "<th data-field='winperc' data-sortable='true'>Win%</th>" + 
                    "<th data-field='doelpuntensaldo' data-sortable='true'>DS</th>" + 
                    // "<th data-field='wedstrijdenwinst' data-sortable='true'>W+</th>" + 
                    // "<th data-field='wedstrijdengelijk' data-sortable='true'>W=</th>" + 
                    // "<th data-field='wedstrijdenverlies' data-sortable='true'>W-</th>" + 
                    // "<th data-field='goalsvoor' data-sortable='true'>D+</th>" + 
                    // "<th data-field='goalstegen' data-sortable='true'>D-</th>" 
                    "</tr></thead>" + "</table>"
                    
    $("#team-table-wrapper").append(table_string)    
    // Add images
    for (i=0;i<teams.length;i++) {
        team = team_table[i]["team"]
        team_table[i]["team"] = "<img src='/img/Uefa Logos/" + team + ".png'" + "</img>&nbsp;" + team
    }
    // Initialize table
    $('#team-table').bootstrapTable({
        data: team_table
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
    
      for (i = 0;i<teams.length;i++) {
          if (teams[i] == "Real Madrid") {
            ddData.push({text: teams[i], value: i, selected:false, description:" ", imageSrc: "/img/Uefa Logos/" + teams[i] + ".png"})
            
            var team_select = teams[i]
            var team_count = i
              
          } else  {
            ddData.push({text: teams[i], value: i, selected:false, description:" ",imageSrc: "/img/Uefa Logos/" + teams[i] + ".png"})
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
              $('#select-team').ddslick({
                data: ddData,
                width: $('#select-team-wrapper').width(),
                height: 300,
                imagePosition: "left",
                selectText: "Selecteer ploeg",
                onSelected: function (data) {
                    
                    $("#resetZoomWrapper").hide()
                    $("#hth").hide()
                    $("#kamp-team").hide()
                    
                    // Make right color
                    $("#select-team").find("div.dd-select").css("background",colors[data.selectedData.text].replace("1)","0.1)"))
                    
                    // Check if first load
                    if ($("#select-team-comp").find(".dd-option").hasClass("dd-option-selected") == false && $("#kamp-team").text() == "") {
                        $("#loading-head-to-head").css("height",0)
                        timer = 0
                    } else {
                        $("#loading-head-to-head").css("height",$("#container").height())
                        $("#container").hide()
                        timer = 100
                    }
                    
                    // unselect select-country-comp
                    $("#select-team-comp").find(".dd-option").removeClass("dd-option-selected");
                    $("#select-team-comp").find(".dd-selected").html("Vergelijk met");
                    $("#select-team-comp").find("div.dd-select").css("background","rgb(240,240,240)")
                    $("#kamp-team-comp").hide()
                    
                    // Change color of kamp
                    $("#kamp-team").css("background-color",colors[data.selectedData.text].replace("1)","0.1)"))
                    $("#kamp-team").css("width",$("#select-team").width())
                    
                    // Hide table
                    // (and stop page from freezing, so use setTimeout)
                    $("#select-team").find("ul").hide()
                    
                    // $("#head-to-head-header").hide()
                    // $("#head-to-head-body").hide()
                    $("#ow-table-wrapper").hide()
                    $("#loading-head-to-head").show()
                    
                    setTimeout(function() {
                        drawEloChart(data.selectedData.text,$("#select-team-comp").find(".dd-selected-text").text());
                        $("#wrapper").css('background',"none");
                    }, timer);
                    // drawEloChart(data.selectedData.text,$("#select-team-comp").find(".dd-selected-text").text()); // $("#select-team-comp").find(".dd-selected-text").text()
                }
              })
              
              $('#select-team-comp').ddslick({
                data: ddData,
                width: $('#select-team-comp-wrapper').width(),
                height: 300,
                imagePosition: "left",
                selectText: "Vergelijk met",
                onSelected: function (data) {
                    $("#resetZoomWrapper").hide()
                    $("#hth").html("")
                    $("#hth").hide()
                    $("#kamp-team-comp").hide()
                    // Check if first 
                    if ($("#ow-table-wrapper").is(":visible") == false) {
                        $("#loading-head-to-head").css("height",$("#container").height())
                    } else {
                        $("#loading-head-to-head").css("height",$("#head-to-head-header").height()+body_height+$("#container").height())
                    }
                    
                    // CSS Stuff
                    $("#select-team-comp").find("div.dd-select").css("background",colors[data.selectedData.text].replace("1)","0.1)"))
                    $("#kamp-team").css("margin-bottom","10px")
                    
                    // $("#kamp-team-comp").text(String(elo_evolution[data.selectedData.text]["kampioenschappen"]) + "x Kampioen")
                    $("#kamp-team-comp").css("background-color",colors[data.selectedData.text].replace("1)","0.1)"))
                    $("#kamp-team-comp").css("width",$("#select-team-comp").width())
                    $("#kamp-team-comp").css("margin-bottom","10px")
                    
                    
                    // Display loading message
                    body_height = Math.min(150,$("#ow-table-wrapper").height())
                    // $("#head-to-head-header").hide()
                    // $("#head-to-head-body").hide()
                    $("#ow-table-wrapper").hide()
                    $("#container").hide()
                    $("#select-team-comp").find("ul").hide()
                    $("#loading-head-to-head").show()

                    // (and stop page from freezing, so use setTimeout)
                    setTimeout(function() {
                        drawEloChart($("#select-team").find(".dd-selected-text").text(),data.selectedData.text);

                    },10);
                  // console.log(data.selectedData.text)
                    
                }
              })
              
              $('#select-team').ddslick('select', {index: team_count });
                
              // Show right stuff
            //   $('#container').ready(function() {
            //     $("#wrapper").css('background',"none");
            //     // Do some css stuff
            //     $('#select-team').css("display","inline-block");
            //     // $('#select-team').css("float","left");
            //     $('#select-team').css("margin-bottom","10px");
                
            //     $('#select-team-comp').css("display","inline-block");
            //     // $('#select-team-comp').css("float","right");   
            //     $('#select-team-comp').css("margin-bottom","10px");
                
            //     $('#select-team').show();
            //     $('#span-vs').show();
            //     $('#select-team-comp').show();
            //     $('#container').show();
            //   })
          })
      })
});
</script>

<div class="row">
<div class="col-lg-8 col-lg-offset-2">

<p>Wat is de beste Belgische voetbalploeg aller tijden? Hoe vergelijk je ploegen over een periode van 120 jaar? Doorstaat het AA Gent van 2015 de vergelijking met het Club Brugge onder Trond Sollied, het Anderlecht onder Aimé Antheunis of het Standard onder Raymond Goethals? 
Dé methode om dit te weten te komen is de Elo parameter, een maatstaf die de sterkte van een ploeg weergeeft op wedstrijdbasis.
De resultaten van zo'n analyse<a href="#comment1"><sup>1</sup></a> vind je hieronder.</p>

<p>Elo-ratings hebben een simpele formule; de enige inputs zijn de uitslag van de wedstrijd, en waar en wanneer deze gespeeld werd.
Een team verdient steeds Elo punten als het wint, maar krijgt er meer in het geval van een verrassende overwinning en als het doelpuntensaldo groter is.
Elo-ratings zijn een "zero sum game". Wat de ene ploeg aan Elo punten wint speelt de andere kwijt<a href="#comment2"><sup>2</sup></a>.</p>

<p>Selecteer in de interactieve grafiek hieronder een ploeg en verken.
Inzoomen doe je door te klikken en slepen over het gewenste tijdsinterval.
Bij het vergelijken tussen 2 ploegen krijg je de head-to-head resultaten, een tabel van alle onderlinge wedstrijden en een aangepaste grafiek te zien.</p>

</div>
</div>

<hr style="border-width:3px">
<hr style="border-width:3px">

<div id="wrapper" style='background: url(/img/ajax-loader.gif) no-repeat center center;'>
    <div class="row">
        <div id="col1" class="col-lg-4 col-md-12 col-xs-12">
            <div class="row">
                <div id="select-team-wrapper" class="col-lg-12 col-md-12 col-xs-12" style="margin-bottom:10px;">
                    <select id="select-team" style="display:none;"></select>
                </div>
            </div>
            
            <div class="row">
                <div id="kamp-team-wrapper" class="col-lg-12 col-md-12 col-xs-12" style="margin-bottom:10px;">
                    <div id="kamp-team" style="display:none;border:solid 1px #ccc;"></div>
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
                <div id="select-team-comp-wrapper" class="col-lg-12 col-md-12 col-xs-12" style="margin-bottom:10px;">
                    <select id="select-team-comp" style="display:none;"></select>
                </div>
            </div>
            
            <div class="row">
                <div id="kamp-team-comp-wrapper" class="col-lg-12 col-md-12 col-xs-12" style="margin-bottom:10px;">
                    <div id="kamp-team-comp" style="display:none;border:solid 1px #ccc;"></div>
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
        <div id="resetZoomWrapper" class="col-lg-12 col-md-12 col-xs-12" style="text-align: right;display:none;">
            <input type="button" value="Reset Zoom" id="resetZoom" style="font-size: 16px;margin-top:10px;"/>
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

<h2>Het Fenomeen Anderlecht</h2>

<p>Elke analyse van de geschiedenis van de Belgische eerste klasse begint en eindigt met Anderlecht. 
Natuurlijk zijn er het succes van FC Luik en Union Sint Gillis in de beginjaren van de competitie, de gloriedagen van Club Brugge onder Ernst Happel of de opeenvolgende titels van Standard onder Raymond Goethals, maar sinds de herstart van de competitie na de tweede wereldoorlog is er maar 1 constante: Anderlecht.</p>

<img src="/img/anderlecht-voorbeeld.png">

<p>De laatste keer dat Anderlecht een Elo score onder 1500 had, lager dan het gemiddelde dus, dateert van het seizoen 1937-38. Sindsdien is Anderlecht zonder concurrentie de sterkste ploeg in de Belgische eerste klasse.
Na de eeuwwisseling heeft deze trend zich zelfs versterkt. Met 8 titels in 15 seizoenen laat Anderlecht de rest ver achter zich.</p>

<br>
<hr style="border-width:3px">

<h2>Club Brugge, The Long and Winding Road</h2>

<p>Dat succes soms een vloek kan zijn moet je in Brugge niet uitleggen. Na het vertrek van Trond Sollied in 2005 heeft de club het hoge niveau van 2000-2005 niet kunnen bestendigen, met alle frustraties vandien.
Er is sinds 2007-08 wel een kleine opwaartse trend merkbaar, al valt te betwijfelen of dit de fans kan geruststellen.</p>

<img src="/img/clubbrugge-voorbeeld.png">

<p>Zelfs de komst van zakenman Bart Verhaeghe in 2010 heeft niet de verwachte grote sprong voorwaarts gebracht. 
Er rest Club Brugge voorlopig dus niets anders dan rustig voortploegen, al bewees AA Gent het voorbije seizoen dat de omslag ook sneller kan komen.</p>

<br>
<hr style="border-width:3px">

<h2>AA Gent en het Mirakeljaar 2015</h2>

<p>Op 21 december 2014 is AA Gent een degelijke subtopper. Goed, maar in geen geval goed genoeg om kampioen te worden. Na een 1-2 verlies tegen Standard staan ze op een 4e plaats, en hun Elo score is met 1640 matig te noemen.
Het zal de laagste Elo score van het seizoen worden. 5 maanden later is het eerste kampioenschap in de geschiedenis van AA Gent een feit.</p>

<img src="/img/aagent-voorbeeld.png">

<p>Het toeval wil dat het kampioenschap gehaald wordt na een 2-0 overwinning tegen, jawel, Standard. 
Dit resulteert ook meteen in de hoogste Elo score die de ploeg in haar geschiedenis behaald heeft.</p>

<br>
<hr style="border-width:3px">

<h2>De Beste en Slechtste Kampioenen</h2>

<p>Een kampioen is de beste ploeg van dat seizoen, en daar valt niet over te discussiëren. Maar uiteraard speelt het niveau van de competitie een zeer grote rol.
In onderstaande tabel vind je de allerbeste onder de kampioenen. Zij werden geen kampioen door het falen van hun tegenstanders, maar door hun eigen sterkte.</p>

<table style="text-align:center;font-size:18px;">
<tr><th style="text-align:center"></th><th style="text-align:center">Seizoen</th><th style="text-align:center">Ploeg</th><th style="text-align:center">Gem. Elo</th></tr>
 <tr><td>1</td><td>1909-10</td><td>UNION ST.GILLIS R.</td><td>1991</td></tr>
 <tr><td>2</td><td>2004-05</td><td>CLUB BRUGGE KV</td><td>1949</td></tr>
 <tr><td>3</td><td>2009-10</td><td>ANDERLECHT RSC</td><td>1948</td></tr>
 <tr><td>4</td><td>1905-06</td><td>UNION ST. GILLIS R.</td><td>1933</td></tr>
 <tr><td>5</td><td>1913-14</td><td>DARING CLUB BRUSSEL</td><td>1922</td></tr>
</table>

<p>De primus inter pares is misschien wat onverwacht niet Anderlecht, maar wel Union Sint Gillis. 
Zelfs de tweede plaats is dit keer te hoog gegrepen en kan mogelijk wat troost bieden aan Club Brugge fans: terug aansluiten bij het niveau van 2004-05 zou voor elke ploeg een zware opdracht zijn.
</p>

<p>De huidige kampioen, AA Gent, is slechts de 68e sterkste kampioen in 112 seizoenen eerste klasse. Er is dus nog wat werk aan de winkel om een écht legendarische ploeg te worden.</p>

<p>Als we de beste onder de kampioenen kunnen analyseren, kan dat ook andersom. Onderstaande ploegen werden kampioen omdat er nu eenmaal iemand kampioen moet worden.</p>

<table style="text-align:center;font-size:18px;">
<tr><th style="text-align:center"></th><th style="text-align:center">Seizoen</th><th style="text-align:center">Ploeg</th><th style="text-align:center">Gem. Elo</th></tr>
 <tr><td>1</td><td>1895-96</td><td>LUIK FC</td><td>1576</td></tr>
 <tr><td>2</td><td>1899-00</td><td>RACING CLUB BRUSSEL</td><td>1591</td></tr>
 <tr><td>3</td><td>1931-32</td><td>LIERSE SK</td><td>1620</td></tr>
 <tr><td>4</td><td>1896-97</td><td>RACING CLUB BRUSSEL</td><td>1625</td></tr>
 <tr><td>5</td><td>1959-60</td><td>LIERSE SK</td><td>1661</td></tr>
</table>

<p>Opvallend is hier dat bij twee van de vier titels van Lierse vraagtekens geplaatst kunnen worden. Écht sterk was de concurrentie niet.</p>

<br>
<hr style="border-width:3px">

<h2>Dynastie</h2>

<p>Kampioen spelen is één ding, maar om tot het collectief geheugen te behoren is er meer nodig.
Welke ploegen konden jarenlang de competitie domineren, alle concurrentie overschaduwen en zich tot een "dynastie" kronen? 
Voor een dynastie hanteren we volgende definitie: minstens 3 keer kampioen in een periode van 5 jaar.</p>

<table style="text-align:center;font-size:18px;max-height:200px;overflow:scroll;overflow-y: auto;">
<tr><th style="text-align:center"></th><th style="text-align:center">Interval</th><th style="text-align:center">Ploeg</th><th style="text-align:center">Gem. Elo</th></tr>
 <tr><td>1</td><td>1905-1910</td><td>UNION ST.GILLIS R.</td><td>1921</td></tr>
 <tr><td>2</td><td>2008-2013</td><td>ANDERLECHT RSC</td><td>1886</td></tr>
 <tr><td>3</td><td>1989-1994</td><td>ANDERLECHT RSC</td><td>1883</td></tr>
 <tr><td>4</td><td>1999-2004</td><td>ANDERLECHT RSC</td><td>1872</td></tr>
 <tr><td>5</td><td>1984-1989</td><td>ANDERLECHT RSC</td><td>1872</td></tr>
 <tr><td>6</td><td>1924-1929</td><td>BEERSCHOT VAC</td><td>1822</td></tr>
 <tr><td>7</td><td>1987-1992</td><td>CLUB BRUGGE KV</td><td>1817</td></tr>
 <tr><td>8</td><td>1932-1937</td><td>UNION ST.GILLIS R.</td><td>1809</td></tr>
 <tr><td>9</td><td>1964-1969</td><td>ANDERLECHT RSC</td><td>1798</td></tr>
 <tr><td>10</td><td>1966-1971</td><td>STANDARD LUIK</td><td>1763</td></tr>
 <tr><td>11</td><td>1975-1980</td><td>CLUB BRUGGE KV</td><td>1763</td></tr>
 <tr><td>12</td><td>1899-1904</td><td>RACING CLUB BRUSSEL</td><td>1736</td></tr>
 <tr><td>13</td><td>1952-1957</td><td>ANDERLECHT RSC</td><td>1716</td></tr>
 <tr><td>14</td><td>1895-1900</td><td>LUIK FC</td><td>1702</td></tr>
 <tr><td>15</td><td>1945-1950</td><td>ANDERLECHT RSC</td><td>1693</td></tr>
</table>

<br>
<hr style="border-width:3px">

<h2>Speciale Wedstrijden</h2>

<p>Naast een evaluatie van ploegen kan Elo ook dienen om wedstrijden te analyseren. 
Zoals eerder besproken wordt een Elo score berekend op basis van het verschil in initiële Elo waarde tussen beide ploegen en het doelpuntensaldo van de wedstrijd.
In die zin kan de grootte van de verandering van de Elo score geïnterpreteerd worden als een maatstaf voor hoe verrassend een uitslag was.
In onderstaande tabel vind je dus de meest verrassende uitslagen in de geschiedenis van de Belgische eerste klasse.</p>

<table style="text-align:center;font-size:18px;">
<tr><th style="text-align:center"></th><th style="text-align:center">Datum</th><th style="text-align:center">Wedstrijd</th><th style="text-align:center">Score</th><th style="text-align:center">Elo Verschil</th></tr>
 <tr><td>1</td><td>25-8-1993</td><td>ANTWERP FC - OOSTENDE KV</td><td>0 - 4</td><td>108</td></tr>
 <tr><td>2</td><td>12-12-2009</td><td>MOESKROEN R. EXC. - LOKEREN SC S.N.W.</td><td>0 - 5</td><td>107</td></tr>
 <tr><td>3</td><td>23-11-2013</td><td>OOSTENDE KV - GENK RC</td><td>4 - 0</td><td>107</td></tr>
 <tr><td>4</td><td>28-9-1924</td><td>GENT RC - BERCHEM SP.</td><td>0 - 4</td><td>107</td></tr>
 <tr><td>5</td><td>09-11-2003</td><td>ANDERLECHT RSC - STANDARD LUIK</td><td>1 - 4</td><td>106</td></tr>
</table>

<br>
<hr style="border-width:3px">

<h2>Vergelijking Ploegen</h2>

<p>Voor zij die nog wat meer willen analyseren is er volgende tabel. 
Maak een rangschikking op basis van gemiddelde, maximum of minimum Elo, aantal kampioenschappen (K), aantal seizoenen in eerste klasse (S), winpercentage (Win%) of doelpuntensaldo per wedstrijd (DS). Sorteer zelf de gewenste kolom of ga op zoek naar jouw favoriete ploeg.</p>

</div>
</div>
<div id="team-table-wrapper"></div>


<div class="row">
<div class="col-lg-8 col-lg-offset-2">
<br>
<hr style="border-width:3px">
<a name ="comment1" style="text-decoration:none;font-size:15px;">1 - Deze analyse is gebaseerd op een gelijkaardige analyse van </a><a href="http://fivethirtyeight.com/" style="text-decoration:underline;font-size:15px;">FiveThirtyEight</a><a style="text-decoration:none;font-size:15px;"> voor NBA teams.</a><br>
<a name ="comment2" style="text-decoration:none;font-size:15px;">2 - Bijvoorbeeld: als AA Gent op de laatste speeldag van de reguliere competitie 2014/2015 met 1-2 wint op het veld van Anderlecht wint het 32 Elo punten,
en dit betekent ook dat Anderlecht er 32 kwijtspeelt.</a>
</div>
</div>