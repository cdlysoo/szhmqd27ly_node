/**
 * 导出一个方法,该方法获取注册页面
 */
const path = require('path')
const MongoClient = require('mongodb').MongoClient;
const captchapng = require('captchapng')

const url = 'mongodb://localhost:27017';

const dbName = 'szheima27';

exports.getRegisterPage = (req,res) => {
    res.sendFile(path.join(__dirname,"../public/views/register.html"))
}

/**
 * 导出注册的方法
 */
exports.register = (req,res) => {
    const result = {
        status:0,
        message: '注册成功'
    };

    const {username} = req.body;
    // console.log(username);
    // res.join(result)

    // Use connect method to connect to the server
MongoClient.connect(url,{ useNewUrlParser:true }, function(err, client) {
   
    const db = client.db(dbName);

    const collection = db.collection('accountInfo');

    collection.findOne({ username },(err,doc) => {
        if (doc) {
            result.status = 1;
            result.message = "用户名已存在"

            client.close();

            res.json(result);

        }else {
            collection.insertOne(req.body, (err,result2) => {
                if (!result2) {
                    result.status = 2;
                    result.message = "注册失败"
                } 
                client.close();

                res.json(result);
            })
        }
    })
  });
}

exports.getLoginPage = (req,res) => {
    res.sendFile(path.join(__dirname,"../public/views/login.html"))
};

exports.getVcodeImage = (req, res) => {
    const vcode = parseInt(Math.random()*9000+1000);

    req.session.vcode = vcode
    var p = new captchapng(80,30,vcode);
    p.color(0,0,0,0);
    p.color(80,80,80,255);

    var img = p.getBase64();

    var imgbase64 = new Buffer(img, "base64");
    res.writeHead(200,{
        "Content-Type":"image/png"
    })
    res.end(imgbase64)
};
exports.login = (req,res) => {
    
}

