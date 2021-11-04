import * as d3 from 'd3'
import { Component, OnInit } from '@angular/core';

interface BarData {
  letter: string;
  frequency: number;
}

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  data: BarData[] = [
    {letter: "A", frequency: 0.08167},
    {letter: "B", frequency: 0.01492},
    {letter: "C", frequency: 0.02782},
    {letter: "D", frequency: 0.04253},
    {letter: "E", frequency: 0.12702},
    {letter: "F", frequency: 0.02288},
    {letter: "G", frequency: 0.02015},
    {letter: "H", frequency: 0.06094},
    {letter: "I", frequency: 0.06966},
    {letter: "J", frequency: 0.00153},
    {letter: "K", frequency: 0.00772},
    {letter: "L", frequency: 0.04025},
    {letter: "M", frequency: 0.02406},
    {letter: "N", frequency: 0.06749},
    {letter: "O", frequency: 0.07507},
    {letter: "P", frequency: 0.01929},
    {letter: "Q", frequency: 0.00095},
    {letter: "R", frequency: 0.05987},
    {letter: "S", frequency: 0.06327},
    {letter: "T", frequency: 0.09056},
    {letter: "U", frequency: 0.02758},
    {letter: "V", frequency: 0.00978},
    {letter: "W", frequency: 0.0236},
    {letter: "X", frequency: 0.0015},
    {letter: "Y", frequency: 0.01974},
    {letter: "Z", frequency: 0.00074},
  ]

  width: number = 800;
  height: number = 300;

  margin = { top: 20, right: 0, bottom: 30, left: 40 };

  constructor() { }

  ngOnInit(): void {
    this.createChart()
  }

  createChart(){

    // Cria o SVG e adiciona um atributo para visualização
    const svg = d3.select("#bar-chart")
                  .append("svg")
                  .attr("viewBox", <any>[0, 0, this.width, this.height])

    // eixo X
    let x = d3.scaleBand()
              .domain(this.data.map(d => d.letter))
              .range([this.margin.left, this.width - this.margin.right])
              .padding(0.3)

    // eixo Y
    let y = d3.scaleLinear()
              .domain(<any>[0, d3.max(this.data, d => d.frequency)])
              .range([this.height - this.margin.bottom, this.margin.top])


    let yTitle = (g: any) => g.append("text")
                              .attr("font-family", "sans-serif")
                              .attr("font-size", 10)
                              .attr("y", 10)
                              .text("↑ Frequency")

    let yAxis = (g: any) => g.attr("transform", `translate(${this.margin.left},0)`)
                             .call(d3.axisLeft(y).ticks(null, "%"))
                             .call((g: any) => g.select(".domain").remove())

    let xAxis = (g: any) => g.attr("transform", `translate(0,${this.height - this.margin.bottom})`)
                             .call(d3.axisBottom(x).tickSizeOuter(0))

    svg.append("g")
       .attr("fill", "steelblue")
       .selectAll("rect")
       .data(this.data)
       .join("rect")
       .attr("x", (d: any) => <any>x(d.letter))
       .attr("y", d => y(d.frequency))
       .attr("height", d => y(0) - y(d.frequency))
       .transition()
       .duration(2000)
       .attr("width", x.bandwidth());

    svg.append("g")
       .call(xAxis);

    svg.append("g")
       .call(yAxis);

    svg.call(yTitle);
  }

}
