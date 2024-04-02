1. 潮拍馆首页
GET https://kkmzt.com/beauty/

3. 潮拍馆主页 获取套图id（通过dom获取）
GET https://kkmzt.com/beauty/

4. 潮拍馆套图详情页面
GET https://kkmzt.com/beauty/${id}  

5. 潮拍馆首页套图合计（通过id查询）
GET https://kkmzt.com/app/post/p?id=${id}  
返回数据格式：
{
  data: '4324323' // 密文
} 
解密方式：（解析返回图片文件名称数组）获取imgName
```
function _0x66f3q(id, data) {
  var _0x1bf6d1 = '';
  for (i = 2; i < 18; i++) {
    _0x1bf6d1 += (id % (i + 1) % 9).toString();
  }
  ;
  var _0x3bbf34 = CryptoJS.MD5(id + "Bxk80i9Rt").toString();
  var _0x53cd25 = CryptoJS.MD5(_0x1bf6d1 + _0x3bbf34).toString().substr(8, 16);
  var _0x2e67ed = data.split(_0x3bbf34)[1];
  var _0x3d45bd = CryptoJS.enc.Hex.parse(_0x2e67ed);
  var _0x4b0cd8 = CryptoJS.enc.Base64.stringify(_0x3d45bd);
  var _0x53cd25 = CryptoJS.enc.Utf8.parse(_0x53cd25);
  var _0x4ff557 = CryptoJS.AES.decrypt(_0x4b0cd8, _0x53cd25, {
    "iv": CryptoJS.enc.Utf8.parse(_0x1bf6d1),
    "mode": CryptoJS.mode.CBC,
    "padding": CryptoJS.pad.Pkcs7
  });
  return JSON.parse(_0x4ff557.toString(CryptoJS.enc.Utf8));
}
```
下载域名有两个：
i. https://image.baidu.com/search/down?url=https://wx1.sinaimg.cn/mw1024/${imageName}  （潮拍馆）
ii. https://p.meizitu.net/${YYYY}/${MM}/${imgName}  （写真馆） 

6. 写真馆主页 获取套图id（通过dom获取）
https://kkmzt.com/photo/
