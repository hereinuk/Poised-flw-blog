---
layout: post
title: "Javascript编码风格"
description: "解决问题固然重要, 但是代码的可读性更重要"
category: javascript
tags: ['编码风格']
---
{% include JB/setup %}

像我这种第一们语言是C的程序猿,接触到JS的时候也秉承着C的风格;直到看了开源社区那
些让人痴迷的代码风格以后,决定彻头彻尾的改变自己编写js
代码的规范!本篇中主要的规范都来自于[《Maintainable JavaScript》](http://book.douban.com/subject/21792530/)
by [Nicholas C. Zakas](http://book.douban.com/search/Nicholas%20C.%20Zakas).

介绍两个非常有用的工具:[JSLint](http://www.jslint.com/), [JSHint](http://www.jshint.com/).

## 缩进问题

推荐两种风格的缩进

1. 4个空格: 这种缩进的好处是在任何的编辑器下表现的方式是一致的!

2. Tab缩进: 经常使用的缩进方式, 但是在有些编辑器中表现的形式并不一样, 一般是4个空格, 但有些编辑器会解释成8个空格等等...

## 语句的结尾

在某些情况下,省略掉语句后面的分号是能正常解释执行的:


    //解释器会自动在结尾加上分号
    //var name = "Poised-flw";

    var name = "Poised-flw" 
    function sayName() {
    　　alert( name )
    } 

但是下面的这种情况不会得到预期的结果:

    function returnSomeThing() {
        return
        {
            author: "Poised-flw",
            age: 20
        }
    }

    //最终将被解释成如下的格式
    function returnSomeThing() {
        return;
        {
            author: "Poised-flw",
            age: 20
        }
    }

所以推荐,**最好在没一行结束的时候都加上分号**,避免错误的发生!

## 换行

由于屏幕分辨率的限制,当代码的行长过长的时候,某些部分是会自动隐藏(有些编译器出现导航条),比如vim编辑器,当行过长的时候阅读和编码的时候很不方便,因为当光标在行尾的时候上下移动时会出现跳频的现象!所以推荐每行最多显示80个字母!

当需要显示的内容超过最大长度的时候就要把它分为两行或者更多行显示.分割的依据是:
在**操作符号后**进行分割,并且**下一行和上一行之间应该有两个缩进**.

    // Good: 在操作符后进行换行,并且下一行和上一行之间有两倍的缩进
    callAFunction(document, element, window, "some string value", true, 123,
    　　　　navigator);

    // Bad: 上一行和下一行之间只有一个缩进
    callAFunction(document, element, window, "some string value", true, 123,
    　　navigator);

    // Bad: 在操作符前进行了换行
    callAFunction(document, element, window, "some string value", true, 123
    　　　　, navigator);

在if语句中也可以使用相同的换行方法:

    if (isLeapYear && isFebruary && day == 29 && itsYourBirthday &&
            noPlans) {
        waitAnotherFourYears();    //注意: 这里的缩进是相对于if的第一行而非第二行
    }

还有就是在赋值语句中,当换行发生时: 

    var result = something + anotherThing + yetAnotherThing + somethingElse +
                 anotherSomethingElse;
 
下一行的开始和上一行的第一个赋值变量开始处对齐! 

## 适当的空行

在if/for这样的控制语句下加一行空行

    if ( contition ) {

        for ( condition ) {
            var str,
                arr;

            if( condition ) {
                //doSomeThing
            }
        }
    }

在**两个函数**之间加一个空行

    // 函数1
    function fun1() {
    　　// doSomeThing
    }

    // 函数2
    function fun2() {
    　　// doSomeThing
    }

在函数内部的**局部变量声明与第一条语句之间**加入一个空行

    function fun() {
    　　var i,
    　　    base = 10;

    　　for( i = 1; i < base; ) {
    　　　　console.log( i++ );
    　　}
    }

对于一个方法中的**两个不同逻辑部分之间**加入一个空行提高代码的阅读性!

## 命名规则

变量或者方法都按驼峰似进行命名,而且**变量最好以名词开头**,而**方法以动词开头**!

    var thisIsMyName;　　// 这就是一个变量命名
    getValue();　　// 这就是一个方法

在能体现变量意义的前提下使变量名尽可能的短;

尽量能做到见变量名就知道变量的类型;

    count, length, size;　　// Number
    name, title, message;　　// String

像i, j, k这样的变量最好只用在循环结构中;

避免使用一些没有实际意义的变量名,因为读者在不了解代码结构上下文环境的情况下是不知道这些变量的用途的!

    // 如foo, bar, temp.在不清楚他们的使用范围的时候, 你无法猜测他们具体代表的什么

对于方法的命名,要求第一个单词尽量是动词,下面是一些常用的动词和代表意义:

    动词	意义
    can	    返回一个Boolean的方法
    has	    返回一个Boolean的方法
    is	    返回一个Boolean的方法
    get	    返回一个非Boolean的方法
    set	    通常用于存储值的方法

对于**常量**: 通常使用大写字母, 多个单词之间用下划线连接

    var MAX_LENGTH = 10;
    var URL = "www.cnblogs.com/Poised-flw";

对于**构造函数**: 每个单词的首字母都应该大写以区别普通的方法.

    var me = new Person( "Poised-flw" );

对于**字符串**: 使用分号或者双引号都可以, 二者间的嵌套不需要转义, 但相同的嵌套需要转义

    // 不需要转义
    var str = 'This is a test "String";';

    // 需要转义
    var str = "This is a test \"string\";";

对于`null`和`undefined`: `null`常用来初始化一个变量

    var test;
    typeof test;　　//undefined
    var test2 = null;
    typeof test2;　　//Object

声明对象常量, 数组常量的时候最好不要使用`new`.

    // Bad: 最好不要使用new创建实例
    var obj = new Object();
    var arr = new Array();

    // Good: 这样更直接, 推荐用法
    var obj = {};
    var arr = [];

## 注释

**对于单行注释**

1 .在注释块的前面应该有一个空行, 并且和注释的部分要有相同的缩进 

    function test() {

    　　// this is a block comments
    　　if( condition ) {
    　　　　// doSomeThing
    　　}
    }

2. 双斜线后面有一个空格,如上的注释!

3. 对于行尾的注释最好有一个缩进

    var arr = [ 1, 2, 3, 4, 5, 6, 7 ];　　//我这里有一个Tab缩进

4. 当需要注释的部分有很多行的时候最好采用多行注释.

**对于多行注释**

1. 跟单行注释一样, 在每个注释的块前留一个空行, 并且和注释的部分有相同的缩进.

2. 在行尾的注释中最好不要使用多行注释的方式!

3. 多行注释的格式如下:

    /*
     * 每行以*开头,并且*后面有一个空格
     * 第二行注释
     * 第三行注释
     * ...
    */

对于vim编辑器, 这些部分是会自动插入的!

4. 对于一些文档性的注释, 更倾向于这种方式

    /*
     * some description
     * @author    Poised-flw
     * @param    Array    arr    一个名叫arr的数组
     * @param    String    str    一个名叫str的字符串
     * @return    Object    obj    返回一个名叫obj的对象
     * */

5. 对于意义已经较明确的语句不需要再添加注释, 但对于难以理解的代码则必须使用注释 

## 语句和表达式

**大括号的使用**

即使块(`if/for/while/do...while/try...catch...finally`)中只有一条语句, 也建议使用括号括起来

    function test() {
    　　var i = 1;

    　　if ( i === 1 ) {
    　　　　console.log( i-- );
    　　} else {
    　　　　i ++;
    　　}
    }

至于括号应该怎么放, 看个人的爱好.

    if ( condition ) {　　// Java style

    }

    if ( condition )　　//C#中较流行
    {

    }

空格怎么使用也是自己的爱好.

    // if的括号前后均没空格,小括号和大括号之间也没有空格
    if(condition){
    　　doSomething();
    }

    // 左小括号和if间有空格, 小括号和大括号之间也有空格, 本书作者推荐这种写法
    if (condition) {
    　　doSomething();
    }

    // 最洁癖!所有括号的左右都有一个空格, jQuery采用这种方式,本人也比较喜欢这种!
    if ( condition ) {
    　　doSomething();
    }

`switch`语句:  每个`case`都要以`break(return, throw)`结尾!最好有一个`default`,若没有应该加一行注释加以说明

    switch ( condition ) {
    　　case "first":
    　　　　// code
    　　　　break;
    　　case "second":
    　　　　// code
    　　　　break;
    　　default:
    　　　　// code
    }

避免使用`with`语句

对于`for`语句: 尽可能的避免使用`continue`, 而改用条件去控制, 给出的解释是: 这样让代码更具有可读性, 且不容易发生错误!

    var values = [ 1, 2, 3, 4, 5, 6, 7 ],
    　　 i, len;

    for ( i=0, len=values.length; i < len; i++ ) {
    　　
    　　// 跳过i=2这一次
    　　if ( i == 2 ) {
    　　　　continue;
    　　}
    　　process( values[ i ] );
    }

    // 换一种方式,意义更明确
    for ( i=0, len=values.length; i < len; i++ ) {

    　　// 这样表达的意思更明确
    　　if ( i != 2 ) {
    　　　　process( values[ i ] );
    　　}
    }

对于`for-in`循环: 不但遍历自身的属性, 还会遍历继承得到的属性, 使用它的时候最好
和`hasOwnProperty()`方法一起使用(除非你有意想遍历原型链上的属性, 这时最好留下一个注释加以说明).

    var prop;

    for ( prop in object ) {

    　　if ( object.hasOwnProperty( prop ) ) {
    　　　　console.log( "Property name is " + prop );
    　　　　console.log( "Property value is " + object[ prop ] );
    　　}
    }

注意: 最好**不要用for-in来迭代数组**, 解释是: `for-in`会迭代包括继承得到的属性, 所以这些属性可能并不都是数组的数字下标, 所以可能会导致一些潜在的问题!

## 变量, 方法的声明

一个环境(如在一个函数中)中, **变量的声明是被优先执行**的, 而跟变量的声明地点没有关系 

    function soSomething() {
    　　var result = 10 + value;
    　　var value = 10;

    　　return result;　　// NaN
    }

    // 等同于
    function soSomething() {

    　　// 所有变量被优先声明
    　　var result;
    　　var value

    　　result = 10 + value;// now: value is undefined
    　　value = 10;

    　　return result;
    }

所以: 由于变量的声明都是被提前的, 故在函数中局部变量的声明只使用一个关键字var, 而所有的变量声明放在一起, 若是赋值语句则单独占一行.

    var i, len,
    　　 value = 10,
    　　 result = value + 10;

函数也和变量一样, 也是被优先解释的! 所以都建议函数应该先声明后使用, 且Crockford还建议: 局部函数的声明应该紧跟在局部变量生命的下面

    function doSomethingWithItems( items ) {
    　　var i, len,
    　　　　 value = 10,
    　　　　 result = value + 10;

    　　function doSomething( item ) {
    　　　　// do something
    　　}

    　　for ( i=0, len = items.length; i < len; i++ ) {
    　　　　doSomething( items[ i ] );
    　　}
    }

还有一点需要**注意**的, 在块语句中, 不应该出现函数声明语句!

    if ( condition ) {
    　　function doSomething() {
    　　　　alert( "Hi!" );
    　　}
    } else {
    　　function doSomething() {
    　　　　alert( "Yo!" );
    　　}
    } // 除了firefox会判断condition以为,其余的浏览器均执行!最后导致函数被重写!

对于立即执行的函数

    var value = function() {
    　　// function body
    　　return {
    　　　　message: "Hi"
    　　}
    }();

咋看起来这是一个匿名函数, 但是浏览到最后发现`()`的时候才知道这是一个立即执行函数! 因此最好区别一下提高代码的可阅读性!

    var value = (function() {
    　　// function body
    　　return {
    　　　　message: "Hi"
    　　}
    }());

其实我感觉这样还有一个好处就是, 给`value`的赋值语句块建立了一个封闭的作用域!　

## 相(不)等判断　

首先说`==`与`!=`: 在比较前会**进行变量类型的转化**

    if( 5 == "5" );　　// true: string的5会变成number的5
    console.log( 2 == true );　　// false: true会变成1,故导致不相等

所以判断相等的时候一定要使用`===`与`!==`,用他们进行比较的是不会发生类型转换, 故两个变量的类型不一样的时候是不会相等的!

不要使用`eval()`, `Function()`(传递字符串来创建函数), 并且
`setTimeOut/setInterval1`里面的执行部分不要是字符串, 而应该改写成函数.

    setTimeout( "document.body.style.background = 'red'", 50 );

    //改写成:
    setTimeout( function() {
    　　document.body.style.background = 'red';
    }, 50 );
    不要使用String, Number, Boolean来创建实例

    // 直接这样做更好
    var str = 'some string';
    var num = 10.8;
    var bl = false;

以上基本是一些比较流行的JS编码风格, 想了解更多个人建议去读优秀的开源代码!模仿别人的编码风格...... 
