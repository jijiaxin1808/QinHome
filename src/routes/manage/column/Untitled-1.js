// import axios from "axios"
// const urls = [url, url1, url2];

// urls.reduce((promise,url)=> {
//     return promise
//     .then(axios.get(url))
//     .then((res)=> {
//         if(res.data.code === 200) {
//         } 
//         else {
//         }
//     });
// }, Promise.resolve());

// 组件是将 props 转换为 UI，而高阶组件是将组件转换为另一个组件。
// 我们需要一个抽象，允许我们在一个地方定义这个逻辑，并在许多组件之间共享它。这正是高阶组件擅长的地方。
// 请注意，HOC 不会修改传入的组件，也不会使用继承来复制其行为。相反，HOC 通过将组件包装在容器组件中来组成新组件。HOC 是纯函数，没有副作用。
// 就是包裹一个组件



// const EnhancedComponent = higherOrderComponent(WrappedComponent);
// redux的 connect就是基于高阶组件实现的
// 可以用于日志打点  检测执行日志  减去了很多重复的的代码
// 权限验证 用于加一层权限验证  雷总在小岛应急官网里使用的路由级别的验证是否登录 就是高阶函数的一种用法
// 数据的双向绑定(待续  不懂)
// 表单的验证

// // HOC的缺点
//     HOC需要在原组件上进行包裹或者嵌套，如果大量使用HOC，将会产生非常多的嵌套，这让调试变得非常困难。
//     HOC可以劫持props，在不遵守约定的情况下也可能造成冲突



