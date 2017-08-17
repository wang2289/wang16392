{
    console.log('a',`\u0061`);
}
{
    let str="abc";
    console.log(str.repeat(2));
}
{
    let name="list";
    let info = "hello world";
    let m = `i am ${name},${info}`;
    console.log(m);
}
{
    console.log('1'.padStart(2,'0'));
    console.log('1'.padEnd(2,'0'));
}

{
    let user={
        name:'list',
        info:"hello world"
    };
    console.log(abc`i am ${user.name},${user.info}`);
    function abc(s,v1,v2){
        console.log(s,v1,v2);
    }
}