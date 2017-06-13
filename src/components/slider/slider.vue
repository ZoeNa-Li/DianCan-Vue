<template>
  <div class="return" >
  	  <router-link to="/" class="slider">
	  <span class="icon-circle-left"></span>
	  </router-link>
  </div>
</template>
<script type="text/ecmascript-6">
export default{
  name: 'slider',
  methods: {
  }
};
</script>
<style lang="less" rel="stylesheet/less">
@import "../../common/less/mixin.less";
.return{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 42px;
	background: rgb(239,65,23);
	z-index: 80;
	border-bottom: solid 1px rgba(7,17,27,0.2);
	.slider{
		display: block;
		width:25px;
		margin: auto 0;
		margin: 9px 10px;
		font-size: 24px;
		line-height: 24px;
		color: #f4f0f0;
	}
}
</style>
