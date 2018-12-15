import Locomon from "../src";


//
console.log(Locomon.setup);


Locomon.post("/theSound/page/lottery/drawLottery", {
  data: {a: 1}
})
  .then(res => {
    console.log(res);
    return res;
  }).catch(err => {
  console.log(err);
})