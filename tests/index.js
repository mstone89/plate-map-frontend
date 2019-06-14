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

const standardCurveData = (replicates) => {
    let standards = [];

    for (let i = 0; i < replicates; i++) {
        for (let j = 0; j < 8; j++) {
            if (j === 7) {
                standards.push({
                    name: 'blank',
                    color: 'white'
                });
            } else {
                standards.push({
                    name: `standard ${j + 1}`,
                    color: 'yellow'
                });
            }
        }
    }
    // https://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript
    return standards.sort((a, b) => {
        if (a.name < b.name) { return 1 }
        if (a.name > b.name) { return - 1 }
        return 0;
    });
}

const createFinalData = (dilutionNum, sampleNum, replicates) => {
    return standardCurveData(replicates).concat(
        addDilution(dilutionNum, createSampleData(sampleNum, replicates))
    );
}

//http://www.cagrimmett.com/til/2016/08/17/d3-lets-make-a-grid.html
const finalizeGridData = (array) => {
    let finalArray = [];
    x = 1;
    y = 1;
    width = 50;
    height = 50;

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            finalArray.push({
                name: array[i][j].name,
                color: array[i][j].color,
                x: x,
                y: y,
                width: width,
                height: height
            });
            x += width;
        }
        x = 1;
        y += height;
    }
    return finalArray;
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

let finalizedData = finalizeGridData(gridData(8, 12));

const gridIt = (rows, columns, array) => {
    let dataForGrid = [];
    for (let row = 0; row < rows; row++) {
        dataForGrid.push([]);
        for (let column = 0; column < columns; column++) {
            dataForGrid[row].push(array.shift());
        }
    }
    return dataForGrid;
}

let finalFinalData = gridIt(8, 12, finalizedData);


let grid = d3.select('#grid')
    .append('svg')
    .attr('width', "612px")
    .attr('height', "408px")

let row = grid.selectAll('.row')
    .data(finalFinalData)
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

let keys = [['Standard Curves ', 7], ['Samples ', 12], ['Replicates ', 3], ['Dilutions ', 2], ['Blanks ', 1]]

let values = [7, 12, 3, 2, 1];

let legend = d3.select('#legend')
    .append('svg')
    .attr('width', 400)
    .attr('height', 500);

legend.selectAll('mydots')
    .data(keys)
    .enter()
    .append('circle')
        .attr('cx', 100)
        .attr('cy', (d, i) => { return 100 + i * 25 })
        .attr('r', 3)
        .style('fill', 'black')

legend.selectAll('mylabels')
    .data(keys)
    .enter()
    .append('text')
        .attr('x', 120)
        .attr('y', (d, i) => { return 100 + i * 25 })
        .style('fill', 'black')
        .text((d) => { return d })
