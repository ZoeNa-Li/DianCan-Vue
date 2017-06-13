<template>
<div class="tab border-1px">
  <div class="tab-wrapper">
  	<router-link to="/menu" class="tab-item">
	  <span class="icon food"><i class="icon-food"></i></span>
      <span class="title">点餐</span>
    </router-link>
    <router-link to="/reserve" class="tab-item">
  	  <span class="icon alarm"><i class="icon-alarm"></i></span>
      <span class="title">预订</span>
    </router-link>
     <router-link to="/queue" class="tab-item">
  	  <span class="icon queue-icon"><i class="icon-queue"></i></span>
      <span class="title">订单</span>
    </router-link>
    <router-link to="/order" class="tab-item">
  	  <span class="icon order"><i class="icon-order"></i></span>
      <span class="title">订单</span>
    </router-link>
  </div>
</div>
</template>
<script type="text/ecmascript-6">
export default{
  name: 'tab'
};
</script>
<style lang="less" rel="stylesheet/less">
@import "../../common/less/mixin.less";
.tab{
	 .child-flex(1);
	 position: relative;
	width: 100%;
	// height: 86px;
	background: #fff;
	.tab-wrapper{
	  position:absolute;
	  .parent-flex;
	  width: 100%;
	  height: 100%;
	  .tab-item{
	  .child-flex(1);
	  text-align: center;
	  margin: auto 0;
	  .icon{
	  	display: table;
	  	.border-box;
	  	width: 60px;
	  	height: 60px;
	  	.box-radius(30px);
	  	margin: 0 auto 10px auto;
	  	background: #fff;
	  	i{  
	  		display: table-cell;
	  		font-size: 30px;
	  		line-height:45px;
	  		color: #fff;
	  		vertical-align: middle;
	  	}
	  }
	  .title{
	  	font-size:16px;
	  	line-height: 16px;
	  }
	  .food{
	  	background: #efc90c;
	  }
	  .alarm{
	  	background: #07d892;
	  }
	  .queue-icon{
	  	background: #0ca9ef;
	  }
	  .order{
        background: #e31d1d;
	  }
	}

	}
}
</style>
