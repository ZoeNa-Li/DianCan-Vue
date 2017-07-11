<template>
 <transition name="fade">
  <div class="queue">
  	<v-slider title="排队"></v-slider>
    <div class="content-wrapper">
      <p class="title">当前有4人在排队</p>
      <button class="button">刷新状态</button>
    </div>
  </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import Slider from '@/components/slider/slider';
export default{
  name: 'queue',
  components: {
  	'v-slider': Slider
  }
};
</script>
<style lang="less" rel="stylesheet/less">
@import "../../common/less/mixin.less";
.queue{
	width: 100%;
	height: 100%;
  padding: 54px 0 0 6px;
	background: #f4f0f0;
    .slide-enter-leave;
    .content-wrapper{
      .title{
        line-height: 18px;
        font-size: 18px;
        color:#797c7f;
        margin-bottom: 15px;
      }
      .button{
        outline: 0;
        border: 0;
        background: #fff;
        line-height: 18px;
        font-size: 18px;
        width: 150px;
        height: 38px;
        &:active{
           border: solid 2px #efa044;
        }
        .box-radius(6px);
        margin: 0 auto;
        border: solid 1px #efa044;
      }
    }
}
</style>
