---
layout: project-full-width
title: "Geschiedenis Verkiezingen België"
tags: [geo, maps, belgium, flanders, spel]
category: project
permalink: geschiedenis-verkiezingen-belgie
alias: [/geo-game/]
author: "Willem Lenaerts"
utilities: highlight
header-img: ""
thumbnail-img: "img/verkiezingen-belgie.JPG"
projectname: "Geschiedenis Verkiezingen België"
---
<link rel="stylesheet" type="text/css" href="/css/projects/verkiezingen-belgie/verkiezingen-belgie.css" />


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

<script src="/js/timeline/timeline.js"></script>

<script src="/js/vis/vis.min.js"></script>
<link rel="stylesheet" type="text/css" href="/css/vis/vis.min.css" />
<script>
  // {#On document ready, load stuff#}
  partijkleuren = {{ site.data.verkiezingen-belgie.partijkleuren | jsonify }}
  verkiezingsdata = {{ site.data.verkiezingen-belgie.verkiezingsdata | jsonify }}
  lijst_gemeenten = {{ site.data.verkiezingen-belgie.lijst_gemeenten | jsonify }}
  rijk = {{ site.data.verkiezingen-belgie.Rijk | jsonify }}
</script>

<script>
$( document ).ready(function() {
  
  // Global variables
  start_year = "25-05-2014"
  start_year_index = verkiezingsdata.indexOf(start_year)
  year = start_year
  stroke_width = 0.4
  tabel_rijen_lg = 8
  tabel_rijen_md = 3
  tabel_rijen_sm = 2
  tabel_rijen_xs = 1
  
  // Some JS CSS 
  // Center verkiezingen tabel
  $("#verkiezing_tabel").parent().addClass("center-block")
  
  // Center typeahead hints
  $("#kies_gemeente").width($("#kies_gemeente_input").width())
  
  // Creëer Input met lijst gemeenten
  var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
      var matches, substringRegex;
  
      // an array that will be populated with substring matches
      matches = [];
  
      // regex used to determine if a string contains the substring `q`
      substrRegex = new RegExp(q, 'i');
  
      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the `matches` array
      $.each(strs, function(i, str) {
        if (substrRegex.test(str)) {
          matches.push(str);
        }
      });
      cb(matches);
    };
  };
  
  $('#kies_gemeente .typeahead').typeahead({
    hint: false,
    highlight: true,
    minLength: 2
  },
  {
    name: 'gemeenten',
    source: substringMatcher(lijst_gemeenten)
  })
  .on("input", function(e) {
  // Store input in global variable
  kies_gemeente_input = e.target.value; // `$(e.target).typeahead("val")
  });
  
  
  // Bindt acties aan typeahead input
  // 1. Via eigen API (bij selecteren suggestie)
  $('.typeahead').bind('typeahead:select', function(ev, gemeente_naam) {
    // Zoom in op gemeente
    kies_gemeente_input = gemeente_naam
    gemeente = gemeenten.features.filter(function(feature) { return feature.properties.naam === gemeente_naam; })[0];
    zoomGemeente(gemeente)
    // zoom_var = 1
  });
  
  // 2. Via eigen API (bij autocomplete)
  $('.typeahead').bind('typeahead:autocomplete', function(ev, gemeente_naam) {
    // Zoom in op gemeente
    kies_gemeente_input = gemeente_naam
    gemeente = gemeenten.features.filter(function(feature) { return feature.properties.naam === gemeente_naam; })[0];
    zoomGemeente(gemeente)
    
    // Sluit suggesties
    $('.typeahead').typeahead('close');
  });  
  // 3. Bij klikken op ENTER 
  document.getElementById('kies_gemeente_input').onkeypress = function(e){
      if (!e) e = window.event;
      var keyCode = e.keyCode || e.which;
      if (keyCode == 13){
        // Enter pressed
        if (lijst_gemeenten.indexOf(kies_gemeente_input) > -1) {
          // Sluit suggesties
          $('.typeahead').typeahead('close');
          
          // Zoom in op gemeente
          gemeente = gemeenten.features.filter(function(feature) { return feature.properties.naam === kies_gemeente_input; })[0];
          zoomGemeente(gemeente);
          // zoom_var = 1
        } else {
          return false;
        }
      }
  }

  //////////////////////////////////////////////////////////////////////////////
  // Scrollbar
  // // Creëer ticks
  // ticks = []
  // ticks_positions = []
  // ticks_labels = []
  // for (i=0;i<verkiezingsdata.length;i++) {
  //     ticks_positions.push((100/167)*parseInt(verkiezingsdata[i].split("-")[2]) - (184700/167))
  //     ticks.push(i)
      
  //     // Vermijdt identieke ticks
  //     if (ticks_positions[ticks_positions.length - 1] == ticks_positions[ticks_positions.length - 2]) {
  //       ticks_positions[ticks_positions.length - 1] += 50/167
  //     }
      
  //     // Aantal Labels
  //     if (parseInt(verkiezingsdata[i].split("-")[2])%25 == 0) {
  //       ticks_labels.push(verkiezingsdata[i].split("-")[2])
  //     } else {
  //       ticks_labels.push("")
  //     }
  //   }
    
  
  
  verkiezingen_slider = $("#verkiezingen_slider").slider({
    // Options
    min: 0,
    max: verkiezingsdata.length-1,
    step: 1,
    value: verkiezingsdata.length-1,
    tooltip: "hide",
    tooltip_position: "bottom",
    // ticks: ticks,
    // ticks_positions:ticks_positions,
    // ticks_labels:ticks_labels,
    // ticks_snap_bounds: 0
    formatter: function(i) {
      return verkiezingsdata[i]
    }
  });
  
  // Set slider background
  kleur_slider = "rgba(0,0,0,0.6)"
  $(".slider-selection").css("background-image","linear-gradient(" + kleur_slider +  "0%, " + kleur_slider + "100%)")
  $(".slider-track-high").css("background-image","linear-gradient(" + kleur_slider +  "0%, " + kleur_slider + "100%)")
  
  // Initialiseer kleur slider
  if (rijk[verkiezingsdata[start_year_index]]["Partijen"].length != 0) {
    kleur_slider = partijkleuren[rijk[verkiezingsdata[start_year_index]]["Partijen"][0]]
  } else {
    kleur_slider = partijkleuren["None"]
  }
  
  $(".slider-handle").css("background-image","linear-gradient(" + kleur_slider +  "0%, " + kleur_slider + "100%)")
  $(".slider-handle").css("background-color",kleur_slider)
  
  slider_ticks = $(".slider-tick")
  for (i=0;i<slider_ticks.length;i++) {
    // Verander kleur slider
    if (rijk[verkiezingsdata[i]]["Partijen"].length != 0) {
      kleur_slider = partijkleuren[rijk[verkiezingsdata[i]]["Partijen"][0]]
    } else {
      kleur_slider = partijkleuren["None"]
    }
    $(".slider-tick")[i].style.backgroundImage = "linear-gradient(" + kleur_slider +  "0%, " + kleur_slider + "100%)"
  }
  
  $("#verkiezingen_slider").on("change", function(e) {
    // Verander kleur slider
    if (rijk[verkiezingsdata[e.value.newValue]]["Partijen"].length != 0) {
      kleur_slider = partijkleuren[rijk[verkiezingsdata[e.value.newValue]]["Partijen"][0]]
    } else {
      kleur_slider = partijkleuren["None"]
    }
    
    $(".slider-handle").css("background-image","linear-gradient(" + kleur_slider +  "0%, " + kleur_slider + "100%)")
    $(".slider-handle").css("background-color",kleur_slider)
    
    // Verander map
    updateMap(verkiezingsdata[e.value.newValue])
    
    // Verander tabel
    updateVerkiezingTabel(kies_gemeente_input)
    
    // Verander text
    updateTekstTabel(verkiezingsdata[e.value.newValue])
  })
});
</script>
<script>
  function createDataPoint(index) {
    d = []
    // for (i=0;i<verkiezingsdata.length;i++) {
      if (rijk[verkiezingsdata[index]]["Partijen"].length != 0) {
        grootste_partij = rijk[verkiezingsdata[index]]["Partijen"][0]
        kleur_grootste_partij = partijkleuren[grootste_partij]
      } else {
        grootste_partij = ""
        kleur_grootste_partij = partijkleuren["None"]
      }
      
     d.push({
       id: index,
       start: new Date(verkiezingsdata[index].split("-")[2],verkiezingsdata[index].split("-")[1],verkiezingsdata[index].split("-")[0]), //moment(verkiezingsdata[i],"DD-MM-YYYY").unix()
       style: "background-color:" + kleur_grootste_partij,
       content: grootste_partij,
       template: function (item) {
      return '';
    }
     })
    // }
    return d
  }


  function onSelect (properties) {
    if (properties.items.length == 0) {
      return false;
    }

    i = properties.items[0]
    
    if (rijk[verkiezingsdata[i]]["Partijen"].length != 0) {
      grootste_partij = rijk[verkiezingsdata[i]]["Partijen"][0]
    } else {
      grootste_partij = ""
    }
    
    for (j=0;j<verkiezingsdata.length;j++) {
      if (j == i) {
        timelineData.update({id: j, content: grootste_partij}); // triggers an 'update' event
      } else {
        timelineData.update({id: j, content: ""}); // triggers an 'update' event
      }
      
    }
    
  }
</script>
<script>
d3.select(window)
  .on("resize", sizeChange);

// "http://www.sway-blog.be/data/verkiezingen-belgie/GemeentenBelgieTopoJson.json"
// "http://www.sway-blog.be/data/verkiezingen-belgie/GemeentenBelgieTopoJson.json"
// "https://s3.eu-central-1.amazonaws.com/verkiezingen-belgie/GemeentenBelgieTopoJson.json"
url = "http://www.sway-blog.be/data/verkiezingen-belgie/GemeentenBelgieTopoJson.json" 
ajax_call = $.ajax({
          url: url,
          dataType: 'json',
          crossDomain: true, // enable this
        })

$.when(ajax_call).done(function(json){
  // console.log(json)
  
  // Update text
  updateTekstTabel(year)
   
  width = $("#map").width()
  height = $(window).height() - $("#inputs").height() - $("#project_titel").height() - $("#project_uitleg").height() - 50 - 21 //50 is the margin from the top
  svg = d3.select("#map").append("svg")
      .attr("id","svg_map")
      .attr("width", width)
      .attr("height", height)
      .on("click", stopped, true);

  active = d3.select(null); // For zooming in after click on gemeente
  
  // Load GeoJson Data
  gemeenten = topojson.feature(json, json.objects.gemeenten);
  
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
  // Create a unit projection.
  projection = d3.geo.albers()
    // .center([4.65, 50.7])
    .rotate([0, 0])
    .scale(1)
    .translate([0, 0]);
      
  // Create a path generator.
  path = d3.geo.path()
      .projection(projection);
  
  // Compute the bounds of a feature of interest, then derive scale & translate.
  b = path.bounds(gemeenten),
  s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
  t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];
  
  // Update the projection to use computed scale & translate.
  projection
      .scale(s)
      .translate(t);
  
  path = d3.geo.path()
      .projection(projection);
      
  // Zoom variable (1 when zoomed on gemeente)
  zoom_var = 0
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
  zoom = d3.behavior.zoom()
      .scaleExtent([1, 8])
      .on("zoom", zoomed);
      
  div = d3.select("body").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);
  
  div.append('div')                        
    .attr('class', 'naam');               
  
  g = svg.append("g")
          .attr("class", "gemeenten")
          .selectAll("path")
          .data(gemeenten.features)
          .enter().append("path")
          .attr("d", path)
          .attr("class","gemeente")
          .attr("id",function(d) {
             return d.properties.naam.split("#")[0];
          })
          .attr('fill',function(d) {
             return colorfade(partijkleuren[d.properties[year][0]],d.properties[year][1]); // colorfade(partijkleuren[d.properties[year][0]],d.properties[year][1])
          })
          .attr('stroke',"#000000")
          .attr('stroke-width',String(stroke_width) + "px")
          .on("click", zoomGemeente)
          .on("mouseover", tooltip)
          .on("mouseout", tooltip_mousout)
 
  // Initiate Zoom
  svg
    .call(zoom)
    .call(zoom.event)
  // sizeChange()
  
  // Initiate Slider position
  // $("#verkiezingen_slider").slider('setValue',verkiezingsdata.length-1)

    
  // Verander tabel
  updateVerkiezingTabel(kies_gemeente_input)
    
  });
  // Tooltip generator
  function tooltip(d) {
    // Only display when not zoomed in on gemeente
    if (zoom_var != 0) {
      return false;
    }
    
    // Only display when data available
    if (d.properties[year][0] == "None") {
      $("#verkiezing_tabel_tooltip").hide()
      $("#verkiezing_tabel").show()
      return false;
    } 

    // Add text to kies gemeente
    $('.typeahead').typeahead('val', d.properties.naam.split("#")[0]);
    
    // Add to tabel and show
    verkiezing_tabel_tooltip = ""
    verkiezing_tabel_tooltip += "<tr><td class='tabel-partij'>" + d.properties[year][0] + "</td>"
    if (d.properties[year][1] == 0) {
      verkiezing_tabel_tooltip += "<td class='tabel-procent'>" + '-' +"</td></tr>"  
    } else {
      verkiezing_tabel_tooltip += "<td class='tabel-procent'>" + d.properties[year][1] + " %"   +"</td></tr>" 
    }
    
    // Voeg toe aan verkiezing tabel
    $("#verkiezing_tabel_tooltip").html(verkiezing_tabel_tooltip)
    $("#verkiezing_tabel_tooltip").show()
    $("#verkiezing_tabel").hide()
    
    // Positioneer tabel
    positionVerkiezingTabel()
    // // HTML of Tooltip Table
    // tabel = "<table><tr><th colspan='2' class='tooltip-titel'>" + d.properties.naam + "</th></tr>"
    // tabel += "<tr><td class='tooltip-partij'>" + d.properties[year][0] + "&nbsp;&nbsp;</td>"
    // if (d.properties[year][1] == 0) {
    //   tabel += "<td class='tooltip-procent'>" + '-' + "</td></tr>"
    // } else {
    //   tabel += "<td class='tooltip-procent'>" + d.properties[year][1] + " %" + "</td></tr>"
    // }
    
    // tabel += "</table>" 
    
    // // Append to div
    // d3.select(this).transition().duration(300).style("opacity", 1);
    // div.transition().duration(300)
    //   .style("opacity", 1)
    //   div.html(tabel)
    //   .style("left", (d3.event.pageX) + "px")
    //   .style("top", (d3.event.pageY -30) + "px");
  }
  
  function tooltip_mousout(d) {
    // Only act when not zoomed in on gemeente
    if (zoom_var != 0) {
      return false
    }
    
    $("#verkiezing_tabel_tooltip").hide()
    $("#verkiezing_tabel").show()

    // Remove text
    $('.typeahead').typeahead('val', "");
    
    // Bereken positie
    positionVerkiezingTabel()
    
    // d3.select(this)
    // .transition().duration(300)
    // .style("opacity", 1);
    // div.transition().duration(300)
    // .style("opacity", 0);
  }
  
  function reset() {
    active.classed("active", false);
    active = d3.select(null);
        
    g.transition()
        .duration(750)
        .style("stroke-width", String(stroke_width) + "px")
        .attr("transform", "");
    
    // Return tooltip
    $("#verkiezing_tabel_tooltip").hide()
    $("#verkiezing_tabel").show()
    
    // Bereken positie
    positionVerkiezingTabel() 
    
    // Remove text
    $('.typeahead').typeahead('val', "");
    
    // Zoom variable
    zoom_var = 0

    // Verander tabel
    // kies_gemeente_input = ""
    updateVerkiezingTabel(kies_gemeente_input)
  }
  function zoomGemeente(d) {
    // Zoom variable
    zoom_var = 1
    
    // kies_gemeente_input variable
    kies_gemeente_input = d.properties.naam
    
    if (this == window) {
      path_zoomed = d3.select("#" + d.properties.naam.split("#")[0])[0][0]
    } else {
      path_zoomed = this
    }
  
    if (active.node() === path_zoomed) return reset();
    active.classed("active", false);
    active = d3.select(path_zoomed).classed("active", true); 
  
    var bounds = path.bounds(d),
        dx = bounds[1][0] - bounds[0][0],
        dy = bounds[1][1] - bounds[0][1],
        x = (bounds[0][0] + bounds[1][0]) / 2,
        y = (bounds[0][1] + bounds[1][1]) / 2,
        scale = .9 / Math.max(dx / width, dy / height),
        translate = [width / 2 - scale * x, height / 2 - scale * y];
  
    // projection.translate(translate)
    // projection.scale(scale)
    
    // zoom.translate(translate)
    // zoom.scale(scale)
    g.transition()
        .duration(750)
        .style("stroke-width", stroke_width/scale +  "px")
        .attr("transform", "translate(" + translate + ")scale(" + scale + ")");
    
    // Remove remnant of tooltip
    div.style("display","none")
      
    // Add text to kies gemeente
    $('.typeahead').typeahead('val', d.properties.naam.split("#")[0]);
    
    // Verander tabel
    updateVerkiezingTabel(kies_gemeente_input)
  }
  // Function to cycle through years
  function updateMap(y) {
    year = y
    d3.selectAll('.gemeente').transition()  //select all the countries and prepare for a transition to new values
      .duration(0)  // give it a smooth time period for the transition
      .attr('fill',function(d) {
           return  colorfade(partijkleuren[d.properties[year][0]],d.properties[year][1]);
      })
      
    // Change slider 
    verkiezingen_slider.slider('setValue',verkiezingsdata.indexOf(year))
    // $('#verkiezingen_slider').val(verkiezingsdata.indexOf(year)).change();

  }

  // Function to cycle through years
  function updateTekstTabel(y) {
    year = y
    
    // backgroundcolor = colorfade(partijkleuren[rijk[year]["Partijen"][0]],21)
    backgroundcolor = partijkleuren[rijk[year]["Partijen"][0]]
    backgroundcolor = backgroundcolor.replace("rgb(","rgba(")
    backgroundcolor = backgroundcolor.replace(")",",0.8)")
    
    // Update text 
    tekst_tabel = ""
    tekst_tabel += "<tr style='background:" + backgroundcolor + "'>" + "<td class='tabel-partij'>" + 'Datum' + "</td>"
    tekst_tabel += "<td class='tabel-procent'>" + year +"</td></tr>"
    tekst_tabel += "<tr class='hidden-sm hidden-xs' style='background:" + backgroundcolor + "'>" + "<td class='tabel-partij'>" + 'Verkiezing' + "</td>"
    tekst_tabel += "<td class='tabel-procent'>" + "Kamer"  +"</td></tr>"   
    tekst_tabel += "<tr class='hidden-sm hidden-xs' style='background:" + backgroundcolor + "'>" + "<td class='tabel-partij'>" + 'Stemmen' + "</td>"
    tekst_tabel += "<td class='tabel-procent'>" + formatNumber(rijk[year]["Uitgebrachte Stemmen"]) + "</td></tr>"    
    
    if (rijk[year]["Partijen"].length != 0) {
      tekst_tabel += "<tr style='background:" + backgroundcolor + "'>" + "<td class='tabel-partij'>" + 'Grootste Partij' + "</td>"
      tekst_tabel += "<td class='tabel-procent'>" + rijk[year]["Partijen"][0] + "</td></tr>"
    }
    
    // Append to table in DOM
    $("#tekst_tabel").html(tekst_tabel)
  }
    
  // Zoom functions
  
  function sizeChange() {
      // Recalculate container size
      width = $("#map").width()
      height = $(window).height() - $("#inputs").height() - $("#project_titel").height() - $("#project_uitleg").height() - 50 - 21 //50 is the margin from the top
      
      // Compute the bounds of a feature of interest, then derive scale & translate.
      b = path.bounds(gemeenten),
      
      s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
      t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];
      // width = $("#map").width()
      // height = $(window).height() - $("#inputs").height() - 50 //50 is the margin from the top
      
      // Change translate and scale
      d3.select("g").attr("transform", "translate(" + t + ")scale(" + s + ")");  
      
      // Change height/width of svg
      svg.attr("width",width)
      svg.attr("height",height)
      
      // Change stroke_width
      d3.select("g").style("stroke-width", stroke_width / d3.event.scale + "px");
      
    positionVerkiezingTabel()
  }
  function positionVerkiezingTabel() {
      // Herpositioneer tabel
      margin_top = ($(window).height() - ($("#project_titel").height() + 50) - $("#project_uitleg").height() - $("#inputs").height() - ($("#tekst_wrapper").height() + 21) - $("#tabel_wrapper").height()-10)/2
      
      if ($(window).width() < 1200) { // xs,sm,md screens
        margin_top = 0
      }
      if (margin_top > 0) {
        $("#tabel_wrapper").css("margin-top",margin_top)
        $("#tabel_wrapper").css("padding-bottom",margin_top)
      } else {
        $("#tabel_wrapper").css("margin-top",0)
        $("#tabel_wrapper").css("padding-bottom",0)
      }
  }
  function zoomed() {
    // projection.translate(d3.event.translate).scale(d3.event.scale);
    // g.selectAll("path").attr("d", path);
    
    g.style("stroke-width", stroke_width / d3.event.scale + "px");
    g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  }
  // If the drag behavior prevents the default click,
  // also stop propagation so we don’t click-to-zoom.
  function stopped() {
    if (d3.event.defaultPrevented) d3.event.stopPropagation();
  }
  // Calculate color of gemeente based on %
  function colorfade(rgb,percent) {
    if (percent == "None") {
        return rgb
    }
    if (percent == 0) { // Sterkste partij gekend, percentage onbekend
      percent = 30 // Zet kleur alsof percent 30 is
    }
    
    // Als percent = 0 ==> opacity = 0
    // Als percent = 25 ==> opacity = 0.7
    // Als percent >= 50 ==> opacity = 1
    if (percent > 50) {
      opacity = 1
    } else {
      opacity = (-2/6250)*Math.pow(percent,2) + ((1 + (5000/6250))/50)*percent
    }
    
    rgba = rgb.replace("rgb(","rgba(")
    rgba = rgba.replace(")","," + String(opacity) + ")")
    
    return rgb //rgba
  }
  
  function updateVerkiezingTabel(gemeente_string) {
   
    // Als niet ingezoomd op gemeente, Rijk data
    if (zoom_var == 0) {
      gemeente_string = "Rijk"
      url =  "http://www.sway-blog.be/data/verkiezingen-belgie/gemeenten/Rijk.json"  // "https://s3.eu-central-1.amazonaws.com/verkiezingen-belgie/gemeenten/Rijk.json"
    } else {
      url =  "http://www.sway-blog.be/data/verkiezingen-belgie/gemeenten/" + String(lijst_gemeenten.indexOf(gemeente_string)) + ".json" 
      // "https://s3.eu-central-1.amazonaws.com/verkiezingen-belgie/gemeenten/" + String(lijst_gemeenten.indexOf(gemeente_string)) + ".json"
    }
    
    // Get data
    ajax_call = $.ajax({
              url: url,
              dataType: 'json',
              crossDomain: true, // enable this
            })
    
    $.when(ajax_call).done(function(json){
      // Create table
      // Head
      verkiezing_tabel = "" // "<tr><th colspan='2' class='' style='text-align:center;'>" + json[year]["Data"] + "</th></tr>"
      
      // Rows Math.min(json[year]["Partijen"].length,5)
      for (i=0;i<Math.min(json[year]["Partijen"].length,tabel_rijen_lg);i++) {
        if (i < tabel_rijen_xs) {
          verkiezing_tabel += "<tr><td class='tabel-partij'>" + json[year]["Partijen"][i] + "</td>"
          verkiezing_tabel += "<td class='tabel-procent'>" + json[year]["Procent"][i]  +"</td></tr>"          
        } else if (i < tabel_rijen_sm) {
          verkiezing_tabel += "<tr class='hidden-xs'><td class='tabel-partij'>" + json[year]["Partijen"][i] + "</td>"
          verkiezing_tabel += "<td class='tabel-procent'>" + json[year]["Procent"][i]  +"</td></tr>"          
        } else if (i< tabel_rijen_md) {
          verkiezing_tabel += "<tr class='hidden-xs hidden-sm'><td class='tabel-partij'>" + json[year]["Partijen"][i] + "</td>"
          verkiezing_tabel += "<td class='tabel-procent'>" + json[year]["Procent"][i]  +"</td></tr>"            
        } else {
          verkiezing_tabel += "<tr class='hidden-md hidden-xs hidden-sm'><td class='tabel-partij'>" + json[year]["Partijen"][i] + "</td>"
          verkiezing_tabel += "<td class='tabel-procent'>" + json[year]["Procent"][i]  +"</td></tr>"          
        }

      }
    
        
      // Voeg bron van data toe
      if (json[year]["Partijen"].length != 0) {
        verkiezing_tabel += "<tr><td colspan='2' class='tabel-procent'>Bron: " + json[year]["Data"]  +"</td></tr>" 
      }
      
      // Voeg toe aan verkiezing tabel
      $("#verkiezing_tabel").html(verkiezing_tabel)
      
      // Hide and show
      $("#verkiezing_tabel_tooltip").hide()
      $("#verkiezing_tabel").show()
      
      // Bereken positie
      positionVerkiezingTabel()
    })
  }
  
  function formatNumber(number) {
    var numberString = String(number)
    if (numberString.length < 4) {
    } else {
      if (numberString.length < 7) {
        numberString = numberString.slice(0,numberString.length-3) + "." + numberString.slice(numberString.length-3,numberString.length)
      } else {
        numberString =  numberString.slice(0,numberString.length-6) + "." 
                      + numberString.slice(numberString.length-6,numberString.length-3) + "." 
                      + numberString.slice(numberString.length-3,numberString.length)
      }
    }
    return numberString
  }  
  
  // count = 0
  // year_loop = setInterval(function(){ 
  //     year =  verkiezingsdata[count]
  //     updateMap(year) 
  //     count += 1
      
  //     if (count == verkiezingsdata.length) {
  //       clearInterval(year_loop)
  //     }
  //   }, 21);
</script>

<div id="project_titel" class="row" style="margin-top:50px;">
  <div class="col-lg-8 col-lg-offset-2">
      <h1 class="project_titel">De Geschiedenis van Belgische Verkiezingen</h1>
      <h1 class="col-lg-12 col-md-12 hidden-sm hidden-xs" style="border-bottom:1px black solid;"></h1>
  </div>
</div>
        
<div id="project_uitleg" class="row">
  <div class="col-lg-8 col-lg-offset-2 col-md-12 hidden-sm hidden-xs">
      <p style="text-align:justify;">De complete geschiedenis van de uitslagen van de Belgische verkiezingen voor de Kamer van Volksvertegenwoordigers van 1847 tot 2014. 
      De uitslagen zijn beschikbaar voor elke verkiezing en elke gemeente. De data is afkomstig van <a href="http://www.electiondataarchive.org/">CLEA</a> en 
      <a href="http://www.ibzdgip.fgov.be/result/nl/main.html">IBZDGIP</a>, aangevuld met verscheidene andere bronnen.</p>
  </div>
</div>

<div id="inputs" class="row"> <!--  style="margin-top:50px;"-->
  <div class="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12">
    <h1 class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="border-bottom:1px black solid;"></h1>
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="text-align:center;">
      <p style="font-size: 15px;font-weight: 600;">Kies Verkiezing:</p>
    </div>
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <div class="col-lg-12">
        <input id="verkiezingen_slider" type="text"></input>
      </div>
    </div>
    <h1 class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="border-bottom:1px black solid;"></h1>
  </div>
</div>  

<div class="row">
  <div id="info_wrapper" class="col-lg-3 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12"> <!--center-block || vertical-center-->
    <!--<h1 class="hidden-lg hidden-md col-sm-12 col-xs-12"></h1>-->
    <div id="tekst_wrapper" class="col-lg-12 col-lg-offset-0 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-12 col-xs-offset-0">
      <table id="tekst_tabel" class="table-condensed"></table>
    </div>
    <h1 class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="border-bottom:1px black solid;"></h1>
    <div id="tabel_wrapper" class="col-lg-12 col-md-12">
      <div class="col-lg-12">
        <!--<h1 class="hidden-lg hidden-md col-sm-12 col-xs-12"></h1>-->
        <div id="kies_gemeente" class="col-centered">
          <input id="kies_gemeente_input" class="typeahead" type="text" placeholder="Kies Gemeente">
        </div>
      </div>
      <div class="col-lg-12 col-lg-offset-0 col-sm-8 col-sm-offset-2 col-xs-12 col-xs-offset-0">
        <table id="verkiezing_tabel_tooltip" class="verkiezing_tabel table-condensed" style="display:none;"></table>
        <table id="verkiezing_tabel" class="verkiezing_tabel table-condensed"></table>
      </div>
    </div>
    <h1 class="hidden-lg col-md-12 col-sm-12 col-xs-12" style="border-bottom:1px black solid;"></h1>
  </div>
  
  <div id="map_wrapper" class="col-lg-7 col-md-12 col-sm-12 col-xs-12">
    <div id="map"></div>
  </div>
</div>