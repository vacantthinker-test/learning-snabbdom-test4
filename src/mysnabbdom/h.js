/**
 * 简单版本：匹配三种情况
 * 情况一：h('div', {}, 'txt 1234')
 * 情况二：('div', {}, [h(), h(), h()])
 * 情况三：h('div', {}, h())
 */
import vnode from "./vnode";

export default function h(sel: string, data: Object, c: any) {
    let text;
    let children;
    let elm;
    if (Array.isArray(c)) {
        children = c
    } else if (typeof c === 'string') {
        text = c;
    } else if (c && c.sel !== undefined) {
        children = [c]
    }

    return vnode(sel, data, text, children, elm)
}