const { getImageArr, getBeautyPage } = require("./request.js");
const decrypt = require("./decrypt.js");
const download = require("./download.js");
const { JSDOM } = require("jsdom");
const fs = require("fs");

var isBeautyFinished = false;

async function getImages(id) {
  try {
    console.log(`开始获取图集${id}的数组路径`)
    const res = await getImageArr(id);
    console.log(`获取完成图集${id}的数组路径`)
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
    if(error?.response?.status === 403) {
      console.log('403限制访问')
      isBeautyFinished = true;
    } else if (error?.response?.status === 429) {
      console.log('429限制访问')
      isBeautyFinished = true;
    } else {
      console.error("获取图集失败", error);
    }
  }
}

async function getBeauty(page = 1) {
  try {
    console.log(`开始加载潮牌馆第${page}页数据...`)
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
    let beautyIds = urls
      .filter((url) => url.startsWith("https://kkmzt.com/beauty/"))
      .map((url) => {
        const match = url.match(/https:\/\/kkmzt\.com\/beauty\/(\d+)/);
        return match ? match[1] : null;
      })
      .filter((id) => id !== null);
    beautyIds = [...new Set(beautyIds)];
    let i = 0;
    console.log('开始下载图片...')
    while(i < beautyIds.length) {
      await getImages(beautyIds[i]);
      i++;
    }
    console.log(`潮牌馆第${page}页数据已全部下载完毕\n`)
  } catch (error) {
    if(error?.response?.status === 404) {
      console.log("潮牌馆图片已全部下载完毕");
      isBeautyFinished = true;
    } else if (error?.response?.status === 403) { 
      console.log('403限制访问')
      isBeautyFinished = true;
    } else if (error?.response?.status === 429) {
      console.log('429限制访问')
      isBeautyFinished = true;
    }
    else {
      console.log("获取文档数据出错:", error);
    }
  }
}

// 判断是否存在images/beauty 以及 images/photo文件夹，若没有则创建
function mkdir() {
  const localPath = {
    'beauty': `./images/beauty`,
    'photo': `./images/photo`
  }
  // 判断该文件夹是否存在，若不存在，则创建
  if (!fs.existsSync('./images')) {
    fs.mkdirSync('./images');
  }
  if (!fs.existsSync(localPath.beauty)) {
    fs.mkdirSync(localPath.beauty);
  }
  if (!fs.existsSync(localPath.photo)) {
    fs.mkdirSync(localPath.photo);
  }
}

// 延迟函数，用于等待指定的毫秒数
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  mkdir()
  // 下载潮拍馆的所有图片资源
  let i = 276;
  while(isBeautyFinished === false) {
    await getBeauty(i);
    await delay(1000);
    i++;
  }
}

// getImages('108366')
main()