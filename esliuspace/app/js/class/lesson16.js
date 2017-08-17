{
    let tell=function* (){
        yield 'a';
        return 'c'
    }
    let k=tell();

}

{
    //状态基
    let state=function* (){
        while(1){
            yield 'a';
            yield 'b';
        }
    }
    let status=state();
}

{
    //抽奖次数限制
    let draw=function(count){
        //具体抽奖逻辑
        console.info(`剩余${count}次`);
    }

    let residue=function* (count){
        while(count>0){
            count--;
            yield draw(count);
        }
    }

    let star=residue(5);
    let btn = document.createElement('button');
    btn.id='start';
    btn.textContent="抽奖";
    document.body.appendChild(btn);
    document.getElementById('start').addEventListener('click',function(){
        star.next();
    },false)
}