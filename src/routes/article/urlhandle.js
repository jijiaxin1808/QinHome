// 题目描述
// 标题：解析URL
// 题目描述：请实现一个函数 parseUrl，将一段字符串解析为object。
// url：http://www.xiyanghui.com/product/list?id=123456&sort=discount#title

function parseUrl(url) {
    let _query = [];
    let queryStr = url.split("?")[1];
    let params = queryStr.split("&");
    console.log(params)
    for (let i = 0; i < params.length; i++) {
        let [QQ,A] = params[i].split("=");
        let N = {};
        N[QQ] = A
        _query.push(N);
    }
    let _path = url.split("?")[0]; 
    let _hash = url.slice(url.search("#")+1);
    const result = {
        path: _path,
        query: _query,
        hash: _hash
    }
    console.log("result",result);
}
parseUrl("http://www.xiyanghui.com/product/list?id=123456&sort=discount#title");