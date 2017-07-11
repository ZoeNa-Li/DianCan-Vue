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
    <div class="wrapper-list" ref="listsWrapper">
      <ul>
        <li v-for="order in allOrders" class="order-list" >
          <ul>
             <span v-bind:style="{'color':order.status ? '#2df2af':'#ffc107'}" class="order-status">{{order.status?'已付款':'未付款'}}</span>
            <li v-for="list in order.itemList" class="food-list" >
              <span class="name">{{list.food.name}}</span>
              <span class="count">x{{list.quantity}}</span>
            </li>
          </ul>
          <span class="totalPrice">总价￥{{order.totalPrice}}</span>
          <input type="button" v-if=!order.status class="pay-button" value="付款"></input>
        </li>
      </ul>
    </div>
  </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import Slider from '@/components/slider/slider';
import Split from '@/components/split/split';
import BScroll from 'better-scroll';
const ERR_OK = 0;
export default{
  name: 'order',
  data() {
    return {
      nowIndex: 0,
      scrollY: 80,
      allOrders: [],
      tabItems: ['全部', '已支付', '未支付']
    };
  },
  components: {
  	'v-slider': Slider,
    'v-split': Split
  },
  created() {
    this.$http.get('/api/orderList').then((response) => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.allOrders = response.data;
         this.$nextTick(() => {
          this.initOrderScroll();
        });
      }
    });
  },
  computed: {
  },
  methods: {
    initOrderScroll() {
        this.menuScroll = new BScroll(this.$refs.listsWrapper, {click: true});
        console.log('已初始化滚动');
      },
    toggleTab(index, event) {
      this.nowIndex = index;
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
     &:active{
      background-color: #ebe9e9;
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
  .wrapper-list{
    position:relative;
    width: 100%;
    height:100%;
    overflow: hidden;
    background-color: #fff;
    .order-list{
    padding:10px;
    .border-1px(#f4f0f0);  
    .order-status{
      font-size: 14px;
      position: absolute;
      right:10px;
      top:10px;
    }
    .food-list{
      margin-bottom: 5px;
      font-size: 16px;
      .name{
        display: block;
        margin-bottom: 2px;
        color: #000;
      }
      .count{
        color: #8f8c8c;
      }
    }
    .totalPrice{
      font-size: 14px;
    }
    .pay-button{
      .noe-webkit-border();
      position: absolute;
      right: 10px;
      bottom: 10px;
      width: 50px;
      height: 25px;
      border: 1px solid #f31414;
      .box-radius(3px);
      background-color: #fff;
      color: #f31414;
      &:active{
        background-color: #f31414;
        color: #fff; 
      }
    }
    }
  }
}
</style>
