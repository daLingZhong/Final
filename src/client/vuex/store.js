import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
	user_name:"",
	status:false,
	power:'1',
  com_id:'',
  fct_id:'',
  buy_num:'',
  a:'11111',
  fork_num:''
}
const mutations = {
    showUserName(state,info){
    	state.user_name = info.username;
    	state.status = info.status;
    	state.power = info.power;
      state.com_id = info.com_id;
      state.fct_id = info.fct_id;
      state.buy_num = info.buy_num;
      state.a = info.a
    },
    add(state){
      state.buy_num ++;
    },
    reduce(state){
      state.buy_num --;
    }
}

export default new Vuex.Store({
  state,
  mutations
})