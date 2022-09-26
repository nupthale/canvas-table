export const dfs = (root, callback) => {
    callback(root);

    if (root.children?.length) {
        root.children.forEach(child => {
            dfs(child, callback);
        })
    }
}
