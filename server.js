const Koa = require("koa");
const route= require("koa-route");
const cors = require("koa2-cors");

const app = new Koa();






const getMock = (ctx) => {
  console.log(ctx);
  return ctx.response.body = {
    ret: 0,
    success: true
  }
};


const postMock = (ctx) => {
  console.log("post context", ctx);

  ctx.response.body = {
    ret: 0,
    success: true
  };
};


app.use(cors(
  {
    origin(ctx) {
      return '*';
    },
    allowMethods: ["get", "post"],
  }
));
app.use(route.get("/", getMock));
app.use(route.post("/post", postMock));

app.listen(3001);