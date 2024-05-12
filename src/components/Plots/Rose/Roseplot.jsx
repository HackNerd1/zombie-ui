/**
 * 僵尸企业在所有企业种的占比
 * data:
 *     type: 地区
 *     value: 僵尸企业的数量
 */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Rose } from '@antv/g2plot';

function Roseplot(props){
    useEffect(()=>{
      if(props.counter !== 0 ){
        const orignData = props.plotData;
        // 用map 改变index的值
        var tempList = [];
        orignData.map((item)=>{
            var tempObj = {};
            tempObj['type'] = item['x']
            tempObj['value'] = item['y'];
            // 将obj push到tempList
            tempList.push(tempObj);
            return tempList
        })
        const data = tempList;
        const rosePlot = new Rose(document.getElementById('Roseplot'), {
            data,
            radiusField: 'value',
            categoryField: 'type',
            colorField: 'type',
            label: {
              visible: true,
              type: 'outer',
              formatter: (text) => text,
            },
            title:{
              text:'各地区僵尸企业在所有地区中的占比',
              visible:true
            },
            width: 300,
            height: 300,
        });
        rosePlot.render();
      }
    })
    return(
        <div id='Roseplot'></div>
    )
};

const mapStateToProps  = state =>{
  return{
    plotData : state.plotData.plotData.Roseplot,
    counter : state.plotData.counter
  }
}

export default connect(mapStateToProps)(Roseplot);