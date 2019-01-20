/**
 * 导出一个方法,该方法获取注册页面
 */
const path = require('path')
const MongoClient = require('mongodb').MongoClient;

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

