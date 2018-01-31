import mysql from 'mysql'

// var app = module.exports = express()  

const pool = mysql.createPool({
    //主机
    host: '127.0.0.1',
    //用户
    user: 'root',
    //密码
    password: 'zl81977280',
    //端口
    port: 3307,
    //数据库名
    database: 'final',
    //允许多条查询
    multipleStatements: true
});


function query(sql,callback) {
    pool.getConnection(function (err, connection) {
        // Use the connection
        connection.query(sql,function (err, result) {
            callback(err, result);
            connection.release();//释放链接
        });
    });
}
exports.query = query;