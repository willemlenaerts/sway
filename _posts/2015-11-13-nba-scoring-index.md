---
layout: post-lg-header-title-box-col-lg-8
title: "NBA Scoring Index"
subtitle: "Searching for the Best Scorer of All Time"
categories: [posts,nba]
tags: [nba, basketball, kobe bryant]
alias: [/2015/07/20/]
author: "Willem Lenaerts"
utilities: highlight
header-img: "img/wilt.jpg"
thumbnail-img: "img/wilt.jpg"
---
<!--<script type="text/javascript" src="/js/jQuery/jquery-1.11.1.min.js"></script>-->
<link rel="stylesheet" type="text/css" href="/css/custom.css" />
<link rel="stylesheet" type="text/css" href="/css/bootstrap.table.css" />
<link rel="stylesheet" type="text/css" href="/css/projects/nba-scoring-index/nba-scoring-index.css" />
<script src="/js/moment/moment.js"></script>

<!--Javascript scatter plot-->
<script src="/js/highcharts/highcharts.js"></script>
<script src="/js/nba/nba-scatterplot.js"></script>

<!--Bootstrap slider-->
<script src="/js/bootstrap-slider/bootstrap-slider.js"></script>
<link rel="stylesheet" type="text/css" href="/css/bootstrap-slider/bootstrap-slider.css" />

<!-- mathjax config similar to math.stackexchange -->
<script type="text/x-mathjax-config">
MathJax.Hub.Config({
  jax: ["input/TeX", "output/HTML-CSS"],
  tex2jax: {
    inlineMath: [ ['$', '$'] ],
    displayMath: [ ['$$', '$$']],
    processEscapes: true,
    skipTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
  },
  messageStyle: "none",
  "HTML-CSS": { preferredFont: "TeX", availableFonts: ["STIX","TeX"] }
});
</script>
<script src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML" type="text/javascript"></script>

<!--Autocomplete-->
<script src="http://yui.yahooapis.com/3.18.1/build/yui/yui-min.js"></script>
<script>
  // {#On document ready, load stuff#}
  league_average = {{ site.data.nba-scoring-index.league_average | jsonify }}
  nba_si_table_career = {{ site.data.nba-scoring-index.table_si_career | jsonify }}
  nba_si_table_season = {{ site.data.nba-scoring-index.table_si_season | jsonify }}
  x_axis_si_total = {{ site.data.nba-scoring-index.x_axis_si_total | jsonify }}
  y_axis_si_total = {{ site.data.nba-scoring-index.y_axis_si_total | jsonify }}
  scatterplot_si_total = {{ site.data.nba-scoring-index.scatter_plot_data_si_total | jsonify }}
  players_scatterplot_si_total = {{ site.data.nba-scoring-index.players_scatter_plot_si | jsonify }}
</script>
<script>
</script>
<script>
$(window).resize(function() {
  $('#nba-si-career-table').bootstrapTable('resetView')
  $('#nba-si-season-table').bootstrapTable('resetView')
})
  $( document ).ready(function() {
    // Name selected for NBA SI chart
    name_selected = ""
    search = 0
    // Add 3 attributes to input form (this eliminates need for label to ask for "name?")
        $('#input_name_nba_si').attr("value","Search for NBA Player");
        $('#input_name_nba_si').attr("onfocus","make_blank(this);");
        $('#input_name_nba_si').attr("onblur","restore_placeholder(this);");

        // HTML template string
        var nameTemplate =
                '<div class="autocomplete_results">' +
                '{naam}' +
                '</div>';

        YUI().use('autocomplete', 'autocomplete-filters', 'autocomplete-highlighters', function (Y) {
            function nameFormatter(query, results) {
                // Iterate over the array of name result objects and return an
                // array of HTML strings.
                return Y.Array.map(results, function (result) {
                    var naam = result.raw;

                    // Use string substitution to fill out the name template and
                    // return an HTML string for this result.
                    return Y.Lang.sub(nameTemplate, {
                        naam: naam
                    });
                });
            }
            Y.one('#input_name_nba_si').plug(Y.Plugin.AutoComplete, {
                resultFormatter : nameFormatter,
                resultFilters    : 'phraseMatch',
                resultHighlighter: 'phraseMatch',
                source           : players_scatterplot_si_total ,
                maxResults: 5,
                minQueryLength: 3
            });
            
    });
    
    // Draw Chart NI
  //   season_selected = 2000
  //       url_select = "http://www.sway-blog.be/data/nba-narcissism-index/NI/" + String(season_selected) + ".json"
  //     ajax_call_select_ni = $.ajax({
  //     url: url_select,
  //     dataType: 'json',
  //     crossDomain: true, // enable this
  //   })
    
  // $.when(ajax_call_select_ni).done(function(data1){
  //   ScatterPlotNI(data1,x_axis_ni[String(season_selected)],y_axis_ni[String(season_selected)])
  // })
     
    // Draw Chart SI
  //   season_selected = 2000
  //       url_select = "http://www.sway-blog.be/data/nba-scoring-index/SI/" + String(season_selected) + ".json"
  //     ajax_call_select_si = $.ajax({
  //     url: url_select,
  //     dataType: 'json',
  //     crossDomain: true, // enable this
  //   })
    
  // $.when(ajax_call_select_si).done(function(data1){
  //   chart_data = data1
  //   ScatterPlotSI(data1,x_axis_si[String(season_selected)],y_axis_si[String(season_selected)])
  // })
   
   ScatterPlotSI_total(scatterplot_si_total,x_axis_si_total,y_axis_si_total, name_selected)
   
    // Create tables
    $.ajax({
        url: "/js/bootstrap.table.js",
        dataType: 'script',
        // success: success,
        // async: false
      }).done(function() {
    
    // Narcissism Index Table
    // Player, Season, Team, TS%, TS%_rot, FGA, NI
    // table_string = "<table id='nba-ni-table' data-height='500' data-search='true' data-sort-name='NI' data-sort-order='desc'>"+"<thead><tr>" + 
    //                 "<th data-field='Player' data-sortable='true'>Player</th>" + 
    //                 "<th data-field='Season' data-sortable='true'>Season</th>" + 
    //                 "<th data-field='Age' data-sortable='true'>Age</th>" + 
    //                 "<th data-field='Team' data-sortable='true'>Team</th>" + 
    //                 "<th data-field='TS%' data-sortable='true'>TS%</th>" + 
    //                 "<th data-field='TS%_rot' data-sortable='true'>TS%<sub>Team</sub></th>" +
    //                 "<th data-field='TS%_league' data-sortable='true'>TS%<sub>League</sub></th>" +
    //                 "<th data-field='FGA' data-sortable='true'>FGA</th>" +
    //                 "<th data-field='NI' data-sortable='true'>NI</th>" +
    //                 "</tr></thead>" + "</table>"
                    
    // $("#nba-ni-table-wrapper").append(table_string)    

    // // Initialize table
    // $('#nba-ni-table').bootstrapTable({
    //     data: nba_ni_table
    //     // height: 200
    // });
    
    // Scorers Index Table Career
    // Player, Season, Team, TS%, TS%_rot, FGA, NI
    table_string = "<table id='nba-si-career-table' class='si-table' data-height='500' data-search='true' data-sort-name='Rank' data-sort-order='asc'>"+"<thead><tr>" + 
                    "<th data-field='Rank' class='col-lg-1' data-sortable='true'> </th>" +
                    "<th data-field='Player' class='col-lg-8' data-sortable='true'>Player</th>" + 
                    // "<th data-field='Teams' data-sortable='true'>Team(s)</th>" + 
                    "<th data-field='Active' class='col-lg-2' data-sortable='true'>Active</th>" + 
                    "<th data-field='SI'class='col-lg-1' data-sortable='true'>SI</th>" +
                    "</tr></thead>" + "</table>"
                    
    $("#nba-si-career-table-wrapper").append(table_string)    

    // Initialize table
    $('#nba-si-career-table').bootstrapTable({
        data: nba_si_table_career
        // height: 200
    });
    
      // Scorers Index Table Season
    // Player, Season, Team, TS%, TS%_rot, FGA, NI
    table_string = "<table id='nba-si-season-table' class='si-table' data-height='500' data-search='true' data-sort-name='Rank' data-sort-order='asc'>"+"<thead><tr>" + 
                    "<th data-field='Rank' class='col-lg-1' data-sortable='true'> </th>" +
                    "<th data-field='Player' class='col-lg-6' data-sortable='true'>Player</th>" + 
                    "<th data-field='Team' class='col-lg-2' data-sortable='true'>Team</th>" + 
                    "<th data-field='Season' class='col-lg-2' data-sortable='true'>Season</th>" + 
                    "<th data-field='SI'class='col-lg-1' data-sortable='true'>SI</th>" +
                    "</tr></thead>" + "</table>"
                    
    $("#nba-si-season-table-wrapper").append(table_string)    

    // Initialize table
    $('#nba-si-season-table').bootstrapTable({
        data: nba_si_table_season
        // height: 200
    });

});

// // Slider Charts
// $("#chart_slider").slider({
//   	formatter: function(value) {
// 		return 'NBA Season ' + value + "-" + String(parseInt(value)+1).slice(2,4);
// 	},
// 	value: season_selected,
// 	tooltip: 'always',
// 	tooltip_position:'bottom'
// });

// ChangeScatterPlotSI = function() {
//     season_selected = r.getValue()
//         url_select = "http://www.sway-blog.be/data/nba-scoring-index/SI/" + String(season_selected) + ".json"
//       ajax_call_select_si = $.ajax({
//       url: url_select,
//       dataType: 'json',
//       crossDomain: true, // enable this
//     })
    
//   $.when(ajax_call_select_si).done(function(data1){
//     chart_data = data1
//     ScatterPlotSI(data1,x_axis_si[String(season_selected)],y_axis_si[String(season_selected)])
//   })
   
// };

// var r = $('#chart_slider').slider()
// 		.on('slide', ChangeScatterPlotSI)
// 		.on('click', ChangeScatterPlotSI)
// 		.data('slider');
		
});
</script>
<script>
function naamClick() {
  search = 1
    // Check if names in library
    name_selected = $("#input_name_nba_si").val()
    
    if (players_scatterplot_si_total.indexOf(name_selected) == -1) {
      name_selected = ""
        return;
    }  
    
    // Show results    
    ScatterPlotSI_total(scatterplot_si_total,x_axis_si_total,y_axis_si_total, name_selected)
   
}
</script>
<script>
    function make_blank (oInput)
    {
        if (!('placeholder' in oInput))
            oInput.placeholder = oInput.value;
        if (oInput.value != oInput.placeholder)
            oInput.value = '';
    }

    function restore_placeholder (oInput)
    {
        if (search == 0) {
            if (oInput.value == '' && 'placeholder' in oInput)
                oInput.value = 'Search for NBA Player';
        } else {
             if (oInput.value == '' && 'placeholder' in oInput)
                oInput.value = name_selected;           
        }
    }
</script>

<!--Explanation about methodology-->
Who is the best scorer in NBA history? 
An interesting, difficult and provocative question which, like all of its kind, 
will lead to drawn-out discussions leaving all participants bereft of any joy for life.
Having witnessed a couple of those, I've come to think of it as my responsability to answer this question once and for all.

Although there've been many attempts, some more intriguing than others, I've not been convinced by any of them.
The good ones, aka the data-driven ones, either focus too much on a singular metric such as PPG production or fail to incorporate a good way of comparing
across decades of professional basketball.
The bad ones disqualify themselves because they are all written after a great or terrible performance by one player in one playoff game.
And playoff emotion doesn't lend itself to a good, rational analysis.
They also tend to either greatly overestimate players from older generations, the "Michael Jordan is God" school of thought,
or underestimate them, the "Player X has No Rings" mantra. Both of which ofcourse are totally irrelevant to a player's scoring ability.

<!--<iframe width="560" height="315" src="https://www.youtube.com/embed/gvS9qPYDXog" frameborder="0" allowfullscreen></iframe>-->

To be clear: I'm only interested in scoring. Rebounding, passing or defense play no role in this analysis. 
Maybe someone is a great individual scorer but ruins the offensive efficiency of his team (looking at you Adrian Dantley), or lets his matchup score at will. 
So be it. I'm just looking for the best scorer.

I've coined the metric I'm using to rank players the **Scoring Index** (SI). For a full overview of the rationale behind it, click methodology below.
Basically, it's a metric that combines the PPG and TS% of a player, while also taking into account the league average TS% of that year (or an entire career).
Let's check out who the best scorers in NBA history<a href="#comment1"><sup>1</sup></a> are. Only players who've scored over 20 PPG for their career and have played at least 5 seasons in the NBA are eligible (63 players in total). 

<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingOne">
      <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
        <h4 class="panel-title" style="text-align:center;">
          Methodology
        </h4>
      </a>
    </div>
    <div id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne" aria-expanded="false" style="height: 0px;">
      <div class="panel-body">
        <!--<p class="methodology">WARNING: Only read this part if you willing to use a small part of your brain for 20 seconds.</p>-->
        
        <p class="methodology">How do we get a good metric for scoring ability? 
        Well, for starters, the two most basic metrics for valuing a scorer, Points per Game (PPG) and True Shooting Percentage (TS%), have to be included.
        However, just using TS% skews the analysis towards players who played in an era with a high league average TS%.
        For instance: a player with a 60 TS% in the 2014-15 season, when the league average was 50.7 percent is not at all equivalent to
        a player with the same efficiency in the 1949-50 season, when the league average was 38.6 percent. 
        In 2014-15 this player was 18 percent more efficient than average, while in 1949-50 it was 55 percent.</p>
        
        <p class="methodology">It's clear to see that this player was way more dominant and valuable in 1949 than in 2014.
        Adjusting for this is easy enough: let's substract the league average TS% from the TS% of a player, and divide this by the league average TS%.
        This also means that, if you score at the efficiency of the average player, your SI is zero.</p>
        
        <p class="methodology">Finally, let's weigh this efficiency by the amount of Field Goal Attempts (FGA) a player takes per season, and multiply it by the PPG average of the player's entire career.
        The idea behind this is pretty simply: scoring more points at the same efficiency makes you a better scorer.
        So this is what the Scoring Index looks like:</p>
        
        $$
        \begin{align}
        \boxed{SI = \frac{PPG_{Career}}{FGA_{Career}}*\sum\limits_{i=First\,Year}^{Last\,Year} \Bigg[FGA_i *\frac{TS\%_{i}-TS\%_{i,league}}{TS\%_{i,league}}\Bigg]}
        \\
        \scriptsize{TS\%_{i}={TS\%\,of\,Player\,in\,Year\,i}}
        \\
        \scriptsize{TS\%_{i,league}={League\,Average\,TS\%\,in\,Year\,i}}
        \\
        \scriptsize{FGA_i={Field\,Goal\,Attempts\,of\,Player\,in\,Year\,i}}
        \end{align}
        $$
        </div>
    </div>
  </div>
</div>


<hr style="border-width:3px">
<hr style="border-width:3px">

<!--<div id="nba-ni-table-wrapper"></div>-->
<!--<br clear = "all">-->

<div id="nba-si-career-table-wrapper"></div>
<br clear = "all">

The best scorer of all time is ... **Wilt Chamberlain**! 

The picture at the top of this article might have given it away, but I don't think it's a surprise to many people. 
He's a player that needs little introduction: the only one to score 100 points in a single NBA game and average more than 50 PPG in a season.
He won the scoring title seven times, and led the league in field goal percentage 9 times. 
Although he was very efficient, it is mainly the sheer volume that makes him stand out.

The rest of the list contains no big surprises.
SI loves the older generation, probably because being a freak of nature netted you a bigger advantage in 1950, 
when being 6'10'' was considered giant and African Americans were just coming into the league.

<!--<div id="nba-scatterplot-ni-container" style="min-width: 310px; height: 400px; max-width: 800px; margin: 0 auto"></div>-->

If we look at active players, one name stands out: **Kevin Durant**. We are witnessing an absolute scoring genius, 
dominating the league like all time greats Jerry West, George Mikan or Kareem Abdul-Jabbar.

And let's not forget to mention LeBron James as an all-around scorer. Better than Michael Jordan, much better than Kobe Bryant.
Speaking of Kobe Bryant: SI rates him as an average scorer, coming in 29th with a 2.9 SI.
Although he's never been the darling of the stats community, it's still surprising to see the gap between his reputation and his actual numbers.
Contemporary players such as Dwayne Wade, Dirk Nowitzki, Paul Pierce, Lebron James and Kevin Durant are all better at scoring the basketball.
I guess this shows how being on very good teams and winning 5 championships can cloud the public's eye. 

And last but not least, there are currently two players in the league who 
should be considered among the worst first option scorers in NBA history. 
Their names? Russell Westbrook and Derrick Rose.
Both are athletic point guards, both are incredibly entertaining to watch, but both are only marginally more efficient than league average at scoring the basketball.

So for now we've analyzed entire careers, but it can also be interesting to look at individual seasons:

<hr style="border-width:3px">
<hr style="border-width:3px">

<div id="nba-si-season-table-wrapper"></div>
<br clear = "all">

All hail Wilt Chamberlain's 1961-62 season, in which he averaged 50 very efficient PPG. 
The rest of the top 10 is also mostly populated by well known inside forces from a different basketball era. 

Although, if you look closer, there's also a player named **Alex Groza**. Who, you ask?

Probably unknown to 99,99 percent of NBA fans (myself included), this guy averaged 22.5 PPG at a 55.5 TS% for the Indianapolis Olympians. 
Solid numbers by today's standard, but absolutely absurd in 1950 when the league was averaging 39 TS%. 
He won Rookie of the Year and was well on his way to a fantastic career, but was thrown out of the league after two seasons as a consequence of a point shaving scandal during his Kentucky days.
This is a whole separate story in itself, and probably the reason why his name is not known to many people.
His career SI stands at 9, which would make him the best scorer of all time by a landslide. 
However, because of my arbitrary rule that a player should last at least 5 NBA seasons, he is not in the list.
 
Regardless, this man deserves to have his picture up here. (It's pretty small, but it's the only one I could find of him as an Indianapolis Olympian.)

<div style="text-align:center;"><img style="display:block;margin:auto;" src="/img/Groza-INO.jpg"></div>

The best scoring season by a modern wing player has been Kevin Durant's 2012-13 season. 
I would be upset by the fact that he didn't win MVP that year, were it not that LeBron James took the prize.
He also had a crazy scoring year, ranking 31st in NBA history.

Basketball God Michael Jordan has 3 seasons in the top 100, all from his days as a high flying, Detroit Pistons hating eighties kid. 

Kobe Bryant did not have a top 100 scoring season, but apart from LeBron James and Kevin Durant only 5 
players managed a top 100 scoring season in NBA history after 2000. 
These are inside forces Stoudemire and Shaq, and three point wizards Ray Allen, Stephen Curry and Peja Stojakovic.

So in case you didn't know it yet: long 2's are bad, very bad.

<hr style="border-width:3px">
<hr style="border-width:3px">

Finally, here's a graph showing the PPG average vs the weighted efficiency for all the seasons in which a players scored more than 20 PPG.
Basically, the x-axis tells you something about a player's efficiency at scoring the basketball, and the y-axis tells you something about his volume.
You can also look for an individual player.

<div id="input_row" class="row" style="text-align:center;">
    <div id = "input_naam_wrapper" class="col-lg-12 col-lg-offset-0 col-sm-12 col-xs-12">
        <form>
            <input id="input_name_nba_si" type="text" style="text-align:center;font-weight:bold;"/>
            <input id="input_name_nba_si_button" type="submit" onclick="naamClick()" style="position: absolute; left: -9999px; width: 1px; height: 1px;"/>
        </form>
    </div>
</div>
<br>
<div id="nba-scatterplot-si-container" style="min-width: 310px; height: 400px; max-width: 800px; margin: 0 auto"></div>

<div class="row">
<div class="col-lg-12 col-lg-offset-0">
<br>
<hr style="border-width:3px">
<a name ="comment1" style="text-decoration:none;font-size:15px;">1 - All data from </a><a href="http://www.basketball-reference.com/" style="text-decoration:underline;font-size:15px;">Basketball Reference</a><a style="text-decoration:none;font-size:15px;"></a><br>
</div>
</div>