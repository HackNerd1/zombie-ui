/**标签页 */
import React from 'react';
// 引入antd组件
import { Tabs, Divider, Button, Input, Tooltip, Descriptions, message, Col, Row, Empty  } from 'antd';
import { AndroidOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import Axios from 'axios';
// 引入自定义组件
import Upload from '../upload/upload';
// action
import { onChangeisPredicting, onChangeDownloadable, onChangeTablelist, onChangeDownloading } from '../../actions/preANDtable';
import { onPlotData, onChangeIsLoading, onChageCounter } from '../../actions/plotData';

const { TabPane } = Tabs;
const { Search } = Input;

//function

function Tappage(props){
    function handleDownload(){// 下载按钮
        Axios.get('/apis/download/')
        .then(function (res) {
            props.dispatch(onChangeDownloading(true))
            console.log(res);
            let blob = new Blob([res.data],{
                type:'text/csv;charset=utf-8;'
            })
            if (typeof window.navigator.msSaveBlob !== 'undefined') {
                  window.navigator.msSaveBlob(blob, 'output.csv');
            } else {
                var blobURL = window.URL.createObjectURL(blob);// 将blob对象转为一个URL
                var tempLink = document.createElement('a');// 创建一个a标签
                tempLink.style.display = 'none';
                tempLink.href = blobURL;
                tempLink.setAttribute('download', 'output.csv');// 给a标签添加下载属性
                if (typeof tempLink.download === 'undefined') {
                tempLink.setAttribute('target', '_blank');
                }
                document.body.appendChild(tempLink);// 将a标签添加到body当中
                tempLink.click();// 启动下载
                document.body.removeChild(tempLink);// 下载完毕删除a标签
                window.URL.revokeObjectURL(blobURL);
                props.dispatch(onChangeDownloading(false))
            }
        }).catch(function (err) {
        console.log(err);
        });
    };
    function onPredict(){// 点击预测
        // 将button改为predicting
        props.dispatch(onChangeisPredicting(true));
        props.dispatch(onChangeIsLoading(true));
        props.dispatch(onChageCounter(1));
        
        message.info('正在预测····该过程需要等待2-3s');
        // 请求数据
        Axios.get('/apis/predict/')
        .then(function (res) {
            console.log(res);
            // 将predicting改为false
            message.success('预测成功');
            props.dispatch(onChangeisPredicting(false));
            props.dispatch(onChangeDownloadable(true))

            // 渲染table
            Axios.get('/apis/gettable/')
            .then(function (res) {
                console.log(res);
                props.dispatch(onChangeTablelist(res.data))
            }).catch(function (err) {
                console.log(err);
            });

            // 渲染可视化
            Axios.get('/apis/plotData/')
            .then(function (res) {
                console.log(res);
                props.dispatch(onPlotData(JSON.parse(res.data)));
    
                props.dispatch(onChangeIsLoading(false));
            }).catch(function (err) {
                console.log(err);
            });

        }).catch(function (err) {
            console.log(err);
        });
        
    };

    // 数组需要放在外面map
    let tableList = props.tableList.map(item=>(
        <Descriptions.Item style={{textAlign:"center"}} label={item[0]}>{item[1]}</Descriptions.Item>
    ))
    return(
        <Tabs defaultActiveKey="1">
            <TabPane
                tab={
                    <span>
                        <Tooltip placement="left" title='需要上传四分csv'>
                            <QuestionCircleOutlined />
                        </Tooltip>
                        CSV上传
                    </span>
                }
                key="1"
            >
                <Row>
                    {/* upload */}
                    <Col span={17} style={{height:250}}>
                        <Upload/>
                    </Col>
                    {/* 分隔线 */}
                    <Col span={1} style={{ textAlign:"center"}}>
                        <Divider type='vertical' style={{height:(260), color:'rgba(0,0,0,1)', textAlign:"center"}}></Divider>
                    </Col>
                    <Col span={6} style={{height:250}}>
                        {/* 预测 */}
                        <p>
                            数据预测预测&nbsp;
                            <Tooltip placement="right" title='上传四分csv后开放预测, 预测过程需要1-2s'>
                                <QuestionCircleOutlined />
                            </Tooltip>
                        </p>
                        {
                            props.isPredictable & props.uploaded
                            ?
                            
                                props.isPredicting
                                ?
                                <Button style={{height:50}} type="primary" loading={true} block>
                                    Predicting
                                </Button>
                                :
                                <Button style={{height:50}} type="primary" onClick={onPredict} block>
                                    预测
                                </Button>
                            
                            :
                            <Button style={{height:50}} type="primary" block disabled>
                                预测
                            </Button>
                        }
                        
                        <p/><br/><br/><br/><br/>

                        {/* 下载 */}
                        <span>
                            结果下载&nbsp;
                            <Tooltip placement="right" title='预测完后开放下载'>
                                <QuestionCircleOutlined />
                            </Tooltip>
                        </span>
                        {/* 下载 */}
                        {
                            props.isDownloadable
                            ?
                                props.isDownloading
                                ?
                                <Button onClick={handleDownload} loading block>DownLoad</Button>
                                :
                                <Button onClick={handleDownload} block>DownLoad</Button>
                            :
                            <Button disabled block>DownLoad</Button>
                        }
                    </Col>
                </Row>
            </TabPane>
            <TabPane
                tab={
                    <span>
                        <AndroidOutlined />
                        结果预览
                    </span>
                }
                key="2"
            >
                <Search
                    placeholder="输入企业ID"
                    onSearch={value => console.log(value)}
                    style={{ width: 200, float:"right" }}
                />
                <Descriptions title="默认显示前5条数据"  column={1} bordered>
                    {
                        props.tableList.length===0
                        ?
                        <div style={{height:210}}>
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'暂无数据'}/>
                        </div>
                        :
                        [tableList]
                    }
                </Descriptions>
            </TabPane>
        </Tabs>
    )
}
const mapStateToProps  = state =>{
    return{
        uploaded : state.fileList.uploaded,
        filecount : state.fileList.filecount,
        tableList : state.tableList.tableList,
        isPredicting : state.preANDtable.isPredicting,
        isPredictable : state.fileList.isPredictable,
        isDownloadable : state.preANDtable.isDownloadable,
        isDownloading : state.preANDtable.isDownloading
    }
  }
export default connect(mapStateToProps)(Tappage);