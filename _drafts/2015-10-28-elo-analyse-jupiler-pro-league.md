---
layout: post-lg-header-title-box
title: "Jupiler Pro League 2015/2016"
subtitle: "Voorspellingen op basis van een Elo model."
category: project
permalink: jpl-elo-model
tags: [voetbal, analyse, elo]
alias: [/jpl-elo-model/]
author: "Willem Lenaerts"
utilities: highlight
header-img: "img/post-bg-voetbalelo-jpl.jpg"
---
<!--<script type="text/javascript" src="/js/jQuery/jquery-1.11.1.min.js"></script>-->
<link rel="stylesheet" type="text/css" href="/css/custom-jpl-ranking.css" />

<!--<script type="text/javascript" src="/js/bootstrap.table.js"></script>-->
<link rel="stylesheet" type="text/css" href="/css/bootstrap.table.css" />

<script src="/js/tablesorter/jquery.tablesorter.min.js"></script>
<script src="/js/ddSlick/ddSlick.js"></script>

<script type="text/javascript" src="https://www.google.com/jsapi"></script>

<!--<script type="text/javascript" src="/js/voetbalelo/elo-jupiler-pro-league.js"></script>-->
<script>
  // {#On document ready, load stuff#}
  elo = {{ site.data.elo-jupiler-pro-league.elo | jsonify }}
  elo_evolution ={{ site.data.elo-jupiler-pro-league.elo_evolution | jsonify}}
  games ={{ site.data.elo-jupiler-pro-league.games | jsonify}}
  standing = {{site.data.elo-jupiler-pro-league.standing | jsonify}}
  standing_forecast_po = {{site.data.elo-jupiler-pro-league.standing_forecast_po | jsonify}}
  standing_forecast_regular = {{site.data.elo-jupiler-pro-league.standing_forecast_regular | jsonify}}
  teams = {{site.data.elo-jupiler-pro-league.teams | jsonify}}
  colors = {{site.data.elo-jupiler-pro-league.colors | jsonify}}
</script>

<script>
  
  $( document ).ready(function() {
    // Ranking
    table_head = '<thead>' +
                    '<tr>' + 
                    "<th data-sorter='false' style='text-align: center;border-bottom: 0px;'></th>" +
                    
                    "<th class='ranking-elo' colspan='2' style='font-size:15px;text-align: center;border-bottom:0px;'>" + 
                    "<span style='width: 98%;float: left;margin-left: 1%;border-bottom:  2px #ddd solid;'>ELO Ranking</span></th>" +
                    
                    "<th class='ranking-voorspelling' colspan='5' style='font-size:15px;text-align: center;border-bottom:0px;'>" +
                    "<span style='width: 98%;float: left;margin-left: 1%;border-bottom:  2px #ddd solid;'>Voorspelling</span></th>" +
                    
                    "<th class='ranking-klassiek' colspan='9' style='font-size:15px;text-align: center;border-bottom:0px;'>" +
                    "<span style='width: 98%;float: left;margin-left: 1%;border-bottom:  2px #ddd solid;'>Klassieke Ranking</span></th>" +
                    "</tr>" +
                    
                    '<tr>' +
                    "<th style='text-align: left;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>Team</th>" +
                    
                    // "<th style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>R</th>" +
                    "<th class='ranking-elo' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>ELO<br>Score</th>" +
                    "<th class='ranking-elo' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>1 Week<br>Verschil</th>" +
                    "<th class='ranking-voorspelling' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>Degr</th>" +
                    "<th class='ranking-voorspelling' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>PO III</th>" +
                    "<th class='ranking-voorspelling' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>PO II</th>" +
                    "<th class='ranking-voorspelling' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>PO I</th>" +
                    "<th class='ranking-voorspelling' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>Kamp</th>" +
                    
                    "<th class='ranking-klassiek' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>R</th>" +
                    "<th class='ranking-klassiek' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>PTN</th>" + 
                    "<th class='ranking-klassiek' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>M</th>" + 
                    "<th class='ranking-klassiek' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>M+</th>" + 
                    "<th class='ranking-klassiek' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>M-</th>" + // <img id='trophy-img' src='/img/trophy_16.png' </img>
                    "<th class='ranking-klassiek' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>M=</th>" + 
                    "<th class='ranking-klassiek' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>D+</th>" + 
                    "<th class='ranking-klassiek' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>D-</th>" + 
                    "<th class='ranking-klassiek' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>D+/-</th>" + 

                    
                    "</tr></thead>"
    table_head_small = '<thead>' +
                    '<tr>' + 
                    "<th data-sorter='false' style='text-align: center;border-bottom: 0px;'></th>" +
                    
                    "<th class='ranking-elo' colspan='2' style='font-size:15px;text-align: center;border-bottom:0px;'>" + 
                    "<span style='width: 98%;float: left;margin-left: 1%;border-bottom:  2px #ddd solid;'>ELO Ranking</span></th>" +
                    
                    "<th class='ranking-voorspelling' colspan='5' style='font-size:15px;text-align: center;border-bottom:0px;'>" + 
                    "<span style='width: 98%;float: left;margin-left: 1%;border-bottom:  2px #ddd solid;'>Voorspelling</span></th>" +
                    "</tr>" +
                    '<tr>' +
                    "<th style='text-align: left;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>Team</th>" +
                    
                    // "<th style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>R</th>" +
                    "<th class='ranking-elo' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>ELO<br>Score</th>" +
                    "<th class='ranking-elo' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>1 Week<br>Verschil</th>" +
                    "<th class='ranking-voorspelling' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>Degr</th>" +
                    "<th class='ranking-voorspelling' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>PO III</th>" +
                    "<th class='ranking-voorspelling' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>PO II</th>" +
                    "<th class='ranking-voorspelling' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>PO I</th>" +
                    "<th class='ranking-voorspelling' style='text-align: center;border-top:0px;border-bottom: 2px rgb(0,0,0) solid;cursor: pointer;'>Kamp</th>" +
                    '</thead>'
    // Fill table
    // Eerst kampioen en degradatieberekening
    kampioen_perc = []
    kampioen_perc_sum = 0
    degradatie_perc = []
    degradatie_perc_sum = 0
    
    for (i=0;i<teams.length;i++) {
        kampioen_perc.push(standing_forecast_po[i][0])
        kampioen_perc_sum += standing_forecast_po[i][0]
        
        degradatie_perc.push(standing_forecast_po[i][standing_forecast_po[i].length -1])
        degradatie_perc_sum += standing_forecast_po[i][standing_forecast_po[i].length -1]
    }
    
    max_index = kampioen_perc.indexOf(Math.max.apply(Math, kampioen_perc));
    if (kampioen_perc_sum < 100) {
        kampioen_perc[max_index] += kampioen_perc_sum - 100
    } else {
        kampioen_perc[max_index] += 100 - kampioen_perc_sum
    }

    max_index = degradatie_perc.indexOf(Math.max.apply(Math, degradatie_perc));    
    if (degradatie_perc_sum < 100) {
        degradatie_perc[max_index] += degradatie_perc_sum - 100
    } else {
        degradatie_perc[max_index] += 100 - degradatie_perc_sum
    }
    
    // Nu Strength of Remaining Schedule berekening
    sos = []
    for (i = 0; i < teams.length; i++) sos[i] = 0;
    hfa = 84 // Home Field Advantage
    for (i=0;i<games.length;i++) {
        if (parseInt(games[i][4]) == 0) { // Wedstrijd nog niet gespeeld, telt mee voor SoS
            sos[parseInt(games[i][0])] += elo[parseInt(games[i][1])] - hfa
            sos[parseInt(games[i][1])] += elo[parseInt(games[i][0])] + hfa
        }
    }
    for (i=0;i<sos.length;i++) {
        sos[i] = Math.round(sos[i]/(30-standing[i][0]))
    }
    
    color_code_odds = [26,155,217]
        
    table_rows = '<tbody style="text-align: center;">'
    table_rows_small = '<tbody style="text-align: center;">'
    for (i=0;i<teams.length;i++) {
            table_rows += "<tr>"
            
            // Team Name
            table_rows += '<td style="text-align: left;border-right: 2px rgb(0,0,0) solid;">' + "<img src='/img/Team Logos JPL/" + teams[i] + ".png'" + "</img>&nbsp;" + teams[i] + "</td>"
            table_rows_small += '<td style="text-align: left;border-right: 2px rgb(0,0,0) solid;">' + "<img src='/img/Team Logos JPL/" + teams[i] + ".png'" + "</img>&nbsp;" + teams[i] + "</td>"
            
            // Elo
            table_rows += "<td class='ranking-elo'>" + String(elo[i]) +   "</td>"
            table_rows_small += "<td class='ranking-elo'>" + String(elo[i]) +   "</td>"
            
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
            table_rows += '<td class="ranking-elo" style="border-right: 2px rgb(0,0,0) solid;">' + "<span style='width:60%;float:left;margin-left:20%;border-radius: 10px;background:" + dElo_color + "'>&nbsp;" + dElo_sign + String(dElo) + "&nbsp;</span>" +  "</td>"
            table_rows_small += '<td class="ranking-elo" style="border-right: 2px rgb(0,0,0) solid;">' + "<span style='width:60%;float:left;margin-left:20%;border-radius: 10px;background:" + dElo_color + "'>&nbsp;" + dElo_sign + String(dElo) + "&nbsp;</span>" +  "</td>"
            
            // Degradatie
            color_gradient = rgbGradient(degradatie_perc[i],color_code_odds)
            color_gradient = rgbGradient(degradatie_perc[i],color_code_odds)
            int_part = String(Math.round(degradatie_perc[i]*10)/10).split(".")[0]
            dec_part = String(Math.round(degradatie_perc[i]*10)/10).split(".")[1] 
            if (dec_part == undefined) {
                table_rows += '<td class="ranking-voorspelling" style="border-right:2px #ddd solid;background:' +color_gradient + ';">' + int_part + "%" + "</td>"
                table_rows_small += '<td class="ranking-voorspelling" style="border-right:2px #ddd solid;background:' +color_gradient + ';">' + int_part + "%" + "</td>"
            } else {
                table_rows += '<td class="ranking-voorspelling" style="border-right:2px #ddd solid;background:' +color_gradient + ';">' + int_part + "<sup>" + dec_part + "</sup>" + "%" + "</td>"
                table_rows_small += '<td class="ranking-voorspelling" style="border-right:2px #ddd solid;background:' +color_gradient + ';">' + int_part  + "<sup>" + dec_part + "</sup>" + "%" + "</td>"                
            }
            
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
                table_rows += '<td class="ranking-voorspelling" style="background:' +color_gradient + ';">' + int_part + "%" + "</td>"
                table_rows_small += '<td class="ranking-voorspelling" style="background:' +color_gradient + ';">' + int_part + "%" + "</td>"
            } else {
                table_rows += '<td class="ranking-voorspelling" style="background:' +color_gradient + ';">' + int_part + "<sup>" + dec_part + "</sup>" + "%" + "</td>"
                table_rows_small += '<td class="ranking-voorspelling" style="background:' +color_gradient + ';">' + int_part + ","  + "<sup>" + dec_part + "</sup>" + "%" + "</td>"                
            }
            
            color_gradient = rgbGradient(po_ii_chance,color_code_odds)
            int_part = String(Math.round(po_ii_chance*10)/10).split(".")[0]
            dec_part = String(Math.round(po_ii_chance*10)/10).split(".")[1]
            if (dec_part == undefined) {
                table_rows += '<td class="ranking-voorspelling" style="background:' +color_gradient + ';">' + int_part + "%" + "</td>"
                table_rows_small += '<td class="ranking-voorspelling" style="background:' +color_gradient + ';">' + int_part + "%" + "</td>"
            } else {
                table_rows += '<td class="ranking-voorspelling" style="background:' +color_gradient + ';">' + int_part +  "<sup>" + dec_part + "</sup>" + "%" + "</td>"
                table_rows_small += '<td class="ranking-voorspelling" style="background:' +color_gradient + ';">' + int_part +  "<sup>" + dec_part + "</sup>" + "%" + "</td>"                
            }
            
            color_gradient = rgbGradient(po_i_chance,color_code_odds)
            int_part = String(Math.round(po_i_chance*10)/10).split(".")[0]
            dec_part = String(Math.round(po_i_chance*10)/10).split(".")[1]
            if (dec_part == undefined) {
                table_rows += '<td class="ranking-voorspelling" style="border-right:2px #ddd solid;background:' +color_gradient + ';">' + int_part +  "%" + "</td>"
                table_rows_small += '<td class="ranking-voorspelling" style="border-right:2px #ddd solid;background:' +color_gradient + ';">' + int_part  +  "%" + "</td>"
            } else {
                table_rows += '<td class="ranking-voorspelling" style="border-right:2px #ddd solid;background:' +color_gradient + ';">' + int_part + "<sup>" + dec_part + "</sup>" +  "%" + "</td>"
                table_rows_small += '<td class="ranking-voorspelling" style="border-right:2px #ddd solid;background:' +color_gradient + ';">' + int_part +  "<sup>" + dec_part + "</sup>" +  "%" + "</td>"               
            }
            
            // Kampioen
            color_gradient = rgbGradient(kampioen_perc[i],color_code_odds)
            int_part = String(Math.round(kampioen_perc[i]*10)/10).split(".")[0]
            dec_part = String(Math.round(kampioen_perc[i]*10)/10).split(".")[1]    
            if (dec_part == undefined) {            
                table_rows += '<td class="ranking-voorspelling" style="border-right: 2px rgb(0,0,0) solid;background:' +color_gradient + ';">' + int_part + "%" + "</td>"
                table_rows_small += '<td class="ranking-voorspelling" style="background:' +color_gradient + ';">' + int_part + "%" + "</td>"
            } else {
                table_rows += '<td class="ranking-voorspelling" style="border-right: 2px rgb(0,0,0) solid;background:' +color_gradient + ';">' + int_part + "<sup>" + dec_part + "</sup>" + "%" + "</td>"
                table_rows_small += '<td class="ranking-voorspelling" style="background:' +color_gradient + ';">' + int_part + "<sup>" + dec_part + "</sup>" + "%" + "</td>"                
            }
            // Team KLASSIEK Ranking
            table_rows += "<td class='ranking-klassiek'>" + String(standing[i][standing[i].length-1]) + "</td>"
            
            // PTN
            table_rows += "<td class='ranking-klassiek'>" + String(standing[i][standing[i].length-2]) + "</td>"
            
            // M
            table_rows += "<td class='ranking-klassiek'>" + String(standing[i][0]) + "</td>"
            
            // M+
            table_rows += "<td class='ranking-klassiek'>" + String(standing[i][1]) + "</td>"
            
            // M-
            table_rows += "<td class='ranking-klassiek'>" + String(standing[i][2]) + "</td>"
            
            // M=
            table_rows += "<td class='ranking-klassiek'>" + String(standing[i][3]) + "</td>"
            
            // D+
            table_rows += "<td class='ranking-klassiek'>" + String(standing[i][4]) + "</td>"
            
            // D-
            table_rows += "<td class='ranking-klassiek'>" + String(standing[i][5]) + "</td>"
            
            // D+/-
            table_rows += "<td class='ranking-klassiek'>" + String(standing[i][6]) + "</td>"

            table_rows += "</tr>"
            table_rows_small += "</tr>"
    }

    
    table_rows += "</tbody>"
    table_rows_small += "</tbody>"
    
    $("#jupiler-pro-league-ranking-table").append(table_head + table_rows)  
    $("#jupiler-pro-league-ranking-table-small").append(table_head_small + table_rows_small)  
    
    // Sort table
    $("#jupiler-pro-league-ranking-table").tablesorter( {sortList: [[1,1]]} ); 
    $("#jupiler-pro-league-ranking-table-small").tablesorter( {sortList: [[1,1]]} ); 

    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
   // Games
   // Speeldag berekenen
   for (i=0;i<games.length;i++) {
       if (parseInt(games[i][4]) == 0) {
           speeldag = Math.floor((i)/8) + 1
           break
       }
   }
   
   fillGameTable(speeldag);
   
   // Maak knop met ploegen
   //Dropdown plugin data
    var ddData = [];
    
      for (i = 0;i<teams.length;i++) {
          if (teams[i] == "Anderlecht") {
            ddData.push({text: teams[i], value: i, selected:true, description:" ", imageSrc: "/img/Team Logos JPL/" + teams[i] + ".png"})
            
            team_selected = teams[i]
            team_selected_index = i
              
          } else  {
            ddData.push({text: teams[i], value: i, selected:false, description:" ",imageSrc: "/img/Team Logos JPL/" + teams[i] + ".png"})
          }
      }
      
      
      $('#select-team').ddslick({
        data: ddData,
        width: $('#select-team-wrapper').width(),
        height: 300,
        imagePosition: "left",
        selectText: "Selecteer ploeg",
        onSelected: function (data) {
            team_selected = $(".dd-selected-text").text()
            team_selected_index = teams.indexOf(team_selected)
            drawChart_standing()
            drawChart_elo()
        }
      })
    
    // button_klassiek_click();
});
</script>
<script>
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

</script>
<script>
function previousGameday() {
    if (speeldag == 1) {
        return
    }
    speeldag -= 1
    fillGameTable(speeldag)
}

function nextGameday() {
    if (speeldag == 30) {
        return
    }
    speeldag += 1
    fillGameTable(speeldag)
}

function fillGameTable(speeldag) {
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
            table_rows += "<td class='col-md-4 col-sm-4' style='text-align:left'>" + "<img src='/img/Team Logos JPL/" + teams[parseInt(games[i][0])] + ".png'" + "</img>&nbsp;" + teams[parseInt(games[i][0])] + "</td>"
            
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
            table_rows += "<td class='col-md-4 col-sm-4' style='text-align:right;border-right: 2px rgb(0,0,0) solid;'>" + teams[parseInt(games[i][1])] + "&nbsp;" + "<img src='/img/Team Logos JPL/" + teams[parseInt(games[i][1])] + ".png'" + "</img>" + "</td>"
            
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
</script>
<script>
$(window).resize(function() {
    // What to do on resize:
    // Resize select-team and select-team-comp
    $(".dd-select").width($("#select-team-wrapper").width())
    $("#select-team").width($("#select-team-wrapper").width())
    
    drawChart_standing();
    drawChart_elo();
    
})
</script>
<script type="text/javascript">
    google.load("visualization", "1", {packages:["corechart"]});
    google.setOnLoadCallback(drawChart_standing);
    
    function drawChart_standing() {
      var data_table = [];
      data_table.push(["Eindklassering", "Kans (%)", { role: "style" } ])
      
      // Prepare data (make sum to 100%)
      for (i=0;i<teams.length;i++) {
             if (i<6) {
                data_table.push([String(i+1),standing_forecast_regular[team_selected_index][i], "rgb(162,213,161)"])
            } else if (i<14) {
                data_table.push([String(i+1),standing_forecast_regular[team_selected_index][i], "rgb(0,0,255)"])
            } else {
                data_table.push([String(i+1),standing_forecast_regular[team_selected_index][i], "rgb(255,147,128)"])
            }
      }
      
      var data = google.visualization.arrayToDataTable(data_table);

      var view = new google.visualization.DataView(data);
    
      max_odds_array = []
      for (i=0;i<teams.length;i++) {
          max_odds_array.push(Math.max.apply(Math,standing_forecast_regular[i]))
      }
      
      max_odds = 10*Math.ceil(Math.max.apply(Math,max_odds_array)/10)
      
      var options = {
            legend:{position:'none'},
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
            title: 'Eindklassering Regulier Seizoen',
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
                count: (max_odds)/10 // try to pick the correct number to create intervals of 50000 
            },
            title: 'Kans (%)',
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
  
    function drawChart_elo() {
      var data_table = [];
      
      
      header = ["Speeldag"]
      for (i=team_selected_index;i<team_selected_index + 1;i++) {
          header.push("ELO " + teams[i])
      }
    //   header.push( { role: "style" })
      data_table.push(header)
      for (i=0;i<elo_evolution[team_selected_index].length;i++) {
            row = []
              // Start ELO
              if (i==0) {
                  row.push("Start")
                  for (j=team_selected_index;j<team_selected_index+1;j++) {
                      row.push(elo_evolution[j][i])
                  }
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
            }
        data_table.push(row)
    }
      
      var data = google.visualization.arrayToDataTable(data_table);

      var view = new google.visualization.DataView(data);
      
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
            color_rgba = colors[teams[i]].replace(",1)",")")
            color_rgba = color_rgba.replace("a(","(")
            series["0"] = {color:color_rgba, opacity: 1 }
          }
          else {
            color_rgba = colors[teams[i]].replace(",1)",")")
            color_rgba = color_rgba.replace("a(","(")
            series["0"] = {color:color_rgba, opacity: 0.2 }
          }
      }
      var options = {
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
            title: 'Speeldag',
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
            title: 'ELO',
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
 </script>

<script>
// function button_klassiek_click() {
//     // Sort by PTN
//     $("#jupiler-pro-league-ranking-table").tablesorter( {sortList: [[0,0]]} ); 
// }

// function button_elo_click() {
//     // Sort by ELO
//     $("#jupiler-pro-league-ranking-table").tablesorter( {sortList: [[10,1]]} ); 
// }

</script>
<div class="row">
    <div class="col-lg-8 col-lg-offset-2">
        <p>Welke ploeg heeft het meeste kans om kampioen te spelen? Heeft jouw team nog een kans om play-off I te halen? 
        Of is het integendeel tijd om je neer te leggen bij een jaartje tweede klasse? 
        Met behulp van het model ontwikkeld door Sway<a href="#comment1"><sup>1</sup></a> vind je hier een antwoord op de meest prangende vragen.
        Het model is gebaseerd op de Elo parameter, een maatstaf voor de sterkte van elke ploeg op wedstrijdbasis.
        Met dit als startpunt zijn 20.000 simulaties uitgevoerd van een volledig seizoen (inclusief play-offs). De resultaten hiervan vind je hieronder.</p>
        
        <p>In de <a href="#jpl-teams-ranking-table">eerste tabel</a> worden de teams gerangschikt op basis van hun huidige Elo score. 
        Dit is een betere weergave van de onderlinge krachtsverhoudingen dan de klassieke rangschikking.
        Je vindt er voor elk team ook de kans op degradatie, de kans om in play-off I, II of III te belanden, en de kans om kampioen te spelen. 
        De <a href="#jpl-games-ranking-table">tweede tabel</a> geeft voor elke wedstrijd de kans die het model toewijst aan een thuisoverwinning, gelijkspel of uitoverwinning.
        De <a href="#jpl-teams-visualization">twee grafieken</a> onderaan tonen dan weer per ploeg respectievelijk de kansverdeling van hun eindpositie na de reguliere competitie
        en de evolutie van hun Elo score sinds de start van het seizoen.</p>
        
        <p style="font-size: 16px;">Laatste update: <strong>02/11/2015</strong></p>
    </div>
</div>

<hr style="border-width:3px">
<hr style="border-width:3px">

<!--Ranking tabel-->
<div id="jpl-teams-ranking-table" class="row">
    <div class="col-lg-12 hidden-md hidden-xs hidden-sm">
        <table id="jupiler-pro-league-ranking-table" class="table table-condensed ranking-table"></table>
    </div>
    <div class="hidden-lg col-md-12 col-sm-12 col-xs-12">
        <table id="jupiler-pro-league-ranking-table-small" class="table table-condensed ranking-table-small"></table>
    </div>
</div>

<hr style="border-width:3px">
<hr style="border-width:3px">

<!--Wedstrijden tabel-->
<div id="jpl-games-ranking-table" class="row vertical-align">

<div class="col-lg-3 hidden-md hidden-sm hidden-xs"></div>

<div class="col-lg-1 col-md-2 col-sm-2 col-xs-1">
    <a onclick="previousGameday();" style="float:left">
        <span class="glyphicon glyphicon-chevron-left"></span>
    </a>
</div>

<div class="col-lg-4 col-md-8 col-sm-8 col-xs-10"  style="text-align: center">
    <span id="speeldag"></span>
</div>

<div class="col-lg-1 col-md-2 col-sm-2 col-xs-1">
    <a onclick="nextGameday();" style="float:right">
        <span class="glyphicon glyphicon-chevron-right"></span>
    </a>
</div>

<div class="col-lg-3 hidden-md hidden-sm hidden-xs"></div>
</div>

<div class="row">
    <div class="col-lg-12 hidden-md hidden-xs hidden-sm">
        <table id="jupiler-pro-league-games" class="table table-condensed games-table"></table>
    </div>
    <div class="hidden-lg col-md-12 col-sm-12 col-xs-12">
        <table id="jupiler-pro-league-games-small" class="table table-condensed games-table-small"></table>
    </div>
</div>

<hr style="border-width:3px">
<hr style="border-width:3px">

<div id="jpl-teams-visualization" class="row">
    <div class="col-lg-4 col-md-4 col-sm-3 hidden-xs"></div>
    
    <div id="select-team-wrapper" class="col-lg-4 col-md-4 col-sm-6 col-xs-12" style="margin-bottom:10px;">
        <select id="select-team"></select>
    </div>
    
    <div class="col-lg-4 col-md-4 col-sm-3 hidden-xs"></div>
</div>

<div class="row">
    <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
        <div id="endranking_graph" style="height: 300px; border: 2px rgb(238,238,238) solid;"></div>
    </div>
    <div class="hidden-lg col-md-12 col-sm-12 col-xs-12">
        <br>
    </div>
    <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
        <div id="elo_evolution_graph" style="height: 300px; border: 2px rgb(238,238,238) solid;"></div>
    </div>
</div>

<br>

<div class="row">
<div class="col-lg-8 col-lg-offset-2">
<br>
<hr style="border-width:3px">
<a name ="comment1" style="text-decoration:none;font-size:15px;">1 - Deze analyse is gebaseerd op een gelijkaardige analyse van </a><a href="http://fivethirtyeight.com/" style="text-decoration:underline;font-size:15px;">FiveThirtyEight</a><a style="text-decoration:none;font-size:15px;"> voor NFL ploegen.</a><br>
</div>
</div>

<br>


