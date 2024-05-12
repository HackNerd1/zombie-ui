/**
 * 僵尸企业在所有企业种的占比
 * data:
 *     x: 僵尸企业/非僵尸企业
 *     y: 僵尸企业/非僵尸企业的数量
 */

import React, { useEffect } from 'react';
import * as G2Plot from '@antv/g2plot';
import { connect } from 'react-redux';

function RingplotZombie (props){
    useEffect(()=>{

        if(props.counter !== 0 ){
            const container = document.getElementById('RingplotZombie');
            const orignData = props.plotData;
            console.log('test')
            // 用map 改变index的值
            var tempList = [];
            orignData.map((item)=>{
                var tempObj = {};
                if(item['x'] === 0){
                    tempObj['x'] = '非僵尸企业';
                }else{
                    tempObj['x'] = '僵尸企业'
                }
                tempObj['y'] = item['y'];
                // 将obj push到tempList
                tempList.push(tempObj);
                return tempList
            })
    
            const data = tempList;
            const config = {
                "title": {
                    "visible": true,
                    "text": "僵尸企业/非僵尸企业在所有企业中的占比"
                },
                // "description": {
                //     "visible": true,
                //     "text": "僵尸企业/非僵尸企业在所有企业中的占比"
                // },
                "legend": {
                    "flipPage": false
                },
                "width": 310,
                "height": 321,
                "forceFit": false,
                "radius": 1,
                "statistic": {
                    "visible": false
                },
                "colorField": "x",
                "angleField": "y",
                "color": [
                    "#5D7092",
                    "#5B8FF9",
                ]
            }
            const plot = new G2Plot.Ring(container, {
            data,
            ...config,
            });
    
            plot.render();
        }
    })

    return(
        <div id="RingplotZombie"></div>
    );

}

const mapStateToProps  = state =>{
    return{
      plotData : state.plotData.plotData.RingplotZombie,
      counter : state.plotData.counter
    }
  }

export default connect(mapStateToProps)(RingplotZombie);