const util = require('../util/file');

class UserController {
    // 用户登录
    async login(ctx, next) {
        // 获取请求提交的数据
        let name = ctx.request.body.name || '',
            pwd = ctx.request.body.pwd || '';
        console.log(name, pwd);

        // do something
        creatCpt
        ctx.body = {
            status: true,
            token: '123'
        }
    }

    // 用户信息
    async userInfo(ctx, next) {
        // do something

        // 假设这是请求回来的数据
        let data = {
            name: 'jk',
            age: 25
        }
        ctx.body = {
            status: true,
            data
        };
    }

    // 用户登录
    async add(ctx, next) {
        // 获取请求提交的数据
        let name = ctx.request.body.name || '',
            pwd = ctx.request.body.pwd || '';
        console.log(name, pwd);
        await util.creatCpt();
        ctx.body = {
            status: 200
        }
    }

}

module.exports = new UserController();
