import React from "react";
import { Router, Route, Switch } from "dva/router";
import Login from "./routes/login";
import MainApp from "./App";
import Manage from "./routes/manage/main"
function RouterConfig({ history }) {
	return (
		<Router history={history}>
			<Switch> 
				<Route path="/" exact component={MainApp} />
				<Route path="/login" component={Login} />
        <Route path="/manage" component={Manage} />
			</Switch>
		</Router>
	);
}

export default RouterConfig;
