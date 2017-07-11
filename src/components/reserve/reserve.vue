<template>
 <transition name="fade">
  <div class="reserve">
  	<v-slider title="预定"></v-slider>
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
  created() {
    this.creatTime();
    this.prevent();
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
    },
    prevent(event) {
    var startPos = 0;
    var endPos = 0;
    var isScrolling = 0;
    document.addEventListener('touchstart', function(event) {
        var touch = event.targetTouches[0]; // touches数组对象获得屏幕上所有的touch，取第一个touch
            startPos = {x: touch.pageX, y: touch.pageY, time: +new Date()}; // 取第一个touch的坐标值
            isScrolling = 0; // 这个参数判断是垂直滚动还是水平滚动
    }, false);
    // 解绑事件 web前端开发
    document.addEventListener('touchend', function(event) {
    document.removeEventListener('touchmove', this, false);
    document.removeEventListener('touchend', this, false);
    }, false);
    document.addEventListener('touchmove', function(event) {
        // 当屏幕有多个touch或者页面被缩放过，就不执行move操作
        if (event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
        var touch = event.targetTouches[0];
        endPos = {x: touch.pageX - startPos.x, y: touch.pageY - startPos.y};
        isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1 : 0; // isScrolling为1时，表示纵向滑动，0为横向滑动
        if (isScrolling === 1) {
            // alert(0);
            event.preventDefault(); // 阻止触摸事件的默认行为，即阻止滚屏
        }
    }, false);
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
