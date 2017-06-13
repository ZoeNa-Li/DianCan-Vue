<template>
 <transition name="fade">
  <div class="order">
  	<v-slider></v-slider>
  </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import Slider from '@/components/slider/slider';
export default{
  name: 'order',
  data() {
    return {};
  },
  components: {
  	'v-slider': Slider
  },
  created() {}
};
</script>
<style lang="less" rel="stylesheet/less">
@import "../../common/less/mixin.less";
.order{
	width: 100%;
	height: 100%;
	background: pink;
    .slide-enter-leave;
}
</style>
