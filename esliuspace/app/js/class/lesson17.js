//修饰器，修改类的行为decorators

{
    //限制某个属性只读
    let readonly=function(target,name,descriptor){
        descriptor.writable=false;//只读
        return descriptor
    };

    class Test{
        @readonly//修饰器
        time(){
            return "2017"
        }
    }
    let test=new Test();
    test.time=function(){

    }
}
{
    //第三方修饰器的js库：core-decorators;
}

{
    //埋点，日志统计
    let log=(type)=>{
        return function(target,name,descriptor){
            let method=descriptor.value;
            descriptor.value=(...arg)=>{
                method.apply(target,arg);

            }
        }
    }

    class ad{
        @log('show')
        show(){

        }
        click(){

        }
    }
    let ad = new ad();
    ad.show();
    ad.click();

}
