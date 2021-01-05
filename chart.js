const data_url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'

d3.json(data_url, function (json) {
    const data = json.data

    w = 950
    h = 500
    p = 40

    // create gdp and date lists
    const data_date = data.map(item => new Date(item[0] + "T00:00"))
    const gdp = data.map(item => item[1])

    // set the X axis scale
    // console.log(data_date)
    const minX = d3.min(data_date)
    const maxX = d3.max(data_date)
    console.log(minX)
    console.log(maxX)

    // set domain and range of scale
    const xScale = d3.scaleTime()
        .domain([minX, maxX])
        .range([p, w - p])

    // set the Y axis scale
    const yScale = d3.scaleLinear()
    const maxY = d3.max(gdp)
    yScale.domain([0, maxY])
        .range([h - p, p])

    // const container = d3.select('#chart')
    //     .append('text', 'hello')

    // create bar chart
    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", w)
        .attr("height", h)

    const bars = svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('data-date', (d, i) => d[0])
        .attr('data-gdp', (d, i) => gdp[i])
        .attr('class', 'bar')
        .attr('width', 2)
        .attr('height', (d) => h - yScale(d[1]) - p)
        .attr('x', (d, i) => {
            let year = new Date(data_date[i]);
            return xScale(year)
        })
        .attr('y', (d, i) => yScale(d[1]))

    // add the axes
    const xAxis = d3.axisBottom().scale(xScale)

    svg.append("g")
        .attr("id", 'x-axis')
        .attr("transform", "translate(0," + (h - p) + ")")
        .call(xAxis);

    const yAxis = d3.axisLeft(yScale)

    svg.append("g")
        .attr("id", 'y-axis')
        .attr("transform", "translate(" + p + ",0)")
        .call(yAxis);

    // create the tooltip
    const tooltip = d3.select('#chart')
        .append('div')
        .attr('id', 'tooltip')
        .attr('class', 'tooltip-off')
        .text('this is a tooltip')

    // add the tooltip on mouseover event
    bars
        .on('mouseover', () => {
            d3.select('#tooltip').attr('class', 'tooltip-on')
                .style("left", d3.event.pageX)
                .style("top", d3.event.pageY)
        })
    // .on("mousemove", function (event) {
    //     return tooltip.style("top", (d3.event.pageY - 10) + "p")
    //         .style("left", (d3.event.pageX + 10) + "p");
    // })
    // .on('mouseout', () => d3.select('#tooltip').style("opacity", 0))
});



