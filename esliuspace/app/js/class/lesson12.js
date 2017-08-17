//proxy和reflect，代理和反射，反射object，两者方法一样
{
    let obj= {
        time:'2017',
        name:'net',
        _r:123
    }//原始数据对象
    let monitor= new Proxy(obj,{
       //拦截对象属性的读取
        get(target,key){
            return target[key].replace('2017','2018')
            //不管读什么值，都把2017替换成2018
        },
        //拦截对象，设置属性
        set(target,key,value){
            //只允许修改name属性
            if(key === 'name'){
                return target[key] = value;
            }else{
                return target[key];
            }
        },
        //判断是否存在某个元素
        has(target,key){
            if(key === "name"){
                return target[key]
            }else{
                return false;
            }
        },
        //拦截删除
        deleteProperty(target,key){
            if(key.indexOf('_')>-1){
                delete target[key];
                return true;
            }else{
                return target[key]
            }
        },
        //拦截object.leys,object.getownpropertySymbols,object.getOwnPropertyNames
        ownKeys(target){
            return Object.keys(target).filter(item=>item!='time')
        }        
    })//代理原始数据
    monitor.time;//用户访问的对象
    monitor.time = '2018';//修改不成功
}

{
     let obj= {
        time:'2017',
        name:'net',
        _r:123
    }//原始数据对象
    Reflect.get(obj,'time')
}
{
    function validator(target,validator){
        return new Proxy(target,{
            _validator:validator,
            //代理控制
            set(target,key,vlaue,proxy){
                if(target.hasOwnProperty(key)){
                    let va=this._validator[key];
                    if(!!va(value)){
                        return Reflect.set(target,key,vlaue,proxy)
                    }else{
                       throw Error(`不能设置${key}到${value}`); 
                    }
                }else{
                    throw Error(`${key} 不存在`);
                }
            }
        })
    }

    const personValidators={
        name(val){
            return typeof val==="string"
        },
        age(val){
           return typeof val ==='number' && val>18
        }
    }

    class Person{
        constructor(name,age){
            this.name=name;
            this.age=age;
            return validator(this,personValidators);
        }
    }

    const person = new Person('lileii',30);

    person.name = 48;
}