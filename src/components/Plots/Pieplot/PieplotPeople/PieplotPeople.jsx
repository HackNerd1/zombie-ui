/**
 * 饼图
 * 僵尸企业在企业人类型上的分布
 * data:
 *     x: 企业人类型
 *     y: 僵尸企业数量
 */
import React, {useEffect} from 'react';
import * as G2Plot from '@antv/g2plot';
import { connect } from 'react-redux';

function PieplotPeople(props){
    useEffect(()=>{
        if(props.counter !== 0 ){
            const container = document.getElementById('PieplotPeople');
            const data = props.plotData
            const config = {
            "title": {
                "visible": true,
                "text": "不同公司类型中僵尸企业数量"
            },
            "legend": {
                "flipPage": false
            },
            "width": 300,
            "height": 300,
            "forceFit": false,
            "radius": 1,
            "colorField": "x",
            "angleField": "y",
            "color": [
                "#5B8FF9",
                "#5AD8A6",
                "#5D7092",
                "#F6BD16",
                "#E8684A"
            ]
            }
            const plot = new G2Plot.Pie(container, {
            data,
            ...config,
            });
            plot.render();
        }
        

    })
    return(
        <div id='PieplotPeople' style={{width:330}}></div>
    )
}
const mapStateToProps = state =>{
    return{
        plotData : state.plotData.plotData.PieplotIndustryType,
        counter : state.plotData.counter
    }
}

export default connect(mapStateToProps)(PieplotPeople);

