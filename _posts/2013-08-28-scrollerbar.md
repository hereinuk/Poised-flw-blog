---
layout: post
title: "定制自己的导航条"
description: "coding my own scroller bar"
category: javascript
tags: 
  - 插件
  - 滚动条
---
{% include JB/setup %}

## 一、滚动条的应用场景

__滚动条__--我们在上网过程中遇到最普遍的东西，在我们的眼中这是浏览器与生具有的，不需要编码者去担心怎么实现。

在html + css + js的web开发中，给一个div设定固定的尺寸，当内部内容超过这个容器的时候滚动条自然的就能出现（借助overflow属性）。

在flash编程中，纯as3没有这么一个功能说给定一个大小，当内容超过容器的时候会自动出现滚动条，但我们也能通过在嵌入swf的外层容器上设定大小，这样当swf这个flash超过容器大小的时候也会出现滚动条，但这个滚动条是浏览器的，并非flash！

总的来说，滚动条的作用在于：在有限的空间尽量多的展示更多的内容，让某一类的内容显示在一起。举个最简单的例子，QQ的聊天界面、浏览器……

## 二、具备显示滚动条的场景

__组成__： 内容可显示区域、内容容器、滚动条外部容器、滚动条可拖动部分；这是会出现滚动条的几个最基本元素。

如下图所示：

![滚动条]({{ ASSET_PATH }}/img/20130828.png)

整个过程中需要用到的数据有：
内容可见区域：h
内容容器高度（及所有内容的所有高度）： H
滚动条外部容器（这里讨论和内容可见区域相等）：a
滚动条可拖动部分高度：b
<!--more-->

## 三、实现步骤（事件驱动）

从头开始分析（目的实现一个和QQ聊天界面类似的功能）：

#### 1.第一条消息到达，添加到H中，注意并不是h中，h和H的关系是：

	H.mask = h // as3
	
	// html
	<div style="overflow: hidden;"> <!--h-->
		<div style="position:absolute;"></div> <!--H-->
	</div>

现在H的高度是第一条信息的高度，判断：

	if (H > h) {
 		// 出现滚动条，并向上移动容器H的y值直道H的底部与h对齐
    } else {
		// 未达到滚动条出现的要求，持续上面的步骤
	}

#### 2.接下来是响应用户的各种鼠标事件：

1.滚动条的拖动事件

需要监听鼠标的按下状态和鼠标的移动状态以及鼠标抬起事件；

	// b上需要绑定的事件有mousedown
	b.addEventListener("mousedown", function() {}); // js
	b.addEventListener(MouseEvent.MOUSE_DOWN, function(e:MouseEvent):void {}); // as3
	// stage或者document上需要绑定mousemove 和 mouseup事件
	document.addEventListener("mousemove", function() {});
	document.addEventListener("mouseup", function() {});
	stage.addEventListener(MouseEvent.MOUSE_MOVE, function(e:MouseEvent):void {});
	stage.addEventListener(MouseEvent.MOUSE_UP, function(e:MouseEvent):void {});

2.鼠标在内容可视区域的滚轮事件

	h.addEventListener("mousewheel DOMMouseScroll", function() {});
	h.addEventListener(MouseEvent.MOUSE_WHEEL, function(e:MouseEvent):void {});

3.以上事件发生之后，滚动条可滚动部分和内容容器的位置同步，以及防越界问题！

## 四、代码实现





