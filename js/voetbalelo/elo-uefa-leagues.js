// google.load("visualization", "1", {packages:["corechart"]});
// google.setOnLoadCallback(drawChart_standing);
function drawChart_standing() {
      standing_forecast_regular = team_data[competition_selected]["standing_forecast_regular"]
      teams = team_data[competition_selected]["teams"]
      
      // Prepare data (make sum to 100%)
      if (competition_selected == "Belgium") {
            series_colors = {
                            0:{color:gold},
                            1:{color:silver},
                            2:{color:blue},
                            3:{color:red}
                            }
          
            var data_table = [];
            data_table.push(["Final Ranking", "Title", {'role': 'tooltip', 'p': {'html': true}},"PO I",{'role': 'tooltip', 'p': {'html': true}}, "PO II",{'role': 'tooltip', 'p': {'html': true}}, "PO III", {'role': 'tooltip', 'p': {'html': true}}])
          for (i=0;i<teams.length;i++) {
                 if (i==0) {
                    data_table.push([String(i+1),
                                    standing_forecast_regular[team_selected_index][i], customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),
                                     0, customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),
                                     0, customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),
                                     0, customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i])])
                } else if (i<6) {
                    data_table.push([String(i+1),
                                    0, customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),           
                                    standing_forecast_regular[team_selected_index][i], customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),
                                     0, customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),
                                     0, customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i])])                
                    
                } else if (i<14) {
                    data_table.push([String(i+1),
                                    0, customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),           
                                    0, customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),
                                    standing_forecast_regular[team_selected_index][i], customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),
                                    0, customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i])])  
                } else {
                    data_table.push([String(i+1),
                                    0, customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),           
                                    0, customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),
                                    0, customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),
                                    standing_forecast_regular[team_selected_index][i], customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),
                                   ])
                }
          }
      } else {
        var data_table = [];
        data_table.push(["Final Ranking", "Title", {'role': 'tooltip', 'p': {'html': true}}, 
                                            "CL", {'role': 'tooltip', 'p': {'html': true}},
                                            "EL", {'role': 'tooltip', 'p': {'html': true}},
                                            "Safe", {'role': 'tooltip', 'p': {'html': true}},
                                            "Rel.", {'role': 'tooltip', 'p': {'html': true}}])
          for (i=0;i<teams.length;i++) {
            series_colors = {
                            0:{color:gold},
                            1:{color:silver},
                            2:{color:dark_red},
                            3:{color:blue},
                            4:{color:red}
                            }

                // Champion: gold
                 if (i == 0) { // rgb(162,213,161)
                    data_table.push([String(i+1),
                                    standing_forecast_regular[team_selected_index][i],customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),
                                    0,customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),
                                    0,customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),
                                    0,customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),
                                    0,customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i])])
                // Champions league: silver
                } else if (i < team_data[competition_selected]["cl_spots"]) {
                    data_table.push([String(i+1),
                                    0,customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),
                                    standing_forecast_regular[team_selected_index][i],customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),
                                    0,customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),
                                    0,customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),
                                    0,customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i])])                    
                // Europa league: dark red
                } else if (i < team_data[competition_selected]["cl_spots"] + team_data[competition_selected]["el_spots"]) {
                    data_table.push([String(i+1),
                                    0,customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),
                                    0,customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),
                                    standing_forecast_regular[team_selected_index][i],customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),
                                    0,customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),
                                    0,customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i])])                     
                // Relegation: red
                } else if (i >= teams.length - team_data[competition_selected]["degr_spots"]) {
                    data_table.push([String(i+1),
                                    0,customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),
                                    0,customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),
                                    0,customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),
                                    0,customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),
                                    standing_forecast_regular[team_selected_index][i],customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i])])                 
                // All the rest: blue
                } else {
                    data_table.push([String(i+1),
                                    0,customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),
                                    0,customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),
                                    0,customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),
                                    standing_forecast_regular[team_selected_index][i],customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),
                                    0,customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i])])                     
                }
          }          
          
          
      }
      console.log(data_table)
    //   var data_table = [];
    //   data_table.push(["Final Ranking", "Probability (%)", { role: "style" } ])

    //   standing_forecast_regular = team_data[competition_selected]["standing_forecast_regular"]
    //   teams = team_data[competition_selected]["teams"]
      
    //   // Prepare data (make sum to 100%)
    //   if (competition_selected == "Belgium") {
    //       for (i=0;i<teams.length;i++) {
    //              if (i==0) {
    //                 data_table.push([String(i+1),standing_forecast_regular[team_selected_index][i], gold])
    //             } else if (i<6) {
    //                 data_table.push([String(i+1),standing_forecast_regular[team_selected_index][i], silver])
    //             } else if (i<14) {
    //                 data_table.push([String(i+1),standing_forecast_regular[team_selected_index][i], blue])
    //             } else {
    //                 data_table.push([String(i+1),standing_forecast_regular[team_selected_index][i], red])
    //             }
    //       }
    //   } else {
    //       for (i=0;i<teams.length;i++) {
    //             // Champion: gold
    //              if (i == 0) { // rgb(162,213,161)
    //                 data_table.push([String(i+1),standing_forecast_regular[team_selected_index][i], gold])
    //             // Champions league: silver
    //             } else if (i < team_data[competition_selected]["cl_spots"]) {
    //                 data_table.push([String(i+1),standing_forecast_regular[team_selected_index][i], silver])
                    
    //             // Europa league: dark red
    //             } else if (i < team_data[competition_selected]["cl_spots"] + team_data[competition_selected]["el_spots"]) {
    //                 data_table.push([String(i+1),standing_forecast_regular[team_selected_index][i], dark_red])
                    
    //             // Relegation: red
    //             } else if (i >= teams.length - team_data[competition_selected]["degr_spots"]) {
    //                 data_table.push([String(i+1),standing_forecast_regular[team_selected_index][i], red])
                
    //             // All the rest: blue
    //             } else {
    //               data_table.push([String(i+1),standing_forecast_regular[team_selected_index][i], blue]) 
    //             }
    //       }          
          
          
    //   }
      var data_vis = google.visualization.arrayToDataTable(data_table);

      var view = new google.visualization.DataView(data_vis);
    
    //   max_odds_array = []
    //   for (i=0;i<teams.length;i++) {
    //       max_odds_array.push(Math.max.apply(Math,standing_forecast_regular[i]))
    //   }
      
    //   max_odds = 10*Math.ceil(Math.max.apply(Math,max_odds_array)/10)
      
      max_odds = 10*Math.ceil(Math.max.apply(Math,standing_forecast_regular[team_selected_index])/10)
      
      var options = {
            tooltip: { isHtml: true }, 
            series: series_colors,
            isStacked: true,
            legend:{position:'none'},
            // legend:{position:'right', textStyle: {fontName: 'Lora',fontSize: 12}},
            curveType: 'function', // Smooth
            hAxis: {
              viewWindowMode:'explicit',
              viewWindow:{
                max:teams.length,
                min:0
              },
              textStyle: {
                color: 'black', 
                fontName: 'Lora', 
                fontSize: '10'
              },
            title: 'Final Ranking',
            titleTextStyle: {
                color: '#5c5c5c',
                fontName: 'Lora', 
                fontSize: '12'
            }
        },
            vAxis: {
              viewWindowMode:'explicit',
              viewWindow:{
                max:max_odds,
                min:0
              },
            textStyle: {
                color: 'black', 
                fontName: 'Lora', 
                fontSize: '10'
              },
            gridlines: {
                count: (max_odds)/10 + 1 // try to pick the correct number to create intervals of 50000 
            },
            title: 'Probability (%)',
            titleTextStyle: {
                color: '#5c5c5c',
                fontName: 'Lora', 
                fontSize: '12'
            }
        }
      };
      
      var chart = new google.visualization.ColumnChart(document.getElementById("endranking_graph"));
      chart.draw(view, options);
  }

function customTooltipChartStanding(ranking,probability) {
    
    if (ranking == "1") {
        string_ranking = '<strong>' + ranking + "st" + '</strong>'
    } else if (ranking == "2") {
        string_ranking = '<strong>' + ranking + "nd" + '</strong>'
    } else {
        string_ranking = '<strong>' + ranking + "th" + '</strong>'
    }
    
  return '<div style="text-size:12px;font-family: Lora;padding:5px 5px 5px 5px;">' +
  '<table>' + 
  '<thead>' +
  '<tr>' +
  '<th style="white-space:nowrap;padding-bottom:3px !important;text-align:center !important;border-bottom: 1px #000000 solid !important;" colspan="2">' +
      '<img src="/img/projects/elo-domestic-leagues/' + competition_selected + '/' + teams[team_selected_index] + '.png"' + ' style="width:20px;height:20px">' +
    '&nbsp;' + '<strong>' + team_selected + '</strong>' +
    '</th>' +
    '</tr>' +
    '</thead>' +
'<tbody>' +
  '<tr>' +
  '<td style="padding-top: 3px !important;white-space:nowrap;">' +
     string_ranking + " place:" + '&nbsp;' +
    '</td>' + 
    '<td style="padding-top: 3px !important;white-space:nowrap;">' + 
    "<strong>" + String(probability) +  "</strong>" + "% chance" +
    '</td>' +
    '</tr>' +
    '</tbody>' +
    '</table>' +
    '</div>'
      ;
}

function drawChart_elo() {
      var data_table = [];
      
      elo_evolution = team_data[competition_selected]["elo_evolution"]
      teams = team_data[competition_selected]["teams"]
      
      colors = []
      for (i=0;i<teams.length;i++) {
          colors.push("rgb(0,0,0)")
      }
      
      header = ["Speeldag"]
      for (i=team_selected_index;i<team_selected_index + 1;i++) {
          header.push("ELO " + teams[i])
      }
      header.push({'role': 'tooltip', 'p': {'html': true}})
      data_table.push(header)
      for (i=0;i<elo_evolution[team_selected_index].length;i++) {
        row = []
          // Start ELO
          if (i==0) {
              row.push("Start")
              for (j=team_selected_index;j<team_selected_index+1;j++) {
                  row.push(elo_evolution[j][i])
              }
              row.push(customTooltipChartElo("Start", elo_evolution[team_selected_index][i]))
          }
        else { 
            row.push(i)
              for (j=team_selected_index;j<team_selected_index+1;j++) {
                  if (i >= elo_evolution[j].length) {
                    row.push(null)
                  }
                  else {
                      row.push(elo_evolution[j][i])
                  }
              }
              row.push(customTooltipChartElo(String(i), elo_evolution[team_selected_index][i]))
        }
        
        data_table.push(row)
    }
      
      var data_vis = google.visualization.arrayToDataTable(data_table);

      var view = new google.visualization.DataView(data_vis);
      
      max_elo_array = []
      min_elo_array = []
      for (i=0;i<teams.length;i++) {
          max_elo_array.push(Math.max.apply(Math,elo_evolution[i]))
          min_elo_array.push(Math.min.apply(Math,elo_evolution[i]))
      }
      
      max_elo = 100*Math.round(Math.ceil(Math.max.apply(Math,max_elo_array)/100))
      min_elo = 100*Math.round(Math.floor(Math.min.apply(Math,min_elo_array)/100))
      
      // Chart colors
      series = {}
        
      chart_colors = []
      for (i=team_selected_index;i<team_selected_index + 1;i++) {
          if (i==team_selected_index) {
            // color_rgba = colors[teams[i]].replace(",1)",")")
            // color_rgba = color_rgba.replace("a(","(")
            series["0"] = {color:colors[i], opacity: 1 }
          }
          else {
            // color_rgba = colors[teams[i]].replace(",1)",")")
            // color_rgba = color_rgba.replace("a(","(")
            series["0"] = {color:colors[i], opacity: 0.2 }
          }
      }
      var options = {
          tooltip: { isHtml: true }, 
          series: series,
            // colors: chart_colors,
            legend:{position:'none'},
            curveType: 'function', // Smooth
            hAxis: {
              viewWindowMode:'explicit',
              viewWindow:{
                max:speeldag+1, // + 1 omdat START ELO er ook bij moet
                min:0
              },
            textStyle: {
                color: 'black', 
                fontName: 'Lora', 
                fontSize: '10'
              },
            gridlines: {
                count: speeldag+1 // try to pick the correct number to create intervals of 50000 
            },
            title: 'Matchday',
            titleTextStyle: {
                color: '#5c5c5c',
                fontName: 'Lora', 
                fontSize: '12'
            }
        },
            vAxis: {
              viewWindowMode:'explicit',
              viewWindow:{
                max:max_elo,
                min:min_elo
              },
            textStyle: {
                color: 'black', 
                fontName: 'Lora', 
                fontSize: '10'
              },
            gridlines: {
                count: (max_elo-min_elo)/100 // try to pick the correct number to create intervals of 50000 
            },
            title: 'Elo Rating',
            titleTextStyle: {
                color: '#5c5c5c',
                fontName: 'Lora', 
                fontSize: '12'
            }
        }
      };
      var chart = new google.visualization.LineChart(document.getElementById("elo_evolution_graph"));
      chart.draw(view, options);
  }  

function customTooltipChartElo(gameday,elo) {
    
    if (gameday == "Start") {
        string_gd = "<strong>Elo</strong> at " + gameday + ":"
    } else {
        string_gd = "<strong>Elo</strong> after Matchday " + gameday + ":"
    }
    
  return '<div style="text-size:12px;font-family: Lora;padding:5px 5px 5px 5px;">' +
  '<table>' + 
  '<thead>' +
  '<tr>' +
  '<th style="white-space:nowrap;padding-bottom:3px !important;text-align:center !important;border-bottom: 1px #000000 solid !important;" colspan="2">' +
      '<img src="/img/projects/elo-domestic-leagues/' + competition_selected + '/' + teams[team_selected_index] + '.png"' + ' style="width:20px;height:20px">' +
    '&nbsp;' + '<strong>' + team_selected + '</strong>' +
    '</th>' +
    '</tr>' +
    '</thead>' +
'<tbody>' +
  '<tr>' +
  '<td style="padding-top:3px !important;white-space:nowrap;">' +
     string_gd + "&nbsp;" +
    '</td>' + 
    '<td style="padding-top:3px !important;white-space:nowrap;">' + 
    '<strong>' + String(elo) + '</strong>' +
    '</td>' +
    '</tr>' +
    '</tbody>' +
    '</table>' +
    '</div>'
      ;
}

function previousGameday() {
    if (speeldag == 1) {
        return
    }
    speeldag -= 1
    fillGameTable()
}

function nextGameday() {
    if (speeldag == 30) {
        return
    }
    speeldag += 1
    fillGameTable()
}

function fillGameTable() {
    games = team_data[competition_selected]["games"]
    
    // Span
    $("#speeldag").html("&nbsp;<strong>Speeldag " + String(speeldag) + "</strong>&nbsp;")
    
    // Games table
    table_head = '<thead><tr>' + 
                    "<th colspan='3' style='text-align: center;'></th>" + 
                    "<th style='text-align: center;'>M+</th>" + 
                    "<th style='text-align: center;'>M=</th>" + 
                    "<th style='text-align: center;'>M-</th>" +
                    "</tr></thead>"
                    
    // Fill table
    table_rows = '<tbody style="text-align: center;">'
    
    for (i=(speeldag-1)*8;i<speeldag*8;i++) {
        // Check if game played
        // if (parseInt(games[i][4]) == 1) {
            table_rows += "<tr>"
            
            // Home Team
            table_rows += "<td class='col-md-4 col-sm-4' style='text-align:left'>" + "<img src='/img/projects/elo-domestic-leagues/" + leagues[c] + "/" + teams[parseInt(games[i][0])] + ".png'>" + "</img>&nbsp;" + teams[parseInt(games[i][0])] + "</td>"
            
            // Score
            if (parseInt(games[i][4]) == 1) {
                table_rows += "<td class='col-md-1 col-sm-1'>" +  String(parseInt(games[i][2])) + " - " + parseInt(games[i][3]) + "</td>"
            } else {
                table_rows += "<td class='col-md-1 col-sm-1'>vs." + "</td>"
            }
            
            // Color right Odds box based on score:
            if (parseInt(games[i][4]) == 1) {
                if (parseInt(games[i][2]) == parseInt(games[i][3])) { // TIE
                    color_home_win = ""
                    color_away_win = ""
                    color_tie = rgbGradient(100,color_code_odds)
                } else if ((parseInt(games[i][2]) > parseInt(games[i][3]))) { // Home WIN
                    color_home_win = rgbGradient(100,color_code_odds)
                    color_away_win = ""
                    color_tie = ""                
                } else { // Away WIN
                    color_home_win = ""
                    color_away_win = rgbGradient(100,color_code_odds)
                    color_tie = ""               
                }
            } else {
                    color_home_win = rgbGradient(games[i][5],color_code_odds)
                    color_tie = rgbGradient(games[i][6],color_code_odds)   
                    color_away_win = rgbGradient(games[i][7],color_code_odds)             
            }
            
            // Away Team
            table_rows += "<td class='col-md-4 col-sm-4' style='text-align:right;border-right: 2px rgb(0,0,0) solid;'>" + teams[parseInt(games[i][1])] + "&nbsp;" + "<img src='/img/projects/elo-domestic-leagues/" + leagues[c] + "/" + teams[parseInt(games[i][1])] + ".png'>" + "</img>" + "</td>"
            
            // Odds of Home Win
            table_rows += "<td class='col-md-1 col-sm-1'" + " style='background:" + color_home_win +  "'>" + games[i][5] + "%" +  "</td>"
            
            // Odds of Tie
            table_rows += "<td class='col-md-1 col-sm-1'" + " style='background:" + color_tie +  "'>" + games[i][6] + "%" +  "</td>"
            
            // Odds of Away Win
            table_rows += "<td class='col-md-1 col-sm-1'" +" style='background:" + color_away_win +  "'>" +  games[i][7] + "%" +  "</td>"
            
            table_rows += "</tr>"
        // }
    }
    
    $("#jupiler-pro-league-games").html(table_head + table_rows)
    $("#jupiler-pro-league-games-small").html(table_head + table_rows)
}

function rgbGradient(pc,rgb) {
    // Make Gradient based on r,g,b values and a Percentage (0-100)
    // Start is rgb(255,255,255)
    
    color_gradient_r = String(Math.round(((rgb[0]-255)/100) * pc + 255))
    color_gradient_g = String(Math.round(((rgb[1]-255)/100) * pc + 255))
    color_gradient_b = String(Math.round(((rgb[2]-255)/100) * pc + 255))
    color_gradient = "rgb(" + color_gradient_r + "," + color_gradient_g + "," + color_gradient_b + ")"
    
    // Return string of rgb value
    return color_gradient
}

function buildTable(league,start_league,start_view,container_name) {

    data_url = "http://www.sway-blog.be/data/elo-uefa-leagues/data.json"
        ajax_call_data = $.ajax({
          url: data_url,
          dataType: 'json',
          crossDomain: true, // enable this
    })

    teams_url = "http://www.sway-blog.be/data/elo-uefa-leagues/teams.json"
    ajax_call_teams = $.ajax({
              url: teams_url,
              dataType: 'json',
              crossDomain: true, // enable this
            })
            
   $.when(ajax_call_data,ajax_call_teams).done(function(data1,data2){
       
       
    team_data = data1[0] 
    teams_index = data2[0]
    
    leagues = Object.keys(team_data)
    
    // Start with competition_selected
    // index_league_selected = leagues.indexOf(start_competition);
    // if (index_league_selected > -1) {
    //     leagues.splice(index_league_selected, 1);
    //     leagues.unshift(start_competition)
    // }    
    
    
    // Get data
    teams = Object.keys(team_data[league])
    // groups = Object.keys(group_data)
            // Team Index - Games Played - Wins - Losses - Ties - Goals For - Goals Against - Goal Diff - Points
        
    // Ranking
    table_head =    '<thead>' +
                    '<tr>' + 
                    "<th class='col-lg-3 col-md-5 col-sm-3 col-xs-1' data-sorter='false' style='text-align: center;border-bottom: 0px;'></th>" +
                    
                    "<th class=' col-lg-1 col-md-2 col-sm-3 col-xs-1' data-sorter='false' colspan='1' style='font-size:15px;text-align: center;border-bottom:0px;'>" + 
                    "</th>"
                    // "<th class=' col-lg-1 col-md-2 col-sm-3 col-xs-4' colspan='1' style='font-size:15px;text-align: center;border-bottom:0px;'>" + 
                    // "<span style='width: 98%;float: left;margin-left: 1%;border-bottom:  2px #ddd solid;'>ELO Ranking</span></th>"
                    
    if (league == "ucl") {
        table_head += "<th class=' col-lg-4 col-md-5 col-sm-6 hidden-xs' colspan='8' style='font-size:15px;text-align: center;border-bottom:0px;'>" +
                    "<span style='width: 98%;float: left;margin-left: 1%;border-bottom:  2px #ddd solid;'>Probability of ...</span></th>"
                    
        table_head += "<th class='hidden-lg hidden-md hidden-sm col-xs-10' colspan='5' style='font-size:15px;text-align: center;border-bottom:0px;'>" +
                    "<span style='width: 98%;float: left;margin-left: 1%;border-bottom:  2px #ddd solid;'>Probability of ...</span></th>"
    } 
    if (league == "uel") {
        table_head += "<th class=' col-lg-4 col-md-5 col-sm-6 hidden-xs' colspan='9' style='font-size:15px;text-align: center;border-bottom:0px;'>" +
                    "<span style='width: 98%;float: left;margin-left: 1%;border-bottom:  2px #ddd solid;'>Probability of ...</span></th>"
                    
        table_head += "<th class='hidden-lg hidden-md hidden-sm col-xs-7' colspan='6' style='font-size:15px;text-align: center;border-bottom:0px;'>" +
                    "<span style='width: 98%;float: left;margin-left: 1%;border-bottom:  2px #ddd solid;'>Probability of ...</span></th>"
    }
                    
    table_head +=   "<th class='col-lg-4 ranking-table-small' colspan='10' style='font-size:15px;text-align: center;border-bottom:0px;'>" +
                    "<span style='width: 98%;float: left;margin-left: 1%;border-bottom:  2px #ddd solid;'>Regular Ranking</span></th>" +
                    "</tr>" 
                    
      table_head += '<tr>' +
                    "<th style='text-align: left;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>Team</th>" +
                    
                    // "<th style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>R</th>" +
                    "<th class='' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>ELO<br>Score</th>" 
                    // "<th class='' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>1 Week<br>Change</th>"
    
    if (league == "ucl") {
            table_head +=   "<th class='hidden-xs' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>4th</th>" +
                        "<th class='hidden-xs' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>3th</th>" +
                        "<th class='hidden-xs' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>2nd</th>" +
                        "<th class='hidden-xs' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>1st</th>" +
                        "<th class='hidden-lg hidden-md hidden-sm' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>1/8</th>" + 
                        "<th class='' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>QF</th>" + 
                        "<th class='' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>SF</th>" + 
                        "<th class='' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>F</th>" + 
                        "<th class='' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>Win</th>"
    } 
    if (league == "uel") {
            table_head +=   "<th class='hidden-xs' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>4th</th>" +
                        "<th class='hidden-xs' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>3th</th>" +
                        "<th class='hidden-xs' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>2nd</th>" +
                        "<th class='hidden-xs' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>1st</th>" +
                        "<th class='hidden-lg hidden-md hidden-sm' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>1/16</th>" +
                        "<th class='' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>1/8</th>" +
                        "<th class='' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>QF</th>" + 
                        "<th class='' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>SF</th>" + 
                        "<th class='' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>F</th>" + 
                        "<th class='' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>Win</th>"                 
    }
                    
    table_head +=   "<th class='ranking-table-small' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>G</th>" +
                    "<th class='ranking-table-small' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>R</th>" +
                    "<th class='ranking-table-small' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>PTN</th>" + 
                    "<th class='ranking-table-small' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>M</th>" + 
                    "<th class='ranking-table-small' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>M+</th>" + 
                    "<th class='ranking-table-small' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>M-</th>" + // <img id='trophy-img' src='/img/trophy_16.png' </img>
                    "<th class='ranking-table-small' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>M=</th>" + 
                    "<th class='ranking-table-small' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>D+</th>" + 
                    "<th class='ranking-table-small' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>D-</th>" + 
                    "<th class='ranking-table-small' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>D+/-</th>" 

                    
         table_head += "</tr></thead>"
        
        table_head_small = '<thead>' +
                        '<tr>' + 
                        "<th data-sorter='false' style='text-align: center;border-bottom: 0px;'></th>" +
                        
                        "<th class='' colspan='2' style='font-size:15px;text-align: center;border-bottom:0px;'>" + 
                        "<span style='width: 98%;float: left;margin-left: 1%;border-bottom:  2px #ddd solid;'>ELO Ranking</span></th>" +
                        
                        "<th class='' colspan='5' style='font-size:15px;text-align: center;border-bottom:0px;'>" + 
                        "<span style='width: 98%;float: left;margin-left: 1%;border-bottom:  2px #ddd solid;'>Voorspelling</span></th>" +
                        "</tr>" +
                        '<tr>' +
                        "<th style='text-align: left;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>Team</th>" +
                        
                        // "<th style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>R</th>" +
                        "<th class='' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>ELO<br>Score</th>" +
                        "<th class='' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>1 Week<br>Verschil</th>" +
                        "<th class='' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>Degr</th>" +
                        "<th class='' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>PO III</th>" +
                        "<th class='' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>PO II</th>" +
                        "<th class='' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>PO I</th>" +
                        "<th class='' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>Title</th>" +
                        '</thead>'
        
        // Fill table
        // Eerst kampioen en degradatieberekening
        // kampioen_perc = []
        // // kampioen_perc_sum = 0
        // degradatie_perc = []
        // // degradatie_perc_sum = 0
        
        // for (i=0;i<teams.length;i++) {
        //     kampioen_perc.push(standing_forecast_regular[i][0])
        //     // kampioen_perc_sum += standing_forecast_regular[i][0]
            
        //     degradatie_perc.push(0)

        //     for (j=0;j<degr_spots;j++) {
        //         degradatie_perc[degradatie_perc.length-1] += standing_forecast_regular[i][standing_forecast_regular[i].length -1-j]
        //     }
            
        //     // degradatie_perc_sum += standing_forecast_regular[i][standing_forecast_regular[i].length -1]
        // }

        
        color_code_odds = [26,155,217]
            
        table_rows = '<tbody style="text-align: center;">'
        table_rows_small = '<tbody style="text-align: center;">'
        for (i=0;i<teams.length;i++) {
                table_rows += "<tr>"
                
                // Team Name
                table_rows += '<td style="text-align: left;border-right: 2px rgb(0,0,0) solid;">' + '<img src="/img/projects/elo-uefa-leagues/' + teams_index.indexOf(teams[i]) + '.png">' + '</img>' + "<span class='team-name-small'>&nbsp;" + teams[i] + "</span>" + "</td>"
                table_rows_small += '<td style="text-align: left;border-right: 2px rgb(0,0,0) solid;">' + '<img src="/img/projects/elo-uefa-leagues/' + teams_index.indexOf(teams[i]) + '.png">' + '</img>' + "<span class='team-name-small'>&nbsp;" + teams[i] + "</span>" + "</td>"
                
                // Elo
                table_rows += "<td class='' style='border-right: 2px rgb(0,0,0) solid;'>" + String(team_data[league][teams[i]]["elo"]) +   "</td>"
                table_rows_small += "<td class='' style='border-right: 2px rgb(0,0,0) solid;'>" + String(team_data[league][teams[i]]["elo"]) +   "</td>"
                
                // dELO
                // dElo = elo_evolution[i][elo_evolution[i].length-1] - elo_evolution[i][elo_evolution[i].length-2]
                // if (dElo > 0) {
                //     dElo_sign = "+"
                //     dElo_color = "rgb(162,213,161)" // Green
                // } else if (dElo < 0) {
                //     dElo_sign = ""
                //     dElo_color = "rgb(255,147,128)" // Red
                // } else {
                //     dElo_sign = ""
                // }
                // table_rows += '<td class="" style="border-right: 2px rgb(0,0,0) solid;">' + "<span style='width:60%;float:left;margin-left:20%;border-radius: 10px;background:"  + "'>&nbsp;" + " " + "&nbsp;</span>" +  "</td>"
                // table_rows_small += '<td class="" style="border-right: 2px rgb(0,0,0) solid;">' + "<span style='width:60%;float:left;margin-left:20%;border-radius: 10px;background:" + "'>&nbsp;" + " " + "&nbsp;</span>" +  "</td>"
                
                // 4th place
                if (league == "ucl") {
                    place_4 = team_data[league][teams[i]]["odds"][0]
                    place_3 = team_data[league][teams[i]]["odds"][1]
                    place_2 = team_data[league][teams[i]]["odds"][2]
                    place_1 = team_data[league][teams[i]]["odds"][3]
                    place_ro16 = team_data[league][teams[i]]["odds"][3] + team_data[league][teams[i]]["odds"][2]
                    place_ro8 = team_data[league][teams[i]]["odds"][4]
                    place_ro4 = team_data[league][teams[i]]["odds"][5]
                    place_final = team_data[league][teams[i]]["odds"][6]
                    win = team_data[league][teams[i]]["odds"][7]
                }
                
                if (league == "uel") {
                    place_4 = team_data[league][teams[i]]["odds"][0]
                    place_3 = team_data[league][teams[i]]["odds"][1]
                    place_2 = team_data[league][teams[i]]["odds"][2]
                    place_1 = team_data[league][teams[i]]["odds"][3]
                    
                    // team coming from champions league
                    if (Object.keys(team_data["ucl"]).indexOf(teams[i]) != -1) {
                        place_4 = ""
                        place_3 = ""
                        place_2 = ""
                        place_1 = ""
                        place_ro32 = team_data["ucl"][teams[i]]["odds"][1]
                    } else {
                        place_ro32 = team_data[league][teams[i]]["odds"][3] + team_data[league][teams[i]]["odds"][2]
                    }
                    place_ro16 = team_data[league][teams[i]]["odds"][4]
                    place_ro8 = team_data[league][teams[i]]["odds"][5]
                    place_ro4 = team_data[league][teams[i]]["odds"][6]
                    place_final = team_data[league][teams[i]]["odds"][7]
                    win = team_data[league][teams[i]]["odds"][8]
                }
                
                // color_gradient = rgbGradient(degradatie_perc[i],color_code_odds)
                // color_gradient = rgbGradient(degradatie_perc[i],color_code_odds)
                // int_part = String(Math.round(degradatie_perc[i]*10)/10).split(".")[0]
                // dec_part = String(Math.round(degradatie_perc[i]*10)/10).split(".")[1]
                
                // if (dec_part == undefined) {
                //     table_rows += '<td class="" style="border-right:2px #ddd solid;background:' +color_gradient + ';">' + int_part + "%" + "</td>"
                //     table_rows_small += '<td class="" style="border-right:2px #ddd solid;background:' +color_gradient + ';">' + int_part + "%" + "</td>"
                // } else {
                //     table_rows += '<td class="" style="border-right:2px #ddd solid;background:' +color_gradient + ';">' + int_part + "<sup>" + dec_part + "</sup>" + "%" + "</td>"
                //     table_rows_small += '<td class="" style="border-right:2px #ddd solid;background:' +color_gradient + ';">' + int_part  + "<sup>" + dec_part + "</sup>" + "%" + "</td>"                
                // }
                
                if (league == "ucl") {
                        
                        // 4th
                        color_gradient = rgbGradient(place_4,color_code_odds)
                        table_rows += '<td class="hidden-xs" style="background:' +color_gradient + ';">' + place_4 + "%" + "</td>"
                        table_rows_small += '<td class="hidden-xs" style="background:' +color_gradient + ';">' + place_4 + "%" + "</td>"
                        // 3th
                        color_gradient = rgbGradient(place_3,color_code_odds)
                        table_rows += '<td class="hidden-xs" style="background:' +color_gradient + ';">' + place_3 + "%" + "</td>"
                        table_rows_small += '<td class="hidden-xs" style="background:' +color_gradient + ';">' + place_3 + "%" + "</td>"
                        // 2th
                        color_gradient = rgbGradient(place_2,color_code_odds)
                        table_rows += '<td class="hidden-xs" style="background:' +color_gradient + ';">' + place_2 + "%" + "</td>"
                        table_rows_small += '<td class="hidden-xs" style="background:' +color_gradient + ';">' + place_2 + "%" + "</td>"
                        // 1th
                        color_gradient = rgbGradient(place_1,color_code_odds)
                        table_rows += '<td class="hidden-xs" style="background:' +color_gradient + ';">' + place_1 + "%" + "</td>"
                        table_rows_small += '<td class="hidden-xs" style="background:' +color_gradient + ';">' + place_1 + "%" + "</td>"
                        // RO16 (only for xsmall screens)
                        color_gradient = rgbGradient(place_1+place_2,color_code_odds)
                        table_rows += '<td class="hidden-lg hidden-md hidden-sm" style="background:' +color_gradient + ';">' + String(place_1 + place_2) + "%" + "</td>"
                        table_rows_small += '<td class="hidden-lg hidden-md hidden-sm" style="background:' +color_gradient + ';">' + String(place_1 + place_2) +  "%" + "</td>"
                        // RO 8
                        color_gradient = rgbGradient(place_ro8,color_code_odds)
                        table_rows += '<td class="" style="background:' +color_gradient + ';">' + place_ro8 + "%" + "</td>"
                        table_rows_small += '<td class="" style="background:' +color_gradient + ';">' + place_ro8 + "%" + "</td>"
                        // RO 4
                        color_gradient = rgbGradient(place_ro4,color_code_odds)
                        table_rows += '<td class="" style="background:' +color_gradient + ';">' + place_ro4 + "%" + "</td>"
                        table_rows_small += '<td class="" style="background:' +color_gradient + ';">' + place_ro4 + "%" + "</td>"
                        // Final
                        color_gradient = rgbGradient(place_final,color_code_odds)
                        table_rows += '<td class="" style="background:' +color_gradient + ';">' + place_final + "%" + "</td>"
                        table_rows_small += '<td class="" style="background:' +color_gradient + ';">' + place_final + "%" + "</td>"
                        // Win
                        color_gradient = rgbGradient(win,color_code_odds)
                        table_rows += '<td class="" style="background:' +color_gradient + ';border-right: 2px rgb(0,0,0) solid;">' + win + "%" + "</td>"
                        table_rows_small += '<td class="" style="background:' +color_gradient + ';">' + win + "%" + "</td>"
                    
                } 
                if (league == "uel") {
                        if (place_4 == "" && place_3 == "" && place_2 == "" && place_1 == "") {
                        // 4th
                        color_gradient = rgbGradient(0,color_code_odds)
                        table_rows += '<td class="hidden-xs" style="background:' +color_gradient + ';">' + place_4 + "</td>"
                        table_rows_small += '<td class="hidden-xs" style="background:' +color_gradient + ';">' + place_4 + "</td>"
                        // 3th
                        color_gradient = rgbGradient(0,color_code_odds)
                        table_rows += '<td class="hidden-xs" style="background:' +color_gradient + ';">' + place_3 + "</td>"
                        table_rows_small += '<td class="hidden-xs" style="background:' +color_gradient + ';">' + place_3  + "</td>"
                        // 2th
                        color_gradient = rgbGradient(0,color_code_odds)
                        table_rows += '<td class="hidden-xs" style="background:' +color_gradient + ';">' + place_2 + "</td>"
                        table_rows_small += '<td class="hidden-xs" style="background:' +color_gradient + ';">' + place_2  + "</td>"
                        // 1th
                        color_gradient = rgbGradient(0,color_code_odds)
                        table_rows += '<td class="hidden-xs" style="background:' +color_gradient + ';">' + place_1 + "</td>"
                        table_rows_small += '<td class="hidden-xs" style="background:' +color_gradient + ';">' + place_1 + "</td>"                              
                        } 
                        else {
                        // 4th
                        color_gradient = rgbGradient(place_4,color_code_odds)
                        table_rows += '<td class="hidden-xs" style="background:' +color_gradient + ';">' + place_4 + "%" + "</td>"
                        table_rows_small += '<td class="hidden-xs" style="background:' +color_gradient + ';">' + place_4 + "%" + "</td>"
                        // 3th
                        color_gradient = rgbGradient(place_3,color_code_odds)
                        table_rows += '<td class="hidden-xs" style="background:' +color_gradient + ';">' + place_3 + "%" + "</td>"
                        table_rows_small += '<td class="hidden-xs" style="background:' +color_gradient + ';">' + place_3 + "%" + "</td>"
                        // 2th
                        color_gradient = rgbGradient(place_2,color_code_odds)
                        table_rows += '<td class="hidden-xs" style="background:' +color_gradient + ';">' + place_2 + "%" + "</td>"
                        table_rows_small += '<td class="hidden-xs" style="background:' +color_gradient + ';">' + place_2 + "%" + "</td>"
                        // 1th
                        color_gradient = rgbGradient(place_1,color_code_odds)
                        table_rows += '<td class="hidden-xs" style="background:' +color_gradient + ';">' + place_1 + "%" + "</td>"
                        table_rows_small += '<td class="hidden-xs" style="background:' +color_gradient + ';">' + place_1 + "%" + "</td>"                            
                        }

                        // RO 32 (only for xsmall screens)
                        color_gradient = rgbGradient(place_ro32,color_code_odds)
                        table_rows += '<td class="hidden-lg hidden-md hidden-sm" style="background:' +color_gradient + ';">' + place_ro32 + "%" + "</td>"
                        table_rows_small += '<td class="hidden-lg hidden-md hidden-sm" style="background:' +color_gradient + ';">' + place_ro32 + "%" + "</td>"
                        // RO 16
                        color_gradient = rgbGradient(place_ro16,color_code_odds)
                        table_rows += '<td class="" style="background:' +color_gradient + ';">' + place_ro16 + "%" + "</td>"
                        table_rows_small += '<td class="" style="background:' +color_gradient + ';">' + place_ro16 + "%" + "</td>"                        
                        // RO 8
                        color_gradient = rgbGradient(place_ro8,color_code_odds)
                        table_rows += '<td class="" style="background:' +color_gradient + ';">' + place_ro8 + "%" + "</td>"
                        table_rows_small += '<td class="" style="background:' +color_gradient + ';">' + place_ro8 + "%" + "</td>"
                        // RO 4
                        color_gradient = rgbGradient(place_ro4,color_code_odds)
                        table_rows += '<td class="" style="background:' +color_gradient + ';">' + place_ro4 + "%" + "</td>"
                        table_rows_small += '<td class="" style="background:' +color_gradient + ';">' + place_ro4 + "%" + "</td>"
                        // Final
                        color_gradient = rgbGradient(place_final,color_code_odds)
                        table_rows += '<td class="" style="background:' +color_gradient + ';">' + place_final + "%" + "</td>"
                        table_rows_small += '<td class="" style="background:' +color_gradient + ';">' + place_final + "%" + "</td>"
                        // Win
                        color_gradient = rgbGradient(win,color_code_odds)
                        table_rows += '<td class="" style="background:' +color_gradient + ';border-right: 2px rgb(0,0,0) solid;">' + win + "%" + "</td>"
                        table_rows_small += '<td class="" style="background:' +color_gradient + ';">' + win + "%" + "</td>"                          
                    
                    
                }
                // Champions league teams third place into UEL
                if (team_data[league][teams[i]]['group'] == undefined) {
                    // Group
                    table_rows += "<td class='ranking-table-small' style='opacity:0'>" + "Z"  +"</td>"
                    
                    // Team KLASSIEK Ranking
                    table_rows += "<td class='ranking-table-small'>" + "</td>"
                    
                    // PTN
                    table_rows += "<td class='ranking-table-small'>" + "</td>"
                    
                    // M
                    table_rows += "<td class='ranking-table-small'>" + "</td>"
                    
                    // M+
                    table_rows += "<td class='ranking-table-small'>" +"</td>"
                    
                    // M-
                    table_rows += "<td class='ranking-table-small'>" + "</td>"
                    
                    // M=
                    table_rows += "<td class='ranking-table-small'>" + "</td>"
                    
                    // D+
                    table_rows += "<td class='ranking-table-small'>" + "</td>"
                    
                    // D-
                    table_rows += "<td class='ranking-table-small'>" + "</td>"
                    
                    // D+/-
                    table_rows += "<td class='ranking-table-small'>" + "</td>"
                } else {
                    // Group
                    table_rows += "<td class='ranking-table-small'>" + String(team_data[league][teams[i]]["group"]) + "</td>"
                    
                    // Team KLASSIEK Ranking
                    table_rows += "<td class='ranking-table-small'>" + String(team_data[league][teams[i]]["ranking"]+1) + "</td>"
                    
                    // PTN
                    table_rows += "<td class='ranking-table-small'>" + String(team_data[league][teams[i]]["standing"][8]) + "</td>"
                    
                    // M
                    table_rows += "<td class='ranking-table-small'>" + String(team_data[league][teams[i]]["standing"][1]) + "</td>"
                    
                    // M+
                    table_rows += "<td class='ranking-table-small'>" + String(team_data[league][teams[i]]["standing"][2]) + "</td>"
                    
                    // M-
                    table_rows += "<td class='ranking-table-small'>" + String(team_data[league][teams[i]]["standing"][3]) + "</td>"
                    
                    // M=
                    table_rows += "<td class='ranking-table-small'>" + String(team_data[league][teams[i]]["standing"][4]) + "</td>"
                    
                    // D+
                    table_rows += "<td class='ranking-table-small'>" + String(team_data[league][teams[i]]["standing"][5]) + "</td>"
                    
                    // D-
                    table_rows += "<td class='ranking-table-small'>" + String(team_data[league][teams[i]]["standing"][6]) + "</td>"
                    
                    // D+/-
                    table_rows += "<td class='ranking-table-small'>" + String(team_data[league][teams[i]]["standing"][7]) + "</td>"
                }
                
                
                table_rows += "</tr>"
                table_rows_small += "</tr>"
        }
    
        
        table_rows += "</tbody>"
        table_rows_small += "</tbody>"
        
        // Append to DOM
        if ((league == start_league) & (start_view == "table")) {
            $("#" + container_name).append("<div id='table_" + league + "_wrapper'" + "class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>" +
            
                                        "<table id='table_" + league + "'" + "class='table table-condensed ranking-table'>" +
                                        table_head + 
                                        table_rows + 
                                        "</table>" +
                                        "</div>")
        } else {
            $("#" + container_name).append("<div id='table_" + league + "_wrapper'" + "class='col-lg-12 col-md-12 col-sm-12 col-xs-12' style='display:none;'>" +
            
                                        "<table id='table_" + league + "'" + "class='table table-condensed ranking-table'>" + 
                                        table_head + 
                                        table_rows + 
                                        "</table>" +
                                        "</div>")            
        }
        
        // $("#jupiler-pro-league-ranking-table-small").append(table_head_small + table_rows_small)  
        
        // Sort table
        $("#table_" + league).tablesorter( {sortList: [[1,1]]} ); 
        // $("#jupiler-pro-league-ranking-table-small").tablesorter( {sortList: [[1,1]]} );
        
    
    
   });
}

function createTeamChoice() {
            // Maak knop met ploegen
           //Dropdown plugin data
            var ddData_teams = [];
            console.log(competition_selected)
              for (i = 0;i<team_data[competition_selected]["teams"].length;i++) {
                  if (i == 0) {
                    ddData_teams.push({text: team_data[competition_selected]["teams"][i], value: i, selected:true, description:" ", imageSrc: "/img/projects/elo-domestic-leagues/" + competition_selected + "/" + team_data[competition_selected]["teams"][i] + ".png"})
                    
                    team_selected = team_data[competition_selected]["teams"][i]
                    team_selected_index = i
                      
                  } else  {
                    ddData_teams.push({text: team_data[competition_selected]["teams"][i], value: i, selected:false, description:" ",imageSrc: "/img/projects/elo-domestic-leagues/" + competition_selected + "/" + team_data[competition_selected]["teams"][i] + ".png"})
                  }
              }
              
              
              $('#select-team').ddslick({
                data: ddData_teams,
                width: $('#select-team-wrapper').width(),
                height: 300,
                imagePosition: "center",
                selectText: "Select Team",
                onSelected: function (data) {
                    console.log(competition_selected)
                    console.log(team_data[competition_selected]["teams"])
                    team_selected = $("#jpl-teams-visualization").find(".dd-selected-text").text()
                    team_selected_index = team_data[competition_selected]["teams"].indexOf(team_selected)
                    drawChart_standing()
                    drawChart_elo()
                }
              })
}