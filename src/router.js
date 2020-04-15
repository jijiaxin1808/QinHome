import React, {lazy, Suspense} from "react";
import { Router, Route, Switch ,Redirect} from "dva/router";
import Loading from "./components/loading";
import PrivateRoute from "./utils/privateRouter";
// import Login from "./routes/login"
import MainApp from "./App";
// import Manage from "./routes/manage/main";
const Login = lazy(() => import("./routes/login"));
// const MainApp = lazy(() => import("./App"))
const Manage = lazy(()=> import("./routes/manage/main"));

function RouterConfig({ history }) {
	return (
		<Suspense fallback={<Loading />} maxDuration={500}>
		<Router history={history}>
			<Switch> 
				<Route path="/index"  component={MainApp} />
				<Route path="/login"  component={Login} />
				<PrivateRoute path="/manage" component={Manage} />
				<Redirect from="/" to="/index/index" />
			</Switch>
		</Router>
		</Suspense>
	);
}

export default RouterConfig;
