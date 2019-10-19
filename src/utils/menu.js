/* eslint-disable linebreak-style */
export const allMenu = [
	{
		name:"栏目管理",
		url:"manage/column",
		icon:"plus",
	},{
		name:"内容管理",
		icon:"plus",
		children: [{
      name: "创建文章",
      url: "manage/create",
      icon: "plus"
    },{
      name: "修改文章",
      url: "manage/change",
      icon: "plus"
    }]
	},{
		name:"区块管理",
		url:"manage/block",
		icon:"plus",
	},{
		name:"消息通知",
		url:"manage/notification",
		icon:"plus",
	},{
		name:"账号权限",
		url:"manage/account",
		icon:"plus",
	},{
		name:"操作日志",
		url:"manage/log",
		icon:"plus",
	},{
		name:"个人信息",
		url:"manage/announcement",
		icon:"plus",
	}
];
