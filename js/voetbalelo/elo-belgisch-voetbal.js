function headToHead(team_select,team_select_comp) {
    test = []
    plotlines_xindex = []
    hth = [0,0,0] // W team_select - Draw -W team_select_comp
    for (s=0;s<seasons.length;s++) {
        // Remove null values
        // arr = arr.filter(function(n){ return n != undefined }); 
        
        if (elo_evolution[team_select][seasons[s]][0].filter(function(n){ return n != undefined }).length == 0 || elo_evolution[team_select_comp][seasons[s]][0].filter(function(n){ return n != undefined }).length == 0) {
            continue
        }
        
        
                    for (i=0;i<elo_evolution[team_select][seasons[s]][0].length;i++) {
                if (elo_evolution[team_select][seasons[s]][2][i] == undefined) {
                    continue
                }        
                
                if (elo_evolution[team_select][seasons[s]][2][i].indexOf(team_select_comp) > -1) {
                    // Game between the two teams
                    plotlines_xindex.push([s,i])
                    test.push([elo_evolution[team_select][seasons[s]][4][i],elo_evolution[team_select][seasons[s]][5][i], elo_evolution[team_select][seasons[s]][2][i], elo_evolution[team_select][seasons[s]][3][i]])
                    
                    // Calculate head-to-head
                    if (elo_evolution[team_select][seasons[s]][2][i].indexOf(team_select) < elo_evolution[team_select][seasons[s]][2][i].indexOf(team_select_comp)) {
                        if (parseInt(elo_evolution[team_select][seasons[s]][3][i].split(" - ")[0]) > parseInt(elo_evolution[team_select][seasons[s]][3][i].split(" - ")[1])) {
                            hth[0] += 1
                        } else {
                            if (parseInt(elo_evolution[team_select][seasons[s]][3][i].split(" - ")[0]) == parseInt(elo_evolution[team_select][seasons[s]][3][i].split(" - ")[1])) {
                                hth[1] += 1
                            } else {
                                hth[2] += 1
                            }
                        }                    
                    } else {
                        if (parseInt(elo_evolution[team_select][seasons[s]][3][i].split(" - ")[0]) > parseInt(elo_evolution[team_select][seasons[s]][3][i].split(" - ")[1])) {
                            hth[2] += 1
                        } else {
                            if (parseInt(elo_evolution[team_select][seasons[s]][3][i].split(" - ")[0]) == parseInt(elo_evolution[team_select][seasons[s]][3][i].split(" - ")[1])) {
                                hth[1] += 1
                            } else {
                                hth[0] += 1
                            }
                        }                      
                    }
                }
                
            }  
    }
    // Fill table & show
    data_table = []
    if (test.length == 0) {
           } else {
         // document.getElementById('head-to-head-body').innerHTML = "<tr><th style='padding: 0px;'>Date</th><th style='padding: 0px;'>Game</th><th style='padding: 0px;'>Score</th></tr>"
        for (i=0;i<test.length;i++) {
            data_table.push({   'datum': moment(test[i][0]).format("D MMM YYYY"),
                                'type': test[i][1],
                                'wedstrijd': test[i][2],
                                'score': test[i][3]})
                 }
        // document.getElementById('head-to-head').innerHTML += "</tbody>"
    }
    
        // // ELO Ranking Tabel
    table_string = "<table id='ow-table' data-height='150' data-show-header='false' style='font-size:16px !important'>"+"<thead><tr>" + 
                    "<th class='col-xs-2' data-align='center' data-field='datum' data-sortable='false'>Datum</th>" + 
                    "<th class='col-xs-2' data-align='center' data-field='type' data-sortable='false'>Type</th>" + 
                    "<th class='col-xs-7' data-align='center' data-field='wedstrijd' data-sortable='false'>Wedstrijd</th>" + 
                    "<th class='col-xs-1' data-align='center' data-field='score' data-sortable='false'>Uitslag</th></tr></thead>" + "</table>"
    
    // Reset div
    $("#ow-table-wrapper").html(table_string)
    // Fill div
    // $("#ow-table-wrapper").append(table_string)    
    
    // // Add images
    // for (i=0;i<teams.length;i++) {
    //     team = data_table[i]["team"]
    //     data_table[i]["team"] = "<img src='/img/Team Logos Compleet/" + team + ".png'" + "</img>&nbsp;" + team
    // }
    // console.log(data_table)    
    // $('#elo-ranking tbody tr').each(function(){
    //     team = $(this).find("td").eq(1).text()
    //     $(this).find("td").eq(1).html("<img src='/img/Team Logos Compleet/" + team + ".png'" + "</img>&nbsp;" + team)
    // })
    
    $('#ow-table').bootstrapTable({
        data: data_table
    });
    
    // Fill hth div
    info_string = "<span style='text-align:center;font-size:16px'>" + "<strong>Head-to-Head</strong>" + "</span><br>"
    info_string += "<span style='text-align:center;font-size:16px'>" + String(hth[0]) +" - " +String(hth[1]) + " - "+String(hth[2])  + "</span>"
    $("#hth").html(info_string)
    
    
    
    // // Make table scrollable (via bootstrap), class head-to-head defined in custom.css
    // $("#head-to-head-body").parent().addClass("head-to-head")
    
    // Show

        // if (test.length == 0) {
        //     $("#ow-table-wrapper").show()  
        //     $("#head-to-head-body").hide()  
        // } else {
        //     $("#head-to-head-header").show()     
        //     $("#head-to-head-body").show()         
        // }
}

// function headToHead(team_select,team_select_comp) {
//     test = []
//     plotlines_xindex = []
//     hth = [0,0,0] // W team_select - Draw -W team_select_comp
//     for (s=0;s<seasons.length;s++) {
//         if (elo_evolution[team_select][seasons[s]][0].length == 0 || elo_evolution[team_select_comp][seasons[s]][0].length == 0) {
//             continue
//         }
        
        
//                     for (i=0;i<elo_evolution[team_select][seasons[s]][0].length;i++) {
//                 if (elo_evolution[team_select][seasons[s]][2][i].indexOf(team_select_comp) > -1) {
//                     // Game between the two teams
//                     plotlines_xindex.push([s,i])
//                     test.push([elo_evolution[team_select][seasons[s]][4][i],elo_evolution[team_select][seasons[s]][5][i], elo_evolution[team_select][seasons[s]][2][i], elo_evolution[team_select][seasons[s]][3][i]])
                    
//                     // Calculate head-to-head
//                     if (elo_evolution[team_select][seasons[s]][2][i].indexOf(team_select) < elo_evolution[team_select][seasons[s]][2][i].indexOf(team_select_comp)) {
//                         if (parseInt(elo_evolution[team_select][seasons[s]][3][i].split(" - ")[0]) > parseInt(elo_evolution[team_select][seasons[s]][3][i].split(" - ")[1])) {
//                             hth[0] += 1
//                         } else {
//                             if (parseInt(elo_evolution[team_select][seasons[s]][3][i].split(" - ")[0]) == parseInt(elo_evolution[team_select][seasons[s]][3][i].split(" - ")[1])) {
//                                 hth[1] += 1
//                             } else {
//                                 hth[2] += 1
//                             }
//                         }                    
//                     } else {
//                         if (parseInt(elo_evolution[team_select][seasons[s]][3][i].split(" - ")[0]) > parseInt(elo_evolution[team_select][seasons[s]][3][i].split(" - ")[1])) {
//                             hth[2] += 1
//                         } else {
//                             if (parseInt(elo_evolution[team_select][seasons[s]][3][i].split(" - ")[0]) == parseInt(elo_evolution[team_select][seasons[s]][3][i].split(" - ")[1])) {
//                                 hth[1] += 1
//                             } else {
//                                 hth[0] += 1
//                             }
//                         }                      
//                     }
//                 }
                
//             }  
//     }
//     // Fill table & show
//     if (test.length == 0) {
//         document.getElementById('head-to-head-header').innerHTML =  "Geen onderlinge wedstrijden gespeeld." // "<tr class='head-to-head-row'><td>No Games Played Yet</td></tr>"
//     } else {
//         document.getElementById('head-to-head-header').innerHTML = "<strong>" + "Head-to-Head: " + String(hth[0]) +" - " +String(hth[1]) + " - "+String(hth[2]) + "</strong>" // "<tr><th class='head-to-head-row' colspan='3'>Head-to-Head: " + String(hth[0]) +" - " +String(hth[1]) + " - "+String(hth[2]) +"</th></tr>"
        
//         document.getElementById('head-to-head-body').innerHTML = ""
//         // document.getElementById('head-to-head-body').innerHTML = "<tr><th style='padding: 0px;'>Date</th><th style='padding: 0px;'>Game</th><th style='padding: 0px;'>Score</th></tr>"
//         for (i=0;i<test.length;i++) {
//             document.getElementById('head-to-head-body').innerHTML += "<tr><td class='head-to-head-row'>" + moment(test[i][0]).format("D MMM YYYY") + "</td><td class='head-to-head-row'>" +  test[i][1]+ "</td><td class='head-to-head-row'>" +  test[i][2] +"</td><td class='head-to-head-row'>" + test[i][3] + "</td></tr>"
//         }
//         // document.getElementById('head-to-head').innerHTML += "</tbody>"
//     }
    
//     // Make table scrollable (via bootstrap), class head-to-head defined in custom.css
//     $("#head-to-head-body").parent().addClass("head-to-head")
    
//     // Show

//         if (test.length == 0) {
//             $("#head-to-head-header").show()  
//             $("#head-to-head-body").hide()  
//         } else {
//             $("#head-to-head-header").show()     
//             $("#head-to-head-body").show()         
//         }
// }

function drawEloChart(team_select,team_select_comp) {
    // Don't compare with same team (=stupid)
    if (team_select == team_select_comp) {
       
        return
    }
   
   // Get data via AJAX call
    // url_select = "https://s3.eu-central-1.amazonaws.com/jpl-elo/teams/" + team_select + ".json"
    url_select = "http://www.sway-blog.be/data/elo-belgisch-voetbal/teams/" + team_select + ".json"
    ajax_call_select = $.ajax({
      url: url_select,
      dataType: 'json',
      crossDomain: true, // enable this
    })

        
    if (team_select_comp == "") {
        url_select_comp = ""
        ajax_call_select_comp = ""
    } else {
        // url_select_comp = "https://s3.eu-central-1.amazonaws.com/jpl-elo/teams/" + team_select_comp + ".json"
        url_select_comp = "http://www.sway-blog.be/data/elo-belgisch-voetbal/teams/" + team_select_comp + ".json"
        ajax_call_select_comp = $.ajax({
                  url: url_select_comp,
                  dataType: 'json',
                  crossDomain: true, // enable this
                })

    }
    
   $.when(ajax_call_select,ajax_call_select_comp ).done(function(data1, data2){
        elo_evolution = data1[0]
        // Info string
        info_string = "<span style='font-size:16px'>" + String(elo_evolution[team_select]["kampioenschappen"]) + "x Kampioen" + "</span><br>"
        info_string += "<span style='font-size:16px'>" + "Min. Elo (" + "<img src='/img/icons/arrow_red_down_12_transparant.png'></img>" + "): " + String(elo_evolution[team_select]["laagste elo"]) + " || " + "</span>"
        info_string += "<span style='font-size:16px'>" + "Max. Elo (" + "<img src='/img/icons/arrow_green_up_12_transparant.png'></img>" + "): " + String(elo_evolution[team_select]["hoogste elo"]) + "</span><br>"
        $("#kamp-team").html(info_string)
        
         if (team_select_comp != "") {
             elo_evolution[team_select_comp] = data2[0][team_select_comp]
            // Aantal kampioenschappen
            info_string = "<span style='font-size:16px'>" + String(elo_evolution[team_select_comp]["kampioenschappen"]) + "x Kampioen" + "</span><br>"
            info_string += "<span style='font-size:16px'>" + "Min. Elo: " + String(elo_evolution[team_select_comp]["laagste elo"]) + " || " + "</span>"
            info_string += "<span style='font-size:16px'>" + "Max. Elo: " + String(elo_evolution[team_select_comp]["hoogste elo"]) + "</span><br>"
            $("#kamp-team-comp").html(info_string)
    }
        
    // series = data that will be shown (dates & elo)
    //     series = []
    // seasons_team_select = 0
    // for (k=0;k<teams.length;k++) {
    // for (i=0;i<seasons.length;i++) {
    //     data = []
    //     for (j=0;j<elo_evolution[teams[k]][seasons[i]][0].length;j++) {
    //         data.push({ x:elo_evolution[teams[k]][seasons[i]][0][j],
    //                     y:elo_evolution[teams[k]][seasons[i]][1][j],
    //                     date:elo_evolution[teams[k]][seasons[i]][4][j],
    //                     type:elo_evolution[teams[k]][seasons[i]][5][j]})
            
    //     }
    //     if (data != []) {
    //         seasons_team_select = seasons_team_select + 1
    //     }
    //     series.push({name:teams[k]+ "--" + seasons[i],data:data, marker: {symbol: "circle"} , color: "rgba(0,0,0,0.05)"})
    // }
    // }

    series = []
    plotbands = []
    seasons_team_select = 0
    for (i=0;i<seasons.length;i++) {
        // Check of ploeg kampioen gespeeld is in dit seizoen
        if (elo_evolution[team_select][seasons[i]][6] == 1) {
            // plotband_color = colors[team_select].replace("1)","0.1)")
            number_of_nones = elo_evolution[team_select][seasons[i]][1].filter(function(n){ return n == undefined }).length
            plotbands.push({color: colors[team_select].replace("1)","0.1)"), 
                            from: elo_evolution[team_select][seasons[i]][0][0], 
                            to: elo_evolution[team_select][seasons[i]][0][elo_evolution[team_select][seasons[i]][0].length-(1+number_of_nones)]})
        }
        // // Plotbands vs
        // if (team_select_comp != "") {
        //         if (elo_evolution[team_select_comp][seasons[i]][6] == 1) {
        //         plotbands.push({color: colors[team_select_comp].replace("1)","0.1)"), 
        //                         from: elo_evolution[team_select_comp][seasons[i]][0][0], 
        //                         to: elo_evolution[team_select_comp][seasons[i]][0][elo_evolution[team_select_comp][seasons[i]][0].length-1]})
        //         }
        //     }
        data = []
        for (j=0;j<elo_evolution[team_select][seasons[i]][0].length;j++) {
            data.push({ x:elo_evolution[team_select][seasons[i]][0][j],
                        y:elo_evolution[team_select][seasons[i]][1][j],
                        game:elo_evolution[team_select][seasons[i]][2][j] ,
                        score:elo_evolution[team_select][seasons[i]][3][j],
                        date:elo_evolution[team_select][seasons[i]][4][j],
                        type: elo_evolution[team_select][seasons[i]][5][j] // "Seizoen " + seasons[i] + " | " + 

            })
            
        }
        
        // Add markers
        
        
        
        if (data != []) {
            seasons_team_select = seasons_team_select + 1
        }
        series.push({name:team_select+ "--" + seasons[i],data:data, marker: {symbol: "circle"} , color: colors[team_select]})
    }
    
                                                       
    
    image_location = "/img/elo/background.png"
    plotlines = []
    // Fill table
    if (team_select_comp != "") {
        image_location = ""
        headToHead(team_select,team_select_comp)

        
        
        // // Fill plotlines
        // console.log(plotlines_xindex)
        // for (i=0;i<plotlines_xindex.length;i++) {
        //     plotlines.push({color: colors[team_select_comp],
        //                     width: 1,
        //                     value: plotlines_xindex[i]})
        // }
        // series_comp = []
        for (i=0;i<seasons.length;i++) {
                    // Check of ploeg kampioen gespeeld is in dit seizoen
        if (elo_evolution[team_select_comp][seasons[i]][6] == 1) {
            // plotband_color = colors[team_select].replace("1)","0.1)")
            plotbands.push({color: colors[team_select_comp].replace("1)","0.1)"), 
                            from: elo_evolution[team_select_comp][seasons[i]][0][0], 
                            to: elo_evolution[team_select_comp][seasons[i]][0][elo_evolution[team_select_comp][seasons[i]][0].length-2]})
        }
        
        data = []
        
        for (j=0;j<elo_evolution[team_select_comp][seasons[i]][0].length;j++) {
            data.push({ x:elo_evolution[team_select_comp][seasons[i]][0][j],
                        y:elo_evolution[team_select_comp][seasons[i]][1][j],
                        game:elo_evolution[team_select_comp][seasons[i]][2][j] ,
                        score:elo_evolution[team_select_comp][seasons[i]][3][j],
                        date:elo_evolution[team_select_comp][seasons[i]][4][j],
                        type: elo_evolution[team_select_comp][seasons[i]][5][j] // "Seizoen " + seasons[i] + " | " + 

            })
        }
        series.push({name:team_select_comp + "--" + seasons[i],data:data, marker: {symbol: "circle"} , color: colors[team_select_comp].replace("1)","0.1)"), enableMouseTracking: false})
    }
    // console.log(series_comp)
        // Add marker for games played
         for (i=0;i<plotlines_xindex.length;i++) {
            series[plotlines_xindex[i][0]].data[plotlines_xindex[i][1]]  = { marker: {
                                                                                            symbol: 'circle',
                                                                                            enabled: true,
                                                                                            fillColor: colors[team_select_comp].replace("1)","0.8)"),
                                                                                            lineWidth: 0.2,
                                                                                            radius: 2.5,
                                                                                            lineColor: "#FF0000" // inherit from series
                                                                                    },y:series[plotlines_xindex[i][0]].data[plotlines_xindex[i][1]].y,
                                                                                    x: series[plotlines_xindex[i][0]].data[plotlines_xindex[i][1]].x,
                                                                                    game:series[plotlines_xindex[i][0]].data[plotlines_xindex[i][1]].game,
                                                                                    score:series[plotlines_xindex[i][0]].data[plotlines_xindex[i][1]].score,
                                                                                    date:series[plotlines_xindex[i][0]].data[plotlines_xindex[i][1]].date,
                                                                                    type:series[plotlines_xindex[i][0]].data[plotlines_xindex[i][1]].type
            
        }
         }
        
    } else {
        // Hide table
        $("#head-to-head-header").hide()  
        $("#head-to-head-body").hide()  
    }

    // if (team_select_comp != "") {
    //     image_location = ""
        

        
    //     for (i=0;i<seasons.length;i++) {
    //                 // Check of ploeg kampioen gespeeld is in dit seizoen
    //     if (elo_evolution[team_select_comp][seasons[i]][6] == 1) {
    //         // plotband_color = colors[team_select].replace("1)","0.1)")
    //         plotbands.push({color: colors[team_select_comp].replace("1)","0.1)"), 
    //                         from: elo_evolution[team_select_comp][seasons[i]][0][0], 
    //                         to: elo_evolution[team_select_comp][seasons[i]][0][elo_evolution[team_select_comp][seasons[i]][0].length-1]})
    //     }
        
    //     data = []
    //     for (j=0;j<elo_evolution[team_select_comp][seasons[i]][0].length;j++) {
    //         data.push({ x:elo_evolution[team_select_comp][seasons[i]][0][j],
    //                     y:elo_evolution[team_select_comp][seasons[i]][1][j],
    //                     date:elo_evolution[team_select_comp][seasons[i]][4][j],
    //                     type:elo_evolution[team_select_comp][seasons[i]][5][j]})
    //     }
    //     series.push({name:team_select_comp + "--" + seasons[i],data:data, marker: {symbol: "circle"} , color: colors[team_select_comp].replace("1)","0.1)"), enableMouseTracking: false})
    // }
    //   // Max ELO opmaak
    // // for(i=0;i < max_elo_data[team_select_comp].length;i++) {
    // //     series[seasons_team_select + max_elo_data[team_select_comp][i][0]].data[max_elo_data[team_select_comp][i][1]] = { marker: {
    // //                                                                                         symbol: 'url(/img/trophy.png)',
    // //                                                                                         enabled: true,
    // //                                                                                         fillColor: '#FF0000',
    // //                                                                                         lineWidth: 0.2,
    // //                                                                                         radius: 2,
    // //                                                                                         lineColor: "#FF0000" // inherit from series
    // //                                                                                 },y:series[seasons_team_select + max_elo_data[team_select_comp][i][0]].data[max_elo_data[team_select_comp][i][1]].y,
    // //                                                                                 x: series[seasons_team_select + max_elo_data[team_select_comp][i][0]].data[max_elo_data[team_select_comp][i][1]].x,
    // //                                                                                 date: series[seasons_team_select + max_elo_data[team_select_comp][i][0]].data[max_elo_data[team_select_comp][i][1]].date,
    // //                                                                                 type:series[seasons_team_select + max_elo_data[team_select_comp][i][0]].data[max_elo_data[team_select_comp][i][1]].type
                                                                                    
    // //     }
    // // } 
    // }
    
     // Max ELO opmaak
    for(i=0;i < max_elo_data[team_select].length;i++) {
        series[max_elo_data[team_select][i][0]].data[max_elo_data[team_select][i][1]] = { marker: {
                                                                                            symbol: 'url(/img/icons/arrow_green_up_12_transparant.png)',
                                                                                            enabled: true,
                                                                                            fillColor: '#FF0000',
                                                                                            lineWidth: 0.2,
                                                                                            radius: 2,
                                                                                            lineColor: "#FF0000" // inherit from series
                                                                                    },y:series[max_elo_data[team_select][i][0]].data[max_elo_data[team_select][i][1]].y,
                                                                                    x: series[max_elo_data[team_select][i][0]].data[max_elo_data[team_select][i][1]].x,
                                                                                    game: series[max_elo_data[team_select][i][0]].data[max_elo_data[team_select][i][1]].game,
                                                                                    score: series[max_elo_data[team_select][i][0]].data[max_elo_data[team_select][i][1]].score,
                                                                                    date:series[max_elo_data[team_select][i][0]].data[max_elo_data[team_select][i][1]].date,
                                                                                    type:series[max_elo_data[team_select][i][0]].data[max_elo_data[team_select][i][1]].type
            
        }
    }       
    
     // Min ELO opmaak
    for(i=0;i < min_elo_data[team_select].length;i++) {
        series[min_elo_data[team_select][i][0]].data[min_elo_data[team_select][i][1]] = { marker: {
                                                                                            symbol: 'url(/img/icons/arrow_red_down_12_transparant.png)',
                                                                                            enabled: true,
                                                                                            fillColor: '#FF0000',
                                                                                            lineWidth: 0.2,
                                                                                            radius: 2,
                                                                                            lineColor: "#FF0000" // inherit from series
                                                                                    },y:series[min_elo_data[team_select][i][0]].data[min_elo_data[team_select][i][1]].y,
                                                                                    x: series[min_elo_data[team_select][i][0]].data[min_elo_data[team_select][i][1]].x, 
                                                                                    game: series[min_elo_data[team_select][i][0]].data[min_elo_data[team_select][i][1]].game, 
                                                                                    score: series[min_elo_data[team_select][i][0]].data[min_elo_data[team_select][i][1]].score, 
                                                                                    date:series[min_elo_data[team_select][i][0]].data[min_elo_data[team_select][i][1]].date,
                                                                                    type:series[min_elo_data[team_select][i][0]].data[min_elo_data[team_select][i][1]].type
            
        }
    } 
    
    data_team_select = []
    for (i=0;i<series.length;i++) {
        data_team_select = data_team_select.concat(series[i].data)
    }    
    
    
    // series = [{name: team_select, data: data, color: colors[team_select]}]
    
    // if (team_select_comp != "") {
    //     data_comp = []
    //     for (i=0;i<series_comp.length;i++) {
    //         data_comp = data_comp.concat(series_comp[i].data)
    //     }
    //     series.push({name: team_select_comp, data:data_comp,color:colors[team_select_comp].replace("1)","0.1)"), enableMouseTracking: false})
    // }
    
    afterSetExtremesFunction = function(event){
                    // Make resetZoom button visible
                    // If resetzoomwrapper nog visible
                    console.log(this)
                    if (team_select_comp == "") {
                        if (this.max-this.min < this.dataMax - this.dataMin) {
                            this.chart.plotBGImage.attr({href: ""});
                            $("#resetZoomWrapper").show()
                        } else {
                            this.chart.plotBGImage.attr({href: image_location})
                            $("#resetZoomWrapper").hide()
                        }
                        // if (this.oldMax - this.oldMin > this.max - this.min) {
                        //     this.chart.plotBGImage.attr({href: ""});
                        // }  else {
                        //      this.chart.plotBGImage.attr({href: image_location})
                        // }
                    } else {
                        if (this.max-this.min < this.dataMax - this.dataMin) {
                            // for 
                            // var color_string = "";
                            // color_array = this.series[1].color.split(",")
                            // for (i=0;i<color_array.length-1;i++) {
                            //     if (i==0) {
                            //         color_string += color_array[i]
                            //     } else {
                            //         color_string += "," + color_array[i]
                            //     }
                                
                            // }
                            // // Bereken opacity comp op basis van graad van inzoomen
                            // color_opacity = -0.9*(this.max-this.min)/(this.dataMax - this.dataMin) + 1
                            // color_string += "," + color_opacity + ")"
                            // // this.series[1].color = color_string
                            // chart1.series[1].update({color: color_string})
                            // color_opacity = -0.9*(this.max-this.min)/(this.dataMax - this.dataMin) + 1
                            // count = 0
                            // count_max = chart1.series.length
                            // while(count < count_max) {
                            //     console.log(count)
                            //     if (chart1.series[count].name.split("--")[0] == team_select_comp) {
                            //         color_string = chart1.series[count].color.replace("1)",String(color_opacity) + ")")
                            //         chart1.series[count].update({color: color_string})
                            //     }      
                            //     count += 1
                            // }
                            $("#resetZoomWrapper").show()
                        } else {

                            
                            // var color_string = "";
                            // // color_array = this.series[1].color.split(",")
                            // for (i=0;i<color_array.length-1;i++) {
                            //     if (i==0) {
                            //         color_string += color_array[i]
                            //     } else {
                            //         color_string += "," + color_array[i]
                            //     }
                            
                            // }
                            // color_string += ",0.1)"
                            // // this.series[1].color = color_string
                            // chart1.series[1].update({color: color_string})
                            
                            $("#resetZoomWrapper").hide()
                        }
                    }
                    
                    // Change color of second series based on zoom level

                }
    
    xAxis_options = {
            plotLines: plotlines,
            plotBands: plotbands,
            events: {
                // Remove backgroundimage when zoomed in
                afterSetExtremes: afterSetExtremesFunction
            },
            lineWidth: 0,
            
            // Gridlines
            gridLineWidth: 0.5,
            gridLineColor: "rgba(0,0,0,0.4)", // "rgba(0,0,0,0.4)"
            
            // Minor Gridlines
            minorGridLineWidth: 0.5,
            minorGridLineColor: "rgba(0,0,0,0.1)", // "rgba(0,0,0,0.1)"
            minorTickInterval:  24*3600*365*1000, // One year
            
            // tickAmount: 4,
            tickWidth: 0,
            // tickPositions: [date_index["1900-01"][Math.round(date_index["1900-01"].length/2)],
                            // date_index["1925-26"][Math.round(date_index["1925-26"].length/2)],
                            // date_index["1950-51"][Math.round(date_index["1950-51"].length/2)],
                            // date_index["1975-76"][Math.round(date_index["1975-76"].length/2)],
                            // date_index["2000-01"][Math.round(date_index["2000-01"].length/2)]], // 01/01/1996 - 01/01/2001 - ...
            tickPositioner: function() {
                if ($("#article").width() > 800) {
                    number_of_ticks = 5
                    tickPositions = [date_index["1900-01"][Math.round(date_index["1900-01"].length/2)],
                            date_index["1925-26"][Math.round(date_index["1925-26"].length/2)],
                            date_index["1950-51"][Math.round(date_index["1950-51"].length/2)],
                            date_index["1975-76"][Math.round(date_index["1975-76"].length/2)],
                            date_index["2000-01"][Math.round(date_index["2000-01"].length/2)]]
                }
                else {
                    number_of_ticks = 3
                    tickPositions = [date_index["1900-01"][Math.round(date_index["1900-01"].length/2)],
                            date_index["1950-51"][Math.round(date_index["1950-51"].length/2)],
                            date_index["2000-01"][Math.round(date_index["2000-01"].length/2)]]
                }
                
                if (this.max-this.min != this.dataMax - this.dataMin) {
                    min_index = Math.round(this.min/this.closestPointRange)*this.closestPointRange
                    max_index = Math.round(this.max/this.closestPointRange)*this.closestPointRange
                    start_season = date_index_reversed[min_index]
                    end_season = date_index_reversed[max_index]
                    start_year = parseInt(start_season.slice(0,4))
                    end_year = parseInt(end_season.slice(0,4))
                    
                    years = []
                    for (i = start_year;i<=end_year;i++) {
                        years.push(i)
                    }
                    if (years.length > number_of_ticks) {
                        years = []
                        increment = Math.round((end_year-start_year)/number_of_ticks)
                        for (i = start_year;i<=end_year;i += increment) {
                            years.push(i)
                        }
                        
                        // Remove first or last tick, based on which is closest to the edge
                        
                        
                    }
                    
                    
                    tickPositions = []
                    for(i=0;i< years.length; i++) {
                        season_i = String(years[i]) + "-" + String(years[i]+1).slice(2,4)
                        tickPositions.push(date_index[season_i][Math.round(date_index[season_i].length/2)])
                    }
                    // console.log(start_season)
                    // // start_year = String(moment(this.series[0].points[0].date).year()) + "-" + String(moment(this.series[0].points[0].).year()+1).slice(2,4)
                    // // end_year = String(moment(this.series[0].points[this.series[0].points.length - 1].date).year()) + "-" + String(moment(this.series[0].points[this.series[0].points.length - 1].date).year() + 1).slice(2,4)

                    // tickPositions = [date_index[start_season][Math.round(date_index[start_season].length/2)],
                    //                 date_index[end_season][Math.round(date_index[end_season].length/2)]]
                        // tick = Math.floor(this.dataMin),
                        // increment = Math.ceil((this.dataMax - this.dataMin) / 6);
                        // for (tick; tick - increment <= this.dataMax; tick += increment) {
                        //     positions.push(tick);
                        // }
                }
                return tickPositions;
                
                    // start_year = moment(this.series[0].points[0].date).year()
                    // end_year = moment(this.series[0].points[this.series[0].points.length - 1].date).year()
                            
            },
            type: 'datetime',

            min: date_index[seasons[0]][0],
            max: date_index[seasons[seasons.length-1]][date_index[seasons[seasons.length-1]].length - 1],
            labels: {
                formatter: function() {
                    if (this.value == date_index["1900-01"][Math.round(date_index["1900-01"].length/2)]) {
                        date_string = "<a>" + "Seizoen" + "</a><br><a>" + "1900-01" + "</a>"
                    } else {
                        date_string = date_index_reversed[String(this.value)]
                    }
                    // else if (this.value == date_index["1925-26"][Math.round(date_index["1925-26"].length/2)]) {
                    //     date_string = "1925-26"
                    // }
                    // else if (this.value == date_index["1950-51"][Math.round(date_index["1950-51"].length/2)]) {
                    //     date_string = "1950-51"
                    // } 
                    // else if (this.value == date_index["1975-76"][Math.round(date_index["1975-76"].length/2)]) {
                    //     date_string = "1975-76"   
                    // }
                    // else if (this.value == date_index["2000-01"][Math.round(date_index["2000-01"].length/2)]) {
                    //     date_string = "2000-01"   
                    // }                    
                    return date_string;
                    },
                    style: {
                        color: "rgba(0,0,0,1)",
                        fontFamily: "Lora",
                        fontSize: 15
                 }
            

        }
        }
    xAxis_options_navigator = {
            plotLines: plotlines,
            
            events: {
                // Remove backgroundimage when zoomed in
                afterSetExtremes: afterSetExtremesFunction
            },
            lineWidth: 0,
            
            // Gridlines
            gridLineWidth: 0.5,
            gridLineColor: "rgba(0,0,0,0.4)", // "rgba(0,0,0,0.4)"
            
            // Minor Gridlines
            minorGridLineWidth: 0.5,
            minorGridLineColor: "rgba(0,0,0,0.1)", // "rgba(0,0,0,0.1)"
            minorTickInterval:  24*3600*365*1000, // One year
            
            // tickAmount: 4,
            tickWidth: 0,
            tickPositions: [date_index["1900-01"][Math.round(date_index["1900-01"].length/2)],
                            date_index["1925-26"][Math.round(date_index["1925-26"].length/2)],
                            date_index["1950-51"][Math.round(date_index["1950-51"].length/2)],
                            date_index["1975-76"][Math.round(date_index["1975-76"].length/2)],
                            date_index["2000-01"][Math.round(date_index["2000-01"].length/2)]], // 01/01/1996 - 01/01/2001 - ...
            type: 'datetime',

            min: date_index[seasons[0]][0],
            max: date_index[seasons[seasons.length-1]][date_index[seasons[seasons.length-1]].length - 1],
            labels: {
                align: "center",
                y: 15,
                style: {
                    color: "rgba(0,0,0,1)",
                    fontFamily: "Lora",
                    fontSize: 12
                }, 
                formatter: function() {
                    if (this.value == date_index["1900-01"][Math.round(date_index["1900-01"].length/2)]) {
                        date_string = "1900" 
                    }
                    else if (this.value == date_index["1925-26"][Math.round(date_index["1925-26"].length/2)]) {
                        date_string = "1925"
                    }
                    else if (this.value == date_index["1950-51"][Math.round(date_index["1950-51"].length/2)]) {
                        date_string = "1950"
                    } 
                    else if (this.value == date_index["1975-76"][Math.round(date_index["1975-76"].length/2)]) {
                        date_string = "1975"   
                    }
                    else if (this.value == date_index["2000-01"][Math.round(date_index["2000-01"].length/2)]) {
                        date_string = "2000"   
                    }                    
                    return date_string;
                    }

            

            }
        }
    yAxis_options = {
            // gridLineWidth: 0.2,
            minorGridLineWidth: 0.5,
            gridLineColor: "rgba(0,0,0,0.05)", // "rgba(0,0,0,0.1)"
            // gridLineWidth: 0,
            lineWidth: 0,
             plotLines: [{
                color: "rgba(0,0,0,0.1)", // "rgba(0,0,0,0.8)"
                width: 0.5,
                value: 1000
            },
            {
                color: "rgba(0,0,0,0.1)", // "rgba(0,0,0,0.8)"
                width: 0.5,
                value: 1250
            },
            {
                color: "rgba(0,0,0,0.8)", // "rgba(0,0,0,0.8)"
                width: 0.5,
                value: 1500
            },
            {
                color: "rgba(0,0,0,0.1)", // "rgba(0,0,0,0.8)"
                width: 0.5,
                value: 1750
            },
            {
                color: "rgba(0,0,0,0.1)", // "rgba(0,0,0,0.8)"
                width: 0.5,
                value: 2000
            }],
                title: {
                text: ''
            },
            min: 900,
            max: 2100,
            tickInterval: 50,
            labels: {
                y: 5,
                formatter: function() {
                        if (this.value == 1500) {
                            y_label = "<strong>GEM.</strong>"
                        }
                        else if (this.value == 1000 || this.value == 1250 ||this.value == 1750 || this.value == 2000){
                            y_label = this.value
                        }
                        
                        else {
                            y_label = ""
                        }
                    return y_label;
                },
                style: {
                    color: "rgba(0,0,0,1)", // "rgba(0,0,0,1)"
                    fontFamily: "Lora",
                    fontSize: 15
            }
            },
            // opposite false: axis on left side
            opposite: false
        }
    yAxis_options_navigator = {
        // gridLineWidth: 0.2,
        minorGridLineWidth: 0.5,
        gridLineColor: "rgba(0,0,0,0.05)", // "rgba(0,0,0,0.1)"
        // gridLineWidth: 0,
        lineWidth: 0,
         plotLines: [{
            color: "rgba(0,0,0,0.1)", // "rgba(0,0,0,0.8)"
            width: 0.5,
            value: 1000
        },
        {
            color: "rgba(0,0,0,0.1)", // "rgba(0,0,0,0.8)"
            width: 0.5,
            value: 1250
        },
        {
            color: "rgba(0,0,0,0.8)", // "rgba(0,0,0,0.8)"
            width: 0.5,
            value: 1500
        },
        {
            color: "rgba(0,0,0,0.1)", // "rgba(0,0,0,0.8)"
            width: 0.5,
            value: 1750
        },
        {
            color: "rgba(0,0,0,0.1)", // "rgba(0,0,0,0.8)"
            width: 0.5,
            value: 2000
        }],
            title: {
            text: ''
        },
        min: 900,
        max: 2100,
        tickInterval: 50,
        labels: {
            formatter: function() {
                    if (this.value == 1500) {
                        y_label = "<strong>GEM.</strong>"
                    }
                    else if (this.value == 1000 || this.value == 1250 ||this.value == 1750 || this.value == 2000){
                        y_label = this.value
                    }
                    
                    else {
                        y_label = ""
                    }
                return y_label;
            },
            style: {
                color: "rgba(0,0,0,1)", // "rgba(0,0,0,1)"
                fontFamily: "Lora",
                fontSize: 15
        }
        },
        // opposite false: axis on left side
        opposite: false
    }


    // Chartoptions
    chartOptions = {
         chart: {
             renderTo: "container",
             width: $("#container").width(),
             type: 'spline',
             zoomType: 'x',
             plotBackgroundImage: image_location, // 'http://i.imgur.com/9ePWdzK.png'
        },
        navigator: {
            // baseSeries: 0,
            maskFill: colors[team_select].replace("1)","0.1)"),
            series: {
                data: data_team_select,
            	type: 'spline',
            	lineColor: colors[team_select],
            	dataGrouping: {
            		smoothed: true
            	},
            	lineWidth: 1.5,
            	marker: {
            		enabled: false
            	}
            },
            xAxis: xAxis_options_navigator,
            yAxis: yAxis_options_navigator
        },
        scrollbar: {
            enabled: false,
        },
        rangeSelector: {
            selected: 5,
            inputEnabled: false,
            // buttons: [{
            // 	type: 'all',
            // 	text: 'Reset Zoom'
            // }],
            // buttonTheme: { // styles for the buttons
            //     fill: 'none',
            //     stroke: 'none',
            //     'stroke-width': 0,
            //     r: 40,
            //     // height: ,
            //     style: {
            //         color: '#039',
            //         fontWeight: 'bold'
            //     },
            //     states: {
            //         hover: {
            //         },
            //         select: {
            //             fill: 'white',
            //             style: {
            //                 color: 'white'
            //             }
            //         }
            //     }
            // },
            buttonTheme: {
                visibility: 'hidden'
            },
            labelStyle: {
                visibility: 'hidden'
            }
        },
         credits: {
            enabled: false
          },
        // chart: {
        //     type: 'spline'
        // },
        title: {
            text: '',
            style: {
                        color: "rgba(0,0,0,1)",
                        fontFamily: "Lora",
                        fontSize: 20
                    }
        },
        xAxis: xAxis_options,
        yAxis: yAxis_options,
        tooltip: {
            hideDelay: 0,
            animation: false,
            snap: 10,
            formatter: function () {
                var s = '<table id= "tooltip-table"><td colspan="2" style="text-align: center;"><strong>' + this.y + '</strong></td>';
                // gameday_index = this.series.data.indexOf(this.point)
                // team = this.series.name.split("--")[0]
                // season = this.series.name.split("--")[this.series.name.split("--").length - 1]
                
                // gameday_index = this.points[0].point.index
                // team = team_select
                // season = this.series.name.split("--")[this.series.name.split("--").length - 1]
                
                // Wedstrijd
                // s += '<tr><td id="tooltip-elo-one"><b>' + elo_evolution[team][season][2][gameday_index]   + '</b></td>' +  
                // '<td id="tooltip-elo-two" style="text-align: right;"><b>&nbsp;' + elo_evolution[team][season][3][gameday_index]   + '</b></td></tr>' + 
                s += '<tr><td id="tooltip-elo-one"><b>' + this.points[0].point.game   + '</b></td>' +  
                '<td id="tooltip-elo-two" style="text-align: right;"><b>&nbsp;' + this.points[0].point.score  + '</b></td></tr>' + 
                // Type
                '<tr>' +
                '<td colspan="2" id="tooltip-elo-three"><b>' + this.points[0].point.type  + '</b></td></tr>' + 
                // '<td colspan="2" id="tooltip-elo-three"><b>' + this.point.type  + '</b></td></tr>' + 
                
                // Datum
                '<tr>' +
                '<td colspan="2" id="tooltip-elo-three"><b>' + moment(this.points[0].point.date).format("DD-MM-YYYY")  + '</b></td></tr>'
                // '<td colspan="2" id="tooltip-elo-three"><b>' + moment(this.point.date).format("DD-MM-YYYY")  + '</b></td></tr>'
                    
                s += '</table>'
                // });
                

                return s;
            },
            
            useHTML: true,
        },

        plotOptions: {

            series: {
                // To make sure extra data is supplied to chart for tooltip (type, etc.)
                dataGrouping: {
                    enabled: true
                },
                states: {
                    hover: {
                        enabled: false
                    }
                }
            },
            spline: {
                marker: {
                    enabled: false,
                    states: {
                        hover: {
                            enabled: false
                        }
                    }
                },
                color: 'rgb(50,50,50)',
                showInLegend: false,
                stickyTracking: false,
                animation: false,
                lineWidth: 1,
                turboThreshold: 0
            }
        },

        series: series
    };
    
    // Draw chart
    chart1 = new Highcharts.StockChart(chartOptions);
    
    if (team_select_comp == "") {
        $("#loading-head-to-head").hide()
        $("#container").show()
        $("#kamp-team").show()
    } else {
        // hth 
        // $("#hth").height($("#select-team").height())
        // $("#hth").width($("#container").width() - $("#select-team").width() - $("#select-team-comp").width())
        $("#hth").show()
        $("#loading-head-to-head").hide()
        if ($("#select-team").find(".dd-selected-text").text() != team_select_comp) {
          $("#ow-table-wrapper").show()
        }
        
        $("#container").show()
        $("#kamp-team-comp").show()
    }

    })
};

function clickTeam(clicked_id) {
    item = parseInt(clicked_id.replace("team_",""))
    drawEloChart(teams[item]);
    $("#button_list").html(teams[item] + '  &nbsp;<span class="caret"></span>')
}
