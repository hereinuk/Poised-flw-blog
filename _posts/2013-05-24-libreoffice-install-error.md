---
layout: post
title: "libreoffice install error"
description: "lake of libreoffice-common(> 1:3.5.7)"
category: "电脑故障"
tags: 
  - 电脑故障
---
{% include JB/setup %}

开辟一共模块来记录一些软件的安装过程以及一些出错的快速处理方法

- May 24, 2013

> ubuntu-12.04.1 下安装libreoffice出现不能安装, 不能卸载软件的问题.

    sudo apt-get upgrade

    /*
    正在读取软件包列表... 完成
    正在分析软件包的依赖关系树       
    正在读取状态信息... 完成       
    您也许需要运行“apt-get -f install”来修正上面的错误。
    下列软件包有未满足的依赖关系：
     libreoffice-core : 依赖: libreoffice-common (> 1:3.5.7) 但是它还没有被安装
    E: 不能满足依赖关系。不妨试一下 -f 选项。
    */

当然照上面的说敲这个命令也是不管用的.

    sudo apt-get -f install

    // 出现如下的错误
    /*
    在处理时有错误发生：
     /var/cache/apt/archives/libreoffice-common_1%3a3.5.7-0ubuntu4_all.deb
    E: Sub-process /usr/bin/dpkg returned an error code (1)
    */

究其原因, 我猜大概是我装了openoffice的原因. 因此libreoffice是unbuntu自带安装的,
以前我装了openoffice以后就把它给卸载了, 这次再装就出现了上面的错误.

**解决办法**

只有卸载掉已经安装部分的libreoffice:

    sudo dpkg --remove libreoffice-core

这样以后再执行`sudo apt-get upgrade`会出现如下的问题:

    // 反正就是一堆的依赖关系. 然后把这些依赖关系再全部用上面的方法删掉
    sudo dpkg --remove libreoffice-base-core
    sudo dpkg --remove libreoffice-draw
    sudo dpkg --remove libreoffice-emailmerge
    sudo dpkg --remove libreoffice-impress
    sudo dpkg --remove libreoffice-math
    sudo dpkg --remove libreoffice-style-human
    sudo dpkg --remove libreoffice-writer
    sudo dpkg --remove mythes-en-us
    sudo dpkg --remove python-uno

然后问题就解决了, 若想再装libreoffice需要先把openoffice卸载了再安装.
