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

function buildTable(view,container) {
    // Create tables
    data_url = "http://www.sway-blog.be/data/elo-uefa-euro2016/data.json"
        ajax_call_data = $.ajax({
          url: data_url,
          dataType: 'json',
          crossDomain: true, // enable this
    })

    teams_url = "http://www.sway-blog.be/data/elo-uefa-euro2016/teams.json"
    ajax_call_teams = $.ajax({
              url: teams_url,
              dataType: 'json',
              crossDomain: true, // enable this
            })
            
   $.when(ajax_call_data,ajax_call_teams).done(function(data1,data2){
       
    team_data = data1[0] 
    teams_index = data2[0]
    
    
    // Start with competition_selected
    // index_league_selected = leagues.indexOf(start_competition);
    // if (index_league_selected > -1) {
    //     leagues.splice(index_league_selected, 1);
    //     leagues.unshift(start_competition)
    // }    
    
    // Get data
    teams = Object.keys(team_data)
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
                    

        table_head += "<th class=' col-lg-4 col-md-5 col-sm-6 hidden-xs' colspan='9' style='font-size:15px;text-align: center;border-bottom:0px;'>" +
                    "<span style='width: 98%;float: left;margin-left: 1%;border-bottom:  2px #ddd solid;'>Probability of ...</span></th>"
                    
        table_head += "<th class='hidden-lg hidden-md hidden-sm col-xs-10' colspan='5' style='font-size:15px;text-align: center;border-bottom:0px;'>" +
                    "<span style='width: 98%;float: left;margin-left: 1%;border-bottom:  2px #ddd solid;'>Probability of ...</span></th>"
    

                    
    table_head +=   "<th class='col-lg-4 ranking-table-small' colspan='10' style='font-size:15px;text-align: center;border-bottom:0px;'>" +
                    "<span style='width: 98%;float: left;margin-left: 1%;border-bottom:  2px #ddd solid;'>Regular Ranking</span></th>" +
                    "</tr>" 
                    
      table_head += '<tr>' +
                    "<th style='text-align: left;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>Team</th>" +
                    
                    // "<th style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>R</th>" +
                    "<th class='' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>ELO<br>Rating</th>" 
                    // "<th class='' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>1 Week<br>Change</th>"
  
            table_head +=   "<th class='hidden-xs' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>4th</th>" +
                        "<th class='hidden-xs' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>3th</th>" +
                        "<th class='hidden-xs' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>2nd</th>" +
                        "<th class='hidden-xs' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>1st</th>" +
                        "<th class='' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>1/8</th>" + 
                        "<th class='' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>QF</th>" + 
                        "<th class='' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>SF</th>" + 
                        "<th class='' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>F</th>" + 
                        "<th class='' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>Win</th>"
    

                    
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
                        "<th class='' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>ELO<br>Rating</th>" +
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
                table_rows += '<td style="text-align: left;border-right: 2px rgb(0,0,0) solid;">' + '<img src="/img/projects/elo-uefa-euro2016/32/' + teams[i] + '.png">' + '</img>' + "<span class='team-name-small'>&nbsp;" + teams[i] + "</span>" + "</td>"
                table_rows_small += '<td style="text-align: left;border-right: 2px rgb(0,0,0) solid;">' + '<img src="/img/projects/elo-uefa-euro2016/32/' + teams[i] + '.png">' + '</img>' + "<span class='team-name-small'>&nbsp;" + teams[i] + "</span>" + "</td>"
                
                // Elo
                table_rows += "<td class='' style='border-right: 2px rgb(0,0,0) solid;'>" + String(team_data[teams[i]]["elo"]) +   "</td>"
                table_rows_small += "<td class='' style='border-right: 2px rgb(0,0,0) solid;'>" + String(team_data[teams[i]]["elo"]) +   "</td>"
                
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
           
                    place_4 = team_data[teams[i]]["odds"][0]
                    place_3 = team_data[teams[i]]["odds"][1]
                    place_2 = team_data[teams[i]]["odds"][2]
                    place_1 = team_data[teams[i]]["odds"][3]
                    place_ro16 =team_data[teams[i]]["odds"][4]
                    place_ro8 = team_data[teams[i]]["odds"][5]
                    place_ro4 = team_data[teams[i]]["odds"][6]
                    place_final = team_data[teams[i]]["odds"][7]
                    win = team_data[teams[i]]["odds"][8]
                

                        
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
                        table_rows += '<td class="" style="background:' +color_gradient + ';">' + place_ro16 + "%" + "</td>"
                        table_rows_small += '<td class="" style="background:' +color_gradient + ';">' + place_ro16 +  "%" + "</td>"
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
              
              // Ranking
            // Group
            table_rows += "<td class='ranking-table-small'>" + String(team_data[teams[i]]["standing"]["G"]).replace("Group ","") + "</td>"
            
            // Team KLASSIEK Ranking
            table_rows += "<td class='ranking-table-small'>" + String(team_data[teams[i]]["standing"]["R"]) + "</td>"
            
            // PTN
            table_rows += "<td class='ranking-table-small'>" + String(team_data[teams[i]]["standing"]["PTS"]) + "</td>"
            
            // M
            table_rows += "<td class='ranking-table-small'>" + String(team_data[teams[i]]["standing"]["GP"]) + "</td>"
            
            // M+
            table_rows += "<td class='ranking-table-small'>" + String(team_data[teams[i]]["standing"]["W"]) + "</td>"
            
            // M-
            table_rows += "<td class='ranking-table-small'>" + String(team_data[teams[i]]["standing"]["L"]) + "</td>"
            
            // M=
            table_rows += "<td class='ranking-table-small'>" + String(team_data[teams[i]]["standing"]["T"]) + "</td>"
            
            // D+
            table_rows += "<td class='ranking-table-small'>" + String(team_data[teams[i]]["standing"]["GF"]) + "</td>"
            
            // D-
            table_rows += "<td class='ranking-table-small'>" + String(team_data[teams[i]]["standing"]["GA"]) + "</td>"
            
            // D+/-
            table_rows += "<td class='ranking-table-small'>" + String(team_data[teams[i]]["standing"]["GD"]) + "</td>"
              
              
                table_rows += "</tr>"
                table_rows_small += "</tr>"
        }
    
        
        table_rows += "</tbody>"
        table_rows_small += "</tbody>"
        
        // Append to DOM
        $("#" + container).append("<div id='table_wrapper'" + "class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>" +
                                    "<table id='table_euro2016'" + "class='table table-condensed ranking-table'>" +
                                    table_head + 
                                    table_rows + 
                                    "</table>" +
                                    "</div>")
       
        // $("#jupiler-pro-league-ranking-table-small").append(table_head_small + table_rows_small)  
        
        // Sort table
        $("#table_euro2016").tablesorter( {sortList: [[10,1]]} ); 
        // $("#jupiler-pro-league-ranking-table-small").tablesorter( {sortList: [[1,1]]} );
        
        if (view == "bracket") {
            $("#table_wrapper").hide()
        }
        
    
})
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

function buildBracket(view,container) {
///////////////////////////////////
// Import files
///////////////////////////////////
// Ajax url's
var data_url = "http://www.sway-blog.be/data/elo-uefa-euro2016/data.json"
var ajax_call_data = $.ajax({
      url: data_url,
      dataType: 'json',
      crossDomain: true, // enable this
    })

var date_url = "http://www.sway-blog.be/data/elo-uefa-euro2016/date.json"
var ajax_call_date = $.ajax({
          url: date_url,
          dataType: 'json',
          crossDomain: true, // enable this
        })

var teams_url = "http://www.sway-blog.be/data/elo-uefa-euro2016/teams.json"
var ajax_call_teams = $.ajax({
          url: teams_url,
          dataType: 'json',
          crossDomain: true, // enable this
        })

var games = "http://www.sway-blog.be/data/elo-uefa-euro2016/games.json"
var ajax_call_games = $.ajax({
          url: games ,
          dataType: 'json',
          crossDomain: true, // enable this
        })

var topo_france = "http://www.sway-blog.be/data/elo-uefa-euro2016/topo_france.json"
var ajax_call_topo = $.ajax({
          url: topo_france,
          dataType: 'json',
          crossDomain: true, // enable this
        })

var cities_url = "http://www.sway-blog.be/data/elo-uefa-euro2016/cities.json"
var ajax_call_cities = $.ajax({
          url: cities_url,
          dataType: 'json',
          crossDomain: true, // enable this
        })
        
// Get data       
$.when(ajax_call_data,ajax_call_date,ajax_call_teams,ajax_call_games,ajax_call_topo,ajax_call_cities).done(function(data1, data2, data3,data4,data5,data6){
// Initialize data
var team_data = data1[0]
var last_update = data2[0]
var teams_index = data3[0]
var games = data4[0]
var topo_france = data5[0]
var cities = data6[0]
console.log(team_data)
var number_of_games = Object.keys(games).length
var number_of_rounds = (Math.log(number_of_games+1) / Math.log(2))
var number_of_teams = teams_index.length

// Create dataset that will be linked to team box on SVG
var game_numbers = Object.keys(games);
var i;
var dataset_games = [];
for (i=0;i<number_of_games;i++) {
    games[game_numbers[i]].Game = game_numbers[i]
    dataset_games.push(games[game_numbers[i]])
}

var dataset_groups = [  {"Group":"Group A","Teams": [0,1,2,3]},
                        {"Group":"Group B","Teams": [0,1,2,3]},
                        {"Group":"Group C","Teams": [0,1,2,3]},
                        {"Group":"Group D","Teams": [0,1,2,3]},
                        {"Group":"Group E","Teams": [0,1,2,3]},
                        {"Group":"Group F","Teams": [0,1,2,3]}]
var i,j;
for (i=0;i<number_of_teams;i++) {
    team_data[teams_index[i]].Team = teams_index[i]
    for (j=0;j<dataset_groups.length;j++) {
        if (team_data[teams_index[i]].group == dataset_groups[j].Group) {
            parseInt(team_data[teams_index[i]].standing.R)
            dataset_groups[j].Teams[parseInt(team_data[teams_index[i]].standing.R)-1] = team_data[teams_index[i]]
        }
    }
}

var dataset_info_team_text = [["Country","France"],["Date","10 June - 10 July 2016"],["Host Cities","10"],["Games","51"]]
var dataset_infobar = ["Round of 16","Quarter-finals","Semi-finals","Final","Semi-finals","Quarter-finals","Round of 16"]
var dataset_chance_text = ["Chance of", "Winning", "Tournament"]
var dataset_hover_text = ["Hover over team", "to see odds of", "reaching every round"]
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
// Dimension parameters
// FIXED
var w = $("#" + container).width() // Width of svg
var h = 50*number_of_games // Height of svg
var w_padding = 0.01*w // Padding left-right
var h_padding = 0.01*h // Padding top-bottom
var h_infobar = Math.max(h_padding - 2*0.01*h,30)
var h_img_small = 25
var w_img_small = 25
var h_img_large = 70
var w_img_large = 70
var group_stroke_width = 1
var team_stroke_width = 1

// RATIOS
var group_to_knockout_h_ratio = 0.9
var infobar_to_gamebox_h_ratio = 0.05
var round_to_game_w_ratio = 1; // One round is X the width of a game 
var padding_to_group_w_ratio = 0.15
var padding_to_group_h_ratio = 0.2
var padding_to_game_h_ratio = 1.2
var small_to_large_game_w_ratio = 0.3
var group_to_team_name_h_ratio = 0.08
var group_games_to_geo_h_ratio = 0.3
var info_team_to_geo_w_ratio = 0.5
var info_team_title_to_text_h_ratio = 0.3

// CALCULATED
// Group Phase
var h_group_phase = group_to_knockout_h_ratio*(h - 2*h_padding)/(1 + group_to_knockout_h_ratio)
var w_group_phase = w - 2*w_padding

// Info Team
var h_info_team = (1-group_games_to_geo_h_ratio)*h_group_phase
var w_info_team = info_team_to_geo_w_ratio*(w_group_phase/2 - w_padding/2)
var h_info_team_title = info_team_title_to_text_h_ratio*h_info_team
var h_info_team_text = (1-info_team_title_to_text_h_ratio)*h_info_team
var w_info_team_text = 0.9*w_info_team/2
// Geo 
var h_geo = (1-group_games_to_geo_h_ratio)*h_group_phase
var w_geo = (1-info_team_to_geo_w_ratio)*(w_group_phase/2 - w_padding/2)

// Group games
var h_group_games = group_games_to_geo_h_ratio*h_group_phase
var w_group_games = w_group_phase/2 - w_padding/2

// Groups
var h_groups = h_group_phase
var w_groups = w_group_phase/2 - w_padding/2
var w_group = w_groups/(3 + 2*padding_to_group_w_ratio)
var h_group = h_groups/(2 + padding_to_group_h_ratio)
var group_padding_w = padding_to_group_w_ratio*w_group
var group_padding_h = padding_to_group_h_ratio*h_group
var h_group_name = group_to_team_name_h_ratio*h_group_phase
var h_group_team = (h_group - h_group_name)/4

// Knockout Phase
var h_knockout_phase = (h - 2*h_padding)/(1 + group_to_knockout_h_ratio) - team_stroke_width
var w_knockout_phase = w - 2*w_padding

// Infobox
var h_infobar = infobar_to_gamebox_h_ratio*h_knockout_phase
var w_infobar = w - 2*w_padding
var infobar_padding = h_infobar

// Gamebox
var w_gamebox = w_knockout_phase
var h_gamebox = h_knockout_phase - h_infobar - infobar_padding
var w_game = (w_gamebox/2)/(1 + (5/2)*small_to_large_game_w_ratio + 3*round_to_game_w_ratio)
var w_game_small = small_to_large_game_w_ratio * w_game
var w_round = round_to_game_w_ratio*w_game
var h_game = h_gamebox/(4 + 3*padding_to_game_h_ratio)
var game_padding = padding_to_game_h_ratio*h_game
var h_game_info = 0*h_game
var h_team = (h_game-h_game_info)/2
var h_path_text = (2/3)*h_team
var h_path_win = h_team
var r_circle = h_img_large/2
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
// Initialize SVG
var svg = d3.select("#" + container)
            .append("svg")
            .attr("id","svg")
            .attr("width", w)
            .attr("height", h)    

////////////////////////////////////////////////////////////////////////////////
// Base groups
////////////////////////////////////////////////////////////////////////////////
var group_phase = svg   .append("g")
                        .attr("id","group-phase") 
                        .attr("transform",function(d,i) {
                            var x_translate = w_padding
                            var y_translate = h_padding
                            return "translate(" + x_translate + "," + y_translate + ")";
                        })

var info_team_box = group_phase .append("g")
                            .attr("id","info-team") 
                            .attr("transform",function(d,i) {
                                var x_translate = 0
                                var y_translate = 0
                                return "translate(" + x_translate + "," + y_translate + ")";
                            })
                            
var geo_box = group_phase   .append("g")
                            .attr("id","geo-box") 
                            .attr("transform",function(d,i) {
                                var x_translate = w_info_team
                                var y_translate = 0
                                return "translate(" + x_translate + "," + y_translate + ")";
                            })

var group_games_box  =  group_phase .append("g")
                                    .attr("id","group-games-box") 
                                    .attr("transform",function(d,i) {
                                        var x_translate = 0
                                        var y_translate = h_geo
                                        return "translate(" + x_translate + "," + y_translate + ")";
                                    })       
                                    
var groups_box = group_phase.append("g")
                        .attr("id","groups-box") 
                        .attr("transform",function(d,i) {
                            var x_translate = w_info_team + w_geo + w_padding
                            var y_translate = 0
                            return "translate(" + x_translate + "," + y_translate + ")";
                        })
                            
var knockout_phase = svg    .append("g")
                            .attr("id","knockout-phase") 
                            .attr("transform",function(d,i) {
                                var x_translate = w_padding
                                var y_translate = h_padding + h_group_phase + h_padding
                                return "translate(" + x_translate + "," + y_translate + ")";
                            })
var infobar = knockout_phase.append("g")
                            .attr("id","infobar")
                            .attr("transform",function(d,i) {
                                var x_translate = 0
                                var y_translate = 0
                                return "translate(" + x_translate + "," + y_translate + ")";
                            })
var game_box = knockout_phase   .append("g")
                                .attr("id","game-box")
                                .attr("transform",function(d,i) {
                                    var x_translate = 0
                                    var y_translate = h_infobar + infobar_padding
                                    return "translate(" + x_translate + "," + y_translate + ")";
                                })
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// Info Team
var info_team_title_box = info_team_box .append("g")
                                        .attr("id","info-team-title-box") 
                                        .attr("transform",function(d,i) {
                                            var x_translate = 0
                                            var y_translate = 0
                                            return "translate(" + x_translate + "," + y_translate + ")";
                                        })
                                        
var info_team_title_img = info_team_title_box   .append("image")
                                                .attr("id","info-team-image")
                                                .attr("cx",w_padding + w_img_large/2)
                                                .attr("cy",h_padding + h_img_large/2)
                                                .attr("height",h_img_large)
                                                .attr("width",w_img_large)
                                                .attr("xlink:href",function(d) {
                                                    var base_dir = "/img/projects/elo-uefa-euro2016/70/"
                                                    return base_dir + "Euro2016" + ".png";
                                                }); 
                                            
var info_team_title = info_team_title_box   .append("text")
                                            .attr("id","info-team-title")
                                            .attr("x",2*w_padding + w_img_large)
                                            .attr("y",h_info_team_title/2)
                                            .attr("dy","0.35em")
                                            .text("UEFA EURO 2016")
                                            .style("fill","black")

var info_team_text_box = info_team_box .append("g")
                                        .attr("id","info-team-text-box") 
                                        .attr("transform",function(d,i) {
                                            var x_translate = 0
                                            var y_translate = h_info_team_title
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
// Geo
var geo_group = geo_box .append("g")
                        .attr("width", w_geo)
                        .attr("height", h_geo)

// active = d3.select(null); // For zooming in after click on constituency

// Load GeoJson Data
var geo_france = topojson.feature(topo_france, topo_france.objects["geo_ADM0_FRA"]);

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// Create a unit projection.
var projection = d3 .geo.mercator()
                    .rotate([0, 0])
                    .scale(1)
                    .translate([0, 0]);  

// Create a path generator.
var path = d3   .geo.path()
                .projection(projection);

// Compute the bounds of a feature of interest, then derive scale & translate.
var b = path.bounds(geo_france)
var s = .95 / Math.max((b[1][0] - b[0][0]) / w_geo, (b[1][1] - b[0][1]) / h_geo)
var t = [(w_geo - s * (b[1][0] + b[0][0])) / 2, (h_geo - s * (b[1][1] + b[0][1])) / 2]

// Update the projection to use computed scale & translate.
projection
  .scale(s)
  .translate(t);

path = d3   .geo.path()
            .projection(projection);

geo_group   .attr("class", "constituencies")
            .selectAll("path")
            .data(geo_france.features)
            .enter().append("path") // ,".graticule")  
            .attr("d", path)
            .attr("class","constituency")
            .attr('fill',"rgb(255,255,255)")
            .attr('stroke',"#000000")
            .attr('stroke-width',1)
            
    // add circles to svg
geo_group   .selectAll("circle")
    		.data(cities).enter()
    		.append("circle")
    		.attr("class","city-circle")
    		.attr("id",function(d) {
    		    return "circle-" + d.City
    		 })
    		.attr("cx", function (d) {
    		    var latlong = [d.Long,d.Lat]
    		    return projection(latlong)[0]; 
    		})
    		.attr("cy", function (d) { 
    		    var latlong = [d.Long,d.Lat]
    		    return projection(latlong)[1];  
    		})
    		.attr("r", "3px")
    		.attr("fill", "black")

// Group games
var group_games_rect = group_games_box  .append("rect")
                                        .attr("width",w_group_games)
                                        .attr("height",h_group_games)
                                        .attr("fill","white")
                                        .attr("stroke","black")
                                        .attr("stroke-width",0)

var group_games_cols = group_games_box  .selectAll("g")
                                        .data(["Date","Location","Game","Win","Draw","Loss"])
                                        .enter().append("g")
                                        .attr("id",function(d) {
                                            return "group-games-" + d
                                        })
                                        .attr("transform",function(d,i) {
                                            if (d == "Date") {
                                                var x_translate = i*3*w_group_games/12
                                                var y_translate = 0
                                                return "translate(" + x_translate + "," + y_translate + ")";
                                            } else  if (d == "Location") {
                                                var x_translate = i*3*w_group_games/12
                                                var y_translate = 0
                                                return "translate(" + x_translate + "," + y_translate + ")";
                                            } else  if (d == "Game") {
                                                var x_translate = i*3*w_group_games/12
                                                var y_translate = 0
                                                return "translate(" + x_translate + "," + y_translate + ")";
                                            } else  if (d == "Win") {
                                                var x_translate = 9*w_group_games/12
                                                var y_translate = 0
                                                return "translate(" + x_translate + "," + y_translate + ")"; 
                                            } else  if (d == "Draw") {
                                                var x_translate = 9*w_group_games/12 + w_group_games/12
                                                var y_translate = 0
                                                return "translate(" + x_translate + "," + y_translate + ")";
                                            } else  if (d == "Loss") {
                                                var x_translate = 9*w_group_games/12 + 2*w_group_games/12
                                                var y_translate = 0
                                                return "translate(" + x_translate + "," + y_translate + ")";
                                            }
                                        })

var group_games_rows = group_games_cols .selectAll("g")
                                        .data(function(d,i) {
                                            return [d,1,2,3]
                                        })
                                        .enter().append("g")
                                        .attr("class",function(d,i) {
                                            if (i == 0) {
                                                return "Header"  + d
                                            } else {
                                                return "Game" + d
                                            }
                                        })
                                        .attr("transform",function(d,i) {
                                            var x_translate = 0
                                            var y_translate = i*h_group_games/4
                                            return "translate(" + x_translate + "," + y_translate + ")";                                            
                                        })

var group_games_lines = group_games_box .selectAll("line")
                                        .data([0,1,2,3])
                                        .enter()
                                        .append("line")
                                        .attr("class","group-games-line")
                                        .attr("x1", 0)
                                        .attr("y1", function(d,i) {
                                            return i*h_group_games/4
                                        })
                                        .attr("x2", w_group_games)
                                        .attr("y2", function(d,i) {
                                            return i*h_group_games/4
                                        })
                                        .attr("stroke",function(d,i) {
                                            if (i<2) {
                                                return "black";
                                            } else {
                                                return "grey"
                                            }
                                        })
                                        .attr("stroke-width",1)
                                        .style("visibility","hidden")

var group_games_text = group_games_rows .append("text")
                                        .attr("x", 0)
                                        .attr("y",h_group_games/4/2)
                                        .attr("class","group-games-header")
                                        .style("visibility","hidden")
                                        .attr("dy", ".35em")
                                        .text(function(d,i) {
                                            if (i == 0) {
                                                return this.parentNode.__data__
                                            }
                                        })

var group_games_start_text = group_games_box    .append("text")
                                                .attr("x", 0)
                                                .attr("y",h_group_games/2)
                                                .attr("id","group-games-start-text")
                                                .style("visibility","")
                                                .attr("dy", ".35em")
                                                .text("HOVER OVER COUNTRY TO VIEW ITS PATH TO THE FINAL")
                                        
// Group Phase
var group = groups_box  .selectAll("g")
                        .data(dataset_groups)
                        .enter().append("g")
                        .attr("transform",function(d,i) {
                            if (i < 3) {
                                var x_translate = i*(w_group + group_padding_w)
                                var y_translate = 0                                
                            } else {
                                var x_translate = (i-3)*(w_group + group_padding_w)
                                var y_translate = h_group + group_padding_h                                
                            }

                            return "translate(" + x_translate + "," + y_translate + ")"; 
                        })
                        .attr("id",function(d,i) {
                            return d.Group.replace(" ","")
                        })

var group_teams = group .selectAll("g")
                        .data(function(d) {
                            var return_array = [];
                            return_array.push(0)
                            for (i=0;i<d.Teams.length;i++) {
                                return_array.push(d.Teams[i])
                            }
                            return return_array; 
                        })
                        .enter().append("g")
                        .attr("class",function(d,i) {
                            if (i == 0) {
                                return "GroupHeader"
                            } else {
                                return "Place" + String(i)
                            }
                        })
                        .attr("id",function(d,i) {
                            if (i == 0) {
                                return this.parentNode.id + " Header"
                            }
                        })
                        .attr("transform",function(d,i) {
                            if (i == 0) {
                                var x_translate = 0
                                var y_translate = 0                                 
                            } else {
                                var x_translate = 0
                                var y_translate = h_group_name + (i-1)*h_group_team                                    
                            }
                            return "translate(" + x_translate + "," + y_translate + ")"; 
                        })
                            
var group_team_rect =   group_teams .append("rect")
                                    .attr("width",w_group)
                                    .attr("height",function(d,i) {
                                        if (i == 0) {
                                            return h_group_name
                                        } else {
                                            return h_group_team
                                        }
                                    })
                                    .attr("fill","white")
                                    .attr("stroke","black")
                                    .attr("stroke-width",group_stroke_width)
                                    
var group_team_img =   group_teams  .append("image")
                                    // .attr("id","circle_image_" + league)
                                    .attr("x",0.01*w_group)
                                    .attr("y",(h_group_team - h_img_small)/2)
                                    .attr("height",h_img_small)
                                    .attr("width",w_img_small)
                                    
var group_team_text =   group_teams .append("text")
                                    .attr("class", function(d,i) {
                                        if (i == 0) {
                                            return "group-header"
                                        } else {
                                            return "group-team"
                                        }
                                    })
                                    .attr("x", function(d,i) {
                                        if (i == 0) {
                                            return w_group/2
                                        } else {
                                            return 2*0.01*w_group + w_img_small
                                        }
                                        
                                    })
                                    .attr("y",function(d,i) {
                                        if (i == 0) {
                                            return h_group_name/2
                                        } else {
                                            return h_group_team/2
                                        }
                                    })
                                    .attr("dy", ".35em")
                                    .text(function(d,i) {
                                        
                                        if (i == 0) {
                                            var text = this.parentNode.id.replace(" Header","").split("Group")
                                            return "Group" + " " + text[1]
                                        }
                                    })

var group_team_rect_fill =  group_teams .append("rect")
                                        .attr("width",0)
                                        .attr("height",function(d,i) {
                                            if (i == 0) {
                                                return 0
                                            } else {
                                                return h_group_team - group_stroke_width // h_group_team - 2*group_stroke_width
                                            }
                                        })
                                        .attr("transform",function(d,i) {
                                            if (i != 0) { 
                                                var x_translate = group_stroke_width/2
                                                var y_translate = group_stroke_width/2
                                                return "translate(" + x_translate + "," + y_translate + ")";
                                            }
                                        })
                                        .attr("class",function(d,i) {
                                            if (i != 0) {
                                                return "FillPlace" + String(i)
                                            }
                                        })
                                        .attr("fill","black")
                                        .attr("stroke","black")
                                        .attr("stroke-width",0)

var group_team_text_fill = group_teams  .append("text")
                                        .attr("class","standing-percentage")
                                        .attr("x",0) // w_group-0.01*w_group
                                        .attr("y",h_group_team/2)
                                        .attr("dy","0.35em")
                                        .style("visibility","hidden")
                                        .text("")
                                        
var group_team_mouseover_rect = group_teams .append("rect")
                                            .attr("width",w_group)
                                            .attr("height",function(d,i) {
                                                if (i == 0) {
                                                    return h_group_name
                                                } else {
                                                    return h_group_team
                                                }
                                            })
                                            .attr("fill","rgba(255,255,255,0)")
                                            .on("mouseover",function(d) {
                                                if (d != 0) {
                                                    console.log(d)
                                                    for (i=1;i<5;i++) {
                                                        // Hide text
                                                        d3  .select("#" + d.group.replace(" ",""))
                                                            .select(".Place" + String(i))
                                                            .select("text")
                                                            .text("")
                                                        
                                                        // Info team
                                                        d3  .select("#info-team-image")
                                                            .attr("xlink:href","/img/projects/elo-uefa-euro2016/70/" + d.Team + ".png")
                                                        
                                                        d3  .select("#info-team-title")
                                                            .text(d.Team.toUpperCase())
                                                        
                                                        var t;
                                                        for (t=0;t<4;t++) {
                                                        d3  .select("#info-team-text-" + String(t))
                                                            .select(".info-team-text-header")
                                                            .text(d.info[t][0])     
                                                            
                                                        d3  .select("#info-team-text-" + String(t))
                                                            .select(".info-team-text-row")
                                                            .text(d.info[t][1])
                                                        }

                                                            
                                                        // Hide img
                                                        d3  .select("#" + d.group.replace(" ",""))
                                                            .select(".Place" + String(i))
                                                            .select("image")
                                                            .attr("xlink:href","");                                                 
                                                        
                                                        // Fill places
                                                        d3  .select("#" + d.group.replace(" ",""))
                                                            .select(".Place" + String(i))
                                                            .select(".FillPlace" + String(i))
                                                            .transition()
                                                            .attr("width",function() {
                                                                return d.odds[4-i]*(w_group/100)
                                                            })
                                                            .attr("fill",function() {
                                                                return d.color
                                                            }) 
                                                            
                                                        // Add text
                                                        d3  .select("#" + d.group.replace(" ",""))
                                                            .select(".Place" + String(i))
                                                            .select(".standing-percentage")
                                                            .transition()
                                                            .attr("x",d.odds[4-i]*(w_group/100) + w_padding/2)
                                                            .style("visibility","")
                                                            .text(d.odds[4-i] + "%")
                                                    }
                                                    
                                                    // Fill Group Games Table
                                                    var g;
                                                    d3.select("#group-games-start-text").style("visibility","hidden")
                                                    d3.selectAll(".group-games-header").style("visibility","")
                                                    d3.selectAll(".group-games-line").style("visibility","")
                                                    d3.selectAll(".city-circle").transition().style("visibility","hidden")
                                                    for (g=0;g<d.games.length;g++) {
                                                        // Fill Group Games Table
                                                        var moment_object = moment.unix(d.games[g].Date)
                                                        d3.select("#group-games-Date").select(".Game" + String(g+1)).select("text").attr("class","group-games-row")
                                                            .text(moment_object.utcOffset(moment.unix(d.games[g].Date).utcOffset()).format("Do MMMM HH:mm"))
                                                        d3.select("#group-games-Location").select(".Game" + String(g+1)).select("text").attr("class","group-games-row").text(d.games[g].Location)
                                                        if (d.Team == d.games[g].HomeTeam) {
                                                            d3.select("#group-games-Game").select(".Game" + String(g+1)).select("text").attr("class","group-games-row").text("vs. " + d.games[g].AwayTeam) 
                                                            d3.select("#group-games-Win").select(".Game" + String(g+1)).select("text").attr("class","group-games-row").text(d.games[g].HomeWin + "%") 
                                                            d3.select("#group-games-Draw").select(".Game" + String(g+1)).select("text").attr("class","group-games-row").text(d.games[g].Draw + "%")
                                                            d3.select("#group-games-Loss").select(".Game" + String(g+1)).select("text").attr("class","group-games-row").text(d.games[g].AwayWin + "%")                                            
                                                        } else {
                                                            d3.select("#group-games-Game").select(".Game" + String(g+1)).select("text").attr("class","group-games-row").text("vs. " + d.games[g].HomeTeam) 
                                                            d3.select("#group-games-Win").select(".Game" + String(g+1)).select("text").attr("class","group-games-row").text(d.games[g].AwayWin + "%") 
                                                            d3.select("#group-games-Draw").select(".Game" + String(g+1)).select("text").attr("class","group-games-row").text(d.games[g].Draw + "%")
                                                            d3.select("#group-games-Loss").select(".Game" + String(g+1)).select("text").attr("class","group-games-row").text(d.games[g].HomeWin + "%")                                                    
                                                        }
                                                        
                                                        // Light up correct cities
                                                        d3.select("#circle-" + d.games[g].Location).transition().style("visibility","").attr("fill", d.color)
         
                                                    }
                                                    
                                                    // Knockout
                                                    var knockout_games_paths = Object.keys(d.knockout_odds);
                                                    var i;
                                                    // d3  .selectAll(".path").attr("stroke-width",0)
                                                    d3  .select("#text-win").transition().style("visibility","").text(String(d.odds[d.odds.length-1]) + "%")
                                                    d3  .select("#info-text-win").transition().style("visibility","")
                                                    for (i=0;i<knockout_games_paths.length;i++) {
                                                        if (knockout_games_paths[i].indexOf("to") > -1) {
                                                            // Path
                                                            d3  .select("#path_" + knockout_games_paths[i])
                                                                .transition()
                                                                .attr("stroke-width",function() {
                                                                    return 1 + d.knockout_odds[knockout_games_paths[i]] * h_team/100
                                                                })
                                                                .attr("stroke",d.color)
                                                            
                                                            d3  .select("#path-win")
                                                                .transition() 
                                                                .attr("stroke-width",function() {
                                                                    return 1 + d.odds[d.odds.length-1] * h_team/100
                                                                })
                                                                .attr("stroke",d.color)
                                                                
                                                            // Text above Path
                                                            d3  .select("#text_" + knockout_games_paths[i])
                                                                .transition()
                                                                .style("visibility","")
                                                                .text(d.knockout_odds[knockout_games_paths[i]] + "%")
                                                              
                                                        } else {
                                                            // Game
                                                            // Check Home or AwayTeam
                                                            var group = d.group.replace("Group ","")
                                                            var side;
                                                            if (d3.select("#game_" + knockout_games_paths[i]).data()[0].HomeTeam.replace("Group ","").split(" ")[0].indexOf(group) > -1) {
                                                                side = "HomeTeam"
                                                            } else {
                                                                side = "AwayTeam"
                                                            }
                                                            
                                                            // Fill
                                                            d3  .select("#game_" + knockout_games_paths[i] + "_" + side)
                                                                .select(".Fill") 
                                                                .transition()
                                                                .attr("width", function() {
                                                                    return Math.min(d.knockout_odds[knockout_games_paths[i]],60)*w_game/100;
                                                                })
                                                                .attr("transform", function() {
                                                                    if (["40","41","43","44"].indexOf(knockout_games_paths[i]) > -1) { // Right
                                                                        var x_translate = w_game - Math.min(d.knockout_odds[knockout_games_paths[i]],60)*w_game/100 - team_stroke_width/2
                                                                        var y_translate = team_stroke_width/2
                                                                        return "translate(" + x_translate + "," + y_translate + ")";
                                                                    } else {
                                                                        var x_translate = team_stroke_width/2
                                                                        var y_translate = team_stroke_width/2
                                                                        return "translate(" + x_translate + "," + y_translate + ")"; 
                                                                    }
                                                                })
                                                                .attr("fill",d.color)
                                                                
                                                            // Remove Text
                                                            d3  .select("#game_" + knockout_games_paths[i] + "_" + side)
                                                                .select(".game-text")
                                                                .style("visibility","hidden")
                                                                
                                                            // Add Text
                                                            d3  .select("#game_" + knockout_games_paths[i] + "_" + side)
                                                                .select(".game-percentage")
                                                                .transition()
                                                                .attr("x",function() {
                                                                    if (["40","41","43","44"].indexOf(knockout_games_paths[i]) > -1) { // Right
                                                                        return w_game - Math.min(d.knockout_odds[knockout_games_paths[i]],60)*w_game/100 - w_padding/2
                                                                    } else {
                                                                        return Math.min(d.knockout_odds[knockout_games_paths[i]],60)*w_game/100 + w_padding/2
                                                                    }
                                                                })
                                                                .style("visibility","")
                                                                .text(d.knockout_odds[knockout_games_paths[i]] + "%")
                                                        }
                                                    }
                                                    
                                                    // Circle Image
                                                    d3.select("#circle-image")  .attr("xlink:href",function() {
                                                                                    var base_dir = "/img/projects/elo-uefa-euro2016/70/"
                                                                                    return base_dir + d.Team + ".png";
                                                                                });
                                                    
                                                }
                                        
                                        
                                        
                                    })
                                    .on("mouseout",function(d) {
                                        // UnFill places
                                        // Remove standing percentages
                                        
                                        if (d != 0) {
                                            for (i=1;i<5;i++) {
                                                // Fill places
                                                d3  .select("#" + d.group.replace(" ",""))
                                                    .select(".Place" + String(i))
                                                    .select(".FillPlace" + String(i))
                                                    .transition()
                                                    .attr("width",0)     
                                                    
                                                // Info team
                                                d3  .select("#info-team-image")
                                                    .attr("xlink:href","/img/projects/elo-uefa-euro2016/70/Euro2016.png")
                                                d3  .select("#info-team-title")
                                                    .text("UEFA EURO 2016")
                                                    
                                                var t;
                                                for (t=0;t<4;t++) {
                                                    d3  .select("#info-team-text-" + String(t))
                                                        .select(".info-team-text-header")
                                                        .text(dataset_info_team_text[t][0])     
                                                        
                                                    d3  .select("#info-team-text-" + String(t))
                                                        .select(".info-team-text-row")
                                                        .text(dataset_info_team_text[t][1])
                                                }
                                                    
                                                // Restore img/text
                                                d3  .select("#" + d.group.replace(" ",""))
                                                    .select(".Place" + String(i))
                                                    .select("text")
                                                    .text(this.parentNode.__data__.Teams[i-1].Team)  
                                                    
                                                d3  .select("#" + d.group.replace(" ",""))
                                                    .select(".Place" + String(i))
                                                    .select("image")
                                                    .attr("xlink:href",function(d) {
                                                        var base_dir = "/img/projects/elo-uefa-euro2016/" + String(h_img_small) + "/"
                                                        return base_dir + this.parentNode.__data__.Teams[i-1].Team + ".png";
                                                    }); 
                                                    

                                            }
                                            
                                            
                                            var g;
                                            d3.selectAll(".standing-percentage").transition().style("visibility","hidden")
                                            d3.selectAll(".group-games-header").style("visibility","hidden")
                                            d3.selectAll(".group-games-line").style("visibility","hidden")
                                            d3.select("#group-games-start-text").style("visibility","")
                                            d3.selectAll(".city-circle").transition().attr("fill", "black").style("visibility","")
                                            for (g=0;g<d.games.length;g++) {
                                                
                                                // Clear Group Games Table
                                                d3.select("#group-games-Date").select(".Game" + String(g+1)).select("text").text("")
                                                d3.select("#group-games-Location").select(".Game" + String(g+1)).select("text").text("")
                                                if (d.Team == d.games[g].HomeTeam) {
                                                    d3.select("#group-games-Game").select(".Game" + String(g+1)).select("text").text("")
                                                    d3.select("#group-games-Win").select(".Game" + String(g+1)).select("text").text("")
                                                    d3.select("#group-games-Draw").select(".Game" + String(g+1)).select("text").text("")
                                                    d3.select("#group-games-Loss").select(".Game" + String(g+1)).select("text").text("")                                            
                                                } else {
                                                    d3.select("#group-games-Game").select(".Game" + String(g+1)).select("text").text("")
                                                    d3.select("#group-games-Win").select(".Game" + String(g+1)).select("text").text("")
                                                    d3.select("#group-games-Draw").select(".Game" + String(g+1)).select("text").text("")
                                                    d3.select("#group-games-Loss").select(".Game" + String(g+1)).select("text").text("")                                                  
                                                }
                                                
                                            }
                                            
                                            var knockout_games_paths = Object.keys(d.knockout_odds);

                                            d3  .selectAll(".path").transition().attr("stroke-width",1).attr("stroke","black")
                                            d3  .selectAll(".game-text").style("visibility","")
                                            d3  .selectAll(".text-path").transition().style("visibility","hidden")
                                            d3  .select("#text-win").transition().style("visibility","hidden")
                                            d3  .select("#info-text-win").transition().style("visibility","hidden")
                                            var i;
                                            for (i=0;i<knockout_games_paths.length;i++) {
                                                
                                                if (knockout_games_paths[i].indexOf("to") > -1) {
                                                    // Path
                                                    // d3  .select("#path_" + knockout_games_paths[i])
                                                    //     .attr("stroke-width",1)
                                                
                                                } else {
                                                    // Check Home or AwayTeam
                                                    var group = d.group.replace("Group ","")
                                                    var side;
                                                    if (d3.select("#game_" + knockout_games_paths[i]).data()[0].HomeTeam.replace("Group ","").split(" ")[0].indexOf(group) > -1) {
                                                        side = "HomeTeam"
                                                    } else {
                                                        side = "AwayTeam"
                                                    }                                                    
                                                    
                                                    // Game
                                                    d3  .select("#game_" + knockout_games_paths[i] + "_" + side)
                                                        .select(".Fill")
                                                        .transition()
                                                        .attr("width", 0)
                                                        .attr("fill","black")
                                                        .attr("transform", function() {
                                                            if (["40","41","43","44"].indexOf(knockout_games_paths[i]) > -1) { // Right
                                                                var x_translate = w_game - team_stroke_width/2
                                                                var y_translate = team_stroke_width/2
                                                                return "translate(" + x_translate + "," + y_translate + ")";
                                                            } else {
                                                                var x_translate = team_stroke_width/2
                                                                var y_translate = team_stroke_width/2
                                                                return "translate(" + x_translate + "," + y_translate + ")";                                    
                                                            }                                                            
                                                        })
                                                    
                                                    // Game Percentage
                                                    d3  .select("#game_" + knockout_games_paths[i] + "_" + side)
                                                        .select(".game-percentage")
                                                        .transition()
                                                        .attr("x",function() {
                                                            if (["40","41","43","44"].indexOf(knockout_games_paths[i]) > -1) { // Right
                                                                return w_game
                                                            } else {
                                                                return 0
                                                            }
                                                        })
                                                        .style("visibility","hidden")
                                                        .text("")
                                                        
                                                }
                                            }
                                            
                                            // Circle image
                                            d3  .select("#circle-image")  
                                                .attr("xlink:href",function() {
                                                    var base_dir = "/img/projects/elo-uefa-euro2016/70/"
                                                    return base_dir + "Euro2016" + ".png";
                                                });
                                        }
                                    })
// Fill group tables
var i;
for (i=0;i<number_of_teams;i++) {
    // Team Name
    d3  .select("#" + team_data[teams_index[i]]["group"]
        .replace(" ","")).select(".Place" + team_data[teams_index[i]]["standing"]["R"])
        .select("text")
        .text(teams_index[i])
    
    // Team Image
    d3  .select("#" + team_data[teams_index[i]]["group"]
        .replace(" ","")).select(".Place" + team_data[teams_index[i]]["standing"]["R"])
        .select("image")
        .attr("xlink:href",function(d) {
            var base_dir = "/img/projects/elo-uefa-euro2016/" + String(h_img_small) + "/"
            return base_dir + teams_index[i] + ".png";
        }); 
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// Knockout Phase
// Infobar
var infobar_border_top = infobar.append("line")
                                .attr("x1", 0)
                                .attr("y1", infobar_padding/2)
                                .attr("x2", w_infobar)
                                .attr("y2", infobar_padding/2)
                                .attr("stroke","black")
                                .attr("stroke-width",1)
var infobar_border_bottom = infobar.append("line")
                                .attr("x1", 0)
                                .attr("y1", h_infobar +  infobar_padding/2)
                                .attr("x2", w_infobar)
                                .attr("y2", h_infobar +  infobar_padding/2)
                                .attr("stroke","black")
                                .attr("stroke-width",1)
                                
var infobar_text = infobar  .selectAll("text")
                            .data(dataset_infobar)
                            .enter()
                            .append("text")
                            .attr("class","infobar-text")
                            .attr("transform",function(d,i) {
                                var y_translate = h_infobar
                                var x_translate;
                                if (i == 0) { // Round of 16
                                    x_translate = w_game/2
                                } else if (i == 1) { // Quarterfinal
                                    x_translate = w_game + w_round + w_game_small/2
                                } else if (i == 2) { // Semifinal
                                    x_translate = w_game + 2*w_round + 3*w_game_small/2
                                } else if (i == 3) { // Final
                                    x_translate = w_game + 3*w_round + 2*w_game_small + w_game_small/2
                                } else if (i == 4) { // Semifinal
                                    x_translate = w_infobar - (w_game + 2*w_round + 3*w_game_small/2)
                                } else if (i == 5) { // Quarterfinal
                                    x_translate = w_infobar - (w_game + w_round + w_game_small/2)
                                } else if (i == 6) { // Round of 16
                                    x_translate = w_infobar - w_game/2
                                }
                                return "translate(" + x_translate + "," + y_translate + ")";
                            })
                            .attr("dy", ".35em")
                            .text(function(d,i) {
                                return d
                            })
// Games groups
var games = game_box.selectAll("g")
                    .data(dataset_games)
                    .enter().append("g")
                    .attr("id",function(d,i) {
                        return "game_" + d.Game
                    })
                    .attr("transform",function(d,i) {
                        // Round of 16
                        if (d.Game == "37") {
                            var x_translate = 0
                            var y_translate = 0
                            return "translate(" + x_translate + "," + y_translate + ")";                            
                        } else if (d.Game == "38") {
                            var x_translate = 0
                            var y_translate = 2*h_game + 2*game_padding
                            return "translate(" + x_translate + "," + y_translate + ")";                             
                        } else if (d.Game == "39") {
                            var x_translate = 0
                            var y_translate = h_game + game_padding
                            return "translate(" + x_translate + "," + y_translate + ")";                             
                        } else if (d.Game == "40") {
                            var x_translate = w_gamebox - w_game
                            var y_translate = 2*h_game + 2*game_padding
                            return "translate(" + x_translate + "," + y_translate + ")";                             
                        } else if (d.Game == "41") {
                            var x_translate = w_gamebox - w_game
                            var y_translate = 0
                            return "translate(" + x_translate + "," + y_translate + ")";                             
                        } else if (d.Game == "42") {
                            var x_translate = 0
                            var y_translate = 3*h_game + 3*game_padding
                            return "translate(" + x_translate + "," + y_translate + ")";                             
                        } else if (d.Game == "43") {
                            var x_translate = w_gamebox - w_game
                            var y_translate = h_game + game_padding
                            return "translate(" + x_translate + "," + y_translate + ")";                             
                        } else if (d.Game == "44") {
                             var x_translate = w_gamebox - w_game
                            var y_translate = 3*h_game + 3*game_padding
                            return "translate(" + x_translate + "," + y_translate + ")";
                        
                        // Quarterfinals
                        } else if (d.Game == "45") {
                             var x_translate = w_game + w_round
                            var y_translate = h_game + game_padding/2 - h_team/2
                            return "translate(" + x_translate + "," + y_translate + ")";                            
                        } else if (d.Game == "46") {
                            var x_translate = w_game + w_round
                            var y_translate = 3*h_game + 2*game_padding + game_padding/2  - h_team/2
                            return "translate(" + x_translate + "," + y_translate + ")";                             
                        } else if (d.Game == "47") {
                            var x_translate = w_gamebox - w_game - w_round - w_game_small
                            var y_translate = h_game + game_padding/2  - h_team/2
                            return "translate(" + x_translate + "," + y_translate + ")";                             
                        } else if (d.Game == "48") {
                            var x_translate = w_gamebox - w_game - w_round - w_game_small
                            var y_translate = 3*h_game + 2*game_padding + game_padding/2  - h_team/2
                            return "translate(" + x_translate + "," + y_translate + ")";    
                        
                        // Semifinals
                        } else if (d.Game == "49") {
                            var x_translate = w_game + 2*w_round + w_game_small
                            var y_translate = 2*h_game + game_padding + game_padding/2 - h_team/2
                            return "translate(" + x_translate + "," + y_translate + ")";                             
                        } else if (d.Game == "50") {
                            var x_translate = w_gamebox - (w_game + 2*w_round + w_game_small)  - w_game_small
                            var y_translate = 2*h_game + game_padding + game_padding/2 - h_team/2
                            return "translate(" + x_translate + "," + y_translate + ")";   
                        
                        // Final
                        } else if (d.Game == "51") {
                            var x_translate = w_game + 2*w_game_small + 3*w_round
                            var y_translate = h_gamebox/2 - h_team/2
                            return "translate(" + x_translate + "," + y_translate + ")";                             
                        }
                    })
                    
var game = games    .selectAll("g")
                    .data(function(d,i) {
                        if (["45","46","47","48","49","50"].indexOf(d.Game) > -1) { // Quarterfinals to final
                            return [{"Date":d.Date,"Game":d.Game,"Location":d.Location,"HomeTeam":d.HomeTeam,"AwayTeam":d.AwayTeam}];                            
                        } else { // Round of 16
                            var groups_HomeTeam = []
                            var groups_AwayTeam = []
                            if (d.HomeTeam.replace("Group ","").split(" ")[0].indexOf("/") > - 1) {
                                groups_HomeTeam.push(d.HomeTeam.replace("Group ","").split(" ")[0].split("/")[0])
                                groups_HomeTeam.push(d.HomeTeam.replace("Group ","").split(" ")[0].split("/")[1])
                                groups_HomeTeam.push(d.HomeTeam.replace("Group ","").split(" ")[0].split("/")[2])
                            } else {
                                groups_HomeTeam.push(d.HomeTeam.replace("Group ","").split(" ")[0])
                            }
                            if (d.AwayTeam.replace("Group ","").split(" ")[0].indexOf("/") > - 1) {
                                groups_AwayTeam.push(d.AwayTeam.replace("Group ","").split(" ")[0].split("/")[0])
                                groups_AwayTeam.push(d.AwayTeam.replace("Group ","").split(" ")[0].split("/")[1])
                                groups_AwayTeam.push(d.AwayTeam.replace("Group ","").split(" ")[0].split("/")[2])
                            } else {
                                groups_AwayTeam.push(d.AwayTeam.replace("Group ","").split(" ")[0])
                            }
                            return [{"Date":d.Date,"Game":d.Game,"Location":d.Location,"Team":d.HomeTeam,"Groups":groups_HomeTeam,"Side":"HomeTeam"}, 
                                    {"Date":d.Date,"Game":d.Game,"Location":d.Location,"Team":d.AwayTeam,"Groups":groups_AwayTeam,"Side":"AwayTeam"}];                            
                        }

                    })
                    .enter().append("g")
                    .attr("id",function(d,i) {
                        if (Object.keys(d).indexOf("Groups") > -1) {
                            return "game_" + d.Game + "_" + d.Side
                        }
                        
                        
                    })
                    .attr("transform",function(d,i) {
                        if (["45","46","47","48","49","50","51"].indexOf(d.Game) > -1) { // Quarterfinals to final
                            var x_translate = 0
                            var y_translate = 0
                            return "translate(" + x_translate + "," + y_translate + ")";                            
                        } else {
                            if (i == 0) {
                                var x_translate = 0
                                var y_translate = 0
                                return "translate(" + x_translate + "," + y_translate + ")";                            
                            } else {
                                var x_translate = 0
                                var y_translate = h_team
                                return "translate(" + x_translate + "," + y_translate + ")";                           
                            }
                        }
                    })

var game_rect = game.append("rect")
                    .attr("width",function(d,i) {
                        if (["45","46","47","48","49","50","51"].indexOf(d.Game) > -1) {
                             return w_game_small;
                        } else {
                            return w_game;
                        }
                        
                    })
                    .attr("height",h_team)                  
                    .attr("fill","white")
                    .attr("stroke","black")
                    .attr("stroke-width",team_stroke_width) 
                    
// var game_circle =   game.append("circle")
//             // 		.attr("id",function(d) {
//             // 		    return "circle-" + d.City
//             // 		 })
//             		.attr("cx",w_gamebox - w_game - 2*w_round - 2*w_game_small - w_round - w_game_small - w_vs/2)
//             		.attr("cy",2*h_game + 3*game_padding/2 - h_team/2 - h_path_win - r_circle)
//             		.attr("r", r_circle)
//             		.attr("fill", "white")
//             		.attr("stroke-width",1)
//             		.attr("stroke","black")                   
var game_text = game.append("text")
                    .attr("class","game-text")
                    .attr("x", function(d,i) {
                        if (["45","46","47","48","49","50","51"].indexOf(d.Game) > -1) {
                             return w_game_small/2;
                        } else {
                            return w_game/2;
                        }
                        
                    })
                    .attr("y",h_team/2)
                    .style("text-anchor","middle")
                    .style("fill","black")
                    .attr("dy", ".35em")
                    .text(function(d,i) {
                        if (["45","46","47","48","49","50","51"].indexOf(d.Game) > -1) {
                             return d.Game;
                        } else {
                            return d.Team
                        }
                    }) 

var game_text_fill = game   .append("text")
                            .attr("class","game-percentage")
                            .attr("x",function(d,i) {
                                if (["40","41","43","44"].indexOf(d.Game) > -1) { // Right
                                    return w_game;
                                } else { // Left
                                    return 0;
                                }
                            })
                            .attr("y",h_team/2)
                            .attr("dy","0.35em")
                            .style("text-anchor",function(d,i) {
                                if (["40","41","43","44"].indexOf(d.Game) > -1) { // Right
                                    return "end"
                                } else { // Left
                                    return "start"
                                }
                            })
                            .style("visibility","hidden")
                            .text("")
                                        
var game_rect_fill = game   .append("rect")
                            .attr("width",0)
                            .attr("height",h_team-team_stroke_width)
                            .attr("class","Fill")
                            .attr("fill","black")
                            .attr("transform", function(d,i) {
                                if (["40","41","43","44"].indexOf(d.Game) > -1) { // Right
                                    var x_translate = w_game - team_stroke_width/2
                                    var y_translate = team_stroke_width/2
                                    return "translate(" + x_translate + "," + y_translate + ")";
                                } else {
                                    var x_translate = team_stroke_width/2
                                    var y_translate = team_stroke_width/2
                                    return "translate(" + x_translate + "," + y_translate + ")";                                    
                                }
                            })
                    
var game_mouseover_rect = game  .append("rect")
                                .attr("width",function(d,i) {
                                    if (["45","46","47","48","49","50","51"].indexOf(d.Game) > -1) {
                                         return w_game_small;
                                    } else {
                                        return w_game;
                                    }
                                    
                                })
                                .attr("height",h_team)    
                                .style('fill', 'rgba(255,255,255,0)')
                                .on("mouseover",function(d) {
                                    // Light up correct cities
                                    d3.selectAll(".city-circle").style("visibility","hidden")
                                    d3.select("#circle-" + d.Location).transition().style("visibility","").attr("fill", "black")
                                })
                                .on("mouseout",function(d) {
                                    // Light up correct cities
                                    d3.selectAll(".city-circle").attr("fill", "black").style("visibility","")
                                })


// append("rect")

// Create Paths
var lineFunction = d3.svg.line()
                         .x(function(d) { return d.x; })
                         .y(function(d) { return d.y; })
                         .interpolate("linear");
// LEFT side
var points_37_to_45 = [ {"x":w_game,"y":h_game/2},
                        {"x":w_game+w_round+w_game_small/2,"y":h_game/2},
                        {"x":w_game+w_round+w_game_small/2,"y":h_game + game_padding/2 - h_team/2}]                          
var path_37_to_45 = game_box.append("path")
                            .attr("d",lineFunction(points_37_to_45))
                            .attr("id","path_37_to_45")
                            .attr("class","path")
                            .attr("stroke","black")
                            .attr("stroke-width",1)
                            .attr("fill","none")
var text_37_to_45 = game_box.append("text")
                            .attr("id","text_37_to_45")
                            .attr("class","text-path")
                            .attr("x", w_game+ (w_round+w_game_small/2)/2)
                            .attr("y",h_game/2 - h_path_text)
                            .style("visibility","hidden")
                            .style("text-anchor","middle")
                            .attr("dy", ".35em")
                            .text("")  
                            
var points_39_to_45 = [ {"x": w_game,"y":h_game + game_padding + h_game/2},
                        {"x":w_game+w_round+w_game_small/2,"y":h_game + game_padding + h_game/2},
                        {"x":w_game+w_round+w_game_small/2,"y":h_game + game_padding/2 + h_team/2}]                          
var path_39_to_45 = game_box.append("path")
                            .attr("d",lineFunction(points_39_to_45))
                            .attr("id","path_39_to_45")
                            .attr("class","path")
                            .attr("stroke","black")
                            .attr("stroke-width",1)
                            .attr("fill","none")
var text_39_to_45 = game_box.append("text")
                            .attr("id","text_39_to_45")
                            .attr("class","text-path")
                            .attr("x", w_game+ (w_round+w_game_small/2)/2)
                            .attr("y",h_game + game_padding + h_game/2 - h_path_text)
                            .style("visibility","hidden")
                            .style("text-anchor","middle")
                            .attr("dy", ".35em")
                            .text("")  
                            
var points_38_to_46 = [ {"x":w_game,"y":2*h_game + 2*game_padding + h_game/2},
                        {"x":w_game+w_round+w_game_small/2,"y":2*h_game + 2*game_padding + h_game/2},
                        {"x":w_game+w_round+w_game_small/2,"y":3*h_game + 5*game_padding/2 - h_team/2}]                          
var path_38_to_46 = game_box.append("path")
                            .attr("d",lineFunction(points_38_to_46))
                            .attr("id","path_38_to_46")
                            .attr("class","path")
                            .attr("stroke","black")
                            .attr("stroke-width",1)
                            .attr("fill","none")
var text_38_to_46 = game_box.append("text")
                            .attr("id","text_38_to_46")
                            .attr("class","text-path")
                            .attr("x", w_game+ (w_round+w_game_small/2)/2)
                            .attr("y",2*h_game + 2*game_padding + h_game/2 - h_path_text)
                            .style("visibility","hidden")
                            .style("text-anchor","middle")
                            .attr("dy", ".35em")
                            .text("")  
                            
var points_42_to_46 = [ {"x": w_game,"y":3*h_game + 3*game_padding + h_game/2},
                        {"x":w_game+w_round+w_game_small/2,"y":3*h_game + 3*game_padding + h_game/2},
                        {"x":w_game+w_round+w_game_small/2,"y":3*h_game + 5*game_padding/2 + h_team/2}]                          
var path_42_to_46 = game_box.append("path")
                            .attr("d",lineFunction(points_42_to_46))
                            .attr("id","path_42_to_46")
                            .attr("class","path")
                            .attr("stroke","black")
                            .attr("stroke-width",1)
                            .attr("fill","none")
var text_42_to_46 = game_box.append("text")
                            .attr("id","text_42_to_46")
                            .attr("class","text-path")
                            .attr("x", w_game+ (w_round+w_game_small/2)/2)
                            .attr("y",3*h_game + 3*game_padding + h_game/2 - h_path_text)
                            .style("visibility","hidden")
                            .style("text-anchor","middle")
                            .attr("dy", ".35em")
                            .text("")  
                            
var points_45_to_49 = [ {"x":w_game + w_round + w_game_small,"y":h_game + game_padding/2},
                        {"x":w_game + w_round + w_game_small + w_round + w_game_small/2,"y":h_game + game_padding/2},
                        {"x":w_game + w_round + w_game_small + w_round + w_game_small/2,"y":2*h_game + 3*game_padding/2 - h_team/2}]                          
var path_45_to_49 = game_box.append("path")
                            .attr("d",lineFunction(points_45_to_49))
                            .attr("id","path_45_to_49")
                            .attr("class","path")
                            .attr("stroke","black")
                            .attr("stroke-width",1)
                            .attr("fill","none")
var text_45_to_49 = game_box.append("text")
                            .attr("id","text_45_to_49")
                            .attr("class","text-path")
                            .attr("x", w_game + w_round + w_game_small + (w_round + w_game_small/2)/2)
                            .attr("y",h_game + game_padding/2 - h_path_text)
                            .style("visibility","hidden")
                            .style("text-anchor","middle")
                            .attr("dy", ".35em")
                            .text("") 
                            
var points_46_to_49 = [ {"x":w_game + w_round + w_game_small,"y":3*h_game + 5*game_padding/2},
                        {"x":w_game + w_round + w_game_small + w_round + w_game_small/2,"y":3*h_game + 5*game_padding/2},
                        {"x":w_game + w_round + w_game_small + w_round + w_game_small/2,"y":2*h_game + 3*game_padding/2 + h_team/2}]                          
var path_46_to_49 = game_box.append("path")
                            .attr("d",lineFunction(points_46_to_49))
                            .attr("id","path_46_to_49")
                            .attr("class","path")
                            .attr("stroke","black")
                            .attr("stroke-width",1)
                            .attr("fill","none")
var text_46_to_49 = game_box.append("text")
                            .attr("id","text_46_to_49")
                            .attr("class","text-path")
                            .attr("x", w_game + w_round + w_game_small + (w_round + w_game_small/2)/2)
                            .attr("y",3*h_game + 5*game_padding/2 - h_path_text)
                            .style("visibility","hidden")
                            .style("text-anchor","middle")
                            .attr("dy", ".35em")
                            .text("") 
                            
var points_49_to_51 = [ {"x":w_game + 2*w_round + 2*w_game_small,"y":2*h_game + 3*game_padding/2},
                        {"x":w_game + 2*w_round + 2*w_game_small + w_round,"y":2*h_game + 3*game_padding/2}]                          
var path_49_to_51 = game_box.append("path")
                            .attr("d",lineFunction(points_49_to_51))
                            .attr("id","path_49_to_51")
                            .attr("class","path")
                            .attr("stroke","black")
                            .attr("stroke-width",1)
                            .attr("fill","none")
var text_49_to_51 = game_box.append("text")
                            .attr("id","text_49_to_51")
                            .attr("class","text-path")
                            .attr("x", w_game + 2*w_round + 2*w_game_small + w_round/2)
                            .attr("y",2*h_game + 3*game_padding/2 - h_path_text)
                            .style("visibility","hidden")
                            .style("text-anchor","middle")
                            .attr("dy", ".35em")
                            .text("") 
                            
// RIGHT side
var points_41_to_47 = [ {"x":w_gamebox - w_game,"y":h_game/2},
                        {"x":w_gamebox - w_game - w_round - w_game_small/2,"y":h_game/2},
                        {"x":w_gamebox - w_game - w_round - w_game_small/2,"y":h_game + game_padding/2 - h_team/2}]                          
var path_41_to_47 = game_box.append("path")
                            .attr("d",lineFunction(points_41_to_47))
                            .attr("id","path_41_to_47")
                            .attr("class","path")
                            .attr("stroke","black")
                            .attr("stroke-width",1)
                            .attr("fill","none")
var text_41_to_47 = game_box.append("text")
                            .attr("id","text_41_to_47")
                            .attr("class","text-path")
                            .attr("x", w_gamebox - w_game - (w_round + w_game_small/2)/2)
                            .attr("y",h_game/2 - h_path_text)
                            .style("visibility","hidden")
                            .style("text-anchor","middle")
                            .attr("dy", ".35em")
                            .text("")
                            
var points_43_to_47 = [ {"x":w_gamebox - w_game,"y":h_game + game_padding + h_game/2},
                        {"x":w_gamebox - w_game - w_round - w_game_small/2,"y":h_game + game_padding + h_game/2},
                        {"x":w_gamebox - w_game - w_round - w_game_small/2,"y":h_game + game_padding/2 + h_team/2}]                          
var path_43_to_47 = game_box.append("path")
                            .attr("d",lineFunction(points_43_to_47))
                            .attr("id","path_43_to_47")
                            .attr("class","path")
                            .attr("stroke","black")
                            .attr("stroke-width",1)
                            .attr("fill","none")
var text_43_to_47 = game_box.append("text")
                            .attr("id","text_43_to_47")
                            .attr("class","text-path")
                            .attr("x", w_gamebox - w_game - (w_round + w_game_small/2)/2)
                            .attr("y",h_game + game_padding + h_game/2 - h_path_text)
                            .style("visibility","hidden")
                            .style("text-anchor","middle")
                            .attr("dy", ".35em")
                            .text("")
                            
var points_40_to_48 = [ {"x":w_gamebox - w_game,"y":2*h_game + 2*game_padding + h_game/2},
                        {"x":w_gamebox - w_game - w_round - w_game_small/2,"y":2*h_game + 2*game_padding + h_game/2},
                        {"x":w_gamebox - w_game - w_round - w_game_small/2,"y":3*h_game + 5*game_padding/2 - h_team/2}]                          
var path_40_to_48 = game_box.append("path")
                            .attr("d",lineFunction(points_40_to_48))
                            .attr("id","path_40_to_48")
                            .attr("class","path")
                            .attr("stroke","black")
                            .attr("stroke-width",1)
                            .attr("fill","none")
var text_40_to_48 = game_box.append("text")
                            .attr("id","text_40_to_48")
                            .attr("class","text-path")
                            .attr("x", w_gamebox - w_game - (w_round + w_game_small/2)/2)
                            .attr("y",2*h_game + 2*game_padding + h_game/2 - h_path_text)
                            .style("visibility","hidden")
                            .style("text-anchor","middle")
                            .attr("dy", ".35em")
                            .text("")
                            
var points_44_to_48 = [ {"x":w_gamebox - w_game,"y":3*h_game + 3*game_padding + h_game/2},
                        {"x":w_gamebox - w_game - w_round - w_game_small/2,"y":3*h_game + 3*game_padding + h_game/2},
                        {"x":w_gamebox - w_game - w_round - w_game_small/2,"y":3*h_game + 5*game_padding/2 + h_team/2}]                          
var path_44_to_48 = game_box.append("path")
                            .attr("d",lineFunction(points_44_to_48))
                            .attr("id","path_44_to_48")
                            .attr("class","path")
                            .attr("stroke","black")
                            .attr("stroke-width",1)
                            .attr("fill","none")
var text_44_to_48 = game_box.append("text")
                            .attr("id","text_44_to_48")
                            .attr("class","text-path")
                            .attr("x", w_gamebox - w_game - (w_round + w_game_small/2)/2)
                            .attr("y",3*h_game + 3*game_padding + h_game/2 - h_path_text)
                            .style("visibility","hidden")
                            .style("text-anchor","middle")
                            .attr("dy", ".35em")
                            .text("")
                            
var points_47_to_50 = [ {"x":w_gamebox - w_game - w_round - w_game_small,"y":h_game + game_padding/2},
                        {"x":w_gamebox - w_game - 2*w_round - w_game_small - w_game_small/2,"y":h_game + game_padding/2},
                        {"x":w_gamebox - w_game - 2*w_round - w_game_small - w_game_small/2,"y":2*h_game + 3*game_padding/2 - h_team/2}]                          
var path_47_to_50 = game_box.append("path")
                            .attr("d",lineFunction(points_47_to_50))
                            .attr("id","path_47_to_50")
                            .attr("class","path")
                            .attr("stroke","black")
                            .attr("stroke-width",1)
                            .attr("fill","none")
var text_47_to_50 = game_box.append("text")
                            .attr("id","text_47_to_50")
                            .attr("class","text-path")
                            .attr("x",w_gamebox - w_game - w_round - (w_round + w_game_small + w_game_small/2)/2)
                            .attr("y",h_game + game_padding/2 - h_path_text)
                            .style("visibility","hidden")
                            .style("text-anchor","middle")
                            .attr("dy", ".35em")
                            .text("")
                                                        
var points_48_to_50 = [ {"x":w_gamebox - w_game - w_round - w_game_small,"y":3*h_game + 5*game_padding/2},
                        {"x":w_gamebox - w_game - 2*w_round - w_game_small - w_game_small/2,"y":3*h_game + 5*game_padding/2},
                        {"x":w_gamebox - w_game - 2*w_round - w_game_small - w_game_small/2,"y":2*h_game + 3*game_padding/2 + h_team/2}]                          
var path_48_to_50 = game_box.append("path")
                            .attr("d",lineFunction(points_48_to_50))
                            .attr("id","path_48_to_50")
                            .attr("class","path")
                            .attr("stroke","black")
                            .attr("stroke-width",1)
                            .attr("fill","none")
var text_48_to_50 = game_box.append("text")
                            .attr("id","text_48_to_50")
                            .attr("class","text-path")
                            .attr("x",w_gamebox - w_game - w_round - (w_round + w_game_small + w_game_small/2)/2)
                            .attr("y",3*h_game + 5*game_padding/2 - h_path_text)
                            .style("visibility","hidden")
                            .style("text-anchor","middle")
                            .attr("dy", ".35em")
                            .text("")
                            
var points_50_to_51 = [ {"x":w_gamebox - w_game - 2*w_round - 2*w_game_small,"y":2*h_game + 3*game_padding/2},
                        {"x":w_gamebox - w_game - 3*w_round - 2*w_game_small,"y":2*h_game + 3*game_padding/2}]                          
var path_50_to_51 = game_box.append("path")
                            .attr("d",lineFunction(points_50_to_51))
                            .attr("id","path_50_to_51")
                            .attr("class","path")
                            .attr("stroke","black")
                            .attr("stroke-width",1)
                            .attr("fill","none")
var text_50_to_51 = game_box.append("text")
                            .attr("id","text_50_to_51")
                            .attr("class","text-path")
                            .attr("x",w_gamebox - w_game - 2*w_round - 2*w_game_small - w_round/2)
                            .attr("y",2*h_game + 3*game_padding/2 - h_path_text)
                            .style("visibility","hidden")
                            .style("text-anchor","middle")
                            .attr("dy", ".35em")
                            .text("")
                            
var points_win = [  {"x":w_gamebox - w_game - 2*w_round - 2*w_game_small - w_round - w_game_small/2,"y":2*h_game + 3*game_padding/2 - h_team/2},
                    {"x":w_gamebox - w_game - 2*w_round - 2*w_game_small - w_round - w_game_small/2,"y":2*h_game + 3*game_padding/2 - h_team/2 - h_path_win}]                          
var path_win = game_box.append("path")
                            .attr("d",lineFunction(points_win))
                            .attr("id","path-win")
                            .attr("class","path")
                            .attr("stroke","black")
                            .attr("stroke-width",1)
                            .attr("fill","none")
                            
var circle = game_box   .append("circle")
                // 		.attr("id",function(d) {
                // 		    return "circle-" + d.City
                // 		 })
                		.attr("cx",w_gamebox - w_game - 2*w_round - 2*w_game_small - w_round - w_game_small/2)
                		.attr("cy",2*h_game + 3*game_padding/2 - h_team/2 - h_path_win - r_circle)
                		.attr("r", r_circle)
                		.attr("fill", "white")
                		.attr("stroke-width",1)
                		.attr("stroke","black")

var circle_img = game_box   .append("image")
                            .attr("id","circle-image")
                            .attr("x",w_gamebox - w_game - 2*w_round - 2*w_game_small - w_round - w_game_small/2 - r_circle)
                            .attr("y",2*h_game + 3*game_padding/2 - h_team/2 - h_path_win - r_circle - r_circle)
                            .attr("height",h_img_large)
                            .attr("width",w_img_large)
                            .attr("xlink:href",function(d) {
                                var base_dir = "/img/projects/elo-uefa-euro2016/70/"
                                return base_dir + "Euro2016" + ".png";
                            }); 
var text_win = game_box.append("text")
                        .attr("id","text-win")
                        .attr("class","text-win")
                        .attr("x",w_gamebox/2)
                        .attr("y",2*h_game + 3*game_padding/2 - h_team/2 - h_path_win - r_circle)
                        .style("visibility","hidden")
                        .style("text-anchor","middle")
                        .attr("dy", ".35em")
                        .text("")         
                        
var info_text_win = game_box.append("text")
                            .attr("id","info-text-win")
                            .attr("class","text-win")
                            .attr("x",w_gamebox/2)
                            .attr("y",2*h_game + 3*game_padding/2 - h_team/2 - h_path_win - 2*r_circle - h_team)
                            .style("visibility","hidden")
                            .style("text-anchor","middle")
                            .attr("dy", ".35em")
                            .text("Chance to Win") 
                            
if (view == "table") {
    $("#svg").hide()
}
}) 
}