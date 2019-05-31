HTML-vm
======

### 一个简单的类MVVM框架作品

### 介绍

  Vue、React、Angular等等MVVM框架现在已经相当的成熟了。最让我印象深刻的就是Vue，并不是因为它相比其他框架有什么绝对的技术优势，而是因为它真的简单、好用、易上手，而且也拥有构建大型复杂应用的能力。

  这些框架带来的一些特性目前已经算是常识了，例如声明式的视图、数据驱动、组件化、模块化、渲染引擎、状态管理等等。要深入的理解这些特性，最好的方法就是去造一个类似的轮子，这也是我开这个项目的初衷，当然做的东西只是个垃圾而已，各位姑且一看。


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
      <td>自定义组件模板对象</td>
    </tr>
  </tobody>
</table>

---
#### 一个简单的demo地址https://unjust-life.github.io/Html-vm/vm-1.0/
