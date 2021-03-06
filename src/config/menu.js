//  这里是后台路由设置(menu)
const menu =  [
	{
		name:"栏目管理",
		url:"manage/column",
		icon:"home",
		children: [
			{
				name: "一级栏目管理",
				url: "manage/editFirst"
			},{
				name: "二级栏目管理",
				url: "manage/editSecond"
			}]
	},{
		name:"内容管理",
		icon:"diff",
		children: [
			{
				name: "按时间管理文章",
				url: "manage/context"
			},
			{
				name: "按栏目管理文章",
				url: "manage/column"
			},
			{
				name: "创建文章",
				url: "manage/create"
			},]
	},
	{
		name:"文件管理",
		url:"manage/file",
		icon:"upload"
	},
	{
		name:"区块管理",
		url:"manage/block",
		icon:"setting"
	},{
		name:"消息通知",
		url:"manage/notification",
		icon:"message"
	},{
		name:"留言回复",
		url:"manage/reply",
		icon:"eye"
	},{
		name:"账号权限",
		url:"manage/account",
		icon:"menu",
		children:[{
			name:"用户管理",
			url:"manage/account",
		},{
			name:"权限管理",
			url:"manage/bumen",
		}]
	},{
		name:"操作日志",
		url:"manage/log",
		icon:"file-done"
	},{
		name:"个人信息",
		url:"manage/announcement",
		icon:"user"
	}
];
export default menu;