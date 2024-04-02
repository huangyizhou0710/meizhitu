// const axios = require('axios')
const axios = require('./axios.js')

module.exports = {
  // 潮拍馆首页套图合计（通过id查询）
  getImageArr: function (id) {
    return axios.get('https://kkmzt.com/app/post/p', {
      params: {
        'id': id
      },
      headers: {
        'accept': '*/*',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cookie': '_ga=GA1.1.817224944.1712020496; _ga_J74WJ3FL3J=GS1.1.1712022327.2.1.1712023371.0.0.0',
        'referer': 'https://kkmzt.com/beauty/',
        'sec-ch-ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        'x-requested-with': 'XMLHttpRequest'
      }
    })
  },
  getBeautyPage: function(page = 1) {
    const url = page > 1 ? 'https://kkmzt.com/beauty/page/' + page + '/' : 'https://kkmzt.com/beauty/'
    return axios.get(url, {
      headers: {
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cookie': '_ga=GA1.1.817224944.1712020496; _ga_J74WJ3FL3J=GS1.1.1712037535.4.1.1712038069.0.0.0',
        'referer': 'https://kkmzt.com/beauty/',
        'sec-ch-ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        'X-Originating-IP': '127.0.0.1'
      }
    });
  }
}