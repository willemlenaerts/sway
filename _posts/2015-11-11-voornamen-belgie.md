---
layout: post
title: "Wat Zou Jouw Naam Zijn Als Je Nu Geboren Werd?"
categories: [posts,random]
tags: [voornamen, Time, België]
alias: [/2015/06/01/]
author: "Willem Lenaerts"
utilities: highlight
header-img: "img/voornamen_2.jpg"
thumbnail-img: "img/voornamen_1.jpg"
---
<!--<script type="text/javascript" src="/js/jQuery/jquery-1.11.1.min.js"></script>-->
<!--<script type="text/javascript" src="/js/jQuery-ui/jquery-ui.min.js"></script>-->
<!--<script src="http://yui.yahooapis.com/3.18.1/build/yui/yui-min.js"></script>-->

<link rel="stylesheet" type="text/css" href="/css/jQuery-ui/jquery-ui.min.css"/>
<link rel="stylesheet" type="text/css" href="/css/custom.css"/>
<link rel="stylesheet" type="text/css" href="/css/ladda/ladda-themeless.min.css"/>
<script type="text/javascript" src="/js/ladda/spin.min.js"></script>
<script type="text/javascript" src="/js/ladda/ladda.min.js"></script>

<script>
$(window).on('load', function() {
// Voor getJSON: Zorg dat CORS aangezet is (hetzij met plugin in chrome tijdens testversie, hetzij via .htaccess file op productieserver)
// EN zorg dat CORS aangezet is bij S3 Bucket (per bucket te doen)
$.ajax({
  url: "https://s3.eu-central-1.amazonaws.com/voornamen/voornamen.json",
  dataType: 'json',
  crossDomain: true, // enable this
}).done(function(data) {
    voornamen = data
    $.ajax({
      url: "https://s3.eu-central-1.amazonaws.com/voornamen/alle_voornamen.json",
      dataType: 'json',
      crossDomain: true, // enable this
    }).done(function(data) {
        namen = data
        
        // Hide loading
        $("#loading").hide()
        
        // Data loaded, now make input & initialize autocomplete
        // Fill  form
        // Input name
        document.getElementById("input-wrapper").innerHTML =   "<div class='ui-widget'><input id='input-name' style='width: 100%;margin-bottom: 10px;margin-top:10px;'  placeholder='Voornaam'></input></div><br>"
        
        $.ajax({
          url: "/js/jQuery-ui/jquery-ui.min.js",
          dataType: 'script',
        }).done(function() {
            $("#input-name").autocomplete({
                source: namen,
                delay: 0,
                minLength: 3
            });
            
            $('#submit-button').click(function(e)  {
                // $('#submit-button').on("click", function(e)  {
                    // Hide previous results
                    $("#hoofdzin").text("")
                    $("#hoofdzin").hide()
                    $("#bijzin-gender").text("")
                    $("#bijzin-gender").hide()
                    $("#bijzin-location").text("")
                    $("#bijzin-location").hide()
                    $("#bijzin-birthyear").text("")
                    $("#bijzin-birthyear").hide()
                    $("#table-aantal").hide()
                    
                    // Als naam niet ingevuld, maak border rood en break van functie
                    $('#input-name').css("border-color","");
                    if ($('#input-name').val() == "") {
                        $('#input-name').css("border-color","rgb(238,9,9)");
                        return
                    }
                    
                    // Als iets niet geselecteerd is
                    if ($("#input-birthyear").val() == null) {
                        $("#hoofdzin").append("Selecteer een geboortejaar.")
                        $("#hoofdzin").show()
                        return
                    }
                    if ($("#input-gender").val() == null) {
                        $("#hoofdzin").append("Selecteer geslacht.")
                        $("#hoofdzin").show()
                        return
                    }
                    if ($("#input-location").val() == null) {
                        $("#hoofdzin").append("Selecteer een locatie.")
                        $("#hoofdzin").show()
                        return
                    }
                    
                    e.preventDefault();
                    var l = Ladda.create(this);
                     l.start();
                    
                    key_1 = ["m","v"]
                    key_2 = ["vl","br","wal","be"]
                    key_3 = ["18","18_65","65","alles"]
                    
                
                    result = voornamen[$('#input-gender').val()][$('#input-location').val()][$('#input-birthyear').val()]
                    rang = 0
                    for (i=0;i<result[1].length;i++) {
                        if (result[1][i] ==  document.getElementById('input-name').value) {
                            rang = result[0][i]
                            aantal = result[2][i]
                            break
                        }
                    }
                    
                    // Hoofdzin
                    if (rang==0) {
                        $("#hoofdzin").append("Er is geen data die aan de zoekopdracht voldoet.")
                    } else {
                        if ($('#input-gender').val() == "m") {
                            gender_string = "mannen"
                        } else {
                            gender_string = "vrouwen"
                        }
                        if (document.getElementById('input-location').value == "vl") {
                            location_string = "Vlaanderen"
                        } else if (document.getElementById('input-location').value == "wal") {
                            location_string = "Wallonië"
                        } else if (document.getElementById('input-location').value == "br") {
                            location_string = "Brussel"
                        } else {
                            location_string = "België"
                        }
                        $("#hoofdzin").append("Er zijn in jouw leeftijdscategorie in " + location_string + " <strong>" + String(aantal) + "</strong> " + gender_string + " met de naam " + document.getElementById('input-name').value + ". Dit maakt het de <strong>" +  String(rang) +"e</strong> meest populaire naam.")
                        
                        
                        // Fill table
                        for (i=0;i<key_1.length;i++) {
                            gender_i = key_1[i]
                            for (j=0;j<key_2.length;j++) {
                                location_j = key_2[j]
                                for (k=0;k<key_3.length;k++) {
                                    birthyear_k = key_3[k]
                                    if (rang > voornamen[gender_i][location_j][birthyear_k][1].length) {
                                        rang = voornamen[gender_i][location_j][birthyear_k][1].length
                                        if (gender_i == "m") {
                                            img_string = "<img style='display:inline;margin:auto;' src='/img/man_icon_16.png'>&nbsp;"
                                        } else {
                                            img_string = "<img style='display:inline;margin:auto;' src='/img/woman_icon_16.png'>&nbsp;"
                                        }
                                        $("#" + location_j + "_" + gender_i + "_" + birthyear_k).html(img_string + voornamen[gender_i][location_j][birthyear_k][1][rang-1])
                                        $("#" + location_j + "_" + gender_i + "_" + birthyear_k).css("color","inherit")
                                    } else {
                                        if (result[1][rang-1] == voornamen[gender_i][location_j][birthyear_k][1][rang-1]) {
                                            if (gender_i == "m") {
                                                img_string = "<img style='display:inline;margin:auto;' src='/img/man_icon_16_green.png'>&nbsp;"
                                            } else {
                                                img_string = "<img style='display:inline;margin:auto;' src='/img/woman_icon_16_green.png'>&nbsp;"
                                            }
                                            $("#" + location_j + "_" + gender_i + "_" + birthyear_k).html(img_string + voornamen[gender_i][location_j][birthyear_k][1][rang-1])
                                            $("#" + location_j + "_" + gender_i + "_" + birthyear_k).css("color","#4CAF50")
                                        } else {
                                            if (gender_i == "m") {
                                                img_string = "<img style='display:inline;margin:auto;' src='/img/man_icon_16.png'>&nbsp;"
                                            } else {
                                                img_string = "<img style='display:inline;margin:auto;' src='/img/woman_icon_16.png'>&nbsp;"
                                            }
                                            $("#" + location_j + "_" + gender_i + "_" + birthyear_k).html(img_string + voornamen[gender_i][location_j][birthyear_k][1][rang-1])
                                            $("#" + location_j + "_" + gender_i + "_" + birthyear_k).css("color","inherit")
                                        }
                                    }
                                    
                                }
                            }
                        }
                        $("#table-aantal").parent().addClass("col-lg-12")
                        $("#table-aantal").show()
                    }
                    $("#hoofdzin").show()
                    l.stop();
                    
                });
        })

        // Age select
        option_string = "<option value='' disabled selected>Selecteer geboortejaar</option>"
        for (i=2013;i>=1913;i--) {
            value_name = 2015-i
            if (value_name < 18) {
                option_string += "<option value='18'>" + String(i) + "</option>"
            } else {
                if (value_name < 65) {
                    option_string += "<option value='18_65'>" + String(i) + "</option>"
                } else {
                    option_string += "<option value='65'>" + String(i) + "</option>"
                }
            }
        }                                           
        document.getElementById("input-wrapper").innerHTML += "<select style='width: 100%;margin-bottom: 10px;' id='input-birthyear'>" + option_string + "</select><br>"
        
        // Gender select
        document.getElementById("input-wrapper").innerHTML += "<select style='width: 100%;margin-bottom: 10px;' id='input-gender'><option value='' disabled selected>Selecteer geslacht</option><option value='m'>Man</option><option value='v'>Vrouw</option></select><br>"
        
        // Location select
        document.getElementById("input-wrapper").innerHTML +=   "<select style='width: 100%;margin-bottom: 10px;' id='input-location'><option value='' disabled selected>Selecteer locatie</option>" + 
                                                            "<option value='vl'>Vlaanderen</option>" + 
                                                            "<option value='wal'>Wallonië</option>" + 
                                                            "<option value='br'>Brussel</option>" + 
                                                            "<option value='be'>België</option>" + 
                                                            "</select><br>"
        
        // Button
        document.getElementById("button-wrapper").innerHTML += "<a id='submit-button' class='btn btn-danger ladda-button' data-style='slide-up' data-size='s'><span class='ladda-label'>Check it!</span></a><br>"
        
        $("#button-wrapper").css("margin-top",($("#input-wrapper").height() - $("#button-wrapper").height())/2 - 10)
    })
})

})
</script>

De populariteit van jouw naam is meer dan waarschijnlijk sterk gewijzigd sinds je geboorte.
In onderstaande app kan je, op basis van de populariteit van je naam bij in je geboortejaar, 
kijken wat je naam zou zijn als je in een ander jaar of op een andere locatie geboren werd.

Deze app is gebaseerd op een artikel van [Time][voornamen-Time] voor amerikaanse voornamen. 
De amerikaanse data is beschikbaar per jaar, wij moeten het in België doen met iets minder specifieke data:
de [voornamen data][data-België] is gesplitst per gewest, per geslacht en per leeftijdscategorie (0 tot 18 jaar/18 tot 65 jaar/boven de 65 jaar).

Maar dat is meer dan genoeg voor volgende app. 
Vul je naam, geboortejaar, geslacht en locatie in en analyseer de populariteit van jouw naam.

<div id="loading" style='height: 200px;background: url(/img/ajax-loader.gif) no-repeat center center;'></div>
<div class="row" style="background:rgba(0,0,0,0.1)">
    <div id="input-wrapper" class="col-lg-6 col-md-6 col-xs-12"></div>
    <div id="button-wrapper" class="col-lg-6 col-md-6 col-xs-12" style="text-align: center;margin-bottom: 30px"></div>
    <p id="hoofdzin" class="col-lg-12" style="display:none;margin-top:30px"></p>
    <table id="table-aantal" class='table table-bordered table-hover table-condensed' style="display:none;"> 
        <thead>
            <tr>
                <th style="border:1px solid #000" class='col-md-2'></th>
                <th style="border:1px solid #000" class='col-md-2'> < 18 jaar</th>
                <th style="border:1px solid #000" class='col-md-2'> 18 - 65</th>
                <th style="border:1px solid #000" class='col-md-2'> > 65 jaar</th>
                <th style="border:1px solid #000" class='col-md-2'>Totaal</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="vertical-align:middle;text-align:center;border:1px solid #000" rowspan="2"><strong>Vlaanderen</strong></td>
                <td style="border:1px solid #000" id="vl_m_18"></td>
                <td style="border:1px solid #000" id="vl_m_18_65"></td>
                <td style="border:1px solid #000" id="vl_m_65"></td>
                <td style="border:1px solid #000" id="vl_m_alles"></td>
            </tr>
            <tr>
                <td style="border:1px solid #000" id="vl_v_18"></td>
                <td style="border:1px solid #000" id="vl_v_18_65"></td>
                <td style="border:1px solid #000" id="vl_v_65"></td>
                <td style="border:1px solid #000" id="vl_v_alles"></td>
            </tr>
            <tr>
                <td style="vertical-align:middle;text-align:center;border:1px solid #000" rowspan="2"><strong>Brussel</strong></td>
                <td style="border:1px solid #000" id="br_m_18"></td>
                <td style="border:1px solid #000" id="br_m_18_65"></td>
                <td style="border:1px solid #000" id="br_m_65"></td>
                <td style="border:1px solid #000" id="br_m_alles"></td>
            </tr>
            <tr>
                <td style="border:1px solid #000" id="br_v_18"></td>
                <td style="border:1px solid #000" id="br_v_18_65"></td>
                <td style="border:1px solid #000" id="br_v_65"></td>
                <td style="border:1px solid #000" id="br_v_alles"></td>
            </tr>
            <tr>
                <td style="vertical-align:middle;text-align:center;border:1px solid #000" rowspan="2"><strong>Wallonië</strong></td>
                <td style="border:1px solid #000" id="wal_m_18"></td>
                <td style="border:1px solid #000" id="wal_m_18_65"></td>
                <td style="border:1px solid #000" id="wal_m_65"></td>
                <td style="border:1px solid #000" id="wal_m_alles"></td>
            </tr>
            <tr>
                <td style="border:1px solid #000" id="wal_v_18"></td>
                <td style="border:1px solid #000" id="wal_v_18_65"></td>
                <td style="border:1px solid #000" id="wal_v_65"></td>
                <td style="border:1px solid #000" id="wal_v_alles"></td>
            </tr>
            <tr>
                <td style="vertical-align:middle;text-align:center;border:1px solid #000" rowspan="2"><strong>België</strong></td>
                <td style="border:1px solid #000" id="be_m_18"></td>
                <td style="border:1px solid #000" id="be_m_18_65"></td>
                <td style="border:1px solid #000" id="be_m_65"></td>
                <td style="border:1px solid #000" id="be_m_alles"></td>
            </tr>
            <tr>
                <td style="border:1px solid #000" id="be_v_18"></td>
                <td style="border:1px solid #000" id="be_v_18_65"></td>
                <td style="border:1px solid #000" id="be_v_65"></td>
                <td style="border:1px solid #000" id="be_v_alles"></td>
            </tr>
        </tbody>
    </table>
</div>



[data-België]: http://statbel.fgov.be/nl/statistieken/cijfers/bevolking/namen/MV/
[voornamen-Time]: http://time.com/3856405/baby-name-popularity/