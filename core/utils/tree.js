export const dfs = (root, callback) => {
    const isHit = callback(root);

    if (isHit && root.children?.length) {
        root.children.forEach(child => {
            dfs(child, callback);
        })
    }
}
