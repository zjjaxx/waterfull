# waterfull ![example workflow](https://github.com/zjjaxx/waterfull/actions/workflows/webpack.yml/badge.svg)

![pictrue]("../src/example/assets/Untitled.gif")
## 描述
基于vue3.0 的图片瀑布流组件，无需设置图片宽高
## 安装
通过 npm 或者 yarn 安装
```
yarn add waterfull_next
//or
npm i waterfull_next
```
浏览器直接引入

打包生成waterfull.umd.min.js
```
git clone https://github.com/zjjaxx/waterfull.git
cd waterfull
yarn 
yarn run build
```
```
    <script src="https://unpkg.com/vue@next"></script>
    <script src="path/waterfull.umd.min.js"></script>
```
## 属性
|  属性名  |  类型   |  默认值   | 必填 | 格式| 说明|
| --- | --- | --- | --- | --- |---|
|  list   |   array  |   -  | 必填 | `[{ url:"",//...其它自定义属性}] `| |
|  column   |   number  |  -   | 必填| 2| 列数 |

## 插槽
|   命名插槽  |  命名   |  插槽prop   |
| --- | --- | --- |
|  列表item插槽   |   item  |  item   |

## [example demo](https://github.com/zjjaxx/waterfull/blob/master/src/example/App.vue)