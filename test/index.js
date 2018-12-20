import Locomon from "../src";


//
Locomon.setup({
  defaultConfig: {
    "default" : {
      credentials: "include"
    }
  }
});
console.log(Locomon.setup);


const tmp = new URLSearchParams();
tmp.append("test", 1);
tmp.append("test2", 2);

Locomon.get("/theSound/page/lottery/drawLottery?tttt=333", {
  params: tmp
})
  .then(res => {
    console.log(res);
    return res;
  }).catch(err => {
  console.log(err);
})