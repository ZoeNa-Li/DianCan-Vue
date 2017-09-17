<template>
 <transition name="fade">
  <div class="reserve">
  	<v-slider title="预定"></v-slider>
    <form class="content">
      <div class="time">
        <label for="time" class="time-label">请选择你的时间</label><br>
        <select v-model="reTime" id="time" type="text"  class="time-slect">
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
      <input type="button" value="预定" class="submit" @click="save">  
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
  created() {
    this.creatTime();
    this.prevent();
  },
  methods: {
    out() {
      // console.log(this.numType);
    },
    creatTime() {
      this.dayOne = this.getDateStr(1);
      this.dayTwo = this.getDateStr(2);
      this.dayThree = this.getDateStr(3);
    },
    getDateStr (dayCount) {
      let dd = new Date();
      dd.setDate(dd.getDate() + dayCount);// 设置日期
      let y = dd.getFullYear();
      let m = dd.getMonth() + 1;// 获取当前月份的日期
      let d = dd.getDate();
      return y + '-' + m + '-' + d;
    },
    save() {
      if (this.reTime.length === 0) {
        alert('请选择时间');
      } else if (this.numType.length === 0) {
        alert('请选择桌型');
      } else {
        alert('预定成功');
        window.location.href = 'http://diancan.bao2v.com/index.html';
      }
    }
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
         appearance:none;
        -moz-appearance:none;
        -webkit-appearance:none;
         width: 270px;
         height: 32px;
         display: inline-block; 
         margin-top: 15px;
         box-sizing: border-box;
         text-align:center;
         font-size: 16px;
         line-height: 16px;
         border:1px solid #4e4c4c;
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
      .noe-webkit-border();
      width: 80px;
      height: 40px;
      outline:none;  
      border:0px;  
      background: #fff;
      .box-radius(5px);
      border: solid 1px #efa044;
      margin: 8px auto 0 auto;
      &:active{
         border: solid 2px #efa044;
      }
    }
}
</style>
