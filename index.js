const { getImageArr, getBeautyPage } = require("./request.js");
const decrypt = require("./decrypt.js");
const download = require("./download.js");
const { JSDOM } = require("jsdom");

async function main(id) {
  try {
    const res = await getImageArr(id);
    const listArr = decrypt(id, res.data.data);
    return Promise.all(
      listArr.map((item, index) => {
        return download(item, "beauty", {
          year: '2024',
          month: '01',
          categoryid: id,
        });
      })
    ).then(
      (arr) => {
        // console.log(arr)
        console.log(`id为${id}的图册已全部下载完毕`);
      },
      (e) => {
        // console.log(e)
      }
    );
  } catch(error) {
    console.error("获取图集失败");
  }
}

async function getBeauty(page = 1) {
  try {
    const res = await getBeautyPage(page);
    // 使用DOMParser解析HTML文档
    const dom = new JSDOM(res.data);
    const document = dom.window.document;

    // 现在你可以像在浏览器中一样使用document来操作文档了
    // 例如：
    let urls = [];
    const links = document.querySelectorAll("a");
    links.forEach((link) => {
      urls.push(link.href);
    });
    const beautyIds = urls
      .filter((url) => url.startsWith("https://kkmzt.com/beauty/"))
      .map((url) => {
        const match = url.match(/https:\/\/kkmzt\.com\/beauty\/(\d+)/);
        return match ? match[1] : null;
      })
      .filter((id) => id !== null);
    let i = 0;
    while(i < beautyIds.length) {
      await main(beautyIds[i]);
      i++;
    }
    console.log(`潮牌管第${page}页数据已全部下载完毕`)
  } catch (error) {
    console.error("获取文档数据出错:");
  }
}

// main('108366')
getBeauty();
