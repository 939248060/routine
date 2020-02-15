<template>
	<view v-show="loadingShow" catchtouchmove="move" >
	  <view class="mask" :class="{transMask: loadingShow==false, colourMask:loadingShow==true}"></view>
	  <view class="back">
	    <view class='animationSlow'></view>
	    <view class='logo'><image src="../../static/images/logo.png" mode="widthFix"></image></view>
	  </view>
	</view>
</template>

<script>
	export default {
		name:"loading",
		// props: {
		// 	loadModel: false
		// },
		data() {
			return {
				isShow: false,
			};
		},
		computed: {
			//计算属性判断vuex中的显示状态
			loadingShow() {
				return this.$store.state.loading;
			}
		},
		methods: {
			// move:function(){
			
			// },
			// showTrans: function() {
			// 	this.$data.isShow = false;
			// },
			// showColour: function () {
			//   this.$data.isShow = true;
			// },
			// hide: function () {
			//   this.$data.isShow  = false;
			// }
		}
	}
</script>

<style>
.colourMask{ background-color: #000; opacity: 0.3; }

.transMask { opacity: 0; }

.animationSlow {
  position: absolute;
  top: 6px;
  left: 6px;
  border: 44px solid rebeccapurple;
  animation-name: myfirst; /*动画的名称 */
  animation-duration: 1000ms; /*动画从开始到结束的时间*/
  animation-timing-function: ease; /*动画执行快慢的参数*/
  animation-iteration-count: infinite; /*动画执行多少次的参数*//*以下是兼容ios所需，参数意义与上相同*/
  -webkit-animation-name: myfirst;
  -webkit-animation-duration: 1000ms;
  -webkit-animation-timing-function: ease;
  -webkit-animation-iteration-count: infinite;
  width: 0;
  height: 0;
  border-radius: 44px;
  border-color: rgb(21, 177, 250) rgba(173, 171, 171, 0.3) rgba(173, 171, 171, 0.3) rgba(173, 171, 171, 0.3);
  z-index: 1001;
}

@keyframes myfirst {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/*兼容ios*/
@-webkit-keyframes myfirst {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.logo {
  position: absolute;
  display: flex; 
  flex-direction: column; 
  flex-wrap: wrap; 
  justify-content: center;
  align-items: center;
  top: 8px;
  left: 8px;
  width: 64px;
  height: 64px;
  padding: 10px;
  border-radius: 50%;
  background-color: white;
  z-index: 1002;
}

.logo > image { width: 90%; }

.back {
  position: fixed;
  width: 100px;
  height: 100px;
  top: 45%;
  left: 50%;
  border-radius: 30%;
  background-color: white;
  box-shadow: 0px 0px 10px #ccc;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  z-index: 1000;
  overflow: hidden;
}

</style>
