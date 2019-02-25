(function () {
    // ES6版本  使用defineProperty实现
    // class $vm {
    //     constructor(data) {
    //         this.data = data
    //     }
    //     bindModel(this, prop, fn) {
    //         // 元编程
    //         try {
    //             Object.defineProperty(obj, prop, {
    //                 // 取值
    //                 get: function () {
    //                     return prop
    //                 },
    //                 // 存值
    //                 set(newVal) {
    //                     //如果有指定函数 执行所需的回调函数
    //                     if (fn) {
    //                         fn(newVal)
    //                     } else {
    //                         // 直接设置为value的方法
    //                         // var tag_name = dom.tagName.toLowerCase()
    //                         // if(tag_name === "input" || tag_name === "textarea" || tag_name === "select") {
    //                         //     dom.val(newVal)
    //                         // } else {
    //                         //     dom.txt(newVal)
    //                         // }
    //                     }
    //                 },
    //                 configurable: true
    //             })
    //         } catch {
    //             console.log('数据绑定失败')
    //         }
    //     }
    // }
})

// 兼容IE6 7 8低版本浏览器的数据绑定函数
// 数据绑定函数操作  因为暂时不能实现虚拟dom 所以所有涉及的操作都需要绑定函数来实现 通过观察data上的数据变化对应dom操作
// 构造函数的开始
var $vm = function (obj) {
    try {
        //写入定义的data属性
        this.data = obj.data
        // 把属性列入观察模式
        this.watch = obj.watch
        // 执行初始化方法
        this.created = obj.created
        this.methods = obj.methods
        this.created()
        $(function () {
            this.methods()
        }.bind(this))
    } catch {
        console.log('new对象失败')
    }
}
// 新增绑定的数据 prop属性名 val初始值 fn回调函数
$vm.prototype.bindModel = function (prop, val) {
    try {
        this.data[prop] = null
        this.data[prop] = val
    } catch{
        console.log(prop + '数据绑定失败')
    }
}
// 给dom快速绑定val的方法 dom指向要绑定的元素 prop是data上的属性 val是初始值
$vm.prototype.bindVal = function (dom, prop, val) {
    try {
        var that = this
        // 获得标签类型
        // var tag_name = dom.tagName.toLowerCase()
        // if(tag_name === "input" || tag_name === "textarea" || tag_name === "select") {
            dom.val(val)
        // } else {
            // dom.txt(val)
        // }
        // 执行双绑 监听dom的变化重置data数据
        dom.on("input propertychange", function (e) {
            var newVal = dom.val()
            that.set(prop, newVal)
          })
    } catch {
        console.log(prop, '数据双绑失败')
    }
}
// 取值
$vm.prototype.get = function (prop) {
    try {
        console.log(prop + '值为' + this.data[prop])
        //返回当前值
        return this.data[prop]
    } catch {
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
    } catch {
        console.log(prop + '存值失败')
    }
}
