(() => {
    "use strict";
    const t = {
            radius: 20,
            growthAndShrinkTimes: 1.25,
            leafNodeSpace: 75,
            lineHeight: 90,
            textFont: "Poppins",
            strokeColor: "#f56042",
            colorArray: [{
                bgColor: "#fff2e0",
                borderColor: "#f56042"
            }]
        },
        e = function(t, e, i) {
            return `rgb(${t}, ${e}, ${i})`
        },
        i = class {
            constructor(t) {
                this.currentHoveringColor = "";
                const i = document.createElement("canvas");
                this.$el = t, this.$hitEl = i, this.colorGenerator = new class {
                    constructor() {
                        this.red = 0, this.green = 0, this.blue = 1
                    }
                    incrementColor(t) {
                        this[t] = (this[t] + 10) % 256
                    }
                    getNextColor() {
                        const t = e(this.red, this.green, this.blue);
                        return this.incrementColor("blue"), this.blue < 10 && (this.incrementColor("green"), this.green < 10 && this.incrementColor("red")), t
                    }
                }
            }
            clearCanvas() {
                const {
                    height: t,
                    width: e
                } = this.$el;
                this.getContext().clearRect(0, 0, e, t)
            }
            setMaxWidthAndHeight(t, e) {
                this.$hitEl.height = this.$el.height = t, this.$hitEl.width = this.$el.width = e
            }
            getHitContext() {
                const t = this.$hitEl.getContext("2d");
                if (!t) throw new Error("Cannot get 2d context");
                return t
            }
            getContext() {
                const t = this.$el.getContext("2d");
                if (!t) throw new Error("Cannot get 2d context");
                return t
            }
            getNextColor() {
                return this.colorGenerator.getNextColor()
            }
            onHover(t) {
                this.$el.addEventListener("mousemove", (i => {
                    const {
                        pageX: r,
                        pageY: n
                    } = i, {
                        data: o
                    } = this.getHitContext().getImageData(r - this.$el.offsetLeft, n - this.$el.offsetTop, 1, 1), s = e(o[0], o[1], o[2]);
                    this.currentHoveringColor !== s && (this.currentHoveringColor = s, t(s))
                }))
            }
            onClick(t) {
                this.$el.addEventListener("click", (i => {
                    const {
                        pageX: r,
                        pageY: n
                    } = i;
                    console.log(r, n);
                    const {
                        data: o
                    } = this.getHitContext().getImageData(r - this.$el.offsetLeft, n - this.$el.offsetTop, 1, 1);
                    t(e(o[0], o[1], o[2]))
                }))
            }
        };
    var r;

    function n(e) {
        return (e + 2) * t.leafNodeSpace
    }

    function o(e) {
        return e * t.leafNodeSpace
    }

    function s(e) {
        return e * t.lineHeight
    }

    function a(t, e, i, r) {
        const o = n(t),
            a = s(e + 1);
        return {
            maxCanvasHeightRequired: a,
            maxCanvasWidthRequired: o,
            actualMaxHeight: a > r ? a : r,
            actualMaxWidth: o > i ? o : i
        }
    }! function(t) {
        t[t.SIMPLE = 0] = "SIMPLE", t[t.PRETTY = 1] = "PRETTY", t[t.EXPANDABLE = 2] = "EXPANDABLE", t[t.HIGHLIGHT = 3] = "HIGHLIGHT"
    }(r || (r = {}));
    const h = function(e, i, r) {
        const {
            xStart: n,
            xEnd: o
        } = i, {
            yStart: s,
            yEnd: a
        } = r, h = (s + a) / 2, l = (n + o) / 2;
        new class {
            constructor(t, e, i, r, n) {
                const {
                    x: o,
                    y: s
                } = e, {
                    x: a,
                    y: h
                } = i, {
                    x: l,
                    y: c
                } = r, {
                    x: d,
                    y: u
                } = n;
                this.color = t, this.xStart = o, this.yStart = s, this.cp1x = a, this.cp1y = h, this.cp2x = l, this.cp2y = c, this.xEnd = d, this.yEnd = u
            }
            draw(t) {
                t.beginPath(), t.moveTo(this.xStart, this.yStart), t.strokeStyle = this.color, t.bezierCurveTo(this.cp1x, this.cp1y, this.cp2x, this.cp2y, this.xEnd, this.yEnd), t.stroke()
            }
        }(t.strokeColor, {
            x: n,
            y: s
        }, {
            x: l,
            y: h
        }, {
            x: o,
            y: h
        }, {
            x: o,
            y: a
        }).draw(e.getContext())
    };
    let l, c, d;

    function u(t, e, i, r) {
        l && cancelAnimationFrame(l), l = window.requestAnimationFrame((() => {
            e.clearCanvas(), g(t, e, i, r) && u(t, e, i, r)
        }))
    }

    function g(e, i, r, n) {
        const {
            x: s,
            y: a
        } = r;
        let l = function(t, e, i, r) {
            const {
                x: n,
                y: o
            } = i;
            return t.nodeCircle.setCoordinates(n, o), t.nodeCircle.draw(e) === c && r ? t.nodeCircle.grow() : t.nodeCircle.restoreCircle()
        }(e, i, {
            x: s,
            y: a
        }, n);
        e.nodeCircle.setCoordinates(s, a), e.nodeCircle.draw(i);
        const {
            left: u,
            right: x
        } = d.get(e);
        if (e.left) {
            const r = d.get(e.left).left,
                c = a + t.lineHeight,
                x = {
                    x: s - o(u - r),
                    y: c
                };
            l = g(e.left, i, x, n) || l, h(i, {
                xStart: s,
                xEnd: x.x
            }, {
                yStart: a + e.nodeCircle.getRadius(),
                yEnd: c - e.left.nodeCircle.getRadius()
            })
        }
        if (e.right) {
            const r = d.get(e.right).right,
                c = a + t.lineHeight,
                u = {
                    x: s + o(x - r),
                    y: c
                };
            l = g(e.right, i, u, n) || l, h(i, {
                xStart: s,
                xEnd: u.x
            }, {
                yStart: a + e.nodeCircle.getRadius(),
                yEnd: c - e.right.nodeCircle.getRadius()
            })
        }
        return l
    }

    function x(t) {
        const e = t.left ? x(t.left) + .5 : 0,
            i = t.right ? x(t.right) + .5 : 0;
        return d.set(t, {
            left: e,
            right: i
        }), e + i
    }
    const f = function(t, e, r) {
        d = new Map;
        const n = x(t),
            h = t.getHeight(),
            {
                maxHeight: l,
                maxWidth: g,
                highlightMode: f
            } = r,
            {
                maxCanvasWidthRequired: C,
                actualMaxHeight: m,
                actualMaxWidth: y
            } = a(n, h, g, l),
            S = d.get(t).left,
            w = y / 2 - C / 2,
            E = new i(e);
        E.setMaxWidthAndHeight(m, y), E.onHover((e => {
            c = e, u(t, E, {
                x: w + o(S + 1),
                y: s(.5)
            }, Boolean(f))
        })), u(t, E, {
            x: w + o(S + 1),
            y: s(.5)
        }, Boolean(f))
    };
    let C, m, y, S = new Map;

    function w(e, i, r) {
        C && cancelAnimationFrame(C), C = window.requestAnimationFrame((() => function(e, i, r) {
            const a = m.length + 1,
                {
                    left: h,
                    right: l
                } = function() {
                    let t = 0,
                        e = 0,
                        i = 0;
                    for (const r of m) "left" === r ? i -= 1 : i += 1, i < 0 ? t = Math.max(Math.abs(i), t) : e = Math.max(i, e);
                    return {
                        left: t,
                        right: e
                    }
                }(),
                c = s(a + 1),
                d = n(h + l),
                u = Math.max(c, r.maxHeight),
                g = Math.max(d, r.maxWidth),
                x = g / 2 - d / 2;
            i.setMaxWidthAndHeight(u, g), S = new Map,
                function(e, i, r) {
                    let n = e,
                        o = r,
                        a = .5;
                    const h = [];
                    let l = E(e, i, [...h], {
                        x: o,
                        y: s(a)
                    });
                    for (const e of m) l = H(n, i, o, a, h) || l, "left" === e ? (n = n.left, o -= .5 * t.leafNodeSpace, h.push("left")) : (n = n.right, o += .5 * t.leafNodeSpace, h.push("right")), a += 1;
                    return l = H(n, i, o, a, h) || l, l
                }(e, i, x + o(h + 1)) && w(e, i, r)
        }(e, i, r)))
    }

    function E(t, e, i, r) {
        const {
            x: n,
            y: o
        } = r, s = Boolean(t.left || t.right);
        t.nodeCircle.setCoordinates(n, o);
        const a = t.nodeCircle.draw(e);
        return S.set(a, i), a === y && s ? t.nodeCircle.grow() : t.nodeCircle.restoreCircle()
    }

    function H(e, i, r, n, o) {
        const a = s(n),
            l = s(n + 1);
        let c = !1;
        if (e.left) {
            const n = e.left.left || e.left.right ? [...o, "left"] : [...o],
                s = r - .5 * t.leafNodeSpace;
            c = E(e.left, i, n, {
                x: s,
                y: l
            }) || c, h(i, {
                xStart: r,
                xEnd: s
            }, {
                yStart: a + e.nodeCircle.getRadius(),
                yEnd: l - e.left.nodeCircle.getRadius()
            })
        }
        if (e.right) {
            const n = e.right.left || e.right.right ? [...o, "right"] : [...o],
                s = r + .5 * t.leafNodeSpace;
            c = E(e.right, i, n, {
                x: s,
                y: l
            }) || c, h(i, {
                xStart: r,
                xEnd: s
            }, {
                yStart: a + e.nodeCircle.getRadius(),
                yEnd: l - e.right.nodeCircle.getRadius()
            })
        }
        return c
    }

    function p(e, i, r, n) {
        const {
            xStart: o,
            xEnd: a
        } = n, l = (o + a) / 2, c = r * t.lineHeight;
        e.nodeCircle.setCoordinates(l, c), e.nodeCircle.draw(i), e.left && (p(e.left, i, r + 1, {
            xStart: o,
            xEnd: l
        }), h(i, {
            xStart: l,
            xEnd: (o + l) / 2
        }, {
            yStart: c + t.radius,
            yEnd: s(r + 1) - t.radius
        })), e.right && (p(e.right, i, r + 1, {
            xStart: l,
            xEnd: a
        }), h(i, {
            xStart: l,
            xEnd: (l + a) / 2
        }, {
            yStart: c + t.radius,
            yEnd: s(r + 1) - t.radius
        }))
    }
    const v = function(e, r, n) {
            const o = e.getHeight(),
                s = (h = o, Math.pow(2, h - 1));
            var h;
            const {
                maxHeight: l,
                maxWidth: c
            } = n, {
                maxCanvasWidthRequired: d,
                actualMaxHeight: u,
                actualMaxWidth: g
            } = a(s, o, c, l), x = g / 2, f = x - d / 2 + t.leafNodeSpace, C = x + d / 2 - t.leafNodeSpace, m = new i(r);
            m.setMaxWidthAndHeight(u, g), p(e, m, .5, {
                xStart: f,
                xEnd: C
            })
        },
        M = function(t, e, n = {}) {
            const {
                type: o = r.SIMPLE,
                maxHeight: s = window.innerHeight,
                maxWidth: a = window.innerWidth
            } = n;
            switch (o) {
                case r.PRETTY:
                    f(t, e, {
                        maxHeight: s,
                        maxWidth: a
                    });
                    break;
                case r.EXPANDABLE:
                    ! function(t, e, r) {
                        const n = new i(e);
                        m = [], n.onClick((e => {
                            m = S.get(e) || m, w(t, n, r)
                        })), n.onHover((e => {
                            y = e, w(t, n, r)
                        })), w(t, n, r)
                    }(t, e, {
                        maxHeight: s,
                        maxWidth: a
                    });
                    break;
                case r.HIGHLIGHT:
                    f(t, e, {
                        maxHeight: s,
                        maxWidth: a,
                        highlightMode: !0
                    });
                    break;
                default:
                    v(t, e, {
                        maxHeight: s,
                        maxWidth: a
                    })
            }
        };
    let R = "",
        I = "",
        T = "";

    function b(t) {
        null != t && (b(t.left), R += t.value + " ", b(t.right))
    }

    function L(t) {
        null != t && (I += t.value + " ", L(t.left), L(t.right))
    }

    function $(t) {
        null != t && ($(t.left), $(t.right), T += t.value + " ")
    }
    window.start = function() {
        var e = document.getElementById("txt").value.split(",").map((function(t) {
            return t.trim()
        }));
        if ("" === e[0]) {
            document.getElementById("preOrder").innerHTML = "", document.getElementById("inOrder").innerHTML = "", document.getElementById("postOrder").innerHTML = "";
            let t = document.querySelector("canvas");
            return void t.getContext("2d").clearRect(0, 0, t.width, t.height)
        }
        let i = function(e) {
            let i = [];
            e.forEach((e => {
                "null" === e.toLowerCase() || "none" === e.toLowerCase() ? i.push(null) : i.push(new class {
                    constructor(e) {
                        this.value = e, this.nodeCircle = new class {
                            constructor(e, i, r) {
                                this.colorId = "", this.x = -1, this.y = -1, this.value = e, this.colorSettings = r, this.radiusSettings = {
                                    currentRadius: i,
                                    originalRadius: i,
                                    maxRadius: i * t.growthAndShrinkTimes,
                                    minRadius: i / t.growthAndShrinkTimes
                                }
                            }
                            drawCircle(t, e, i) {
                                const {
                                    x: r,
                                    y: n
                                } = this;
                                t.beginPath(), t.fillStyle = i, t.arc(r, n, e, 0, 2 * Math.PI, !1), t.fill()
                            }
                            drawBorder(t) {
                                const {
                                    x: e,
                                    y: i,
                                    colorSettings: r,
                                    radiusSettings: {
                                        currentRadius: n
                                    }
                                } = this, {
                                    borderColor: o
                                } = r;
                                t.arc(e, i, n, 0, 2 * Math.PI, !1), t.strokeStyle = o, t.stroke()
                            }
                            writeText(e) {
                                const {
                                    x: i,
                                    y: r,
                                    value: n,
                                    colorSettings: o
                                } = this, {
                                    borderColor: s
                                } = o;
                                let a = "10pt",
                                    h = 5;
                                n.length > 3 && (a = "8pt", h = 3), e.fillStyle = s, e.font = `${a} ${t.textFont}`, e.textAlign = "center", e.fillText(n, i, r + h)
                            }
                            getRadius() {
                                const {
                                    radiusSettings: {
                                        currentRadius: t
                                    }
                                } = this;
                                return t
                            }
                            grow(t = this.radiusSettings.maxRadius) {
                                const {
                                    radiusSettings: {
                                        currentRadius: e
                                    }
                                } = this;
                                if (e < t) {
                                    const i = e + .3;
                                    return this.radiusSettings.currentRadius = i > t ? t : i, !0
                                }
                                return !1
                            }
                            shrink(t = this.radiusSettings.minRadius) {
                                const {
                                    radiusSettings: {
                                        currentRadius: e
                                    }
                                } = this;
                                if (e > t) {
                                    const i = e - .3;
                                    return this.radiusSettings.currentRadius = i < t ? t : i, !0
                                }
                                return !1
                            }
                            restoreCircle() {
                                const {
                                    radiusSettings: {
                                        currentRadius: t,
                                        originalRadius: e
                                    }
                                } = this;
                                return t > e ? this.shrink(e) : t < e && this.grow(e)
                            }
                            setColorId(t) {
                                this.colorId = t
                            }
                            setCoordinates(t, e) {
                                this.x = t, this.y = e
                            }
                            draw(t) {
                                const {
                                    radiusSettings: {
                                        currentRadius: e
                                    },
                                    colorSettings: {
                                        bgColor: i
                                    }
                                } = this;
                                return this.colorId = this.colorId ? this.colorId : t.getNextColor(), this.drawCircle(t.getContext(), e, i), this.drawCircle(t.getHitContext(), e, this.colorId), this.drawBorder(t.getContext()), this.writeText(t.getContext()), this.colorId
                            }
                        }(`${e}`, t.radius, function() {
                            const {
                                colorArray: e
                            } = t;
                            return e[Math.floor(Math.random() * e.length)]
                        }())
                    }
                    setLeft(t) {
                        this.left = t
                    }
                    setRight(t) {
                        this.right = t
                    }
                    getHeight() {
                        var t, e;
                        const i = (null === (t = this.left) || void 0 === t ? void 0 : t.getHeight()) || 0,
                            r = (null === (e = this.right) || void 0 === e ? void 0 : e.getHeight()) || 0;
                        return Math.max(i, r) + 1
                    }
                }(e))
            }));
            let r = i.slice().reverse(),
                n = r.pop();
            return i.forEach((t => {
                t && (r && (t.left = r.pop()), r && (t.right = r.pop()))
            })), n
        }(e);
        M(i, document.querySelector("canvas"), {
            type: r.SIMPLE
        }), I = "", L(i), document.getElementById("preOrder").innerHTML = "<b>Pre-order:</b> " + I.trim(), R = "", b(i), document.getElementById("inOrder").innerHTML = "<b>In-order:</b> " + R.trim(), T = "", $(i), document.getElementById("postOrder").innerHTML = "<b>Post-order:</b> " + T.trim()
    }
})();
