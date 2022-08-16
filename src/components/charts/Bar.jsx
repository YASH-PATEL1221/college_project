import React, { Component } from 'react';
import Chart from "react-apexcharts"

class Bar extends Component{
  constructor(props){
    super(props);

    this.state = {
      options:{
        chart:{
          type:"bar"
        },
        series:[{
          name:"first",
          data:[44, 55, 57, 56, 61, 58, 63, 60, 66]
        }]
      }
    }
  }

  render(){
    return(
      <div>
        <Chart
          options={this.state.options}
          series={this.state.series}
          width="100px"
          height={"100px"}
          type="bar"
        />
      </div>
    )
  }
}
export default Bar
