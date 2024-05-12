import {combineReducers} from 'redux';

import modal from './modal/modal';
import fileList from './fileList/index';
import tableList from './preANDtable/index';
import preANDtable from './preANDtable/index';
import plotData from './plotData/plotData';

export default combineReducers({
    modal,
    fileList,
    tableList,
    preANDtable,
    plotData
})
