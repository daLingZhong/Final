<template>
  <div>
    <el-row>
      <el-col :xs="24" :sm="{span: 22, offset: 1}" :md="{span: 22, offset: 1}" :lg="{span: 22, offset: 1}" :xl="{span: 22, offset: 1}">
          <el-table
          stripe
          :data="maker"
          style="width: 100%;margin-top:120px">
          <el-table-column label="制造商ID">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.maker_id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="制造商名称">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.maker_name }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        maker:[]
      }
    },
    mounted(){
      this.$http.get('/maker').then((param)=>{
        this.maker = param.data;
      });
    }
  }
</script>