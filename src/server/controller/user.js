import db from '../model/db'


module.exports.login = {
  post: function(req, res, next) {

    var name = req.body.username;
    var password = req.body.password;
    var loginJson = {
      status: true,
      msg: '成功',
      power: 1,
      fct_id: '',
      com_id: ''
    }
    var sql = 'select a.password,a.power,a.com_id,b.fct_id from user a join member b on a.com_id = b.com_id where a.user_name = "' + name + '"';

    db.query(sql, function(err, result) {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        return;
      }
      if (result.length == 0) {
        loginJson.status = false;
        loginJson.msg = '用户名或密码不正确';
        res.send(loginJson)
      } else if (result.length !== 0) {
        if (result[0].password == password) {
          loginJson.status = true;
          loginJson.msg = '成功';
          loginJson.power = result[0].power;
          loginJson.com_id = result[0].com_id;
          loginJson.fct_id = result[0].fct_id;
          req.session.user = name;
          req.session.power = loginJson.power;
          req.session.com_id = loginJson.com_id;
          req.session.fct_id = loginJson.fct_id;
          res.send(loginJson)
        } else {
          loginJson.status = false;
          loginJson.msg = '用户名或密码不正确';
          res.send(loginJson)
        }
      }
    })
  }
};

module.exports.checkLogin = {
  post: function(req, res, next) {
    var json = {
      name: req.session.user,
      power: req.session.power,
      com_id: req.session.com_id,
      fct_id: req.session.fct_id
    }
    // console.log(json)
    res.send(json)
  }
};

module.exports.getCollectList = {
  get: function(req, res, next) {
    var user = req.session.user
    var sql = 'select homepage from collect where `user` = "' + user + '"'
    db.query(sql, function(err, result) {
      res.send(result)
    })
  }
};

module.exports.collectAction = {
  post: function(req, res, next) {
    var user = req.session.user;
    var json = {
      path: req.body.path,
      status: req.body.status
    };
    console.log(json)
    if (json.status === true) {
      var sql1 = 'delete from collect where `user` = "' + user + '" and homepage = "' + json.path + '"';
      db.query(sql1, function(err, result) {
        res.send(result)
      })
    } else if (json.status === false) {
      console.log(1)
      var sql2 = 'insert into collect(user,homepage) values("' + user + '","' + json.path + '")';
      db.query(sql2, function(err, result) {
        res.send(result)
      })
    }
  }
};

module.exports.collect = {
  post: function(req, res, next) {
    var path = req.body.path
    var user = req.session.user
    var sql = 'insert into collect(homepage,user) values("' + path + '","' + user + '")'
    var a = ''
    db.query(sql, function(err, result) {
      res.send('ok')
    })
  }
};

module.exports.msgNum = {
  get: function(req, res, next) {
    var fct_id = req.session.fct_id;
    var sql = 'select * from buy where look = "1"and pass="0" and fct_id = "' + fct_id + '" group by buy_id;select * from `change` where look = "1"and pass="0" and fct2 = "' + fct_id + '" group by change_id'
    db.query(sql, function(err, result) {
      res.send(result)
    })
  }
};

module.exports.logout = {
  get: function(req, res, next) {
    delete req.session.user;
    delete req.session.power;
    delete req.session.com_id;
    delete req.session.fct_id;
    res.send('ok')
  }
}

module.exports.homeBox = {
  get: function(req, res, next) {
    var name = req.session.user
    var sql = 'SELECT box_router,box_name,box_txt FROM homepage WHERE box_type = (SELECT power from user where user_name = "' + name + '") and box_area = "1";SELECT box_router,box_name,box_txt FROM homepage WHERE box_area = "2";SELECT b.box_name,b.box_txt,b.box_router,b.box_type from collect a join homepage b on a.homepage = b.box_router where a.user = "' + name + '";SELECT power from user where user_name = "' + name + '"';
    db.query(sql, function(err, result) {
      res.send(result)
    })
  }
};

module.exports.changePassword = {
  post: function(req, res, next) {
    var usernmae = req.body.username;
    var password = req.body.password;
    var sql = 'UPDATE USER SET password = "' + password + '" WHERE user_name = "' + usernmae + '"'
    db.query(sql, function(err, result) {
      res.send(result)
    })
  }
}

module.exports.info = {
  post: function(req, res, next) {
    var usernmae = req.body.username;
    // console.log(usernmae)
    var sql = 'SELECT a.com_id,b.fct_id,b.com_name,b.fct_name from user a join member b on a.com_id = b.com_id WHERE a.user_name = "' + usernmae + '"'
    db.query(sql, function(err, result) {
      res.send(result)
    })
  }
};

module.exports.buy = {
  get: function(req, res, next) {
    var id = req.session.com_id;
    var sql = 'SELECT * FROM maker;SELECT engine_id,engine_type FROM engine;SELECT good_id,good_name FROM goods;SELECT fct_id,fct_name FROM member WHERE com_id = "' + id + '"';
    db.query(sql, function(err, result) {
      if (err) {
        console.log(err)
      }
      res.send(result)
    })
  }
};


module.exports.myMessage = {
  get: function(req, res, next) {
    var fct_id = req.session.fct_id;
    var sql = 'select buy_id as id,fct_id,engine_type,maker_id,sum(num1) as num1,good_id,sum(num2) as num2,buy_time from buy where fct_id = "' + fct_id + '" and look = "1" group by buy_id ,engine_type,good_id;select id as row_id, change_id as id,fct1,fct2,engine_type,change_time,sum(num1) as num1,good_name,sum(num2) as num2 from `change` where fct2 = "' + fct_id + '" and look = "1" and pass = "0" group by change_id ,engine_type,good_name;select id as row_id, change_id as id,fct1,fct2,engine_type,change_time,sum(num1) as num1,good_name,sum(num2) as num2 from `change` where fct1 = "' + fct_id + '" and look = "1" and pass = "0" group by change_id ,engine_type,good_name;select buy_id as id,fct_id,engine_type,maker_id,sum(num1) as num1,good_id,sum(num2) as num2,buy_time,pass,reason from buy where fct_id = "' + fct_id + '" and look = "0" group by buy_id ,engine_type,good_id;select id as row_id, change_id as id,fct1,fct2,engine_type,change_time,sum(num1) as num1,good_name,sum(num2) as num2 from `change` where fct1 = "' + fct_id + '" or fct2 = "' + fct_id + '" and look = "0" group by change_id ,engine_type,good_name;';
    db.query(sql, function(err, result) {
      if (err) {
        console.log(err)
      }
      // console.log(result)
      res.send(result)
    })
  }
};

module.exports.myMessageBuyPass = {
  post: function(req, res, next) {
    var data = {
      maker_id: req.body.maker_id,
      buy_id: req.body.id,
      time: req.body.time,
      pass: req.body.pass,
      msg: req.body.msg,
      good: req.body.good,
      engine: req.body.engine
    }
    if (data.pass === 1) {
      // console.log(222)
      if ((data.engine.length == 0) && (data.good.length != 0)) {
        for (var i = 0; i < data.good.length; i++) {
          var sql1 = 'insert into enginegoods(fct_id,maker_id,good_id,num,buy_time,inuse,use_time,locked) values("' + data.good[i].fct_id + '","' + data.maker_id + '","' + data.good[i].good_id + '","' + data.good[i].num2 + '","' + data.time + '","1","0","1");update buy set look = "0",pass = "1" where buy_id = "' + data.buy_id + '"';
          db.query(sql1, function(err, result) {
            if (err) {
              console.log(err)
            }
          })
        }
      } else if ((data.engine.length != 0) && (data.good.length == 0)) {
        for (var a = 0; a < data.engine.length; a++) {
          var sql2 = 'insert into engineshow(fct_id,maker_id,engine_type,num,buy_time,inuse,use_time,locked) values("' + data.engine[a].fct_id + '","' + data.maker_id + '","' + data.engine[a].engine_type + '","' + data.engine[a].num1 + '","' + data.time + '","1","0","1");update buy set look = "0",pass = "1" where buy_id = "' + data.buy_id + '"';
          db.query(sql2, function(err, result) {
            if (err) {
              console.log(err)
            }
          })
        }
      } else if ((data.engine.length != 0) && (data.good.length != 0)) {
        for (var j = 0; j < data.good.length; j++) {
          var sql3 = 'insert into enginegoods(fct_id,maker_id,good_id,num,buy_time,inuse,use_time,locked) values("' + data.good[j].fct_id + '","' + data.maker_id + '","' + data.good[j].good_id + '","' + data.good[j].num2 + '","' + data.time + '","1","0","1");update buy set look = "0",pass = "1" where buy_id = "' + data.buy_id + '"';
          db.query(sql3, function(err, result) {
            if (err) {
              console.log(err)
            }
          })
        }
        for (var b = 0; b < data.engine.length; b++) {
          var sql4 = 'insert into engineshow(fct_id,maker_id,engine_type,num,buy_time,inuse,use_time,locked) values("' + data.engine[b].fct_id + '","' + data.maker_id + '","' + data.engine[b].engine_type + '","' + data.engine[b].num1 + '","' + data.time + '","1","0","1");update buy set look = "0",pass = "1" where buy_id = "' + data.buy_id + '"';
          db.query(sql4, function(err, result) {
            if (err) {
              console.log(err)
            }
          })
        }
      }
    } else {
      console.log(data)
      var sql5 = 'update buy set look = "0",reason = "' + data.msg + '" where buy_id = "' + data.buy_id + '"';
      db.query(sql5, function(err, result) {
        if (err) {
          console.log(err)
        }
      })
    }
    res.send('ok')
  }
}


module.exports.myMessageChangePass = {
  post: function(req, res, next) {
    var data = {
      id: req.body.id,
      pass: req.body.pass,
      msg: req.body.msg,
      good: req.body.good,
      engine: req.body.engine
    }
    if (data.pass === 1) {
      // console.log(222)
      if ((data.engine.length == 0) && (data.good.length != 0)) {
        for (var i = 0; i < data.good.length; i++) {
          var sql1 = 'update enginegoods set fct_id = "' + data.good[i].fct1 + '",locked = "0" where id = "' + data.good[i].row_id + '";update `change` set look = "0",pass ="1" where change_id = "' + data.id + '"';
          db.query(sql1, function(err, result) {
            if (err) {
              console.log(err)
            }
          })
        }
      } else if ((data.engine.length != 0) && (data.good.length == 0)) {
        for (var a = 0; a < data.engine.length; a++) {
          var sql2 = 'update engineshow set fct_id = "' + data.engine[a].fct1 + '",locked = "0" where id = "' + data.engine[a].row_id + '";update `change` set look = "0",pass ="1" where change_id = "' + data.id + '"';
          db.query(sql2, function(err, result) {
            if (err) {
              console.log(err)
            }
          })
        }
      } else if ((data.engine.length != 0) && (data.good.length != 0)) {
        for (var j = 0; j < data.good.length; j++) {
          var sql3 = 'update enginegoods set fct_id = "' + data.good[j].fct1 + '",locked = "0" where id = "' + data.good[j].row_id + '";update `change` set look = "0",pass ="1" where change_id = "' + data.id + '"';
          db.query(sql3, function(err, result) {
            if (err) {
              console.log(err)
            }
          })
        }
        for (var b = 0; b < data.engine.length; b++) {
          var sql4 = 'update engineshow set fct_id = "' + data.engine[b].fct1 + '",locked = "0" where id = "' + data.engine[b].row_id + '";update `change` set look = "0",pass ="1" where change_id = "' + data.id + '"';
          db.query(sql4, function(err, result) {
            if (err) {
              console.log(err)
            }
          })
        }
      }
    } else {
      if ((data.engine.length == 0) && (data.good.length != 0)) {
        for (var ii = 0; ii < data.good.length; ii++) {
          var sql11 = 'update enginegoods set locked = "0" where id = "' + data.good[ii].row_id + '";update `change` set reason = "' + data.msg + '"';
          db.query(sql11, function(err, result) {
            if (err) {
              console.log(err)
            }
          })
        }
      } else if ((data.engine.length != 0) && (data.good.length == 0)) {
        for (var aa = 0; aa < data.engine.length; aa++) {
          var sql22 = 'update engineshow set locked = "0" where id = "' + data.engine[aa].row_id + '";update `change` set reason = "' + data.msg + '"';
          db.query(sql22, function(err, result) {
            if (err) {
              console.log(err)
            }
          })
        }
      } else if ((data.engine.length != 0) && (data.good.length != 0)) {
        for (var jj = 0; jj < data.good.length; jj++) {
          var sql33 = 'update enginegoods set locked = "0" where id = "' + data.good[jj].row_id + '";update `change` set reason = "' + data.msg + '"';
          db.query(sql33, function(err, result) {
            if (err) {
              console.log(err)
            }
          })
        }
        for (var bb = 0; bb < data.engine.length; bb++) {
          var sql44 = 'update engineshow set locked = "0" where id = "' + data.engine[bb].row_id + '";update change set reason = "' + data.msg + '"';
          db.query(sql44, function(err, result) {
            if (err) {
              console.log(err)
            }
          })
        }
      }
    }
    res.send('ok')
  }
}



module.exports.buyForm = {
  post: function(req, res, next) {
    var form = req.body
    var json = {
      buy_id: form.buy_id,
      fct_id: form.fct,
      maker_id: form.maker,
      time: form.time,
      goods: form.good,
      engines: form.engine
    }
    // console.log(json)
    if (json.goods.length != 0 && json.engines.length != 0) {
      for (var a = 0; a < json.engines.length; a++) {
        var sql3 = 'insert into buy(buy_id,fct_id,engine_type,maker_id,num1,buy_time,look,pass) values ("' + json.buy_id + '","' + json.fct_id + '","' + json.engines[a].value + '","' + json.maker_id + '","' + json.engines[a].num + '","' + json.time + '",1,0)'
        db.query(sql3, function(err, result) {
          if (err) {
            console.log(err)
          }
        })
      };
      for (var b = 0; b < json.goods.length; b++) {
        var sql4 = 'insert into buy(buy_id,fct_id,good_id,maker_id,num2,buy_time,look,pass) values ("' + json.buy_id + '","' + json.fct_id + '","' + json.goods[b].value + '","' + json.maker_id + '","' + json.goods[b].num + '","' + json.time + '",1,0)'
        db.query(sql4, function(err, result) {
          if (err) {
            console.log(err)
          }
        })
      }
    } else if (json.goods.length === 0 && json.engines.length != 0) {
      for (var i = 0; i < json.engines.length; i++) {
        var sql1 = 'insert into buy(buy_id,fct_id,engine_type,maker_id,num1,buy_time,look,pass) values ("' + json.buy_id + '","' + json.fct_id + '","' + json.engines[i].value + '","' + json.maker_id + '","' + json.engines[i].num + '","' + json.time + '",1,0)'
        db.query(sql1, function(err, result) {
          if (err) {
            console.log(err)
          }
        })
      }
    } else if (json.goods.length != 0 && json.engines.length === 0) {
      for (var j = 0; j < json.goods.length; j++) {
        var sql2 = 'insert into buy(buy_id,fct_id,good_id,maker_id,num2,buy_time,look,pass) values ("' + json.buy_id + '","' + json.fct_id + '","' + json.goods[j].value + '","' + json.maker_id + '","' + json.goods[j].num + '","' + json.time + '",1,0)'
        db.query(sql2, function(err, result) {
          if (err) {
            console.log(err)
          }
        })
      }
    }
    res.send('1')
  }
};

module.exports.changeGetFct = {
  get: function(req, res, next) {
    var fct = req.session.fct_id
    var sql = 'select fct_id from member where fct_id != "1" and fct_id !="' + fct + '"';
    db.query(sql, function(err, result) {
      if (err) {
        console.log(err)
      }
      res.send(result)
    })
  }
}

module.exports.selectFct = {
  post: function(req, res, next) {
    var fct = Object.keys(req.body)[0]
    var sql = 'select id,num,engine_type,CONCAT(engine_type,"-",num) as engineInfo,locked from engineshow where fct_id = "' + fct + '" and inuse = "0";select a.id,b.good_name,a.num,CONCAT(b.good_name,"-",a.num) as goodsInfo,locked from enginegoods a join goods b on a.good_id = b.good_id where fct_id = "' + fct + '" and inuse = "0"';
    db.query(sql, function(err, result) {
      if (err) {
        console.log(err)
      }
      res.send(result)
    })
  }
}

module.exports.changeForm = {
  post: function(req, res, next) {
    var json = {
      change_id: req.body.changeId,
      fct1: req.body.fct1,
      fct2: req.body.fct2,
      time: req.body.time,
      goods: req.body.goods,
      engines: req.body.engine
    }
    if (json.goods.length != 0 && json.engines.length != 0) {
      for (var a = 0; a < json.engines.length; a++) {
        var sql3 = 'insert into `change`(change_id,fct1,fct2,engine_type,num1,engineForm_id,change_time,look,pass) values ("' + json.change_id + '","' + json.fct1 + '","' + json.fct2 + '","' + json.engines[a].engine_type + '","' + json.engines[a].num + '","' + json.engines[a].id + '","' + json.time + '",1,0);update engineshow set locked = "1" where id = "' + json.engines[a].id + '"'
        db.query(sql3, function(err, result) {
          if (err) {
            console.log(err)
          }
        })
      };
      for (var b = 0; b < json.goods.length; b++) {
        var sql4 = 'insert into `change`(change_id,fct1,fct2,good_name,num2,goodsForm_id,change_time,look,pass) values ("' + json.change_id + '","' + json.fct1 + '","' + json.fct2 + '","' + json.goods[b].good_name + '","' + json.goods[b].num + '","' + json.goods[b].id + '","' + json.time + '",1,0);update enginegoods set locked = "1" where id = "' + json.goods[b].id + '"'
        db.query(sql4, function(err, result) {
          if (err) {
            console.log(err)
          }
        })
      }
    } else if (json.goods.length === 0 && json.engines.length != 0) {
      for (var i = 0; i < json.engines.length; i++) {
        var sql1 = 'insert into `change`(change_id,fct1,fct2,engine_type,num1,engineForm_id,change_time,look,pass) values ("' + json.change_id + '","' + json.fct1 + '","' + json.fct2 + '","' + json.engines[i].engine_type + '","' + json.engines[i].num + '","' + json.engines[i].id + '","' + json.time + '",1,0);update engineshow set locked = "1" where id = "' + json.engines[i].id + '"'
        db.query(sql1, function(err, result) {
          if (err) {
            console.log(err)
          }
        })
      }
    } else if (json.goods.length != 0 && json.engines.length === 0) {
      for (var j = 0; j < json.goods.length; j++) {
        var sql2 = 'insert into `change`(change_id,fct1,fct2,good_name,num2,goodsForm_id,change_time,look,pass) values ("' + json.change_id + '","' + json.fct1 + '","' + json.fct2 + '","' + json.goods[j].good_name + '","' + json.goods[j].num + '","' + json.goods[j].id + '","' + json.time + '",1,0);update enginegoods set locked = "1" where id = "' + json.goods[j].id + '"'
        db.query(sql2, function(err, result) {
          if (err) {
            console.log(err)
          }
        })
      }
    }
    res.send('1')
  }
};


//工厂库存
module.exports.mainGetFct = {
  get: function(req, res, next) {
    var fct_id = req.session.fct_id
    var sql = 'select a.*,b.live_time from engineshow a join engine b on a.engine_type = b.engine_type where a.fct_id = "' + fct_id + '";select a.*,b.good_name,b.live_time from enginegoods a join goods b on a.good_id = b.good_id where a.fct_id = "' + fct_id + '"'
    db.query(sql, function(err, result) {
      if (err) {
        console.log(err)
      }
      res.send(result)
    })
  }
};

module.exports.updateEngineFct = {
  post: function(req, res, next) {
    var json = {
      died_time: req.body.died_time,
      inuse: req.body.inuse,
      use_time: req.body.use_time,
      locked: req.body.locked,
      id: req.body.id
    }
    if (json.died_time === null) {
      var sql = 'update engineshow set died_time = null,use_time = "' + json.use_time + '",inuse = "' + json.inuse + '",locked = "' + json.inuse + '" where id = "' + json.id + '"';
      db.query(sql, function(err, result) {
        if (err) {
          console.log(err)
        }
        res.send('ok')
      })
    } else {
      var sql1 = 'update engineshow set died_time = "' + json.died_time + '",use_time = "' + json.use_time + '",inuse = "' + json.inuse + '",locked = "' + json.inuse + '" where id = "' + json.id + '"';
      db.query(sql1, function(err, result) {
        if (err) {
          console.log(err)
        }
        res.send('ok')
      })
    }

  }
}

module.exports.updateGoodFct = {
  post: function(req, res, next) {
    var json = {
      died_time: req.body.died_time,
      inuse: req.body.inuse,
      use_time: req.body.use_time,
      locked: req.body.locked,
      id: req.body.id
    }
    if (json.died_time === null) {
      var sql = 'update enginegoods set died_time = null,use_time = "' + json.use_time + '",inuse = "' + json.inuse + '",locked = "' + json.inuse + '" where id = "' + json.id + '"';
      db.query(sql, function(err, result) {
        if (err) {
          console.log(err)
        }
        res.send('ok')
      })
    } else {
      var sql1 = 'update enginegoods set died_time = "' + json.died_time + '",use_time = "' + json.use_time + '",inuse = "' + json.inuse + '",locked = "' + json.inuse + '" where id = "' + json.id + '"';
      db.query(sql1, function(err, result) {
        if (err) {
          console.log(err)
        }
        res.send('ok')
      })
    }

  }
}