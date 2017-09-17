<template>
 <transition name="fade">
  <div class="wrapper-order">
  	<v-slider title="订单"></v-slider>
    <div>
    <ul class="tab">
      <li v-for="(item,index) in tabItems" class="order-tab-item" :class="{'current':nowIndex===index}" @click="toggleTab(index,$event)">
      <span>{{item}}</span>
      </li>
    </ul>
    </div>
    <v-split class="order-split"></v-split>
    <div class="wrapper-content" ref="contentWrapper">
     <transition name="change-position">
         <div class="clearfix inner-content" id="innerContent" @touchstart="touchStartHandler($event)" @touchend="touchEndHandler($event)" :style="{ left: positionX + 'px'}">
         <!-- 全部订单 -->
          <div class="wrapper-list" ref="listsWrapper">
             <ul class="order-ul">
                 <li v-for="order in allOrders" class="order-list" >
                   <ul>
                      <span  class="order-status" :class="clacuteStatus(order.status,order.orderDate)">{{calculateLabel(order.status,order.orderDate)}}</span>
                      <span class="order-date">{{transform(order.orderDate)}}</span>
                      <span class="order-id">订单号：{{order.orderId}}</span>
                      <li v-for="list in order.itemList" class="food-list" >
                          <span class="name">{{list.food.name}}</span>
                          <span class="count">x{{list.quantity}}</span>
                      </li>
                  </ul>
                  <span class="totalPrice">总价￥{{order.totalPrice}}</span>
                  <form action="http://bao2v.com/diancan1/payByOrderId?orderId={order.orderId}" method="get">
                   </form>
                    <input type="button" v-if="showButton(order.status,order.orderDate)" class="pay-button" value="付款" @click="ajaxHandler(order.orderId)"></input>
                </li>
            </ul>
          </div>
          <!-- 已支付 -->
          <div class="wrapper-haspay" ref="haspayWrapper">
            <ul class="order-ul">
                 <li v-for="order in haspayOrder" class="order-list" >
                   <ul>
                      <span  class="order-status" :class="clacuteStatus(order.status,order.orderDate)">{{calculateLabel(order.status,order.orderDate)}}</span>
                       <span class="order-date">{{transform(order.orderDate)}}</span>
                      <span class="order-id">订单号：{{order.orderId}}</span>
                      <li v-for="list in order.itemList" class="food-list" >
                          <span class="name">{{list.food.name}}</span>
                          <span class="count">x{{list.quantity}}</span>
                      </li>
                  </ul>
                  <span class="totalPrice">总价￥{{order.totalPrice}}</span>
                  <input type="button" v-if="showButton(order.status,order.orderDate)" class="pay-button" value="付款"></input>
                </li>
            </ul>
          </div>
          <!-- 未支付 -->
          <div class="wrapper-unpay" ref="unpayWrapper">
            <ul class="order-ul">
                 <li v-for="order in unpayOrders" class="order-list" >
                   <ul>
                      <span  class="order-status" :class="clacuteStatus(order.status,order.orderDate)">{{calculateLabel(order.status,order.orderDate)}}</span>
                       <span class="order-date">{{transform(order.orderDate)}}</span>
                      <span class="order-id">订单号：{{order.orderId}}</span>
                      <li v-for="list in order.itemList" class="food-list" >
                          <span class="name">{{list.food.name}}</span>
                          <span class="count">x{{list.quantity}}</span>
                      </li>
                  </ul>
                  <span class="totalPrice">总价￥{{order.totalPrice}}</span>
                  <input type="button" v-if="showButton(order.status,order.orderDate)" class="pay-button" value="付款"  @click="ajaxHandler(order.orderId)"></input>
                </li>
            </ul>
          </div>
          <!-- 已失效 -->
          <div class="wrapper-lose" ref="loseWrapper">
            <ul class="order-ul">
                 <li v-for="order in loseOrders" class="order-list" >
                   <ul>
                      <span  class="order-status" :class="clacuteStatus(order.status,order.orderDate)">{{calculateLabel(order.status,order.orderDate)}}</span>
                       <span class="order-date">{{transform(order.orderDate)}}</span>
                      <span class="order-id">订单号：{{order.orderId}}</span>
                      <li v-for="list in order.itemList" class="food-list" >
                          <span class="name">{{list.food.name}}</span>
                          <span class="count">x{{list.quantity}}</span>
                      </li>
                  </ul>
                  <span class="totalPrice">总价￥{{order.totalPrice}}</span>
                  <input type="button" v-if="showButton(order.status,order.orderDate)" class="pay-button" value="付款"></input>
                </li>
            </ul>
          </div>
      </div>
     </transition>
   </div>
  </div>
</transition>
</template>
<script type="text/ecmascript-6">
import Slider from '@/components/slider/slider';
import Split from '@/components/split/split';
import BScroll from 'better-scroll';
// const ERR_OK = 0;
const clientW = document.body.clientWidth;
export default{
  name: 'order',
  data() {
    return {
      nowIndex: 0,
      touchStartX: 0,
      touchendX: 0,
      positionX: 0,
      allOrders: [],
      haspayOrder: [],
      loseOrders: [],
      unpayOrders: [],
      tabItems: ['全部', '已支付', '未支付', '已失效']
    };
  },
  components: {
  	'v-slider': Slider,
    'v-split': Split
  },
  created() {
    this.$http.get('http://diancan.bao2v.com/getAllOrderDetail').then((response) => {
        console.log(response);
        response = response.body;
        this.allOrders = response.orderList;
        this.$nextTick(() => {
          this.handlerData(this.allOrders);
          this.$nextTick(() => {
            this.initOrderScroll();
        });
        });
    });
  },
  computed: {
  },
  methods: {
    ajaxHandler(id) {
       this.$http.get('http://diancan.bao2v.com/payByOrderId?orderId=' + id).then().catch();
       window.location.reload();
    },
    handlerData(allData) {
      allData.forEach((item, index) => {
        // console.log(item.status);
        if (item.status === 1) {
          this.haspayOrder.push(item);
        } else {
          let NowTime = new Date();
          let offTimew = NowTime.getTime() - item.orderDate;
         if (offTimew > 1800000) {
            this.loseOrders.push(item);
          } else {
            this.unpayOrders.push(item);
          }
        }
      });
    },
    touchStartHandler(e) {
       let startEvent = e || window.e;
       let target = startEvent.touches[0];
       this.touchStartX = target.clientX;
    },
    touchEndHandler(e) {
       let endEvent = e || window.e;
       let target = endEvent.changedTouches[0];
       this.touchEndX = target.clientX;
      let offX = this.touchEndX - this.touchStartX; // 从左向右大于0，从右向左小于0
        this.touchEndX = 0;
        this.touchStartX = 0;
        if (Math.abs(offX) > 80) {
          if (offX > 0) {
            if (this.nowIndex > 0) { // 手指从左向右，index--
               this.nowIndex --;
               this.positionX = -this.nowIndex * clientW;
            } else {
              this.nowIndex = 0;
            }
          } else { // 手指从右向左，index++
            if (this.nowIndex < 3) {
               this.nowIndex ++;
               this.positionX = -this.nowIndex * clientW;
             } else {
              this.nowIndex = 3;
            }
          }
          }
    },
    transform(time) {
      time = new Date(time);
      let year = time.getFullYear(); // 年
      let m = time.getMonth() + 1; // 月
      let d = time.getDate(); // 日
      let h = time.getHours(); // 时
      let min = time.getMinutes();
      let s = time.getSeconds();
      if (parseInt(h) < 10) {
        h = '0' + h;
      }
      return year + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s;
    },
    initOrderScroll() {
        this.menuScroll = new BScroll(this.$refs.listsWrapper, {scrollX: false});
        this.payScroll = new BScroll(this.$refs.haspayWrapper, {scrollX: false});
        this.unpayScroll = new BScroll(this.$refs.unpayWrapper, {scrollX: false});
        this.loseScroll = new BScroll(this.$refs.loseWrapper, {scrollX: false});
      },
    toggleTab(index, event) {
      // if (index > this.nowIndex) {
      //   this.slider(-this.nowIndex * clientW, 'right');
      //   this.nowIndex = index;
      // }
      // if (index < this.nowIndex) {
      //   this.slider(-this.nowIndex * clientW, 'left');
      //   this.nowIndex = index;
      // }
      this.nowIndex = index;
      this.positionX = -this.nowIndex * clientW;
    },
    slider(end, direct) {
      var step = clientW / 1000;
       if (direct === 'left') {
          var Timer = setInterval(() => {
          this.positionX += step;
        }, 1);
       } else {
          Timer = setInterval(() => {
          this.positionX -= step;
        }, 1);
       }
       if (this.positionX === end) {
        clearInterval(Timer);
       }
    },
    clacuteStatus(statu, time) {
      if (statu === 1) {
        return 'pay';
      } else {
        var NowTime = new Date();
        var offTimew = NowTime.getTime() - time;
        if (offTimew > 1800000) {
          return 'lose';
        } else {
          return 'unpay';
        }
      }
    },
    calculateLabel(statu, time) {
     let label = this.clacuteStatus(statu, time);
     switch (label) {
      case 'pay' :
        return '已支付';
      case 'lose' :
        return '已失效';
      case 'unpay' :
        return '未付款';
     }
    },
    showButton(statu, time) {
      if (this.clacuteStatus(statu, time) === 'unpay') {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less">
@import "../../common/less/mixin.less";
.wrapper-order{
	width: 100%;
	height: 100%;
	background: #ebe9e9;
  padding-top: 42px;
  color: #8f8c8c;
  .slide-enter-leave;
  .order-title{
    width:100%;
    height:30px;
    padding-left: 5px;
    line-height: 30px;
    background: #fff;
    color: #000;
    .border-1px(#c3bebe);
  }

  .tab{
    .parent-flex();
    width: 100%;
    height: 35px;
    z-index: 50;
    line-height: 35px;
    text-align: center;
    background-color: #fff;
    .order-tab-item{
      .child-flex(1);
      cursor: pointer;
     &:active{
      background-color: #fff;
     }
     &.current{
       color:#f31414;
       border-bottom: 2px solid #f31414;
     }
    }
  }
  .order-split{
    z-index: 50;
  }
  .wrapper-content{
    width: 100%;
    height: 100%;
    overflow: hidden;
    .change-position-enter-active, .change-position-leave-active{
      animation: order-in 1s ;
    }
     @keyframes order-in {
             0% {
                transform: scale(0);
                 }
             50% {
                transform: scale(1.25);
                 }
             100% {
                transform: scale(0.8);
                }
     }
    .inner-content{
      position: absolute;
      left: 0;
      width: 400%;
      height: 100%;
    .wrapper-list{
    position:relative;
    float: left;
    width: 25%;
    height:100%;
    overflow: hidden;
    background-color: #fff;
    .pay();
  }
  .wrapper-haspay{
    position:relative;
    float: left;
    width: 25%;
    height: 100%;;
    overflow: hidden;
    background-color: #fff;
    .pay();
  }
  .wrapper-unpay{
    float:left;
    position:relative;
    width: 25%;
    height:100%;
    overflow: hidden;
    background-color: #fff;
    .pay();
  }
  .wrapper-lose{
    position:relative;
    float: left;
    width: 25%;
    height:100%;
    overflow: hidden;
    background-color: #fff;
    .pay();
  }
    }
   
  }

}
</style>
