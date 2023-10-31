const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//set up default plots, data variables created
function defaultPlots(selectedPatient) {
  d3.json(url).then((data) => {
    let plotData = data.samples;
    let patient = plotData.filter(
      (samplePatient) => samplePatient.id == selectedPatient
    )[0];

    console.log(patient);

    let ids = patient.otu_ids;
    let labels = patient.otu_labels;
    let values = patient.sample_values;

//bar chart
    let trace1 = {
      x: values.slice(0, 10).reverse(),
      y: ids.slice(0, 10).map((otuID) => 'OTU ${otuID}').reverse(),
      text: labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h"
    };

    let barData = [trace1];

    let layout = {
      title: 'title',
      xaxis: {autorange: true},
      yaxis: {autorange: true},
    }

    Plotly.newPlot("bar", barData, layout);

//bubble chart
    let trace2 = {
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

    let bubbleData = [trace2];

    let layout2 = {
      title: 'title',
      showlegend: true,
    };

    Plotly.newPlot("bubble", bubbleData, layout2);
  });
}

//demographic info panel
function demoPanel(selectedPatient) {
  d3.json(url).then((data) => {
    let demoData = data.metadata;
    let patient = demoData.filter(
      (samplePatient) => samplePatient.id == selectedPatient
    )[0];
    let demoPanelBox = d3.select("#sample-metadata");
    demoPanelBox.html("");
    Object.entries(patient).forEach(([key,value]) => {
      demoPanelBox.append("h5").text('${key}: ${value}');
    });
  });
}

function init() {
  d3.json(url).then(function (data) {
    console.log('url:', data);

    let dropDown = d3.select('#selDataset');

    data.names.forEach((name) => {
      dropDown.append('option').text(name).property('value', name);
    });

    const firstPatient = data.names[0];
    defaultPlots(firstPatient);
    demoPanel(firstPatient);
  });
}

function nextPatient(newPatient) {
  defaultPlots(newPatient);
  demoPanel(newPatient);
}

init();