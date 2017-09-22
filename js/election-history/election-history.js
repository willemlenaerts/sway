// Tooltip generator
function tooltip(d) {
  // Only display when not zoomed in on constituency
  if (zoom_var != 0) {
    return false;
  }
  
  // Only display when data available
  if (d.properties[date][0] == "None") {
    $("#election_table_tooltip").hide()
    $("#election_table").show()
    return false;
  } 

  // Add text to kies constituency
  $('.typeahead').typeahead('val', d.properties.n.split("#")[0]);
  
  // Add to table and show
  election_table_tooltip = "<tbody style='border:solid 2px'>"
  election_table_tooltip += "<tr><td class='table-party'>" + d.properties[date][0] + "</td>"
  if (d.properties[date][1] == 0) {
    election_table_tooltip += "<td class='table-percent'>" + '-' +"</td></tr>"  
  } else {
    election_table_tooltip += "<td class='table-percent'>" + Math.round(10000*d.properties[date][1])/100 +"</td></tr>"  // + " %"   
  }
  
  election_table_tooltip += "</tbody>"
  election_table_tooltip += "<tr><td colspan='2' style='font-size: 12px;text-align:center;font-style: italic;'>Click on Constituency for Full Result</td></tr>"
  
  // Voeg toe aan verkiezing table
  $("#election_table_tooltip").html(election_table_tooltip)
  $("#election_table_tooltip").show()
  $("#election_table").hide()
  
  // Positioneer table
  // positionElectionTable()
}

function tooltip_mousout(d) {
  // Only act when not zoomed in on constituency
  if (zoom_var != 0) {
    return false
  }
  
  $("#election_table_tooltip").hide()
  $("#election_table").show()

  // Remove text
  $('.typeahead').typeahead('val', "");
  
  // Bereken positie
  // positionElectionTable()
}

function reset() {
  active.classed("active", false);
  active = d3.select(null);
      
  g.transition()
      .duration(750)
      .style("stroke-width", String(stroke_width) + "px")
      .attr("transform", "");
  
  // Return tooltip
  $("#election_table_tooltip").hide()
  $("#election_table").show()
  
  // Bereken positie
  // positionElectionTable() 
  
  // Remove text
  $('.typeahead').typeahead('val', "");
  
  // Zoom variable
  zoom_var = 0

  // Verander table
  choose_constituency_input = ""
  updateElectionTable(choose_constituency_input)
}

function fillConstituency(d) {
// CountryCode
CountryCode = d.properties.c
if (typeof election_dates[CountryCode] == 'undefined') {
  return color_no_data;
} else if (d.properties[date][0] == "None") {
  return color_no_data;
}

return party_colors[CountryCode][d.properties[date][0]];
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

function zoomConstituency(d) {
// Zoom variable
zoom_var = 1

// choose_constituency_input variable
if (typeof d.properties.n == 'undefined') {
  choose_constituency_input = d.properties.c
} else {
  choose_constituency_input = d.properties.n
}  
// choose_constituency_input = d.properties.name

if (this == window) {
  path_zoomed = d3.select("#" + choose_constituency_input.split("#")[0])[0][0]
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

g.transition()
    .duration(750)
    .style("stroke-width", stroke_width/scale +  "px")
    .attr("transform", "translate(" + translate + ")scale(" + scale + ")");
  
// // Add text to kies constituency
$('.typeahead').typeahead('val', d.properties.n);

// // Verander table
updateElectionTable(choose_constituency_input)
}

// Function to cycle through years
function updateMap() {
  d3.selectAll('.constituency').transition()  //select all the countries and prepare for a transition to new values
    .duration(0)  // give it a smooth time period for the transition
    .attr('fill',fillConstituency)
}

function updateTextTable() {
  
  // Get Country Data
  url =  "http://www.sway-blog.be/data/election-history/ADM" + String(admin_level) + "/country/" + country + "/" + country + ".json"
  
  ajax_call = $.ajax({
        url: url,
        dataType: 'json',
        crossDomain: true, // enable this
      })

$.when(ajax_call).done(function(json) {
  
  // backgroundcolor = colorfade(party_colors[json[date]["Parties"][0]],21)
  backgroundcolor = party_colors[country][json[date]["Parties"][0]]
  backgroundcolor = backgroundcolor.replace("rgb(","rgba(")
  backgroundcolor = backgroundcolor.replace(")",",0.4)")
  
  // Update text 
  text_table = "<tbody style='border:solid 2px " + backgroundcolor + "'>"
  // text_table += "<tr style='background:" + backgroundcolor + "'>" + "<td class='table-party'>" + 'Date' + "</td>"
  // text_table += "<td class='table-percent'>" + date +"</td></tr>"
  // text_table += "<tr class='hidden-sm hidden-xs' style='background:" + backgroundcolor + "'>" + "<td class='table-party'>" + 'Verkiezing' + "</td>"
  // text_table += "<td class='table-percent'>" + "Kamer"  +"</td></tr>"  
  // background:" + backgroundcolor + ";
  text_table += "<tr class='' >" + "<td class='table-party'>" + 'Total Votes' + "</td>" // hidden-sm hidden-xs
  text_table += "<td class='table-percent'>" + formatNumber(json[date]["Total Votes"]) + "</td></tr>"    
  
  if (json[date]["Parties"].length != 0) {
    text_table += "<tr class='' >" + "<td class='table-party'>" + 'Largest Party' + "</td>"
    text_table += "<td class='table-percent'>" + json[date]["Parties"][0] + "</td></tr>"
  }
  
  text_table += "</tbody>"
  // Append to table in DOM
  $("#text_table").html(text_table)
  
})
}

function sizeChange() {
  // Recalculate container size
  width = $("#map").width()
  height = $(window).height() - $("#inputs").height() - $("#project_title").height() - $("#project_explanation").height() - $("#general_info").height() - 50 - 20 - 20//50 is the margin from the top
  
  // Compute the bounds of a feature of interest, then derive scale & translate.
  b = path.bounds(geo),
  
  s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
  t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];
  // width = $("#map").width()
  // height = $(window).height() - $("#inputs").height() - 50 //50 is the margin from the top
  
  d3.select("g").attr("transform", "translate(" + t + ")scale(" + s + ")");  
  // d3.select("g").attr("transform", "scale(" + width/900 + ")");
  svg.attr("width",width)
  svg.attr("height",height)
 
 // positionElectionTable() 
}

function zoomed() {
g.style("stroke-width", stroke_width / d3.event.scale + "px");
g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

// If the drag behavior prevents the default click,
// also stop propagation so we don’t click-to-zoom.
function stopped() {
if (d3.event.defaultPrevented) d3.event.stopPropagation();
}

// Calculate color of constituency based on %
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

function generateMap() {

// "http://www.sway-blog.be/data/verkiezingen-belgie/constituenciesBelgieTopoJson.json"
url =  "http://www.sway-blog.be/data/election-history/ADM" + String(admin_level) + "/country/" + country + "/" + "topo_ADM" + String(admin_level) + "_" + country + ".json"
ajax_call = $.ajax({
        url: url,
        dataType: 'json',
        crossDomain: true, // enable this
      })

$.when(ajax_call).done(function(json) {

// 
updateTextTable()

// Define size of SVG
width = $("#map").width()
height = $(window).height() - $("#inputs").height() - $("#project_title").height() - $("#project_explanation").height() - $("#general_info").height() - 50 - 20 - 20//50 is the margin from the top
  
// Initialize SVG 
if (typeof svg == 'undefined') {
svg = d3.select("#map").append("svg")
    .attr("id","svg_map")
    .attr("width", width)
    .attr("height", height)
    .on("click", stopped, true);
} else {
// Remove path
path = svg.selectAll("path")
path.remove()
}

active = d3.select(null); // For zooming in after click on constituency

// Load GeoJson Data
geo = topojson.feature(json, json.objects["geo_ADM" + admin_level + "_" + country]);

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// Create a unit projection.

// projection = d3.geo.orthographic()
//   // .center([4.65, 50.7])
//   .rotate([0, 0])
//   .scale(1)
//   .translate([0, 0])
//   .clipAngle(90);

if (country == "USA") {
  projection = d3.geo.albersUsa()
    .scale(1)
    .translate([0, 0]);
} else {
  projection = d3.geo.mercator()
    // .center([4.65, 50.7])
    .rotate([0, 0])
    .scale(1)
    .translate([0, 0]);  
}

  
// Create a path generator.
path = d3.geo.path()
  .projection(projection);

// Compute the bounds of a feature of interest, then derive scale & translate.
b = path.bounds(geo),
s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

// Update the projection to use computed scale & translate.
projection
  .scale(s)
  .translate(t);

path = d3.geo.path()
  .projection(projection);
  

//   //Adding water

// svg.append("path")
//   .datum({type: "Sphere"})
//   .attr("class", "water")
//   .attr("d", path);

// Zoom variable (1 when zoomed on constituency)
zoom_var = 0


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
zoom = d3.behavior.zoom()
  .scaleExtent([1, 8])
  .on("zoom", zoomed);
  
// div = d3.select("body").append("div")   
//   .attr("class", "tooltip")               
//   .style("opacity", 0);

// div.append('div')                        
//   .attr('class', 'name');               
// graticule = d3.geo.graticule();
// filter = svg.append("defs")  
//             .append("filter")  
//             .attr("id", "drop-shadow")  
//             .attr("height", "130%");  
// filter.append("feGaussianBlur")  
//   .attr("in", "SourceAlpha")  
//   .attr("stdDeviation", 5)  
//   .attr("result", "blur");  
            
// filter.append("feOffset")  
//   .attr("in", "blur")  
//   .attr("dx", 5)  
//   .attr("dy", 5)  
//   .attr("result", "offsetBlur");

// feMerge = filter.append("feMerge");  

// feMerge.append("feMergeNode")  
//     .attr("in", "offsetBlur")  
// feMerge.append("feMergeNode")  
//     .attr("in", "SourceGraphic");  
  
// svg.append("path")  
//     .datum(graticule)  
//     .attr("class", "graticule")  
//     .attr("d", path); 
    
g = svg.append("g")
      .attr("class", "constituencies")
      .selectAll("path")
      .data(geo.features)
      .enter().append("path") // ,".graticule")  
      .attr("d", path)
      .attr("class","constituency")
      .attr("id",function(d) {
          if (typeof d.properties.n == 'undefined') {
            name = d.properties.c
          } else {
            name = d.properties.n
          }            
         return name;
      })
      .attr('fill',fillConstituency)
      .attr('stroke',"#000000")
      .attr('stroke-width',String(stroke_width) + "px")
      .on("click", zoomConstituency)
      .on("mouseover", tooltip)
      .on("mouseout", tooltip_mousout)
      // .style("filter", "url(#drop-shadow)");  
// Initiate Zoom
svg
.call(zoom)
.call(zoom.event)

  // Verander table
  updateElectionTable(choose_constituency_input)
  
  // Set 
  // $("#table_wrapper").height($("#map_wrapper").height() - $("#text_wrapper").height() -10)
  
  // Change size
  sizeChange()
})

}

function initializeConstituencyChoice() {
      // Some JS CSS 
  // Center verkiezingen table
  $("#election_table").parent().addClass("center-block")
  
  // Center typeahead hints
  $("#choose_constituency").width($("#choose_constituency_input").width())
  
  // Creëer Input met lijst constituencies
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
  
  $('#choose_constituency .typeahead').typeahead({
    hint: false,
    highlight: true,
    minLength: 2
  },
  {
    name: 'constituencies',
    source: substringMatcher(constituencies[country])
  })
  .on("input", function(e) {
  // Store input in global variable
  choose_constituency_input = e.target.value; // `$(e.target).typeahead("val")
  });
  
  
  // Bindt acties aan typeahead input
  // 1. Via eigen API (bij selecteren suggestie)
  $('.typeahead').bind('typeahead:select', function(ev, constituency_name) {
    // Zoom in op constituency
    choose_constituency_input = constituency_name
    constituency = geo.features.filter(function(feature) { return feature.properties.n === constituency_name; })[0];
    zoomConstituency(constituency)
    // zoom_var = 1
  });
  
  // 2. Via eigen API (bij autocomplete)
  $('.typeahead').bind('typeahead:autocomplete', function(ev, constituency_name) {
    // Zoom in op constituency
    choose_constituency_input = constituency_name
    constituency = geo.features.filter(function(feature) { return feature.properties.n === constituency_name; })[0];
    zoomconstituency(constituency)
    
    // Sluit suggesties
    $('.typeahead').typeahead('close');
  });  
  // 3. Bij klikken op ENTER 
  document.getElementById('choose_constituency_input').onkeypress = function(e){
      if (!e) e = window.event;
      var keyCode = e.keyCode || e.which;
      if (keyCode == 13){
        // Enter pressed
        if (constituencies[country].indexOf(choose_constituency_input) > -1) {
          // Sluit suggesties
          $('.typeahead').typeahead('close');
          
          // Zoom in op constituency
          constituency = geo.features.filter(function(feature) { return feature.properties.n === choose_constituency_input; })[0];
          zoomconstituency(constituency);
          // zoom_var = 1
        } else {
          return false;
        }
      }
  }
}
 
function initializeSlider()  {
  
  election_slider = $("#election_slider").slider({
    // Options
    min: 0,
    max: election_dates[country].length-1,
    step: 1,
    value: election_dates[country].length-1,
    tooltip: "hide",
    tooltip_position: "bottom",
    handle: 'square',
    // ticks: ticks,
    // ticks_positions:ticks_positions,
    // ticks_labels:ticks_labels,
    // ticks_snap_bounds: 0
    formatter: function(i) {
      return election_dates[country][i]
    }
  });

  // Set slider background
  color_slider = "rgba(0,0,0,0.7)"
  $(".slider-selection").css("background-image","linear-gradient(" + color_slider +  "0%, " + color_slider + "100%)")
  $(".slider-track-high").css("background-image","linear-gradient(" + color_slider +  "0%, " + color_slider + "100%)")
  
  // Initialiseer kleur slider
  // if (json[election_dates[start_year_index]]["Parties"].length != 0) {
  //   color_slider = party_colors[json[election_dates[start_year_index]]["Parties"][0]]
  // } else {
  //   color_slider = party_colors["None"]
  // }
  
  $(".slider-handle").css("background-image","linear-gradient(" + color_slider +  "0%, " + color_slider + "100%)")
  $(".slider-handle").css("background-color",color_slider)
  
  // slider_ticks = $(".slider-tick")
  // for (i=0;i<slider_ticks.length;i++) {
  //   // Verander kleur slider
  //   if (json[election_dates[i]]["Parties"].length != 0) {
  //     color_slider = party_colors[json[election_dates[i]]["Parties"][0]]
  //   } else {
  //     color_slider = party_colors["None"]
  //   }
  //   $(".slider-tick")[i].style.backgroundImage = "linear-gradient(" + color_slider +  "0%, " + color_slider + "100%)"
  // }
  
  $("#election_slider").on("change", function(e) {
    
    // // Verander kleur slider
    // if (json[verkiezingsdata[e.value.newValue]]["Parties"].length != 0) {
    //   kleur_slider = party_colors[json[verkiezingsdata[e.value.newValue]]["Parties"][0]]
    // } else {
    //   kleur_slider = party_colors["None"]
    // }
    
    // $(".slider-handle").css("background-image","linear-gradient(" + kleur_slider +  "0%, " + kleur_slider + "100%)")
    // $(".slider-handle").css("background-color",kleur_slider)
    
    // Check if playing
    if (typeof playing != 'undefined') {
      //Stop
      clearInterval(playing)
      
      // Hide and Show
      $("#play_button").show()
      $("#stop_button").hide()
    }
    
    // Change date
    date = election_dates[country][e.value.newValue]
    
    // Verander map
    updateMap()
    
    // Verander table
    updateElectionTable("Country")
    
    // Verander text
    updateTextTable()
    
    // Change dropdown
    date_year = parseInt(date.split("-")[0])
    date_month = parseInt(date.split("-")[1])
    
    if (date_month == 0) {
      date_string = String(date_year)
    } else {
      date_string = moment(date,"YYYY-MM").format("MMMM YYYY")
    }
  $(".dropdown-toggle").html(date_string) //  + "&nbsp;<span class='caret'></span>"
  })
  
  // Position dropdown
  $("#election_dropdown_list").css("margin-top",$("#dropdownMenu1").height())
  
  // Initialize slider on date
  election_slider.slider('setValue',election_dates[country].indexOf(date))
}

function updateElectionTable(constituency_string) {
 
  // Als niet ingezoomd op constituency, Rijk data
  if (zoom_var == 0) {
    constituency_string = "Country"
    url =  "http://www.sway-blog.be/data/election-history/ADM" + String(admin_level) + "/country/" + country + "/" + country + ".json"
  } else {
    url =  "http://www.sway-blog.be/data/election-history/ADM" + String(admin_level) + "/country/" + country  + "/constituency/" + String(constituencies[country].indexOf(constituency_string)) + ".json"
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
    election_table = "<tbody style='border:solid 2px'>" // "<tr><th colspan='2' class='' style='text-align:center;'>" + json[date]["Data"] + "</th></tr>"
    
    // Rows Math.min(json[date]["Parties"].length,5)
    for (i=0;i<Math.min(json[date]["Parties"].length,table_rows_lg);i++) {
      if (i < table_rows_xs) {
        election_table += "<tr><td class='table-party'>" + json[date]["Parties"][i] + "</td>"
        election_table += "<td class='table-percent'>" +  Math.round(10000*json[date]["Percent"][i])/100  +"</td></tr>"          
      } else if (i < table_rows_sm) {
        election_table += "<tr class='hidden-xs'><td class='table-party'>" + json[date]["Parties"][i] + "</td>"
        election_table += "<td class='table-percent'>" +  Math.round(10000*json[date]["Percent"][i])/100  +"</td></tr>"          
      } else if (i< table_rows_md) {
        election_table += "<tr class='hidden-xs hidden-sm'><td class='table-party'>" + json[date]["Parties"][i] + "</td>"
        election_table += "<td class='table-percent'>" +  Math.round(10000*json[date]["Percent"][i])/100  +"</td></tr>"            
      } else {
        election_table += "<tr class='hidden-md hidden-xs hidden-sm'><td class='table-party'>" + json[date]["Parties"][i] + "</td>"
        election_table += "<td class='table-percent'>" +  Math.round(10000*json[date]["Percent"][i])/100  +"</td></tr>"          
      }

    }
    
    election_table += "</tbody>"
    
    if (zoom_var == 0) {
       election_table += "<tr><td colspan='2' style='font-size: 12px;text-align:center;font-style: italic;'>General Election Result</td></tr>"
    }
    //
      
    // Voeg bron van data toe
    // if (json[date]["Parties"].length != 0) {
    //   election_table += "<tr><td colspan='2' class='table-percent'>Source: " + json[date]["Data"]  +"</td></tr>" 
    // }
    
    // Voeg toe aan verkiezing table
    $("#election_table").html(election_table)
    
    // Hide and show
    $("#election_table_tooltip").hide()
    $("#election_table").show()
    
    // Bereken positie
    // positionElectionTable()
  })
}

// function positionElectionTable() {
//     // Herpositioneer tabel
//     margin_top = ($(window).height() - ($("#project_title").height() + 50) - $("#project_explanation").height() - ($("#inputs").height()+20) - ($("#text_wrapper").height() + 21) - $("#table_wrapper").height()-10)/2
    
//     if ($(window).width() < 1200) { // xs,sm,md screens
//       margin_top = 0
//     }
//     if (margin_top > 0) {
//       $("#table_wrapper").css("margin-top",margin_top)
//       $("#table_wrapper").css("padding-bottom",margin_top)
//     } else {
//       $("#table_wrapper").css("margin-top",0)
//       $("#table_wrapper").css("padding-bottom",0)
//     }
// }

function initializeCountryChoice() {
    //Dropdown plugin data
    var ddData = [];
  
    for (i = 0;i<countries.length;i++) {
        if (countries[i] == country) {
          ddData.push({text: country_iso_to_name[countries[i]], value: i, selected:true, description:" ", imageSrc: "/img/CountryFlagsISO3/" + countries[i] + ".png"})
          
          country_index = i
            
        } else  {
          ddData.push({text: country_iso_to_name[countries[i]], value: i, selected:false, description:" ",imageSrc: "/img/CountryFlagsISO3/" + countries[i] + ".png"})
        }
    }
    
    wrapper_width = 1.4 * ($(".dd-selected-image").width() + $(".dd-selected-text").width())
    
    $('#select-country').ddslick({
      data: ddData,
      width: Math.min(Math.max(wrapper_width,200),400),
      height: 300,
      imagePosition: "center",
      selectText: "Select Country",
      onSelected: function (data) {
        // Set COUNTRY
        country_index = $('#select-country').data('ddslick').selectedIndex
        country = countries[country_index]
        
        // Set DATE
        date = election_dates[country][election_dates[country].length-1]
        
        // Check number of elections
        if (election_dates[country].length == 1) {
          $("#election_slider_wrapper").css("pointer-events","none")
          $("#election_slider_wrapper").css("opacity","0.5")
        } else {
          $("#election_slider_wrapper").css("pointer-events","")
          $("#election_slider_wrapper").css("opacity","1")
        }
        
        // Hide and Show
        $("#play_button").show()
        $("#stop_button").hide()
      
        // Initialize Slider
        initializeSlider()
        
        // Initialize Dropdown
        initializeElectionDropdown()
        
        // Initialize Constituency Choice
        initializeConstituencyChoice()
        
        // Generate Map
        generateMap()
        
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
      }
    })
}

function initializeElectionDropdown() {
  // Fill dropdown
  election_dropdown_list = ""
  for (i=0;i<election_dates[country].length;i++) {
    date_year = parseInt(election_dates[country][i].split("-")[0])
    date_month = parseInt(election_dates[country][i].split("-")[1])
    
    if (date_month == 0) {
      date_string = String(date_year)
    } else {
      date_string = moment(election_dates[country][i],"YYYY-MM").format("MMMM YYYY")
    }
    
    election_dropdown_list += "<li><a class='election-date' name='" + String(i) + "'>" + date_string  + "</a></li>"
  }
  
  // Fill HTML
  $("#election_dropdown_list").html(election_dropdown_list)
  
  // Onclick
  $("#election_dropdown").on("click","a",function(event) {
    // Set text
    $(".dropdown-toggle").html(event.currentTarget.innerHTML) //  + "&nbsp;<span class='caret'></span>"
    
    // Set Slider
    election_slider.slider("setValue",parseInt(event.currentTarget.name))

    // Change date
    date = election_dates[country][parseInt(event.currentTarget.name)]
    
    // Verander map
    updateMap()
    
    // Verander table
    updateElectionTable("Country")
    
    // Verander text
    updateTextTable()
      
  })

  // Set first date
    date_year = parseInt(date.split("-")[0])
    date_month = parseInt(date.split("-")[1])
    
    if (date_month == 0) {
      date_string = String(date_year)
    } else {
      date_string = moment(date,"YYYY-MM").format("MMMM YYYY")
    }
  $(".dropdown-toggle").html(date_string) //  + "&nbsp;<span class='caret'></span>"
  
  // Position
  $("#election_dropdown_list").css("margin-top",$("#dropdownMenu1").outerHeight() + parseInt($("#dropdownMenu1").css("margin-top").replace("px","")))
  
}

function play() {
  // Loop through remaining dates
  date_index = election_dates[country].indexOf(date)
  max_date_index = election_dates[country].length-1
  
    // Hide and Show
  if (date_index == max_date_index) {
    $("#play_button").show()
    $("#stop_button").hide()   
    
    if (typeof playing != 'undefined') {
      //Stop
      clearInterval(playing)
    }
  } else {
    $("#play_button").hide()
    $("#stop_button").show()  
    
    if (typeof playing != 'undefined') {
      //Stop
      clearInterval(playing)
    }
    
    playing = setInterval(function(){
    
    if(date_index < max_date_index) {
      // Update index
      date_index += 1
      
      // Set slider value
      election_slider.slider("setValue",date_index)
      
      // Change date
      date = election_dates[country][date_index]
      
      // Verander map
      updateMap()
      
      // Verander table
      updateElectionTable("Country")
      
      // Verander text
      updateTextTable()
      
      // Change dropdown
      date_year = parseInt(date.split("-")[0])
      date_month = parseInt(date.split("-")[1])
      
      if (date_month == 0) {
        date_string = String(date_year)
      } else {
        date_string = moment(date,"YYYY-MM").format("MMMM YYYY")
      }
      $(".dropdown-toggle").html(date_string) //  + "&nbsp;<span class='caret'></span>"

      if (date_index == max_date_index) {
        stop()
      }
    }
  }, 1000)
  }


}

function stop() {
  // Stop Play
    // Check if playing
    if (typeof playing != 'undefined') {
      //Stop
      clearInterval(playing)
    }
  
  // Hide and Show
  $("#play_button").show()
  $("#stop_button").hide()
  
}