const path = require("path");
const mime = require("mime");
const fs = require("mz/fs");


//url: 类似于 '/static/'
//dir: 类似于 __dirname + '/static'

function staticFiles(url, dir){   // app.use(staticFiles('/static/', __dirname + '/static'));
	return async (ctx, next) => {    // dir === E:\Node\alex\learn-javascript\web\koa\view-koa/static
									//  ulr == /static/
//		console.log("=================++");
//		console.log(ctx);
//		console.log("=================--");
									
		let rpath = ctx.request.path;   ///  static/css/bootstrap.css.map
		//判断是否以指定url开头
		
		
		if(rpath.startsWith(url)){
			//获取文件完整路径：
			let fp = path.join(dir, rpath.substring(url.length));   //E:\Node\alex\learn-javascript\web\koa\view-koa\static\css\bootstrap.css.map

			//判断文件是否存在
			if(await fs.exists(fp)){
				//查找文件的mime：
				ctx.response.type = mime.getType(rpath);
				//读取文件内容并赋值给response.body；
				ctx.response.body = await fs.readFile(fp);
				
			}else{
				//文件不存在
				ctx.response.status = 404;
			}
		} else {
			//不是指定前缀的URL 继续处理下一个middleware 
			await next();
		}
	};
}


module.exports = staticFiles;



















