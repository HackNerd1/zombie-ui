import actionTpye from './actionType';
// 导出action
export const onCloseModal = (id) =>{
    return{
        type: actionTpye.ONCLOSE_MODAL,
        payload:{// payload 为参数
            id
        }
    }
}

export const onOpenModal = (id) =>{
    return{
        type: actionTpye.ONOPEN_MODAL,
        payload:{// payload 为参数
            id
        }
    }
}
