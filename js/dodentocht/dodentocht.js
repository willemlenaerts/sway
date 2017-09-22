// Create Gauge Chart
function createGaugechart(names_selected, names_selected_position,participants) {
        $('#gauge_chart').highcharts({
                    chart: {
                        type: 'gauge',
                        backgroundColor: "rgba(0,0,0,0)",
                        plotBackgroundColor: "rgba(0,0,0,0)",
                        plotBorderColor: white,
                        plotBorderWidth: 0,
                        plotShadow: false
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: ''
                    },
                    pane: {
                        startAngle: -140,
                        endAngle: 140,
                        background: [{
                            borderWidth: 0,
                            backgroundColor: white
                        }]
                    },

                    // the value axis
                    yAxis: {
                        min: 1,
                        max: participants[0],
                        tickPositioner: function () {
                            var positions = [participants[0]-2000+1,participants[0]-4000+1,participants[0]-6000+1,participants[0]-8000+1,participants[0]-10000+1];
                            return positions;
                        },
                        labels: {
                            formatter: function() {
                                label_format = String((-this.value + participants[0]+1)/1000) + "k";
                                return label_format ;
                            },
                            style: {"color":"#000","fontFamily": "monospace, monospace","fontWeight":"normal","fontSize":"11px"}
                        },
                        title: {
                            text: ''
                        },
                        plotBands: [{
                            from: 1,
                            to: participants[0]-(participants[1]+1),
                            color: '#DF5353' // red
                        }, {
                            from: participants[0]-(participants[1]+1),
                            to: participants[0],
                            color: '#55BF3B' // green
                        }]
                    },

                    series: [{
                        name: 'Your-name',
                        data: [participants[0]-(names_selected_position[0]+1)],
                        dial: {
                            backgroundColor: your_name_color_opac_2,
                            baseWidth: 4,
                            topWidth: 2
                        },
                        dataLabels: {
                            y: 30,
                            color: your_name_color,
                            borderColor: your_name_color,
                            enabled: true,
                            formatter: function() {

                                return -this.y + participants[0] ;
                            },
                            style: {"fontFamily": "monospace, monospace","fontWeight":"bold", "fontSize":"14px"}

                        },
                        tooltip: {
                            pointFormat: "<b>" + names_selected[0] + ":</b><b> " + String(names_selected_position[0]+1) + "</b>/" + participants[0]
                        }
                    }]
                },

                // Add some life
                function (chart) {
                    if (!chart.renderer.forExport) {
                    }
                });
    }

// Create Comp Gauge Chart
function createGaugechart_comp(names_selected, names_selected_position,participants) {

    $('#gauge_chart').highcharts({

                chart: {
                    type: 'gauge',
                    backgroundColor: "rgba(0,0,0,0)",
                    plotBackgroundColor: "rgba(0,0,0,0)",
                    plotBorderColor: white,
                    plotBorderWidth: 0,
                    plotShadow: false
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: ''
                },
                pane: {
                    startAngle: -140,
                    endAngle: 140,
                    background: [{
                        borderWidth: 0,
                        backgroundColor: white
                    }]
                },

                // the value axis
                yAxis: {
                    min: 1,
                    max: participants[0],
                    tickPositioner: function () {
                        var positions = [participants[0]-2000+1,participants[0]-4000+1,participants[0]-6000+1,participants[0]-8000+1,participants[0]-10000+1];
                        return positions;
                    },
                    labels: {
                        formatter: function() {
                            label_format = String((-this.value + participants[0]+1)/1000) + "k";
                            return label_format ;
                        },
                        style: {"color":"#000","fontFamily": "monospace, monospace","fontWeight":"normal","fontSize":"11px"}

                    },


                    title: {
                        text: ''
                    },
                    plotBands: [{
                        from: 1,
                        to: participants[0]-(participants[1]+1),
                        color: '#DF5353' // red
                    }, {
                        from: participants[0]-(participants[1]+1),
                        to: participants[0],
                        color: '#55BF3B' // green
                    }]
                },

                series: [{
                    name: 'Your-name',
                    data: [participants[0]-(names_selected_position[0]+1)],
                    dial: {
                        backgroundColor: your_name_color_opac_2,
                        baseWidth: 4,
                        topWidth: 2
                    },
                    dataLabels: {
                        y: 30,
                        color: your_name_color,
                        borderColor: your_name_color,
                        enabled: true,
                        formatter: function() {
                            return -this.y + participants[0] ;
                        },
                        style: {"fontFamily": "monospace, monospace","fontWeight":"bold", "fontSize":"14px"}

                    },
                    tooltip: {
                        pointFormat: "<b>" + names_selected[0] + ":</b><b> " + String(names_selected_position[0]+1) + "</b>/" + participants[0]   }
                },
                    {
                        name: 'Compare',
                        color: comp_name_color,
                        data: [participants[0]-(names_selected_position[1]+1)],
                        dial: {
                            backgroundColor: comp_name_color_opac_2,
                            baseWidth: 4,
                            topWidth: 2
                        },
                        dataLabels: {
                            y: 60,
                            color: comp_name_color,
                            borderColor: comp_name_color,

                            enabled: true,
                            formatter: function() {

                                return -this.y + participants[0] ;
                            },
                            style: {"fontFamily": "monospace, monospace","fontWeight":"bold", "fontSize":"14px"}
                        },
                        tooltip: {
                            pointFormat: "<b>" + names_selected[1] + ":</b><b> " + String(names_selected_position[1]+1) + "</b>/" + participants[0]  }
                    }]
            },

            // Add some life
            function (chart) {
                if (!chart.renderer.forExport) {
                }
            });
};

// Create Radar Chart
function createRadarchart(colors,speed,speed_comp,posts) {
    var scaleSteps = 10;
    var scaleStartValue = 0;
    var speedMax = Math.max.apply(Math,speed);
    var speed_comp_Max = Math.max.apply(Math,speed_comp);
    var scaleStepWidth = Math.ceil((Math.max(speedMax,speed_comp_Max)/scaleSteps)*10)/10;
    var data = {
        labels: posts,
        datasets: [
            {
                label: "Snelheid",
                fillColor: colors[0][1],
                strokeColor: colors[0][0],
                pointColor: colors[0][0],
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: colors[0][0],
                data: speed
            },
            {
                label: "Gemiddelde Snelheid",
                fillColor: colors[1][1],
                strokeColor: colors[1][0],
                pointColor: colors[1][0],
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: colors[1][0],
                data: speed_comp
            }
        ]

    };

    var options = {

        multiTooltipTemplate: "<%=String(value).replace('.',',') + ' km/u'%>",

        scaleOverride: true,
        scaleSteps: scaleSteps,
        scaleStepWidth: scaleStepWidth,
        scaleStartValue: scaleStartValue,


        //String - Point label font declaration
        pointLabelFontFamily : "'monospace',monospace",

        //String - Point label font weight
        pointLabelFontStyle : "normal",

        //Number - Point label font size in pixels
        pointLabelFontSize : 11,

        //String - Point label font colour
        pointLabelFontColor : "#000",

        tooltipFontFamily: "'monospace',monospace",
        tooltipFontSize: 11,
        tooltipFontStyle: "normal",
        tooltipFontColor: "#fff",

        tooltipTitleFontFamily: "'monospace',monospace",
        tooltipTitleFontSize: 13,
        tooltipTitleFontStyle: "normal",
        tooltipTitleFontColor: "#fff"
    };

    ctx = document.getElementById("radar_chart").getContext("2d");
    myRadarChart = new Chart(ctx).Radar(data,options);
}

// Create Line Chart
function createLinechart(colors,time_graph,time_graph_comp) {
        var time_graph_ms = [];
        var time_graph_comp_ms = [];

        // count_2015 = 0;
        // count_2015_comp = 0;

        for (i = 0; i < time_graph.length; i++) {

            time_graph_ms[i] = moment(time_graph[i]).unix();
            time_graph_comp_ms[i] = moment(time_graph_comp[i]).unix();
            // if (time_graph_ms[i] >= 1420066800) {

            //     count_2015 = count_2015 + 1;
            // }
            // if (time_graph_comp_ms[i] >= 1420066800) {

            //     count_2015_comp = count_2015_comp + 1;
            // }
        }

        // Remove data points where participant had abandoned race
        // time_graph_ms = time_graph_ms.splice(0,time_graph_ms.length - count_2015);

        // Remove data points where participant had abandoned race
        // time_graph_comp_ms = time_graph_comp_ms.splice(0,time_graph_comp_ms.length - count_2015_comp);

        var data = {
            labels: posts,
            datasets: [
                {
                    label: "Tijd",
                    fillColor: colors[0][1],
                    strokeColor: colors[0][0],
                    pointColor: colors[0][0],
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: colors[0][0],
                    data: time_graph_ms
                },
                {
                    label: "Gemiddelde tijd",
                    fillColor: colors[1][1],
                    strokeColor: colors[1][0],
                    pointColor: colors[1][0],
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: colors[1][0],
                    data: time_graph_comp_ms
                }
            ]
        };

        var options = {
            //Go from unix millisecond value back to string, using moment.js

            // On the scale (y-axis), round to hours (startOf function - see moment.js for documentation)
            scaleLabel: "<%=moment.unix(value).startOf('hour').format('HH:mm')%>",

            // On the tooltips, give hours and minutes
            // For the moment, don't show tooltips
            // Error if we do:
            // Chart with 2 non finishers, trying to display tooltip where there is no data (the last posts)
            // Will use cached data (average) to display
            showTooltips: true,
            multiTooltipTemplate: "<%=moment.unix(value).format('HH:mm')%>",
            scaleFontFamily: "'monospace',monospace",
            scaleFontStyle: "normal",
            scaleFontColor: "#000",
            scaleFontSize: 11,

            tooltipFontFamily: "'monospace',monospace",
            tooltipFontSize: 11,
            tooltipFontStyle: "normal",
            tooltipFontColor: "#fff",

            tooltipTitleFontFamily: "'monospace',monospace",
            tooltipTitleFontSize: 13,
            tooltipTitleFontStyle: "normal",
            tooltipTitleFontColor: "#fff"
        };
        ctx = document.getElementById("line_chart").getContext("2d");
        myLineChart = new Chart(ctx).Line(data,options);
    }

// {#    All css styling done in javascript#}
function javascript_css() {

        // Set classes of table rows (for correct colors and hover specs)
        $('#dodentocht_table tbody tr').each(function() {
            // First column posts (neutral)
            $($(this)).find("td:eq(0),td:eq(1),td:eq(2),td:eq(3)").addClass("neutral");

            // Next two columns (your_name)
            $($(this)).find("td:eq(4),td:eq(5)").addClass("your_name");

            // Next two columns (comp_name)
            $($(this)).find("td:eq(6),td:eq(7)").addClass("comp_name");
        });
}

// {#    Fill table and fix representation issues#}
function fillTable(names_selected,names_selected_position,participants, time_total, speed_total, time_comp_total,speed_comp_total, posts,km,time,speed,time_comp,speed_comp, opgaves, inrace) {
        // Fill header of table
        $("#th_your_name").html(names_selected[0]);
        $("#th_comp").html(names_selected[1]);

        // Create 16 rows (dodentocht posts)
        // Loop over columns

        var r = new Array(), j = -1;
        for (i=0;i<=posts.length-1;i++) {
            // Initiate row
            r[++j] = '<tr id="tr_';
            r[++j] = String(i+1);
            r[++j] = '">';

            // Column 1
            r[++j] = '<td id="td_row_';
            r[++j] = String(i+1);
            r[++j] = '_column_1" class="post" style="border-right: 2px ' + neutral_color + 'solid">';
            r[++j] = posts[i];
            r[++j] = '</td>';

            // Column 2
            r[++j] = '<td id="td_row_';
            r[++j] = String(i+1);
            r[++j] = '_column_2" class="hidden-lg hidden-md hidden-xs" style="border-right: 1px ' + neutral_color + 'solid">';
            r[++j] = String(Math.round(km[i]*10)/10).replace(".",",");
            r[++j] = '</td>';

            // Column 3
            str_inrace = String(inrace[i]);
            if (str_inrace.length > 3) {
                str_inrace = str_inrace.slice(0,str_inrace.length-3) + "." + str_inrace.slice(str_inrace.length-3,str_inrace.length)
            }
            r[++j] = '<td id="td_row_';
            r[++j] = String(i+1);
            r[++j] = '_column_3" class="hidden-xs" style="border-right: 1px ' + neutral_color + 'solid">';
            r[++j] = str_inrace;
            r[++j] = '</td>';

            // Column 4
            str_opgaves = String(opgaves[i]);
            if (str_opgaves.length > 3) {
                str_opgaves = str_opgaves.slice(0,str_opgaves.length-3) + "." + str_opgaves.slice(str_opgaves.length-3,str_opgaves.length)
            }
            r[++j] = '<td id="td_row_';
            r[++j] = String(i+1);
            r[++j] = '_column_4" class="hidden-xs" style="border-right: 2px ' + neutral_color + 'solid">';
            r[++j] = str_opgaves;
            r[++j] = '</td>';

            // Column 5
            r[++j] = '<td id="td_row_';
            r[++j] = String(i+1);
            r[++j] = '_column_5" style="border-right: 1px ' + neutral_color + 'solid">';
            r[++j] = time[i];
            r[++j] = '</td>';

            // Column 6
            r[++j] = '<td id="td_row_';
            r[++j] = String(i+1);
            r[++j] = '_column_6" style="border-right: 2px ' + neutral_color + 'solid">';
            r[++j] = String(parseFloat(Math.round(speed[i] * 100) / 100).toFixed(1)).replace(".",",");
            r[++j] = '</td>';

            // Column 7
            r[++j] = '<td id="td_row_';
            r[++j] = String(i+1);
            r[++j] = '_column_7" style="border-right: 1px ' + neutral_color + 'solid">';
            r[++j] = time_comp[i];
            r[++j] = '</td>';

            // Column 8
            r[++j] = '<td id="td_row_';
            r[++j] = String(i+1);
            r[++j] = '_column_8">';
            r[++j] = String(parseFloat(Math.round(speed_comp[i] * 100) / 100).toFixed(1)).replace(".",",");
            r[++j] = '</td>';

            // End row
            r[++j] = '</tr>';
        }

        // Add last row Totaal
        r[++j] ='<tr><td id="td_table_totaal" class="post"><b>Totaal</b></td><td class="hidden-lg hidden-md hidden-xs"></td><td id="td_table_totaal_inrace" class="hidden-xs"></td><td id="td_table_totaal_opgaves" class="hidden-xs"></td><td id="td_table_totaal_tijd"></td><td id="td_table_totaal_snelheid"></td><td id="td_table_totaal_tijd_comp"></td><td id="td_table_totaal_snelheid_comp"></td></tr>';

        $('#dodentocht_table tbody').html(r.join(''));

        // Fill footer of table (Totaal)
        $('#td_table_totaal_inrace').html("<b>" + String(inrace[inrace.length-1])+ "</b>");

        var opgaves_totaal = 0;
        $.each(opgaves,function() {
            opgaves_totaal += this;
        });
        $('#td_table_totaal_opgaves').html("<b>" + String(opgaves_totaal)+ "</b>");

        // Als deelnemer niet aangekomen, zet "-" in tabel bovenaan
        if (Math.round(names_selected_position[0]) > Math.round(participants[1]) ) {
            $('#td_table_totaal_tijd').html("<b>-</b>");
            $("#td_table_totaal_snelheid").html("<b>-</b>");
        }
        else {
            $('#td_table_totaal_tijd').html('<b>'+time_total+'</b>');
            $("#td_table_totaal_snelheid").html('<b>'+parseFloat(Math.round(speed_total * 100) / 100).toFixed(1)+'</b>');
        }

        if (Math.round(names_selected_position[1]) > Math.round(participants[1]) ) {
            $('#td_table_totaal_tijd_comp').html("<b>-</b>");
            $("#td_table_totaal_snelheid_comp").html("<b>-</b>");
        }
        else {
            $('#td_table_totaal_tijd_comp').html('<b>'+time_comp_total+'</b>');
            $("#td_table_totaal_snelheid_comp").html('<b>'+parseFloat(Math.round(speed_comp_total * 100) / 100).toFixed(1)+'</b>');
        }

        // Fix issues
        // Check if speed is 0.0, change to - (and change time to -)
        // First row, always to "-"
        $("#td_row_1_column_4").html("-");
        $("#td_row_1_column_6").html("-");
        $("#td_row_1_column_8").html("-");
        // Next rows
        for (i = 2; i <= 16; i++) {
            // First name
            td = "#td_row_" + String(i) + "_column_6";
            if ($(td).html() == "0.0") {
                $(td).html("-");
                // Also make time column "-"
                td = "#td_row_" + String(i) + "_column_5";
                $(td).html("-");
            }

            // Second name
            td = "#td_row_" + String(i) + "_column_8";
            if ($(td).html() == "0.0") {
                $(td).html("-");
                // Also make time column "-"
                td = "#td_row_" + String(i) + "_column_7";
                $(td).html("-");
            }


        }

        // If opgaves = 0 ==> "-"
        for (i = 2; i <= 16; i++) {
            // First name
            td = "#td_row_" + String(i) + "_column_4";
            if ($(td).html() == "0") {
                $(td).html("-");

            }
        }
    }