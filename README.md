HTML-vm
======

### 一个简单的类MVVM框架作品

### 介绍

曾经JQ打遍天下无敌手，一时风光无二，直到MVVM横空出示，大哥也免不了要被扫进垃圾堆。目前前端主流框架都是mvvm式的，你要不会都不好意思出来见人。例如Vue、React、Angular等。种类繁多，更新极快，各种新版本层出不穷，根本学不动了好嘛！！！

不过好在它们的设计模式和想法大多类似，万变不离其宗。要深入的理解这种模式，我想没有比自己鼓捣一个框架更好的办法了。从中你可以学到很多很多，理解框架的设计模式、能力与特性、有哪些实现方案、API为何这样设计、平常业务不会接触到的想法和语言层面的拓展。了解那些强大能力背后的故事，可以让你在使用框架时更加得心应手。

我对Vue较为熟悉，因此练手写的这个框架大部分是照搬Vue的设计，但是我是在没有阅读其源码的情况下来写的，因此它在API上贴近Vue，但源码没有参照Vue的实现。

它尝试模仿实现类似Vue中的部分功能，像是一个Vue的简易版本。为了兼容和快捷，模块中默认使用了JQ提供的API，因此依赖于jquery。


### 特性

#### 已实现

* 兼容性   兼容IE8
* data    提供响应式的数据层
* watch   提供类似于vue的侦听属性  动态侦听数据的变化
* v-text  绑定文本到视图
* v-model 视图层和数据层数据的双向绑定
* v-show  显示元素
* v-hide  隐藏元素
* components 声明式的组件模板
* 生命周期钩子函数

#### 计划实现

* 虚拟dom

### 快速开始

API文档


- 方法：
<table>
  <thead>
    <tr>
        <td>API</td>
        <td>作用</td>
    </tr>
  </thead>
  <tobody>
    <tr>
      <td>this.get(prop)</td>
      <td>获得属性当前的值 取值器</td>
    </tr>
    <tr>
      <td>this.set(prop, data)</td>
      <td>修改属性值 存值器 prop是属性名称 接收一个字符串 data是存入的值 可接收除undefined以外的值</td>
    </tr>
    <tr>
      <td>v-text="prop"</td>
      <td>绑定变量文本到视图 将变量的值作为文本绑定在模板上</td>
    </tr>
    <tr>
      <td>v-model="prop"</td>
      <td>双向绑定变量到输入框 输入框的输入会同步修改数据模型</td>
    </tr>
    <tr>
      <td>v-show="prop"</td>
      <td>值为true时显示dom元素</td>
    </tr>
    <tr>
      <td>v-hide="prop"</td>
      <td>值为true时隐藏dom元素</td>
    </tr>
    <tr>
      <td>created</td>
      <td>生命周期钩子 可访问data dom模板未挂载</td>
    </tr>
    <tr>
      <td>beforeMount</td>
      <td>生命周期钩子 dom已挂载 事件和数据未绑定视图</td>
    </tr>
    <tr>
      <td>mounted</td>
      <td>生命周期钩子 dom已挂载 事件和数据绑定完毕 组件编译结束</td>
    </tr>
    <tr>
      <td>event</td>
      <td>事件绑定处理函数 在dom加载完毕后执行</td>
    </tr>
    <tr>
      <td>components</td>
      <td>自定义组件模板 接收一个对象 name—组件名称(String) props-依赖的父组件的值(Array) render-组件模板函数</td>
    </tr>
  </tobody>
</table>

---
#### 一个简单的demo地址https://unjust-life.github.io/Html-vm/vm-1.0/
