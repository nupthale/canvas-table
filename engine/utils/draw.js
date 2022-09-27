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
    ctx.moveTo(startX + 0, startY + 0);
    ctx.lineTo(endX + 0, endY + 0);
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

export const drawStrokeRect = (
    ctx,
    startX,
    startY,
    width,
    height,
    lineWidth = 1,
    color,
    borderRadius,
) => {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

    roundRect(ctx, startX, startY, width, height, borderRadius);
    ctx.stroke();

    ctx.restore();
};

export const roundRect = function (ctx, x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.arcTo(x+w, y,   x+w, y+h, r);
    ctx.arcTo(x+w, y+h, x,   y+h, r);
    ctx.arcTo(x,   y+h, x,   y,   r);
    ctx.arcTo(x,   y,   x+w, y,   r);
    ctx.closePath();
}

export const shadowRect = ({
    ctx,
    x = 15,
    y = 15,
    w = 100,
    h = 40,
    fillStyle = '#fff',
    shadowOffsetX = 0,
    shadowOffsetY = 7,
    shadowBlur = 29,
    shadowColor = "rgba(100, 100, 111, 0.2)"
} = {}) => {
    ctx.save();

    ctx.shadowOffsetX = shadowOffsetX;
    ctx.shadowOffsetY = shadowOffsetY;
    ctx.shadowBlur = shadowBlur;
    ctx.shadowColor = shadowColor;
    ctx.fillStyle = fillStyle;
    ctx.fillRect(x, y, w, h);

    ctx.restore();
}

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

export const clipRect = (ctx, x, y, width, height, callback) => {
    ctx.save();

    ctx.rect(
        x,
        y,
        width,
        height
    );

    // 不clip的话， 超出部分会显示出来， clip相当于overflow： hidden的效果
    ctx.clip();

    callback();

    ctx.restore();
}
