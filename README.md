# FormSerialization
Typescript about comple-Object convert to formdata
==

## 目的
* 方便通过ng2内未提供复杂的formdata对象传递来提供简单的方法API 


## 代码环境
* 无
==

## 文件结构
* core.ts 核心操作类
* index.ts 核心工具类使用范例
==

## 使用教程
<pre>
<code>
import { ObjectFormSerializable } from "./core"

const a = {
    a: 1,
    b: {
        c: 123,
        d: "dafd"
    },
    c: [1, 2, 3],
    d: [
        { oo: 123, hk: null },
        { oo: 123, hk: null }
    ]
};

let result = ObjectFormSerializable.Parse(a);
console.log(result);
</code>
</pre>

==