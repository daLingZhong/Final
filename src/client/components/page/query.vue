<template>
  <div>
    <el-row>
      <el-col :xs="24" :sm="{span: 22, offset: 1}" :md="{span: 22, offset: 1}" :lg="{span: 22, offset: 1}" :xl="{span: 22, offset: 1}">
        <el-tabs v-model="activeName" @tab-click="handleClick1" style="margin-top:80px;" type="border-card">
          <el-tab-pane label="燃机" name="first">
            <el-table
              :data="engine"
              border
              style="width: 100%">
              <el-table-column
                fixed
                prop="engine_id"
                label="燃机ID"
                >
              </el-table-column>
              <el-table-column
                prop="engine_type"
                label="燃机型号"
                >
              </el-table-column>
              <el-table-column
                prop="fct_id"
                label="所属工厂ID"
                >
              </el-table-column>
              <el-table-column
                prop="fct_name"
                label="所属工厂名"
                >
              </el-table-column>
              <el-table-column
                prop="maker_id"
                label="制造商ID"
                >
              </el-table-column>
              <el-table-column
                prop="maker_name"
                label="制造商名"
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
                prop="live_time"
                label="剩余使用时长"
                >
              </el-table-column>
              <el-table-column
                prop="unit"
                label="单位"
                >
              </el-table-column>
              <el-table-column
                prop="inuse"
                label="使用中"
                >
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                >
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                  <el-button type="text" size="small">编辑</el-button>
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
                prop="fct_id"
                label="所属工厂ID"
                >
              </el-table-column>
              <el-table-column
                prop="engine_type"
                label="所属机型"
                >
              </el-table-column>
              <el-table-column
                prop="buy_time"
                label="购入时间"
                >
              </el-table-column>
              <el-table-column
                prop="live_time"
                label="剩余使用时长"
                >
              </el-table-column>
              <el-table-column
                prop="unit2"
                label="单位/时长"
                >
              </el-table-column>
              <el-table-column
                prop="num"
                label="数量"
                >
              </el-table-column>
              <el-table-column
                prop="unit1"
                label="单位/备件"
                >
              </el-table-column>
              <el-table-column
                prop="inuse"
                label="使用中"
                >
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                >
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                  <el-button type="text" size="small">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    data() {
      return {
        activeName: 'first',
        engine: [],
        goods: []
      };
    },
    mounted(){
      this.$http.get('/engine').then((param)=>{
        var engine = param.data;
        for(var i=0;i<engine.length;i++){
          if(engine[i].inuse === 0){
            engine[i].inuse = '否'
          }else{
            engine[i].inuse = '是'
          }
          engine[i].buy_time = moment(param.data[i].buy_time).format("YYYY-MM-DD");
        }
        this.engine = engine
      });
      this.$http.get('/goods').then((param)=>{
        var goods = param.data;
        for(var i=0;i<goods.length;i++){
          if(goods[i].inuse === 0){
            goods[i].inuse = '否'
          }else{
            goods[i].inuse = '是'
          }
          goods[i].buy_time = moment(param.data[i].buy_time).format("YYYY-MM-DD");
        }
        this.goods = goods
      });
    },
    methods: {
      handleClick1(tab, event) {
        // console.log(tab, event);
      },
      handleClick(row) {
        // console.log(row);
      }
    }
  };
</script>