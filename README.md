# cpn-tbl

## 功能

**仅支持以下功能**

- 列嵌套
- 自定义列模板
- border
- spanMethod
- showSummary
- summaryMethod

## 安装使用

```
npm i cpn-tbl -S
```

```javascript
import Tbl from 'cpn-tbl'
Vue.use(Tbl)
```

## 其他功能

显然这点功能不满足所有人使用，但是为了让这个组件轻便一点，我就不加其他功能了。

如果需要新增功能：

- 修改 `./src/TBL` 的内容
- 运行 `npm run build`
- 在 package.json 修改 name
- 发布自己的包
