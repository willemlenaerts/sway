---
layout: project_article
title: "Predicting the 2015/2016 European Football Season"
category: project
permalink: uefa-elo-model
tags: [soccer,football,voetbal,analysis, analyse, elo,voorspelling,forecast]
alias: [/eu-elo-model/]
author: "Willem Lenaerts"
utilities: highlight
header-img: ""
thumbnail-img: "img/ucluel.jpg"
projectname: "2015/2016 European Football Forecast"
---
<link rel="stylesheet" type="text/css" href="/css/projects/elo-uefa-leagues/elo-uefa-leagues.css" />

<link rel="stylesheet" type="text/css" href="/css/bootstrap.table.css" />
<link rel="stylesheet" type="text/css" href="/css/toggle-switch/toggle-switch.css" />

<script src="/js/tablesorter/jquery.tablesorter.min.js"></script>
<script src="/js/ddSlick/ddSlick.js"></script>

<script type="text/javascript" src="https://www.google.com/jsapi"></script>

<script src="//d3js.org/d3.v3.min.js" charset="utf-8"></script>

<script type="text/javascript" src="/js/voetbalelo/elo-uefa-leagues.js"></script>
<script type="text/javascript" src="/js/uefa-bracket/uefa-bracket.js"></script>
<script>
  
  $( document ).ready(function() {
    // Parameters
    leagues = ["ucl","uel"]
    league = "ucl"
    if ($(window).width() > 1200) {
      view = "bracket"
    } else {
      view = "table"
    }
    
    for (l=0;l<leagues.length;l++) {
        // Create Brackets
        buildBracket(leagues[l],league,view, "uefa_brackets")
        
        // Create Table
        buildTable(leagues[l],league,view,"uefa_tables")
    }
    
    // Date
    date_url = "http://www.sway-blog.be/data/elo-uefa-leagues/date.json"
    ajax_call_date = $.ajax({
              url: date_url,
              dataType: 'json',
              crossDomain: true, // enable this
    })
    $.when(ajax_call_date).done(function(data1){
        last_update = data1  
        
        // LAST UPDATE TEXT
        $("#last_update").html("Last update: <strong>" + last_update["date"] + "</strong>")
    })

  })
</script>
<script>
function changeLeague(new_league) {
  if (new_league == league) {
    return;
  } else {
    if (view == "bracket") {
      $("#svg_" + league).hide()
      $("#svg_" + new_league).show()
      league = new_league
      return;
    } else {
      $("#table_" + league + "_wrapper").hide()
      $("#table_" + new_league + "_wrapper").show()
      league = new_league
      return;
    }
  }
}
function changeView(new_view) {
  // Hide and Show
  if (new_view == view) {
    return;
  } else {
    if (new_view == "bracket") {
      $("#svg_" + league).show()
      $("#table_" + league + "_wrapper").hide()
      view = new_view
      return;
    } else {
      $("#svg_" + league).hide()
      $("#table_" + league + "_wrapper").show()
      view = new_view
      return;
    } 
  }
}
</script>
<script>
$(window).resize(function() {
})
</script>

<div id="explanation" class="row">
    <div class="col-lg-8 col-lg-offset-2">
        <p>Sway's prediction for the outcome of the 2015/2016 Uefa Champions League and Europa League season. 
        For every team you'll find the probability of every group finish, advancing to the next rounds and winning the tournament.
        The results are based on an Elo algorithm<a href="#comment1"><sup>1</sup></a> combined with running 10.000 simulations.<a href="#comment2"><sup>2</sup></a></p>
        
        <p id="last_update" style="font-size: 16px;"></p>
    </div>
</div>

<hr style="border-width:3px">
<hr style="border-width:3px">

<div class="row">
    <div class="col-lg-4 col-lg-offset-2 col-md-6 col-md-offset-3 col-sm-12 col-xs-12" style="text-align:center">
      <fieldset>
        <!--<legend>View</legend>-->
        <div class="switch-toggle switch-candy">
          <input id="toggle_ucl" name="competition" type="radio" checked>
          <label for="toggle_ucl" onclick="changeLeague('ucl')">Champions League</label>
          <input id="toggle_uel" name="competition" type="radio">
          <label for="toggle_uel" onclick="changeLeague('uel')">Europa League</label>
          <a class="btn btn-primary"></a>
        </div>
      </fieldset>
    </div>
    <div class="col-lg-4 col-lg-offset-0 hidden-md hidden-sm hidden-xs" style="text-align:center">
      <fieldset>
        <!--<legend>View</legend>-->
        <div class="switch-toggle switch-candy">
          <input id="toggle_bracket" name="view" type="radio" checked>
          <label for="toggle_bracket" onclick="changeView('bracket')">Bracket</label>
          <input id="toggle_table" name="view" type="radio">
          <label for="toggle_table" onclick="changeView('table')">Table</label>
          <a class="btn btn-primary"></a>
        </div>
      </fieldset>
    </div>
</div>
<!--<hr style="border-width:3px">-->
<!--<div class="row">-->
<!--    <div class="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-12 col-xs-12" style="text-align:center">-->
<!--        <div class="btn-group btn-group-sm" data-toggle="buttons">-->
<!--          <label id="team_ranking_button" class="col-lg-6 col-md-6 col-sm-12 col-xs-12 btn btn-primary active competition-button-active">-->
<!--            <input type="radio" name="options" id="option1" autocomplete="off" checked> Team Ranking-->
<!--          </label>-->
<!--          <label  id="group_ranking_button" class="col-lg-6 col-md-6 col-sm-12 col-xs-12 btn btn-primary competition-button">-->
<!--            <input type="radio" name="options" id="option2" autocomplete="off"> Group Ranking-->
<!--          </label>-->
<!--        </div>-->
<!--    </div>-->
<!--</div>-->

<hr style="border-width:3px">
<hr style="border-width:3px">

<!--Ranking Tables & Brackets -->
<div id="uefa_brackets" class="row"></div>
<div id="uefa_tables" class="row"></div>

<hr style="border-width:3px">
<hr style="border-width:3px">
    
<br>

<div class="row">
<div class="col-lg-8 col-lg-offset-2">
<br>
<hr style="border-width:3px">
<a name ="comment1" style="text-decoration:none;font-size:15px;">1 - Elo Data from </a><a href="http://clubelo.com/" style="text-decoration:underline;font-size:15px;">ClubElo</a><a style="text-decoration:none;font-size:15px;">, Game Data from </a><a href="http://www.uefa.com/" style="text-decoration:underline;font-size:15px;">Uefa</a><br>
<a name ="comment2" style="text-decoration:none;font-size:15px;">2 - This analysis is based on a similar one by </a><a href="http://fivethirtyeight.com/" style="text-decoration:underline;font-size:15px;">FiveThirtyEight</a><a style="text-decoration:none;font-size:15px;"> for NFL teams.</a><br>
</div>
</div>

<br>