/**
 * 僵尸企业的在不同地区上的分布
 * data:
 *     x: 地区
 *     y: 僵尸企业数量
 */
import React, {useEffect} from 'react';
import * as G2Plot from '@antv/g2plot';
import { connect } from 'react-redux';

function RadarmapArea(props){
    useEffect(()=>{
        const container = document.getElementById('RadarmapArea');
        const data = props.plotData;
        const config = {
          "title": {
            "visible": true,
            "text": "地域僵尸企业分布"
          },
          "description": {
            "visible": true,
            "text": "僵尸企业的在不同地区上的分布"
          },
          "legend": {
            "flipPage": false
          },
          "width": 300,
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
    })
    
    return(
        <div id='RadarmapArea'></div>
    )
}

const mapStateToProps = state =>{
  return{
    plotData: state.plotData.plotData.RadarmapArea
  }
}

export default connect(mapStateToProps)(RadarmapArea);
