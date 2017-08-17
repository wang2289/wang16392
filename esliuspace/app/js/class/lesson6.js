{
    let arr = Array.of(2,3,34,5,4);//返回一个数组
    let empty = Array.of();//返回空数组
}
{
    let p = document.querySelectorAll('p');
    let pArr = Array.from(p);
    pArr.forEach(function(item){
        console.log(item.textContent);
    })
    console.log(Array.from([1,3,5],function(item){return item*2}));
}
{
    console.log('fill-7',[1,'a',undefined].fill(7));//全部替换成7
    console.log('fill,pos',['a','b','c'].fill(7,1,3));//从1开始，到3的位置截止，替换成7
}

{
    for(let index of ['1','c','ks'].keys()){

    }
}