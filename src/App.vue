<template>
  <div class="app clearfix">
    <v-header :seller="seller"></v-header>
    <v-split></v-split>
    <v-tab></v-tab>
    <v-split></v-split>
    <v-footer :seller="seller"></v-footer>
    <v-blank></v-blank>
    <router-view class="router-view" :seller="seller"></router-view>
  </div>
</template>

<script>
import Header from '@/components/header/header';
import Tab from '@/components/tab/tab';
import Footer from '@/components/footer/footer';
import Split from '@/components/split/split';
import Blank from '@/components/blank/blank';
const ERR_OK = 0;
export default {
  name: 'app',
  components: {
    'v-header': Header,
    'v-tab': Tab,
    'v-footer': Footer,
    'v-split': Split,
    'v-blank': Blank
  },
  data () {
    return {
      seller: { }
    };
  },
  created() {
    this.$http.get('http://diancan.bao2v.com/getJson/seller').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
           this.seller = response.data;
        }
    });
  }
};
</script>

<style lang="less" rel="stylesheet/less">
@import "./common/less/mixin.less";
.app{
  .parent-flex;
  .flex-dire(column);
  background: #f4f0f0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .router-view{
    position: fixed;
    left: 0;
    top: 0;
    z-index: 50;
  }
}
</style>
