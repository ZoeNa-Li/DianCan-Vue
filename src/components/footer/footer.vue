<template>
<div class="footer">
<ul class="detail-wrapper">
	<li class="detail-item" v-for="(item,index) in seller.detail" @click="showDetail(index)">
    <span class="text">	
     <i :class="classMap[index]" class="icon"></i>
	 <span class="title">{{item}}</span></span>
	</li>
</ul>
<transition name="seller-fade">
	<div class="seller-detail" v-show="showSeller">
      <div class="seller-detail-wrapper clearfix" > 
         <div class="detail-main">
           <h1 class="name">{{seller.name}}</h1>
           <div class="title">
             <div class="line"></div>
             <div class="text">商家信息</div>
             <div class="line"></div>
           </div>
           <div class="description">
            <p class="content">{{seller.description}}</p>
           </div>
         </div>
	     <div class="close-detail" @click="changeSellShowDetail()">
           <i class="icon-cross"></i>
        </div>
      </div>	
    </div>
</transition>

<transition name="map-fade">
  <div class="map-detail" v-show="showMap">
    <div class="map-detail-wrapper clearfix" > 
       <div class="detail-main" id="map">
          <v-map></v-map>
       </div>
	   <div class="close-detail" @click="changeMapShowDetail()">
         <i class="icon-cross"></i>
       </div>
     </div>	
  </div>
</transition>

</div>
</template>
  <script  type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=KCzp8claYra8uYAvahElV9oKUT6j7Gx1"></script>
<script type="text/ecmascript-6">
import Mapcomponent from '@/components/map/map';
export default{
  name: 'Footer',
  components: {
    'v-map': Mapcomponent
  },
  data() {
  	return {
  		showList: [true, false, false, false, false],
  		showSeller: false,
  		showMap: false
  	};
  },
  props: {
  	seller: {
  		type: Object
  	}
  },
  created() {
  	this.classMap = ['icon-home', 'icon-location', 'icon-phone', 'icon-clock2', 'icon-bubbles'];
  },
  methods: {
  	showDetail(index) {
  		if (index === 0) {
  		  this.showSeller = !this.showSeller;
  		} else if (index === 1) {
          this.showMap = !this.showMap;
  		}
  	this.showList[index] = !this.showList[index];
  		console.log(this.showList);
  	},
  	changeSellShowDetail() {
  		this.showSeller = !this.showSeller;
  	},
  	changeMapShowDetail() {
  		this.showMap = !this.showMap;
  	}
  }
};
</script>
<style lang="less" rel="stylesheet/less">
@import "../../common/less/mixin.less";
.footer{
	.child-flex(2);
	position: relative;
	box-sizing: border-box;
	width: 100%;
	height: 100%;
    overflow: hidden;
	background: #fff;
	padding: 2px 0 2px 8px;
	.detail-wrapper{
	position: absolute;
	.parent-flex;
    .flex-dire(column);
    height: 100%;
    width: 100%;
    .detail-item{
	  .child-flex(1);
	  display: table;
	  width: 100%;
	  height: 20%;
	  font-size: 0;
	  .border-1px(rgba(7,17,27,0.2));
	  &:last-child{
	  	.border-none;
	  }
	  .text{
	  display: table-cell;
	  vertical-align: middle;
	  .icon{
	  	font-size:16px;
        line-height: 16px;
	  }
	  .title{
	  	font-size: 16px;
	  	line-height: 16px;
	  	margin-left: 4px;
	     }
	  }
	  .detail-coment{
	  	
	  }
	}
	}
	.seller-detail{
		position: fixed;
	  	top: 0;
	  	left: 0;
	  	z-index: 100;
	  	width: 100%;
	  	height: 100%;
	  	overflow: auto;
	  	background: rgba(7,17,27,0.7);
	  	&.seller-fade-enter-active {
         transition: all .3s;
         opacity: 1;
         }
         &.seller-fade-leave-active {
         transition: all .8s;
         opacity: 1;
        }
       &.seller-fade-enter, &.seller-fade-leave-active {
          opacity: 0;
        }
		.seller-detail-wrapper{
	  	.detail-main{
           padding: 64px 0;
           color: #fff;
           .name{
          line-height: 16px;
          text-align: center;
          font-size: 16px;
          font-weight: 700;
        }
        .title{
          .parent-flex();
          width: 80%;
          margin: 28px auto 24px auto;
          .line{
          .child-flex(1);
          position: relative;
          top: -6px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          }
          .text{
            padding: 0 12px;
            font-weight: 700;
            font-size: 14px;
          }
        }
        .description{
        	width: 80%;
        	margin: 0 auto;
        }

        }
	  	  .close-detail{
          background-color: red;
          position: relative;
          width: 32px;
          height: 32px;
          font-size: 32px;
          margin: -60px auto 0 auto;
          clear: both;
          color: #fff;
      }
	}
	}
	.map-detail{
		position: fixed;
	  	top: 0;
	  	left: 0;
	  	z-index: 100;
	  	width: 100%;
	  	height: 100%;
	  	overflow: auto;
	  	background: rgba(7,17,27,0.7);
	  	&.map-fade-enter-active {
         transition: all .3s;
         opacity: 1;
         }
         &.map-fade-leave-active {
         transition: all .8s;
         opacity: 1;
        }
       &.map-fade-enter, &.map-fade-leave-active {
          opacity: 0;
        }
		.map-detail-wrapper{
	  	.detail-main{
        padding: 5px 5px;
        width: 80%;
        height: 400px;
        background-color: #fff;
        margin:20px auto;
        }
	  	  .close-detail{
          background-color: red;
          position: relative;
          width: 32px;
          height: 32px;
          font-size: 32px;
          margin: 0px auto 0 auto;
          clear: both;
          color: #fff;
      }
	}
	}

}
</style>
