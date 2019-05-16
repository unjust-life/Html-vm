// 兼容IE8低版本浏览器
// 构造函数的开始
var $vm = function (obj) {
    try {
        var vm = this
        this.data = obj.data
        this.watch = obj.watch
        this.created = obj.created
        this.beforeMount = obj.beforeMount
        this.mounted = obj.mounted
        this.event = obj.event
        this.components = obj.components

        this.$$observer = {} //内部  用于computed  发布者对象
        this.initObserver()  //建立观察者对象

        this.created()  //生命周期钩子 数据层处理结束 视图层未挂载 主要用于数据请求等等
        // dom加载后进行初始化
        $(document).ready(function () {
            vm.beforeMount()  //生命周期钩子 dom已挂载 事件和数据未绑定模板
            var event = vm.event.bind(vm)
            event()
            vm.initView()
            vm.mounted()    //生命周期钩子 dom已挂载  事件和数据绑定完毕  初始化结束
        })
    } catch(e) {
        console.error('error init new VM失败')
    }
}

// 取值
$vm.prototype.get = function (prop) {
    try {
        return this.data[prop]
    } catch(e) {
        console.error('error getData ' + prop)
    }
}

// 存值
$vm.prototype.set = function (prop, newVal) {
    try {
        if(this.data[prop] === undefined) {
            console.error(prop + ' is not defiend')
        }

        var oldVal = this.data[prop]
        this.data[prop] = newVal
        
        //如果属性被列入观察  执行对应函数并注入修改后的值
        try {
            if (this.watch[prop]) {
                var fn = this.watch[prop].bind(this)
                fn(newVal, oldVal)
            }
        } catch {
            console.error(prop + ' watch函数错误')
        }

        this.$$observer[prop].issue()
        // 进行视图层的对应更新
        this.updateView(prop, newVal)
    } catch(e) {
        console.error('error can not setData ' + prop)
    }
}

$vm.prototype.initObserver = function () {
    //初始化数据 渲染到页面上
    for (var key in this.data) {
        //只遍历对象自身的属性，而不包含继承于原型链上的属性。  
        if (this.data.hasOwnProperty(key) === true) {
            // 建立观察者
            this.$$observer[key] = new this.observer(key, this)
        }
    }
}


//初始化dom节点和数据层的双向绑定 使所有输入框或文本域和数据层建立联系
$vm.prototype.initView = function () {
    try {
        var that = this
        // 获得所有绑定于视图的属性  取值并进行判断是对dom元素双向绑定还是单向绑定
        // 如果是合法节点 会对其input事件进行监听
        try{
            $('[v-model]').each(function () {
                var $this = $(this)
                var prop = $(this).attr('v-model')
                //获得节点名
                var tag_name = $(this)[0].tagName.toLowerCase()
                if(tag_name === "input" || tag_name === "textarea" || tag_name === "select") {
                    // 执行双绑 监听dom的变化更新data数据
                    $this.on("input propertychange", function (e) {
                        var newVal = $this.val()
                        that.set(prop, newVal)
                    })
                } else {
                    console.error('节点不支持v-model')
                }
            })
        }catch {
            console.error('v-model绑定失败')
        }

        try{
            //初始化数据 渲染到页面上
            for (var key in this.data) {
                //只遍历对象自身的属性，而不包含继承于原型链上的属性。  
                if (this.data.hasOwnProperty(key) === true) {
                    // 建立观察者
                    var val = this.data[key]
                    this.set(key, val)
                }
            }
        }catch{
            console.error('initData 数据初始设置失败')
        }

        this.compile()

    } catch (e) {
        console.error('initView 数据绑定失败')
    }
}

//数据变化时 更新对应的dom节点
$vm.prototype.updateView = function (prop, val) {
    try {
        $('[v-text="' + prop + '"]').each(function () {
            var $this = $(this)
            var tag_name = $(this)[0].tagName.toLowerCase()
            if(tag_name === "input" || tag_name === "textarea" || tag_name === "select") {
                console.warn('节点不支持v-text')
            } else {
                $this.text(val)
            }
        })

        $('[v-model="' + prop + '"]').each(function () {
            var $this = $(this)
            var tag_name = $(this)[0].tagName.toLowerCase()
            if(tag_name === "input" || tag_name === "textarea" || tag_name === "select") {
                $this.val(val)
            } else {
                console.warn('节点不支持v-model')
            }
        })


        // data-show部分
        $('[v-show="' + prop + '"]').each(function () {
            if (val) {
                $(this).show()
            } else {
                $(this).hide()
            }
        })
        // data-hide部分
        $('[v-hide="' + prop + '"]').each(function () {
            if (val) {
                $(this).hide()
            } else {
                $(this).show()
            }
        })
    } catch (e) {
        console.error('updateView' + prop + ' 数据更新失败')
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
                for(let i = 0;i < this.sub.length; i++) {
                    this.sub[i](this.name)
                }
            }
        }
    }
}

$vm.prototype.compile = function () {
    const vm = this
    // this指向实例对象

    for(key in vm.components) {
        let component = vm.components[key]  //组件
        let h = component.render.bind(vm.data)
        
        let fn = function () {
            let dom = h()
            $(key).html(dom)
        }

        for(let i = 0;i < component.props.length; i++) {
            let prop = component.props[i]
            vm.$$observer[prop].add(fn)
        }

        fn()
    }
}