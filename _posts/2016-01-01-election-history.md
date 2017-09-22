---
layout: project-full-width
title: "History of Western European Elections"
tags: [geo, maps, belgium, flanders, elections, germany, france, uk, spain, portugal, italy, history, political, parties]
category: project
permalink: election-history
alias: [/geo-game/]
author: "Willem Lenaerts"
utilities: highlight
header-img: ""
thumbnail-img: "img/dodentocht-thumbnail.jpg"
projectname: "The History of World Elections"
---
<link rel="stylesheet" type="text/css" href="/css/bootstrap-slider/bootstrap-slider.css" />
<script src="/js/bootstrap-slider/bootstrap-slider.js"></script>

<link rel="stylesheet" type="text/css" href="/css/ion.rangeslider/ion.rangeSlider.css" />
<link rel="stylesheet" type="text/css" href="/css/ion.rangeslider/ion.rangeSlider.skinHTML5.css" />

<script src="/js/ion.rangeslider/ion.rangeSlider.min.js"></script>

<script src="/js/typeahead/typeahead.jquery.min.js"></script>
<link rel="stylesheet" type="text/css" href="/css/typeahead/typeahead.css" />

<script src="/js/moment/moment.js"></script>

<script src="//d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script src="//d3js.org/topojson.v1.min.js"></script>
<script src="http://d3js.org/d3.geo.projection.v0.min.js"></script>
<script src="http://d3js.org/queue.v1.min.js"></script>

<script src="/js/timeline/timeline.js"></script>

<script src="/js/vis/vis.min.js"></script>
<link rel="stylesheet" type="text/css" href="/css/vis/vis.min.css" />

<script src="/js/election-history/election-history.js"></script>
<link rel="stylesheet" type="text/css" href="/css/projects/election-history/election-history.css" />

<script src="/js/ddSlick/ddSlick.js"></script>

<script src="/js/highcharts/highcharts.js"></script>

<script>
  // {#On document ready, load stuff#}
  party_colors = {{ site.data.election-history.party_colors | jsonify }}
  election_dates = {{ site.data.election-history.election_dates | jsonify }}
  constituencies = {{ site.data.election-history.constituencies | jsonify }}
  countries = {{ site.data.election-history.countries | jsonify }}
  country_iso_to_name = {{ site.data.election-history.country_iso_to_name | jsonify }}
</script>

<script>
$( document ).ready(function() {
  // Global variables
  stroke_width = 0.4;
  sens = 0.25; // Defines drag momevement on globe
  table_rows_lg = 8
  table_rows_md = 3
  table_rows_sm = 2
  table_rows_xs = 1
  color_no_data = "rgb(220,220,218)"
  admin_level = 1
  
  // Country select
  if (window.location.hash == "") {
      country = "BEL"
  } else {
      country = window.location.hash.replace("#","")
      if (countries.indexOf(country) == -1) {
          country = "BEL"
      }
  }
  
  // Initialize Country Choice
  initializeCountryChoice()
  
  // On resize
  d3.select(window)
    .on("resize", sizeChange);
});
</script>
<script>
$( window ).resize(function() {
   
  // Resize ddSlick
  wrapper_width = 1.4 * ($(".dd-selected-image").width() + $(".dd-selected-text").width())
  start_wrapper_width = wrapper_width + 1
  max_iter = 10
  count = 0
  while ((wrapper_width - start_wrapper_width != 0) && (count < max_iter)) {
    start_wrapper_width = 1.4 * ($(".dd-selected-image").width() + $(".dd-selected-text").width())
    $(".dd-select").width(Math.max(wrapper_width,200))
    $(".dd-options").width(Math.max(wrapper_width,400))
    $("#select-country").width(Math.max(wrapper_width,200))
    $("#select-country-wrapper").width(Math.max(wrapper_width,200))          
    
    wrapper_width = 1.4 * ($(".dd-selected-image").width() + $(".dd-selected-text").width())
    
    count += 1
  }
  
  // Position dropdown
  $("#election_dropdown_list").css("margin-top",$("#dropdownMenu1").outerHeight() + parseInt($("#dropdownMenu1").css("margin-top").replace("px","")))
  
  // Resize table wrapper
  // $("#table_wrapper").height($("#map_wrapper").height() - $("#text_wrapper").height() -10)
})
</script>
<script>
  $(window).load(function(){
  // Resize ddSlick
  wrapper_width = 1.4 * ($(".dd-selected-image").width() + $(".dd-selected-text").width())
  start_wrapper_width = wrapper_width + 1
  max_iter = 10
  count = 0
  while ((wrapper_width - start_wrapper_width != 0) && (count < max_iter)) {
    start_wrapper_width = 1.4 * ($(".dd-selected-image").width() + $(".dd-selected-text").width())
    $(".dd-select").width(Math.max(wrapper_width,200))
    $(".dd-options").width(Math.max(wrapper_width,400))
    $("#select-country").width(Math.max(wrapper_width,200))
    $("#select-country-wrapper").width(Math.max(wrapper_width,200))          
    
    wrapper_width = 1.4 * ($(".dd-selected-image").width() + $(".dd-selected-text").width())
    
    count += 1
  }
  
  // $("#table_wrapper").height($("#map_wrapper").height() - $("#text_wrapper").height())
});
  
</script>

<div id="project_title" class="row" style="margin-top:50px;">
  <div id="title" class="col-lg-8 col-lg-offset-2" style="text-align:center;">
      <h1 id="title-text" class="project_titel" style="display:inline-block;vertical-align:middle;">The History of Elections in &nbsp;</h1>
      <div id="select-country-wrapper" style="display:inline-block;vertical-align:middle;"> 
        <select id="select-country"></select>
    </div>
  </div>
</div>

<div id="project_explanation" class="row">
  <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 hidden-sm hidden-xs" style="border-bottom:solid 1px lightgrey;">
      <p style="text-align:justify;color:grey;margin-top:10px;">The complete history of national elections for countries around the globe. 
      Results are available per constituency and per election. The data is provided by <a href="http://www.electiondataarchive.org/">CLEA</a>
      and for some country supplemented with additional, local data.</p>
  </div>
</div>

<div id="inputs" class="row" style="display:flex;margin-top:10px;"> <!--  style="margin-top:50px;"-->
  <div class="col-lg-2 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1" style="text-align:center;box-shadow:4px 4px 4px #aaa;background:lightgrey;">
    <div id="election_dropdown" class="dropdown">
      <button class="col-lg-12 col-lg-offset-0 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-8 col-xs-offset-2 btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" 
        style='font-size: 18px;font-weight:bold;margin-top:10px;margin-bottom:10px;border-color:#333;background:lightgrey'>
      </button>
      <ul id="election_dropdown_list" class="col-lg-12 col-lg-offset-0 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 dropdown-menu" aria-labelledby="dropdownMenu1" style="text-align:center;overflow-y: scroll;max-height: 200px;">
      </ul>
    </div>
  </div>
  <div id="election_slider_wrapper" class="col-lg-4 hidden-md hidden-sm hidden-xs" style="display:flex;align-items:center;box-shadow:4px 4px 4px #aaa;background:lightgrey;">
    <div class="col-lg-1" style="text-align:center;">
      <a id="play_button" onclick="play();" style="color: #333 !important;cursor: pointer;"><i class="fa fa-play-circle-o fa-2x"></i></a>
      <a id="stop_button" onclick="stop();" style="color: #333 !important;cursor: pointer;display:none;"><i class="fa fa-pause-circle-o fa-2x"></i></a>
    </div>
    <div class="col-lg-11">
      <input id="election_slider" type="text"></input>
    </div>
  </div>
</div>  

<div id="general_info" class="row" style="margin-top:10px;display:flex;padding-bottom:0px;">
  <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1" style="background:rgb(238,238,238);box-shadow: 5px 5px 5px grey;padding-top: 10px;padding-bottom:10px;border-bottom:solid;">
    <div id="text_wrapper" class="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1" > 
          <table id="text_table" class="table-condensed"></table>
    </div>
  </div>
</div>

<div id="info" class="row" style="padding-top:0px;display:flex;">
    <div id="table_wrapper" class="col-lg-3 col-lg-offset-2 col-md-3 col-md-offset-1 col-sm-4 col-sm-offset-1 hidden-xs" style="display:flex;align-items:center;box-shadow: 5px 5px 5px grey;background:rgb(238,238,238);padding-right:0px;border-right:solid;">
      <div class="col-lg-12" style="padding-left:0px !important;padding-right:0px !important;">
        <div class="row">
          <div id="choose_constituency" class="col-centered">
            <input id="choose_constituency_input" class="typeahead" type="text" placeholder="Choose Constituency">
          </div>
        </div>
        <div class="col-lg-12 col-lg-offset-0 col-md-12 col-md-offset-0 col-sm-12 col-sm-offset-0 col-xs-8 col-xs-offset-2">
          <table id="election_table_tooltip" class="election_table table-condensed" style="display:none;"></table>
          <table id="election_table" class="election_table table-condensed"></table>
        </div>
      </div>
    </div>
  <div id="map_wrapper" class="col-lg-5 col-lg-offset-0 col-md-7 col-md-offset-0 col-sm-6 col-sm-offset-0 col-xs-10 col-xs-offset-1" style="padding-left:0px;padding-right:0px;">
    <div id="map" style="box-shadow: 5px 5px 5px grey;background: rgb(238,238,238);"></div>
  </div>
</div>
