/**
 * 创建DOM元素, 挂载至vnode , 然后返回该DOM元素
 */
export default function createElement(vnode: Object) {
    let sel = vnode.sel; // 获取虚拟节点的选择器
    let text = vnode.text; // 获取虚拟节点 内的文本内容
    let children = vnode.children; // 获取虚拟节点 子元素

    const domNode = document.createElement(sel) // 根据选择器创建DOM元素
    if (text) { // 如果存在text
        domNode.innerText = text; // 更新innerText
    } else if (children) { // 如果存在children
        for (let i = 0; i < children.length; i++) {
            let item = children[i]; // 获取 子虚拟节点
            let childElement = createElement(item); // 根据子虚拟节点创建DOM元素
            domNode.appendChild(childElement) // 追加子DOM元素至domNode
        }
    }

    vnode.elm = domNode // 挂载
    return domNode // 返回创建好dom元素
}