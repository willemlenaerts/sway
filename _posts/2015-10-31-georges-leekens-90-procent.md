---
layout: post-lg-header-title-box
title: "Het Eindrapport van Leekens bij de Rode Duivels"
subtitle: "90 procent? Not even close."
categories: [interactive]
tags: [football, voetbal, soccer, analysis, analyse, leekens, Rode Duivels, elo, world, international]
alias: [/2015/10/31/]
author: "Willem Lenaerts"
utilities: highlight
header-img: "img/leekens.jpg"
thumbnail-img: "img/leekens.jpg"
---

<!--<script type="text/javascript" src="/js/jQuery/jquery-1.11.1.min.js"></script>-->
<link rel="stylesheet" type="text/css" href="/css/custom.css" />

<!--<script type="text/javascript" src="/js/bootstrap.table.js"></script>-->
<link rel="stylesheet" type="text/css" href="/css/bootstrap.table.css" />

<script src="/js/moment/moment.js"></script>
<script type="text/javascript" src="/js/voetbalelo/elo-world-football.js"></script>
<script>
  // {#On document ready, load stuff#}
  country_table = {{ site.data.elo-world-football.country_table | jsonify }}
  max_elo_data ={{ site.data.elo-world-football.max_elo_data | jsonify}}
  min_elo_data ={{ site.data.elo-world-football.min_elo_data | jsonify}}
  dates = {{site.data.elo-world-football.dates | jsonify}}
  dates_reversed = {{site.data.elo-world-football.dates_reversed | jsonify}}
  countries = {{site.data.elo-world-football.countries | jsonify}}
  years = {{site.data.elo-world-football.years | jsonify}}
  colors = {{site.data.elo-world-football.colors | jsonify}}
</script>

<script>
  $(window).load(function() {
    $.ajax({
        url: "/js/bootstrap.table.js",
        dataType: 'script',
        // success: success,
        // async: false
      }).done(function() {
        $('#country-table').bootstrapTable('resetView');
      })
      // Resize table after image in header has loaded (header not correctly positioned otherwhise)
    // while (document.images["trophy-img"] == null) {
      
    // }  
    
    // // Games table
    // game_table = {{ site.data.elo-world-football.game_table | jsonify }}
    // table_string = "<table id='games-table' data-height='299' data-search='true'>"+"<thead><tr>" + 
    //                 "<th data-field='datum'>Datum</th>" + 
    //                 "<th data-field='type'>Type</th>" + 
    //                 "<th data-field='wedstrijd'>Wedstrijd</th>" + 
    //                 "<th data-field='score'>Uitslag</th></tr></thead>" + "</table>"
      
    //   $("#games-table-wrapper").append(table_string)         
          
    // // Initialize table
    // $('#games-table').bootstrapTable({
    //     data: game_table
    // });          
  })
  
  
  $(window).resize(function() {
    // What to do on resize:
    // Resize select-country and select-country-comp
    $(".dd-select").width($("#select-country-wrapper").width())
    $("#select-country").width($("#select-country-wrapper").width())
    $("#select-country-comp").width($("#select-country-comp-wrapper").width())
    // $("#select-country-comp").css("float","left")
    
    // Resize kamp-country and kamp-country-comp
    $("#kamp-country").width($("#kamp-country-wrapper").width())
    $("#kamp-country-comp").width($("#kamp-country-comp-wrapper").width())
    
    // Resize graph container (rather: redraw it)
    drawEloChart($("#select-country").find(".dd-selected-text").text(),$("#select-country-comp").find(".dd-selected-text").text());
    
    // Make sure table resizes (esp. header)
    $.ajax({
        url: "/js/bootstrap.table.js",
        dataType: 'script',
        // success: success,
        // async: false
      }).done(function() {
        $('#country-table').bootstrapTable('resetView');
      })
    
    // country select options resize
    $(".dd-options").width($("#select-country").width())
  });
  
  
  $( document ).ready(function() {
    // Create tables
    $.ajax({
        url: "/js/bootstrap.table.js",
        dataType: 'script',
        // success: success,
        // async: false
      }).done(function() {
    // country Table
    // // ELO Ranking Tabel
    table_string = "<table id='country-table' data-height='500' data-search='true' data-sort-name='nuelo' data-sort-order='desc'>"+"<thead><tr>" + 
                    "<th colspan='2' data-field='country' data-sortable='true'>Country</th>" + 
                    "<th data-field='nuelo' data-sortable='true'>actualElo</th>" + 
                    "<th data-field='gemelo' data-sortable='true'>avgElo</th>" + 
                    "<th data-field='maxelo' data-sortable='true'>maxElo</th>" + 
                    "<th data-field='minelo' data-sortable='true'>minElo</th>" + 
                    "<th data-field='jaren' data-sortable='true'>S</th>" + 
                    "<th data-field='wedstrijden' data-sortable='true'>W</th>" + 
                    "<th data-field='winperc' data-sortable='true'>Win%</th>" + 
                    "<th data-field='doelpuntensaldo' data-sortable='true'>DS</th>" + 
                    // "<th data-field='wedstrijdenwinst' data-sortable='true'>W+</th>" + 
                    // "<th data-field='wedstrijdengelijk' data-sortable='true'>W=</th>" + 
                    // "<th data-field='wedstrijdenverlies' data-sortable='true'>W-</th>" + 
                    // "<th data-field='goalsvoor' data-sortable='true'>D+</th>" + 
                    // "<th data-field='goalstegen' data-sortable='true'>D-</th>" 
                    "</tr></thead>" + "</table>"
                    
    $("#country-table-wrapper").append(table_string)    
    // Add images
    for (i=0;i<countries.length;i++) {
        country = country_table[i]["country"]
        country_table[i]["country"] = "<img src='/img/World Flags/" + country + ".png'" + "</img>&nbsp;" + country
    }
    // Initialize table
    $('#country-table').bootstrapTable({
        data: country_table
    });


    // // Games table
    // table_string = "<table id='games-table' data-height='299' data-search='true'>"+"<thead><tr>" + 
    //                 "<th data-field='datum'>Datum</th>" + 
    //                 "<th data-field='type'>Type</th>" + 
    //                 "<th data-field='wedstrijd'>Wedstrijd</th>" + 
    //                 "<th data-field='score'>Uitslag</th></tr></thead>" + "</table>"
      
    //   $("#games-table-wrapper").append(table_string)         
          
    // // Initialize table
    // $('#games-table').bootstrapTable({
    //     data: game_table
    // });          
          
      })
      
      
    // ResetZoom button for chart
    // zoom_click is global variable that stores whether chart is zoomed (1: yes, 0: no)
    $('#resetZoom').click(function() {
        $("#resetZoomWrapper").hide()
        
        setTimeout(function() {
                chart1.zoomOut();
                    }, 0);
        // chart1.zoomOut();
    });
      
    
    //Dropdown plugin data
    var ddData = [];
    
      for (i = 0;i<countries.length;i++) {
          if (countries[i] == "Belgium") {
            ddData.push({text: countries[i], value: i, selected:false, description:" ", imageSrc: "/img/World Flags/" + countries[i] + ".png"})
            
            var country_select = countries[i]
            var country_count = i
              
          } else  {
            ddData.push({text: countries[i], value: i, selected:false, description:" ",imageSrc: "/img/World Flags/" + countries[i] + ".png"})
          }
      }
      
      
      // Set select menu
      $.ajax({
        url: "/js/ddSlick/ddSlick.js",
        dataType: 'script',
        // success: success,
        // async: false
      }).done(function() {
          $.ajax({
            url: "/js/highstock/highstock.js",
            dataType: 'script',
            // success: success,
            // async: false
          }).done(function() {
              $('#select-country').ddslick({
                data: ddData,
                width: $('#select-country-wrapper').width(),
                height: 300,
                imagePosition: "left",
                selectText: "Selecteer ploeg",
                onSelected: function (data) {
                    
                    $("#resetZoomWrapper").hide()
                    $("#hth").hide()
                    $("#kamp-country").hide()
                    
                    // Make right color
                    $("#select-country").find("div.dd-select").css("background",colors[data.selectedData.text].replace("1)","0.1)"))
                    
                    // Check if first load
                    if ($("#select-country-comp").find(".dd-option").hasClass("dd-option-selected") == false && $("#kamp-country").text() == "") {
                        $("#loading-head-to-head").css("height",0)
                        timer = 0
                    } else {
                        $("#loading-head-to-head").css("height",$("#container").height())
                        $("#container").hide()
                        timer = 100
                    }
                    
                    // unselect select-country-comp
                    $("#select-country-comp").find(".dd-option").removeClass("dd-option-selected");
                    $("#select-country-comp").find(".dd-selected").html("Compare with");
                    $("#select-country-comp").find("div.dd-select").css("background","rgb(240,240,240)")
                    $("#kamp-country-comp").hide()
                    
                    // Change color of kamp
                    $("#kamp-country").css("background-color",colors[data.selectedData.text].replace("1)","0.1)"))
                    $("#kamp-country").css("width",$("#select-country").width())
                    
                    // Hide table
                    // (and stop page from freezing, so use setTimeout)
                    $("#select-country").find("ul").hide()
                    
                    // $("#head-to-head-header").hide()
                    // $("#head-to-head-body").hide()
                    $("#ow-table-wrapper").hide()
                    $("#loading-head-to-head").show()
                    
                    setTimeout(function() {
                        drawEloChart(data.selectedData.text,$("#select-country-comp").find(".dd-selected-text").text());
                        $("#wrapper").css('background',"none");
                    }, timer);
                    // drawEloChart(data.selectedData.text,$("#select-country-comp").find(".dd-selected-text").text()); // $("#select-country-comp").find(".dd-selected-text").text()
                }
              })
              
              $('#select-country-comp').ddslick({
                data: ddData,
                width: $('#select-country-comp-wrapper').width(),
                height: 300,
                imagePosition: "left",
                selectText: "Compare with",
                onSelected: function (data) {
                    $("#resetZoomWrapper").hide()
                    $("#hth").html("")
                    $("#hth").hide()
                    $("#kamp-country-comp").hide()
                    // Check if first 
                    if ($("#ow-table-wrapper").is(":visible") == false) {
                        $("#loading-head-to-head").css("height",$("#container").height())
                    } else {
                        $("#loading-head-to-head").css("height",$("#head-to-head-header").height()+body_height+$("#container").height())
                    }
                    
                    // CSS Stuff
                    $("#select-country-comp").find("div.dd-select").css("background",colors[data.selectedData.text].replace("1)","0.1)"))
                    $("#kamp-country").css("margin-bottom","10px")
                    
                    // $("#kamp-country-comp").text(String(elo_evolution[data.selectedData.text]["kampioenschappen"]) + "x Kampioen")
                    $("#kamp-country-comp").css("background-color",colors[data.selectedData.text].replace("1)","0.1)"))
                    $("#kamp-country-comp").css("width",$("#select-country-comp").width())
                    $("#kamp-country-comp").css("margin-bottom","10px")
                    
                    
                    // Display loading message
                    body_height = Math.min(150,$("#ow-table-wrapper").height())
                    // $("#head-to-head-header").hide()
                    // $("#head-to-head-body").hide()
                    $("#ow-table-wrapper").hide()
                    $("#container").hide()
                    $("#select-country-comp").find("ul").hide()
                    $("#loading-head-to-head").show()

                    // (and stop page from freezing, so use setTimeout)
                    setTimeout(function() {
                        drawEloChart($("#select-country").find(".dd-selected-text").text(),data.selectedData.text);
                    },10);
                  // console.log(data.selectedData.text)
                }
              })
              $('#select-country').ddslick('select', {index: country_count });
                
          })
      })
});
</script>

<div class="row">
<div class="col-lg-8 col-lg-offset-2">

<p>13 mei 2012. Een schokgolf gaat door België als blijkt dat Georges Leekens de Rode Duivels verlaat voor Club Brugge.
Naast de twijfelachtige timing is het vooral zijn uitleg bij dit ontslag dat heel wat commotie veroorzaakt. 
<a target="_blank" href="http://www.hln.be/hln/nl/1285/Jupiler-Pro-League/article/detail/1437891/2012/05/13/Leekens-spreekt-Werk-bij-Rode-Duivels-was-zo-goed-als-klaar.dhtml">
Letterlijk zegt hij het volgende</a>:</p>

<p><cite>"Het is logisch dat bondsvoorzitter François De Keersmaecker ontgoocheld is. 
Het tegendeel zou pas jammer zijn. Het tijdstip ligt wat moeilijk, maar mijn werk bij de Duivels was voor 90 procent af. 
Ik heb met hart en ziel voor hen gewerkt."</cite></p>

<p>Cue de twitter storm en de barrage aan negatieve artikels. Arrogant, wereldvreemd, geldwolf, de minder aangename epitheta stapelden zich in sneltempo op.
Maar los van al deze emotionele reacties: wat als hij gelijk had? Misschien was het werk wel voor 90 procent af? 
Gelukkig kunnen we dit anno 2015 gewoon berekenen!</p>

<p>Hoe vraagt U? Met de Elo parameter, een maatstaf voor de sterkte van een ploeg op wedstrijdbasis. 
Elo-ratings hebben een simpele formule; de enige inputs zijn de uitslag van de wedstrijd, en waar en wanneer deze gespeeld werd.
Een team verdient steeds Elo punten als het wint, maar krijgt er meer in het geval van een verrassende overwinning en als het doelpuntensaldo groter is.
Elo-ratings zijn een "zero sum game". Wat de ene ploeg aan Elo punten wint speelt de andere kwijt<a href="#comment1"><sup>1</sup></a>.
Toegepast op een dataset van alle internationale wedstrijden tussen landenteams (sinds 1872, meer dan 35.000 in totaal) geeft dat volgend resultaat voor België<a href="#comment2"><sup>2</sup></a>:</p>

</div>
</div>

<hr style="border-width:3px">
<hr style="border-width:3px">

<div id="wrapper" style='background: url(/img/ajax-loader.gif) no-repeat center center;'>
    <div class="row">
        <div id="col1" class="col-lg-4 col-md-12 col-xs-12">
            <div class="row">
                <div id="select-country-wrapper" class="col-lg-12 col-md-12 col-xs-12" style="margin-bottom:10px;">
                    <select id="select-country" style="display:none;"></select>
                </div>
            </div>
            
            <div class="row">
                <div id="kamp-country-wrapper" class="col-lg-12 col-md-12 col-xs-12" style="margin-bottom:10px;">
                    <div id="kamp-country" style="text-align:center;display:none;border:solid 1px #ccc;"></div>
                </div>
            </div>
        
        </div>
        
        <div id="col2" class="col-lg-4 col-md-12 col-xs-12">
            <div class="row">
                <div id="hth-wrapper" class="col-lg-12 col-md-12 col-xs-12" style="margin-bottom:10px;">
                    <div id="hth" class="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-xs-10 col-xs-offset-1" style="text-align: center;"></div>
                </div>
            </div>
        </div>
        
        <div id="col3" class="col-lg-4 col-md-12 col-xs-12">
            <div class="row">
                <div id="select-country-comp-wrapper" class="col-lg-12 col-md-12 col-xs-12" style="margin-bottom:10px;">
                    <select id="select-country-comp" style="display:none;"></select>
                </div>
            </div>
            
            <div class="row">
                <div id="kamp-country-comp-wrapper" class="col-lg-12 col-md-12 col-xs-12" style="margin-bottom:10px;">
                    <div id="kamp-country-comp" style="text-align:center;display:none;border:solid 1px #ccc;"></div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="row">
        <div class="col-lg-12 col-md-12 col-xs-12">
            <div id="loading-head-to-head" style="background: url(/img/ajax-loader.gif) no-repeat center center;display:none;"></div>
         </div>
    </div>
    
    <div class="row">
        <div class="col-lg-12 col-md-12 col-xs-12">
            <div id="ow-table-wrapper"></div>
        </div>
    </div>
    
    <div class="row">
        <div id="resetZoomWrapper" class="col-lg-12 col-md-12 col-xs-12" style="text-align: center;display:none;">
            <button id="resetZoom" type="button" class="btn btn-default" style="padding: 0px 0px !important;font-family: Lora !important;margin-top:15px !important">Reset Zoom</button>
        </div>
    </div>    
    
    <div class="row">
        <div class="col-lg-12 col-md-12 col-xs-12">
            <div id="container" style="height: 600px; margin: 0 auto;"></div>
        </div>
    </div>
</div>

<hr style="border-width:3px">
<hr style="border-width:3px">

<div class="row">
<div class="col-lg-8 col-lg-offset-2">

<h2>Wanneer is het werk "af"?</h2>

<p>Om te beginnen: hoe definiëren we de Elo score waarbij "het werk af is", zoals Leekens zegt? 
In 2012 was de verwachting van zowel fans, spelers als de bondstop om zich met de absolute toplanden te kunnen meten, een positie die we anno 2015 zo goed als bereikt hebben.
Over welke Elo scores praten we dan? Wel, aangezien elk land begint met een Elo score van 1500 (een aanname van het model), is dit een goede maatstaf voor een "gemiddeld" land.
De beoordeling van andere Elo scores vind je in volgende tabel:
</p>

<table style="text-align: center">
<tr><th style="text-align: center">Elo Interval</th><th style="text-align: center">Subjectieve Waardering</th></tr>
 <tr><td>< 1200</td><td>Zeer Slecht</td></tr>
 <tr><td>1200 - 1400</td><td>Slecht</td></tr>
 <tr><td>1400 - 1600</td><td>Gemiddeld</td></tr>
<tr><td>1600 - 1800</td><td>Goed</td></tr>
<tr><td>> 1800</td><td>Zeer Goed</td></tr>
</table>

<p>De huidige (dd. 31/10/2015) Elo score van de Rode Duivels is 1778.
Deze brengt ons dicht bij de zeer goede landen à la Duitsland en Argentinië, 
en is volledig in lijn met de verwachtingen die er waren in 2012. 
Laten we deze score dus als "af" beschouwen.
</p>

<hr style="border-width:3px">

<h2>2009 - 2015, de Wederopstanding</h2>

<p>9 september 2009, een donkere dag in de belgische sportgeschiedenis. De Rode Duivels, in vrije val sinds het WK 2002, verliezen met 2-1 van Armenië en hebben hun laagste Elo score sinds 1948.
Dick Advocaat neemt over maar de kleine generaal blijkt ook figuurlijk klein en geeft er, in ruil voor wat Russische roebels, al na 5 wedstrijden de brui aan. 
Hij heeft de Rode Duivels een mooie doch nutteloze zege tegen Turkije bezorgd (en wat <a target="_blank" href="http://www.gva.be/cnt/aid870380/dick-advocaat-tikt-logan-bailly-op-de-vingers">stijladvies</a>).
</p>

<p>
Enter Leekens, die zijn tweede bewind aan het hoofd van de Rode Duivels begint met een team dat, hoewel zeer getalenteerd, nog steeds een historisch lage Elo score heeft.
19 interlands later, en zonder het op dat moment te beseffen, speelt België op 29 februari 2012 in Griekenland zijn laatste wedstrijd onder Leekens (1-1).
Na afloop is de Elo score van België 1530, nog steeds zeer ver verwijderd van het verhoopte niveau.
Het zal uiteindelijk Wilmots zijn die de Duivels naar het beloofde land brengt. 
</p>

<p>
Samengevat ziet de wederopstanding sinds 2009 er zo uit:
</p>

<br>

</div>
</div>

<div class="row">
<div class="col-lg-12">

<img src="/img/RodeDuivels2009-2015.png">

<br>

</div>
</div>


<div class="row">
<div class="col-lg-8 col-lg-offset-2">

<hr style="border-width:3px">

<h2>De Rol van Leekens</h2>

<p>En zo komen we tot de essentie: wat is de rol van Leekens in deze opmars naar de wereldtop? 
Vanaf de wedstrijd tegen Armenië in 2009 tot nu is het verschil in Elo score 385 punten. Een opmerkelijk snelle ommekeer.
Verdeeld over de 3 bondscoaches in deze periode krijgen we volgende resultaten:</p>

</div>
</div>

<div class="row">
<div class="col-lg-12 col-lg-offset-0">


<table style="text-align:center">
<tr><th colspan="3"></th><th colspan="3" style="text-align:center">Elo</th><th></th></tr>
<tr><th style="text-align:center">Bondscoach</th><th style="text-align:center">Periode</th><th style="text-align:center">Wedstrijden</th><th style="text-align:center">Begin</th><th style="text-align:center">Einde</th><th style="text-align:center">Verschil</th><th style="text-align:center">%</th></tr>
 <tr><td>Dick Advocaat</td><td>01/10/2009 - 15/04/2010</td><td>5</td><td>1373</td><td>1414</td><td>41</td><td>10,65</td></tr>
 <tr><td>Georges Leekens</td><td>03/05/2010 - 13/05/2012</td><td>19</td><td>1414</td><td>1530</td><td>116</td><td>30,13</td></tr>
 <tr><td>Marc Wilmots</td><td>15/05/2012 - heden</td><td>37</td><td>1530</td><td>1758</td><td>228</td><td>59,22</td></tr>
 <tr><td colspan="5"></td><td><strong>385</strong></td><td><strong>100</strong></td></tr>
</table>

</div>
</div>

<div class="row">
<div class="col-lg-8 col-lg-offset-2">

<p>Het is duidelijk: Wilmots mag met het merendeel van de eer gaan lopen. 
Met 59,22 procent is hij voor meer dan de helft verantwoordelijk voor de recente successen.
En Leekens? Die komt met zijn 30,13 procent niet echt in de buurt van de geclaimde 90 procent.</p>

<!--<p>Bij deze dus volgende oproep aan Georges: zeg niet langer 90 procent, zeg 30,13 procent. -->
<!--Klinkt misschien iets minder vlot, maar het heeft dan weer het voordeel dat het waar is.</p>-->

<p>Bij deze dus een aangepaste quote, speciaal voor Georges:</p>

<p><cite>"Het is logisch dat bondsvoorzitter François De Keersmaecker ontgoocheld is. 
Het tegendeel zou pas jammer zijn. Het tijdstip ligt wat moeilijk, maar mijn werk bij de Duivels was voor <strong>30,13</strong> procent af. 
Ik heb met hart en ziel voor hen gewerkt."</cite></p>

<p>"Met hart en ziel" ligt hopelijk dichter bij de waarheid.</p>

<!--<h2>Vergelijking Ploegen</h2>-->

<!--<p>Naast België is er ook data beschikbaar voor alle andere landen. Deze is zowel in de grafiek (zie hierboven) beschikbaar, als in de tabel hieronder. -->
<!--Met deze tabel kan je een rangschikking maken op basis van de huidige, gemiddelde, maximum of minimum Elo, -->
<!--het aantal jaren actief (S), het aantal gespeelde wedstrijden (W), winprocentage (Win%) of doelpuntensaldo per wedstrijd (DS). -->
<!--Sorteer zelf de gewenste kolom of ga op zoek naar een land naar keuze.</p>-->

<!--<hr style="border-width:3px">-->

</div>
</div>
<div id="country-table-wrapper" style="display:none"></div>


<div class="row">
<div class="col-lg-8 col-lg-offset-2">
<!--<br>-->
<hr style="border-width:3px">
<a name ="comment1" style="text-decoration:none;font-size:15px;">1 - Bijvoorbeeld: als België op het WK 2014 wint van de VS krijgt het 32 Elo punten,
en dit betekent ook dat de VS er 32 kwijtspeelt.</a><br>
<a name ="comment2" style="text-decoration:none;font-size:15px;">2 - Deze analyse is gebaseerd op een gelijkaardige analyse van </a><a href="http://fivethirtyeight.com/" style="text-decoration:underline;font-size:15px;">FiveThirtyEight</a><a style="text-decoration:none;font-size:15px;"> voor NBA ploegen.</a>

</div>
</div>