const data_url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'


const fake_data = [66, 45, 34, 99, 104, 65, 44, 70, 75, 56, 72, 87]

d3.json(data_url, function (json) {
    const data = json.data

    w = 1200
    h = 500
    pX = 5
    pY = 10
    // set the X axis scale
    const xScale = d3.scaleLinear()
    const minX = d3.min(data, (d) => d[0])
    const maxX = d3.max(data, (d) => d[0])

    // calculate the difference in days between max and min
    var minDate = new Date(minX);
    var maxDate = new Date(maxX);
    daysDiff = (maxDate.getTime() - minDate.getTime()) / (1000 * 3600 * 24)
    console.log(daysDiff)

    // set domain and range of scale to cover number of days
    xScale.domain([0, daysDiff])
        .range([pX, w - pX])

    // set the Y axis scale
    const yScale = d3.scaleLinear()
    const minY = d3.min(data, (d) => d[1])
    const maxY = d3.max(data, (d) => d[1])
    yScale.domain([0, maxY])
        .range([0, h - pY])


    // create bar chart
    const svg = d3.select("div")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    const x = svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('width', 2)
        .attr('height', (d) => yScale(d[1]))
        .attr('x', (d, i) => {
            let day = new Date(d[0]);
            dayNum = (day.getTime() - minDate.getTime()) / (1000 * 3600 * 24)
            console.log(xScale(dayNum))
            return xScale(dayNum)
        })
        .attr('y', (d, i) => h - yScale(d[1]))

});