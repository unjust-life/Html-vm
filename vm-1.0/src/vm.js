// 兼容IE8低版本浏览器的数据绑定函数
// 构造函数的开始
var $vm = function (obj) {
    try {
        var that = this
        this.data = obj.data
        this.watch = obj.watch
        this.created = obj.created
        this.event = obj.event
        this.components = obj.components

        this.$observer = {} //内部  用于computed  发布者对象
        this.created()  //执行生命周期 主要用于计算属性的订阅 ajax请求数据等等

        // dom加载后进行初始化
        $(document).ready(function () {
            var event = that.event.bind(that)
            event()
            that.initView()
        })
    } catch(e) {
        console.error('error init 初始化失败')
    }
}

// 取值
$vm.prototype.get = function (prop) {
    try {
        return this.data[prop]
    } catch(e) {
        console.error('error getData' + prop)
    }
}

// 存值
$vm.prototype.set = function (prop, newVal) {
    try {

        var oldVal = this.data[prop]
        this.data[prop] = newVal
        
        //如果属性被列入观察  执行对应函数并注入修改后的值
        if (this.watch[prop]) {
            var fn = this.watch[prop].bind(this)
            fn(newVal, oldVal)
        }

        this.$observer[prop].issue()
        // 进行视图层的对应更新
        this.updateView(prop, newVal)
    } catch(e) {
        console.error('error setData' + prop)
    }
}

//初始化dom节点和数据层的双向绑定 使所有输入框或文本域和数据层建立联系
$vm.prototype.initView = function () {
    try {
        var that = this
        // 获得所有绑定于视图的属性  取值并进行判断是对dom元素双向绑定还是单向绑定
        // 如果是合法节点 会对其input事件进行监听
        $('[data-vm]').each(function () {
            var $this = $(this)
            var prop = $(this).attr('data-vm')
            // var newVal = that.data[prop]
            //获得节点名
            var tag_name = $(this)[0].tagName.toLowerCase()
            if(tag_name === "input" || tag_name === "textarea" || tag_name === "select") {

                // 执行双绑 监听dom的变化更新data数据
                $this.on("input propertychange", function (e) {
                    var newVal = $this.val()
                    that.set(prop, newVal)
                })
            }
        })

        //初始化数据 渲染到页面上
        for (var key in this.data) {
            //只遍历对象自身的属性，而不包含继承于原型链上的属性。  
            if (this.data.hasOwnProperty(key) === true) {
                // 建立观察者
                this.$observer[key] = new this.observer(key, this)
                var val = this.data[key]
                this.set(key, val)
            }
        }

        this.compile()


    } catch (e) {
        console.error('initView 数据绑定失败')
    }
}

//数据变化时 更新对应的dom节点
$vm.prototype.updateView = function (prop, val) {
    try {
        // 获得所有绑定这个属性的视图dom节点  取值并进行判断是对dom元素赋值还是文本更新
        $('[data-vm="' + prop + '"]').each(function () {
            var $this = $(this)
            var tag_name = $(this)[0].tagName.toLowerCase()
            if(tag_name === "input" || tag_name === "textarea" || tag_name === "select") {
                $this.val(val)
            } else {
                $this.text(val)
            }
        })
        // data-show部分
        $('[data-show="' + prop + '"]').each(function () {
            if (val) {
                $(this).show()
            } else {
                $(this).hide()
            }
        })
        // data-hide部分
        $('[data-hide="' + prop + '"]').each(function () {
            if (val) {
                $(this).hide()
            } else {
                $(this).show()
            }
        })
    } catch (e) {
        console.error('updateView 数据更新失败')
    }
}


$vm.prototype.observer = function(key, vm) {
    return {
        name: key,
        sub: [], //订阅者列表
        //添加订阅者到该属性
        add: function(fn) {
            this.sub.push(fn)
        },
        //发布
        issue: function(val) {
            if(this.sub.length !== 0) {
                // 发布通知
                this.sub.forEach(item => {
                    item()
                });
            }
        }
    }
}

$vm.prototype.compile = function () {
    var vm = this
    // this指向实例对象
    for(key in this.components) {
        var obj = this.components[key]  //组件对象
        var h = obj.h.bind(vm.data)
        obj.props.forEach(e => {
            vm.$observer[e].add(h)
        })
        h()
    }
}

