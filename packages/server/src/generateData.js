const categoryDao = require("./dao/categoryDao")
const productDao = require("./dao/productDao")
main()

function main() {
  genProduct()
}

// 类型
function genCategory() {

  // ["VIVO", "IQOO", "平板手表", "手机充电", "音乐设备", "手机配件", "智能硬件", "游戏摄影", "日用出行"].forEach(item => {
  //   categoryDao.add({superId: 0, name: item})
  // })
  // ['X系列', 'Y系列', 'S系列'].forEach(item => {
  //   categoryDao.add({ superId: 6, name: item })
  // });
  // ['旗舰', 'Z系列', 'U系列', 'Neo'].forEach(item => {
  //   categoryDao.add({superId: 5, name: item})
  // })
}

// 产品
function genProduct() {
  for (let i = 0; i < 100; i++){
    let obj = {};
    const h = ["VIVO", "IQOO"]; const x = Math.floor(Math.random() * 2);
    const cArray = { 12: 'S', 13: 'Y', 14: '', 15: 'Z', 16: 'X', 17: 'U', 18: 'Neo' };const a=Math.round(Math.random()*6+12)
    const number = Math.round(Math.random() * 80);
    const ss = ['Plus', '', "Pro", ""];const b = Math.floor(Math.random()*4)
    obj.name = h[x]+' '+ cArray[a]+number +' '+ss[b];
    obj.categoryId = a;
    obj.description = "120W 超快闪充 · 等效 5000mAh* 长寿大电池 · 骁龙 782G · 3K 大面积 VC 散热 · 七重护眼竞速屏";
    obj.tag = JSON.stringify({new:true,hot:false,wellChoice: false}) ;
    obj.stock = 100;
    obj.buyOptions = JSON.stringify([
      {
        optionName: '8GB+256GB',
        price: a * 300 + number * 3,
        discountPrice: a * 300 + number * 3 - 150,
      },
      {
        optionName: '12GB+512GB',
        price: a * 300 + number * 3,
        discountPrice: a * 300 + number * 3 - 150,
      },
      {
        optionName: '12GB+512GB',
        price: a * 300 + number * 3,
        discountPrice: a * 300 + number * 3 - 150,
      },
      {
        optionName: '12GB+512GB',
        price: a * 300 + number * 3,
        discountPrice: a * 300 + number * 3 - 150,
      },
    ]);
    obj.content =JSON.stringify([
      "http://localhost:8080/static/product_content_1_1.webp",
      "http://localhost:8080/static/product_content_1_2.webp",
      "http://localhost:8080/static/product_content_1_3.webp",
      "http://localhost:8080/static/product_content_1_4.webp",
      "http://localhost:8080/static/product_content_1_5.webp",
      "http://localhost:8080/static/product_content_1_6.webp"
    ]) 
    obj.poster =JSON.stringify([
      "http://localhost:8080/static/product_poster_1_1.png",
      "http://localhost:8080/static/product_poster_1_2.png",
      "http://localhost:8080/static/product_poster_1_3.png",
      "http://localhost:8080/static/product_poster_1_4.png",
    ]) 
    productDao.add(obj);
  }
}