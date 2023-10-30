//data from URL in a variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

//JSON found and logged
d3.json(url).then(function(data) {
    console.log(data);
  });

function init() {
    
    let dropDown = d3.select("#selDataset");
    d3.json(url).then((data) => {

        let names = data.names;

        names.forEach((id) => {            
            dropDown.append("option")
            .text(id)
            .property("value", id);
        });

    });
};

init();