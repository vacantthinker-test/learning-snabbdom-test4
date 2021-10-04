// snabbdom test4 flow 用于类型检查, 很好用. 声明参数时, 可以指定需要的类型
// 如果调用该函数时, 填写的参数类型不正确, 那么报错.

import h from "./mysnabbdom/h";
import patch from "./mysnabbdom/patch";

// console.log('test4')

// 一：创建虚拟节点

const box = document.getElementById('box')
const vnode1 = h('ul', {}, [
    h('li', {key: 'D'}, 'D'),
    h('li', {key: 'E'}, 'E'),
    h('li', {key: 'A'}, 'A'),
    h('li', {key: 'C'}, 'C'),
    h('li', {key: 'B'}, 'B'),
])
// const vnode1 = h('div', {}, 'txt 123456789')
// console.log('vnode1', vnode1)

// 二：给定虚拟节点创建元素, 比较新旧节点, 然后添加至DOM
patch(box, vnode1) // 第一次patch

const vnode2 = h('ul', {}, [
    h('li', {key: 'M'}, 'M2'),
    h('li', {key: 'N'}, 'N2'),
    h('li', {key: 'A'}, 'A2'),
    h('li', {key: 'O'}, 'O2'),
    // h('li', {key: 'A'}, 'A2'),
    // h('li', {key: 'B'}, 'B2'),
    // h('li', {key: 'C'}, 'C2'),
    // h('li', {key: 'D'}, 'D2'),
    // h('li', {key: 'E'}, 'E2'),
])
setTimeout(() => {
    patch(vnode1, vnode2) // 第二次patch
}, 1000)



















