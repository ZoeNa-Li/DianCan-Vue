<template>
 <transition name="fade">
  <div class="queue">
  	<v-slider title="排队"></v-slider>
    <div class="content-wrapper" >
      <div v-if = "showOne">
       <p class="title">请选择队列</p>
       <ul class="que-items">
          <li class="que-item" v-for="(item,index) in number">
             <span class="type">{{2*Math.pow(2,index)}}人桌</span>
             <span class="count" v-if="item">{{item}}人正在排队</span>
             <span class="count" v-if="!item">无需排队，请直接进店就餐</span>
           <router-link to="/orderQue" class="link">
             <span class="arrow" v-if="item">></span>
           </router-link>
           </li>
       </ul>
      </div>
      <div v-if = "showTwo">
        <p class="alert">您还需等待<span class="num">{{waitingNum}}</span>桌</p>
      </div>
      <button class="button" @click="reload">刷新状态</button>
    </div>
  </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import Slider from '@/components/slider/slider';
export default{
  name: 'queue',
  data() {
    return {
      number: [2, 4, 8],
      showQue: false,
      showOne: false,
      showTwo: false,
      tableType: 0,
      waitingNum: 0
    };
  },
  created() {
    this.$http.get('http://diancan.bao2v.com/getUserQueueStatus').then((response) => {
      response = response.body;
      // console.log(response);
      this.tableType = response.diningTableType;
      this.number = [response.numInQueue1, response.numInQueue2, response.numInQueue3];
      this.waitingNum = response.waitingNum;
      if (this.waitingNum) {
         this.showOne = false;
         this.showTwo = true;
      } else {
         this.showOne = true;
         this.showTwo = false;
      }
      // console.log(response);
      // this.tableType = response.data;
      // this.lists = this.orderLists.itemList;
      // console.log(this.orderLists.itemList);
    });
  },
  components: {
  	'v-slider': Slider
  },
  methods: {
    handler(resp) {
     // console.log(resp);
    },
    reload() {
      window.location.reload();
    }
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
        line-height: 14px;
        font-size: 14px;
        color:#797c7f;
        margin-bottom: 10px;
      }
      .que-items{
        background-color: #fff;
        margin-bottom: 25px;
        .que-item{
          position: relative;
          height: 35px;
          padding: 10px 5px;
          .border-1px(#f4f0f0);
           .count{
              margin-left: 5px;
              color: #f44f14;
              font-size:12px;
              line-height: 12px;
              &:active{
                color:#f31414;
              }
            }
          .link{
            // width: 100%;
            // height:100%;
            // display: block;
          .arrow{
            position: absolute;
            top: 5px;
            right: 10px;
            width: 25px;
            height: 25px;
            float: right;
            font-size: 20px;
            line-height: 20px;
            text-align: center;
            color: #797c7f;
            &:active{
            color: #67696a;
            background: #e6e6e6;
            .box-radius(12px);
             }
          }
          }
          
          .type{
          }

          &:active{
             // background-color: #e6e6e6;
          }
        }
      }
      .alert{
        .num{
           color: #efa044;
        }
      }
      .button{
        position: absolute;
        left:50%;
        outline: 0;
        border: 0;
        width: 80%;
        height: 38px;
        transform:translateX(-50%);
        background: #fff;
        line-height: 18px;
        font-size: 18px;
        &:active{
           border: solid 2px #efa044;
        }
        .box-radius(6px);
        margin: 10 auto;
        border: solid 1px #efa044;
      }
    }
}
</style>
