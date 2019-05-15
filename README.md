HTML-vm
======

### 一个简单的类MVVM框架作品

### 介绍
HTML-vm是一个简易的前端框架作品。一个仿照mvvm模式，模仿Vue.js的功能和设计的简易框架。

它尝试模仿实现类似Vue中的部分功能，像是一个Vue的简易版本，仅仅只是作者的一个思考和练手的作品。为了兼容和快捷，模块中默认使用了JQ提供的API，因此依赖于jquery。

HTML-vm提供了一个构造函数$vm。使用它仅仅只需要对$vm函数进行实例化。

### 特性

#### 已实现

* 兼容性 兼容IE8
* data  提供可以便捷修改获取的数据对象 不占用全局变量
* watch 提供类似于vue的侦听属性  动态追踪数据变化的方法
* computed 提供类似于vue的计算属性  动态计算复杂逻辑后的值
* data-vm 视图层自定义属性数据双向绑定
* data-show 显示元素
* data-hide 隐藏元素

#### 计划实现

* 声明式的html组件模板

### 快速开始

API文档


- 方法：
<table>
  <thead>
    <tr>
        <td>使用方式</td>
        <td>解释</td>
    </tr>
  </thead>
  <tobody>
    <tr>
      <td>get(prop)</td>
      <td>获得属性值</td>
    </tr>
    <tr>
      <td>set(prop, data)</td>
      <td>修改属性值</td>
    </tr>
    <tr>
      <td>data-vm-*</td>
      <td>绑定属性值到视图</td>
    </tr>
    <tr>
      <td>data-show="prop"</td>
      <td>值为true时显示dom元素</td>
    </tr>
    <tr>
      <td>data-hide="prop"</td>
      <td>值为true时隐藏dom元素</td>
    </tr>
  </tobody>
</table>

---
#### 一个简单的demo地址https://unjust-life.github.io/Html-vm/index.html
