import actionTpye from './actionType';

export const onPlotData = (data) =>{
    console.log(data)
    return{
        type: actionTpye.CHANGE_PLOT_DATA,
        payload:{// payload 为参数
            data
        }
    }
}

export const onChageCounter = (data) =>{
    console.log(data)
    return{
        type: actionTpye.CHANGE_COUNTER,
        payload:{// payload 为参数
            data
        }
    }
}

export const onChangeIsLoading = (data) =>{
    console.log(data)
    return{
        type: actionTpye.CHANHE_ISLOADING,
        payload:{// payload 为参数
            data
        }
    }
}