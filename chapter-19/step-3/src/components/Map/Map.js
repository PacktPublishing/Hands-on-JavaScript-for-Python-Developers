import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'
import * as topojson from 'topojson-client'
import visited from './countries_visited.json'
import countries from './world_countries.json'
import './Map.css'

// based on http://bl.ocks.org/micahstubbs/8e15870eb432a21f0bc4d3d527b2d14f

const Map = () => {

  const ref = useRef()

  useEffect(() => {

    const svg = d3.select(ref.current)

    const margin = { top: 0, right: 0, bottom: 0, left: 0 },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // const color = d3.scaleThreshold()
    //   .domain([10000, 100000, 500000, 1000000, 5000000, 10000000, 50000000, 100000000, 500000000, 1500000000])
    //   .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)", "rgb(33,113,181)", "rgb(8,81,156)", "rgb(8,48,107)", "rgb(3,19,43)"]);

    let path = d3.geoPath();

    svg.attr("width", width)
      .attr("height", height)
      .append('g')
      .attr('class', 'map');

    var projection = d3.geoMercator()
      .scale(130)
      .translate([width / 2, height / 1.5]);

    path = d3.geoPath().projection(projection);

    let data = countries

    svg.append("g")
      .attr("class", "countries")
      .selectAll("path")
      .data(data.features)
      .enter().append("path")
      .attr("d", path)
      .style("fill", (d) => (visited.indexOf(d.properties.name) ? 'gray' : 'white'))
      .style('stroke', 'white')
      .style('stroke-width', 1.5)
      .style("opacity", 0.8)
      .style("stroke", "white")
      .style('stroke-width', 0.3)

    svg.append("path")
      .datum(topojson.mesh(data.features, function (a, b) { return a.id !== b.id; }))
      .attr("class", "names")
      .attr("d", path);
  }, [])

  return (
    <>
      <h2>Countries Visited</h2>

      <svg className="map" ref={ref} />
    </>
  )
}

export default Map