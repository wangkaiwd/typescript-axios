function An(e, t) {
  const n = Object.create(null),
    s = e.split(",");
  for (let r = 0; r < s.length; r++) n[s[r]] = !0;
  return t ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r];
}
const Po =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  Ao = An(Po);
function Rs(e) {
  return !!e || e === "";
}
function In(e) {
  if (F(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n],
        r = ue(s) ? Oo(s) : In(s);
      if (r) for (const o in r) t[o] = r[o];
    }
    return t;
  } else {
    if (ue(e)) return e;
    if (ie(e)) return e;
  }
}
const Io = /;(?![^(]*\))/g,
  Mo = /:(.+)/;
function Oo(e) {
  const t = {};
  return (
    e.split(Io).forEach((n) => {
      if (n) {
        const s = n.split(Mo);
        s.length > 1 && (t[s[0].trim()] = s[1].trim());
      }
    }),
    t
  );
}
function Qe(e) {
  let t = "";
  if (ue(e)) t = e;
  else if (F(e))
    for (let n = 0; n < e.length; n++) {
      const s = Qe(e[n]);
      s && (t += s + " ");
    }
  else if (ie(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const Re = (e) =>
    e == null
      ? ""
      : F(e) || (ie(e) && (e.toString === Hs || !S(e.toString)))
      ? JSON.stringify(e, Fs, 2)
      : String(e),
  Fs = (e, t) =>
    t && t.__v_isRef
      ? Fs(e, t.value)
      : pt(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [s, r]) => ((n[`${s} =>`] = r), n),
            {}
          ),
        }
      : Ns(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : ie(t) && !F(t) && !Bs(t)
      ? String(t)
      : t,
  Z = {},
  ht = [],
  Pe = () => {},
  Ro = () => !1,
  Fo = /^on[^a-z]/,
  Tt = (e) => Fo.test(e),
  Mn = (e) => e.startsWith("onUpdate:"),
  ge = Object.assign,
  On = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  No = Object.prototype.hasOwnProperty,
  W = (e, t) => No.call(e, t),
  F = Array.isArray,
  pt = (e) => Yt(e) === "[object Map]",
  Ns = (e) => Yt(e) === "[object Set]",
  S = (e) => typeof e == "function",
  ue = (e) => typeof e == "string",
  Rn = (e) => typeof e == "symbol",
  ie = (e) => e !== null && typeof e == "object",
  Ss = (e) => ie(e) && S(e.then) && S(e.catch),
  Hs = Object.prototype.toString,
  Yt = (e) => Hs.call(e),
  So = (e) => Yt(e).slice(8, -1),
  Bs = (e) => Yt(e) === "[object Object]",
  Fn = (e) =>
    ue(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  Lt = An(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  Xt = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  Ho = /-(\w)/g,
  Fe = Xt((e) => e.replace(Ho, (t, n) => (n ? n.toUpperCase() : ""))),
  Bo = /\B([A-Z])/g,
  _t = Xt((e) => e.replace(Bo, "-$1").toLowerCase()),
  Zt = Xt((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Nn = Xt((e) => (e ? `on${Zt(e)}` : "")),
  Pt = (e, t) => !Object.is(e, t),
  Sn = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  Qt = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  Uo = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let Us;
const jo = () =>
  Us ||
  (Us =
    typeof globalThis != "undefined"
      ? globalThis
      : typeof self != "undefined"
      ? self
      : typeof window != "undefined"
      ? window
      : typeof global != "undefined"
      ? global
      : {});
let Ge;
const Gt = [];
class Do {
  constructor(t = !1) {
    (this.active = !0),
      (this.effects = []),
      (this.cleanups = []),
      !t &&
        Ge &&
        ((this.parent = Ge),
        (this.index = (Ge.scopes || (Ge.scopes = [])).push(this) - 1));
  }
  run(t) {
    if (this.active)
      try {
        return this.on(), t();
      } finally {
        this.off();
      }
  }
  on() {
    this.active && (Gt.push(this), (Ge = this));
  }
  off() {
    this.active && (Gt.pop(), (Ge = Gt[Gt.length - 1]));
  }
  stop(t) {
    if (this.active) {
      if (
        (this.effects.forEach((n) => n.stop()),
        this.cleanups.forEach((n) => n()),
        this.scopes && this.scopes.forEach((n) => n.stop(!0)),
        this.parent && !t)
      ) {
        const n = this.parent.scopes.pop();
        n &&
          n !== this &&
          ((this.parent.scopes[this.index] = n), (n.index = this.index));
      }
      this.active = !1;
    }
  }
}
function Ko(e, t) {
  (t = t || Ge), t && t.active && t.effects.push(e);
}
const Hn = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  js = (e) => (e.w & qe) > 0,
  Ds = (e) => (e.n & qe) > 0,
  Wo = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= qe;
  },
  qo = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let s = 0; s < t.length; s++) {
        const r = t[s];
        js(r) && !Ds(r) ? r.delete(e) : (t[n++] = r),
          (r.w &= ~qe),
          (r.n &= ~qe);
      }
      t.length = n;
    }
  },
  Bn = new WeakMap();
let At = 0,
  qe = 1;
const Un = 30,
  It = [];
let et;
const tt = Symbol(""),
  jn = Symbol("");
class Dn {
  constructor(t, n = null, s) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      Ko(this, s);
  }
  run() {
    if (!this.active) return this.fn();
    if (!It.includes(this))
      try {
        return (
          It.push((et = this)),
          zo(),
          (qe = 1 << ++At),
          At <= Un ? Wo(this) : Ks(this),
          this.fn()
        );
      } finally {
        At <= Un && qo(this), (qe = 1 << --At), nt(), It.pop();
        const t = It.length;
        et = t > 0 ? It[t - 1] : void 0;
      }
  }
  stop() {
    this.active && (Ks(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function Ks(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let gt = !0;
const Kn = [];
function mt() {
  Kn.push(gt), (gt = !1);
}
function zo() {
  Kn.push(gt), (gt = !0);
}
function nt() {
  const e = Kn.pop();
  gt = e === void 0 ? !0 : e;
}
function we(e, t, n) {
  if (!Ws()) return;
  let s = Bn.get(e);
  s || Bn.set(e, (s = new Map()));
  let r = s.get(n);
  r || s.set(n, (r = Hn())), qs(r);
}
function Ws() {
  return gt && et !== void 0;
}
function qs(e, t) {
  let n = !1;
  At <= Un ? Ds(e) || ((e.n |= qe), (n = !js(e))) : (n = !e.has(et)),
    n && (e.add(et), et.deps.push(e));
}
function Be(e, t, n, s, r, o) {
  const i = Bn.get(e);
  if (!i) return;
  let l = [];
  if (t === "clear") l = [...i.values()];
  else if (n === "length" && F(e))
    i.forEach((u, f) => {
      (f === "length" || f >= s) && l.push(u);
    });
  else
    switch ((n !== void 0 && l.push(i.get(n)), t)) {
      case "add":
        F(e)
          ? Fn(n) && l.push(i.get("length"))
          : (l.push(i.get(tt)), pt(e) && l.push(i.get(jn)));
        break;
      case "delete":
        F(e) || (l.push(i.get(tt)), pt(e) && l.push(i.get(jn)));
        break;
      case "set":
        pt(e) && l.push(i.get(tt));
        break;
    }
  if (l.length === 1) l[0] && Wn(l[0]);
  else {
    const u = [];
    for (const f of l) f && u.push(...f);
    Wn(Hn(u));
  }
}
function Wn(e, t) {
  for (const n of F(e) ? e : [...e])
    (n !== et || n.allowRecurse) && (n.scheduler ? n.scheduler() : n.run());
}
const Jo = An("__proto__,__v_isRef,__isVue"),
  zs = new Set(
    Object.getOwnPropertyNames(Symbol)
      .map((e) => Symbol[e])
      .filter(Rn)
  ),
  Vo = qn(),
  Yo = qn(!1, !0),
  Xo = qn(!0),
  Js = Zo();
function Zo() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const s = z(this);
        for (let o = 0, i = this.length; o < i; o++) we(s, "get", o + "");
        const r = s[t](...n);
        return r === -1 || r === !1 ? s[t](...n.map(z)) : r;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        mt();
        const s = z(this)[t].apply(this, n);
        return nt(), s;
      };
    }),
    e
  );
}
function qn(e = !1, t = !1) {
  return function (s, r, o) {
    if (r === "__v_isReactive") return !e;
    if (r === "__v_isReadonly") return e;
    if (r === "__v_raw" && o === (e ? (t ? hi : nr) : t ? tr : er).get(s))
      return s;
    const i = F(s);
    if (!e && i && W(Js, r)) return Reflect.get(Js, r, o);
    const l = Reflect.get(s, r, o);
    return (Rn(r) ? zs.has(r) : Jo(r)) || (e || we(s, "get", r), t)
      ? l
      : he(l)
      ? !i || !Fn(r)
        ? l.value
        : l
      : ie(l)
      ? e
        ? Vn(l)
        : ln(l)
      : l;
  };
}
const Qo = Vs(),
  Go = Vs(!0);
function Vs(e = !1) {
  return function (n, s, r, o) {
    let i = n[s];
    if (!e && !Xn(r) && ((r = z(r)), (i = z(i)), !F(n) && he(i) && !he(r)))
      return (i.value = r), !0;
    const l = F(n) && Fn(s) ? Number(s) < n.length : W(n, s),
      u = Reflect.set(n, s, r, o);
    return (
      n === z(o) && (l ? Pt(r, i) && Be(n, "set", s, r) : Be(n, "add", s, r)), u
    );
  };
}
function ei(e, t) {
  const n = W(e, t);
  e[t];
  const s = Reflect.deleteProperty(e, t);
  return s && n && Be(e, "delete", t, void 0), s;
}
function ti(e, t) {
  const n = Reflect.has(e, t);
  return (!Rn(t) || !zs.has(t)) && we(e, "has", t), n;
}
function ni(e) {
  return we(e, "iterate", F(e) ? "length" : tt), Reflect.ownKeys(e);
}
const Ys = { get: Vo, set: Qo, deleteProperty: ei, has: ti, ownKeys: ni },
  si = {
    get: Xo,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  ri = ge({}, Ys, { get: Yo, set: Go }),
  zn = (e) => e,
  en = (e) => Reflect.getPrototypeOf(e);
function tn(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const r = z(e),
    o = z(t);
  t !== o && !n && we(r, "get", t), !n && we(r, "get", o);
  const { has: i } = en(r),
    l = s ? zn : n ? Zn : Ot;
  if (i.call(r, t)) return l(e.get(t));
  if (i.call(r, o)) return l(e.get(o));
  e !== r && e.get(t);
}
function nn(e, t = !1) {
  const n = this.__v_raw,
    s = z(n),
    r = z(e);
  return (
    e !== r && !t && we(s, "has", e),
    !t && we(s, "has", r),
    e === r ? n.has(e) : n.has(e) || n.has(r)
  );
}
function sn(e, t = !1) {
  return (
    (e = e.__v_raw), !t && we(z(e), "iterate", tt), Reflect.get(e, "size", e)
  );
}
function Xs(e) {
  e = z(e);
  const t = z(this);
  return en(t).has.call(t, e) || (t.add(e), Be(t, "add", e, e)), this;
}
function Zs(e, t) {
  t = z(t);
  const n = z(this),
    { has: s, get: r } = en(n);
  let o = s.call(n, e);
  o || ((e = z(e)), (o = s.call(n, e)));
  const i = r.call(n, e);
  return (
    n.set(e, t), o ? Pt(t, i) && Be(n, "set", e, t) : Be(n, "add", e, t), this
  );
}
function Qs(e) {
  const t = z(this),
    { has: n, get: s } = en(t);
  let r = n.call(t, e);
  r || ((e = z(e)), (r = n.call(t, e))), s && s.call(t, e);
  const o = t.delete(e);
  return r && Be(t, "delete", e, void 0), o;
}
function Gs() {
  const e = z(this),
    t = e.size !== 0,
    n = e.clear();
  return t && Be(e, "clear", void 0, void 0), n;
}
function rn(e, t) {
  return function (s, r) {
    const o = this,
      i = o.__v_raw,
      l = z(i),
      u = t ? zn : e ? Zn : Ot;
    return (
      !e && we(l, "iterate", tt), i.forEach((f, h) => s.call(r, u(f), u(h), o))
    );
  };
}
function on(e, t, n) {
  return function (...s) {
    const r = this.__v_raw,
      o = z(r),
      i = pt(o),
      l = e === "entries" || (e === Symbol.iterator && i),
      u = e === "keys" && i,
      f = r[e](...s),
      h = n ? zn : t ? Zn : Ot;
    return (
      !t && we(o, "iterate", u ? jn : tt),
      {
        next() {
          const { value: v, done: w } = f.next();
          return w
            ? { value: v, done: w }
            : { value: l ? [h(v[0]), h(v[1])] : h(v), done: w };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function ze(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function oi() {
  const e = {
      get(o) {
        return tn(this, o);
      },
      get size() {
        return sn(this);
      },
      has: nn,
      add: Xs,
      set: Zs,
      delete: Qs,
      clear: Gs,
      forEach: rn(!1, !1),
    },
    t = {
      get(o) {
        return tn(this, o, !1, !0);
      },
      get size() {
        return sn(this);
      },
      has: nn,
      add: Xs,
      set: Zs,
      delete: Qs,
      clear: Gs,
      forEach: rn(!1, !0),
    },
    n = {
      get(o) {
        return tn(this, o, !0);
      },
      get size() {
        return sn(this, !0);
      },
      has(o) {
        return nn.call(this, o, !0);
      },
      add: ze("add"),
      set: ze("set"),
      delete: ze("delete"),
      clear: ze("clear"),
      forEach: rn(!0, !1),
    },
    s = {
      get(o) {
        return tn(this, o, !0, !0);
      },
      get size() {
        return sn(this, !0);
      },
      has(o) {
        return nn.call(this, o, !0);
      },
      add: ze("add"),
      set: ze("set"),
      delete: ze("delete"),
      clear: ze("clear"),
      forEach: rn(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
      (e[o] = on(o, !1, !1)),
        (n[o] = on(o, !0, !1)),
        (t[o] = on(o, !1, !0)),
        (s[o] = on(o, !0, !0));
    }),
    [e, n, t, s]
  );
}
const [ii, li, ci, ui] = oi();
function Jn(e, t) {
  const n = t ? (e ? ui : ci) : e ? li : ii;
  return (s, r, o) =>
    r === "__v_isReactive"
      ? !e
      : r === "__v_isReadonly"
      ? e
      : r === "__v_raw"
      ? s
      : Reflect.get(W(n, r) && r in s ? n : s, r, o);
}
const ai = { get: Jn(!1, !1) },
  fi = { get: Jn(!1, !0) },
  di = { get: Jn(!0, !1) },
  er = new WeakMap(),
  tr = new WeakMap(),
  nr = new WeakMap(),
  hi = new WeakMap();
function pi(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function _i(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : pi(So(e));
}
function ln(e) {
  return e && e.__v_isReadonly ? e : Yn(e, !1, Ys, ai, er);
}
function gi(e) {
  return Yn(e, !1, ri, fi, tr);
}
function Vn(e) {
  return Yn(e, !0, si, di, nr);
}
function Yn(e, t, n, s, r) {
  if (!ie(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const o = r.get(e);
  if (o) return o;
  const i = _i(e);
  if (i === 0) return e;
  const l = new Proxy(e, i === 2 ? s : n);
  return r.set(e, l), l;
}
function vt(e) {
  return Xn(e) ? vt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Xn(e) {
  return !!(e && e.__v_isReadonly);
}
function sr(e) {
  return vt(e) || Xn(e);
}
function z(e) {
  const t = e && e.__v_raw;
  return t ? z(t) : e;
}
function Mt(e) {
  return Qt(e, "__v_skip", !0), e;
}
const Ot = (e) => (ie(e) ? ln(e) : e),
  Zn = (e) => (ie(e) ? Vn(e) : e);
function rr(e) {
  Ws() && ((e = z(e)), e.dep || (e.dep = Hn()), qs(e.dep));
}
function or(e, t) {
  (e = z(e)), e.dep && Wn(e.dep);
}
function he(e) {
  return Boolean(e && e.__v_isRef === !0);
}
function st(e) {
  return ir(e, !1);
}
function mi(e) {
  return ir(e, !0);
}
function ir(e, t) {
  return he(e) ? e : new vi(e, t);
}
class vi {
  constructor(t, n) {
    (this._shallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : z(t)),
      (this._value = n ? t : Ot(t));
  }
  get value() {
    return rr(this), this._value;
  }
  set value(t) {
    (t = this._shallow ? t : z(t)),
      Pt(t, this._rawValue) &&
        ((this._rawValue = t),
        (this._value = this._shallow ? t : Ot(t)),
        or(this));
  }
}
function L(e) {
  return he(e) ? e.value : e;
}
const bi = {
  get: (e, t, n) => L(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return he(r) && !he(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, s);
  },
};
function lr(e) {
  return vt(e) ? e : new Proxy(e, bi);
}
function cr(e) {
  const t = F(e) ? new Array(e.length) : {};
  for (const n in e) t[n] = xi(e, n);
  return t;
}
class yi {
  constructor(t, n, s) {
    (this._object = t),
      (this._key = n),
      (this._defaultValue = s),
      (this.__v_isRef = !0);
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
}
function xi(e, t, n) {
  const s = e[t];
  return he(s) ? s : new yi(e, t, n);
}
class wi {
  constructor(t, n, s) {
    (this._setter = n),
      (this.dep = void 0),
      (this._dirty = !0),
      (this.__v_isRef = !0),
      (this.effect = new Dn(t, () => {
        this._dirty || ((this._dirty = !0), or(this));
      })),
      (this.__v_isReadonly = s);
  }
  get value() {
    const t = z(this);
    return (
      rr(t),
      t._dirty && ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
function J(e, t) {
  let n, s;
  const r = S(e);
  return (
    r ? ((n = e), (s = Pe)) : ((n = e.get), (s = e.set)), new wi(n, s, r || !s)
  );
}
Promise.resolve();
function Ei(e, t, ...n) {
  const s = e.vnode.props || Z;
  let r = n;
  const o = t.startsWith("update:"),
    i = o && t.slice(7);
  if (i && i in s) {
    const h = `${i === "modelValue" ? "model" : i}Modifiers`,
      { number: v, trim: w } = s[h] || Z;
    w ? (r = n.map((C) => C.trim())) : v && (r = n.map(Uo));
  }
  let l,
    u = s[(l = Nn(t))] || s[(l = Nn(Fe(t)))];
  !u && o && (u = s[(l = Nn(_t(t)))]), u && Me(u, e, 6, r);
  const f = s[l + "Once"];
  if (f) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    (e.emitted[l] = !0), Me(f, e, 6, r);
  }
}
function ur(e, t, n = !1) {
  const s = t.emitsCache,
    r = s.get(e);
  if (r !== void 0) return r;
  const o = e.emits;
  let i = {},
    l = !1;
  if (!S(e)) {
    const u = (f) => {
      const h = ur(f, t, !0);
      h && ((l = !0), ge(i, h));
    };
    !n && t.mixins.length && t.mixins.forEach(u),
      e.extends && u(e.extends),
      e.mixins && e.mixins.forEach(u);
  }
  return !o && !l
    ? (s.set(e, null), null)
    : (F(o) ? o.forEach((u) => (i[u] = null)) : ge(i, o), s.set(e, i), i);
}
function Qn(e, t) {
  return !e || !Tt(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      W(e, t[0].toLowerCase() + t.slice(1)) || W(e, _t(t)) || W(e, t));
}
let Ae = null,
  cn = null;
function un(e) {
  const t = Ae;
  return (Ae = e), (cn = (e && e.type.__scopeId) || null), t;
}
function ar(e) {
  cn = e;
}
function fr() {
  cn = null;
}
function Ue(e, t = Ae, n) {
  if (!t || e._n) return e;
  const s = (...r) => {
    s._d && Or(-1);
    const o = un(t),
      i = e(...r);
    return un(o), s._d && Or(1), i;
  };
  return (s._n = !0), (s._c = !0), (s._d = !0), s;
}
function Gn(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: r,
    props: o,
    propsOptions: [i],
    slots: l,
    attrs: u,
    emit: f,
    render: h,
    renderCache: v,
    data: w,
    setupState: C,
    ctx: T,
    inheritAttrs: H,
  } = e;
  let g, b;
  const M = un(e);
  try {
    if (n.shapeFlag & 4) {
      const P = r || s;
      (g = Ie(h.call(P, P, v, o, C, w, T))), (b = u);
    } else {
      const P = t;
      (g = Ie(
        P.length > 1 ? P(o, { attrs: u, slots: l, emit: f }) : P(o, null)
      )),
        (b = t.props ? u : $i(u));
    }
  } catch (P) {
    (St.length = 0), Dt(P, e, 1), (g = N(De));
  }
  let D = g;
  if (b && H !== !1) {
    const P = Object.keys(b),
      { shapeFlag: V } = D;
    P.length &&
      V & (1 | 6) &&
      (i && P.some(Mn) && (b = Ci(b, i)), (D = Bt(D, b)));
  }
  return (
    n.dirs && (D.dirs = D.dirs ? D.dirs.concat(n.dirs) : n.dirs),
    n.transition && (D.transition = n.transition),
    (g = D),
    un(M),
    g
  );
}
const $i = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || Tt(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  Ci = (e, t) => {
    const n = {};
    for (const s in e) (!Mn(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
    return n;
  };
function ki(e, t, n) {
  const { props: s, children: r, component: o } = e,
    { props: i, children: l, patchFlag: u } = t,
    f = o.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && u >= 0) {
    if (u & 1024) return !0;
    if (u & 16) return s ? dr(s, i, f) : !!i;
    if (u & 8) {
      const h = t.dynamicProps;
      for (let v = 0; v < h.length; v++) {
        const w = h[v];
        if (i[w] !== s[w] && !Qn(f, w)) return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable)
      ? !0
      : s === i
      ? !1
      : s
      ? i
        ? dr(s, i, f)
        : !0
      : !!i;
  return !1;
}
function dr(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length) return !0;
  for (let r = 0; r < s.length; r++) {
    const o = s[r];
    if (t[o] !== e[o] && !Qn(n, o)) return !0;
  }
  return !1;
}
function Ti({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const Li = (e) => e.__isSuspense;
function hr(e, t) {
  t && t.pendingBranch
    ? F(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : El(e);
}
function Pi(e, t) {
  if (ce) {
    let n = ce.provides;
    const s = ce.parent && ce.parent.provides;
    s === n && (n = ce.provides = Object.create(s)), (n[e] = t);
  }
}
function Rt(e, t, n = !1) {
  const s = ce || Ae;
  if (s) {
    const r =
      s.parent == null
        ? s.vnode.appContext && s.vnode.appContext.provides
        : s.parent.provides;
    if (r && e in r) return r[e];
    if (arguments.length > 1) return n && S(t) ? t.call(s.proxy) : t;
  }
}
function le(e) {
  return S(e) ? { setup: e, name: e.name } : e;
}
const an = (e) => !!e.type.__asyncLoader;
function Ai(e) {
  S(e) && (e = { loader: e });
  const {
    loader: t,
    loadingComponent: n,
    errorComponent: s,
    delay: r = 200,
    timeout: o,
    suspensible: i = !0,
    onError: l,
  } = e;
  let u = null,
    f,
    h = 0;
  const v = () => (h++, (u = null), w()),
    w = () => {
      let C;
      return (
        u ||
        (C = u =
          t()
            .catch((T) => {
              if (((T = T instanceof Error ? T : new Error(String(T))), l))
                return new Promise((H, g) => {
                  l(
                    T,
                    () => H(v()),
                    () => g(T),
                    h + 1
                  );
                });
              throw T;
            })
            .then((T) =>
              C !== u && u
                ? u
                : (T &&
                    (T.__esModule || T[Symbol.toStringTag] === "Module") &&
                    (T = T.default),
                  (f = T),
                  T)
            ))
      );
    };
  return le({
    name: "AsyncComponentWrapper",
    __asyncLoader: w,
    get __asyncResolved() {
      return f;
    },
    setup() {
      const C = ce;
      if (f) return () => es(f, C);
      const T = (M) => {
        (u = null), Dt(M, C, 13, !s);
      };
      if ((i && C.suspense) || jt)
        return w()
          .then((M) => () => es(M, C))
          .catch((M) => (T(M), () => (s ? N(s, { error: M }) : null)));
      const H = st(!1),
        g = st(),
        b = st(!!r);
      return (
        r &&
          setTimeout(() => {
            b.value = !1;
          }, r),
        o != null &&
          setTimeout(() => {
            if (!H.value && !g.value) {
              const M = new Error(`Async component timed out after ${o}ms.`);
              T(M), (g.value = M);
            }
          }, o),
        w()
          .then(() => {
            (H.value = !0),
              C.parent && ts(C.parent.vnode) && gs(C.parent.update);
          })
          .catch((M) => {
            T(M), (g.value = M);
          }),
        () => {
          if (H.value && f) return es(f, C);
          if (g.value && s) return N(s, { error: g.value });
          if (n && !b.value) return N(n);
        }
      );
    },
  });
}
function es(e, { vnode: { ref: t, props: n, children: s } }) {
  const r = N(e, n, s);
  return (r.ref = t), r;
}
const ts = (e) => e.type.__isKeepAlive;
function Ii(e, t) {
  pr(e, "a", t);
}
function Mi(e, t) {
  pr(e, "da", t);
}
function pr(e, t, n = ce) {
  const s =
    e.__wdc ||
    (e.__wdc = () => {
      let r = n;
      for (; r; ) {
        if (r.isDeactivated) return;
        r = r.parent;
      }
      return e();
    });
  if ((fn(t, s, n), n)) {
    let r = n.parent;
    for (; r && r.parent; )
      ts(r.parent.vnode) && Oi(s, t, n, r), (r = r.parent);
  }
}
function Oi(e, t, n, s) {
  const r = fn(t, e, s, !0);
  dn(() => {
    On(s[t], r);
  }, n);
}
function fn(e, t, n = ce, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []),
      o =
        t.__weh ||
        (t.__weh = (...i) => {
          if (n.isUnmounted) return;
          mt(), yt(n);
          const l = Me(t, n, e, i);
          return lt(), nt(), l;
        });
    return s ? r.unshift(o) : r.push(o), o;
  }
}
const je =
    (e) =>
    (t, n = ce) =>
      (!jt || e === "sp") && fn(e, t, n),
  Ri = je("bm"),
  bt = je("m"),
  Fi = je("bu"),
  _r = je("u"),
  Ni = je("bum"),
  dn = je("um"),
  Si = je("sp"),
  Hi = je("rtg"),
  Bi = je("rtc");
function Ui(e, t = ce) {
  fn("ec", e, t);
}
let ns = !0;
function ji(e) {
  const t = vr(e),
    n = e.proxy,
    s = e.ctx;
  (ns = !1), t.beforeCreate && gr(t.beforeCreate, e, "bc");
  const {
    data: r,
    computed: o,
    methods: i,
    watch: l,
    provide: u,
    inject: f,
    created: h,
    beforeMount: v,
    mounted: w,
    beforeUpdate: C,
    updated: T,
    activated: H,
    deactivated: g,
    beforeDestroy: b,
    beforeUnmount: M,
    destroyed: D,
    unmounted: P,
    render: V,
    renderTracked: X,
    renderTriggered: B,
    errorCaptured: se,
    serverPrefetch: te,
    expose: re,
    inheritAttrs: de,
    components: U,
    directives: oe,
    filters: ve,
  } = t;
  if ((f && Di(f, s, null, e.appContext.config.unwrapInjectedRef), i))
    for (const ne in i) {
      const Q = i[ne];
      S(Q) && (s[ne] = Q.bind(n));
    }
  if (r) {
    const ne = r.call(n, n);
    ie(ne) && (e.data = ln(ne));
  }
  if (((ns = !0), o))
    for (const ne in o) {
      const Q = o[ne],
        Se = S(Q) ? Q.bind(n, n) : S(Q.get) ? Q.get.bind(n, n) : Pe,
        Tn = !S(Q) && S(Q.set) ? Q.set.bind(n) : Pe,
        Ct = J({ get: Se, set: Tn });
      Object.defineProperty(s, ne, {
        enumerable: !0,
        configurable: !0,
        get: () => Ct.value,
        set: (at) => (Ct.value = at),
      });
    }
  if (l) for (const ne in l) mr(l[ne], s, n, ne);
  if (u) {
    const ne = S(u) ? u.call(n) : u;
    Reflect.ownKeys(ne).forEach((Q) => {
      Pi(Q, ne[Q]);
    });
  }
  h && gr(h, e, "c");
  function be(ne, Q) {
    F(Q) ? Q.forEach((Se) => ne(Se.bind(n))) : Q && ne(Q.bind(n));
  }
  if (
    (be(Ri, v),
    be(bt, w),
    be(Fi, C),
    be(_r, T),
    be(Ii, H),
    be(Mi, g),
    be(Ui, se),
    be(Bi, X),
    be(Hi, B),
    be(Ni, M),
    be(dn, P),
    be(Si, te),
    F(re))
  )
    if (re.length) {
      const ne = e.exposed || (e.exposed = {});
      re.forEach((Q) => {
        Object.defineProperty(ne, Q, {
          get: () => n[Q],
          set: (Se) => (n[Q] = Se),
        });
      });
    } else e.exposed || (e.exposed = {});
  V && e.render === Pe && (e.render = V),
    de != null && (e.inheritAttrs = de),
    U && (e.components = U),
    oe && (e.directives = oe);
}
function Di(e, t, n = Pe, s = !1) {
  F(e) && (e = ss(e));
  for (const r in e) {
    const o = e[r];
    let i;
    ie(o)
      ? "default" in o
        ? (i = Rt(o.from || r, o.default, !0))
        : (i = Rt(o.from || r))
      : (i = Rt(o)),
      he(i) && s
        ? Object.defineProperty(t, r, {
            enumerable: !0,
            configurable: !0,
            get: () => i.value,
            set: (l) => (i.value = l),
          })
        : (t[r] = i);
  }
}
function gr(e, t, n) {
  Me(F(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function mr(e, t, n, s) {
  const r = s.includes(".") ? Jr(n, s) : () => n[s];
  if (ue(e)) {
    const o = t[e];
    S(o) && ct(r, o);
  } else if (S(e)) ct(r, e.bind(n));
  else if (ie(e))
    if (F(e)) e.forEach((o) => mr(o, t, n, s));
    else {
      const o = S(e.handler) ? e.handler.bind(n) : t[e.handler];
      S(o) && ct(r, o, e);
    }
}
function vr(e) {
  const t = e.type,
    { mixins: n, extends: s } = t,
    {
      mixins: r,
      optionsCache: o,
      config: { optionMergeStrategies: i },
    } = e.appContext,
    l = o.get(t);
  let u;
  return (
    l
      ? (u = l)
      : !r.length && !n && !s
      ? (u = t)
      : ((u = {}), r.length && r.forEach((f) => hn(u, f, i, !0)), hn(u, t, i)),
    o.set(t, u),
    u
  );
}
function hn(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && hn(e, o, n, !0), r && r.forEach((i) => hn(e, i, n, !0));
  for (const i in t)
    if (!(s && i === "expose")) {
      const l = Ki[i] || (n && n[i]);
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const Ki = {
  data: br,
  props: rt,
  emits: rt,
  methods: rt,
  computed: rt,
  beforeCreate: me,
  created: me,
  beforeMount: me,
  mounted: me,
  beforeUpdate: me,
  updated: me,
  beforeDestroy: me,
  beforeUnmount: me,
  destroyed: me,
  unmounted: me,
  activated: me,
  deactivated: me,
  errorCaptured: me,
  serverPrefetch: me,
  components: rt,
  directives: rt,
  watch: qi,
  provide: br,
  inject: Wi,
};
function br(e, t) {
  return t
    ? e
      ? function () {
          return ge(
            S(e) ? e.call(this, this) : e,
            S(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function Wi(e, t) {
  return rt(ss(e), ss(t));
}
function ss(e) {
  if (F(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function me(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function rt(e, t) {
  return e ? ge(ge(Object.create(null), e), t) : t;
}
function qi(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = ge(Object.create(null), e);
  for (const s in t) n[s] = me(e[s], t[s]);
  return n;
}
function zi(e, t, n, s = !1) {
  const r = {},
    o = {};
  Qt(o, vn, 1), (e.propsDefaults = Object.create(null)), yr(e, t, r, o);
  for (const i in e.propsOptions[0]) i in r || (r[i] = void 0);
  n ? (e.props = s ? r : gi(r)) : e.type.props ? (e.props = r) : (e.props = o),
    (e.attrs = o);
}
function Ji(e, t, n, s) {
  const {
      props: r,
      attrs: o,
      vnode: { patchFlag: i },
    } = e,
    l = z(r),
    [u] = e.propsOptions;
  let f = !1;
  if ((s || i > 0) && !(i & 16)) {
    if (i & 8) {
      const h = e.vnode.dynamicProps;
      for (let v = 0; v < h.length; v++) {
        let w = h[v];
        const C = t[w];
        if (u)
          if (W(o, w)) C !== o[w] && ((o[w] = C), (f = !0));
          else {
            const T = Fe(w);
            r[T] = rs(u, l, T, C, e, !1);
          }
        else C !== o[w] && ((o[w] = C), (f = !0));
      }
    }
  } else {
    yr(e, t, r, o) && (f = !0);
    let h;
    for (const v in l)
      (!t || (!W(t, v) && ((h = _t(v)) === v || !W(t, h)))) &&
        (u
          ? n &&
            (n[v] !== void 0 || n[h] !== void 0) &&
            (r[v] = rs(u, l, v, void 0, e, !0))
          : delete r[v]);
    if (o !== l) for (const v in o) (!t || !W(t, v)) && (delete o[v], (f = !0));
  }
  f && Be(e, "set", "$attrs");
}
function yr(e, t, n, s) {
  const [r, o] = e.propsOptions;
  let i = !1,
    l;
  if (t)
    for (let u in t) {
      if (Lt(u)) continue;
      const f = t[u];
      let h;
      r && W(r, (h = Fe(u)))
        ? !o || !o.includes(h)
          ? (n[h] = f)
          : ((l || (l = {}))[h] = f)
        : Qn(e.emitsOptions, u) ||
          ((!(u in s) || f !== s[u]) && ((s[u] = f), (i = !0)));
    }
  if (o) {
    const u = z(n),
      f = l || Z;
    for (let h = 0; h < o.length; h++) {
      const v = o[h];
      n[v] = rs(r, u, v, f[v], e, !W(f, v));
    }
  }
  return i;
}
function rs(e, t, n, s, r, o) {
  const i = e[n];
  if (i != null) {
    const l = W(i, "default");
    if (l && s === void 0) {
      const u = i.default;
      if (i.type !== Function && S(u)) {
        const { propsDefaults: f } = r;
        n in f ? (s = f[n]) : (yt(r), (s = f[n] = u.call(null, t)), lt());
      } else s = u;
    }
    i[0] &&
      (o && !l ? (s = !1) : i[1] && (s === "" || s === _t(n)) && (s = !0));
  }
  return s;
}
function xr(e, t, n = !1) {
  const s = t.propsCache,
    r = s.get(e);
  if (r) return r;
  const o = e.props,
    i = {},
    l = [];
  let u = !1;
  if (!S(e)) {
    const h = (v) => {
      u = !0;
      const [w, C] = xr(v, t, !0);
      ge(i, w), C && l.push(...C);
    };
    !n && t.mixins.length && t.mixins.forEach(h),
      e.extends && h(e.extends),
      e.mixins && e.mixins.forEach(h);
  }
  if (!o && !u) return s.set(e, ht), ht;
  if (F(o))
    for (let h = 0; h < o.length; h++) {
      const v = Fe(o[h]);
      wr(v) && (i[v] = Z);
    }
  else if (o)
    for (const h in o) {
      const v = Fe(h);
      if (wr(v)) {
        const w = o[h],
          C = (i[v] = F(w) || S(w) ? { type: w } : w);
        if (C) {
          const T = Cr(Boolean, C.type),
            H = Cr(String, C.type);
          (C[0] = T > -1),
            (C[1] = H < 0 || T < H),
            (T > -1 || W(C, "default")) && l.push(v);
        }
      }
    }
  const f = [i, l];
  return s.set(e, f), f;
}
function wr(e) {
  return e[0] !== "$";
}
function Er(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/);
  return t ? t[1] : e === null ? "null" : "";
}
function $r(e, t) {
  return Er(e) === Er(t);
}
function Cr(e, t) {
  return F(t) ? t.findIndex((n) => $r(n, e)) : S(t) && $r(t, e) ? 0 : -1;
}
const kr = (e) => e[0] === "_" || e === "$stable",
  os = (e) => (F(e) ? e.map(Ie) : [Ie(e)]),
  Vi = (e, t, n) => {
    const s = Ue((...r) => os(t(...r)), n);
    return (s._c = !1), s;
  },
  Tr = (e, t, n) => {
    const s = e._ctx;
    for (const r in e) {
      if (kr(r)) continue;
      const o = e[r];
      if (S(o)) t[r] = Vi(r, o, s);
      else if (o != null) {
        const i = os(o);
        t[r] = () => i;
      }
    }
  },
  Lr = (e, t) => {
    const n = os(t);
    e.slots.default = () => n;
  },
  Yi = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = z(t)), Qt(t, "_", n)) : Tr(t, (e.slots = {}));
    } else (e.slots = {}), t && Lr(e, t);
    Qt(e.slots, vn, 1);
  },
  Xi = (e, t, n) => {
    const { vnode: s, slots: r } = e;
    let o = !0,
      i = Z;
    if (s.shapeFlag & 32) {
      const l = t._;
      l
        ? n && l === 1
          ? (o = !1)
          : (ge(r, t), !n && l === 1 && delete r._)
        : ((o = !t.$stable), Tr(t, r)),
        (i = t);
    } else t && (Lr(e, t), (i = { default: 1 }));
    if (o) for (const l in r) !kr(l) && !(l in i) && delete r[l];
  };
function Ne(e, t, n, s) {
  const r = e.dirs,
    o = t && t.dirs;
  for (let i = 0; i < r.length; i++) {
    const l = r[i];
    o && (l.oldValue = o[i].value);
    let u = l.dir[s];
    u && (mt(), Me(u, n, 8, [e.el, l, e, t]), nt());
  }
}
function Pr() {
  return {
    app: null,
    config: {
      isNativeTag: Ro,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let Zi = 0;
function Qi(e, t) {
  return function (s, r = null) {
    r != null && !ie(r) && (r = null);
    const o = Pr(),
      i = new Set();
    let l = !1;
    const u = (o.app = {
      _uid: Zi++,
      _component: s,
      _props: r,
      _container: null,
      _context: o,
      _instance: null,
      version: kl,
      get config() {
        return o.config;
      },
      set config(f) {},
      use(f, ...h) {
        return (
          i.has(f) ||
            (f && S(f.install)
              ? (i.add(f), f.install(u, ...h))
              : S(f) && (i.add(f), f(u, ...h))),
          u
        );
      },
      mixin(f) {
        return o.mixins.includes(f) || o.mixins.push(f), u;
      },
      component(f, h) {
        return h ? ((o.components[f] = h), u) : o.components[f];
      },
      directive(f, h) {
        return h ? ((o.directives[f] = h), u) : o.directives[f];
      },
      mount(f, h, v) {
        if (!l) {
          const w = N(s, r);
          return (
            (w.appContext = o),
            h && t ? t(w, f) : e(w, f, v),
            (l = !0),
            (u._container = f),
            (f.__vue_app__ = u),
            ds(w.component) || w.component.proxy
          );
        }
      },
      unmount() {
        l && (e(null, u._container), delete u._container.__vue_app__);
      },
      provide(f, h) {
        return (o.provides[f] = h), u;
      },
    });
    return u;
  };
}
function pn(e, t, n, s, r = !1) {
  if (F(e)) {
    e.forEach((w, C) => pn(w, t && (F(t) ? t[C] : t), n, s, r));
    return;
  }
  if (an(s) && !r) return;
  const o = s.shapeFlag & 4 ? ds(s.component) || s.component.proxy : s.el,
    i = r ? null : o,
    { i: l, r: u } = e,
    f = t && t.r,
    h = l.refs === Z ? (l.refs = {}) : l.refs,
    v = l.setupState;
  if (
    (f != null &&
      f !== u &&
      (ue(f)
        ? ((h[f] = null), W(v, f) && (v[f] = null))
        : he(f) && (f.value = null)),
    S(u))
  )
    Ye(u, l, 12, [i, h]);
  else {
    const w = ue(u),
      C = he(u);
    if (w || C) {
      const T = () => {
        if (e.f) {
          const H = w ? h[u] : u.value;
          r
            ? F(H) && On(H, o)
            : F(H)
            ? H.includes(o) || H.push(o)
            : w
            ? (h[u] = [o])
            : ((u.value = [o]), e.k && (h[e.k] = u.value));
        } else
          w
            ? ((h[u] = i), W(v, u) && (v[u] = i))
            : he(u) && ((u.value = i), e.k && (h[e.k] = i));
      };
      i ? ((T.id = -1), ye(T, n)) : T();
    }
  }
}
let Je = !1;
const _n = (e) => /svg/.test(e.namespaceURI) && e.tagName !== "foreignObject",
  is = (e) => e.nodeType === 8;
function Gi(e) {
  const {
      mt: t,
      p: n,
      o: {
        patchProp: s,
        nextSibling: r,
        parentNode: o,
        remove: i,
        insert: l,
        createComment: u,
      },
    } = e,
    f = (g, b) => {
      if (!b.hasChildNodes()) {
        n(null, g, b), wn();
        return;
      }
      (Je = !1),
        h(b.firstChild, g, null, null, null),
        wn(),
        Je && console.error("Hydration completed but contains mismatches.");
    },
    h = (g, b, M, D, P, V = !1) => {
      const X = is(g) && g.data === "[",
        B = () => T(g, b, M, D, P, X),
        { type: se, ref: te, shapeFlag: re } = b,
        de = g.nodeType;
      b.el = g;
      let U = null;
      switch (se) {
        case Ft:
          de !== 3
            ? (U = B())
            : (g.data !== b.children && ((Je = !0), (g.data = b.children)),
              (U = r(g)));
          break;
        case De:
          de !== 8 || X ? (U = B()) : (U = r(g));
          break;
        case Nt:
          if (de !== 1) U = B();
          else {
            U = g;
            const oe = !b.children.length;
            for (let ve = 0; ve < b.staticCount; ve++)
              oe && (b.children += U.outerHTML),
                ve === b.staticCount - 1 && (b.anchor = U),
                (U = r(U));
            return U;
          }
          break;
        case ae:
          X ? (U = C(g, b, M, D, P, V)) : (U = B());
          break;
        default:
          if (re & 1)
            de !== 1 || b.type.toLowerCase() !== g.tagName.toLowerCase()
              ? (U = B())
              : (U = v(g, b, M, D, P, V));
          else if (re & 6) {
            b.slotScopeIds = P;
            const oe = o(g);
            if (
              (t(b, oe, null, M, D, _n(oe), V), (U = X ? H(g) : r(g)), an(b))
            ) {
              let ve;
              X
                ? ((ve = N(ae)),
                  (ve.anchor = U ? U.previousSibling : oe.lastChild))
                : (ve = g.nodeType === 3 ? Ut("") : N("div")),
                (ve.el = g),
                (b.component.subTree = ve);
            }
          } else
            re & 64
              ? de !== 8
                ? (U = B())
                : (U = b.type.hydrate(g, b, M, D, P, V, e, w))
              : re & 128 &&
                (U = b.type.hydrate(g, b, M, D, _n(o(g)), P, V, e, h));
      }
      return te != null && pn(te, null, D, b), U;
    },
    v = (g, b, M, D, P, V) => {
      V = V || !!b.dynamicChildren;
      const { type: X, props: B, patchFlag: se, shapeFlag: te, dirs: re } = b,
        de = (X === "input" && re) || X === "option";
      if (de || se !== -1) {
        if ((re && Ne(b, null, M, "created"), B))
          if (de || !V || se & (16 | 32))
            for (const oe in B)
              ((de && oe.endsWith("value")) || (Tt(oe) && !Lt(oe))) &&
                s(g, oe, null, B[oe], !1, void 0, M);
          else B.onClick && s(g, "onClick", null, B.onClick, !1, void 0, M);
        let U;
        if (
          ((U = B && B.onVnodeBeforeMount) && Ce(U, M, b),
          re && Ne(b, null, M, "beforeMount"),
          ((U = B && B.onVnodeMounted) || re) &&
            hr(() => {
              U && Ce(U, M, b), re && Ne(b, null, M, "mounted");
            }, D),
          te & 16 && !(B && (B.innerHTML || B.textContent)))
        ) {
          let oe = w(g.firstChild, b, g, M, D, P, V);
          for (; oe; ) {
            Je = !0;
            const ve = oe;
            (oe = oe.nextSibling), i(ve);
          }
        } else
          te & 8 &&
            g.textContent !== b.children &&
            ((Je = !0), (g.textContent = b.children));
      }
      return g.nextSibling;
    },
    w = (g, b, M, D, P, V, X) => {
      X = X || !!b.dynamicChildren;
      const B = b.children,
        se = B.length;
      for (let te = 0; te < se; te++) {
        const re = X ? B[te] : (B[te] = Ie(B[te]));
        if (g) g = h(g, re, D, P, V, X);
        else {
          if (re.type === Ft && !re.children) continue;
          (Je = !0), n(null, re, M, null, D, P, _n(M), V);
        }
      }
      return g;
    },
    C = (g, b, M, D, P, V) => {
      const { slotScopeIds: X } = b;
      X && (P = P ? P.concat(X) : X);
      const B = o(g),
        se = w(r(g), b, B, M, D, P, V);
      return se && is(se) && se.data === "]"
        ? r((b.anchor = se))
        : ((Je = !0), l((b.anchor = u("]")), B, se), se);
    },
    T = (g, b, M, D, P, V) => {
      if (((Je = !0), (b.el = null), V)) {
        const se = H(g);
        for (;;) {
          const te = r(g);
          if (te && te !== se) i(te);
          else break;
        }
      }
      const X = r(g),
        B = o(g);
      return i(g), n(null, b, B, X, M, D, _n(B), P), X;
    },
    H = (g) => {
      let b = 0;
      for (; g; )
        if (
          ((g = r(g)), g && is(g) && (g.data === "[" && b++, g.data === "]"))
        ) {
          if (b === 0) return r(g);
          b--;
        }
      return g;
    };
  return [f, h];
}
const ye = hr;
function el(e) {
  return tl(e, Gi);
}
function tl(e, t) {
  const n = jo();
  n.__VUE__ = !0;
  const {
      insert: s,
      remove: r,
      patchProp: o,
      createElement: i,
      createText: l,
      createComment: u,
      setText: f,
      setElementText: h,
      parentNode: v,
      nextSibling: w,
      setScopeId: C = Pe,
      cloneNode: T,
      insertStaticContent: H,
    } = e,
    g = (
      c,
      a,
      d,
      _ = null,
      p = null,
      x = null,
      $ = !1,
      y = null,
      E = !!a.dynamicChildren
    ) => {
      if (c === a) return;
      c && !Ht(c, a) && ((_ = Vt(c)), We(c, p, x, !0), (c = null)),
        a.patchFlag === -2 && ((E = !1), (a.dynamicChildren = null));
      const { type: m, ref: A, shapeFlag: k } = a;
      switch (m) {
        case Ft:
          b(c, a, d, _);
          break;
        case De:
          M(c, a, d, _);
          break;
        case Nt:
          c == null && D(a, d, _, $);
          break;
        case ae:
          oe(c, a, d, _, p, x, $, y, E);
          break;
        default:
          k & 1
            ? X(c, a, d, _, p, x, $, y, E)
            : k & 6
            ? ve(c, a, d, _, p, x, $, y, E)
            : (k & 64 || k & 128) && m.process(c, a, d, _, p, x, $, y, E, ft);
      }
      A != null && p && pn(A, c && c.ref, x, a || c, !a);
    },
    b = (c, a, d, _) => {
      if (c == null) s((a.el = l(a.children)), d, _);
      else {
        const p = (a.el = c.el);
        a.children !== c.children && f(p, a.children);
      }
    },
    M = (c, a, d, _) => {
      c == null ? s((a.el = u(a.children || "")), d, _) : (a.el = c.el);
    },
    D = (c, a, d, _) => {
      [c.el, c.anchor] = H(c.children, a, d, _);
    },
    P = ({ el: c, anchor: a }, d, _) => {
      let p;
      for (; c && c !== a; ) (p = w(c)), s(c, d, _), (c = p);
      s(a, d, _);
    },
    V = ({ el: c, anchor: a }) => {
      let d;
      for (; c && c !== a; ) (d = w(c)), r(c), (c = d);
      r(a);
    },
    X = (c, a, d, _, p, x, $, y, E) => {
      ($ = $ || a.type === "svg"),
        c == null ? B(a, d, _, p, x, $, y, E) : re(c, a, p, x, $, y, E);
    },
    B = (c, a, d, _, p, x, $, y) => {
      let E, m;
      const {
        type: A,
        props: k,
        shapeFlag: I,
        transition: O,
        patchFlag: K,
        dirs: ee,
      } = c;
      if (c.el && T !== void 0 && K === -1) E = c.el = T(c.el);
      else {
        if (
          ((E = c.el = i(c.type, x, k && k.is, k)),
          I & 8
            ? h(E, c.children)
            : I & 16 &&
              te(c.children, E, null, _, p, x && A !== "foreignObject", $, y),
          ee && Ne(c, null, _, "created"),
          k)
        ) {
          for (const G in k)
            G !== "value" &&
              !Lt(G) &&
              o(E, G, null, k[G], x, c.children, _, p, He);
          "value" in k && o(E, "value", null, k.value),
            (m = k.onVnodeBeforeMount) && Ce(m, _, c);
        }
        se(E, c, c.scopeId, $, _);
      }
      ee && Ne(c, null, _, "beforeMount");
      const Y = (!p || (p && !p.pendingBranch)) && O && !O.persisted;
      Y && O.beforeEnter(E),
        s(E, a, d),
        ((m = k && k.onVnodeMounted) || Y || ee) &&
          ye(() => {
            m && Ce(m, _, c), Y && O.enter(E), ee && Ne(c, null, _, "mounted");
          }, p);
    },
    se = (c, a, d, _, p) => {
      if ((d && C(c, d), _)) for (let x = 0; x < _.length; x++) C(c, _[x]);
      if (p) {
        let x = p.subTree;
        if (a === x) {
          const $ = p.vnode;
          se(c, $, $.scopeId, $.slotScopeIds, p.parent);
        }
      }
    },
    te = (c, a, d, _, p, x, $, y, E = 0) => {
      for (let m = E; m < c.length; m++) {
        const A = (c[m] = y ? Ve(c[m]) : Ie(c[m]));
        g(null, A, a, d, _, p, x, $, y);
      }
    },
    re = (c, a, d, _, p, x, $) => {
      const y = (a.el = c.el);
      let { patchFlag: E, dynamicChildren: m, dirs: A } = a;
      E |= c.patchFlag & 16;
      const k = c.props || Z,
        I = a.props || Z;
      let O;
      d && ot(d, !1),
        (O = I.onVnodeBeforeUpdate) && Ce(O, d, a, c),
        A && Ne(a, c, d, "beforeUpdate"),
        d && ot(d, !0);
      const K = p && a.type !== "foreignObject";
      if (
        (m
          ? de(c.dynamicChildren, m, y, d, _, K, x)
          : $ || Se(c, a, y, null, d, _, K, x, !1),
        E > 0)
      ) {
        if (E & 16) U(y, a, k, I, d, _, p);
        else if (
          (E & 2 && k.class !== I.class && o(y, "class", null, I.class, p),
          E & 4 && o(y, "style", k.style, I.style, p),
          E & 8)
        ) {
          const ee = a.dynamicProps;
          for (let Y = 0; Y < ee.length; Y++) {
            const G = ee[Y],
              Le = k[G],
              dt = I[G];
            (dt !== Le || G === "value") &&
              o(y, G, Le, dt, p, c.children, d, _, He);
          }
        }
        E & 1 && c.children !== a.children && h(y, a.children);
      } else !$ && m == null && U(y, a, k, I, d, _, p);
      ((O = I.onVnodeUpdated) || A) &&
        ye(() => {
          O && Ce(O, d, a, c), A && Ne(a, c, d, "updated");
        }, _);
    },
    de = (c, a, d, _, p, x, $) => {
      for (let y = 0; y < a.length; y++) {
        const E = c[y],
          m = a[y],
          A =
            E.el && (E.type === ae || !Ht(E, m) || E.shapeFlag & (6 | 64))
              ? v(E.el)
              : d;
        g(E, m, A, null, _, p, x, $, !0);
      }
    },
    U = (c, a, d, _, p, x, $) => {
      if (d !== _) {
        for (const y in _) {
          if (Lt(y)) continue;
          const E = _[y],
            m = d[y];
          E !== m && y !== "value" && o(c, y, m, E, $, a.children, p, x, He);
        }
        if (d !== Z)
          for (const y in d)
            !Lt(y) && !(y in _) && o(c, y, d[y], null, $, a.children, p, x, He);
        "value" in _ && o(c, "value", d.value, _.value);
      }
    },
    oe = (c, a, d, _, p, x, $, y, E) => {
      const m = (a.el = c ? c.el : l("")),
        A = (a.anchor = c ? c.anchor : l(""));
      let { patchFlag: k, dynamicChildren: I, slotScopeIds: O } = a;
      O && (y = y ? y.concat(O) : O),
        c == null
          ? (s(m, d, _), s(A, d, _), te(a.children, d, A, p, x, $, y, E))
          : k > 0 && k & 64 && I && c.dynamicChildren
          ? (de(c.dynamicChildren, I, d, p, x, $, y),
            (a.key != null || (p && a === p.subTree)) && Ar(c, a, !0))
          : Se(c, a, d, A, p, x, $, y, E);
    },
    ve = (c, a, d, _, p, x, $, y, E) => {
      (a.slotScopeIds = y),
        c == null
          ? a.shapeFlag & 512
            ? p.ctx.activate(a, d, _, $, E)
            : kn(a, d, _, p, x, $, E)
          : be(c, a, E);
    },
    kn = (c, a, d, _, p, x, $) => {
      const y = (c.component = dl(c, _, p));
      if ((ts(c) && (y.ctx.renderer = ft), hl(y), y.asyncDep)) {
        if ((p && p.registerDep(y, ne), !c.el)) {
          const E = (y.subTree = N(De));
          M(null, E, a, d);
        }
        return;
      }
      ne(y, c, a, d, p, x, $);
    },
    be = (c, a, d) => {
      const _ = (a.component = c.component);
      if (ki(c, a, d))
        if (_.asyncDep && !_.asyncResolved) {
          Q(_, a, d);
          return;
        } else (_.next = a), xl(_.update), _.update();
      else (a.component = c.component), (a.el = c.el), (_.vnode = a);
    },
    ne = (c, a, d, _, p, x, $) => {
      const y = () => {
          if (c.isMounted) {
            let { next: A, bu: k, u: I, parent: O, vnode: K } = c,
              ee = A,
              Y;
            ot(c, !1),
              A ? ((A.el = K.el), Q(c, A, $)) : (A = K),
              k && Sn(k),
              (Y = A.props && A.props.onVnodeBeforeUpdate) && Ce(Y, O, A, K),
              ot(c, !0);
            const G = Gn(c),
              Le = c.subTree;
            (c.subTree = G),
              g(Le, G, v(Le.el), Vt(Le), c, p, x),
              (A.el = G.el),
              ee === null && Ti(c, G.el),
              I && ye(I, p),
              (Y = A.props && A.props.onVnodeUpdated) &&
                ye(() => Ce(Y, O, A, K), p);
          } else {
            let A;
            const { el: k, props: I } = a,
              { bm: O, m: K, parent: ee } = c,
              Y = an(a);
            if (
              (ot(c, !1),
              O && Sn(O),
              !Y && (A = I && I.onVnodeBeforeMount) && Ce(A, ee, a),
              ot(c, !0),
              k && Pn)
            ) {
              const G = () => {
                (c.subTree = Gn(c)), Pn(k, c.subTree, c, p, null);
              };
              Y
                ? a.type.__asyncLoader().then(() => !c.isUnmounted && G())
                : G();
            } else {
              const G = (c.subTree = Gn(c));
              g(null, G, d, _, c, p, x), (a.el = G.el);
            }
            if ((K && ye(K, p), !Y && (A = I && I.onVnodeMounted))) {
              const G = a;
              ye(() => Ce(A, ee, G), p);
            }
            a.shapeFlag & 256 && c.a && ye(c.a, p),
              (c.isMounted = !0),
              (a = d = _ = null);
          }
        },
        E = (c.effect = new Dn(y, () => gs(c.update), c.scope)),
        m = (c.update = E.run.bind(E));
      (m.id = c.uid), ot(c, !0), m();
    },
    Q = (c, a, d) => {
      a.component = c;
      const _ = c.vnode.props;
      (c.vnode = a),
        (c.next = null),
        Ji(c, a.props, _, d),
        Xi(c, a.children, d),
        mt(),
        ms(void 0, c.update),
        nt();
    },
    Se = (c, a, d, _, p, x, $, y, E = !1) => {
      const m = c && c.children,
        A = c ? c.shapeFlag : 0,
        k = a.children,
        { patchFlag: I, shapeFlag: O } = a;
      if (I > 0) {
        if (I & 128) {
          Ct(m, k, d, _, p, x, $, y, E);
          return;
        } else if (I & 256) {
          Tn(m, k, d, _, p, x, $, y, E);
          return;
        }
      }
      O & 8
        ? (A & 16 && He(m, p, x), k !== m && h(d, k))
        : A & 16
        ? O & 16
          ? Ct(m, k, d, _, p, x, $, y, E)
          : He(m, p, x, !0)
        : (A & 8 && h(d, ""), O & 16 && te(k, d, _, p, x, $, y, E));
    },
    Tn = (c, a, d, _, p, x, $, y, E) => {
      (c = c || ht), (a = a || ht);
      const m = c.length,
        A = a.length,
        k = Math.min(m, A);
      let I;
      for (I = 0; I < k; I++) {
        const O = (a[I] = E ? Ve(a[I]) : Ie(a[I]));
        g(c[I], O, d, null, p, x, $, y, E);
      }
      m > A ? He(c, p, x, !0, !1, k) : te(a, d, _, p, x, $, y, E, k);
    },
    Ct = (c, a, d, _, p, x, $, y, E) => {
      let m = 0;
      const A = a.length;
      let k = c.length - 1,
        I = A - 1;
      for (; m <= k && m <= I; ) {
        const O = c[m],
          K = (a[m] = E ? Ve(a[m]) : Ie(a[m]));
        if (Ht(O, K)) g(O, K, d, null, p, x, $, y, E);
        else break;
        m++;
      }
      for (; m <= k && m <= I; ) {
        const O = c[k],
          K = (a[I] = E ? Ve(a[I]) : Ie(a[I]));
        if (Ht(O, K)) g(O, K, d, null, p, x, $, y, E);
        else break;
        k--, I--;
      }
      if (m > k) {
        if (m <= I) {
          const O = I + 1,
            K = O < A ? a[O].el : _;
          for (; m <= I; )
            g(null, (a[m] = E ? Ve(a[m]) : Ie(a[m])), d, K, p, x, $, y, E), m++;
        }
      } else if (m > I) for (; m <= k; ) We(c[m], p, x, !0), m++;
      else {
        const O = m,
          K = m,
          ee = new Map();
        for (m = K; m <= I; m++) {
          const xe = (a[m] = E ? Ve(a[m]) : Ie(a[m]));
          xe.key != null && ee.set(xe.key, m);
        }
        let Y,
          G = 0;
        const Le = I - K + 1;
        let dt = !1,
          Is = 0;
        const kt = new Array(Le);
        for (m = 0; m < Le; m++) kt[m] = 0;
        for (m = O; m <= k; m++) {
          const xe = c[m];
          if (G >= Le) {
            We(xe, p, x, !0);
            continue;
          }
          let Oe;
          if (xe.key != null) Oe = ee.get(xe.key);
          else
            for (Y = K; Y <= I; Y++)
              if (kt[Y - K] === 0 && Ht(xe, a[Y])) {
                Oe = Y;
                break;
              }
          Oe === void 0
            ? We(xe, p, x, !0)
            : ((kt[Oe - K] = m + 1),
              Oe >= Is ? (Is = Oe) : (dt = !0),
              g(xe, a[Oe], d, null, p, x, $, y, E),
              G++);
        }
        const Ms = dt ? nl(kt) : ht;
        for (Y = Ms.length - 1, m = Le - 1; m >= 0; m--) {
          const xe = K + m,
            Oe = a[xe],
            Os = xe + 1 < A ? a[xe + 1].el : _;
          kt[m] === 0
            ? g(null, Oe, d, Os, p, x, $, y, E)
            : dt && (Y < 0 || m !== Ms[Y] ? at(Oe, d, Os, 2) : Y--);
        }
      }
    },
    at = (c, a, d, _, p = null) => {
      const { el: x, type: $, transition: y, children: E, shapeFlag: m } = c;
      if (m & 6) {
        at(c.component.subTree, a, d, _);
        return;
      }
      if (m & 128) {
        c.suspense.move(a, d, _);
        return;
      }
      if (m & 64) {
        $.move(c, a, d, ft);
        return;
      }
      if ($ === ae) {
        s(x, a, d);
        for (let k = 0; k < E.length; k++) at(E[k], a, d, _);
        s(c.anchor, a, d);
        return;
      }
      if ($ === Nt) {
        P(c, a, d);
        return;
      }
      if (_ !== 2 && m & 1 && y)
        if (_ === 0) y.beforeEnter(x), s(x, a, d), ye(() => y.enter(x), p);
        else {
          const { leave: k, delayLeave: I, afterLeave: O } = y,
            K = () => s(x, a, d),
            ee = () => {
              k(x, () => {
                K(), O && O();
              });
            };
          I ? I(x, K, ee) : ee();
        }
      else s(x, a, d);
    },
    We = (c, a, d, _ = !1, p = !1) => {
      const {
        type: x,
        props: $,
        ref: y,
        children: E,
        dynamicChildren: m,
        shapeFlag: A,
        patchFlag: k,
        dirs: I,
      } = c;
      if ((y != null && pn(y, null, d, c, !0), A & 256)) {
        a.ctx.deactivate(c);
        return;
      }
      const O = A & 1 && I,
        K = !an(c);
      let ee;
      if ((K && (ee = $ && $.onVnodeBeforeUnmount) && Ce(ee, a, c), A & 6))
        Lo(c.component, d, _);
      else {
        if (A & 128) {
          c.suspense.unmount(d, _);
          return;
        }
        O && Ne(c, null, a, "beforeUnmount"),
          A & 64
            ? c.type.remove(c, a, d, p, ft, _)
            : m && (x !== ae || (k > 0 && k & 64))
            ? He(m, a, d, !1, !0)
            : ((x === ae && k & (128 | 256)) || (!p && A & 16)) && He(E, a, d),
          _ && Ps(c);
      }
      ((K && (ee = $ && $.onVnodeUnmounted)) || O) &&
        ye(() => {
          ee && Ce(ee, a, c), O && Ne(c, null, a, "unmounted");
        }, d);
    },
    Ps = (c) => {
      const { type: a, el: d, anchor: _, transition: p } = c;
      if (a === ae) {
        To(d, _);
        return;
      }
      if (a === Nt) {
        V(c);
        return;
      }
      const x = () => {
        r(d), p && !p.persisted && p.afterLeave && p.afterLeave();
      };
      if (c.shapeFlag & 1 && p && !p.persisted) {
        const { leave: $, delayLeave: y } = p,
          E = () => $(d, x);
        y ? y(c.el, x, E) : E();
      } else x();
    },
    To = (c, a) => {
      let d;
      for (; c !== a; ) (d = w(c)), r(c), (c = d);
      r(a);
    },
    Lo = (c, a, d) => {
      const { bum: _, scope: p, update: x, subTree: $, um: y } = c;
      _ && Sn(_),
        p.stop(),
        x && ((x.active = !1), We($, c, a, d)),
        y && ye(y, a),
        ye(() => {
          c.isUnmounted = !0;
        }, a),
        a &&
          a.pendingBranch &&
          !a.isUnmounted &&
          c.asyncDep &&
          !c.asyncResolved &&
          c.suspenseId === a.pendingId &&
          (a.deps--, a.deps === 0 && a.resolve());
    },
    He = (c, a, d, _ = !1, p = !1, x = 0) => {
      for (let $ = x; $ < c.length; $++) We(c[$], a, d, _, p);
    },
    Vt = (c) =>
      c.shapeFlag & 6
        ? Vt(c.component.subTree)
        : c.shapeFlag & 128
        ? c.suspense.next()
        : w(c.anchor || c.el),
    As = (c, a, d) => {
      c == null
        ? a._vnode && We(a._vnode, null, null, !0)
        : g(a._vnode || null, c, a, null, null, null, d),
        wn(),
        (a._vnode = c);
    },
    ft = {
      p: g,
      um: We,
      m: at,
      r: Ps,
      mt: kn,
      mc: te,
      pc: Se,
      pbc: de,
      n: Vt,
      o: e,
    };
  let Ln, Pn;
  return (
    t && ([Ln, Pn] = t(ft)), { render: As, hydrate: Ln, createApp: Qi(As, Ln) }
  );
}
function ot({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Ar(e, t, n = !1) {
  const s = e.children,
    r = t.children;
  if (F(s) && F(r))
    for (let o = 0; o < s.length; o++) {
      const i = s[o];
      let l = r[o];
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) &&
          ((l = r[o] = Ve(r[o])), (l.el = i.el)),
        n || Ar(i, l));
    }
}
function nl(e) {
  const t = e.slice(),
    n = [0];
  let s, r, o, i, l;
  const u = e.length;
  for (s = 0; s < u; s++) {
    const f = e[s];
    if (f !== 0) {
      if (((r = n[n.length - 1]), e[r] < f)) {
        (t[s] = r), n.push(s);
        continue;
      }
      for (o = 0, i = n.length - 1; o < i; )
        (l = (o + i) >> 1), e[n[l]] < f ? (o = l + 1) : (i = l);
      f < e[n[o]] && (o > 0 && (t[s] = n[o - 1]), (n[o] = s));
    }
  }
  for (o = n.length, i = n[o - 1]; o-- > 0; ) (n[o] = i), (i = t[i]);
  return n;
}
const sl = (e) => e.__isTeleport,
  Ir = "components";
function ls(e, t) {
  return ol(Ir, e, !0, t) || e;
}
const rl = Symbol();
function ol(e, t, n = !0, s = !1) {
  const r = Ae || ce;
  if (r) {
    const o = r.type;
    if (e === Ir) {
      const l = ml(o);
      if (l && (l === t || l === Fe(t) || l === Zt(Fe(t)))) return o;
    }
    const i = Mr(r[e] || o[e], t) || Mr(r.appContext[e], t);
    return !i && s ? o : i;
  }
}
function Mr(e, t) {
  return e && (e[t] || e[Fe(t)] || e[Zt(Fe(t))]);
}
const ae = Symbol(void 0),
  Ft = Symbol(void 0),
  De = Symbol(void 0),
  Nt = Symbol(void 0),
  St = [];
let it = null;
function R(e = !1) {
  St.push((it = e ? null : []));
}
function il() {
  St.pop(), (it = St[St.length - 1] || null);
}
let gn = 1;
function Or(e) {
  gn += e;
}
function Rr(e) {
  return (
    (e.dynamicChildren = gn > 0 ? it || ht : null),
    il(),
    gn > 0 && it && it.push(e),
    e
  );
}
function q(e, t, n, s, r, o) {
  return Rr(j(e, t, n, s, r, o, !0));
}
function Ee(e, t, n, s, r) {
  return Rr(N(e, t, n, s, r, !0));
}
function mn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Ht(e, t) {
  return e.type === t.type && e.key === t.key;
}
const vn = "__vInternal",
  Fr = ({ key: e }) => (e != null ? e : null),
  bn = ({ ref: e, ref_key: t, ref_for: n }) =>
    e != null
      ? ue(e) || he(e) || S(e)
        ? { i: Ae, r: e, k: t, f: !!n }
        : e
      : null;
function j(
  e,
  t = null,
  n = null,
  s = 0,
  r = null,
  o = e === ae ? 0 : 1,
  i = !1,
  l = !1
) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Fr(t),
    ref: t && bn(t),
    scopeId: cn,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
  };
  return (
    l
      ? (cs(u, n), o & 128 && e.normalize(u))
      : n && (u.shapeFlag |= ue(n) ? 8 : 16),
    gn > 0 &&
      !i &&
      it &&
      (u.patchFlag > 0 || o & 6) &&
      u.patchFlag !== 32 &&
      it.push(u),
    u
  );
}
const N = ll;
function ll(e, t = null, n = null, s = 0, r = null, o = !1) {
  if (((!e || e === rl) && (e = De), mn(e))) {
    const l = Bt(e, t, !0);
    return n && cs(l, n), l;
  }
  if ((vl(e) && (e = e.__vccOpts), t)) {
    t = cl(t);
    let { class: l, style: u } = t;
    l && !ue(l) && (t.class = Qe(l)),
      ie(u) && (sr(u) && !F(u) && (u = ge({}, u)), (t.style = In(u)));
  }
  const i = ue(e) ? 1 : Li(e) ? 128 : sl(e) ? 64 : ie(e) ? 4 : S(e) ? 2 : 0;
  return j(e, t, n, s, r, i, o, !0);
}
function cl(e) {
  return e ? (sr(e) || vn in e ? ge({}, e) : e) : null;
}
function Bt(e, t, n = !1) {
  const { props: s, ref: r, patchFlag: o, children: i } = e,
    l = t ? us(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && Fr(l),
    ref:
      t && t.ref ? (n && r ? (F(r) ? r.concat(bn(t)) : [r, bn(t)]) : bn(t)) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== ae ? (o === -1 ? 16 : o | 16) : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Bt(e.ssContent),
    ssFallback: e.ssFallback && Bt(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
  };
}
function Ut(e = " ", t = 0) {
  return N(Ft, null, e, t);
}
function Pa(e, t) {
  const n = N(Nt, null, e);
  return (n.staticCount = t), n;
}
function fe(e = "", t = !1) {
  return t ? (R(), Ee(De, null, e)) : N(De, null, e);
}
function Ie(e) {
  return e == null || typeof e == "boolean"
    ? N(De)
    : F(e)
    ? N(ae, null, e.slice())
    : typeof e == "object"
    ? Ve(e)
    : N(Ft, null, String(e));
}
function Ve(e) {
  return e.el === null || e.memo ? e : Bt(e);
}
function cs(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null) t = null;
  else if (F(t)) n = 16;
  else if (typeof t == "object")
    if (s & (1 | 64)) {
      const r = t.default;
      r && (r._c && (r._d = !1), cs(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(vn in t)
        ? (t._ctx = Ae)
        : r === 3 &&
          Ae &&
          (Ae.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    S(t)
      ? ((t = { default: t, _ctx: Ae }), (n = 32))
      : ((t = String(t)), s & 64 ? ((n = 16), (t = [Ut(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function us(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = Qe([t.class, s.class]));
      else if (r === "style") t.style = In([t.style, s.style]);
      else if (Tt(r)) {
        const o = t[r],
          i = s[r];
        o !== i && !(F(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
function Ce(e, t, n, s = null) {
  Me(e, t, 7, [n, s]);
}
function as(e, t, n, s) {
  let r;
  const o = n && n[s];
  if (F(e) || ue(e)) {
    r = new Array(e.length);
    for (let i = 0, l = e.length; i < l; i++)
      r[i] = t(e[i], i, void 0, o && o[i]);
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let i = 0; i < e; i++) r[i] = t(i + 1, i, void 0, o && o[i]);
  } else if (ie(e))
    if (e[Symbol.iterator])
      r = Array.from(e, (i, l) => t(i, l, void 0, o && o[l]));
    else {
      const i = Object.keys(e);
      r = new Array(i.length);
      for (let l = 0, u = i.length; l < u; l++) {
        const f = i[l];
        r[l] = t(e[f], f, l, o && o[l]);
      }
    }
  else r = [];
  return n && (n[s] = r), r;
}
function pe(e, t, n = {}, s, r) {
  if (Ae.isCE) return N("slot", t === "default" ? null : { name: t }, s && s());
  let o = e[t];
  o && o._c && (o._d = !1), R();
  const i = o && Nr(o(n)),
    l = Ee(
      ae,
      { key: n.key || `_${t}` },
      i || (s ? s() : []),
      i && e._ === 1 ? 64 : -2
    );
  return (
    !r && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]),
    o && o._c && (o._d = !0),
    l
  );
}
function Nr(e) {
  return e.some((t) =>
    mn(t) ? !(t.type === De || (t.type === ae && !Nr(t.children))) : !0
  )
    ? e
    : null;
}
const fs = (e) => (e ? (Sr(e) ? ds(e) || e.proxy : fs(e.parent)) : null),
  yn = ge(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => fs(e.parent),
    $root: (e) => fs(e.root),
    $emit: (e) => e.emit,
    $options: (e) => vr(e),
    $forceUpdate: (e) => () => gs(e.update),
    $nextTick: (e) => Dr.bind(e.proxy),
    $watch: (e) => Cl.bind(e),
  }),
  ul = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: s,
        data: r,
        props: o,
        accessCache: i,
        type: l,
        appContext: u,
      } = e;
      let f;
      if (t[0] !== "$") {
        const C = i[t];
        if (C !== void 0)
          switch (C) {
            case 1:
              return s[t];
            case 2:
              return r[t];
            case 4:
              return n[t];
            case 3:
              return o[t];
          }
        else {
          if (s !== Z && W(s, t)) return (i[t] = 1), s[t];
          if (r !== Z && W(r, t)) return (i[t] = 2), r[t];
          if ((f = e.propsOptions[0]) && W(f, t)) return (i[t] = 3), o[t];
          if (n !== Z && W(n, t)) return (i[t] = 4), n[t];
          ns && (i[t] = 0);
        }
      }
      const h = yn[t];
      let v, w;
      if (h) return t === "$attrs" && we(e, "get", t), h(e);
      if ((v = l.__cssModules) && (v = v[t])) return v;
      if (n !== Z && W(n, t)) return (i[t] = 4), n[t];
      if (((w = u.config.globalProperties), W(w, t))) return w[t];
    },
    set({ _: e }, t, n) {
      const { data: s, setupState: r, ctx: o } = e;
      if (r !== Z && W(r, t)) r[t] = n;
      else if (s !== Z && W(s, t)) s[t] = n;
      else if (W(e.props, t)) return !1;
      return t[0] === "$" && t.slice(1) in e ? !1 : ((o[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: s,
          appContext: r,
          propsOptions: o,
        },
      },
      i
    ) {
      let l;
      return (
        !!n[i] ||
        (e !== Z && W(e, i)) ||
        (t !== Z && W(t, i)) ||
        ((l = o[0]) && W(l, i)) ||
        W(s, i) ||
        W(yn, i) ||
        W(r.config.globalProperties, i)
      );
    },
  },
  al = Pr();
let fl = 0;
function dl(e, t, n) {
  const s = e.type,
    r = (t ? t.appContext : e.appContext) || al,
    o = {
      uid: fl++,
      vnode: e,
      type: s,
      parent: t,
      appContext: r,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Do(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(r.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: xr(s, r),
      emitsOptions: ur(s, r),
      emit: null,
      emitted: null,
      propsDefaults: Z,
      inheritAttrs: s.inheritAttrs,
      ctx: Z,
      data: Z,
      props: Z,
      attrs: Z,
      slots: Z,
      refs: Z,
      setupState: Z,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (o.ctx = { _: o }),
    (o.root = t ? t.root : o),
    (o.emit = Ei.bind(null, o)),
    e.ce && e.ce(o),
    o
  );
}
let ce = null;
const yt = (e) => {
    (ce = e), e.scope.on();
  },
  lt = () => {
    ce && ce.scope.off(), (ce = null);
  };
function Sr(e) {
  return e.vnode.shapeFlag & 4;
}
let jt = !1;
function hl(e, t = !1) {
  jt = t;
  const { props: n, children: s } = e.vnode,
    r = Sr(e);
  zi(e, n, r, t), Yi(e, s);
  const o = r ? pl(e, t) : void 0;
  return (jt = !1), o;
}
function pl(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = Mt(new Proxy(e.ctx, ul)));
  const { setup: s } = n;
  if (s) {
    const r = (e.setupContext = s.length > 1 ? gl(e) : null);
    yt(e), mt();
    const o = Ye(s, e, 0, [e.props, r]);
    if ((nt(), lt(), Ss(o))) {
      if ((o.then(lt, lt), t))
        return o
          .then((i) => {
            Hr(e, i, t);
          })
          .catch((i) => {
            Dt(i, e, 0);
          });
      e.asyncDep = o;
    } else Hr(e, o, t);
  } else Ur(e, t);
}
function Hr(e, t, n) {
  S(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : ie(t) && (e.setupState = lr(t)),
    Ur(e, n);
}
let Br;
function Ur(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && Br && !s.render) {
      const r = s.template;
      if (r) {
        const { isCustomElement: o, compilerOptions: i } = e.appContext.config,
          { delimiters: l, compilerOptions: u } = s,
          f = ge(ge({ isCustomElement: o, delimiters: l }, i), u);
        s.render = Br(r, f);
      }
    }
    e.render = s.render || Pe;
  }
  yt(e), mt(), ji(e), nt(), lt();
}
function _l(e) {
  return new Proxy(e.attrs, {
    get(t, n) {
      return we(e, "get", "$attrs"), t[n];
    },
  });
}
function gl(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  let n;
  return {
    get attrs() {
      return n || (n = _l(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function ds(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(lr(Mt(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in yn) return yn[n](e);
        },
      }))
    );
}
function ml(e) {
  return (S(e) && e.displayName) || e.name;
}
function vl(e) {
  return S(e) && "__vccOpts" in e;
}
function Ye(e, t, n, s) {
  let r;
  try {
    r = s ? e(...s) : e();
  } catch (o) {
    Dt(o, t, n);
  }
  return r;
}
function Me(e, t, n, s) {
  if (S(e)) {
    const o = Ye(e, t, n, s);
    return (
      o &&
        Ss(o) &&
        o.catch((i) => {
          Dt(i, t, n);
        }),
      o
    );
  }
  const r = [];
  for (let o = 0; o < e.length; o++) r.push(Me(e[o], t, n, s));
  return r;
}
function Dt(e, t, n, s = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy,
      l = n;
    for (; o; ) {
      const f = o.ec;
      if (f) {
        for (let h = 0; h < f.length; h++) if (f[h](e, i, l) === !1) return;
      }
      o = o.parent;
    }
    const u = t.appContext.config.errorHandler;
    if (u) {
      Ye(u, null, 10, [e, i, l]);
      return;
    }
  }
  bl(e, n, r, s);
}
function bl(e, t, n, s = !0) {
  console.error(e);
}
let xn = !1,
  hs = !1;
const $e = [];
let Ke = 0;
const Kt = [];
let Wt = null,
  xt = 0;
const qt = [];
let Xe = null,
  wt = 0;
const jr = Promise.resolve();
let ps = null,
  _s = null;
function Dr(e) {
  const t = ps || jr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function yl(e) {
  let t = Ke + 1,
    n = $e.length;
  for (; t < n; ) {
    const s = (t + n) >>> 1;
    zt($e[s]) < e ? (t = s + 1) : (n = s);
  }
  return t;
}
function gs(e) {
  (!$e.length || !$e.includes(e, xn && e.allowRecurse ? Ke + 1 : Ke)) &&
    e !== _s &&
    (e.id == null ? $e.push(e) : $e.splice(yl(e.id), 0, e), Kr());
}
function Kr() {
  !xn && !hs && ((hs = !0), (ps = jr.then(qr)));
}
function xl(e) {
  const t = $e.indexOf(e);
  t > Ke && $e.splice(t, 1);
}
function Wr(e, t, n, s) {
  F(e)
    ? n.push(...e)
    : (!t || !t.includes(e, e.allowRecurse ? s + 1 : s)) && n.push(e),
    Kr();
}
function wl(e) {
  Wr(e, Wt, Kt, xt);
}
function El(e) {
  Wr(e, Xe, qt, wt);
}
function ms(e, t = null) {
  if (Kt.length) {
    for (
      _s = t, Wt = [...new Set(Kt)], Kt.length = 0, xt = 0;
      xt < Wt.length;
      xt++
    )
      Wt[xt]();
    (Wt = null), (xt = 0), (_s = null), ms(e, t);
  }
}
function wn(e) {
  if (qt.length) {
    const t = [...new Set(qt)];
    if (((qt.length = 0), Xe)) {
      Xe.push(...t);
      return;
    }
    for (Xe = t, Xe.sort((n, s) => zt(n) - zt(s)), wt = 0; wt < Xe.length; wt++)
      Xe[wt]();
    (Xe = null), (wt = 0);
  }
}
const zt = (e) => (e.id == null ? 1 / 0 : e.id);
function qr(e) {
  (hs = !1), (xn = !0), ms(e), $e.sort((n, s) => zt(n) - zt(s));
  const t = Pe;
  try {
    for (Ke = 0; Ke < $e.length; Ke++) {
      const n = $e[Ke];
      n && n.active !== !1 && Ye(n, null, 14);
    }
  } finally {
    (Ke = 0),
      ($e.length = 0),
      wn(),
      (xn = !1),
      (ps = null),
      ($e.length || Kt.length || qt.length) && qr(e);
  }
}
function $l(e, t) {
  return vs(e, null, t);
}
const zr = {};
function ct(e, t, n) {
  return vs(e, t, n);
}
function vs(
  e,
  t,
  { immediate: n, deep: s, flush: r, onTrack: o, onTrigger: i } = Z
) {
  const l = ce;
  let u,
    f = !1,
    h = !1;
  if (
    (he(e)
      ? ((u = () => e.value), (f = !!e._shallow))
      : vt(e)
      ? ((u = () => e), (s = !0))
      : F(e)
      ? ((h = !0),
        (f = e.some(vt)),
        (u = () =>
          e.map((b) => {
            if (he(b)) return b.value;
            if (vt(b)) return Et(b);
            if (S(b)) return Ye(b, l, 2);
          })))
      : S(e)
      ? t
        ? (u = () => Ye(e, l, 2))
        : (u = () => {
            if (!(l && l.isUnmounted)) return v && v(), Me(e, l, 3, [w]);
          })
      : (u = Pe),
    t && s)
  ) {
    const b = u;
    u = () => Et(b());
  }
  let v,
    w = (b) => {
      v = g.onStop = () => {
        Ye(b, l, 4);
      };
    };
  if (jt)
    return (w = Pe), t ? n && Me(t, l, 3, [u(), h ? [] : void 0, w]) : u(), Pe;
  let C = h ? [] : zr;
  const T = () => {
    if (!!g.active)
      if (t) {
        const b = g.run();
        (s || f || (h ? b.some((M, D) => Pt(M, C[D])) : Pt(b, C))) &&
          (v && v(), Me(t, l, 3, [b, C === zr ? void 0 : C, w]), (C = b));
      } else g.run();
  };
  T.allowRecurse = !!t;
  let H;
  r === "sync"
    ? (H = T)
    : r === "post"
    ? (H = () => ye(T, l && l.suspense))
    : (H = () => {
        !l || l.isMounted ? wl(T) : T();
      });
  const g = new Dn(u, H);
  return (
    t
      ? n
        ? T()
        : (C = g.run())
      : r === "post"
      ? ye(g.run.bind(g), l && l.suspense)
      : g.run(),
    () => {
      g.stop(), l && l.scope && On(l.scope.effects, g);
    }
  );
}
function Cl(e, t, n) {
  const s = this.proxy,
    r = ue(e) ? (e.includes(".") ? Jr(s, e) : () => s[e]) : e.bind(s, s);
  let o;
  S(t) ? (o = t) : ((o = t.handler), (n = t));
  const i = ce;
  yt(this);
  const l = vs(r, o.bind(s), n);
  return i ? yt(i) : lt(), l;
}
function Jr(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++) s = s[n[r]];
    return s;
  };
}
function Et(e, t) {
  if (!ie(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), he(e))) Et(e.value, t);
  else if (F(e)) for (let n = 0; n < e.length; n++) Et(e[n], t);
  else if (Ns(e) || pt(e))
    e.forEach((n) => {
      Et(n, t);
    });
  else if (Bs(e)) for (const n in e) Et(e[n], t);
  return e;
}
function ut(e, t, n) {
  const s = arguments.length;
  return s === 2
    ? ie(t) && !F(t)
      ? mn(t)
        ? N(e, null, [t])
        : N(e, t)
      : N(e, null, t)
    : (s > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : s === 3 && mn(n) && (n = [n]),
      N(e, t, n));
}
const kl = "3.2.26",
  Tl = "http://www.w3.org/2000/svg",
  $t = typeof document != "undefined" ? document : null,
  Vr = new Map(),
  Ll = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, s) => {
      const r = t
        ? $t.createElementNS(Tl, e)
        : $t.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          s &&
          s.multiple != null &&
          r.setAttribute("multiple", s.multiple),
        r
      );
    },
    createText: (e) => $t.createTextNode(e),
    createComment: (e) => $t.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => $t.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    cloneNode(e) {
      const t = e.cloneNode(!0);
      return "_value" in e && (t._value = e._value), t;
    },
    insertStaticContent(e, t, n, s) {
      const r = n ? n.previousSibling : t.lastChild;
      let o = Vr.get(e);
      if (!o) {
        const i = $t.createElement("template");
        if (((i.innerHTML = s ? `<svg>${e}</svg>` : e), (o = i.content), s)) {
          const l = o.firstChild;
          for (; l.firstChild; ) o.appendChild(l.firstChild);
          o.removeChild(l);
        }
        Vr.set(e, o);
      }
      return (
        t.insertBefore(o.cloneNode(!0), n),
        [r ? r.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
      );
    },
  };
function Pl(e, t, n) {
  const s = e._vtc;
  s && (t = (t ? [t, ...s] : [...s]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t);
}
function Al(e, t, n) {
  const s = e.style,
    r = ue(n);
  if (n && !r) {
    for (const o in n) bs(s, o, n[o]);
    if (t && !ue(t)) for (const o in t) n[o] == null && bs(s, o, "");
  } else {
    const o = s.display;
    r ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"),
      "_vod" in e && (s.display = o);
  }
}
const Yr = /\s*!important$/;
function bs(e, t, n) {
  if (F(n)) n.forEach((s) => bs(e, t, s));
  else if (t.startsWith("--")) e.setProperty(t, n);
  else {
    const s = Il(e, t);
    Yr.test(n)
      ? e.setProperty(_t(s), n.replace(Yr, ""), "important")
      : (e[s] = n);
  }
}
const Xr = ["Webkit", "Moz", "ms"],
  ys = {};
function Il(e, t) {
  const n = ys[t];
  if (n) return n;
  let s = Fe(t);
  if (s !== "filter" && s in e) return (ys[t] = s);
  s = Zt(s);
  for (let r = 0; r < Xr.length; r++) {
    const o = Xr[r] + s;
    if (o in e) return (ys[t] = o);
  }
  return t;
}
const Zr = "http://www.w3.org/1999/xlink";
function Ml(e, t, n, s, r) {
  if (s && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(Zr, t.slice(6, t.length))
      : e.setAttributeNS(Zr, t, n);
  else {
    const o = Ao(t);
    n == null || (o && !Rs(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, o ? "" : n);
  }
}
function Ol(e, t, n, s, r, o, i) {
  if (t === "innerHTML" || t === "textContent") {
    s && i(s, r, o), (e[t] = n == null ? "" : n);
    return;
  }
  if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
    e._value = n;
    const l = n == null ? "" : n;
    (e.value !== l || e.tagName === "OPTION") && (e.value = l),
      n == null && e.removeAttribute(t);
    return;
  }
  if (n === "" || n == null) {
    const l = typeof e[t];
    if (l === "boolean") {
      e[t] = Rs(n);
      return;
    } else if (n == null && l === "string") {
      (e[t] = ""), e.removeAttribute(t);
      return;
    } else if (l === "number") {
      try {
        e[t] = 0;
      } catch {}
      e.removeAttribute(t);
      return;
    }
  }
  try {
    e[t] = n;
  } catch {}
}
let En = Date.now,
  Qr = !1;
if (typeof window != "undefined") {
  En() > document.createEvent("Event").timeStamp &&
    (En = () => performance.now());
  const e = navigator.userAgent.match(/firefox\/(\d+)/i);
  Qr = !!(e && Number(e[1]) <= 53);
}
let xs = 0;
const Rl = Promise.resolve(),
  Fl = () => {
    xs = 0;
  },
  Nl = () => xs || (Rl.then(Fl), (xs = En()));
function Sl(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Hl(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
function Bl(e, t, n, s, r = null) {
  const o = e._vei || (e._vei = {}),
    i = o[t];
  if (s && i) i.value = s;
  else {
    const [l, u] = Ul(t);
    if (s) {
      const f = (o[t] = jl(s, r));
      Sl(e, l, f, u);
    } else i && (Hl(e, l, i, u), (o[t] = void 0));
  }
}
const Gr = /(?:Once|Passive|Capture)$/;
function Ul(e) {
  let t;
  if (Gr.test(e)) {
    t = {};
    let n;
    for (; (n = e.match(Gr)); )
      (e = e.slice(0, e.length - n[0].length)), (t[n[0].toLowerCase()] = !0);
  }
  return [_t(e.slice(2)), t];
}
function jl(e, t) {
  const n = (s) => {
    const r = s.timeStamp || En();
    (Qr || r >= n.attached - 1) && Me(Dl(s, n.value), t, 5, [s]);
  };
  return (n.value = e), (n.attached = Nl()), n;
}
function Dl(e, t) {
  if (F(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((s) => (r) => !r._stopped && s(r))
    );
  } else return t;
}
const eo = /^on[a-z]/,
  Kl = (e, t, n, s, r = !1, o, i, l, u) => {
    t === "class"
      ? Pl(e, s, r)
      : t === "style"
      ? Al(e, n, s)
      : Tt(t)
      ? Mn(t) || Bl(e, t, n, s, i)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : Wl(e, t, s, r)
        )
      ? Ol(e, t, s, o, i, l, u)
      : (t === "true-value"
          ? (e._trueValue = s)
          : t === "false-value" && (e._falseValue = s),
        Ml(e, t, s, r));
  };
function Wl(e, t, n, s) {
  return s
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && eo.test(t) && S(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (eo.test(t) && ue(n))
    ? !1
    : t in e;
}
const ql = ge({ patchProp: Kl }, Ll);
let ws,
  to = !1;
function zl() {
  return (ws = to ? ws : el(ql)), (to = !0), ws;
}
const Jl = (...e) => {
  const t = zl().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (s) => {
      const r = Vl(s);
      if (r) return n(r, !0, r instanceof SVGElement);
    }),
    t
  );
};
function Vl(e) {
  return ue(e) ? document.querySelector(e) : e;
}
var Yl =
  '{"lang":"en-US","title":"TypeScript Axios","description":"Study axios and typescript knowledge","base":"/","head":[],"themeConfig":{"nav":[{"text":"GitHub","link":"https://github.com/wangkaiwd/typescript-axios"}],"sidebar":[{"text":"build","link":"/build"},{"text":"publish","link":"/publish"},{"text":"requirement","link":"/requirement"},{"text":"notes","link":"/notes"},{"text":"test-case","link":"/test-case"}]},"locales":{},"langs":{}}';
const no = /^https?:/i,
  ke = typeof window != "undefined";
function Xl(e, t) {
  t.sort((n, s) => {
    const r = s.split("/").length - n.split("/").length;
    return r !== 0 ? r : s.length - n.length;
  });
  for (const n of t) if (e.startsWith(n)) return n;
}
function so(e, t) {
  const n = Xl(t, Object.keys(e));
  return n ? e[n] : void 0;
}
function Zl(e) {
  const { locales: t } = e.themeConfig || {},
    n = e.locales;
  return t && n
    ? Object.keys(t).reduce(
        (s, r) => ((s[r] = { label: t[r].label, lang: n[r].lang }), s),
        {}
      )
    : {};
}
function Ql(e, t) {
  t = Gl(e, t);
  const n = so(e.locales || {}, t),
    s = so(e.themeConfig.locales || {}, t);
  return Object.assign({}, e, n, {
    themeConfig: Object.assign({}, e.themeConfig, s, { locales: {} }),
    lang: (n || e).lang,
    locales: {},
    langs: Zl(e),
  });
}
function Gl(e, t) {
  if (!ke) return t;
  const n = e.base,
    s = n.endsWith("/") ? n.slice(0, -1) : n;
  return t.slice(s.length);
}
const ro = Symbol(),
  oo = mi(ec(Yl));
function ec(e) {
  return Vn(JSON.parse(e));
}
function tc(e) {
  const t = J(() => Ql(oo.value, e.path));
  return {
    site: t,
    theme: J(() => t.value.themeConfig),
    page: J(() => e.data),
    frontmatter: J(() => e.data.frontmatter),
    lang: J(() => t.value.lang),
    localePath: J(() => {
      const { langs: n, lang: s } = t.value,
        r = Object.keys(n).find((o) => n[o].lang === s);
      return Jt(r || "/");
    }),
    title: J(() =>
      e.data.title ? e.data.title + " | " + t.value.title : t.value.title
    ),
    description: J(() => e.data.description || t.value.description),
  };
}
function Te() {
  const e = Rt(ro);
  if (!e) throw new Error("vitepress data not properly injected in app");
  return e;
}
function nc(e, t) {
  return `${e}${t}`.replace(/\/+/g, "/");
}
function Jt(e) {
  return no.test(e) ? e : nc(oo.value.base, e);
}
function io(e) {
  let t = e.replace(/\.html$/, "");
  if (((t = decodeURIComponent(t)), t.endsWith("/") && (t += "index"), ke)) {
    const n = "/";
    t = t.slice(n.length).replace(/\//g, "_") + ".md";
    const s = __VP_HASH_MAP__[t.toLowerCase()];
    t = `${n}assets/${t}.${s}.js`;
  } else t = `./${t.slice(1).replace(/\//g, "_")}.md.js`;
  return t;
}
const lo = Symbol(),
  co = "http://a.com",
  sc = () => ({ path: "/", component: null, data: { frontmatter: {} } });
function rc(e, t) {
  const n = ln(sc());
  function s(i = ke ? location.href : "/") {
    const l = new URL(i, co);
    return (
      !l.pathname.endsWith("/") &&
        !l.pathname.endsWith(".html") &&
        ((l.pathname += ".html"), (i = l.pathname + l.search + l.hash)),
      ke &&
        (history.replaceState(
          { scrollPosition: window.scrollY },
          document.title
        ),
        history.pushState(null, "", i)),
      o(i)
    );
  }
  let r = null;
  async function o(i, l = 0) {
    const u = new URL(i, co),
      f = (r = u.pathname);
    try {
      let h = e(f);
      if (
        ("then" in h && typeof h.then == "function" && (h = await h), r === f)
      ) {
        r = null;
        const { default: v, __pageData: w } = h;
        if (!v) throw new Error(`Invalid route component: ${v}`);
        (n.path = f),
          (n.component = Mt(v)),
          (n.data = Mt(JSON.parse(w))),
          ke &&
            Dr(() => {
              if (u.hash && !l) {
                let C = null;
                try {
                  C = document.querySelector(decodeURIComponent(u.hash));
                } catch (T) {
                  console.warn(T);
                }
                if (C) {
                  uo(C, u.hash);
                  return;
                }
              }
              window.scrollTo(0, l);
            });
      }
    } catch (h) {
      h.message.match(/fetch/) || console.error(h),
        r === f && ((r = null), (n.path = f), (n.component = t ? Mt(t) : null));
    }
  }
  return (
    ke &&
      (window.addEventListener(
        "click",
        (i) => {
          const l = i.target.closest("a");
          if (l) {
            const {
                href: u,
                protocol: f,
                hostname: h,
                pathname: v,
                hash: w,
                target: C,
              } = l,
              T = window.location,
              H = v.match(/\.\w+$/);
            !i.ctrlKey &&
              !i.shiftKey &&
              !i.altKey &&
              !i.metaKey &&
              C !== "_blank" &&
              f === T.protocol &&
              h === T.hostname &&
              !(H && H[0] !== ".html") &&
              (i.preventDefault(),
              v === T.pathname
                ? w &&
                  w !== T.hash &&
                  (history.pushState(null, "", w),
                  window.dispatchEvent(new Event("hashchange")),
                  uo(l, w, l.classList.contains("header-anchor")))
                : s(u));
          }
        },
        { capture: !0 }
      ),
      window.addEventListener("popstate", (i) => {
        o(location.href, (i.state && i.state.scrollPosition) || 0);
      }),
      window.addEventListener("hashchange", (i) => {
        i.preventDefault();
      })),
    { route: n, go: s }
  );
}
function oc() {
  const e = Rt(lo);
  if (!e) throw new Error("useRouter() is called without provider.");
  return e;
}
function Ze() {
  return oc().route;
}
function uo(e, t, n = !1) {
  let s = null;
  try {
    s = e.classList.contains(".header-anchor")
      ? e
      : document.querySelector(decodeURIComponent(t));
  } catch (r) {
    console.warn(r);
  }
  if (s) {
    const r = s.offsetTop;
    !n || Math.abs(r - window.scrollY) > window.innerHeight
      ? window.scrollTo(0, r)
      : window.scrollTo({ left: 0, top: r, behavior: "smooth" });
  }
}
function ic(e, t) {
  let n = [],
    s = !0;
  const r = (o) => {
    if (s) {
      s = !1;
      return;
    }
    const i = [],
      l = Math.min(n.length, o.length);
    for (let u = 0; u < l; u++) {
      let f = n[u];
      const [h, v, w = ""] = o[u];
      if (f.tagName.toLocaleLowerCase() === h) {
        for (const C in v)
          f.getAttribute(C) !== v[C] && f.setAttribute(C, v[C]);
        for (let C = 0; C < f.attributes.length; C++) {
          const T = f.attributes[C].name;
          T in v || f.removeAttribute(T);
        }
        f.innerHTML !== w && (f.innerHTML = w);
      } else
        document.head.removeChild(f), (f = ao(o[u])), document.head.append(f);
      i.push(f);
    }
    n.slice(l).forEach((u) => document.head.removeChild(u)),
      o.slice(l).forEach((u) => {
        const f = ao(u);
        document.head.appendChild(f), i.push(f);
      }),
      (n = i);
  };
  $l(() => {
    const o = e.data,
      i = t.value,
      l = o && o.title,
      u = o && o.description,
      f = o && o.frontmatter.head;
    (document.title = (l ? l + " | " : "") + i.title),
      document
        .querySelector("meta[name=description]")
        .setAttribute("content", u || i.description),
      r([...(f ? cc(f) : [])]);
  });
}
function ao([e, t, n]) {
  const s = document.createElement(e);
  for (const r in t) s.setAttribute(r, t[r]);
  return n && (s.innerHTML = n), s;
}
function lc(e) {
  return e[0] === "meta" && e[1] && e[1].name === "description";
}
function cc(e) {
  return e.filter((t) => !lc(t));
}
const uc = le({
  name: "VitePressContent",
  setup() {
    const e = Ze();
    return () =>
      ut("div", { style: { position: "relative" } }, [
        e.component ? ut(e.component) : null,
      ]);
  },
});
var _e = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t) n[s] = r;
  return n;
};
const ac = /#.*$/,
  fc = /(index)?\.(md|html)$/,
  $n = /\/$/,
  dc = /^[a-z]+:/i;
function Es(e) {
  return Array.isArray(e);
}
function $s(e) {
  return dc.test(e);
}
function hc(e, t) {
  if (t === void 0) return !1;
  const n = fo(`/${e.data.relativePath}`),
    s = fo(t);
  return n === s;
}
function fo(e) {
  return decodeURI(e).replace(ac, "").replace(fc, "");
}
function pc(e, t) {
  const n = e.endsWith("/"),
    s = t.startsWith("/");
  return n && s ? e.slice(0, -1) + t : !n && !s ? `${e}/${t}` : e + t;
}
function Cs(e) {
  return /^\//.test(e) ? e : `/${e}`;
}
function ho(e) {
  return e.replace(/(index)?(\.(md|html))?$/, "") || "/";
}
function _c(e) {
  return e === !1 || e === "auto" || Es(e);
}
function gc(e) {
  return e.children !== void 0;
}
function mc(e) {
  return Es(e) ? e.length === 0 : !e;
}
function ks(e, t) {
  if (_c(e)) return e;
  t = Cs(t);
  for (const n in e) if (t.startsWith(Cs(n))) return e[n];
  return "auto";
}
function po(e) {
  return e.reduce(
    (t, n) => (
      n.link && t.push({ text: n.text, link: ho(n.link) }),
      gc(n) && (t = [...t, ...po(n.children)]),
      t
    ),
    []
  );
}
const vc = ["href", "aria-label"],
  bc = ["src"],
  yc = le({
    setup(e) {
      const { site: t, theme: n, localePath: s } = Te();
      return (r, o) => (
        R(),
        q(
          "a",
          {
            class: "nav-bar-title",
            href: L(s),
            "aria-label": `${L(t).title}, back to home`,
          },
          [
            L(n).logo
              ? (R(),
                q(
                  "img",
                  { key: 0, class: "logo", src: L(Jt)(L(n).logo), alt: "Logo" },
                  null,
                  8,
                  bc
                ))
              : fe("", !0),
            Ut(" " + Re(L(t).title), 1),
          ],
          8,
          vc
        )
      );
    },
  });
var xc = _e(yc, [["__scopeId", "data-v-cc01ef16"]]);
function wc() {
  const { site: e, localePath: t, theme: n } = Te();
  return J(() => {
    const s = e.value.langs,
      r = Object.keys(s);
    if (r.length < 2) return null;
    const i = Ze().path.replace(t.value, ""),
      l = r.map((f) => ({ text: s[f].label, link: `${f}${i}` }));
    return { text: n.value.selectText || "Languages", items: l };
  });
}
const Ec = ["GitHub", "GitLab", "Bitbucket"].map((e) => [
  e,
  new RegExp(e, "i"),
]);
function $c() {
  const { site: e } = Te();
  return J(() => {
    const t = e.value.themeConfig,
      n = t.docsRepo || t.repo;
    if (!n) return null;
    const s = Cc(n);
    return { text: kc(s, t.repoLabel), link: s };
  });
}
function Cc(e) {
  return no.test(e) ? e : `https://github.com/${e}`;
}
function kc(e, t) {
  if (t) return t;
  const n = e.match(/^https?:\/\/[^/]+/);
  if (!n) return "Source";
  const s = Ec.find(([r, o]) => o.test(n[0]));
  return s && s[0] ? s[0] : "Source";
}
function _o(e) {
  const t = Ze(),
    n = $s(e.value.link);
  return {
    props: J(() => {
      const r = go(`/${t.data.relativePath}`);
      let o = !1;
      if (e.value.activeMatch) o = new RegExp(e.value.activeMatch).test(r);
      else {
        const i = go(e.value.link);
        o = i === "/" ? i === r : r.startsWith(i);
      }
      return {
        class: { active: o, isExternal: n },
        href: n ? e.value.link : Jt(e.value.link),
        target: e.value.target || (n ? "_blank" : null),
        rel: e.value.rel || (n ? "noopener noreferrer" : null),
        "aria-label": e.value.ariaLabel,
      };
    }),
    isExternal: n,
  };
}
function go(e) {
  return e
    .replace(/#.*$/, "")
    .replace(/\?.*$/, "")
    .replace(/\.(html|md)$/, "")
    .replace(/\/index$/, "/");
}
const Tc = {},
  Lc = {
    class: "icon outbound",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    x: "0px",
    y: "0px",
    viewBox: "0 0 100 100",
    width: "15",
    height: "15",
  },
  Pc = j(
    "path",
    {
      fill: "currentColor",
      d: "M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z",
    },
    null,
    -1
  ),
  Ac = j(
    "polygon",
    {
      fill: "currentColor",
      points:
        "45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9",
    },
    null,
    -1
  ),
  Ic = [Pc, Ac];
function Mc(e, t) {
  return R(), q("svg", Lc, Ic);
}
var Ts = _e(Tc, [["render", Mc]]);
const Oc = { class: "nav-link" },
  Rc = le({
    props: { item: null },
    setup(e) {
      const n = cr(e),
        { props: s, isExternal: r } = _o(n.item);
      return (o, i) => (
        R(),
        q("div", Oc, [
          j(
            "a",
            us({ class: "item" }, L(s)),
            [
              Ut(Re(e.item.text) + " ", 1),
              L(r) ? (R(), Ee(Ts, { key: 0 })) : fe("", !0),
            ],
            16
          ),
        ])
      );
    },
  });
var mo = _e(Rc, [["__scopeId", "data-v-b8818f8c"]]);
const Fc = (e) => (ar("data-v-bbc27490"), (e = e()), fr(), e),
  Nc = { class: "nav-dropdown-link-item" },
  Sc = Fc(() => j("span", { class: "arrow" }, null, -1)),
  Hc = { class: "text" },
  Bc = { class: "icon" },
  Uc = le({
    props: { item: null },
    setup(e) {
      const n = cr(e),
        { props: s, isExternal: r } = _o(n.item);
      return (o, i) => (
        R(),
        q("div", Nc, [
          j(
            "a",
            us({ class: "item" }, L(s)),
            [
              Sc,
              j("span", Hc, Re(e.item.text), 1),
              j("span", Bc, [L(r) ? (R(), Ee(Ts, { key: 0 })) : fe("", !0)]),
            ],
            16
          ),
        ])
      );
    },
  });
var jc = _e(Uc, [["__scopeId", "data-v-bbc27490"]]);
const Dc = ["aria-label"],
  Kc = { class: "button-text" },
  Wc = { class: "dialog" },
  qc = le({
    props: { item: null },
    setup(e) {
      const t = Ze(),
        n = st(!1);
      ct(
        () => t.path,
        () => {
          n.value = !1;
        }
      );
      function s() {
        n.value = !n.value;
      }
      return (r, o) => (
        R(),
        q(
          "div",
          { class: Qe(["nav-dropdown-link", { open: n.value }]) },
          [
            j(
              "button",
              { class: "button", "aria-label": e.item.ariaLabel, onClick: s },
              [
                j("span", Kc, Re(e.item.text), 1),
                j(
                  "span",
                  { class: Qe(["button-arrow", n.value ? "down" : "right"]) },
                  null,
                  2
                ),
              ],
              8,
              Dc
            ),
            j("ul", Wc, [
              (R(!0),
              q(
                ae,
                null,
                as(
                  e.item.items,
                  (i) => (
                    R(),
                    q("li", { key: i.text, class: "dialog-item" }, [
                      N(jc, { item: i }, null, 8, ["item"]),
                    ])
                  )
                ),
                128
              )),
            ]),
          ],
          2
        )
      );
    },
  });
var vo = _e(qc, [["__scopeId", "data-v-56bf3a3f"]]);
const zc = { key: 0, class: "nav-links" },
  Jc = { key: 1, class: "item" },
  Vc = { key: 2, class: "item" },
  Yc = le({
    setup(e) {
      const { theme: t } = Te(),
        n = wc(),
        s = $c(),
        r = J(() => t.value.nav || s.value || n.value);
      return (o, i) =>
        L(r)
          ? (R(),
            q("nav", zc, [
              L(t).nav
                ? (R(!0),
                  q(
                    ae,
                    { key: 0 },
                    as(
                      L(t).nav,
                      (l) => (
                        R(),
                        q("div", { key: l.text, class: "item" }, [
                          l.items
                            ? (R(),
                              Ee(vo, { key: 0, item: l }, null, 8, ["item"]))
                            : (R(),
                              Ee(mo, { key: 1, item: l }, null, 8, ["item"])),
                        ])
                      )
                    ),
                    128
                  ))
                : fe("", !0),
              L(n)
                ? (R(),
                  q("div", Jc, [N(vo, { item: L(n) }, null, 8, ["item"])]))
                : fe("", !0),
              L(s)
                ? (R(),
                  q("div", Vc, [N(mo, { item: L(s) }, null, 8, ["item"])]))
                : fe("", !0),
            ]))
          : fe("", !0);
    },
  });
var bo = _e(Yc, [["__scopeId", "data-v-eab3edfe"]]);
const Xc = { emits: ["toggle"] },
  Zc = j(
    "svg",
    {
      class: "icon",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": "true",
      role: "img",
      viewBox: "0 0 448 512",
    },
    [
      j("path", {
        fill: "currentColor",
        d: "M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z",
        class: "",
      }),
    ],
    -1
  ),
  Qc = [Zc];
function Gc(e, t, n, s, r, o) {
  return (
    R(),
    q(
      "div",
      {
        class: "sidebar-button",
        onClick: t[0] || (t[0] = (i) => e.$emit("toggle")),
      },
      Qc
    )
  );
}
var eu = _e(Xc, [["render", Gc]]);
const tu = (e) => (ar("data-v-675d8756"), (e = e()), fr(), e),
  nu = { class: "nav-bar" },
  su = tu(() => j("div", { class: "flex-grow" }, null, -1)),
  ru = { class: "nav" },
  ou = le({
    emits: ["toggle"],
    setup(e) {
      return (t, n) => (
        R(),
        q("header", nu, [
          N(eu, { onToggle: n[0] || (n[0] = (s) => t.$emit("toggle")) }),
          N(xc),
          su,
          j("div", ru, [N(bo)]),
          pe(t.$slots, "search", {}, void 0, !0),
        ])
      );
    },
  });
var iu = _e(ou, [["__scopeId", "data-v-675d8756"]]);
function lu() {
  let e = null,
    t = null;
  const n = du(s, 300);
  function s() {
    const i = cu(),
      l = uu(i);
    for (let u = 0; u < l.length; u++) {
      const f = l[u],
        h = l[u + 1],
        [v, w] = fu(u, f, h);
      if (v) {
        history.replaceState(null, document.title, w || " "), r(w);
        return;
      }
    }
  }
  function r(i) {
    if (
      (o(t), o(e), (t = document.querySelector(`.sidebar a[href="${i}"]`)), !t)
    )
      return;
    t.classList.add("active");
    const l = t.closest(".sidebar-links > ul > li");
    l && l !== t.parentElement
      ? ((e = l.querySelector("a")), e && e.classList.add("active"))
      : (e = null);
  }
  function o(i) {
    i && i.classList.remove("active");
  }
  bt(() => {
    s(), window.addEventListener("scroll", n);
  }),
    _r(() => {
      r(decodeURIComponent(location.hash));
    }),
    dn(() => {
      window.removeEventListener("scroll", n);
    });
}
function cu() {
  return [].slice.call(
    document.querySelectorAll(".sidebar a.sidebar-link-item")
  );
}
function uu(e) {
  return [].slice
    .call(document.querySelectorAll(".header-anchor"))
    .filter((t) => e.some((n) => n.hash === t.hash));
}
function au() {
  return document.querySelector(".nav-bar").offsetHeight;
}
function yo(e) {
  const t = au();
  return e.parentElement.offsetTop - t - 15;
}
function fu(e, t, n) {
  const s = window.scrollY;
  return e === 0 && s === 0
    ? [!0, null]
    : s < yo(t)
    ? [!1, null]
    : !n || s < yo(n)
    ? [!0, decodeURIComponent(t.hash)]
    : [!1, null];
}
function du(e, t) {
  let n,
    s = !1;
  return () => {
    n && clearTimeout(n),
      s
        ? (n = setTimeout(e, t))
        : (e(),
          (s = !0),
          setTimeout(() => {
            s = !1;
          }, t));
  };
}
function hu() {
  const e = Ze(),
    { site: t } = Te();
  return (
    lu(),
    J(() => {
      const n = e.data.headers,
        s = e.data.frontmatter.sidebar,
        r = e.data.frontmatter.sidebarDepth;
      if (s === !1) return [];
      if (s === "auto") return xo(n, r);
      const o = ks(t.value.themeConfig.sidebar, e.data.relativePath);
      return o === !1 ? [] : o === "auto" ? xo(n, r) : o;
    })
  );
}
function xo(e, t) {
  const n = [];
  if (e === void 0) return [];
  let s;
  return (
    e.forEach(({ level: r, title: o, slug: i }) => {
      if (r - 1 > t) return;
      const l = { text: o, link: `#${i}` };
      r === 2
        ? ((s = l), n.push(l))
        : s && (s.children || (s.children = [])).push(l);
    }),
    n
  );
}
const wo = (e) => {
  const t = Ze(),
    { site: n, frontmatter: s } = Te(),
    r = e.depth || 1,
    o = s.value.sidebarDepth || 1 / 0,
    i = t.data.headers,
    l = e.item.text,
    u = pu(n.value.base, e.item.link),
    f = e.item.children,
    h = hc(t, e.item.link),
    v = r < o ? Eo(h, f, i, r + 1) : null;
  return ut("li", { class: "sidebar-link" }, [
    ut(
      u ? "a" : "p",
      { class: { "sidebar-link-item": !0, active: h }, href: u },
      l
    ),
    v,
  ]);
};
function pu(e, t) {
  return t === void 0 || t.startsWith("#") ? t : pc(e, t);
}
function Eo(e, t, n, s = 1) {
  return t && t.length > 0
    ? ut(
        "ul",
        { class: "sidebar-links" },
        t.map((r) => ut(wo, { item: r, depth: s }))
      )
    : e && n
    ? Eo(!1, _u(n), void 0, s)
    : null;
}
function _u(e) {
  return $o(gu(e));
}
function gu(e) {
  e = e.map((n) => Object.assign({}, n));
  let t;
  return (
    e.forEach((n) => {
      n.level === 2 ? (t = n) : t && (t.children || (t.children = [])).push(n);
    }),
    e.filter((n) => n.level === 2)
  );
}
function $o(e) {
  return e.map((t) => ({
    text: t.title,
    link: `#${t.slug}`,
    children: t.children ? $o(t.children) : void 0,
  }));
}
const mu = { key: 0, class: "sidebar-links" },
  vu = le({
    setup(e) {
      const t = hu();
      return (n, s) =>
        L(t).length > 0
          ? (R(),
            q("ul", mu, [
              (R(!0),
              q(
                ae,
                null,
                as(
                  L(t),
                  (r) => (R(), Ee(L(wo), { item: r }, null, 8, ["item"]))
                ),
                256
              )),
            ]))
          : fe("", !0);
    },
  });
const bu = le({
  props: { open: { type: Boolean } },
  setup(e) {
    return (t, n) => (
      R(),
      q(
        "aside",
        { class: Qe(["sidebar", { open: e.open }]) },
        [
          N(bo, { class: "nav" }),
          pe(t.$slots, "sidebar-top", {}, void 0, !0),
          N(vu),
          pe(t.$slots, "sidebar-bottom", {}, void 0, !0),
        ],
        2
      )
    );
  },
});
var yu = _e(bu, [["__scopeId", "data-v-83e92a68"]]);
const xu = /bitbucket.org/;
function wu() {
  const { page: e, theme: t, frontmatter: n } = Te(),
    s = J(() => {
      const {
          repo: o,
          docsDir: i = "",
          docsBranch: l = "master",
          docsRepo: u = o,
          editLinks: f,
        } = t.value,
        h = n.value.editLink != null ? n.value.editLink : f,
        { relativePath: v } = e.value;
      return !h || !v || !o ? null : Eu(o, u, i, l, v);
    }),
    r = J(() => t.value.editLinkText || "Edit this page");
  return { url: s, text: r };
}
function Eu(e, t, n, s, r) {
  return xu.test(e) ? Cu(e, t, n, s, r) : $u(e, t, n, s, r);
}
function $u(e, t, n, s, r) {
  return (
    ($s(t) ? t : `https://github.com/${t}`).replace($n, "") +
    `/edit/${s}/` +
    (n ? n.replace($n, "") + "/" : "") +
    r
  );
}
function Cu(e, t, n, s, r) {
  return (
    ($s(t) ? t : e).replace($n, "") +
    `/src/${s}/` +
    (n ? n.replace($n, "") + "/" : "") +
    r +
    `?mode=edit&spa=0&at=${s}&fileviewer=file-view-default`
  );
}
const ku = { class: "edit-link" },
  Tu = ["href"],
  Lu = le({
    setup(e) {
      const { url: t, text: n } = wu();
      return (s, r) => (
        R(),
        q("div", ku, [
          L(t)
            ? (R(),
              q(
                "a",
                {
                  key: 0,
                  class: "link",
                  href: L(t),
                  target: "_blank",
                  rel: "noopener noreferrer",
                },
                [Ut(Re(L(n)) + " ", 1), N(Ts, { class: "icon" })],
                8,
                Tu
              ))
            : fe("", !0),
        ])
      );
    },
  });
var Pu = _e(Lu, [["__scopeId", "data-v-1ed99556"]]);
const Au = { key: 0, class: "last-updated" },
  Iu = { class: "prefix" },
  Mu = { class: "datetime" },
  Ou = le({
    setup(e) {
      const { theme: t, page: n } = Te(),
        s = J(() => {
          const i = t.value.lastUpdated;
          return i !== void 0 && i !== !1;
        }),
        r = J(() => {
          const i = t.value.lastUpdated;
          return i === !0 ? "Last Updated" : i;
        }),
        o = st("");
      return (
        bt(() => {
          o.value = new Date(n.value.lastUpdated).toLocaleString("en-US");
        }),
        (i, l) =>
          L(s)
            ? (R(),
              q("p", Au, [
                j("span", Iu, Re(L(r)) + ":", 1),
                j("span", Mu, Re(o.value), 1),
              ]))
            : fe("", !0)
      );
    },
  });
var Ru = _e(Ou, [["__scopeId", "data-v-5797b537"]]);
const Fu = { class: "page-footer" },
  Nu = { class: "edit" },
  Su = { class: "updated" },
  Hu = le({
    setup(e) {
      return (t, n) => (
        R(), q("footer", Fu, [j("div", Nu, [N(Pu)]), j("div", Su, [N(Ru)])])
      );
    },
  });
var Bu = _e(Hu, [["__scopeId", "data-v-fb8d84c6"]]);
function Uu() {
  const { page: e, theme: t } = Te(),
    n = J(() => ho(Cs(e.value.relativePath))),
    s = J(() => {
      const u = ks(t.value.sidebar, n.value);
      return Es(u) ? po(u) : [];
    }),
    r = J(() => s.value.findIndex((u) => u.link === n.value)),
    o = J(() => {
      if (
        t.value.nextLinks !== !1 &&
        r.value > -1 &&
        r.value < s.value.length - 1
      )
        return s.value[r.value + 1];
    }),
    i = J(() => {
      if (t.value.prevLinks !== !1 && r.value > 0) return s.value[r.value - 1];
    }),
    l = J(() => !!o.value || !!i.value);
  return { next: o, prev: i, hasLinks: l };
}
const ju = {},
  Du = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" },
  Ku = j(
    "path",
    {
      d: "M19,11H7.4l5.3-5.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0l-7,7c-0.1,0.1-0.2,0.2-0.2,0.3c-0.1,0.2-0.1,0.5,0,0.8c0.1,0.1,0.1,0.2,0.2,0.3l7,7c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L7.4,13H19c0.6,0,1-0.4,1-1S19.6,11,19,11z",
    },
    null,
    -1
  ),
  Wu = [Ku];
function qu(e, t) {
  return R(), q("svg", Du, Wu);
}
var zu = _e(ju, [["render", qu]]);
const Ju = {},
  Vu = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" },
  Yu = j(
    "path",
    {
      d: "M19.9,12.4c0.1-0.2,0.1-0.5,0-0.8c-0.1-0.1-0.1-0.2-0.2-0.3l-7-7c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l5.3,5.3H5c-0.6,0-1,0.4-1,1s0.4,1,1,1h11.6l-5.3,5.3c-0.4,0.4-0.4,1,0,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l7-7C19.8,12.6,19.9,12.5,19.9,12.4z",
    },
    null,
    -1
  ),
  Xu = [Yu];
function Zu(e, t) {
  return R(), q("svg", Vu, Xu);
}
var Qu = _e(Ju, [["render", Zu]]);
const Gu = { key: 0, class: "next-and-prev-link" },
  ea = { class: "container" },
  ta = { class: "prev" },
  na = ["href"],
  sa = { class: "text" },
  ra = { class: "next" },
  oa = ["href"],
  ia = { class: "text" },
  la = le({
    setup(e) {
      const { hasLinks: t, prev: n, next: s } = Uu();
      return (r, o) =>
        L(t)
          ? (R(),
            q("div", Gu, [
              j("div", ea, [
                j("div", ta, [
                  L(n)
                    ? (R(),
                      q(
                        "a",
                        { key: 0, class: "link", href: L(Jt)(L(n).link) },
                        [
                          N(zu, { class: "icon icon-prev" }),
                          j("span", sa, Re(L(n).text), 1),
                        ],
                        8,
                        na
                      ))
                    : fe("", !0),
                ]),
                j("div", ra, [
                  L(s)
                    ? (R(),
                      q(
                        "a",
                        { key: 0, class: "link", href: L(Jt)(L(s).link) },
                        [
                          j("span", ia, Re(L(s).text), 1),
                          N(Qu, { class: "icon icon-next" }),
                        ],
                        8,
                        oa
                      ))
                    : fe("", !0),
                ]),
              ]),
            ]))
          : fe("", !0);
    },
  });
var ca = _e(la, [["__scopeId", "data-v-38ede35f"]]);
const ua = { class: "page" },
  aa = { class: "container" },
  fa = le({
    setup(e) {
      return (t, n) => {
        const s = ls("Content");
        return (
          R(),
          q("main", ua, [
            j("div", aa, [
              pe(t.$slots, "top", {}, void 0, !0),
              N(s, { class: "content" }),
              N(Bu),
              N(ca),
              pe(t.$slots, "bottom", {}, void 0, !0),
            ]),
          ])
        );
      };
    },
  });
var da = _e(fa, [["__scopeId", "data-v-7eddb2c4"]]);
const ha = { key: 0, id: "ads-container" },
  pa = le({
    setup(e) {
      const t = Ai(() => import("./Home.03134376.js")),
        n = () => null,
        s = n,
        r = n,
        o = n,
        i = Ze(),
        { site: l, page: u, theme: f, frontmatter: h } = Te(),
        v = J(() => !!h.value.customLayout),
        w = J(() => !!h.value.home),
        C = J(() => Object.keys(l.value.langs).length > 1),
        T = J(() => {
          const P = f.value;
          return h.value.navbar === !1 || P.navbar === !1
            ? !1
            : l.value.title || P.logo || P.repo || P.nav;
        }),
        H = st(!1),
        g = J(() =>
          h.value.home || h.value.sidebar === !1
            ? !1
            : !mc(ks(f.value.sidebar, i.data.relativePath))
        ),
        b = (P) => {
          H.value = typeof P == "boolean" ? P : !H.value;
        },
        M = b.bind(null, !1);
      ct(i, M);
      const D = J(() => [
        {
          "no-navbar": !T.value,
          "sidebar-open": H.value,
          "no-sidebar": !g.value,
        },
      ]);
      return (P, V) => {
        const X = ls("Content"),
          B = ls("Debug");
        return (
          R(),
          q(
            ae,
            null,
            [
              j(
                "div",
                { class: Qe(["theme", L(D)]) },
                [
                  L(T)
                    ? (R(),
                      Ee(
                        iu,
                        { key: 0, onToggle: b },
                        {
                          search: Ue(() => [
                            pe(P.$slots, "navbar-search", {}, () => [
                              L(f).algolia
                                ? (R(),
                                  Ee(
                                    L(o),
                                    {
                                      key: 0,
                                      options: L(f).algolia,
                                      multilang: L(C),
                                    },
                                    null,
                                    8,
                                    ["options", "multilang"]
                                  ))
                                : fe("", !0),
                            ]),
                          ]),
                          _: 3,
                        }
                      ))
                    : fe("", !0),
                  N(
                    yu,
                    { open: H.value },
                    {
                      "sidebar-top": Ue(() => [pe(P.$slots, "sidebar-top")]),
                      "sidebar-bottom": Ue(() => [
                        pe(P.$slots, "sidebar-bottom"),
                      ]),
                      _: 3,
                    },
                    8,
                    ["open"]
                  ),
                  j("div", {
                    class: "sidebar-mask",
                    onClick: V[0] || (V[0] = (se) => b(!1)),
                  }),
                  L(v)
                    ? (R(), Ee(X, { key: 1 }))
                    : L(w)
                    ? pe(P.$slots, "home", { key: 2 }, () => [
                        N(L(t), null, {
                          hero: Ue(() => [pe(P.$slots, "home-hero")]),
                          features: Ue(() => [pe(P.$slots, "home-features")]),
                          footer: Ue(() => [pe(P.$slots, "home-footer")]),
                          _: 3,
                        }),
                      ])
                    : (R(),
                      Ee(
                        da,
                        { key: 3 },
                        {
                          top: Ue(() => [
                            pe(P.$slots, "page-top-ads", {}, () => [
                              L(f).carbonAds && L(f).carbonAds.carbon
                                ? (R(),
                                  q("div", ha, [
                                    (R(),
                                    Ee(
                                      L(s),
                                      {
                                        key: "carbon" + L(u).relativePath,
                                        code: L(f).carbonAds.carbon,
                                        placement: L(f).carbonAds.placement,
                                      },
                                      null,
                                      8,
                                      ["code", "placement"]
                                    )),
                                  ]))
                                : fe("", !0),
                            ]),
                            pe(P.$slots, "page-top"),
                          ]),
                          bottom: Ue(() => [
                            pe(P.$slots, "page-bottom"),
                            pe(P.$slots, "page-bottom-ads", {}, () => [
                              L(f).carbonAds && L(f).carbonAds.custom
                                ? (R(),
                                  Ee(
                                    L(r),
                                    {
                                      key: "custom" + L(u).relativePath,
                                      code: L(f).carbonAds.custom,
                                      placement: L(f).carbonAds.placement,
                                    },
                                    null,
                                    8,
                                    ["code", "placement"]
                                  ))
                                : fe("", !0),
                            ]),
                          ]),
                          _: 3,
                        }
                      )),
                ],
                2
              ),
              N(B),
            ],
            64
          )
        );
      };
    },
  }),
  _a = { class: "theme" },
  ga = j("h1", null, "404", -1),
  ma = ["href"],
  va = le({
    setup(e) {
      const { site: t } = Te(),
        n = [
          "There's nothing here.",
          "How did we get here?",
          "That's a Four-Oh-Four.",
          "Looks like we've got some broken links.",
        ];
      function s() {
        return n[Math.floor(Math.random() * n.length)];
      }
      return (r, o) => (
        R(),
        q("div", _a, [
          ga,
          j("blockquote", null, Re(s()), 1),
          j(
            "a",
            { href: L(t).base, "aria-label": "go to home" },
            "Take me home.",
            8,
            ma
          ),
        ])
      );
    },
  }),
  Co = { Layout: pa, NotFound: va },
  Ls = new Set(),
  ko = () => document.createElement("link"),
  ba = (e) => {
    const t = ko();
    (t.rel = "prefetch"), (t.href = e), document.head.appendChild(t);
  },
  ya = (e) => {
    const t = new XMLHttpRequest();
    t.open("GET", e, (t.withCredentials = !0)), t.send();
  };
let Cn;
const xa =
  ke &&
  (Cn = ko()) &&
  Cn.relList &&
  Cn.relList.supports &&
  Cn.relList.supports("prefetch")
    ? ba
    : ya;
function wa() {
  if (!ke || !window.IntersectionObserver) return;
  let e;
  if ((e = navigator.connection) && (e.saveData || /2g/.test(e.effectiveType)))
    return;
  const t = window.requestIdleCallback || setTimeout;
  let n = null;
  const s = () => {
    n && n.disconnect(),
      (n = new IntersectionObserver((o) => {
        o.forEach((i) => {
          if (i.isIntersecting) {
            const l = i.target;
            n.unobserve(l);
            const { pathname: u } = l;
            if (!Ls.has(u)) {
              Ls.add(u);
              const f = io(u);
              xa(f);
            }
          }
        });
      })),
      t(() => {
        document.querySelectorAll("#app a").forEach((o) => {
          const { target: i, hostname: l, pathname: u } = o,
            f = u.match(/\.\w+$/);
          (f && f[0] !== ".html") ||
            (i !== "_blank" &&
              l === location.hostname &&
              (u !== location.pathname ? n.observe(o) : Ls.add(u)));
        });
      });
  };
  bt(s);
  const r = Ze();
  ct(() => r.path, s),
    dn(() => {
      n && n.disconnect();
    });
}
const Ea = le({
    setup(e, { slots: t }) {
      const n = st(!1);
      return (
        bt(() => {
          n.value = !0;
        }),
        () => (n.value && t.default ? t.default() : null)
      );
    },
  }),
  $a = Co.NotFound || (() => "404 Not Found"),
  Ca = {
    name: "VitePressApp",
    setup() {
      const { site: e } = Te();
      return (
        bt(() => {
          ct(
            () => e.value.lang,
            (t) => {
              document.documentElement.lang = t;
            },
            { immediate: !0 }
          );
        }),
        wa(),
        () => ut(Co.Layout)
      );
    },
  };
function ka() {
  const e = La(),
    t = Ta();
  t.provide(lo, e);
  const n = tc(e.route);
  return (
    t.provide(ro, n),
    ke && ic(e.route, n.site),
    t.component("Content", uc),
    t.component("ClientOnly", Ea),
    t.component("Debug", () => null),
    Object.defineProperty(t.config.globalProperties, "$frontmatter", {
      get() {
        return n.frontmatter.value;
      },
    }),
    { app: t, router: e }
  );
}
function Ta() {
  return Jl(Ca);
}
function La() {
  let e = ke,
    t;
  return rc((n) => {
    let s = io(n);
    return (
      e && (t = s),
      (e || t === s) && (s = s.replace(/\.js$/, ".lean.js")),
      ke ? ((e = !1), import(s)) : require(s)
    );
  }, $a);
}
if (ke) {
  const { app: e, router: t } = ka();
  t.go().then(() => {
    e.mount("#app");
  });
}
export {
  ae as F,
  mo as N,
  _e as _,
  Pa as a,
  j as b,
  q as c,
  ka as createApp,
  Ut as d,
  le as e,
  J as f,
  L as g,
  fe as h,
  Ee as i,
  ls as j,
  N as k,
  pe as l,
  R as o,
  as as r,
  Re as t,
  Te as u,
  Jt as w,
};
