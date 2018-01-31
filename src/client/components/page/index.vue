<template>
	<div class="warp">
		<el-row>
			<el-col :xs="24" :sm="{span: 22, offset: 1}" :md="{span: 22, offset: 1}" :lg="{span: 22, offset: 1}" :xl="{span: 22, offset: 1}">
			  	<div class="title">
			  		<i style="color:#F7BA2A;" class="el-icon-star-on"></i>
			  		<p>我的收藏</p>
			  	</div>
			</el-col>
		</el-row>
		<el-row :gutter="10" class="main">
		  <el-col :xs="24" :sm="{span: 22, offset: 1}" :md="{span: 22, offset: 1}" :lg="{span: 22, offset: 1}" :xl="{span: 22, offset: 1}">
		  	<div class="box" v-for="data in homeBoxCollect" @click="toView(data.box_router)">
	  			<p>{{data.box_name}}</p>
	  			<p>{{data.box_txt}}</p>
		  	</div>
		  </el-col>
		</el-row>
		<el-row>
			<el-col :xs="24" :sm="{span: 22, offset: 1}" :md="{span: 22, offset: 1}" :lg="{span: 22, offset: 1}" :xl="{span: 22, offset: 1}">
			  	<div class="grid-content bg-purple-light title">
			  		<i class="el-icon-tickets"></i>
			  		<p>我的主页</p>
			  	</div>
			</el-col>
		</el-row>
		<el-row :gutter="10" class="main">
		  <el-col :xs="24" :sm="{span: 22, offset: 1}" :md="{span: 22, offset: 1}" :lg="{span: 22, offset: 1}" :xl="{span: 22, offset: 1}">
		  	<div class="grid-content bg-purple-light">
		  		<div class="box" v-for="data in homeBoxDataView" @click="toView(data.box_router)">
		  			<p>{{data.box_name}}</p>
		  			<p>{{data.box_txt}}</p>
		  		</div>
		  	</div>
		  </el-col>
		</el-row>
		<el-row v-if="checkPower()">
			<el-col :xs="24" :sm="{span: 22, offset: 1}" :md="{span: 22, offset: 1}" :lg="{span: 22, offset: 1}" :xl="{span: 22, offset: 1}">
			  	<div class="grid-content bg-purple-light title">
			  		<i class="el-icon-edit"></i>
			  		<p>项目流程</p>
			  	</div>
			</el-col>
		</el-row>
		<el-row :gutter="10" class="main" v-if="checkPower()">
		  <el-col :xs="24" :sm="{span: 22, offset: 1}" :md="{span: 22, offset: 1}" :lg="{span: 22, offset: 1}" :xl="{span: 22, offset: 1}">
		  	<div class="grid-content bg-purple-light">
		  		<div class="box" v-for="data in homeBoxProgress" @click="toView(data.box_router)">
		  			<p>{{data.box_name}}</p>
		  			<p>{{data.box_txt}}</p>
		  		</div>
		  	</div>
		  </el-col>
		</el-row>
	</div>
</template>

<script>
import $ from 'expose-loader?$!jquery'
export default {
  data () {
    return {
        homeBoxDataView:[],
        homeBoxProgress:[],
        homeBoxCollect:[],
        power:''
    }
  },
  methods:{
  	toView(router){
  		this.$router.push(router)
  	},
  	checkPower(){
  		if (this.power === '1') {
  			return false;
  		}else{
  			return true;
  		}
  	}
  },
  mounted(){
	this.$http.get('/homeBox').then((param)=>{
		this.homeBoxDataView = param.data[0];
		this.homeBoxProgress = param.data[1];
		this.power = param.data[3][0].power
		for(var i=1;i<param.data[2].length;i++){
			if(param.data[2][i].box_type === this.power){
				this.homeBoxCollect.push(param.data[2][i])
			}
		}
	});
  }
}
</script>

<style scope>
.title{
	margin-top: 80px;
	cursor: default;
}
.title i{
	display: inline-block;
	line-height: 36px;
	font-size: 25px;
	color: #878D99;
}
.title p{
	color: #6E7276;
	line-height: 36px;
	font-size: 20px;
	display: inline-block;
}
.warp{
	overflow-x:hidden;
    position: absolute;
    width:100%;
    height:100%;
    /*background-color: #B9D0E3;*/
	background-image:-webkit-linear-gradient(to bottom, #B9D0E3, #ffffff); 
	background-image:linear-gradient(to bottom,#B9D0E3,#ffffff)
}
.el-col {
border-radius: 4px;
}
.purple-light {
/*background: #e5e9f2;*/
}
.main{
	margin-top: 2%;
}
.box{
	width: 11rem;
	height: 11rem;
	background-color: #FAFAFA;
	border-radius:2px;
	display: inline-block;
	margin-right: -15px;
	margin-left:20px;
	margin-bottom: 7px;
	cursor: pointer;
	float: left;
}
.box p{
	color:#333333;
	font-size: 17px;
	/*margin-left: 10px;*/
	/*margin-top: 10px;*/
}
.box:hover{
	background-color: #F0F0F0;
	opacity: .8;
}
</style>