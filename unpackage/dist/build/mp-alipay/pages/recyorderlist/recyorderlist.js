(my["webpackJsonp"]=my["webpackJsonp"]||[]).push([["pages/recyorderlist/recyorderlist"],{"054a":function(t,e,a){"use strict";a.r(e);var n=a("843c"),o=a.n(n);for(var r in n)"default"!==r&&function(t){a.d(e,t,function(){return n[t]})}(r);e["default"]=o.a},"4eff":function(t,e,a){},"54ed":function(t,e,a){"use strict";var n=a("4eff"),o=a.n(n);o.a},"843c":function(t,e,a){"use strict";(function(t){function n(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=getApp(),r=a("716d"),i=a("99c0"),c=(a("33b2"),function(){return a.e("components/loading/loading").then(a.bind(null,"5a64"))}),s={data:function(){return{host:"",page:[],list:[],currentTab:0,isLoading:!1,btmp0:"loadMore",btmp3:"loadMore",btmp4:"loadMore",cancelId:""}},components:{loading:c},onLoad:function(t){var e=this;e.host=o.globalData.host,e.scrollHeight=o.globalData.systemInfo.windowHeight+8},onShow:function(){var t=this;i.isNotEmpty(currentTab)&&(t.currentTab=currentTab),i.isNotEmpty(state)?t.getList(1,state,"new"):t.getList(1,0,"new")},onPullDownRefresh:function(){var t=this,e=t.$data.currentTab;t.getOrder(1,e,"new")},methods:{swichNav:function(t){var e=this;e.setData({currentTab:t.currentTarget.dataset.current})},bindChange:function(t){this.selectComponent("#loading").showColour();var e=this,a=t.detail.current;e.setData({currentTab:a}),1==a?a=3:2==a&&(a=4),e.getList(1,a,"new")},loadMore:function(t){var e=this;if(1!=e.data.isLoading){var a=t.currentTarget.dataset.state,o="btmp"+a,i=e.data.page[a];i.currentPage<i.allPageAmount&&(e.setData(n({},o,"loadMore")),e.getList(i.currentPage+1,a,"loadMore"))}else r.showToast("正在获取数据","none",2e3)},tapInfo:function(e){var a=e.currentTarget.dataset.item;1==a.recyType?t.navigateTo({url:"../governmentinfo/governmentinfo?id="+a.recyorderId}):2==a.recyType?t.navigateTo({url:"../electricalinfo/electricalinfo?id="+a.recyorderId}):3==a.recyType?t.navigateTo({url:"../furnitureinfo/furnitureinfo?id="+a.recyorderId}):4==a.recyType&&t.navigateTo({url:"../merchantinfo/merchantinfo?id="+a.recyorderId})},tapCancel:function(t){var e=this;e.setData({cancelId:t.currentTarget.dataset.id}),e.dialog.showDialog()},_confirmEvent:function(){var t=this;t.dialog.hideDialog(),t.loading.showTrans(),wxRequest.postToken("/recyorder/user/cancel.do",{id:t.data.cancelId}).then(function(e){r.showToast(e.data.results,"succes",4e3),t.onShow(t.data.currentTab)}).catch(function(e){console.log(e),r.showToast(e,"none",4e3),t.loading.hide()})},_cancelEvent:function(){this.dialog.hideDialog()},getList:function(e,a,o){var i=this;console.log(a);var c=this,s={pageSize:10,currPage:e,state:a};t.showNavigationBarLoading(),c.setData({isLoading:!0});var u="btmp"+a,d="page["+a+"]",l="list["+a+"]";wxRequest.postToken("/recyorder/user/findPage.do",s).then(function(t){if(0===t.data.status){var e,i=t.data.page.currentPage<=t.data.page.allPageAmount?"noMore":"loadMore",s="new"==o?JSON.parse(t.data.results):c.data.list[a].concat(JSON.parse(t.data.results));c.setData((e={},n(e,d,t.data.page),n(e,l,s),n(e,u,i),e)),console.log(c.data.list)}else r.showToast(t.data.results,"none",5e3)}).catch(function(t){console.log(t),r.showToast(t,"none",5e3)}).finally(function(){var e="btmp"+a;null!=c.data.list[a]&&0!==c.data.list[a].length||c.setData(n({},e,"noData")),i.selectComponent("#loading").hide(),t.hideNavigationBarLoading(),t.stopPullDownRefresh(),c.setData({isLoading:!1})})}}};e.default=s}).call(this,a("c11b")["default"])},af55:function(t,e,a){"use strict";(function(t){a("4e23"),a("921b");n(a("66fd"));var e=n(a("f9bf"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("c11b")["createPage"])},d26d:function(t,e,a){"use strict";var n,o=function(){var t=this,e=t.$createElement;t._self._c},r=[];a.d(e,"b",function(){return o}),a.d(e,"c",function(){return r}),a.d(e,"a",function(){return n})},f9bf:function(t,e,a){"use strict";a.r(e);var n=a("d26d"),o=a("054a");for(var r in o)"default"!==r&&function(t){a.d(e,t,function(){return o[t]})}(r);a("54ed");var i,c=a("f0c5"),s=Object(c["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],i);e["default"]=s.exports}},[["af55","common/runtime","common/vendor"]]]);