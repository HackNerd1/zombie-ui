/** 路由配置 */
import React from 'react';
// 引入组件
import { BrowserRouter as Router , Route, Switch} from "react-router-dom";
// 引入界面
import Index from './pages/index/index';
import Visualization from './pages/Visualization/Visualization'
import notFound from './pages/notfound/notfound';

function router() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Index}/>
        <Route exact path='/Visualization' component={Visualization}/>
        <Route exact path = '/*' component={notFound}/>
      </Switch>
    </Router>
  );
}
export default router;
