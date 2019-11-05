import React from "react";
import classnames from "classnames";
import "./index.less";

class ToTop extends React.Component {
	constructor () {
		super();
		this.state = {
			isshow: false
		};
	}

	render () {
		const func = () => {
			window.scrollTo(0, 0);
		};
		document.body.onscroll = () => {
			if (document.documentElement.scrollTop > 400) {
				this.setState({ isshow: true });
			} else {
				this.setState({ isshow: false });
			}
		};
		const scrollTop = document.documentElement.scrollTop;
		return (
      <><div
        	onClick={() => { func(); }}
        	className={classnames({
        		totop: this.state.isshow,
        		totophide: !this.state.isshow
        	})}
        	data={scrollTop}
        >回到顶部
        </div></>

		);
	}
}
export default ToTop;
