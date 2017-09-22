---
layout: project_article
title: "Predicting the 2015/2016 Domestic Football Season"
category: project
permalink: eu-elo-model
tags: [soccer,football,voetbal,analysis, analyse, elo,voorspelling,forecast]
alias: [/eu-elo-model/]
author: "Willem Lenaerts"
utilities: highlight
header-img: ""
thumbnail-img: "img/domestic.jpg"
projectname: "2015/2016 Domestic Football Forecast"
---
<!--<script type="text/javascript" src="/js/jQuery/jquery-1.11.1.min.js"></script>-->
<link rel="stylesheet" type="text/css" href="/css/projects/elo-domestic-leagues/elo-domestic-leagues.css" />

<!--<script type="text/javascript" src="/js/bootstrap.table.js"></script>-->
<link rel="stylesheet" type="text/css" href="/css/bootstrap.table.css" />

<script src="/js/tablesorter/jquery.tablesorter.min.js"></script>
<script src="/js/ddSlick/ddSlick.js"></script>

<script type="text/javascript" src="https://www.google.com/jsapi"></script>

<script type="text/javascript" src="/js/voetbalelo/elo-domestic-leagues.js"></script>
<script>
  
  $( document ).ready(function() {
      url_data = "http://www.sway-blog.be/data/elo-domestic-leagues/data.json"
        ajax_call_data = $.ajax({
          url: url_data,
          dataType: 'json',
          crossDomain: true, // enable this
        })

    url_date = "http://www.sway-blog.be/data/elo-domestic-leagues/date.json"
    ajax_call_date = $.ajax({
              url: url_date,
              dataType: 'json',
              crossDomain: true, // enable this
            })

    
   $.when(ajax_call_data,ajax_call_date).done(function(data1, data2){
       data_competitions = data1[0]
       last_update = data2[0]
       
       // LAST UPDATE TEXT
       $("#last_update").html("Last update: <strong>" + last_update["date"] + "</strong>")
       
        // Colors for chart
        green = "rgb(0,100,0)"
        gold = "rgb(212,175,55)"
        silver = "rgb(146,146,144)" 
        dark_red = "rgb(122,16,32)"
        red = "rgb(179,27,27)"
        blue = "rgb(0,0,255)"
        
        // start_competition based on hash in URL
        if (window.location.hash == "") {
            start_competition = "Belgium"
        } else {
            start_competition = window.location.hash.replace("#","")
            if (Object.keys(data_competitions).indexOf(start_competition) == -1) {
                start_competition = "Belgium"
            }
        }
       
        teamTables()
           
        // Select competition Button
       //Dropdown plugin data
        var ddData = [];
        
          for (i = 0;i<Object.keys(data_competitions).length;i++) {
              if (Object.keys(data_competitions)[i] == start_competition) {
                ddData.push({text: Object.keys(data_competitions)[i] + " - " + data_competitions[Object.keys(data_competitions)[i]]["name"], value: i, selected:true, description:" ", imageSrc: "/img/projects/elo-domestic-leagues/competitions/" + Object.keys(data_competitions)[i] + ".png"})
                
                competition_selected = Object.keys(data_competitions)[i]
                competition_selected_index = i
                  
              } else  {
                ddData.push({text: Object.keys(data_competitions)[i] + " - " + data_competitions[Object.keys(data_competitions)[i]]["name"], value: i, selected:false, description:" ",imageSrc: "/img/projects/elo-domestic-leagues/competitions/" + Object.keys(data_competitions)[i] + ".png"})
              }
          }
          
        // Speeldag berekenen
        // data[competition_selected]["games"]
           for (i=0;i<data_competitions[competition_selected]["games"].length;i++) {
               if (parseInt(data_competitions[competition_selected]["games"][i][4]) == 0) {
                   speeldag = Math.floor((i)/8) + 1
                   break
               }
           }
           
          $('#select-competition').ddslick({
            data: ddData,
            width: $('#select-competition-wrapper').width(),
            height: 300,
            imagePosition: "center",
            selectText: "Select Competition",
            onSelected: function (data) {
                prev_competition_selected = competition_selected
                prev_competition_selected_index = competition_selected_index
                competition_selected = $("#select-competition-wrapper").find(".dd-selected-text").text().split(" - ")[0]
                competition_selected_index = Object.keys(data_competitions).indexOf(competition_selected)
                
                // Change table
                $("#table_" + prev_competition_selected + "_wrapper").hide()
                $("#table_" + competition_selected + "_wrapper").show()
                
                // Create Team Buttons
                $('#select-team').ddslick('destroy');
                createTeamChoice()
                // $('#select-team').ddslick('select', {index: team_selected_index });
            }
          })
   
        //   fillGameTable();
           

    })
  })
    
</script>

<script>
$(window).resize(function() {
    // What to do on resize:
    $("#select-competition").find(".dd-select").width($("#select-competition-wrapper").width())
    $("#select-competition").find(".dd-options").width($("#select-competition-wrapper").width())
    
    
    $("#select-team").find(".dd-select").width($("#select-team-wrapper").width())
    $("#select-team").find(".dd-options").width($("#select-team-wrapper").width())
    
    drawChart_standing();
    drawChart_elo();
    
})
</script>

<div id="explanation" class="row">
    <div class="col-lg-8 col-lg-offset-2">
        <p>Sway's prediction for the outcome of the 2015/2016 season for 9 domestic European Football competitions. 
        For every team you'll find the probability of relegation, winning the title, and every final league position in between.
        The results are based on an Elo algorithm combined with running 10.000 simulations.<a href="#comment1"><sup>1</sup></a></p>
        
        <p id ="last_update" style="font-size: 16px;"></p>
    </div>
</div>

<hr style="border-width:3px">
<hr style="border-width:3px">

<!--Country Choice-->
<div id="country_tables_choice" class="row">
    <div id="select-competition-wrapper" class="col-lg-4 col-lg-offset-4 col-md-8 col-md-offset-2 col-sm-6 col-sm-offset-3 col-xs-12" style="">
        <select id="select-competition"></select>
    </div>
</div>

<hr style="border-width:3px">
<hr style="border-width:3px">

<!--Ranking Tables-->
<div id="country_tables" class="row"></div>


<!--Wedstrijden tabel-->
<!--<div id="jpl-games-ranking-table" class="row vertical-align">-->

<!--<div class="col-lg-3 hidden-md hidden-sm hidden-xs"></div>-->

<!--<div class="col-lg-1 col-md-2 col-sm-2 col-xs-1">-->
<!--    <a onclick="previousGameday();" style="float:left">-->
<!--        <span class="glyphicon glyphicon-chevron-left"></span>-->
<!--    </a>-->
<!--</div>-->

<!--<div class="col-lg-4 col-md-8 col-sm-8 col-xs-10"  style="text-align: center">-->
<!--    <span id="speeldag"></span>-->
<!--</div>-->

<!--<div class="col-lg-1 col-md-2 col-sm-2 col-xs-1">-->
<!--    <a onclick="nextGameday();" style="float:right">-->
<!--        <span class="glyphicon glyphicon-chevron-right"></span>-->
<!--    </a>-->
<!--</div>-->

<!--<div class="col-lg-3 hidden-md hidden-sm hidden-xs"></div>-->
<!--</div>-->

<!--<div class="row">-->
<!--    <div class="col-lg-12 hidden-md hidden-xs hidden-sm">-->
<!--        <table id="jupiler-pro-league-games" class="table table-condensed games-table"></table>-->
<!--    </div>-->
<!--    <div class="hidden-lg col-md-12 col-sm-12 col-xs-12">-->
<!--        <table id="jupiler-pro-league-games-small" class="table table-condensed games-table-small"></table>-->
<!--    </div>-->
<!--</div>-->

<!--<hr style="border-width:3px">-->
<!--<hr style="border-width:3px">-->

<hr style="border-width:3px">
<hr style="border-width:3px">
    
<!--Visualisatie per team-->
<div id="jpl-teams-visualization" class="row">
    <div id="select-team-wrapper" class="col-lg-4 col-lg-offset-4 col-md-8 col-md-offset-2 col-sm-6 col-sm-offset-3 col-xs-12" style="margin-bottom:10px;">
        <select id="select-team"></select>
    </div>
</div>

<hr style="border-width:3px">
<hr style="border-width:3px">

<div class="row">
    <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
        <div id="endranking_graph" style="height: 300px; border: 2px rgb(238,238,238) solid;"></div>
    </div>
    <div class="hidden-lg col-md-12 col-sm-12 col-xs-12">
        <br>
    </div>
    <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
        <div id="elo_evolution_graph" style="height: 300px; border: 2px rgb(238,238,238) solid;"></div>
    </div>
</div>

<br>

<div class="row">
<div class="col-lg-8 col-lg-offset-2">
<br>
<hr style="border-width:3px">
<a name ="comment1" style="text-decoration:none;font-size:15px;">1 - This analysis is based on a similar one by </a><a href="http://fivethirtyeight.com/" style="text-decoration:underline;font-size:15px;">FiveThirtyEight</a><a style="text-decoration:none;font-size:15px;"> for NFL teams.</a><br>
</div>
</div>

<br>