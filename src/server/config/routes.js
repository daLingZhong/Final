import db from '../model/db'
import user from '../controller/user'
import admin from '../controller/admin'

module.exports = function(app) {
	app.post('/login', user.login.post);
	app.get('/homeBox', user.homeBox.get);
	app.post('/checkLogin', user.checkLogin.post)
	app.get('/logout', user.logout.get);
	app.get('/mmanager', admin.mmanager.get);
	app.post('/mmanagerUpdate', admin.mmanagerUpdate.post);
	app.post('/mmanagerInsert', admin.mmanagerInsert.post);
	app.post('/mmanagerDelete', admin.mmanagerDelete.post);
	app.get('/maker', admin.maker.get);
	app.get('/engine', admin.engine.get);
	app.get('/goods', admin.goods.get);
	app.post('/changePassword', user.changePassword.post);
	app.post('/info', user.info.post);
	app.get('/buyInfo', user.buy.get);
	app.post('/buyForm', user.buyForm.post);
	app.get('/myMessage', user.myMessage.get);
	app.get('/msgNum', user.msgNum.get);
	app.post('/myMessageBuyPass', user.myMessageBuyPass.post)
	app.get('/changeGetFct', user.changeGetFct.get)
	app.post('/selectFct', user.selectFct.post)
	app.post('/changeForm', user.changeForm.post)
	app.post('/myMessageChangePass', user.myMessageChangePass.post)
	app.get('/mainGetFct', user.mainGetFct.get)
	app.post('/collect', user.collect.post)
	app.get('/getCollectList', user.getCollectList.get)
	app.post('/collectAction', user.collectAction.post)
	app.post('/updateEngineFct', user.updateEngineFct.post)
	app.post('/updateGoodFct', user.updateGoodFct.post)
}