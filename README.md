HTML-vm
======

### 一个简单的类MVVM框架作品

### 介绍

曾经JQ打遍天下无敌手，一时风光无二，直到MVVM横空出示，大哥也免不了要被扫进垃圾堆。目前前端主流框架都是mvvm式的，你要不会都不好意思出来见人。例如Vue、React、Angular，种类繁多，更新极快，各自新的API层出不穷，根本学不动啦！！！

好在它们的设计模式和想法大多类似，万变不离其宗。要深入的理解这种模式，我想没有比自己鼓捣一个框架更好的办法了。从中你可以学到很多很多，理解框架的能力和特性，为什么这样设计，其实现的原理，平常业务不会接触到的想法和语言的拓展。明白那些API和特性背后的故事，可以让你在使用框架时更加得心应手。

我对Vue较为熟悉，因此练手写的这个框架大部分是照搬Vue的设计，但是我是在没有阅读其源码的情况下来写的，因此它样子上上贴近Vue，但源码和Vue没有关联。

它尝试模仿实现类似Vue中的部分功能，像是一个Vue的简易版本。为了兼容和快捷，模块中默认使用了JQ提供的API，因此依赖于jquery。


### 特性

#### 已实现

* 兼容性 兼容IE8
* data  提供响应式的数据层
* watch 提供类似于vue的侦听属性  动态侦听数据的变化
* data-vm 视图层自定义属性和数据双向绑定 代替v-text和v-model
* data-show 显示元素  代替v-show
* data-hide 隐藏元素  代替v-show
* 声明式的html组件模板

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
    <tr>
      <td>created</td>
      <td>生命周期 属性已经挂载 组件未挂载</td>
    </tr>
    <tr>
      <td>event</td>
      <td>事件绑定存放函数</td>
    </tr>
  </tobody>
</table>

---
#### 一个简单的demo地址https://unjust-life.github.io/Html-vm/index.html
