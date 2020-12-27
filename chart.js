const data_url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'


const fake_data = [66, 45, 34, 99, 104, 65, 44, 70, 75, 56, 72, 87]

d3.json(data_url, function (json) {
    const data = json.data

    w = 1000
    h = 500

    // set the X axis scale
    const xScale = d3.scaleLinear()
    const minX = d3.min(data, (d) => d[0])
    const maxX = d3.max(data, (d) => d[0])
    xScale.domain([minX, maxX])
        .range([0, w])

    const time_diff = maxX.getTime() - minX.getTime();
    console.log(time_diff)

    // set the Y axis scale
    const yScale = d3.scaleLinear()
    const minY = d3.min(data, (d) => d[1])
    const maxY = d3.max(data, (d) => d[1])
    yScale.domain([0, maxY])
        .range([0, h])

    console.log(maxX)



    const svg = d3.select("div")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    const x = svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('width', 3)
        .attr('height', (d) => yScale(d[1]))
        .attr('x', (d, i) => i * 5)
        .attr('y', (d, i) => h - yScale(d[1]))

});