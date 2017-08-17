import $ from 'jquery';
class Interface{
    //获取遗漏数据
    getOmit(issue){
        let self=this;
        return new Promise((resolve,reject)=>{
            $.ajax({
                url:'/get/omit',
                data:{
                    issue:issue
                },
                dataType:'json',
                success:function(res){
                    self.setOmit(res.data);
                    resolve.call(self,res) 
                },
                error:function(err){
                    reject.call(err);
                }
            })
        })
    }
    //获取开奖号码
    getOpenCode(issue){
        let self=this;
        return new Promise((resolve,reject)=>{
            $.ajax({
                url:'/get/opencode',
                data:{
                    issue:issue
                },
                dataType:'json',
                success:function(res){
                    self.setOpenCode(res.data);
                    //避免回调，通过对象的方法调用数据，返回promise达到异步操作
                    resolve.call(self,res)
                },
                error:function(err){
                    reject.call(err);
                }
            })
        });
    }
    getState(issue){
        let self=this;
        return new Promise((resolve,reject)=>{
            $.ajax({
                url:'/get/state',
                data:{
                    issue:issue
                },
                dataType:'json',
                success:function(res){
                    resolve.call(self,res)
                },
                error:function(err){
                    reject.call(err);
                }
            })
        });
    }
}
export default Interface