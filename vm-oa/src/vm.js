// 兼容IE8低版本浏览器的数据绑定函数
// 构造函数的开始
var $vm = function (obj) {
    try {
        var that = this
        // 覆盖默认值
        this.data = obj.data
        this.computed = obj.computed
        this.watch = obj.watch
        this.created = obj.created
        this.methods = obj.methods
        this.$$issue = {} //内部  用于computed  发布者对象
        // dom加载后进行初始化
        $(document).ready(function () {
            that.created()  //执行生命周期 主要用于计算属性的订阅 ajax请求数据等等
            //初始化视图层和数据层的双向绑定方法initView 使view和model层对应  并使data里的初始值渲染到视图上 会执行一次watch和计算属性
            that.initView() 
            // 如果页面是服务端渲染 请执行initSsrView方法 从视图层获得初始data数据 所有的watch和计算属性不会进行初次计算
            // that.initSsrView() 
            that.methods()  //仅仅提供一个事件存放的对象 类似于vue 便于维护
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
            this.watch[prop](newVal, oldVal)
        }

        //如果此属性存在订阅者 给每个订阅者发布更新通知
        if (this.$$issue[prop]) {
            // 获得订阅者数组
            var arr = this.$$issue[prop]
            // 通知每个订阅者重新进行计算
            for (var i = 0; i < arr.length; i++) {
                var item = arr[i]
                // 获得返回的值
                var res = this.computed[item]()
                // 触发更新变化
                this.set(item, res)
            }
        }
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











        //初始化设置数据 渲染到页面上
        for (var key in that.data) {
            //只遍历对象自身的属性，而不包含继承于原型链上的属性。  
            if (that.data.hasOwnProperty(key) === true) {
                var val = that.data[key]
                that.set(key, val)
            }
        }
    } catch (e) {
        console.error('initView 数据绑定失败')
    }
}

//用于服务端初始化渲染 从页面上获得初始数据并更新数据层
$vm.prototype.initSsrView = function () {
    try {
        var that = this
        // 获得所有绑定于视图的属性  取值并进行判断是对dom元素双向绑定还是单向绑定
        // 如果是合法节点 会对其input事件进行监听
        $('[data-vm]').each(function () {
            var $this = $(this)
            var prop = $(this).attr('data-vm')

            //获得节点名
            var tag_name = $(this)[0].tagName.toLowerCase()
            if(tag_name === "input" || tag_name === "textarea" || tag_name === "select") {
                //从视图获得数据
                var newVal = $this.val()
                //对data进行初始化赋值
                that.data[prop] = newVal
                // 执行双绑 监听dom的变化更新data数据
                $this.on("input propertychange", function (e) {
                    var newVal = $this.val()
                    that.set(prop, newVal)
                })
            } else {
                //对data进行初始化赋值
                var newVal = $this.text()
                that.data[prop] = newVal
            }
        })
    } catch (e) {
        console.error('initSsrView 服务端数据双向绑定失败')
    }
}


//数据变化时 更新对应的dom节点
$vm.prototype.updateView = function (prop, val) {
    try {
        var that = this
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


// 计算属性  每个计算属性对它依赖的属性进行订阅  在其改变时发布者会发出通知 订阅者进行更新
$vm.prototype.watchVal = function (arr) {
    try {
        // 获得计算属性名  计算得出初始值  在data上进行备份
        var prop = arr[0]
        this.data[prop] = this.computed[prop]()

        // 记录这个计算属性所有依赖的属性，并添加到各自的订阅数组
        // 每个data上的属性有一个同名的发布者函数issue  在这个属性变化后会进行发布通知  在这个函数内部的数组是参与的订阅者  每个数组中的订阅者都能在issue触发时获得通知
        for (var i = 1; i < arr.length; i++) {
            var watchProp = arr[i]
            // 如果没有被订阅过 则初始化数组 否则直接向数组添加订阅者
            if (this.$$issue[watchProp] === undefined) {
                this.$$issue[watchProp] = []
                this.$$issue[watchProp].push(prop)
            } else {
                this.$$issue[watchProp].push(prop)
            }
        }
    } catch {
        console.error('error computed watchVal')
    }
}