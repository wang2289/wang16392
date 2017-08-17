//数据结构，数组和对象
//对比
{
    //横向对比，增，删，改，查
    let map= new Map();
    let array=[];
    //增
    map.set('t',1);
    arry.push({t:1});
    //查
    let exists=map.has('t');
    let exist=arry.find(item=>item.t);
    //改
    map.set('t',2);
    array.forEach(item=>item.t?item.t=2:"")
    //删
    map.delete('t');
    let index = array.findIndex(item=>item.t);
    array.splice(index,1);
    //
}

{
    //set和array的对比
    let set= new Set();
    let array = [];

    //增
    set.add({t:1});
    array.push({t:1});
    //查
    let exists=set.has({t:1});//false
    let exist=arry.find(item=>item.t);

    //改
    set.forEach(item=>item.t?item.t=2:'')
    array.forEach(item=>item.t?item.t=2:"")

    //删
    set.forEach(item=>item.t?set.delete(item):'')
    let index = array.findIndex(item=>item.t);
    array.splice(index,1);
}
{
    let item = {t:1};
    let map = new Map();
    let set = new Set();
    let obj = {};

    //增
    map.set('t',1);
    set.add(item);
    obj['t']=1;
    //查
    map.has('t');
    set.has(item);
    't' in obj
    //改
    map.set('t',2);
    item.t=2;//存储过后可以这么用，否则只能用foreach
    obj['t'] = 2;

    //删除
    map.delete('t');
    set.delete(item);
    delete obj['t'];
    //map使用成本低，且方便
    //综上总结：能使用map，使用map。如果有唯一性要求，使用set
}