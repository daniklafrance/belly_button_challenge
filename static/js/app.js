const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

d3.json(url).then(function(data){
  console.log(data);
});

//demographic info panel
function demoPanel(newPatient) {
  d3.json(url).then((data) => {

    let demoData = data.metadata;
    let patient = demoData.filter(item => item.id == newPatient);
    let patientData = patient[0]

    d3.select("#sample-metadata").html("");
    Object.entries(patientData).forEach(([key,value]) => {
      d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
    });
  });
};

//bar chart
function barPlot(newPatient) {
  d3.json(url).then((data) => {

    let plotData = data.samples;   
    let patient = plotData.filter(item => item.id == newPatient);    
    let patientData = patient[0]

    let ids = patientData.otu_ids;
    let labels = patientData.otu_labels;
    let values = patientData.sample_values;

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
};

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
    };

    let bubbleData = [bubbleChart];

    let layout1 = {
      title: 'title',
    };

    Plotly.newPlot("bubble", bubbleData, layout1);
  });
};

function init() {

  let dropDown = d3.select("#selDataset");

  d3.json(url).then((data) => {

    let dropDownSelect = data.names;
    
    dropDownSelect.forEach((id) => {
      console.log(id);

      dropDown.append("option")
      .text(id)
      .property("value", id);
    });

    let firstPatient = dropDownSelect[0];

    demoPanel(firstPatient);
    barPlot(firstPatient);
    bubblePlot(firstPatient);

  });
};

function refresh(patient) {
  barPlot(patient);
  bubblePlot(patient);
  demoPanel(patient);
};

init();