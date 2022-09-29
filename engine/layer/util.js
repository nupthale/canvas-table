import { isNumber } from "lodash-es";


// 场景只支持基本的，后续需要继续补充
export const shouldCreateContext = (node) => {
    if (node.isTextNode) {
        return false;
    }

    const elementStyle = node.getComputedStyle();
    const { position, zIndex } = elementStyle;

    return position !== 'static' && isNumber(zIndex);
}

export const dfs = (root, preCallback, postCallback) => {
    const shouldContinue = preCallback(root);

    if (shouldContinue && root.children?.length) {
        root.children.forEach(child => {
            dfs(child, preCallback, postCallback);
        })
    }

    postCallback?.(root);
}

