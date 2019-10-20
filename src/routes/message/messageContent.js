import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import { connect } from "dva";

const MessageContent = ()=> {
	const onChange = ()=> {

	};
	return (
		<Pagination hideOnSinglePage onChange={onChange} defaultCurrent={1}
			defaultPageSize={5} total={200} showQuickJumper  />
	);
};
export default connect(({home})=>({home}))(MessageContent);