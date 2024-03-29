---
layout: post
title: "编译原理--LR(1)分析表构建--JavaScript版"
description: "用js写的一个类bash语言的解释器"
category: javascript
tags:
  - 编译原理
  - LR(1)
---
{% include JB/setup %}

在完成编译原理实验第二部分----语法分析的时候,需要对自定义语言的文法进行处理求分析表,我采用了LR分析算法.下面是我的LR(1)分析表构造过程:

可以在这里找到最新版本:https://github.com/luofei2011/jslr1

### 第一部分:html

    <!DOCTYPE HTML>
     <html lang="en">
     <head>
       <meta charset="UTF-8">
       <title>语法分析</title>
       <script type="text/javascript" src="js/analysis.table.js"></script>
       <link rel="stylesheet" href="css/main.css" type="text/css">
     </head>
     <body>
     <div class="wrapper">
         <div class="header">
             <input type="button" value="创建分析表" onclick="getValue();">
         </div>
         <div class="content">
             <div class="left">
                 <textarea id="input"></textarea>
             </div>
             <div class="right">
                 <div id="display">
                 </div>
             </div>
         </div>
     </div>
     </body>
     </html>
<!--more--> 

### 第二部分:css

    .wrapper{
         width: calc(100% - 20px);
         width: -moz-calc(100% - 20px);
         width: -webkit-calc(100% - 20px);
         margin: 0 auto;
     }
     .content{
         width: 100%;
         margin: 0;
         padding: 0;
         height: calc(60% - 10px);
     }
     .left{
         float: left;
         width: 48%;
     }
     .right{
         float: right;
         width: 48%;
     }
     #input,
     #display{
         height: 400px;
         width: 100%;
     }
     #display{
         border: 1px solid #000;
         overflow: auto;
     }

### 第三部分:Javascript

    /*
      *    @author:Poised_flw
      *    @email:luofeihit2010@gmail.com
      *    @github:https://github.com/luofei2011/jslr
      *    @blog:www.cnblogs.com/Poised_flw
      *    
      *    README:
      *        1.通过文法的输入(只能如下的格式:).用LR(1)算法构建分析表
                 V={S,E,T}
                 T={i,-,(,)}
                 S->E
                 E->T
                 E->E-T
                 T->i
                 T->(E)
      *        *(1)文法目前只能支持单独的字母,后期会加入映射转换的功能如(if->con | I->C);
      *        *(2)你不需要在刚输入的时候就使用拓广文法,后期程序会自动添加
      *        *(3)最好按照给定的格式,第一行是非终结符集合,第二行是终结符集合
      *        2.给analysis_alo()函数传入一个string的参数(必须以'#')结尾.该函数能分析出
      *          此字符串是否能通过该文法分析,返回状态'acc'或则出错.
      *        3.该程序目前还没有操作本地文件的功能,因此若想保存数据是能手动copy
      *        4.函数式编程过程...没想好如何用面向对象来体现.
      *    EXAMPLE:
      *            V={S,E,T}
      *            T->{i,-,(,)}
      *            S->E
      *            E->T
      *            E->E-T
      *            T->i
      *            T->(E)
      *        测试串:i-(i)-i#
      *
      * */
     
     var $ = function(selector) { 
         return document.getElementById(selector);
     }
     
     /*用到的全局变量*/
     var pro = [];    //产生式的数组形式存储
     var I = [];        //存储项目集范族
     var vt_arr = [];//终结符和非终结符集合
     var V = [];        //非终结符集合
     var T = [];        //终结符集合
     var pro_G = []; //存储拓广文法产生式
     
     /*判断元素是否在数组中*/
     /*
      * @param array value    待比较的目标数组
      * @param string arr    待比较的值
      * @return int|bool        若找到则返回位置下标,否则返回false
      * */
     function is_inArray(value,arr) {
         for(var i in arr)
             if(arr[i] == value) return i;
         return false;
     }
     
     /*找出所有的V+T*/
     function get_v_t(value) {
         var vt = value.join('')
                       .replace(/\$|(->)/g,'').split('');
         for(var i in vt){
             if(!is_inArray(vt[i],vt_arr))
                 vt_arr.push(vt[i]);
         }
     }
     
     /*
      *    以数组方式存储产生式的左右项
      *    @param array value    待处理的产生式数组
      *    @example:
      *        S->R处理后为:
      *        pro['S'] = 'R';
      *
      * */
     function storePro(value) {
         var left = [];
         for(var i in value){
             var str_L = value[i].slice(0,1);
             var str_R = value[i].slice(3,value[i].length);
             if(!is_inArray(str_L,left)){
                 left.push(str_L);
                 pro[str_L] = [];
             }
             pro[str_L].push(str_R);
         }
     }
     
     /*处理输入产生式中的空格*/
     function rmvNull(value) {
         var newArr = [];
         for(var i in value){
             if(value[i].length){
                 newArr.push(value[i]
                       .replace(/ /g,''));    //去除空格
             }
         }
         /*拓广文法*/
         newArr.unshift('$->S');
         return newArr;
     }
     
     /*获得所有的非终结符*/
     function setV(value) {
         return value.replace(/(V={)|}$/g,'').split(',');
     }
     
     /*获得所有的终结符*/
     function setT(value) {
         return value.replace(/(T={)|}$/g,'').split(',');
     }
     
     /*右边栏显示项目集范族*/
     function r_dis(value){
         var str ='';
         for(var i in value){
             str += 'I['+i+']={'+value[i]+'}</br>';
         }
         $("display").innerHTML = str;
     }
     
     /*显示分析表函数*/
     function my_dis() {
         var str = '';
         str += 'the action table:</br>';
         for(var i in action){
             for(var j in action[i]){
                 if(action[i][j].length)
                     str += 'action['+i+','+j+']='+action[i][j] + '</br>';
             }
         }
         str += 'the goto table:</br>';
         for(var i in _goto){
             for(var j in _goto[i]){
                 if(_goto[i][j].length)
                     str += 'goto['+i+','+j+']='+_goto[i][j] + '</br>';
             }
         }
         $("display").innerHTML = str;
     }
     
     /*获取页面中文本框的输入值,并进行相应的处理*/
     function getValue() {
         var value = $("input").value.split(/\n/g);
         V = setV(value.shift());        //获得所有的非终结符
         T = setT(value.shift());        //获得所有的终结符
         value = pro_G = rmvNull(value); //去除空格并且拓广文法
         get_v_t(value);                    //获取到所有的V+T
         storePro(value);                //存储拓广文法产生式
         getLR_I();                //递归产生项目集范族
         //r_dis(I);                //显示产生的项目集范族
         action_goto();            //产生action和goto表
         //my_dis();                //打印action和goto表
     
         /*清空不再需要的全局变量*/
         pro = [];    
         I = [];        
         vt_arr = [];
         V = [];         
         T = [];        
         /************************/
     
         analysis_alo('i-(i)-i#');
     }
     
     /*
      *    求FIRST集合
      *    T->T*F
      *    T->T/F会产生死循环
      * */
     function getFirstByOne(value) {
         var first = [];    
         if(is_inArray(value,T) || value == '#')
             first.push(value);
         if(is_inArray(value,V)){
             //找出所有的X->a/X->Y型产生式
             var all_x = [];
             for(var item in pro_G){
                 //产生式的右部
                 if(pro_G[item][0] == value){
                     //右侧是终结符并且没有加入first集合的情况下
                     if(is_inArray(pro_G[item][3],T) && !is_inArray(pro_G[item][3],first))
                         first.push(pro_G[item][3]);
                     //右侧第一个是非终结符
                     /*像这种T->T/F的产生式会发生死递归.
                       能想到的有两种方法能解决:
                             1.循环的过程中,像遍历二叉树一样弄一个hash表记录是否被访问过
                             2.强制规定不能有这种类型的产生式出现,若出现则忽略其FIRST集合
                       本实验我采取第二种方法,牺牲精确度,提高效率.
                     */
                     else if(is_inArray(pro_G[item][3],V) && pro_G[item][3] != pro_G[item][0]){
                         var all_v = getFirstByOne(pro_G[item][3]);
                         if(!is_inArray(all_v,first))
                             for(var j in all_v)
                                 first.push(all_v[j]);
                     }
                 }
             }
         }
         return first;
     }
     
     /*符号串的FIRST集合*/
     function getFirstAll(str){
         var first = [];
         /*for(var i=0; i<str.length; i++){
             var _val = getFirstByOne(str[i]);
             for(var j in _val)
                 if(!is_inArray(_val[j],first))
                     first.push(_val[j]);
             if(is_inArray(str[0],T))
                 break;
         }*/
        //感觉这里只能这样写,不知是FIRST集求错还是怎么.循环会有更多的FIRST集合
         var _val = getFirstByOne(str[0]);
         for(var j in _val)
             if(!is_inArray(_val[j],first))
                 first.push(_val[j]);
         return first;
     }
     
     
     /*
      *    闭包函数
      *    是非递归实现
      * @param array I 传递的需要求闭包的项目
      * @param array C 记录产生的闭包集合
      * @return array C    最终的闭包集合
      *
      * */
     function closure(I) {
         //初始化闭包
         var C = I || [];    
         /*记录闭包中的项目数*/
         var len = C.length;
         while(1){
             for(var item in C) {
                 var str = C[item].slice(C[item].indexOf('.')+1,C[item].indexOf('.')+2);
                 /*满足这种产生式:A->a.Bp,a*/
                 if(str.length && str != ','){
                     /*'.'后面是终结符则停止*/
                     if(is_inArray(str,T))
                         continue;
                     var first_arr = C[item].slice(C[item].indexOf('.')+2,C[item].length).replace(/,/g,'');
                     var first = getFirstAll(first_arr);
                     /*遍历拓广文法G'中产生式的左部*/
                     for(var i in pro){
                         /*找到以B开始的项目*/
                         if(str == i){
                             /*遍历出以B开始的产生式,并把他们加'.'以后加入闭包中*/
                             for(var j in pro[i]){
                                 /*还得对当前产生式的FIRST集合遍历一次*/
                                 for(var n in first){
                                     var yeta = i + '->.' + pro[i][j] + ',' + first[n];
                                     /*循环处理C中的每项,去重.直到C的大小不再改变*/
                                     if(!is_inArray(yeta,C))
                                         C.push(yeta);
                                 }
                             }
                         }
                     }
                 }
             }
             /*大小不再改变则停止寻找闭包*/
             if(C.length > len){
                 len = C.length;
             }else{
                 break;
             }
         }
         return C;
     }
     
     /*
      *    交换string中两个元素的位置
      *    @function 交换'.'和其后面一个元素的位置
      * */
     function changeIndex(str){
         var indx = str.indexOf('.');
         if(indx != -1){
             var str_arr = str.split('');
             var ex_str = str_arr[indx];
             str_arr[indx] = str_arr[indx+1];
             str_arr[indx+1] = ex_str;
             str = str_arr.join('');
         }
         return str;
     }
     
     /*
      *    GOTO函数
      * @param array I    闭包集合
      * @param string X    标志元素
      * @param array    J    记录可以求闭包的项目
      * @return array    返回项目J的闭包
      *
      * */
     function GO(I,X) {
         var J = [];    
         for(var item in I){
             var str = I[item].slice(I[item].indexOf('.')+1,I[item].indexOf('.')+2);
             if(str == X){
                 var copy_item = I[item];
                 J.push(changeIndex(copy_item));
             }
         }
         return closure(J);
     }
     
     /*
      *    判断两个数组是否相等,可以不同顺序
      * @example:
      *        a = [1,3,5]; b = [3,5,1]
      *        a和b是相等的
      *
      * */
     function is_eql_arr(arr_1,arr_2) {
         /*第一步就判断长度是否相等*/
         if(arr_1.length != arr_2.length)
             return false;
         /*设置标志位*/
         var flag = false;
         for(var i in arr_1){
             for(var j in arr_2){
                 if(arr_1[i] == arr_2[j]){
                     flag = true;
                     break;
                 }
             }
             if(!flag)
                 return false;
             flag = false;
         }
         return true;
     }
     
     /*
      *    非递归实现
      *    利用closure()和GO计算LR(1)项目集范族
      * @param boolean flag    已经产生状态的标志
      * @param int    num        当前递归的数组I项目
      * @param int   len        当到I最后一项时,判断I是否还能增加
      * @param now_item    array    目前正在递归的项目I
      *
      * */
     function getLR_I() {
         /*设置一个标志*/
         var flag = false;
         var num = 0;
         var len = 0;    //while结束的标志
         /*初始化项目*/
         var now_item = closure(['$->.S,#']);
         I.push(now_item);    //I[0]
     
         /*递归求解项目集*/
         while(1){
             for(var vt in vt_arr){
                 var _t = GO(now_item,vt_arr[vt]);
                 if(_t.length){
                     /*循环遍历I中的所有项,若存在则不做处理*/
                     for(var all in I){
                         if(is_eql_arr(_t,I[all])){
                             flag = true;
                             break;
                         }
                     }
                     if(!flag) I.push(_t);
                     /*清除状态标志位*/
                     flag = false;
                 }
             }
             now_item = I[++num];
             len = I.length;
             /*到最后一项后需要判断是结束递归还是继续递归*/
             if(num > I.length){
                 if(I.length > len){
                     /*递归处理I中的每项,给他们求闭包*/
                     continue;
                 }
                 break;
             }
         }
     }
     
     /*维护两张表*/
     var action = [];
     var _goto = [];
     
     /*返回相同的项目集下标*/
     function get_pos(arr) {
         for(var i in I){
             if(is_eql_arr(arr,I[i]))
                 return i;
         }
         return -1;
     }
     
     /*
      *    分析表的构造
      * @param array action    构造的action表
      * @param array _goto    构造的goto表
      * */
     function action_goto() {
         for(var i in I){
             //需要初始化一下两张表
             action[i] = [''];
             _goto[i] = [''];
             if(is_inArray('$->S.,#',I[i])){
                 action[i]['#'] = 'acc';
                 continue;
             }
             for(var j in I[i]){
                 var item = I[i][j];
                 var a = item.slice(item.indexOf('.')+1,item.indexOf('.')+2);
                 //移入项目
                 if(is_inArray(a,T)){
                     var s = get_pos(GO(I[i],a));
                     if(s > -1)
                         action[i][a] = 'S'+s;
                 }
                 //记录能归约的项
                 if(a == ','){
                     var J = is_inArray(item.slice(0,item.indexOf('.')),pro_G);
                     if(J)
                         action[i][item[item.length-1]] = 'r'+J;
                 }
             }
             //归约后的状态改变
             for(var k in V){
                 var go = get_pos(GO(I[i],V[k]))
                 if(go > -1)
                     _goto[i][V[k]] = go;
             }
         }
     }
     
     /*
      *    LR分析算法
      *    非递归实现
      *    通过判断栈顶状态和输入串确定当前是移入还是归约等等...
      *    @param    string    w_str    需要匹配的串
      *    @param    array    S_stack    当前栈状态数组
      *    @param    array    X_stack    符号栈
      *    @param    string    ip        输入串指针
      *    @return    state    'acc'表示接受,其它则出错
      *
      * */
     function analysis_alo(w_str) {
         var w_str = w_str.split('');
         var S_stack = [];    //栈顶状态
         var X_stack = [];    //输入符号栈
         /*初始化两个栈*/
         S_stack.push('0');
         X_stack.push('#');
         /*将输入串放入输入缓冲区中,指针ip指向第一个符号*/
         var ip = w_str.shift();
         /*显示信息*/
         var str_dis = '<table>';
         var step =0;
         while(1){
             str_dis += '<tr><td>步骤'+ (++step) + 
                       '</td><td>' + S_stack + X_stack + 
                       '</td><td>' +ip+w_str + '</td>';
             var status = action[parseInt(S_stack[S_stack.length-1])][ip] || '';
             str_dis += '<td>action['+S_stack[S_stack.length-1]+','+ip+']='+status;
             /*移入*/
             if(status.indexOf('S') != -1){
                 S_stack.push(parseInt(status.replace(/S/g,'')));
                 X_stack.push(ip);
                 ip = w_str.shift();
                 str_dis += ',移进状态'+status.replace(/S/g,'')+'和输入符号'+ip+'</td>';
             /*归约,并判断下一步状态*/
             }else if(status.indexOf('r') != -1){
                 /*第k个产生式A->a*/
                 var str = pro_G[parseInt(status.replace(/r/g,''))];
                 /*从栈顶弹出2*|a|个符号*/
                 for(var j=0; j<str.slice(str.indexOf('>')+1,str.length).length; j++){
                     X_stack.pop();
                     S_stack.pop();
                 }
                 /*把A压入栈中*/
                 X_stack.push(str[0]);
                 str_dis += ',按第'+status.replace(/r/g,'')+'个产生式'+str+'归约</td></tr>';
     
                 //下一步的状态
                 str_dis += '<tr><td>步骤'+ (++step) + '</td>' +
                                '<td>' +  S_stack + X_stack + '</td>' +
                                '<td>' + ip+w_str + '</td>';
                 /*令S'为当前栈顶状态,把goto[S',A]压入栈中*/
                 var _s = _goto[parseInt(S_stack[S_stack.length-1])][X_stack[X_stack.length-1]];
                 S_stack.push(_s);
                 str_dis += '<td>goto['+S_stack[S_stack.length-2]+','+str[0]+']='+_s+
                            ',将状态'+_s+'压入栈中</td></tr>';
             /*接受,暂停处理*/
             }else if(status == 'acc'){
                 str_dis += ',接受</tr>';
                 break;
             /*出错,同样暂停处理*/
             }else{
                 str_dis += ',无此状态转换,出错!</tr>';
                 break;
             }
             str_dis += '</tr>';
         }
         str_dis += '</table>';
         $("display").innerHTML = str_dis;
     }
     
     window.onload = function() {
         /*初始化文本框中的值*/
         (function() {
             var init = 'V={S,L,R}\nT={*,i,=}\nS->L=R\nS->R\nL->*R\nL->i\nR->L\n';
             $("input").value = init;
         })();
     };
