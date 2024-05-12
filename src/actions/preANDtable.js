import actionTpye from './actionType';
// 导出action
export const onChangeTablelist = (data) =>{
    console.log(data)
    return{
        type: actionTpye.CHANGE_TABLE,
        payload:{// payload 为参数
            data
        }
    }
}
export const onChangeisPredicting = (data) =>{
    return{
        type: actionTpye.CHANGE_ISPREDICTING,
        payload:{// payload 为参数
            data
        }
    }
}
export const onChangeisPredictable = (data) =>{
    return{
        type: actionTpye.CHANGE_ISPREDICTABLE,
        payload:{// payload 为参数
            data
        }
    }
}
export const onChangeDownloading = (data) =>{
    return{
        type: actionTpye.CHANGE_DOWNLOADING,
        payload:{// payload 为参数
            data
        }
    }
}
export const onChangeDownloadable = (data) =>{
    return{
        type: actionTpye.CHANGE_ISDOWNLOADABLE,
        payload:{// payload 为参数
            data
        }
    }
}