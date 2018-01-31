<template>
	<div class="warp">
		<menua></menua>
		<transition name="fade" mode="out-in"><router-view></router-view></transition>
	</div>
</template>

<script>
import menua from './menu.vue'
import $ from 'expose-loader?$!jquery'
export default {
  data () {
    return {
    }
  },
  components:{
  	menua
  }
}
</script>

<style>
.warp{
	overflow-x:hidden;
    position: absolute;
    width:100%;
    height:100%;
    background-color: #B9D0E3;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
</style>