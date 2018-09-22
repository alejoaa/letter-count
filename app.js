
const countBtn = d3.select("#countBtn")
const input = d3.select("#input");
const svg = d3.select("svg");
const resetBtn = d3.select("#reset");

var svgWidth = svg.attr("width");
var svgHeight = svg.attr("height");
var barPadding = 20 // px

// A function to return the data from input text
function getCounts(text) {
    let data = [];
    
    let arr = text.split('').sort()

    for(let i = 0; i < arr.length; i++) {
        let letter = arr[i];
        if(letter === arr[i - 1]) data[data.length - 1].count++
        else data.push({'character': letter, 'count': 1})
    }

    return data;
}

countBtn.on('click', () => {

    // Prevent default behavior
    d3.event.preventDefault();

    // Read input text and reset input value
    let text = input.property("value");
    input.property("value", "");

    // Create data for use in D3
    let data = getCounts(text);
    console.log(data);

    // Determine bar width
    var barWidth = svgWidth / data.length - barPadding;

    // Update displaying info
    d3.select("#phrase")
        .text(`Analysis of: ${text}`);

    d3.select("#count")
        .text(`(New characters: ${data.length})`);
    
    let bars = svg
                    .selectAll("rect")
                    .data(data, d => d.character)

    bars
        .exit()
        .remove();

    bars
        .attr("fill", "#F5CA2C")
    .enter()
    .append("rect")
        .attr("fill", "#4EF92C")
    .merge(bars)
        .attr("x", (_, i) => (barWidth + barPadding) * i)
        .attr("y", d => svgHeight - d.count * 20)
        .attr("width", barWidth)
        .attr("height", d => d.count * 20)

    
    // Update labels
    let labels = svg
                    .selectAll("text")
                    .data(data, d => d.character)

    labels
        .exit()
        .remove()
    
    labels
            .attr("text-anchor", "middle")
        .enter()
        .append("text")
        .merge(labels)
            .html(d => d.character)
            .attr("x", (_, i) => ((barWidth + barPadding) * i) + barWidth / 2)
            .attr("y", d => (svgHeight - d.count * 20) - 8)
            .attr("font-size", "20")
});

resetBtn.on('click', () => {
    d3.event.preventDefault();

    input.property("value", "");

    // Remove rectangles
    svg
        .selectAll("rect")
        .data([])
        .exit()
        .remove();

        // Remove labels
        svg
        .selectAll("text")
        .data([])
        .exit()
        .remove();

    // Reset display text
        d3.select("#phrase")
            .text("")

        d3.select("#count")
            .text("");
});
