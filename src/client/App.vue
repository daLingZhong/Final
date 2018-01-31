<template>
  <div>
    <transition name="fade" mode="out-in"><router-view></router-view></transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  }
}
</script>

<style type="text/css">
*{
    margin: 0;
    padding:0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar
{
    width: 8px;
    height: 8px; 
    background-image:-webkit-linear-gradient(#B9D0E3, #ffffff);
    background-image:-o-linear-gradient(#B9D0E3, #ffffff);
    background-image:linear-gradient(#B9D0E3, #ffffff);
}

/*定义滚动条轨道 内阴影+圆角*/
/*::-webkit-scrollbar-track
{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
}*/

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb
{
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #B4BCCC;
}
::-webkit-scrollbar-thumb:hover
{
    background-color: #7B7B7B;
}
</style>