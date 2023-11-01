//variable for the data website
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//use d3 to retrieve the json data
d3.json(url).then(function(data){
  console.log(data);
});

//demographic info panel
//new function for demo panel
function demoPanel(newPatient) {
  d3.json(url).then((data) => {

//find the metadata, filter to match the selection and assign variable to the selection
    let demoData = data.metadata;
    let patient = demoData.filter(item => item.id == newPatient);
    let patientData = patient[0]

//use d3 to make changes to html code
    d3.select("#sample-metadata").html("");
    Object.entries(patientData).forEach(([key,value]) => {
      d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
    });
  });
};

//bar chart
//new function for bar chart
function barPlot(newPatient) {
  d3.json(url).then((data) => {

//find samples, filter and assign variable to the selection
    let plotData = data.samples;   
    let patient = plotData.filter(item => item.id == newPatient);    
    let patientData = patient[0]

//variables for specific data from selection    
    let ids = patientData.otu_ids;
    let labels = patientData.otu_labels;
    let values = patientData.sample_values;

//create bar chart
    let barChart = {
      x: values.slice(0, 10).reverse(),
      y: ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
      text: labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h"
    };

    let barData = [barChart];

    Plotly.newPlot("bar", barData);
  });
};

//bubble chart
//new function for bubble chart
function bubblePlot(newPatient) {
  d3.json(url).then((data) => {

//find samples, filter and assign variable to the selection
    let bubbleplotData = data.samples;   
    let patient = bubbleplotData.filter(item => item.id == newPatient);    
    let patientData = patient[0]

//variables for specific data from selection   
    let ids = patientData.otu_ids;
    let labels = patientData.otu_labels;
    let values = patientData.sample_values;

//create bubble chart
    let bubbleChart = {
      x: ids,
      y: values,
      text: labels,
      mode: 'markers',
      marker: {
        size: values,
        color: ids,
      }
    };

    let bubbleData = [bubbleChart];

    Plotly.newPlot("bubble", bubbleData);
  });
};

//new function to input the names in html code
function init() {

//select the dropdown code  
  let dropDown = d3.select("#selDataset");

//find data
  d3.json(url).then((data) => {

//find selections(names)
    let dropDownSelect = data.names;

//log names into console
    dropDownSelect.forEach((name) => {
      console.log(name);

//input the selections into the html code
      dropDown.append("option").text(name).property("value", name);
    });

//first selection shown
    let firstPatient = dropDownSelect[0];

    demoPanel(firstPatient);
    barPlot(firstPatient);
    bubblePlot(firstPatient);

  });
};

//function to change data shown when selection is changed
function optionChanged(value) {
  barPlot(value);
  bubblePlot(value);
  demoPanel(value);
};

init();