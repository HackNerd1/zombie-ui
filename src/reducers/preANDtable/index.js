import actionTpye from '../../actions/actionType';

const initState = {
    tableList:[],
    isDownloadable:false,
    isDownloading:false,
    isPredicting:false,
}

export default (state = initState, action)=>{
    switch(action.type){
        // 数据显示中渲染的值
        case actionTpye.CHANGE_TABLE:
            console.log(action.payload.data);
            return{
                ...state,
                tableList:action.payload.data,
            }
        case actionTpye.CHANGE_ISPREDICTING:
            return{
                ...state,
                isPredicting:action.payload.data
            }
        case actionTpye.CHANGE_ISDOWNLOADABLE:
            return{
                ...state,
                isDownloadable : action.payload.data
            }
        case actionTpye.CHANGE_DOWNLOADING:
            return{
                ...state,
                isDownloading : action.payload.data
            }
        default:
            return state
    }
}