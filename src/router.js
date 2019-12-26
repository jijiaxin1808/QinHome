import React from "react";
import { Router, Route, Switch ,Redirect} from "dva/router";
import Login from "./routes/login";
import MainApp from "./App";
import Manage from "./routes/manage/main";
import PrivateRoute from "./utils/privateRouter";

function RouterConfig({ history }) {
	return (
		<Router history={history}>
			<Switch> 
				<Route path="/index"  component={MainApp} />
				<Route path="/login"  component={Login} />
				<PrivateRoute path="/manage" component={Manage} />
				<Redirect from="/" to="/index/index" />
			</Switch>
		</Router>
	);
}

export default RouterConfig;
