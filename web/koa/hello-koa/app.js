//导入koa, 和koa 1.x 不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示；

const Koa = require("koa");

//创建一个Koa对象表示web app 本身；
const app = new Koa();

/*
//对于任何请求，app将调用该一部函数处理请求
app.use(async (ctx,next) => {
	await next();
	//设置response 的 Content-Type;
	ctx.response.type = 'text/html';
	//设置response 的内容;
	ctx.response.body = '<h1>Hello , koa2!</h1>';
});
*/
app.use(async (ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`); // 打印URL
    await next(); // 调用下一个middleware
});

app.use(async (ctx, next) => {
    const start = new Date().getTime(); // 当前时间
    await next(); // 调用下一个middleware
    const ms = new Date().getTime() - start; // 耗费时间
    console.log(`Time: ${ms}ms`); // 打印耗费时间
});

app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
});

app.listen(3000);
console.log("app started at port 3000...");
