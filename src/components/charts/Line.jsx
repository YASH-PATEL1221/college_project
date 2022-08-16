import React,{Component} from 'react';
import Chart from "react-apexcharts";


class Line extends Component{
    constructor(props){
        super(props);

        this.state = {
            options:{
                  legend: {
                    show: true,
                    position:"top", 
                    fontSize: '15px',
                    fontFamily: 'Helvetica, Arial',
                    fontWeight: 400,
                    labels:{
                        colors:"#a8b3bb"
                    }
                  },
                chart:{
                    id:"basic-bar",
                    toolbar: {
                        show: false
                    }
                },
                xaxis:{
                    categories:this.props.Categories
                }
            },
            series:[
                {
                    name:"series",
                    data: this.props.Data
                }
            ]
        }
    }
    render(){
        return(
            <div>
                <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="line"
                    width={`${this.props.width}`}
                    height={`${this.props.height}`}
                />
            </div>
        )
    }
}

export default Line;
