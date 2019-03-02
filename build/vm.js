// v0.13
var $vm = function (obj) {
    try {
        var that = this
        // 覆盖默认值
        this.data = obj.data
        this.watch = obj.watch
        this.created = obj.created
        this.computed = obj.computed
        this.methods = obj.methods
        this.$$fn = {}   //隐藏的观察者函数 用于watch
        this.$$count = {}//隐藏的订阅  用于computed
        $(document).ready(function () {
            that.created() //初始化绑定
            that.methods() //初始化方法作用域绑定事件
            // 是否初始化更新所有值 默认是  initSet属性控制开关    如果页面是服务端渲染首次数据，建议关闭
            if (!obj.initSet) {
                for (var key in that.data) {
                    //只遍历对象自身的属性，而不包含继承于原型链上的属性。  
                    if (that.data.hasOwnProperty(key) === true) {
                        var val = that.data[key]
                        that.set(key, val)
                    }
                }
            }
        })
    } catch(e) {
        console.log('error init')
    }
}
// 给dom快速绑定val的方法 dom指向要绑定的元素 prop是需绑定的属性名
$vm.prototype.bindVal = function (dom, prop) {
    try {
        var that = this
        // 订阅对象 隐藏函数  如果订阅的值发生改变就会通知所有dom
        that.$$fn[prop] = function (newVal, oldVal) {
            dom.each(function () {
                var $this = $(this)
                var tag_name = $(this)[0].tagName.toLowerCase()
                if(tag_name === "input" || tag_name === "textarea" || tag_name === "select") {
                    $this.val(newVal)
                } else {
                    $this.text(newVal)
                }
            })
        }
        // 获得标签类型
        dom.each(function () {
            var $this = $(this)
            var tag_name = $(this)[0].tagName.toLowerCase()
            // 如果是合法类型就监听oninput事件来反馈数据实时变化
            if(tag_name === "input" || tag_name === "textarea" || tag_name === "select") {
                // 执行双绑 监听dom的变化重置data数据
                $this.on("input propertychange", function (e) {
                    var newVal = $this.val()
                    that.set(prop, newVal)
                })
            }
        })
    } catch(e) {
        console.log('error bindVal', prop)
    }
}
// 计算属性
$vm.prototype.watchVal = function (arr) {
    try {
        // 获得计算属性名
        var prop = arr[0]
        // 获得初始值 并赋予data
        this.data[prop] = this.computed[prop]()
        // 记录它的所有依赖
        for (var i = 1; i < arr.length; i++) {
            // 记录每个依赖属性名 并写入$$count的同名属性的数组依赖项 当该属性发生变化 会依次通知数组里所有的属性
            var watchProp = arr[i]
            if (this.$$count[watchProp] === undefined) {
                this.$$count[watchProp] = []
                this.$$count[watchProp].push(prop)
            } else {
                this.$$count[watchProp].push(prop)
            }
        }
    } catch {
        console.log('error computed')
    }

}
// 取值
$vm.prototype.get = function (prop) {
    try {
        // console.log(prop + '值为' + this.data[prop])
        //返回当前值
        return this.data[prop]
    } catch(e) {
        console.log('error getData' + prop)
    }
}
// 存值
$vm.prototype.set = function (prop, val) {
    try {
        var oldVal = this.data[prop]
        this.data[prop] = val

        //如果发现被列入观察者  执行函数并注入修改后的值
        if (this.watch[prop]) {
            this.watch[prop](val, oldVal)
        }
        //查询是否有订阅值
        if (this.$$fn[prop]) {
            this.$$fn[prop](val, oldVal)
        }
        //查询是否有依赖于此项的计算属性
        if (this.$$count[prop]) {
            // 获得所有依赖此值的计算属性
            var arr = this.$$count[prop]
            //循环遍历每个计算属性并重新计算它的值
            for (var i = 0; i < arr.length; i++) {
                var item = arr[i]
                // 获得返回的值
                this.data[item] = this.computed[item]()
            }
        }
    } catch(e) {
        console.log('error setData' + prop)
    }
}