<template>
	<div style="marginTop:120px;">
	    <el-row>
	      <el-col :xs="24" :sm="{span: 14, offset: 5}" :md="{span: 14, offset: 5}" :lg="{span: 14, offset: 5}" :xl="{span:14, offset: 5}">
	      	<el-row>
	      		<el-col :span="8">
			      	<div class="head">
			      		<img src="../../common/img/head.png" alt="">
			      	</div>
	      			<p @click="dialog()" class="changePassword">更改密码</p>
	      		</el-col>
	      		<el-col :span="16">
	      			<p>公司ID:&nbsp;&nbsp;{{this.info.com_id}}</p><br>
	      			<h2>{{this.info.com_name}}</h2><br>
	      			<p>工厂ID:&nbsp;&nbsp;{{this.info.fct_id}}</p><br>
	      			<h2>{{this.info.fct_name}}</h2>
	      		</el-col>
	      	</el-row>
	      	<el-dialog title="更改密码" :visible.sync="dialogFormVisible">
				<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
				  <el-form-item label="密码" prop="pass">
				    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
				  </el-form-item>
				  <el-form-item label="确认密码" prop="checkPass">
				    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
				  </el-form-item>
				</el-form>
			</el-dialog>
	      </el-col>
	  </el-row>
	</div>
</template>

<script>
import store from '../../vuex/store'
import '../../common/iconfont/iconfont.css'
export default {
	data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
		return {
		    username:'',
		    info:{},
		    ruleForm2: {
	          pass: '',
	          checkPass: ''
	        },
	        rules2: {
	          pass: [
	            { validator: validatePass, trigger: 'blur' }
	          ],
	          checkPass: [	
	            { validator: validatePass2, trigger: 'blur' }
	          ]
	        },
	        dialogFormVisible:false
		}
	},
	mounted(){
		this.username = store.state.user_name;
		this.$http.post('/info',{"username":this.username}).then((param)=>{
			this.info = param.data[0];
		});
	},
	methods: {
      submitForm(formName) {
      	var formData = this.ruleForm2;
        this.$refs[formName].validate((valid) => {
          if (valid) {
			this.$http.post('/changePassword',{"username":this.username,"password":formData.pass}).then((param)=>{
	        	this.$message({
	              	type: 'success',
	              	message: '密码重置成功!'
		        });
		        this.dialogFormVisible = false
			});
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      dialog(){
      	this.dialogFormVisible = true
      }
	},
	store
}
</script>

<style scope>
	.head img{
		background-color: #ffffff;
		width: 50%;
		height: 50%;
		border-radius: 100%;
	}
	.changePassword{
		color: #878D99;
		cursor: pointer;
		display: inline-block;
	}
</style>