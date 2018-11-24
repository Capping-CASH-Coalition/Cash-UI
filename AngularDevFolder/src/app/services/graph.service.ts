import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';

@Injectable()
export class GraphService {

    private graphTypes: any[] = [
      {val: 'pie', view: 'Pie' },
      {val: 'bar', view: 'Bar' },
      {val: 'doughnut', view: 'Doughnut' },
      {val: 'polarArea', view: 'Polar Area' },
      {val: 'line', view: 'Line' },
      {val: 'radar', view: 'Radar' },
    ]

    private colors: string[] = [
      'rgba(054, 162, 235, 1)',
      'rgba(255, 099, 132, 1)',
      'rgba(255, 206, 086, 1)',
      'rgba(075, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 064, 1)',
      'rgba(046, 139, 087, 1)',
      'rgba(082, 139, 139, 1)',
      'rgba(070, 130, 180, 1)',
      'rgba(147, 112, 219, 1)',
      'rgba(205, 092, 092, 1)',
      'rgba(219, 112, 219, 1)',
      'rgba(255, 231, 186, 1)',
      'rgba(178, 223, 238, 1)',
      'rgba(072, 209, 204, 1)',
      'rgba(238, 180, 180, 1)',
      'rgba(153, 050, 204, 1)',
      'rgba(102, 205, 170, 1)',
      'rgba(230, 238, 000, 1)',
      'rgba(255, 193, 037, 1)',
      'rgba(000, 178, 238, 1)',
      'rgba(255, 159, 064, 1)',
      'rgba(230, 207, 161, 1)',
      'rgba(205, 197, 191, 1)',
      'rgba(202, 255, 112, 1)',
      'rgba(255, 127, 080, 1)',
      'rgba(205, 051, 051, 1)',
      'rgba(255, 127, 000, 1)',
      'rgba(255, 174, 185, 1)'
   ]

    private linearChartOptions = {
        responsive: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
   }

    private radialChartOptions = {
        responsive: false,
    }

    public createSingleChart(context, chartType, map: Map<string, number>): Chart {
        return new Chart(context, {
            type: chartType,
            data: {
                labels: Array.from(map.keys()),
                datasets: [{
                    label: 'Total',
                    data: Array.from(map.values()),
                    backgroundColor: this.getColors()
                }]
            },
            options: this.getOptions(chartType)
        });
    }

    public createMatrixChart(context, chartType, matrixData ): Chart {
        return new Chart(context, {
            type: chartType,
            data: matrixData,
            options: this.getOptions(chartType)
            })
    }

    public createDateChart(context, chartType, matrixData ): Chart {
        return new Chart(context, {
            type: chartType,
            data: matrixData,
            options: {
                elements: {
                    line: {
                        tension: 0
                    }
                },
                responsive: true,
                title: {
                    display: true,
                    text: "Responses By Survey For Past Year"
                },
                scales: {
                    xAxes: [{
                        type: "time",
                        time: {
                            tooltipFormat: 'll',
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Date'
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'value'
                        }
                    }]
                }
            }
        })
    }

    public getGraphTypes(): any[] {
        return this.graphTypes;
    }

    public getColors(): string[] {
        return this.colors;
    }

    public getColorByIndex(i: number): string {
        if ( i > this.colors.length ) {
            console.log("color out of bounds");
            return null;
        } else {
            return this.colors[i];
        }
    }

    public getOptions(chartType): any {
        if ( chartType == 'bar' || chartType == 'line' )
            return this.linearChartOptions;
        else 
            return this.radialChartOptions;  
    }

    public downloadChart(event, canvas) {
        let anchor = event.target;
        let can = document.getElementsByTagName(canvas)[0] as HTMLCanvasElement;
        anchor.href = can.toDataURL("image/png");
        anchor.download = "Graph.png";
    }
}