/**入口文件 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './Router';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
// 引入store
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <Router/>
    </Provider>
    ,
    document.getElementById('root')
);// 通过this.props.store来获取

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
