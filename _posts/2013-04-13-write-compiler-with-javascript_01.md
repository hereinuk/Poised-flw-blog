---
layout: post
title: "编译原理----手写编译器(1)----LR分析法"
description: "一步一步编写自己定义语言的编译器"
category: javascript
tags:
  - 编译原理
  - LR(1)
---
{% include JB/setup %}

完整的项目请参考:https://github.com/luofei2011/jslr1

### LR(k)分析法(LR(k) parsing)

是一个有效的自底向上分析技术,它适用于一大类上下文无关文法的语法分析.其中:L指的
是从左向右扫描输入字符串,R指的是构造最右推导的逆过程,k指的是决定分析动作时需要向前看的符号个数.

**LR分析法有如下优点**:

1. LR分析器能识别所有可用上下文无关文法描述的程序设计语言的结构.

2. LR分析法是已知的最一般的无回溯移进-归约分析法,而且可以和其他移进-归约分析法一样有效地实现.

3. LR分析法分析的文法包含预测分析法所能分析的文法类.

4. 在自左向右扫描输入时,LR分析器能及时察觉语法错误.

**缺点有**:

对典型的程序设计语言文法,手工构造LR分析器的工作量太大.有专门的工具--Yacc

### LR分析器的基本原理:

将句柄(某个产生式的右部)的识别过程划分为若干个状态,分析器根据当前的状态确定是否找到了句柄,如果找到句柄则按照相应的产生式进行归约,并进入下一个状态,如果未找到句柄,则移进输入符号,也进入下一个状态.如:

    S->abc　　//为一个产生式

则该识别的过程可分为: 

(1).abc 

(2)a.bc 

(3)ab.c 

(4)abc.四个状态.
<!--more--> 

只有在状态四的时候才真正的找到了句柄,则对他进行归约.其它的三个状态都是处于等待归约状态,但每个的等待程度不一样!

在每个状态下,分析器从左向右地扫描输入串并识别出句柄符号,也就是说,状态是句柄识别程度的描述,每个状态识别句柄的一
部分.一个长度为n的句柄的识别需要n+1个状态,识别句柄尾的状态称为句柄识别态.由移进-归约分析的基本原理可知,每个状
态所识别的句柄的那一部分符号正好是当前句型(规范句型)的一个前缀,这个前缀不含相应句型的句柄右部的任何符号,将其
称为规范句型的活前缀(viable prefix),于是.对句柄的识别就转换成了对规范句型活前缀的识别.

如上例中的句柄'abc'.其中四个状态分别是句柄识别程度的描述.对于状态(1),他识别句柄的符号a并等待符号b的移入,此
时符号a就是一个活前缀.同理,其他状态也能用相同的方法描述.

一个文法的规范句型的所有活前缀构成一个语言,而且该语言是正则的,可以用一个DFA识别,LR分析器正式利用有穷状态自动
机来识别文法所有规范句型的活前缀的,并利用一个栈存放识别出来的句型的活前缀部分和相应的状态.

**注意**:要描述上面所说的状态机,我们可以借助一个矩阵实现.更一般地就是两个二维数组action和goto.这两个表统称
为LR分析表.该表给出每个状态下应采取的动作(移进,归约,接受或则报错)以及要转向的下一个状态.

以上就是LR分析法的一点基本原理,接下来的事就是如何构造分析表的问题.由于LR分析器的工作过程是通用的,对于不同的
分析方法(LR(1),SLR(1),LR(0)等)他们不同的只是action表和goto表的具体内容.因此我们需要先了解如何去构造分析表.
请关注下一篇.
