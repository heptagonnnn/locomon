# Locomon &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/heptagonnnn/locomon/blob/master/LICENSE) [![](https://img.shields.io/npm/v/locomon.svg)](https://www.npmjs.com/package/locomon)


## WHAT IS LOCOMON
![locomon](./locomon.jpg)



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
    body: LocomonBody,
    // 错误信息，若未设置，由错误名+response.text()中的报错信息拼接而成
    message: "error message"
}
```

### LocomonSetting

辅助对象，包含设置信息

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
        credentials: "include"
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
    throw ...
}
```

#### onSuccess
当statusValidation返回true时，表明http status已通过校验，进入onSuccess流程
onSuccess方法调用时传入一个LocomonBody对象作为参数
```javascript
function onSuccess(locomonBody) {
    ...
    return ...
}
```



### Locomon.setup(LocomonSetting);

setup 方法接受一个参数LocomonSetting，用于对请求进行全局设置



### Locomon.request(url, config, LocomonSetting)

config.params用于拼接get 请求的query
config.data用于拼接其他请求的body

config.body会被忽略


fetch中实际使用的config为{...defaultMethodConfig, ...config}
实际使用的setting为{...defaultSetting, ...LocomonSetting}

**注意**
setting中的defaultConfig字段会被忽略


### Locomon.get
等同于
Locomon.request(url, {method: "get", ...}, LocomonSetting);
### Locomon.post
等同于
Locomon.request(url, {method: "post", ...}, LocomonSetting);

### 注意！
目前只有get方法和post方法被单独抽出，其他方法还需使用request


## Example


```javascript

const defaultSettings = {
    defaultConfig: {
        default: {
            headers: {
                "content-type": "application/json"
            }
        },
        get: {
            headers: {}
        }
    },
    statusValidation(status) {
        return status >= 200 && status < 400;
    },
    onError(error) {
        if (error.status === 500) {
            ....
            alert(error.message);
        } else if (error.status === 404) {
            ...
        }
    },
    onSuccess(res) {
        if (res.status === 200) {
            // 某些自定义特殊条件
            if (res.ret === 303) {
                throw .....
            }
        }
    }

}



Locomon.setup(defaultSettings);


Locomon.get("https//www.test.com", {
    params: {
        foo: 1
    }
}).then(res => {
  ...
}).catch(err => {
    ...
}) 

```









