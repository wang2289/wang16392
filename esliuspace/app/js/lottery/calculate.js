class Calculate{
    //计算注数
    computeCount(active,play_name){
        //当前选中的号码，玩法标志
        let count=0;
        const exist=this.play_list.has(play_name);
        //玩法列表中是否存在play_name;play_list是一个map类型
        const arr=new Array(active).fill('0');
        //长度为active的数组,且默认值为0
        if(exist && play_name.at(0) === 'r'){
            count=Calculate.combine(arr,play_name.split('')[1]).length;
        }
        return count;
    }
    //奖金范围预测
    computeBonus(active,play_name){
        //当前选中号码，当前玩法标识
        //返回奖金范围
        const play= play_name.split('');
        const self=this;
        let arr=new Array(play[1]*1).fill(0);
        let min,max;
        if(play[0]==="r"){
            let min_active=5-(11-active);
            if(min_active>0){
                if(min_active-play[1]>=0){
                    arr=new Array(min_active).fill(0);
                    min=Calculate.combine(arr,play[1]).length;
                }else{
                    if(play[1]-5>0&&active-play[1]>=0){
                        arr=new Array(active-5).fill(0);
                        min=Calculate.combine(arr,play[1]-5).length;
                    }else{
                        min=active-play[1]>-1?1:0
                    }
                }
            }else{
                min = active-play[1]>-1?1:0;
            }

            let max_active=Math.min(active,5);
            if(play[1]-5>0){
                if(active-play[1]>=0){
                    arr = new Array(active-5).fill(0);
                    max=Calculate.combine(arr,play[1]-5).length;
                }else{
                    max=0;
                }
            }else if(play[1]-5<0){
                arr=new Array(Math.min(active,5)).fill(0);
                max=Calculate.combine(arr,play[1]).length;
            }else{
                max=1;
            }
        }
        return [min,max].map(item=>item*self.play_list.get(play_name).bonus)
    }
    //组合运算,参与组合运算的数组，组合运算的基数
    //静态方法功能
    static combine(arr,size){
        let allResult=[];
        (function f(arr,size,result){
            let arrLen=arr.length;
            if(size>arrLen){
                return;
            }
            if(size===arrLen){
                allResult.push([].concat(result,arr));
            }else{
                for(let i=0;i<arrLen;i++){
                    let newResult=[].concat(result);
                    newResult.push(arr[i]);
                    if(size === 1){
                        allResult.push(newResult)
                    }else{
                        let newArr=[].concat(arr);
                        newArr.splice(0,i+1);
                        f(newArr,size-1,newResult);
                        //递归用匿名函数
                    }
                }
            }
        })(arr,size,[])
        return allResult
        
    }
}

export default Calculate