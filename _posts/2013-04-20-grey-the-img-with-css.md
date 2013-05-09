---
layout: post
title: "CSS使图片变灰"
description: "为地震中逝去的同胞默哀"
category: css
tags: ['life']
---
{% include JB/setup %}

#### 雅安加油!

#### 全局变灰:

    html{
        -webkit-filter: grayscale(1);
                filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
    }

#### 只对局部进行变灰:

    (#id,.class,img,input......){
        -webkit-filter: grayscale(1);
                filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
    }

