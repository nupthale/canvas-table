export const drawLine = (
    ctx,
    startX,
    startY,
    endX,
    endY,
    color
) => {
    if (color) {
        ctx.save();
        ctx.strokeStyle = color;
    }
    ctx.beginPath();
    ctx.moveTo(startX + 0.5, startY + 0.5);
    ctx.lineTo(endX + 0.5, endY + 0.5);
    ctx.closePath();
    ctx.stroke();

    if (color) {
        ctx.restore()
    }
};

export const drawRect = (
    ctx,
    startX,
    startY,
    width,
    height,
    color
) => {
    if (color) {
        ctx.save();
        ctx.fillStyle = color;
    }
    ctx.fillRect(startX, startY, width, height);

    if (color) {
        ctx.restore();
    }
};

export const text2Ellipsis = (
    ctx,
    str,
    maxWidth,
    ellipsis = '…'
) => {
    if (typeof str !== 'string') {
        return str;
    }
    const len = str.length;
    if (len === 0) {
        return str;
    }

    let ellipsisWidth = ctx.measureText(ellipsis).width;
    let maxStr = '';
    let maxStrWidth = 0;
    let i = 0;
    do {
        i ++;
        maxStr = str.substring(0, i);
        maxStrWidth = ctx.measureText(maxStr).width;
    } while (maxStrWidth < maxWidth && i < len);

    if (i === len && (maxStrWidth <= maxWidth || maxStrWidth <= ellipsisWidth)) {
        return maxStr;
    } else {
        while (maxStrWidth + ellipsisWidth >= maxWidth && i > 0) {
            maxStr = maxStr.substring(0, i);
            maxStrWidth = ctx.measureText(maxStr).width;
            i --;
        }
        return maxStr.substring(0, i) + ellipsis;
    }
}
