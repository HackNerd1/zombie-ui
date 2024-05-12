/**
 * 条形图
 * 僵尸企业/非僵尸企业控制人类型数量:
 *     data:
 *         地区
 *         僵尸企业数量
 */
import React, { useEffect } from 'react';
import * as G2Plot from '@antv/g2plot'
import { connect } from 'react-redux';

function BarplotPeople(props){
    useEffect(()=>{
      if(props.counter !== 0 ){
        const container = document.getElementById('BarplotPeople');
        const data = props.plotData;
        const config = {
            "title": {
              "visible": true,
              "text": "不同控制人类型僵尸企业数量"
            },
            "legend": {
              "flipPage": false
            },
            "xAxis": {
              "title": {
                "visible": false
              }
            },
            "yAxis": {
              "title": {
                "visible": false
              }
            },
            "forceFit": false,
            "width": 300,
            "height": 300,
            "xField": "x",
            "yField": "y",
            "color": [
              "#5B8FF9"
            ]
          }
          const plot = new G2Plot.Column(container, {
            data,
            ...config,
          });
          plot.render();
      }

    })
    return(
        <div id='BarplotPeople'></div>
    )
};

const mapStateToProps = state =>{
  return{
    plotData: state.plotData.plotData.BarplotPeople,
    counter : state.plotData.counter
  }
}

export default connect(mapStateToProps)(BarplotPeople);