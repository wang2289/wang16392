{
    function test(x,y = 'world'){
        //参数默认值
        console.log(x,y);
    }
}

{
    let x='test';
    function test2(x,y=x){
        console.log(x,y);
    }
    test2('kill')
    test2('')//输出undefined undefined
}