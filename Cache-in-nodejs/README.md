#Cache in Nodejs

> 本篇列举了两个在Nodejs中进行内存排查的时候用到的工具：
>
> 1. node-heapdump
> 2. node-memwatch (or node-memwatch-next)



## node-heapdump

`node-heapdump`只需在文件头部引入　`var heapdump = require('heapdump')`

然后运行文件`node node-heapdump.js` ，然后在命令行中输入 `kill -USR2 <pid>`，就可以抓拍一份堆内存的快照，默认会存储在文件目录下以 `heapdump-<sec>.<usec>.heapsnapshot`的格式存放。这是一份较大的JSON文件，可以通过Chrome的开发者工具打开：

1. 打开Chrome开发中工具中的`Profies`面板
2. 在菜单中选择`Load`，选中该文件，就能在Chrome中查看该份快照。



## node-memwatch

`node-memwatch`模块已经不支持最新的node `0.12.0`以上的版本(详见 [issue of node-memwatch](https://github.com/lloyd/node-memwatch/issues/62)，如果使用更新的node版本，可以使用`node-memwatch-next`, 它们的用法是一样的。



### 监听leak 于 stats事件

#### stats 事件

在进程每次进行「全栈堆回收」的时候，将会触发一次stats事件，该事件会传递内存的统计信息。

得到的数据如下显示:

```
stats:
{ num_full_gc: 7,	// 第几次进行全栈堆回收
  num_inc_gc: 44,	// 第几次进行增量垃圾回收
  heap_compactions: 7,	// 第几次进行老生代的内存整理
  usage_trend: 0,	// 使用趋势
  estimated_base: 34006456,	// 预估基数
  current_base: 34006456,	// 当前使用数
  min: 12975120,
  max: 35045232 }
```



#### leak 事件

如果经过连续5次垃圾回收后，内存仍然没有被释放，这意味着有内存泄露的产生，会触发该事件。

得到的数据如下显示：

```
{ start: Fri, 29 Jun 2012 14:12:13 GMT,
  end: Fri, 29 Jun 2012 14:12:33 GMT,
  growth: 67984,
  reason: 'heap growth over 5 consecutive GCs (20s) - 11.67 mb/hr' }
```



#### 运行node-memwatch-next.js

运行 `node node-memwatch-next.js`,启动服务器。

然后使用ab工具进行大量的请求 `ab -n 10000 -c 100 http://localhost:1337`，进行10000条请求，100并发量。

然后观看命令行打印的信息。



### 使用HeapDiff类进行堆内存的比较

node-memwatch 通过 HeapDiff 类，提供了比较快照的功能，它能够比较堆上对象的名称和分配的数量，从而找出导致内存泄漏的元凶。

运行 `node node-memwatch-next.js`,就可以看到相关信息。

