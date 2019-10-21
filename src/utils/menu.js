/* eslint-disable linebreak-style */
export const allMenu = [
	{
		name:"栏目管理",
		url:"manage/column",
	},{
		name:"内容管理",
		children: [
			{
				name: "管理文章",
				url: "manage/context",
			},{
				name: "创建文章",
				url: "manage/create",
			}]
	},{
		name:"区块管理",
		url:"manage/block",
	},{
		name:"消息通知",
		url:"manage/notification",
	},{
		name:"留言回复",
		url:"manage/reply",
	},{
		name:"账号权限",
		url:"manage/account",
		children:[{
			name:"账号权限",
			url:"manage/account",
		},{
			name:"部门权限",
			url:"manage/bumen",
		}]
	},{
		name:"操作日志",
		url:"manage/log",
	},{
		name:"个人信息",
		url:"manage/announcement",
	}
];
