<template>
  <div>
    <el-row>
      <el-col :xs="24" :sm="{span: 22, offset: 1}" :md="{span: 22, offset: 1}" :lg="{span: 22, offset: 1}" :xl="{span: 22, offset: 1}">
        <el-tabs v-model="activeName" style="margin-top:80px;" type="border-card">
          <el-tab-pane label="燃机" name="first">
            <el-table
              :data="engine"
              border
              style="width: 100%">
              <el-table-column
                prop="engine_type"
                label="燃机型号"
                >
              </el-table-column>
              <el-table-column
                prop="maker_id"
                label="制造商ID"
                >
              </el-table-column>
              <el-table-column
                prop="buy_time"
                label="购入时间"
                >
              </el-table-column>
              <el-table-column
                prop="num"
                label="数量"
                >
              </el-table-column>
              <el-table-column
                prop="use_time"
                label="已经使用时长"
                >
              </el-table-column>
              <el-table-column
                prop="died_time"
                label="报废时间"
                >
              </el-table-column>
              <el-table-column
                prop="inuse"
                :formatter="inuse"
                label="使用中"
                >
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                >
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.$index,scope.row)" type="text" size="small">维护</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="物资" name="second">
            <el-table
              :data="goods"
              border
              style="width: 100%">
              <el-table-column
                fixed
                prop="good_id"
                label="备件ID"
                >
              </el-table-column>
              <el-table-column
                prop="good_name"
                label="备件名"
                >
              </el-table-column>
              <el-table-column
                prop="buy_time"
                label="购入时间"
                >
              </el-table-column>
              <el-table-column
                prop="use_time"
                label="已经使用时长"
                >
              </el-table-column>
              <el-table-column
                prop="num"
                label="数量"
                >
              </el-table-column>
              <el-table-column
                prop="died_time"
                label="报废时间"
                >
              </el-table-column>
              <el-table-column
                prop="inuse"
                label="使用中"
                :formatter="inuse"
                >
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                >
                <template slot-scope="scope">
                  <el-button @click="handleClick1(scope.$index,scope.row)" type="text" size="small">维护</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-dialog title="燃机维护" :visible.sync="engineDialog">
      <el-form :model="engineForm" :inline="true">
        <el-form-item label="燃机型号" :label-width="formLabelWidth">
          <el-input v-model="engineForm.engine_type" auto-complete="off" :disabled="edit"></el-input>
        </el-form-item>
        <el-form-item label="制造商ID" :label-width="formLabelWidth">
          <el-input v-model="engineForm.maker_id" auto-complete="off" :disabled="edit"></el-input>
        </el-form-item><br>
        <el-form-item label="数量" :label-width="formLabelWidth">
          <el-input v-model="engineForm.num" auto-complete="off" :disabled="edit"></el-input>
        </el-form-item>
        <el-form-item label="已使用时长" :label-width="formLabelWidth">
          <el-input-number v-model="engineForm.use_time" :min="1" :max="50" controls-position="right"></el-input-number>
        </el-form-item><br>
        <el-form-item label="购入时间" :label-width="formLabelWidth">
          <el-date-picker type="date" placeholder="选择日期" v-model="engineForm.buy_time" :disabled="edit"></el-date-picker>
        </el-form-item><br>
        <el-form-item label="报废时间" :label-width="formLabelWidth">
          <el-date-picker type="date" placeholder="选择日期" v-model="engineForm.died_time"></el-date-picker>
        </el-form-item><br>
        <el-form-item label="使用中" :label-width="formLabelWidth">
            <el-switch
              v-model="engineForm.inuse"
              active-color="#13ce66"
              active-value="1"
              inactive-value="0">
            </el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="insertCancel()" type="info">取 消</el-button>
        <el-button @click="insertDown()" type="primary">确 定</el-button>
      </div>
    </el-dialog>



    <el-dialog title="备件维护" :visible.sync="goodsDialog">
      <el-form :model="goodForm" :inline="true">
        <el-form-item label="燃机型号" :label-width="formLabelWidth">
          <el-input v-model="goodForm.good_name" auto-complete="off" :disabled="edit"></el-input>
        </el-form-item>
        <el-form-item label="制造商ID" :label-width="formLabelWidth">
          <el-input v-model="goodForm.maker_id" auto-complete="off" :disabled="edit"></el-input>
        </el-form-item><br>
        <el-form-item label="数量" :label-width="formLabelWidth">
          <el-input v-model="goodForm.num" auto-complete="off" :disabled="edit"></el-input>
        </el-form-item>
        <el-form-item label="已使用时长" :label-width="formLabelWidth">
          <el-input-number v-model="goodForm.use_time" :min="1" :max="50" controls-position="right"></el-input-number>
        </el-form-item><br>
        <el-form-item label="购入时间" :label-width="formLabelWidth">
          <el-date-picker type="date" placeholder="选择日期" v-model="goodForm.buy_time" :disabled="edit"></el-date-picker>
        </el-form-item><br>
        <el-form-item label="报废时间" :label-width="formLabelWidth">
          <el-date-picker type="date" placeholder="选择日期" v-model="goodForm.died_time"></el-date-picker>
        </el-form-item><br>
        <el-form-item label="使用中" :label-width="formLabelWidth">
            <el-switch
              v-model="goodForm.inuse"
              active-color="#13ce66"
              active-value="1"
              inactive-value="0">
            </el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="insertCancel1()" type="info">取 消</el-button>
        <el-button @click="insertDown1()" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    data() {
      return {
        activeName: 'first',
        engine: [],
        goods: [],
        engineDialog: false,
        goodsDialog: false,
        formLabelWidth: '11rem',
        edit:true,
        engineForm:'',
        goodForm:''
      };
    },
    mounted(){
      this.$http.get('/mainGetFct').then((param)=>{
        var engine = param.data[0];
        var goods = param.data[1];
        for(var i=0;i<engine.length;i++){
          engine[i].buy_time = moment(engine[i].buy_time).format("YYYY-MM-DD");
        }
        for(var j=0;j<goods.length;j++){
          goods[j].buy_time = moment(goods[j].buy_time).format("YYYY-MM-DD");
        }
        this.engine = engine
        this.goods = goods
        console.log(this.goods)
      });
    },
    methods: {
      handleClick1(index,row) {
        this.goodsDialog = true
        this.goodForm = JSON.parse(JSON.stringify(this.goods[index]));
      },
      handleClick(index,row) {
        this.engineDialog = true
        this.engineForm = JSON.parse(JSON.stringify(this.engine[index]));
        console.log(index);
      },
      insertCancel(){
        this.engineDialog = false
      },
      insertCancel1(){
        this.goodsDialog = false
      },
      insertDown(){

      },
      insertDown1(){

      },
      inuse: function (row, column) {
          return row.inuse == 1 ? '是' : row.inuse == 0 ? '否' : '';
      }
    }
  };
</script>