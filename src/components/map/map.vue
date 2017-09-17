<template>
<div id="allmap" class="map"></div>
</template>
<script>
import BMap from 'BMap';
export default{
  name: 'Mapcomponent',
  props: {
// 经度
    longitude: {
    type: Number,
    default: 116.404
    },
// 纬度
    latitude: {
    type: Number,
    default: 39.915
    },
    description: {
    type: String,
    default: '天安门'
    }
  },
  mounted() {
  	this.ready();
  },
  methods: {
    ready: function() {
      let map = new BMap.Map('allmap');
      let point = new BMap.Point(104.075796, 30.659684);
      map.centerAndZoom(new BMap.Point(104.047404, 30.696035), 14);
      map.addControl(new BMap.MapTypeControl());
      map.setCurrentCity('小龙坎火锅');
      map.enableScrollWheelZoom(true);
      map.enableDoubleClickZoom(true);
      let marker = new BMap.Marker(point);
      map.addOverlay(marker);
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less">
  .map{
  	width: 100%;
  	height:100%;
  }
</style>
