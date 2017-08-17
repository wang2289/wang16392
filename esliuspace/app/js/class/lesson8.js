{
    //简洁表达法
    let o=1;
    let k=2;
    let es5 = {
        o:o,
        k:k
    }//es5中表达方式
    let es6={
        o,
        k
    }//es6写法

    //对象中有方法
    let es6_method = {
        hello(){
            console.log('hello');
        }
    }
}

{
    //属性表达式
    let a='b';
    let es6_obj = {
        [a]:'c'
    }
}

{
    Object.is('abc','abc')//判断两个字符串是否相等
    Object.is([],[])//数组是引用类型，不相等

    Object.assign({a:'a'},{b:'b'})//拷贝，将b拷贝到a;浅复制
    let test = {k:123,o:456};
    for(let [key,value] of Object.entries(test)){
        console.log([key,value]);
    }
}

{
    let {a,b,...c} = {a:'1',b:'2',c:'3',d:'4'};
}