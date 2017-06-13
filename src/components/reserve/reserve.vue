<template>
 <transition name="fade">
  <div class="reserve">
  	<v-slider></v-slider>
    <form class="content">
      <div class="time">
        <label for="time" class="time-label">请选择你的时间</label><br>
        <select v-model="reTime" id="time" type="text" placeholder="2017-4-27" class="time-slect">
          <option>{{dayOne}}</option>
          <option>{{dayTwo}}</option>
          <option>{{dayThree}}</option>
        </select>
        <br>
      </div>
      <div class="type">
        <p class="title">请你的选择桌型</p>
        <input type="radio" id="two" value="two" v-model="numType">
        <label for="two">二人桌</label>
        <br>
        <input type="radio" id="four" value="four" v-model="numType">
        <label for="four">四人桌</label>
        <br>
        <input type="radio" id="eight" value="eight" v-model="numType">
        <label for="eight">八人桌</label>
        <br>
      </div>  
      <input type="submit" value="预定" class="submit">  
    </form>
  </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import Slider from '@/components/slider/slider';
export default{
  name: 'reserve',
  data() {
    return {
      numType: '',
      reTime: '',
      dayOne: '',
      dayTwo: '',
      dayThree: ''
    };
  },
  components: {
  	'v-slider': Slider
  },
  methods: {
    out() {
      console.log(this.numType);
    },
    creatTime() {
      this.dayOne = this.getDateStr(1);
      this.dayTwo = this.getDateStr(2);
      this.dayThree = this.getDateStr(3);
    },
    getDateStr (dayCount) {
      var dd = new Date();
      dd.setDate(dd.getDate() + dayCount);// 设置日期
      var y = dd.getFullYear();
      var m = dd.getMonth() + 1;// 获取当前月份的日期
      var d = dd.getDate();
      return y + '-' + m + '-' + d;
    }
  },
  created() {
    this.creatTime();
  }
};
</script>
<style lang="less" rel="stylesheet/less">
@import "../../common/less/mixin.less";
.reserve{
	width: 100%;
	height: 100%;
	background: #fff;
  padding: 54px 16px;
  font-size: 16px;
  line-height: 16px;
    .slide-enter-leave;
    .time{
      margin-bottom: 10px;
      .time-label{
        font-size: 18px;
        margin-right: 3px;
        font-weight: 550;
        color:#797c7f;
      }
      .time-slect{
        width: 350px;
        height: 32px;
        display: inline-block; 
        margin-top: 15px;
        box-sizing: border-box;
        text-align:center;
         font-size: 16px;
         line-height: 16px;
        appearance:none;
        -moz-appearance:none;
         -webkit-appearance:none;
        border:1px solid #c8cccf;
      }
    }
    .type{
      .title{
         margin-bottom:3px;
         font-size: 18px;
        font-weight: 550;
        color:#797c7f;
      }
    }
    .submit{
      width: 90px;
      height: 45px;
      background: #ef4117;
      .box-radius(2px);
      color: #fff;
      margin: 8px auto 0 auto;
    }
}
</style>
