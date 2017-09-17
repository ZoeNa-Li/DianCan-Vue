<template>
 <transition name="fade">
 <div class="wrapper-pay">
      <v-slider :url="back" title="支付账单"></v-slider>
       <div class="wrapperList">
            <ul class="pay-list-content clearfix" ref="listContent">
              <li  v-for="(list,index) in lists" class="list">
                <span class="name">{{list.food.name}}</span>
                <span class="count">x{{list.quantity}}</span>
                <span class="price">￥{{list.food.price}}</span>
              </li>
            </ul>
            <div class="wrapperCount">
              <span class="count">小计</span>
              <span class="num">￥{{orderLists.totalPrice}}</span>
           </div> 
    </div>
    <form action="http://diancan.bao2v.com/payLatestOrder" method="get">
          <input type="submit" class="payOrder" value="支付账单">
    </form>
    <div class="pay-mask" v-show="showMask">
        <div class="pay-mask-content"></div>
        <div class="pay-mask-close" @click="changeShowMask()">X</div>
    </div>
 </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import Slider from '@/components/slider/slider';
export default{
  name: 'pay',
  components: {
    'v-slider': Slider
  },
  data() {
    return {
      lists: [],
      orderLists: {},
      back: '/menu',
      showMask: false
    };
  },
   props: {
      selectFoods: {
        type: Array
      }
  },
  created() {
    this.$http.get('http://diancan.bao2v.com/getLatestOrder').then((response) => {
     // console.log(response);
      // response = response.bodyText;
      // console.log(response.bodyText);
      // this.orderLists = JSON.parse(response.bodyText);
      this.orderLists = response.body;
      this.lists = this.orderLists.itemList;
    });
  },
  methods: {
    ShowMask() {
      this.showMask = true;
    },
    changeShowMask() {
      this.showMask = !this.showMask;
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less">
@import "../../common/less/mixin.less";
@import "../../common/less/base.less";
.wrapper-pay{
  width: 100%;
  height: 100%;
  background: #ebe9e9;
   .wrapperList{
    width: 100%;
    margin-top: 60px;
    padding-top: 20px;
    padding-bottom: 30px;
    background-color: #fff;

    color: #494747;
    .pay-list-content{
       padding:10px 5px 4px 30px;
        border-bottom: 1px solid #ebe9e9;
       // background-image:url('../../../static/img/bgPay.jpg');
      // background-repeat: repeat;
        .list{
          .parent-flex();
          position: relative;
          padding: 2px 20px 2px 0px;
          box-sizing: border-box;
           .name{
            .child-flex(4);
            line-height: 24px;
            font-size: 14px;
          }
         .count{
            .child-flex(1);
            color: #949595;
            line-height: 24px;
            font-size: 14px;
            text-align:right;
         }
         .price{
            .child-flex(1);
            line-height: 24px;
            font-size: 14px;
            text-align:right;
          }
        }
     }
    .wrapperCount{
    position: absolute;
    right: 25px;
    margin-top:5px;
    color:red;
  }
  }

  .payOrder{
    .noe-webkit-border();
    position: relative;
    left:70%;
    right: 0;
    width: 120px;
    height: 35px;
    // right:  0px;
    // bottom: 20px;
    margtin: -35px auto;  
    clear: both;
    font-size: 16px;
    line-height:35px;
    text-align: center;
    background-color:#f31414;
    color: #fff;
    .box-radius(2px);

    &:active{
      background-color: #a61111;
    }
  }
  .pay-mask{
    position: absolute;
    top:0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    padding-top: 100px;
    .pay-mask-content{
      width:300px;
      height: 200px;
      background-color: #fff;
      margin: 0 auto; 
    }
    .pay-mask-close{
      width: 30px;
      height: 30px;
      margin: 5px auto;
      font-size: 22px;
      color: #fff;
      text-align: center;
      line-height: 30px;
      background-color: #f31414;
      &:active{
        background-color: #a61111;
      }
    }
  }

}
</style>

