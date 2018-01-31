<template>
	<div>
		<el-row>
			<el-col :xs="24" :sm="{span: 22, offset: 1}" :md="{span: 22, offset: 1}" :lg="{span: 22, offset: 1}" :xl="{span: 22, offset: 1}">
				<el-row>
					<el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3"><el-button style="margin-top:80px" @click="inserButton()" :disabled="isDisabled">新增成员</el-button></el-col>
					<el-col :xs="{span: 10, offset: 11}" :sm="{span: 10, offset: 11}" :md="{span: 10, offset: 11}" :lg="{span: 5, offset: 16}" :xl="{span: 5, offset: 16}"> 
						<div class="demo-input-suffix" style="margin-top:80px;">
						  <el-autocomplete
						    v-model="state4"
  							:fetch-suggestions="querySearchAsync"
						    placeholder="请输入内容"
						    style="width:100%;"
						    @select="handleSelect"
						    @blur="blur"
						    >
						  	<i class="el-icon-search el-input__icon" slot="prefix"></i>
						  </el-autocomplete>
						</div>
			    	</el-col>
				</el-row>
			  	<el-table
			    :data="compony"
			    style="width: 100%;margin-top:20px"
			    :row-key="getRowKeys"
	    		:expand-row-keys="expands"
	    		@current-change="toggleRowExpansion">
			    <el-table-column type="expand">
			      <template slot-scope="props">
			        <el-form label-position="left" inline class="demo-table-expand">
			          <el-form-item label="公司名称">
			            <span>{{ props.row.com_name }}</span>
			          </el-form-item>
			          <el-form-item label="下属电厂ID">
			            <span>{{ props.row.fct_id }}</span>
			          </el-form-item>
			          <el-form-item label="电厂名称">
			            <span>{{ props.row.fct_name }}</span>
			          </el-form-item>
			          <el-form-item label="用户名">
			            <span>{{ props.row.user_name }}</span>
			          </el-form-item>
			          <el-form-item label="密码">
			            <span>{{ props.row.password | sum}}</span>
			          </el-form-item>
			          <el-form-item label="加入时间">
			            <span>{{ props.row.join_time | formatDate}}</span>
			          </el-form-item>
			          <el-form-item label="离开时间">
			            <span>{{ props.row.leave_time }}</span>
			          </el-form-item>
			        </el-form>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="公司 ID"
			      prop="com_id">
			    </el-table-column>
			    <el-table-column
			      label="公司名称"
			      prop="com_name">
			    </el-table-column>
			    <el-table-column label="操作">
			      <template slot-scope="scope">
			        <el-button
			          size="mini"
			          @click="handleEdit(scope.$index, scope.row)" v-if="check()">编辑</el-button>
			        <el-button
			          size="mini"
			          type="danger"
			          @click="handleDelete(scope.$index, scope.row)" v-if="check()">删除</el-button>
			      </template>
			    </el-table-column>
			  </el-table>
			</el-col>
		</el-row>
		<el-dialog title="成员信息" :visible.sync="dialogFormVisible">
		  <el-form :model="form" :inline="true">
		    <el-form-item label="公司ID" :label-width="formLabelWidth">
				<el-input v-model="form.com_id" auto-complete="off" :disabled="edit"></el-input>
		    </el-form-item>
		    <el-form-item label="公司名称" :label-width="formLabelWidth">
				<el-input v-model="form.com_name" auto-complete="off"></el-input>
		    </el-form-item><br>
		    <el-form-item label="工厂ID" :label-width="formLabelWidth">
				<el-input v-model="form.fct_id" auto-complete="off" :disabled="edit"></el-input>
		    </el-form-item>
		    <el-form-item label="工厂名称" :label-width="formLabelWidth">
				<el-input v-model="form.fct_name" auto-complete="off"></el-input>
		    </el-form-item><br>
		    <el-form-item label="用户名" :label-width="formLabelWidth">
				<el-input v-model="form.user_name" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="密码" :label-width="formLabelWidth">
				<el-input v-model="form.password" auto-complete="off"></el-input>
		    </el-form-item><br>
			<el-form-item label="加入时间" :label-width="formLabelWidth">
				<el-date-picker type="date" placeholder="选择日期" v-model="form.join_time"></el-date-picker>
			</el-form-item><br>
			<el-form-item label="离开时间" :label-width="formLabelWidth">
				<el-date-picker type="date" placeholder="选择日期" v-model="form.leave_time"></el-date-picker>
			</el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="cancel()">取 消</el-button>
		    <el-button type="primary" @click="down()" plain>确 定</el-button>
		  </div>
		</el-dialog>
		<el-dialog title="新增成员" :visible.sync="dialogInsertFormVisible">
		  <el-form :model="insertForm" :inline="true">
		    <el-form-item label="公司ID" :label-width="formLabelWidth">
				<el-input v-model="insertForm.com_id" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="公司名称" :label-width="formLabelWidth">
				<el-input v-model="insertForm.com_name" auto-complete="off"></el-input>
		    </el-form-item><br>
		    <el-form-item label="工厂ID" :label-width="formLabelWidth">
				<el-input v-model="insertForm.fct_id" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="工厂名称" :label-width="formLabelWidth">
				<el-input v-model="insertForm.fct_name" auto-complete="off"></el-input>
		    </el-form-item><br>
		    <el-form-item label="用户名" :label-width="formLabelWidth">
				<el-input v-model="insertForm.user_name" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="密码" :label-width="formLabelWidth">
				<el-input v-model="insertForm.password" auto-complete="off"></el-input>
		    </el-form-item><br>
			<el-form-item label="加入时间" :label-width="formLabelWidth">
				<el-date-picker type="date" placeholder="选择日期" v-model="insertForm.join_time"></el-date-picker>
			</el-form-item><br>
			<el-form-item label="离开时间" :label-width="formLabelWidth">
				<el-date-picker type="date" placeholder="选择日期" v-model="insertForm.leave_time" :disabled="edit"></el-date-picker>
			</el-form-item>
		  </el-form>

		  <div slot="footer" class="dialog-footer">
		    <el-button @click="insertCancel()">取 消</el-button>
		    <el-button type="primary" @click="insertDown()" plain>确 定</el-button>

		  </div>
		</el-dialog>
	</div>
</template>

<script>
  import {formatDate} from '../../common/date.js'
  import moment from 'moment'
  import store from '../../vuex/store'
  export default {
    data() {
      return {
        compony:[],
        restaurants: [],
        state4: '',
        isDisabled:true,
        timeout:  null,
        // 获取row的key值
        getRowKeys(row) {
            return row.id;
        },
		form: {},
		insertForm:{
			com_id:'',
			com_name:'',
			fct_id:'',
			fct_name:'',
			join_time:'',
			leave_time:'',
			user_name:'',
			password:''
		},
        // 要展开的行，数值的元素是row的key值
        expands: [],
        dialogFormVisible: false,
        dialogInsertFormVisible:false,
        formLabelWidth: '11rem',
        index:'',
        edit:true
      }
    },
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd');
        },
        sum(value){
        	if(store.state.power === '1'){
        		return value
        	}else{
	    		var a = value.replace(/\s{0,}[\S]{1,}[\s\S]{0,}/,"*")
	        	return a
        	}
        }
    },
    mounted(){
		this.$http.get('/mmanager').then((param)=>{
	        for(let i of param.data){  
	            i.value = i.com_name;  //将CUSTOMER_NAME作为value  
	        };
			this.compony = param.data;
			this.restaurants = this.loadAll();
		});
    },
    store,
    methods:{
    	check(){
    		if(store.state.power === '1'){
    			this.isDisabled = false;
    			return true
    		}else{
    			this.isDisabled = true;
    			return false
    		}
    	},
		handleEdit(index, row) {
			this.index = '';
			this.index = index;
			this.form = JSON.parse(JSON.stringify(this.compony[index])); //深拷贝
			this.dialogFormVisible = true;
		},
		handleDelete(index, row) {
			this.index = '';
			this.index = index;
			var id = this.compony[index].com_id
			this.$confirm('此操作将永久删除该条目, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				this.$http.post('/mmanagerDelete',id).then(()=>{
					this.compony.splice(index,1) //删除数组中的一位，不过有和编辑一样的bug
				});
		        this.$message({
	              	type: 'success',
	              	message: '删除成功!'
		        });
	        }).catch(() => {
	            this.$message({
		            type: 'info',
		            message: '已取消删除'
	            });          
	        });
		},
		toggleRowExpansion(row){
			this.expands = [];
			this.expands.push(row.id);
		},
		cancel(){
			this.dialogFormVisible = false;
		},
		down(){
			this.dialogFormVisible = false;
			var form  = this.form
			form.join_time = moment(form.join_time).format("YYYY-MM-DD");
			form.leave_time = moment(form.leave_time).format("YYYY-MM-DD");
			this.$http.post('/mmanagerUpdate',form).then(()=>{
				this.compony.splice(this.index,1,form); //有点小bug,获取row.id会出一点问题，不影响功能，行展开受限
		        this.$notify({
		          title: '更改成功',
		          message: '公司ID'+this.compony[this.index].com_id+'的信息已更新',
		          type: 'success'
		        });
			});
		},
		insertDown(){
			this.dialogInsertFormVisible = false;
			var insertForm  = this.insertForm;
			insertForm.join_time = moment(insertForm.join_time).format("YYYY-MM-DD") //使用moment转换日期格式
			// console.log(this.insertForm)
			this.$http.post('/mmanagerInsert',insertForm).then(()=>{
				this.compony.push(insertForm);
		        this.$notify({
		          title: '更改成功',
		          message: '公司ID'+insertForm.com_id+'的信息已添加',
		          type: 'success'
		        });
			});
		},
		insertCancel(){
			this.dialogInsertFormVisible = false;
			// this.insertForm.com_id = ''
			for (var item in this.insertForm) {
			     this.insertForm[item] = ''//得到键对应的值，然后统一清空
			}
		},
		inserButton(){
			this.dialogInsertFormVisible = true;
			for (var item in this.insertForm) {
			     this.insertForm[item] = ''//得到键对应的值，然后统一清空
			}
		},
		//搜索功能
		loadAll(){
			return this.compony
		},
      	querySearchAsync(queryString, cb) {
	        var restaurants = this.restaurants;
	        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

	        clearTimeout(this.timeout);
	        this.timeout = setTimeout(() => {
	          cb(results);
	        }, 3000 * Math.random());
      	},
		createStateFilter(queryString) {
			return (state) => {
			  return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
			};
		},
		handleSelect(item) {
			this.compony = [];
			this.compony.push(item)
			console.log(this.compony)
		},
		blur(){
			if (this.state4 == '') {
				this.$http.get('/mmanager').then((param)=>{
			        for(let i of param.data){  
			            i.value = i.com_name;  //将CUSTOMER_NAME作为value  
			        };
					this.compony = param.data;
					this.restaurants = this.loadAll();
				});
			};
		}
    }
  }
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>