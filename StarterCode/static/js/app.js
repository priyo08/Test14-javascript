// Define URL for the data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

//Load the data from the url using D3

d3.json(url).then(data => {

  // Get the dropdown menu element
  const dropdown = d3.select("#selDataset");
  
  // Populate the dropdown menu with the names
  dropdown.selectAll("option")
    .data(data.names)
    .enter()
    .append("option")
    .text(d => d);

      // Add event listener to the dropdown menu
  dropdown.on("change", function() {
    // Get the selected sample ID
    const selectedSample = this.value;
    
    // Find the selected sample in the data
    const sample = data.samples.find(s => s.id === selectedSample);
    
    console.log(sample);

    let labels = sample.otu_ids.slice(0, 10).map(id => `OTU ${id}`);
    let sampleValues = sample.sample_values.slice(0, 10).map(values => `SAMPLE {value}`);
    let hoverText = sample.otu_labels.slice(0, 10).map(otu => `OTU {labels}`);

    // Create the bar chart using D3
    function init(){
        let trace1 = [{
            x : sampleValues,
            y : labels,
            type : "bar",
            text : hoverText,
            marker : {
                color : "blue"
            }
        }];

        let data = [trace1];

        let layout = 
        {
            title: `Top 10 OTUs for Individual ${selectedSample}`,
            xaxis: {
              title: "Sample Values"
            },
            yaxis: {
                title : "Otu_Ids"
              }
             
        };
        Plotly.newPlot("bar", data, layout); 
        
    }
    init();

   });
}).catch(error => {
  console.log(error);
});