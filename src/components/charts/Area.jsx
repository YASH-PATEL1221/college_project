import React,{Component} from 'react';
import Chart from "react-apexcharts"

class Area extends Component{
    constructor(props){
        super(props);

        this.state = {
            options:{
                dataLabels: {
                    enabled: false
                  },
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
                    id:"area",
                    stacked:true,
                    toolbar:{
                        show:false
                    },
                    animations: {
                        enabled: true,
                        easing: 'easeinout',
                        speed: 700,
                        animateGradually: {
                            enabled: true,
                            delay: 100
                        },
                        dynamicAnimation: {
                            enabled: true,
                            speed: 350
                        }
                    },
                }
                ,
                xaxis:{
                    categories:[1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
                    lables:{
                        style:{
                            colors:["#00b7ff"]
                        }
                    }
                }
            },
            series:[
                {
                    name:`${this.props.series1}`,
                    data:[100,150,80,40,50]
                },
                {
                    name:`${this.props.series2}`,
                    data:[200,100,0,40,50]
                },
            ]
        }
    }
    render(){
        return(
            <div>
                <Chart
                options={this.state.options}
                series={this.state.series}
                type="area"
                width={`${this.props.width}`}
                height={`${this.props.height}`}
                />
            </div>
        )
    }
}

export default Area
