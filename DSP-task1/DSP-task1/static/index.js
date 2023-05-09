var title1 = "Signal 1";
var data = [];
var xAxis = [];
var step = 0;
var color = "#ef5433";
var cnt = 0;
let expand;
let speed = 99;
let hValue =589457495335
let maximum = hValue;
let lValue=-322324343343
let minmum = lValue;
let sum = 0;
let link = false;

var title2 = "Signal 2";          var data2 = [];
var xAxis2 = [];                   var step2 = 0;
var color2 = "ef5433";              var cnt2 = 0;
let expand2;                       let speed2 = 99;
let hValue2 =589457495335           
let maximum2 = hValue2;
let lValue2 =-322324343343
let minmum2 = lValue2;
let sum2 = 0;

// Plot data
plotSignal(1);
plotSignal(2);

// Read file 1
async function startReadFile() {
    data = [];
    xAxis = [];
    var fr = new FileReader();
    fr.onload = async function () {
        const fullData = fr.result.split('\r\n');
        for (let c = 0; c < fullData.length; c++) {
            const cordinates = fullData[c].split(',');
            data.push(cordinates[1]);
            xAxis.push(cordinates[0]);
        }
    }
    fr.readAsText(document.getElementById('file').files[0]);
}

// Read file 2
async function startReadFile2() {
    data2 = [];
    xAxis2 = [];
    var fr = new FileReader();
    fr.onload = async function () {
        const fullData = fr.result.split('\r\n');
        for (let c = 0; c < fullData.length; c++) {
            const cordinates = fullData[c].split(',');
            data2.push(cordinates[1]);
            xAxis2.push(cordinates[0]);
        }
    }
    fr.readAsText(document.getElementById('file2').files[0]);
}

// Get Data
function getData(viewerNumber) {
    if (viewerNumber == 1) {
        if (step < data.length) {
            step++;
            if (data[step] > maximum) maximum = Number(data[step]);
            if (data[step] < minmum) minmum = Number(data[step]);
            if (data[step] != null) sum += Number(data[step]);

            return data[step];
        }
    } else {
        if (step2 < data2.length) {
            step2++;
            if (data2[step2] > maximum2) maximum2 = Number(data2[step2]);
            if (data2[step2] < minmum2) minmum2 = Number(data2[step2]);
            if (data2[step2] != null)
                sum2 += Number(data2[step2]);
            return data2[step2];
        }
    }
}

// Get x axis
function getXaxis(viewerNumber) {
    if (viewerNumber == 1) {
        if (step < data.length) {
            return xAxis[step];
        }
    }
    else {
        if (step2 < data2.length) {
            return xAxis2[step2];
        }
    }
}

// Change title of signal
function changeTitle(id) {
    const tmpTitle = document.getElementById(id).value;
    if (id == "title") {
        title1 = tmpTitle == null ? "" : tmpTitle;
        plotSignal(1)
    } else {

        title2 = tmpTitle == null ? "" : tmpTitle;
        plotSignal(2)
    }
}

function hexToRgb() {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    return `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)})`;
}

// Plot signal
async function plotSignal(viewerNumber) {
    if (viewerNumber == 1) {
        step = 0;
        if (cnt != 0) cnt = 0;
    } else {
        step2 = 0;
        if (cnt2 != 0) cnt2 = 0;
    }

    const layout = {
        autosize: false,

        yaxis: {
            fixedrange: true,
        },
        title: { text: title1 },
        showlegend: true,
    };

    const layout2 = {
        autosize: false,

        yaxis: {
            fixedrange: true,
        },
        title: { text: title2 },
        showlegend: true,
    };
    let trace;
    const line = {
        color: hexToRgb(),
        width: 3
    };
    if (viewerNumber == 1) {
        trace = {
            y: [getData(viewerNumber)],
            x: [xAxis[step]],
            type: 'line',
            line,
        };
        Plotly.newPlot('chart', [trace], layout);

        var myDiv = document.getElementById("chart");
        
       

        // myDiv.on('plotly_relayout',
        //    function (eventdata) {
        //         if (eventdata['xaxis.range[0]'] < 0) {

        //             Plotly.relayout('chart', {
        //                 xaxis: {
        //                     range: [0, xAxis[cnt]]
        //                 }
        //             });
        //         } else if (eventdata['xaxis.range[1]'] > xAxis[xAxis.length - 1]) {
        //             Plotly.relayout('chart', {
        //                 xaxis: {
        //                     range: [0, xAxis[xAxis.length - 1]]
        //                 }
        //             });
        //         }


        //         if (link) {
                    
        //             Plotly.relayout('chart2', {
        //                 xaxis: {
        //                     range: [eventdata['xaxis.range[0]'], eventdata['xaxis.range[1]']]
        //                 }
        //             });
        //         }
        // });

        myDiv.on('plotly_relayout', function (eventdata) {
            start = eventdata['xaxis.range[0]'];
            end = eventdata['xaxis.range[1]'];
            let change = false;
            if (start < 0) {
                start = 0;
                change = true;
            }
            if (end > xAxis[cnt - 1]) {
                end = xAxis[cnt - 1];
                change = true;
            }

            if (change) {
                Plotly.relayout('chart', {
                    xaxis: {
                        range: [start, end]
                    }
                });
            }

            if (link) {
                Plotly.relayout('chart2', {
                    xaxis: {
                        range: [start, end]
                    }
                });
            }

        });
       

    }
    if (viewerNumber = 2 || link) {
        trace = {
            y: [getData(viewerNumber)],
            x: [xAxis2[step2]],
            type: 'line',
            line,
        };
        Plotly.newPlot('chart2', [trace], layout2);
        var myDiv2 = document.getElementById("chart2");
        
        myDiv2.on('plotly_relayout',
        function (eventdata){
            console.log('aaaaaaa');
            
            if (eventdata['xaxis.range[0]'] < 0) {
                Plotly.relayout('chart2', {
                    xaxis: {
                        range: [0, xAxis2[cnt2]]
                    }
                });
            } else if (eventdata['xaxis.range[1]'] > xAxis2[xAxis2.length - 1]) {
                Plotly.relayout('chart2', {
                    xaxis: {
                        range: [0, xAxis2[xAxis2.length - 1]]
                    }
                });
            }
        });
    }

    
}

function onTimerTik(viewerNumber) {
    if (viewerNumber == 1) {
        Plotly.extendTraces('chart', { y: [[getData(viewerNumber)]], x: [[getXaxis(viewerNumber)]] }, [0]);
        cnt++;
        if (cnt > 100) {
            Plotly.relayout('chart', {
                xaxis: {
                    range: [xAxis[cnt - 100], xAxis[cnt]]
                }
            });
        }
        if (cnt > data.length - 1) {
            clearInterval(expand);
        }
    } else {
        Plotly.extendTraces('chart2', { y: [[getData(viewerNumber)]], x: [[getXaxis(viewerNumber)]] }, [0]);
        cnt2++;
        if (cnt2 > 100) {
            Plotly.relayout('chart2', {
                xaxis: {
                    range: [xAxis2[cnt2 - 100], xAxis2[cnt2]]
                }
            });
        }
        if (cnt2 > data2.length - 1) {
            clearInterval(expand2);
        }
    }
}

// Play signal
function play(viewerNumber) {
    if (viewerNumber == 1) {
        if (cnt < data.length - 1) {
            clearInterval(expand);
            expand = setInterval(() => onTimerTik(viewerNumber), speed);
        }
    }
    if (viewerNumber == 2) {
        if (cnt2 < data2.length - 1) {
            clearInterval(expand2);
            expand2 = setInterval(() => onTimerTik(2), speed2);
        }
    }
    if (viewerNumber == 3 || link == true) 
    {
        {
            clearInterval(expand);
            clearInterval(expand2);
            expand = setInterval(() => onTimerTik(1), speed);
            expand2 = setInterval(() => onTimerTik(2), speed2);
        }
    }
}

// Pause signal
function pause(viewerNumber) {
    if (viewerNumber == 1) clearInterval(expand);
    else if  (viewerNumber == 2 ) clearInterval(expand2);
    else if (viewerNumber == 3 || link == true) 
    { clearInterval(expand);
      clearInterval(expand2);
    }
}

// Change speed
function changeSpeed(numberAdded, chartid) {
    if (chartid = 1) {
        if (cnt < data.length) {
            if (numberAdded < 0) {
                if (speed + numberAdded > 0) {
                    speed += numberAdded;
                    pause(chartid);
                    play(chartid)
                }
            } else {
                speed += numberAdded;
                pause(chartid);
                play(chartid);
            }
        }
    }
    if (chartid = 2 || link) {
        if (cnt2 < data2.length) {
            if (numberAdded < 0) {
                if (speed2 + numberAdded > 0) {
                    speed2 += numberAdded;
                    pause(chartid);
                    play(chartid)
                }
            } else {
                speed2 += numberAdded;
                pause(chartid);
                play(chartid);
            }
        }
    }
}

// Change color
function changeColor(viewerNumber) {
    color = document.getElementById(`color${viewerNumber == 1 ? "" : 2}`).value;
    pause(viewerNumber);
    plotSignal(viewerNumber);
}   

// // zoom
// function zoom(viewerNumber)
// var graphDiv = document.getElementById('myDiv');


// var N = 40,

//     x = d3.range(N),

//     y = d3.range(N).map( d3.random.normal() ),

//     data = [ { x:x, y:y } ];

//     layout = { title:'Click-drag to zoom' };


// Plotly.newPlot(graphDiv, data, layout);


// graphDiv.on('plotly_relayout',

//     function(eventdata){

//         alert( 'ZOOM!' + '\n\n' +

//             'Event data:' + '\n' +

//              JSON.stringify(eventdata) + '\n\n' +

//             'x-axis start:' + eventdata['xaxis.range[0]'] + '\n' +

//             'x-axis end:' + eventdata['xaxis.range[1]'] );

//     });

//signal viewr 1 
document.getElementById('play').addEventListener('click', function () { if (!link )play(1);
     else  play(3) });
document.getElementById('pause').addEventListener('click', function () { if (!link )pause(1);
    else  pause(3) });
document.getElementById('changeTitle').addEventListener('click', () => { changeTitle('title') });
document.getElementById('chkbox').addEventListener('change', function () {
    link = !link;
});
document.getElementById('color').addEventListener('change', () => changeColor(1));
document.getElementById('file').addEventListener('change', () => startReadFile());
document.getElementById('speedup').addEventListener('click', () => { changeSpeed(20, 2); });
document.getElementById('speeddown').addEventListener('click', () => { changeSpeed(-20, 2); });

//signal viewer2
document.getElementById('play2').addEventListener('click', function () { if (!link )play(2);
    else  play(3) });
document.getElementById('pause2').addEventListener('click', function () { if (!link) pause(2) ;
    else  pause(3) });

document.getElementById('changeTitle2').addEventListener('click', () => { changeTitle('title2') });
document.getElementById('color2').addEventListener('change', () => changeColor(2));
document.getElementById('file2').addEventListener('change', () => startReadFile2());
document.getElementById('speedup2').addEventListener('click', function () { if (!link) changeSpeed(20, 4); });
document.getElementById('speeddown2').addEventListener('click', function () { if (!link) changeSpeed(-20, 4); });