import vnode from "./vnode";
import createElement from "./createElement";
import patchVnode from "./patchVnode";

/**
 * 转化真实DOM元素至 虚拟节点 vnode
 * @param oldVnode
 * @returns {*|{data: Object, children: Array, elm: HTMLElement, sel: string, text: string, key: null}}
 */
function convertToVnode(oldVnode: Object) {
    let sel = oldVnode.tagName.toLowerCase();
    let text = oldVnode.innerText;
    return vnode(sel, {}, text, undefined, oldVnode);
}

/**
 * 判断新旧节点是不是一样的
 * @param oldVnode
 * @param newVnode
 * @returns {boolean}
 */
export function sameVnode(oldVnode: Object, newVnode: Object) {
    let sameKey = oldVnode.key === newVnode.key;
    let sameSel = oldVnode.sel === newVnode.sel;

    return sameKey && sameSel;
}


/**
 * 比较新旧节点然后更新旧节点
 */
export default function patch(oldVnode: Object, newVnode: Object) {
    // 第一次patch() 函数调用时, oldVnode是真实DOM元素不是虚拟节点, 需要转化一下
    if (oldVnode.sel === undefined) {
        oldVnode = convertToVnode(oldVnode);
    }
    // 比较新旧节点哪里不同
    // 回答一个问题?
    //      第一次patch时, newVnode 该虚拟节点有没有elm?
    //      答案是: 没有.
    if (sameVnode(oldVnode, newVnode)) {
        patchVnode(oldVnode, newVnode)
    } else {
        // 如果新旧节点不一样, 那么新增由新虚拟节点创建新元素, 删除旧虚拟节点对应的DOM元素
        // console.log(`新旧不一样`)
        let elm = oldVnode.elm;

        let refChild = elm
        let newChild = createElement(newVnode) // span
        let parentElement = elm.parentElement
        // 在 div#box 的前面 插入一个 span
        parentElement.insertBefore(newChild, refChild)
        // 删除旧元素
        elm.remove()
    }
}









