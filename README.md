HTML-vm
======

### 一个简单的类MVVM框架作品

### 介绍
HTML-vm是一个简易的前端框架作品。一个仿照mvvm模式，模仿Vue.js的功能和设计的简易框架。

它模仿实现了类似Vue中的data, watch, computed, v-show等功能，像是一个Vue的简易版本，但内部实现和Vue没有任何关系，仅仅只是作者的一个思考和练手的作品。为了兼容和快捷，模块中默认使用了JQ提供的API，因此依赖于jquery。

HTML-vm提供了一个构造函数$vm。使用它只需要调用new关键词对$vm实例化。对象上可以保存各种数据，并且提供了很多实用的方法和api。对象上的data属性用来保存数据，所有定义在data上的属性会被特殊化处理，以便在其改变时获得通知。同时它还能通过提供的方法来实现数据和视图层的双向绑定，省去繁杂的dom操作。

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

快速开始，先引入js文件
new一个实例对象！

<pre><code>
var vm = new $vm({
  data:{},
  watch:{},
  computed:{},
  created:function(){}
})
</code></pre>

##### data对象

data对象上可以定义我们所需要的数据，参考Vue的data属性。

看一个实际的例子：
首先在data上定义一个num属性。这个属性没有任何特别，如果需要改变它并且让页面相应需要这么做：

<pre><code>
vm.set('num', 100)
</code></pre>


使用实例的set方法就会将data下num的值改修改为100。与此同时，所有绑定在页面上的num的值会同步改变。


怎样可以把我们的值绑定到视图上呢，只需要在任意dom节点上绑定自定义属性data-vm。

例如 data-vm="num"

如果该元素是一个输入框或者文本域，那么会自动的进行双向绑定，在手动输入值时也会同步改变数据层。



##### watch对象

现在我们有了个属性num，那么下一步就是定义它的业务逻辑了。

watch对象可以让我们监听属性的变化，并在得到通知的时候执行对应的函数。类似于Vue的watch。

比如我们需要当数字等于100的时候弹出一个alert提醒。

<pre><code>
watch: {
  num(val){
    if(val == 100) {
      alert('100了哦')
    }
  }
}
</code></pre>

在watch上定义名为num的函数，它将会在num的值改变时被调用，并且将新的值作为参数传入。

##### 计算属性

computed对象用来存放计算属性的计算函数。类似于Vue的computed。

常常我们会有这样的需求，对一个购物列表获得一个价格总和。我们多个数据计算后的结果，在每次变动时得到一个新的结果。

计算属性会监听每个它所依赖的属性，在任何一个属性在变动时计算属性会重新计算。

想要实现这一特点需要执行watchVal方法

在created生命周期函数里记录计算属性的依赖值

created: function() {
  //记录计算属性的依赖，如allNum属性依赖于num。
  this.watchVal(['allNum', 'num'])
}

watchVal方法接收一个数组 每个项目都是字符串，第一项是要创建的计算属性的名字。例如'allNum'后面是它所需要依赖的属性。
计算属性依赖的任何一个属性发生了变化那么计算函数会返回一个新值。

allNum的计算函数需定义在computed上。

在computed对象上定义一个名字叫allNum的函数并定义其逻辑。比如获得列表数字的总和：

<pre><code>
computed: {
  allNum: function() {
    var list = vm.data.list
    function count (total, num){
        return total + num
    }
    var num = list.reduce(count)
    return num
  }
}

</code></pre>

每个计算属性都需要返回一个值，它会被自动写入data属性来通知视图的更新和watch对象。

在使用到计算属性的时候和其它属性没有区别  可以vm.get('allNum')  或者vm.data.allNum来获得。也可以对其进行观察或data-vm绑定在视图上。
不要手动去改变计算属性的值，这是因为它在任何时候都应该是个函数计算后的结果。

</code></pre>




API文档

<pre><code>
方法

get(prop)
set(prop, data)
watchVal(arr)

给视图绑定值
data-vm=""

值为true时显示dom元素
data-show=""

值为true时隐藏dom元素
data-hide=""

执行生命周期 主要用于计算属性的订阅 ajax请求数据等等
created()

初始化视图层和数据层的双向绑定方法initView 使view和model层对应  并使data里的初始值渲染到视图上 会执行一次watch和计算属性
initView() 

如果页面是服务端渲染 请执行initSsrView方法 从视图层获得初始data数据 所有的watch和计算属性不会进行初次计算
initSsrView()


仅仅提供一个事件存放的对象 会在dom加载完毕后执行 便于维护 建议放事件
methods()

</code></pre>


---
#### 一个简单的demo地址https://unjust-life.github.io/Html-vm/
