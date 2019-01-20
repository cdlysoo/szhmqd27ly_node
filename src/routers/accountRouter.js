/**
 * 登录和注册
 */
const express = require('express')
const path = require('path')

// 创建路由对象
const accountRouter = express.Router()

// 导入控制器模块
const accountController = require(path.join(__dirname,"../controllers/accountController.js"))

// 获取注册页面的请求
accountRouter.get('/register',accountController.getRegisterPage)
accountRouter.post('/register',accountController.register)

// 导出路由对象
module.exports = accountRouter