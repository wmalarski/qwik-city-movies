/**
 * @license
 * @builder.io/qwik 0.11.1
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */ const Ke = (e) => e && typeof e.nodeType == "number",
  Ir = (e) => e && e.nodeType === 9,
  De = (e) => e.nodeType === 1,
  ut = (e) => Ke(e) && (e.nodeType === 1 || e.nodeType === 111),
  Ne = (e) => e.nodeType === 111,
  is = (e) => e.nodeType === 3,
  At = (e) => e.nodeType === 8,
  Pt = (e, ...t) => {
    const n = e instanceof Error ? e : new Error(e);
    return (
      typeof globalThis._handleError == "function" && e instanceof Error
        ? globalThis._handleError(e, t)
        : console.error("%cQWIK ERROR", "", n.message, ...di(t), n.stack),
      n
    );
  },
  as = (e, ...t) => Pt(e, ...t),
  di = (e) => e,
  te = (e, ...t) => {
    const n = pn(e);
    return as(n, ...t);
  },
  pn = (e) => `Code(${e})`,
  cs = (e) => {
    const t = Object.getPrototypeOf(e);
    return t === Object.prototype || t === null;
  },
  me = (e) => e && typeof e == "object",
  Q = (e) => Array.isArray(e),
  Mt = (e) => typeof e == "string",
  _e = (e) => typeof e == "function";
let ls = {
  isServer: !1,
  importSymbol(e, t, n) {
    const s = ((i, a, l) => {
        var m;
        const d = i.baseURI,
          u = new URL((m = a.getAttribute("q:base")) != null ? m : d, d);
        return new URL(l, u);
      })(e.ownerDocument, e, t).toString(),
      r = new URL(s);
    return (
      (r.hash = ""),
      (r.search = ""),
      import(r.href).then((i) =>
        ((a, l) => {
          if (l in a) return a[l];
          for (const d of Object.values(a)) if (me(d) && l in d) return d[l];
        })(i, n)
      )
    );
  },
  raf: (e) =>
    new Promise((t) => {
      requestAnimationFrame(() => {
        t(e());
      });
    }),
  nextTick: (e) =>
    new Promise((t) => {
      setTimeout(() => {
        t(e());
      });
    }),
  chunkForSymbol() {},
};
const ui = (e) => (ls = e),
  gn = () => ls,
  Ge = () => ls.isServer,
  ie = (e) => e instanceof Promise,
  ds = (e, t, n) => {
    try {
      const s = e();
      return ie(s) ? s.then(t, n) : t(s);
    } catch (s) {
      return n(s);
    }
  },
  D = (e, t) => (ie(e) ? e.then(t) : t(e)),
  us = (e) => (e.some(ie) ? Promise.all(e) : e),
  Er = (e) => (e.length > 0 ? Promise.all(e) : e),
  Wn = (e) => e != null,
  mi = (e) =>
    new Promise((t) => {
      setTimeout(t, e);
    }),
  Te = [],
  Ie = {},
  R = (e, t, n = Te) => Rs(null, t, e, null, null, n, null),
  ms = (e, t = {}) => {
    var d;
    let n = e.$symbol$,
      s = e.$chunk$;
    const r = (d = e.$refSymbol$) != null ? d : n,
      o = gn();
    if (o) {
      const u = o.chunkForSymbol(r);
      u && ((s = u[1]), e.$refSymbol$ || (n = u[0]));
    }
    if (!s) throw te(31, e);
    s.startsWith("./") && (s = s.slice(2));
    const i = [s, "#", n],
      a = e.$capture$,
      l = e.$captureRef$;
    if (l && l.length) {
      if (t.$getObjId$) {
        const u = l.map(t.$getObjId$);
        i.push(`[${u.join(" ")}]`);
      } else if (t.$addRefMap$) {
        const u = l.map(t.$addRefMap$);
        i.push(`[${u.join(" ")}]`);
      }
    } else a && a.length > 0 && i.push(`[${a.join(" ")}]`);
    return i.join("");
  },
  Nr = (e, t) => {
    t.$element$;
    const n = { $element$: t.$element$, $addRefMap$: (s) => hi(t.$refMap$, s) };
    return e.map((s) => ms(s, n)).join(`
`);
  },
  yn = (e, t) => {
    const n = e.length,
      s = Ws(e, 0, "#"),
      r = Ws(e, s, "["),
      o = Math.min(s, r),
      i = e.substring(0, o),
      a = s == n ? s : s + 1,
      l = r,
      d = a == l ? "default" : e.substring(a, l),
      u = r,
      m = n,
      h = u === m ? Te : e.substring(u + 1, m - 1).split(" "),
      p = Rs(i, d, null, null, h, null, null);
    return t && p.$setContainer$(t), p;
  },
  Ws = (e, t, n) => {
    const s = e.length,
      r = e.indexOf(n, t == s ? 0 : t);
    return r == -1 ? s : r;
  },
  hi = (e, t) => {
    const n = e.indexOf(t);
    return n === -1 ? (e.push(t), e.length - 1) : n;
  },
  Rr = (e, t) => (
    e.$capture$,
    (e.$captureRef$ = e.$capture$.map((n) => {
      const s = parseInt(n, 10),
        r = t.$refMap$[s];
      return t.$refMap$.length, r;
    }))
  ),
  $e = "q:slot";
let bt;
const Dt = () => {
    if (!bt) {
      const e = typeof document < "u" && document && document.__q_context__;
      return e ? (Q(e) ? (document.__q_context__ = Ar(e)) : e) : void 0;
    }
    return bt;
  },
  hs = () => {
    const e = Dt();
    if (!e) throw te(14);
    return e;
  },
  fs = () => {
    const e = hs();
    if (e.$event$ !== "qRender") throw te(20);
    return e.$hostElement$, e.$waitOn$, e.$renderCtx$, e.$subscriber$, e;
  },
  Bs = (e) => {
    if (e == null) return e;
    const t = hs();
    return (...n) => Re(t, e.bind(void 0, ...n));
  },
  Re = (e, t, ...n) => {
    const s = bt;
    let r;
    try {
      (bt = e), (r = t.apply(null, n));
    } finally {
      bt = s;
    }
    return r;
  },
  fi = (e, t) => {
    const n = e.$waitOn$;
    if (n.length === 0) {
      const s = t();
      ie(s) && n.push(s);
    } else n.push(Promise.all(n).then(t));
  },
  Ar = (e) => {
    const t = e[0];
    return Ae(void 0, t, e[1], e[2]);
  },
  Ae = (e, t, n, s) => ({
    $seq$: 0,
    $hostElement$: e,
    $element$: t,
    $event$: n,
    $url$: s,
    $qrl$: void 0,
    $props$: void 0,
    $renderCtx$: void 0,
    $subscriber$: void 0,
    $waitOn$: void 0,
  }),
  Pr = (e) => e.closest("[q\\:container]"),
  ke = (e) => e._qc_,
  Y = (e) => {
    let t = ke(e);
    return (
      t ||
        (e._qc_ = t =
          {
            $dirty$: !1,
            $mounted$: !1,
            $needAttachListeners$: !1,
            $id$: "",
            $element$: e,
            $refMap$: [],
            li: [],
            $watches$: null,
            $seq$: null,
            $slots$: null,
            $scopeIds$: null,
            $appendStyles$: null,
            $props$: null,
            $vdom$: null,
            $componentQrl$: null,
            $contexts$: null,
            $parent$: null,
          }),
      t
    );
  },
  ps = (e) => e.replace(/([A-Z])/g, "-$1").toLowerCase(),
  pi = /^(on|window:|document:)/,
  gs = (e) => e.endsWith("$") && pi.test(e),
  Mr = (e) => {
    if (e.length === 0) return Te;
    if (e.length === 1) {
      const n = e[0];
      return [[n[0], [n[1]]]];
    }
    const t = [];
    for (let n = 0; n < e.length; n++) {
      const s = e[n][0];
      t.includes(s) || t.push(s);
    }
    return t.map((n) => [n, e.filter((s) => s[0] === n).map((s) => s[1])]);
  },
  Or = (e, t, n, s) => (
    t.endsWith("$"),
    (t = Cr(t.slice(0, -1))),
    n &&
      (Q(n) ? e.push(...n.map((r) => [t, Qs(r, s)])) : e.push([t, Qs(n, s)])),
    t
  ),
  Fs = ["on", "window:on", "document:on"],
  gi = ["on", "on-window", "on-document"],
  Cr = (e) => {
    let t = "on";
    for (let n = 0; n < Fs.length; n++) {
      const s = Fs[n];
      if (e.startsWith(s)) {
        (t = gi[n]), (e = e.slice(s.length));
        break;
      }
    }
    return t + ":" + (e.startsWith("-") ? ps(e.slice(1)) : e.toLowerCase());
  },
  Qs = (e, t) => (e.$setContainer$(t), e),
  yi = (e, t) => {
    const n = e.$element$.attributes,
      s = [];
    for (let r = 0; r < n.length; r++) {
      const { name: o, value: i } = n.item(r);
      if (
        o.startsWith("on:") ||
        o.startsWith("on-window:") ||
        o.startsWith("on-document:")
      ) {
        const a = i.split(`
`);
        for (const l of a) {
          const d = yn(l, t);
          d.$capture$ && Rr(d, e), s.push([o, d]);
        }
      }
    }
    return s;
  },
  Ot = () => {
    const e = fs(),
      t = e.$seq$,
      n = e.$hostElement$,
      s = Y(n),
      r = s.$seq$ ? s.$seq$ : (s.$seq$ = []);
    return e.$seq$++, { get: r[t], set: (o) => (r[t] = o), i: t, ctx: e };
  },
  vi = (e, t) => Lr(`on-${e}`, t),
  Us = (e, t) => Lr(`document:on-${e}`, t),
  Lr = (e, t) => {
    const n = fs(),
      s = Y(n.$hostElement$);
    s.li.push([Cr(e), t]), (s.$needAttachListeners$ = !0);
  },
  Ks = Symbol("ContainerState"),
  Ht = (e) => {
    let t = e[Ks];
    return t || (e[Ks] = t = zr(e)), t;
  },
  zr = (e) => {
    const t = {
      $containerEl$: e,
      $elementIndex$: 0,
      $proxyMap$: new WeakMap(),
      $opsNext$: new Set(),
      $watchNext$: new Set(),
      $watchStaging$: new Set(),
      $hostsNext$: new Set(),
      $hostsStaging$: new Set(),
      $styleIds$: new Set(),
      $events$: new Set(),
      $envData$: {},
      $renderPromise$: void 0,
      $hostsRendering$: void 0,
      $subsManager$: null,
    };
    return (t.$subsManager$ = Fa(t)), t;
  },
  ys = (e, t) => {
    if (_e(e)) return e(t);
    if (me(e)) {
      if ("current" in e) return (e.current = t);
      if ("value" in e) return (e.value = t);
    }
    throw te(32, e);
  },
  Vt = (e, t) => {
    var n;
    const s = _i(e);
    if (!Ge())
      try {
        ((n = globalThis).qwikevents || (n.qwikevents = [])).push(s);
      } catch {}
    t.$events$.add(s);
  },
  Gs = (e) => De(e) && e.hasAttribute("q:container"),
  qt = (e) => e.toString(36),
  st = (e) => parseInt(e, 36),
  _i = (e) => {
    const t = e.indexOf(":");
    return e && e.slice(t + 1).replace(/-./g, (n) => n[1].toUpperCase());
  },
  ue = (e, t, n) => e.setAttribute(t, n),
  Pe = (e, t) => e.getAttribute(t),
  c = (e, t, n) => {
    const s = n == null ? null : String(n);
    return new Dr(e, t, s);
  };
class Dr {
  constructor(t, n, s = null) {
    (this.type = t), (this.props = n), (this.key = s);
  }
}
const vn = (e) => e instanceof Dr,
  W = (e) => e.children,
  vs = Symbol("skip render"),
  Hr = () => null,
  Ct = (e) => e.children,
  Vr = () => null,
  _n = (e) =>
    typeof document < "u" ? document : e.nodeType === 9 ? e : e.ownerDocument,
  _s = (e, t, n, s) => {
    e
      ? e.$operations$.push({ $operation$: Ys, $args$: [t, n, s] })
      : Ys(t, n, s);
  },
  Ys = (e, t, n) => {
    if (n == null || n === !1) e.removeAttribute(t);
    else {
      const s = n === !0 ? "" : String(n);
      ue(e, t, s);
    }
  },
  Ze = (e, t, n, s) => {
    e
      ? e.$operations$.push({ $operation$: Js, $args$: [t, n, s] })
      : Js(t, n, s);
  },
  Js = (e, t, n) => {
    try {
      (e[t] = n == null ? "" : n),
        n == null && Ke(e) && De(e) && e.removeAttribute(t);
    } catch (s) {
      Pt(pn(6), { node: e, key: t, value: n }, s);
    }
  },
  $s = (e, t, n) => (n ? e.createElementNS(ks, t) : e.createElement(t)),
  et = (e, t, n, s) => (
    e.$operations$.push({ $operation$: bn, $args$: [t, n, s || null] }), n
  ),
  Xs = (e, t, n) => (
    e.$operations$.push({ $operation$: Ut, $args$: [t, n] }), n
  ),
  er = (e, t, n) => {
    const s = e.classList;
    s.remove(...t), s.add(...n);
  },
  $i = (e, t) => {
    const n = _n(e),
      s = n.documentElement === e,
      r = n.head,
      o = n.createElement("style");
    ue(o, "q:style", t.styleId),
      (o.textContent = t.content),
      s && r ? Ut(r, o) : bn(e, o, e.firstChild);
  },
  Zr = (e, t) => {
    e.$operations$.push({ $operation$: bi, $args$: [t, e] });
  },
  bi = (e, t) => {
    const n = e.parentElement;
    if (n) {
      if (e.nodeType === 1 || e.nodeType === 111) {
        const s = t.$containerState$.$subsManager$;
        Is(e, t, s, !0);
      }
      Bi(n, e);
    }
  },
  Wr = (e, t) => {
    const n = $s(e, "q:template", !1);
    return ue(n, $e, t), ue(n, "hidden", ""), ue(n, "aria-hidden", "true"), n;
  },
  wi = (e) => {
    for (const t of e.$operations$) t.$operation$.apply(void 0, t.$args$);
    xi(e);
  },
  Bn = (e) => Pe(e, "q:key"),
  Pn = (e, t) => {
    t !== null && ue(e, "q:key", t);
  },
  xi = (e) => {
    const t = e.$containerState$.$subsManager$;
    for (const n of e.$rmSlots$) {
      const s = Bn(n),
        r = jt(n, "root");
      if (r.length > 0) {
        const o = n.getAttribute("q:sref"),
          i = e.$roots$.find((a) => a.$id$ === o);
        if (i) {
          const a = Wr(e.$doc$, s),
            l = i.$element$;
          for (const d of r) Ut(a, d);
          bn(l, a, l.firstChild);
        } else Is(n, e, t, !1);
      }
    }
    for (const [n, s] of e.$addSlots$) {
      const r = Bn(n),
        o = Array.from(s.childNodes).find(
          (i) => eo(i) && i.getAttribute($e) === r
        );
      o &&
        (jt(o, "root").forEach((i) => {
          Ut(n, i);
        }),
        o.remove());
    }
  };
class bs {
  constructor(t, n) {
    (this.open = t),
      (this.close = n),
      (this._qc_ = null),
      (this.nodeType = 111),
      (this.localName = ":virtual"),
      (this.nodeName = ":virtual");
    const s = (this.ownerDocument = t.ownerDocument);
    (this.template = $s(s, "template", !1)),
      (this.attributes = ((r) => {
        if (!r) return new Map();
        const o = r.split(" ");
        return new Map(
          o.map((i) => {
            const a = i.indexOf("=");
            return a >= 0
              ? [i.slice(0, a), ((l = i.slice(a + 1)), l.replace(/\+/g, " "))]
              : [i, ""];
            var l;
          })
        );
      })(t.data.slice(3))),
      t.data.startsWith("qv "),
      (t.__virtual = this);
  }
  insertBefore(t, n) {
    const s = this.parentElement;
    if (s) {
      const r = n || this.close;
      s.insertBefore(t, r);
    } else this.template.insertBefore(t, n);
    return t;
  }
  remove() {
    const t = this.parentElement;
    if (t) {
      const n = Array.from(this.childNodes);
      this.template.childElementCount,
        t.removeChild(this.open),
        this.template.append(...n),
        t.removeChild(this.close);
    }
  }
  appendChild(t) {
    return this.insertBefore(t, null);
  }
  insertBeforeTo(t, n) {
    const s = Array.from(this.childNodes);
    t.insertBefore(this.open, n);
    for (const r of s) t.insertBefore(r, n);
    t.insertBefore(this.close, n), this.template.childElementCount;
  }
  appendTo(t) {
    this.insertBeforeTo(t, null);
  }
  get namespaceURI() {
    var t, n;
    return (n = (t = this.parentElement) == null ? void 0 : t.namespaceURI) !=
      null
      ? n
      : "";
  }
  removeChild(t) {
    this.parentElement
      ? this.parentElement.removeChild(t)
      : this.template.removeChild(t);
  }
  getAttribute(t) {
    var n;
    return (n = this.attributes.get(t)) != null ? n : null;
  }
  hasAttribute(t) {
    return this.attributes.has(t);
  }
  setAttribute(t, n) {
    this.attributes.set(t, n), (this.open.data = tr(this.attributes));
  }
  removeAttribute(t) {
    this.attributes.delete(t), (this.open.data = tr(this.attributes));
  }
  matches(t) {
    return !1;
  }
  compareDocumentPosition(t) {
    return this.open.compareDocumentPosition(t);
  }
  closest(t) {
    const n = this.parentElement;
    return n ? n.closest(t) : null;
  }
  querySelectorAll(t) {
    const n = [];
    return (
      jt(this, "elements").forEach((s) => {
        ut(s) &&
          (s.matches(t) && n.push(s),
          n.concat(Array.from(s.querySelectorAll(t))));
      }),
      n
    );
  }
  querySelector(t) {
    for (const n of this.childNodes)
      if (De(n)) {
        if (n.matches(t)) return n;
        const s = n.querySelector(t);
        if (s !== null) return s;
      }
    return null;
  }
  get firstChild() {
    if (this.parentElement) {
      const t = this.open.nextSibling;
      return t === this.close ? null : t;
    }
    return this.template.firstChild;
  }
  get nextSibling() {
    return this.close.nextSibling;
  }
  get previousSibling() {
    return this.open.previousSibling;
  }
  get childNodes() {
    if (!this.parentElement) return this.template.childNodes;
    const t = [];
    let n = this.open;
    for (; (n = n.nextSibling) && n !== this.close; ) t.push(n);
    return t;
  }
  get isConnected() {
    return this.open.isConnected;
  }
  get parentElement() {
    return this.open.parentElement;
  }
}
const tr = (e) =>
    `qv ${((t) => {
      const n = [];
      return (
        t.forEach((s, r) => {
          var o;
          s
            ? n.push(`${r}=${((o = s), o.replace(/ /g, "+"))}`)
            : n.push(`${r}`);
        }),
        n.join(" ")
      );
    })(e)}`,
  Br = (e) => {
    if (e == null) return null;
    if (At(e)) {
      const t = Zt(e);
      if (t) return t;
    }
    return e;
  },
  Zt = (e) => {
    const t = e.__virtual;
    if (t) return t;
    if (e.data.startsWith("qv ")) {
      const n = Fr(e);
      return new bs(e, n);
    }
    return null;
  },
  Fr = (e) => {
    let t = e.nextSibling,
      n = 1;
    for (; t; ) {
      if (At(t)) {
        if (t.data.startsWith("qv ")) n++;
        else if (t.data === "/qv" && (n--, n === 0)) return t;
      }
      t = t.nextSibling;
    }
    throw new Error("close not found");
  },
  Wt = (e) => (e == null ? null : Ne(e) ? e.open : e),
  Ye = (e) => (/^[\w/.-]+$/.test(e), Object.freeze({ id: ps(e) })),
  tt = (e, t) => {
    const { get: n, set: s, ctx: r } = Ot();
    if (n !== void 0) return;
    const o = r.$hostElement$,
      i = Y(o);
    let a = i.$contexts$;
    a || (i.$contexts$ = a = new Map()), a.set(e.id, t), s(!0);
  },
  Je = (e, t) => {
    const { get: n, set: s, ctx: r } = Ot();
    if (n !== void 0) return n;
    const o = Qr(e, r.$hostElement$, r.$renderCtx$);
    if (o !== void 0) return s(o);
    if (t !== void 0) return s(t);
    throw te(13, e.id);
  },
  Qr = (e, t, n) => {
    const s = e.id;
    if (n) {
      const r = n.$localStack$;
      for (let o = r.length - 1; o >= 0; o--) {
        const i = r[o];
        if (((t = i.$element$), i.$contexts$)) {
          const a = i.$contexts$.get(s);
          if (a) return a;
        }
      }
    }
    if (t.closest) {
      const r = qi(t, s);
      if (r !== void 0) return r;
    }
  },
  qi = (e, t) => {
    var s;
    let n = e;
    for (; n; ) {
      let r = n,
        o;
      for (; r && (o = ki(r)); ) {
        const i = (s = ke(o)) == null ? void 0 : s.$contexts$;
        if (i && i.has(t)) return i.get(t);
        r = o;
      }
      n = n.parentElement;
    }
  },
  ki = (e) => {
    let t = e,
      n = 1;
    for (; (t = t.previousSibling); )
      if (At(t)) {
        if (t.data === "/qv") n++;
        else if (t.data.startsWith("qv ") && (n--, n === 0)) return Zt(t);
      }
    return null;
  },
  ji = Ye("qk-error"),
  Ur = (e, t, n) => {
    if (Ge()) throw e;
    {
      const s = Qr(ji, t, n);
      if (s === void 0) throw e;
      s.error = e;
    }
  },
  Bt = (e, t) => {
    (t.$dirty$ = !1), (t.$mounted$ = !0), (t.$slots$ = []), (t.li.length = 0);
    const n = t.$element$,
      s = t.$componentQrl$,
      r = t.$props$,
      o = ws(e, t),
      i = Ae(n, void 0, "qRender"),
      a = (i.$waitOn$ = []);
    (o.$cmpCtx$ = t),
      (i.$subscriber$ = n),
      (i.$renderCtx$ = e),
      s.$setContainer$(e.$static$.$containerState$.$containerEl$);
    const l = s.getFn(i);
    return ds(
      () => l(r),
      (d) =>
        a.length > 0
          ? Promise.all(a).then(() =>
              t.$dirty$ ? Bt(e, t) : { node: d, rCtx: o }
            )
          : t.$dirty$
          ? Bt(e, t)
          : { node: d, rCtx: o },
      (d) => (Ur(d, n, e), { node: vs, rCtx: o })
    );
  },
  Kr = (e, t) => ({
    $static$: {
      $doc$: e,
      $containerState$: t,
      $hostElements$: new Set(),
      $operations$: [],
      $postOperations$: [],
      $roots$: [],
      $addSlots$: [],
      $rmSlots$: [],
    },
    $cmpCtx$: void 0,
    $localStack$: [],
  }),
  ws = (e, t) => ({
    $static$: e.$static$,
    $cmpCtx$: e.$cmpCtx$,
    $localStack$: e.$localStack$.concat(t),
  }),
  Gr = (e) => {
    if (Mt(e)) return e;
    if (me(e)) {
      if (Q(e)) return e.join(" ");
      {
        let t = "",
          n = !1;
        for (const s of Object.keys(e))
          e[s] && (n && (t += " "), (t += s), (n = !0));
        return t;
      }
    }
    return "";
  },
  Si = /\s/,
  Fn = (e) => (e ? e.split(Si) : Te),
  Yr = (e) => {
    if (e == null) return "";
    if (typeof e == "object") {
      if (Q(e)) throw te(0, e, "style");
      {
        const t = [];
        for (const n in e)
          if (Object.prototype.hasOwnProperty.call(e, n)) {
            const s = e[n];
            s && t.push(ps(n) + ":" + s);
          }
        return t.join(";");
      }
    }
    return String(e);
  },
  $n = (e) => qt(e.$static$.$containerState$.$elementIndex$++),
  Qn = (e, t) => {
    const n = $n(e);
    t.$id$ = n;
  },
  Ft = (e) => (e == null || typeof e == "boolean" ? "" : String(e)),
  Un = Symbol("proxy target"),
  Be = Symbol("proxy flags"),
  ze = Symbol("proxy manager"),
  j = Symbol("IMMUTABLE");
class kt {
  constructor(t, n) {
    (this.untrackedValue = t), (this[ze] = n);
  }
  get value() {
    var n;
    const t = (n = Dt()) == null ? void 0 : n.$subscriber$;
    return t && this[ze].$addSub$([0, t, void 0]), this.untrackedValue;
  }
  set value(t) {
    const n = this[ze],
      s = this.untrackedValue;
    n && s !== t && ((this.untrackedValue = t), n.$notifySubs$());
  }
}
const ae = (e) => e instanceof kt || e instanceof ot,
  mt = (e, t, n, s, r) => {
    const o =
      n instanceof ot
        ? [e, t, ht(n.ref), s, r, n.prop === "value" ? void 0 : n.prop]
        : [e, t, n, s, r, void 0];
    Me(n).$addSub$(o);
  };
class ot {
  constructor(t, n) {
    (this.ref = t), (this.prop = n);
  }
  get [ze]() {
    return Me(this.ref);
  }
  get value() {
    return this.ref[this.prop];
  }
  set value(t) {
    this.ref[this.prop] = t;
  }
}
const O = (e, t) => {
    var r;
    if (!me(e)) return;
    if (e instanceof kt || e instanceof ot) return e;
    const n = ht(e);
    if (n) {
      const o = n["$$" + t];
      return o || new ot(e, t);
    }
    const s = (r = e[j]) == null ? void 0 : r[t];
    return ae(s) ? s : e[t];
  },
  xs = (e, t, n) => {
    const s = !t.$mounted$,
      r = t.$element$,
      o = e.$static$.$containerState$;
    return (
      o.$hostsStaging$.delete(r),
      o.$subsManager$.$clearSub$(r),
      D(Bt(e, t), (i) => {
        const a = e.$static$,
          l = i.rCtx,
          d = Ae(r);
        if (
          (a.$hostElements$.add(r),
          (d.$subscriber$ = r),
          (d.$renderCtx$ = l),
          s && t.$appendStyles$)
        )
          for (const p of t.$appendStyles$)
            (m = p),
              (u = a).$containerState$.$styleIds$.add(m.styleId),
              u.$postOperations$.push({
                $operation$: $i,
                $args$: [u.$containerState$.$containerEl$, m],
              });
        var u, m;
        const h = _t(i.node, d);
        return D(h, (p) => {
          const g = Ti(r, p),
            v = Jr(t);
          return D(Ri(l, v, g, n), () => {
            t.$vdom$ = g;
          });
        });
      })
    );
  },
  Jr = (e) => (e.$vdom$ || (e.$vdom$ = St(e.$element$)), e.$vdom$);
class Se {
  constructor(t, n, s, r) {
    (this.$type$ = t),
      (this.$props$ = n),
      (this.$children$ = s),
      (this.$key$ = r),
      (this.$elm$ = null),
      (this.$text$ = ""),
      (this.$signal$ = null);
  }
}
const Ti = (e, t) => {
    const n = t === void 0 ? Te : Q(t) ? t : [t],
      s = new Se(":virtual", {}, n, null);
    return (s.$elm$ = e), s;
  },
  _t = (e, t) => {
    if (e != null && typeof e != "boolean") {
      if (Ii(e)) {
        const n = new Se("#text", Ie, Te, null);
        return (n.$text$ = String(e)), n;
      }
      if (vn(e))
        return ((n, s) => {
          const r = n.key != null ? String(n.key) : null,
            o = n.type,
            i = n.props,
            a = i.children;
          let l = "";
          if (Mt(o)) l = o;
          else {
            if (o !== Ct) {
              if (_e(o)) {
                const u = Re(s, o, i, n.key);
                return _t(u, s);
              }
              throw te(25, o);
            }
            l = ":virtual";
          }
          let d = Te;
          return a != null
            ? D(
                _t(a, s),
                (u) => (
                  u !== void 0 && (d = Q(u) ? u : [u]), new Se(l, i, d, r)
                )
              )
            : new Se(l, i, d, r);
        })(e, t);
      if (ae(e)) {
        const n = e.value,
          s = new Se("#text", Ie, Te, null);
        return (s.$text$ = Ft(n)), (s.$signal$ = e), s;
      }
      if (Q(e)) {
        const n = us(e.flatMap((s) => _t(s, t)));
        return D(n, (s) => s.flat(100).filter(Wn));
      }
      return ie(e)
        ? e.then((n) => _t(n, t))
        : e === vs
        ? new Se(":skipRender", Ie, Te, null)
        : void 0;
    }
  },
  Ii = (e) => Mt(e) || typeof e == "number",
  qs = (e, t, n = 0) =>
    t.$proxyMap$.get(e) || (n !== 0 && (e[Be] = n), Lt(e, t, void 0)),
  Lt = (e, t, n) => {
    kn(e), t.$proxyMap$.has(e);
    const s = t.$subsManager$.$createManager$(n),
      r = new Proxy(e, new Ei(t, s));
    return t.$proxyMap$.set(e, r), r;
  };
class Ei {
  constructor(t, n) {
    (this.$containerState$ = t), (this.$manager$ = n);
  }
  get(t, n) {
    var d, u;
    if (typeof n == "symbol")
      return n === Un ? t : n === ze ? this.$manager$ : t[n];
    let s;
    const r = (d = t[Be]) != null ? d : 0,
      o = Dt(),
      i = (1 & r) != 0,
      a = (2 & r) != 0;
    let l = t[n];
    if ((o && (s = o.$subscriber$), a)) {
      const m = t["$$" + n];
      (n in t && !m && !((u = t[j]) != null && u[n])) || (s = null),
        m && (l = m.value);
    }
    if (s) {
      const m = Q(t);
      this.$manager$.$addSub$([0, s, m ? void 0 : n]);
    }
    return i ? Ni(l, this.$containerState$) : l;
  }
  set(t, n, s) {
    var i;
    if (typeof n == "symbol") return (t[n] = s), !0;
    const r = (i = t[Be]) != null ? i : 0;
    if ((2 & r) != 0) throw te(17);
    const o = (1 & r) != 0 ? kn(s) : s;
    return Q(t)
      ? ((t[n] = o), this.$manager$.$notifySubs$(), !0)
      : (t[n] !== o && ((t[n] = o), this.$manager$.$notifySubs$(n)), !0);
  }
  has(t, n) {
    if (n === Un) return !0;
    const s = Object.prototype.hasOwnProperty;
    return !!s.call(t, n) || !(typeof n != "string" || !s.call(t, "$$" + n));
  }
  ownKeys(t) {
    let n = null;
    const s = Dt();
    return (
      s && (n = s.$subscriber$),
      n && this.$manager$.$addSub$([0, n, void 0]),
      Reflect.ownKeys(t).map((r) =>
        typeof r == "string" && r.startsWith("$$") ? r.slice(2) : r
      )
    );
  }
}
const Ni = (e, t) => {
    if (bo(e)) return e;
    if (me(e)) {
      if (Object.isFrozen(e)) return e;
      const n = kn(e);
      return n !== e || Ke(n)
        ? e
        : Ha(n)
        ? t.$proxyMap$.get(e) || qs(e, t, 1)
        : e;
    }
    return e;
  },
  ks = "http://www.w3.org/2000/svg",
  Qt = [],
  Ri = (e, t, n, s) => js(e, t, n, "root", s),
  js = (e, t, n, s, r) => {
    t.$elm$;
    const o = n.$children$;
    if (o.length === 1 && o[0].$type$ === ":skipRender") return;
    const i = t.$elm$;
    t.$children$ === Qt && i.nodeName === "HEAD" && ((s = "head"), (r |= 2));
    const a = Ai(t, s);
    return a.length > 0 && o.length > 0
      ? Pi(e, i, a, o, r)
      : o.length > 0
      ? to(e, i, null, o, 0, o.length - 1, r)
      : a.length > 0
      ? Ss(e.$static$, a, 0, a.length - 1)
      : void 0;
  },
  Ai = (e, t) => {
    const n = e.$children$,
      s = e.$elm$;
    return n === Qt ? (e.$children$ = Xr(s, t)) : n;
  },
  Pi = (e, t, n, s, r) => {
    let o = 0,
      i = 0,
      a = n.length - 1,
      l = n[0],
      d = n[a],
      u = s.length - 1,
      m = s[0],
      h = s[u],
      p,
      g,
      v;
    const _ = [],
      b = e.$static$;
    for (; o <= a && i <= u; )
      if (l == null) l = n[++o];
      else if (d == null) d = n[--a];
      else if (m == null) m = s[++i];
      else if (h == null) h = s[--u];
      else if (zt(l, m)) _.push(pt(e, l, m, r)), (l = n[++o]), (m = s[++i]);
      else if (zt(d, h)) _.push(pt(e, d, h, r)), (d = n[--a]), (h = s[--u]);
      else if (zt(l, h))
        l.$elm$,
          d.$elm$,
          _.push(pt(e, l, h, r)),
          et(b, t, l.$elm$, d.$elm$.nextSibling),
          (l = n[++o]),
          (h = s[--u]);
      else if (zt(d, m))
        l.$elm$,
          d.$elm$,
          _.push(pt(e, d, m, r)),
          et(b, t, d.$elm$, l.$elm$),
          (d = n[--a]),
          (m = s[++i]);
      else {
        if (
          (p === void 0 && (p = Fi(n, o, a)), (g = p[m.$key$]), g === void 0)
        ) {
          const y = Tt(e, m, r, _);
          et(b, t, y, l == null ? void 0 : l.$elm$);
        } else if (((v = n[g]), Qi(v, m.$type$)))
          _.push(pt(e, v, m, r)),
            (n[g] = void 0),
            v.$elm$,
            et(b, t, v.$elm$, l.$elm$);
        else {
          const y = Tt(e, m, r, _);
          D(y, ($) => {
            et(b, t, $, l == null ? void 0 : l.$elm$);
          });
        }
        m = s[++i];
      }
    if (i <= u) {
      const y = s[u + 1] == null ? null : s[u + 1].$elm$;
      _.push(to(e, t, y, s, i, u, r));
    }
    let f = us(_);
    return (
      o <= a &&
        (f = D(f, () => {
          Ss(b, n, o, a);
        })),
      f
    );
  },
  Mn = (e, t) => {
    const n = Ne(e) ? e.close : null,
      s = [];
    let r = e.firstChild;
    for (; (r = Br(r)) && (t(r) && s.push(r), (r = r.nextSibling), r !== n); );
    return s;
  },
  jt = (e, t) => {
    switch (t) {
      case "root":
        return Mn(e, zi);
      case "head":
        return Mn(e, Li);
      case "elements":
        return Mn(e, ut);
    }
  },
  Xr = (e, t) => jt(e, t).map(Mi),
  Mi = (e) => {
    var t, n;
    return De(e) && (n = (t = ke(e)) == null ? void 0 : t.$vdom$) != null
      ? n
      : St(e);
  },
  St = (e) => {
    if (ut(e)) {
      const t = Ne(e) ? Ie : Oi(e),
        n = new Se(e.localName, t, Qt, Bn(e));
      return (n.$elm$ = e), n;
    }
    if (is(e)) {
      const t = new Se(e.nodeName, {}, Qt, null);
      return (t.$text$ = e.data), (t.$elm$ = e), t;
    }
    throw new Error("invalid node");
  },
  Oi = (e) => {
    const t = {},
      n = e.attributes,
      s = n.length;
    for (let r = 0; r < s; r++) {
      const o = n.item(r),
        i = o.name;
      i.includes(":") || (t[i] = i === "class" ? Ci(o.value) : o.value);
    }
    return t;
  },
  Ci = (e) =>
    Fn(e)
      .filter((t) => !t.startsWith("\u2B50\uFE0F"))
      .join(" "),
  Li = (e) => {
    const t = e.nodeType;
    return t === 1 ? e.hasAttribute("q:head") : t === 111;
  },
  eo = (e) => e.nodeName === "Q:TEMPLATE",
  zi = (e) => {
    const t = e.nodeType;
    if (t === 3 || t === 111) return !0;
    if (t !== 1) return !1;
    const n = e.nodeName;
    return n !== "Q:TEMPLATE" && (n !== "HEAD" || e.hasAttribute("q:head"));
  },
  pt = (e, t, n, s) => {
    t.$type$, n.$type$;
    const r = t.$elm$,
      o = n.$type$,
      i = e.$static$,
      a = o === ":virtual",
      l = e.$cmpCtx$;
    if (((n.$elm$ = r), o === "#text")) {
      const v = n.$signal$;
      return (
        v && mt(2, l.$element$, v, r, "data"),
        void (t.$text$ !== n.$text$ && Ze(i, r, "data", n.$text$))
      );
    }
    let d = !!(1 & s);
    d || o !== "svg" || ((s |= 1), (d = !0));
    const u = n.$props$,
      m = a && "q:renderFn" in u,
      h = Y(r);
    if (!m) {
      const v = l.li,
        _ = h.li;
      return (
        (_.length = 0),
        (n.$props$ = Vi(i, h, l.$element$, t.$props$, u, d)),
        v.length > 0 && (_.push(...v), (v.length = 0)),
        d && n.$type$ === "foreignObject" && ((s &= -2), (d = !1)),
        a && "q:s" in u
          ? (l.$slots$, void l.$slots$.push(n))
          : u[wt] !== void 0 || (a && "qonce" in u)
          ? void 0
          : js(e, t, n, "root", s)
      );
    }
    const p = u.props;
    let g = oo(h, e, p);
    return (
      g ||
        h.$componentQrl$ ||
        h.$element$.hasAttribute("q:id") ||
        (Qn(e, h),
        (h.$componentQrl$ = p["q:renderFn"]),
        h.$componentQrl$,
        (g = !0)),
      g ? D(xs(e, h, s), () => nr(e, h, n, s)) : nr(e, h, n, s)
    );
  },
  nr = (e, t, n, s) => {
    const r = n.$children$,
      o = e.$static$,
      i = ((d) => {
        var m;
        const u = {};
        for (const h of d) {
          const p = so(h);
          ((m = u[p]) != null
            ? m
            : (u[p] = new Se(":virtual", { "q:s": "" }, [], p))
          ).$children$.push(h);
        }
        return u;
      })(r),
      a = ws(e, t),
      l = ro(t);
    for (const d of Object.keys(l.slots))
      if (!i[d]) {
        const u = l.slots[d],
          m = Xr(u, "root");
        if (m.length > 0) {
          const h = ke(u);
          h && h.$vdom$ && (h.$vdom$.$children$ = []),
            Ss(o, m, 0, m.length - 1);
        }
      }
    for (const d of Object.keys(l.templates)) {
      const u = l.templates[d];
      u && ((i[d] && !l.slots[d]) || (Zr(o, u), (l.templates[d] = void 0)));
    }
    return us(
      Object.keys(i).map((d) => {
        const u = i[d],
          m = no(o, l, t.$element$, d),
          h = Y(m),
          p = Jr(h);
        return (h.$vdom$ = u), (u.$elm$ = m), js(a, p, u, "root", s);
      })
    );
  },
  to = (e, t, n, s, r, o, i) => {
    const a = [];
    for (; r <= o; ++r) {
      const l = s[r],
        d = Tt(e, l, i, a);
      et(e.$static$, t, d, n);
    }
    return Er(a);
  },
  Ss = (e, t, n, s) => {
    for (; n <= s; ++n) {
      const r = t[n];
      r && (r.$elm$, Zr(e, r.$elm$));
    }
  },
  no = (e, t, n, s) => {
    const r = t.slots[s];
    if (r) return r;
    const o = t.templates[s];
    if (o) return o;
    const i = Wr(e.$doc$, s);
    return (
      ((a, l, d) => {
        a.$operations$.push({ $operation$: bn, $args$: [l, d, l.firstChild] });
      })(e, n, i),
      (t.templates[s] = i),
      i
    );
  },
  so = (e) => {
    var t;
    return (t = e.$props$[$e]) != null ? t : "";
  },
  Tt = (e, t, n, s) => {
    const r = t.$type$,
      o = e.$static$.$doc$,
      i = e.$cmpCtx$;
    if (r === "#text") {
      const $ = t.$signal$,
        S = ((I, q) => I.createTextNode(q))(o, t.$text$);
      return $ && i && mt(2, i.$element$, $, S, "data"), (t.$elm$ = S);
    }
    let a,
      l = !!(2 & n),
      d = !!(1 & n);
    d || r !== "svg" || ((n |= 1), (d = !0));
    const u = r === ":virtual",
      m = t.$props$,
      h = "q:renderFn" in m,
      p = e.$static$;
    u
      ? (a = (($) => {
          const S = $.createComment("qv "),
            I = $.createComment("/qv");
          return new bs(S, I);
        })(o))
      : r === "head"
      ? ((a = o.head), (n |= 2), (l = !0))
      : ((a = $s(o, r, d)), (n &= -3)),
      (t.$elm$ = a),
      d && r === "foreignObject" && ((d = !1), (n &= -2));
    const g = Y(a);
    if (h) {
      Pn(a, t.$key$);
      const $ = m["q:renderFn"];
      oo(g, e, m.props), Qn(e, g), (g.$componentQrl$ = $);
      const S = D(xs(e, g, n), () => {
        let I = t.$children$;
        if (I.length === 0) return;
        I.length === 1 &&
          I[0].$type$ === ":skipRender" &&
          (I = I[0].$children$);
        const q = ws(e, g),
          M = ro(g),
          V = [];
        for (const Z of I) {
          const ee = Tt(q, Z, n, V);
          Z.$elm$, Z.$elm$, Xs(p, no(p, M, a, so(Z)), ee);
        }
        return Er(V);
      });
      return ie(S) && s.push(S), a;
    }
    const v = u && "q:s" in m,
      _ = !u && "ref" in m,
      b = g.li;
    if (
      ((t.$props$ = Wi(p, g, i == null ? void 0 : i.$element$, m, d)), i && !u)
    ) {
      const $ = i.$scopeIds$;
      $ &&
        $.forEach((S) => {
          a.classList.add(S);
        }),
        i.$needAttachListeners$ &&
          (b.push(...i.li), (i.$needAttachListeners$ = !1));
    }
    if (
      (v &&
        (i.$slots$,
        Pn(a, t.$key$),
        ue(a, "q:sref", i.$id$),
        i.$slots$.push(t),
        p.$addSlots$.push([a, i.$element$])),
      Pn(a, t.$key$),
      l && !u && ue(a, "q:head", ""),
      (b.length > 0 || _) && Qn(e, g),
      m[wt] !== void 0)
    )
      return a;
    let f = t.$children$;
    if (f.length === 0) return a;
    f.length === 1 && f[0].$type$ === ":skipRender" && (f = f[0].$children$);
    const y = f.map(($) => Tt(e, $, n, s));
    for (const $ of y) Xs(e.$static$, a, $);
    return a;
  },
  ro = (e) => {
    var o, i;
    const t = ((a) =>
        a.$slots$ || (a.$element$.parentElement, (a.$slots$ = Di(a))))(e),
      n = {},
      s = {},
      r = Array.from(e.$element$.childNodes).filter(eo);
    for (const a of t) a.$elm$, (n[(o = a.$key$) != null ? o : ""] = a.$elm$);
    for (const a of r) s[(i = Pe(a, $e)) != null ? i : ""] = a;
    return { slots: n, templates: s };
  },
  Di = (e) =>
    ((t, n, s) => {
      const r = ((a, l, d) =>
          a.ownerDocument.createTreeWalker(a, 128, {
            acceptNode(u) {
              const m = Zt(u);
              return m && Pe(m, "q:sref") === d ? 1 : 2;
            },
          }))(t, 0, s),
        o = [];
      let i = null;
      for (; (i = r.nextNode()); ) o.push(Zt(i));
      return o;
    })(e.$element$.parentElement, 0, e.$id$).map(St),
  sr = (e, t, n, s) => (n in t && t[n] !== s && Ze(e, t, n, s), !0),
  gt = (e, t, n, s) => (_s(e, t, n.toLowerCase(), s), !0),
  wt = "dangerouslySetInnerHTML",
  Hi = {
    style: (e, t, n, s) => (Ze(e, t.style, "cssText", Yr(s)), !0),
    class: (e, t, n, s, r) => {
      const o = Fn(r),
        i = Fn(s);
      return (
        ((a, l, d, u) => {
          a
            ? a.$operations$.push({ $operation$: er, $args$: [l, d, u] })
            : er(l, d, u);
        })(
          e,
          t,
          o.filter((a) => a && !i.includes(a)),
          i.filter((a) => a && !o.includes(a))
        ),
        !0
      );
    },
    value: sr,
    checked: sr,
    href: gt,
    list: gt,
    form: gt,
    tabIndex: gt,
    download: gt,
    [wt]: (e, t, n, s) => (
      wt in t ? Ze(e, t, wt, s) : "innerHTML" in t && Ze(e, t, "innerHTML", s),
      !0
    ),
    innerHTML: () => !0,
  },
  Vi = (e, t, n, s, r, o) => {
    var u;
    const i = Zi(s, r),
      a = {};
    if (i.length === 0) return a;
    const l = (u = r[j]) != null ? u : Ie,
      d = t.$element$;
    for (let m of i) {
      if (m === "ref") {
        ys(r[m], d);
        continue;
      }
      let h = ae(l[m]) ? l[m] : r[m];
      if (gs(m)) {
        io(e, t, m, h);
        continue;
      }
      m === "className" && (m = "class"),
        ae(h) && (mt(1, n, h, d, m), (h = h.value)),
        m === "class" && (r.class = h = Gr(h));
      const p = o ? m : m.toLowerCase(),
        g = s[p];
      (a[p] = h), g !== h && Ts(e, d, m, h, g, o);
    }
    return a;
  },
  Ts = (e, t, n, s, r, o) => {
    const i = Hi[n];
    (i && i(e, t, n, s, r)) ||
      (o || !(n in t)
        ? (n.startsWith("preventdefault:") &&
            Vt(n.slice(15), e.$containerState$),
          _s(e, t, n, s))
        : Ze(e, t, n, s));
  },
  Zi = (e, t) => {
    const n = Object.keys(t),
      s = n.map((o) => o.toLowerCase()),
      r = Object.keys(e);
    return (
      n.push(...r.filter((o) => !s.includes(o))),
      n.filter((o) => o !== "children")
    );
  },
  Wi = (e, t, n, s, r) => {
    var d;
    const o = t.$element$,
      i = Object.keys(s),
      a = {};
    if (i.length === 0) return a;
    const l = (d = s[j]) != null ? d : Ie;
    for (let u of i) {
      if (u === "children") continue;
      if (u === "ref") {
        ys(s[u], o);
        continue;
      }
      let m = ae(l[u]) ? l[u] : s[u];
      gs(u)
        ? io(e, t, u, m)
        : (u === "className" && (u = "class"),
          n && ae(m) && (mt(1, n, m, o, u), (m = m.value)),
          u === "class" && (m = Gr(m)),
          (a[r ? u : u.toLowerCase()] = m),
          Ts(e, o, u, m, void 0, r));
    }
    return a;
  },
  oo = (e, t, n) => {
    var l;
    const s = Object.keys(n);
    let r = e.$props$;
    if (
      (r || (e.$props$ = r = Lt({ [Be]: 2 }, t.$static$.$containerState$)),
      s.length === 0)
    )
      return !1;
    const o = Me(r),
      i = ht(r),
      a = (i[j] = (l = n[j]) != null ? l : Ie);
    for (const d of s)
      if (d !== "children" && d !== $e)
        if (ae(a[d])) i["$$" + d] = a[d];
        else {
          const u = n[d],
            m = i[d];
          (i[d] = u), m !== u && o.$notifySubs$(d);
        }
    return e.$dirty$;
  },
  Is = (e, t, n, s) => {
    if (s && e.hasAttribute("q:s")) return void t.$rmSlots$.push(e);
    const r = ke(e);
    r &&
      ((i, a) => {
        var d;
        const l = i.$element$;
        (d = i.$watches$) == null ||
          d.forEach((u) => {
            a.$clearSub$(u), vo(u);
          }),
          i.$componentQrl$ && a.$clearSub$(l),
          (i.$componentQrl$ = null),
          (i.$seq$ = null),
          (i.$watches$ = null),
          (i.$dirty$ = !1),
          (l._qc_ = void 0);
      })(r, n);
    const o = jt(e, "elements");
    for (const i of o) Is(i, t, n, !0);
  },
  Ut = (e, t) => {
    Ne(t) ? t.appendTo(e) : e.appendChild(t);
  },
  Bi = (e, t) => {
    Ne(t) ? t.remove() : e.removeChild(t);
  },
  bn = (e, t, n) => {
    Ne(t) ? t.insertBeforeTo(e, Wt(n)) : e.insertBefore(t, Wt(n));
  },
  Fi = (e, t, n) => {
    const s = {};
    for (let r = t; r <= n; ++r) {
      const o = e[r].$key$;
      o != null && (s[o] = r);
    }
    return s;
  },
  io = (e, t, n, s) => {
    const r = e.$containerState$,
      o = Or(t.li, n, s, r.$containerEl$);
    n.startsWith("on") || _s(e, t.$element$, o, ""), Vt(o, r);
  },
  zt = (e, t) => e.$type$ === t.$type$ && e.$key$ === t.$key$,
  Qi = (e, t) => e.$type$ === t,
  ao = (e) => {
    const t = e.join(" ");
    if (t.length > 0) return t;
  },
  co = async (e, t, n) => {
    const s = Ki(t),
      r = [];
    for (const f of e) if (f.$watches$) for (const y of f.$watches$) vo(y);
    for (const f of e) {
      const y = f.$element$,
        $ = f.li;
      for (const S of $) {
        const I = S[0],
          q = S[1],
          M = q.$captureRef$;
        if (M) for (const V of M) B(V, s, !0);
        De(y) && r.push({ key: I, qrl: q, el: y });
      }
    }
    if (r.length === 0)
      return {
        state: { ctx: {}, objs: [], subs: [] },
        objs: [],
        listeners: [],
        mode: "static",
      };
    let o;
    for (; (o = s.$promises$).length > 0; )
      (s.$promises$ = []), await Promise.allSettled(o);
    const i = s.$elements$.length > 0;
    if (i) {
      for (const f of s.$elements$) lo(ke(f), s);
      for (const f of e)
        if ((f.$props$ && Ui(f, s), f.$contexts$))
          for (const y of f.$contexts$.values()) B(y, s, !1);
    }
    for (; (o = s.$promises$).length > 0; )
      (s.$promises$ = []), await Promise.all(o);
    const a = new Map(),
      l = Array.from(s.$objSet$.keys()),
      d = new Map(),
      u = (f) => {
        let y = a.get(f);
        return (
          y === void 0 &&
            ((y = ta(f)),
            y ? (y = "#" + y) : console.warn("Missing ID", f),
            a.set(f, y)),
          y
        );
      },
      m = (f) => {
        let y = "";
        if (ie(f)) {
          const { value: S, resolved: I } = Ji(f);
          (f = S), (y += I ? "~" : "_");
        }
        if (me(f)) {
          const S = ht(f);
          if (S) (y += "!"), (f = S);
          else if (ut(f)) {
            const I = u(f);
            return I ? I + y : null;
          }
        }
        const $ = d.get(f);
        return $ ? $ + y : n ? n(f) : null;
      },
      h = (f) => {
        const y = m(f);
        if (y === null) throw te(27, f);
        return y;
      },
      p = new Map();
    l.forEach((f) => {
      var I, q;
      const y = (I = ea(f, t)) == null ? void 0 : I.$subs$;
      if (!y) return null;
      const $ = (q = Za(f)) != null ? q : 0,
        S = [];
      $ > 0 && S.push($);
      for (const M of y) {
        const V = M[1];
        (M[0] === 0 && Ke(V) && Ne(V) && !s.$elements$.includes(V)) ||
          S.push(M);
      }
      S.length > 0 && p.set(f, S);
    }),
      l.sort((f, y) => (p.has(f) ? 0 : 1) - (p.has(y) ? 0 : 1));
    let g = 0;
    for (const f of l) d.set(f, qt(g)), g++;
    if (s.$noSerialize$.length > 0) {
      const f = d.get(void 0);
      for (const y of s.$noSerialize$) d.set(y, f);
    }
    const v = [];
    for (const f of l) {
      const y = p.get(f);
      if (y == null) break;
      v.push(
        y.map(($) => (typeof $ == "number" ? `_${$}` : Wa($, m))).filter(Wn)
      );
    }
    v.length, p.size;
    const _ = l.map((f) => {
        if (f === null) return null;
        const y = typeof f;
        switch (y) {
          case "undefined":
            return $o;
          case "number":
            if (!Number.isFinite(f)) break;
            return f;
          case "string":
          case "boolean":
            return f;
        }
        const $ = La(f, h, t);
        if ($ !== void 0) return $;
        if (y === "object") {
          if (Q(f)) return f.map(h);
          if (cs(f)) {
            const S = {};
            for (const I of Object.keys(f)) S[I] = h(f[I]);
            return S;
          }
        }
        throw te(3, f);
      }),
      b = {};
    return (
      e.forEach((f) => {
        const y = f.$element$,
          $ = f.$refMap$,
          S = f.$props$,
          I = f.$contexts$,
          q = f.$watches$,
          M = f.$componentQrl$,
          V = f.$seq$,
          Z = {},
          ee = Ne(y) && s.$elements$.includes(y);
        let ce = !1;
        if ($.length > 0) {
          const F = $.map(h).join(" ");
          F && ((Z.r = F), (ce = !0));
        }
        if (i) {
          if (
            (ee && S && ((Z.h = h(S) + " " + h(M)), (ce = !0)),
            q && q.length > 0)
          ) {
            const F = q.map(m).filter(Wn).join(" ");
            F && ((Z.w = F), (ce = !0));
          }
          if (ee && V && V.length > 0) {
            const F = V.map(h).join(" ");
            (Z.s = F), (ce = !0);
          }
          if (I) {
            const F = [];
            I.forEach((G, re) => {
              F.push(`${re}=${h(G)}`);
            });
            const pe = F.join(" ");
            pe && ((Z.c = pe), (ce = !0));
          }
        }
        if (ce) {
          const F = u(y);
          b[F] = Z;
        }
      }),
      {
        state: { ctx: b, objs: _, subs: v },
        objs: l,
        listeners: r,
        mode: i ? "render" : "listeners",
      }
    );
  },
  Ui = (e, t) => {
    var s;
    const n = e.$parent$;
    if (n && e.$props$ && t.$elements$.includes(n.$element$)) {
      const r = (s = Me(e.$props$)) == null ? void 0 : s.$subs$,
        o = e.$element$;
      r && r.some((i) => i[0] === 0 && i[1] === o) && Yi(o, t);
    }
  },
  Ki = (e) => ({
    $containerState$: e,
    $seen$: new Set(),
    $objSet$: new Set(),
    $noSerialize$: [],
    $elements$: [],
    $promises$: [],
  }),
  Gi = (e, t) => {
    t.$elements$.includes(e) || t.$elements$.push(e);
  },
  Yi = (e, t) => {
    if (t.$elements$.includes(e)) return;
    const n = ke(e);
    n && (t.$elements$.push(e), lo(n, t));
  },
  lo = (e, t) => {
    if (
      (e.$props$ && B(e.$props$, t, !1),
      e.$componentQrl$ && B(e.$componentQrl$, t, !1),
      e.$seq$)
    )
      for (const n of e.$seq$) B(n, t, !1);
    if (e.$watches$) for (const n of e.$watches$) B(n, t, !1);
    if (e.$contexts$) for (const n of e.$contexts$.values()) B(n, t, !1);
  },
  uo = (e, t) => {
    if (t.$seen$.has(e)) return;
    t.$seen$.add(e);
    const n = e.$subs$;
    for (const s of n) {
      const r = s[1];
      Ke(r) && Ne(r) ? s[0] === 0 && Gi(r, t) : B(r, t, !0);
    }
  },
  Kn = Symbol(),
  Ji = (e) => e[Kn],
  B = (e, t, n) => {
    if (e !== null) {
      const r = typeof e;
      switch (r) {
        case "function":
        case "object": {
          const o = t.$seen$;
          if (o.has(e)) return;
          if ((o.add(e), !Va(e)))
            return t.$objSet$.add(void 0), void t.$noSerialize$.push(e);
          const i = e,
            a = ht(e);
          if (a) {
            if (((e = a), o.has(e))) return;
            o.add(e), n && uo(Me(i), t);
          }
          if (Ca(e, t, n)) return void t.$objSet$.add(e);
          if (ie(e))
            return void t.$promises$.push(
              ((s = e),
              s.then(
                (l) => {
                  const d = { resolved: !0, value: l };
                  return (s[Kn] = d), l;
                },
                (l) => {
                  const d = { resolved: !1, value: l };
                  return (s[Kn] = d), l;
                }
              )).then((l) => {
                B(l, t, n);
              })
            );
          if (r === "object") {
            if (Ke(e)) return;
            if (Q(e)) for (let l = 0; l < e.length; l++) B(e[l], t, n);
            else if (cs(e)) for (const l of Object.keys(e)) B(e[l], t, n);
          }
          break;
        }
      }
    }
    var s;
    t.$objSet$.add(e);
  },
  Xi = (e) => {
    const t = Br(e);
    if (ut(t)) {
      const n = ke(t);
      if (n && n.$id$) return n;
    }
  },
  ea = (e, t) => {
    if (!me(e)) return;
    if (e instanceof kt) return Me(e);
    const n = t.$proxyMap$.get(e);
    return n ? Me(n) : void 0;
  },
  ta = (e) => {
    const t = ke(e);
    return t ? t.$id$ : null;
  },
  mo = (e) => {
    Pe(e, "q:container") === "paused" && (na(e), ua(e));
  },
  na = (e) => {
    if (!Gs(e)) return;
    let t = 0;
    const n = _n(e),
      s = e === n.documentElement ? n.body : e,
      r = la(s);
    if (!r) return;
    r.remove();
    const o = Ht(e);
    aa(e, o);
    const i = JSON.parse(ca(r.textContent || "{}")),
      a = new Map(),
      l = (h) => ia(h, a, i.objs, o),
      d = n.createTreeWalker(e, 129, {
        acceptNode(h) {
          if (At(h)) {
            const p = h.data;
            if (p.startsWith("qv ")) {
              const g = Fr(h),
                v = new bs(h, g),
                _ = Pe(v, "q:id");
              _ &&
                ((Y(v).$id$ = _), a.set("#" + _, v), (t = Math.max(t, st(_))));
            } else if (p.startsWith("t=")) {
              const g = p.slice(2);
              a.set("#" + p.slice(2), da(h)), (t = Math.max(t, st(g)));
            }
            return 3;
          }
          return Gs(h) ? 2 : h.hasAttribute("q:id") ? 1 : 3;
        },
      });
    let u = null;
    for (; (u = d.nextNode()); ) {
      const h = Pe(u, "q:id"),
        p = Y(u);
      (p.$id$ = h),
        (p.$vdom$ = St(u)),
        a.set("#" + h, u),
        (t = Math.max(t, st(h)));
    }
    o.$elementIndex$ = ++t;
    const m = za(l, o, n);
    sa(i.objs, m), ra(i.objs, i.subs, l, o, m);
    for (const h of i.objs) oa(h, l, m);
    for (const h of Object.keys(i.ctx)) {
      h.startsWith("#");
      const p = i.ctx[h],
        g = a.get(h),
        v = Y(g),
        _ = p.r,
        b = p.s,
        f = p.h,
        y = p.c,
        $ = p.w;
      if (
        (_ && (De(g), (v.$refMap$ = _.split(" ").map(l)), (v.li = yi(v, e))),
        b && (v.$seq$ = b.split(" ").map(l)),
        $ && (v.$watches$ = $.split(" ").map(l)),
        y)
      ) {
        v.$contexts$ = new Map();
        for (const S of y.split(" ")) {
          const [I, q] = S.split("=");
          v.$contexts$.set(I, l(q));
        }
      }
      if (f) {
        const [S, I] = f.split(" "),
          q = g.getAttribute("q:sstyle");
        (v.$scopeIds$ = q ? q.split(" ") : null),
          (v.$mounted$ = !0),
          (v.$props$ = l(S)),
          (v.$componentQrl$ = l(I));
      }
    }
    ue(e, "q:container", "resumed"),
      ((h, p, g, v) => {
        h &&
          typeof CustomEvent == "function" &&
          h.dispatchEvent(
            new CustomEvent("qresume", {
              detail: void 0,
              bubbles: !0,
              composed: !0,
            })
          );
      })(e);
  },
  sa = (e, t) => {
    for (let n = 0; n < e.length; n++) {
      const s = e[n];
      Mt(s) && (e[n] = s === $o ? void 0 : t.prepare(s));
    }
  },
  ra = (e, t, n, s, r) => {
    for (let o = 0; o < t.length; o++) {
      const i = e[o],
        a = t[o];
      if (a) {
        const l = [];
        let d = 0;
        for (const u of a)
          u.startsWith("_") ? (d = parseInt(u.slice(1), 10)) : l.push(Ba(u, n));
        d > 0 && (i[Be] = d), r.subs(i, l) || Lt(i, s, l);
      }
    }
  },
  oa = (e, t, n) => {
    if (!n.fill(e) && e && typeof e == "object") {
      if (Q(e)) for (let s = 0; s < e.length; s++) e[s] = t(e[s]);
      else if (cs(e)) for (const s of Object.keys(e)) e[s] = t(e[s]);
    }
  },
  ia = (e, t, n, s) => {
    if ((typeof e == "string" && e.length, e.startsWith("#")))
      return t.has(e), t.get(e);
    const r = st(e);
    n.length;
    let o = n[r];
    for (let i = e.length - 1; i >= 0; i--) {
      const a = e[i],
        l = Da[a];
      if (!l) break;
      o = l(o, s);
    }
    return o;
  },
  aa = (e, t) => {
    const n = e.ownerDocument.head;
    e.querySelectorAll("style[q\\:style]").forEach((s) => {
      t.$styleIds$.add(Pe(s, "q:style")), n.appendChild(s);
    });
  },
  ca = (e) => e.replace(/\\x3C(\/?script)/g, "<$1"),
  la = (e) => {
    let t = e.lastElementChild;
    for (; t; ) {
      if (t.tagName === "SCRIPT" && Pe(t, "type") === "qwik/json") return t;
      t = t.previousElementSibling;
    }
  },
  da = (e) => {
    const t = e.nextSibling;
    if (is(t)) return t;
    {
      const n = e.ownerDocument.createTextNode("");
      return e.parentElement.insertBefore(n, e), n;
    }
  },
  ua = (e) => {
    e.qwik = {
      pause: () =>
        (async (t, n) => {
          const s = _n(t),
            r = s.documentElement,
            o = Ir(t) ? r : t;
          if (Pe(o, "q:container") === "paused") throw te(21);
          const i = o === s.documentElement ? s.body : o,
            a = Ht(o),
            l = ((p, g) => {
              const v = [],
                _ = g(p);
              _ !== void 0 && v.push(_);
              const b = p.ownerDocument.createTreeWalker(p, 129, {
                acceptNode(f) {
                  if (De((y = f)) && y.hasAttribute("q:container")) return 2;
                  var y;
                  const $ = g(f);
                  return $ !== void 0 && v.push($), 3;
                },
              });
              for (; b.nextNode(); );
              return v;
            })(o, Xi);
          ue(o, "q:container", "paused");
          for (const p of l) {
            const g = p.$element$,
              v = p.li;
            if (p.$scopeIds$) {
              const _ = ao(p.$scopeIds$);
              _ && g.setAttribute("q:sstyle", _);
            }
            if (
              (p.$id$ && g.setAttribute("q:id", p.$id$), De(g) && v.length > 0)
            ) {
              const _ = Mr(v);
              for (const b of _) g.setAttribute(b[0], Nr(b[1], p));
            }
          }
          const d = await co(l, a, (p) =>
              Ke(p) && is(p)
                ? ((g, v) => {
                    const _ = g.previousSibling;
                    if (_ && At(_) && _.data.startsWith("t="))
                      return "#" + _.data.slice(2);
                    const b = g.ownerDocument,
                      f = qt(v.$elementIndex$++),
                      y = b.createComment(`t=${f}`),
                      $ = b.createComment(""),
                      S = g.parentElement;
                    return (
                      S.insertBefore(y, g),
                      S.insertBefore($, g.nextSibling),
                      "#" + f
                    );
                  })(p, a)
                : null
            ),
            u = s.createElement("script");
          ue(u, "type", "qwik/json"),
            (u.textContent = JSON.stringify(d.state, void 0, void 0).replace(
              /<(\/?script)/g,
              "\\x3C$1"
            )),
            i.appendChild(u);
          const m = Array.from(a.$events$, (p) => JSON.stringify(p)),
            h = s.createElement("script");
          return (
            (h.textContent = `window.qwikevents||=[];window.qwikevents.push(${m.join(
              ", "
            )})`),
            i.appendChild(h),
            d
          );
        })(e),
      state: Ht(e),
    };
  },
  wn = () => {
    const e = hs();
    let t = e.$qrl$;
    if (t) t.$captureRef$;
    else {
      const n = e.$element$,
        s = Pr(n),
        r = Y(n);
      (t = yn(decodeURIComponent(String(e.$url$)), s)), mo(s), Rr(t, r);
    }
    return t.$captureRef$;
  },
  ma = (e, t) => {
    if (e[0] === 0) {
      const n = e[1];
      ut(n) ? ha(n, t) : ho(n, t);
    } else fa(e, t);
  },
  ha = (e, t) => {
    const n = Ge();
    n || mo(t.$containerEl$);
    const s = Y(e);
    if ((s.$componentQrl$, !s.$dirty$))
      if (((s.$dirty$ = !0), t.$hostsRendering$ !== void 0))
        t.$renderPromise$, t.$hostsStaging$.add(e);
      else {
        if (n) return;
        t.$hostsNext$.add(e), xn(t);
      }
  },
  fa = (e, t) => {
    t.$hostsRendering$ !== void 0
      ? (t.$renderPromise$, t.$opsNext$.add(e))
      : (t.$opsNext$.add(e), xn(t));
  },
  ho = (e, t) => {
    e.$flags$ & it ||
      ((e.$flags$ |= it),
      t.$hostsRendering$ !== void 0
        ? (t.$renderPromise$, t.$watchStaging$.add(e))
        : (t.$watchNext$.add(e), xn(t)));
  },
  xn = (e) => (
    e.$renderPromise$ === void 0 &&
      (e.$renderPromise$ = gn().nextTick(() => ga(e))),
    e.$renderPromise$
  ),
  pa = () => {
    const [e] = wn();
    ho(e, Ht(Pr(e.$el$)));
  },
  ga = async (e) => {
    const t = _n(e.$containerEl$);
    try {
      const n = Kr(t, e),
        s = n.$static$,
        r = (e.$hostsRendering$ = new Set(e.$hostsNext$));
      e.$hostsNext$.clear(),
        await va(e),
        e.$hostsStaging$.forEach((i) => {
          r.add(i);
        }),
        e.$hostsStaging$.clear();
      const o = Array.from(r);
      $a(o);
      for (const i of o)
        if (!s.$hostElements$.has(i)) {
          const a = Y(i);
          if (a.$componentQrl$) {
            i.isConnected, s.$roots$.push(a);
            try {
              await xs(n, a, ya(i.parentElement));
            } catch {}
          }
        }
      if (
        (e.$opsNext$.forEach((i) =>
          ((a, l) => {
            var m;
            const d = (m = l[5]) != null ? m : "value",
              u = l[2][d];
            switch (l[0]) {
              case 1: {
                const h = l[4],
                  p = l[3],
                  g = ke(p),
                  v = p.namespaceURI === ks;
                let _;
                if (g && g.$vdom$) {
                  const b = v ? h : h.toLowerCase();
                  (_ = g.$vdom$.$props$[b]), (g.$vdom$.$props$[b] = u);
                }
                return Ts(a, p, h, u, _, v);
              }
              case 2:
                return Ze(a, l[3], "data", Ft(u));
            }
          })(s, i)
        ),
        e.$opsNext$.clear(),
        s.$operations$.push(...s.$postOperations$),
        s.$operations$.length === 0)
      )
        return void (await rr(e, s));
      await gn().raf(
        () => (
          (({ $static$: i }) => {
            wi(i);
          })(n),
          rr(e, s)
        )
      );
    } catch (n) {
      Pt(n);
    }
  },
  ya = (e) => {
    let t = 0;
    return (
      e &&
        (e.namespaceURI === ks && (t |= 1), e.tagName === "HEAD" && (t |= 2)),
      t
    );
  },
  rr = async (e, t) => {
    await _a(
      e,
      (n, s) => (n.$flags$ & ba) != 0 && (!s || t.$hostElements$.has(n.$el$))
    ),
      e.$hostsStaging$.forEach((n) => {
        e.$hostsNext$.add(n);
      }),
      e.$hostsStaging$.clear(),
      (e.$hostsRendering$ = void 0),
      (e.$renderPromise$ = void 0),
      e.$hostsNext$.size + e.$watchNext$.size + e.$opsNext$.size > 0 && xn(e);
  },
  va = async (e) => {
    const t = e.$containerEl$,
      n = [],
      s = [],
      r = (i) => (i.$flags$ & fo) != 0,
      o = (i) => (i.$flags$ & po) != 0;
    e.$watchNext$.forEach((i) => {
      r(i) &&
        (s.push(D(i.$qrl$.$resolveLazy$(t), () => i)), e.$watchNext$.delete(i)),
        o(i) &&
          (n.push(D(i.$qrl$.$resolveLazy$(t), () => i)),
          e.$watchNext$.delete(i));
    });
    do
      if (
        (e.$watchStaging$.forEach((i) => {
          r(i)
            ? s.push(D(i.$qrl$.$resolveLazy$(t), () => i))
            : o(i)
            ? n.push(D(i.$qrl$.$resolveLazy$(t), () => i))
            : e.$watchNext$.add(i);
        }),
        e.$watchStaging$.clear(),
        s.length > 0)
      ) {
        const i = await Promise.all(s);
        Gn(i), await Promise.all(i.map((a) => Kt(a, e))), (s.length = 0);
      }
    while (e.$watchStaging$.size > 0);
    if (n.length > 0) {
      const i = await Promise.all(n);
      Gn(i), i.forEach((a) => Kt(a, e));
    }
  },
  _a = async (e, t) => {
    const n = [],
      s = e.$containerEl$;
    e.$watchNext$.forEach((r) => {
      t(r, !1) &&
        (n.push(D(r.$qrl$.$resolveLazy$(s), () => r)), e.$watchNext$.delete(r));
    });
    do
      if (
        (e.$watchStaging$.forEach((r) => {
          t(r, !0)
            ? n.push(D(r.$qrl$.$resolveLazy$(s), () => r))
            : e.$watchNext$.add(r);
        }),
        e.$watchStaging$.clear(),
        n.length > 0)
      ) {
        const r = await Promise.all(n);
        Gn(r), await Promise.all(r.map((o) => Kt(o, e))), (n.length = 0);
      }
    while (e.$watchStaging$.size > 0);
  },
  $a = (e) => {
    e.sort((t, n) => (2 & t.compareDocumentPosition(Wt(n)) ? 1 : -1));
  },
  Gn = (e) => {
    e.sort((t, n) =>
      t.$el$ === n.$el$
        ? t.$index$ < n.$index$
          ? -1
          : 1
        : (2 & t.$el$.compareDocumentPosition(Wt(n.$el$))) != 0
        ? 1
        : -1
    );
  },
  ba = 1,
  fo = 2,
  it = 4,
  or = 8,
  po = 16,
  wa = (e, t) => {
    const { get: n, set: s, ctx: r, i: o } = Ot();
    if (n) return;
    const i = r.$hostElement$,
      a = r.$renderCtx$.$static$.$containerState$,
      l = new Yt(it | fo, o, i, e, void 0),
      d = Y(i);
    s(!0),
      e.$resolveLazy$(a.$containerEl$),
      d.$watches$ || (d.$watches$ = []),
      d.$watches$.push(l),
      fi(r, () => Kt(l, a, r.$renderCtx$)),
      Ge() && qa(l, t == null ? void 0 : t.eagerness);
  },
  go = (e) => !!e.$resource$,
  Kt = async (e, t, n) => (e.$flags$, go(e) ? yo(e, t) : xa(e, t, n)),
  yo = (e, t, n) => {
    (e.$flags$ &= ~it), Gt(e);
    const s = e.$el$,
      r = Ae(s, void 0, "WatchEvent"),
      { $subsManager$: o } = t;
    e.$qrl$.$captureRef$;
    const i = e.$qrl$.getFn(r, () => {
        o.$clearSub$(e);
      }),
      a = [],
      l = e.$resource$,
      d = kn(l),
      u = {
        track: (b, f) => {
          if (_e(b)) {
            const $ = Ae();
            return ($.$subscriber$ = e), Re($, b);
          }
          const y = Me(b);
          return (
            y ? y.$addSub$([0, e, f]) : as(pn(26), b),
            f ? b[f] : ae(b) ? b.value : b
          );
        },
        cleanup(b) {
          a.push(b);
        },
        previous: d.resolved,
      };
    let m,
      h,
      p = !1;
    const g = (b, f) =>
      !p &&
      ((p = !0),
      b
        ? ((p = !0),
          (l.state = "resolved"),
          (l.resolved = f),
          (l.error = void 0),
          m(f))
        : ((p = !0),
          (l.state = "rejected"),
          (l.resolved = void 0),
          (l.error = f),
          h(f)),
      !0);
    Re(r, () => {
      (l.state = "pending"),
        (l.resolved = void 0),
        (l.promise = new Promise((b, f) => {
          (m = b), (h = f);
        }));
    }),
      (e.$destroy$ = qn(() => {
        a.forEach((b) => b());
      }));
    const v = ds(
        () => D(n, () => i(u)),
        (b) => {
          g(!0, b);
        },
        (b) => {
          g(!1, b);
        }
      ),
      _ = d.timeout;
    return _
      ? Promise.race([
          v,
          mi(_).then(() => {
            g(!1, "timeout") && Gt(e);
          }),
        ])
      : v;
  },
  xa = (e, t, n) => {
    (e.$flags$ &= ~it), Gt(e);
    const s = e.$el$,
      r = Ae(s, void 0, "WatchEvent"),
      { $subsManager$: o } = t,
      i = e.$qrl$.getFn(r, () => {
        o.$clearSub$(e);
      }),
      a = [];
    e.$destroy$ = qn(() => {
      a.forEach((d) => d());
    });
    const l = {
      track: (d, u) => {
        if (_e(d)) {
          const h = Ae();
          return (h.$subscriber$ = e), Re(h, d);
        }
        const m = Me(d);
        return m ? m.$addSub$([0, e, u]) : as(pn(26), d), u ? d[u] : d;
      },
      cleanup(d) {
        a.push(d);
      },
    };
    return ds(
      () => i(l),
      (d) => {
        _e(d) && a.push(d);
      },
      (d) => {
        Ur(d, s, n);
      }
    );
  },
  Gt = (e) => {
    const t = e.$destroy$;
    if (t) {
      e.$destroy$ = void 0;
      try {
        t();
      } catch (n) {
        Pt(n);
      }
    }
  },
  vo = (e) => {
    e.$flags$ & or ? ((e.$flags$ &= ~or), (0, e.$qrl$)()) : Gt(e);
  },
  qa = (e, t) => {
    t === "visible"
      ? vi("qvisible", On(e))
      : t === "load"
      ? Us("qinit", On(e))
      : t === "idle" && Us("qidle", On(e));
  },
  On = (e) => {
    const t = e.$qrl$;
    return Rs(t.$chunk$, "_hW", pa, null, null, [e], t.$symbol$);
  };
class Yt {
  constructor(t, n, s, r, o) {
    (this.$flags$ = t),
      (this.$index$ = n),
      (this.$el$ = s),
      (this.$qrl$ = r),
      (this.$resource$ = o);
  }
}
const ka = (e, t) => {
    const { get: n, set: s, i: r, ctx: o } = Ot();
    if (n != null) return n;
    const i = o.$renderCtx$.$static$.$containerState$,
      a = ja(i, t),
      l = o.$hostElement$,
      d = new Yt(it | po, r, l, e, a),
      u = Promise.all(o.$waitOn$.slice()),
      m = Y(l);
    return (
      yo(d, i, u),
      m.$watches$ || (m.$watches$ = []),
      m.$watches$.push(d),
      s(a),
      a
    );
  },
  ne = (e) => {
    if (!Ge()) {
      if (
        e.onRejected &&
        (e.value.promise.catch(() => {}), e.value.state === "rejected")
      )
        return e.onRejected(e.value.error);
      if (e.onPending) {
        const n = e.value.state;
        if (n === "pending") return e.onPending();
        if (n === "resolved") return e.onResolved(e.value.resolved);
        if (n === "rejected") throw e.value.error;
      }
    }
    const t = e.value.promise.then(Bs(e.onResolved), Bs(e.onRejected));
    return c(W, { children: t });
  },
  _o = (e) => ({
    __brand: "resource",
    promise: void 0,
    resolved: void 0,
    error: void 0,
    state: "pending",
    timeout: e == null ? void 0 : e.timeout,
  }),
  ja = (e, t, n) => {
    const s = _o(t);
    return (s.promise = n), Lt(s, e, void 0);
  },
  $o = "",
  Sa = {
    prefix: "",
    test: (e) => bo(e),
    collect: (e, t, n) => {
      if (e.$captureRef$) for (const s of e.$captureRef$) B(s, t, n);
    },
    serialize: (e, t) => ms(e, { $getObjId$: t }),
    prepare: (e, t) => yn(e, t.$containerEl$),
    fill: (e, t) => {
      e.$capture$ &&
        e.$capture$.length > 0 &&
        ((e.$captureRef$ = e.$capture$.map(t)), (e.$capture$ = null));
    },
  },
  Ta = {
    prefix: "",
    test: (e) => {
      return me((t = e)) && t instanceof Yt;
      var t;
    },
    collect: (e, t, n) => {
      B(e.$qrl$, t, n), e.$resource$ && B(e.$resource$, t, n);
    },
    serialize: (e, t) =>
      ((n, s) => {
        let r = `${qt(n.$flags$)} ${qt(n.$index$)} ${s(n.$qrl$)} ${s(n.$el$)}`;
        return go(n) && (r += ` ${s(n.$resource$)}`), r;
      })(e, t),
    prepare: (e) =>
      ((t) => {
        const [n, s, r, o, i] = t.split(" ");
        return new Yt(st(n), st(s), o, r, i);
      })(e),
    fill: (e, t) => {
      (e.$el$ = t(e.$el$)),
        (e.$qrl$ = t(e.$qrl$)),
        e.$resource$ && (e.$resource$ = t(e.$resource$));
    },
  },
  Ia = {
    prefix: "",
    test: (e) => {
      return me((t = e)) && t.__brand === "resource";
      var t;
    },
    collect: (e, t, n) => {
      B(e.promise, t, n), B(e.resolved, t, n);
    },
    serialize: (e, t) =>
      ((n, s) => {
        const r = n.state;
        return r === "resolved"
          ? `0 ${s(n.resolved)}`
          : r === "pending"
          ? "1"
          : `2 ${s(n.error)}`;
      })(e, t),
    prepare: (e) =>
      ((t) => {
        const [n, s] = t.split(" "),
          r = _o(void 0);
        return (
          (r.promise = Promise.resolve()),
          n === "0"
            ? ((r.state = "resolved"), (r.resolved = s))
            : n === "1"
            ? ((r.state = "pending"), (r.promise = new Promise(() => {})))
            : n === "2" && ((r.state = "rejected"), (r.error = s)),
          r
        );
      })(e),
    fill: (e, t) => {
      if (e.state === "resolved")
        (e.resolved = t(e.resolved)), (e.promise = Promise.resolve(e.resolved));
      else if (e.state === "rejected") {
        const n = Promise.reject(e.error);
        n.catch(() => null), (e.error = t(e.error)), (e.promise = n);
      }
    },
  },
  Ea = {
    prefix: "",
    test: (e) => e instanceof URL,
    serialize: (e) => e.href,
    prepare: (e) => new URL(e),
    fill: void 0,
  },
  Na = {
    prefix: "",
    test: (e) => e instanceof Date,
    serialize: (e) => e.toISOString(),
    prepare: (e) => new Date(e),
    fill: void 0,
  },
  Ra = {
    prefix: "\x07",
    test: (e) => e instanceof RegExp,
    serialize: (e) => `${e.flags} ${e.source}`,
    prepare: (e) => {
      const t = e.indexOf(" "),
        n = e.slice(t + 1),
        s = e.slice(0, t);
      return new RegExp(n, s);
    },
    fill: void 0,
  },
  Aa = {
    prefix: "",
    test: (e) => e instanceof Error,
    serialize: (e) => e.message,
    prepare: (e) => {
      const t = new Error(e);
      return (t.stack = void 0), t;
    },
    fill: void 0,
  },
  Pa = {
    prefix: "",
    test: (e) => Ir(e),
    serialize: void 0,
    prepare: (e, t, n) => n,
    fill: void 0,
  },
  Jt = Symbol("serializable-data"),
  Ma = {
    prefix: "",
    test: (e) => Ja(e),
    serialize: (e, t) => {
      const [n] = e[Jt];
      return ms(n, { $getObjId$: t });
    },
    prepare: (e, t) => {
      const n = e.indexOf("{"),
        s = n == -1 ? e : e.slice(0, n),
        r = yn(s, t.$containerEl$);
      return L(r);
    },
    fill: (e, t) => {
      const [n] = e[Jt];
      n.$capture$ &&
        n.$capture$.length > 0 &&
        ((n.$captureRef$ = n.$capture$.map(t)), (n.$capture$ = null));
    },
  },
  Es = [
    Sa,
    {
      prefix: "",
      test: (e) => e instanceof kt,
      collect: (e, t, n) => (B(e.untrackedValue, t, n), n && uo(e[ze], t), e),
      serialize: (e, t) => t(e.untrackedValue),
      prepare: (e, t) => new kt(e, t.$subsManager$.$createManager$()),
      subs: (e, t) => {
        e[ze].$addSubs$(t);
      },
      fill: (e, t) => {
        e.untrackedValue = t(e.untrackedValue);
      },
    },
    {
      prefix: "",
      test: (e) => e instanceof ot,
      collect: (e, t, n) => (B(e.ref, t, n), e),
      serialize: (e, t) => `${t(e.ref)} ${e.prop}`,
      prepare: (e) => {
        const [t, n] = e.split(" ");
        return new ot(t, n);
      },
      fill: (e, t) => {
        e.ref = t(e.ref);
      },
    },
    Ta,
    Ia,
    Ea,
    Na,
    Ra,
    Aa,
    Pa,
    Ma,
    {
      prefix: "",
      test: (e) => typeof e == "function" && e.__qwik_serializable__ !== void 0,
      serialize: (e) => e.toString(),
      prepare: (e) => {
        const t = new Function("return " + e)();
        return (t.__qwik_serializable__ = !0), t;
      },
      fill: void 0,
    },
    {
      prefix: "",
      test: (e) => typeof e == "number",
      serialize: (e) => String(e),
      prepare: (e) => Number(e),
      fill: void 0,
    },
  ],
  Oa = Es.filter((e) => e.collect),
  Ca = (e, t, n) => {
    for (const s of Oa) if (s.test(e)) return s.collect(e, t, n), !0;
    return !1;
  },
  La = (e, t, n) => {
    for (const s of Es)
      if (s.test(e)) {
        let r = s.prefix;
        return s.serialize && (r += s.serialize(e, t, n)), r;
      }
  },
  za = (e, t, n) => {
    const s = new Map(),
      r = new Map();
    return {
      prepare(o) {
        for (const i of Es) {
          const a = i.prefix;
          if (o.startsWith(a)) {
            const l = i.prepare(o.slice(a.length), t, n);
            return i.fill && s.set(l, i), i.subs && r.set(l, i), l;
          }
        }
        return o;
      },
      subs(o, i) {
        const a = r.get(o);
        return !!a && (a.subs(o, i, t), !0);
      },
      fill(o) {
        const i = s.get(o);
        return !!i && (i.fill(o, e, t), !0);
      },
    };
  },
  Da = {
    "!": (e, t) => {
      var n;
      return (n = t.$proxyMap$.get(e)) != null ? n : qs(e, t);
    },
    "~": (e) => Promise.resolve(e),
    _: (e) => Promise.reject(e),
  },
  Ns = new WeakSet(),
  Ha = (e) => (!me(e) && !_e(e)) || !Ns.has(e),
  Va = (e) => !Ns.has(e),
  qn = (e) => (e != null && Ns.add(e), e),
  kn = (e) => {
    var t;
    return me(e) && (t = ht(e)) != null ? t : e;
  },
  ht = (e) => e[Un],
  Me = (e) => e[ze],
  Za = (e) => e[Be],
  Wa = (e, t) => {
    const n = e[0],
      s = t(e[1]);
    if (!s) return;
    let r = n + " " + s;
    if (e[0] === 0) e[2] && (r += " " + e[2]);
    else {
      const o = typeof e[3] == "string" ? e[3] : ir(t(e[3]));
      (r += ` ${ir(t(e[2]))} ${o} ${e[4]}`), e[5] && (r += ` ${e[5]}`);
    }
    return r;
  },
  Ba = (e, t) => {
    const n = e.split(" "),
      s = parseInt(n[0], 10);
    n.length;
    const r = [s, t(n[1])];
    return (
      s === 0
        ? (n.length, r.push(n[2]))
        : (n.length === 5 || n.length, r.push(t(n[2]), t(n[3]), n[4], n[5])),
      r
    );
  },
  Fa = (e) => {
    const t = new Map();
    return {
      $createManager$: (n) => new Qa(t, e, n),
      $clearSub$: (n) => {
        const s = t.get(n);
        if (s) {
          for (const r of s) r.$unsubGroup$(n);
          t.delete(n), (s.length = 0);
        }
      },
    };
  };
class Qa {
  constructor(t, n, s) {
    (this.$groupToManagers$ = t),
      (this.$containerState$ = n),
      (this.$subs$ = []),
      s && this.$addSubs$(s);
  }
  $addSubs$(t) {
    this.$subs$.push(...t);
    for (const n of this.$subs$) this.$addToGroup$(n[1], this);
  }
  $addToGroup$(t, n) {
    let s = this.$groupToManagers$.get(t);
    s || this.$groupToManagers$.set(t, (s = [])), s.includes(n) || s.push(n);
  }
  $unsubGroup$(t) {
    const n = this.$subs$;
    for (let s = 0; s < n.length; s++) n[s][1] === t && (n.splice(s, 1), s--);
  }
  $addSub$(t) {
    const n = this.$subs$,
      s = t[1],
      r = t[t.length - 1];
    n.some(([o, i, a]) => o === 0 && i === s && a === r) ||
      (n.push(t), this.$addToGroup$(s, this));
  }
  $notifySubs$(t) {
    const n = this.$subs$;
    for (const s of n) {
      const r = s[s.length - 1];
      (t && r && r !== t) || ma(s, this.$containerState$);
    }
  }
}
const ir = (e) => {
    if (e == null) throw Pt("must be non null", e);
    return e;
  },
  bo = (e) => typeof e == "function" && typeof e.getSymbol == "function",
  Rs = (e, t, n, s, r, o, i) => {
    let a;
    const l = (f) => {
        a || (a = f);
      },
      d = async (f) => {
        if ((f && l(f), n !== null)) return n;
        if (s !== null) return (n = s().then((y) => (n = y[t])));
        {
          if (!e) throw te(31, t);
          if (!a) throw te(30, e, t);
          const y = gn().importSymbol(a, e, t);
          return (n = D(y, ($) => (n = $)));
        }
      },
      u = (f) => (n !== null ? n : d(f)),
      m =
        (f, y) =>
        (...$) => {
          const S = Ya(),
            I = u();
          return D(I, (q) => {
            if (_e(q)) {
              if (y && y() === !1) return;
              const M = { ...h(f), $qrl$: _ };
              return Ka(t, M.$element$, S), Re(M, q, ...$);
            }
            throw te(10);
          });
        },
      h = (f) => (f == null ? Ae() : Q(f) ? Ar(f) : f),
      p = async function (...f) {
        return await m()(...f);
      },
      g = i != null ? i : t,
      v = Ua(g),
      _ = p;
    return Object.assign(p, {
      getSymbol: () => g,
      getHash: () => v,
      resolve: d,
      $resolveLazy$: u,
      $setContainer$: l,
      $chunk$: e,
      $symbol$: t,
      $refSymbol$: i,
      $hash$: v,
      getFn: m,
      $capture$: r,
      $captureRef$: o,
      $dev$: null,
    });
  },
  Ua = (e) => {
    const t = e.lastIndexOf("_");
    return t > -1 ? e.slice(t + 1) : e;
  },
  Ka = (e, t, n) => {
    Ga("qsymbol", { symbol: e, element: t, reqTime: n });
  },
  Ga = (e, t) => {
    Ge() ||
      typeof document != "object" ||
      document.dispatchEvent(new CustomEvent(e, { bubbles: !1, detail: t }));
  },
  Ya = () =>
    Ge() ? 0 : typeof performance == "object" ? performance.now() : 0,
  L = (e) => {
    function t(n, s) {
      const r = e.$hash$ + ":" + (s || "");
      return c(
        Ct,
        { "q:renderFn": e, [$e]: n[$e], children: n.children, props: n },
        r
      );
    }
    return (t[Jt] = [e]), t;
  },
  Ja = (e) => typeof e == "function" && e[Jt] !== void 0,
  jn = (e) => {
    var n;
    const t = (n = e.name) != null ? n : "";
    return c(Ct, { "q:s": "" }, t);
  },
  Xa = async (e, t) => {
    var d;
    const n = t.containerTagName,
      s = Yn(1).$element$,
      r = zr(s),
      o = Kr({ nodeType: 9 }, r),
      i = (d = t.beforeContent) != null ? d : [],
      a = {
        rCtx: o,
        $contexts$: [],
        projectedChildren: void 0,
        projectedContext: void 0,
        hostCtx: null,
        invocationContext: void 0,
        headNodes: n === "html" ? i : [],
        $pendingListeners$: [],
      },
      l = {
        ...t.containerAttributes,
        "q:container": "paused",
        "q:version": "0.11.1",
        "q:render": "ssr",
        "q:base": t.base,
        children: n === "html" ? [e] : [i, e],
      };
    (r.$envData$ = { url: t.url, ...t.envData }),
      (e = c(n, l)),
      (r.$hostsRendering$ = new Set()),
      (r.$renderPromise$ = Promise.resolve().then(() =>
        ec(e, a, t.stream, r, t)
      )),
      await r.$renderPromise$;
  },
  ec = async (e, t, n, s, r) => {
    const o = r.beforeClose;
    return (
      await qo(
        e,
        t,
        n,
        0,
        o
          ? (i) => {
              const a = o(t.$contexts$, s);
              return ye(a, t, i, 0, void 0);
            }
          : void 0
      ),
      t.rCtx.$static$
    );
  },
  wo = (e, t, n, s, r, o, i) => {
    var p;
    const a = e.props,
      l = a["q:renderFn"];
    if (l) return (t.$componentQrl$ = l), nc(s, r, t, e, o, i);
    let d = "<!--qv" + tc(a);
    const u = "q:s" in a,
      m = e.key != null ? String(e.key) : null;
    if (
      (u &&
        ((p = s.hostCtx) == null || p.$id$, (d += " q:sref=" + s.hostCtx.$id$)),
      m != null && (d += " q:key=" + m),
      (d += "-->"),
      r.write(d),
      n)
    )
      for (const g of n) xo(g.type, g.props, r);
    const h = ko(a.children, s, r, o);
    return D(h, () => {
      var v;
      if (!u && !i) return void r.write(ar);
      let g;
      if (u) {
        const _ = (v = s.projectedChildren) == null ? void 0 : v[m];
        _ &&
          ((s.projectedChildren[m] = void 0),
          (g = ye(_, s.projectedContext, r, o)));
      }
      return (
        i && (g = D(g, () => i(r))),
        D(g, () => {
          r.write(ar);
        })
      );
    });
  },
  ar = "<!--/qv-->",
  tc = (e) => {
    let t = "";
    for (const n of Object.keys(e)) {
      if (n === "children") continue;
      const s = e[n];
      s != null && (t += " " + (s === "" ? n : n + "=" + s));
    }
    return t;
  },
  xo = (e, t, n) => {
    if (
      (n.write(
        "<" +
          e +
          ((r) => {
            let o = "";
            for (const i of Object.keys(r)) {
              if (i === "dangerouslySetInnerHTML") continue;
              const a = r[i];
              a != null && (o += " " + (a === "" ? i : i + '="' + a + '"'));
            }
            return o;
          })(t) +
          ">"
      ),
      !!To[e])
    )
      return;
    const s = t.dangerouslySetInnerHTML;
    s != null && n.write(s), n.write(`</${e}>`);
  },
  nc = (e, t, n, s, r, o) => {
    const i = s.props;
    return (
      oc(e.rCtx, n, i.props),
      D(Bt(e.rCtx, n), (a) => {
        const l = n.$element$,
          d = a.rCtx,
          u = Ae(l, void 0);
        (u.$subscriber$ = l), (u.$renderCtx$ = d);
        const m = { ...e, rCtx: d },
          h = {
            ...e,
            projectedChildren: sc(i.children, e),
            projectedContext: m,
            rCtx: d,
            invocationContext: u,
          },
          p = [];
        if (n.$appendStyles$) {
          const b = 4 & r ? e.headNodes : p;
          for (const f of n.$appendStyles$)
            b.push(
              c("style", {
                "q:style": f.styleId,
                dangerouslySetInnerHTML: f.content,
              })
            );
        }
        const g = $n(e.rCtx),
          v = n.$scopeIds$ ? ao(n.$scopeIds$) : void 0,
          _ = c(s.type, { "q:sstyle": v, "q:id": g, children: a.node }, s.key);
        return (
          (n.$id$ = g),
          e.$contexts$.push(n),
          (h.hostCtx = n),
          wo(
            _,
            n,
            p,
            h,
            t,
            r,
            (b) => (
              n.$needAttachListeners$, o ? D(cr(h, b), () => o(b)) : cr(h, b)
            )
          )
        );
      })
    );
  },
  cr = (e, t) => {
    const n = e.projectedChildren;
    if (n) {
      const s = Object.keys(n).map((r) => {
        const o = n[r];
        if (o)
          return c("q:template", {
            [$e]: r,
            hidden: "",
            "aria-hidden": "true",
            children: o,
          });
      });
      return ye(s, e, t, 0, void 0);
    }
  },
  sc = (e, t) => {
    var r;
    const n = jo(e, t);
    if (n === null) return;
    const s = {};
    for (const o of n) {
      let i = "";
      vn(o) && (i = (r = o.props[$e]) != null ? r : "");
      let a = s[i];
      a || (s[i] = a = []), a.push(o);
    }
    return s;
  },
  Yn = (e) => Y({ nodeType: e, _qc_: null }),
  qo = (e, t, n, s, r) => {
    var a, l;
    const o = e.type;
    if (typeof o == "string") {
      const d = e.key,
        u = e.props,
        m = (a = u[j]) != null ? a : Ie,
        h = Yn(1),
        p = h.$element$,
        g = o === "head",
        v = t.hostCtx;
      let _ = "<" + o,
        b = !1;
      for (const q of Object.keys(u)) {
        if (
          q === "children" ||
          q === "key" ||
          q === "class" ||
          q === "className" ||
          q === "dangerouslySetInnerHTML"
        )
          continue;
        if (q === "ref") {
          ys(u[q], p);
          continue;
        }
        let M = ae(m[q]) ? m[q] : u[q];
        if (gs(q)) {
          Or(h.li, q, M, void 0);
          continue;
        }
        const V = ic(q);
        if (ae(M)) {
          if (v) {
            const ee = v.$element$;
            mt(1, ee, M, p, V), (b = !0);
          }
          M = M.value;
        }
        q.startsWith("preventdefault:") &&
          Vt(q.slice(15), t.rCtx.$static$.$containerState$);
        const Z = ac(V, M);
        Z != null && (_ += " " + (M === "" ? V : V + '="' + uc(Z) + '"'));
      }
      const f = h.li,
        y = (l = u.class) != null ? l : u.className;
      let $ = rc(y);
      if (
        (v &&
          (v.$scopeIds$ && ($ = v.$scopeIds$.join(" ") + " " + $),
          v.$needAttachListeners$ &&
            (f.push(...v.li), (v.$needAttachListeners$ = !1))),
        g && (s |= 1),
        cc[o] && (s |= 8),
        ($ = $.trim()),
        $ && (_ += ' class="' + $ + '"'),
        f.length > 0)
      ) {
        const q = Mr(f);
        for (const M of q)
          (_ += " " + M[0] + '="' + Nr(M[1], h) + '"'),
            Vt(M[0], t.rCtx.$static$.$containerState$);
      }
      if (
        (d != null && (_ += ' q:key="' + d + '"'),
        "ref" in u || f.length > 0 || b)
      ) {
        const q = $n(t.rCtx);
        (_ += ' q:id="' + q + '"'), (h.$id$ = q), t.$contexts$.push(h);
      }
      if ((1 & s && (_ += " q:head"), (_ += ">"), n.write(_), To[o])) return;
      const S = u.dangerouslySetInnerHTML;
      if (S != null) return n.write(String(S)), void n.write(`</${o}>`);
      g || (s &= -2), o === "html" ? (s |= 4) : (s &= -5);
      const I = ye(u.children, t, n, s);
      return D(I, () => {
        if (g) {
          for (const q of t.headNodes) xo(q.type, q.props, n);
          t.headNodes.length = 0;
        }
        if (r)
          return D(r(n), () => {
            n.write(`</${o}>`);
          });
        n.write(`</${o}>`);
      });
    }
    if (o === Ct) {
      const d = Yn(111);
      return (d.$parent$ = t.hostCtx), wo(e, d, void 0, t, n, s, r);
    }
    if (o === Hr) return void n.write("<!--" + e.props.data + "-->");
    if (o === Vr)
      return (async (d, u, m, h) => {
        m.write("<!--qkssr-f-->");
        const p = d.props.children;
        let g;
        if (_e(p)) {
          const v = p({
            write(_) {
              m.write(_), m.write("<!--qkssr-f-->");
            },
          });
          if (ie(v)) return v;
          g = v;
        } else g = p;
        for await (const v of g)
          await ye(v, u, m, h, void 0), m.write("<!--qkssr-f-->");
      })(e, t, n, s);
    const i = Re(t.invocationContext, o, e.props, e.key);
    return ye(i, t, n, s, r);
  },
  ye = (e, t, n, s, r) => {
    var o;
    if (e != null && typeof e != "boolean")
      if (Mt(e) || typeof e == "number") n.write(Cn(String(e)));
      else {
        if (vn(e)) return qo(e, t, n, s, r);
        if (Q(e)) return ko(e, t, n, s);
        if (ae(e)) {
          const i = 8 & s,
            a = (o = t.hostCtx) == null ? void 0 : o.$element$;
          let l;
          if (a) {
            if (!i) {
              l = e.value;
              const d = $n(t.rCtx);
              return (
                mt(2, a, e, "#" + d, "data"),
                void n.write(`<!--t=${d}-->${Cn(Ft(l))}<!---->`)
              );
            }
            l = Re(t.invocationContext, () => e.value);
          }
          return void n.write(Cn(Ft(l)));
        }
        if (ie(e))
          return n.write("<!--qkssr-f-->"), e.then((i) => ye(i, t, n, s, r));
      }
  };
function ko(e, t, n, s) {
  if (e == null) return;
  if (!Q(e)) return ye(e, t, n, s);
  if (e.length === 1) return ye(e[0], t, n, s);
  if (e.length === 0) return;
  let r = 0;
  const o = [];
  return e.reduce((i, a, l) => {
    const d = [];
    o.push(d);
    const u = ye(
        a,
        t,
        i
          ? {
              write(h) {
                r === l ? n.write(h) : d.push(h);
              },
            }
          : n,
        s
      ),
      m = () => {
        r++, o.length > r && o[r].forEach((h) => n.write(h));
      };
    return ie(u) && i
      ? Promise.all([u, i]).then(m)
      : ie(u)
      ? u.then(m)
      : i
      ? i.then(m)
      : void r++;
  }, void 0);
}
const jo = (e, t) => {
    if (e == null) return null;
    const n = So(e, t),
      s = Q(n) ? n : [n];
    return s.length === 0 ? null : s;
  },
  rc = (e) => {
    if (!e) return "";
    if (typeof e == "string") return e;
    if (Array.isArray(e)) return e.join(" ");
    const t = [];
    for (const n in e)
      Object.prototype.hasOwnProperty.call(e, n) && e[n] && t.push(n);
    return t.join(" ");
  },
  So = (e, t) => {
    if (e == null) return null;
    if (Q(e)) return e.flatMap((n) => So(n, t));
    if (
      vn(e) &&
      _e(e.type) &&
      e.type !== Hr &&
      e.type !== Vr &&
      e.type !== Ct
    ) {
      const n = Re(t.invocationContext, e.type, e.props, e.key);
      return jo(n, t);
    }
    return e;
  },
  oc = (e, t, n) => {
    var i;
    const s = Object.keys(n),
      r = { [Be]: 2 };
    if (((t.$props$ = Lt(r, e.$static$.$containerState$)), s.length === 0))
      return;
    const o = (r[j] = (i = n[j]) != null ? i : Ie);
    for (const a of s)
      a !== "children" &&
        a !== $e &&
        (ae(o[a]) ? (r["$$" + a] = o[a]) : (r[a] = n[a]));
  };
function ic(e) {
  return e === "htmlFor" ? "for" : e;
}
function ac(e, t) {
  return e === "style"
    ? Yr(t)
    : t === !1 || t == null
    ? null
    : t === !0
    ? ""
    : String(t);
}
const cc = { title: !0, style: !0, script: !0, noframes: !0, noscript: !0 },
  To = {
    area: !0,
    base: !0,
    basefont: !0,
    bgsound: !0,
    br: !0,
    col: !0,
    embed: !0,
    frame: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  },
  lc = /[&<>]/g,
  dc = /[&"]/g,
  Cn = (e) =>
    e.replace(lc, (t) => {
      switch (t) {
        case "&":
          return "&amp;";
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        default:
          return "";
      }
    }),
  uc = (e) =>
    e.replace(dc, (t) => {
      switch (t) {
        case "&":
          return "&amp;";
        case '"':
          return "&quot;";
        default:
          return "";
      }
    }),
  yt = (e, t) => {
    var i;
    const { get: n, set: s, ctx: r } = Ot();
    if (n != null) return n;
    const o = _e(e) ? e() : e;
    if ((t == null ? void 0 : t.reactive) === !1) return s(o), o;
    {
      const a = r.$renderCtx$.$static$.$containerState$,
        l = qs(
          o,
          a,
          (i = t == null ? void 0 : t.recursive) != null && i ? 1 : 0
        );
      return s(l), l;
    }
  };
function Io(e, t) {
  var n;
  return (n = fs().$renderCtx$.$static$.$containerState$.$envData$[e]) != null
    ? n
    : t;
}
const mc = L(
    R(
      () =>
        c("footer", {
          class: "flex flex-col gap-4 px-8 py-20",
          children: [
            c("div", {
              class: "text-lg text-white",
              children: "Qwik City Movies",
            }),
            c("div", {
              class: "flex flex-row items-center gap-2",
              children: [
                c("span", {
                  class: "text-sm opacity-60",
                  children: "Made with",
                }),
                c("a", {
                  href: "https://qwik.builder.io/",
                  class: "rounded-md bg-white p-1",
                  children: c("img", {
                    src: "/images/qwik.svg",
                    width: 100,
                    height: 20,
                    alt: "Qwik",
                    "aria-label": "Qwik",
                  }),
                }),
              ],
            }),
            c("div", {
              class: "flex flex-row items-center gap-2",
              children: [
                c("span", {
                  class: "text-sm opacity-60",
                  children: "Design by",
                }),
                c("a", {
                  href: "https://movies.nuxt.space/",
                  class: "link",
                  children: "Nuxt Movies",
                }),
              ],
            }),
            c("div", {
              class: "text-sm opacity-60",
              children: [
                "This product uses the",
                " ",
                c("a", {
                  class: "link",
                  href: "https://www.themoviedb.org/documentation/api",
                  children: "TMDB API",
                }),
                " ",
                "but is not endorsed or certified by TMDB.",
              ],
            }),
          ],
        }),
      "s_lnV60n0uEBY"
    )
  ),
  hc = !0,
  fc = !1,
  pc = Ye("qc-c"),
  Eo = Ye("qc-ic"),
  No = Ye("qc-h"),
  Ro = Ye("qc-l"),
  Ao = Ye("qc-n"),
  gc = L(
    R(() => {
      const { contents: e } = Je(Eo);
      if (e && e.length > 0) {
        const t = e.length;
        let n = null;
        for (let s = t - 1; s >= 0; s--) n = c(e[s].default, { children: n });
        return n;
      }
      return vs;
    }, "RouterOutlet_component_nd8yk3KO22c")
  ),
  lr = new WeakMap(),
  yc = async (e, t, n, s) => {
    if (Array.isArray(e))
      for (const r of e) {
        const o = r[0].exec(s);
        if (o) {
          const i = r[1],
            a = _c(r[2], o),
            l = r[4],
            d = new Array(i.length),
            u = [],
            m = vc(t, s);
          let h;
          return (
            i.forEach((p, g) => {
              dr(p, u, (v) => (d[g] = v), n);
            }),
            dr(m, u, (p) => (h = p == null ? void 0 : p.default), n),
            u.length > 0 && (await Promise.all(u)),
            [a, d, h, l]
          );
        }
      }
    return null;
  },
  dr = (e, t, n, s) => {
    if (typeof e == "function") {
      const r = lr.get(e);
      if (r) n(r);
      else {
        const o = e();
        typeof o.then == "function"
          ? t.push(
              o.then((i) => {
                s !== !1 && lr.set(e, i), n(i);
              })
            )
          : o && n(o);
      }
    }
  },
  vc = (e, t) => {
    if (e) {
      const n = e.find(
        (s) => s[0] === t || t.startsWith(s[0] + (t.endsWith("/") ? "" : "/"))
      );
      if (n) return n[1];
    }
  },
  _c = (e, t) => {
    const n = {};
    if (e) for (let s = 0; s < e.length; s++) n[e[s]] = t ? t[s + 1] : "";
    return n;
  },
  $c = (e, t, n) => {
    const s = Po(),
      r = { data: e ? e.body : null, head: s, ...t };
    for (let o = n.length - 1; o >= 0; o--) {
      const i = n[o] && n[o].head;
      i &&
        (typeof i == "function"
          ? ur(s, i(r))
          : typeof i == "object" && ur(s, i));
    }
    return r.head;
  },
  ur = (e, t) => {
    typeof t.title == "string" && (e.title = t.title),
      Ln(e.meta, t.meta),
      Ln(e.links, t.links),
      Ln(e.styles, t.styles);
  },
  Ln = (e, t) => {
    if (Array.isArray(t))
      for (const n of t) {
        if (typeof n.key == "string") {
          const s = e.findIndex((r) => r.key === n.key);
          if (s > -1) {
            e[s] = n;
            continue;
          }
        }
        e.push(n);
      }
  },
  Po = () => ({ title: "", meta: [], links: [], styles: [], frontmatter: {} }),
  bc = () => Je(No),
  Xe = () => Je(Ro),
  wc = () => Je(Ao),
  Mo = () => qn(Io("qwikcity")),
  Xt = (e) => e.pathname + e.search + e.hash,
  at = (e, t) => new URL(e, t.href),
  Oo = (e, t) => e.origin === t.origin,
  Co = (e, t) => e.pathname + e.search === t.pathname + t.search,
  xc = (e, t) => e.pathname === t.pathname,
  mr = (e, t) => Oo(e, t) && !Co(e, t),
  qc = (e) => e + (e.endsWith("/") ? "" : "/") + "q-data.json",
  kc = (e, t) => {
    const n = e.href;
    if (typeof n == "string" && n.trim() !== "" && typeof e.target != "string")
      try {
        const s = at(n, t),
          r = at("", t);
        if (Oo(s, r)) return Xt(s);
      } catch (s) {
        console.error(s);
      }
    return null;
  },
  jc = (e, t, n) => {
    if (e.prefetch && t) {
      const s = at(t, n);
      if (!xc(s, at("", n))) return s + "";
    }
    return null;
  },
  Sc = (e, t) => {
    const n = e.location,
      s = at(t.path, n);
    mr(n, s) && (hr(e, n, s), e.history.pushState("", "", Xt(s))),
      e[gr] ||
        ((e[gr] = 1),
        e.addEventListener("popstate", () => {
          const r = e.location,
            o = at(t.path, r);
          mr(r, o) && (hr(e, o, r), (t.path = Xt(r)));
        }));
  },
  hr = async (e, t, n) => {
    const s = e.document,
      r = n.hash;
    if (Co(t, n)) t.hash !== r && (await zn(), r ? fr(s, r) : e.scrollTo(0, 0));
    else if (r) for (let o = 0; o < 24 && (await zn(), !fr(s, r)); o++);
    else await zn(), e.scrollTo(0, 0);
  },
  zn = () => new Promise((e) => setTimeout(e, 12)),
  fr = (e, t) => {
    const n = t.slice(1),
      s = e.getElementById(n);
    return s && s.scrollIntoView(), s;
  },
  pr = (e) => {
    typeof document < "u" &&
      document.dispatchEvent(new CustomEvent("qprefetch", { detail: e }));
  },
  gr = Symbol(),
  he = () => {
    const e = Xe(),
      t = Mo();
    return ka(
      R(
        async ({ track: n }) => {
          const [s, r] = wn();
          n(r, "href");
          {
            if (!s) throw new Error("Endpoint response body is missing");
            return s.response.body;
          }
        },
        "useEndpoint_useResource_3SNE8VxnEag",
        [t, e]
      )
    );
  },
  Lo = async (e) => {
    const t = new URL(e).pathname,
      n = qc(t);
    pr({ links: [t] });
    const s = await fetch(n),
      r = s.headers.get("content-type") || "";
    if (s.ok && r.includes("json")) {
      const o = await s.json();
      return pr({ bundles: o.prefetch, links: [t] }), o;
    }
  },
  Tc = L(
    R(() => {
      const e = Mo();
      if (!(e != null && e.params))
        throw new Error("Missing Qwik City Env Data");
      const t = Io("url");
      if (!t) throw new Error("Missing Qwik URL Env Data");
      const n = new URL(t),
        s = yt({
          href: n.href,
          pathname: n.pathname,
          query: Object.fromEntries(n.searchParams.entries()),
          params: e.params,
        }),
        r = yt({ path: Xt(n) }),
        o = yt(Po),
        i = yt({ headings: void 0, menu: void 0 }),
        a = yt({ contents: void 0 });
      return (
        tt(pc, i),
        tt(Eo, a),
        tt(No, o),
        tt(Ro, s),
        tt(Ao, r),
        wa(
          R(
            async ({ track: l }) => {
              const [d, u, m, h, p, g] = wn(),
                {
                  routes: v,
                  menus: _,
                  cacheModules: b,
                } = await Promise.resolve().then(() => $d),
                f = l(g, "path"),
                y = new URL(f, p.href),
                $ = y.pathname,
                S = yc(v, _, b, $),
                I = hc ? h.response : Lo(y.href),
                q = await S;
              if (q) {
                const [M, V, Z] = q,
                  ee = V,
                  ce = ee[ee.length - 1];
                (p.href = y.href),
                  (p.pathname = $),
                  (p.params = { ...M }),
                  (p.query = Object.fromEntries(y.searchParams.entries())),
                  (d.headings = ce.headings),
                  (d.menu = Z),
                  (u.contents = qn(ee));
                const F = await I,
                  pe = $c(F, p, ee);
                (m.links = pe.links),
                  (m.meta = pe.meta),
                  (m.styles = pe.styles),
                  (m.title = pe.title),
                  fc && Sc(window, g);
              }
            },
            "QwikCity_component_useWatch_AaAlzKH0KlQ",
            [i, a, o, e, s, r]
          )
        ),
        c(jn, {})
      );
    }, "QwikCity_component_z1nvHyEppoI")
  ),
  U = L(
    R((e) => {
      const t = wc(),
        n = Xe(),
        s = e.href,
        r = { ...e },
        o = kc(r, n),
        i = jc(e, o, n);
      return (
        (r["preventdefault:click"] = !!o),
        (r.href = o || s),
        c("a", {
          ...r,
          onClick$: R(
            () => {
              const [a, l, d] = wn();
              a && (d.path = l.href);
            },
            "Link_component_a_onClick_hA9UPaY8sNQ",
            [o, r, t]
          ),
          "data-prefetch": i,
          onMouseOver$: R(
            (a, l) => yr(l),
            "Link_component_a_onMouseOver_skxgNVWVOT8"
          ),
          onQVisible$: R(
            (a, l) => yr(l, !0),
            "Link_component_a_onQVisible_uVE5iM9H73c"
          ),
          children: c(jn, {}),
        })
      );
    }, "Link_component_mYsiJcA4IBc")
  ),
  yr = (e, t) => {
    var s;
    const n =
      (s = e == null ? void 0 : e.dataset) == null ? void 0 : s.prefetch;
    n && (Dn || (Dn = window.innerWidth), (!t || (t && Dn < 520)) && Lo(n));
  };
let Dn = 0;
const Ic =
    '((s,a,i,r)=>{i=(e,t)=>{t=document.querySelector("[q\\\\:base]"),t&&a.active&&a.active.postMessage({type:"qprefetch",base:t.getAttribute("q:base"),...e})},document.addEventListener("qprefetch",e=>{const t=e.detail;a?i(t):t.bundles&&s.push(...t.bundles)}),navigator.serviceWorker.register("/service-worker.js").then(e=>{r=()=>{a=e,i({bundles:s})},e.installing?e.installing.addEventListener("statechange",t=>{t.target.state=="activated"&&r()}):e.active&&r()}).catch(e=>console.error(e))})([])',
  Ec = () => c("script", { dangerouslySetInnerHTML: Ic }),
  N = {
    genre: (e, t) => `/genre/${t}/${e}`,
    index: "/",
    media: (e, t) => `/${e}/${t}`,
    movieCategory: (e) => `/movie/categories/${e}`,
    moviePhotos: (e) => `/movie/${e}/photos`,
    movieVideo: (e) => `/movie/${e}/videos`,
    movies: "/movie",
    notFound: "/404",
    person: (e) => `/person/${e}`,
    search: "/search",
    tv: "/tv",
    tvCategory: (e) => `/tv/categories/${e}`,
  },
  Nc = L(
    R(
      () =>
        c("nav", {
          class: "h-screen bg-black px-4 py-8",
          children: c("ul", {
            class: "flex flex-col gap-8",
            children: [
              c("li", {
                class: "hover:opacity-80",
                children: c(U, {
                  get href() {
                    return N.index;
                  },
                  children: c("img", {
                    src: "/images/home.svg",
                    width: 24,
                    height: 24,
                    alt: "home",
                    "aria-label": "Home",
                  }),
                  [j]: { href: O(N, "index") },
                }),
              }),
              c("li", {
                class: "hover:opacity-80",
                children: c(U, {
                  get href() {
                    return N.movies;
                  },
                  children: c("img", {
                    src: "/images/movie.svg",
                    width: 24,
                    height: 24,
                    alt: "movie",
                    "aria-label": "Movies",
                  }),
                  [j]: { href: O(N, "movies") },
                }),
              }),
              c("li", {
                class: "hover:opacity-80",
                children: c(U, {
                  get href() {
                    return N.tv;
                  },
                  children: c("img", {
                    src: "/images/tv.svg",
                    width: 24,
                    height: 24,
                    alt: "tv",
                    "aria-label": "TV",
                  }),
                  [j]: { href: O(N, "tv") },
                }),
              }),
              c("li", {
                class: "hover:opacity-80",
                children: c(U, {
                  get href() {
                    return N.search;
                  },
                  children: c("img", {
                    src: "/images/magnifier.svg",
                    width: 24,
                    height: 24,
                    alt: "search",
                    "aria-label": "Search",
                  }),
                  [j]: { href: O(N, "search") },
                }),
              }),
            ],
          }),
        }),
      "s_xQWdV5TAzmE"
    )
  ),
  Rc = L(
    R(
      () =>
        c("div", {
          class: "flex h-screen w-screen flex-row",
          children: [
            c(Nc, {}),
            c("div", {
              class: "w-full overflow-scroll",
              children: [c("main", { children: c(jn, {}) }), c(mc, {})],
            }),
          ],
        }),
      "s_6gHZiBTRokw"
    )
  ),
  Ac = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: Rc },
      Symbol.toStringTag,
      { value: "Module" }
    )
  );
function zo(e) {
  var t,
    n,
    s = "";
  if (typeof e == "string" || typeof e == "number") s += e;
  else if (typeof e == "object")
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++)
        e[t] && (n = zo(e[t])) && (s && (s += " "), (s += n));
    else for (t in e) e[t] && (s && (s += " "), (s += t));
  return s;
}
function Hn() {
  for (var e, t, n = 0, s = ""; n < arguments.length; )
    (e = arguments[n++]) && (t = zo(e)) && (s && (s += " "), (s += t));
  return s;
}
var z;
(function (e) {
  e.assertEqual = (r) => r;
  function t(r) {}
  e.assertIs = t;
  function n(r) {
    throw new Error();
  }
  (e.assertNever = n),
    (e.arrayToEnum = (r) => {
      const o = {};
      for (const i of r) o[i] = i;
      return o;
    }),
    (e.getValidEnumValues = (r) => {
      const o = e.objectKeys(r).filter((a) => typeof r[r[a]] != "number"),
        i = {};
      for (const a of o) i[a] = r[a];
      return e.objectValues(i);
    }),
    (e.objectValues = (r) =>
      e.objectKeys(r).map(function (o) {
        return r[o];
      })),
    (e.objectKeys =
      typeof Object.keys == "function"
        ? (r) => Object.keys(r)
        : (r) => {
            const o = [];
            for (const i in r)
              Object.prototype.hasOwnProperty.call(r, i) && o.push(i);
            return o;
          }),
    (e.find = (r, o) => {
      for (const i of r) if (o(i)) return i;
    }),
    (e.isInteger =
      typeof Number.isInteger == "function"
        ? (r) => Number.isInteger(r)
        : (r) => typeof r == "number" && isFinite(r) && Math.floor(r) === r);
  function s(r, o = " | ") {
    return r.map((i) => (typeof i == "string" ? `'${i}'` : i)).join(o);
  }
  (e.joinValues = s),
    (e.jsonStringifyReplacer = (r, o) =>
      typeof o == "bigint" ? o.toString() : o);
})(z || (z = {}));
const x = z.arrayToEnum([
    "string",
    "nan",
    "number",
    "integer",
    "float",
    "boolean",
    "date",
    "bigint",
    "symbol",
    "function",
    "undefined",
    "null",
    "array",
    "object",
    "unknown",
    "promise",
    "void",
    "never",
    "map",
    "set",
  ]),
  Le = (e) => {
    switch (typeof e) {
      case "undefined":
        return x.undefined;
      case "string":
        return x.string;
      case "number":
        return isNaN(e) ? x.nan : x.number;
      case "boolean":
        return x.boolean;
      case "function":
        return x.function;
      case "bigint":
        return x.bigint;
      case "object":
        return Array.isArray(e)
          ? x.array
          : e === null
          ? x.null
          : e.then &&
            typeof e.then == "function" &&
            e.catch &&
            typeof e.catch == "function"
          ? x.promise
          : typeof Map < "u" && e instanceof Map
          ? x.map
          : typeof Set < "u" && e instanceof Set
          ? x.set
          : typeof Date < "u" && e instanceof Date
          ? x.date
          : x.object;
      default:
        return x.unknown;
    }
  },
  w = z.arrayToEnum([
    "invalid_type",
    "invalid_literal",
    "custom",
    "invalid_union",
    "invalid_union_discriminator",
    "invalid_enum_value",
    "unrecognized_keys",
    "invalid_arguments",
    "invalid_return_type",
    "invalid_date",
    "invalid_string",
    "too_small",
    "too_big",
    "invalid_intersection_types",
    "not_multiple_of",
  ]),
  Pc = (e) => JSON.stringify(e, null, 2).replace(/"([^"]+)":/g, "$1:");
class Ee extends Error {
  constructor(t) {
    super(),
      (this.issues = []),
      (this.addIssue = (s) => {
        this.issues = [...this.issues, s];
      }),
      (this.addIssues = (s = []) => {
        this.issues = [...this.issues, ...s];
      });
    const n = new.target.prototype;
    Object.setPrototypeOf
      ? Object.setPrototypeOf(this, n)
      : (this.__proto__ = n),
      (this.name = "ZodError"),
      (this.issues = t);
  }
  get errors() {
    return this.issues;
  }
  format(t) {
    const n =
        t ||
        function (o) {
          return o.message;
        },
      s = { _errors: [] },
      r = (o) => {
        for (const i of o.issues)
          if (i.code === "invalid_union") i.unionErrors.map(r);
          else if (i.code === "invalid_return_type") r(i.returnTypeError);
          else if (i.code === "invalid_arguments") r(i.argumentsError);
          else if (i.path.length === 0) s._errors.push(n(i));
          else {
            let a = s,
              l = 0;
            for (; l < i.path.length; ) {
              const d = i.path[l];
              l === i.path.length - 1
                ? ((a[d] = a[d] || { _errors: [] }), a[d]._errors.push(n(i)))
                : (a[d] = a[d] || { _errors: [] }),
                (a = a[d]),
                l++;
            }
          }
      };
    return r(this), s;
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, z.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(t = (n) => n.message) {
    const n = {},
      s = [];
    for (const r of this.issues)
      r.path.length > 0
        ? ((n[r.path[0]] = n[r.path[0]] || []), n[r.path[0]].push(t(r)))
        : s.push(t(r));
    return { formErrors: s, fieldErrors: n };
  }
  get formErrors() {
    return this.flatten();
  }
}
Ee.create = (e) => new Ee(e);
const It = (e, t) => {
  let n;
  switch (e.code) {
    case w.invalid_type:
      e.received === x.undefined
        ? (n = "Required")
        : (n = `Expected ${e.expected}, received ${e.received}`);
      break;
    case w.invalid_literal:
      n = `Invalid literal value, expected ${JSON.stringify(
        e.expected,
        z.jsonStringifyReplacer
      )}`;
      break;
    case w.unrecognized_keys:
      n = `Unrecognized key(s) in object: ${z.joinValues(e.keys, ", ")}`;
      break;
    case w.invalid_union:
      n = "Invalid input";
      break;
    case w.invalid_union_discriminator:
      n = `Invalid discriminator value. Expected ${z.joinValues(e.options)}`;
      break;
    case w.invalid_enum_value:
      n = `Invalid enum value. Expected ${z.joinValues(e.options)}, received '${
        e.received
      }'`;
      break;
    case w.invalid_arguments:
      n = "Invalid function arguments";
      break;
    case w.invalid_return_type:
      n = "Invalid function return type";
      break;
    case w.invalid_date:
      n = "Invalid date";
      break;
    case w.invalid_string:
      typeof e.validation == "object"
        ? "startsWith" in e.validation
          ? (n = `Invalid input: must start with "${e.validation.startsWith}"`)
          : "endsWith" in e.validation
          ? (n = `Invalid input: must end with "${e.validation.endsWith}"`)
          : z.assertNever(e.validation)
        : e.validation !== "regex"
        ? (n = `Invalid ${e.validation}`)
        : (n = "Invalid");
      break;
    case w.too_small:
      e.type === "array"
        ? (n = `Array must contain ${e.inclusive ? "at least" : "more than"} ${
            e.minimum
          } element(s)`)
        : e.type === "string"
        ? (n = `String must contain ${e.inclusive ? "at least" : "over"} ${
            e.minimum
          } character(s)`)
        : e.type === "number"
        ? (n = `Number must be greater than ${
            e.inclusive ? "or equal to " : ""
          }${e.minimum}`)
        : e.type === "date"
        ? (n = `Date must be greater than ${
            e.inclusive ? "or equal to " : ""
          }${new Date(e.minimum)}`)
        : (n = "Invalid input");
      break;
    case w.too_big:
      e.type === "array"
        ? (n = `Array must contain ${e.inclusive ? "at most" : "less than"} ${
            e.maximum
          } element(s)`)
        : e.type === "string"
        ? (n = `String must contain ${e.inclusive ? "at most" : "under"} ${
            e.maximum
          } character(s)`)
        : e.type === "number"
        ? (n = `Number must be less than ${e.inclusive ? "or equal to " : ""}${
            e.maximum
          }`)
        : e.type === "date"
        ? (n = `Date must be smaller than ${
            e.inclusive ? "or equal to " : ""
          }${new Date(e.maximum)}`)
        : (n = "Invalid input");
      break;
    case w.custom:
      n = "Invalid input";
      break;
    case w.invalid_intersection_types:
      n = "Intersection results could not be merged";
      break;
    case w.not_multiple_of:
      n = `Number must be a multiple of ${e.multipleOf}`;
      break;
    default:
      (n = t.defaultError), z.assertNever(e);
  }
  return { message: n };
};
let Do = It;
function Mc(e) {
  Do = e;
}
function en() {
  return Do;
}
const tn = (e) => {
    const { data: t, path: n, errorMaps: s, issueData: r } = e,
      o = [...n, ...(r.path || [])],
      i = { ...r, path: o };
    let a = "";
    const l = s
      .filter((d) => !!d)
      .slice()
      .reverse();
    for (const d of l) a = d(i, { data: t, defaultError: a }).message;
    return { ...r, path: o, message: r.message || a };
  },
  Oc = [];
function k(e, t) {
  const n = tn({
    issueData: t,
    data: e.data,
    path: e.path,
    errorMaps: [e.common.contextualErrorMap, e.schemaErrorMap, en(), It].filter(
      (s) => !!s
    ),
  });
  e.common.issues.push(n);
}
class J {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(t, n) {
    const s = [];
    for (const r of n) {
      if (r.status === "aborted") return E;
      r.status === "dirty" && t.dirty(), s.push(r.value);
    }
    return { status: t.value, value: s };
  }
  static async mergeObjectAsync(t, n) {
    const s = [];
    for (const r of n) s.push({ key: await r.key, value: await r.value });
    return J.mergeObjectSync(t, s);
  }
  static mergeObjectSync(t, n) {
    const s = {};
    for (const r of n) {
      const { key: o, value: i } = r;
      if (o.status === "aborted" || i.status === "aborted") return E;
      o.status === "dirty" && t.dirty(),
        i.status === "dirty" && t.dirty(),
        (typeof i.value < "u" || r.alwaysSet) && (s[o.value] = i.value);
    }
    return { status: t.value, value: s };
  }
}
const E = Object.freeze({ status: "aborted" }),
  Cc = (e) => ({ status: "dirty", value: e }),
  X = (e) => ({ status: "valid", value: e }),
  Jn = (e) => e.status === "aborted",
  Xn = (e) => e.status === "dirty",
  nn = (e) => e.status === "valid",
  es = (e) => typeof Promise !== void 0 && e instanceof Promise;
var C;
(function (e) {
  (e.errToObj = (t) => (typeof t == "string" ? { message: t } : t || {})),
    (e.toString = (t) =>
      typeof t == "string" ? t : t == null ? void 0 : t.message);
})(C || (C = {}));
class be {
  constructor(t, n, s, r) {
    (this.parent = t), (this.data = n), (this._path = s), (this._key = r);
  }
  get path() {
    return this._path.concat(this._key);
  }
}
const vr = (e, t) => {
  if (nn(t)) return { success: !0, data: t.value };
  if (!e.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return { success: !1, error: new Ee(e.common.issues) };
};
function P(e) {
  if (!e) return {};
  const {
    errorMap: t,
    invalid_type_error: n,
    required_error: s,
    description: r,
  } = e;
  if (t && (n || s))
    throw new Error(
      `Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`
    );
  return t
    ? { errorMap: t, description: r }
    : {
        errorMap: (i, a) =>
          i.code !== "invalid_type"
            ? { message: a.defaultError }
            : typeof a.data > "u"
            ? { message: s != null ? s : a.defaultError }
            : { message: n != null ? n : a.defaultError },
        description: r,
      };
}
class A {
  constructor(t) {
    (this.spa = this.safeParseAsync),
      (this.superRefine = this._refinement),
      (this._def = t),
      (this.parse = this.parse.bind(this)),
      (this.safeParse = this.safeParse.bind(this)),
      (this.parseAsync = this.parseAsync.bind(this)),
      (this.safeParseAsync = this.safeParseAsync.bind(this)),
      (this.spa = this.spa.bind(this)),
      (this.refine = this.refine.bind(this)),
      (this.refinement = this.refinement.bind(this)),
      (this.superRefine = this.superRefine.bind(this)),
      (this.optional = this.optional.bind(this)),
      (this.nullable = this.nullable.bind(this)),
      (this.nullish = this.nullish.bind(this)),
      (this.array = this.array.bind(this)),
      (this.promise = this.promise.bind(this)),
      (this.or = this.or.bind(this)),
      (this.and = this.and.bind(this)),
      (this.transform = this.transform.bind(this)),
      (this.default = this.default.bind(this)),
      (this.describe = this.describe.bind(this)),
      (this.isNullable = this.isNullable.bind(this)),
      (this.isOptional = this.isOptional.bind(this));
  }
  get description() {
    return this._def.description;
  }
  _getType(t) {
    return Le(t.data);
  }
  _getOrReturnCtx(t, n) {
    return (
      n || {
        common: t.parent.common,
        data: t.data,
        parsedType: Le(t.data),
        schemaErrorMap: this._def.errorMap,
        path: t.path,
        parent: t.parent,
      }
    );
  }
  _processInputParams(t) {
    return {
      status: new J(),
      ctx: {
        common: t.parent.common,
        data: t.data,
        parsedType: Le(t.data),
        schemaErrorMap: this._def.errorMap,
        path: t.path,
        parent: t.parent,
      },
    };
  }
  _parseSync(t) {
    const n = this._parse(t);
    if (es(n)) throw new Error("Synchronous parse encountered promise.");
    return n;
  }
  _parseAsync(t) {
    const n = this._parse(t);
    return Promise.resolve(n);
  }
  parse(t, n) {
    const s = this.safeParse(t, n);
    if (s.success) return s.data;
    throw s.error;
  }
  safeParse(t, n) {
    var s;
    const r = {
        common: {
          issues: [],
          async:
            (s = n == null ? void 0 : n.async) !== null && s !== void 0
              ? s
              : !1,
          contextualErrorMap: n == null ? void 0 : n.errorMap,
        },
        path: (n == null ? void 0 : n.path) || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: t,
        parsedType: Le(t),
      },
      o = this._parseSync({ data: t, path: r.path, parent: r });
    return vr(r, o);
  }
  async parseAsync(t, n) {
    const s = await this.safeParseAsync(t, n);
    if (s.success) return s.data;
    throw s.error;
  }
  async safeParseAsync(t, n) {
    const s = {
        common: {
          issues: [],
          contextualErrorMap: n == null ? void 0 : n.errorMap,
          async: !0,
        },
        path: (n == null ? void 0 : n.path) || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: t,
        parsedType: Le(t),
      },
      r = this._parse({ data: t, path: [], parent: s }),
      o = await (es(r) ? r : Promise.resolve(r));
    return vr(s, o);
  }
  refine(t, n) {
    const s = (r) =>
      typeof n == "string" || typeof n > "u"
        ? { message: n }
        : typeof n == "function"
        ? n(r)
        : n;
    return this._refinement((r, o) => {
      const i = t(r),
        a = () => o.addIssue({ code: w.custom, ...s(r) });
      return typeof Promise < "u" && i instanceof Promise
        ? i.then((l) => (l ? !0 : (a(), !1)))
        : i
        ? !0
        : (a(), !1);
    });
  }
  refinement(t, n) {
    return this._refinement((s, r) =>
      t(s) ? !0 : (r.addIssue(typeof n == "function" ? n(s, r) : n), !1)
    );
  }
  _refinement(t) {
    return new qe({
      schema: this,
      typeName: T.ZodEffects,
      effect: { type: "refinement", refinement: t },
    });
  }
  optional() {
    return ve.create(this);
  }
  nullable() {
    return Ue.create(this);
  }
  nullish() {
    return this.optional().nullable();
  }
  array() {
    return we.create(this);
  }
  promise() {
    return dt.create(this);
  }
  or(t) {
    return Et.create([this, t]);
  }
  and(t) {
    return Nt.create(this, t);
  }
  transform(t) {
    return new qe({
      schema: this,
      typeName: T.ZodEffects,
      effect: { type: "transform", transform: t },
    });
  }
  default(t) {
    const n = typeof t == "function" ? t : () => t;
    return new As({ innerType: this, defaultValue: n, typeName: T.ZodDefault });
  }
  brand() {
    return new Vo({ typeName: T.ZodBranded, type: this, ...P(void 0) });
  }
  describe(t) {
    const n = this.constructor;
    return new n({ ...this._def, description: t });
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const Lc = /^c[^\s-]{8,}$/i,
  zc =
    /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i,
  Dc =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
class He extends A {
  constructor() {
    super(...arguments),
      (this._regex = (t, n, s) =>
        this.refinement((r) => t.test(r), {
          validation: n,
          code: w.invalid_string,
          ...C.errToObj(s),
        })),
      (this.nonempty = (t) => this.min(1, C.errToObj(t))),
      (this.trim = () =>
        new He({
          ...this._def,
          checks: [...this._def.checks, { kind: "trim" }],
        }));
  }
  _parse(t) {
    if (this._getType(t) !== x.string) {
      const o = this._getOrReturnCtx(t);
      return (
        k(o, {
          code: w.invalid_type,
          expected: x.string,
          received: o.parsedType,
        }),
        E
      );
    }
    const s = new J();
    let r;
    for (const o of this._def.checks)
      if (o.kind === "min")
        t.data.length < o.value &&
          ((r = this._getOrReturnCtx(t, r)),
          k(r, {
            code: w.too_small,
            minimum: o.value,
            type: "string",
            inclusive: !0,
            message: o.message,
          }),
          s.dirty());
      else if (o.kind === "max")
        t.data.length > o.value &&
          ((r = this._getOrReturnCtx(t, r)),
          k(r, {
            code: w.too_big,
            maximum: o.value,
            type: "string",
            inclusive: !0,
            message: o.message,
          }),
          s.dirty());
      else if (o.kind === "email")
        Dc.test(t.data) ||
          ((r = this._getOrReturnCtx(t, r)),
          k(r, {
            validation: "email",
            code: w.invalid_string,
            message: o.message,
          }),
          s.dirty());
      else if (o.kind === "uuid")
        zc.test(t.data) ||
          ((r = this._getOrReturnCtx(t, r)),
          k(r, {
            validation: "uuid",
            code: w.invalid_string,
            message: o.message,
          }),
          s.dirty());
      else if (o.kind === "cuid")
        Lc.test(t.data) ||
          ((r = this._getOrReturnCtx(t, r)),
          k(r, {
            validation: "cuid",
            code: w.invalid_string,
            message: o.message,
          }),
          s.dirty());
      else if (o.kind === "url")
        try {
          new URL(t.data);
        } catch {
          (r = this._getOrReturnCtx(t, r)),
            k(r, {
              validation: "url",
              code: w.invalid_string,
              message: o.message,
            }),
            s.dirty();
        }
      else
        o.kind === "regex"
          ? ((o.regex.lastIndex = 0),
            o.regex.test(t.data) ||
              ((r = this._getOrReturnCtx(t, r)),
              k(r, {
                validation: "regex",
                code: w.invalid_string,
                message: o.message,
              }),
              s.dirty()))
          : o.kind === "trim"
          ? (t.data = t.data.trim())
          : o.kind === "startsWith"
          ? t.data.startsWith(o.value) ||
            ((r = this._getOrReturnCtx(t, r)),
            k(r, {
              code: w.invalid_string,
              validation: { startsWith: o.value },
              message: o.message,
            }),
            s.dirty())
          : o.kind === "endsWith"
          ? t.data.endsWith(o.value) ||
            ((r = this._getOrReturnCtx(t, r)),
            k(r, {
              code: w.invalid_string,
              validation: { endsWith: o.value },
              message: o.message,
            }),
            s.dirty())
          : z.assertNever(o);
    return { status: s.value, value: t.data };
  }
  _addCheck(t) {
    return new He({ ...this._def, checks: [...this._def.checks, t] });
  }
  email(t) {
    return this._addCheck({ kind: "email", ...C.errToObj(t) });
  }
  url(t) {
    return this._addCheck({ kind: "url", ...C.errToObj(t) });
  }
  uuid(t) {
    return this._addCheck({ kind: "uuid", ...C.errToObj(t) });
  }
  cuid(t) {
    return this._addCheck({ kind: "cuid", ...C.errToObj(t) });
  }
  regex(t, n) {
    return this._addCheck({ kind: "regex", regex: t, ...C.errToObj(n) });
  }
  startsWith(t, n) {
    return this._addCheck({ kind: "startsWith", value: t, ...C.errToObj(n) });
  }
  endsWith(t, n) {
    return this._addCheck({ kind: "endsWith", value: t, ...C.errToObj(n) });
  }
  min(t, n) {
    return this._addCheck({ kind: "min", value: t, ...C.errToObj(n) });
  }
  max(t, n) {
    return this._addCheck({ kind: "max", value: t, ...C.errToObj(n) });
  }
  length(t, n) {
    return this.min(t, n).max(t, n);
  }
  get isEmail() {
    return !!this._def.checks.find((t) => t.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((t) => t.kind === "url");
  }
  get isUUID() {
    return !!this._def.checks.find((t) => t.kind === "uuid");
  }
  get isCUID() {
    return !!this._def.checks.find((t) => t.kind === "cuid");
  }
  get minLength() {
    let t = null;
    for (const n of this._def.checks)
      n.kind === "min" && (t === null || n.value > t) && (t = n.value);
    return t;
  }
  get maxLength() {
    let t = null;
    for (const n of this._def.checks)
      n.kind === "max" && (t === null || n.value < t) && (t = n.value);
    return t;
  }
}
He.create = (e) => new He({ checks: [], typeName: T.ZodString, ...P(e) });
function Hc(e, t) {
  const n = (e.toString().split(".")[1] || "").length,
    s = (t.toString().split(".")[1] || "").length,
    r = n > s ? n : s,
    o = parseInt(e.toFixed(r).replace(".", "")),
    i = parseInt(t.toFixed(r).replace(".", ""));
  return (o % i) / Math.pow(10, r);
}
class Fe extends A {
  constructor() {
    super(...arguments),
      (this.min = this.gte),
      (this.max = this.lte),
      (this.step = this.multipleOf);
  }
  _parse(t) {
    if (this._getType(t) !== x.number) {
      const o = this._getOrReturnCtx(t);
      return (
        k(o, {
          code: w.invalid_type,
          expected: x.number,
          received: o.parsedType,
        }),
        E
      );
    }
    let s;
    const r = new J();
    for (const o of this._def.checks)
      o.kind === "int"
        ? z.isInteger(t.data) ||
          ((s = this._getOrReturnCtx(t, s)),
          k(s, {
            code: w.invalid_type,
            expected: "integer",
            received: "float",
            message: o.message,
          }),
          r.dirty())
        : o.kind === "min"
        ? (o.inclusive ? t.data < o.value : t.data <= o.value) &&
          ((s = this._getOrReturnCtx(t, s)),
          k(s, {
            code: w.too_small,
            minimum: o.value,
            type: "number",
            inclusive: o.inclusive,
            message: o.message,
          }),
          r.dirty())
        : o.kind === "max"
        ? (o.inclusive ? t.data > o.value : t.data >= o.value) &&
          ((s = this._getOrReturnCtx(t, s)),
          k(s, {
            code: w.too_big,
            maximum: o.value,
            type: "number",
            inclusive: o.inclusive,
            message: o.message,
          }),
          r.dirty())
        : o.kind === "multipleOf"
        ? Hc(t.data, o.value) !== 0 &&
          ((s = this._getOrReturnCtx(t, s)),
          k(s, {
            code: w.not_multiple_of,
            multipleOf: o.value,
            message: o.message,
          }),
          r.dirty())
        : z.assertNever(o);
    return { status: r.value, value: t.data };
  }
  gte(t, n) {
    return this.setLimit("min", t, !0, C.toString(n));
  }
  gt(t, n) {
    return this.setLimit("min", t, !1, C.toString(n));
  }
  lte(t, n) {
    return this.setLimit("max", t, !0, C.toString(n));
  }
  lt(t, n) {
    return this.setLimit("max", t, !1, C.toString(n));
  }
  setLimit(t, n, s, r) {
    return new Fe({
      ...this._def,
      checks: [
        ...this._def.checks,
        { kind: t, value: n, inclusive: s, message: C.toString(r) },
      ],
    });
  }
  _addCheck(t) {
    return new Fe({ ...this._def, checks: [...this._def.checks, t] });
  }
  int(t) {
    return this._addCheck({ kind: "int", message: C.toString(t) });
  }
  positive(t) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: C.toString(t),
    });
  }
  negative(t) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: C.toString(t),
    });
  }
  nonpositive(t) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: C.toString(t),
    });
  }
  nonnegative(t) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: C.toString(t),
    });
  }
  multipleOf(t, n) {
    return this._addCheck({
      kind: "multipleOf",
      value: t,
      message: C.toString(n),
    });
  }
  get minValue() {
    let t = null;
    for (const n of this._def.checks)
      n.kind === "min" && (t === null || n.value > t) && (t = n.value);
    return t;
  }
  get maxValue() {
    let t = null;
    for (const n of this._def.checks)
      n.kind === "max" && (t === null || n.value < t) && (t = n.value);
    return t;
  }
  get isInt() {
    return !!this._def.checks.find((t) => t.kind === "int");
  }
}
Fe.create = (e) => new Fe({ checks: [], typeName: T.ZodNumber, ...P(e) });
class sn extends A {
  _parse(t) {
    if (this._getType(t) !== x.bigint) {
      const s = this._getOrReturnCtx(t);
      return (
        k(s, {
          code: w.invalid_type,
          expected: x.bigint,
          received: s.parsedType,
        }),
        E
      );
    }
    return X(t.data);
  }
}
sn.create = (e) => new sn({ typeName: T.ZodBigInt, ...P(e) });
class rn extends A {
  _parse(t) {
    if (this._getType(t) !== x.boolean) {
      const s = this._getOrReturnCtx(t);
      return (
        k(s, {
          code: w.invalid_type,
          expected: x.boolean,
          received: s.parsedType,
        }),
        E
      );
    }
    return X(t.data);
  }
}
rn.create = (e) => new rn({ typeName: T.ZodBoolean, ...P(e) });
class ct extends A {
  _parse(t) {
    if (this._getType(t) !== x.date) {
      const o = this._getOrReturnCtx(t);
      return (
        k(o, {
          code: w.invalid_type,
          expected: x.date,
          received: o.parsedType,
        }),
        E
      );
    }
    if (isNaN(t.data.getTime())) {
      const o = this._getOrReturnCtx(t);
      return k(o, { code: w.invalid_date }), E;
    }
    const s = new J();
    let r;
    for (const o of this._def.checks)
      o.kind === "min"
        ? t.data.getTime() < o.value &&
          ((r = this._getOrReturnCtx(t, r)),
          k(r, {
            code: w.too_small,
            message: o.message,
            inclusive: !0,
            minimum: o.value,
            type: "date",
          }),
          s.dirty())
        : o.kind === "max"
        ? t.data.getTime() > o.value &&
          ((r = this._getOrReturnCtx(t, r)),
          k(r, {
            code: w.too_big,
            message: o.message,
            inclusive: !0,
            maximum: o.value,
            type: "date",
          }),
          s.dirty())
        : z.assertNever(o);
    return { status: s.value, value: new Date(t.data.getTime()) };
  }
  _addCheck(t) {
    return new ct({ ...this._def, checks: [...this._def.checks, t] });
  }
  min(t, n) {
    return this._addCheck({
      kind: "min",
      value: t.getTime(),
      message: C.toString(n),
    });
  }
  max(t, n) {
    return this._addCheck({
      kind: "max",
      value: t.getTime(),
      message: C.toString(n),
    });
  }
  get minDate() {
    let t = null;
    for (const n of this._def.checks)
      n.kind === "min" && (t === null || n.value > t) && (t = n.value);
    return t != null ? new Date(t) : null;
  }
  get maxDate() {
    let t = null;
    for (const n of this._def.checks)
      n.kind === "max" && (t === null || n.value < t) && (t = n.value);
    return t != null ? new Date(t) : null;
  }
}
ct.create = (e) => new ct({ checks: [], typeName: T.ZodDate, ...P(e) });
class on extends A {
  _parse(t) {
    if (this._getType(t) !== x.undefined) {
      const s = this._getOrReturnCtx(t);
      return (
        k(s, {
          code: w.invalid_type,
          expected: x.undefined,
          received: s.parsedType,
        }),
        E
      );
    }
    return X(t.data);
  }
}
on.create = (e) => new on({ typeName: T.ZodUndefined, ...P(e) });
class an extends A {
  _parse(t) {
    if (this._getType(t) !== x.null) {
      const s = this._getOrReturnCtx(t);
      return (
        k(s, {
          code: w.invalid_type,
          expected: x.null,
          received: s.parsedType,
        }),
        E
      );
    }
    return X(t.data);
  }
}
an.create = (e) => new an({ typeName: T.ZodNull, ...P(e) });
class lt extends A {
  constructor() {
    super(...arguments), (this._any = !0);
  }
  _parse(t) {
    return X(t.data);
  }
}
lt.create = (e) => new lt({ typeName: T.ZodAny, ...P(e) });
class We extends A {
  constructor() {
    super(...arguments), (this._unknown = !0);
  }
  _parse(t) {
    return X(t.data);
  }
}
We.create = (e) => new We({ typeName: T.ZodUnknown, ...P(e) });
class Oe extends A {
  _parse(t) {
    const n = this._getOrReturnCtx(t);
    return (
      k(n, { code: w.invalid_type, expected: x.never, received: n.parsedType }),
      E
    );
  }
}
Oe.create = (e) => new Oe({ typeName: T.ZodNever, ...P(e) });
class cn extends A {
  _parse(t) {
    if (this._getType(t) !== x.undefined) {
      const s = this._getOrReturnCtx(t);
      return (
        k(s, {
          code: w.invalid_type,
          expected: x.void,
          received: s.parsedType,
        }),
        E
      );
    }
    return X(t.data);
  }
}
cn.create = (e) => new cn({ typeName: T.ZodVoid, ...P(e) });
class we extends A {
  _parse(t) {
    const { ctx: n, status: s } = this._processInputParams(t),
      r = this._def;
    if (n.parsedType !== x.array)
      return (
        k(n, {
          code: w.invalid_type,
          expected: x.array,
          received: n.parsedType,
        }),
        E
      );
    if (
      (r.minLength !== null &&
        n.data.length < r.minLength.value &&
        (k(n, {
          code: w.too_small,
          minimum: r.minLength.value,
          type: "array",
          inclusive: !0,
          message: r.minLength.message,
        }),
        s.dirty()),
      r.maxLength !== null &&
        n.data.length > r.maxLength.value &&
        (k(n, {
          code: w.too_big,
          maximum: r.maxLength.value,
          type: "array",
          inclusive: !0,
          message: r.maxLength.message,
        }),
        s.dirty()),
      n.common.async)
    )
      return Promise.all(
        n.data.map((i, a) => r.type._parseAsync(new be(n, i, n.path, a)))
      ).then((i) => J.mergeArray(s, i));
    const o = n.data.map((i, a) => r.type._parseSync(new be(n, i, n.path, a)));
    return J.mergeArray(s, o);
  }
  get element() {
    return this._def.type;
  }
  min(t, n) {
    return new we({
      ...this._def,
      minLength: { value: t, message: C.toString(n) },
    });
  }
  max(t, n) {
    return new we({
      ...this._def,
      maxLength: { value: t, message: C.toString(n) },
    });
  }
  length(t, n) {
    return this.min(t, n).max(t, n);
  }
  nonempty(t) {
    return this.min(1, t);
  }
}
we.create = (e, t) =>
  new we({
    type: e,
    minLength: null,
    maxLength: null,
    typeName: T.ZodArray,
    ...P(t),
  });
var ln;
(function (e) {
  e.mergeShapes = (t, n) => ({ ...t, ...n });
})(ln || (ln = {}));
const _r = (e) => (t) => new H({ ...e, shape: () => ({ ...e.shape(), ...t }) });
function nt(e) {
  if (e instanceof H) {
    const t = {};
    for (const n in e.shape) {
      const s = e.shape[n];
      t[n] = ve.create(nt(s));
    }
    return new H({ ...e._def, shape: () => t });
  } else
    return e instanceof we
      ? we.create(nt(e.element))
      : e instanceof ve
      ? ve.create(nt(e.unwrap()))
      : e instanceof Ue
      ? Ue.create(nt(e.unwrap()))
      : e instanceof xe
      ? xe.create(e.items.map((t) => nt(t)))
      : e;
}
class H extends A {
  constructor() {
    super(...arguments),
      (this._cached = null),
      (this.nonstrict = this.passthrough),
      (this.augment = _r(this._def)),
      (this.extend = _r(this._def));
  }
  _getCached() {
    if (this._cached !== null) return this._cached;
    const t = this._def.shape(),
      n = z.objectKeys(t);
    return (this._cached = { shape: t, keys: n });
  }
  _parse(t) {
    if (this._getType(t) !== x.object) {
      const d = this._getOrReturnCtx(t);
      return (
        k(d, {
          code: w.invalid_type,
          expected: x.object,
          received: d.parsedType,
        }),
        E
      );
    }
    const { status: s, ctx: r } = this._processInputParams(t),
      { shape: o, keys: i } = this._getCached(),
      a = [];
    if (
      !(this._def.catchall instanceof Oe && this._def.unknownKeys === "strip")
    )
      for (const d in r.data) i.includes(d) || a.push(d);
    const l = [];
    for (const d of i) {
      const u = o[d],
        m = r.data[d];
      l.push({
        key: { status: "valid", value: d },
        value: u._parse(new be(r, m, r.path, d)),
        alwaysSet: d in r.data,
      });
    }
    if (this._def.catchall instanceof Oe) {
      const d = this._def.unknownKeys;
      if (d === "passthrough")
        for (const u of a)
          l.push({
            key: { status: "valid", value: u },
            value: { status: "valid", value: r.data[u] },
          });
      else if (d === "strict")
        a.length > 0 &&
          (k(r, { code: w.unrecognized_keys, keys: a }), s.dirty());
      else if (d !== "strip")
        throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const d = this._def.catchall;
      for (const u of a) {
        const m = r.data[u];
        l.push({
          key: { status: "valid", value: u },
          value: d._parse(new be(r, m, r.path, u)),
          alwaysSet: u in r.data,
        });
      }
    }
    return r.common.async
      ? Promise.resolve()
          .then(async () => {
            const d = [];
            for (const u of l) {
              const m = await u.key;
              d.push({ key: m, value: await u.value, alwaysSet: u.alwaysSet });
            }
            return d;
          })
          .then((d) => J.mergeObjectSync(s, d))
      : J.mergeObjectSync(s, l);
  }
  get shape() {
    return this._def.shape();
  }
  strict(t) {
    return (
      C.errToObj,
      new H({
        ...this._def,
        unknownKeys: "strict",
        ...(t !== void 0
          ? {
              errorMap: (n, s) => {
                var r, o, i, a;
                const l =
                  (i =
                    (o = (r = this._def).errorMap) === null || o === void 0
                      ? void 0
                      : o.call(r, n, s).message) !== null && i !== void 0
                    ? i
                    : s.defaultError;
                return n.code === "unrecognized_keys"
                  ? {
                      message:
                        (a = C.errToObj(t).message) !== null && a !== void 0
                          ? a
                          : l,
                    }
                  : { message: l };
              },
            }
          : {}),
      })
    );
  }
  strip() {
    return new H({ ...this._def, unknownKeys: "strip" });
  }
  passthrough() {
    return new H({ ...this._def, unknownKeys: "passthrough" });
  }
  setKey(t, n) {
    return this.augment({ [t]: n });
  }
  merge(t) {
    return new H({
      unknownKeys: t._def.unknownKeys,
      catchall: t._def.catchall,
      shape: () => ln.mergeShapes(this._def.shape(), t._def.shape()),
      typeName: T.ZodObject,
    });
  }
  catchall(t) {
    return new H({ ...this._def, catchall: t });
  }
  pick(t) {
    const n = {};
    return (
      z.objectKeys(t).map((s) => {
        this.shape[s] && (n[s] = this.shape[s]);
      }),
      new H({ ...this._def, shape: () => n })
    );
  }
  omit(t) {
    const n = {};
    return (
      z.objectKeys(this.shape).map((s) => {
        z.objectKeys(t).indexOf(s) === -1 && (n[s] = this.shape[s]);
      }),
      new H({ ...this._def, shape: () => n })
    );
  }
  deepPartial() {
    return nt(this);
  }
  partial(t) {
    const n = {};
    if (t)
      return (
        z.objectKeys(this.shape).map((s) => {
          z.objectKeys(t).indexOf(s) === -1
            ? (n[s] = this.shape[s])
            : (n[s] = this.shape[s].optional());
        }),
        new H({ ...this._def, shape: () => n })
      );
    for (const s in this.shape) {
      const r = this.shape[s];
      n[s] = r.optional();
    }
    return new H({ ...this._def, shape: () => n });
  }
  required() {
    const t = {};
    for (const n in this.shape) {
      let r = this.shape[n];
      for (; r instanceof ve; ) r = r._def.innerType;
      t[n] = r;
    }
    return new H({ ...this._def, shape: () => t });
  }
  keyof() {
    return Ho(z.objectKeys(this.shape));
  }
}
H.create = (e, t) =>
  new H({
    shape: () => e,
    unknownKeys: "strip",
    catchall: Oe.create(),
    typeName: T.ZodObject,
    ...P(t),
  });
H.strictCreate = (e, t) =>
  new H({
    shape: () => e,
    unknownKeys: "strict",
    catchall: Oe.create(),
    typeName: T.ZodObject,
    ...P(t),
  });
H.lazycreate = (e, t) =>
  new H({
    shape: e,
    unknownKeys: "strip",
    catchall: Oe.create(),
    typeName: T.ZodObject,
    ...P(t),
  });
class Et extends A {
  _parse(t) {
    const { ctx: n } = this._processInputParams(t),
      s = this._def.options;
    function r(o) {
      for (const a of o) if (a.result.status === "valid") return a.result;
      for (const a of o)
        if (a.result.status === "dirty")
          return n.common.issues.push(...a.ctx.common.issues), a.result;
      const i = o.map((a) => new Ee(a.ctx.common.issues));
      return k(n, { code: w.invalid_union, unionErrors: i }), E;
    }
    if (n.common.async)
      return Promise.all(
        s.map(async (o) => {
          const i = { ...n, common: { ...n.common, issues: [] }, parent: null };
          return {
            result: await o._parseAsync({
              data: n.data,
              path: n.path,
              parent: i,
            }),
            ctx: i,
          };
        })
      ).then(r);
    {
      let o;
      const i = [];
      for (const l of s) {
        const d = { ...n, common: { ...n.common, issues: [] }, parent: null },
          u = l._parseSync({ data: n.data, path: n.path, parent: d });
        if (u.status === "valid") return u;
        u.status === "dirty" && !o && (o = { result: u, ctx: d }),
          d.common.issues.length && i.push(d.common.issues);
      }
      if (o) return n.common.issues.push(...o.ctx.common.issues), o.result;
      const a = i.map((l) => new Ee(l));
      return k(n, { code: w.invalid_union, unionErrors: a }), E;
    }
  }
  get options() {
    return this._def.options;
  }
}
Et.create = (e, t) => new Et({ options: e, typeName: T.ZodUnion, ...P(t) });
class Sn extends A {
  _parse(t) {
    const { ctx: n } = this._processInputParams(t);
    if (n.parsedType !== x.object)
      return (
        k(n, {
          code: w.invalid_type,
          expected: x.object,
          received: n.parsedType,
        }),
        E
      );
    const s = this.discriminator,
      r = n.data[s],
      o = this.options.get(r);
    return o
      ? n.common.async
        ? o._parseAsync({ data: n.data, path: n.path, parent: n })
        : o._parseSync({ data: n.data, path: n.path, parent: n })
      : (k(n, {
          code: w.invalid_union_discriminator,
          options: this.validDiscriminatorValues,
          path: [s],
        }),
        E);
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get validDiscriminatorValues() {
    return Array.from(this.options.keys());
  }
  get options() {
    return this._def.options;
  }
  static create(t, n, s) {
    const r = new Map();
    try {
      n.forEach((o) => {
        const i = o.shape[t].value;
        r.set(i, o);
      });
    } catch {
      throw new Error(
        "The discriminator value could not be extracted from all the provided schemas"
      );
    }
    if (r.size !== n.length)
      throw new Error("Some of the discriminator values are not unique");
    return new Sn({
      typeName: T.ZodDiscriminatedUnion,
      discriminator: t,
      options: r,
      ...P(s),
    });
  }
}
function ts(e, t) {
  const n = Le(e),
    s = Le(t);
  if (e === t) return { valid: !0, data: e };
  if (n === x.object && s === x.object) {
    const r = z.objectKeys(t),
      o = z.objectKeys(e).filter((a) => r.indexOf(a) !== -1),
      i = { ...e, ...t };
    for (const a of o) {
      const l = ts(e[a], t[a]);
      if (!l.valid) return { valid: !1 };
      i[a] = l.data;
    }
    return { valid: !0, data: i };
  } else if (n === x.array && s === x.array) {
    if (e.length !== t.length) return { valid: !1 };
    const r = [];
    for (let o = 0; o < e.length; o++) {
      const i = e[o],
        a = t[o],
        l = ts(i, a);
      if (!l.valid) return { valid: !1 };
      r.push(l.data);
    }
    return { valid: !0, data: r };
  } else
    return n === x.date && s === x.date && +e == +t
      ? { valid: !0, data: e }
      : { valid: !1 };
}
class Nt extends A {
  _parse(t) {
    const { status: n, ctx: s } = this._processInputParams(t),
      r = (o, i) => {
        if (Jn(o) || Jn(i)) return E;
        const a = ts(o.value, i.value);
        return a.valid
          ? ((Xn(o) || Xn(i)) && n.dirty(), { status: n.value, value: a.data })
          : (k(s, { code: w.invalid_intersection_types }), E);
      };
    return s.common.async
      ? Promise.all([
          this._def.left._parseAsync({ data: s.data, path: s.path, parent: s }),
          this._def.right._parseAsync({
            data: s.data,
            path: s.path,
            parent: s,
          }),
        ]).then(([o, i]) => r(o, i))
      : r(
          this._def.left._parseSync({ data: s.data, path: s.path, parent: s }),
          this._def.right._parseSync({ data: s.data, path: s.path, parent: s })
        );
  }
}
Nt.create = (e, t, n) =>
  new Nt({ left: e, right: t, typeName: T.ZodIntersection, ...P(n) });
class xe extends A {
  _parse(t) {
    const { status: n, ctx: s } = this._processInputParams(t);
    if (s.parsedType !== x.array)
      return (
        k(s, {
          code: w.invalid_type,
          expected: x.array,
          received: s.parsedType,
        }),
        E
      );
    if (s.data.length < this._def.items.length)
      return (
        k(s, {
          code: w.too_small,
          minimum: this._def.items.length,
          inclusive: !0,
          type: "array",
        }),
        E
      );
    !this._def.rest &&
      s.data.length > this._def.items.length &&
      (k(s, {
        code: w.too_big,
        maximum: this._def.items.length,
        inclusive: !0,
        type: "array",
      }),
      n.dirty());
    const o = s.data
      .map((i, a) => {
        const l = this._def.items[a] || this._def.rest;
        return l ? l._parse(new be(s, i, s.path, a)) : null;
      })
      .filter((i) => !!i);
    return s.common.async
      ? Promise.all(o).then((i) => J.mergeArray(n, i))
      : J.mergeArray(n, o);
  }
  get items() {
    return this._def.items;
  }
  rest(t) {
    return new xe({ ...this._def, rest: t });
  }
}
xe.create = (e, t) => {
  if (!Array.isArray(e))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new xe({ items: e, typeName: T.ZodTuple, rest: null, ...P(t) });
};
class Rt extends A {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(t) {
    const { status: n, ctx: s } = this._processInputParams(t);
    if (s.parsedType !== x.object)
      return (
        k(s, {
          code: w.invalid_type,
          expected: x.object,
          received: s.parsedType,
        }),
        E
      );
    const r = [],
      o = this._def.keyType,
      i = this._def.valueType;
    for (const a in s.data)
      r.push({
        key: o._parse(new be(s, a, s.path, a)),
        value: i._parse(new be(s, s.data[a], s.path, a)),
      });
    return s.common.async ? J.mergeObjectAsync(n, r) : J.mergeObjectSync(n, r);
  }
  get element() {
    return this._def.valueType;
  }
  static create(t, n, s) {
    return n instanceof A
      ? new Rt({ keyType: t, valueType: n, typeName: T.ZodRecord, ...P(s) })
      : new Rt({
          keyType: He.create(),
          valueType: t,
          typeName: T.ZodRecord,
          ...P(n),
        });
  }
}
class dn extends A {
  _parse(t) {
    const { status: n, ctx: s } = this._processInputParams(t);
    if (s.parsedType !== x.map)
      return (
        k(s, { code: w.invalid_type, expected: x.map, received: s.parsedType }),
        E
      );
    const r = this._def.keyType,
      o = this._def.valueType,
      i = [...s.data.entries()].map(([a, l], d) => ({
        key: r._parse(new be(s, a, s.path, [d, "key"])),
        value: o._parse(new be(s, l, s.path, [d, "value"])),
      }));
    if (s.common.async) {
      const a = new Map();
      return Promise.resolve().then(async () => {
        for (const l of i) {
          const d = await l.key,
            u = await l.value;
          if (d.status === "aborted" || u.status === "aborted") return E;
          (d.status === "dirty" || u.status === "dirty") && n.dirty(),
            a.set(d.value, u.value);
        }
        return { status: n.value, value: a };
      });
    } else {
      const a = new Map();
      for (const l of i) {
        const d = l.key,
          u = l.value;
        if (d.status === "aborted" || u.status === "aborted") return E;
        (d.status === "dirty" || u.status === "dirty") && n.dirty(),
          a.set(d.value, u.value);
      }
      return { status: n.value, value: a };
    }
  }
}
dn.create = (e, t, n) =>
  new dn({ valueType: t, keyType: e, typeName: T.ZodMap, ...P(n) });
class Qe extends A {
  _parse(t) {
    const { status: n, ctx: s } = this._processInputParams(t);
    if (s.parsedType !== x.set)
      return (
        k(s, { code: w.invalid_type, expected: x.set, received: s.parsedType }),
        E
      );
    const r = this._def;
    r.minSize !== null &&
      s.data.size < r.minSize.value &&
      (k(s, {
        code: w.too_small,
        minimum: r.minSize.value,
        type: "set",
        inclusive: !0,
        message: r.minSize.message,
      }),
      n.dirty()),
      r.maxSize !== null &&
        s.data.size > r.maxSize.value &&
        (k(s, {
          code: w.too_big,
          maximum: r.maxSize.value,
          type: "set",
          inclusive: !0,
          message: r.maxSize.message,
        }),
        n.dirty());
    const o = this._def.valueType;
    function i(l) {
      const d = new Set();
      for (const u of l) {
        if (u.status === "aborted") return E;
        u.status === "dirty" && n.dirty(), d.add(u.value);
      }
      return { status: n.value, value: d };
    }
    const a = [...s.data.values()].map((l, d) =>
      o._parse(new be(s, l, s.path, d))
    );
    return s.common.async ? Promise.all(a).then((l) => i(l)) : i(a);
  }
  min(t, n) {
    return new Qe({
      ...this._def,
      minSize: { value: t, message: C.toString(n) },
    });
  }
  max(t, n) {
    return new Qe({
      ...this._def,
      maxSize: { value: t, message: C.toString(n) },
    });
  }
  size(t, n) {
    return this.min(t, n).max(t, n);
  }
  nonempty(t) {
    return this.min(1, t);
  }
}
Qe.create = (e, t) =>
  new Qe({
    valueType: e,
    minSize: null,
    maxSize: null,
    typeName: T.ZodSet,
    ...P(t),
  });
class rt extends A {
  constructor() {
    super(...arguments), (this.validate = this.implement);
  }
  _parse(t) {
    const { ctx: n } = this._processInputParams(t);
    if (n.parsedType !== x.function)
      return (
        k(n, {
          code: w.invalid_type,
          expected: x.function,
          received: n.parsedType,
        }),
        E
      );
    function s(a, l) {
      return tn({
        data: a,
        path: n.path,
        errorMaps: [
          n.common.contextualErrorMap,
          n.schemaErrorMap,
          en(),
          It,
        ].filter((d) => !!d),
        issueData: { code: w.invalid_arguments, argumentsError: l },
      });
    }
    function r(a, l) {
      return tn({
        data: a,
        path: n.path,
        errorMaps: [
          n.common.contextualErrorMap,
          n.schemaErrorMap,
          en(),
          It,
        ].filter((d) => !!d),
        issueData: { code: w.invalid_return_type, returnTypeError: l },
      });
    }
    const o = { errorMap: n.common.contextualErrorMap },
      i = n.data;
    return this._def.returns instanceof dt
      ? X(async (...a) => {
          const l = new Ee([]),
            d = await this._def.args.parseAsync(a, o).catch((h) => {
              throw (l.addIssue(s(a, h)), l);
            }),
            u = await i(...d);
          return await this._def.returns._def.type
            .parseAsync(u, o)
            .catch((h) => {
              throw (l.addIssue(r(u, h)), l);
            });
        })
      : X((...a) => {
          const l = this._def.args.safeParse(a, o);
          if (!l.success) throw new Ee([s(a, l.error)]);
          const d = i(...l.data),
            u = this._def.returns.safeParse(d, o);
          if (!u.success) throw new Ee([r(d, u.error)]);
          return u.data;
        });
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...t) {
    return new rt({ ...this._def, args: xe.create(t).rest(We.create()) });
  }
  returns(t) {
    return new rt({ ...this._def, returns: t });
  }
  implement(t) {
    return this.parse(t);
  }
  strictImplement(t) {
    return this.parse(t);
  }
  static create(t, n, s) {
    return new rt({
      args: t || xe.create([]).rest(We.create()),
      returns: n || We.create(),
      typeName: T.ZodFunction,
      ...P(s),
    });
  }
}
class un extends A {
  get schema() {
    return this._def.getter();
  }
  _parse(t) {
    const { ctx: n } = this._processInputParams(t);
    return this._def.getter()._parse({ data: n.data, path: n.path, parent: n });
  }
}
un.create = (e, t) => new un({ getter: e, typeName: T.ZodLazy, ...P(t) });
class mn extends A {
  _parse(t) {
    if (t.data !== this._def.value) {
      const n = this._getOrReturnCtx(t);
      return k(n, { code: w.invalid_literal, expected: this._def.value }), E;
    }
    return { status: "valid", value: t.data };
  }
  get value() {
    return this._def.value;
  }
}
mn.create = (e, t) => new mn({ value: e, typeName: T.ZodLiteral, ...P(t) });
function Ho(e, t) {
  return new Tn({ values: e, typeName: T.ZodEnum, ...P(t) });
}
class Tn extends A {
  _parse(t) {
    if (typeof t.data != "string") {
      const n = this._getOrReturnCtx(t),
        s = this._def.values;
      return (
        k(n, {
          expected: z.joinValues(s),
          received: n.parsedType,
          code: w.invalid_type,
        }),
        E
      );
    }
    if (this._def.values.indexOf(t.data) === -1) {
      const n = this._getOrReturnCtx(t),
        s = this._def.values;
      return (
        k(n, { received: n.data, code: w.invalid_enum_value, options: s }), E
      );
    }
    return X(t.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const t = {};
    for (const n of this._def.values) t[n] = n;
    return t;
  }
  get Values() {
    const t = {};
    for (const n of this._def.values) t[n] = n;
    return t;
  }
  get Enum() {
    const t = {};
    for (const n of this._def.values) t[n] = n;
    return t;
  }
}
Tn.create = Ho;
class hn extends A {
  _parse(t) {
    const n = z.getValidEnumValues(this._def.values),
      s = this._getOrReturnCtx(t);
    if (s.parsedType !== x.string && s.parsedType !== x.number) {
      const r = z.objectValues(n);
      return (
        k(s, {
          expected: z.joinValues(r),
          received: s.parsedType,
          code: w.invalid_type,
        }),
        E
      );
    }
    if (n.indexOf(t.data) === -1) {
      const r = z.objectValues(n);
      return (
        k(s, { received: s.data, code: w.invalid_enum_value, options: r }), E
      );
    }
    return X(t.data);
  }
  get enum() {
    return this._def.values;
  }
}
hn.create = (e, t) => new hn({ values: e, typeName: T.ZodNativeEnum, ...P(t) });
class dt extends A {
  _parse(t) {
    const { ctx: n } = this._processInputParams(t);
    if (n.parsedType !== x.promise && n.common.async === !1)
      return (
        k(n, {
          code: w.invalid_type,
          expected: x.promise,
          received: n.parsedType,
        }),
        E
      );
    const s = n.parsedType === x.promise ? n.data : Promise.resolve(n.data);
    return X(
      s.then((r) =>
        this._def.type.parseAsync(r, {
          path: n.path,
          errorMap: n.common.contextualErrorMap,
        })
      )
    );
  }
}
dt.create = (e, t) => new dt({ type: e, typeName: T.ZodPromise, ...P(t) });
class qe extends A {
  innerType() {
    return this._def.schema;
  }
  _parse(t) {
    const { status: n, ctx: s } = this._processInputParams(t),
      r = this._def.effect || null;
    if (r.type === "preprocess") {
      const i = r.transform(s.data);
      return s.common.async
        ? Promise.resolve(i).then((a) =>
            this._def.schema._parseAsync({ data: a, path: s.path, parent: s })
          )
        : this._def.schema._parseSync({ data: i, path: s.path, parent: s });
    }
    const o = {
      addIssue: (i) => {
        k(s, i), i.fatal ? n.abort() : n.dirty();
      },
      get path() {
        return s.path;
      },
    };
    if (((o.addIssue = o.addIssue.bind(o)), r.type === "refinement")) {
      const i = (a) => {
        const l = r.refinement(a, o);
        if (s.common.async) return Promise.resolve(l);
        if (l instanceof Promise)
          throw new Error(
            "Async refinement encountered during synchronous parse operation. Use .parseAsync instead."
          );
        return a;
      };
      if (s.common.async === !1) {
        const a = this._def.schema._parseSync({
          data: s.data,
          path: s.path,
          parent: s,
        });
        return a.status === "aborted"
          ? E
          : (a.status === "dirty" && n.dirty(),
            i(a.value),
            { status: n.value, value: a.value });
      } else
        return this._def.schema
          ._parseAsync({ data: s.data, path: s.path, parent: s })
          .then((a) =>
            a.status === "aborted"
              ? E
              : (a.status === "dirty" && n.dirty(),
                i(a.value).then(() => ({ status: n.value, value: a.value })))
          );
    }
    if (r.type === "transform")
      if (s.common.async === !1) {
        const i = this._def.schema._parseSync({
          data: s.data,
          path: s.path,
          parent: s,
        });
        if (!nn(i)) return i;
        const a = r.transform(i.value, o);
        if (a instanceof Promise)
          throw new Error(
            "Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead."
          );
        return { status: n.value, value: a };
      } else
        return this._def.schema
          ._parseAsync({ data: s.data, path: s.path, parent: s })
          .then((i) =>
            nn(i)
              ? Promise.resolve(r.transform(i.value, o)).then((a) => ({
                  status: n.value,
                  value: a,
                }))
              : i
          );
    z.assertNever(r);
  }
}
qe.create = (e, t, n) =>
  new qe({ schema: e, typeName: T.ZodEffects, effect: t, ...P(n) });
qe.createWithPreprocess = (e, t, n) =>
  new qe({
    schema: t,
    effect: { type: "preprocess", transform: e },
    typeName: T.ZodEffects,
    ...P(n),
  });
class ve extends A {
  _parse(t) {
    return this._getType(t) === x.undefined
      ? X(void 0)
      : this._def.innerType._parse(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ve.create = (e, t) =>
  new ve({ innerType: e, typeName: T.ZodOptional, ...P(t) });
class Ue extends A {
  _parse(t) {
    return this._getType(t) === x.null
      ? X(null)
      : this._def.innerType._parse(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Ue.create = (e, t) =>
  new Ue({ innerType: e, typeName: T.ZodNullable, ...P(t) });
class As extends A {
  _parse(t) {
    const { ctx: n } = this._processInputParams(t);
    let s = n.data;
    return (
      n.parsedType === x.undefined && (s = this._def.defaultValue()),
      this._def.innerType._parse({ data: s, path: n.path, parent: n })
    );
  }
  removeDefault() {
    return this._def.innerType;
  }
}
As.create = (e, t) =>
  new ve({ innerType: e, typeName: T.ZodOptional, ...P(t) });
class fn extends A {
  _parse(t) {
    if (this._getType(t) !== x.nan) {
      const s = this._getOrReturnCtx(t);
      return (
        k(s, { code: w.invalid_type, expected: x.nan, received: s.parsedType }),
        E
      );
    }
    return { status: "valid", value: t.data };
  }
}
fn.create = (e) => new fn({ typeName: T.ZodNaN, ...P(e) });
const Vc = Symbol("zod_brand");
class Vo extends A {
  _parse(t) {
    const { ctx: n } = this._processInputParams(t),
      s = n.data;
    return this._def.type._parse({ data: s, path: n.path, parent: n });
  }
  unwrap() {
    return this._def.type;
  }
}
const Zo = (e, t = {}, n) =>
    e
      ? lt.create().superRefine((s, r) => {
          if (!e(s)) {
            const o = typeof t == "function" ? t(s) : t,
              i = typeof o == "string" ? { message: o } : o;
            r.addIssue({ code: "custom", ...i, fatal: n });
          }
        })
      : lt.create(),
  Zc = { object: H.lazycreate };
var T;
(function (e) {
  (e.ZodString = "ZodString"),
    (e.ZodNumber = "ZodNumber"),
    (e.ZodNaN = "ZodNaN"),
    (e.ZodBigInt = "ZodBigInt"),
    (e.ZodBoolean = "ZodBoolean"),
    (e.ZodDate = "ZodDate"),
    (e.ZodUndefined = "ZodUndefined"),
    (e.ZodNull = "ZodNull"),
    (e.ZodAny = "ZodAny"),
    (e.ZodUnknown = "ZodUnknown"),
    (e.ZodNever = "ZodNever"),
    (e.ZodVoid = "ZodVoid"),
    (e.ZodArray = "ZodArray"),
    (e.ZodObject = "ZodObject"),
    (e.ZodUnion = "ZodUnion"),
    (e.ZodDiscriminatedUnion = "ZodDiscriminatedUnion"),
    (e.ZodIntersection = "ZodIntersection"),
    (e.ZodTuple = "ZodTuple"),
    (e.ZodRecord = "ZodRecord"),
    (e.ZodMap = "ZodMap"),
    (e.ZodSet = "ZodSet"),
    (e.ZodFunction = "ZodFunction"),
    (e.ZodLazy = "ZodLazy"),
    (e.ZodLiteral = "ZodLiteral"),
    (e.ZodEnum = "ZodEnum"),
    (e.ZodEffects = "ZodEffects"),
    (e.ZodNativeEnum = "ZodNativeEnum"),
    (e.ZodOptional = "ZodOptional"),
    (e.ZodNullable = "ZodNullable"),
    (e.ZodDefault = "ZodDefault"),
    (e.ZodPromise = "ZodPromise"),
    (e.ZodBranded = "ZodBranded");
})(T || (T = {}));
const Wc = (e, t = { message: `Input not instance of ${e.name}` }) =>
    Zo((n) => n instanceof e, t, !0),
  Wo = He.create,
  Bo = Fe.create,
  Bc = fn.create,
  Fc = sn.create,
  Fo = rn.create,
  Qc = ct.create,
  Uc = on.create,
  Kc = an.create,
  Gc = lt.create,
  Yc = We.create,
  Jc = Oe.create,
  Xc = cn.create,
  el = we.create,
  tl = H.create,
  nl = H.strictCreate,
  sl = Et.create,
  rl = Sn.create,
  ol = Nt.create,
  il = xe.create,
  al = Rt.create,
  cl = dn.create,
  ll = Qe.create,
  dl = rt.create,
  ul = un.create,
  ml = mn.create,
  hl = Tn.create,
  fl = hn.create,
  pl = dt.create,
  $r = qe.create,
  gl = ve.create,
  yl = Ue.create,
  vl = qe.createWithPreprocess,
  _l = () => Wo().optional(),
  $l = () => Bo().optional(),
  bl = () => Fo().optional(),
  wl = E;
var K = Object.freeze({
  __proto__: null,
  getParsedType: Le,
  ZodParsedType: x,
  defaultErrorMap: It,
  setErrorMap: Mc,
  getErrorMap: en,
  makeIssue: tn,
  EMPTY_PATH: Oc,
  addIssueToContext: k,
  ParseStatus: J,
  INVALID: E,
  DIRTY: Cc,
  OK: X,
  isAborted: Jn,
  isDirty: Xn,
  isValid: nn,
  isAsync: es,
  ZodType: A,
  ZodString: He,
  ZodNumber: Fe,
  ZodBigInt: sn,
  ZodBoolean: rn,
  ZodDate: ct,
  ZodUndefined: on,
  ZodNull: an,
  ZodAny: lt,
  ZodUnknown: We,
  ZodNever: Oe,
  ZodVoid: cn,
  ZodArray: we,
  get objectUtil() {
    return ln;
  },
  ZodObject: H,
  ZodUnion: Et,
  ZodDiscriminatedUnion: Sn,
  ZodIntersection: Nt,
  ZodTuple: xe,
  ZodRecord: Rt,
  ZodMap: dn,
  ZodSet: Qe,
  ZodFunction: rt,
  ZodLazy: un,
  ZodLiteral: mn,
  ZodEnum: Tn,
  ZodNativeEnum: hn,
  ZodPromise: dt,
  ZodEffects: qe,
  ZodTransformer: qe,
  ZodOptional: ve,
  ZodNullable: Ue,
  ZodDefault: As,
  ZodNaN: fn,
  BRAND: Vc,
  ZodBranded: Vo,
  custom: Zo,
  Schema: A,
  ZodSchema: A,
  late: Zc,
  get ZodFirstPartyTypeKind() {
    return T;
  },
  any: Gc,
  array: el,
  bigint: Fc,
  boolean: Fo,
  date: Qc,
  discriminatedUnion: rl,
  effect: $r,
  enum: hl,
  function: dl,
  instanceof: Wc,
  intersection: ol,
  lazy: ul,
  literal: ml,
  map: cl,
  nan: Bc,
  nativeEnum: fl,
  never: Jc,
  null: Kc,
  nullable: yl,
  number: Bo,
  object: tl,
  oboolean: bl,
  onumber: $l,
  optional: gl,
  ostring: _l,
  preprocess: vl,
  promise: pl,
  record: al,
  set: ll,
  strictObject: nl,
  string: Wo,
  transformer: $r,
  tuple: il,
  undefined: Uc,
  union: sl,
  unknown: Yc,
  void: Xc,
  NEVER: wl,
  ZodIssueCode: w,
  quotelessJson: Pc,
  ZodError: Ee,
});
const Qo = L(
    R((e) => {
      const t = Math.round((e.rating || 0) * 10) / 10;
      return c("div", {
        class: "relative flex flex-row items-center gap-2",
        children: [
          c("img", {
            src: "/images/stars.png",
            class: "h-3 w-20",
            alt: "rating",
          }),
          c("img", {
            src: "/images/stars-filled.png",
            class: "absolute h-3 w-20",
            alt: "rating",
            style: { clipPath: `inset(0px ${100 - t * 10}% 0px 0px)` },
          }),
          c("div", { class: "text-sm opacity-60", children: t }),
        ],
      });
    }, "s_tPgj0Ye70sI")
  ),
  Ps = L(
    R(
      (e) =>
        c("section", {
          class: "bg-black",
          children: c("div", {
            class: "relative aspect-square md:aspect-[3/2] lg:aspect-[25/9]",
            children: [
              c("div", {
                class: "absolute top-0 bottom-0 right-0 lg:left-1/3",
                children: c("img", {
                  src: `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${e.media.backdrop_path}`,
                  alt: e.media.title || e.media.original_title,
                  class: "h-full w-full max-w-full object-cover",
                  height: 255,
                }),
              }),
              c("div", {
                class:
                  "absolute bottom-0 left-0 flex flex-col gap-2 bg-gradient-to-t from-black via-black to-transparent p-9 lg:w-2/3 lg:bg-gradient-to-r lg:px-24",
                children: [
                  c("h1", {
                    class: "mt-2 text-4xl text-white lg:text-5xl",
                    children: e.media.title || e.media.original_title,
                  }),
                  c("div", {
                    children: c("div", {
                      class: "flex flex-row gap-4",
                      children: [
                        c(Qo, {
                          get rating() {
                            return e.media.vote_average;
                          },
                          [j]: { rating: O(e.media, "vote_average") },
                        }),
                        c("div", {
                          class: "text-sm opacity-50",
                          children: `${e.media.vote_count} Reviews`,
                        }),
                      ],
                    }),
                  }),
                  c("div", { children: O(e.media, "overview") }),
                ],
              }),
            ],
          }),
        }),
      "s_iuS3oGJ90PY"
    )
  ),
  In = Ye("movie-resource-context"),
  xl = async (e) => {
    const t = K.object({ movieId: K.number().min(0).step(1) }).safeParse({
      movieId: +e.params.movieId,
    });
    if (!t.success) throw e.response.redirect(N.notFound);
    const { getMovie: n } = await Promise.resolve().then(() => fe);
    try {
      return await n({ id: t.data.movieId });
    } catch {
      throw e.response.redirect(N.notFound);
    }
  },
  ql = L(
    R(() => {
      const e = Xe(),
        t = he();
      tt(In, t);
      const n = N.media("movie", +e.params.movieId),
        s = N.movieVideo(+e.params.movieId),
        r = N.moviePhotos(+e.params.movieId);
      return c("div", {
        class: "flex flex-col gap-4",
        children: [
          c(ne, {
            value: t,
            onPending: () => c("div", { children: "Loading..." }),
            onRejected: () => c("div", { children: "Rejected" }),
            onResolved: (o) => c(Ps, { media: o }),
            [j]: { value: !0, onPending: !0, onRejected: !0, onResolved: !0 },
          }),
          c("div", {
            class: "flex flex-row items-center justify-center gap-4",
            children: [
              c(U, {
                href: n,
                class: Hn("p-2 text-xl uppercase opacity-50", {
                  "border-b-2 border-b-white opacity-100": n === e.pathname,
                }),
                children: "Overview",
                [j]: { href: !0 },
              }),
              c(U, {
                href: s,
                class: Hn("p-2 text-xl uppercase opacity-50", {
                  "border-b-2 border-b-white opacity-100": s === e.pathname,
                }),
                children: "Videos",
                [j]: { href: !0 },
              }),
              c(U, {
                href: r,
                class: Hn("p-2 text-xl uppercase opacity-50", {
                  "border-b-2 border-b-white opacity-100": r === e.pathname,
                }),
                children: "Photos",
                [j]: { href: !0 },
              }),
            ],
          }),
          c(jn, {}),
        ],
      });
    }, "s_xocArrq2r9k")
  ),
  kl = Object.freeze(
    Object.defineProperty(
      { __proto__: null, onGet: xl, default: ql },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  jl = {
    movie: [
      { query: "trending", title: "Trending Movies" },
      { query: "popular", title: "Popular Movies" },
      { query: "top_rated", title: "Top Rated Movies" },
      { query: "upcoming", title: "Upcoming Movies" },
      { query: "now_playing", title: "Now Playing Movies" },
    ],
    person: [],
    tv: [
      { query: "trending", title: "Trending TV Shows" },
      { query: "popular", title: "Popular TV Shows" },
      { query: "top_rated", title: "Top Rated TV Shows" },
      { query: "on_the_air", title: "Currently Airing TV Shows" },
      { query: "airing_today", title: "TV Shows Airing Today" },
    ],
  },
  Sl = [
    { english_name: "No Language", iso_639_1: "xx" },
    { english_name: "Afar", iso_639_1: "aa" },
    { english_name: "Afrikaans", iso_639_1: "af" },
    { english_name: "Akan", iso_639_1: "ak" },
    { english_name: "Aragonese", iso_639_1: "an" },
    { english_name: "Assamese", iso_639_1: "as" },
    { english_name: "Avaric", iso_639_1: "av" },
    { english_name: "Avestan", iso_639_1: "ae" },
    { english_name: "Aymara", iso_639_1: "ay" },
    { english_name: "Azerbaijani", iso_639_1: "az" },
    { english_name: "Bashkir", iso_639_1: "ba" },
    { english_name: "Bambara", iso_639_1: "bm" },
    { english_name: "Bislama", iso_639_1: "bi" },
    { english_name: "Tibetan", iso_639_1: "bo" },
    { english_name: "Breton", iso_639_1: "br" },
    { english_name: "Catalan", iso_639_1: "ca" },
    { english_name: "Czech", iso_639_1: "cs" },
    { english_name: "Chechen", iso_639_1: "ce" },
    { english_name: "Slavic", iso_639_1: "cu" },
    { english_name: "Chuvash", iso_639_1: "cv" },
    { english_name: "Cornish", iso_639_1: "kw" },
    { english_name: "Corsican", iso_639_1: "co" },
    { english_name: "Cree", iso_639_1: "cr" },
    { english_name: "Welsh", iso_639_1: "cy" },
    { english_name: "Danish", iso_639_1: "da" },
    { english_name: "German", iso_639_1: "de" },
    { english_name: "Divehi", iso_639_1: "dv" },
    { english_name: "Dzongkha", iso_639_1: "dz" },
    { english_name: "Esperanto", iso_639_1: "eo" },
    { english_name: "Estonian", iso_639_1: "et" },
    { english_name: "Basque", iso_639_1: "eu" },
    { english_name: "Faroese", iso_639_1: "fo" },
    { english_name: "Fijian", iso_639_1: "fj" },
    { english_name: "Finnish", iso_639_1: "fi" },
    { english_name: "French", iso_639_1: "fr" },
    { english_name: "Frisian", iso_639_1: "fy" },
    { english_name: "Fulah", iso_639_1: "ff" },
    { english_name: "Gaelic", iso_639_1: "gd" },
    { english_name: "Irish", iso_639_1: "ga" },
    { english_name: "Galician", iso_639_1: "gl" },
    { english_name: "Manx", iso_639_1: "gv" },
    { english_name: "Guarani", iso_639_1: "gn" },
    { english_name: "Gujarati", iso_639_1: "gu" },
    { english_name: "Haitian; Haitian Creole", iso_639_1: "ht" },
    { english_name: "Hausa", iso_639_1: "ha" },
    { english_name: "Serbo-Croatian", iso_639_1: "sh" },
    { english_name: "Herero", iso_639_1: "hz" },
    { english_name: "Hiri Motu", iso_639_1: "ho" },
    { english_name: "Croatian", iso_639_1: "hr" },
    { english_name: "Hungarian", iso_639_1: "hu" },
    { english_name: "Igbo", iso_639_1: "ig" },
    { english_name: "Ido", iso_639_1: "io" },
    { english_name: "Yi", iso_639_1: "ii" },
    { english_name: "Inuktitut", iso_639_1: "iu" },
    { english_name: "Interlingue", iso_639_1: "ie" },
    { english_name: "Interlingua", iso_639_1: "ia" },
    { english_name: "Indonesian", iso_639_1: "id" },
    { english_name: "Inupiaq", iso_639_1: "ik" },
    { english_name: "Icelandic", iso_639_1: "is" },
    { english_name: "Italian", iso_639_1: "it" },
    { english_name: "Javanese", iso_639_1: "jv" },
    { english_name: "Japanese", iso_639_1: "ja" },
    { english_name: "Kalaallisut", iso_639_1: "kl" },
    { english_name: "Kannada", iso_639_1: "kn" },
    { english_name: "Kashmiri", iso_639_1: "ks" },
    { english_name: "Kanuri", iso_639_1: "kr" },
    { english_name: "Kazakh", iso_639_1: "kk" },
    { english_name: "Khmer", iso_639_1: "km" },
    { english_name: "Kikuyu", iso_639_1: "ki" },
    { english_name: "Kinyarwanda", iso_639_1: "rw" },
    { english_name: "Kirghiz", iso_639_1: "ky" },
    { english_name: "Komi", iso_639_1: "kv" },
    { english_name: "Kongo", iso_639_1: "kg" },
    { english_name: "Korean", iso_639_1: "ko" },
    { english_name: "Kuanyama", iso_639_1: "kj" },
    { english_name: "Kurdish", iso_639_1: "ku" },
    { english_name: "Lao", iso_639_1: "lo" },
    { english_name: "Latin", iso_639_1: "la" },
    { english_name: "Latvian", iso_639_1: "lv" },
    { english_name: "Limburgish", iso_639_1: "li" },
    { english_name: "Lingala", iso_639_1: "ln" },
    { english_name: "Lithuanian", iso_639_1: "lt" },
    { english_name: "Letzeburgesch", iso_639_1: "lb" },
    { english_name: "Luba-Katanga", iso_639_1: "lu" },
    { english_name: "Ganda", iso_639_1: "lg" },
    { english_name: "Marshall", iso_639_1: "mh" },
    { english_name: "Malayalam", iso_639_1: "ml" },
    { english_name: "Marathi", iso_639_1: "mr" },
    { english_name: "Malagasy", iso_639_1: "mg" },
    { english_name: "Maltese", iso_639_1: "mt" },
    { english_name: "Moldavian", iso_639_1: "mo" },
    { english_name: "Mongolian", iso_639_1: "mn" },
    { english_name: "Maori", iso_639_1: "mi" },
    { english_name: "Malay", iso_639_1: "ms" },
    { english_name: "Burmese", iso_639_1: "my" },
    { english_name: "Nauru", iso_639_1: "na" },
    { english_name: "Navajo", iso_639_1: "nv" },
    { english_name: "Ndebele", iso_639_1: "nr" },
    { english_name: "Ndebele", iso_639_1: "nd" },
    { english_name: "Ndonga", iso_639_1: "ng" },
    { english_name: "Nepali", iso_639_1: "ne" },
    { english_name: "Dutch", iso_639_1: "nl" },
    { english_name: "Norwegian Nynorsk", iso_639_1: "nn" },
    { english_name: "Norwegian Bokm\xE5l", iso_639_1: "nb" },
    { english_name: "Norwegian", iso_639_1: "no" },
    { english_name: "Chichewa; Nyanja", iso_639_1: "ny" },
    { english_name: "Occitan", iso_639_1: "oc" },
    { english_name: "Ojibwa", iso_639_1: "oj" },
    { english_name: "Oriya", iso_639_1: "or" },
    { english_name: "Oromo", iso_639_1: "om" },
    { english_name: "Ossetian; Ossetic", iso_639_1: "os" },
    { english_name: "Pali", iso_639_1: "pi" },
    { english_name: "Polish", iso_639_1: "pl" },
    { english_name: "Portuguese", iso_639_1: "pt" },
    { english_name: "Quechua", iso_639_1: "qu" },
    { english_name: "Raeto-Romance", iso_639_1: "rm" },
    { english_name: "Romanian", iso_639_1: "ro" },
    { english_name: "Rundi", iso_639_1: "rn" },
    { english_name: "Russian", iso_639_1: "ru" },
    { english_name: "Sango", iso_639_1: "sg" },
    { english_name: "Sanskrit", iso_639_1: "sa" },
    { english_name: "Sinhalese", iso_639_1: "si" },
    { english_name: "Slovak", iso_639_1: "sk" },
    { english_name: "Slovenian", iso_639_1: "sl" },
    { english_name: "Northern Sami", iso_639_1: "se" },
    { english_name: "Samoan", iso_639_1: "sm" },
    { english_name: "Shona", iso_639_1: "sn" },
    { english_name: "Sindhi", iso_639_1: "sd" },
    { english_name: "Somali", iso_639_1: "so" },
    { english_name: "Sotho", iso_639_1: "st" },
    { english_name: "Spanish", iso_639_1: "es" },
    { english_name: "Albanian", iso_639_1: "sq" },
    { english_name: "Sardinian", iso_639_1: "sc" },
    { english_name: "Serbian", iso_639_1: "sr" },
    { english_name: "Swati", iso_639_1: "ss" },
    { english_name: "Sundanese", iso_639_1: "su" },
    { english_name: "Swahili", iso_639_1: "sw" },
    { english_name: "Swedish", iso_639_1: "sv" },
    { english_name: "Tahitian", iso_639_1: "ty" },
    { english_name: "Tamil", iso_639_1: "ta" },
    { english_name: "Tatar", iso_639_1: "tt" },
    { english_name: "Telugu", iso_639_1: "te" },
    { english_name: "Tajik", iso_639_1: "tg" },
    { english_name: "Tagalog", iso_639_1: "tl" },
    { english_name: "Thai", iso_639_1: "th" },
    { english_name: "Tigrinya", iso_639_1: "ti" },
    { english_name: "Tonga", iso_639_1: "to" },
    { english_name: "Tswana", iso_639_1: "tn" },
    { english_name: "Tsonga", iso_639_1: "ts" },
    { english_name: "Turkmen", iso_639_1: "tk" },
    { english_name: "Turkish", iso_639_1: "tr" },
    { english_name: "Twi", iso_639_1: "tw" },
    { english_name: "Uighur", iso_639_1: "ug" },
    { english_name: "Ukrainian", iso_639_1: "uk" },
    { english_name: "Urdu", iso_639_1: "ur" },
    { english_name: "Uzbek", iso_639_1: "uz" },
    { english_name: "Venda", iso_639_1: "ve" },
    { english_name: "Vietnamese", iso_639_1: "vi" },
    { english_name: "Volap\xFCk", iso_639_1: "vo" },
    { english_name: "Walloon", iso_639_1: "wa" },
    { english_name: "Wolof", iso_639_1: "wo" },
    { english_name: "Xhosa", iso_639_1: "xh" },
    { english_name: "Yiddish", iso_639_1: "yi" },
    { english_name: "Zhuang", iso_639_1: "za" },
    { english_name: "Zulu", iso_639_1: "zu" },
    { english_name: "Abkhazian", iso_639_1: "ab" },
    { english_name: "Mandarin", iso_639_1: "zh" },
    { english_name: "Pushto", iso_639_1: "ps" },
    { english_name: "Amharic", iso_639_1: "am" },
    { english_name: "Arabic", iso_639_1: "ar" },
    { english_name: "Bulgarian", iso_639_1: "bg" },
    { english_name: "Cantonese", iso_639_1: "cn" },
    { english_name: "Macedonian", iso_639_1: "mk" },
    { english_name: "Greek", iso_639_1: "el" },
    { english_name: "Persian", iso_639_1: "fa" },
    { english_name: "Hebrew", iso_639_1: "he" },
    { english_name: "Hindi", iso_639_1: "hi" },
    { english_name: "Armenian", iso_639_1: "hy" },
    { english_name: "English", iso_639_1: "en" },
    { english_name: "Ewe", iso_639_1: "ee" },
    { english_name: "Georgian", iso_639_1: "ka" },
    { english_name: "Punjabi", iso_639_1: "pa" },
    { english_name: "Bengali", iso_639_1: "bn" },
    { english_name: "Bosnian", iso_639_1: "bs" },
    { english_name: "Chamorro", iso_639_1: "ch" },
    { english_name: "Belarusian", iso_639_1: "be" },
    { english_name: "Yoruba", iso_639_1: "yo" },
  ],
  le = ({ type: e = "movie", query: t }) => {
    var n;
    return (
      ((n = jl[e].find((s) => s.query === t)) == null ? void 0 : n.title) || t
    );
  },
  Tl = (e) =>
    e.media_type
      ? e.media_type
      : "title" in e
      ? "movie"
      : "profile_path" in e
      ? "person"
      : "tv",
  Il = (e) => {
    if ("title" in e) return e.title;
    if ("name" in e) return e.name;
  },
  El = (e) => {
    if ("poster_path" in e) return e.poster_path;
    if ("profile_path" in e) return e.profile_path;
  };
function ns(e) {
  return new Date(e).toLocaleDateString("en-us", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
function br(e) {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(e || 0);
}
function Nl(e) {
  const t = e * 60;
  let n;
  const s = Math.floor(t / 3600);
  n = t % 3600;
  const r = Math.floor(n / 60);
  return (n = n % 60), `${s ? s + "h" : ""} ${r}min`;
}
function Rl(e) {
  const t = Sl.find((n) => n.iso_639_1 === e);
  return t ? t.english_name : e;
}
const Uo = L(
    R((e) => {
      const t = Tl(e.media),
        n = Il(e.media),
        s = El(e.media);
      return c(U, {
        href: N.media(t, e.media.id),
        children: [
          c("div", {
            class:
              "transition-scale scale-95 border-4 border-base-300 duration-300 ease-in-out hover:scale-100",
            children: c("img", {
              src: `https://image.tmdb.org/t/p/w370_and_h556_bestv2${s}`,
              width: 370,
              height: 556,
              alt: n,
            }),
          }),
          c("h2", { children: n }),
          e.media.media_type === "movie" || e.media.media_type === "tv"
            ? c(Qo, {
                get rating() {
                  return e.media.vote_average;
                },
                [j]: { rating: O(e.media, "vote_average") },
              })
            : null,
        ],
      });
    }, "s_B1ZdVo4i04I")
  ),
  de = L(
    R((e) => {
      var t;
      return c("section", {
        children: [
          c("div", {
            class: "flex flex-row items-center py-2 px-12",
            children: [
              c("h2", {
                class: "text-2xl text-white",
                children: O(e, "title"),
              }),
              c("div", { class: "flex-auto" }),
              e.viewAllHref
                ? c(U, {
                    class:
                      "transition-text opacity-50 duration-100 ease-in-out hover:text-qwik-light-blue hover:opacity-100",
                    get href() {
                      return e.viewAllHref;
                    },
                    children: "Explore All",
                    [j]: { class: !0, href: O(e, "viewAllHref") },
                  })
                : null,
            ],
          }),
          c("div", {
            class: "relative",
            children: c("div", {
              class: "overflow-y-auto py-4 px-8",
              children: c("div", {
                class: "flex w-max flex-row gap-2",
                children: [
                  (t = e.collection) == null
                    ? void 0
                    : t.map((n) =>
                        c(
                          "div",
                          { class: "w-60", children: c(Uo, { media: n }) },
                          n.id
                        )
                      ),
                  e.viewAllHref
                    ? c(U, {
                        class:
                          "transition-text flex w-44 items-center justify-center duration-100 ease-in-out hover:text-qwik-light-blue ",
                        get href() {
                          return e.viewAllHref;
                        },
                        children: "Explore All",
                        [j]: { class: !0, href: O(e, "viewAllHref") },
                      })
                    : null,
                ],
              }),
            }),
          }),
        ],
      });
    }, "s_0onGgcuyr54")
  ),
  Ms = L(
    R(
      (e) =>
        c("section", {
          class: "bg-black",
          children: c("div", {
            class: "relative aspect-square md:aspect-[3/2] lg:aspect-[25/9]",
            children: [
              c("div", {
                class: "absolute top-0 bottom-0 right-0 lg:left-1/3",
                children: c("img", {
                  src: `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${e.media.backdrop_path}`,
                  alt: e.media.name || e.media.original_name,
                  class: "h-full w-full max-w-full object-cover",
                  height: 255,
                }),
              }),
              c("div", {
                class:
                  "absolute bottom-0 left-0 flex flex-col gap-2 bg-gradient-to-t from-black via-black to-transparent p-9 lg:w-2/3 lg:bg-gradient-to-r lg:px-24",
                children: [
                  c("h1", {
                    class: "mt-2 text-4xl text-white lg:text-5xl",
                    children: e.media.name || e.media.original_name,
                  }),
                  c("div", {
                    children: c("div", {
                      class: "flex flex-row gap-4 opacity-50",
                      children: [
                        c("div", {
                          children: c("div", {
                            style: {
                              width: `${(e.media.vote_average || 0) * 100}%`,
                            },
                            children: O(e.media, "vote_average"),
                          }),
                        }),
                        c("div", { children: `${e.media.vote_count} Reviews` }),
                      ],
                    }),
                  }),
                  c("div", { children: O(e.media, "overview") }),
                ],
              }),
            ],
          }),
        }),
      "s_Gl04XvY7V0A"
    )
  ),
  Al = async () => {
    const {
        getTrending: e,
        getRandomMedia: t,
        getMovie: n,
        getTvShow: s,
      } = await Promise.resolve().then(() => fe),
      [r, o] = await Promise.all([
        e({ mediaType: "movie", page: 1 }),
        e({ mediaType: "tv", page: 1 }),
      ]),
      i = t({ collections: [r, o] }),
      a = i.media_type === "tv" ? await s({ id: i.id }) : null;
    return {
      featuredMovie: i.media_type === "movie" ? await n({ id: i.id }) : null,
      featuredTv: a,
      movies: r,
      tv: o,
    };
  },
  Pl = L(
    R(() => {
      const e = he();
      return c(ne, {
        value: e,
        onPending: () => c("div", { children: "Loading..." }),
        onRejected: () => c("div", { children: "Rejected" }),
        onResolved: (t) => {
          var n, s;
          return c("div", {
            class: "flex flex-col gap-4",
            children: [
              t.featuredTv
                ? c(U, {
                    href: N.media("tv", t.featuredTv.id),
                    children: c(Ms, {
                      get media() {
                        return t.featuredTv;
                      },
                      [j]: { media: O(t, "featuredTv") },
                    }),
                  })
                : null,
              t.featuredMovie
                ? c(U, {
                    href: N.media("movie", t.featuredMovie.id),
                    children: c(Ps, {
                      get media() {
                        return t.featuredMovie;
                      },
                      [j]: { media: O(t, "featuredMovie") },
                    }),
                  })
                : null,
              c(de, {
                collection: ((n = t.movies) == null ? void 0 : n.results) || [],
                title: le({ query: "trending", type: "movie" }),
                viewAllHref: N.movieCategory("trending"),
              }),
              c(de, {
                collection: ((s = t.tv) == null ? void 0 : s.results) || [],
                title: le({ query: "trending", type: "tv" }),
                viewAllHref: N.movieCategory("trending"),
              }),
            ],
          });
        },
        [j]: { value: !0, onPending: !0, onRejected: !0, onResolved: !0 },
      });
    }, "s_2ExQvNmMHs8")
  ),
  Ml = { title: "Qwik City Movies" },
  Ol = Object.freeze(
    Object.defineProperty(
      { __proto__: null, onGet: Al, default: Pl, head: Ml },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  Cl = async () => {
    const {
        getMovies: e,
        getRandomMedia: t,
        getMovie: n,
      } = await Promise.resolve().then(() => fe),
      [s, r, o] = await Promise.all([
        e({ page: 1, query: "popular" }),
        e({ page: 1, query: "top_rated" }),
        e({ page: 1, query: "now_playing" }),
      ]),
      i = t({ collections: [s, r, o] });
    return {
      featured: await n({ id: i.id }),
      nowPlaying: o,
      popular: s,
      topRated: r,
    };
  },
  Ll = L(
    R(() => {
      const e = he();
      return c(ne, {
        value: e,
        onPending: () => c("div", { children: "Loading..." }),
        onRejected: () => c("div", { children: "Rejected" }),
        onResolved: (t) => {
          var n;
          return c("div", {
            class: "flex flex-col gap-4",
            children: [
              t.featured
                ? c(U, {
                    href: N.media(
                      "movie",
                      (n = t.featured) == null ? void 0 : n.id
                    ),
                    children: c(Ps, {
                      get media() {
                        return t.featured;
                      },
                      [j]: { media: O(t, "featured") },
                    }),
                  })
                : null,
              c(de, {
                collection: t.popular.results || [],
                title: le({ query: "popular", type: "movie" }),
                viewAllHref: N.movieCategory("popular"),
              }),
              c(de, {
                collection: t.topRated.results || [],
                title: le({ query: "top_rated", type: "movie" }),
                viewAllHref: N.movieCategory("top_rated"),
              }),
              c(de, {
                collection: t.nowPlaying.results || [],
                title: le({ query: "now_playing", type: "movie" }),
                viewAllHref: N.movieCategory("now_playing"),
              }),
            ],
          });
        },
        [j]: { value: !0, onPending: !0, onRejected: !0, onResolved: !0 },
      });
    }, "s_kyOhTp2yu0g")
  ),
  zl = { title: "Movies" },
  Dl = Object.freeze(
    Object.defineProperty(
      { __proto__: null, onGet: Cl, default: Ll, head: zl },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  ft = L(
    R((e) => {
      var t;
      return c("section", {
        children: c("div", {
          class:
            "grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-4 p-8",
          children:
            (t = e.collection) == null
              ? void 0
              : t.map((n) => c(Uo, { media: n })),
        }),
      });
    }, "s_mYdi9850D74")
  ),
  Hl = async (e) => {
    const t = e.url.searchParams.get("query");
    if (!t) return null;
    const { search: n } = await Promise.resolve().then(() => fe),
      s = await n({ page: 1, query: t });
    return { query: t, result: s };
  },
  Vl = L(
    R(() => {
      const e = Xe(),
        t = he();
      return c("div", {
        class: "flex flex-col",
        children: [
          c("form", {
            class: "flex flex-row justify-start gap-4 bg-base-300 p-4",
            children: [
              c("img", {
                src: "/images/magnifier.svg",
                width: 24,
                height: 24,
                alt: "search",
                "aria-label": "Search",
              }),
              c("input", {
                class: "input",
                name: "query",
                id: "query",
                "aria-label": "query",
                get value() {
                  return e.query.query;
                },
                [j]: { value: O(e.query, "query") },
              }),
              c("button", { class: "btn", type: "submit", children: "Search" }),
            ],
          }),
          c(ne, {
            value: t,
            onPending: () => c("div", { children: "Loading..." }),
            onRejected: () => c("div", { children: "Rejected" }),
            onResolved: (n) => {
              var s;
              return n
                ? c(ft, {
                    collection:
                      ((s = n == null ? void 0 : n.result) == null
                        ? void 0
                        : s.results) || [],
                  })
                : c("span", {
                    class: "w-full py-40 text-center text-4xl opacity-60",
                    children: "Type something to search...",
                  });
            },
            [j]: { value: !0, onPending: !0, onRejected: !0, onResolved: !0 },
          }),
        ],
      });
    }, "s_6GDWWyTotWI")
  ),
  Zl = { title: "Search" },
  Wl = Object.freeze(
    Object.defineProperty(
      { __proto__: null, onGet: Hl, default: Vl, head: Zl },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  Bl = async () => {
    const {
        getTvShows: e,
        getTvShow: t,
        getRandomMedia: n,
      } = await Promise.resolve().then(() => fe),
      [s, r, o, i] = await Promise.all([
        e({ page: 1, query: "popular" }),
        e({ page: 1, query: "top_rated" }),
        e({ page: 1, query: "on_the_air" }),
        e({ page: 1, query: "airing_today" }),
      ]),
      a = n({ collections: [s, r, o, i] }),
      l = await t({ id: a.id });
    return {
      airingToday: i,
      featured: l,
      onTheAir: o,
      popular: s,
      topRated: r,
    };
  },
  Fl = L(
    R(() => {
      const e = he();
      return c(ne, {
        value: e,
        onPending: () => c("div", { children: "Loading..." }),
        onRejected: () => c("div", { children: "Rejected" }),
        onResolved: (t) => {
          var n;
          return c("div", {
            class: "flex flex-col gap-4",
            children: [
              c(U, {
                href: N.media("tv", (n = t.featured) == null ? void 0 : n.id),
                children: c(Ms, {
                  get media() {
                    return t.featured;
                  },
                  [j]: { media: O(t, "featured") },
                }),
              }),
              c(de, {
                collection: t.popular.results || [],
                title: le({ query: "popular", type: "tv" }),
                viewAllHref: N.tvCategory("popular"),
              }),
              c(de, {
                collection: t.topRated.results || [],
                title: le({ query: "top_rated", type: "tv" }),
                viewAllHref: N.tvCategory("top_rated"),
              }),
              c(de, {
                collection: t.onTheAir.results || [],
                title: le({ query: "on_the_air", type: "tv" }),
                viewAllHref: N.tvCategory("on_the_air"),
              }),
              c(de, {
                collection: t.airingToday.results || [],
                title: le({ query: "airing_today", type: "tv" }),
                viewAllHref: N.tvCategory("airing_today"),
              }),
            ],
          });
        },
        [j]: { value: !0, onPending: !0, onRejected: !0, onResolved: !0 },
      });
    }, "s_gXa0O1jDQ0c")
  ),
  Ql = { title: "TV" },
  Ul = Object.freeze(
    Object.defineProperty(
      { __proto__: null, onGet: Bl, default: Fl, head: Ql },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  Kl = async (e) => {
    const t = K.object({ name: K.string().min(1) }).safeParse(e.params);
    if (!t.success) throw e.response.redirect(N.notFound);
    const { getMovies: n, getTrending: s } = await Promise.resolve().then(
        () => fe
      ),
      r = t.data.name;
    try {
      return r === "trending"
        ? await s({ mediaType: "movie", page: 1 })
        : await n({ page: 1, query: r });
    } catch {
      throw e.response.redirect(N.notFound);
    }
  },
  Gl = L(
    R(() => {
      const e = Xe(),
        t = he();
      return c("div", {
        class: "flex flex-col",
        children: [
          c("h1", {
            class: "px-8 pt-4 text-4xl",
            children: le({ query: e.params.name, type: "movie" }),
          }),
          c("div", {
            children: c(ne, {
              value: t,
              onPending: () => c("div", { children: "Loading..." }),
              onRejected: () => c("div", { children: "Rejected" }),
              onResolved: (n) => c(ft, { collection: n.results || [] }),
              [j]: { value: !0, onPending: !0, onRejected: !0, onResolved: !0 },
            }),
          }),
        ],
      });
    }, "s_m1jdgzSbtRM")
  ),
  Yl = Object.freeze(
    Object.defineProperty(
      { __proto__: null, onGet: Kl, default: Gl },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  Jl = async (e) => {
    const t = K.object({ name: K.string().min(1) }).safeParse(e.params);
    if (!t.success) throw e.response.redirect(N.notFound);
    const { getTvShows: n, getTrending: s } = await Promise.resolve().then(
        () => fe
      ),
      r = t.data.name;
    try {
      return r === "trending"
        ? await s({ mediaType: "tv", page: 1 })
        : await n({ page: 1, query: r });
    } catch {
      throw e.response.redirect(N.notFound);
    }
  },
  Xl = L(
    R(() => {
      const e = Xe(),
        t = he();
      return c("div", {
        class: "flex flex-col",
        children: [
          c("h1", {
            class: "px-8 pt-4 text-4xl",
            children: le({ query: e.params.name, type: "tv" }),
          }),
          c("div", {
            children: c(ne, {
              value: t,
              onPending: () => c("div", { children: "Loading..." }),
              onRejected: () => c("div", { children: "Rejected" }),
              onResolved: (n) => c(ft, { collection: n.results || [] }),
              [j]: { value: !0, onPending: !0, onRejected: !0, onResolved: !0 },
            }),
          }),
        ],
      });
    }, "s_rAjsam0fk6g")
  ),
  ed = Object.freeze(
    Object.defineProperty(
      { __proto__: null, onGet: Jl, default: Xl },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  Ko = L(
    R(
      (e) =>
        c("ul", {
          class: "flex flex-row gap-4 opacity-80",
          children: [
            e.links.twitter_id
              ? c("li", {
                  children: c("a", {
                    href: `https://twitter.com/${e.links.twitter_id}`,
                    target: "_blank",
                    "aria-label": "Twitter account",
                    rel: "noopener",
                    children: c("img", {
                      src: "/images/twitter.svg",
                      width: 20,
                      height: 20,
                      alt: "twitter",
                      class:
                        "scale-95 transition duration-300 ease-in-out hover:scale-110",
                    }),
                  }),
                })
              : null,
            e.links.facebook_id
              ? c("li", {
                  children: c("a", {
                    href: `https://facebook.com/${e.links.facebook_id}`,
                    target: "_blank",
                    "aria-label": "Facebook account",
                    rel: "noopener",
                    children: c("img", {
                      src: "/images/facebook.svg",
                      width: 20,
                      height: 20,
                      alt: "facebook",
                      class:
                        "scale-95 transition duration-300 ease-in-out hover:scale-110",
                    }),
                  }),
                })
              : null,
            e.links.instagram_id
              ? c("li", {
                  children: c("a", {
                    href: `https://instagram.com/${e.links.instagram_id}`,
                    target: "_blank",
                    "aria-label": "Instagram account",
                    rel: "noopener",
                    children: c("img", {
                      src: "/images/instagram.svg",
                      width: 20,
                      height: 20,
                      alt: "instagram",
                      class:
                        "scale-95 transition duration-300 ease-in-out hover:scale-110",
                    }),
                  }),
                })
              : null,
            e.links.imdb_id
              ? c("li", {
                  children: c("a", {
                    href: `https://www.imdb.com/${
                      e.media === "person" ? "name" : "title"
                    }/${e.links.imdb_id}`,
                    target: "_blank",
                    "aria-label": "IMDb account",
                    rel: "noopener",
                    children: c("img", {
                      src: "/images/imdb.svg",
                      width: 20,
                      height: 20,
                      alt: "imdb",
                      class:
                        "scale-95 transition duration-300 ease-in-out hover:scale-110",
                    }),
                  }),
                })
              : null,
            e.links.homepage
              ? c("li", {
                  children: c("a", {
                    get href() {
                      return e.links.homepage;
                    },
                    target: "_blank",
                    "aria-label": "Homepage",
                    rel: "noopener",
                    children: c("img", {
                      src: "/images/link.svg",
                      width: 20,
                      height: 20,
                      alt: "homepage",
                      class:
                        "scale-95 transition duration-300 ease-in-out hover:scale-110",
                    }),
                    [j]: { href: O(e.links, "homepage") },
                  }),
                })
              : null,
          ],
        }),
      "s_5Y7C0IpQhOg"
    )
  ),
  Go = L(
    R((e) => {
      var s, r;
      const t =
          (r = (s = e.media.credits) == null ? void 0 : s.crew) == null
            ? void 0
            : r.filter((o) => o.job === "Director"),
        n = { ...e.media.external_ids, homepage: e.media.homepage };
      return c("section", {
        class: "flex justify-center p-6",
        children: c("div", {
          class: "flex max-w-5xl flex-row items-center gap-8",
          children: [
            c("div", {
              class: "hidden flex-grow md:flex",
              children: c("div", {
                class: "min-w-max",
                children: c("img", {
                  class: "w-80",
                  alt: "name",
                  src: `https://image.tmdb.org/t/p/w370_and_h556_bestv2${e.media.poster_path}`,
                }),
              }),
            }),
            c("div", {
              class: "flex flex-col gap-6",
              children: [
                e.media.overview
                  ? c("div", {
                      children: [
                        c("h2", {
                          class: "mb-4 text-3xl",
                          children: "Storyline",
                        }),
                        c("div", {
                          class: "opacity-80",
                          children: O(e.media, "overview"),
                        }),
                      ],
                    })
                  : null,
                c("div", {
                  class:
                    "grid grid-cols-[max-content_1fr] items-center gap-3 text-sm opacity-80 lg:grid-cols-[max-content_1fr_max-content_1fr]",
                  children: [
                    e.media.media_type === "movie" && e.media.release_date
                      ? c(W, {
                          children: [
                            c("div", { children: "Released" }),
                            c("div", { children: ns(e.media.release_date) }),
                          ],
                        })
                      : null,
                    e.media.runtime
                      ? c(W, {
                          children: [
                            c("div", { children: "Runtime" }),
                            c("div", { children: Nl(e.media.runtime) }),
                          ],
                        })
                      : null,
                    t && t.length > 0
                      ? c(W, {
                          children: [
                            c("div", { children: "Director" }),
                            c("div", {
                              children: t.map((o, i) =>
                                c(W, {
                                  children: [
                                    c(U, {
                                      class: "link",
                                      href: N.person(o.id),
                                      children: O(o, "name"),
                                      [j]: { class: !0 },
                                    }),
                                    i < t.length - 1 ? ", " : "",
                                  ],
                                })
                              ),
                            }),
                          ],
                        })
                      : null,
                    e.media.budget
                      ? c(W, {
                          children: [
                            c("div", { children: "Budget" }),
                            c("div", { children: br(e.media.budget) }),
                          ],
                        })
                      : null,
                    e.media.revenue
                      ? c(W, {
                          children: [
                            c("div", { children: "Revenue" }),
                            c("div", { children: br(e.media.revenue) }),
                          ],
                        })
                      : null,
                    e.media.genres
                      ? c(W, {
                          children: [
                            c("div", { children: "Genre" }),
                            c("div", {
                              children: e.media.genres.map((o, i, a) =>
                                c(W, {
                                  children: [
                                    c(U, {
                                      class: "link",
                                      href: N.genre(e.media.media_type, o.id),
                                      children: O(o, "name"),
                                      [j]: { class: !0 },
                                    }),
                                    i < a.length - 1 ? ", " : "",
                                  ],
                                })
                              ),
                            }),
                          ],
                        })
                      : null,
                    e.media.status
                      ? c(W, {
                          children: [
                            c("div", { children: "Status" }),
                            c("div", { children: O(e.media, "status") }),
                          ],
                        })
                      : null,
                    e.media.original_language
                      ? c(W, {
                          children: [
                            c("div", { children: "Language" }),
                            c("div", {
                              children: Rl(e.media.original_language),
                            }),
                          ],
                        })
                      : null,
                    e.media.production_companies
                      ? c(W, {
                          children: [
                            c("div", { children: "Production" }),
                            c("div", {
                              children: e.media.production_companies
                                .map((o) => o.name)
                                .join(", "),
                            }),
                          ],
                        })
                      : null,
                  ],
                }),
                c("div", {
                  children: c(Ko, {
                    links: n,
                    get media() {
                      return e.media.media_type;
                    },
                    [j]: { links: !0, media: O(e.media, "media_type") },
                  }),
                }),
              ],
            }),
          ],
        }),
      });
    }, "s_K0D8DduWDKo")
  ),
  td = L(
    R(() => {
      const e = Je(In);
      return c(ne, {
        value: e,
        onPending: () => c("div", { children: "Loading..." }),
        onRejected: () => c("div", { children: "Rejected" }),
        onResolved: (t) => {
          var n;
          return c("flex", {
            class: "flex flex-col",
            children: [
              c(Go, { media: t }),
              c(de, {
                collection: ((n = t.credits) == null ? void 0 : n.cast) || [],
                title: "Cast",
                [j]: { title: !0 },
              }),
            ],
          });
        },
        [j]: { value: !0, onPending: !0, onRejected: !0, onResolved: !0 },
      });
    }, "s_iImUQ8u1QZI")
  ),
  nd = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: td },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  wr = (e, t) => {
    const s = (t ? Number(new Date(t)) : Date.now()) - Number(new Date(e)),
      r = new Date(s);
    return Math.abs(r.getUTCFullYear() - 1970);
  },
  sd = L(
    R((e) => {
      const t = { ...e.person.external_ids, homepage: e.person.homepage };
      return c("section", {
        class: "flex justify-center p-6",
        children: c("div", {
          class: "flex max-w-5xl flex-row items-center gap-8",
          children: [
            c("div", {
              class: "hidden flex-grow md:flex",
              children: e.person.profile_path
                ? c("div", {
                    class: "min-w-max",
                    children: c("img", {
                      src:
                        "https://image.tmdb.org/t/p/w370_and_h556_bestv2" +
                        e.person.profile_path,
                      get alt() {
                        return e.person.name;
                      },
                      class: "w-80",
                      [j]: { alt: O(e.person, "name") },
                    }),
                  })
                : null,
            }),
            c("div", {
              class: "flex flex-col gap-6",
              children: [
                c("div", {
                  children: [
                    c("h2", {
                      class: "mb-4 text-3xl",
                      children: O(e.person, "name"),
                    }),
                    e.person.biography
                      ? c("div", {
                          class: "opacity-80",
                          children: e.person.biography
                            .split(
                              `
`
                            )
                            .filter((n) => n !== "")
                            .map((n) => c("p", { class: "mt-4", children: n })),
                        })
                      : null,
                  ],
                }),
                c("div", {
                  class:
                    "grid grid-cols-[max-content_1fr] items-center gap-3 text-sm opacity-80 lg:grid-cols-[max-content_1fr_max-content_1fr]",
                  children: [
                    e.person.known_for_department
                      ? c(W, {
                          children: [
                            c("div", { children: "Known For" }),
                            c("div", {
                              children: O(e.person, "known_for_department"),
                            }),
                          ],
                        })
                      : null,
                    e.person.birthday
                      ? c(W, {
                          children: [
                            c("div", { children: "Born" }),
                            c("div", {
                              children: [
                                ns(e.person.birthday),
                                " ",
                                e.person.deathday
                                  ? null
                                  : c("span", {
                                      children: [
                                        "(age ",
                                        wr(e.person.birthday),
                                        ")",
                                      ],
                                    }),
                              ],
                            }),
                          ],
                        })
                      : null,
                    e.person.place_of_birth
                      ? c(W, {
                          children: [
                            c("div", { children: "Place of Birth" }),
                            c("div", {
                              children: O(e.person, "place_of_birth"),
                            }),
                          ],
                        })
                      : null,
                    e.person.deathday
                      ? c(W, {
                          children: [
                            c("div", { children: "Died" }),
                            c("div", {
                              children: [
                                ns(e.person.deathday),
                                " ",
                                e.person.birthday
                                  ? c("span", {
                                      children: [
                                        "age",
                                        " ",
                                        wr(
                                          e.person.birthday,
                                          e.person.deathday
                                        ),
                                      ],
                                    })
                                  : null,
                              ],
                            }),
                          ],
                        })
                      : null,
                  ],
                }),
                c("div", {
                  children: c(Ko, {
                    media: "person",
                    links: t,
                    [j]: { media: !0, links: !0 },
                  }),
                }),
              ],
            }),
          ],
        }),
      });
    }, "s_fOqulbFT47o")
  ),
  rd = async (e) => {
    const t = K.object({ personId: K.number().min(0).step(1) }).safeParse({
      personId: +e.params.personId,
    });
    if (!t.success) throw e.response.redirect(N.notFound);
    const { getPerson: n } = await Promise.resolve().then(() => fe);
    try {
      return await n({ id: t.data.personId });
    } catch {
      throw e.response.redirect(N.notFound);
    }
  },
  od = L(
    R(() => {
      const e = he();
      return c(ne, {
        value: e,
        onPending: () => c("div", { children: "Loading..." }),
        onRejected: () => c("div", { children: "Rejected" }),
        onResolved: (t) => {
          var n, s;
          return c("div", {
            style: "flex flex-col",
            children: [
              c(sd, { person: t }),
              c(ft, {
                collection: [
                  ...(((n = t.combined_credits) == null ? void 0 : n.cast) ||
                    []),
                  ...(((s = t.combined_credits) == null ? void 0 : s.crew) ||
                    []),
                ],
              }),
            ],
          });
        },
        [j]: { value: !0, onPending: !0, onRejected: !0, onResolved: !0 },
      });
    }, "s_YAM0BXbLL00")
  ),
  id = Object.freeze(
    Object.defineProperty(
      { __proto__: null, onGet: rd, default: od },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  ad = async (e) => {
    const t = K.object({ tvId: K.number().min(0).step(1) }).safeParse({
      tvId: +e.params.tvId,
    });
    if (!t.success) throw e.response.redirect(N.notFound);
    const { getTvShow: n } = await Promise.resolve().then(() => fe);
    try {
      return await n({ id: t.data.tvId });
    } catch {
      throw e.response.redirect(N.notFound);
    }
  },
  cd = L(
    R(() => {
      const e = he();
      return c(ne, {
        value: e,
        onPending: () => c("div", { children: "Loading..." }),
        onRejected: () => c("div", { children: "Rejected" }),
        onResolved: (t) => {
          var n;
          return c("flex", {
            class: "flex flex-col",
            children: [
              c(Ms, { media: t }),
              c(Go, { media: t }),
              c(de, {
                collection: ((n = t.credits) == null ? void 0 : n.cast) || [],
                title: "Cast",
                [j]: { title: !0 },
              }),
            ],
          });
        },
        [j]: { value: !0, onPending: !0, onRejected: !0, onResolved: !0 },
      });
    }, "s_e7Q3cq1bfsA")
  ),
  ld = Object.freeze(
    Object.defineProperty(
      { __proto__: null, onGet: ad, default: cd },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  dd = async (e) => {
    const t = K.object({ genreId: K.number().min(0).step(1) }).safeParse({
      genreId: +e.params.genreId,
    });
    if (!t.success) throw e.response.redirect(N.notFound);
    const { getMediaByGenre: n, getGenreList: s } =
        await Promise.resolve().then(() => fe),
      [r, o] = await Promise.all([
        n({ genre: t.data.genreId, media: "movie", page: 1 }),
        s({ media: "movie" }),
      ]);
    return { genre: o.find((a) => a.id === t.data.genreId), movies: r };
  },
  ud = L(
    R(() => {
      const e = he();
      return c(ne, {
        value: e,
        onPending: () => c("div", { children: "Loading..." }),
        onRejected: () => c("div", { children: "Rejected" }),
        onResolved: (t) => {
          var n, s;
          return c("div", {
            class: "flex flex-col",
            children: [
              c("h1", {
                class: "px-8 pt-4 text-4xl",
                children: `Movie Genre: ${
                  (n = t.genre) == null ? void 0 : n.name
                }`,
              }),
              c(ft, {
                collection: (s = t.movies) == null ? void 0 : s.results,
              }),
            ],
          });
        },
        [j]: { value: !0, onPending: !0, onRejected: !0, onResolved: !0 },
      });
    }, "s_7U2TI0RBVVs")
  ),
  md = Object.freeze(
    Object.defineProperty(
      { __proto__: null, onGet: dd, default: ud },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  hd = async (e) => {
    const t = K.object({ genreId: K.number().min(0).step(1) }).safeParse({
      genreId: +e.params.genreId,
    });
    if (!t.success) throw e.response.redirect(N.notFound);
    const { getMediaByGenre: n, getGenreList: s } =
        await Promise.resolve().then(() => fe),
      [r, o] = await Promise.all([
        n({ genre: t.data.genreId, media: "tv", page: 1 }),
        s({ media: "tv" }),
      ]);
    return { genre: o.find((a) => a.id === t.data.genreId), tvShows: r };
  },
  fd = L(
    R(() => {
      const e = he();
      return c(ne, {
        value: e,
        onPending: () => c("div", { children: "Loading..." }),
        onRejected: () => c("div", { children: "Rejected" }),
        onResolved: (t) => {
          var n, s;
          return c("div", {
            style: "flex flex-col gap-4",
            children: [
              c("h1", {
                class: "text-4xl",
                children: `Tv Show Genre: ${
                  (n = t.genre) == null ? void 0 : n.name
                }`,
              }),
              c(ft, {
                collection: (s = t.tvShows) == null ? void 0 : s.results,
              }),
            ],
          });
        },
        [j]: { value: !0, onPending: !0, onRejected: !0, onResolved: !0 },
      });
    }, "s_9bXcVLHHluw")
  ),
  pd = Object.freeze(
    Object.defineProperty(
      { __proto__: null, onGet: hd, default: fd },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  gd = L(
    R(() => {
      const e = Je(In);
      return c(ne, {
        value: e,
        onPending: () => c("div", { children: "Loading..." }),
        onRejected: () => c("div", { children: "Rejected" }),
        onResolved: (t) =>
          c("section", {
            children: [
              c("h2", { children: "PHOTOS" }),
              c("pre", { children: JSON.stringify(t.images, null, 2) }),
            ],
          }),
        [j]: { value: !0, onPending: !0, onRejected: !0, onResolved: !0 },
      });
    }, "s_uH7VzuiyiD0")
  ),
  yd = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: gd },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  vd = L(
    R(() => {
      const e = Je(In);
      return c("section", {
        children: c(ne, {
          value: e,
          onPending: () => c("div", { children: "Loading..." }),
          onRejected: () => c("div", { children: "Rejected" }),
          onResolved: (t) => {
            var n, s;
            return c("div", {
              class:
                "grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-6 px-16 py-4",
              children:
                (s = (n = t.videos) == null ? void 0 : n.results) == null
                  ? void 0
                  : s.map((r) =>
                      c("a", {
                        class: "aspect-video",
                        href: `https://www.youtube.com/watch?v=${r.key}`,
                        target: "_none",
                        children: [
                          c("img", {
                            get alt() {
                              return r.name;
                            },
                            src: `https://movies-proxy.vercel.app/ipx/f_webp,s_400x600/youtube/vi/${r.key}/maxresdefault.jpg`,
                            class: "h-full max-h-full w-full object-cover",
                            width: 400,
                            height: 600,
                            [j]: { alt: O(r, "name") },
                          }),
                          c("div", {
                            class: "mt-2 flex flex-col gap-2",
                            children: [
                              c("span", { children: O(r, "name") }),
                              c("span", {
                                class: "op-60 text-sm",
                                children: O(r, "type"),
                              }),
                            ],
                          }),
                        ],
                      })
                    ),
            });
          },
          [j]: { value: !0, onPending: !0, onRejected: !0, onResolved: !0 },
        }),
      });
    }, "s_yZScDxaFwbM")
  ),
  _d = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: vd },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  se = () => Ac,
  Vn = () => kl,
  Yo = [
    [/^\/$/, [se, () => Ol], void 0, "/", ["q-dd0fa65f.js", "q-8aefda26.js"]],
    [
      /^\/movie\/?$/,
      [se, () => Dl],
      void 0,
      "/movie",
      ["q-dd0fa65f.js", "q-de71c03c.js"],
    ],
    [
      /^\/search\/?$/,
      [se, () => Wl],
      void 0,
      "/search",
      ["q-dd0fa65f.js", "q-76df6c8a.js"],
    ],
    [
      /^\/tv\/?$/,
      [se, () => Ul],
      void 0,
      "/tv",
      ["q-dd0fa65f.js", "q-e8e90483.js"],
    ],
    [
      /^\/movie\/categories\/([^/]+?)\/?$/,
      [se, () => Yl],
      ["name"],
      "/movie/categories/[name]",
      ["q-dd0fa65f.js", "q-aacc0f25.js"],
    ],
    [
      /^\/tv\/categories\/([^/]+?)\/?$/,
      [se, () => ed],
      ["name"],
      "/tv/categories/[name]",
      ["q-dd0fa65f.js", "q-d4f0ade6.js"],
    ],
    [
      /^\/movie\/([^/]+?)\/?$/,
      [se, Vn, () => nd],
      ["movieId"],
      "/movie/[movieId]",
      ["q-dd0fa65f.js", "q-98c59b5e.js", "q-bf4921c5.js"],
    ],
    [
      /^\/person\/([^/]+?)\/?$/,
      [se, () => id],
      ["personId"],
      "/person/[personId]",
      ["q-dd0fa65f.js", "q-478b3963.js"],
    ],
    [
      /^\/tv\/([^/]+?)\/?$/,
      [se, () => ld],
      ["tvId"],
      "/tv/[tvId]",
      ["q-dd0fa65f.js", "q-7fd4597b.js"],
    ],
    [
      /^\/genre\/([^/]+?)\/movie\/?$/,
      [se, () => md],
      ["genreId"],
      "/genre/[genreId]/movie",
      ["q-dd0fa65f.js", "q-10e41c90.js"],
    ],
    [
      /^\/genre\/([^/]+?)\/tv\/?$/,
      [se, () => pd],
      ["genreId"],
      "/genre/[genreId]/tv",
      ["q-dd0fa65f.js", "q-a9070f8a.js"],
    ],
    [
      /^\/movie\/([^/]+?)\/photos\/?$/,
      [se, Vn, () => yd],
      ["movieId"],
      "/movie/[movieId]/photos",
      ["q-dd0fa65f.js", "q-98c59b5e.js", "q-c36e9b8c.js"],
    ],
    [
      /^\/movie\/([^/]+?)\/videos\/?$/,
      [se, Vn, () => _d],
      ["movieId"],
      "/movie/[movieId]/videos",
      ["q-dd0fa65f.js", "q-98c59b5e.js", "q-d7f9fe54.js"],
    ],
  ],
  Jo = [],
  ss = !1,
  Xo = "/",
  ei = !0,
  $d = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        routes: Yo,
        menus: Jo,
        trailingSlash: ss,
        basePathname: Xo,
        cacheModules: ei,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  );
var oe = Symbol("headers"),
  xr,
  bd = class {
    constructor() {
      this[xr] = {};
    }
    [((xr = oe), Symbol.iterator)]() {
      return this.entries();
    }
    *keys() {
      for (const e of Object.keys(this[oe])) yield e;
    }
    *values() {
      for (const e of Object.values(this[oe])) yield e;
    }
    *entries() {
      for (const e of Object.keys(this[oe])) yield [e, this.get(e)];
    }
    get(e) {
      return this[oe][vt(e)] || null;
    }
    set(e, t) {
      const n = vt(e);
      this[oe][n] = typeof t != "string" ? String(t) : t;
    }
    append(e, t) {
      const n = vt(e),
        s = this.has(n) ? `${this.get(n)}, ${t}` : t;
      this.set(e, s);
    }
    delete(e) {
      if (!this.has(e)) return;
      const t = vt(e);
      delete this[oe][t];
    }
    all() {
      return this[oe];
    }
    has(e) {
      return this[oe].hasOwnProperty(vt(e));
    }
    forEach(e, t) {
      for (const n in this[oe])
        this[oe].hasOwnProperty(n) && e.call(t, this[oe][n], n, this);
    }
  },
  wd = /[^a-z0-9\-#$%&'*+.^_`|~]/i;
function vt(e) {
  if ((typeof e != "string" && (e = String(e)), wd.test(e) || e.trim() === ""))
    throw new TypeError("Invalid character in header field name");
  return e.toLowerCase();
}
function En() {
  return new (typeof Headers == "function" ? Headers : bd)();
}
var xt = class extends Error {
  constructor(e, t) {
    super(t), (this.status = e);
  }
};
function xd(e) {
  return ti(e, new xt(404, "Not Found"));
}
function qd(e, t) {
  const s = ni(500, t),
    r = En();
  return (
    r.set("Content-Type", "text/html; charset=utf-8"),
    e.response(
      500,
      r,
      async (o) => {
        o.write(s);
      },
      t
    )
  );
}
function ti(e, t) {
  const n = si(t.status, t.message, t.stack),
    s = En();
  return (
    s.set("Content-Type", "text/html; charset=utf-8"),
    e.response(
      t.status,
      s,
      async (r) => {
        r.write(n);
      },
      t
    )
  );
}
function ni(e, t) {
  let n = "Server Error",
    s;
  return (
    t != null &&
      (typeof t == "object"
        ? (typeof t.message == "string" && (n = t.message),
          t.stack != null && (s = String(t.stack)))
        : (n = String(t))),
    si(e, n, s)
  );
}
function si(e, t, n) {
  const s = typeof t == "string" ? "600px" : "300px",
    r = e >= 500 ? jd : kd;
  return (
    e < 500 && (n = ""),
    `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="Status" content="${e}"/>
  <title>${e} ${t}</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    body { color: ${r}; background-color: #fafafa; padding: 30px; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Roboto, sans-serif; }
    p { max-width: ${s}; margin: 60px auto 30px auto; background: white; border-radius: 4px; box-shadow: 0px 0px 50px -20px ${r}; overflow: hidden; }
    strong { display: inline-block; padding: 15px; background: ${r}; color: white; }
    span { display: inline-block; padding: 15px; }
    pre { max-width: 580px; margin: 0 auto; }
  </style>
</head>
<body>
  <p>
    <strong>${e}</strong>
    <span>${t}</span>
  </p>
  ${n ? `<pre><code>${n}</code></pre>` : ""}
</body>
</html>
`
  );
}
var kd = "#006ce9",
  jd = "#713fc2",
  qr = new WeakMap(),
  Sd = async (e, t, n, s) => {
    if (Array.isArray(e))
      for (const r of e) {
        const o = r[0].exec(s);
        if (o) {
          const i = r[1],
            a = Id(r[2], o),
            l = r[4],
            d = new Array(i.length),
            u = [],
            m = Td(t, s);
          let h;
          return (
            i.forEach((p, g) => {
              kr(p, u, (v) => (d[g] = v), n);
            }),
            kr(m, u, (p) => (h = p == null ? void 0 : p.default), n),
            u.length > 0 && (await Promise.all(u)),
            [a, d, h, l]
          );
        }
      }
    return null;
  },
  kr = (e, t, n, s) => {
    if (typeof e == "function") {
      const r = qr.get(e);
      if (r) n(r);
      else {
        const o = e();
        typeof o.then == "function"
          ? t.push(
              o.then((i) => {
                s !== !1 && qr.set(e, i), n(i);
              })
            )
          : o && n(o);
      }
    }
  },
  Td = (e, t) => {
    if (e) {
      const n = e.find(
        (s) => s[0] === t || t.startsWith(s[0] + (t.endsWith("/") ? "" : "/"))
      );
      if (n) return n[1];
    }
  },
  Id = (e, t) => {
    const n = {};
    if (e) for (let s = 0; s < e.length; s++) n[e[s]] = t ? t[s + 1] : "";
    return n;
  },
  $t = class {
    constructor(e, t, n) {
      (this.url = e),
        (this.location = e),
        (this.status = ri(t) ? t : 302),
        (this.headers = n || En()),
        this.headers.set("Location", this.location),
        this.headers.delete("Cache-Control");
    }
  };
function Ed(e, t) {
  return e.response(t.status, t.headers, async () => {});
}
function ri(e) {
  return typeof e == "number" && e >= 301 && e <= 308;
}
async function Nd(e, t, n, s, r, o = "/") {
  if (n.length === 0) throw new xt(404, "Not Found");
  const { request: i, url: a } = e,
    { pathname: l } = a,
    d = Rd(n),
    u = d && i.headers.get("Accept") === "application/json",
    m = u ? "pagedata" : d ? "pagehtml" : "endpoint",
    h = {
      type: m,
      url: a,
      params: t,
      status: 200,
      headers: En(),
      resolvedBody: void 0,
      pendingBody: void 0,
      aborted: !1,
    };
  let p = !1;
  if (d && l !== o) {
    if (r) {
      if (!l.endsWith("/")) throw new $t(l + "/" + a.search, 302);
    } else if (l.endsWith("/"))
      throw new $t(l.slice(0, l.length - 1) + a.search, 302);
  }
  let g = -1;
  const v = () => {
      g = Sr;
    },
    _ = (y, $) => new $t(y, $, h.headers),
    b = (y, $) => new xt(y, $),
    f = async () => {
      for (g++; g < n.length; ) {
        const y = n[g];
        let $;
        switch (i.method) {
          case "GET": {
            $ = y.onGet;
            break;
          }
          case "POST": {
            $ = y.onPost;
            break;
          }
          case "PUT": {
            $ = y.onPut;
            break;
          }
          case "PATCH": {
            $ = y.onPatch;
            break;
          }
          case "OPTIONS": {
            $ = y.onOptions;
            break;
          }
          case "HEAD": {
            $ = y.onHead;
            break;
          }
          case "DELETE": {
            $ = y.onDelete;
            break;
          }
        }
        if ((($ = $ || y.onRequest), typeof $ == "function")) {
          p = !0;
          const S = {
              get status() {
                return h.status;
              },
              set status(M) {
                h.status = M;
              },
              get headers() {
                return h.headers;
              },
              redirect: _,
              error: b,
            },
            I = {
              request: i,
              url: new URL(a),
              params: { ...t },
              response: S,
              platform: s,
              next: f,
              abort: v,
            },
            q = $(I);
          if (typeof q == "function") h.pendingBody = jr(q);
          else if (
            q !== null &&
            typeof q == "object" &&
            typeof q.then == "function"
          ) {
            const M = await q;
            typeof M == "function"
              ? (h.pendingBody = jr(M))
              : (h.resolvedBody = M);
          } else h.resolvedBody = q;
        }
        g++;
      }
    };
  if (
    (await f(),
    (h.aborted = g >= Sr),
    !u && ri(h.status) && h.headers.has("Location"))
  )
    throw new $t(h.headers.get("Location"), h.status, h.headers);
  if (m === "endpoint" && !p) throw new xt(405, "Method Not Allowed");
  return h;
}
function jr(e) {
  return new Promise((t, n) => {
    try {
      const s = e();
      s !== null && typeof s == "object" && typeof s.then == "function"
        ? s.then(t, n)
        : t(s);
    } catch (s) {
      n(s);
    }
  });
}
function Rd(e) {
  const t = e[e.length - 1];
  return t && typeof t.default == "function";
}
function Ad(e, t) {
  let n = e.url.pathname;
  if (n.endsWith(oi)) {
    e.request.headers.set("Accept", "application/json");
    const s = n.length - Pd + (t ? 1 : 0);
    (n = n.slice(0, s)), n === "" && (n = "/"), (e.url.pathname = n);
  }
}
var oi = "/q-data.json",
  Pd = oi.length,
  Sr = 999999999;
function Md(e, t) {
  const { pendingBody: n, resolvedBody: s, status: r, headers: o } = t,
    { response: i } = e;
  if (n === void 0 && s === void 0) return i(r, o, Od);
  o.has("Content-Type") ||
    o.set("Content-Type", "application/json; charset=utf-8");
  const a = o.get("Content-Type").includes("json");
  return i(r, o, async ({ write: l }) => {
    const d = n !== void 0 ? await n : s;
    if (d !== void 0)
      if (a) l(JSON.stringify(d));
      else {
        const u = typeof d;
        l(
          u === "string" ? d : u === "number" || u === "boolean" ? String(d) : d
        );
      }
  });
}
var Od = async () => {};
function Cd(e, t, n, s, r) {
  const { status: o, headers: i } = t,
    { response: a } = e,
    l = t.type === "pagedata";
  return (
    l
      ? i.set("Content-Type", "application/json; charset=utf-8")
      : i.has("Content-Type") ||
        i.set("Content-Type", "text/html; charset=utf-8"),
    a(l ? 200 : o, i, async (d) => {
      try {
        const u = await n({ stream: l ? Dd : d, envData: zd(t), ...s });
        l
          ? d.write(JSON.stringify(await Tr(t, u, r)))
          : (typeof u).html === "string" && d.write(u.html),
          typeof d.clientData == "function" && d.clientData(await Tr(t, u, r));
      } catch (u) {
        const m = ni(500, u);
        d.write(m);
      }
    })
  );
}
async function Tr(e, t, n) {
  const s = Ld(t, n);
  return {
    body: e.pendingBody ? await e.pendingBody : e.resolvedBody,
    status: e.status !== 200 ? e.status : void 0,
    redirect:
      (e.status >= 301 && e.status <= 308 && e.headers.get("location")) ||
      void 0,
    prefetch: s.length > 0 ? s : void 0,
  };
}
function Ld(e, t) {
  const n = [],
    s = (a) => {
      a && !n.includes(a) && n.push(a);
    },
    r = (a) => {
      if (Array.isArray(a))
        for (const l of a) {
          const d = l.url.split("/").pop();
          d && !n.includes(d) && (s(d), r(l.imports));
        }
    };
  r(e.prefetchResources);
  const o = e.manifest || e._manifest,
    i = e._symbols;
  if (o && i)
    for (const a of i) {
      const l = o.symbols[a];
      l && l.ctxName === "component$" && s(o.mapping[a]);
    }
  if (t) for (const a of t) s(a);
  return n;
}
function zd(e) {
  const { url: t, params: n, pendingBody: s, resolvedBody: r, status: o } = e;
  return {
    url: t.href,
    qwikcity: { params: { ...n }, response: { body: s || r, status: o } },
  };
}
var Dd = { write: () => {} };
async function Hd(e, t, n, s) {
  try {
    Ad(e, ss);
    const r = await Sd(Yo, Jo, ei, e.url.pathname);
    if (r) {
      const [o, i, a, l] = r,
        d = await Nd(e, o, i, n, ss, Xo);
      return d.aborted
        ? null
        : d.type === "endpoint"
        ? await Md(e, d)
        : await Cd(e, d, t, s, l);
    }
  } catch (r) {
    return r instanceof $t ? Ed(e, r) : r instanceof xt ? ti(e, r) : qd(e, r);
  }
  return null;
}
function Vd(e, t) {
  async function n(s, r) {
    try {
      const o = {
          url: new URL(s.url),
          request: s,
          response: (d, u, m) =>
            new Promise((h) => {
              let p = !1;
              const { readable: g, writable: v } = new TransformStream(),
                _ = v.getWriter(),
                b = new Response(g, { status: d, headers: u });
              m({
                write: (f) => {
                  if ((p || ((p = !0), h(b)), typeof f == "string")) {
                    const y = new TextEncoder();
                    _.write(y.encode(f));
                  } else _.write(f);
                },
              }).finally(() => {
                p || ((p = !0), h(b)), _.close();
              });
            }),
        },
        i = await r.next();
      if (i.ok) return i;
      const a = await Hd(o, e, r, t);
      return a || (await xd(o));
    } catch (o) {
      return new Response(String(o || "Error"), {
        status: 500,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }
  }
  return n;
}
/**
 * @license
 * @builder.io/qwik/server 0.11.1
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */ if (typeof global > "u") {
  const e =
    typeof globalThis < "u"
      ? globalThis
      : typeof window < "u"
      ? window
      : typeof self < "u"
      ? self
      : {};
  e.global = e;
}
var Zd = ((e) =>
  typeof require < "u"
    ? require
    : typeof Proxy < "u"
    ? new Proxy(e, { get: (t, n) => (typeof require < "u" ? require : t)[n] })
    : e)(function (e) {
  if (typeof require < "u") return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + e + '" is not supported');
});
function Zn() {
  if (typeof performance > "u") return () => 0;
  const e = performance.now();
  return () => (performance.now() - e) / 1e6;
}
function ii(e) {
  let t = e.base;
  return typeof t == "string" ? (t.endsWith("/") || (t += "/"), t) : "/build/";
}
function Wd(e, t) {
  const n = t == null ? void 0 : t.mapper,
    s = e.symbolMapper
      ? e.symbolMapper
      : (o) => {
          if (n) {
            const i = ai(o),
              a = n[i];
            return a || console.error("Cannot resolve symbol", o, "in", n), a;
          }
        };
  return {
    isServer: !0,
    async importSymbol(o, i, a) {
      let l = String(i);
      l.endsWith(".js") || (l += ".js");
      const d = Zd(l);
      if (!(a in d))
        throw new Error(`Q-ERROR: missing symbol '${a}' in module '${l}'.`);
      return d[a];
    },
    raf: () => (console.error("server can not rerender"), Promise.resolve()),
    nextTick: (o) =>
      new Promise((i) => {
        setTimeout(() => {
          i(o());
        });
      }),
    chunkForSymbol(o) {
      return s(o, n);
    },
  };
}
async function Bd(e, t) {
  const n = Wd(e, t);
  ui(n);
}
var ai = (e) => {
    const t = e.lastIndexOf("_");
    return t > -1 ? e.slice(t + 1) : e;
  },
  Fd =
    '((e,t)=>{const n="__q_context__",o=window,r=new Set,i=t=>e.querySelectorAll(t),s=(e,t,n=t.type)=>{i("[on"+e+"\\\\:"+n+"]").forEach((o=>l(o,e,t,n)))},a=(e,t)=>new CustomEvent(e,{detail:t}),c=(t,n)=>(t=t.closest("[q\\\\:container]"),new URL(n,new URL(t.getAttribute("q:base"),e.baseURI))),l=async(t,o,r,i=r.type)=>{const s="on"+o+":"+i;t.hasAttribute("preventdefault:"+i)&&r.preventDefault();const a=t._qc_,l=null==a?void 0:a.li.filter((e=>e[0]===s));if(l&&l.length>0){for(const e of l)await e[1].getFn([t,r],(()=>t.isConnected))(r,t);return}const d=t.getAttribute(s);if(d)for(const o of d.split("\\n")){const i=c(t,o),s=b(i),a=performance.now(),l=u(await import(i.href.split("#")[0]),s),d=e[n];if(t.isConnected)try{e[n]=[t,r,i],f("qsymbol",{symbol:s,element:t,reqTime:a}),await l(r,t)}finally{e[n]=d}}},f=(t,n)=>{e.dispatchEvent(a(t,n))},u=(e,t)=>{if(t in e)return e[t];for(const n of Object.values(e))if("object"==typeof n&&n&&t in n)return n[t]},b=e=>e.hash.replace(/^#?([^?[|]*).*$/,"$1")||"default",d=e=>e.replace(/([A-Z])/g,(e=>"-"+e.toLowerCase())),p=async e=>{let t=d(e.type),n=e.target;for(s("-document",e,t);n&&n.getAttribute;)await l(n,"",e,t),n=e.bubbles&&!0!==e.cancelBubble?n.parentElement:null},v=e=>{s("-window",e,d(e.type))},w=()=>{var n;const s=e.readyState;if(!t&&("interactive"==s||"complete"==s)&&(t=1,f("qinit"),(null!=(n=o.requestIdleCallback)?n:o.setTimeout).bind(o)((()=>f("qidle"))),r.has("qvisible"))){const e=i("[on\\\\:qvisible]"),t=new IntersectionObserver((e=>{for(const n of e)n.isIntersecting&&(t.unobserve(n.target),l(n.target,"",a("qvisible",n)))}));e.forEach((e=>t.observe(e)))}},q=(e,t,n,o=!1)=>e.addEventListener(t,n,{capture:o}),y=t=>{for(const n of t)r.has(n)||(q(e,n,p,!0),q(o,n,v),r.add(n))};if(!e.qR){const t=o.qwikevents;Array.isArray(t)&&y(t),o.qwikevents={push:(...e)=>y(e)},q(e,"readystatechange",w),w()}})(document);',
  Qd = `(() => {
    ((doc, hasInitialized) => {
        const win = window;
        const events =  new Set;
        const querySelectorAll = query => doc.querySelectorAll(query);
        const broadcast = (infix, ev, type = ev.type) => {
            querySelectorAll("[on" + infix + "\\\\:" + type + "]").forEach((target => dispatch(target, infix, ev, type)));
        };
        const createEvent = (eventName, detail) => new CustomEvent(eventName, {
            detail: detail
        });
        const qrlResolver = (element, qrl) => {
            element = element.closest("[q\\\\:container]");
            return new URL(qrl, new URL(element.getAttribute("q:base"), doc.baseURI));
        };
        const dispatch = async (element, onPrefix, ev, eventName = ev.type) => {
            const attrName = "on" + onPrefix + ":" + eventName;
            element.hasAttribute("preventdefault:" + eventName) && ev.preventDefault();
            const ctx = element._qc_;
            const qrls = null == ctx ? void 0 : ctx.li.filter((li => li[0] === attrName));
            if (qrls && qrls.length > 0) {
                for (const q of qrls) {
                    await q[1].getFn([ element, ev ], (() => element.isConnected))(ev, element);
                }
                return;
            }
            const attrValue = element.getAttribute(attrName);
            if (attrValue) {
                for (const qrl of attrValue.split("\\n")) {
                    const url = qrlResolver(element, qrl);
                    const symbolName = getSymbolName(url);
                    const reqTime = performance.now();
                    const handler = findSymbol(await import(url.href.split("#")[0]), symbolName);
                    const previousCtx = doc.__q_context__;
                    if (element.isConnected) {
                        try {
                            doc.__q_context__ = [ element, ev, url ];
                            emitEvent("qsymbol", {
                                symbol: symbolName,
                                element: element,
                                reqTime: reqTime
                            });
                            await handler(ev, element);
                        } finally {
                            doc.__q_context__ = previousCtx;
                        }
                    }
                }
            }
        };
        const emitEvent = (eventName, detail) => {
            doc.dispatchEvent(createEvent(eventName, detail));
        };
        const findSymbol = (module, symbol) => {
            if (symbol in module) {
                return module[symbol];
            }
            for (const v of Object.values(module)) {
                if ("object" == typeof v && v && symbol in v) {
                    return v[symbol];
                }
            }
        };
        const getSymbolName = url => url.hash.replace(/^#?([^?[|]*).*$/, "$1") || "default";
        const camelToKebab = str => str.replace(/([A-Z])/g, (a => "-" + a.toLowerCase()));
        const processDocumentEvent = async ev => {
            let type = camelToKebab(ev.type);
            let element = ev.target;
            broadcast("-document", ev, type);
            while (element && element.getAttribute) {
                await dispatch(element, "", ev, type);
                element = ev.bubbles && !0 !== ev.cancelBubble ? element.parentElement : null;
            }
        };
        const processWindowEvent = ev => {
            broadcast("-window", ev, camelToKebab(ev.type));
        };
        const processReadyStateChange = () => {
            var _a;
            const readyState = doc.readyState;
            if (!hasInitialized && ("interactive" == readyState || "complete" == readyState)) {
                hasInitialized = 1;
                emitEvent("qinit");
                (null != (_a = win.requestIdleCallback) ? _a : win.setTimeout).bind(win)((() => emitEvent("qidle")));
                if (events.has("qvisible")) {
                    const results = querySelectorAll("[on\\\\:qvisible]");
                    const observer = new IntersectionObserver((entries => {
                        for (const entry of entries) {
                            if (entry.isIntersecting) {
                                observer.unobserve(entry.target);
                                dispatch(entry.target, "", createEvent("qvisible", entry));
                            }
                        }
                    }));
                    results.forEach((el => observer.observe(el)));
                }
            }
        };
        const addEventListener = (el, eventName, handler, capture = !1) => el.addEventListener(eventName, handler, {
            capture: capture
        });
        const push = eventNames => {
            for (const eventName of eventNames) {
                if (!events.has(eventName)) {
                    addEventListener(doc, eventName, processDocumentEvent, !0);
                    addEventListener(win, eventName, processWindowEvent);
                    events.add(eventName);
                }
            }
        };
        if (!doc.qR) {
            const qwikevents = win.qwikevents;
            Array.isArray(qwikevents) && push(qwikevents);
            win.qwikevents = {
                push: (...e) => push(e)
            };
            addEventListener(doc, "readystatechange", processReadyStateChange);
            processReadyStateChange();
        }
    })(document);
})();`,
  Ud =
    '((e,t)=>{const n="__q_context__",o=window,r=new Set,i=t=>e.querySelectorAll(t),s=(e,t,n=t.type)=>{i("[on"+e+"\\\\:"+n+"]").forEach((o=>l(o,e,t,n)))},a=(e,t)=>new CustomEvent(e,{detail:t}),c=(t,n)=>(t=t.closest("[q\\\\:container]"),new URL(n,new URL(t.getAttribute("q:base"),e.baseURI))),l=async(t,o,r,i=r.type)=>{const s="on"+o+":"+i;t.hasAttribute("preventdefault:"+i)&&r.preventDefault();const a=t._qc_,l=null==a?void 0:a.li.filter((e=>e[0]===s));if(l&&l.length>0){for(const e of l)await e[1].getFn([t,r],(()=>t.isConnected))(r,t);return}const d=t.getAttribute(s);if(d)for(const o of d.split("\\n")){const i=c(t,o),s=b(i),a=performance.now(),l=u(await import(i.href.split("#")[0]),s),d=e[n];if(t.isConnected)try{e[n]=[t,r,i],f("qsymbol",{symbol:s,element:t,reqTime:a}),await l(r,t)}finally{e[n]=d}}},f=(t,n)=>{e.dispatchEvent(a(t,n))},u=(e,t)=>{if(t in e)return e[t];for(const n of Object.values(e))if("object"==typeof n&&n&&t in n)return n[t]},b=e=>e.hash.replace(/^#?([^?[|]*).*$/,"$1")||"default",d=e=>e.replace(/([A-Z])/g,(e=>"-"+e.toLowerCase())),p=async e=>{let t=d(e.type),n=e.target;for(s("-document",e,t);n&&n.getAttribute;)await l(n,"",e,t),n=e.bubbles&&!0!==e.cancelBubble?n.parentElement:null},v=e=>{s("-window",e,d(e.type))},w=()=>{var n;const s=e.readyState;if(!t&&("interactive"==s||"complete"==s)&&(t=1,f("qinit"),(null!=(n=o.requestIdleCallback)?n:o.setTimeout).bind(o)((()=>f("qidle"))),r.has("qvisible"))){const e=i("[on\\\\:qvisible]"),t=new IntersectionObserver((e=>{for(const n of e)n.isIntersecting&&(t.unobserve(n.target),l(n.target,"",a("qvisible",n)))}));e.forEach((e=>t.observe(e)))}},q=(e,t,n,o=!1)=>e.addEventListener(t,n,{capture:o}),y=t=>{for(const n of t)r.has(n)||(q(e,n,p,!0),q(o,n,v),r.add(n))};if(!e.qR){const t=o.qwikevents;Array.isArray(t)&&y(t),o.qwikevents={push:(...e)=>y(e)},q(e,"readystatechange",w),w()}})(document);',
  Kd = `(() => {
    ((doc, hasInitialized) => {
        const win = window;
        const events = new Set;
        const querySelectorAll = query => doc.querySelectorAll(query);
        const broadcast = (infix, ev, type = ev.type) => {
            querySelectorAll("[on" + infix + "\\\\:" + type + "]").forEach((target => dispatch(target, infix, ev, type)));
        };
        const createEvent = (eventName, detail) => new CustomEvent(eventName, {
            detail: detail
        });
        const qrlResolver = (element, qrl) => {
            element = element.closest("[q\\\\:container]");
            return new URL(qrl, new URL(element.getAttribute("q:base"), doc.baseURI));
        };
        const dispatch = async (element, onPrefix, ev, eventName = ev.type) => {
            const attrName = "on" + onPrefix + ":" + eventName;
            element.hasAttribute("preventdefault:" + eventName) && ev.preventDefault();
            const ctx = element._qc_;
            const qrls = null == ctx ? void 0 : ctx.li.filter((li => li[0] === attrName));
            if (qrls && qrls.length > 0) {
                for (const q of qrls) {
                    await q[1].getFn([ element, ev ], (() => element.isConnected))(ev, element);
                }
                return;
            }
            const attrValue = element.getAttribute(attrName);
            if (attrValue) {
                for (const qrl of attrValue.split("\\n")) {
                    const url = qrlResolver(element, qrl);
                    const symbolName = getSymbolName(url);
                    const reqTime = performance.now();
                    const handler = findSymbol(await import(url.href.split("#")[0]), symbolName);
                    const previousCtx = doc.__q_context__;
                    if (element.isConnected) {
                        try {
                            doc.__q_context__ = [ element, ev, url ];
                            emitEvent("qsymbol", {
                                symbol: symbolName,
                                element: element,
                                reqTime: reqTime
                            });
                            await handler(ev, element);
                        } finally {
                            doc.__q_context__ = previousCtx;
                        }
                    }
                }
            }
        };
        const emitEvent = (eventName, detail) => {
            doc.dispatchEvent(createEvent(eventName, detail));
        };
        const findSymbol = (module, symbol) => {
            if (symbol in module) {
                return module[symbol];
            }
            for (const v of Object.values(module)) {
                if ("object" == typeof v && v && symbol in v) {
                    return v[symbol];
                }
            }
        };
        const getSymbolName = url => url.hash.replace(/^#?([^?[|]*).*$/, "$1") || "default";
        const camelToKebab = str => str.replace(/([A-Z])/g, (a => "-" + a.toLowerCase()));
        const processDocumentEvent = async ev => {
            let type = camelToKebab(ev.type);
            let element = ev.target;
            broadcast("-document", ev, type);
            while (element && element.getAttribute) {
                await dispatch(element, "", ev, type);
                element = ev.bubbles && !0 !== ev.cancelBubble ? element.parentElement : null;
            }
        };
        const processWindowEvent = ev => {
            broadcast("-window", ev, camelToKebab(ev.type));
        };
        const processReadyStateChange = () => {
            var _a;
            const readyState = doc.readyState;
            if (!hasInitialized && ("interactive" == readyState || "complete" == readyState)) {
                hasInitialized = 1;
                emitEvent("qinit");
                (null != (_a = win.requestIdleCallback) ? _a : win.setTimeout).bind(win)((() => emitEvent("qidle")));
                if (events.has("qvisible")) {
                    const results = querySelectorAll("[on\\\\:qvisible]");
                    const observer = new IntersectionObserver((entries => {
                        for (const entry of entries) {
                            if (entry.isIntersecting) {
                                observer.unobserve(entry.target);
                                dispatch(entry.target, "", createEvent("qvisible", entry));
                            }
                        }
                    }));
                    results.forEach((el => observer.observe(el)));
                }
            }
        };
        const addEventListener = (el, eventName, handler, capture = !1) => el.addEventListener(eventName, handler, {
            capture: capture
        });
        const push = eventNames => {
            for (const eventName of eventNames) {
                if (!events.has(eventName)) {
                    addEventListener(doc, eventName, processDocumentEvent, !0);
                    addEventListener(win, eventName, processWindowEvent);
                    events.add(eventName);
                }
            }
        };
        if (!doc.qR) {
            const qwikevents = win.qwikevents;
            Array.isArray(qwikevents) && push(qwikevents);
            win.qwikevents = {
                push: (...e) => push(e)
            };
            addEventListener(doc, "readystatechange", processReadyStateChange);
            processReadyStateChange();
        }
    })(document);
})();`;
function Gd(e = {}) {
  return Array.isArray(e.events) && e.events.length > 0
    ? (e.debug ? Kd : Ud).replace("window.qEvents", JSON.stringify(e.events))
    : e.debug
    ? Qd
    : Fd;
}
function Yd(e, t, n) {
  if (!n) return [];
  const s = t.prefetchStrategy,
    r = ii(t);
  if (s !== null) {
    if (!s || !s.symbolsToPrefetch || s.symbolsToPrefetch === "auto")
      return Jd(e, n, r);
    if (typeof s.symbolsToPrefetch == "function")
      try {
        return s.symbolsToPrefetch({ manifest: n.manifest });
      } catch (o) {
        console.error("getPrefetchUrls, symbolsToPrefetch()", o);
      }
  }
  return [];
}
function Jd(e, t, n) {
  const s = [],
    r = e == null ? void 0 : e.listeners,
    o = e == null ? void 0 : e.objs,
    { mapper: i, manifest: a } = t,
    l = new Set();
  if (Array.isArray(r))
    for (const d in i)
      r.some((m) => m.qrl.getHash() === d) && rs(a, l, s, n, i[d][1]);
  if (Array.isArray(o)) {
    for (const d of o)
      if (Xd(d)) {
        const u = d.getHash(),
          m = i[u];
        m && rs(a, l, s, n, m[0]);
      }
  }
  return s;
}
function rs(e, t, n, s, r) {
  const o = s + r;
  if (!t.has(o)) {
    t.add(o);
    const i = e.bundles[r];
    if (i) {
      const a = { url: o, imports: [] };
      if ((n.push(a), Array.isArray(i.imports)))
        for (const l of i.imports) rs(e, t, a.imports, s, l);
    }
  }
}
var Xd = (e) => typeof e == "function" && typeof e.getSymbol == "function",
  ci = globalThis.qDev === !0,
  eu = [],
  li = {};
ci && (Object.freeze(eu), Object.freeze(li), (Error.stackTraceLimit = 9999));
[
  "click",
  "dblclick",
  "contextmenu",
  "auxclick",
  "pointerdown",
  "pointerup",
  "pointermove",
  "pointerover",
  "pointerenter",
  "pointerleave",
  "pointerout",
  "pointercancel",
  "gotpointercapture",
  "lostpointercapture",
  "touchstart",
  "touchend",
  "touchmove",
  "touchcancel",
  "mousedown",
  "mouseup",
  "mousemove",
  "mouseenter",
  "mouseleave",
  "mouseover",
  "mouseout",
  "wheel",
  "gesturestart",
  "gesturechange",
  "gestureend",
  "keydown",
  "keyup",
  "keypress",
  "input",
  "change",
  "search",
  "invalid",
  "beforeinput",
  "select",
  "focusin",
  "focusout",
  "focus",
  "blur",
  "submit",
  "reset",
  "scroll",
].map((e) => `on${e.toLowerCase()}$`);
[
  "useWatch$",
  "useClientEffect$",
  "useEffect$",
  "component$",
  "useStyles$",
  "useStylesScoped$",
].map((e) => e.toLowerCase());
function tu(e) {
  if (
    e != null &&
    e.mapping != null &&
    typeof e.mapping == "object" &&
    e.symbols != null &&
    typeof e.symbols == "object" &&
    e.bundles != null &&
    typeof e.bundles == "object"
  )
    return e;
}
function os() {
  let r = `const w=new Worker(URL.createObjectURL(new Blob(['onmessage=(e)=>{Promise.all(e.data.map(u=>fetch(u))).finally(()=>{setTimeout(postMessage({}),9999)})}'],{type:"text/javascript"})));`;
  return (
    (r += "w.postMessage(u.map(u=>new URL(u,origin)+''));"),
    (r += "w.onmessage=()=>{w.terminate()};"),
    r
  );
}
function nu(e) {
  const t = { bundles: Nn(e).map((n) => n.split("/").pop()) };
  return `document.dispatchEvent(new CustomEvent("qprefetch",{detail:${JSON.stringify(
    t
  )}}))`;
}
function Nn(e) {
  const t = [],
    n = (s) => {
      if (Array.isArray(s))
        for (const r of s) t.includes(r.url) || (t.push(r.url), n(r.imports));
    };
  return n(e), t;
}
function su(e, t) {
  const n = cu(e == null ? void 0 : e.implementation),
    s = [];
  return (
    n.prefetchEvent === "always" && ru(s, t),
    n.linkInsert === "html-append" && ou(s, t, n),
    n.linkInsert === "js-append"
      ? iu(s, t, n)
      : n.workerFetchInsert === "always" && au(s, t),
    s.length > 0 ? c(W, { children: s }) : null
  );
}
function ru(e, t) {
  e.push(c("script", { type: "module", dangerouslySetInnerHTML: nu(t) }));
}
function ou(e, t, n) {
  const s = Nn(t),
    r = n.linkRel || "prefetch";
  for (const o of s) {
    const i = {};
    (i.href = o),
      (i.rel = r),
      (r === "prefetch" || r === "preload") &&
        o.endsWith(".js") &&
        (i.as = "script"),
      e.push(c("link", i, void 0));
  }
}
function iu(e, t, n) {
  const s = n.linkRel || "prefetch";
  let r = "";
  n.workerFetchInsert === "no-link-support" &&
    (r += "let supportsLinkRel = true;"),
    (r += `const u=${JSON.stringify(Nn(t))};`),
    (r += "u.map((u,i)=>{"),
    (r += "const l=document.createElement('link');"),
    (r += 'l.setAttribute("href",u);'),
    (r += `l.setAttribute("rel","${s}");`),
    n.workerFetchInsert === "no-link-support" &&
      ((r += "if(i===0){"),
      (r += "try{"),
      (r += `supportsLinkRel=l.relList.supports("${s}");`),
      (r += "}catch(e){}"),
      (r += "}")),
    (r += "document.body.appendChild(l);"),
    (r += "});"),
    n.workerFetchInsert === "no-link-support" &&
      ((r += "if(!supportsLinkRel){"), (r += os()), (r += "}")),
    n.workerFetchInsert === "always" && (r += os()),
    e.push(c("script", { type: "module", dangerouslySetInnerHTML: r }));
}
function au(e, t) {
  let n = `const u=${JSON.stringify(Nn(t))};`;
  (n += os()),
    e.push(c("script", { type: "module", dangerouslySetInnerHTML: n }));
}
function cu(e) {
  if (typeof e == "string") {
    switch (e) {
      case "link-prefetch-html":
        return (
          Ve(e, "linkInsert"),
          {
            linkInsert: "html-append",
            linkRel: "prefetch",
            workerFetchInsert: null,
            prefetchEvent: null,
          }
        );
      case "link-prefetch":
        return (
          Ve(e, "linkInsert"),
          {
            linkInsert: "js-append",
            linkRel: "prefetch",
            workerFetchInsert: "no-link-support",
            prefetchEvent: null,
          }
        );
      case "link-preload-html":
        return (
          Ve(e, "linkInsert"),
          {
            linkInsert: "html-append",
            linkRel: "preload",
            workerFetchInsert: null,
            prefetchEvent: null,
          }
        );
      case "link-preload":
        return (
          Ve(e, "linkInsert"),
          {
            linkInsert: "js-append",
            linkRel: "preload",
            workerFetchInsert: "no-link-support",
            prefetchEvent: null,
          }
        );
      case "link-modulepreload-html":
        return (
          Ve(e, "linkInsert"),
          {
            linkInsert: "html-append",
            linkRel: "modulepreload",
            workerFetchInsert: null,
            prefetchEvent: null,
          }
        );
      case "link-modulepreload":
        return (
          Ve(e, "linkInsert"),
          {
            linkInsert: "js-append",
            linkRel: "modulepreload",
            workerFetchInsert: "no-link-support",
            prefetchEvent: null,
          }
        );
    }
    return (
      Ve(e, "workerFetchInsert"),
      {
        linkInsert: null,
        linkRel: null,
        workerFetchInsert: "always",
        prefetchEvent: null,
      }
    );
  }
  return e && typeof e == "object" ? e : lu;
}
var lu = {
  linkInsert: null,
  linkRel: null,
  workerFetchInsert: null,
  prefetchEvent: "always",
};
function Ve(e, t) {
  console.warn(
    `The Prefetch Strategy Implementation "${e}" has been deprecated and will be removed in an upcoming release. Please update to use the "prefetchStrategy.implementation.${t}" interface.`
  );
}
var du = "<!DOCTYPE html>";
async function uu(e, t) {
  var V, Z, ee, ce, F, pe;
  let n = t.stream,
    s = 0,
    r = 0,
    o = 0,
    i = 0;
  const a =
      (Z = (V = t.streaming) == null ? void 0 : V.inOrder) != null
        ? Z
        : { strategy: "auto", maximunInitialChunk: 5e4, maximunChunk: 3e4 },
    l = (ee = t.containerTagName) != null ? ee : "html",
    d = (ce = t.containerAttributes) != null ? ce : {};
  let u = "";
  const m = n,
    h = Zn();
  function p() {
    u && (m.write(u), (u = ""), (s = 0), o++, o === 1 && (i = h()));
  }
  function g(G) {
    (s += G.length), (r += G.length), (u += G);
  }
  switch (a.strategy) {
    case "disabled":
      n = { write: g };
      break;
    case "direct":
      n = m;
      break;
    case "auto":
      let G = 0,
        re = !1;
      const Rn = (F = a.maximunChunk) != null ? F : 0,
        An = (pe = a.maximunInitialChunk) != null ? pe : 0;
      n = {
        write(je) {
          je === "<!--qkssr-f-->"
            ? re || (re = !0)
            : je === "<!--qkssr-pu-->"
            ? G++
            : je === "<!--qkssr-po-->"
            ? G--
            : g(je),
            G === 0 && (re || s >= (o === 0 ? An : Rn)) && ((re = !1), p());
        },
      };
      break;
  }
  l === "html"
    ? n.write(du)
    : t.qwikLoader
    ? (t.qwikLoader.include === void 0 && (t.qwikLoader.include = "never"),
      t.qwikLoader.position === void 0 && (t.qwikLoader.position = "bottom"))
    : (t.qwikLoader = { include: "never" }),
    t.manifest ||
      console.warn(
        "Missing client manifest, loading symbols in the client might 404"
      );
  const v = ii(t),
    _ = mu(t.manifest);
  await Bd(t, _);
  let b = null;
  const f = _ == null ? void 0 : _.manifest.injections,
    y = f
      ? f.map((G) => {
          var re;
          return c(G.tag, (re = G.attributes) != null ? re : li);
        })
      : void 0,
    $ = Zn(),
    S = [];
  let I = 0,
    q = 0;
  return (
    await Xa(e, {
      stream: n,
      containerTagName: l,
      containerAttributes: d,
      envData: t.envData,
      base: v,
      beforeContent: y,
      beforeClose: async (G, re) => {
        var Ds, Hs, Vs;
        I = $();
        const Rn = Zn();
        b = await co(G, re);
        const An = JSON.stringify(b.state, void 0, ci ? "  " : void 0),
          je = [
            c("script", { type: "qwik/json", dangerouslySetInnerHTML: hu(An) }),
          ];
        if (t.prefetchStrategy !== null) {
          const ge = Yd(b, t, _);
          if (ge.length > 0) {
            const Zs = su(t.prefetchStrategy, ge);
            Zs && je.push(Zs);
          }
        }
        const Os = !b || b.mode !== "static",
          Cs =
            (Hs = (Ds = t.qwikLoader) == null ? void 0 : Ds.include) != null
              ? Hs
              : "auto",
          Ls = Cs === "always" || (Cs === "auto" && Os);
        if (Ls) {
          const ge = Gd({
            events: (Vs = t.qwikLoader) == null ? void 0 : Vs.events,
            debug: t.debug,
          });
          je.push(
            c("script", { id: "qwikloader", dangerouslySetInnerHTML: ge })
          );
        }
        const zs = Array.from(re.$events$, (ge) => JSON.stringify(ge));
        if (zs.length > 0) {
          let ge = `window.qwikevents.push(${zs.join(", ")})`;
          Ls || (ge = `window.qwikevents||=[];${ge}`),
            je.push(c("script", { dangerouslySetInnerHTML: ge }));
        }
        return fu(S, G), (q = Rn()), c(W, { children: je });
      },
    }),
    p(),
    {
      prefetchResources: void 0,
      snapshotResult: b,
      flushes: o,
      manifest: _ == null ? void 0 : _.manifest,
      size: r,
      timing: { render: I, snapshot: q, firstFlush: i },
      _symbols: S,
    }
  );
}
function mu(e) {
  if (!!e) {
    if ("mapper" in e) return e;
    if (((e = tu(e)), e)) {
      const t = {};
      return (
        Object.entries(e.mapping).forEach(([n, s]) => {
          t[ai(n)] = [n, s];
        }),
        { mapper: t, manifest: e }
      );
    }
  }
}
var hu = (e) => e.replace(/<(\/?script)/g, "\\x3C$1");
function fu(e, t) {
  var n;
  for (const s of t) {
    const r = (n = s.$componentQrl$) == null ? void 0 : n.getSymbol();
    r && !e.includes(r) && e.push(r);
  }
}
const pu = {
    symbols: {
      s_hA9UPaY8sNQ: {
        origin: "../node_modules/@builder.io/qwik-city/index.qwik.mjs",
        displayName: "Link_component_a_onClick",
        canonicalFilename: "s_ha9upay8snq",
        hash: "hA9UPaY8sNQ",
        ctxKind: "event",
        ctxName: "onClick$",
        captures: !0,
        parent: "s_mYsiJcA4IBc",
      },
      s_skxgNVWVOT8: {
        origin: "../node_modules/@builder.io/qwik-city/index.qwik.mjs",
        displayName: "Link_component_a_onMouseOver",
        canonicalFilename: "s_skxgnvwvot8",
        hash: "skxgNVWVOT8",
        ctxKind: "event",
        ctxName: "onMouseOver$",
        captures: !1,
        parent: "s_mYsiJcA4IBc",
      },
      s_uVE5iM9H73c: {
        origin: "../node_modules/@builder.io/qwik-city/index.qwik.mjs",
        displayName: "Link_component_a_onQVisible",
        canonicalFilename: "s_uve5im9h73c",
        hash: "uVE5iM9H73c",
        ctxKind: "event",
        ctxName: "onQVisible$",
        captures: !1,
        parent: "s_mYsiJcA4IBc",
      },
      s_AaAlzKH0KlQ: {
        origin: "../node_modules/@builder.io/qwik-city/index.qwik.mjs",
        displayName: "QwikCity_component_useWatch",
        canonicalFilename: "s_aaalzkh0klq",
        hash: "AaAlzKH0KlQ",
        ctxKind: "function",
        ctxName: "useWatch$",
        captures: !0,
        parent: "s_z1nvHyEppoI",
      },
      s_0onGgcuyr54: {
        origin: "modules/Carousel/Carousel.tsx",
        displayName: "Carousel_component",
        canonicalFilename: "s_0onggcuyr54",
        hash: "0onGgcuyr54",
        ctxKind: "function",
        ctxName: "component$",
        captures: !1,
      },
      s_2ExQvNmMHs8: {
        origin: "routes/index.tsx",
        displayName: "routes_component",
        canonicalFilename: "s_2exqvnmmhs8",
        hash: "2ExQvNmMHs8",
        ctxKind: "function",
        ctxName: "component$",
        captures: !1,
      },
      s_5Y7C0IpQhOg: {
        origin: "modules/ExternalLinks/ExternalLinks.tsx",
        displayName: "ExternalLinks_component",
        canonicalFilename: "s_5y7c0ipqhog",
        hash: "5Y7C0IpQhOg",
        ctxKind: "function",
        ctxName: "component$",
        captures: !1,
      },
      s_602giwHVIA0: {
        origin: "components/RouterHead/RouterHead.tsx",
        displayName: "RouterHead_component",
        canonicalFilename: "s_602giwhvia0",
        hash: "602giwHVIA0",
        ctxKind: "function",
        ctxName: "component$",
        captures: !1,
      },
      s_6GDWWyTotWI: {
        origin: "routes/search/index.tsx",
        displayName: "search_component",
        canonicalFilename: "s_6gdwwytotwi",
        hash: "6GDWWyTotWI",
        ctxKind: "function",
        ctxName: "component$",
        captures: !1,
      },
      s_6gHZiBTRokw: {
        origin: "routes/layout.tsx",
        displayName: "layout_component",
        canonicalFilename: "s_6ghzibtrokw",
        hash: "6gHZiBTRokw",
        ctxKind: "function",
        ctxName: "component$",
        captures: !1,
      },
      s_7U2TI0RBVVs: {
        origin: "routes/genre/[genreId]/movie/index.tsx",
        displayName: "movie_component",
        canonicalFilename: "s_7u2ti0rbvvs",
        hash: "7U2TI0RBVVs",
        ctxKind: "function",
        ctxName: "component$",
        captures: !1,
      },
      s_9bXcVLHHluw: {
        origin: "routes/genre/[genreId]/tv/index.tsx",
        displayName: "tv_component",
        canonicalFilename: "s_9bxcvlhhluw",
        hash: "9bXcVLHHluw",
        ctxKind: "function",
        ctxName: "component$",
        captures: !1,
      },
      s_B1ZdVo4i04I: {
        origin: "modules/MediaCard/MediaCard.tsx",
        displayName: "MediaCard_component",
        canonicalFilename: "s_b1zdvo4i04i",
        hash: "B1ZdVo4i04I",
        ctxKind: "function",
        ctxName: "component$",
        captures: !1,
      },
      s_Gl04XvY7V0A: {
        origin: "modules/TvHero/TvHero.tsx",
        displayName: "TvHero_component",
        canonicalFilename: "s_gl04xvy7v0a",
        hash: "Gl04XvY7V0A",
        ctxKind: "function",
        ctxName: "component$",
        captures: !1,
      },
      s_K0D8DduWDKo: {
        origin: "modules/MovieInfoCard/MovieInfoCard.tsx",
        displayName: "MovieInfoCard_component",
        canonicalFilename: "s_k0d8dduwdko",
        hash: "K0D8DduWDKo",
        ctxKind: "function",
        ctxName: "component$",
        captures: !1,
      },
      s_Osc0pj82kLo: {
        origin: "root.tsx",
        displayName: "root_component",
        canonicalFilename: "s_osc0pj82klo",
        hash: "Osc0pj82kLo",
        ctxKind: "function",
        ctxName: "component$",
        captures: !1,
      },
      s_YAM0BXbLL00: {
        origin: "routes/person/[personId]/index.tsx",
        displayName: "_personId__component",
        canonicalFilename: "s_yam0bxbll00",
        hash: "YAM0BXbLL00",
        ctxKind: "function",
        ctxName: "component$",
        captures: !1,
      },
      s_e7Q3cq1bfsA: {
        origin: "routes/tv/[tvId]/index.tsx",
        displayName: "_tvId__component",
        canonicalFilename: "s_e7q3cq1bfsa",
        hash: "e7Q3cq1bfsA",
        ctxKind: "function",
        ctxName: "component$",
        captures: !1,
      },
      s_fOqulbFT47o: {
        origin: "modules/PersonHero/PersonHero.tsx",
        displayName: "PersonHero_component",
        canonicalFilename: "s_foqulbft47o",
        hash: "fOqulbFT47o",
        ctxKind: "function",
        ctxName: "component$",
        captures: !1,
      },
      s_gXa0O1jDQ0c: {
        origin: "routes/tv/(all)/index.tsx",
        displayName: "_all__component",
        canonicalFilename: "s_gxa0o1jdq0c",
        hash: "gXa0O1jDQ0c",
        ctxKind: "function",
        ctxName: "component$",
        captures: !1,
      },
      s_iImUQ8u1QZI: {
        origin: "routes/movie/[movieId]/(overview)/index.tsx",
        displayName: "_overview__component",
        canonicalFilename: "s_iimuq8u1qzi",
        hash: "iImUQ8u1QZI",
        ctxKind: "function",
        ctxName: "component$",
        captures: !1,
      },
      s_iuS3oGJ90PY: {
        origin: "modules/MovieHero/MovieHero.tsx",
        displayName: "MovieHero_component",
        canonicalFilename: "s_ius3ogj90py",
        hash: "iuS3oGJ90PY",
        ctxKind: "function",
        ctxName: "component$",
        captures: !1,
      },
      s_kyOhTp2yu0g: {
        origin: "routes/movie/(all)/index.tsx",
        displayName: "_all__component",
        canonicalFilename: "s_kyohtp2yu0g",
        hash: "kyOhTp2yu0g",
        ctxKind: "function",
        ctxName: "component$",
        captures: !1,
      },
      s_lnV60n0uEBY: {
        origin: "modules/Footer/Footer.tsx",
        displayName: "Footer_component",
        canonicalFilename: "s_lnv60n0ueby",
        hash: "lnV60n0uEBY",
        ctxKind: "function",
        ctxName: "component$",
        captures: !1,
      },
      s_m1jdgzSbtRM: {
        origin: "routes/movie/categories/[name]/index.tsx",
        displayName: "_name__component",
        canonicalFilename: "s_m1jdgzsbtrm",
        hash: "m1jdgzSbtRM",
        ctxKind: "function",
        ctxName: "component$",
        captures: !1,
      },
      s_mYdi9850D74: {
        origin: "modules/MediaGrid/MediaGrid.tsx",
        displayName: "MediaGrid_component",
        canonicalFilename: "s_mydi9850d74",
        hash: "mYdi9850D74",
        ctxKind: "function",
        ctxName: "component$",
        captures: !1,
      },
      s_mYsiJcA4IBc: {
        origin: "../node_modules/@builder.io/qwik-city/index.qwik.mjs",
        displayName: "Link_component",
        canonicalFilename: "s_mysijca4ibc",
        hash: "mYsiJcA4IBc",
        ctxKind: "function",
        ctxName: "component$",
        captures: !1,
      },
      s_nd8yk3KO22c: {
        origin: "../node_modules/@builder.io/qwik-city/index.qwik.mjs",
        displayName: "RouterOutlet_component",
        canonicalFilename: "s_nd8yk3ko22c",
        hash: "nd8yk3KO22c",
        ctxKind: "function",
        ctxName: "component$",
        captures: !1,
      },
      s_rAjsam0fk6g: {
        origin: "routes/tv/categories/[name]/index.tsx",
        displayName: "_name__component",
        canonicalFilename: "s_rajsam0fk6g",
        hash: "rAjsam0fk6g",
        ctxKind: "function",
        ctxName: "component$",
        captures: !1,
      },
      s_tPgj0Ye70sI: {
        origin: "components/Stars/Stars.tsx",
        displayName: "Stars_component",
        canonicalFilename: "s_tpgj0ye70si",
        hash: "tPgj0Ye70sI",
        ctxKind: "function",
        ctxName: "component$",
        captures: !1,
      },
      s_uH7VzuiyiD0: {
        origin: "routes/movie/[movieId]/photos/index.tsx",
        displayName: "photos_component",
        canonicalFilename: "s_uh7vzuiyid0",
        hash: "uH7VzuiyiD0",
        ctxKind: "function",
        ctxName: "component$",
        captures: !1,
      },
      s_xQWdV5TAzmE: {
        origin: "modules/Navbar/Navbar.tsx",
        displayName: "Navbar_component",
        canonicalFilename: "s_xqwdv5tazme",
        hash: "xQWdV5TAzmE",
        ctxKind: "function",
        ctxName: "component$",
        captures: !1,
      },
      s_xocArrq2r9k: {
        origin: "routes/movie/[movieId]/layout.tsx",
        displayName: "layout_component",
        canonicalFilename: "s_xocarrq2r9k",
        hash: "xocArrq2r9k",
        ctxKind: "function",
        ctxName: "component$",
        captures: !1,
      },
      s_yZScDxaFwbM: {
        origin: "routes/movie/[movieId]/videos/index.tsx",
        displayName: "videos_component",
        canonicalFilename: "s_yzscdxafwbm",
        hash: "yZScDxaFwbM",
        ctxKind: "function",
        ctxName: "component$",
        captures: !1,
      },
      s_z1nvHyEppoI: {
        origin: "../node_modules/@builder.io/qwik-city/index.qwik.mjs",
        displayName: "QwikCity_component",
        canonicalFilename: "s_z1nvhyeppoi",
        hash: "z1nvHyEppoI",
        ctxKind: "function",
        ctxName: "component$",
        captures: !1,
      },
      s_3SNE8VxnEag: {
        origin: "../node_modules/@builder.io/qwik-city/index.qwik.mjs",
        displayName: "useEndpoint_useResource",
        canonicalFilename: "s_3sne8vxneag",
        hash: "3SNE8VxnEag",
        ctxKind: "function",
        ctxName: "useResource$",
        captures: !0,
      },
    },
    mapping: {
      s_hA9UPaY8sNQ: "q-a9f13bef.js",
      s_skxgNVWVOT8: "q-a9f13bef.js",
      s_uVE5iM9H73c: "q-a9f13bef.js",
      s_AaAlzKH0KlQ: "q-60fadc17.js",
      s_0onGgcuyr54: "q-27ce8fb5.js",
      s_2ExQvNmMHs8: "q-73866436.js",
      s_5Y7C0IpQhOg: "q-4a2d8161.js",
      s_602giwHVIA0: "q-a6ea8ee2.js",
      s_6GDWWyTotWI: "q-2137f3ec.js",
      s_6gHZiBTRokw: "q-09495aad.js",
      s_7U2TI0RBVVs: "q-63852754.js",
      s_9bXcVLHHluw: "q-f05a3fca.js",
      s_B1ZdVo4i04I: "q-c80d6a4f.js",
      s_Gl04XvY7V0A: "q-16fe0de5.js",
      s_K0D8DduWDKo: "q-eb7ec26c.js",
      s_Osc0pj82kLo: "q-69a33408.js",
      s_YAM0BXbLL00: "q-7de95bd6.js",
      s_e7Q3cq1bfsA: "q-a1962bc9.js",
      s_fOqulbFT47o: "q-2290bc11.js",
      s_gXa0O1jDQ0c: "q-d503c279.js",
      s_iImUQ8u1QZI: "q-fe062e23.js",
      s_iuS3oGJ90PY: "q-266744af.js",
      s_kyOhTp2yu0g: "q-d503c279.js",
      s_lnV60n0uEBY: "q-1b9d1999.js",
      s_m1jdgzSbtRM: "q-b98e2a71.js",
      s_mYdi9850D74: "q-a4d0ea88.js",
      s_mYsiJcA4IBc: "q-a9f13bef.js",
      s_nd8yk3KO22c: "q-6096f95f.js",
      s_rAjsam0fk6g: "q-b98e2a71.js",
      s_tPgj0Ye70sI: "q-58343eb1.js",
      s_uH7VzuiyiD0: "q-c0a94e98.js",
      s_xQWdV5TAzmE: "q-e315af4d.js",
      s_xocArrq2r9k: "q-09495aad.js",
      s_yZScDxaFwbM: "q-945e702e.js",
      s_z1nvHyEppoI: "q-60fadc17.js",
      s_3SNE8VxnEag: "q-e1569791.js",
    },
    bundles: {
      "q-09495aad.js": {
        size: 1896,
        imports: [
          "q-69a33408.js",
          "q-81263a25.js",
          "q-93e27978.js",
          "q-a7168e23.js",
          "q-bc773a6b.js",
        ],
        dynamicImports: ["q-1b9d1999.js", "q-e315af4d.js"],
        origins: [
          "node_modules/clsx/dist/clsx.m.js",
          "src/entry_layout.js",
          "src/modules/Footer/Footer.js",
          "src/modules/Navbar/Navbar.js",
          "src/s_6ghzibtrokw.js",
          "src/s_xocarrq2r9k.js",
        ],
        symbols: ["s_6gHZiBTRokw", "s_xocArrq2r9k"],
      },
      "q-10e41c90.js": {
        size: 171,
        imports: ["q-81263a25.js"],
        dynamicImports: ["q-63852754.js"],
        origins: ["src/routes/genre/[genreId]/movie/index.js"],
      },
      "q-16fe0de5.js": {
        size: 1034,
        imports: ["q-81263a25.js"],
        origins: ["src/entry_TvHero.js", "src/s_gl04xvy7v0a.js"],
        symbols: ["s_Gl04XvY7V0A"],
      },
      "q-1b9d1999.js": {
        size: 917,
        imports: ["q-81263a25.js"],
        origins: ["src/entry_Footer.js", "src/s_lnv60n0ueby.js"],
        symbols: ["s_lnV60n0uEBY"],
      },
      "q-2137f3ec.js": {
        size: 990,
        imports: ["q-69a33408.js", "q-81263a25.js", "q-ec9e015e.js"],
        origins: ["src/entry_search.js", "src/s_6gdwwytotwi.js"],
        symbols: ["s_6GDWWyTotWI"],
      },
      "q-2290bc11.js": {
        size: 1914,
        imports: [
          "q-47430b2b.js",
          "q-5c167437.js",
          "q-69a33408.js",
          "q-7de95bd6.js",
          "q-81263a25.js",
          "q-ec9e015e.js",
        ],
        origins: ["src/entry_PersonHero.js", "src/s_foqulbft47o.js"],
        symbols: ["s_fOqulbFT47o"],
      },
      "q-266744af.js": {
        size: 1069,
        imports: ["q-81263a25.js", "q-847d68a9.js"],
        origins: ["src/entry_MovieHero.js", "src/s_ius3ogj90py.js"],
        symbols: ["s_iuS3oGJ90PY"],
      },
      "q-27ce8fb5.js": {
        size: 1061,
        imports: ["q-5e2aa9b8.js", "q-69a33408.js", "q-81263a25.js"],
        origins: ["src/entry_Carousel.js", "src/s_0onggcuyr54.js"],
        symbols: ["s_0onGgcuyr54"],
      },
      "q-47430b2b.js": {
        size: 152,
        imports: ["q-81263a25.js"],
        dynamicImports: ["q-4a2d8161.js"],
        origins: ["src/modules/ExternalLinks/ExternalLinks.js"],
      },
      "q-478b3963.js": {
        size: 184,
        imports: ["q-81263a25.js"],
        dynamicImports: ["q-7de95bd6.js"],
        origins: ["src/routes/person/[personId]/index.js"],
      },
      "q-48e5b5b4.js": {
        size: 152,
        imports: ["q-81263a25.js"],
        dynamicImports: ["q-16fe0de5.js"],
        origins: ["src/modules/TvHero/TvHero.js"],
      },
      "q-4a2d8161.js": {
        size: 1754,
        imports: ["q-81263a25.js"],
        origins: ["src/entry_ExternalLinks.js", "src/s_5y7c0ipqhog.js"],
        symbols: ["s_5Y7C0IpQhOg"],
      },
      "q-58343eb1.js": {
        size: 442,
        imports: ["q-81263a25.js"],
        origins: ["src/entry_Stars.js", "src/s_tpgj0ye70si.js"],
        symbols: ["s_tPgj0Ye70sI"],
      },
      "q-5c167437.js": {
        size: 8868,
        origins: [
          "src/utils/constants/categories.js",
          "src/utils/constants/languages.js",
          "src/utils/format.js",
        ],
      },
      "q-5e2aa9b8.js": {
        size: 152,
        imports: ["q-81263a25.js"],
        dynamicImports: ["q-c80d6a4f.js"],
        origins: ["src/modules/MediaCard/MediaCard.js"],
      },
      "q-6096f95f.js": {
        size: 269,
        imports: ["q-69a33408.js", "q-81263a25.js"],
        origins: ["src/entry_RouterOutlet.js", "src/s_nd8yk3ko22c.js"],
        symbols: ["s_nd8yk3KO22c"],
      },
      "q-60fadc17.js": {
        size: 1489,
        imports: ["q-69a33408.js", "q-81263a25.js"],
        dynamicImports: ["q-cee1460c.js"],
        origins: [
          "@builder.io/qwik/build",
          "src/entry_QwikCity.js",
          "src/s_aaalzkh0klq.js",
          "src/s_z1nvhyeppoi.js",
        ],
        symbols: ["s_AaAlzKH0KlQ", "s_z1nvHyEppoI"],
      },
      "q-63852754.js": {
        size: 572,
        imports: ["q-69a33408.js", "q-81263a25.js", "q-ec9e015e.js"],
        origins: ["src/entry_movie.js", "src/s_7u2ti0rbvvs.js"],
        symbols: ["s_7U2TI0RBVVs"],
      },
      "q-69a33408.js": {
        size: 4342,
        imports: ["q-81263a25.js"],
        dynamicImports: [
          "q-6096f95f.js",
          "q-60fadc17.js",
          "q-a6ea8ee2.js",
          "q-a9f13bef.js",
          "q-e1569791.js",
        ],
        origins: [
          "node_modules/@builder.io/qwik-city/index.qwik.mjs",
          "src/components/RouterHead/RouterHead.js",
          "src/entry_root.js",
          "src/s_osc0pj82klo.js",
        ],
        symbols: ["s_Osc0pj82kLo"],
      },
      "q-6eee719e.js": {
        size: 128,
        imports: ["q-81263a25.js"],
        dynamicImports: ["q-ba8b8f3a.js"],
        origins: ["@qwik-city-entries"],
      },
      "q-73866436.js": {
        size: 1154,
        imports: [
          "q-48e5b5b4.js",
          "q-5c167437.js",
          "q-69a33408.js",
          "q-81263a25.js",
          "q-a7168e23.js",
          "q-ae68a787.js",
          "q-bc773a6b.js",
        ],
        origins: ["src/entry_routes.js", "src/s_2exqvnmmhs8.js"],
        symbols: ["s_2ExQvNmMHs8"],
      },
      "q-76df6c8a.js": {
        size: 205,
        imports: ["q-81263a25.js"],
        dynamicImports: ["q-2137f3ec.js"],
        origins: ["src/routes/search/index.js"],
      },
      "q-7de95bd6.js": {
        size: 896,
        imports: ["q-69a33408.js", "q-81263a25.js", "q-ec9e015e.js"],
        dynamicImports: ["q-2290bc11.js"],
        origins: [
          "src/entry__personId_.js",
          "src/modules/PersonHero/PersonHero.js",
          "src/s_yam0bxbll00.js",
        ],
        symbols: ["s_YAM0BXbLL00"],
      },
      "q-7fd4597b.js": {
        size: 171,
        imports: ["q-81263a25.js"],
        dynamicImports: ["q-a1962bc9.js"],
        origins: ["src/routes/tv/[tvId]/index.js"],
      },
      "q-81263a25.js": {
        size: 38027,
        dynamicImports: ["q-69a33408.js"],
        origins: [
          "\0vite/preload-helper",
          "node_modules/@builder.io/qwik/core.min.mjs",
          "src/global.css",
          "src/root.js",
        ],
      },
      "q-847d68a9.js": {
        size: 152,
        imports: ["q-81263a25.js"],
        dynamicImports: ["q-58343eb1.js"],
        origins: ["src/components/Stars/Stars.js"],
      },
      "q-8aefda26.js": {
        size: 215,
        imports: ["q-81263a25.js"],
        dynamicImports: ["q-73866436.js"],
        origins: ["src/routes/index.js"],
      },
      "q-93e27978.js": {
        size: 88,
        imports: ["q-81263a25.js"],
        origins: ["src/routes/movie/[movieId]/context.js"],
      },
      "q-945e702e.js": {
        size: 1011,
        imports: ["q-81263a25.js", "q-93e27978.js"],
        origins: ["src/entry_videos.js", "src/s_yzscdxafwbm.js"],
        symbols: ["s_yZScDxaFwbM"],
      },
      "q-98c59b5e.js": {
        size: 176,
        imports: ["q-81263a25.js"],
        dynamicImports: ["q-09495aad.js"],
        origins: ["src/routes/movie/[movieId]/layout.js"],
      },
      "q-995f8a4b.js": { size: 58, imports: ["q-81263a25.js"] },
      "q-a1962bc9.js": {
        size: 609,
        imports: [
          "q-48e5b5b4.js",
          "q-69a33408.js",
          "q-81263a25.js",
          "q-ae68a787.js",
          "q-d24d4b21.js",
        ],
        origins: ["src/entry__tvId_.js", "src/s_e7q3cq1bfsa.js"],
        symbols: ["s_e7Q3cq1bfsA"],
      },
      "q-a4d0ea88.js": {
        size: 296,
        imports: ["q-5e2aa9b8.js", "q-81263a25.js"],
        origins: ["src/entry_MediaGrid.js", "src/s_mydi9850d74.js"],
        symbols: ["s_mYdi9850D74"],
      },
      "q-a6ea8ee2.js": {
        size: 872,
        imports: ["q-69a33408.js", "q-81263a25.js"],
        origins: ["src/entry_RouterHead.js", "src/s_602giwhvia0.js"],
        symbols: ["s_602giwHVIA0"],
      },
      "q-a7168e23.js": { size: 326, origins: ["src/utils/paths.js"] },
      "q-a9070f8a.js": {
        size: 171,
        imports: ["q-81263a25.js"],
        dynamicImports: ["q-f05a3fca.js"],
        origins: ["src/routes/genre/[genreId]/tv/index.js"],
      },
      "q-a9f13bef.js": {
        size: 886,
        imports: ["q-69a33408.js", "q-81263a25.js"],
        origins: [
          "src/entry_Link.js",
          "src/s_ha9upay8snq.js",
          "src/s_mysijca4ibc.js",
          "src/s_skxgnvwvot8.js",
          "src/s_uve5im9h73c.js",
        ],
        symbols: [
          "s_hA9UPaY8sNQ",
          "s_mYsiJcA4IBc",
          "s_skxgNVWVOT8",
          "s_uVE5iM9H73c",
        ],
      },
      "q-aacc0f25.js": {
        size: 171,
        imports: ["q-81263a25.js"],
        dynamicImports: ["q-b98e2a71.js"],
        origins: ["src/routes/movie/categories/[name]/index.js"],
      },
      "q-ae68a787.js": {
        size: 152,
        imports: ["q-81263a25.js"],
        dynamicImports: ["q-27ce8fb5.js"],
        origins: ["src/modules/Carousel/Carousel.js"],
      },
      "q-b98e2a71.js": {
        size: 997,
        imports: [
          "q-5c167437.js",
          "q-69a33408.js",
          "q-81263a25.js",
          "q-ec9e015e.js",
        ],
        origins: [
          "src/entry__name_.js",
          "src/s_m1jdgzsbtrm.js",
          "src/s_rajsam0fk6g.js",
        ],
        symbols: ["s_m1jdgzSbtRM", "s_rAjsam0fk6g"],
      },
      "q-ba8b8f3a.js": {
        size: 2536,
        origins: [
          "node_modules/@builder.io/qwik-city/service-worker.mjs",
          "src/routes/service-worker.js",
        ],
      },
      "q-bc773a6b.js": {
        size: 152,
        imports: ["q-81263a25.js"],
        dynamicImports: ["q-266744af.js"],
        origins: ["src/modules/MovieHero/MovieHero.js"],
      },
      "q-bf4921c5.js": {
        size: 158,
        imports: ["q-81263a25.js"],
        dynamicImports: ["q-fe062e23.js"],
        origins: ["src/routes/movie/[movieId]/(overview)/index.js"],
      },
      "q-c0a94e98.js": {
        size: 439,
        imports: ["q-81263a25.js", "q-93e27978.js"],
        origins: ["src/entry_photos.js", "src/s_uh7vzuiyid0.js"],
        symbols: ["s_uH7VzuiyiD0"],
      },
      "q-c36e9b8c.js": {
        size: 158,
        imports: ["q-81263a25.js"],
        dynamicImports: ["q-c0a94e98.js"],
        origins: ["src/routes/movie/[movieId]/photos/index.js"],
      },
      "q-c80d6a4f.js": {
        size: 727,
        imports: [
          "q-5c167437.js",
          "q-69a33408.js",
          "q-81263a25.js",
          "q-847d68a9.js",
          "q-a7168e23.js",
        ],
        origins: ["src/entry_MediaCard.js", "src/s_b1zdvo4i04i.js"],
        symbols: ["s_B1ZdVo4i04I"],
      },
      "q-cee1460c.js": {
        size: 1563,
        imports: ["q-81263a25.js"],
        dynamicImports: [
          "q-10e41c90.js",
          "q-478b3963.js",
          "q-6eee719e.js",
          "q-76df6c8a.js",
          "q-7fd4597b.js",
          "q-8aefda26.js",
          "q-98c59b5e.js",
          "q-a9070f8a.js",
          "q-aacc0f25.js",
          "q-bf4921c5.js",
          "q-c36e9b8c.js",
          "q-d4f0ade6.js",
          "q-d7f9fe54.js",
          "q-dd0fa65f.js",
          "q-de71c03c.js",
          "q-e8e90483.js",
        ],
        origins: ["@qwik-city-plan"],
      },
      "q-d24d4b21.js": {
        size: 152,
        imports: ["q-81263a25.js"],
        dynamicImports: ["q-eb7ec26c.js"],
        origins: ["src/modules/MovieInfoCard/MovieInfoCard.js"],
      },
      "q-d4f0ade6.js": {
        size: 171,
        imports: ["q-81263a25.js"],
        dynamicImports: ["q-b98e2a71.js"],
        origins: ["src/routes/tv/categories/[name]/index.js"],
      },
      "q-d503c279.js": {
        size: 2011,
        imports: [
          "q-48e5b5b4.js",
          "q-5c167437.js",
          "q-69a33408.js",
          "q-81263a25.js",
          "q-a7168e23.js",
          "q-ae68a787.js",
          "q-bc773a6b.js",
        ],
        origins: [
          "src/entry__all_.js",
          "src/s_gxa0o1jdq0c.js",
          "src/s_kyohtp2yu0g.js",
        ],
        symbols: ["s_gXa0O1jDQ0c", "s_kyOhTp2yu0g"],
      },
      "q-d7f9fe54.js": {
        size: 158,
        imports: ["q-81263a25.js"],
        dynamicImports: ["q-945e702e.js"],
        origins: ["src/routes/movie/[movieId]/videos/index.js"],
      },
      "q-dd0fa65f.js": {
        size: 158,
        imports: ["q-81263a25.js"],
        dynamicImports: ["q-09495aad.js"],
        origins: ["src/routes/layout.js"],
      },
      "q-de71c03c.js": {
        size: 205,
        imports: ["q-81263a25.js"],
        dynamicImports: ["q-d503c279.js"],
        origins: ["src/routes/movie/(all)/index.js"],
      },
      "q-e1569791.js": {
        size: 195,
        imports: ["q-69a33408.js", "q-81263a25.js"],
        origins: ["src/entry_useEndpoint.js", "src/s_3sne8vxneag.js"],
        symbols: ["s_3SNE8VxnEag"],
      },
      "q-e315af4d.js": {
        size: 1052,
        imports: ["q-69a33408.js", "q-81263a25.js", "q-a7168e23.js"],
        origins: ["src/entry_Navbar.js", "src/s_xqwdv5tazme.js"],
        symbols: ["s_xQWdV5TAzmE"],
      },
      "q-e8e90483.js": {
        size: 201,
        imports: ["q-81263a25.js"],
        dynamicImports: ["q-d503c279.js"],
        origins: ["src/routes/tv/(all)/index.js"],
      },
      "q-eb7ec26c.js": {
        size: 2561,
        imports: [
          "q-47430b2b.js",
          "q-5c167437.js",
          "q-69a33408.js",
          "q-81263a25.js",
          "q-a7168e23.js",
        ],
        origins: ["src/entry_MovieInfoCard.js", "src/s_k0d8dduwdko.js"],
        symbols: ["s_K0D8DduWDKo"],
      },
      "q-ec9e015e.js": {
        size: 152,
        imports: ["q-81263a25.js"],
        dynamicImports: ["q-a4d0ea88.js"],
        origins: ["src/modules/MediaGrid/MediaGrid.js"],
      },
      "q-f05a3fca.js": {
        size: 571,
        imports: ["q-69a33408.js", "q-81263a25.js", "q-ec9e015e.js"],
        origins: ["src/entry_tv.js", "src/s_9bxcvlhhluw.js"],
        symbols: ["s_9bXcVLHHluw"],
      },
      "q-fe062e23.js": {
        size: 566,
        imports: [
          "q-81263a25.js",
          "q-93e27978.js",
          "q-ae68a787.js",
          "q-d24d4b21.js",
        ],
        origins: ["src/entry__overview_.js", "src/s_iimuq8u1qzi.js"],
        symbols: ["s_iImUQ8u1QZI"],
      },
    },
    injections: [
      {
        tag: "link",
        location: "head",
        attributes: { rel: "stylesheet", href: "/build/q-0304153d.css" },
      },
    ],
    version: "1",
    options: {
      target: "client",
      buildMode: "production",
      forceFullBuild: !0,
      entryStrategy: { type: "smart" },
    },
    platform: {
      qwik: "0.11.1",
      vite: "",
      rollup: "2.78.1",
      env: "node",
      os: "linux",
      node: "16.13.0",
    },
  },
  gu = L(
    R(() => {
      const e = bc(),
        t = Xe();
      return c(W, {
        children: [
          c("title", { children: O(e, "title") }),
          c("link", {
            rel: "canonical",
            get href() {
              return t.href;
            },
            [j]: { href: O(t, "href") },
          }),
          c("meta", {
            name: "viewport",
            content: "width=device-width, initial-scale=1.0",
          }),
          c("link", {
            rel: "icon",
            type: "image/svg+xml",
            href: "/favicon.svg",
          }),
          c("link", {
            rel: "preconnect",
            href: "https://fonts.googleapis.com",
          }),
          c("link", {
            rel: "preconnect",
            href: "https://fonts.gstatic.com",
            crossOrigin: "",
          }),
          c("link", {
            href: "https://fonts.googleapis.com/css2?family=Poppins&display=swap",
            rel: "stylesheet",
          }),
          e.meta.map((n) => c("meta", { ...n })),
          e.links.map((n) => c("link", { ...n })),
          e.styles.map((n) =>
            c("style", {
              ...n.props,
              get dangerouslySetInnerHTML() {
                return n.style;
              },
              [j]: { dangerouslySetInnerHTML: O(n, "style") },
            })
          ),
        ],
      });
    }, "s_602giwHVIA0")
  );
const yu = L(
  R(
    () =>
      c(Tc, {
        children: [
          c("head", { children: [c("meta", { charSet: "utf-8" }), c(gu, {})] }),
          c("body", {
            "data-theme": "dark",
            lang: "en",
            class: "bg-base-200",
            children: [c(gc, {}), c(Ec, {})],
          }),
        ],
      }),
    "s_Osc0pj82kLo"
  )
);
function vu(e) {
  return uu(c(yu, {}), {
    manifest: pu,
    ...e,
    prefetchStrategy: {
      implementation: {
        linkInsert: null,
        prefetchEvent: "always",
        workerFetchInsert: null,
      },
    },
  });
}
const Ru = Vd(vu),
  _u = K.object({ VITE_TMDB_API_KEY: K.string() }),
  $u = _u.parse({ BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }),
  bu = "https://api.themoviedb.org/3",
  Ce = async (e, t = {}) => {
    const n = new URLSearchParams({ ...t, api_key: $u.VITE_TMDB_API_KEY }),
      s = `${bu}/${e}?${n}`,
      r = await fetch(s);
    if (!r.ok) throw (console.error(s), new Error(r.statusText));
    return r.json();
  },
  wu = ({ mediaType: e, page: t }) =>
    Ce(`trending/${e}/week`, { page: String(t) }),
  xu = async ({ id: e }) => ({
    ...(await Ce(`movie/${e}`, {
      append_to_response: "videos,credits,images,external_ids,release_dates",
      include_image_language: "en",
    })),
    media_type: "movie",
  }),
  qu = async ({ query: e, page: t }) => {
    var r;
    const n = await Ce(`movie/${e}`, { page: String(t) }),
      s =
        (r = n.results) == null
          ? void 0
          : r.map((o) => ({ ...o, media_type: "movie" }));
    return { ...n, results: s };
  },
  ku = async ({ id: e }) => ({
    ...(await Ce(`tv/${e}`, {
      append_to_response: "videos,credits,images,external_ids,content_ratings",
      include_image_language: "en",
    })),
    media_type: "tv",
  }),
  ju = async ({ query: e, page: t }) => {
    var r;
    const n = await Ce(`tv/${e}`, { page: String(t) }),
      s =
        (r = n.results) == null
          ? void 0
          : r.map((o) => ({ ...o, media_type: "tv" }));
    return { ...n, results: s };
  },
  Su = async ({ id: e }) => ({
    ...(await Ce(`person/${e}`, {
      append_to_response: "images,combined_credits,external_ids",
      include_image_language: "en",
    })),
    media_type: "person",
  }),
  Tu = ({ query: e, page: t }) =>
    Ce("search/multi", { page: String(t), query: e }),
  Iu = ({ collections: e }) => {
    const t = e.flatMap((s) => s.results || []);
    return t[Math.floor(Math.random() * t.length)];
  },
  Eu = async ({ media: e, genre: t, page: n }) => {
    var o;
    const s = await Ce(`discover/${e}`, {
        append_to_response: "genre",
        page: String(n),
        with_genres: String(t),
      }),
      r =
        (o = s.results) == null
          ? void 0
          : o.map((i) => ({ ...i, media_type: e }));
    return { ...s, results: r };
  },
  Nu = async ({ media: e }) => (await Ce(`genre/${e}/list`, {})).genres,
  fe = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        getTrending: wu,
        getMovie: xu,
        getMovies: qu,
        getTvShow: ku,
        getTvShows: ju,
        getPerson: Su,
        search: Tu,
        getRandomMedia: Iu,
        getMediaByGenre: Eu,
        getGenreList: Nu,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  );
export { Ru as default };
