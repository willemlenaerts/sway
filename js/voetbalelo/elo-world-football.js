function headToHead(country_select,country_select_comp) {
    test = []
    plotlines_xindex = []
    hth = [0,0,0] // W country_select - Draw -W country_select_comp
    for (s=0;s<years.length;s++) {
        // Remove null values
        // arr = arr.filter(function(n){ return n != undefined }); 
        
        if (elo_evolution[country_select][years[s]][0].filter(function(n){ return n != undefined }).length == 0 || elo_evolution[country_select_comp][years[s]][0].filter(function(n){ return n != undefined }).length == 0) {
            continue
        }
        
        
                    for (i=0;i<elo_evolution[country_select][years[s]][0].length;i++) {
                if (elo_evolution[country_select][years[s]][2][i] == undefined) {
                    continue
                }        
                
                if (elo_evolution[country_select][years[s]][2][i].indexOf(country_select_comp) > -1) {
                    // Game between the two countrys
                    plotlines_xindex.push([s,i])
                    test.push([elo_evolution[country_select][years[s]][0][i],elo_evolution[country_select][years[s]][4][i], elo_evolution[country_select][years[s]][2][i], elo_evolution[country_select][years[s]][3][i]])
                    
                    // Calculate head-to-head
                    if (elo_evolution[country_select][years[s]][2][i].indexOf(country_select) < elo_evolution[country_select][years[s]][2][i].indexOf(country_select_comp)) {
                        if (parseInt(elo_evolution[country_select][years[s]][3][i].split(" - ")[0]) > parseInt(elo_evolution[country_select][years[s]][3][i].split(" - ")[1])) {
                            hth[0] += 1
                        } else {
                            if (parseInt(elo_evolution[country_select][years[s]][3][i].split(" - ")[0]) == parseInt(elo_evolution[country_select][years[s]][3][i].split(" - ")[1])) {
                                hth[1] += 1
                            } else {
                                hth[2] += 1
                            }
                        }                    
                    } else {
                        if (parseInt(elo_evolution[country_select][years[s]][3][i].split(" - ")[0]) > parseInt(elo_evolution[country_select][years[s]][3][i].split(" - ")[1])) {
                            hth[2] += 1
                        } else {
                            if (parseInt(elo_evolution[country_select][years[s]][3][i].split(" - ")[0]) == parseInt(elo_evolution[country_select][years[s]][3][i].split(" - ")[1])) {
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
                    "<th class='col-xs-4' data-align='center' data-field='type' data-sortable='false'>Type</th>" + 
                    "<th class='col-xs-5' data-align='center' data-field='wedstrijd' data-sortable='false'>Wedstrijd</th>" + 
                    "<th class='col-xs-1' data-align='center' data-field='score' data-sortable='false'>Uitslag</th></tr></thead>" + "</table>"
    
    // Reset div
    $("#ow-table-wrapper").html(table_string)
    // Fill div
    // $("#ow-table-wrapper").append(table_string)    
    
    // // Add images
    // for (i=0;i<countrys.length;i++) {
    //     country = data_table[i]["country"]
    //     data_table[i]["country"] = "<img src='/img/country Logos Compleet/" + country + ".png'" + "</img>&nbsp;" + country
    // }
    // console.log(data_table)    
    // $('#elo-ranking tbody tr').each(function(){
    //     country = $(this).find("td").eq(1).text()
    //     $(this).find("td").eq(1).html("<img src='/img/country Logos Compleet/" + country + ".png'" + "</img>&nbsp;" + country)
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

// function headToHead(country_select,country_select_comp) {
//     test = []
//     plotlines_xindex = []
//     hth = [0,0,0] // W country_select - Draw -W country_select_comp
//     for (s=0;s<years.length;s++) {
//         if (elo_evolution[country_select][years[s]][0].length == 0 || elo_evolution[country_select_comp][years[s]][0].length == 0) {
//             continue
//         }
        
        
//                     for (i=0;i<elo_evolution[country_select][years[s]][0].length;i++) {
//                 if (elo_evolution[country_select][years[s]][2][i].indexOf(country_select_comp) > -1) {
//                     // Game between the two countrys
//                     plotlines_xindex.push([s,i])
//                     test.push([elo_evolution[country_select][years[s]][4][i],elo_evolution[country_select][years[s]][5][i], elo_evolution[country_select][years[s]][2][i], elo_evolution[country_select][years[s]][3][i]])
                    
//                     // Calculate head-to-head
//                     if (elo_evolution[country_select][years[s]][2][i].indexOf(country_select) < elo_evolution[country_select][years[s]][2][i].indexOf(country_select_comp)) {
//                         if (parseInt(elo_evolution[country_select][years[s]][3][i].split(" - ")[0]) > parseInt(elo_evolution[country_select][years[s]][3][i].split(" - ")[1])) {
//                             hth[0] += 1
//                         } else {
//                             if (parseInt(elo_evolution[country_select][years[s]][3][i].split(" - ")[0]) == parseInt(elo_evolution[country_select][years[s]][3][i].split(" - ")[1])) {
//                                 hth[1] += 1
//                             } else {
//                                 hth[2] += 1
//                             }
//                         }                    
//                     } else {
//                         if (parseInt(elo_evolution[country_select][years[s]][3][i].split(" - ")[0]) > parseInt(elo_evolution[country_select][years[s]][3][i].split(" - ")[1])) {
//                             hth[2] += 1
//                         } else {
//                             if (parseInt(elo_evolution[country_select][years[s]][3][i].split(" - ")[0]) == parseInt(elo_evolution[country_select][years[s]][3][i].split(" - ")[1])) {
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

function drawEloChart(country_select,country_select_comp) {
    // Don't compare with same country (=stupid)
    if (country_select == country_select_comp) {
       
        return
    }
   
   // Get data via AJAX call
    // url_select = "https://s3.eu-central-1.amazonaws.com/jpl-elo/countries/" + country_select + ".json"
    url_select = "http://www.sway-blog.be/data/elo-world-football/countries/" + country_select + ".json"
    ajax_call_select = $.ajax({
      url: url_select,
      dataType: 'json',
      crossDomain: true, // enable this
    })

        
    if (country_select_comp == "") {
        url_select_comp = ""
        ajax_call_select_comp = ""
    } else {
        // url_select_comp = "https://s3.eu-central-1.amazonaws.com/jpl-elo/teams/" + country_select_comp + ".json"
        url_select_comp = "http://www.sway-blog.be/data/elo-world-football/countries/" + country_select_comp + ".json"
        ajax_call_select_comp = $.ajax({
                  url: url_select_comp,
                  dataType: 'json',
                  crossDomain: true, // enable this
                })

    }
    
   $.when(ajax_call_select,ajax_call_select_comp ).done(function(data1, data2){
        elo_evolution = data1[0]
        // Info string
        // info_string = "<span style='font-size:16px'>" + String(elo_evolution[country_select]["kampioenschappen"]) + "x Kampioen" + "</span><br>"
        info_string = "<span style='font-size:16px'>" + "Min. Elo (" + "<img src='/img/icons/arrow_red_down_12_transparant.png'></img>" + "): " + String(elo_evolution[country_select]["laagste elo"]) + " || " + "</span>"
        info_string += "<span style='font-size:16px'>" + "Max. Elo (" + "<img src='/img/icons/arrow_green_up_12_transparant.png'></img>" + "): " + String(elo_evolution[country_select]["hoogste elo"]) + "</span><br>"
        $("#kamp-country").html(info_string)
        
         if (country_select_comp != "") {
             elo_evolution[country_select_comp] = data2[0][country_select_comp]
            // Aantal kampioenschappen
            // info_string = "<span style='font-size:16px'>" + String(elo_evolution[country_select_comp]["kampioenschappen"]) + "x Kampioen" + "</span><br>"
            info_string = "<span style='font-size:16px'>" + "Min. Elo: " + String(elo_evolution[country_select_comp]["laagste elo"]) + " || " + "</span>"
            info_string += "<span style='font-size:16px'>" + "Max. Elo: " + String(elo_evolution[country_select_comp]["hoogste elo"]) + "</span><br>"
            $("#kamp-country-comp").html(info_string)
    }
        
    // series = data that will be shown (dates & elo)
    //     series = []
    // years_country_select = 0
    // for (k=0;k<teams.length;k++) {
    // for (i=0;i<years.length;i++) {
    //     data = []
    //     for (j=0;j<elo_evolution[teams[k]][years[i]][0].length;j++) {
    //         data.push({ x:elo_evolution[teams[k]][years[i]][0][j],
    //                     y:elo_evolution[teams[k]][years[i]][1][j],
    //                     date:elo_evolution[teams[k]][years[i]][4][j],
    //                     type:elo_evolution[teams[k]][years[i]][5][j]})
            
    //     }
    //     if (data != []) {
    //         years_country_select = years_country_select + 1
    //     }
    //     series.push({name:teams[k]+ "--" + years[i],data:data, marker: {symbol: "circle"} , color: "rgba(0,0,0,0.05)"})
    // }
    // }

    series = []
    plotbands = []
    years_country_select = 0
    for (i=0;i<years.length;i++) {
        // Check of ploeg kampioen gespeeld is in dit seizoen
        if (elo_evolution[country_select][years[i]][6] == 1) {
            // plotband_color = colors[country_select].replace("1)","0.1)")
            number_of_nones = elo_evolution[country_select][years[i]][1].filter(function(n){ return n == undefined }).length
            plotbands.push({color: colors[country_select].replace("1)","0.1)"), 
                            from: elo_evolution[country_select][years[i]][0][0], 
                            to: elo_evolution[country_select][years[i]][0][elo_evolution[country_select][years[i]][0].length-(1+number_of_nones)]})
        }
        // // Plotbands vs
        // if (country_select_comp != "") {
        //         if (elo_evolution[country_select_comp][years[i]][6] == 1) {
        //         plotbands.push({color: colors[country_select_comp].replace("1)","0.1)"), 
        //                         from: elo_evolution[country_select_comp][years[i]][0][0], 
        //                         to: elo_evolution[country_select_comp][years[i]][0][elo_evolution[country_select_comp][years[i]][0].length-1]})
        //         }
        //     }
        data = []
        for (j=0;j<elo_evolution[country_select][years[i]][0].length;j++) {
            data.push({ x:elo_evolution[country_select][years[i]][0][j],
                        y:elo_evolution[country_select][years[i]][1][j],
                        game:elo_evolution[country_select][years[i]][2][j] ,
                        score:elo_evolution[country_select][years[i]][3][j],
                        // date:elo_evolution[country_select][years[i]][4][j],
                        type: elo_evolution[country_select][years[i]][4][j] // "Seizoen " + years[i] + " | " + 

            })
            
        }
        
        // Add markers
        
        
        
        if (data != []) {
            years_country_select = years_country_select + 1
        }
        series.push({name:country_select+ "--" + years[i],data:data, marker: {symbol: "circle"} , color: colors[country_select]})
    }
    
                                                       
    
    // image_location = "/img/elo/background.png"
    image_location = ""
    plotlines = []
    // Fill table
    if (country_select_comp != "") {
        image_location = ""
        headToHead(country_select,country_select_comp)

        
        
        // // Fill plotlines
        // console.log(plotlines_xindex)
        // for (i=0;i<plotlines_xindex.length;i++) {
        //     plotlines.push({color: colors[country_select_comp],
        //                     width: 1,
        //                     value: plotlines_xindex[i]})
        // }
        series_comp = []
        for (i=0;i<years.length;i++) {
                    // Check of ploeg kampioen gespeeld is in dit seizoen
        if (elo_evolution[country_select_comp][years[i]][6] == 1) {
            // plotband_color = colors[country_select].replace("1)","0.1)")
            plotbands.push({color: colors[country_select_comp].replace("1)","0.1)"), 
                            from: elo_evolution[country_select_comp][years[i]][0][0], 
                            to: elo_evolution[country_select_comp][years[i]][0][elo_evolution[country_select_comp][years[i]][0].length-2]})
        }
        
        data = []
        
        for (j=0;j<elo_evolution[country_select_comp][years[i]][0].length;j++) {
            data.push({ x:elo_evolution[country_select_comp][years[i]][0][j],
                        y:elo_evolution[country_select_comp][years[i]][1][j],
                        game:elo_evolution[country_select_comp][years[i]][2][j] ,
                        score:elo_evolution[country_select_comp][years[i]][3][j],
                        // date:elo_evolution[country_select_comp][years[i]][4][j],
                        type: elo_evolution[country_select_comp][years[i]][4][j] // "Seizoen " + years[i] + " | " + 

            })
        }
        series_comp.push({name:country_select_comp + "--" + years[i],data:data, marker: {symbol: "circle"} , color: colors[country_select_comp].replace("1)","0.6)"), enableMouseTracking: false})
    }
    // console.log(series_comp)
        // Add marker for games played (on series)
         for (i=0;i<plotlines_xindex.length;i++) {
            series[plotlines_xindex[i][0]].data[plotlines_xindex[i][1]]  = { marker: {
                                                                                            symbol: 'circle',
                                                                                            enabled: true,
                                                                                            fillColor: colors[country_select_comp].replace("1)","0.8)"),
                                                                                            lineWidth: 0.2,
                                                                                            radius: 2.5,
                                                                                            lineColor: "#FF0000" // inherit from series
                                                                                    },y:series[plotlines_xindex[i][0]].data[plotlines_xindex[i][1]].y,
                                                                                    x: series[plotlines_xindex[i][0]].data[plotlines_xindex[i][1]].x,
                                                                                    game:series[plotlines_xindex[i][0]].data[plotlines_xindex[i][1]].game,
                                                                                    score:series[plotlines_xindex[i][0]].data[plotlines_xindex[i][1]].score,
                                                                                    // date:series[plotlines_xindex[i][0]].data[plotlines_xindex[i][1]].date,
                                                                                    type:series[plotlines_xindex[i][0]].data[plotlines_xindex[i][1]].type
            
        }
         }
        
    } else {
        // Hide table
        $("#head-to-head-header").hide()  
        $("#head-to-head-body").hide()  
    }

    // if (country_select_comp != "") {
    //     image_location = ""
        

        
    //     for (i=0;i<years.length;i++) {
    //                 // Check of ploeg kampioen gespeeld is in dit seizoen
    //     if (elo_evolution[country_select_comp][years[i]][6] == 1) {
    //         // plotband_color = colors[country_select].replace("1)","0.1)")
    //         plotbands.push({color: colors[country_select_comp].replace("1)","0.1)"), 
    //                         from: elo_evolution[country_select_comp][years[i]][0][0], 
    //                         to: elo_evolution[country_select_comp][years[i]][0][elo_evolution[country_select_comp][years[i]][0].length-1]})
    //     }
        
    //     data = []
    //     for (j=0;j<elo_evolution[country_select_comp][years[i]][0].length;j++) {
    //         data.push({ x:elo_evolution[country_select_comp][years[i]][0][j],
    //                     y:elo_evolution[country_select_comp][years[i]][1][j],
    //                     date:elo_evolution[country_select_comp][years[i]][4][j],
    //                     type:elo_evolution[country_select_comp][years[i]][5][j]})
    //     }
    //     series.push({name:country_select_comp + "--" + years[i],data:data, marker: {symbol: "circle"} , color: colors[country_select_comp].replace("1)","0.1)"), enableMouseTracking: false})
    // }
    //   // Max ELO opmaak
    // // for(i=0;i < max_elo_data[country_select_comp].length;i++) {
    // //     series[years_country_select + max_elo_data[country_select_comp][i][0]].data[max_elo_data[country_select_comp][i][1]] = { marker: {
    // //                                                                                         symbol: 'url(/img/trophy.png)',
    // //                                                                                         enabled: true,
    // //                                                                                         fillColor: '#FF0000',
    // //                                                                                         lineWidth: 0.2,
    // //                                                                                         radius: 2,
    // //                                                                                         lineColor: "#FF0000" // inherit from series
    // //                                                                                 },y:series[years_country_select + max_elo_data[country_select_comp][i][0]].data[max_elo_data[country_select_comp][i][1]].y,
    // //                                                                                 x: series[years_country_select + max_elo_data[country_select_comp][i][0]].data[max_elo_data[country_select_comp][i][1]].x,
    // //                                                                                 date: series[years_country_select + max_elo_data[country_select_comp][i][0]].data[max_elo_data[country_select_comp][i][1]].date,
    // //                                                                                 type:series[years_country_select + max_elo_data[country_select_comp][i][0]].data[max_elo_data[country_select_comp][i][1]].type
                                                                                    
    // //     }
    // // } 
    // }
    
    data_navigator = []
    for (i=0;i<series.length;i++) {
        data_navigator = data_navigator.concat(series[i].data)
    } 
     // Max ELO opmaak
    for(i=0;i < max_elo_data[country_select].length;i++) {
        series[max_elo_data[country_select][i][0]].data[max_elo_data[country_select][i][1]] = { marker: {
                                                                                            symbol: 'url(/img/icons/arrow_green_up_12_transparant.png)',
                                                                                            enabled: true,
                                                                                            fillColor: '#FF0000',
                                                                                            lineWidth: 0.2,
                                                                                            radius: 2,
                                                                                            lineColor: "#FF0000" // inherit from series
                                                                                    },y:series[max_elo_data[country_select][i][0]].data[max_elo_data[country_select][i][1]].y,
                                                                                    x: series[max_elo_data[country_select][i][0]].data[max_elo_data[country_select][i][1]].x,
                                                                                    game: series[max_elo_data[country_select][i][0]].data[max_elo_data[country_select][i][1]].game,
                                                                                    score: series[max_elo_data[country_select][i][0]].data[max_elo_data[country_select][i][1]].score,
                                                                                    // date:series[max_elo_data[country_select][i][0]].data[max_elo_data[country_select][i][1]].date,
                                                                                    type:series[max_elo_data[country_select][i][0]].data[max_elo_data[country_select][i][1]].type
            
        }
    }       
    
     // Min ELO opmaak
    for(i=0;i < min_elo_data[country_select].length;i++) {
        series[min_elo_data[country_select][i][0]].data[min_elo_data[country_select][i][1]] = { marker: {
                                                                                            symbol: 'url(/img/icons/arrow_red_down_12_transparant.png)',
                                                                                            enabled: true,
                                                                                            fillColor: '#FF0000',
                                                                                            lineWidth: 0.2,
                                                                                            radius: 2,
                                                                                            lineColor: "#FF0000" // inherit from series
                                                                                    },y:series[min_elo_data[country_select][i][0]].data[min_elo_data[country_select][i][1]].y,
                                                                                    x: series[min_elo_data[country_select][i][0]].data[min_elo_data[country_select][i][1]].x, 
                                                                                    game: series[min_elo_data[country_select][i][0]].data[min_elo_data[country_select][i][1]].game, 
                                                                                    score: series[min_elo_data[country_select][i][0]].data[min_elo_data[country_select][i][1]].score, 
                                                                                    // date:series[min_elo_data[country_select][i][0]].data[min_elo_data[country_select][i][1]].date,
                                                                                    type:series[min_elo_data[country_select][i][0]].data[min_elo_data[country_select][i][1]].type
            
        }
    } 
    
       data_country_select = []
    for (i=0;i<series.length;i++) {
        data_country_select = data_country_select.concat(series[i].data)
    } 
    
    
    series = [{name: country_select, data: data_country_select, color: colors[country_select]}]
    
    if (country_select_comp != "") {
        data_comp = []
        for (i=0;i<series_comp.length;i++) {
            data_comp = data_comp.concat(series_comp[i].data)
        }
        series.push({name: country_select_comp, data:data_comp,color:colors[country_select_comp].replace("1)","0.3)"), enableMouseTracking: false})
    }
    
    afterSetExtremesFunction = function(event){
                    // Make resetZoom button visible
                    // If resetzoomwrapper nog visible
                    if (country_select_comp == "") {
                        if (this.max-this.min < this.dataMax - this.dataMin) {
                            // this.chart.plotBGImage.attr({href: ""});
                            $("#resetZoomWrapper").show()
                        } else {
                            // this.chart.plotBGImage.attr({href: image_location})
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
                            //     if (chart1.series[count].name.split("--")[0] == country_select_comp) {
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
            // tickPositions: [-2208988800000, // 1900
            //                 -1420070400000, // 1925
            //                 -631152000000, // 1950
            //                 157766400000, // 1975
            //                 946684800000], // 2000 // 01/01/1996 - 01/01/2001 - ...
            tickPositioner: function() {
                if ($("#article").width() > 800) {
                    number_of_ticks = 5
                    tickPositions: [-2208988800000, // 1900
                                -1420070400000, // 1925
                                -631152000000, // 1950
                                157766400000, // 1975
                                946684800000] // 2000
                }
                else {
                    number_of_ticks = 3
                    tickPositions: [-2208988800000, // 1900
                                -631152000000, // 1950
                                946684800000] // 2000
                }
                
                if (this.max-this.min != this.dataMax - this.dataMin) {
                    console.log(this)
                    min_year = moment(this.min).year()
                    max_year = moment(this.max).year()
                    
                    if (max_year - min_year > 50) {
                        modulus = 25
                    } else {
                        if (max_year - min_year > 20) {
                            modulus = 10
                        } else {
                            if (max_year - min_year > 10) {
                                modulus = 5
                            } else {
                                if (max_year - min_year > 5) {
                                   modulus = 2 
                                } else {
                                    modulus = 1
                                }
                            }
                        }
                    }
                    // increment = Math.round((max_year - min_year)/number_of_ticks)
                    // if (increment <= 1) {
                        tickPositions = []
                        for (i=min_year;i<=max_year;i++) {
                            if (i%modulus == 0) {
                                tickPositions.push(moment([i]))
                            }
                            
                        }
                       
                    // } else {
                        // tickPositions = []
                        // for (i=min_year;i<=max_year;i+=increment) {
                        //     tickPositions.push(moment([i]))
                        // }
                    // }
                }
                // console.log(moment(this.min).year())
                return tickPositions;
            },
            type: 'datetime',
            ordinal: false,

            // min: dates[years[0]][0],
            // max: dates[years[years.length-1]][dates[years[years.length-1]].length - 1],
            min: dates[0],
            max: dates[dates.length-1],
            labels: {
                formatter: function() {
                    date_string = String(moment(this.value).year())             
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
            series: {
                connectNulls: false,
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
            // Gridlines
            gridLineWidth: 0.5,
            gridLineColor: "rgba(0,0,0,0.4)", // "rgba(0,0,0,0.4)"
            
            // Minor Gridlines
            minorGridLineWidth: 0.5,
            minorGridLineColor: "rgba(0,0,0,0.1)", // "rgba(0,0,0,0.1)"
            minorTickInterval:  24*3600*365*1000, // One year
            
            // tickAmount: 4,
            tickWidth: 0,
            tickPositions: [-2208988800000, // 1900
                            -1420070400000, // 1925
                            -631152000000, // 1950
                            157766400000, // 1975
                            946684800000], // 2000
            type: 'datetime',

            min: dates[0],
            max: dates[dates.length - 1],
            labels: {
                align: "center",
                y: 15,
                style: {
                    color: "rgba(0,0,0,1)",
                    fontFamily: "Lora",
                    fontSize: 12
                }, 
                formatter: function() {
                    if (this.value == -2208988800000) {
                        date_string = "1900" 
                    }
                    else if (this.value == -1420070400000) {
                        date_string = "1925"
                    }
                    else if (this.value == -631152000000) {
                        date_string = "1950"
                    } 
                    else if (this.value == 157766400000) {
                        date_string = "1975"   
                    }
                    else if (this.value == 946684800000) {
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
            tickPositioner: function() {
                tickPositions = []
                low = Math.floor(this.dataMin/100)*100
                high = Math.ceil(this.dataMax/100)*100
                if (high <=1500) {
                    high = 1600
                }
                
                for (i=low;i<=high;i+=100) {
                    if (i==low) {
                        tickPositions.push(i-50)
                        tickPositions.push(i)
                    }
                    else if (i==high) {
                        tickPositions.push(i)
                        tickPositions.push(i+50)                        
                    } else {
                        tickPositions.push(i)
                    }
                        
                    
                    
                }
                
                // console.log(moment(this.min).year())
                return tickPositions;
            },
            labels: {
                y: 5,
                formatter: function() {
                        if (this.value == 1500) {
                            y_label = "<strong>GEM.</strong>"
                        }
                        else if (this.value%100 == 0) {
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
            maskFill: colors[country_select].replace("1)","0.1)"),
            series: {
                data: data_navigator,
            	type: 'spline',
            	lineColor: colors[country_select],
            	connectNulls: false,
            	dataGrouping: {
            		smoothed: false
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
                // country = this.series.name.split("--")[0]
                // year = this.series.name.split("--")[this.series.name.split("--").length - 1]
                
                // gameday_index = this.points[0].point.index
                // country = country_select
                // year = this.series.name.split("--")[this.series.name.split("--").length - 1]
                
                // Wedstrijd
                // s += '<tr><td id="tooltip-elo-one"><b>' + elo_evolution[country][year][2][gameday_index]   + '</b></td>' +  
                // '<td id="tooltip-elo-two" style="text-align: right;"><b>&nbsp;' + elo_evolution[country][year][3][gameday_index]   + '</b></td></tr>' + 
                s += '<tr><td id="tooltip-elo-one"><b>' + this.points[0].point.game   + '</b></td>' +  
                '<td id="tooltip-elo-two" style="text-align: right;"><b>&nbsp;' + this.points[0].point.score  + '</b></td></tr>' + 
                // Type
                '<tr>' +
                '<td colspan="2" id="tooltip-elo-three"><b>' + this.points[0].point.type  + '</b></td></tr>' + 
                // '<td colspan="2" id="tooltip-elo-three"><b>' + this.point.type  + '</b></td></tr>' + 
                
                // Datum
                '<tr>' +
                '<td colspan="2" id="tooltip-elo-three"><b>' + moment(this.x).format("DD-MM-YYYY")  + '</b></td></tr>'
                // '<td colspan="2" id="tooltip-elo-three"><b>' + moment(this.points[0].point.date).format("DD-MM-YYYY")  + '</b></td></tr>'
                // '<td colspan="2" id="tooltip-elo-three"><b>' + moment(this.point.date).format("DD-MM-YYYY")  + '</b></td></tr>'
                    
                s += '</table>'
                // });
                

                return s;
            },
            
            useHTML: true,
        },

        plotOptions: {

            series: {
                connectNulls: true,
                // To make sure extra data is supplied to chart for tooltip (type, etc.)
                dataGrouping: {
                    enabled: false
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
    
    if (country_select_comp == "") {
        $("#loading-head-to-head").hide()
        $("#container").show()
        $("#kamp-country").show()
    } else {
        // hth 
        // $("#hth").height($("#select-country").height())
        // $("#hth").width($("#container").width() - $("#select-country").width() - $("#select-country-comp").width())
        $("#hth").show()
        $("#loading-head-to-head").hide()
        if ($("#select-country").find(".dd-selected-text").text() != country_select_comp) {
          $("#ow-table-wrapper").show()
        }
        
        $("#container").show()
        $("#kamp-country-comp").show()
    }

    })
};