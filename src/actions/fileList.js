import actionTpye from './actionType';
// 导出action
export const onChangefilelist = (len) =>{
    return{
        type: actionTpye.CHANGE_FILELIST,
        payload:{// payload 为参数
            len
        }
    }
}
export const onChangeUploaded = (data) =>{
    return{
        type: actionTpye.CHANGE_UPLOADED,
        payload:{// payload 为参数
            data
        }
    }
}
