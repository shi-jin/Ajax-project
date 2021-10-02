// 封装处理data函数的方法，传递data对象
function resolveData(data) {
    var arr = []
        // 循环对象上每一个属性
    for (var k in data) {
        // 拼接字符串k=v
        var str = k + '=' + data[k]
        arr.push(str)
    }
    // 生成的键值对用&拼接
    return arr.join('&')
}

// var res = resolveData({ name: 'zs', age: 20 })
// console.log(res)

// 封装一个函数，接收参数对象options
function itheima(options) {
    var xhr = new XMLHttpRequest()

    // 1.调用外界传递过来的参数对象，转换为 查询拼接字符串
    var qs = resolveData(options.data)

    //2.拿到查询参数，开始发起请求，method可能是大写也可能是小写，这里统一转换成大写 如果转成大写后是get
    if (options.method.toUpperCase() === 'GET') {
        // 发起GET请求，用open指定请求类型
        xhr.open(options.method, options.url + '?' + qs)
        xhr.send()
    } else if (options.method.toUpperCase() === 'POST') {
        // 发起POST请求
        xhr.open(options.method, options.url)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            // 提交查询参数  post请求，参数要提交到send里面
        xhr.send(qs)
    }

    //2. 监听请求状态改变的事件，拿到响应的数据
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) { //如果判断成立，说明服务器响应了一些数据，数据在xhr.responseText上面存着，把（Text是json字符串）转为对象
            var result = JSON.parse(xhr.responseText)
                // 调用options里面的回调success，帮用户执行成功以后的操作
            options.success(result)
        }
    }
}