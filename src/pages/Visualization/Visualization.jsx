/**可视化 */
import React from 'react';
import { connect } from 'react-redux';
// 引入antd组件
import { Layout, Col, Row, Card, Spin } from 'antd';

// 引入自定义组件
import Tappage from '../../components/TapPages/TapPage';
import Empty from '../../components/EmptyCMP/EmptyCMP';

// 可视化
import RingplotZombie from '../../components/Plots/Ring/RingplotZombie/RingplotZombie';
import Roseplot from '../../components/Plots/Rose/Roseplot';
import ProvincesMapZombie from  '../../components/Plots/MapPlot/ProvincesMap/ProvincesMapZombie.jsx'
import RadarmapIndustry from '../../components/Plots/Radarmap/RadarmapIndustry/RadarmapIndustry';
import BarplotPeople from '../../components/Plots/Barplot/BarplotPeople/BarplotPeople';
import PieplotPeople from '../../components/Plots/Pieplot/PieplotPeople/PieplotPeople';
// import MapPlot from '../../components/Plots/MapPlot/Mapplot/Mapplot';

// 引入样式

import './Visualzation.css';

const { Content, Header } = Layout;


function Visualization(props){
    return(
        <Layout>
            <Header>
                在线预测&数据可视化
            </Header>
            <Content>
                <Row 
                    gutter={16}
                    style={{padding:20}}
                >
                    <Col span={8}>{/* 在线数据预测 */}
                        <Card
                            hoverable
                            title="在线数据预测"
                        >
                            <Tappage/>
                        </Card>
                    </Col>
                    <Col span={6}>{/* 僵尸企业/非僵尸企业占比 */}
                        <Card
                            hoverable
                            title="标签"
                        >   
                            {
                                props.counter===0
                                ?
                                    <Empty/>
                                :
                                    props.isLoading
                                    ?
                                        <Spin tip="Loading...">
                                            <Empty/>
                                        </Spin>
                                    :
                                        <RingplotZombie/>
                            }
                            
                            
                        </Card>
                    </Col>
                    <Col span={10}>{/* 各地区僵尸企业分布 */}
                        <Card
                            hoverable
                            title="地区僵尸企业分布"
                        >
                            {
                                props.counter===0
                                ?
                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                :
                                    props.isLoading
                                    ?
                                        <Spin tip="Loading...">
                                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                        </Spin>
                                    :
                                    <ProvincesMapZombie/>
                            }

                        </Card>
                    </Col>
                </Row>
                <Row 
                    gutter={16}
                    style={{padding:20}}
                >
                    <Col span={6}>{/* 地区僵尸企业占比 */}
                        <Card
                            hoverable
                            title="地区"
                        >
                            {
                                props.counter===0
                                ?
                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                :
                                    props.isLoading
                                    ?
                                        <Spin tip="Loading...">
                                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                        </Spin>
                                    :
                                    <Roseplot/>
                            }
                        </Card>
                    </Col>
                    <Col span={6}>{/* 公司类型僵尸企业分布*/}
                        <Card
                            hoverable
                            title="公司类型"
                        >
                            {
                                props.counter===0
                                ?
                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                :
                                    props.isLoading
                                    ?
                                        <Spin tip="Loading...">
                                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                        </Spin>
                                    :
                                    <PieplotPeople/>
                            }
                        </Card>
                    </Col>
                    <Col span={6}>{/* 控制人类型 */}
                        <Card
                            hoverable
                            title="控制人类型"
                        >
                            {
                                props.counter===0
                                ?
                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                :
                                    props.isLoading
                                    ?
                                        <Spin tip="Loading...">
                                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                        </Spin>
                                    :
                                    <BarplotPeople/>
                            }
                        </Card>
                    </Col>
                    <Col span={6}>{/* 行业僵尸企业分布 */}
                        <Card
                            hoverable
                            title="行业"
                        >
                            {
                                props.counter===0
                                ?
                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                :
                                    props.isLoading
                                    ?
                                        <Spin tip="Loading...">
                                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                        </Spin>
                                    :
                                    <RadarmapIndustry/>
                            }
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}

const mapStateToProps  = state =>{
    return{
        isLoading : state.plotData.isLoading,
        counter : state.plotData.counter
    }
}

export default connect(mapStateToProps)(Visualization);