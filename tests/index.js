var dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];
//
// // d3.select('h1')
// //     .style('color', 'red')
// //     .attr('class', 'heading')
// //     .text('Update h1 tag');
//
// // d3.select('body').append('p').text('1st Paragraph');
// // d3.select('body').append('p').text('2nd Paragraph');
// // d3.select('body').append('p').text('3rd Paragraph');
//
// // d3.selectAll('p').style('color', 'blue');
//
// // d3.select('body')
// //     .selectAll('p')
// //     .data(dataset)
// //     .enter()
// //     .append('p')
// //     // .text('Appending based on dataset');
// //     .text((d) => { return d }); // remember to return
//
// let svgWidth = 500, svgHeight = 300, barPadding = 5;
// let barWidth = (svgWidth / dataset.length);
//
// let svg = d3.select('svg')
//     .attr('width', svgWidth)
//     .attr('height', svgHeight)
//     .style('background-color', 'lightgray');
//
// let barChart = svg.selectAll('rect')
//     .data(dataset)
//     .enter()
//     .append('rect')
//     .attr('y', (d) => { return svgHeight - d })
//     .attr('height', (d) => { return d })
//     .attr('width', barWidth - barPadding)
//     .attr('transform', (d, i) => {
//         let translate = [barWidth * i, 0];
//         return `translate(${translate})`;
//     })
//     .attr('class', 'bar');
//
// var text = svg.selectAll("text")
//     .data(dataset)
//     .enter()
//     .append("text")
//     .text(function(d) {
//         return d;
//     })
//     .attr("y", function(d, i) {
//         return svgHeight - d - 2;
//     })
//     .attr("x", function(d, i) {
//         return barWidth * i;
//     })
//     .attr("fill", "#A64C38");
//
// let svg = d3.select('svg')
//     .attr('width', 500)
//     .attr('height', 500)
//     .style('background-color', 'cornflowerblue')
//
// svg.selectAll('circle')
//     .data([40, 80, 120])
//     .enter()
//     .append('circle')
//     .attr('cx', (d) => { return d })
//     .attr('cy', 60)
//     .attr('r', 10)
//
// let circle = d3.selectAll('circle')
//     .style('fill', 'blue')

// const gridData = () => {
//     const data = [];
//     let x = 1;
//     let y = 1;
//     let width = 50;
//     let height = 50;
//
//     for (let row = 0; row < 10; row++) {
//         data.push([]);
//         for (let column = 0; column < 10; column++) {
//             data[row].push({
//                 x: x,
//                 y: y,
//                 width: width,
//                 height: height
//             });
//             x += width;
//         }
//         x = 1;
//         y += 50;
//     }
//     return data;
// }
//
// let data = gridData();
//
// let grid = d3.select('#grid')
//     .append('svg')
//     .attr('width', 510)
//     .attr('height', 510);
//
// // grid data returns an array that is comprised of 10 elements
// let row = grid.selectAll('.row')
//     .data(data)
//     .enter()
//     .append('g')
//     .attr('class', 'row');
//
// let column = row.selectAll('.square')
//     .data((d) => { return d })
//     .enter()
//     .append('rect')
//     .attr('class', 'square')
//     .attr('x', (d) => { return d.x })
//     .attr('y', (d) => { return d.y })
//     .attr('width', (d) => { return d.width })
//     .attr('height', (d) => { return d.height })
//     .style('fill', '#fff')
//     .style('stroke', '#222');

let colors = [
    'tomato', 'orange', 'violet', 'cornflowerblue',
    'slateblue', 'mediumseagreen', 'aqua', 'chartreuse',
    'darkblue', 'darkcyan', 'darkgoldenrod', 'crimson',
    'deeppink', 'magenta', 'limegreen', 'red'
]

let standardsBlank = [
    {name: "stanard 1", color: 'yellow'},
    {name: "stanard 2", color: 'yellow'},
    {name: "stanard 3", color: 'yellow'},
    {name: "stanard 4", color: 'yellow'},
    {name: "stanard 5", color: 'yellow'},
    {name: "stanard 6", color: 'yellow'},
    {name: "stanard 7", color: 'yellow'},
    {name: 'blank', color: 'white'}
];

const createSampleData = (sampleNum, replicates) => {
    let samples = [];

    for (let j = 0; j < replicates; j++) {
        for (let i = 0; i < sampleNum; i++) {
            samples.push({
                name: `sample ${i + 1}`,
                color: colors[i]
            });
        }
    }
    return samples;
}

const addDilution = (dilutionNum, sampleData) => {
    let dilutionData = [];
    console.log(sampleData);
    for (let i = 0; i < dilutionNum; i++) {
        for (let j = 0; j < sampleData.length; j++) {
            dilutionData.push(sampleData[j]);
        }
    }
    return dilutionData;
}

const standardCurveData = (replicates, standardsBlank) => {
    let standards = [];
    for (let i = 0; i < replicates; i++) {
        for (let j = 0; j < standardsBlank.length; j++) {
            standards.push(standardsBlank[j]);
        }
    }
    return standards;
}

const createFinalData = (dilutionNum, sampleNum, replicates) => {
    return standardCurveData(replicates, standardsBlank).concat(
        addDilution(dilutionNum, createSampleData(sampleNum, replicates))
    );
}

console.log(createFinalData(2, 12, 3));

const gridData = () => {
    let data = [];
    let x = 5;
    let y = 5;
    let width = 50;
    let height = 50;

    let rows = 8;
    let columns = 12;

    for (let row = 0; row < rows; row++) {
        data.push([]);
        for (let column = 0; column < columns; column++) {
            data[row].push({
                x: x,
                y: y,
                width: width,
                height: height
            });
            x += width;
        }
        x = 5;
        y += height;
    }
    return data;
}

let grid = d3.select('#grid')
    .append('svg')
    .attr('width', 612)
    .attr('height', 408);

let row = grid.selectAll('.row')
    .data(gridData())
    .enter().append('g')
    .attr('class', 'row');

let column = row.selectAll('.square')
    .data((d) => { return d })
    .enter().append('rect')
    .attr('class', 'square')
    .attr('x', (d) => { return d.x })
    .attr('y', (d) => { return d.y })
    .attr('width', (d) => { return d.width })
    .attr('height', (d) => { return d.height })
    .style('fill', '#222')
    .style('stroke', '#fff');
