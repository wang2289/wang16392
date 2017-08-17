//读取数据结构的方式——iterator遍历器
//for...of循环
{
    let arr=['hello','world'];
    let map=arr[Symbol.iterator]();
    //数组调用iterator
    map.next()
    //done表示循环是否有下一步，true表示没有下一步
}

{
    let obj={
        start:[1,2,3],
        end:[7,8,9],
        [Symbol.iterator](){
            let self=this;
            let index=0;
            let arr=self.start.concat(self.end);
            let len=arr.length;
            return{
                next(){
                    if(index<len){
                        return {
                            value:arr[index++],
                            done:false
                        }
                    }else{
                        return{
                            value:arr[index++],
                            done:true
                        }
                    }
                }
            }
        }
    }
    for(let key of obj){
        key
    }
}

{
   let arr=['hello','world'];
   for(let value of arr){
       value
   } 
}