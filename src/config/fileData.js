const fileData1 = [
    {
        file:{
            picUrl:"http://yjgl.hebei.gov.cn/portal/resources/images/file-read-5479.jpg?param=126y126",
            name: "雷大炮的说明",
            type: "word",
            content:"学难姐表情包真好看",
        },
        uploader: "王雪难",
        time: "9102/10/09",
        id: 1
    },
    {
        file:{
            picUrl:"http://yjgl.hebei.gov.cn/portal/resources/images/file-read-5479.jpg?param=126y126",
            name: "雷大炮的说明",
            type: "word",
            content:"学难姐表情包真好看"
        },
        uploader: "王雪难",
        time: "9102/10/09",
        id:2
    }//外层的id可以被选中的那个东西获取到
]

// 用这个map对返回的数据进行处理
const fileData = fileData1.map((item)=> {
    return {
        ...item,
        file: {
            ...item.file,
            id: item.id
        }
    }
});
export default fileData;
