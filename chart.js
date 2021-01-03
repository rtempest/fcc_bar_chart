const data_url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'

d3.json(data_url, function (json) {
    const data = json.data

    w = 800
    h = 500
    pX = 40
    pY = 40

    // create gdp and date lists
    const data_date = data.map(item => item[0])
    const gdp = data.map(item => item[1])

    // set the X axis scale
    const xScale = d3.scaleLinear()
    const minX = d3.min(data_date)
    const maxX = d3.max(data_date)

    // calculate the difference in years between max and min
    var minDate = new Date(minX);
    var maxDate = new Date(maxX);
    const firstYear = minDate.getFullYear()
    const lastYear = maxDate.getFullYear()
    // yearsDiff = (maxDate.getFullYear() - minDate.getFullYear())
    console.log(firstYear)

    // set domain and range of scale to cover number of days
    xScale.domain([firstYear, lastYear])
        .range([pX, w - pX])

    // set the Y axis scale
    const yScale = d3.scaleLinear()
    const minY = d3.min(gdp)
    console.log(minY)
    const maxY = d3.max(gdp)
    yScale.domain([0, maxY])
        .range([h - pY, pY])


    // create bar chart
    const svg = d3.select("div")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    const bars = svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('width', 5)
        .attr('height', (d) => h - yScale(d[1]))
        .attr('x', (d, i) => {
            let year = new Date(d[0]);
            yearNum = (year.getFullYear())
            return xScale(yearNum)
        })
        .attr('y', (d, i) => yScale(d[1]) - pX)

    // add the axes
    const xAxis = d3.axisBottom().scale(xScale)

    svg.append("g")
        .attr("id", 'x-axis')
        .attr("transform", "translate(0," + (h - pY) + ")")
        .call(xAxis);

    const yAxis = d3.axisLeft(yScale)

    svg.append("g")
        .attr("id", 'y-axis')
        .attr("transform", "translate(" + pX + ",0)")
        .call(yAxis);

});

