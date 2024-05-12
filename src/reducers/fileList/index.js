import actionTpye from '../../actions/actionType';

const initState = {
    filecount:0,
    isPredictable:false,
    uploaded:false
    // isPredictable:默认应为 true
}

export default (state = initState, action)=>{
    switch(action.type){
        case actionTpye.CHANGE_FILELIST:
            if(action.payload.len>3){
                return{
                    ...state,
                    filecount:action.payload.len,
                    isPredictable:true
                }
            }else{
                return{
                    ...state,
                    filecount:action.payload.len,
                    isPredictable:false
                }
            }
        case actionTpye.CHANGE_UPLOADED:
            return{
                ...state,
                uploaded:action.payload.data
            }
        default:
            return state
    }
}