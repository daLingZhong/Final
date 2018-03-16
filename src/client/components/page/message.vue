<template>
	<div style="marginTop:120px;">
	    <el-row>
	      <el-col :xs="24" :sm="{span: 14, offset: 5}" :md="{span: 14, offset: 5}" :lg="{span: 14, offset: 5}" :xl="{span:14, offset: 5}">
		    <el-tabs :tab-position="top">
				<el-tab-pane label="待处理采购单">
			      	<div v-for="(data,index) in waitingBuyForm" :key="index" class="message_content">
			      		<el-card class="box-card">
							<div slot="header" class="clearfix">
								<span>交货单号：{{data.id}}</span>
								<time class="time">{{data.time | formatDate}}</time>
							</div>
							<div class="text item" v-for="(data,index) in data.engine" v-if="data.engine_type===null?false:true">燃机{{index+1}}型号：{{data.engine_type}}&nbsp;&nbsp;&nbsp;&nbsp;数量：{{data.num1}}</div>
							<div class="text item" v-for="(data,index) in data.good" v-if="data.good_id===null?false:true">备件{{index+1}}ID：{{data.good_id}}&nbsp;&nbsp;&nbsp;&nbsp;数量：{{data.num2}}</div>
							<el-button @click="buyFormPass(index)" type="primary">通过</el-button>
							<el-button @click="buyFormUnpass(index)" type="info">驳回</el-button>
						</el-card>
			      	</div>
				</el-tab-pane>
				<el-tab-pane label="待处理调拨请求">
			      	<div v-for="(data,index) in waitingChangeForm" :key="index" class="message_content">
			      		<el-card class="box-card">
							<div slot="header" class="clearfix">
								<span>调拨单号：{{data.id}}</span>
								<time class="time">{{data.time | formatDate}}</time>
							</div>
							<div class="text item">借用方：{{data.fct}}</div>
							<div class="text item" v-for="(data,index) in data.engine" v-if="data.engine_type===null?false:true">燃机{{index+1}}型号：{{data.engine_type}}&nbsp;&nbsp;&nbsp;&nbsp;数量：{{data.num1}}</div>
							<div class="text item" v-for="(data,index) in data.good" v-if="data.good_name===null?false:true">备件{{index+1}}ID：{{data.good_name}}&nbsp;&nbsp;&nbsp;&nbsp;数量：{{data.num2}}</div>
							<el-button @click="changeFormPass(index)" type="primary">通过</el-button>
							<el-button @click="changeFormUnpass(index)" type="info">驳回</el-button>
						</el-card>
			      	</div>
				</el-tab-pane>
				<el-tab-pane label="发出的调拨申请">
		      		<div v-for="(data,index) in waitingChangeFormPass" :key="index" class="message_content">
			      		<el-card class="box-card">
							<div slot="header" class="clearfix">
								<span>调拨单号：{{data.id}}</span>
								<time class="time">{{data.time | formatDate}}</time>
							</div>
							<div class="text item">审批方：{{data.fct}}</div>
							<div class="text item" v-for="(data,index) in data.engine" v-if="data.engine_type===null?false:true">燃机{{index+1}}型号：{{data.engine_type}}&nbsp;&nbsp;&nbsp;&nbsp;数量：{{data.num1}}</div>
							<div class="text item" v-for="(data,index) in data.good" v-if="data.good_name===null?false:true">备件{{index+1}}ID：{{data.good_name}}&nbsp;&nbsp;&nbsp;&nbsp;数量：{{data.num2}}</div>
							<el-button type="primary">提醒</el-button>
						</el-card>
			      	</div>
				</el-tab-pane>
				<el-tab-pane label="历史采购单">
		      		<div v-for="(data,index) in historyBuyForm" :key="index" class="message_content">
			      		<el-card class="box-card">
							<div slot="header" class="clearfix">
								<span>采购单号：{{data.id}}</span>
								<time class="time">{{data.time | formatDate}}</time>
								<span>{{data.pass}}</span>
							</div>
							<div class="text item" v-for="(data,index) in data.engine" v-if="data.engine_type===null?false:true">燃机{{index+1}}型号：{{data.engine_type}}&nbsp;&nbsp;&nbsp;&nbsp;数量：{{data.num1}}</div>
							<div class="text item" v-for="(data,index) in data.good" v-if="data.good_id===null?false:true">备件{{index+1}}ID：{{data.good_id}}&nbsp;&nbsp;&nbsp;&nbsp;数量：{{data.num2}}</div>
							<div class="text item">备注：{{data.msg}}</div>
						</el-card>
			      	</div>
				</el-tab-pane>
				<el-tab-pane label="历史调拨单">
			      	<div v-for="(data,index) in historyChangeForm" :key="index" class="message_content">
			      		<el-card class="box-card">
							<div slot="header" class="clearfix">
								<span>调拨单号：{{data.id}}</span>
								<time class="time">{{data.time | formatDate}}</time>
								<span>{{data.pass}}</span>
							</div>
							<div class="text item">借用方：{{data.fct1}}</div>
							<div class="text item">调拨方：{{data.fct2}}</div>
							<div class="text item" v-for="(data,index) in data.engine" v-if="data.engine_type===null?false:true">燃机{{index+1}}型号：{{data.engine_type}}&nbsp;&nbsp;&nbsp;&nbsp;数量：{{data.num1}}</div>
							<div class="text item" v-for="(data,index) in data.good" v-if="data.good_name===null?false:true">备件{{index+1}}ID：{{data.good_name}}&nbsp;&nbsp;&nbsp;&nbsp;数量：{{data.num2}}</div>
							<div class="text item">备注：{{data.msg}}</div>
						</el-card>
			      	</div>
				</el-tab-pane>
			</el-tabs>

	      </el-col>
	  </el-row>
	</div>
</template>

<script>
import store from '../../vuex/store'
import {formatDate} from '../../common/date.js'
import moment from 'moment'
export default {
	data () {
		return {
			top:'top',
			waitingBuyForm:[],
			waitingChangeForm:[],
			waitingChangeFormPass:[],
			historyBuyForm:[],
			historyChangeForm:[]
		}
	},
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd');
        }
    },
	mounted(){
		this.$http.get('/myMessage').then((param)=>{
			var map = {},dest = [];
			var arr = param.data[0];
			for(var i = 0; i < arr.length; i++){
			    var ai = arr[i];
			    if(!map[ai.id]){
			        if(ai.engine_type === null){
			            dest.push({
			                id: ai.id,
			                maker_id:ai.maker_id,
			                time:ai.buy_time,
			                msg:'',
			                pass:'',
			                engine:[],
			                good: [ai]
			            });
			        }else if(ai.good_id === null){
			            dest.push({
			                id: ai.id,
			                maker_id:ai.maker_id,
			                time:ai.buy_time,
			                msg:'',
			                pass:'',
			                engine:[ai],
			                good: []
			            });
			        }
			        map[ai.id] = ai;
			    }else{
			        for(var j = 0; j < dest.length; j++){
			            var dj = dest[j];
			            if(dj.id === ai.id && ai.engine_type === null){
			                dj.good.push(ai);
			            }else if(dj.id === ai.id && ai.good_id === null){
			                dj.engine.push(ai);
			            }
			        }
			    }
			}
			this.waitingBuyForm = dest
			// console.log(param.data)

			var map1 = {},dest1 = [];
			var arr1 = param.data[1];
			for(var a = 0; a < arr1.length; a++){
			    var ai1 = arr1[a];
			    if(!map1[ai1.id]){
			        if(ai1.engine_type === null){
			            dest1.push({
			                id: ai1.id,
			                fct:ai1.fct1,
			                time:ai1.change_time,
			                msg:'',
			                pass:'',
			                engine:[],
			                good: [ai1]
			            });
			        }else if(ai1.good_name === null){
			            dest1.push({
			                id: ai1.id,
			                fct:ai1.fct1,
			                time:ai1.change_time,
			                msg:'',
			                pass:'',
			                engine:[ai1],
			                good: []
			            });
			        }
			        map1[ai1.id] = ai1;
			    }else{
			        for(var b = 0; b < dest1.length; b++){
			            var dj1 = dest1[b];
			            if(dj1.id === ai1.id && ai1.engine_type === null){
			                dj1.good.push(ai1);
			            }else if(dj1.id === ai1.id && ai1.good_name === null){
			                dj1.engine.push(ai1);
			            }
			        }
			    }
			}
			this.waitingChangeForm = dest1;		


			var map2 = {},dest2 = [];
			var arr2 = param.data[2];
			for(var c = 0; c < arr2.length; c++){
			    var ai2 = arr2[c];
			    if(!map2[ai2.id]){
			        if(ai2.engine_type === null){
			            dest2.push({
			                id: ai2.id,
			                fct:ai2.fct2,
			                time:ai2.change_time,
			                msg:'',
			                pass:'',
			                engine:[],
			                good: [ai2]
			            });
			        }else if(ai2.good_name === null){
			            dest2.push({
			                id: ai2.id,
			                fct:ai2.fct2,
			                time:ai2.change_time,
			                msg:'',
			                pass:'',
			                engine:[ai2],
			                good: []
			            });
			        }
			        map2[ai2.id] = ai2;
			    }else{
			        for(var d = 0; d < dest2.length; d++){
			            var dj2 = dest2[d];
			            if(dj2.id === ai2.id && ai2.engine_type === null){
			                dj2.good.push(ai2);
			            }else if(dj2.id === ai2.id && ai2.good_name === null){
			                dj2.engine.push(ai2);
			            }
			        }
			    }
			}
			this.waitingChangeFormPass = dest2;


			var map3 = {},dest3 = [];
			var arr3 = param.data[3];
			for(var x = 0; x < arr3.length; x++){
			    var ai3 = arr3[x];
			    if(!map3[ai3.id]){
			        if(ai3.engine_type === null){
			            dest3.push({
			                id: ai3.id,
			                maker_id:ai3.maker_id,
			                time:ai3.buy_time,
			                msg:ai3.reason,
			                pass:ai3.pass,
			                engine:[],
			                good: [ai3]
			            });
			        }else if(ai3.good_id === null){
			            dest3.push({
			                id: ai3.id,
			                maker_id:ai3.maker_id,
			                time:ai3.buy_time,
			                msg:ai3.reason,
			                pass:ai3.pass,
			                engine:[ai3],
			                good: []
			            });
			        }
			        map3[ai3.id] = ai3;
			    }else{
			        for(var y = 0; y < dest3.length; y++){
			            var dj3 = dest3[y];
			            if(dj3.id === ai3.id && ai3.engine_type === null){
			                dj3.good.push(ai3);
			            }else if(dj3.id === ai3.id && ai3.good_id === null){
			                dj3.engine.push(ai3);
			            }
			        }
			    }
			}
			this.historyBuyForm = dest3;
			// console.log(arr3)
			
			var map4 = {},dest4 = [];
			var arr4 = param.data[4];
			for(var m = 0; m < arr4.length; m++){
			    var ai4 = arr4[m];
			    if(!map4[ai4.id]){
			        if(ai4.engine_type === null){
			            dest4.push({
			                id: ai4.id,
			                fct1:ai4.fct1,
			                fct2:ai4.fct2,
			                time:ai4.change_time,
			                msg:ai4.reason,
			                pass:ai4.pass,
			                engine:[],
			                good: [ai4]
			            });
			        }else if(ai4.good_name === null){
			            dest4.push({
			                id: ai4.id,
			                fct1:ai4.fct1,
			                fct2:ai4.fct2,
			                time:ai4.change_time,
			                msg:ai4.reason,
			                pass:ai4.pass,
			                engine:[ai4],
			                good: []
			            });
			        }
			        map4[ai4.id] = ai4;
			    }else{
			        for(var n = 0; n < dest4.length; n++){
			            var dj4 = dest4[n];
			            if(dj4.id === ai4.id && ai4.engine_type === null){
			                dj4.good.push(ai4);
			            }else if(dj4.id === ai4.id && ai4.good_name === null){
			                dj4.engine.push(ai4);
			            }
			        }
			    }
			}
			this.historyChangeForm = dest4;

		});
	},
	methods: {
		buyFormPass(index){
			this.waitingBuyForm[index].pass = 1;
			var data = this.waitingBuyForm[index]
			data.time = moment(data.time).format("YYYY-MM-DD");
			this.$http.post('/myMessageBuyPass',data).then(()=>{
				this.waitingBuyForm.splice(index,1)
				this.$message({
					type: 'success',
					message: '提交成功' 
				});
				this.$store.commit('reduce')
			});
	    },
	    changeFormPass(index){
			this.waitingChangeForm[index].pass = 1;
			var data = this.waitingChangeForm[index]
			data.time = moment(data.time).format("YYYY-MM-DD");
			// console.log(data)
			this.$http.post('/myMessageChangePass',data).then(()=>{
				this.waitingChangeForm.splice(index,1)
				this.$message({
					type: 'success',
					message: '提交成功' 
				});
				this.$store.commit('reduce')
			});
	    },
	    buyFormUnpass(index){
	    	this.waitingBuyForm[index].pass = 0;
	    	var data = this.waitingBuyForm[index]
	    	data.time = moment(data.time).format("YYYY-MM-DD");
	        this.$prompt('请输入原因', '备注', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          inputValidator:(value)=>{
	          	if(value == null){
	          		return false
	          	}else{
	          		return true;
	          	}
	          },
	          inputErrorMessage: '不能为空'
	        }).then(({ value }) => {
	        	data.msg = value;
	        	data.pass = 2;
				this.$http.post('/myMessageBuyPass',data).then(()=>{
					this.data.splice(index,1)
					this.$message({
						type: 'success',
						message: '提交成功' 
					});
					this.$store.commit('reduce')
				});
	        }).catch(() => {
				this.$message({
					type: 'info',
					message: '取消输入'
				});       
	        });
	    },
	    changeFormUnpass(index){
	    	this.waitingChangeForm[index].pass = 0;
	    	var data = this.waitingChangeForm[index]
	    	data.time = moment(data.time).format("YYYY-MM-DD");
	        this.$prompt('请输入原因', '备注', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          inputValidator:(value)=>{
	          	if(value == null){
	          		return false
	          	}else{
	          		return true;
	          	}
	          },
	          inputErrorMessage: '不能为空'
	        }).then(({ value }) => {
	        	data.msg = value;
	        	data.pass = 2;
				this.$http.post('/myMessageChangePass',data).then(()=>{
					this.waitingChangeForm.splice(index,1)
					this.$message({
						type: 'success',
						message: '提交成功' 
					});
					this.$store.commit('reduce')
				});
	        }).catch(() => {
				this.$message({
					type: 'info',
					message: '取消输入'
				});       
	        });
	    }
	},
	store
}
</script>

<style scope>
	.message_content {
		margin-bottom: 10px;
	}
	.message_content .text {
		font-size: 14px;
	}

	.message_content .item {
		margin-bottom: 18px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}
	.clearfix:after {
		clear: both
	}

	.message_content .box-card {
		width: 480px;
	}
	.message_content .time {
		font-size: 13px;
		color: #999;
		margin-left: 10px;
	}
</style>