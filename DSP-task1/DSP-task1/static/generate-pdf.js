
function generate_pdf(viewerNumber){
    // Data statistics can be mean, std, duration, min and max values for each signal. 
    // These numbers should show up in a nice table in the pdf file. 
    // The table can have the signals in different rows and the values in different columns.
  
  
  
  
  
  //pdf data
  
    var doc = new jspdf.jsPDF()
    var stat  = [];
    if (viewerNumber == 1) {
        if(xAxis.length == 0 || data.length == 0){
            return
        }
        stat = getStat(xAxis, data);

    }else if (viewerNumber == 2){
        if(xAxis2.length == 0 || data2.length == 0){
            return
        }
        stat = getStat(xAxis2, data2);
    }

    doc.text("signal "+viewerNumber, 10, 10);
    doc.autoTable({head:[['Data of signal '+ viewerNumber]]});    
    
    var head = [['mean', 'std', 'duration', 'min', 'max']]
    var body = [
        [stat.mean, stat.std, stat.duration, stat.min, stat.max]
    ]
    doc.autoTable({head: head, body: body })
    doc.save('data.pdf')

}
//new plot
// var divGraph = document.getElementById('chart');
 
    Plotly.toImage('chart', { format: 'png', width: 800, height: 600 })
    .then(function (dataURL) {
          var doc = new jsPDF();
          var image = new Image();
          image.src = dataURL;
          doc.addImage(image,10,10,200,200);
          doc.save('generate_pdf');
      });

function getStat(x,y){
    var allData = [];
    console.log(x);
    console.log(y);

    var columns = {
        x:'interval',
        y:'interval'
    };

    for (let i = 0; i < y.length; i++) {
        if (y[i] != null && x[i] != null) {
            allData.push({x:x[i], y:y[i]});            
        }
    }

    stats = new Statistics(allData, columns);
    var mean = stats.arithmeticMean("y");
    var std = stats.coefficientOfVariation("y");
    var duration = x[xAxis.length-2] - x[0];
    var min = stats.minimum("y");
    var max = stats.maximum("y");

    var stat = {
        "mean": mean,
        "std": std,
        "duration": duration,
        "min": min,
        "max": max
    };
    return stat
   
}
//new image 
var divGraph = document.getElementById('header-container');
Plotly.toImage('header-container',{format:'png',width:800,height:600}).then(function(dataURL)
{
    var doc = new jsPDF();
    image.src= dataURL;
    doc.addImage(image,10,10,200,20,0);
    doc.save('ddddd.pdf');
});

function generate_pdf_linked()
{
    var doc =new jspdf.jsPDF()
    doc.text("signal Data", 10 ,10);
    var stat1 = getStat(xAxis , data);
    doc.autoTable({head:[['Data of signal 1']]})


    var head =[['mean','std','duration','min','max']]
    var body = [
        [stat1.mean, stat1.std, stat1.duration, stat1.min, stat1.max]
    ]
    doc.autoTable({head: head, body: body })


    var stat2 = getStat (xAxis , data);
    doc.autoTable({head:[['Data of signal 2']]})


    var head =[['mean','std','duration','min','max']]
    var body = [
        [stat2.mean, stat2.std, stat2.duration, stat2.min, stat2.max]
    ]
    doc.autoTable({head: head, body: body })

   
          doc.save('data.pdf');
}