import db from '../model/db'

module.exports.mmanager = {
	get: function(req, res, next) {
		var sql = 'select * from USER a join member b on a.com_id = b.com_id where a.com_id != "1"';
		db.query(sql, function(err, result) {
			// console.log(result)
			res.send(result)
		})
	}
}

module.exports.mmanagerUpdate = {
	post: function(req, res, next) {
		var data = req.body
		var form = {
			com_id: data.com_id,
			com_name: data.com_name,
			fct_name: data.fct_name,
			user_name: data.user_name,
			password: data.password,
			join_time: data.join_time,
			leave_time: data.leave_time
		}
		// console.log(form)
		var sql = 'update member a join user b on a.com_id = b.com_id set a.com_name = "' + form.com_name + '",a.fct_id = "' + form.fct_name + '",a.join_time = "' + form.join_time + '",a.leave_time = "' + form.leave_time + '",b.user_name = "' + form.user_name + '",b.password ="' + form.password + '" where a.com_id = "' + form.com_id + '"';
		db.query(sql, function(err, result) {
			// console.log(err)
			res.send(result)
		})
	}
};

module.exports.mmanagerInsert = {
	post: function(req, res, next) {
		var data = req.body
		var insertForm = {
			com_id: data.com_id,
			com_name: data.com_name,
			fct_id: data.fct_id,
			fct_name: data.fct_name,
			user_name: data.user_name,
			password: data.password,
			join_time: data.join_time,
			leave_time: data.leave_time
		}
		// console.log(insertForm)
		var sql = 'insert into member(com_id,com_name,fct_id,fct_name,join_time) VALUES("' + insertForm.com_id + '","' + insertForm.com_name + '","' + insertForm.fct_id + '","' + insertForm.fct_name + '","' + insertForm.join_time + '");insert into user(user_name,password,power,com_id) VALUES("' + insertForm.user_name + '","' + insertForm.password + '",2,"' + insertForm.com_id + '")';
		db.query(sql, function(err, result) {
			// console.log(err)
			res.send(result)
		})
	}
};

module.exports.mmanagerDelete = {
	post: function(req, res, next) {
		var id = req.body
		// for(var i in id){
		// 	console.log(i)
		// }
		var sql = 'delete from user where com_id = "' + i + '";delete from member where com_id = "' + id + '"'
		db.query(sql, function(err, result) {
			// console.log(err)
			res.send(result)
		})
	}
};

module.exports.maker = {
	get: function(req, res, next) {
		var sql = 'select * from maker';
		db.query(sql, function(err, result) {
			// console.log(err)
			res.send(result)
		})
	}
};

module.exports.engine = {
	get: function(req, res, next) {
		var sql = 'select a.engine_type,a.num,a.inuse,a.fct_id,d.fct_name,a.maker_id,c.maker_name,b.*,a.buy_time from engineShow a join engine b on a.engine_type = b.engine_type join maker c on a.maker_id = c.maker_id join member d on a.fct_id = d.fct_id'
		db.query(sql, function(err, result) {
			// console.log(err)
			res.send(result)
		})
	}
};

module.exports.goods = {
	get: function(req, res, next) {
		var sql = 'select a.good_id,a.inuse,c.good_name,a.fct_id,c.engine_type,a.buy_time,c.live_time,c.unit2,a.num,c.unit1 from enginegoods a join goods c on a.good_id = c.good_id'
		db.query(sql, function(err, result) {
			// console.log(err)
			res.send(result)
		})
	}
}