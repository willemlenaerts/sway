// Make ScatterPlot NI

function ScatterPlotNI(season_data,x_axis,y_axis) {
    $('#nba-scatterplot-ni-container').highcharts({
        credits: {
            enabled: false
        },
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: ''
        },
        // subtitle: {
        //     text: 'basketball-reference.com'
        // },
        xAxis: {
            min: x_axis[0],
            max: x_axis[1],
            title: {
                enabled: true,
                text: 'FGA'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true,
            plotLines: [{
                    value: league_average[season_selected][1],
                    color: 'black',
                    // dashStyle: 'shortdash',
                    width: 2,
                    // label: {
                    //     text: 'TS% League Average'
                    // }
                }]
        },
        yAxis: {
            min: y_axis[0],
            max: y_axis[1],
            title: {
                text: 'TS%'
            },
            plotLines: [{
                    value: league_average[season_selected][0],
                    color: 'black',
                    // dashStyle: 'shortdash',
                    width: 2,
                    // label: {
                    //     text: 'TS% League Average'
                    // }
                }]
        },
        // legend: {
        //     layout: 'vertical',
        //     align: 'left',
        //     verticalAlign: 'top',
        //     x: 100,
        //     y: 70,
        //     floating: true,
        //     backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
        //     borderWidth: 1
        // },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '',
                    pointFormat: '<b>{point.player}</b><br>{point.team}<br>{point.x} FGA, {point.y} TS%'
                }
            }
        },
        series: [{
            name: 'NBA Data',
            color: 'rgba(223, 83, 83, .5)',
            data: season_data,
            showCheckbox: false
        }]
    });
};

// Make ScatterPlot SI

function ScatterPlotSI(season_data,x_axis,y_axis) {
    $('#nba-scatterplot-si-container').highcharts({
        credits: {
            enabled: false
        },
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: ''
        },
        // subtitle: {
        //     text: 'basketball-reference.com'
        // },
        xAxis: {
            min: x_axis[0],
            max: x_axis[1],
            title: {
                enabled: true,
                text: 'FGA'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true,
            // plotLines: [{
            //         value: league_average[season_selected][1],
            //         color: 'black',
            //         // dashStyle: 'shortdash',
            //         width: 2,
            //         // label: {
            //         //     text: 'TS% League Average'
            //         // }
            //     }]
        },
        yAxis: {
            min: y_axis[0],
            max: y_axis[1],
            title: {
                text: 'Scoring Index'
            },
            // plotLines: [{
            //         value: league_average[season_selected][0],
            //         color: 'black',
            //         // dashStyle: 'shortdash',
            //         width: 2,
            //         // label: {
            //         //     text: 'TS% League Average'
            //         // }
            //     }]
        },
        // legend: {
        //     layout: 'vertical',
        //     align: 'left',
        //     verticalAlign: 'top',
        //     x: 100,
        //     y: 70,
        //     floating: true,
        //     backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
        //     borderWidth: 1
        // },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(0,100,0)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '',
                    pointFormat: '<b>{point.player}</b><br>{point.team}<br>{point.x} FGA, {point.y} SI'
                }
            }
        },
        series: [{
            name: 'NBA Data',
            color: 'rgba(0,100,0,0.5)',
            data: season_data,
            showCheckbox: false
        }]
    });
};

function ScatterPlotSI_total(season_data,x_axis,y_axis, name_selected) {
    
    if (name_selected == "") {
        y_axis_max = 40
        for (i=0;i<season_data.length;i++) {
            season_data[i]["color"] = 'rgba(0,100,0,0.5)'
        }
    } else {
        if (name_selected == "Wilt Chamberlain") {
            y_axis_max = 60
        } else {
            y_axis_max = 40
        }
        for (i=0;i<season_data.length;i++) {
            if (season_data[i]["player"] == name_selected) {
                season_data[i]["color"] = 'rgba(0,100,0,0.8)'
            } else {
                season_data[i]["color"] = 'rgba(0,0,0,0.02)'
                // season_data[i]["events"] = {mouseOver: function () { return false;}}
            }
        }        
    }
    
    $('#nba-scatterplot-si-container').highcharts({
        credits: {
            enabled: false
        },
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: ''
        },
        // subtitle: {
        //     text: 'basketball-reference.com'
        // },
        xAxis: {
            min: x_axis[0],
            max: x_axis[1],
            title: {
                enabled: true,
                text: 'Efficiency compared to League Average [%]'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true,
            // plotLines: [{
            //         value: league_average[season_selected][1],
            //         color: 'black',
            //         // dashStyle: 'shortdash',
            //         width: 2,
            //         // label: {
            //         //     text: 'TS% League Average'
            //         // }
            //     }]
        },
        yAxis: {
            min: y_axis[0],
            max: y_axis_max,
            title: {
                text: 'PPG'
            },
            // plotLines: [{
            //         value: league_average[season_selected][0],
            //         color: 'black',
            //         // dashStyle: 'shortdash',
            //         width: 2,
            //         // label: {
            //         //     text: 'TS% League Average'
            //         // }
            //     }]
        },
        // legend: {
        //     layout: 'vertical',
        //     align: 'left',
        //     verticalAlign: 'top',
        //     x: 100,
        //     y: 70,
        //     floating: true,
        //     backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
        //     borderWidth: 1
        // },
        tooltip: {
            formatter: function() {
                console.log(this)
                if (name_selected == "") {
                    return '<b>'+ this.point.player +'</b><br/>'+
                    this.point.team + '<br/>' +
                    this.point.season + '<br/>' +
                    this.point.x +' EFF% | '+ this.point.y +' PPG';
                } else {
                    if (this.point.player == name_selected) {
                        return '<b>'+ this.point.player +'</b><br/>'+
                        this.point.team + '<br/>' +
                        this.point.season + '<br/>' +
                        this.point.x +' EFF% | '+ this.point.y +' PPG';                        
                    } else {
                        return false;
                    }                    
                }
            }
        },
        plotOptions: {
            scatter: {
                showCheckbox: false,
                showInLegend: false,
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: false,
                            lineColor: 'rgb(0,100,0)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                }
                // tooltip: {
                //     headerFormat: '',
                //     pointFormat: '<b>{point.player}</b><br>{point.team}<br>{point.season}<br>{point.x} EFF%, {point.y} PPG'
                // }
            }
        },
        series: [{
            name: 'NBA Data',
            data: season_data,
            showCheckbox: false,
            turboThreshold: 0
        }]
    });
};