import updateChildren from "./updateChildren";
import createElement from "./createElement";

/**
 *
 */
export default function patchVnode(oldVnode: Object, newVnode: Object) {
    // 如果新旧节点是一样的, 那么比较text children
    // 简单版本比较判断 text 和 children 是互斥的
    newVnode.elm = oldVnode.elm; // 新旧是一样的, elm需指向同一个DOM元素
    let elm = oldVnode.elm;

    let newText = newVnode.text;
    let newCh = newVnode.children;
    let oldText = oldVnode.text;
    let oldCh = oldVnode.children;

    if (newText !== undefined) {
        if (newText !== oldText) {
            // text不一样, 更新旧text
            elm.textContent = ''
            elm.innerText = newText;
        }
    } else if (newCh !== undefined) {
        // 新有children
        if (oldCh !== undefined) {
            // 新旧都有children, 根据四命中对比children, 然后更新
            // console.log(oldVnode)
            // console.log('------------------')
            // console.log(newVnode)
            updateChildren(elm, oldCh, newCh); // 四命中查找 while if
        } else if (oldText !== undefined) {
            console.log('新有children 旧无children 有text')
            // 新有children
            // 旧无children 有text
            // 清空text , 根据新虚拟节点的children 子项 创建DOM元素, 追加至DOM
            elm.textContent = ''
            addVnode(elm, newCh)
        }
    }
}

/**
 * 添加根据子虚拟节点创建的新元素, 至DOM
 * @param elm
 * @param children
 */
function addVnode(elm: HTMLElement, children: Array) {
    for (let i = 0; i < children.length; i++) {
        let itemVnode = children[i];
        let newChild = createElement(itemVnode)
        elm.appendChild(newChild)
    }
}















