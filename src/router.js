import React from "react";
import { Router, Route, Switch ,Redirect} from "dva/router";
import Login from "./routes/login";
import MainApp from "./App";
import Article from "./routes/article";
import Manage from "./routes/manage/main";
import Services from "./routes/services";
import PrivateRoute from "./utils/privateRouter";
import Home from "./routes/home";
function RouterConfig({ history }) {
	return (
		<Router history={history}>
			<Switch> 
				{/* <Route path="/"  component={Home} /> */}
				<Route path="/index"  component={MainApp} />
				<Route path="/login"  component={Login} />
				<Route path="/services" component={Services}/>
				<PrivateRoute path="/manage" component={Manage} />

				{/* <Redirect from="/" to="/index/index" /> */}
			</Switch>
		</Router>
	);
}

export default RouterConfig;
