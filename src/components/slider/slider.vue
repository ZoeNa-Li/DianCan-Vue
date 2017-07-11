<template>
  <div class="return">
  	  <router-link :to="url" class="slider" >
	  <span class="icon-chevron-left icon"></span>
	  </router-link>
	  <span class="title">{{title}}</span>
  </div>
</template>
<script type="text/ecmascript-6">
export default{
  name: 'slider',
  methods: {
  },
  props: {
  	  url: {
      type: String,
      default: '/'
    },
      title: {
      	type: String,
      	default: ''
      }
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
	background: #f31414;
	z-index: 80;
	border-bottom: solid 1px rgba(7,17,27,0.2);
	.slider{
		display: block;
		width:25px;
		.box-radius(12px);
		margin: auto 0;
		margin: 9px 10px;
		text-align: center;
		font-size: 25px;
		line-height: 25px;
		color: #f4f0f0;
		&:active{
		  .box-radius(12px);
		  background-color: rgba(178, 47, 47, 0.8);	
		}
		&:hover{
		  .box-radius(12px);
		  background-color: rgba(187, 89, 89, 0.8);	
		}
		.icon{
			font-size: 22px;

		}
		
	}
	.title{
        position:absolute;
        top:12px;
        left: 40px;
        color: #fff;
	  }

}
</style>
