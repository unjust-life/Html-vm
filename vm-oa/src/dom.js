// 虚拟dom挂载编译模块 仅仅是测试实验 开发中  请勿加入生产环境
$vm.prototype.$$compile = function () {
    try {
        var app = document.getElementById('app')
        // 保存虚拟dom
        this.$$dom = holdNode(app)
        //劫持所有app的子节点为fragemnt 虚拟dom 类型11
        function holdNode(node) {
            var flag = document.createDocumentFragment(),child
            // 挂载所有子节点
            while (child = node.firstChild) {
                flag.appendChild(child)
            }
            return flag
        }
    } catch (e) {
        console.error('挂载dom失败')
    }
    this.updateView()
}

$vm.prototype.updateView = function () {
    try {
        var that = this
        var reg = /\{\{(.*?)\}\}/
        var dom = this.$$dom

        // 遍历虚拟dom并进行数据渲染和替换
        traversal(dom)
        function traversal(node) {
            try {
                //文本节点渲染
                //满足节点不为空  检验存在{{}}表达式
                if (node && reg.test(node.nodeValue)) {
                    //执行替换
                    node.nodeValue = rep(node.nodeValue)
                    //替换函数
                    function rep(text) {
                        var str = text.trim()
                        do {
                            str = str.replace(reg, function () {
                                var key = arguments[1]
                                // 查找当前的值
                                try {
                                    var val = that.data[key]
                                } catch (e) {
                                    console.error(key, 'undefiend')
                                }
                                return val
                            })
                        } while (reg.test(str))
                        return str
                    }
                }
            } catch (e) {
                console.error('traversal error 表达式渲染失败')
            }

            try {
                //递归先序遍历子节点
                var childNodes = node.childNodes, item
                for(var i = 0; i < childNodes.length ; i++){
                    item = childNodes[i]
                    traversal(item)
                }
            } catch (e) {
                console.error('遍历dom树失败')
            }
        }
        document.getElementById('app').appendChild(dom)
    } catch (e) {
        console.error('视图更新失败')
    }
}
