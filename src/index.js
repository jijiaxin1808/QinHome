import dva from "dva";
import createHistory from "history/createBrowserHistory";
import "./index.css";

// 1. Initialize
const app = dva({
	history: createHistory(),
	onError (error, dispatch) {
		console.log(error);
	}
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require("./models/login").default);
app.model(require("./models/home").default);

// 4. Router
app.router(require("./router").default);

// 5. Start
app.start("#root");
