const data_url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'

d3.json(data_url, function (json) {
    const data = json.data

    w = 800
    h = 500
    pX = 60
    pY = 60

    // create gdp and date lists
    const data_date = data.map(item => item[0])

    // set the X axis scale
    const xScale = d3.scaleLinear()
    const minX = d3.min(data_date)
    const maxX = d3.max(data_date)

    // calculate the difference in days between max and min
    var minDate = new Date(minX);
    var maxDate = new Date(maxX);
    yearsDiff = (maxDate.getFullYear() - minDate.getFullYear())
    console.log(yearsDiff)

    // set domain and range of scale to cover number of days
    xScale.domain([0, yearsDiff])
        .range([pX, w - pX])

    // set the Y axis scale
    const yScale = d3.scaleLinear()
    const minY = d3.min(data, (d) => d[1])
    const maxY = d3.max(data, (d) => d[1])
    yScale.domain([0, maxY])
        .range([0, h])


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
        .attr('width', 5)
        .attr('height', (d) => yScale(d[1]))
        .attr('x', (d, i) => {
            let year = new Date(d[0]);
            yearNum = (year.getFullYear() - minDate.getFullYear())
            console.log(xScale(yearNum))
            return xScale(yearNum)
        })
        .attr('y', (d, i) => h - yScale(d[1]) - pY)

    // add the axes
    const xAxis = d3.axisBottom().scale(xScale)

    svg.append("g")
        .attr("id", 'x-axis')
        .attr("transform", "translate(0," + (h - pY / 2) + ")")
        .call(xAxis);

    const yAxis = d3.axisRight(yScale)
    svg.append("g")
        .attr("id", 'y-axis')
        .attr("transform", "translate(60,0)")
        .call(yAxis);

});

