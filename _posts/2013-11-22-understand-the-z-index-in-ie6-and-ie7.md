---
layout: post
title: "领悟z-index的渲染机制"
description: "z-index bug under the ie6 ie7"
category: css
tags: 
  - css
  - hack
---

{% include JB/setup %}

## z-index基础

> 设置元素的堆叠顺序， 拥有__更高堆叠顺序__的元素总是会处于堆叠顺序较低元素的前面。

#### 用法

1. 元素可以拥有负的z-index属性值；
2. z-index仅能在定位元素上有效.

[^position]: **定位元素：**`position`为`absolute`、`relative`、`fixed`的元素。

#### 示例

```
div {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
}
```

## 进阶用法

> 利用基础中堆叠的思想，可以做到网页中不同层次的块堆叠在一个平面中从而展现一种三维立体的感觉

#### 看一个示例

##### html部分

	<div class="z-1">
		<div class="z-10">
			<div class="z-15">z-index: 15</div>
			<div class="z-12">z-index: 12</div>
		</div>
	</div>
	<div class="z-5">z-index: 5</div>

##### css部分

	div {
		text-align: center;
	}
	.z-12, .z-15 {
		width: 100px;
		height: 100px;
		line-height: 100px;
	}
	.z-10 {
		position: relative;
		width: 500px;
		height: 300px;
		background: #000;
		margin: 0 auto;
		z-index: 100;
	}
	.z-12 {
		position: absolute;
		z-index: 12;
		background: #f00;
		left: -50px;
	}
	.z-15 {
		position: absolute;
		z-index: 1;
		background: #fff;
		left: -20px;
		top: 20px;
	}
	.z-5 {
		position: absolute;
		width: 1000px;
		height: 100px;
		line-height: 100px;
		top: 50px;
		background: #00F;
		z-index: 5;
	}
	.z-1 {
		/*position: relative;*/
		/*z-index: 6;*/
	}

#### 正常浏览器的效果图

![zIndex_01.png]({{ ASSET_PATH }}/img/20131122_01.png)

#### 抽风的`ie6 & ie7`

![抽风的ie6&ie7]({{ ASSET_PATH }}/img/20131122_02.png)

[^w3c]: **正常浏览器：** 指`chrome`、`firefox`、`ie 8+`等。