<template>
	<div class="top">
		<el-tooltip class="item" effect="dark" content="返回主页" placement="right">
			<i class="icon iconfont icon-zhuye" @click="backHome()" style="fontSize:25px;"></i>
		</el-tooltip>
		<el-tooltip class="item" effect="dark" placement="right">
			<div slot="content">{{collectWord}}</div>
			<i class="el-icon-star-on collect" @click="collect()"></i>
		</el-tooltip>
		<el-dropdown class="user" @command="handleCommand" trigger="click">
		  <el-button type="primary">
		    {{$store.state.user_name}}<i class="el-icon-arrow-down el-icon--right"></i>
		  </el-button>
		  <el-dropdown-menu slot="dropdown">
		  	<el-dropdown-item command="c">系统消息
				<p class="msg" v-if="msg()">{{$store.state.buy_num}}</p>
		  	</el-dropdown-item>
		  	<el-dropdown-item command="d">工厂库存</el-dropdown-item>
		    <el-dropdown-item command="a">我的资料</el-dropdown-item>
		    <el-dropdown-item command="b">注销</el-dropdown-item>
		  </el-dropdown-menu>
		</el-dropdown>
		
	</div>
</template>

<script>
import store from '../../vuex/store'
import '../../common/iconfont/iconfont.css'
export default {
	data () {
		return {
		    username:'',
		    power:'',
            fct_id:'',
            com_id:'',
            buy_num:'',
            routerPath:'',
            collectList:[],
            collectWord:'收藏本页'
		}
	},
	mounted(){
		this.checkLogin();
		this.getCollect();
		this.buy_num = store.state.buy_num;
		this.$http.get('/msgNum').then((param)=>{
			this.buy_num = param.data[1].length + param.data[0].length;
			this.$store.commit("showUserName",{'username':this.username,'status':true,'power':this.power,'com_id':this.com_id,'fct_id':this.fct_id,'buy_num':this.buy_num})
		});	
		if(this.$router.options.routes[2].path === "/index"){
			$(".collect").hide()
		}else{
			$(".collect").show()
		}
	},
	methods: {
		msg(){
			if(store.state.buy_num===0){
				return false
			}else{
				return true
			}
		},
		getCollect(){
			this.$http.get('/getCollectList').then((param)=>{
				for(var i=0;i<param.data.length;i++){
					this.collectList.push(param.data[i].homepage)
				}
			});	
		},
		checkLogin(){
			this.$http.post('/checkLogin').then((param)=>{
				this.username = param.data.name;
				this.power = param.data.power;
                this.com_id = param.data.com_id;
                this.fct_id = param.data.fct_id;				
				if(JSON.stringify(param.data) !== "{}"){
					this.$store.commit("showUserName",{'username':this.username,'status':true,'power':this.power,'com_id':this.com_id,'fct_id':this.fct_id,'buy_num':10});
				}else{
					this.$router.push({path: '/login', replace: true});
				}
			});
		},
		store,
		handleCommand(command) {
			if (command === 'b') {
                this.$http.get('/logout').then(()=> {
            		this.$store.commit("showUserName",{'username':'','status':false,'com_id':'','fct_id':''});
                	this.$router.push({path: '/login', replace: true});
                    // success callback
                }, response => {
                    // error callback
                    this.$message.error('注销失败');
                });
			}else if(command === 'a'){
				this.$router.push({path: '/main', replace: true});
			}else if(command === 'c'){
				this.$router.push({path: '/message', replace: true});
			}else if(command === 'd'){
				this.$router.push({path: '/myfct', replace: true});
			}
		},
		backHome(){
			this.$router.push({path: '/index'});
		},
		collect(){
			var path = {'path':this.routerPath,'status':true}
			var index = this.collectList.indexOf(this.routerPath)
			if(index != -1){ //表示已经在收藏列表，执行取消操作
				path.status = true;
				this.$http.post('/collectAction',path).then((param)=>{
					this.collectList.splice(index,1)
					$(".collect").css({"color":"#878D99"})
					this.collectWord = '收藏本页'
				});	
			}else{
				path.status = false;
				this.$http.post('/collectAction',path).then((param)=>{
					this.collectList.push(path.path)
					$(".collect").css({"color":"#F7BA2A"});
					this.collectWord = '取消收藏'
				});	
			}
		}
	},
    watch: {  
	    $route(to, from) {  
	    	if(to.path != '/index'){
	    		$(".collect").show();
	    		this.routerPath = to.path;
				if(this.collectList.indexOf(to.path) != -1){
					$(".collect").css({"color":"#F7BA2A"});
					this.collectWord = '取消收藏'
				}else{
					$(".collect").css({"color":"#878D99"})
					this.collectWord = '收藏本页'
				}
	    	}else{
	    		$(".collect").hide()
	    	}
	    	if(to.path === '/message' || to.path === '/main' || to.path === '/myfct'){
	    		$(".collect").hide()
	    	}
	    }  
	} 
}
</script>

<style scope>
.top{
	width: 100%;
	background-color: #ffffff;
	height: 50px;
	position: fixed;
	top: 0;
	z-index: 100;
}
.user{
	line-height: 50px;
	position: absolute;
	right: 5%;
}
.icon{
	color:#878D99;
	margin-left: 22px;
	line-height: 50px;
	cursor: pointer;
	outline: none;
}
.msg{
	background-color: #F56C6C;
	border-radius: 50%;
	color: #fff;
	width: 20px;
	height: 20px;
	display: inline-block;
	line-height: 20px;
	text-align: center;
}
.collect{
	margin-left: 10px;
	color: #878D99;
	line-height: 50px;
	font-size: 25px;
	cursor: pointer;
	outline: none;
}
</style>