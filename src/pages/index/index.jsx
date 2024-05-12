/**主页 */
import React from 'react';
// 引入antd组件
import { Layout, Button, Col, Row } from 'antd';
// 引入组件
import { connect } from 'react-redux';
// import Tappage from '../../components/TapPages/TapPage';

// 引入action
import { onCloseModal } from '../../actions/modal';
// 引入样式
import './index.css';

const { Content } = Layout;

// 组件
class index extends React.Component{
  componentDidMount(){
    console.log(this.props.history)
  }
  
  onClose=()=>{// 关闭modal
    this.props.dispatch(onCloseModal())
  }
  onOpen=()=>{// 打开modal 路由跳转
    // this.props.dispatch(onOpenModal())
    this.props.history.push('/Visualization')
  }
  // http请求测试
  render(){
    return (
      <Layout>
        <Content className='Content'>
          {/* 对话框 */}
          {/* <Modal
              visible={this.props.isVisible}
              footer={null}
              centered = {true}
              mask = {true}
              height={'60%'}
              okText='下载'
              onCancel={this.onClose}
            >
              <Fragment>
                <p >僵尸企业画像数据接口</p>
                <Tappage/>
              </Fragment>
          </Modal> */}
          {/* 大标题 */}
          <Row style={{marginTop:'17%'}}>
            <Col span={24} style={{textAlign:"center",color:'white'}}>
              <span style={{fontFamily:'Arial, Helvetica, sans-serif',fontSize:70,fontWeight:600}}>僵尸企业画像接口</span>
            </Col>
          </Row>
          {/* 小字 */}
          <Row>
            <Col span={24} style={{textAlign:"center",color:'rgba(255,255,255,0.8)', fontSize:18}}>
              <span>A&ensp;data&ensp;interface&ensp;for&ensp;outsources</span>
            </Col>
          </Row>
          <br/>
          {/* 开始按钮 */}
          <Row>
            <Col span={10}/>
            <Col span={4}>
              <Button style={{height:60,fontSize:30,border:'2px solid'}} onClick={this.onOpen} ghost={true} block>
                Get&emsp;Start
              </Button>
            </Col>
            <Col/>
          </Row>
        </Content>
        {/* 页脚 */}
        {/* <Footer style={{marginTop:-50, background:'rgba(255,255,255,0.2)',textAlign:"center",color:'white', height:30}}>
          <span>@宁波工程学院&emsp;@移动健康与信息安全实验室&emsp;@机器学习小组&emsp;成员: 贺小骅 吴宗飞 金恺睿 郑程骏 何升鸿&emsp;</span>
          <br/>
          <span>Author:&emsp;@Hansel&emsp;&emsp;Designed&ensp;at&ensp;2020-2-15</span>
        </Footer> */}
      </Layout>
    );
  }
}

const mapStateToProps  = state =>{
  return{
    isVisible : state.modal.isVisible,
    fileCount : state.fileList.filecount
  }
}

export default connect(mapStateToProps)(index);