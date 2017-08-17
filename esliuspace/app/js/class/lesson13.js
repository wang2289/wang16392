//类和对象
{
    //基本定义和生成实例
    class Parent{
         constructor(name = 'mukewang'){
             this.name=name;
         }
    }
    let v_parent = new Parent('v');
}
{
    //继承传递参数
    class Parent{
         constructor(name = 'mukewang'){
             this.name=name;
         }
    }
    class Child extends Parent{
        constructor(name='child'){
            super(name);//覆盖父类的参数
            this.type='child';
            //如果子类要增加自己的属性,一定要写在super之后

        }
    }
    new Child('hello')
}
{
    class Parent{
         constructor(name = 'mukewang'){
             this.name=name;
         }
        get longName(){
            return 'mk' + this.name
        }
        set longName(value){
            this.name = value;
        }
    }
    let v = new Parent();
    v.longName='hello';
}

{
    //静态方法
  class Parent{
         constructor(name = 'mukewang'){
             this.name=name;
         }
         static tell(){
             console.log('tell');
         }
    }  
    Parent.tell();
}
{
    //静态属性
    class Parent{
         constructor(name = 'mukewang'){
             this.name=name;
         }
         static tell(){
             console.log('tell');
         }   
    }  
    Parent.type="test";
    console.log(Parent.type);
}