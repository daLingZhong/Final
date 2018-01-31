<template>
	<div>
		<el-row>
			<el-col :xs="24" :sm="{span: 22, offset: 1}" :md="{span: 22, offset: 1}" :lg="{span: 22, offset: 1}" :xl="{span: 22, offset: 1}" class="content">
				<el-form :model="changeForm" ref="changeForm" label-width="100px">
					<h2 style="marginLeft:30px;marginBottom:20px;">公司ID：{{$store.state.com_id}}</h2>
					<el-form-item
						label="调拨工厂"
						:rules="{ required: true, message: '请选择调拨工厂'}"
						>
				        <el-select v-model="changeForm.fctNomal"  placeholder="请选择调拨工厂" @change="selectFct">
					      <el-option v-for="data in changeForm.fct" :label="data.fct_id" :value="data.fct_id"></el-option>
					    </el-select>
					</el-form-item>

					<el-form-item label="燃机">
						<template>
						  <el-transfer
						    v-model="changeForm.engine_value"
						    :titles="['调拨方', '接收方']"
						    :data="changeForm.engine">
						  </el-transfer>
						</template>
					</el-form-item>

					<el-form-item label="备件">
						<template>
						  <el-transfer
						    v-model="changeForm.goods_value"
						    :titles="['调拨方', '接收方']"
						    :render-content="renderFunc"
						    :data="changeForm.goods">
						  </el-transfer>
						</template>
					</el-form-item>

				  <el-form-item>
				    <el-button type="primary" @click="submitForm('changeForm')">提交</el-button>
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
        changeForm:{
        	fctNomal:'',
        	fct:[],
        	engine:[],
        	engine_value:[],
        	goods:[],
        	goods_value:[]
        },
        form:{
        	changeId:'',
        	time:'',
        	fct1:'',
        	fct2:'',
        	engine:[],
        	goods:[]
        },
        renderFunc(h, option) {
          return <div><span>{ option.label }</span><br/><span></span></div>;
        }
      };
    },
    mounted(){
		this.$http.get('/changeGetFct').then((param)=>{
			this.changeForm.fct = param.data
		});
    },
    store,
    methods: {
		selectFct(){
			var fct = this.changeForm.fctNomal
			this.$http.post('/selectFct',fct).then((param)=>{
				this.changeForm.engine = [];
				this.changeForm.goods = [];
				for(var i=0;i<param.data[0].length;i++){
					this.changeForm.engine.push({
						key:i,
						label:param.data[0][i].engineInfo,
						disabled:param.data[0][i].locked === 1,
						id:param.data[0][i].id,
						engine_type:param.data[0][i].engine_type,
						num:param.data[0][i].num
					})
				}
				for(var j=0;j<param.data[1].length;j++){
					this.changeForm.goods.push({
						key:j,
						label:param.data[1][j].goodsInfo,
						disabled:param.data[1][j].locked === 1,
						id:param.data[1][j].id,
						good_name:param.data[1][j].good_name,
						num:param.data[1][j].num
					})
				}
			});
		},
		submitForm(){
			for(var i=0;i<this.changeForm.engine_value.length;i++){
				var key1 = this.changeForm.engine_value[i]
				this.form.engine.push({
					id:this.changeForm.engine[key1].id,
					engine_type:this.changeForm.engine[key1].engine_type,
					num:this.changeForm.engine[key1].num
				})
			};
			for(var j=0;j<this.changeForm.goods_value.length;j++){
				var key2 = this.changeForm.goods_value[j]
				this.form.goods.push({
					id:this.changeForm.goods[key2].id,
					good_name:this.changeForm.goods[key2].good_name,
					num:this.changeForm.goods[key2].num
				})
			};
			function ran(m) {
				m = m > 13 ? 13 : m;
				var num = new Date().getTime();
				return num.toString().substring(13 - m);
			}
			this.form.changeId = store.state.fct_id + ran(5) + this.changeForm.fctNomal//生成随机数
			var now = new Date();
			var time = now.getFullYear()+"-"+((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+"-"+(now.getDate()<10?"0":"")+now.getDate();
			this.form.time = time;
			this.form.fct1 = store.state.fct_id;
			this.form.fct2 = this.changeForm.fctNomal;
			var json = this.form;
			this.$http.post('/changeForm',json).then((param)=>{
				this.changeForm.goods_value = [];
				this.changeForm.engine_value = [];
				this.$store.commit('add');
				this.$message.success('提交成功');
			});
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