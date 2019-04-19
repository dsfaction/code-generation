// router/index.js
// 加载依赖
const router = require('koa-router')();
const userctrl = require('../api/file');

// 用户模块
router
    .post('/api/user/login', userctrl.login)
    .get('/api/user/userinfo', userctrl.userInfo)
    .get('/api/user/add', userctrl.add);

module.exports = router;