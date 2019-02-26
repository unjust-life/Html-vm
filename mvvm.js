// 兼容IE8低版本浏览器的数据绑定函数
// 为了不影响页面服务端渲染 对项目本身代码产生影响 最后还是放弃对dom进行整体的拦截和编译 所以涉及的操作都需要函数式编程来实现最大兼容 框架本身不会对原有代码产生影响
// 构造函数的开始
var $vm = function (obj) {
    try {
        //写入传入的对象
        this.data = obj.data
        this.watch = obj.watch
        this.created = obj.created
        this.methods = obj.methods
        this.$$fn = {}
        $(function () {
            // dom加载后进行初始化
            this.created()
            this.methods()
            // 设置初始值
            for (var key in this.data) {
                //只遍历对象自身的属性，而不包含继承于原型链上的属性。  
                if (this.data.hasOwnProperty(key) === true) {
                    var val = this.data[key]
                    this.set(key, val)
                }
            }
        }.bind(this))
    } catch(e) {
        console.log('new对象失败')
    }
}
// 新增绑定的数据 prop属性名 val初始值
$vm.prototype.bindModel = function (prop, val) {
    try {
        this.data[prop] = val
    } catch(e){
        console.log(prop + '数据绑定失败')
    }
}
// 给dom快速绑定val的方法 dom指向要绑定的元素 prop是需绑定的属性名 val是初始值
// 
$vm.prototype.bindVal = function (dom, prop, val) {
    try {
        var that = this
        // 订阅对象 隐藏函数  如果订阅的值发生改变就会通知所有dom
        that.$$fn[prop] = function (newVal) {
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
            // 如果是合法类型就赋值并监听数据实时变化
            if(tag_name === "input" || tag_name === "textarea" || tag_name === "select") {
                $this.val(val)
                // 执行双绑 监听dom的变化重置data数据
                $this.on("input propertychange", function (e) {
                    var newVal = $this.val()
                    that.set(prop, newVal)
                })
                //如果不是则进行写入文本
            } else {
                $this.text(val)
            }
        })
    } catch(e) {
        console.log(prop, '数据双绑失败')
    }
}
// 取值
$vm.prototype.get = function (prop) {
    try {
        // console.log(prop + '值为' + this.data[prop])
        //返回当前值
        return this.data[prop]
    } catch(e) {
        console.log(prop + '取值失败')
    }
}
// 修改值
$vm.prototype.set = function (prop, val) {
    try {
        if (!this.data[prop] === undefined) {
            console.log(prop + '未定义')
            return
        } else {
            // 修改对象上的属性
            this.data[prop] = val
        }
        // 如果有回调 同时执行绑定的函数
        // if (this.fn[prop]) {
        //     this.fn[prop](val)
        // } else {
        //     // console.log(prop + '未在fn上指定对应函数')
        // }
        //如果发现被列入观察者  执行函数并注入修改后的值
        if (this.watch[prop]) {
            this.watch[prop](val)
        }
        //查询是否有订阅值
        if (this.$$fn[prop]) {
            this.$$fn[prop](val)
        }
    } catch(e) {
        console.log(prop + '存值失败')
    }
}