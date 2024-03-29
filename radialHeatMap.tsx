import * as React from "react";
import * as d3 from "d3";

// FOR DATASET:
// number of arrays in dataInner is represented by the number of rings i.e. dataInner.length = 17 therefore, 17 rings
// elements in an array is represented by the individual segments of a ring

//length of pie array controls how many times the chart is divided (i.e. how many slices), but all numbers must be the same number for segments to be even 

//if adjusting originalRadius and chart becomes cut off, increase height and width



//interfaces for individual components that make up graph
interface sliceProps {
  pie: any,
  radius: number
}

interface pathProps{
  radius: number,
  slice: any,
  sliceColor: string,
  innerRadius: number,
  currentVal: number
}
interface twoLayerDonutChartProps{
  height: number,
  width: number,
  outerRadius:number,
  innerRadius:number
}

type pathState = {
  isHovered: boolean
}



// 0%-100% for gradient of color used for slice color, controlled thorough rgbGradient
const rgbGradient = {"100": "#0390fd", "95": "#1795fd", "90": "#259afd", "85": "#319ffd", "80": "#3ca4fd", "75": "#46a9fd", "70": "#50aefd", "65": "#5ab3fc", "60": "#63b8fc", "55": "#63b8fc", "50": "#6dbcfb", "45": "#76c1fa","40": "#80c6fa", "35": "#89caf9", "30": "#93cef9", "25": "#9cd3f8", "20": "#a5d7f7", "15": "#afdbf7", "10": "#b9dff6", "5": "#c2e3f6", "0": "#cce7f6"}
//example data set
let dataInner = [[3, 15, 16, 9, 4, 1, 6, 17, 20, 22, 14, 12, 10, 0, 8, 19, 18, 21, 24, 5, 2, 7, 23, 11],[2, 23, 4, 15, 16, 6, 21, 12, 19, 5, 1, 18, 8, 9, 13, 24, 2, 20, 3, 22, 10, 0, 17, 11],[9, 5, 14, 17, 2, 3, 9, 6, 11, 19, 22, 18, 1, 10, 21, 23, 0, 13, 16, 8, 4, 20, 24, 15],[24, 6, 17, 1, 18, 24, 20, 10, 7, 19, 22, 12, 3, 13, 4, 2, 16, 15, 8, 11, 9, 21, 0, 5],[19, 21, 2, 4, 1, 3, 13, 15, 23, 22, 24, 17, 20, 18, 7, 12, 10, 16, 5, 9, 0, 6, 8, 1],[22, 14, 15, 4, 19, 7, 18, 24, 1, 17, 21, 3, 11, 13, 2, 20, 12, 5, 9, 10, 0, 16, 6, 8],[19, 3, 22, 15, 1, 0, 20, 6, 5, 10, 14, 7, 4, 2, 11, 18, 21, 12, 8, 9, 24, 13, 23, 16],[ 2, 16, 20, 18, 10, 24, 22, 7, 0, 3, 4, 9, 8, 23, 5, 14, 15, 11, 1, 21, 19, 13, 12, 6],[17, 14, 11, 5, 21, 1, 6, 18, 12, 20, 8, 9, 19, 7, 16, 13, 15, 3, 2, 10, 22, 4, 0, 24],[17, 14, 11, 5, 21, 1, 6, 18, 12, 20, 8, 9, 19, 7, 16, 13, 15, 3, 2, 10, 22, 4, 0, 24],[1, 2, 13, 14, 18, 0, 9, 24, 10, 7, 15, 19, 17, 3, 22, 4, 6, 16, 21, 8, 12, 20, 23, 5],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],[20, 4, 7, 12, 18, 23, 5, 13, 2, 24, 3, 17, 22, 8, 10, 9, 16, 19, 1, 6, 14, 0, 21, 11],[9, 4, 11, 18, 13, 1, 0, 19, 8, 5, 14, 12, 23, 20, 10, 7, 15, 24, 17, 2, 6, 21, 3, 16],[0, 16, 10, 8, 19, 18, 5, 4, 13, 12, 23, 7, 1, 3, 22, 17, 14, 20, 21, 9, 6, 11, 15, 24],[3, 11, 4, 5, 7, 12, 23, 0, 21, 15, 8, 14, 10, 17, 6, 22, 9, 2, 19, 18, 16, 1, 13, 20],];
//this is needed for math .round to accurately calculate a percentage from 0-100 for your data set
const maxDataVal = 24
export const TwoLayerDonutChart = (props: twoLayerDonutChartProps) => {
  // const height = 750;
  // const width = 750;
  // const originaInnerRadius = 50;
  // const originalRadius = 70;
 let {height, width, innerRadius, outerRadius} = props
  console.log(innerRadius)
//controls how many segments of the heat map there are via how many items in array (all 1 because all segments same size)
  let pie = d3.pie()([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]);

  return (
    <svg height={height} width={width}>
      <g transform={`translate(${width/2},${height/2})`}>
        <text>testing</text>
        <Slice pie={pie} radius={outerRadius} />
        test
      </g>
    </svg>
  );
};


//function to render the graph itself, by making multiple pie graphs on top on one another, adjusting the inner and outer radius every time
const Slice: React.FC<sliceProps> | any= (props: sliceProps) => {
  let { pie, radius } = props;
  let newRadius = radius / 1.1
  let newInnerRadius = 1

  //loops through the arraylist and adjusts the radius and inner radius so chart prints properly
  return dataInner.map((point, index) => {
    newRadius = newRadius * 1.1
    newInnerRadius = newRadius * 1.09
    console.log("point",point)
    // renders individual segment of the chart
    return pie.map((slice: any, i: string | number) => {
      //@ts-ignore
      console.log('slice0', slice)
      return (
      <>
      
      
    <Path
      radius={newRadius}
      slice={slice}
      // @ts-ignore
      sliceColor={rgbGradient[`${Math.ceil(Math.round((Number(dataInner[index][i])/maxDataVal)*100)/5)*5}`]}
      innerRadius={newInnerRadius}
      //@ts-ignore
      currentVal={Number(dataInner[index][i])}
      />
      </>
  );

  })
  });
};

// let text = svg.append("g")
// .attr("class", "nodes")
// .selectAll("text")
// .data(nodes_data)
// .enter()
// .append("text")
// .attr("x", function(d) {return d.x})
// .attr("y", function(d) {return d.y})
// .text(function(d) {return d.name})


//where the d3 is actually implemented, creates the pie itself
class Path extends React.Component<pathProps, pathState> {
  
  constructor(props: pathProps) {
    super(props);
    
    this.state = {
      isHovered: false
    };
  }
  
  onMouseOver = () => {
    this.setState({
      isHovered: true
    });
  };

  onMouseOut = () => {
    this.setState({
      isHovered: false
    });
  };


  render() {
    let { radius, slice, sliceColor, innerRadius, currentVal } = this.props;

    const arc = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(radius)
      .padAngle(0.01)
      .cornerRadius(1)
//@ts-ignore
      // arc.append().append("text").style("text-anchor", "middle").text("Date");

    return (
      <g>
        <path
        //@ts-ignore
          d={arc(slice)}
          fill={sliceColor}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
        />       
         
        {/* render the filled circle on hover */}
        {this.state.isHovered && (
          <circle r={65} fill={sliceColor} values="test"/>
          )}
          {/* render the data value when hovering on section */}
        {this.state.isHovered && (
          <text  dx="-5" >{currentVal}</text>
        )}
        
        
      </g>
    );
  }
}
