{
    //是否有尽
    console.log('15',Number.isFinite(15));
    console.log('0',Number.isNaN(0))
}

{
    //是否是整数
    console.log('25',Number.isInteger(25));
    console.log('25.0',Number.isInteger(25.0));
    console.log('25.1',Number.isInteger(25.1));
}

{
    //-2的53次方和2的53次方
    console.log(Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER);
    console.log('10',Number.isSafeInteger(10))
}

{
    //判断一个小数的整数部分(只取整数)
    console.log(Math.trunc(4.1))
}

{
    //判断一个数是正数，负数还是0
    console.log('-5',Math.sign(-5));
    console.log('0',Math.sign(0));
    console.log('5',Math.sign(5));
}

{
    //立方根
    console.log(8,Math.cbrt(8));
}