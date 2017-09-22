---
layout: project_article
title: "DOMESTIC BRACKET"
category: project
permalink: DOMESTIC-BRACKET
tags: [soccer,football,voetbal,analysis, analyse, elo,voorspelling,forecast]
alias: [/DOMESTIC-BRACKET/]
author: "Willem Lenaerts"
utilities: highlight
header-img: ""
thumbnail-img: "img/Euro-2016-Logo.png"
projectname: "DOMESTIC BRACKET"
---
<!--<script type="text/javascript" src="/js/jQuery/jquery-1.11.1.min.js"></script>-->
<link rel="stylesheet" type="text/css" href="/css/projects/domestic-bracket/css.css" />

<!--<script type="text/javascript" src="/js/bootstrap.table.js"></script>-->
<link rel="stylesheet" type="text/css" href="/css/bootstrap.table.css" />
<link rel="stylesheet" type="text/css" href="/css/toggle-switch/toggle-switch.css" />

<script src="/js/tablesorter/jquery.tablesorter.min.js"></script>
<script src="/js/ddSlick/ddSlick.js"></script>

<script type="text/javascript" src="https://www.google.com/jsapi"></script>

<script type="text/javascript" src="/js/domestic-bracket/js.js"></script>

<script src="/js/moment/moment.js"></script>

<script src="//d3js.org/d3.v3.min.js" charset="utf-8"></script>

<script src="//d3js.org/topojson.v1.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjs/2.6.0/math.min.js"></script>
<script>
$( document ).ready(function() {
// Parameters
if ($(window).width() > 1200) {
  view = "bracket"
} else {
  view = "table"
}
view = "bracket"
country = "England"
frozen = false
clicked = false
clicked_header = false 
slide_games = false

$("body").on("click",function() {
    if (clicked_header || slide_games) {
        clicked_header = false;
        slide_games = false;
        return false;
    }
    // if (slide_games) {
    //     return false;
    // }    
    if (!frozen) {
        if (clicked) {
            frozen = true
        } else {
            frozen = false
        }
        return false;
    }
    clicked = false
    frozen = false
    mouseout_ranking()
})

// Create Brackets
buildBracket(view, country)

})

</script>

<div id="container" class="col-lg-12 col-lg-offset-0">