/**
 * 四命中查找, while是两两对比, if来处理剩余的
 * @param elm
 * @param oldCh
 * @param newCh
 */
import {sameVnode} from "./patch";
import patchVnode from "./patchVnode";
import createElement from "./createElement";

function addVnode(elm: HTMLElement, children: Array, startIdx: number, endIdx: number, refChild: HTMLElement) {
    // 从startIdx 到 endIdx 每一个虚拟节点下标

    for (; startIdx <= endIdx; startIdx++) {
        let itemVnode = children[startIdx]
        let newChild = createElement(itemVnode)
        elm.insertBefore(newChild, refChild)
    }
}

function removeVnode(elm: HTMLElement, children: Array, startIdx: number, endIdx: number) {
    // 从startIdx 到 endIdx 每一个虚拟节点下标
    for (; startIdx <= endIdx; startIdx++) {
        let itemVnode = children[startIdx]
        if (itemVnode) {
            itemVnode.elm.remove()
        }
    }
}

function createOldMap(children: Array) {
    let map = {}
    for (let i = 0; i < children.length; i++) {
        let itemVnode = children[i]
        if (itemVnode) {
            let key = itemVnode.key
            map[key] = i;
        }
    }
    return map;
}

export default function updateChildren(elm: HTMLElement, oldCh: Array, newCh: Array) {
    console.log('updateChildren', elm)
    // 四指针, 四节点
    let oldStartIdx = 0
    let oldStartVnode = oldCh[oldStartIdx]
    let oldEndIdx = oldCh.length - 1
    let oldEndVnode = oldCh[oldEndIdx]

    let newStartIdx = 0
    let newStartVnode = newCh[newStartIdx]
    let newEndIdx = newCh.length - 1
    let newEndVnode = newCh[newEndIdx]

    let oldMap;
    let positionInOldMap;


    console.log('-----------')
    // while 每次取出两个, 进行对比
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        // 一：新前与旧前
        if (sameVnode(oldStartVnode, newStartVnode)) {
            // 步骤一：更新节点
            // 步骤二：移动指针并更新节点
            patchVnode(oldStartVnode, newStartVnode)
            // old  A   B   C
            // new  A2  B2  C2

            oldStartVnode = oldCh[++oldStartIdx] // 先加加
            newStartVnode = newCh[++newStartIdx]
        } else if (sameVnode(oldEndVnode, newEndVnode)) {
            // 二：新后与旧后
            patchVnode(oldEndVnode, newEndVnode)
            // 测试通过
            oldEndVnode = oldCh[--oldEndIdx]
            newEndVnode = newCh[--newEndIdx]
        } else if (sameVnode(oldStartVnode, newEndVnode)) {
            // 三：新后与旧前
            patchVnode(oldStartVnode, newEndVnode)
            // 示例：
            // old  A       B       C       D       E
            // new  C2      B2      A2

            // 需要移动元素
            let refChild = oldCh[oldEndIdx].elm.nextSibling
            let newChild = oldCh[oldStartIdx].elm // 已存在key=A的元素, 移动它.
            elm.insertBefore(newChild, refChild)
            // A        A2
            // A2       A2
            // A        B       C       D       E
            // B        C       A2      D       E

            // B        B2
            // B2       B2
            // B        C       A2      D       E
            // C        B2      A2      D       E

            // C        C2
            // C2       C2

            // 更新指针 节点
            oldStartVnode = oldCh[++oldStartIdx]
            newEndVnode = newCh[--newEndIdx]
        } else if (sameVnode(oldEndVnode, newStartVnode)) {
            // 四：新前与旧后
            patchVnode(oldEndVnode, newStartVnode)
            // 示例：
            // old      D       E       C       B       A
            // new      A2      B2      C2

            let refChild = oldCh[oldStartIdx].elm
            let newChild = oldCh[oldEndIdx].elm
            elm.insertBefore(newChild, refChild)

            // 更新指针 节点
            oldEndVnode = oldCh[--oldEndIdx]
            newStartVnode = newCh[++newStartIdx]
        } else {
            // 非四命中 一二三四都没有匹配的, 收集旧children key idx 作为map.
            // 从新children每次取一个, 找得到, 移动元素. 找不到, 创建元素并添加至DOM
            if (oldMap === undefined) {
                oldMap = createOldMap(oldCh);
            }
            let keyNeedFind = newStartVnode.key;
            positionInOldMap = oldMap[keyNeedFind];
            // 示例：
            //  old     D       E       A       C       B
            //  new     M2      N2      A2      O2

            if (positionInOldMap === undefined) {
                // console.log('没找到 需要创建该元素然后添加至DOM', keyNeedFind)
                let refChild = oldCh[oldStartIdx].elm
                let newChild = createElement(newStartVnode)
                elm.insertBefore(newChild, refChild)

            } else {
                console.log('-----找到了 需要更新再移动', keyNeedFind)
                // 简单版本
                // 不考虑 key一样, sel不一样的情况, 如果sel不一样, 那么创建新元素插入至当前位置前一位, 再删除旧的
                // 步骤一：更新
                let oldPositionVnode = oldCh[positionInOldMap];
                patchVnode(oldPositionVnode, newStartVnode)
                // 步骤二：移动
                let refChild = oldCh[oldStartIdx].elm
                let newChild = oldPositionVnode.elm
                elm.insertBefore(newChild, refChild)
                // 步骤三：打标记 undefined
                oldCh[positionInOldMap] = undefined
            }
            // finished. end.

            newStartVnode = newCh[++newStartIdx]
        }


    }
    // 剩余部分 if来处理
    if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
        if (oldStartIdx > oldEndIdx) {
            // console.log('if')
            console.log('旧children每一个都处理了, 新children有剩余的没处理的')
            // 创建这些新元素, 添加这些新元素
            let refChild = oldCh[oldStartIdx] !== undefined
                ? oldCh[oldStartIdx].elm
                : null
            addVnode(elm, newCh, newStartIdx, newEndIdx, refChild)
        } else {
            // console.log('else')
            console.log('旧children只处理了一部分, 旧children剩余的是多余的, 要删除')
            removeVnode(elm, oldCh, oldStartIdx, oldEndIdx)
        }
    }
}





























