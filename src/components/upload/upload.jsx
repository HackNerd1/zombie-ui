import React from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Fragment } from 'react';
// 引入action
import { onChangefilelist, onChangeUploaded } from '../../actions/fileList';
import { connect } from 'react-redux';

const { Dragger } = Upload;

function uploadComponent(props){// 更改文件数目
  function Changefilelist(len){
    props.dispatch(onChangefilelist(len))
  }
  const Dragerprops = {
    name: 'csvfile',
    multiple: true,
    action: '/apis/uploadcsv/',
    method:'post',
    accept:'.csv',
    showUploadList:false,
    headers:{
      // 'Content-Type': 'multipart/form-data',
      // 删掉请求头就好了 也不懂原理
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
        // 对应改变tappage的length
        Changefilelist(info.fileList.length);
      }
      if (status === 'done') {
        message.success(`${info.file.name} 文件上传成功！.`);
        props.dispatch(onChangeUploaded(true))
      } else if (status === 'error') {
        message.error(`${info.file.name} 文件上传失败！`);
      }
    },
  };

  return(
    <Fragment>
        <Dragger {...Dragerprops}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击或者拖动文件至此</p>
            <p className="ant-upload-hint">
                支持单文件和多文件上传(仅支持csv文件)
            </p>
            <p className="ant-upload-hint">
                按Ctrl上传多文件
            </p>
        </Dragger>
    </Fragment>
  )
}

const mapStateToProps  = state =>{
  return{
    filecount : state.fileList.filecount
  }
}
export default connect(mapStateToProps)(uploadComponent) ;