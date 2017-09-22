---
layout: post-lg-header-title-box-col-lg-8
title: "Who Is the Most Dominant Winner in Tour de France History?"
subtitle: "And Was He Doping?"
categories: [posts,cycling]
tags: [cycling, Tour de France, doping, Armstrong]
alias: [/2015/07/20/]
author: "Willem Lenaerts"
utilities: highlight
header-img: "img/armstrong.jpg"
thumbnail-img: "img/armstrong.jpg"
---
<!--<script type="text/javascript" src="/js/jQuery/jquery-1.11.1.min.js"></script>-->
<link rel="stylesheet" type="text/css" href="/css/custom.css" />
<link rel="stylesheet" type="text/css" href="/css/bootstrap.table.css" />
<link rel="stylesheet" type="text/css" href="/css/projects/tdf/tdf.css" />
<script src="/js/moment/moment.js"></script>

<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
<script src="/js/jQuery-ui/jquery-ui.min.js"></script>

<!--Javascript scatter plot-->
<script src="/js/highcharts/highcharts.js"></script>
<script src="/js/tdf/tdf-scatterplot.js"></script>

<!-- mathjax config similar to math.stackexchange -->
<script type="text/x-mathjax-config">
MathJax.Hub.Config({
  jax: ["input/TeX", "output/HTML-CSS"],
  displayAlign: "left",
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
  tdf_table = {{ site.data.tdf.tdf_table | jsonify }}
  stage_table = {{ site.data.tdf.stage_table | jsonify }}
  scatterplot_tdf = {{ site.data.tdf.scatter_plot_tdf | jsonify }}
  x_axis_tdf = {{ site.data.tdf.x_axis_tdf | jsonify }}
  y_axis_tdf = {{ site.data.tdf.y_axis_tdf | jsonify }}
  winners_tdf = {{ site.data.tdf.winners_tdf | jsonify }}
  rpi = {{ site.data.tdf.rpi | jsonify }}
  ci = {{ site.data.tdf.ci | jsonify }}
  tti = {{ site.data.tdf.tti | jsonify }}
</script>
<script>
</script>
<script>
$(window).resize(function() {
  $('#tdf-table').bootstrapTable('resetView')
  $('#stage-table').bootstrapTable('resetView')
})
  $( document ).ready(function() {
    // Accordion Methodology
    // $("#accordion").accordion();
    // Name selected for tdf SI chart
    name_selected = ""
    search = 0
    // Add 3 attributes to input form (this eliminates need for label to ask for "name?")
        $('#input_name_tdf').attr("value","Search for TdF Rider");
        $('#input_name_tdf').attr("onfocus","make_blank(this);");
        $('#input_name_tdf').attr("onblur","restore_placeholder(this);");

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
            Y.one('#input_name_tdf').plug(Y.Plugin.AutoComplete, {
                resultFormatter : nameFormatter,
                resultFilters    : 'phraseMatch',
                resultHighlighter: 'phraseMatch',
                source           : winners_tdf ,
                maxResults: 5,
                minQueryLength: 3
            });
            
    });
    
    // Initialize Charts
    rpi_chart(rpi)
    ScatterPlotTdF_total(scatterplot_tdf,x_axis_tdf,y_axis_tdf, name_selected)
    
    // Create tables
    $.ajax({
        url: "/js/bootstrap.table.js",
        dataType: 'script',
        // success: success,
        // async: false
      }).done(function() {
    
    // TdF Table
    // Year, TourWinner, TimeTrialIndex, ClimbIndex, RelativePowerIndex
    table_string = "<table id='tdf-table' class='tdf-table' data-height='500' data-search='true' data-sort-name='RelativePowerIndex' data-sort-order='desc'>"+"<thead><tr>" + 
                    "<th data-field='Year' class='col-lg-2' data-sortable='true'>Year</th>" + 
                    "<th data-field='TourWinner' class='col-lg-4' data-sortable='true'>Tour Winner</th>" + 
                    "<th data-field='TimeTrialIndex' class='col-lg-2' data-sortable='true'>TTI</th>" + 
                    "<th data-field='ClimbIndex' class='col-lg-2' data-sortable='true'>CI</th>" + 
                    "<th data-field='RelativePowerIndex' class='col-lg-2' data-sortable='true'>TI</th>" +
                    "</tr></thead>" + "</table>"
                    
    $("#tdf-table-wrapper").append(table_string)    

    // Initialize table
    $('#tdf-table').bootstrapTable({
        data: tdf_table
        // height: 200
    });
    
    // Stage Table
    // Year, Date, TourWinner, Stage, Type, RelativePowerIndexperStage
    table_string = "<table id='stage-table' class='stage-table' data-height='500' data-search='true' data-sort-name='RelativePowerIndexperStage' data-sort-order='desc'>"+"<thead><tr>" + 
                    "<th data-field='Year' class='col-lg-1' data-sortable='true'>Year</th>" + 
                    "<th data-field='Stage' class='col-lg-1' data-sortable='true'>Stage</th>" + 
                    // "<th data-field='Date' class='col-lg-2' data-sortable='true'>Date</th>" + 
                    "<th data-field='TourWinner' class='col-lg-8' data-sortable='true'>Tour Winner</th>" + 
                    "<th data-field='Type' class='col-lg-1' data-sortable='true'>Type</th>" + 
                    "<th data-field='RelativePowerIndexperStage' class='col-lg-1' data-sortable='true'>TIs</th>" +
                    "</tr></thead>" + "</table>"
                    
    $("#stage-table-wrapper").append(table_string)    

    // Initialize table
    $('#stage-table').bootstrapTable({
        data: stage_table
        // height: 200
    });
});

});
</script>
<script>
function naamClick() {
  search = 1
    // Check if names in library
    name_selected = $("#input_name_tdf").val()
    
    if (winners_tdf.indexOf(name_selected) == -1) {
      name_selected = ""
        return;
    }  
    
    // Show results    
    ScatterPlotTdF_total(scatterplot_tdf,x_axis_tdf,y_axis_tdf, name_selected)
   
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
                oInput.value = 'Search for TdF Rider';
        } else {
             if (oInput.value == '' && 'placeholder' in oInput)
                oInput.value = name_selected;           
        }
    }
</script>
<!--Explanation about methodology-->
For cycling fans, July is the best month of the year. 
As the riders of the Tour de France undergo the torture of thousands of miles of French roads, fans can enjoy the beautiful scenery, medieval castles, and, most of all, the intense competition.
Since its inception in 1903 we've seen the likes of Fausto Coppi, Jacques Anquetil, Eddy Merckx, Bernard Hinault and many, many more dominate the sport. 
But how do we know who's the best among them? Unfortunately, most of these greats never competed against eachother.
In an effort to try and find out, I've devised a metric to compare Tour de France winners, independent of the era in which they rode.
And in the process we might learn a thing or two about doping.

Click on methodology below to find out how the metric works. 
In short, here's what's important:
the Climbing Index (CI) defines how much stronger the winner of the Tour de France was in mountain stages than the rest of the top 10 in the end classification of the Tour.
The same rationale applies to the Time Trial Index (TTI).
The sum of these two, let's call it the Tour Index (TI), defines the overall strength of the Tour de France winner.
So without further ado, let's go to the results.

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
        <p class="methodology">For starters, we need to get all the data.
        There is an abundance of data at <a href="http://www.letour.fr/us/" style="text-decoration:underline;color:inherit;">the official tour de france site</a>, but this is not always complete and in some cases wrong.
        However, combined with data from <a href="https://www.cyclingdatabase.com/" style="text-decoration:underline;color:inherit;">Cycling Database</a> and Wikipedia it's possible to get a complete set of data for all TdF's after World War 2.
        The analysis will be confined to those years.
        </p>
        
        <p class="methodology">So how do we develop a metric to quantify the dominance of a Tour de France winner?
        First of all, it's important to limit the metric to two types of stages: individual time trials (ITT) and mountain stages (MS).
        It's there that classification riders battle it out, not in the flat rides or team time trials.
        Extra advantage of this choice is that mechanical issues or crashes that might have occured in flat stages play no role. 
        They do not reveal any information about the strength of a rider and should thus be ignored.</p>
        
        <p class="methodology">The next question we have to answer is: who are we comparing the winner to? 
        Every year there are at most 10-15 riders with a legitimate chance of winning the Tour. They are the only ones to focus on the general classification, 
        so we only have to take them into account.</p> 
        
        <p class="methodology">Working back from the top riders in the end classification (the top 10, for example), we can calculate our metric.
        For sndividual time trials, we're calculating the time the eventual winner of the Tour took (or lost) on the 9 other riders. 
        We take the average and divide this by the length of the time trial to get the Time Trial Index.
        It gives us the number of seconds per kilometer the Tour de France winner took (or lost) on average versus the rest of the top 10 in Individual Time Trials.</p>
        
        $$
        \begin{align*}
        \boxed{TTI = \frac{1}{N-1}*\sum\limits_{i=1}^{ITT} \Bigg[\frac{1}{KM_i} *\sum\limits_{j=2}^N (T_{i,j} - T_{i,1})\Bigg]}
        \\
        \scriptsize{T_{i,j}={Time\,of\,Rider\,j\,in\,Stage\,i}}
        \\
        \scriptsize{N={Number\,of\,Competitors\,to\,Consider}}
        \\
        \scriptsize{ITT={Number\,of\,Individual\,Time\,Trials}}
        \\
        \scriptsize{KM_i=Length\,of\,ITT_i}
        \end{align*}
        $$
        
        <p class="methodology">A Climbing Index (CI) for mountain stages can be calculated in the same way, except that it's not straightforward to define what distance to use.
        Most mountain stages only become a mano a mano fight for the last 10 km's of the last mountain.
        So instead we normalize this index by using a distance of 100 km. This ensures that the sum of the CI during the 1946-2015 period is approximately the same as the TTI.
        The CI can then be defined as follows:
        </p>
        
        $$
        \begin{align*}
        \boxed{CI = \frac{1}{N-1}*\sum\limits_{i=1}^{MS} \Bigg[\frac{1}{100} *\sum\limits_{j=2}^N (T_{i,j} - T_{i,1})\Bigg]}
        \\
        \scriptsize{T_{i,j}={Time\,of\,Rider\,j\,in\,Stage\,i}}
        \\
        \scriptsize{N={Number\,of\,Competitors\,to\,Consider}}
        \\
        \scriptsize{MS={Number\,of\,Mountain\,Stages}}
        \end{align*}
        $$
        
        <p class="methodology">Finally, the strength of the winner is the sum of his prowess in Time Trials and Mountain Stages:</p>
        
        
        $$
        \begin{align}
        \boxed{TI = TTI + CI}
        \end{align}
        $$
        </div>
    </div>
  </div>
</div>

<hr style="border-width:3px">
<hr style="border-width:3px">

<div id="tdf-table-wrapper"></div>
<br clear = "all">

<!--Explanation about stages-->
The most dominant winner in Tour the France history is ... **Fausto Coppi**!

He wins by a landslide, ahead of Louison Bobet and Bernard Thevenet. 
His win in 1949 marks not only the most dominant time trial performance ever, slightly edging Jacques Anquetil,
but it's also the most dominant climbing performance by any Tour de France winner after World War 2.
As all modern cycling fans know, this type of dominance is a very suspicious thing in cycling.
And judging by what some of his competitors said at the time, it's safe to say that this was not just a natural dominance:

> "He set the pace in drug-taking."
>
> — Wim Van Est

> "Coppi was the first I knew who took drugs."
>
> — Rik Van Steenbergen

When a reporter once asked Coppi what it takes to become such a great champion, he answered
"ride your bike, ride your bike, ride your bike", a statement that is eerily reminiscent of one made by another doper, Lance Armstrong,
who <a href="https://www.youtube.com/watch?v=MIl5RxhLZ5Uin" style="text-decoration:underline;color:inherit;">famously made a Nike commercial</a> in which he taunts his critics by saying the only thing he's "on" is his bike.
In fairness to Coppi, he did admit to doping. When asked by a journalist if he ever took the amfetamine cocktail called La Bomba he answered "Yes. Whenever it was necessary".

As we can see by the top 10 of the list, the early years after World War 2 were clearly not the most competitive.
It's impossible to say this was all a consequence of some cyclists doping more than others, 
but the only "modern" names to show up in the top 10 of the ranking are Miguel Indurain and Lance Armstrong. No comment.

<div id="rpi-container" style="min-width: 310px; height: 400px; max-width: 800px; margin: 0 auto"></div>

Looking at the evolution of TI over the years in the graph above, we can be a little bit optimistic about the current state of cycling.
During the 15 EPO years, starting with Indurain at the beginning of the nineties and ending with the Armstrong era,
there were 10 Tour wins with a TI over 6, and 3 with a TI over 9.
In the 10 year since, there's only been one over 6, the 2012 victory of Bradley Wiggins with a 6.4 TI.
So it's safe to say that the Tour de France has become much more competitive.
And while this is not nearly enough evidence to say that doping is gone, there was a man named Floyd Landis in 2006, it might be a sign of its waning influence.

There have been three Tour de France winners with a negative TTI, Bartali, Walkowiak and Bahamontes, and one with a negative CI, Janssen.
Walkowiak is the only Tour winner with a negative TI. How is that even possible? Well, he did not win the Tour in mountain stages or time trials, but instead he 
laid the foundation for his victory in a long escape during the flat seventh stage of the 1956 Tour. As he was not known to be a classification rider, 
he was given more than 18 minutes of advantage on the favourites. A move that proved to be fatal as they could not close the gap before the end of the Tour.

Using the TI rationale we can also analyse individual stages. Let's check it out.

<hr style="border-width:3px">
<hr style="border-width:3px">

<div id="stage-table-wrapper"></div>
<br clear = "all">

The stage in which the later Tour de France winner most dominated his opponents was the 21st stage of the 1958 Tour.
In a gruesome mountain stage from Briançon to Aix-les-Bain, the Luxembourger Charly Gaul obliterated his opponents:

> In stage 21, the weather conditions were bad. 
Before the stage started, Gaul told Bobet that he would attack on the first climb of the day, which he did. 
Bahamontes followed him, but let himself drop back because the weather was too bad and the finish was still far away. 
Gaul continued on his own, and his margin with the next cyclist kept growing. 
Géminiani now asked the French national team to help him, but they could not help and did not want to help. 
Géminiani forgot to take food in the food zone, and was hungry in the last part of the stage. 
In the end, Gaul won the stage almost 8 minutes ahead of the next rider.
Favero came in third, more than ten minutes later, and Géminiani seventh more than 14 minutes behind. 
Favero was again first in the general classification, with Géminiani only 39 seconds behind in second place and Gaul 67 seconds behind in third place. 
After that stage, Géminiani accused the French team of treason, because he said it was due to their attacks that he lost the lead. 
Because of the extraordinary circumstances, the time limits were not enforced that stage. Second-placed rider Favero was now at a margin of more than three minutes.
>
>  — Source: Wikipedia

The first modern stage in the list is the 17th stage of the 2006 Tour. 
Cycling fans will remember this stage not only for Floyd Landis's very, very long attack, 
but also because it followed a stages in which he was all but knocked out of contention for Tour victory.
Even more, the 16th stage of the 2006 Tour is among the three lowest TI stages in Tour de France history.
So how is this possible? You guessed it: doping.


> Landis was wearing the maillot jaune prior to Stage 16, but then lost eight minutes and seemed finished. 
However, Landis spectacularly came back in Stage 17, winning the stage and cutting his deficit to leader Óscar Pereiro to half a minute. 
Overtaking him after the Stage 19 time trial, Landis was celebrated as the winner of the 2006 Tour de France.
On July 27, 2006, however, four days after Tour had finished, the Phonak Cycling Team announced Floyd Landis had a urine test come back positive, 
having an unusually high ratio of the hormone testosterone to the hormone epitestosterone (T/E ratio) after the epic performance in Stage 17.
>
> — Source: Wikipedia

Look for Tour de France winners below:

<hr style="border-width:3px">
<hr style="border-width:3px">

<div id="input_row" class="row" style="text-align:center;">
    <div id = "input_naam_wrapper" class="col-lg-12 col-lg-offset-0 col-sm-12 col-xs-12">
        <form>
            <input id="input_name_tdf" type="text" style="text-align:center;font-weight:bold;"/>
            <input id="input_name_tdf_button" type="submit" onclick="naamClick()" style="position: absolute; left: -9999px; width: 1px; height: 1px;"/>
        </form>
    </div>
</div>
<br>
<div id="tdf-scatterplot-container" style="min-width: 310px; height: 400px; max-width: 800px; margin: 0 auto"></div>

<!--With the omerta still very much a thing in the professional peloton, it's impossible to know all the intricacies of doping in cycling.-->
<!--What we can do is analyze how much a winner is dominating his peers, so that's the basis of the analysis.-->
<!--So apart from learning who the best cyclists in Tour de France history are, this analysis might tell us something about the state of cycling in 2015.-->
<!--Is it true that doping is still prevalent and influencing the race?-->



<!--Speaking of doping, notice that I'm not mentioning Lance Armstrong and several others who've been implicated in doping scandals.-->
<!--Heck, even most of the names I did mention above have their doping stories.-->
<!--Doping is a problem in every sport, but more so in an endurance sport like cycling.-->
<!--For fans, there were always three ways to deal with this:-->

<!--1. Assume there's no doping.-->
<!--2. Assume there's doping but, since everybody is using it, it's not a game changer. The winner is still the best cyclist, doping or no doping.-->
<!--3. Assume there's doping and assume it's influencing who's winning, but watch the Tour de France anyway.-->

<!--For any fan with a functioning memory, option one is not realistic. But for a long time option two was the subconscience argument many people made to keep watching and enjoying the sport.-->
<!--Even when Lance Armstrong suddenly reinvented himself as a classification rider, or when Bjarne Riis started dropping actual climbers in mountain stages.-->
<!--But then the Armstrong story broke and everyone realized that, to quote Animal Farm, all cyclists are equal, but some are more equal than others.-->
<!--We now know that the "professionality" of a doping program and the risks some cyclists are willing to take do have a big influence on the outcome of races.-->
<!--So collectively, cycling fans are now stuck with option three.-->
<!--This will also be the underlying rationale behind the analysis here. -->
<!--By developing a metric to quantify how much a rider is dominating his contemporaries we can not only compare riders across different decades, -->
<!--the main focus of this article, but we can also analyze the correlation between performances and known doping abuses.-->
<!--Because as all cycling lovers know: extreme dominance is a very suspicious thing in cycling.-->