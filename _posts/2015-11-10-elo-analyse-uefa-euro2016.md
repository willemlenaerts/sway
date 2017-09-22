---
layout: project_article
title: "Predicting Uefa EURO 2016"
category: project
permalink: uefa-euro2016-elo-model
tags: [soccer,football,voetbal,analysis, analyse, elo,voorspelling,forecast]
alias: [/eu-elo-model/]
author: "Willem Lenaerts"
utilities: highlight
header-img: ""
thumbnail-img: "img/Euro-2016-Logo.png"
projectname: "Uefa Euro 2016 Prediction"
---
<!--<script type="text/javascript" src="/js/jQuery/jquery-1.11.1.min.js"></script>-->
<link rel="stylesheet" type="text/css" href="/css/projects/elo-uefa-euro2016/elo-uefa-euro2016.css" />

<!--<script type="text/javascript" src="/js/bootstrap.table.js"></script>-->
<link rel="stylesheet" type="text/css" href="/css/bootstrap.table.css" />
<link rel="stylesheet" type="text/css" href="/css/toggle-switch/toggle-switch.css" />

<script src="/js/tablesorter/jquery.tablesorter.min.js"></script>
<script src="/js/ddSlick/ddSlick.js"></script>

<script type="text/javascript" src="https://www.google.com/jsapi"></script>

<script type="text/javascript" src="/js/voetbalelo/elo-uefa-euro2016.js"></script>

<script src="/js/moment/moment.js"></script>

<script src="//d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script src="//d3js.org/topojson.v1.min.js"></script>
<script>
$( document ).ready(function() {
// Parameters
if ($(window).width() > 1200) {
  view = "bracket"
} else {
  view = "table"
}

// Create Brackets
buildBracket(view, "uefa_bracket")
    
// Create Table
buildTable(view,"uefa_table")


// Date
date_url = "http://www.sway-blog.be/data/elo-uefa-euro2016/date.json"
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
function changeView(new_view) {
  // Hide and Show
  if (new_view == view) {
    return;
  } else {
    if (new_view == "bracket") {
      $("#svg").show()
      $("#table_wrapper").hide()
      view = new_view
      return;
    } else {
      $("#svg").hide()
      $("#table_wrapper").show()
      view = new_view
      return;
    } 
  }
}
</script>

<div id="explanation" class="row">
    <div class="col-lg-8 col-lg-offset-2">
        <p>Sway's prediction for the outcome of the Uefa Euro 2016 Championship. 
        For every country you'll find the probability of every group finish, advancing to the next rounds and winning the tournament.
        The results are based on an Elo algorithm<a href="#comment1"><sup>1</sup></a> combined with running 10.000 simulations.<a href="#comment2"><sup>2</sup></a></p>
        
        <p id="last_update" style="font-size: 16px;"></p>
    </div>
</div>

<hr class="hidden-md hidden-sm hidden-xs" style="border-width:3px">
<hr class="hidden-md hidden-sm hidden-xs" style="border-width:3px">

<div class="row">
    <div class="col-lg-4 col-lg-offset-4 hidden-md hidden-sm hidden-xs" style="text-align:center">
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

<hr class="hidden-md hidden-sm hidden-xs" style="border-width:3px">
<hr style="border-width:3px">

<div id="uefa_bracket" class="row"></div>
<div id="uefa_table" class="row"></div>


<br>

<div class="row">
<div class="col-lg-8 col-lg-offset-2">
<br>
<hr style="border-width:3px">
<a name ="comment1" style="text-decoration:none;font-size:15px;">1 - Elo Data from </a><a href="http://sway-blog.be/project/2015/10/29/elo-analysis-international-football/" style="text-decoration:underline;font-size:15px;">Sway's Elo Model for National Teams</a><a style="text-decoration:none;font-size:15px;">, Game Data from </a><a href="http://www.uefa.com/" style="text-decoration:underline;font-size:15px;">Uefa</a><br>
<a name ="comment2" style="text-decoration:none;font-size:15px;">2 - This analysis is based on a similar one by </a><a href="http://fivethirtyeight.com/" style="text-decoration:underline;font-size:15px;">FiveThirtyEight</a><a style="text-decoration:none;font-size:15px;"> for NFL teams.</a><br>
</div>
</div>

<br>