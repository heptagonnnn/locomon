import Locomon from '../src/index';


const url = "http://localhost:3001";

// // get test ----pass
//
// Locomon.get(url)
//   .then(res => {
//     console.log(res);
//   });
//
//
// // post test ----pass
//
// Locomon.post(`${url}/post`)
//   .then(res => {
//     console.log(res);
//   });
//

// post analyse headers

Locomon.post(`${url}/post`, {
  headers: {
    "content-type": "application/json"
  }
}).then(res => {
  console.log(res);
});
