module.exports.generateRandomColor = () => {
    let c = '#';
    for (let i = 0; i < 6; i++)
        c += 'ABCDEF0123456789'[random(0, 15)];
    return c;
}

module.exports.hexToRgbA = (hex) => {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length == 3) c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        c = '0x' + c.join('');
        let color = {
            r: (c >> 16) & 255,
            g: (c >> 8) & 255,
            b: c & 255,
            a: 1
        }
        return color;
    }
    throw new Error('Bad Hex');
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

module.exports.rgbToHex = (r, g, b) => {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}