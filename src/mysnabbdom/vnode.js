/**
 * 创建虚拟节点
 * @param sel html标签 ul li div input ...
 * @param data class, props
 * @param text 当前html标签内的文本内容
 * @param children 子元素
 * @param elm HTMLElement 虚拟节点对应的DOM元素
 */
export default function vnode(
    sel: string, data: Object, text: string, children: Array,
    elm: HTMLElement) {

    let key = data !== undefined
        ? data.key
        : null; // data不为undefined, 获取key, 否则null

    return {sel, data, text, children, elm, key};
}