(function (c) {
    var b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var d = function (f) {
        f = f.replace(/\x0d\x0a/g, "\x0a");
        var e = "";
        for (var h = 0; h < f.length; h++) {
            var g = f.charCodeAt(h);
            if (g < 128) {
                e += String.fromCharCode(g)
            } else {
                if ((g > 127) && (g < 2048)) {
                    e += String.fromCharCode((g >> 6) | 192);
                    e += String.fromCharCode((g & 63) | 128)
                } else {
                    e += String.fromCharCode((g >> 12) | 224);
                    e += String.fromCharCode(((g >> 6) & 63) | 128);
                    e += String.fromCharCode((g & 63) | 128)
                }
            }
        }
        return e
    };
    var a = function (e) {
        var f = "";
        var g = 0;
        var h = c1 = c2 = 0;
        while (g < e.length) {
            h = e.charCodeAt(g);
            if (h < 128) {
                f += String.fromCharCode(h);
                g++
            } else {
                if ((h > 191) && (h < 224)) {
                    c2 = e.charCodeAt(g + 1);
                    f += String.fromCharCode(((h & 31) << 6) | (c2 & 63));
                    g += 2
                } else {
                    c2 = e.charCodeAt(g + 1);
                    c3 = e.charCodeAt(g + 2);
                    f += String.fromCharCode(((h & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    g += 3
                }
            }
        }
        return f
    };
    c.extend({
        be: function (g) {
            var e = "";
            var o, m, k, n, l, j, h;
            var f = 0;
            g = d(g);
            while (f < g.length) {
                o = g.charCodeAt(f++);
                m = g.charCodeAt(f++);
                k = g.charCodeAt(f++);
                n = o >> 2;
                l = ((o & 3) << 4) | (m >> 4);
                j = ((m & 15) << 2) | (k >> 6);
                h = k & 63;
                if (isNaN(m)) {
                    j = h = 64
                } else {
                    if (isNaN(k)) {
                        h = 64
                    }
                }
                e = e + b.charAt(n) + b.charAt(l) + b.charAt(j) + b.charAt(h)
            }
            return e
        },
        bd: function (g) {
            var e = "";
            var o, m, k;
            var n, l, j, h;
            var f = 0;
            g = g.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (f < g.length) {
                n = b.indexOf(g.charAt(f++));
                l = b.indexOf(g.charAt(f++));
                j = b.indexOf(g.charAt(f++));
                h = b.indexOf(g.charAt(f++));
                o = (n << 2) | (l >> 4);
                m = ((l & 15) << 4) | (j >> 2);
                k = ((j & 3) << 6) | h;
                e = e + String.fromCharCode(o);
                if (j != 64) {
                    e = e + String.fromCharCode(m)
                }
                if (h != 64) {
                    e = e + String.fromCharCode(k)
                }
            }
            e = a(e);
            return e
        }
    })
})


function incarcaStatii() {
    $.get("x.json", function (data) {
        var data = eval("(" + $.bd(data) + ")");
		document.write("data");
       return data;
        }
    )
}

