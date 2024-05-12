/**
 * 僵尸企业的在不同行业上的分布
 * data:
 *     x: 地区
 *     y: 僵尸企业数量
 */
import React, {useEffect} from 'react';
import * as G2Plot from '@antv/g2plot';
import { connect } from 'react-redux';

function RadarmapIndustry(props){
    useEffect(()=>{
      if(props.counter !== 0 ){
        const container = document.getElementById('RadarmapIndustry');

        const data = props.plotData;
        const config = {
          "title": {
            "visible": true,
            "text": "不同行业僵尸企业数量"
          },
          "legend": {
            "flipPage": false
          },
          "width": 250,
          "height": 300,
          "forceFit": false,
          "radius": 1,
          "angleField": "x",
          "radiusField": "y",
          "color": [
            "#5B8FF9"
          ]
        }
        const plot = new G2Plot.Radar(container, {
          data,
          ...config,
        });
        plot.render();
      }

    })
    
    return(
        <div id='RadarmapIndustry'></div>
    )
}
const mapStateToProps = state =>{
  return{
    plotData: state.plotData.plotData.RadarmapIndustry,
    counter : state.plotData.counter
  }
}


export default connect(mapStateToProps)(RadarmapIndustry);