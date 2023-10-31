//set up page with default plots
function defaultPlots(selectedPatient) {
  d3.json("samples.json").then((data) => {
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

    let bardata = [trace1];

    let layout = {
      title: 'title',
      xaxis: {autorange: true},
      yaxis: {autorange: true},
    }

    Plotly.newPlot("bar", bardata, layout);

  });
}

