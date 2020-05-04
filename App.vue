<script>
	export default {
		globalData: {
		    systemInfo: null,   //	客户端设备信息
		    code: '',           //	用户凭证
		    encryptedData: '',  //	
		    iv: '',             // 
		    userInfo: null,
		    addId: '',          //	用户地址列表选择地址ID
		    host: 'https://www.68518091.com/lvbao',
		    host1: 'https://www.68518091.com/lvbao', 	//上线
		    host2: 'http://192.168.224.7:8080/lvbao',	//本地
		    host2: 'http://192.168.224.16:8080/lvbao',//后端
		},
		onLaunch: function() {
			console.log('App Launch')
			let that = this;
			//	获取用户客户端信息
			uni.getSystemInfo({
			  success: function (res) {
			    that.globalData.systemInfo = res;
			    console.log(res);
			  }
			});
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "css/iconfont/iconfont.css";
	@import "css/font.css";
	@import "css/base.css";
	/* @import "wxParse/wxParse.css"; */
	
	page {
	  font-family: 'siyuan normal';
	  font-size: 13px;
	  color: #666;
	  padding: 0px;
	  margin: 0px;
	  box-sizing: content-box;
	  background: #eee;
	  
	}
	button {
	  padding: 0px;
	}
	/* icon{width: 22px; height: 22px;} */
	.container {
	  height: 100%;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: space-between;
	  padding: 200rpx 0;
	  box-sizing: border-box;
	}
	
	/*
	.menu { 
	  width: 100%; 
	  font-size: 12px; 
	  margin:10px 0px;
	  box-shadow: 0px 1px 3px rgba(0,0,0,.1); 
	  -moz-box-shadow: 0 1px 3px rgba(0,0,0,.1);
	}
	.menu .title { width: 100%; padding: 8px 0px 8px 6px; border-bottom: 1px solid #ccc; }
	.menu .contact { width: 100%; display: flex; flex-wrap:wrap; flex-direction: row; }
	.menu .contact > view { width: 25%; text-align: center; margin:5px 0px; }
	.menu .contact > view > view > navigator > icon { padding:6px; }
	*/
	.jccenter { justify-content: center; }
	.jcbetween { justify-content: space-between; }
	.jcaround { justify-content: space-around; }
	.jcleft { justify-content: left; }
	
	.jicenter { justify-items: center; }
	
	.jscenter { justify-self: center; }
	
	.aicenter { align-items: center; }
	.aiend { align-items: flex-end; }
	
	
	/* view横向对齐 */
	.viewRow { display: flex; flex-direction: row; flex-wrap: wrap; box-sizing: border-box; }
	/* view竖向对齐 */
	.viewCol { display: flex; flex-direction: column; flex-wrap: wrap; box-sizing: border-box; }
</style>
