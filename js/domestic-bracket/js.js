function buildBracket(view,country) {
///////////////////////////////////
// Import files
///////////////////////////////////
// Ajax url's
var games_graph_url = "http://www.sway-blog.be/data/pi-domestic-leagues/" + country + "/games_graph.json"
var ajax_call_games_graph = $.ajax({
      url: games_graph_url,
      dataType: 'json',
      crossDomain: true, // enable this
    })

var team_url = "http://www.sway-blog.be/data/pi-domestic-leagues/" + country + "/team.json"
var ajax_call_team = $.ajax({
          url: team_url,
          dataType: 'json',
          crossDomain: true, // enable this
        })

var teams_url = "http://www.sway-blog.be/data/pi-domestic-leagues/" + country + "/teams.json"
var ajax_call_teams = $.ajax({
          url: teams_url,
          dataType: 'json',
          crossDomain: true, // enable this
        })
        
var games_table_url = "http://www.sway-blog.be/data/pi-domestic-leagues/" + country + "/games_table.json"
var ajax_call_games_table = $.ajax({
          url: games_table_url,
          dataType: 'json',
          crossDomain: true, // enable this
        })
var country_data_url = "http://www.sway-blog.be/data/pi-domestic-leagues/" + country + "/country_data.json"
var ajax_call_country_data = $.ajax({
          url: country_data_url,
          dataType: 'json',
          crossDomain: true, // enable this
        })        
// var topo_geo_url = "http://www.sway-blog.be/data/pi-domestic-leagues/" + country + "/topo_geo.json"
// var ajax_call_topo_geo = $.ajax({
//           url: topo_geo_url,
//           dataType: 'json',
//           crossDomain: true, // enable this
//         })
// Get data       
$.when(ajax_call_games_graph,ajax_call_team,ajax_call_games_table,ajax_call_teams,ajax_call_country_data).done(function(data1, data2,data3,data4,data5){

// Data
games_graph = data1[0]
team = data2[0]
games_table = data3[0]
teams = data4[0]
country_data = data5[0]
// topo_geo = data6[0]
console.log(games)
console.log(team)
console.log(games_table)
console.log(teams)
console.log(country_data)
// Parameters
number_of_teams = teams.length
gamedays = games_graph["rank"][0].length
current_gameday = team[teams[0]]["standing"]["GP"][0]
graph_string = "rank"
frozen = false; // Click event

graph_y_bounds = []  // [min,max]
dummy = []
var i,j;
for (i=0;i<teams.length;i++) {
    for (j=0;j<games_graph[graph_string][i].length;j++) {
        if (games_graph[graph_string][i][j].y != "nan") {
            dummy.push(math.number(games_graph[graph_string][i][j].y))
        }
    }
}

delta = math.max(math.abs(0.1*math.min(dummy)),math.abs(0.1*math.max(dummy)))
if (graph_string == "rank") {
    graph_y_bounds.push(math.max(dummy) + 1)
    graph_y_bounds.push(math.min(dummy) - 1)   
} else {
    graph_y_bounds.push(math.min(dummy) - delta)
    graph_y_bounds.push(math.max(dummy) + delta)    
}




// Create dataset that will be linked to team box on SVG
var i,t;
var dataset_ranking = [];
for (i=0;i<number_of_teams;i++) {
    var dataset_ranking_i = team[teams[i]];
    dataset_ranking.push(dataset_ranking_i)
}


// Extend games_table
var i;
for (i=0;i<games_table.length;i++) {
    games_table[i].vs = []
    var j;
    for (j=0;j<games_table[i].FTHG.length;j++) {
        if (games_table[i].FTHG[j] == "nan") {
            games_table[i].vs.push("vs.")
        } else {
            games_table[i].vs.push("-")
        }
    }
}

var dataset_info_team_text = country_data["info"]
var game_table_columns = ["Date","HomeTeam","FTHG","vs","FTAG","AwayTeam","Pi_HomeWin","Pi_Tie","Pi_AwayWin"]
var game_table_columns_header = ["Date","","","Game","","","1","X","2"]
var game_table_columns_width = [2,2,0.5,0.1,0.5,2,0.6,0.6,0.6]
var total_game_table_columns_width = 0 ;
for(var i in game_table_columns_width) { total_game_table_columns_width += game_table_columns_width[i]; }

ranking_table_columns = ["R","name","Pi","GP","W","L","T","GF","GA","GD","PTS"] // ,"Pi_Home","Pi_Away"
ranking_table_columns_header = ["R","Team","Pi","GP","W","L","T","GF","GA","GD","PTS"] // "PiH","PiA",
var ranking_table_columns_width = [1,8,1,1,1,1,1,1,1,1,1]
total_ranking_table_columns_width = 0 ;
for(var i in ranking_table_columns_width) { total_ranking_table_columns_width += ranking_table_columns_width[i]; }

// ////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////
// Dimension parameters
// FIXED
var w = $("#container").width() // Width of svg
var h = 0.9*$(window).height() // Height of svg
w_padding = 0.01*w // Padding left-right
h_padding = 0.01*h // Padding top-bottom
var w_buffer = 0.02*w
var h_buffer = 0.02*h
size_img_small = 25
size_img_large = 70

var stroke_width = 1

// RATIOS
var slider_to_games_h_ration = 0.2
var games_to_ranking_h_ratio = 0.3
var ranking_table_header_to_rows_h_ratio = 0.2
var info_team_title_to_text_h_ratio = 0.4
var info_team_to_geo_w_ratio = 0.5

// CALCULATED
// Info
var w_info = (w - 2*w_padding - w_buffer)/2
var h_info = games_to_ranking_h_ratio*(h - 2*h_padding - h_buffer)

// Info Team
var h_info_team = h_info
var w_info_team = info_team_to_geo_w_ratio*w_info
var h_info_team_title = info_team_title_to_text_h_ratio*h_info_team
var h_info_team_text = (1-info_team_title_to_text_h_ratio)*h_info_team
var w_info_team_text = 0.9*w_info_team/2

// Geo 
var h_geo = h_info
var w_geo = (1-info_team_to_geo_w_ratio)*w_info

// Games Slider
var handle_radius = 12
var w_games_slider = w_info - handle_radius
h_games_slider = slider_to_games_h_ration*h_info

// Games
var w_games = w_info
var h_games = (1-slider_to_games_h_ration)*h_info
var h_games_row = h_games/(((number_of_teams)/2)+1)

// Ranking
w_ranking = w_info
h_ranking = (1-games_to_ranking_h_ratio)*(h - 2*h_padding - h_buffer)
h_ranking_table_rows = (1-ranking_table_header_to_rows_h_ratio)*h_ranking

var i;
max_bar_width = 0;
bar_start = 0;
for (i=3;i<ranking_table_columns_width.length;i++) {
    bar_start += ranking_table_columns_width[i]*w_ranking/total_ranking_table_columns_width
    if (i < 9) {
        max_bar_width += ranking_table_columns_width[i]*w_ranking/total_ranking_table_columns_width
    }
}

h_ranking_table_row = h_ranking/(number_of_teams+1)// h_ranking_table_rows/number_of_teams
h_ranking_table_header = h_ranking/(number_of_teams+1)//ranking_table_header_to_rows_h_ratio*h_ranking

// Graphs
w_graphs = w_info
h_graphs = h_ranking

w_flag_box_path = 0.1*w_graphs
w_flag_box = 0.2*w_graphs
w_graph = w_graphs - w_flag_box_path - w_flag_box
h_graph = 3*h_graphs/4

padding_flag_box_h = 0.01*h_graph
h_flag_box = (h_graph - (teams.length-1)*padding_flag_box_h)/teams.length

// ////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////
// Initialize SVG
var svg = d3.select("#container")
            .append("svg")
            .attr("id","svg")
            .attr("width", w)
            .attr("height", h)    

////////////////////////////////////////////////////////////////////////////////
// Base groups
////////////////////////////////////////////////////////////////////////////////
var g = svg     .append("g")
                .attr("id","g") 
                .attr("transform",function(d,i) {
                    var x_translate = w_padding
                    var y_translate = h_padding
                    return "translate(" + x_translate + "," + y_translate + ")";
                })
                .attr("width", w - 2*w_padding)
                .attr("height", h - 2*h_padding) 

var info = g    .append("g")
                .attr("id","info") 
                .attr("transform",function(d,i) {
                    var x_translate = 0
                    var y_translate = 0
                    return "translate(" + x_translate + "," + y_translate + ")";
                })
                .attr("width", w_info)
                .attr("height", h_info) 

var games_slider = g   .append("g")
                .attr("id","games-slider") 
                .attr("transform",function(d,i) {
                    var x_translate = w_info + w_buffer
                    var y_translate = 0
                    return "translate(" + x_translate + "," + y_translate + ")";
                }) 
                .attr("width", w_games)
                .attr("height", h_games) 
                
var games = g   .append("g")
                .attr("id","games") 
                .attr("transform",function(d,i) {
                    var x_translate = w_info + w_buffer
                    var y_translate = h_games_slider
                    return "translate(" + x_translate + "," + y_translate + ")";
                }) 
                .attr("width", w_games)
                .attr("height", h_games) 
                
var ranking = g .append("g")
                .attr("id","ranking") 
                .attr("transform",function(d,i) {
                    var x_translate = 0
                    var y_translate = h_info + h_buffer
                    return "translate(" + x_translate + "," + y_translate + ")";
                }) 
                .attr("width", w_ranking)
                .attr("height", h_ranking) 
                
var graphs = g  .append("g")
                .attr("id","graphs") 
                .attr("transform",function(d,i) {
                    var x_translate = w_info + w_buffer
                    var y_translate = h_info + h_buffer
                    return "translate(" + x_translate + "," + y_translate + ")";
                })  
                .attr("width", w_graphs)
                .attr("height", h_graphs)                 

////////////////////////////////////////////////////////////////////////////////
// Info
////////////////////////////////////////////////////////////////////////////////
var info_team_box = info.append("g")
                        .attr("id","info-team") 
                        .attr("transform",function(d,i) {
                            var x_translate = 0
                            var y_translate = 0
                            return "translate(" + x_translate + "," + y_translate + ")";
                        })

var info_team_title_box = info_team_box .append("g")
                                        .attr("id","info-team-title-box") 
                                        .attr("transform",function(d,i) {
                                            var x_translate = 0
                                            var y_translate = 0
                                            return "translate(" + x_translate + "," + y_translate + ")";
                                        })
                                        
var info_team_title_img = info_team_title_box   .append("image")
                                                .attr("id","info-team-image")
                                                .attr("cx",w_padding + country_data["png_width"]/2)
                                                .attr("cy",h_padding + country_data["png_height"]/2)
                                                .attr("height",country_data["png_height"])
                                                .attr("width",country_data["png_width"])
                                                .attr("xlink:href",function(d) {
                                                    var base_dir = "/img/projects/pi-domestic-leagues/" + country + "/logos/" + String(size_img_large) + "/"
                                                    return base_dir + country + ".png";
                                                }); 
                                            
var info_team_title = info_team_title_box   .append("text")
                                            .attr("id","info-team-title")
                                            .attr("x",2*w_padding + size_img_large)
                                            .attr("y",size_img_large/2)
                                            .attr("dy","0.35em")
                                            .text("")
                                            .style("fill","black")

var info_team_text_box = info_team_box .append("g")
                                        .attr("id","info-team-text-box") 
                                        .attr("transform",function(d,i) {
                                            var x_translate = 0
                                            var y_translate = size_img_large + (h_info - h_padding - size_img_large - h_info_team_text)/2
                                            return "translate(" + x_translate + "," + y_translate + ")";
                                        })

var info_team_text_groups = info_team_text_box  .selectAll("g")
                                                .data(dataset_info_team_text)
                                                .enter()
                                                .append("g")
                                                .attr("transform",function(d,i) {
                                                    var x_translate = 0
                                                    var y_translate = (i+2.5)*h_info_team_text/8  
                                                    return "translate(" + x_translate + "," + y_translate + ")"; 
                                                })
                                                .attr("id",function(d,i) {
                                                    return "info-team-text-" + String(i)
                                                })
                                                .selectAll("text")
                                                .data(function(d) {
                                                    return d
                                                })
                                                .enter()
                                                .append("text")
                                                .attr("class",function(d,i) {
                                                    if (i == 0) {
                                                        return "info-team-text-header"
                                                    } else {
                                                        return "info-team-text-row"
                                                    }
                                                })
                                                .attr("x",function(d,i) {
                                                    if (i == 0) {
                                                        return 0
                                                    } else {
                                                        return w_info_team_text
                                                    }                                                        
                                                })
                                                .attr("y",0)
                                                .attr("dy","0.35em")
                                                .text(function(d) {
                                                    return d    
                                                })

var group_games_start_text = info_team_box  .append("text")
                                            .attr("x", 0)
                                            .attr("y",h_info - (size_img_large/2))
                                            .attr("id","info-general-text")
                                            .style("visibility","")
                                            .attr("dy", ".35em")
                                            .text("HOVER OVER/CLICK ON TEAM FOR MORE INFO")
// ////////////////////////////////////////////////////////////////////////////////
// // Geo
// ////////////////////////////////////////////////////////////////////////////////
// var geo_group = info.append("g")
//                     .attr("width", w_geo)
//                     .attr("height", h_geo)

// // Load GeoJson Data
// var geo_france = topojson.feature(topo_france, topo_france.objects["geo_ADM0_FRA"]);


// // Create a unit projection.
// var projection = d3 .geo.mercator()
//                     .rotate([0, 0])
//                     .scale(1)
//                     .translate([0, 0]);  

// // Create a path generator.
// var path = d3   .geo.path()
//                 .projection(projection);

// // Compute the bounds of a feature of interest, then derive scale & translate.
// var b = path.bounds(geo_france)
// var s = .95 / Math.max((b[1][0] - b[0][0]) / w_geo, (b[1][1] - b[0][1]) / h_geo)
// var t = [(w_geo - s * (b[1][0] + b[0][0])) / 2, (h_geo - s * (b[1][1] + b[0][1])) / 2]

// // Update the projection to use computed scale & translate.
// projection
//   .scale(s)
//   .translate(t);

// path = d3   .geo.path()
//             .projection(projection);

// geo_group   .attr("class", "constituencies")
//             .selectAll("path")
//             .data(geo_france.features)
//             .enter().append("path") // ,".graticule")  
//             .attr("d", path)
//             .attr("class","constituency")
//             .attr('fill',"rgb(255,255,255)")
//             .attr('stroke',"#000000")
//             .attr('stroke-width',1)
            
//     // add circles to svg
// geo_group   .selectAll("circle")
//     		.data(cities).enter()
//     		.append("circle")
//     		.attr("class","city-circle")
//     		.attr("id",function(d) {
//     		    return "circle-" + d.City
//     		 })
//     		.attr("cx", function (d) {
//     		    var latlong = [d.Long,d.Lat]
//     		    return projection(latlong)[0]; 
//     		})
//     		.attr("cy", function (d) { 
//     		    var latlong = [d.Long,d.Lat]
//     		    return projection(latlong)[1];  
//     		})
//     		.attr("r", "3px")
//     		.attr("fill", "black")
////////////////////////////////////////////////////////////////////////////////
// Games
////////////////////////////////////////////////////////////////////////////////

var game_table = games  .selectAll("g")
                        .data(games_table)
                        .enter()
                        .append("g")
                        .attr("class","game-table-gameday")
                        .attr("id",function(d,i) {
                            return "game-table-gameday-" + String(i+1)
                        })
                        .style("visibility",function(d,i) {
                            if (i + 1 == current_gameday) {
                                return "visible"
                            } else {
                                return "hidden"
                            }
                        })

var game_table_lines = games.selectAll("line")
                            .data(new Array(number_of_teams/2 + 1))
                            .enter().append("line")
                            .attr("x1", 0)
                            .attr("y1", function(d,i) {
                                return i*h_games_row
                            })
                            .attr("x2", w_games)
                            .attr("y2", function(d,i) {
                                return i*h_games_row
                            })
                            .attr("class",function(d,i) {
                                if ((i == 0) || (i == 1)) {
                                    return "game-table-header-line"
                                } else {
                                    return "game-table-cell-line"
                                }
                            })
                        
var game_table_header = game_table  .selectAll(".game-table-header")
                                    .data(game_table_columns_header).enter().append("g")
                                    .attr("transform", function(d,i) {
                                        var j;
                                        var x_translate = 0;
                                        for (j=0;j<i;j++) {
                                            x_translate += game_table_columns_width[j]*w_games/total_game_table_columns_width
                                        }
                                        var y_translate = 0
                                        return "translate(" + x_translate + "," + y_translate + ")";                                    
                                    })
                                    
var game_table_header_text = game_table_header  .append("text")
                                                .attr("class","game-table-header-text")
                                                .attr("x",function(d,i) {
                                                    if ((game_table_columns[i] == "Pi_Tie") || (game_table_columns[i] == "vs")) {
                                                        return (game_table_columns_width[i]*w_games/total_game_table_columns_width)/2
                                                    } else if (game_table_columns[i] == "Pi_AwayWin") {
                                                        return (game_table_columns_width[i]*w_games/total_game_table_columns_width)
                                                    } else {
                                                        return 0
                                                    }
                                                })
                                                .attr("y",h_games_row/2)
                                                .attr("dy","0.35em")
                                                .text(function(d,i) {
                                                    return d
                                                })  
                                                .style("text-anchor",function(d,i) {
                                                    if ((game_table_columns[i] == "Pi_Tie") || (game_table_columns[i] == "vs")) {
                                                        return "middle"
                                                    } else if (game_table_columns[i] == "Pi_AwayWin") {
                                                        return "end"
                                                    } else {
                                                        return "start"
                                                    }
                                                })

var game_table_col = game_table .selectAll(".game-table-col")
                                .data(function(d,i) {
                                    var d_cols = []
                                    var j;
                                    for (j=0;j<game_table_columns.length;j++) {
                                        if (game_table_columns[j] == "Date") {
                                            var k;
                                            for (k=0;k<d[game_table_columns[j]].length;k++) {
                                                d[game_table_columns[j]][k] = moment(d[game_table_columns[j]][k], moment.ISO_8601).format("YYYY-MM-DD HH:mm")
                                            }
                                        } else if ((game_table_columns[j] == "HomeTeam") || (game_table_columns[j] == "AwayTeam")) {
                                            var k;
                                            for (k=0;k<d[game_table_columns[j]].length;k++) {
                                                d[game_table_columns[j]][k] = team[d[game_table_columns[j]][k]]["name"]
                                            }
                                        }
                                        d_cols.push(d[game_table_columns[j]])
                                    }
                                    return d_cols;
                                }).enter().append("g")
                                .attr("class",function(d,i) {
                                    return game_table_columns[i] + "-col"
                                })
                                .attr("transform", function(d,i) {
                                    var j;
                                    var x_translate = 0;
                                    for (j=0;j<i;j++) {
                                        x_translate += game_table_columns_width[j]*w_games/total_game_table_columns_width
                                    }
                                    var y_translate = h_games_row
                                    return "translate(" + x_translate + "," + y_translate + ")";                                    
                                })

var game_table_cell = game_table_col.selectAll(".game-table-cell")
                                    .data(function(d,i) {
                                        return d;
                                    }).enter().append("g")
                                    .attr("class",function(d,i) {
                                    var ht_index = teams.indexOf(this.parentNode.parentNode.__data__.HomeTeam[i])
                                    var at_index = teams.indexOf(this.parentNode.parentNode.__data__.AwayTeam[i])
                                    
                                    return "games-table-cell games-team-" + String(ht_index) + " games-team-" + String(at_index)
                                    })
                                    .attr("transform",function(d,i) {
                                        var x_translate = 0
                                        var y_translate = i*h_games_row
                                        return "translate(" + x_translate + "," + y_translate + ")";                                           
                                    })
                                    
var game_table_cell_text = game_table_cell  .append("text")
                                            .attr("class","game-table-cell-text")
                                            .attr("x",function(d,i) {
                                                var col = this.parentNode.parentNode.className.baseVal.replace("-col","")
                                                if ((col == "HomeTeam") || (col == "Pi_AwayWin")) { // Home Team
                                                    var index = game_table_columns.indexOf(col)
                                                    return game_table_columns_width[index]*w_games/total_game_table_columns_width
                                                } else if ((col == "FTHG") || (col == "FTAG") || (col == "vs") || (col == "Pi_Tie")) {
                                                    var index = game_table_columns.indexOf(col)
                                                    return (game_table_columns_width[index]*w_games/total_game_table_columns_width)/2
                                                } else {
                                                    return 0
                                                }                                     
                                            })
                                            .attr("y",h_games_row/2)
                                            .attr("dy","0.35em")
                                            .text(function(d,i) {
                                                var col = this.parentNode.parentNode.className.baseVal.replace("-col","")
                                                if ((col == "Pi_HomeWin") || (col == "Pi_AwayWin") || (col == "Pi_Tie")) { // Home Team
                                                    d = d + "%"
                                                } else if ((col == "HomeTeam") || (col == "AwayTeam")) {
                                                    d = team[d].short_name
                                                }
                                                if (d == "nan") {
                                                    d = ""
                                                } 
                                                return d
                                            })      
                                            .style("text-anchor",function(d,i) {
                                                var col = this.parentNode.parentNode.className.baseVal.replace("-col","")
                                                if ((col == "HomeTeam") || (col == "Pi_AwayWin")) { // Home Team
                                                    return "end"
                                                } else if ((col == "FTHG") || (col == "FTAG") || (col == "vs") || (col == "Pi_Tie")) {
                                                    return "middle"
                                                } else {
                                                    return "start"
                                                }                                               
                                                
                                            })

var game_table_hover_row = game_table   .selectAll(".games-table-hover-row")
                                        .data(function(d) {
                                            var d_output = [];
                                            var j;
                                            for (j=0;j<d["HomeTeam"].length;j++) {
                                                d_output.push({"HomeTeam":d["HomeTeam"][j],"AwayTeam":d["AwayTeam"][j]})
                                            }
                                            return d_output
                                        }).enter().append("rect")
                                        .attr("fill","rgba(255,255,255,0)")
                                        .attr("height",h_games_row)
                                        .attr("width",w_games) 
                                        .attr("class",function(d,i) {
                                            var ht_index = teams.indexOf(d.HomeTeam)
                                            var at_index = teams.indexOf(d.AwayTeam)
                                            return "games-table-hover-row games-team-" + String(ht_index) + " games-team-" + String(at_index)
                                        })
                                        .attr("transform",function(d,i) {
                                            var x_translate = 0
                                            var y_translate = (i+1)*h_games_row
                                            return "translate(" + x_translate + "," + y_translate + ")";                                           
                                        })
                                        .on("mouseover",mouseover_game_table)
                                        .on("mouseout",mouseout_game_table)     
                                        .on("click",function(d) {
                                            clicked = true
                                            mouseover_game_table(d)
                                        })
////////////////////////////////////////////////////////////////////////////////
// Ranking
////////////////////////////////////////////////////////////////////////////////      

var ranking_table = ranking .append("g")
                            .attr("transform","translate(0,0)")

var ranking_table_header = ranking_table.append("g")
                                        .attr("transform","translate(0,0)")

var ranking_table_header_cells = ranking_table_header   .selectAll("g")
                                                        .data(ranking_table_columns_header)
                                                        .enter().append("g")
                                                        .attr("id",function(d,i) {
                                                            return "header-" + String(i)
                                                        })
                                                        .attr("transform", function(d,i) {
                                                            var j;
                                                            var x_translate = 0;
                                                            for (j=0;j<i;j++) {
                                                                x_translate += (ranking_table_columns_width[j]*w_ranking/total_ranking_table_columns_width) 
                                                                                
                                                            }
                                                            
                                                            var y_translate = 0
                                                            return "translate(" + x_translate + "," + y_translate + ")";                                    
                                                        })

var ranking_table_header_cell_rect = ranking_table_header_cells .append("rect")                           
                                                                .attr("fill","rgba(255,255,255,0)")
                                                                .attr("class","ranking-table-header-rect")
                                                                .attr("height",h_ranking_table_row)
                                                                .attr("width",function(d,i) {
                                                                    return ranking_table_columns_width[i]*w_ranking/total_ranking_table_columns_width
                                                                })
                                                                
var ranking_table_header_cell_text = ranking_table_header_cells .append("text")
                                                                .attr("x",function(d) {
                                                                  if (["R","Pi","PiH","PiA","W","L","T","GF","GA","GD","PTS"].indexOf(d) > -1) {
                                                                      var index = ranking_table_columns_header.indexOf(d);
                                                                      return (ranking_table_columns_width[index]*w_ranking/total_ranking_table_columns_width)/2
                                                                  } else {
                                                                      return w_padding/2
                                                                  }
                                                                })
                                                                .attr("y",h_ranking_table_row/2)
                                                                .attr("dy","0.35em")
                                                                .attr("class","ranking-table-header-text")
                                                                .attr("text-anchor",function(d,i) {
                                                                    if (["R","Pi","PiH","PiA","W","L","T","GF","GA","GD","PTS"].indexOf(d) > -1) {
                                                                        var index = ranking_table_columns_header.indexOf(d);
                                                                        return "middle"
                                                                    } else {
                                                                        return "start"
                                                                    }
                                                                })
                                                                .attr("fill","rgba(0,0,0,1)")
                                                                .text(function(d) {
                                                                    return d
                                                                })          
                                                                
var ranking_table_header_cell_hover_rect = ranking_table_header_cells   .append("rect")                    
                                                                        .attr("class",function(d,i) {
                                                                          if (["R","Pi","PiH","PiA"].indexOf(d) > -1) {
                                                                              return "ranking-table-header-hover-rect"
                                                                          }  
                                                                        })
                                                                        .attr("fill","rgba(255,255,255,0)")
                                                                        .attr("height",h_ranking_table_row)
                                                                        .attr("width",function(d,i) {
                                                                            return ranking_table_columns_width[i]*w_ranking/total_ranking_table_columns_width
                                                                        })    
                                                                        .on("click",function(d) {
                                                                            clicked_header = true
                                                                            click_header(d)
                                                                        })
                                      
var ranking_table_rows = ranking_table.append("g")
                                      .attr("transform","translate(0," + h_ranking_table_header + ")")                                        

var ranking_table_row = ranking_table_rows  .selectAll("g")
                                            .data(dataset_ranking).enter()
                                            .append("g")
                                            .attr("class",function(d,i) {
                                                var team_index = teams.indexOf(d.name)
                                                return "ranking-row ranking-team-" + team_index
                                            })
                                            .attr("transform",function(d,i) {
                                                var x_translate = 0
                                                var y_translate = (parseInt(d.standing.R[0])-1)*h_ranking_table_row
                                                return "translate(" + x_translate + "," + y_translate + ")";
                                            })
                                            
var ranking_table_row_cells = ranking_table_row .selectAll("g")
                                                .data(function(d,i) {
                                                    var d_output = []
                                                    for (i=0;i<ranking_table_columns.length;i++) {
                                                        if (["name","Pi","Pi_Home","Pi_Away"].indexOf(ranking_table_columns[i]) > -1) {
                                                            d_output.push(d[ranking_table_columns[i]])
                                                        } else if (["R","GP","W","L","T","GF","GA","GD","PTS"].indexOf(ranking_table_columns[i]) > -1) {
                                                            d_output.push(d.standing[ranking_table_columns[i]][0])
                                                        }
                                                    }
                                                    return d_output
                                                })
                                                .enter().append("g")
                                                .attr("transform", function(d,i) {
                                                    var j;
                                                    var x_translate = 0;
                                                    for (j=0;j<i;j++) {
                                                        x_translate += ranking_table_columns_width[j]*w_ranking/total_ranking_table_columns_width
                                                    }
                                                    var y_translate = 0
                                                    return "translate(" + x_translate + "," + y_translate + ")";                                    
                                                })

var ranking_table_row_cell_text = ranking_table_row_cells   .append("text")
                                                            .attr("x",function(d,i) {
                                                                if (teams.indexOf(d) > -1) {
                                                                    return size_img_small + 5
                                                                } else {
                                                                    return (ranking_table_columns_width[i]*w_ranking/total_ranking_table_columns_width)/2
                                                                }
                                                                
                                                            })
                                                            .attr("y",h_ranking_table_row/2)
                                                            .attr("dy","0.35em")
                                                            .attr("class","ranking-table-cell-text")
                                                            .attr("text-anchor", function(d,i) {
                                                                if (teams.indexOf(d) > -1) {
                                                                    return "start"
                                                                } else {
                                                                    return "middle"
                                                                }                                                                
                                                            })
                                                            .text(function(d) {
                                                                return d
                                                            })   
                                                            
var ranking_table_row_img = ranking_table_row   .append("image")
                                                .attr("x",ranking_table_columns_width[0]*w_ranking/total_ranking_table_columns_width)
                                                .attr("y",(h_ranking_table_row - size_img_small)/2)
                                                .attr("height",size_img_small)
                                                .attr("width",size_img_small)
                                                .attr("xlink:href",function(d) {
                                                    var base_dir = "/img/projects/pi-domestic-leagues/" + country + "/logos/" + size_img_small + "/"
                                                    return base_dir + teams.indexOf(d.name) + ".png";
                                                }); 

var ranking_table_lines = ranking   .selectAll("line")
                                    .data(new Array(number_of_teams + 1))
                                    .enter().append("line")
                                    .attr("x1", 0)
                                    .attr("y1", function(d,i) {
                                        return i*h_ranking_table_row
                                    })
                                    .attr("x2", w_ranking)
                                    .attr("y2", function(d,i) {
                                        return i*h_ranking_table_row
                                    })
                                    .attr("class",function(d,i) {
                                        if ((i == 0) || (i == 1)) {
                                            return "ranking-table-header-line"
                                        } else {
                                            return "ranking-table-cell-line"
                                        }
                                    })       
                                    
// Ranking Table Bar and Text percentage
var ranking_table_row_bar = ranking_table_row   .append("rect")
                                                .attr("class",function(d,i) {
                                                    return "bar-" + d.standing.R[0]
                                                })                                              
                                                .attr("fill","black")
                                                .attr("transform",function() {
                                                  var x_translate = w_ranking - bar_start + w_padding/2
                                                  return "translate(" + x_translate +",0)"
                                                })
                                                .attr("height",h_ranking_table_row)
                                                .attr("width",0)

var ranking_table_row_bar_text = ranking_table_row  .append("text")
                                                    .attr("class",function(d,i) {
                                                        return "ranking-percentage" + " " + "ranking-percentage-" + d.standing.R[0]
                                                    })                                                    
                                                    .attr("x",0)
                                                    .attr("y",h_ranking_table_row/2)
                                                    .attr("transform",function() {
                                                      var x_translate = w_ranking - bar_start + w_padding/2
                                                      return "translate(" + x_translate +",0)"
                                                    })                                                    
                                                    .attr("dy","0.35em")
                                                    .text("")                                                       
                                                    .style("visibility","hidden")
                                                    
var ranking_table_hover_rect = ranking_table_row.append("rect")
                                                .attr("fill","rgba(255,255,255,0)")
                                                .attr("class","ranking-table-hover-rect")
                                                .attr("height",h_ranking_table_row)
                                                .attr("width",w_ranking)
                                                .on("mouseover",mouseover_ranking)
                                                .on("mouseout",mouseout_ranking)
                                                .on("click",function(d) {
                                                    clicked = true
                                                    mouseover_ranking(d)
                                                })
                                                
////////////////////////////////////////////////////////////////////////////////
// Charts
////////////////////////////////////////////////////////////////////////////////                                                  
// Standing History
graph_standing = graphs .append("g")
                        .attr("id","graph-standing") 
                        .attr("transform",function(d,i) {
                            var x_translate = 0
                            var y_translate = (h_graphs - h_graph)/2
                            return "translate(" + x_translate + "," + y_translate + ")";
                        })  
                        .attr("width", w_graph)
                        .attr("height", h_graph) 
                            
xScale = d3.scale.linear().range([0, w_graph]).domain([0,current_gameday]);
yScale = d3.scale.linear().range([h_graph, 0]).domain([graph_y_bounds[0],graph_y_bounds[1]]); // .domain([-0.5,1.5])

xAxis = d3.svg.axis()
    .scale(xScale)
    .tickValues(range(1,current_gameday,2));
    
yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .tickValues(range(1,number_of_teams,1));
    
graph_standing.append("g").attr("id","x-axis").attr("transform", "translate(0," + h_graph + ")").call(xAxis)
graph_standing.append("g").attr("id","y-axis").attr("transform", "translate(" + 0 + ",0)").call(yAxis)
 
lineGen = d3.svg.line()
  .x(function(d) {
      if (d.y != "nan") {
        return xScale(d.x);
      }
  })
  .y(function(d) {
      if (d.y != "nan") {
        return yScale(d.y);
      }
  });
  
 graph_standing .selectAll('.g-path-graph')
                .data(function() {
                    var data_output = []
                    var i;
                    for (i=0;i<teams.length;i++) {
                        data_output.push([])
                        for (j=1;j<current_gameday;j++) {
                            data_output[data_output.length-1].push([games_graph[graph_string][i][j-1],games_graph[graph_string][i][j]])
                        }
                    }
                    return data_output
                })
                .enter().append("g")
                .attr("class","g-path-graph")
                .attr("id",function(d,i) {
                    return "g-path-" + String(i) 
                })
                .selectAll(".path-graph")
                .data(function(d) {
                    return d;
                }).enter().append("path")
                .attr("class",function(d,i) {
                    return "path-graph"
                })
                .attr("id",function(d,i) {
                    return "path-graph-" + String(i) 
                })
                .attr('d', function(d) {
                    return lineGen(d)
                })
                .attr('stroke', "rgba(0,0,0,1)")
                .attr('stroke-width', 1)
                .attr('fill', 'none');
 
 
// Flag boxes
flag_boxes = graphs .append("g")
                        .attr("id","flag-boxes") 
                        .attr("transform",function(d,i) {
                            var x_translate = w_graph + w_flag_box_path
                            var y_translate = (h_graphs - h_graph)/2
                            return "translate(" + x_translate + "," + y_translate + ")";
                        })  
                        .attr("width", w_flag_box)
                        .attr("height", h_graph) 

// Flag boxes position calculation
var i;
var y_coord = []
for (i=0;i<teams.length;i++) {
    var y_coordinate = yScale(games_graph[graph_string][i][current_gameday-1].y)  
    y_coord.push([y_coordinate,i])
}
y_coord.sort(sortFunction);
for (i=0;i<teams.length;i++) {
    y_coord[i][0] = i*(h_flag_box + padding_flag_box_h)
}
y_coord.sort(compareSecondColumn);

flag_box_path_gen = d3.svg.line()
                          .x(function(d) { return d.x; })
                          .y(function(d) { return d.y; })
                          .interpolate("linear");

flag_box = flag_boxes   .selectAll("g")
                            .data(teams)
                            .enter().append("g")
                            .attr("id",function(d,i) {
                                return "flag-box-" + String(i)
                            })
                            .attr("class","flag-box")                             
                            .attr("transform",function(d,i) {
                                var x_translate = 0
                                var y_translate = y_coord[i][0] - h_flag_box/2 
                                
                                return "translate(" + x_translate + "," + y_translate + ")";
                            })
                            
flag_box_rect = flag_box    .append("rect")      
                                .attr("class","flag-box-rect")
                                .attr("height",h_flag_box)
                                .attr("width",w_flag_box)


flag_box_text = flag_box.append("text")
                            .attr("class","flag-box-text")
                            .attr("x",w_flag_box/2)
                            .attr("y",h_flag_box/2)
                            .attr("dy","0.35em")
                            .text(function(d) {
                                return team[d].short_name;
                            }) 
flag_box_hover_rect = flag_box  .append("rect")      
                                    .attr("class","flag-box-hover-rect")
                                    .attr("height",h_flag_box)
                                    .attr("width",w_flag_box)
                                    .on("mouseover",mouseover_flagbox)
                                    .on("mouseout",mouseout_flagbox)
                                    .on("click",function(d) {
                                        clicked = true
                                        mouseover_flagbox(d)
                                    })

flag_box_path = graphs  .selectAll('.flag-box-path')
                            .data(y_coord)
                            .enter().append("path")
                            .attr('d', function(d) {
                                var team_index = d[1]
                                var x1 = xScale(games_graph[graph_string][team_index][current_gameday-1].x)
                                var y1 = (h_graphs - h_graph)/2 + yScale(games_graph[graph_string][team_index][current_gameday-1].y)
                                var x2 = w_graph + w_flag_box_path
                                var y2 = (h_graphs - h_graph)/2 + d[0]
                                var points = [  {"x":x1,"y":y1},
                                                {"x":x2,"y":y2}]
                                return flag_box_path_gen(points)
                            })
                            .attr("id",function(d,i) {
                                return "flag-box-path-" + String(i) 
                            })
                            .attr("class","flag-box-path")
                            .attr('stroke', "rgba(0,0,0,1)")
                            .attr('stroke-width', 1)
                            .attr('fill', 'none');
                            
                            
////////////////////////////////////////////////////////////////////////////////
// Games Slider
////////////////////////////////////////////////////////////////////////////////
// scale function
GamesScale = d3.scale   .linear()
                        .domain([1, gamedays])
                        .range([handle_radius, w_games_slider])
                        .clamp(true);

// defines brush
brush = d3.svg.brush()
    .x(GamesScale)
    .extent([0, 0])
    .on("brush", slide);

games_slider.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(" + 0 + "," + h_games_slider / 2 + ")")
    .call(d3.svg.axis()
      .scale(GamesScale)
      .orient("bottom")
      .tickFormat(function(d) { return ""; })
      .tickSize(0)
      .tickPadding(12))
  .select(".domain")
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "halo");

var slider = games_slider.append("g")
  .attr("class", "slider")
  .call(brush);

slider.selectAll(".extent,.resize")
  .remove();

slider.select(".background")
  .attr("height", h_games_slider);

                    
handle = slider.append("circle")
                .attr("class", "handle")
                .attr("transform", "translate(0," + h_games_slider / 2 + ")")
                .attr("r", handle_radius);
    
handle_text = slider.append("text")
                    .attr("class","games-slider-handle-text")
                    .attr("transform", "translate(0," +  h_games_slider/ 2 + ")")
                    .attr("x",0)
                    .attr("y",0)
                    .attr("dy","0.35em")
                    .text("") 

handle_hover_circle = slider.append("circle")
                            .attr("class","games-slider-hover-circle")
                            .attr("transform", "translate(0," + h_games_slider / 2 + ")")
                            .attr("r", handle_radius);


                    
slider
  .call(brush.event)
  .transition() // gratuitous intro!
    .duration(0)
    .call(brush.extent([current_gameday, current_gameday]))
    .call(brush.event);

// Click
click_header("R")
    
})
}

function mouseover_ranking(d) {
    if (frozen) {
        return false;
    }
    // Team index
    var team_index = teams.indexOf(d.name)
    
    // Info
    d3.select("#info-team-image").attr("height",size_img_large)
                                                .attr("width",size_img_large) // Set correct dimensions
                                                .attr("xlink:href",function(d) {
                                                    var base_dir = "/img/projects/pi-domestic-leagues/" + country + "/logos/" + String(size_img_large) + "/"
                                                    return base_dir + team_index + ".png";
                                                });
    d3.select("#info-team-title").text(d.name)
    d3.select("#info-team-text-0").select(".info-team-text-header").text("Champion")
    d3.select("#info-team-text-0").select(".info-team-text-row").text(d["odds_champion"] + "%")
    d3.select("#info-team-text-1").select(".info-team-text-header").text("Uefa CL")
    d3.select("#info-team-text-1").select(".info-team-text-row").text(d["odds_ucl"]+ "%")
    d3.select("#info-team-text-2").select(".info-team-text-header").text("Uefa EL")
    d3.select("#info-team-text-2").select(".info-team-text-row").text(d["odds_uel"]+ "%")
    d3.select("#info-team-text-3").select(".info-team-text-header").text("Relegation")
    d3.select("#info-team-text-3").select(".info-team-text-row").text(d["odds_relegation"]+ "%") 
    
    // Remove Some Header text
    d3.selectAll(".ranking-table-header-text").style("visibility",function(d,i) {if (i > 3) {return "hidden"}})
    
    // Add some Header text
    d3.selectAll(".ranking-table-header-text").text(function(d,i) {if (i == 3) { return "Forecast" } else  { return d }})
    
    // Remove table text
    d3.selectAll(".ranking-row").selectAll(".ranking-table-cell-text").style("visibility",function(d,i) {if (i > 2) { return "hidden"} else {return "visible"}})
    
    
    // Bars
    var i;
    var max_odds = 0;
    for(var i in d.odds) { max_odds = Math.max(max_odds,parseInt(d.odds[i])) }
    for (i=0;i<number_of_teams;i++) {
        d3.select(".bar-" + String(i+1)).transition().attr("fill","rgb(0,0,0)").attr("width",function() { return (parseInt(d.odds[i])/100)*max_bar_width*(100/max_odds)})
        d3.select(".ranking-percentage-" + String(i+1)).transition().style("visibility","visible")  .attr("transform",function() {
                                                                                                          var x_translate = w_ranking - bar_start + (parseInt(d.odds[i])/100)*max_bar_width*(100/max_odds) + 2 + w_padding/2
                                                                                                          return "translate(" + x_translate +",0)"
                                                                                                        })
                                                                                                    .text(String(d.odds[i]) + "%")
    }
    

    // Graph
    d3.selectAll(".g-path-graph").selectAll(".path-graph").style("stroke","rgba(0,0,0,0.2)")
    d3.select("#g-path-" + String(team_index)).selectAll(".path-graph").style("stroke","rgba(0,0,0,1)")
    
    d3.selectAll(".flag-box").select(".flag-box-rect").style("stroke","rgba(0,0,0,0.2)")
    d3.selectAll(".flag-box").select(".flag-box-text").style("fill","rgba(0,0,0,0.2)")
    d3.select("#flag-box-" + String(team_index)).select(".flag-box-rect").style("stroke","rgba(0,0,0,1)")
    d3.select("#flag-box-" + String(team_index)).select(".flag-box-text").style("fill","rgba(0,0,0,1)")
    
    
    d3.selectAll(".flag-box-path").style("stroke","rgba(0,0,0,0.2)")
    d3.select("#flag-box-path-" + String(team_index)).style("stroke","rgba(0,0,0,1)")
    
    // Games Table
    d3.selectAll(".games-table-cell").selectAll("text").style("fill","rgba(0,0,0,0.2)")
    d3.selectAll(".games-team-" + team_index).selectAll("text").style("fill","rgba(0,0,0,1)")
    
    // Ranking table
    d3.selectAll(".ranking-row").selectAll("text").style("fill","rgba(0,0,0,0.2)")
    d3.selectAll(".ranking-row").selectAll("image").style("opacity","0.2")
    d3.selectAll(".ranking-row").select("text").style("fill","rgba(0,0,0,1)") // First one (RANKING)
    d3.selectAll(".ranking-team-" + team_index).selectAll("text").style("fill","rgba(0,0,0,1)")
    d3.selectAll(".ranking-percentage").style("fill","rgba(0,0,0,1)")
    d3.selectAll(".ranking-team-" + team_index).selectAll("image").style("opacity","1")
    
    
    
    
}
function mouseout_ranking(d) {
    if (frozen) {
        return false;
    }
    
    // Info
    d3.select("#info-team-image")   .attr("cx",w_padding + country_data["png_width"]/2)
                                    .attr("cy",h_padding + country_data["png_height"]/2)
                                    .attr("height",country_data["png_height"])
                                    .attr("width",country_data["png_width"])
                                    .attr("xlink:href",function(d) {
                                        var base_dir = "/img/projects/pi-domestic-leagues/" + country + "/logos/" + String(size_img_large) + "/"
                                        return base_dir + country + ".png";
                                    })

    d3.select("#info-team-title").text("")
    d3.select("#info-team-text-0").select(".info-team-text-header").text(country_data["info"][0][0])
    d3.select("#info-team-text-0").select(".info-team-text-row").text(country_data["info"][0][1])
    d3.select("#info-team-text-1").select(".info-team-text-header").text(country_data["info"][1][0])
    d3.select("#info-team-text-1").select(".info-team-text-row").text(country_data["info"][1][1])
    d3.select("#info-team-text-2").select(".info-team-text-header").text(country_data["info"][2][0])
    d3.select("#info-team-text-2").select(".info-team-text-row").text(country_data["info"][2][1])
    d3.select("#info-team-text-3").select(".info-team-text-header").text(country_data["info"][3][0])
    d3.select("#info-team-text-3").select(".info-team-text-row").text(country_data["info"][3][1])
    
    // Header text
    d3.selectAll(".ranking-table-header-text").style("visibility","visible")
    
    // Add some Header text
    d3.selectAll(".ranking-table-header-text").text(function(d,i) {return d })
    
    // Remove table text
    d3.selectAll(".ranking-table-cell-text").style("visibility","visible")
    
    // Bars
    var i;
    for (i=0;i<number_of_teams;i++) {
        d3.select(".bar-" + String(i+1)).transition().attr("fill","rgba(255,255,255,0)").attr("width",0)
        d3.select(".ranking-percentage-" + String(i+1)).transition().style("visibility","hidden").attr("transform",function() {
                                                                                                          var x_translate = w_ranking - bar_start
                                                                                                          return "translate(" + x_translate +",0)"
                                                                                                        })
                                                                                                    .text("")       
        
    }
    
    // Graph
    
    d3.selectAll(".path-graph").style("stroke","rgba(0,0,0,1)")
    d3.selectAll(".flag-box").select(".flag-box-rect").style("stroke","rgba(0,0,0,1)")
    d3.selectAll(".flag-box").select(".flag-box-text").style("fill","rgba(0,0,0,1)")
    d3.selectAll(".flag-box-path").style("stroke","rgba(0,0,0,1)")
    
    // Games table
    d3.selectAll(".games-table-cell").selectAll("text").style("fill","rgba(0,0,0,1)")
    
    // Ranking table
    d3.selectAll(".ranking-row").selectAll("text").style("fill","rgba(0,0,0,1)")    
    d3.selectAll(".ranking-row").selectAll("image").style("opacity","1")

}
function mouseover_flagbox(d) {
    if (frozen) {
        return false;
    }
    // Team index
    var team_index = teams.indexOf(d)

    // Info
    team[d]
    d3.select("#info-team-image").attr("height",size_img_large)
                                                .attr("width",size_img_large) // Set correct dimensions
                                                .attr("xlink:href",function(d) {
                                                    var base_dir = "/img/projects/pi-domestic-leagues/" + country + "/logos/" + String(size_img_large) + "/"
                                                    return base_dir + team_index + ".png";
                                                });
    d3.select("#info-team-title").text(d)
    d3.select("#info-team-text-0").select(".info-team-text-header").text("Champion")
    d3.select("#info-team-text-0").select(".info-team-text-row").text(team[d]["odds_champion"] + "%")
    d3.select("#info-team-text-1").select(".info-team-text-header").text("Uefa CL")
    d3.select("#info-team-text-1").select(".info-team-text-row").text(team[d]["odds_ucl"] + "%")
    d3.select("#info-team-text-2").select(".info-team-text-header").text("Uefa EL")
    d3.select("#info-team-text-2").select(".info-team-text-row").text(team[d]["odds_uel"] + "%")
    d3.select("#info-team-text-3").select(".info-team-text-header").text("Relegation")
    d3.select("#info-team-text-3").select(".info-team-text-row").text(team[d]["odds_relegation"] + "%")
   
    // Graph
    d3.selectAll(".g-path-graph").selectAll(".path-graph").transition().duration(300).style("stroke","rgba(0,0,0,0.2)")
    d3.select("#g-path-" + String(team_index)).selectAll(".path-graph").transition().duration(300).style("stroke","rgba(0,0,0,1)")
    
    d3.selectAll(".flag-box").select(".flag-box-rect").transition().duration(300).style("stroke","rgba(0,0,0,0.2)")
    d3.selectAll(".flag-box").select(".flag-box-text").transition().duration(300).style("fill","rgba(0,0,0,0.2)")
    d3.select("#flag-box-" + String(team_index)).select(".flag-box-rect").transition().duration(300).style("stroke","rgba(0,0,0,1)")
    d3.select("#flag-box-" + String(team_index)).select(".flag-box-text").transition().duration(300).style("fill","rgba(0,0,0,1)")
    
    
    d3.selectAll(".flag-box-path").transition().duration(300).style("stroke","rgba(0,0,0,0.2)")
    d3.select("#flag-box-path-" + String(team_index)).transition().duration(300).style("stroke","rgba(0,0,0,1)")

    // Games Table
    d3.selectAll(".games-table-cell").selectAll("text").style("fill","rgba(0,0,0,0.2)")
    d3.selectAll(".games-team-" + team_index).selectAll("text").style("fill","rgba(0,0,0,1)")
    
    // Ranking table
    d3.selectAll(".ranking-row").selectAll("text").style("fill","rgba(0,0,0,0.2)")
    d3.selectAll(".ranking-row").selectAll("image").style("opacity","0.2")
    d3.selectAll(".ranking-percentage").style("fill","rgba(0,0,0,1)")
    d3.selectAll(".ranking-team-" + team_index).selectAll("text").style("fill","rgba(0,0,0,1)")
    d3.selectAll(".ranking-team-" + team_index).selectAll("image").style("opacity","1")
}
function mouseout_flagbox(d) {
    if (frozen) {
        return false;
    }
    
    // Info
    d3.select("#info-team-image")   .attr("cx",w_padding + country_data["png_width"]/2)
                                    .attr("cy",h_padding + country_data["png_height"]/2)
                                    .attr("height",country_data["png_height"])
                                    .attr("width",country_data["png_width"])
                                    .attr("xlink:href",function(d) {
                                        var base_dir = "/img/projects/pi-domestic-leagues/" + country + "/logos/" + String(size_img_large) + "/"
                                        return base_dir + country + ".png";
                                    })

    d3.select("#info-team-title").text("")
    d3.select("#info-team-text-0").select(".info-team-text-header").text(country_data["info"][0][0])
    d3.select("#info-team-text-0").select(".info-team-text-row").text(country_data["info"][0][1])
    d3.select("#info-team-text-1").select(".info-team-text-header").text(country_data["info"][1][0])
    d3.select("#info-team-text-1").select(".info-team-text-row").text(country_data["info"][1][1])
    d3.select("#info-team-text-2").select(".info-team-text-header").text(country_data["info"][2][0])
    d3.select("#info-team-text-2").select(".info-team-text-row").text(country_data["info"][2][1])
    d3.select("#info-team-text-3").select(".info-team-text-header").text(country_data["info"][3][0])
    d3.select("#info-team-text-3").select(".info-team-text-row").text(country_data["info"][3][1])
    
    // Graph
    d3.selectAll(".path-graph").transition().duration(300).style("stroke","rgba(0,0,0,1)")
    d3.selectAll(".flag-box").transition().duration(300).select(".flag-box-rect").style("stroke","rgba(0,0,0,1)")
    d3.selectAll(".flag-box").transition().duration(300).select(".flag-box-text").style("fill","rgba(0,0,0,1)")
    d3.selectAll(".flag-box-path").transition().duration(300).style("stroke","rgba(0,0,0,1)")

    // Games table
    d3.selectAll(".games-table-cell").selectAll("text").style("fill","rgba(0,0,0,1)")
    
    // Ranking table
    d3.selectAll(".ranking-row").selectAll("text").style("fill","rgba(0,0,0,1)")
    d3.selectAll(".ranking-row").selectAll("image").style("opacity","1")
}
function mouseover_game_table(d) {
    if (frozen) {
        return false;
    }
    var ht_index = teams.indexOf(d.HomeTeam)
    var at_index = teams.indexOf(d.AwayTeam)
    var team_indices = [ht_index,at_index]
    
    // Ranking Table
    d3.selectAll(".ranking-row").selectAll("text").style("fill","rgba(0,0,0,0.2)")
    d3.selectAll(".ranking-row").selectAll("image").style("opacity","0.2")
    d3.selectAll(".ranking-percentage").style("fill","rgba(0,0,0,1)")
    
    // Graph
    d3.selectAll(".g-path-graph").selectAll(".path-graph").transition().duration(300).style("stroke","rgba(0,0,0,0.2)")
    d3.selectAll(".flag-box").select(".flag-box-rect").transition().duration(300).style("stroke","rgba(0,0,0,0.2)")
    d3.selectAll(".flag-box").select(".flag-box-text").transition().duration(300).style("fill","rgba(0,0,0,0.2)")
    d3.selectAll(".flag-box-path").transition().duration(300).style("stroke","rgba(0,0,0,0.2)")
    
    // Games Table
    d3.selectAll(".games-table-cell").selectAll("text").style("fill","rgba(0,0,0,0.2)")
    var i;
    for (i=0;i<team_indices.length;i++) {
        // Ranking Table
        d3.selectAll(".ranking-team-" + team_indices[i]).selectAll("text").style("fill","rgba(0,0,0,1)")
        d3.selectAll(".ranking-team-" + team_indices[i]).selectAll("image").style("opacity","1")
        
        // Graph
        d3.select("#g-path-" + team_indices[i]).selectAll(".path-graph").transition().duration(300).style("stroke","rgba(0,0,0,1)")
        d3.select("#flag-box-" + team_indices[i]).select(".flag-box-rect").transition().duration(300).style("stroke","rgba(0,0,0,1)")
        d3.select("#flag-box-" + team_indices[i]).select(".flag-box-text").transition().duration(300).style("fill","rgba(0,0,0,1)")
        d3.select("#flag-box-path-" + team_indices[i]).transition().duration(300).style("stroke","rgba(0,0,0,1)")
        
        // Games table
        d3.selectAll(".games-team-" + team_indices[i]).selectAll("text").style("fill","rgba(0,0,0,1)")
    }

}
function mouseout_game_table(d) {
    if (frozen) {
        return false;
    }
    // Ranking table
    d3.selectAll(".ranking-row").selectAll("text").style("fill","rgba(0,0,0,1)")
    d3.selectAll(".ranking-row").selectAll("image").style("opacity","1")
    
    // Graph
    d3.selectAll(".path-graph").transition().duration(300).style("stroke","rgba(0,0,0,1)")
    d3.selectAll(".flag-box").transition().duration(300).select(".flag-box-rect").style("stroke","rgba(0,0,0,1)")
    d3.selectAll(".flag-box").transition().duration(300).select(".flag-box-text").style("fill","rgba(0,0,0,1)")
    d3.selectAll(".flag-box-path").transition().duration(300).style("stroke","rgba(0,0,0,1)")

    // Games table
    d3.selectAll(".games-table-cell").selectAll("text").style("fill","rgba(0,0,0,1)")
}
function slide() {
  slide_games = true;
  
  var value = brush.extent()[0];

  if (d3.event.sourceEvent) { // not a programmatic event
    value = GamesScale.invert(d3.mouse(this)[0]);
    brush.extent([value, value]);
  }
    
  value = Math.round(value)
  handle.attr("cx", GamesScale(value));
  
  handle_text.attr("transform", "translate(" + GamesScale(value) + "," +  h_games_slider/ 2 + ")")
  handle_text.text(value)
  
  handle_hover_circle.attr("transform", "translate(" + GamesScale(value) + "," +  h_games_slider/ 2 + ")")
  
  if ((value == 0)) {
      return false;
  }
  
  // Show correct table
  d3.selectAll(".game-table-gameday").style("visibility","hidden")
  d3.select("#game-table-gameday-" + String(value)).style("visibility","visible")
  
   if (value > current_gameday) {
       value = parseInt(current_gameday)
   }
  // Position Graph
    // Flag boxes position calculation
    var i;
    var y_coord = []
    for (i=0;i<teams.length;i++) {
        var y_coordinate = yScale(games_graph[graph_string][i][value-1].y)  
        y_coord.push([y_coordinate,i])
    }
    y_coord.sort(sortFunction);
    for (i=0;i<teams.length;i++) {
        y_coord[i][0] = i*(h_flag_box + padding_flag_box_h)
    }
    y_coord.sort(compareSecondColumn); 
    
    
    d3.selectAll(".flag-box").transition()    .attr("transform",function(d,i) {
                                                var x_translate = xScale(games_graph[graph_string][i][value-1].x) - w_graph
                                                var y_translate = y_coord[i][0] - h_flag_box/2 
                                                
                                                return "translate(" + x_translate + "," + y_translate + ")";
                                            })
    
   // Flag-box-path recalculation
    d3.selectAll(".flag-box-path").transition().attr('d', function(d) {
                                                    var team_index = d[1]
                                                    var x1 = xScale(games_graph[graph_string][team_index][value-1].x)
                                                    var y1 = (h_graphs - h_graph)/2 + yScale(games_graph[graph_string][team_index][value-1].y)
                                                    var x2 = x1 + w_flag_box_path
                                                    var y2 = y_coord[team_index][0] + h_graphs/8
                                                    var points = [  {"x":x1,"y":y1},
                                                                    {"x":x2,"y":y2}]
                                                    return flag_box_path_gen(points)
                                                })


   
    // Hide/Show Path
    d3.selectAll(".g-path-graph").selectAll(".path-graph").transition().style("visibility",function(d,i) { if (i < (value - 1)) {return "visible"} else {return "hidden"}})
    
}
function click_header(d) {
    if (["R","Pi","PiH","PiA"].indexOf(d) == -1) {
        return false;
    }
    
    // Header index
    var header_index = ranking_table_columns_header.indexOf(d)
    
    // Show correct graph
    var header_index = ranking_table_columns_header.indexOf(d)
    graph_string = ranking_table_columns[header_index]
    
    if (graph_string == "R") {
        graph_string = "rank"
    }
    
    // Change color of clicked
    d3.selectAll(".ranking-table-header-rect").attr("fill","rgba(255,255,255,0)")
    d3.selectAll(".ranking-table-header-text").attr("fill","rgba(0,0,0,1)")
    
    d3.select("#header-" + String(header_index)).select(".ranking-table-header-rect").attr("fill","rgba(0,0,0,1)")
    d3.select("#header-" + String(header_index)).select(".ranking-table-header-text").attr("fill","rgba(255,255,255,1)")
    
    // Sort table
    // Sort 
    var dummy = []
    var i;
    for (i=0;i<teams.length;i++) {
        if ((graph_string == "R") || (graph_string == "rank")) {
            dummy.push([parseInt(team[teams[i]]["standing"]["R"][0]),i])
        } else {
            dummy.push([team[teams[i]][graph_string],i])
        }
    }

    dummy.sort(sortFunction);
    var sort_header = new Object();
    if ((graph_string == "R") || (graph_string == "rank")) {
        for (i=0;i<teams.length;i++) {
            sort_header[dummy[i][1]] = i
        }
    }
    else {
        var count = 0
        for (i=teams.length-1;i>-1;i--) {
            sort_header[dummy[i][1]] = count
            count += 1
        }        
    }
    
    d3.selectAll(".ranking-row").attr("transform",function(d,i) {
                                    var x_translate = 0
                                    var y_translate = sort_header[i]*h_ranking_table_row
                                    return "translate(" + x_translate + "," + y_translate + ")";
                                })

    // Update Graph
    updateGraph(graph_string)
}
function updateGraph(graph_string) {
    // Get bounds
    graph_y_bounds = []  // [min,max]
    dummy = []
    var i,j;
    for (i=0;i<teams.length;i++) {
        for (j=0;j<games_graph[graph_string][i].length;j++) {
            if (games_graph[graph_string][i][j].y != "nan") {
                dummy.push(math.number(games_graph[graph_string][i][j].y))
            }
        }
    }
    
    delta = math.max(math.abs(0.1*math.min(dummy)),math.abs(0.1*math.max(dummy)))
    if (graph_string == "rank") {
        graph_y_bounds.push(math.max(dummy) + 1)
        graph_y_bounds.push(math.min(dummy) - 1)   
    } else {
        graph_y_bounds.push(math.min(dummy) - delta)
        graph_y_bounds.push(math.max(dummy) + delta)    
    }    
    
    
    // Change Scale                          
    yScale = d3.scale.linear().range([h_graph, 0]).domain([graph_y_bounds[0],graph_y_bounds[1]]); // .domain([-0.5,1.5])
    yAxis.scale(yScale)
    
    
    d3.select("#x-axis").call(xAxis)
    d3.select("#y-axis").call(yAxis)
    
    // Update Data
    d3.selectAll(".g-path-graph").remove()
    
    d3.select("#graph-standing").selectAll('.g-path-graph')
                    .data(function() {
                        var data_output = []
                        var i;
                        for (i=0;i<teams.length;i++) {
                            data_output.push([])
                            for (j=1;j<current_gameday;j++) {
                                    data_output[data_output.length-1].push([games_graph[graph_string][i][j-1],games_graph[graph_string][i][j]])
                            }
                        }
                        return data_output
                    })
                    .enter().append("g")
                    .attr("class","g-path-graph")
                    .attr("id",function(d,i) {
                        return "g-path-" + String(i) 
                    })
                    .selectAll(".path-graph")
                    .data(function(d) {
                        return d;
                    }).enter().append("path")
                    .attr("class",function(d,i) {
                        return "path-graph"
                    })
                    .attr("id",function(d,i) {
                        return "path-graph-" + String(i) 
                    })
                    .attr('d', function(d) {
                        return lineGen(d)
                    })
                    .attr('stroke', "rgba(0,0,0,1)")
                    .attr('stroke-width', 1)
                    .attr('fill', 'none');    


    // Flag boxes position calculation
    var i;
    var y_coord = []
    for (i=0;i<teams.length;i++) {
        var y_coordinate = yScale(games_graph[graph_string][i][current_gameday-1].y)  
        y_coord.push([y_coordinate,i])
    }
    y_coord.sort(sortFunction);
    for (i=0;i<teams.length;i++) {
        y_coord[i][0] = i*(h_flag_box + padding_flag_box_h)
    }
    y_coord.sort(compareSecondColumn);
    
    d3.selectAll(".flag-box")   .attr("transform",function(d,i) {
                                    var x_translate = 0
                                    var y_translate = y_coord[i][0] - h_flag_box/2 
                                    
                                    return "translate(" + x_translate + "," + y_translate + ")";
                                })
                                
    d3.selectAll(".flag-box-path").remove()
                                    
    d3.select("#graphs").selectAll('.flag-box-path')
                                .data(y_coord)
                                .enter().append("path")
                                .attr('d', function(d) {
                                    var team_index = d[1]
                                    var x1 = xScale(games_graph[graph_string][team_index][current_gameday-1].x)
                                    var y1 = (h_graphs - h_graph)/2 + yScale(games_graph[graph_string][team_index][current_gameday-1].y)
                                    var x2 = w_graph + w_flag_box_path
                                    var y2 = (h_graphs - h_graph)/2 + d[0]
                                    var points = [  {"x":x1,"y":y1},
                                                    {"x":x2,"y":y2}]
                                    return flag_box_path_gen(points)
                                })
                                .attr("id",function(d,i) {
                                    return "flag-box-path-" + String(i) 
                                })
                                .attr("class","flag-box-path")
                                .attr('stroke', "rgba(0,0,0,1)")
                                .attr('stroke-width', 1)
                                .attr('fill', 'none');
                                    



    

}

// Help Functions
function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}
function compareSecondColumn(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] < b[1]) ? -1 : 1;
    }
}
function range(start, end, interval) {
    var foo = [];
    for (var i = start; i <= end; i+= interval) {
        foo.push(i);
    }
    return foo;
}