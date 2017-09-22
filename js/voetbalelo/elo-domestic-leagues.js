google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart_standing);
function drawChart_standing() {
      standing_forecast_regular = data_competitions[competition_selected]["standing_forecast_regular"]
      teams = data_competitions[competition_selected]["teams"]
      
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
                } else if (i < data_competitions[competition_selected]["cl_spots"]) {
                    data_table.push([String(i+1),
                                    0,customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),
                                    standing_forecast_regular[team_selected_index][i],customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),
                                    0,customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),
                                    0,customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),
                                    0,customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i])])                    
                // Europa league: dark red
                } else if (i < data_competitions[competition_selected]["cl_spots"] + data_competitions[competition_selected]["el_spots"]) {
                    data_table.push([String(i+1),
                                    0,customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),
                                    0,customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),
                                    standing_forecast_regular[team_selected_index][i],customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),
                                    0,customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i]),
                                    0,customTooltipChartStanding(String(i+1),standing_forecast_regular[team_selected_index][i])])                     
                // Relegation: red
                } else if (i >= teams.length - data_competitions[competition_selected]["degr_spots"]) {
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

    //   standing_forecast_regular = data_competitions[competition_selected]["standing_forecast_regular"]
    //   teams = data_competitions[competition_selected]["teams"]
      
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
    //             } else if (i < data_competitions[competition_selected]["cl_spots"]) {
    //                 data_table.push([String(i+1),standing_forecast_regular[team_selected_index][i], silver])
                    
    //             // Europa league: dark red
    //             } else if (i < data_competitions[competition_selected]["cl_spots"] + data_competitions[competition_selected]["el_spots"]) {
    //                 data_table.push([String(i+1),standing_forecast_regular[team_selected_index][i], dark_red])
                    
    //             // Relegation: red
    //             } else if (i >= teams.length - data_competitions[competition_selected]["degr_spots"]) {
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
      
      elo_evolution = data_competitions[competition_selected]["elo_evolution"]
      teams = data_competitions[competition_selected]["teams"]
      
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
    games = data_competitions[competition_selected]["games"]
    
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
            table_rows += "<td class='col-md-4 col-sm-4' style='text-align:left'>" + "<img src='/img/projects/elo-domestic-leagues/" + countries[c] + "/" + teams[parseInt(games[i][0])] + ".png'>" + "</img>&nbsp;" + teams[parseInt(games[i][0])] + "</td>"
            
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
            table_rows += "<td class='col-md-4 col-sm-4' style='text-align:right;border-right: 2px rgb(0,0,0) solid;'>" + teams[parseInt(games[i][1])] + "&nbsp;" + "<img src='/img/projects/elo-domestic-leagues/" + countries[c] + "/" + teams[parseInt(games[i][1])] + ".png'>" + "</img>" + "</td>"
            
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

function teamTables() {
    countries = Object.keys(data_competitions)
    
    // Start with competition_selected
    index_competition_selected = countries.indexOf(start_competition);
    if (index_competition_selected > -1) {
        countries.splice(index_competition_selected, 1);
        countries.unshift(start_competition)
    }    
    
    
    // Create tables
    for (c=0;c<countries.length;c++) {
    
    // Get data
    elo = data_competitions[countries[c]]["elo"]
    elo_evolution = data_competitions[countries[c]]["elo_evolution"]
    games = data_competitions[countries[c]]["games"]
    standing = data_competitions[countries[c]]["standing"]
    standing_forecast_regular = data_competitions[countries[c]]["standing_forecast_regular"]
    teams = data_competitions[countries[c]]["teams"]
    degr_spots = data_competitions[countries[c]]["degr_spots"]
    el_spots = data_competitions[countries[c]]["el_spots"]
    cl_spots = data_competitions[countries[c]]["cl_spots"]
    
    if (start_competition == "Belgium") {
        degr_spots = 1
    }
            
    // Ranking
    table_head =    '<thead>' +
                    '<tr>' + 
                    "<th class='col-lg-3 col-md-5 col-sm-3 col-xs-1' data-sorter='false' style='text-align: center;border-bottom: 0px;'></th>" +
                    
                    "<th class=' col-lg-2 col-md-2 col-sm-3 col-xs-4' colspan='2' style='font-size:15px;text-align: center;border-bottom:0px;'>" + 
                    "<span style='width: 98%;float: left;margin-left: 1%;border-bottom:  2px #ddd solid;'>ELO Ranking</span></th>"
                    
    if (countries[c] == "Belgium") {
        table_head += "<th class=' col-lg-4 col-md-5 col-sm-6 hidden-xs' colspan='5' style='font-size:15px;text-align: center;border-bottom:0px;'>" +
                    "<span style='width: 98%;float: left;margin-left: 1%;border-bottom:  2px #ddd solid;'>Probability of ...</span></th>"
                    
        table_head += "<th class='hidden-lg hidden-md hidden-sm col-xs-7' colspan='4' style='font-size:15px;text-align: center;border-bottom:0px;'>" +
                    "<span style='width: 98%;float: left;margin-left: 1%;border-bottom:  2px #ddd solid;'>Probability of ...</span></th>"
    } else {
        table_head += "<th class=' col-lg-4 col-md-5 col-sm-6 col-xs-7' colspan='4' style='font-size:15px;text-align: center;border-bottom:0px;'>" +
                    "<span style='width: 98%;float: left;margin-left: 1%;border-bottom:  2px #ddd solid;'>Probability of ...</span></th>"        
    }
                    
    table_head +=   "<th class='col-lg-3 ranking-table-small' colspan='9' style='font-size:15px;text-align: center;border-bottom:0px;'>" +
                    "<span style='width: 98%;float: left;margin-left: 1%;border-bottom:  2px #ddd solid;'>Regular Ranking</span></th>" +
                    "</tr>" +
                    
                    '<tr>' +
                    "<th style='text-align: left;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>Team</th>" +
                    
                    // "<th style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>R</th>" +
                    "<th class='' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>ELO<br>Score</th>" +
                    "<th class='' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>1 Week<br>Change</th>"
    
    if (countries[c] == "Belgium") {
            table_head +=   "<th class='' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>Rel.</th>" +
                        "<th class='' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>PO III</th>" +
                        "<th class='hidden-xs' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>PO II</th>" +
                        "<th class='' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>PO I</th>" +
                        "<th class='' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>Title</th>"                  
    } else {
            table_head +=   "<th class='' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>Rel.</th>" +
                        "<th class='' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>EL</th>" +
                        "<th class='' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>CL</th>" +
                        "<th class='' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>Title</th>"                  
    }
                    
    table_head += "<th class='ranking-table-small' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>R</th>" +
                    "<th class='ranking-table-small' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>PTN</th>" + 
                    "<th class='ranking-table-small' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>M</th>" + 
                    "<th class='ranking-table-small' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>M+</th>" + 
                    "<th class='ranking-table-small' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>M-</th>" + // <img id='trophy-img' src='/img/trophy_16.png' </img>
                    "<th class='ranking-table-small' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>M=</th>" + 
                    "<th class='ranking-table-small' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>D+</th>" + 
                    "<th class='ranking-table-small' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>D-</th>" + 
                    "<th class='ranking-table-small' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>D+/-</th>" + 

                    
                    "</tr></thead>"
        
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
        kampioen_perc = []
        // kampioen_perc_sum = 0
        degradatie_perc = []
        // degradatie_perc_sum = 0
        
        for (i=0;i<teams.length;i++) {
            kampioen_perc.push(standing_forecast_regular[i][0])
            // kampioen_perc_sum += standing_forecast_regular[i][0]
            
            degradatie_perc.push(0)

            for (j=0;j<degr_spots;j++) {
                degradatie_perc[degradatie_perc.length-1] += standing_forecast_regular[i][standing_forecast_regular[i].length -1-j]
            }
            
            // degradatie_perc_sum += standing_forecast_regular[i][standing_forecast_regular[i].length -1]
        }
        
        // max_index = kampioen_perc.indexOf(Math.max.apply(Math, kampioen_perc));
        // if (kampioen_perc_sum < 100) {
        //     kampioen_perc[max_index] += kampioen_perc_sum - 100
        // } else {
        //     kampioen_perc[max_index] += 100 - kampioen_perc_sum
        // }
    
        // max_index = degradatie_perc.indexOf(Math.max.apply(Math, degradatie_perc));    
        // if (degradatie_perc_sum < 100) {
        //     degradatie_perc[max_index] += degradatie_perc_sum - 100
        // } else {
        //     degradatie_perc[max_index] += 100 - degradatie_perc_sum
        // }
        
        // Nu Strength of Remaining Schedule berekening
        // sos = []
        // for (i = 0; i < teams.length; i++) sos[i] = 0;
        // hfa = 84 // Home Field Advantage
        // for (i=0;i<games.length;i++) {
        //     if (parseInt(games[i][4]) == 0) { // Wedstrijd nog niet gespeeld, telt mee voor SoS
        //         sos[parseInt(games[i][0])] += elo[parseInt(games[i][1])] - hfa
        //         sos[parseInt(games[i][1])] += elo[parseInt(games[i][0])] + hfa
        //     }
        // }
        // for (i=0;i<sos.length;i++) {
        //     sos[i] = Math.round(sos[i]/(30-standing[i][0]))
        // }
        
        color_code_odds = [26,155,217]
            
        table_rows = '<tbody style="text-align: center;">'
        table_rows_small = '<tbody style="text-align: center;">'
        for (i=0;i<teams.length;i++) {
                table_rows += "<tr>"
                
                // Team Name
                table_rows += '<td style="text-align: left;border-right: 2px rgb(0,0,0) solid;">' + '<img src="/img/projects/elo-domestic-leagues/' + countries[c] + "/" + teams[i] + '.png">' + '</img>' + "<span class='team-name-small'>&nbsp;" + teams[i] + "</span>" + "</td>"
                table_rows_small += '<td style="text-align: left;border-right: 2px rgb(0,0,0) solid;">' + '<img src="/img/projects/elo-domestic-leagues/' + countries[c] + "/" + teams[i] + '.png">' + '</img>' + "<span class='team-name-small'>&nbsp;" + teams[i] + "</span>" + "</td>"
                
                // Elo
                table_rows += "<td class=''>" + String(elo[i]) +   "</td>"
                table_rows_small += "<td class=''>" + String(elo[i]) +   "</td>"
                
                // dELO
                dElo = elo_evolution[i][elo_evolution[i].length-1] - elo_evolution[i][elo_evolution[i].length-2]
                if (dElo > 0) {
                    dElo_sign = "+"
                    dElo_color = "rgb(162,213,161)" // Green
                } else if (dElo < 0) {
                    dElo_sign = ""
                    dElo_color = "rgb(255,147,128)" // Red
                } else {
                    dElo_sign = ""
                }
                table_rows += '<td class="" style="border-right: 2px rgb(0,0,0) solid;">' + "<span style='width:60%;float:left;margin-left:20%;border-radius: 10px;background:" + dElo_color + "'>&nbsp;" + dElo_sign + String(dElo) + "&nbsp;</span>" +  "</td>"
                table_rows_small += '<td class="" style="border-right: 2px rgb(0,0,0) solid;">' + "<span style='width:60%;float:left;margin-left:20%;border-radius: 10px;background:" + dElo_color + "'>&nbsp;" + dElo_sign + String(dElo) + "&nbsp;</span>" +  "</td>"
                
                // Degradatie
                color_gradient = rgbGradient(degradatie_perc[i],color_code_odds)
                color_gradient = rgbGradient(degradatie_perc[i],color_code_odds)
                int_part = String(Math.round(degradatie_perc[i]*10)/10).split(".")[0]
                dec_part = String(Math.round(degradatie_perc[i]*10)/10).split(".")[1]
                
                if (dec_part == undefined) {
                    table_rows += '<td class="" style="border-right:2px #ddd solid;background:' +color_gradient + ';">' + int_part + "%" + "</td>"
                    table_rows_small += '<td class="" style="border-right:2px #ddd solid;background:' +color_gradient + ';">' + int_part + "%" + "</td>"
                } else {
                    table_rows += '<td class="" style="border-right:2px #ddd solid;background:' +color_gradient + ';">' + int_part + "<sup>" + dec_part + "</sup>" + "%" + "</td>"
                    table_rows_small += '<td class="" style="border-right:2px #ddd solid;background:' +color_gradient + ';">' + int_part  + "<sup>" + dec_part + "</sup>" + "%" + "</td>"                
                }
                
                if (countries[c] == "Belgium") {
                        // PO Chance
                        po_i_chance = 0
                        po_ii_chance = 0
                        po_iii_chance = 0
                        for (j=0;j<standing_forecast_regular[i].length;j++) {
                            if (j<6) {
                                po_i_chance += standing_forecast_regular[i][j]
                            } else if (j<14) {
                                po_ii_chance += standing_forecast_regular[i][j]
                            } else {
                                po_iii_chance += standing_forecast_regular[i][j]
                            }
                        }
                        
                        // PO III
                        color_gradient = rgbGradient(po_iii_chance,color_code_odds)
                        int_part = String(Math.round(po_iii_chance*10)/10).split(".")[0]
                        dec_part = String(Math.round(po_iii_chance*10)/10).split(".")[1]
                        if (dec_part == undefined) {
                            table_rows += '<td class="" style="background:' +color_gradient + ';">' + int_part + "%" + "</td>"
                            table_rows_small += '<td class="" style="background:' +color_gradient + ';">' + int_part + "%" + "</td>"
                        } else {
                            table_rows += '<td class="" style="background:' +color_gradient + ';">' + int_part + "<sup>" + dec_part + "</sup>" + "%" + "</td>"
                            table_rows_small += '<td class="" style="background:' +color_gradient + ';">' + int_part + ","  + "<sup>" + dec_part + "</sup>" + "%" + "</td>"                
                        }
                        
                        color_gradient = rgbGradient(po_ii_chance,color_code_odds)
                        int_part = String(Math.round(po_ii_chance*10)/10).split(".")[0]
                        dec_part = String(Math.round(po_ii_chance*10)/10).split(".")[1]
                        if (dec_part == undefined) {
                            table_rows += '<td class="hidden-xs" style="background:' +color_gradient + ';">' + int_part + "%" + "</td>"
                            table_rows_small += '<td class="" style="background:' +color_gradient + ';">' + int_part + "%" + "</td>"
                        } else {
                            table_rows += '<td class="hidden-xs" style="background:' +color_gradient + ';">' + int_part +  "<sup>" + dec_part + "</sup>" + "%" + "</td>"
                            table_rows_small += '<td class="" style="background:' +color_gradient + ';">' + int_part +  "<sup>" + dec_part + "</sup>" + "%" + "</td>"                
                        }
                        
                        color_gradient = rgbGradient(po_i_chance,color_code_odds)
                        int_part = String(Math.round(po_i_chance*10)/10).split(".")[0]
                        dec_part = String(Math.round(po_i_chance*10)/10).split(".")[1]
                        if (dec_part == undefined) {
                            table_rows += '<td class="" style="border-right:2px #ddd solid;background:' +color_gradient + ';">' + int_part +  "%" + "</td>"
                            table_rows_small += '<td class="" style="border-right:2px #ddd solid;background:' +color_gradient + ';">' + int_part  +  "%" + "</td>"
                        } else {
                            table_rows += '<td class="" style="border-right:2px #ddd solid;background:' +color_gradient + ';">' + int_part + "<sup>" + dec_part + "</sup>" +  "%" + "</td>"
                            table_rows_small += '<td class="" style="border-right:2px #ddd solid;background:' +color_gradient + ';">' + int_part +  "<sup>" + dec_part + "</sup>" +  "%" + "</td>"               
                        }
                } else {
                    
                    el_chance = 0
                    cl_chance = 0
                    for (j=0;j<standing_forecast_regular[i].length;j++) {
                        if (j<cl_spots) {
                            cl_chance += standing_forecast_regular[i][j]
                        } else if (j<cl_spots + el_spots) {
                            el_chance += standing_forecast_regular[i][j]
                        } 
                    }  
                    
                    // Europa League
                    color_gradient = rgbGradient(el_chance,color_code_odds)
                    int_part = String(Math.round(el_chance*10)/10).split(".")[0]
                    dec_part = String(Math.round(el_chance*10)/10).split(".")[1]
                    if (dec_part == undefined) {
                        table_rows += '<td class="" style="background:' +color_gradient + ';">' + int_part + "%" + "</td>"
                        table_rows_small += '<td class="" style="background:' +color_gradient + ';">' + int_part + "%" + "</td>"
                    } else {
                        table_rows += '<td class="" style="background:' +color_gradient + ';">' + int_part + "<sup>" + dec_part + "</sup>" + "%" + "</td>"
                        table_rows_small += '<td class="" style="background:' +color_gradient + ';">' + int_part + ","  + "<sup>" + dec_part + "</sup>" + "%" + "</td>"                
                    }                    
                    
                    // Champions League
                    color_gradient = rgbGradient(cl_chance,color_code_odds)
                    int_part = String(Math.round(cl_chance*10)/10).split(".")[0]
                    dec_part = String(Math.round(cl_chance*10)/10).split(".")[1]
                    if (dec_part == undefined) {
                        table_rows += '<td class="" style="border-right:2px #ddd solid;background:' +color_gradient + ';">' + int_part + "%" + "</td>"
                        table_rows_small += '<td class="" style="border-right:2px #ddd solid;background:' +color_gradient + ';">' + int_part + "%" + "</td>"
                    } else {
                        table_rows += '<td class="" style="border-right:2px #ddd solid;background:' +color_gradient + ';">' + int_part + "<sup>" + dec_part + "</sup>" + "%" + "</td>"
                        table_rows_small += '<td class="" style="border-right:2px #ddd solid;background:' +color_gradient + ';">' + int_part + ","  + "<sup>" + dec_part + "</sup>" + "%" + "</td>"                
                    }                     
                    
                    
                }
                // Kampioen
                color_gradient = rgbGradient(kampioen_perc[i],color_code_odds)
                int_part = String(Math.round(kampioen_perc[i]*10)/10).split(".")[0]
                dec_part = String(Math.round(kampioen_perc[i]*10)/10).split(".")[1]    
                if (dec_part == undefined) {            
                    table_rows += '<td class="border-small" style="border-right: 2px rgb(0,0,0) solid;background:' +color_gradient + ';">' + int_part + "%" + "</td>"
                    table_rows_small += '<td class="border-small" style="background:' +color_gradient + ';">' + int_part + "%" + "</td>"
                } else {
                    table_rows += '<td class="border-small" style="border-right: 2px rgb(0,0,0) solid;background:' +color_gradient + ';">' + int_part + "<sup>" + dec_part + "</sup>" + "%" + "</td>"
                    table_rows_small += '<td class="border-small" style="background:' +color_gradient + ';">' + int_part + "<sup>" + dec_part + "</sup>" + "%" + "</td>"                
                }
                // Team KLASSIEK Ranking
                table_rows += "<td class='ranking-table-small'>" + String(standing[i][standing[i].length-2]) + "</td>"
                
                // PTN
                table_rows += "<td class='ranking-table-small'>" + String(standing[i][standing[i].length-3]) + "</td>"
                
                // M
                table_rows += "<td class='ranking-table-small'>" + String(standing[i][0]) + "</td>"
                
                // M+
                table_rows += "<td class='ranking-table-small'>" + String(standing[i][1]) + "</td>"
                
                // M-
                table_rows += "<td class='ranking-table-small'>" + String(standing[i][2]) + "</td>"
                
                // M=
                table_rows += "<td class='ranking-table-small'>" + String(standing[i][3]) + "</td>"
                
                // D+
                table_rows += "<td class='ranking-table-small'>" + String(standing[i][4]) + "</td>"
                
                // D-
                table_rows += "<td class='ranking-table-small'>" + String(standing[i][5]) + "</td>"
                
                // D+/-
                table_rows += "<td class='ranking-table-small'>" + String(standing[i][6]) + "</td>"
    
                table_rows += "</tr>"
                table_rows_small += "</tr>"
        }
    
        
        table_rows += "</tbody>"
        table_rows_small += "</tbody>"
        
        // Append to DOM
        if (countries[c] == start_competition) {
            $("#country_tables").append("<div id='table_" + countries[c] + "_wrapper'" + "class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>" +
            
                                        "<table id='table_" + countries[c] + "'" + "class='table table-condensed ranking-table'>" +
                                        table_head + 
                                        table_rows + 
                                        "</table>" +
                                        "</div>")
        } else {
            $("#country_tables").append("<div id='table_" + countries[c] + "_wrapper'" + "class='col-lg-12 col-md-12 col-sm-12 col-xs-12' style='display:none;'>" +
            
                                        "<table id='table_" + countries[c] + "'" + "class='table table-condensed ranking-table'>" + 
                                        table_head + 
                                        table_rows + 
                                        "</table>" +
                                        "</div>")            
        }
        
        // $("#jupiler-pro-league-ranking-table-small").append(table_head_small + table_rows_small)  
        
        // Sort table
        $("#table_" + countries[c]).tablesorter( {sortList: [[1,1]]} ); 
        // $("#jupiler-pro-league-ranking-table-small").tablesorter( {sortList: [[1,1]]} );
        
    }
}

function createTeamChoice() {
            // Maak knop met ploegen
           //Dropdown plugin data
            var ddData_teams = [];
            console.log(competition_selected)
              for (i = 0;i<data_competitions[competition_selected]["teams"].length;i++) {
                  if (i == 0) {
                    ddData_teams.push({text: data_competitions[competition_selected]["teams"][i], value: i, selected:true, description:" ", imageSrc: "/img/projects/elo-domestic-leagues/" + competition_selected + "/" + data_competitions[competition_selected]["teams"][i] + ".png"})
                    
                    team_selected = data_competitions[competition_selected]["teams"][i]
                    team_selected_index = i
                      
                  } else  {
                    ddData_teams.push({text: data_competitions[competition_selected]["teams"][i], value: i, selected:false, description:" ",imageSrc: "/img/projects/elo-domestic-leagues/" + competition_selected + "/" + data_competitions[competition_selected]["teams"][i] + ".png"})
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
                    console.log(data_competitions[competition_selected]["teams"])
                    team_selected = $("#jpl-teams-visualization").find(".dd-selected-text").text()
                    team_selected_index = data_competitions[competition_selected]["teams"].indexOf(team_selected)
                    drawChart_standing()
                    drawChart_elo()
                }
              })
}