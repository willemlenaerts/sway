function buildBracket(league,start_league,start_view,container_name) {
// Ajax url's
var data_url = "http://www.sway-blog.be/data/elo-uefa-leagues/data.json"
var ajax_call_data = $.ajax({
      url: data_url,
      dataType: 'json',
      crossDomain: true, // enable this
    })

var date_url = "http://www.sway-blog.be/data/elo-uefa-leagues/date.json"
var ajax_call_date = $.ajax({
          url: date_url,
          dataType: 'json',
          crossDomain: true, // enable this
        })

var teams_url = "http://www.sway-blog.be/data/elo-uefa-leagues/teams.json"
var ajax_call_teams = $.ajax({
          url: teams_url,
          dataType: 'json',
          crossDomain: true, // enable this
        })

var knockout_round_url = "http://www.sway-blog.be/data/elo-uefa-leagues/knockout_round.json"
var ajax_call_knockout_round = $.ajax({
          url: knockout_round_url ,
          dataType: 'json',
          crossDomain: true, // enable this
        })
 
// Get data       
$.when(ajax_call_data,ajax_call_date,ajax_call_teams,ajax_call_knockout_round).done(function(data1, data2, data3,data4){
    
    // Initialize data
    var team_data = data1[0]
    var last_update = data2[0]
    var teams_index = data3[0]
    var knockout_round = data4[0]

    var number_of_games = knockout_round[league][knockout_round[league].length-1]["games"].length
    var number_of_teams = 2*number_of_games
    number_of_rounds = (Math.log(number_of_games) / Math.log(2)) + 1 // This includes the odds of WINNING final
    
    // Create dataset that will be linked to team box on SVG
    var dataset_games = []
    var dataset_teams = []
    var i,j;
    for (j=0;j<number_of_games;j++) {
            var team_1 = knockout_round[league][knockout_round[league].length-1]["games"][j][0]
            var team_2 = knockout_round[league][knockout_round[league].length-1]["games"][j][1]
            team_data[league][team_1].name = team_1
            team_data[league][team_1].opponent = team_2
            
            team_data[league][team_2].name = team_2
            team_data[league][team_2].opponent = team_1
            
            dataset_games.push([team_data[league][team_1],team_data[league][team_2]])
            dataset_teams.push(team_data[league][team_1])
            dataset_teams.push(team_data[league][team_2])
        }
    
    var dataset_infobar = []
    if (league == "ucl") {
        dataset_infobar.push("Round of 16","Quarter-finals","Semi-finals","Final","Semi-Finals","Quarter-finals","Round of 16")
    } else if (league == "uel") {
        dataset_infobar.push("Round of 32","Round of 16","Quarter-finals","Semi-finals","Final","Semi-Finals","Quarter-finals","Round of 16","Round of 32")
    }
    
    var dataset_chance_text = ["Chance of", "Winning", "Tournament"]
    var dataset_hover_text = ["Hover over team", "to see odds of", "reaching every round"]
    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    // Dimension parameters
    var w = $("#" + container_name).width()
    var h = 80*number_of_games // Math.min($(window).height() - 60 - 40
    
    var w_padding = 0.01*w
    var h_padding = 0.01*h
    
    // Calculate width dimensions
    var round_to_game_w_ratio = 0.9; // One round is 1.2 x the width of a game 
    var w_game = 1.1*(w/2 - w_padding)/(round_to_game_w_ratio*number_of_rounds + 1)
    var w_team = w_game 
    var w_round = (w/2 - w_padding-w_game)/(number_of_rounds-1)
    var round_padding = (round_to_game_w_ratio-1)*w_round
    
    // Calculate height dimensions
    var w_infobar = w - 2*w_padding
    var h_infobar = Math.max(h_padding - 2*0.01*h,30)
    var infobar_padding = h_infobar
    
    var h_game = Math.max(Math.min((h - 2*h_padding - h_infobar - infobar_padding - (number_of_games/2-1)*50)/(number_of_games/2),45),45)
    var team_padding = 0.05*h_game
    h_team = (h_game - team_padding)/2// h_game/2
    var game_padding = (h - 2*h_padding - h_infobar - infobar_padding - h_game*number_of_games/2)/(number_of_games/2 - 1)
    
    var h_final = h_game // height of final path to circle
    
    var h_img_small = 32
    var w_img_small = 32
    var h_img_large = 70
    var w_img_large = 70
    
    var img_diagonal = Math.sqrt(Math.pow(h_img_large,2) + Math.pow(w_img_large,2))/2
    var r_circle = Math.max(w_round/3,img_diagonal) //Math.max(w_round/3,h_img_large/2)
    
    var h_final_text = r_circle/2
    
    var h_chance_text = h_final_text * (dataset_chance_text.length )
    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    
    // Initialize SVG
    var svg = d3.select("#" + container_name)
            .append("svg")
            .attr("id","svg_" + league)
            .style("display",function() {
                if ((league == start_league) & (start_view == "bracket")) {
                    return "";
                } else {
                    return "none";
                }
            })
            .attr("width", w)
            .attr("height", h)
            
    // Create Game Groups
    var gamegroup = svg .selectAll("g")
                        .data(dataset_games)
                        .enter()
                        .append("g")
                        .attr("class","game-group")
                        .attr("id",function(d,i) {
                            return "game_" + String(i)
                        })
                        .attr("transform",function(d,i) {
                            if (i < number_of_games/2) { // Games on the left
                                var x_translate = w_padding
                                var y_translate = h_padding + h_infobar + infobar_padding + i*(h_game + game_padding)                               
                            } else { // Games on the right
                                var x_translate = w - w_padding - w_game
                                var y_translate = h_padding + h_infobar + infobar_padding + (i-number_of_games/2)*(h_game + game_padding)                                  
                            }
                            return "translate(" + x_translate + "," + y_translate + ")";
                        })
    
    // Create Team Groups
    var teambox = gamegroup .selectAll("g")
                            .data(function(d) {
                                return d;
                            })
                            .enter()
                            .append("g")
                            .attr("id",function(d) {
                                return d.name;
                            })
                            .attr("class","team-group")
                            .attr("transform",function(d,i) {
                                if (i == 1) {
                                    var y_translate = h_team + team_padding
                                    return "translate(0," + y_translate + ")";
                                }
                            })
                            
                            .on("mouseover",mouseover)
                            .on("mouseout",mouseout);
    
    // Fill Team Groups
    // Rectangle
    var teamrect = teambox  .append("rect")
                            .attr("width",w_team)
                            .attr("height",h_team)
                            .attr("stroke","rgb(0,0,0)")
                            .attr("stroke-width",1)
                            .attr("fill","rgb(0,0,0)")    
                            .on("mouseover",mouseover)
                            .on("mouseout",mouseout)
    
    // Fill with text
    var teamtext = teambox  .append("text")
                            .attr("x", function(d,i) {
                                if (dataset_teams.indexOf(d) < number_of_games) { // Left
                                    return w_game - 0.03*w_game;
                                } else { // Right
                                    return 0 + 0.03*w_game;
                                }
                            })
                            .attr("y",h_team/2) 
                            .style("text-align","center")
                            .style("text-anchor", function(d,i) {
                                if (dataset_teams.indexOf(d) < number_of_games) { // Left
                                    return "end";
                                } else { // Right
                                    return  "start";
                                }
                            })
                            .style("fill","rgb(255,255,255)")
                            .attr("dy", ".35em")
                            .text(function(d) { 
                                if (d.name == "Lokomotiv Moskva") {
                                    return "Lokomotiv"
                                } else if (d.name == "Shakhtar Donetsk") {
                                    return "Shakhtar"
                                }
                                
                                return d.name; 
                            })
                            .on("mouseover",mouseover)
                            .on("mouseout",mouseout)
                            
    // Generate Paths
    // Path parameters
    var path_small = h_team
    var path_large = w_team
    
    // Path function (linear) & Create texts
    var lineFunction = d3.svg.line()
                             .x(function(d) { return d.x; })
                             .y(function(d) { return d.y; })
                             .interpolate("linear");
    
    var g,t,r,start_point,delta_y,start_point_t,end_point,end_point_t,points,team_name,vertical_offset,delta_vertical_offset,delta_up,p1,p2,p3,horizontal_offset;
    for (g=0;g<number_of_games;g++) { // number_of_games
        if (g<number_of_games/2) {
            start_point = {"x":w_padding + w_game,"y":h_padding + h_infobar + infobar_padding + g*(h_game + game_padding),"index":g,"side":"left"}
        } else {
            start_point = {"x":w-w_padding - w_game,"y":h_padding + h_infobar + infobar_padding + (g-number_of_games/2)*(h_game + game_padding),"index":g,"side":"right"}
        }

        for (t=0;t<2;t++) { // 2
            // Team name
            team_name = dataset_games[g][t].name
            
            if (t == 0) {
               delta_y = h_team/2 
            } else {
               delta_y = h_team/2 + h_team + team_padding 
            }
            // delta_y = t*h_team + h_team/2 
            
            if (t==0) {
                delta_vertical_offset = h_team/2 + team_padding/2
            } else {
                delta_vertical_offset = -h_team/2 - team_padding/2
            }
            // Finetune start point
            start_point_t = start_point
            start_point_t = {"x":start_point_t.x,"y":start_point_t.y + delta_y,"index":start_point_t.index,"side":start_point.side}
            
            // Get end point based on start_point
            // end_point_t = end_point
            for (r=0;r<number_of_rounds;r++) { // number_of_rounds
                ////////////////////////////////////////////////////////////////
                ////////////////////////////////////////////////////////////////
                // Generate Paths
                // vertical_offset
                delta_up = 2*delta_y - h_game
                
                
                vertical_offset = Math.pow(2,r)*((h_game/2 + game_padding/2) + delta_vertical_offset) // (r+1)
                horizontal_offset = w_round
                if (r > 0) {
                    delta_up = 0
                    vertical_offset = Math.pow(2,r)*(h_game/2 + game_padding/2) 
                } 
                if (r == number_of_rounds -2) {
                    vertical_offset = 0
                } else if (r == number_of_rounds -1) {
                    if (start_point_t.index%2 == 0) { // Go DOWN
                        vertical_offset = -h_final
                    } else {
                        vertical_offset = h_final // /2 + game_padding/2
                    }
                    delta_up = 0
                    horizontal_offset = 0
                }
                if (start_point_t.side == "left") { // Go RIGHT
                    if (start_point_t.index%2 == 0) { // Go DOWN
                        end_point_t = {"x":start_point_t.x + horizontal_offset,"y":start_point_t.y + vertical_offset,"index":Math.floor(start_point_t.index/2),"side":start_point_t.side}
                    } else { // Go UP
                        vertical_offset += delta_up
                        end_point_t = {"x":start_point_t.x + horizontal_offset,"y":start_point_t.y - vertical_offset,"index":Math.floor(start_point_t.index/2),"side":start_point_t.side}
                    } 
                } else { // Go LEFT
                    if (start_point_t.index%2 == 0) { // Go DOWN
                        end_point_t = {"x":start_point_t.x - horizontal_offset,"y":start_point_t.y + vertical_offset,"index":Math.floor(start_point_t.index/2),"side":start_point_t.side}
                    } else { // Go UP
                        vertical_offset += delta_up
                        end_point_t = {"x":start_point_t.x - horizontal_offset,"y":start_point_t.y - vertical_offset,"index":Math.floor(start_point_t.index/2),"side":start_point_t.side}
                    }                    
                }
                

                // Draw path
                points = []
                points.push(start_point_t)
                
                // Add middle points
                if (r == 0) {
                    if (t == 0) {
                        if (start_point_t.side == "left") {
                            p1 = {"x":start_point_t.x + path_small,"y":start_point_t.y}
                            p2 = {"x":p1.x,"y":p1.y + h_team/2 + team_padding/2}
                            p3 = {"x":p2.x + w_round - path_small,"y":p2.y}                              
                        } else {
                            p1 = {"x":start_point_t.x - path_small,"y":start_point_t.y}
                            p2 = {"x":p1.x,"y":p1.y + h_team/2 + team_padding/2}
                            p3 = {"x":p2.x - (w_round - path_small),"y":p2.y}                              
                        }
                      
                    } else {
                        if (start_point_t.side == "left") {
                            p1 = {"x":start_point_t.x + path_small,"y":start_point_t.y}
                            p2 = {"x":p1.x,"y":p1.y - (h_team/2 + team_padding/2)}
                            p3 = {"x":p2.x + w_round - path_small,"y":p2.y}     
                        } else {
                            p1 = {"x":start_point_t.x - path_small,"y":start_point_t.y}
                            p2 = {"x":p1.x,"y":p1.y - (h_team/2 + team_padding/2)}
                            p3 = {"x":p2.x - (w_round - path_small),"y":p2.y}                             
                        }
                    }
                    points.push(p1,p2,p3)
                } else {
                    if (r != number_of_rounds -1) {
                        if (start_point_t.side == "left") {
                            p1 = {"x":start_point_t.x + w_round,"y":start_point_t.y}
                        } else {
                            p1 = {"x":start_point_t.x - w_round,"y":start_point_t.y}
                        }       
                        points.push(p1)
                    } 
                    
                }
                
                points.push(end_point_t)
                svg .append("path")
                    .attr("d",lineFunction(points))
                    .attr("id",team_name.replace(".","").replace(" ","_") + "_" + String(r))
                    .attr("stroke","black")
                    .attr("stroke-width",1)
                    .attr("fill","none")
                
                // Create TEXT element
                svg .append("text")
                    .attr("id",team_name.replace(".","").replace(" ","_") + "_text_" + String(r))
                    .attr("class",function() {
                        if (r == number_of_rounds - 1) { 
                            return "percentage-final"
                        } else {
                            return "percentage"
                        }
                    })
                    .attr("x",function(d,i) { // CENTRALIZE IN RECT
                    if (start_point_t.side == "left") { // Go RIGHT
                        if (r == 0) {
                            return start_point_t.x + path_small + (w_round-path_small)/2;
                        } else if (r == number_of_rounds - 1) {
                            return w/2;
                        } else {
                            return start_point_t.x + w_round/2
                        }
                    } else {
                        if (r == 0) {
                            return start_point_t.x - path_small - (w_round-path_small)/2;
                        } else if (r == number_of_rounds - 1) {
                            return w/2;
                        } else {
                            return start_point_t.x - w_round/2
                        }                        
                    }
                    })
                    .attr("y",function(d,i) { // CENTRALIZE IN RECT
                        if (r == 0) {
                            if (t == 0) {
                                return start_point_t.y - h_team/3;
                            } else {
                                return start_point_t.y + h_team/3;
                            }
                            
                        } else if (r == number_of_rounds - 1) {
                            return h/2 + (h_infobar + infobar_padding)/2- h_final - 2*r_circle - h_final_text;
                        } else {
                            return start_point_t.y + 0.7*h_team;
                        }
                        
                    })
                    .attr("dy","0.35em")
                    .style("text-anchor", "middle")
                    .text("")                  
                
                
                // New start_point & end_point
                start_point_t = end_point_t
            }
        }

    }
    
    // Add "Chance of Winning Tournament" text
    var chance_text_group = svg .append("g")
                                .attr("transform",function() {
                                    var x_translate = w/2
                                    var y_translate = h/2 + (h_infobar + infobar_padding)/2 - h_final - 2*r_circle - h_final_text - h_chance_text
                                    return "translate(" + x_translate + "," + y_translate + ")";
                                })
                                .selectAll("text")
                                .data(dataset_chance_text)
                                .enter()
                                .append("text")
                                .attr("class","chance-text")
                                .style("display","none")
                                .attr("x",0)
                                .attr("y",function(d,i) {
                                    return String(i+0.2) + "em"
                                })
                                .attr("dy","0.35em")
                                .text(function(d) {
                                    return d;
                                })
    
    // Add "Hover" text
    var hover_text_group = svg .append("g")
                                .attr("transform",function() {
                                    var x_translate = w/2
                                    var y_translate = h/2 + (h_infobar + infobar_padding)/2 + 2*h_final
                                    return "translate(" + x_translate + "," + y_translate + ")";
                                })
                                .selectAll("text")
                                .data(dataset_hover_text)
                                .enter()
                                .append("text")
                                .attr("class","hover-text")

                                .attr("x",0)
                                .attr("y",function(d,i) {
                                    return String(i+0.2) + "em"
                                })
                                .attr("dy","0.35em")
                                .text(function(d) {
                                    return d;
                                })    
    // Create Circle
    var circle_group = svg  .append("g")
                            .attr("transform",function(d,i) {
                                var x_translate = w/2 - r_circle
                                var y_translate = h/2 + (h_infobar + infobar_padding)/2 - h_final - 2*r_circle
                                return "translate(" + x_translate + "," + y_translate + ")";
                            })
                            
    var circle = circle_group.append("circle")
                    .attr("cx",r_circle)
                    .attr("cy",r_circle)
                    .attr("fill","rgb(255,255,255)")
                    .attr("stroke","rgb(0,0,0)")
                    .attr("stroke-width",1)
                    .attr("r",r_circle)
    
    var circle_image = circle_group .append("image")
                                    .attr("id","circle_image_" + league)
                                    .attr("x",r_circle - w_img_large/2)
                                    .attr("y",r_circle - h_img_large/2)
                                    .attr("height",h_img_large)
                                    .attr("width",w_img_large)
                                    .attr("xlink:href",function(d) {
                                        var base_dir = "/img/projects/elo-uefa-leagues/large/"
                                        return base_dir + league + ".png";
                                    }); 
   
    // Create Informative bar on top
    var infobar = svg   .append("g")
                        .attr("id","infobar")
                        .attr("transform",function(d,i) {
                            var x_translate = w_padding
                            var y_translate = 0.01*h
                            return "translate(" + x_translate + "," + y_translate + ")";
                        })
    
    var infobar_rect = infobar  .append("rect")
                                .attr("width",w_infobar)
                                .attr("height",h_infobar)
                                .attr("stroke","rgb(0,0,0)")
                                .attr("stroke-width",1)
                                .attr("fill","rgb(255,255,255)") 

    var infobar_group = infobar .selectAll("g")
                                .data(dataset_infobar)
                                .enter()
                                .append("g")
                                .attr("class","infobar")
                                .attr("transform",function(d,i) {
                                    if (i == 0) {
                                        var x_translate = 0
                                        var y_translate = 1
                                        return "translate(" + x_translate + "," + y_translate + ")";                                        
                                    } else if (i == 1) {
                                        var x_translate = w_game + path_small
                                        var y_translate = 1
                                        return "translate(" + x_translate + "," + y_translate + ")";                                        
                                    } else if (i <= number_of_rounds - 1) {
                                        var x_translate = w_game + (i-1)*w_round
                                        var y_translate = 1 
                                        return "translate(" + x_translate + "," + y_translate + ")";     
                                    }  else {
                                        var x_translate = w_game + w_round + (i-1)*w_round
                                        var y_translate = 1    
                                        return "translate(" + x_translate + "," + y_translate + ")";     
                                    }
                                })
                                
    
    var infobar_group_rect = infobar_group  .append("rect")
                                            .attr("width",function(d,i) {
                                                if ((i == 0) || (i == dataset_infobar.length - 1)) {
                                                    return w_game
                                                } else if ((i == 1) || (i == dataset_infobar.length - 2)) {
                                                    return w_round - path_small
                                                } else if ((i < number_of_rounds - 1) || (i > number_of_rounds - 1)) {
                                                    return w_round
                                                } else if (i == number_of_rounds - 1)  { 
                                                    return 2*w_round
                                                } 
                                            })
                                            .attr("height",h_infobar-2)
                                            .attr("fill","rgb(255,255,255)") 
                            
     var infobar_group_text = infobar_group .append("text")
                                            .attr("x",function(d,i) { // CENTRALIZE IN RECT
                                                if ((i == 0) || (i == dataset_infobar.length - 1)) {
                                                    return w_game/2;
                                                } else if ((i == 1) || (i == dataset_infobar.length - 2)) {
                                                    return (w_round - path_small)/2
                                                } else if ((i < number_of_rounds - 1) || (i > number_of_rounds - 1)) {
                                                   return w_round/2
                                                } else if (i == number_of_rounds - 1)  { 
                                                    return w_round
                                                }
                                                
                                                
                                            })
                                            .attr("y",((h_infobar-2)/2))
                                            .attr("dy","0.35em")
                                            .attr("class","infobar-text")
                                            .text(function(d) {
                                                return d;
                                            })
    
    // Create footnote on bottom
    var footnote_text = svg .append("text")
                            .attr("x",w/2)
                            .attr("y",h-h_team)
                            .attr("dy","0.35em")
                            .attr("class","footnote-text")
                            .text("*After every knockout stage new games will be drawn")
})

}
var mouseover = function(d,i) {
    // Get team name
    var team_name = d.name
    
    // Find paths
    var r;
    for (r=0;r<number_of_rounds;r++) {
        // Change stroke width of paths
        d3  .select("#" + team_name.replace(".","").replace(" ","_") + "_" + String(r))
            .transition().duration(200).delay(r*90)
            .attr("stroke-width",(d.odds[r+4]/100)*h_team)
            .attr("stroke","rgb(0,0,139)")
        
        // Show text
        var percentage = String(d.odds[r+4])
        if (percentage == "0") {
            percentage = "<1"
        }
        d3  .select("#" + team_name.replace(".","").replace(" ","_") + "_text_" + String(r))
        .transition().duration(0).delay(0)
        .text(percentage + "%")
    }
    
    // Image
    var base_dir;
    d3.select("#circle_image_" + league).attr("xlink:href",function(d) {
        base_dir = "/img/projects/elo-uefa-leagues/large/"
        return base_dir + team_name + ".png";
    }); 
    
    // Chance text
    d3.selectAll(".chance-text").transition().delay(0).style("display","")
}
var mouseout = function(d,i) {
    // Get team name
    var team_name = d.name
    
    // Find paths
    var r;
    for (r=0;r<number_of_rounds;r++) {
        d3  .select("#" + team_name.replace(".","").replace(" ","_") + "_" + String(r))
            .transition().duration(200).delay(0)
            .attr("stroke-width",1)
            .attr("stroke","rgb(0,0,0)")
            
        d3.select("#" + team_name.replace(".","").replace(" ","_") + "_text_" + String(r)).transition().duration(0).delay(0).text("")
    } 
    
    // Image
    var base_dir;
    d3.select("#circle_image_" + league).attr("xlink:href",function(d) {
        base_dir = "/img/projects/elo-uefa-leagues/large/"
        return base_dir + league + ".png";
    });            
    
    // Chance text
    d3.selectAll(".chance-text").transition().delay(0).style("display","none")
}