// Make RPI Chart
function rpi_chart(rpi) {
        $('#rpi-container').highcharts({
        credits: {
            enabled: false
        },
        chart: {
            type: 'area'
        },
        title: {
            text: ''
        },
        // subtitle: {
        //     text: 'Source: Wikipedia.org'
        // },
        xAxis: {
            tickPositions: [1950,1970,1990,2010],
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            },
            labels: {
                style: {
                    fontFamily: "Lora"
                }
            }
        },
        yAxis: {
            title: {
                text: 'TI'
            },
            labels: {
                style: {
                    fontFamily: "Lora"
                }
            }
            // labels: {
            //     formatter: function () {
            //         return this.value / 1000;
            //     }
            // }
        },
        tooltip: {
            style: {
                fontSize: "12px",
                fontFamily: "Lora",
            },
            formatter: function() {
                console.log(this)
                if (this.series.name == "TTI") {
                    return false;
                } else {
                    var s = "<table id='tooltip-table' style='font-size:12px !important'>"
                    s += "<tr><td colspan=2 style='text-align:center;'>" + "<b>" + "Tour de France " +  this.point.x +"</b>" + "</td></tr>"
                    s += "<tr><td colspan=2 style='text-align:center;border-bottom: 2px solid #000;'>" + this.point.TourWinner + "</td></tr>"
                    s += "<tr style='text-align:center;color:rgb(51,102,153)'><td class='col-lg-4'><b>TTI: </b>" + "</td><td class='col-lg-8'>" + this.point.TTI +  "</td></tr>"
                    s += "<tr style='text-align:center;color:rgb(255,173,59);border-bottom:1px solid #000;'><td class='col-lg-4'><b>CI: </b>"  + "</td><td class='col-lg-8'>" + this.point.y +  "</td></tr>"
                    s += "<tr style='text-align:center;'><td class='col-lg-4'><b>TI: </b>" + "</td><td class='col-lg-8'>"  + this.point.RPI +  "</td></tr>"
                    s += "</table>"
                    
                    return s;
                    
                    // return '<b>'+ "Tour de France " +  this.point.x +'</b><br/>'+
                    // '<br>' +
                    // "<b>Winner: </b>" + this.point.TourWinner + '<br/>' +
                    // "<b>TTI: </b>" + this.point.TTI + '<br/>' +
                    // "<b>CI: </b>" + this.point.y + '<br/>' +
                    // "<b>RPI: </b>" + this.point.RPI;
                }
                
            },
            useHTML: true
        },
        plotOptions: {
            area: {
                showCheckbox: false,
                showInLegend: false,
                stacking: 'normal',
                lineColor: 'rgba(0,0,0,0)',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666',
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
            }
        },
        series: [{
            name: 'CI',
            data: ci,
            color: "rgb(255,173,59)",
            showCheckbox: false,
            marker: {
                enabled: false
            }
        }, {
            name: 'TTI',
            data: tti,
            color: "rgb(51,102,153)",
            showCheckbox: false,
            marker: {
                enabled: false
            }
        }]
})
};

// Make ScatterPlot TdF
function ScatterPlotTdF_total(season_data,x_axis,y_axis, name_selected) {
    
    if (name_selected == "") {
        // y_axis_max = 40
        for (i=0;i<season_data.length;i++) {
            season_data[i]["color"] = 'rgba(0,100,0,0.5)'
        }
    } else {
        // if (name_selected == "Wilt Chamberlain") {
        //     y_axis_max = 60
        // } else {
        //     y_axis_max = 40
        // }
        for (i=0;i<season_data.length;i++) {
            if (season_data[i]["TourWinner"] == name_selected) {
                season_data[i]["color"] = 'rgba(0,100,0,0.8)'
            } else {
                season_data[i]["color"] = 'rgba(0,0,0,0.1)'
                // season_data[i]["events"] = {mouseOver: function () { return false;}}
            }
        }        
    }
    
    $('#tdf-scatterplot-container').highcharts({
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
                text: 'Time Trial Index'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true,
            labels: {
                style: {
                    fontFamily: "Lora"
                }
            }
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
                text: 'Climbing Index'
            },
            labels: {
                style: {
                    fontFamily: "Lora"
                }
            }
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
            style: {
                fontSize: "12px",
                fontFamily: "Lora",
            },
            formatter: function() {
                // console.log(this)
                if (name_selected == "") {
                        var s = "<table id='tooltip-table' style='font-size:12px !important'>"
                        s += "<tr><td colspan=2 style='text-align:center;'>" + "<b>" + "Tour de France " +  this.point.Year +"</b>" + "</td></tr>"
                        s += "<tr><td colspan=2 style='text-align:center;border-bottom: 2px solid #000;'>" + this.point.TourWinner + "</td></tr>"
                        s += "<tr style='text-align:center;'><td class='col-lg-4'><b>TTI: </b>" + "</td><td class='col-lg-8'>" + this.point.x +  "</td></tr>"
                        s += "<tr style='text-align:center;border-bottom:1px solid #000;'><td class='col-lg-4'><b>CI: </b>"  + "</td><td class='col-lg-8'>" + this.point.y +  "</td></tr>"
                        s += "<tr style='text-align:center;'><td class='col-lg-4'><b>TI: </b>" + "</td><td class='col-lg-8'>"  + this.point.RelativePowerIndex +  "</td></tr>"
                        s += "</table>"
                        return s;
                } else {
                    if (this.point.TourWinner == name_selected) {
                        var s = "<table id='tooltip-table' style='font-size:12px !important'>"
                        s += "<tr><td colspan=2 style='text-align:center;'>" + "<b>" + "Tour de France " +  this.point.Year +"</b>" + "</td></tr>"
                        s += "<tr><td colspan=2 style='text-align:center;border-bottom: 2px solid #000;'>" + this.point.TourWinner + "</td></tr>"
                        s += "<tr style='text-align:center;'><td class='col-lg-4'><b>TTI: </b>" + "</td><td class='col-lg-8'>" + this.point.x +  "</td></tr>"
                        s += "<tr style='text-align:center;border-bottom:1px solid #000;'><td class='col-lg-4'><b>CI: </b>"  + "</td><td class='col-lg-8'>" + this.point.y +  "</td></tr>"
                        s += "<tr style='text-align:center;'><td class='col-lg-4'><b>TI: </b>" + "</td><td class='col-lg-8'>"  + this.point.RelativePowerIndex +  "</td></tr>"
                        s += "</table>"  
                        return s;
                    } else {
                        return false;
                    }                    
                }
            },
            useHTML: true
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
            name: 'TdF Data',
            data: season_data,
            showCheckbox: false,
            turboThreshold: 0
        }]
    });
};