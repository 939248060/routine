if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


  var AFAppX = self.AFAppX.getAppContext
    ? self.AFAppX.getAppContext().AFAppX
    : self.AFAppX;
  self.getCurrentPages = AFAppX.getCurrentPages;
  self.getApp = AFAppX.getApp;
  self.Page = AFAppX.Page;
  self.App = AFAppX.App;
  self.my = AFAppX.bridge || AFAppX.abridge;
  self.abridge = self.my;
  self.Component = AFAppX.WorkerComponent || function(){};
  self.$global = AFAppX.$global;
  self.requirePlugin = AFAppX.requirePlugin;
          

if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}



function success() {
require('../../app');
require('../../components/loading/loading?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/callrecy/callrecy?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/dialog/dialog?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../pages/index/index?hash=2c81e4786f190b355adc74acc0c5421a51491b49');
require('../../pages/login/login?hash=7c3c8b956f67e51c974f1b93a33cfaccab4914e6');
require('../../pages/wareslist/wareslist?hash=7c3c8b956f67e51c974f1b93a33cfaccab4914e6');
require('../../pages/recySmart/recySmart?hash=7c3c8b956f67e51c974f1b93a33cfaccab4914e6');
require('../../pages/addresslist/addresslist?hash=7ac17ff913c312ef3af0921cd1d64078b1490f96');
require('../../pages/addressform/addressform?hash=7c3c8b956f67e51c974f1b93a33cfaccab4914e6');
require('../../pages/electrical/electrical?hash=7c3c8b956f67e51c974f1b93a33cfaccab4914e6');
require('../../pages/recyorderlist/recyorderlist?hash=7ac17ff913c312ef3af0921cd1d64078b1490f96');
require('../../pages/qrcode/qrcode?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/guide/guide?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/personal/personal?hash=7ac17ff913c312ef3af0921cd1d64078b1490f96');
require('../../pages/realname/realname?hash=7c3c8b956f67e51c974f1b93a33cfaccab4914e6');
require('../../pages/smartorderlist/smartorderlist?hash=7c3c8b956f67e51c974f1b93a33cfaccab4914e6');
require('../../pages/furniture/furniture?hash=7c3c8b956f67e51c974f1b93a33cfaccab4914e6');
require('../../pages/governmentinfo/governmentinfo?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/electricalinfo/electricalinfo?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/furnitureinfo/furnitureinfo?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/merchantinfo/merchantinfo?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/dryorderlist/dryorderlist?hash=7c3c8b956f67e51c974f1b93a33cfaccab4914e6');
require('../../pages/exchangelist/exchangelist?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/wares/wares?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/exchange/exchange?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/invitation/invitation?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/withdraw/withdraw?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/getuserinfo/getuserinfo?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/scorelist/scorelist?hash=7c3c8b956f67e51c974f1b93a33cfaccab4914e6');
require('../../pages/scoredetails/scoredetails?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/cashlist/cashlist?hash=7c3c8b956f67e51c974f1b93a33cfaccab4914e6');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}