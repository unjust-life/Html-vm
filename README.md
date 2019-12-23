HTML-vm
======

### 一个玩具框架轮子

### 介绍

  Vue、React、Angular等等MVVM框架现在已经相当的成熟了。最让我印象深刻的就是Vue，并不是因为它相比其他框架有什么绝对的技术优势，而是因为它真的简单、好用、易上手，而且也拥有构建大型复杂应用的能力。

  这些框架带来的一些特性目前已经算是常识了，例如声明式的视图、数据驱动、组件化、模块化、渲染引擎、状态管理等等。作者这个库是个练手作品。在手动去实现这些特性的时候去思考框架的设计模式和原理，来更好的学习其中的一些思想和实现过程。
  
  这个库实现的ui层面的更新是基于JQ的dom操作。某数据变更后会更新模板上所有这个数据绑定的节点，因此会有一些性能的浪费。数据监听的机制是发布-订阅机制。每个数据初始化都会生成一个对应的观察者，数据变化后观察者会去通知所有订阅了这个数据的地方去随之响应，从而去执行响应的动作。

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

* 路由

### 快速开始

API文档


- 方法：
<table>
  <thead>
    <tr>
        <td>参数</td>
        <td>说明</td>
    </tr>
  </thead>
  <tobody>
    <tr>
      <td>this.get(prop)</td>
      <td>读取当前应用的数据</td>
    </tr>
    <tr>
      <td>this.set(prop, data)</td>
      <td>修改当前应用数据 可接收除undefined以外的值</td>
    </tr>
    <tr>
      <td>v-text="prop"</td>
      <td>将变量值作为文本绑定在模板上</td>
    </tr>
    <tr>
      <td>v-model="prop"</td>
      <td>将变量值双向绑定到输入框</td>
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
      <td>生命周期钩子 可访问data  dom模板未挂载</td>
    </tr>
    <tr>
      <td>beforeMount</td>
      <td>生命周期钩子 dom已挂载  事件和数据未绑定视图</td>
    </tr>
    <tr>
      <td>mounted</td>
      <td>生命周期钩子 dom已挂载  事件和数据绑定完毕 组件编译结束</td>
    </tr>
    <tr>
      <td>event</td>
      <td>事件绑定处理函数  在dom加载完毕后执行</td>
    </tr>
    <tr>
      <td>components</td>
      <td>name—组件名称(String) props-依赖的父组件的值(Array) render-组件模板渲染函数</td>
    </tr>
  </tobody>
</table>

---
#### 一个简单的demo地址https://unjust-life.github.io/Html-vm/vm-1.0/
