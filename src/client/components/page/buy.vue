<template>
	<div>
		<el-row>
			<el-col :xs="24" :sm="{span: 22, offset: 1}" :md="{span: 22, offset: 1}" :lg="{span: 22, offset: 1}" :xl="{span: 22, offset: 1}" class="content">
				<el-form :model="buyForm" ref="buyForm" label-width="100px">
					<h2 style="marginLeft:30px;marginBottom:20px;">公司ID：{{$store.state.com_id}}</h2>
					<el-form-item
						prop="fct"
						label="下属工厂"
						:rules="{ required: true, message: '请选择工厂'}"
						>
				        <el-select v-model="buyForm.fct"  placeholder="请选择工厂">
					      <el-option v-for="data in buyForm.info" :label="data.fct_name" :value="data.fct_id"></el-option>
					    </el-select>
					</el-form-item>
					<el-form-item
						prop="maker"
						label="制造商"
						:rules="{ required: true, message: '请选择制造商'}"
						>
				        <el-select v-model="buyForm.maker"  placeholder="请选择制造商">
					      <el-option v-for="data in buyForm.makerChose" :label="data.maker_name" :value="data.maker_id"></el-option>
					    </el-select>
					</el-form-item>

					<el-form-item
						v-for="(domain, index) in buyForm.engine"		
						:label="'燃机' + Number(index+1)"
						:key="domain.key"
						:prop="'engine.' + index + '.value'"
						:rules="{required: true, message: '燃机不能为空', trigger: 'blur'}"
						>
			        <el-select  v-model="domain.value"  placeholder="请选择燃机型号" >
				      <el-option v-for="data in domain.engines" :label="data.engine_type" :value="data.engine_type"></el-option>
				    </el-select>
				    <template>
				    	<el-input-number v-model="domain.num" @change="handleChange" :min="1" :max="10" label="数量"></el-input-number>
				    </template>
				    <el-button @click.prevent="removeEngine(domain)">删除</el-button>
				  	</el-form-item>
					<el-form-item>
						<el-button @click="addEngine">添加燃机</el-button>
					</el-form-item>

					<el-form-item
						v-for="(domain, index) in buyForm.good"		
						:label="'备件' + Number(index+1)"
						:key="domain.key"
						:prop="'good.' + index + '.value'"
						:rules="{required: true, message: '备件不能为空', trigger: 'blur'}"
						>
			        <el-select  v-model="domain.value"  placeholder="请选择备件" >
				      <el-option v-for="data in domain.goods" :label="data.good_name" :value="data.good_id"></el-option>
				    </el-select>
				    <template>
				    	<el-input-number v-model="domain.num" @change="handleChange" :min="1" :max="10" label="数量"></el-input-number>
				    </template>
				    <el-button @click.prevent="removeGoods(domain)">删除</el-button>
				  </el-form-item>
  				  <el-form-item>
				    <el-button @click="addGoods">添加备件</el-button>
				  </el-form-item>

				  <el-form-item>
				    <el-button type="primary" @click="submitForm('buyForm')">提交</el-button>
				  </el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import store from '../../vuex/store'
 export default {
    data() {
      return {
      	good:{
            value: '',
            num:0,
            goods:[]
      	},
      	engine:{
      		value:'',
      		num:0,
      		engines:[]
      	},
        buyForm: {
        	time:'',
        	buy_id:'',
	    	info:[],
	    	makerChose:[],
	        fct:'',
	        maker:'',
          	good: [{
	            value: '',
	            num:0,
	            goods:[]
          	}],
          	engine: [{
	            value: '',
	            num:0,
	            engines:[]
          	}]
        }
      };
    },
    mounted(){
		this.$http.get('/buyInfo').then((param)=>{
			this.buyForm.makerChose = param.data[0];
			for(var i = 0;i<this.buyForm.good.length;i++){
				this.buyForm.good[i].goods = param.data[2]
			};
			for(var j = 0;j<this.buyForm.engine.length;j++){
				this.buyForm.engine[j].engines = param.data[1]
			};
			this.engine.engines = param.data[1];
			this.good.goods = param.data[2];
			this.buyForm.info = param.data[3];
		});
    },
    store,
    methods: {
		submitForm(formName) {
			function ran(m) {
			m = m > 13 ? 13 : m;
			var num = new Date().getTime();
			return num.toString().substring(13 - m);
			}
			this.buyForm.buy_id = store.state.fct_id + ran(5)//生成随机数
			var now = new Date();
			var time = now.getFullYear()+"-"+((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+"-"+(now.getDate()<10?"0":"")+now.getDate();
			this.buyForm.time = time;
			var form = this.buyForm;
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (form.good.length === 0 && form.engine.length ===0) {
						this.$message.warning('不允许提交空的表单');
					}else{
						this.$http.post('/buyForm',form).then((param)=>{
							this.$store.commit('add')
							this.$message.success('提交成功');
						});
					}
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		removeGoods(item) {
			var index = this.buyForm.good.indexOf(item);
				if (index !== -1) {
				  this.buyForm.good.splice(index, 1)
				}
		},
		removeEngine(item){
			var index = this.buyForm.engine.indexOf(item);
				if (index !== -1) {
				  this.buyForm.engine.splice(index, 1)
				}
		},
		addGoods() {
			var good = JSON.parse(JSON.stringify(this.good));
			this.buyForm.good.push(good);
		},
		addEngine(){
			var engine = JSON.parse(JSON.stringify(this.engine));
			this.buyForm.engine.push(engine);
		},
		handleChange(value) {
		// console.log(value);
		}
    }
  }
</script>
</script>

<style scope>
	.content{
		margin-top: 120px;
		background-color: #fff;
		border-radius: 10px;
		padding: 20px 20px;
	}
</style>