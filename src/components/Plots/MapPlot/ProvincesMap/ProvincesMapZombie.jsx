/**
 * 僵尸企业在各省份的分布情况
 * 
 */
import React, {useEffect} from 'react';
import { Scene, PolygonLayer, LineLayer, PointLayer } from '@antv/l7';
import { Mapbox, GaodeMap } from '@antv/l7-maps';
import { connect } from 'react-redux';

// css
import './ProvincesMapZombie.css';

export class DrawScene{
    constructor(data, configs) {
      this.configs = configs;
      this.data =data;
      this.dom = this.initDom();
    }
    draw() {
      this.scene = this.initScene();
      return new Promise(resolve => {
        this.scene.on('loaded', async () => {
          await this.initLayer();
          resolve();
        });
      });
    }
    initDom() {
      const container = document.getElementById('ProvincesMapZombie');
      return container;
    }
    initScene() {
      const { map } = this.configs;
      const { mapType, ...res } = map;
      const mapInstance = mapType === 'MapBox' ? new Mapbox(res) : new GaodeMap(res);
      const scene = new Scene({
        id: this.dom,
        map: mapInstance,
        logoVisible: false,
      });
      return scene;
    }
  async initLayer() {
    const layerType = this.configs.layerType;
    switch(layerType){
      case 'PolygonLayer': 
        await this.addFillLayer();
        break
      case 'PointLayer':
        await this.addPointLayer();
        break
      default:
        break
    }
  }

  async fetchAllData() {
        const { data } = this.configs;
        const fillData = await this.fetchData(data[1]);
        const labelData = await this.fetchData(data[3]);
        return {
          fill: fillData,
          label: labelData,
        };
      }

  async fetchData(cfg) {
        const response = await fetch(cfg.url);
        let data;
        if (cfg.type === 'csv') {
          data = await response.text();
        } else {
          data = await response.json();
        }
        return data;
      }

  joinData(data, fillData) {
        const { position } = this.configs;
        const layerData = {
          type: 'FeatureCollection',
          features: [],
        };
        const dataObj = {};
        data.forEach(element => {
          dataObj[element[position.sourceField]] = element;
        });
        fillData.features.forEach(element => {
          const key1 = element.properties[position.targetField];
          const key2 = element.properties[position.targetField1];
          const item = dataObj[key1] || dataObj[key2];
          if (item) {
            element.properties = {
              ...element.properties,
              ...item,
            };
            // @ts-ignore
            layerData.features.push(element);
          }
        });

      return layerData;
    }

  async addFillLayer(data) {
    const res = await this.fetchAllData();
    const fillData = this.joinData(this.data, res.fill);
    const { options, shape, scales, color, stroke } = this.configs;
    const fillLayer = new PolygonLayer(options)
      .source(fillData)
      .shape(shape.values)
      .scale(scales.values)
      .style({
        opacity: color.opacity,
      });
    if (color.field) {
      fillLayer.color(color.field, color.values);
    } else {
      fillLayer.color(color.values);
    }
    this.scene.addLayer(fillLayer);
    if (stroke.visible) {
      const lineLayer = new LineLayer()
        .source(fillData)
        .shape('line')
        .color(stroke.color)
        .size(stroke.size)
        .style({
          opacity: stroke.opacity,
        });
      this.scene.addLayer(lineLayer);
    }
    this.addLabelLayer(res.label);
        
  }
    addPointLayer() {
        const { position, options, shape, scales, color, stroke } = this.configs;
        const pointLayer = new PointLayer(options)
          .source(this.data,{
            parser: position.parser,
          })
          .shape(shape.values)
          .scale(scales.values)
          .style({
            opacity: color.opacity,
            stroke: stroke.color,
            strokeOpacity: stroke.visible ? stroke.opacity : 0,
            strokeWidth: stroke.size,
    
          });
        if (color.field) {
          pointLayer.color(color.field, color.values);
        } else {
          pointLayer.color(color.values);
        }
        this.scene.addLayer(pointLayer);
        this.addLabelLayer(this.data);
    
  }

  addLabelLayer(data) {
        const { label } = this.configs;
        if (label.visible && label.field) {
          const labelLayer = new PointLayer()
            .source(data, {
              parser: {
                type: 'json',
                coordinates: 'center',
              },
            })
            .shape(label.field, 'text')
            .color(label.color)
            .size(label.size)
            .style({
              stroke: label.stroke,
              strokeWidth: label.strokeWidth,
              strokeOpacity: label.strokeOpacity,
              textAllowOverlap: label.textAllowOverlap,
            });
          this.scene.addLayer(labelLayer);
        }
      }
    }

function ProvincesMapZombie(props){
    useEffect(()=>{
      console.log(props.plotData)
      if(props.counter !== 0 ){
        // const data = props.plotData;

        const data = [{"name":"湖北","confirm":1224,"suspect":0,"heal":533,"dead":479},{"name":"广东","confirm":1251,"suspect":0,"heal":37,"dead":0},{"name":"浙江","confirm":10,"suspect":0,"heal":65,"dead":0},{"name":"河南","confirm":0,"suspect":0,"heal":41,"dead":2},{"name":"湖南","confirm":1253,"suspect":0,"heal":35,"dead":0},{"name":"江西","confirm":1295,"suspect":0,"heal":27,"dead":0},{"name":"安徽","confirm":0,"suspect":0,"heal":20,"dead":0},{"name":"重庆","confirm":0,"suspect":0,"heal":15,"dead":2},{"name":"江苏","confirm":20,"suspect":0,"heal":13,"dead":0},{"name":"山东","confirm":1267,"suspect":0,"heal":13,"dead":0},{"name":"四川","confirm":0,"suspect":0,"heal":23,"dead":1},{"name":"北京","confirm":0,"suspect":0,"heal":24,"dead":1},{"name":"上海","confirm":20,"suspect":0,"heal":15,"dead":1},{"name":"福建","confirm":1279,"suspect":0,"heal":7,"dead":0},{"name":"黑龙江","confirm":0,"suspect":0,"heal":7,"dead":2},{"name":"陕西","confirm":0,"suspect":0,"heal":6,"dead":0},{"name":"广西","confirm":1284,"suspect":0,"heal":10,"dead":0},{"name":"河北","confirm":0,"suspect":0,"heal":4,"dead":1},{"name":"云南","confirm":0,"suspect":0,"heal":5,"dead":0},{"name":"海南","confirm":91,"suspect":0,"heal":4,"dead":1},{"name":"辽宁","confirm":0,"suspect":0,"heal":3,"dead":0},{"name":"山西","confirm":0,"suspect":0,"heal":4,"dead":0},{"name":"天津","confirm":0,"suspect":0,"heal":2,"dead":1},{"name":"贵州","confirm":0,"suspect":0,"heal":8,"dead":0},{"name":"甘肃","confirm":0,"suspect":0,"heal":4,"dead":0},{"name":"吉林","confirm":0,"suspect":0,"heal":1,"dead":0},{"name":"内蒙古","confirm":0,"suspect":0,"heal":3,"dead":0},{"name":"宁夏","confirm":0,"suspect":0,"heal":1,"dead":0},{"name":"新疆","confirm":0,"suspect":0,"heal":0,"dead":0},{"name":"香港","confirm":18,"suspect":0,"heal":0,"dead":1},{"name":"青海","confirm":0,"suspect":0,"heal":3,"dead":0},{"name":"台湾","confirm":0,"suspect":0,"heal":0,"dead":0},{"name":"澳门","confirm":10,"suspect":0,"heal":0,"dead":0},{"name":"西藏","confirm":1,"suspect":0,"heal":0,"dead":0}]
        const configs = {"map":{"type":"Map","mapType":"MapBox","pitch":0,"style":"blank","center":[104.288144,31.239692],"zoom":3,"visible":true,"controlsVisible":true,"controls":{"logo":{"visible":true,"disable":false,"position":"bottomleft"},"scale":{"visible":true,"disable":false,"position":"bottomright"},"zoom":{"visible":true,"disable":false,"position":"topright"},"attach":{"visible":true,"disable":true,"position":"bottomright"}}},"type":"FillDistrict","layerType":"PolygonLayer","options":{"autoFit":true},"position":{"visible":false,"disable":true,"type":"loc","loc":null,"targetField":"name","targetField1":"code","sourceField":"name"},"shape":{"visible":false,"field":null,"values":"fill"},"size":{"visible":false},"colorScheme":{"type":"singlehue","stops":5,"reverse":false,"name":"Blues"},"scales":{"values":{"color":{"type":"quantile","field":"confirm"}}},"color":{"visible":true,"field":"confirm","values":["rgb(239,243,255)","rgb(189,215,231)","rgb(107,174,214)","rgb(49,130,189)","rgb(8,81,156)"],"scale":"quantile","opacity":1},"stroke":{"visible":true,"field":null,"color":"rgb(93,112,146)","size":0.6,"opacity":0.77},"label":{"visible":true,"field":"name","size":12,"opacity":1,"color":"#fff","stroke":"#fff","strokeWidth":1.2,"strokeOpacity":1,"textAllowOverlap":false},"guojie":{"visible":true},"data":[{"name":"province_value","alias":"属性数据","url":"https://gw.alipayobjects.com/os/basement_prod/bfb05f5d-3700-4dd4-ac77-b599d5aeaf39.json"},{"name":"province","alias":"省级行政区","url":"https://gw.alipayobjects.com/os/bmw-prod/1981b358-28d8-4a2f-9c74-a857d5925ef1.json"},{"name":"boundaries","alias":"国界线、海岸线","url":"https://gw.alipayobjects.com/os/basement_prod/ba8fa803-a8c3-4c67-b806-fe1c444546bd.json"},{"name":"label","alias":"标注点","url":"https://gw.alipayobjects.com/os/bmw-prod/c4a6aa9d-8923-4193-a695-455fd8f6638c.json"},{"name":"island","alias":"岛屿标注","url":"https://gw.alipayobjects.com/os/basement_prod/ffb777af-c499-4c3a-8226-fe9b1e877793.json"}]}
        const mapScene = new DrawScene(data, configs);
    
        mapScene.draw();
      }

    })
    return(
        <div id ='ProvincesMapZombie'></div>
    )
}

const mapStateToProps = state =>{
  return{
    plotData: state.plotData.plotData.ProvincesMapZombie,
    counter : state.plotData.counter
  }
}

export default connect(mapStateToProps)(ProvincesMapZombie);