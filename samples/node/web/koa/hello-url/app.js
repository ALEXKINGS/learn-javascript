const Koa = require("koa");

//注意require ('koa-router')返回的是函数
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');


const app = new Koa();

//log request URL:
app.use(async (ctx, next) => {
	console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
	await next();
});



router.get('/', async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
        
       // console.log(ctx.response.body+"hhah");
});

router.post('/signin', async (ctx, next) => {
    let
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
});


/*
//add url-router
router.get('/hello/:name',async(ctx, next) => {
	let name = ctx.params.name;
	ctx.response.body = `<h1>Hello,${name}!</h1>`;
});

router.get('/',async (ctx, next) => {
	ctx.response.body = `<h1>Hello Index</h1>`;
});
*/

//由于middleware的顺序很重要，这个koa-bodyparser必须在router之前被注册到app对象上
app.use(bodyParser());

//add router middleware;
app.use(router.routes());


/*
app.use(async (ctx, next) => {
    if (ctx.request.path === '/') {
        ctx.response.body = 'index page';
    } else {
        await next();
    }
});

app.use(async (ctx, next) => {
    if (ctx.request.path === '/test') {
        ctx.response.body = 'TEST page';
    } else {
        await next();
    }
});

app.use(async (ctx, next) => {
	if (ctx.request.path == "/error"){
		ctx.response.body = "ERROR page";
	}else{
		await next();
	}
})
*/

app.listen(3000);
console.log("app started at port 3000");
