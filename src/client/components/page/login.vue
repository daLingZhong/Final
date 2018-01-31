<template>
    <div class="login-wrap">
        <!-- <h3>{{$store.state.TEST}}</h3> -->
        <div class="ms-title">燃机联储联备系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;color:#999;">Tips : 项目启动于2017-11-09。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
import store from '../../vuex/store'
    export default {
        data: function(){
            return {
                power:'',
                fct_id:'',
                com_id:'',
                status:false,
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted(){
            this.checkLogin()
        },
        store,
        methods: {
            submitForm(formName) {
                var formData = this.ruleForm;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post('/login',formData).then((param)=> {
                            this.status = param.data.status;
                            this.power = param.data.power;
                            this.com_id = param.data.com_id;
                            this.fct_id = param.data.fct_id;
                            if(param.data.status === true){
                                this.$store.commit("showUserName",{'username':this.ruleForm.username,'status':this.status,'power':this.power,'com_id':this.com_id,'fct_id':this.fct_id});
                                // console.log(store.state)
                                this.$router.push({path: '/index', replace: true});
                            }else{
                                this.$message.warning('用户名或密码错误');
                            }
                            // success callback
                        }, response => {
                            // error callback
                            this.$message.error('遇到了不可预知的错误');
                        });
                    } else {
                        return false;
                    }
                });
            },
            checkLogin(){
                this.$http.post('/checkLogin').then((param)=>{
                    this.username = param.data.name;
                    // console.info(JSON.stringify(param.data) == "{}")
                    if(JSON.stringify(param.data) !== "{}"){
                        this.$store.commit("showUserName",{'username':this.username,'status':true});
                        this.$router.push({path: '/index', replace: true});
                    }
                });
            }
        }
    }
</script>

<style scope>

    .login-wrap{
        position: absolute;
        width:100%;
        height:100%;
        background-color: #4682B4;

    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>