# Locomon








## api

### LocomonError


报错封装对象

#### status

#### body



### setup



### defaultConfig


defaultConfig对象，以method作为key，fetch config作为value，对Locomon进行全局默认设置


若要对所有方法进行统一设置，则使用"default"作为key

先使用default进行配置，再使用对应方法的配置，覆盖方式为全覆盖

```javascript
{
    defaultConfig: {
        "default": {
            headers: {
                "content-type": "application/json"
            }
        }
    }
}
```


### onError(LocomonError)

在status层面对进行错误拦截，与statusValidation配合，

对于不符合statusValidation的status，进行回调报错处理


### onSuccess

通过了statusValidation的校验，在返回之前的中间处理


### rule

#### statusValidation