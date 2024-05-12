// 数据初始化
import actionTpye from '../../actions/actionType';

const initState = {
    isVisible:false
}

export default (state = initState, action)=>{
    switch(action.type){
        case actionTpye.ONCLOSE_MODAL:
            return{
                ...state,
                isVisible:false,
            }
        case actionTpye.ONOPEN_MODAL:
            return{
                ...state,
                isVisible:true
            }
        default:
            return state
    }
}