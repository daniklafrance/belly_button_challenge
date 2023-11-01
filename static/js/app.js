const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//demographic info panel
function demoPanel(newPatient) {
  d3.json(url).then((data) => {
    let demoData = data.metadata;
    let patient = demoData.filter((item) => item.id == newPatient);
    let patientData = patient[0]
    d3.select("#sample-metadata").html("");
    Object.entries(patientData).forEach(([key,value]) => {
      d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
    });
  });
}

//set up plots, data variables created
function barPlot(newPatient) {
  d3.json(url).then((data) => {

    let plotData = data.samples;   
    let patient = plotData.filter(item => item.id == newPatient);    
    let patientData = patient2[0]

    let ids = patientData.otu_ids;
    let labels = patientData.otu_labels;
    let values = patientData.sample_values;

//bar chart
    let barChart = {
      x: values.slice(0, 10).reverse(),
      y: ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
      text: labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h"
    };

    let barData = [barChart];

    let layout = {
      title: 'title',
    };

    Plotly.newPlot("bar", barData, layout);
  });
}

//bubble chart
function bubblePlot(newPatient) {
  d3.json(url).then((data) => {

    let bubbleplotData = data.samples;   
    let patient = bubbleplotData.filter(item => item.id == newPatient);    
    let patientData = patient[0]

    let ids = patientData.otu_ids;
    let labels = patientData.otu_labels;
    let values = patientData.sample_values;


    let bubbleChart = {
      x: ids,
      y: values,
      text: labels,
      mode: 'markers',
      marker: {
        size: values,
        color: ids,
        showscale: true,
      }
    }

    let bubbleData = [bubbleChart];

    let layout1 = {
      title: 'title',
    };

    Plotly.newPlot("bubble", bubbleData, layout1);
  });
}

function init() {

  let dropDown = d3.select('#selDataset');

  d3.json(url).then((data) =>{
    data.names.forEach((name) => {
      dropDown.append('option').text(name).property('value', name);
    });

    let firstPatient = data.names[0];
      barPlot(firstPatient);
      bubblePlot(firstPatient);
      demoPanel(firstPatient);
  });
}

function refresh(newPatient) {
  barPlot(newPatient);
  bubblePlot(newPatient);
  demoPanel(newPatient);
}

init();