// /////////////////////////
// TEST GRID
// /////////////////////////

// const testGrid = () => {
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
// let data = testGrid();
// console.log(data);
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

///////////////////////////
// PLATE TEST
///////////////////////////

let colors = [
    'tomato', 'orange', 'violet', 'cornflowerblue',
    'slateblue', 'mediumseagreen', 'aqua', 'chartreuse',
    'darkblue', 'darkcyan', 'darkgoldenrod', 'crimson',
    'deeppink', 'magenta', 'limegreen', 'red'
]

let standardsBlank = [
    {name: "standard 1", color: 'yellow'},
    {name: "standard 2", color: 'yellow'},
    {name: "standard 3", color: 'yellow'},
    {name: "standard 4", color: 'yellow'},
    {name: "standard 5", color: 'yellow'},
    {name: "standard 6", color: 'yellow'},
    {name: "standard 7", color: 'yellow'},
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

const gridData = () => {
    let finalData = createFinalData(2, 12, 3);
    let dataForGrid = [];
    let x = 1;
    let y = 1;
    let width = 50;
    let height = 50;

    let rows = 8;
    let columns = 12;

    for (let row = 0; row < rows; row++) {
        dataForGrid.push([]);
        for (let column = 0; column < columns; column++) {
            dataForGrid[row].push(finalData.shift());
        }
    }

    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            dataForGrid[row][column].x = x;
            dataForGrid[row][column].y = y;
            dataForGrid[row][column].width = width;
            dataForGrid[row][column].height = height;
            x += width;
        }
        x = 1;
        y += height;
    }

    console.log(dataForGrid);
    return dataForGrid;
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
