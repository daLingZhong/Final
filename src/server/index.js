import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import ejs from 'ejs'
import session from 'express-session'
import SessionStore from 'express-mysql-session'
import router from './router'
import config from '../../webpack.config'
import routes from './config/routes'
const app = express()


let option = {
      //主机
    host: '127.0.0.1',
    //用户
    user: 'root',
    //密码
    password: 'zl81977280',
    //端口
    port: 3307,
    //数据库名
    database: 'final'
};

app.use(session({  
    key: 'session_cookie_name',  
    secret: 'session_cookie_secret',  
    store: new SessionStore(option)  
}))  

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade')
app.engine('html',ejs.__express); //使用ejs模板引擎，并且将html尾缀替换成html
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: { colors: true }
}))

app.use(webpackHotMiddleware(compiler))

app.use('/', router)
routes(app) //使用路由文件中的app参数
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
// will print stacktrace
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: err
  })
})

app.listen(4000)

export default app
