//promise异步操作的解决方案
//a=>回调和定义方法
{
    let ajax=function(callback){
        setTimeout(function(){
            callback&&callback.call()
        },1000);
    };
    ajax(function(){
        console.log('1');
    });
}

{
    let ajax=function(){
        return new Promise(function(resolve,reject){
            setTimeout(function(){
                resolve()
            },1000);
        })
    };

    ajax().then(function(){
        console.log('2');
    },function(){})
}

{
    
    let ajax=function(){
        return new Promise(function(resolve,reject){
            setTimeout(function(){
                resolve()
            },1000);
        })
    };
    ajax().then(function(){
       return new Promise(function(resolve,reject){
            setTimeout(function(){
                resolve()
            },2000);
        })
    }).then(function(){
        console.log('3');
    })
}

{
    let ajax=function(num){
        console.log('4');
        return new Promise(function(resolve,reject){
            if(num > 5){
                resolve();
            }else{
                throw new Error('出错');
            }
        })
    }

    ajax(6).then(function(){
        6
    }).catch(function(err){
        err
    })

    ajax(3).then(function(){
        3
    }).catch(function(err){
        err
    })
}

//promise的高级用法
{
    //所有图片加载完再添加到页面
    function loadImg(src){
        return new Promise((resolve,reject)=>{
            let img=document.createElement('img');
            img.src=src;
            img.onload= function(){
                resolve(img);
            }
            img.onerror=function(err){
                reject(err);
            }
        })
    }
    function showImgs(imgs){
        img.forEach(function(img){
            codument.body.appendChild(img);
        })
    }
    Promise.all([
        loadImg('http://img/jkjsdk.jpg'),
        loadImg('http://img/jkjsdk.jpg'),
        loadImg('http://img/jkjsdk.jpg')
    ]).then(showImgs)
    //把所有promise对象当成一个promise对象
    //当三张图片都加载进来之后，才触发showimg的方法，即显示图片
}
{
    //有一个图片加载完再添加到页面
    function loadImg(src){
        return new Promise((resolve,reject)=>{
            let img=document.createElement('img');
            img.src=src;
            img.onload= function(){
                resolve(img);
            }
            img.onerror=function(err){
                reject(err);
            }
        })
    }
    function showImgs(imgs){
        let p=document.createElement('p');
        p.appendChild(img);
        document.body.appendChild(p);
    }
    Promise.race([
        loadImg('http://img/jkjsdk.jpg'),
        loadImg('http://img/jkjsdk.jpg'),
        loadImg('http://img/jkjsdk.jpg')
    ]).then(showImgs)
    //只要有一个加载进来，其他的都不用管
}
