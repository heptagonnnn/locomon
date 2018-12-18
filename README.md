# Locomon &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/heptagonnnn/locomon/blob/master/LICENSE) [![](https://img.shields.io/npm/v/locomon.svg)](https://www.npmjs.com/package/locomon)


## WHAT IS LOCOMON
![avatar](./locomon.jpg)



Locomon is a fictional creature from the "Digimon" series. A mechanical digimon of locomotives that exists to transport network data. It thinks the most important thing is how to send the data. But as a result of that, so occasionally there are violent things.






## Installation
---
```shell
npm i locomon
```


## Documentation
---


### LocomonBody
辅助对象，用于对http返回信息的封装
```javascript
{
    // http status
    status: 200,
    // body
    // 在success时，boby是一个对象，由Response.json()得来，
    // 在error时，body是一个字符串，由Response.text()得来。
    body: {} || ""
}
```
### LocomonError

辅助对象，用于对http错误的封装
```javascript
{
    // 错误名称
    name: "error name",
    // response.text()
    body: LocomonBody,
    // 错误信息，由错误信息+response.text()中的报错信息拼接而成
    message: "error message"
}
```



### Locomon.setup(settings);

setup 方法接受一个参数settings，settings种包含以下属性


#### defaultConfig


对请求配置进行全局设置

默认值:
```javascript
// 默认值不对config做任何设置
{}
```

```javascript

{
    // 若对所有方法进行设置，则使用"default"作为属性
    "default": {
        headers: {...},
        credentials: "inclde"
    },
    // 若要对具体的方法进行设置，则使用method的小写作为属性
    "get": {
        headers: {...}
    }
}
```

#### statusValidation

statusValidation会对http status进行判断，对不符合要求的status进行报错处理，进入onError回调,默认合法的status范围是[200, 400);

```javascript
/**
 * function statusValidation
 * @params status {number}
 * @return boolean
 */
```
#### onError
当statusValidation返回false时，表明http status未通过校验，则进入onError流程

onError方法调用时传入一个LocomonError对象作为参数

```javascript
function onError(locomonError) {
    ...
}
```

#### onSuccess
当statusValidation返回true时，表明http status已通过校验，进入onSuccess流程
onSuccess方法调用时传入一个LocomonBody对象作为参数
```javascript
function onSuccess(locomonBody) {
    ...
}
```

### Locomon.request(url, config, settings)

#### url, config
直接传入fetch中

### Locomon.get

### Locomon.post





## Example









