import actionTpye from '../../actions/actionType';

const initState = {
    plotData:{'RadarmapIndustry': [{'x': '交通运输业', 'y': 1577}, {'x': '工业', 'y': 1481}, {'x': '商业服务业', 'y': 1464}, {'x': '服务业', 'y': 1459}, {'x': '零售业', 'y': 1438}, {'x': '社区服务', 'y': 1433}], 'PieplotIndustryType': [{'x': '有限责任公司', 'y': 1815}, {'x': '农民专业合作社', 'y': 1777}, {'x': '集体所有制企业', 'y': 1761}, {'x': '股份有限公司', 'y': 1750}, {'x': '合伙企业', 'y': 1729}], 'Roseplot': [{'x': '江西', 'y': 1295}, {'x': '广西', 'y': 1284}, {'x': '福建', 'y': 1279}, {'x': '山东', 'y': 1267}, {'x': '湖南', 'y': 1253}, {'x': '广东', 'y': 1251}, {'x': '湖北', 'y': 1224}], 'BarplotPeople': [{'x': '企业法人', 'y': 4516}, {'x': '自然人', 'y': 4317}], 'RingplotZombie': [{'x': 0.0, 'y': 21650}, {'x': 1.0, 'y': 8928}], 'RadarmapArea': [{'x': '江西', 'y': 4429}, {'x': '广西', 'y': 4402}, {'x': '广东', 'y': 4383}, {'x': '湖南', 'y': 4353}, {'x': '山东', 'y': 4351}, {'x': '福建', 'y': 4348}, {'x': '湖北', 'y': 4333}], 'LiquidplotZombie': 21650, 'not_zomboe_sum': 8928, 'data_len': 30884, 'ProvincesMapZombie': [{'name': '云南', 'code': 530000, 'value': ''}, {'name': '黑龙江', 'code': 230000, 'value': ''}, {'name': '贵州', 'code': 520000, 'value': ''}, {'name': '北京市', 'code': 110000, 'value': ''}, {'name': '河北', 'code': 130000, 'value': ''}, {'name': '山西', 'code': 140000, 'value': ''}, {'name': '吉林', 'code': 220000, 'value': ''}, {'name': '宁夏回族自治区', 'code': 640000, 'value': ''}, {'name': '辽宁', 'code': 210000, 'value': ''}, {'name': '海南', 'code': 460000, 'value': ''}, {'name': '内蒙古自治区', 'code': 150000, 'value': ''}, {'name': '天津市', 'code': 120000, 'value': ''}, {'name': '新疆维吾尔自治区', 'code': 650000, 'value': ''}, {'name': '上海市', 'code': 310000, 'value': ''}, {'name': '陕西', 'code': 610000, 'value': ''}, {'name': '甘肃', 'code': 620000, 'value': ''}, {'name': '安徽', 'code': 340000, 'value': ''}, {'name': '香港特别行政区', 'code': 810000, 'value': ''}, {'name': '广东', 'code': 440000, 'value': ''}, {'name': '河南', 'code': 410000, 'value': ''}, {'name': '湖南', 'code': 430000, 'value': ''}, {'name': '江西', 'code': 360000, 'value': ''}, {'name': '四川', 'code': 510000, 'value': ''}, {'name': '广西壮族自治区', 'code': 450000, 'value': ''}, {'name': '江苏', 'code': 320000, 'value': ''}, {'name': '澳门特别行政区', 'code': 820000, 'value': ''}, {'name': '浙江', 'code': 330000, 'value': ''}, {'name': '山东', 'code': 370000, 'value': ''}, {'name': '青海', 'code': 630000, 'value': ''}, {'name': '重庆市', 'code': 500000, 'value': ''}, {'name': '福建', 'code': 350000, 'value': ''}, {'name': '湖北', 'code': 420000, 'value': 1224}, {'name': '西藏自治区', 'code': 540000, 'value': ''}, {'name': '台湾', 'code': 710000, 'value': ''}]},
    counter:0,
    isLoading:true
}


export default (state = initState, action)=>{
    switch(action.type){
        case actionTpye.CHANGE_PLOT_DATA:
            return{
                ...state,
                plotData: action.payload.data
            }
        case actionTpye.CHANGE_COUNTER:
            return{
                ...state,
                counter: action.payload.data
            }
        case actionTpye.CHANHE_ISLOADING:
            return{
                ...state,
                isLoading: action.payload.data
            }
        default:
            return state
    }
}