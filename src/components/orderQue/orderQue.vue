<template>
    <transition name="fade">
    	<div class="order-que">
		    <v-slider title="排队" url="queue"></v-slider>
            <div class="content-wrapper">
               <div class="wrapper-num">
               	  <span class="label" >选择桌型</span>
               	  <!-- <input type="number" id="inputNum" class="num-input" placeholder="请输入客人数量" min=2 step=2 max=8/> -->
               	   <select class="type-input" id="inputNum" required>
                         <option :value="index" v-for="(item,index) in totalNum" v-if="item" class="select-item">{{2*Math.pow(2,index)}}人桌</option>
                    </select>
               </div>
               <div class="wrapper-tel">
               	    <span class="label">手机号码</span>
                 	<input type="tel" name="telephone" id="inputTel" class="num-input" placeholder="请输入电话号码"/>
               </div>
               <button class="button" @click="save" :class="{'show':show}">保存</button>
            </div>
	    </div>
    </transition>
</template>
<script type="text/ecmascript-6">
import Slider from '@/components/slider/slider';
export default{
  name: 'OrderQue',
  data() {
    return {
    	show: false,
    	totalNum: [],
    	waitingNum: 0
    };
  },
  created() {
    this.$http.get('http://diancan.bao2v.com/getUserQueueStatus').then((response) => {
        response = response.body;
        this.waitingNum = response.waitingNum;
        this.totalNum = [response.numInQueue1, response.numInQueue2, response.numInQueue3];
        if (this.waitingNum) {
        	 this.show = true;
        	} else {
        	this.show = false;
        }
    });
  },
  components: {
  	'v-slider': Slider
  },
  methods: {
  	save() {
  		if (this.show) {
          alert('您已在排队中,点击查看排队状态！');
          window.location.href = 'http://diancan.bao2v.com/index.html#/queue';
  		} else {
       let inputNum = document.getElementById('inputNum');
       let inputTel = document.getElementById('inputTel');
       // console.log(inputNum.value);
      if (inputTel.value.length === 0) {
        alert('请输入手机号码');
       } else {
       	let str = inputTel.value;
       	let reg = '^1[3|4|5|8][0-9]\\d{8}$';
        let partten = new RegExp(reg);
       	if (partten.test(str)) {
       		let que = parseInt(inputNum.value) + 1;
       		this.$http.get('http://diancan.bao2v.com/queue' + que + '?phoneNumber=' + inputTel.value).then(() => {
                  alert('已保存');
                  window.location.href = 'http://diancan.bao2v.com/index.html#/queue';
       		});
       	} else {
       		alert('请输入正确的手机号码');
       	}
       }
  		}
       	}
  	}
};
</script>
<style lang="less" rel="stylesheet/less">
@import "../../common/less/mixin.less";
.order-que{
	width: 100%;
	height: 100%;
    padding: 54px 0 0 6px;
	background: #f4f0f0;
	.slide-enter-leave;
	.content-wrapper{
		width: 100%;
		background: #fff;
		padding: 0 15px;
		.wrapper-num{
			height: 45px;
			padding: 5px;
			.border-1px(#f4f0f0);
			.label{
				font-size: 16px;
				line-height: 35px;
				margin-right: 15px;
			}
			.type-input{
			.noe-webkit-border();
              color: #000;
              background-color: #fff;
              border: 0;
              width: 120px;
             height: 30px;
             color: #000;
             display: inline-block; 
             margin-top: 15px;
             box-sizing: border-box;
             font-size: 16px;
             line-height: 16px;
			}
		}
		.wrapper-tel{
			height: 45px;
			padding: 5px;
			margin-bottom: 25px;
			.border-1px(#f4f0f0);
			.label{
				font-size: 16px;
				line-height: 35px;
				margin-right: 15px;
			}
			.num-input{
			 -webkit-appearance: none;
              .select-item{
              	 -webkit-appearance: none;
              	 display: block;
              	 width: 65%;
              	 height: 30px;
              }
			}
		}
		.button{
		width: 80%;
        height: 38px;
        position: absolute;
        left:50%;
        outline: 0;
        border: 0;
        transform:translateX(-50%);
        background: #fff;
        line-height: 18px;
        font-size: 18px;
        &:active{
           border: solid 2px #efa044;
        }
        .box-radius(6px);
        margin: 0 auto;
        border: solid 1px #efa044;
      }
      &.show{
      	background-color: #ccc;
      }

	}
}
</style>
