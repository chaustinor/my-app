import React, { Component } from 'react';
import { connect } from "react-redux";
import { render } from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export default class MyChart extends Component {

  constructor(props){
    super(props)

    this.state = { 
      chartOptions: {
        credits: false,
        xAxis: {
          categories: ['A', 'B', 'C'],
        },
        series: [
          { data: [1, 2, 3] }
        ],
        plotOptions: {
          series: {
            point: {
              events: {
                mouseOver: this.setHoverData.bind(this)
              }
            }
          }
        }
      }
    }
  }

  setHoverData = (e) => { 
    // The chart is not updated because `chartOptions` has not changed.
    this.setState({ hoverData: e.target.category })
  }

  updateSeries = () => {
    // The chart is updated only with new options.
    this.setState({ 
      chartOptions: {
        series: [
          { data: [Math.random() * 5, 2, 1]}
        ]
      }
    });
  }

  componentDidMount(){
   
  }

  render() {
    const { chartOptions, hoverData } = this.state;

    return (
      <div>
      
        <div>
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
          />
          <h3>Hovering over {hoverData}</h3>
          <button onClick={this.updateSeries.bind(this)}>Update Series</button>
        </div>

      </div>
    );
  }
}

