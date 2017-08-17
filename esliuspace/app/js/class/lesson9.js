{
    //声明
    let a1=Symbol();
    let a2=Symbol();

    console.log(a1===a2);//false
    //symbol声明的变量独一无二

    let a3=Symbol.for('a3');
    //检测是否全局生成过,如果定义过，则不重复定义，否则新生成一个独一无二的变量
    let a4=Symbol.for('a3');
}

{
    let a1 = Symbol.for('abc');
    let obj = {
        [a1]:'123',
        'abc':345
    }
    //即使都叫abc，也不冲突
    //用了symbol之后，entries拿不到该symbol值

    Object.getOwnPropertySymbols(obj).forEach(function(item){

    })//只能拿到symbol对象

    Reflect.ownKeys(obj);//包含symbol的值，也包含非symbol的值
    Reflect.ownKeys(obj).forEach(function(item){
        
    })
}