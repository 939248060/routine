module.exports = {
  // 根据regid查询regname
  regname: function (regid) {

  },
  areaInfo: function(regid) {
    var data = this.data;
    var result;
    var i;
    for (i = 0; i < data.length; i++) {
      if (data[i]['areaId'] == regid) {
        result = data[i]
      }
    }
    return result;
  },
  //根据parid查询子数据 列表
  areaParent: function (parid) {
    var data = this.data;
    var result = [];
    var i;
    var ii = 0
    for (i = 0; i < data.length; i++) {
      if (data[i]['parentId'] == parid) {
        result[ii] = data[i]
        ii++
      }
    }
    return result;
  },
  data: [{ "areaId": 1, "areaName": "海南省", "parentId": 0, "shortName": "海南", "areaType": "1" },
    { "areaId": 2, "areaName": "海口市", "parentId": 1, "shortName": "海口", "areaType": "2" },
    { "areaId": 3, "areaName": "秀英区", "parentId": 2, "shortName": "秀英", "areaType": "3" },
    { "areaId": 4, "areaName": "龙华区", "parentId": 2, "shortName": "龙华", "areaType": "3" },
    { "areaId": 5, "areaName": "琼山区", "parentId": 2, "shortName": "琼山", "areaType": "3" },
    { "areaId": 6, "areaName": "美兰区", "parentId": 2, "shortName": "美兰", "areaType": "3" },
    { "areaId": 7, "areaName": "三亚市", "parentId": 1, "shortName": "三亚", "areaType": "2" },
    { "areaId": 8, "areaName": "三沙市", "parentId": 1, "shortName": "三沙", "areaType": "2" },
    { "areaId": 9, "areaName": "西沙群岛", "parentId": 8, "shortName": "西沙", "areaType": "3" },
    { "areaId": 10, "areaName": "南沙群岛", "parentId": 8, "shortName": "南沙", "areaType": "3" },
    { "areaId": 11, "areaName": "中沙群岛", "parentId": 8, "shortName": "中沙", "areaType": "3" },
    { "areaId": 12, "areaName": "五指山市", "parentId": 1, "shortName": "五指山", "areaType": "2" },
    { "areaId": 13, "areaName": "琼海市", "parentId": 1, "shortName": "琼海", "areaType": "2" },
    { "areaId": 14, "areaName": "儋州市", "parentId": 1, "shortName": "儋州", "areaType": "2" },
    { "areaId": 15, "areaName": "文昌市", "parentId": 1, "shortName": "文昌", "areaType": "2" },
    { "areaId": 16, "areaName": "万宁市", "parentId": 1, "shortName": "万宁", "areaType": "2" },
    { "areaId": 17, "areaName": "东方市", "parentId": 1, "shortName": "东方", "areaType": "2" },
    { "areaId": 18, "areaName": "定安县", "parentId": 1, "shortName": "定安", "areaType": "2" },
    { "areaId": 19, "areaName": "屯昌县", "parentId": 1, "shortName": "屯昌", "areaType": "2" },
    { "areaId": 20, "areaName": "澄迈县", "parentId": 1, "shortName": "澄迈", "areaType": "2" },
    { "areaId": 21, "areaName": "临高县", "parentId": 1, "shortName": "临高", "areaType": "2" },
    { "areaId": 22, "areaName": "白沙黎族自治县", "parentId": 1, "shortName": "白沙", "areaType": "2" },
    { "areaId": 23, "areaName": "昌江黎族自治县", "parentId": 1, "shortName": "昌江", "areaType": "2" },
    { "areaId": 24, "areaName": "乐东黎族自治县", "parentId": 1, "shortName": "乐东", "areaType": "2" },
    { "areaId": 25, "areaName": "陵水黎族自治县", "parentId": 1, "shortName": "陵水", "areaType": "2" },
    { "areaId": 26, "areaName": "保亭黎族苗族自治县", "parentId": 1, "shortName": "保亭", "areaType": "2" },
    { "areaId": 27, "areaName": "琼中黎族苗族自治县", "parentId": 1, "shortName": "琼中", "areaType": "2" },
    { "areaId": 55, "areaName": "吉阳镇", "parentId": 7, "shortName": "吉阳镇", "areaType": "3" },
    { "areaId": 56, "areaName": "凤凰镇", "parentId": 7, "shortName": "凤凰镇", "areaType": "3" },
    { "areaId": 57, "areaName": "崖城镇", "parentId": 7, "shortName": "崖城镇", "areaType": "3" },
    { "areaId": 58, "areaName": "天涯镇", "parentId": 7, "shortName": "天涯镇", "areaType": "3" },
    { "areaId": 59, "areaName": "育才镇", "parentId": 7, "shortName": "育才镇", "areaType": "3" },
    { "areaId": 60, "areaName": "河西区街道", "parentId": 7, "shortName": "河西区街道", "areaType": "3" },
    { "areaId": 61, "areaName": "河东区街道", "parentId": 7, "shortName": "河东区街道", "areaType": "3" },
    { "areaId": 62, "areaName": "通什镇", "parentId": 12, "shortName": "通什镇", "areaType": "3" },
    { "areaId": 63, "areaName": "嘉积镇", "parentId": 13, "shortName": "嘉积镇", "areaType": "3" },
    { "areaId": 64, "areaName": "万泉镇", "parentId": 13, "shortName": "万泉镇", "areaType": "3" },
    { "areaId": 65, "areaName": "博鳌镇", "parentId": 13, "shortName": "博鳌镇", "areaType": "3" },
    { "areaId": 66, "areaName": "那大镇", "parentId": 14, "shortName": "那大镇", "areaType": "3" },
    { "areaId": 67, "areaName": "文城镇", "parentId": 15, "shortName": "文城镇", "areaType": "3" },
    { "areaId": 68, "areaName": "万城镇", "parentId": 16, "shortName": "万城镇", "areaType": "3" },
    { "areaId": 69, "areaName": "八所镇", "parentId": 17, "shortName": "八所镇", "areaType": "3" },
    { "areaId": 70, "areaName": "定城镇", "parentId": 18, "shortName": "定城镇", "areaType": "3" },
    { "areaId": 71, "areaName": "屯城镇", "parentId": 19, "shortName": "屯城镇", "areaType": "3" },
    { "areaId": 72, "areaName": "金江镇", "parentId": 20, "shortName": "金江镇", "areaType": "3" },
    { "areaId": 73, "areaName": "老城镇", "parentId": 20, "shortName": "老城镇", "areaType": "3" },
    { "areaId": 74, "areaName": "临城镇", "parentId": 21, "shortName": "临城镇", "areaType": "3" },
    { "areaId": 75, "areaName": "牙叉镇", "parentId": 22, "shortName": "牙叉镇", "areaType": "3" },
    { "areaId": 76, "areaName": "石碌镇", "parentId": 23, "shortName": "石碌镇", "areaType": "3" },
    { "areaId": 77, "areaName": "抱由镇", "parentId": 24, "shortName": "抱由镇", "areaType": "3" },
    { "areaId": 78, "areaName": "椰林镇", "parentId": 25, "shortName": "椰林镇", "areaType": "3" },
    { "areaId": 79, "areaName": "光坡镇", "parentId": 25, "shortName": "光坡镇", "areaType": "3" },
    { "areaId": 80, "areaName": "三才镇", "parentId": 25, "shortName": "三才镇", "areaType": "3" },
    { "areaId": 81, "areaName": "保城镇", "parentId": 26, "shortName": "保城镇", "areaType": "3" },
    { "areaId": 82, "areaName": "营根镇", "parentId": 27, "shortName": "营根镇", "areaType": "3" }
  ]
}