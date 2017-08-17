//数据结构
//set集合，set里面的元素不能重复
//map，object、key可以事任意数据类型

{
    let list = new Set();//set定义方法一
    list.add(7);//增加元素
    list.size;//相当于数组的length
}
{
    let arr = [1,2,3,4];
    let list = new Set(arr);//se定义方法二
}
{
    let list = new Set();
    list.add(1);
    list.add(1);//重复元素不生效，可以用来去重
    //不做数据类型的判断
}
{
    let arr=['add','delete','clear']
    let list = new Set(arr);

    list.has('add');
    list.clear();
    list.delete('add');
}

{
    let arr=['add','delete','clear']
    let list = new Set(arr);

    for(let key of list.keys()){
        key;
    }
    for(let value of list.values()){
        value;
    }
    for(let value of list){
        value;
    }
    for(let [key,value] of list.entries()){
        value;
    }
    list.forEach(function(item){
        item;
    })
}

{
    let weakList=new WeakSet();
    //set和weakset支持的不一样，weakset只能支持对象，且是一个引用类型
    //weakset没有size属性,没有clear方法，不能遍历
    let arg = {};
    weakList.add(arg);    
}

{
    let map = new Map();
    let arr=['123'];
    map.set(arr,345);//map用set添加方法，任何值都可以做key值
    map
    map.get(arr)//取值用get值
}
{
    let map = new Map([['a',123],['b',345]])
    map.size;
    map.delete('a');
    map.clear();
}

{
    let weakmap = new WeakMap();
    let o={};
    weakmap.set(o,123);
}
//