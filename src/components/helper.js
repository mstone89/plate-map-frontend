import * as d3 from "d3";

export default {

    generatePlateData: (plateDilution, plateSample, plateReplicates, scReps) => {

        let colors = [
            'tomato', 'orange', 'violet', 'cornflowerblue',
            'slateblue', 'mediumseagreen', 'aqua', 'chartreuse',
            'darkblue', 'darkcyan', 'darkgoldenrod', 'crimson',
            'deeppink', 'magenta', 'limegreen', 'red'
        ]

        // Given number of samples and replicates, duplicate samples
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

        // Add dilution to sample data
        const addDilution = (dilutionNum, sampleData) => {
            let dilutionData = [];
            let opacity = dilutionNum;
            for (let i = 0; i < dilutionNum; i++) {
                for (let j = 0; j < sampleData.length; j++) {
                    let dilution = (1 / dilutionNum) * opacity;
                    let newData = {
                        name: sampleData[j].name,
                        color: sampleData[j].color,
                        dilution: dilution
                    }
                    dilutionData.push(newData);
                }
                opacity--;
            }
            dilutionData = dilutionData.sort((a, b) => {
                if (a.dilution < b.dilution) { return 1 }
                if (a.dilution > b.dilution) { return - 1 }
                return 0;
            });
            return dilutionData;
        }

        // Create standard curve data
        const standardCurveData = (scReps) => {
            let standards = [];

            for (let i = 0; i < scReps; i++) {
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
            return standards;
        }

        // Take all created data and combine it
        const createFinalData = (dilutionNum, sampleNum, replicates, scReps) => {
            let data = standardCurveData(scReps).concat(addDilution(dilutionNum, createSampleData(sampleNum, replicates)));
            if (data.length < 96) {
                let remaining = 96 - data.length;
                for (let i = 0; i < remaining; i++) {
                    data.push({
                        name: 'blank',
                        color: 'white'
                    });
                }
            }
            data = data.sort((a, b) => {
                if (a.color < b.color) {
                    return 1;
                }
                if (a.color > b.color) {
                    return - 1;
                }
                return 0;
            });
            return data;
        }

        return createFinalData(plateDilution, plateSample, plateReplicates, scReps);
    },

    generateGrid: (rows, columns, data) => {
        const finalizeGridData = (array) => {
            let finalArray = [];
            let x = 1;
            let y = 1;
            let width = 50;
            let height = 50;

            for (let i = 0; i < array.length; i++) {
                for (let j = 0; j < array[i].length; j++) {
                    finalArray.push({
                        name: array[i][j].name,
                        color: array[i][j].color,
                        x: x,
                        y: y,
                        width: width,
                        height: height,
                        dilution: array[i][j].dilution
                    });
                    x += width;
                }
                x = 1;
                y += height;
            }
            return finalArray;
        }

        const gridData = (rows, columns, data) => {
            let finalData = data;
            let dataForGrid = [];

            for (let row = 0; row < rows; row++) {
                dataForGrid.push([]);
                for (let column = 0; column < columns; column++) {
                    dataForGrid[row].push(finalData.shift());
                }
            }

            return dataForGrid;
        }

        let finalizedData = finalizeGridData(gridData(rows, columns, data));

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
        return gridIt(rows, columns, finalizedData);
    },

    renderGrid: (data, width, height, id) => {
        let svgWidth = width;
        let svgHeight = height;

        let labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

        labels = labels.reverse();

        let yScale = d3.scaleLinear()
            .domain([0, 7])
            .range([svgHeight - 120, 20]);

        let yAxis =  d3.axisLeft()
            .scale(yScale)
            .tickFormat((d) => { return labels[d] });

        let grid = d3.select(id)
            .append('svg')
            .attr('width', svgWidth)
            .attr('height', svgHeight)

        let row = grid.selectAll('.row')
            .data(data)
            .enter().append('g')
            .attr('transform', 'translate(98,50)')
            .attr('class', 'row');

        row.selectAll('.circle')
            .data((d) => { return d })
            .enter().append('circle')
            .attr('class', 'circle')
            .attr('cx', (d) => { return d.x + 25 })
            .attr('cy', (d) => { return d.y + 25 })
            .attr('r', 20)
            .style('fill', (d) => { return d.color })
            .style('stroke', (d) => {
                if (d.color === 'white') {
                    return '#aaa';
                }
            })
            .style('opacity', (d) => {
                if (d.dilution !== undefined) {
                    return d.dilution;
                }
            });

        grid.append('g')
            .attr('transform', 'translate(70, 50)')
            .call(yAxis)
    }
}
