// // /////////////////////////
// // TEST GRID
// // /////////////////////////
//
// const testGrid = () => {
//     const data = [];
//     let x = 1;
//     let y = 1;
//     let width = 50;
//     let height = 50;
//
//     for (let row = 0; row < 8; row++) {
//         data.push([]);
//         for (let column = 0; column < 12; column++) {
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
//     .attr('width', "612px")
//     .attr('height', "408px");
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

const createSampleData = (sampleNum, replicates) => {
    let samples = [];
    let x = 1;
    let y = 1;
    let width = 50;
    let height = 50;

    for (let j = 0; j < replicates; j++) {
        for (let i = 0; i < sampleNum; i++) {
            samples.push({
                name: `sample ${i + 1}`,
                color: colors[i],
                width: width,
                height: height,
                x: x,
                y: y
            });
            x += width;
        }
        x = 1;
        y += height;
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

const standardCurveData = (replicates) => {
    let standards = [];
    let x = 1;
    let y = 1;
    let width = 50;
    let height = 50;

    for (let i = 0; i < replicates; i++) {
        for (let j = 0; j < 8; j++) {
            if (j === 5 || j === 6 || j === 7) {
                standards.push({
                    name: 'blank',
                    color: 'white',
                    width: width,
                    height: height,
                    x: x,
                    y: y
                })
            }
            standards.push({
                name: `standard ${i + 1}`,
                color: 'yellow',
                width: width,
                height: height,
                x: x,
                y: y
            });
            x += width;
        }
        x = 1;
        y += height;
    }
    return standards;
}

const createFinalData = (dilutionNum, sampleNum, replicates) => {
    return standardCurveData(replicates).concat(
        addDilution(dilutionNum, createSampleData(sampleNum, replicates))
    );
}

const gridData = (rows, columns) => {
    let finalData = createFinalData(2, 12, 3);
    let dataForGrid = [];

    for (let row = 0; row < rows; row++) {
        dataForGrid.push([]);
        for (let column = 0; column < columns; column++) {
            dataForGrid[row].push(finalData.shift());
        }
    }

    return dataForGrid;
}

console.log(gridData(8, 12));

let grid = d3.select('#grid')
    .append('svg')
    .attr('width', "612px")
    .attr('height', "408px");

let row = grid.selectAll('.row')
    .data(gridData(8, 12))
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
    .style('fill', (d) => { return d.color })
    .style('stroke', '#fff');
