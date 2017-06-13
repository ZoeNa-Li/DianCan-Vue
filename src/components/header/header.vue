<template>
<div class="header">
  <div class="content-wrapper">
	<div class="content-left">
		<img :src="seller.avatar" alt="店家图片">
	</div>
    <div class="content-right">
    <div class="title"><h2>{{seller.name}}</h2></div>
    <div class="desc">
    <span class="wifi"><i class="icon-wifi"></i>wifi</span>
    <span class="card"><i class="icon-credit-card"></i>刷卡</span>
    </div>
    <div class="per-capita">
     <span>￥{{seller.pre}}/人</span>
    </div>

    </div>
</div>
</div>
</template>
<script type="text/ecmascript-6">
export default{
  name: 'header',
  props: {
  	seller: {
  		type: Object
  	}
  }
};
</script>
<style lang="less" rel="stylesheet/less">
@import "../../common/less/mixin.less";
.header{
  .child-flex(1.1);
  position: relative;
	width: 100%;
	// height: 138px;
	background: #fff;
	.content-wrapper{
      position: absolute;
      padding: 24px 12px 18px 24px;
      font-size: 0;
      .content-left{
        .display-inline-blok;
        vertical-align: top;
        
        img{
          width: 90px;
          .box-radius(5px);
        }
      }
      .content-right{
        .display-inline-blok;
      	margin-left: 16px;
      	vertical-align: top;
      	.title{
      		margin: 2px 0 8px 0;
      		font-size: 18px;
      		line-height: 20px;
      	}
      	.desc{
      		margin-bottom: 8px;
      		font-size: 14px;
      		line-height: 14px;
      		span{
      			margin-right: 6px;
      		}
        }
        .per-capita{
        	font-size: 16px;
        	line-height: 16px;

      	}
      }
	}
}
</style>
