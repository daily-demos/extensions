var R = { exports: {} },
  ee = typeof Reflect == "object" ? Reflect : null,
  lt =
    ee && typeof ee.apply == "function"
      ? ee.apply
      : function (t, n, r) {
          return Function.prototype.apply.call(t, n, r);
        },
  _e;
ee && typeof ee.ownKeys == "function"
  ? (_e = ee.ownKeys)
  : Object.getOwnPropertySymbols
  ? (_e = function (t) {
      return Object.getOwnPropertyNames(t).concat(
        Object.getOwnPropertySymbols(t)
      );
    })
  : (_e = function (t) {
      return Object.getOwnPropertyNames(t);
    });
function Kr(e) {
  console && console.warn && console.warn(e);
}
var or =
  Number.isNaN ||
  function (t) {
    return t !== t;
  };
function y() {
  y.init.call(this);
}
R.exports = y;
R.exports.once = Xr;
y.EventEmitter = y;
y.prototype._events = void 0;
y.prototype._eventsCount = 0;
y.prototype._maxListeners = void 0;
var dt = 10;
function je(e) {
  if (typeof e != "function")
    throw new TypeError(
      'The "listener" argument must be of type Function. Received type ' +
        typeof e
    );
}
Object.defineProperty(y, "defaultMaxListeners", {
  enumerable: !0,
  get: function () {
    return dt;
  },
  set: function (e) {
    if (typeof e != "number" || e < 0 || or(e))
      throw new RangeError(
        'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
          e +
          "."
      );
    dt = e;
  },
});
y.init = function () {
  (this._events === void 0 ||
    this._events === Object.getPrototypeOf(this)._events) &&
    ((this._events = /* @__PURE__ */ Object.create(null)),
    (this._eventsCount = 0)),
    (this._maxListeners = this._maxListeners || void 0);
};
y.prototype.setMaxListeners = function (t) {
  if (typeof t != "number" || t < 0 || or(t))
    throw new RangeError(
      'The value of "n" is out of range. It must be a non-negative number. Received ' +
        t +
        "."
    );
  return (this._maxListeners = t), this;
};
function sr(e) {
  return e._maxListeners === void 0 ? y.defaultMaxListeners : e._maxListeners;
}
y.prototype.getMaxListeners = function () {
  return sr(this);
};
y.prototype.emit = function (t) {
  for (var n = [], r = 1; r < arguments.length; r++) n.push(arguments[r]);
  var i = t === "error",
    a = this._events;
  if (a !== void 0) i = i && a.error === void 0;
  else if (!i) return !1;
  if (i) {
    var o;
    if ((n.length > 0 && (o = n[0]), o instanceof Error)) throw o;
    var s = new Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
    throw ((s.context = o), s);
  }
  var c = a[t];
  if (c === void 0) return !1;
  if (typeof c == "function") lt(c, this, n);
  else
    for (var u = c.length, d = hr(c, u), r = 0; r < u; ++r) lt(d[r], this, n);
  return !0;
};
function cr(e, t, n, r) {
  var i, a, o;
  if (
    (je(n),
    (a = e._events),
    a === void 0
      ? ((a = e._events = /* @__PURE__ */ Object.create(null)),
        (e._eventsCount = 0))
      : (a.newListener !== void 0 &&
          (e.emit("newListener", t, n.listener ? n.listener : n),
          (a = e._events)),
        (o = a[t])),
    o === void 0)
  )
    (o = a[t] = n), ++e._eventsCount;
  else if (
    (typeof o == "function"
      ? (o = a[t] = r ? [n, o] : [o, n])
      : r
      ? o.unshift(n)
      : o.push(n),
    (i = sr(e)),
    i > 0 && o.length > i && !o.warned)
  ) {
    o.warned = !0;
    var s = new Error(
      "Possible EventEmitter memory leak detected. " +
        o.length +
        " " +
        String(t) +
        " listeners added. Use emitter.setMaxListeners() to increase limit"
    );
    (s.name = "MaxListenersExceededWarning"),
      (s.emitter = e),
      (s.type = t),
      (s.count = o.length),
      Kr(s);
  }
  return e;
}
y.prototype.addListener = function (t, n) {
  return cr(this, t, n, !1);
};
y.prototype.on = y.prototype.addListener;
y.prototype.prependListener = function (t, n) {
  return cr(this, t, n, !0);
};
function Qr() {
  if (!this.fired)
    return (
      this.target.removeListener(this.type, this.wrapFn),
      (this.fired = !0),
      arguments.length === 0
        ? this.listener.call(this.target)
        : this.listener.apply(this.target, arguments)
    );
}
function ur(e, t, n) {
  var r = { fired: !1, wrapFn: void 0, target: e, type: t, listener: n },
    i = Qr.bind(r);
  return (i.listener = n), (r.wrapFn = i), i;
}
y.prototype.once = function (t, n) {
  return je(n), this.on(t, ur(this, t, n)), this;
};
y.prototype.prependOnceListener = function (t, n) {
  return je(n), this.prependListener(t, ur(this, t, n)), this;
};
y.prototype.removeListener = function (t, n) {
  var r, i, a, o, s;
  if ((je(n), (i = this._events), i === void 0)) return this;
  if (((r = i[t]), r === void 0)) return this;
  if (r === n || r.listener === n)
    --this._eventsCount === 0
      ? (this._events = /* @__PURE__ */ Object.create(null))
      : (delete i[t],
        i.removeListener && this.emit("removeListener", t, r.listener || n));
  else if (typeof r != "function") {
    for (a = -1, o = r.length - 1; o >= 0; o--)
      if (r[o] === n || r[o].listener === n) {
        (s = r[o].listener), (a = o);
        break;
      }
    if (a < 0) return this;
    a === 0 ? r.shift() : $r(r, a),
      r.length === 1 && (i[t] = r[0]),
      i.removeListener !== void 0 && this.emit("removeListener", t, s || n);
  }
  return this;
};
y.prototype.off = y.prototype.removeListener;
y.prototype.removeAllListeners = function (t) {
  var n, r, i;
  if (((r = this._events), r === void 0)) return this;
  if (r.removeListener === void 0)
    return (
      arguments.length === 0
        ? ((this._events = /* @__PURE__ */ Object.create(null)),
          (this._eventsCount = 0))
        : r[t] !== void 0 &&
          (--this._eventsCount === 0
            ? (this._events = /* @__PURE__ */ Object.create(null))
            : delete r[t]),
      this
    );
  if (arguments.length === 0) {
    var a = Object.keys(r),
      o;
    for (i = 0; i < a.length; ++i)
      (o = a[i]), o !== "removeListener" && this.removeAllListeners(o);
    return (
      this.removeAllListeners("removeListener"),
      (this._events = /* @__PURE__ */ Object.create(null)),
      (this._eventsCount = 0),
      this
    );
  }
  if (((n = r[t]), typeof n == "function")) this.removeListener(t, n);
  else if (n !== void 0)
    for (i = n.length - 1; i >= 0; i--) this.removeListener(t, n[i]);
  return this;
};
function lr(e, t, n) {
  var r = e._events;
  if (r === void 0) return [];
  var i = r[t];
  return i === void 0
    ? []
    : typeof i == "function"
    ? n
      ? [i.listener || i]
      : [i]
    : n
    ? Zr(i)
    : hr(i, i.length);
}
y.prototype.listeners = function (t) {
  return lr(this, t, !0);
};
y.prototype.rawListeners = function (t) {
  return lr(this, t, !1);
};
y.listenerCount = function (e, t) {
  return typeof e.listenerCount == "function"
    ? e.listenerCount(t)
    : dr.call(e, t);
};
y.prototype.listenerCount = dr;
function dr(e) {
  var t = this._events;
  if (t !== void 0) {
    var n = t[e];
    if (typeof n == "function") return 1;
    if (n !== void 0) return n.length;
  }
  return 0;
}
y.prototype.eventNames = function () {
  return this._eventsCount > 0 ? _e(this._events) : [];
};
function hr(e, t) {
  for (var n = new Array(t), r = 0; r < t; ++r) n[r] = e[r];
  return n;
}
function $r(e, t) {
  for (; t + 1 < e.length; t++) e[t] = e[t + 1];
  e.pop();
}
function Zr(e) {
  for (var t = new Array(e.length), n = 0; n < t.length; ++n)
    t[n] = e[n].listener || e[n];
  return t;
}
function Xr(e, t) {
  return new Promise(function (n, r) {
    function i(o) {
      e.removeListener(t, a), r(o);
    }
    function a() {
      typeof e.removeListener == "function" && e.removeListener("error", i),
        n([].slice.call(arguments));
    }
    fr(e, t, a, { once: !0 }), t !== "error" && Yr(e, i, { once: !0 });
  });
}
function Yr(e, t, n) {
  typeof e.on == "function" && fr(e, "error", t, n);
}
function fr(e, t, n, r) {
  if (typeof e.on == "function") r.once ? e.once(t, n) : e.on(t, n);
  else if (typeof e.addEventListener == "function")
    e.addEventListener(t, function i(a) {
      r.once && e.removeEventListener(t, i), n(a);
    });
  else
    throw new TypeError(
      'The "emitter" argument must be of type EventEmitter. Received type ' +
        typeof e
    );
}
var en = function (e) {
    if (Array.isArray(e)) return e;
  },
  tn = function (e, t) {
    if (typeof Symbol < "u" && Symbol.iterator in Object(e)) {
      var n = [],
        r = !0,
        i = !1,
        a = void 0;
      try {
        for (
          var o, s = e[Symbol.iterator]();
          !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t);
          r = !0
        );
      } catch (c) {
        (i = !0), (a = c);
      } finally {
        try {
          r || s.return == null || s.return();
        } finally {
          if (i) throw a;
        }
      }
      return n;
    }
  },
  ht = function (e, t) {
    (t == null || t > e.length) && (t = e.length);
    for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
    return r;
  },
  rn = function (e, t) {
    if (e) {
      if (typeof e == "string") return ht(e, t);
      var n = Object.prototype.toString.call(e).slice(8, -1);
      return (
        n === "Object" && e.constructor && (n = e.constructor.name),
        n === "Map" || n === "Set"
          ? Array.from(e)
          : n === "Arguments" ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          ? ht(e, t)
          : void 0
      );
    }
  },
  nn = function () {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  },
  qe = function (e, t) {
    return en(e) || tn(e, t) || rn(e, t) || nn();
  },
  an = function (e, t) {
    if (e == null) return {};
    var n,
      r,
      i = {},
      a = Object.keys(e);
    for (r = 0; r < a.length; r++)
      (n = a[r]), t.indexOf(n) >= 0 || (i[n] = e[n]);
    return i;
  },
  on = function (e, t) {
    if (e == null) return {};
    var n,
      r,
      i = an(e, t);
    if (Object.getOwnPropertySymbols) {
      var a = Object.getOwnPropertySymbols(e);
      for (r = 0; r < a.length; r++)
        (n = a[r]),
          t.indexOf(n) >= 0 ||
            (Object.prototype.propertyIsEnumerable.call(e, n) && (i[n] = e[n]));
    }
    return i;
  };
function ft(e, t, n, r, i, a, o) {
  try {
    var s = e[a](o),
      c = s.value;
  } catch (u) {
    return void n(u);
  }
  s.done ? t(c) : Promise.resolve(c).then(r, i);
}
var v = function (e) {
    return function () {
      var t = this,
        n = arguments;
      return new Promise(function (r, i) {
        var a = e.apply(t, n);
        function o(c) {
          ft(a, r, i, o, s, "next", c);
        }
        function s(c) {
          ft(a, r, i, o, s, "throw", c);
        }
        o(void 0);
      });
    };
  },
  x = function (e, t) {
    if (!(e instanceof t))
      throw new TypeError("Cannot call a class as a function");
  },
  E = function (e) {
    if (e === void 0)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    return e;
  };
function pt(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      "value" in r && (r.writable = !0),
      Object.defineProperty(e, r.key, r);
  }
}
var L = function (e, t, n) {
    return t && pt(e.prototype, t), n && pt(e, n), e;
  },
  ge =
    typeof globalThis < "u"
      ? globalThis
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : typeof self < "u"
      ? self
      : {};
function q(e, t) {
  return e((t = { exports: {} }), t.exports), t.exports;
}
var nt = q(function (e) {
    function t(n, r) {
      return (
        (e.exports = t =
          Object.setPrototypeOf ||
          function (i, a) {
            return (i.__proto__ = a), i;
          }),
        t(n, r)
      );
    }
    e.exports = t;
  }),
  Pe = function (e, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Super expression must either be null or a function");
    (e.prototype = Object.create(t && t.prototype, {
      constructor: { value: e, writable: !0, configurable: !0 },
    })),
      t && nt(e, t);
  },
  O = q(function (e) {
    function t(n) {
      return (
        typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
          ? (e.exports = t =
              function (r) {
                return typeof r;
              })
          : (e.exports = t =
              function (r) {
                return r &&
                  typeof Symbol == "function" &&
                  r.constructor === Symbol &&
                  r !== Symbol.prototype
                  ? "symbol"
                  : typeof r;
              }),
        t(n)
      );
    }
    e.exports = t;
  }),
  Ae = function (e, t) {
    return !t || (O(t) !== "object" && typeof t != "function") ? E(e) : t;
  },
  B = q(function (e) {
    function t(n) {
      return (
        (e.exports = t =
          Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function (r) {
                return r.__proto__ || Object.getPrototypeOf(r);
              }),
        t(n)
      );
    }
    e.exports = t;
  }),
  F = function (e, t, n) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = n),
      e
    );
  },
  sn = typeof Map == "function",
  cn = typeof Set == "function",
  un = typeof WeakSet == "function",
  vt = Object.keys,
  gt = function (e, t) {
    return e && typeof e == "object" && t.add(e);
  },
  mt = function (e, t, n, r) {
    for (var i, a = 0; a < e.length; a++)
      if (n((i = e[a])[0], t[0], r) && n(i[1], t[1], r)) return !0;
    return !1;
  },
  Ge = function (e, t, n, r) {
    for (var i = 0; i < e.length; i++) if (n(e[i], t, r)) return !0;
    return !1;
  },
  de = function (e, t) {
    return e === t || (e != e && t != t);
  },
  yt = function (e) {
    return e.constructor === Object;
  },
  bt = function (e) {
    return typeof e.then == "function";
  },
  _t = function (e) {
    return !(!e.$$typeof || !e._store);
  },
  wt = function (e) {
    return function (t) {
      var n = e || t;
      return function (r, i, a) {
        a === void 0 &&
          (a = un
            ? /* @__PURE__ */ new WeakSet()
            : /* @__PURE__ */ Object.create({
                _values: [],
                add: function (c) {
                  this._values.push(c);
                },
                has: function (c) {
                  return !!~this._values.indexOf(c);
                },
              }));
        var o = a.has(r),
          s = a.has(i);
        return o || s ? o && s : (gt(r, a), gt(i, a), n(r, i, a));
      };
    };
  },
  kt = function (e) {
    var t = [];
    return (
      e.forEach(function (n, r) {
        return t.push([r, n]);
      }),
      t
    );
  },
  Mt = function (e) {
    var t = [];
    return (
      e.forEach(function (n) {
        return t.push(n);
      }),
      t
    );
  },
  ln = function (e, t, n, r) {
    if (e.length !== t.length) return !1;
    for (var i = 0; i < e.length; i++) if (!n(e[i], t[i], r)) return !1;
    return !0;
  },
  dn = function (e, t, n, r) {
    if (e.size !== t.size) return !1;
    for (var i = kt(e), a = kt(t), o = 0; o < i.length; o++)
      if (!mt(a, i[o], n, r) || !mt(i, a[o], n, r)) return !1;
    return !0;
  },
  St = function (e, t, n, r) {
    var i,
      a = vt(e),
      o = vt(t);
    if (a.length !== o.length) return !1;
    for (var s = 0; s < a.length; s++)
      if (
        ((i = a[s]),
        !Ge(o, i, de) ||
          ((i !== "_owner" || !_t(e) || !_t(t)) && !n(e[i], t[i], r)))
      )
        return !1;
    return !0;
  },
  hn = function (e, t) {
    return (
      e.source === t.source &&
      e.global === t.global &&
      e.ignoreCase === t.ignoreCase &&
      e.multiline === t.multiline &&
      e.unicode === t.unicode &&
      e.sticky === t.sticky &&
      e.lastIndex === t.lastIndex
    );
  },
  fn = function (e, t, n, r) {
    if (e.size !== t.size) return !1;
    for (var i = Mt(e), a = Mt(t), o = 0; o < i.length; o++)
      if (!Ge(a, i[o], n, r) || !Ge(i, a[o], n, r)) return !1;
    return !0;
  },
  Ct = Array.isArray,
  we = function (e) {
    var t = typeof e == "function" ? e(n) : n;
    function n(r, i, a) {
      if (de(r, i)) return !0;
      var o = typeof r;
      if (o !== typeof i || o !== "object" || !r || !i) return !1;
      if (yt(r) && yt(i)) return St(r, i, t, a);
      var s = Ct(r),
        c = Ct(i);
      if (s || c) return s === c && ln(r, i, t, a);
      var u = r instanceof Date,
        d = i instanceof Date;
      if (u || d) return u === d && de(r.getTime(), i.getTime());
      var h = r instanceof RegExp,
        f = i instanceof RegExp;
      if (h || f) return h === f && hn(r, i);
      if (bt(r) || bt(i)) return r === i;
      if (sn) {
        var g = r instanceof Map,
          w = i instanceof Map;
        if (g || w) return g === w && dn(r, i, t, a);
      }
      if (cn) {
        var S = r instanceof Set,
          j = i instanceof Set;
        if (S || j) return S === j && fn(r, i, t, a);
      }
      return St(r, i, t, a);
    }
    return n;
  },
  ie = (we(wt()), we(wt(de)), we());
we(function () {
  return de;
});
const pn = {
    "Amazon Silk": "amazon_silk",
    "Android Browser": "android",
    Bada: "bada",
    BlackBerry: "blackberry",
    Chrome: "chrome",
    Chromium: "chromium",
    Electron: "electron",
    Epiphany: "epiphany",
    Firefox: "firefox",
    Focus: "focus",
    Generic: "generic",
    "Google Search": "google_search",
    Googlebot: "googlebot",
    "Internet Explorer": "ie",
    "K-Meleon": "k_meleon",
    Maxthon: "maxthon",
    "Microsoft Edge": "edge",
    "MZ Browser": "mz",
    "NAVER Whale Browser": "naver",
    Opera: "opera",
    "Opera Coast": "opera_coast",
    PhantomJS: "phantomjs",
    Puffin: "puffin",
    QupZilla: "qupzilla",
    QQ: "qq",
    QQLite: "qqlite",
    Safari: "safari",
    Sailfish: "sailfish",
    "Samsung Internet for Android": "samsung_internet",
    SeaMonkey: "seamonkey",
    Sleipnir: "sleipnir",
    Swing: "swing",
    Tizen: "tizen",
    "UC Browser": "uc",
    Vivaldi: "vivaldi",
    "WebOS Browser": "webos",
    WeChat: "wechat",
    "Yandex Browser": "yandex",
    Roku: "roku",
  },
  pr = {
    amazon_silk: "Amazon Silk",
    android: "Android Browser",
    bada: "Bada",
    blackberry: "BlackBerry",
    chrome: "Chrome",
    chromium: "Chromium",
    electron: "Electron",
    epiphany: "Epiphany",
    firefox: "Firefox",
    focus: "Focus",
    generic: "Generic",
    googlebot: "Googlebot",
    google_search: "Google Search",
    ie: "Internet Explorer",
    k_meleon: "K-Meleon",
    maxthon: "Maxthon",
    edge: "Microsoft Edge",
    mz: "MZ Browser",
    naver: "NAVER Whale Browser",
    opera: "Opera",
    opera_coast: "Opera Coast",
    phantomjs: "PhantomJS",
    puffin: "Puffin",
    qupzilla: "QupZilla",
    qq: "QQ Browser",
    qqlite: "QQ Browser Lite",
    safari: "Safari",
    sailfish: "Sailfish",
    samsung_internet: "Samsung Internet for Android",
    seamonkey: "SeaMonkey",
    sleipnir: "Sleipnir",
    swing: "Swing",
    tizen: "Tizen",
    uc: "UC Browser",
    vivaldi: "Vivaldi",
    webos: "WebOS Browser",
    wechat: "WeChat",
    yandex: "Yandex Browser",
  },
  M = { tablet: "tablet", mobile: "mobile", desktop: "desktop", tv: "tv" },
  P = {
    WindowsPhone: "Windows Phone",
    Windows: "Windows",
    MacOS: "macOS",
    iOS: "iOS",
    Android: "Android",
    WebOS: "WebOS",
    BlackBerry: "BlackBerry",
    Bada: "Bada",
    Tizen: "Tizen",
    Linux: "Linux",
    ChromeOS: "Chrome OS",
    PlayStation4: "PlayStation 4",
    Roku: "Roku",
  },
  N = {
    EdgeHTML: "EdgeHTML",
    Blink: "Blink",
    Trident: "Trident",
    Presto: "Presto",
    Gecko: "Gecko",
    WebKit: "WebKit",
  };
class l {
  static getFirstMatch(t, n) {
    const r = n.match(t);
    return (r && r.length > 0 && r[1]) || "";
  }
  static getSecondMatch(t, n) {
    const r = n.match(t);
    return (r && r.length > 1 && r[2]) || "";
  }
  static matchAndReturnConst(t, n, r) {
    if (t.test(n)) return r;
  }
  static getWindowsVersionName(t) {
    switch (t) {
      case "NT":
        return "NT";
      case "XP":
        return "XP";
      case "NT 5.0":
        return "2000";
      case "NT 5.1":
        return "XP";
      case "NT 5.2":
        return "2003";
      case "NT 6.0":
        return "Vista";
      case "NT 6.1":
        return "7";
      case "NT 6.2":
        return "8";
      case "NT 6.3":
        return "8.1";
      case "NT 10.0":
        return "10";
      default:
        return;
    }
  }
  static getMacOSVersionName(t) {
    const n = t
      .split(".")
      .splice(0, 2)
      .map((r) => parseInt(r, 10) || 0);
    if ((n.push(0), n[0] === 10))
      switch (n[1]) {
        case 5:
          return "Leopard";
        case 6:
          return "Snow Leopard";
        case 7:
          return "Lion";
        case 8:
          return "Mountain Lion";
        case 9:
          return "Mavericks";
        case 10:
          return "Yosemite";
        case 11:
          return "El Capitan";
        case 12:
          return "Sierra";
        case 13:
          return "High Sierra";
        case 14:
          return "Mojave";
        case 15:
          return "Catalina";
        default:
          return;
      }
  }
  static getAndroidVersionName(t) {
    const n = t
      .split(".")
      .splice(0, 2)
      .map((r) => parseInt(r, 10) || 0);
    if ((n.push(0), !(n[0] === 1 && n[1] < 5)))
      return n[0] === 1 && n[1] < 6
        ? "Cupcake"
        : n[0] === 1 && n[1] >= 6
        ? "Donut"
        : n[0] === 2 && n[1] < 2
        ? "Eclair"
        : n[0] === 2 && n[1] === 2
        ? "Froyo"
        : n[0] === 2 && n[1] > 2
        ? "Gingerbread"
        : n[0] === 3
        ? "Honeycomb"
        : n[0] === 4 && n[1] < 1
        ? "Ice Cream Sandwich"
        : n[0] === 4 && n[1] < 4
        ? "Jelly Bean"
        : n[0] === 4 && n[1] >= 4
        ? "KitKat"
        : n[0] === 5
        ? "Lollipop"
        : n[0] === 6
        ? "Marshmallow"
        : n[0] === 7
        ? "Nougat"
        : n[0] === 8
        ? "Oreo"
        : n[0] === 9
        ? "Pie"
        : void 0;
  }
  static getVersionPrecision(t) {
    return t.split(".").length;
  }
  static compareVersions(t, n, r = !1) {
    const i = l.getVersionPrecision(t),
      a = l.getVersionPrecision(n);
    let o = Math.max(i, a),
      s = 0;
    const c = l.map([t, n], (u) => {
      const d = o - l.getVersionPrecision(u),
        h = u + new Array(d + 1).join(".0");
      return l
        .map(h.split("."), (f) => new Array(20 - f.length).join("0") + f)
        .reverse();
    });
    for (r && (s = o - Math.min(i, a)), o -= 1; o >= s; ) {
      if (c[0][o] > c[1][o]) return 1;
      if (c[0][o] === c[1][o]) {
        if (o === s) return 0;
        o -= 1;
      } else if (c[0][o] < c[1][o]) return -1;
    }
  }
  static map(t, n) {
    const r = [];
    let i;
    if (Array.prototype.map) return Array.prototype.map.call(t, n);
    for (i = 0; i < t.length; i += 1) r.push(n(t[i]));
    return r;
  }
  static find(t, n) {
    let r, i;
    if (Array.prototype.find) return Array.prototype.find.call(t, n);
    for (r = 0, i = t.length; r < i; r += 1) {
      const a = t[r];
      if (n(a, r)) return a;
    }
  }
  static assign(t, ...n) {
    const r = t;
    let i, a;
    if (Object.assign) return Object.assign(t, ...n);
    for (i = 0, a = n.length; i < a; i += 1) {
      const o = n[i];
      typeof o == "object" &&
        o !== null &&
        Object.keys(o).forEach((s) => {
          r[s] = o[s];
        });
    }
    return t;
  }
  static getBrowserAlias(t) {
    return pn[t];
  }
  static getBrowserTypeByAlias(t) {
    return pr[t] || "";
  }
}
const b = /version\/(\d+(\.?_?\d+)+)/i,
  vn = [
    {
      test: [/googlebot/i],
      describe(e) {
        const t = { name: "Googlebot" },
          n =
            l.getFirstMatch(/googlebot\/(\d+(\.\d+))/i, e) ||
            l.getFirstMatch(b, e);
        return n && (t.version = n), t;
      },
    },
    {
      test: [/opera/i],
      describe(e) {
        const t = { name: "Opera" },
          n =
            l.getFirstMatch(b, e) ||
            l.getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i, e);
        return n && (t.version = n), t;
      },
    },
    {
      test: [/opr\/|opios/i],
      describe(e) {
        const t = { name: "Opera" },
          n =
            l.getFirstMatch(/(?:opr|opios)[\s/](\S+)/i, e) ||
            l.getFirstMatch(b, e);
        return n && (t.version = n), t;
      },
    },
    {
      test: [/SamsungBrowser/i],
      describe(e) {
        const t = { name: "Samsung Internet for Android" },
          n =
            l.getFirstMatch(b, e) ||
            l.getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
        return n && (t.version = n), t;
      },
    },
    {
      test: [/Whale/i],
      describe(e) {
        const t = { name: "NAVER Whale Browser" },
          n =
            l.getFirstMatch(b, e) ||
            l.getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i, e);
        return n && (t.version = n), t;
      },
    },
    {
      test: [/MZBrowser/i],
      describe(e) {
        const t = { name: "MZ Browser" },
          n =
            l.getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i, e) ||
            l.getFirstMatch(b, e);
        return n && (t.version = n), t;
      },
    },
    {
      test: [/focus/i],
      describe(e) {
        const t = { name: "Focus" },
          n =
            l.getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i, e) ||
            l.getFirstMatch(b, e);
        return n && (t.version = n), t;
      },
    },
    {
      test: [/swing/i],
      describe(e) {
        const t = { name: "Swing" },
          n =
            l.getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i, e) ||
            l.getFirstMatch(b, e);
        return n && (t.version = n), t;
      },
    },
    {
      test: [/coast/i],
      describe(e) {
        const t = { name: "Opera Coast" },
          n =
            l.getFirstMatch(b, e) ||
            l.getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i, e);
        return n && (t.version = n), t;
      },
    },
    {
      test: [/yabrowser/i],
      describe(e) {
        const t = { name: "Yandex Browser" },
          n =
            l.getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i, e) ||
            l.getFirstMatch(b, e);
        return n && (t.version = n), t;
      },
    },
    {
      test: [/ucbrowser/i],
      describe(e) {
        const t = { name: "UC Browser" },
          n =
            l.getFirstMatch(b, e) ||
            l.getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
        return n && (t.version = n), t;
      },
    },
    {
      test: [/Maxthon|mxios/i],
      describe(e) {
        const t = { name: "Maxthon" },
          n =
            l.getFirstMatch(b, e) ||
            l.getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i, e);
        return n && (t.version = n), t;
      },
    },
    {
      test: [/epiphany/i],
      describe(e) {
        const t = { name: "Epiphany" },
          n =
            l.getFirstMatch(b, e) ||
            l.getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i, e);
        return n && (t.version = n), t;
      },
    },
    {
      test: [/puffin/i],
      describe(e) {
        const t = { name: "Puffin" },
          n =
            l.getFirstMatch(b, e) ||
            l.getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i, e);
        return n && (t.version = n), t;
      },
    },
    {
      test: [/sleipnir/i],
      describe(e) {
        const t = { name: "Sleipnir" },
          n =
            l.getFirstMatch(b, e) ||
            l.getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i, e);
        return n && (t.version = n), t;
      },
    },
    {
      test: [/k-meleon/i],
      describe(e) {
        const t = { name: "K-Meleon" },
          n =
            l.getFirstMatch(b, e) ||
            l.getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i, e);
        return n && (t.version = n), t;
      },
    },
    {
      test: [/micromessenger/i],
      describe(e) {
        const t = { name: "WeChat" },
          n =
            l.getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i, e) ||
            l.getFirstMatch(b, e);
        return n && (t.version = n), t;
      },
    },
    {
      test: [/qqbrowser/i],
      describe(e) {
        const t = {
            name: /qqbrowserlite/i.test(e) ? "QQ Browser Lite" : "QQ Browser",
          },
          n =
            l.getFirstMatch(
              /(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i,
              e
            ) || l.getFirstMatch(b, e);
        return n && (t.version = n), t;
      },
    },
    {
      test: [/msie|trident/i],
      describe(e) {
        const t = { name: "Internet Explorer" },
          n = l.getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i, e);
        return n && (t.version = n), t;
      },
    },
    {
      test: [/\sedg\//i],
      describe(e) {
        const t = { name: "Microsoft Edge" },
          n = l.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i, e);
        return n && (t.version = n), t;
      },
    },
    {
      test: [/edg([ea]|ios)/i],
      describe(e) {
        const t = { name: "Microsoft Edge" },
          n = l.getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i, e);
        return n && (t.version = n), t;
      },
    },
    {
      test: [/vivaldi/i],
      describe(e) {
        const t = { name: "Vivaldi" },
          n = l.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i, e);
        return n && (t.version = n), t;
      },
    },
    {
      test: [/seamonkey/i],
      describe(e) {
        const t = { name: "SeaMonkey" },
          n = l.getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i, e);
        return n && (t.version = n), t;
      },
    },
    {
      test: [/sailfish/i],
      describe(e) {
        const t = { name: "Sailfish" },
          n = l.getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i, e);
        return n && (t.version = n), t;
      },
    },
    {
      test: [/silk/i],
      describe(e) {
        const t = { name: "Amazon Silk" },
          n = l.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i, e);
        return n && (t.version = n), t;
      },
    },
    {
      test: [/phantom/i],
      describe(e) {
        const t = { name: "PhantomJS" },
          n = l.getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i, e);
        return n && (t.version = n), t;
      },
    },
    {
      test: [/slimerjs/i],
      describe(e) {
        const t = { name: "SlimerJS" },
          n = l.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i, e);
        return n && (t.version = n), t;
      },
    },
    {
      test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
      describe(e) {
        const t = { name: "BlackBerry" },
          n =
            l.getFirstMatch(b, e) ||
            l.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i, e);
        return n && (t.version = n), t;
      },
    },
    {
      test: [/(web|hpw)[o0]s/i],
      describe(e) {
        const t = { name: "WebOS Browser" },
          n =
            l.getFirstMatch(b, e) ||
            l.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i, e);
        return n && (t.version = n), t;
      },
    },
    {
      test: [/bada/i],
      describe(e) {
        const t = { name: "Bada" },
          n = l.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i, e);
        return n && (t.version = n), t;
      },
    },
    {
      test: [/tizen/i],
      describe(e) {
        const t = { name: "Tizen" },
          n =
            l.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i, e) ||
            l.getFirstMatch(b, e);
        return n && (t.version = n), t;
      },
    },
    {
      test: [/qupzilla/i],
      describe(e) {
        const t = { name: "QupZilla" },
          n =
            l.getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i, e) ||
            l.getFirstMatch(b, e);
        return n && (t.version = n), t;
      },
    },
    {
      test: [/firefox|iceweasel|fxios/i],
      describe(e) {
        const t = { name: "Firefox" },
          n = l.getFirstMatch(
            /(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i,
            e
          );
        return n && (t.version = n), t;
      },
    },
    {
      test: [/electron/i],
      describe(e) {
        const t = { name: "Electron" },
          n = l.getFirstMatch(/(?:electron)\/(\d+(\.?_?\d+)+)/i, e);
        return n && (t.version = n), t;
      },
    },
    {
      test: [/chromium/i],
      describe(e) {
        const t = { name: "Chromium" },
          n =
            l.getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i, e) ||
            l.getFirstMatch(b, e);
        return n && (t.version = n), t;
      },
    },
    {
      test: [/chrome|crios|crmo/i],
      describe(e) {
        const t = { name: "Chrome" },
          n = l.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i, e);
        return n && (t.version = n), t;
      },
    },
    {
      test: [/GSA/i],
      describe(e) {
        const t = { name: "Google Search" },
          n = l.getFirstMatch(/(?:GSA)\/(\d+(\.?_?\d+)+)/i, e);
        return n && (t.version = n), t;
      },
    },
    {
      test(e) {
        const t = !e.test(/like android/i),
          n = e.test(/android/i);
        return t && n;
      },
      describe(e) {
        const t = { name: "Android Browser" },
          n = l.getFirstMatch(b, e);
        return n && (t.version = n), t;
      },
    },
    {
      test: [/playstation 4/i],
      describe(e) {
        const t = { name: "PlayStation 4" },
          n = l.getFirstMatch(b, e);
        return n && (t.version = n), t;
      },
    },
    {
      test: [/safari|applewebkit/i],
      describe(e) {
        const t = { name: "Safari" },
          n = l.getFirstMatch(b, e);
        return n && (t.version = n), t;
      },
    },
    {
      test: [/.*/i],
      describe(e) {
        const t =
          e.search("\\(") !== -1 ? /^(.*)\/(.*)[ \t]\((.*)/ : /^(.*)\/(.*) /;
        return { name: l.getFirstMatch(t, e), version: l.getSecondMatch(t, e) };
      },
    },
  ];
var gn = [
    {
      test: [/Roku\/DVP/],
      describe(e) {
        const t = l.getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i, e);
        return { name: P.Roku, version: t };
      },
    },
    {
      test: [/windows phone/i],
      describe(e) {
        const t = l.getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i, e);
        return { name: P.WindowsPhone, version: t };
      },
    },
    {
      test: [/windows /i],
      describe(e) {
        const t = l.getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i, e),
          n = l.getWindowsVersionName(t);
        return { name: P.Windows, version: t, versionName: n };
      },
    },
    {
      test: [/Macintosh(.*?) FxiOS(.*?) Version\//],
      describe(e) {
        const t = l.getSecondMatch(/(Version\/)(\d[\d.]+)/, e);
        return { name: P.iOS, version: t };
      },
    },
    {
      test: [/macintosh/i],
      describe(e) {
        const t = l
            .getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i, e)
            .replace(/[_\s]/g, "."),
          n = l.getMacOSVersionName(t),
          r = { name: P.MacOS, version: t };
        return n && (r.versionName = n), r;
      },
    },
    {
      test: [/(ipod|iphone|ipad)/i],
      describe(e) {
        const t = l
          .getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i, e)
          .replace(/[_\s]/g, ".");
        return { name: P.iOS, version: t };
      },
    },
    {
      test(e) {
        const t = !e.test(/like android/i),
          n = e.test(/android/i);
        return t && n;
      },
      describe(e) {
        const t = l.getFirstMatch(/android[\s/-](\d+(\.\d+)*)/i, e),
          n = l.getAndroidVersionName(t),
          r = { name: P.Android, version: t };
        return n && (r.versionName = n), r;
      },
    },
    {
      test: [/(web|hpw)[o0]s/i],
      describe(e) {
        const t = l.getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i, e),
          n = { name: P.WebOS };
        return t && t.length && (n.version = t), n;
      },
    },
    {
      test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
      describe(e) {
        const t =
          l.getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i, e) ||
          l.getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i, e) ||
          l.getFirstMatch(/\bbb(\d+)/i, e);
        return { name: P.BlackBerry, version: t };
      },
    },
    {
      test: [/bada/i],
      describe(e) {
        const t = l.getFirstMatch(/bada\/(\d+(\.\d+)*)/i, e);
        return { name: P.Bada, version: t };
      },
    },
    {
      test: [/tizen/i],
      describe(e) {
        const t = l.getFirstMatch(/tizen[/\s](\d+(\.\d+)*)/i, e);
        return { name: P.Tizen, version: t };
      },
    },
    { test: [/linux/i], describe: () => ({ name: P.Linux }) },
    { test: [/CrOS/], describe: () => ({ name: P.ChromeOS }) },
    {
      test: [/PlayStation 4/],
      describe(e) {
        const t = l.getFirstMatch(/PlayStation 4[/\s](\d+(\.\d+)*)/i, e);
        return { name: P.PlayStation4, version: t };
      },
    },
  ],
  mn = [
    {
      test: [/googlebot/i],
      describe: () => ({ type: "bot", vendor: "Google" }),
    },
    {
      test: [/huawei/i],
      describe(e) {
        const t = l.getFirstMatch(/(can-l01)/i, e) && "Nova",
          n = { type: M.mobile, vendor: "Huawei" };
        return t && (n.model = t), n;
      },
    },
    {
      test: [/nexus\s*(?:7|8|9|10).*/i],
      describe: () => ({ type: M.tablet, vendor: "Nexus" }),
    },
    {
      test: [/ipad/i],
      describe: () => ({ type: M.tablet, vendor: "Apple", model: "iPad" }),
    },
    {
      test: [/Macintosh(.*?) FxiOS(.*?) Version\//],
      describe: () => ({ type: M.tablet, vendor: "Apple", model: "iPad" }),
    },
    {
      test: [/kftt build/i],
      describe: () => ({
        type: M.tablet,
        vendor: "Amazon",
        model: "Kindle Fire HD 7",
      }),
    },
    { test: [/silk/i], describe: () => ({ type: M.tablet, vendor: "Amazon" }) },
    { test: [/tablet(?! pc)/i], describe: () => ({ type: M.tablet }) },
    {
      test(e) {
        const t = e.test(/ipod|iphone/i),
          n = e.test(/like (ipod|iphone)/i);
        return t && !n;
      },
      describe(e) {
        const t = l.getFirstMatch(/(ipod|iphone)/i, e);
        return { type: M.mobile, vendor: "Apple", model: t };
      },
    },
    {
      test: [/nexus\s*[0-6].*/i, /galaxy nexus/i],
      describe: () => ({ type: M.mobile, vendor: "Nexus" }),
    },
    { test: [/[^-]mobi/i], describe: () => ({ type: M.mobile }) },
    {
      test: (e) => e.getBrowserName(!0) === "blackberry",
      describe: () => ({ type: M.mobile, vendor: "BlackBerry" }),
    },
    {
      test: (e) => e.getBrowserName(!0) === "bada",
      describe: () => ({ type: M.mobile }),
    },
    {
      test: (e) => e.getBrowserName() === "windows phone",
      describe: () => ({ type: M.mobile, vendor: "Microsoft" }),
    },
    {
      test(e) {
        const t = Number(String(e.getOSVersion()).split(".")[0]);
        return e.getOSName(!0) === "android" && t >= 3;
      },
      describe: () => ({ type: M.tablet }),
    },
    {
      test: (e) => e.getOSName(!0) === "android",
      describe: () => ({ type: M.mobile }),
    },
    {
      test: (e) => e.getOSName(!0) === "macos",
      describe: () => ({ type: M.desktop, vendor: "Apple" }),
    },
    {
      test: (e) => e.getOSName(!0) === "windows",
      describe: () => ({ type: M.desktop }),
    },
    {
      test: (e) => e.getOSName(!0) === "linux",
      describe: () => ({ type: M.desktop }),
    },
    {
      test: (e) => e.getOSName(!0) === "playstation 4",
      describe: () => ({ type: M.tv }),
    },
    {
      test: (e) => e.getOSName(!0) === "roku",
      describe: () => ({ type: M.tv }),
    },
  ],
  yn = [
    {
      test: (e) => e.getBrowserName(!0) === "microsoft edge",
      describe(e) {
        if (/\sedg\//i.test(e)) return { name: N.Blink };
        const t = l.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i, e);
        return { name: N.EdgeHTML, version: t };
      },
    },
    {
      test: [/trident/i],
      describe(e) {
        const t = { name: N.Trident },
          n = l.getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i, e);
        return n && (t.version = n), t;
      },
    },
    {
      test: (e) => e.test(/presto/i),
      describe(e) {
        const t = { name: N.Presto },
          n = l.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i, e);
        return n && (t.version = n), t;
      },
    },
    {
      test(e) {
        const t = e.test(/gecko/i),
          n = e.test(/like gecko/i);
        return t && !n;
      },
      describe(e) {
        const t = { name: N.Gecko },
          n = l.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i, e);
        return n && (t.version = n), t;
      },
    },
    { test: [/(apple)?webkit\/537\.36/i], describe: () => ({ name: N.Blink }) },
    {
      test: [/(apple)?webkit/i],
      describe(e) {
        const t = { name: N.WebKit },
          n = l.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i, e);
        return n && (t.version = n), t;
      },
    },
  ];
class Tt {
  constructor(t, n = !1) {
    if (t == null || t === "")
      throw new Error("UserAgent parameter can't be empty");
    (this._ua = t), (this.parsedResult = {}), n !== !0 && this.parse();
  }
  getUA() {
    return this._ua;
  }
  test(t) {
    return t.test(this._ua);
  }
  parseBrowser() {
    this.parsedResult.browser = {};
    const t = l.find(vn, (n) => {
      if (typeof n.test == "function") return n.test(this);
      if (n.test instanceof Array) return n.test.some((r) => this.test(r));
      throw new Error("Browser's test function is not valid");
    });
    return (
      t && (this.parsedResult.browser = t.describe(this.getUA())),
      this.parsedResult.browser
    );
  }
  getBrowser() {
    return this.parsedResult.browser
      ? this.parsedResult.browser
      : this.parseBrowser();
  }
  getBrowserName(t) {
    return t
      ? String(this.getBrowser().name).toLowerCase() || ""
      : this.getBrowser().name || "";
  }
  getBrowserVersion() {
    return this.getBrowser().version;
  }
  getOS() {
    return this.parsedResult.os ? this.parsedResult.os : this.parseOS();
  }
  parseOS() {
    this.parsedResult.os = {};
    const t = l.find(gn, (n) => {
      if (typeof n.test == "function") return n.test(this);
      if (n.test instanceof Array) return n.test.some((r) => this.test(r));
      throw new Error("Browser's test function is not valid");
    });
    return (
      t && (this.parsedResult.os = t.describe(this.getUA())),
      this.parsedResult.os
    );
  }
  getOSName(t) {
    const { name: n } = this.getOS();
    return t ? String(n).toLowerCase() || "" : n || "";
  }
  getOSVersion() {
    return this.getOS().version;
  }
  getPlatform() {
    return this.parsedResult.platform
      ? this.parsedResult.platform
      : this.parsePlatform();
  }
  getPlatformType(t = !1) {
    const { type: n } = this.getPlatform();
    return t ? String(n).toLowerCase() || "" : n || "";
  }
  parsePlatform() {
    this.parsedResult.platform = {};
    const t = l.find(mn, (n) => {
      if (typeof n.test == "function") return n.test(this);
      if (n.test instanceof Array) return n.test.some((r) => this.test(r));
      throw new Error("Browser's test function is not valid");
    });
    return (
      t && (this.parsedResult.platform = t.describe(this.getUA())),
      this.parsedResult.platform
    );
  }
  getEngine() {
    return this.parsedResult.engine
      ? this.parsedResult.engine
      : this.parseEngine();
  }
  getEngineName(t) {
    return t
      ? String(this.getEngine().name).toLowerCase() || ""
      : this.getEngine().name || "";
  }
  parseEngine() {
    this.parsedResult.engine = {};
    const t = l.find(yn, (n) => {
      if (typeof n.test == "function") return n.test(this);
      if (n.test instanceof Array) return n.test.some((r) => this.test(r));
      throw new Error("Browser's test function is not valid");
    });
    return (
      t && (this.parsedResult.engine = t.describe(this.getUA())),
      this.parsedResult.engine
    );
  }
  parse() {
    return (
      this.parseBrowser(),
      this.parseOS(),
      this.parsePlatform(),
      this.parseEngine(),
      this
    );
  }
  getResult() {
    return l.assign({}, this.parsedResult);
  }
  satisfies(t) {
    const n = {};
    let r = 0;
    const i = {};
    let a = 0;
    if (
      (Object.keys(t).forEach((o) => {
        const s = t[o];
        typeof s == "string"
          ? ((i[o] = s), (a += 1))
          : typeof s == "object" && ((n[o] = s), (r += 1));
      }),
      r > 0)
    ) {
      const o = Object.keys(n),
        s = l.find(o, (u) => this.isOS(u));
      if (s) {
        const u = this.satisfies(n[s]);
        if (u !== void 0) return u;
      }
      const c = l.find(o, (u) => this.isPlatform(u));
      if (c) {
        const u = this.satisfies(n[c]);
        if (u !== void 0) return u;
      }
    }
    if (a > 0) {
      const o = Object.keys(i),
        s = l.find(o, (c) => this.isBrowser(c, !0));
      if (s !== void 0) return this.compareVersion(i[s]);
    }
  }
  isBrowser(t, n = !1) {
    const r = this.getBrowserName().toLowerCase();
    let i = t.toLowerCase();
    const a = l.getBrowserTypeByAlias(i);
    return n && a && (i = a.toLowerCase()), i === r;
  }
  compareVersion(t) {
    let n = [0],
      r = t,
      i = !1;
    const a = this.getBrowserVersion();
    if (typeof a == "string")
      return (
        t[0] === ">" || t[0] === "<"
          ? ((r = t.substr(1)),
            t[1] === "=" ? ((i = !0), (r = t.substr(2))) : (n = []),
            t[0] === ">" ? n.push(1) : n.push(-1))
          : t[0] === "="
          ? (r = t.substr(1))
          : t[0] === "~" && ((i = !0), (r = t.substr(1))),
        n.indexOf(l.compareVersions(a, r, i)) > -1
      );
  }
  isOS(t) {
    return this.getOSName(!0) === String(t).toLowerCase();
  }
  isPlatform(t) {
    return this.getPlatformType(!0) === String(t).toLowerCase();
  }
  isEngine(t) {
    return this.getEngineName(!0) === String(t).toLowerCase();
  }
  is(t) {
    return this.isBrowser(t) || this.isOS(t) || this.isPlatform(t);
  }
  some(t = []) {
    return t.some((n) => this.is(n));
  }
}
var Ot = "new",
  De = "loading",
  ae = "joining-meeting",
  T = "joined-meeting",
  U = "left-meeting",
  W = "error",
  Ne = "unknown",
  bn = "base",
  _n = "*",
  jt = "available-devices-updated",
  H = "fullscreen",
  K = "exited-fullscreen",
  ke = "daily-custom-track",
  Me = { NONE: "none", BGBLUR: "background-blur", BGIMAGE: "background-image" },
  He = { PLAY: "play", PAUSE: "pause" },
  wn = "playing",
  kn = "paused",
  Pt = 10,
  Re = ["jpg", "png", "jpeg"],
  Mn = "add-endpoints",
  Sn = "remove-endpoints";
function I() {
  return !k() &&
    typeof window < "u" &&
    window.navigator &&
    window.navigator.userAgent
    ? window.navigator.userAgent
    : "";
}
function k() {
  return (
    typeof navigator < "u" &&
    navigator.product &&
    navigator.product === "ReactNative"
  );
}
function vr() {
  return (
    navigator && navigator.mediaDevices && navigator.mediaDevices.getUserMedia
  );
}
function Cn() {
  return (
    !!(
      navigator &&
      navigator.mediaDevices &&
      navigator.mediaDevices.getDisplayMedia
    ) &&
    (function (e, t) {
      if (!e || !t) return !0;
      switch (e) {
        case "Chrome":
          return t.major >= 75;
        case "Safari":
          return (
            RTCRtpTransceiver.prototype.hasOwnProperty("currentDirection") &&
            !(t.major === 13 && t.minor === 0 && t.point === 0)
          );
        case "Firefox":
          return t.major >= 67;
      }
      return !0;
    })(
      Te(),
      (function () {
        switch (Te()) {
          case "Chrome":
            return yr();
          case "Safari":
            return _r();
          case "Firefox":
            return wr();
          case "Edge":
            return (function () {
              var e = 0,
                t = 0;
              if (typeof window < "u") {
                var n = I(),
                  r = n.match(/Edge\/(\d+).(\d+)/);
                if (r)
                  try {
                    (e = parseInt(r[1])), (t = parseInt(r[2]));
                  } catch {}
              }
              return { major: e, minor: t };
            })();
        }
      })()
    )
  );
}
function At() {
  if (k() || !document) return !1;
  var e = document.createElement("iframe");
  return !!e.requestFullscreen || !!e.webkitRequestFullscreen;
}
var Tn = ["Chrome", "Firefox"];
function On() {
  return (
    !k() &&
    !(function () {
      var e = I();
      if (e.match(/Mobi/) || e.match(/Android/) || I().match(/DailyAnd\//))
        return !0;
    })() &&
    Tn.includes(Te())
  );
}
function gr() {
  return !!k() || mr();
}
function mr() {
  return (
    vr() &&
    !(function () {
      var e,
        t = Te();
      if (!I()) return !0;
      switch (t) {
        case "Chrome":
          return (e = yr()).major && e.major > 0 && e.major < 61;
        case "Firefox":
          return (e = wr()).major < 78;
        case "Safari":
          return (e = _r()).major < 12;
        default:
          return !0;
      }
    })()
  );
}
function Te() {
  if (typeof window < "u") {
    var e = I();
    return br()
      ? "Safari"
      : e.indexOf("Edge") > -1
      ? "Edge"
      : e.match(/Chrome\//)
      ? "Chrome"
      : e.indexOf("Safari") > -1
      ? "Safari"
      : e.indexOf("Firefox") > -1
      ? "Firefox"
      : e.indexOf("MSIE") > -1 || e.indexOf(".NET") > -1
      ? "IE"
      : "Unknown Browser";
  }
}
function yr() {
  var e = 0,
    t = 0,
    n = 0,
    r = 0,
    i = !1;
  if (typeof window < "u") {
    var a = I(),
      o = a.match(/Chrome\/(\d+).(\d+).(\d+).(\d+)/);
    if (o)
      try {
        (e = parseInt(o[1])),
          (t = parseInt(o[2])),
          (n = parseInt(o[3])),
          (r = parseInt(o[4])),
          (i = a.indexOf("OPR/") > -1);
      } catch {}
  }
  return { major: e, minor: t, build: n, patch: r, opera: i };
}
function br() {
  return !!I().match(/iPad|iPhone|iPod/i) && vr();
}
function _r() {
  var e = 0,
    t = 0,
    n = 0;
  if (typeof window < "u") {
    var r = I().match(/Version\/(\d+).(\d+)(.(\d+))?/);
    if (r)
      try {
        (e = parseInt(r[1])), (t = parseInt(r[2])), (n = parseInt(r[4]));
      } catch {}
    else br() && ((e = 14), (t = 0), (n = 3));
  }
  return { major: e, minor: t, point: n };
}
function wr() {
  var e = 0,
    t = 0;
  if (typeof window < "u") {
    var n = I().match(/Firefox\/(\d+).(\d+)/);
    if (n)
      try {
        (e = parseInt(n[1])), (t = parseInt(n[2]));
      } catch {}
  }
  return { major: e, minor: t };
}
function Ee() {
  return Date.now() + Math.random().toString();
}
function oe() {
  throw new Error("Method must be implemented in subclass");
}
function Y(e) {
  if (window._dailyConfig && window._dailyConfig.callObjectBundleUrlOverride)
    return window._dailyConfig.callObjectBundleUrlOverride;
  var t = e ? new URL(e).origin : null;
  function n(i) {
    return ""
      .concat(i, "/static/call-machine-object")
      .concat(gr() ? "" : "-nosfu", "-bundle.js");
  }
  function r() {
    var i = (
      arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}
    ).isStaging;
    return n(
      "https://c".concat(i !== void 0 && i ? ".staging" : "", ".daily.co")
    );
  }
  return t
    ? t.match(/https:\/\/[^.]+\.daily\.co/)
      ? r()
      : t.match(/https:\/\/preview-[^.]+\.staging\.daily\.co/)
      ? n(t)
      : t.match(/https:\/\/[^.]+\.staging\.daily\.co/)
      ? r({ isStaging: !0 })
      : n(t)
    : r();
}
function Ke(e) {
  try {
    new URL(e);
  } catch {
    return !1;
  }
  return !0;
}
var kr = (function () {
  function e() {
    x(this, e);
  }
  return (
    L(e, [
      {
        key: "addListenerForMessagesFromCallMachine",
        value: function (t, n, r) {
          oe();
        },
      },
      {
        key: "addListenerForMessagesFromDailyJs",
        value: function (t, n, r) {
          oe();
        },
      },
      {
        key: "sendMessageToCallMachine",
        value: function (t, n, r, i) {
          oe();
        },
      },
      {
        key: "sendMessageToDailyJs",
        value: function (t, n, r) {
          oe();
        },
      },
      {
        key: "removeListener",
        value: function (t) {
          oe();
        },
      },
    ]),
    e
  );
})();
function Et(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Ve(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Et(Object(n), !0).forEach(function (r) {
          F(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : Et(Object(n)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
        });
  }
  return e;
}
function jn(e) {
  var t = (function () {
    if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
      return !1;
    if (typeof Proxy == "function") return !0;
    try {
      return (
        Date.prototype.toString.call(
          Reflect.construct(Date, [], function () {})
        ),
        !0
      );
    } catch {
      return !1;
    }
  })();
  return function () {
    var n,
      r = B(e);
    if (t) {
      var i = B(this).constructor;
      n = Reflect.construct(r, arguments, i);
    } else n = r.apply(this, arguments);
    return Ae(this, n);
  };
}
var Pn = (function (e) {
  Pe(n, kr);
  var t = jn(n);
  function n() {
    var r;
    return (
      x(this, n),
      ((r = t.call(this))._wrappedListeners = {}),
      (r._messageCallbacks = {}),
      r
    );
  }
  return (
    L(n, [
      {
        key: "addListenerForMessagesFromCallMachine",
        value: function (r, i, a) {
          var o = this,
            s = function (c) {
              if (
                c.data &&
                c.data.what === "iframe-call-message" &&
                (!c.data.callFrameId || c.data.callFrameId === i) &&
                (!c.data.from || c.data.from !== "module")
              ) {
                var u = Ve({}, c.data);
                if (
                  (delete u.from,
                  u.callbackStamp && o._messageCallbacks[u.callbackStamp])
                ) {
                  var d = u.callbackStamp;
                  o._messageCallbacks[d].call(a, u),
                    delete o._messageCallbacks[d];
                }
                delete u.what, delete u.callbackStamp, r.call(a, u);
              }
            };
          (this._wrappedListeners[r] = s),
            window.addEventListener("message", s);
        },
      },
      {
        key: "addListenerForMessagesFromDailyJs",
        value: function (r, i, a) {
          var o = function (s) {
            if (
              !(
                !s.data ||
                s.data.what !== "iframe-call-message" ||
                !s.data.action ||
                (s.data.from && s.data.from !== "module") ||
                (s.data.callFrameId && i && s.data.callFrameId !== i)
              )
            ) {
              var c = s.data;
              r.call(a, c);
            }
          };
          (this._wrappedListeners[r] = o),
            window.addEventListener("message", o);
        },
      },
      {
        key: "sendMessageToCallMachine",
        value: function (r, i, a, o) {
          var s = Ve({}, r);
          if (
            ((s.what = "iframe-call-message"),
            (s.from = "module"),
            (s.callFrameId = o),
            i)
          ) {
            var c = Ee();
            (this._messageCallbacks[c] = i), (s.callbackStamp = c);
          }
          (a ? a.contentWindow : window).postMessage(s, "*");
        },
      },
      {
        key: "sendMessageToDailyJs",
        value: function (r, i, a) {
          (r.what = "iframe-call-message"),
            (r.callFrameId = a),
            (r.from = "embedded"),
            (i ? window : window.parent).postMessage(r, "*");
        },
      },
      {
        key: "removeListener",
        value: function (r) {
          var i = this._wrappedListeners[r];
          i &&
            (window.removeEventListener("message", i),
            delete this._wrappedListeners[r]);
        },
      },
      {
        key: "forwardPackagedMessageToCallMachine",
        value: function (r, i, a) {
          var o = Ve({}, r);
          (o.callFrameId = a),
            (i ? i.contentWindow : window).postMessage(o, "*");
        },
      },
      {
        key: "addListenerForPackagedMessagesFromCallMachine",
        value: function (r, i) {
          var a = function (o) {
            if (
              o.data &&
              o.data.what === "iframe-call-message" &&
              (!o.data.callFrameId || o.data.callFrameId === i) &&
              (!o.data.from || o.data.from !== "module")
            ) {
              var s = o.data;
              r(s);
            }
          };
          return (
            (this._wrappedListeners[r] = a),
            window.addEventListener("message", a),
            r
          );
        },
      },
      {
        key: "removeListenerForPackagedMessagesFromCallMachine",
        value: function (r) {
          var i = this._wrappedListeners[r];
          i &&
            (window.removeEventListener("message", i),
            delete this._wrappedListeners[r]);
        },
      },
    ]),
    n
  );
})();
function An(e) {
  var t = (function () {
    if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
      return !1;
    if (typeof Proxy == "function") return !0;
    try {
      return (
        Date.prototype.toString.call(
          Reflect.construct(Date, [], function () {})
        ),
        !0
      );
    } catch {
      return !1;
    }
  })();
  return function () {
    var n,
      r = B(e);
    if (t) {
      var i = B(this).constructor;
      n = Reflect.construct(r, arguments, i);
    } else n = r.apply(this, arguments);
    return Ae(this, n);
  };
}
var En = (function (e) {
    Pe(n, kr);
    var t = An(n);
    function n() {
      var r;
      return (
        x(this, n),
        (r = t.call(this)),
        (global.callMachineToDailyJsEmitter =
          global.callMachineToDailyJsEmitter || new R.exports.EventEmitter()),
        (global.dailyJsToCallMachineEmitter =
          global.dailyJsToCallMachineEmitter || new R.exports.EventEmitter()),
        (r._wrappedListeners = {}),
        (r._messageCallbacks = {}),
        r
      );
    }
    return (
      L(n, [
        {
          key: "addListenerForMessagesFromCallMachine",
          value: function (r, i, a) {
            this._addListener(
              r,
              global.callMachineToDailyJsEmitter,
              a,
              "received call machine message"
            );
          },
        },
        {
          key: "addListenerForMessagesFromDailyJs",
          value: function (r, i, a) {
            this._addListener(
              r,
              global.dailyJsToCallMachineEmitter,
              a,
              "received daily-js message"
            );
          },
        },
        {
          key: "sendMessageToCallMachine",
          value: function (r, i) {
            this._sendMessage(
              r,
              global.dailyJsToCallMachineEmitter,
              "sending message to call machine",
              i
            );
          },
        },
        {
          key: "sendMessageToDailyJs",
          value: function (r) {
            this._sendMessage(
              r,
              global.callMachineToDailyJsEmitter,
              "sending message to daily-js"
            );
          },
        },
        {
          key: "removeListener",
          value: function (r) {
            var i = this._wrappedListeners[r];
            i &&
              (global.callMachineToDailyJsEmitter.removeListener("message", i),
              global.dailyJsToCallMachineEmitter.removeListener("message", i),
              delete this._wrappedListeners[r]);
          },
        },
        {
          key: "_addListener",
          value: function (r, i, a, o) {
            var s = this,
              c = function (u) {
                if (u.callbackStamp && s._messageCallbacks[u.callbackStamp]) {
                  var d = u.callbackStamp;
                  s._messageCallbacks[d].call(a, u),
                    delete s._messageCallbacks[d];
                }
                r.call(a, u);
              };
            (this._wrappedListeners[r] = c), i.addListener("message", c);
          },
        },
        {
          key: "_sendMessage",
          value: function (r, i, a, o) {
            if (o) {
              var s = Ee();
              (this._messageCallbacks[s] = o), (r.callbackStamp = s);
            }
            i.emit("message", r);
          },
        },
      ]),
      n
    );
  })(),
  Fn = function (e) {
    return Function.toString.call(e).indexOf("[native code]") !== -1;
  },
  Ln = function () {
    if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
      return !1;
    if (typeof Proxy == "function") return !0;
    try {
      return (
        Date.prototype.toString.call(
          Reflect.construct(Date, [], function () {})
        ),
        !0
      );
    } catch {
      return !1;
    }
  },
  In = q(function (e) {
    function t(n, r, i) {
      return (
        Ln()
          ? (e.exports = t = Reflect.construct)
          : (e.exports = t =
              function (a, o, s) {
                var c = [null];
                c.push.apply(c, o);
                var u = new (Function.bind.apply(a, c))();
                return s && nt(u, s.prototype), u;
              }),
        t.apply(null, arguments)
      );
    }
    e.exports = t;
  }),
  xn = q(function (e) {
    function t(n) {
      var r = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
      return (
        (e.exports = t =
          function (i) {
            if (i === null || !Fn(i)) return i;
            if (typeof i != "function")
              throw new TypeError(
                "Super expression must either be null or a function"
              );
            if (r !== void 0) {
              if (r.has(i)) return r.get(i);
              r.set(i, a);
            }
            function a() {
              return In(i, arguments, B(this).constructor);
            }
            return (
              (a.prototype = Object.create(i.prototype, {
                constructor: {
                  value: a,
                  enumerable: !1,
                  writable: !0,
                  configurable: !0,
                },
              })),
              nt(a, i)
            );
          }),
        t(n)
      );
    }
    e.exports = t;
  });
function Bn(e) {
  var t = (function () {
    if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
      return !1;
    if (typeof Proxy == "function") return !0;
    try {
      return (
        Date.prototype.toString.call(
          Reflect.construct(Date, [], function () {})
        ),
        !0
      );
    } catch {
      return !1;
    }
  })();
  return function () {
    var n,
      r = B(e);
    if (t) {
      var i = B(this).constructor;
      n = Reflect.construct(r, arguments, i);
    } else n = r.apply(this, arguments);
    return Ae(this, n);
  };
}
var Dn = (function () {
    function e() {
      x(this, e), (this._currentLoad = null);
    }
    return (
      L(e, [
        {
          key: "load",
          value: function (t, n, r, i, a) {
            if (this.loaded) return window._dailyCallObjectSetup(n), void i(!0);
            (function (o, s) {
              window._dailyConfig || (window._dailyConfig = {}),
                (window._dailyConfig.callFrameId = o),
                (window._dailyConfig.avoidEval = s);
            })(n, r),
              this._currentLoad && this._currentLoad.cancel(),
              (this._currentLoad = new Rn(
                t,
                function () {
                  i(!1);
                },
                a
              )),
              this._currentLoad.start();
          },
        },
        {
          key: "cancel",
          value: function () {
            this._currentLoad && this._currentLoad.cancel();
          },
        },
        {
          key: "loaded",
          get: function () {
            return this._currentLoad && this._currentLoad.succeeded;
          },
        },
      ]),
      e
    );
  })(),
  Nn = 3,
  Rn = (function () {
    function e(t, n, r) {
      x(this, e),
        (this._attemptsRemaining = Nn),
        (this._currentAttempt = null),
        (this._meetingOrBaseUrl = t),
        (this._successCallback = n),
        (this._failureCallback = r);
    }
    return (
      L(e, [
        {
          key: "start",
          value: function () {
            var t = this;
            this._currentAttempt ||
              ((this._currentAttempt = new Ft(
                this._meetingOrBaseUrl,
                this._successCallback,
                function n(r) {
                  t._currentAttempt.cancelled ||
                    (t._attemptsRemaining--,
                    t._failureCallback(r, t._attemptsRemaining > 0),
                    t._attemptsRemaining <= 0 ||
                      setTimeout(function () {
                        t._currentAttempt.cancelled ||
                          ((t._currentAttempt = new Ft(
                            t._meetingOrBaseUrl,
                            t._successCallback,
                            n
                          )),
                          t._currentAttempt.start());
                      }, 3e3));
                }
              )),
              this._currentAttempt.start());
          },
        },
        {
          key: "cancel",
          value: function () {
            this._currentAttempt && this._currentAttempt.cancel();
          },
        },
        {
          key: "cancelled",
          get: function () {
            return this._currentAttempt && this._currentAttempt.cancelled;
          },
        },
        {
          key: "succeeded",
          get: function () {
            return this._currentAttempt && this._currentAttempt.succeeded;
          },
        },
      ]),
      e
    );
  })(),
  Ue = (function (e) {
    Pe(n, e);
    var t = Bn(n);
    function n() {
      return x(this, n), t.apply(this, arguments);
    }
    return n;
  })(xn(Error)),
  Ft = (function () {
    function e(t, n, r) {
      x(this, e),
        (this._loadAttemptImpl =
          k() || !_dailyConfig.avoidEval ? new Vn(t, n, r) : new Un(t, n, r));
    }
    return (
      L(e, [
        {
          key: "start",
          value: (function () {
            var t = v(function* () {
              return this._loadAttemptImpl.start();
            });
            return function () {
              return t.apply(this, arguments);
            };
          })(),
        },
        {
          key: "cancel",
          value: function () {
            this._loadAttemptImpl.cancel();
          },
        },
        {
          key: "cancelled",
          get: function () {
            return this._loadAttemptImpl.cancelled;
          },
        },
        {
          key: "succeeded",
          get: function () {
            return this._loadAttemptImpl.succeeded;
          },
        },
      ]),
      e
    );
  })(),
  Vn = (function () {
    function e(t, n, r) {
      x(this, e),
        (this.cancelled = !1),
        (this.succeeded = !1),
        (this._networkTimedOut = !1),
        (this._networkTimeout = null),
        (this._iosCache =
          typeof iOSCallObjectBundleCache < "u" && iOSCallObjectBundleCache),
        (this._refetchHeaders = null),
        (this._meetingOrBaseUrl = t),
        (this._successCallback = n),
        (this._failureCallback = r);
    }
    return (
      L(e, [
        {
          key: "start",
          value: (function () {
            var t = v(function* () {
              var n;
              try {
                n = Y(this._meetingOrBaseUrl);
              } catch (r) {
                return void this._failureCallback(
                  "Failed to get call object bundle for URL "
                    .concat(this._meetingOrBaseUrl, ": ")
                    .concat(r)
                );
              }
              !(yield this._tryLoadFromIOSCache(n)) && this._loadFromNetwork(n);
            });
            return function () {
              return t.apply(this, arguments);
            };
          })(),
        },
        {
          key: "cancel",
          value: function () {
            clearTimeout(this._networkTimeout), (this.cancelled = !0);
          },
        },
        {
          key: "_tryLoadFromIOSCache",
          value: (function () {
            var t = v(function* (n) {
              if (!this._iosCache) return !1;
              try {
                var r = yield this._iosCache.get(n);
                return (
                  !!this.cancelled ||
                  (!!r &&
                    (r.code
                      ? (Function('"use strict";' + r.code)(),
                        (this.succeeded = !0),
                        this._successCallback(),
                        !0)
                      : ((this._refetchHeaders = r.refetchHeaders), !1)))
                );
              } catch {
                return !1;
              }
            });
            return function (n) {
              return t.apply(this, arguments);
            };
          })(),
        },
        {
          key: "_loadFromNetwork",
          value: (function () {
            var t = v(function* (n) {
              var r = this;
              this._networkTimeout = setTimeout(function () {
                (r._networkTimedOut = !0),
                  r._failureCallback(
                    "Timed out (>"
                      .concat(2e4, " ms) when loading call object bundle ")
                      .concat(n)
                  );
              }, 2e4);
              try {
                var i = this._refetchHeaders
                    ? { headers: this._refetchHeaders }
                    : {},
                  a = yield fetch(n, i);
                if (
                  (clearTimeout(this._networkTimeout),
                  this.cancelled || this._networkTimedOut)
                )
                  throw new Ue();
                var o = yield this._getBundleCodeFromResponse(n, a);
                if (this.cancelled) throw new Ue();
                Function('"use strict";' + o)(),
                  this._iosCache && this._iosCache.set(n, o, a.headers),
                  (this.succeeded = !0),
                  this._successCallback();
              } catch (s) {
                if (
                  (clearTimeout(this._networkTimeout),
                  s instanceof Ue || this.cancelled || this._networkTimedOut)
                )
                  return;
                this._failureCallback(
                  "Failed to load call object bundle ".concat(n, ": ").concat(s)
                );
              }
            });
            return function (n) {
              return t.apply(this, arguments);
            };
          })(),
        },
        {
          key: "_getBundleCodeFromResponse",
          value: (function () {
            var t = v(function* (n, r) {
              if (r.ok) return yield r.text();
              if (this._iosCache && r.status === 304)
                return (yield this._iosCache.renew(n, r.headers)).code;
              throw new Error("Received ".concat(r.status, " response"));
            });
            return function (n, r) {
              return t.apply(this, arguments);
            };
          })(),
        },
      ]),
      e
    );
  })(),
  Un = (function () {
    function e(t, n, r) {
      x(this, e),
        (this.cancelled = !1),
        (this.succeeded = !1),
        (this._meetingOrBaseUrl = t),
        (this._successCallback = n),
        (this._failureCallback = r),
        (this._attemptId = Ee()),
        (this._networkTimeout = null),
        (this._scriptElement = null);
    }
    return (
      L(e, [
        {
          key: "start",
          value: (function () {
            var t = v(function* () {
              var n;
              window._dailyCallMachineLoadWaitlist ||
                (window._dailyCallMachineLoadWaitlist =
                  /* @__PURE__ */ new Set());
              try {
                n = Y(this._meetingOrBaseUrl);
              } catch (r) {
                return void this._failureCallback(
                  "Failed to get call object bundle for URL "
                    .concat(this._meetingOrBaseUrl, ": ")
                    .concat(r)
                );
              }
              (typeof document > "u" ? "undefined" : O(document)) === "object"
                ? this._startLoading(n)
                : this._failureCallback(
                    "Call object bundle must be loaded in a DOM/web context"
                  );
            });
            return function () {
              return t.apply(this, arguments);
            };
          })(),
        },
        {
          key: "cancel",
          value: function () {
            this._stopLoading(), (this.cancelled = !0);
          },
        },
        {
          key: "_startLoading",
          value: function (t) {
            var n = this;
            this._signUpForCallMachineLoadWaitlist(),
              (this._networkTimeout = setTimeout(function () {
                n._stopLoading(),
                  n._failureCallback(
                    "Timed out (>"
                      .concat(2e4, " ms) when loading call object bundle ")
                      .concat(t)
                  );
              }, 2e4));
            var r = document.getElementsByTagName("head")[0],
              i = document.createElement("script");
            (this._scriptElement = i),
              (i.onload = v(function* () {
                n._stopLoading(), (n.succeeded = !0), n._successCallback();
              })),
              (i.onerror = (function () {
                var a = v(function* (o) {
                  n._stopLoading(),
                    n._failureCallback(
                      "Failed to load call object bundle ".concat(o.target.src)
                    );
                });
                return function (o) {
                  return a.apply(this, arguments);
                };
              })()),
              (i.src = t),
              r.appendChild(i);
          },
        },
        {
          key: "_stopLoading",
          value: function () {
            this._withdrawFromCallMachineLoadWaitlist(),
              clearTimeout(this._networkTimeout),
              this._scriptElement &&
                ((this._scriptElement.onload = null),
                (this._scriptElement.onerror = null));
          },
        },
        {
          key: "_signUpForCallMachineLoadWaitlist",
          value: function () {
            window._dailyCallMachineLoadWaitlist.add(this._attemptId);
          },
        },
        {
          key: "_withdrawFromCallMachineLoadWaitlist",
          value: function () {
            window._dailyCallMachineLoadWaitlist.delete(this._attemptId);
          },
        },
      ]),
      e
    );
  })(),
  Mr = function (e, t) {
    for (var n = -1, r = e == null ? 0 : e.length, i = 0, a = []; ++n < r; ) {
      var o = e[n];
      t(o, n, e) && (a[i++] = o);
    }
    return a;
  },
  Wn = (function (e) {
    return function (t, n, r) {
      for (var i = -1, a = Object(t), o = r(t), s = o.length; s--; ) {
        var c = o[e ? s : ++i];
        if (n(a[c], c, a) === !1) break;
      }
      return t;
    };
  })(),
  zn = function (e, t) {
    for (var n = -1, r = Array(e); ++n < e; ) r[n] = t(n);
    return r;
  },
  Sr = typeof ge == "object" && ge && ge.Object === Object && ge,
  Jn = typeof self == "object" && self && self.Object === Object && self,
  D = Sr || Jn || Function("return this")(),
  V = D.Symbol,
  Cr = Object.prototype,
  qn = Cr.hasOwnProperty,
  Gn = Cr.toString,
  se = V ? V.toStringTag : void 0,
  Hn = function (e) {
    var t = qn.call(e, se),
      n = e[se];
    try {
      e[se] = void 0;
      var r = !0;
    } catch {}
    var i = Gn.call(e);
    return r && (t ? (e[se] = n) : delete e[se]), i;
  },
  Kn = Object.prototype.toString,
  Qn = function (e) {
    return Kn.call(e);
  },
  $n = "[object Null]",
  Zn = "[object Undefined]",
  Lt = V ? V.toStringTag : void 0,
  re = function (e) {
    return e == null
      ? e === void 0
        ? Zn
        : $n
      : Lt && Lt in Object(e)
      ? Hn(e)
      : Qn(e);
  },
  te = function (e) {
    return e != null && typeof e == "object";
  },
  Xn = "[object Arguments]",
  It = function (e) {
    return te(e) && re(e) == Xn;
  },
  Tr = Object.prototype,
  Yn = Tr.hasOwnProperty,
  ei = Tr.propertyIsEnumerable,
  Or = It(
    (function () {
      return arguments;
    })()
  )
    ? It
    : function (e) {
        return te(e) && Yn.call(e, "callee") && !ei.call(e, "callee");
      },
  A = Array.isArray,
  ti = function () {
    return !1;
  },
  Qe = q(function (e, t) {
    var n = t && !t.nodeType && t,
      r = n && e && !e.nodeType && e,
      i = r && r.exports === n ? D.Buffer : void 0,
      a = (i ? i.isBuffer : void 0) || ti;
    e.exports = a;
  }),
  ri = 9007199254740991,
  ni = /^(?:0|[1-9]\d*)$/,
  jr = function (e, t) {
    var n = typeof e;
    return (
      !!(t = t == null ? ri : t) &&
      (n == "number" || (n != "symbol" && ni.test(e))) &&
      e > -1 &&
      e % 1 == 0 &&
      e < t
    );
  },
  ii = 9007199254740991,
  it = function (e) {
    return typeof e == "number" && e > -1 && e % 1 == 0 && e <= ii;
  },
  _ = {};
(_["[object Float32Array]"] =
  _["[object Float64Array]"] =
  _["[object Int8Array]"] =
  _["[object Int16Array]"] =
  _["[object Int32Array]"] =
  _["[object Uint8Array]"] =
  _["[object Uint8ClampedArray]"] =
  _["[object Uint16Array]"] =
  _["[object Uint32Array]"] =
    !0),
  (_["[object Arguments]"] =
    _["[object Array]"] =
    _["[object ArrayBuffer]"] =
    _["[object Boolean]"] =
    _["[object DataView]"] =
    _["[object Date]"] =
    _["[object Error]"] =
    _["[object Function]"] =
    _["[object Map]"] =
    _["[object Number]"] =
    _["[object Object]"] =
    _["[object RegExp]"] =
    _["[object Set]"] =
    _["[object String]"] =
    _["[object WeakMap]"] =
      !1);
var ai = function (e) {
    return te(e) && it(e.length) && !!_[re(e)];
  },
  Pr = function (e) {
    return function (t) {
      return e(t);
    };
  },
  xt = q(function (e, t) {
    var n = t && !t.nodeType && t,
      r = n && e && !e.nodeType && e,
      i = r && r.exports === n && Sr.process,
      a = (function () {
        try {
          var o = r && r.require && r.require("util").types;
          return o || (i && i.binding && i.binding("util"));
        } catch {}
      })();
    e.exports = a;
  }),
  Bt = xt && xt.isTypedArray,
  Ar = Bt ? Pr(Bt) : ai,
  oi = Object.prototype.hasOwnProperty,
  si = function (e, t) {
    var n = A(e),
      r = !n && Or(e),
      i = !n && !r && Qe(e),
      a = !n && !r && !i && Ar(e),
      o = n || r || i || a,
      s = o ? zn(e.length, String) : [],
      c = s.length;
    for (var u in e)
      (!t && !oi.call(e, u)) ||
        (o &&
          (u == "length" ||
            (i && (u == "offset" || u == "parent")) ||
            (a && (u == "buffer" || u == "byteLength" || u == "byteOffset")) ||
            jr(u, c))) ||
        s.push(u);
    return s;
  },
  ci = Object.prototype,
  ui = function (e) {
    var t = e && e.constructor;
    return e === ((typeof t == "function" && t.prototype) || ci);
  },
  li = (function (e, t) {
    return function (n) {
      return e(t(n));
    };
  })(Object.keys, Object),
  di = Object.prototype.hasOwnProperty,
  hi = function (e) {
    if (!ui(e)) return li(e);
    var t = [];
    for (var n in Object(e)) di.call(e, n) && n != "constructor" && t.push(n);
    return t;
  },
  at = function (e) {
    var t = typeof e;
    return e != null && (t == "object" || t == "function");
  },
  fi = "[object AsyncFunction]",
  pi = "[object Function]",
  vi = "[object GeneratorFunction]",
  gi = "[object Proxy]",
  Er = function (e) {
    if (!at(e)) return !1;
    var t = re(e);
    return t == pi || t == vi || t == fi || t == gi;
  },
  ot = function (e) {
    return e != null && it(e.length) && !Er(e);
  },
  st = function (e) {
    return ot(e) ? si(e) : hi(e);
  },
  Fr = (function (e, t) {
    return function (n, r) {
      if (n == null) return n;
      if (!ot(n)) return e(n, r);
      for (
        var i = n.length, a = t ? i : -1, o = Object(n);
        (t ? a-- : ++a < i) && r(o[a], a, o) !== !1;

      );
      return n;
    };
  })(function (e, t) {
    return e && Wn(e, t, st);
  }),
  mi = function (e, t) {
    var n = [];
    return (
      Fr(e, function (r, i, a) {
        t(r, i, a) && n.push(r);
      }),
      n
    );
  },
  yi = function () {
    (this.__data__ = []), (this.size = 0);
  },
  Lr = function (e, t) {
    return e === t || (e != e && t != t);
  },
  Fe = function (e, t) {
    for (var n = e.length; n--; ) if (Lr(e[n][0], t)) return n;
    return -1;
  },
  bi = Array.prototype.splice,
  _i = function (e) {
    var t = this.__data__,
      n = Fe(t, e);
    return !(
      n < 0 || (n == t.length - 1 ? t.pop() : bi.call(t, n, 1), --this.size, 0)
    );
  },
  wi = function (e) {
    var t = this.__data__,
      n = Fe(t, e);
    return n < 0 ? void 0 : t[n][1];
  },
  ki = function (e) {
    return Fe(this.__data__, e) > -1;
  },
  Mi = function (e, t) {
    var n = this.__data__,
      r = Fe(n, e);
    return r < 0 ? (++this.size, n.push([e, t])) : (n[r][1] = t), this;
  };
function Q(e) {
  var t = -1,
    n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
(Q.prototype.clear = yi),
  (Q.prototype.delete = _i),
  (Q.prototype.get = wi),
  (Q.prototype.has = ki),
  (Q.prototype.set = Mi);
var Le = Q,
  Si = function () {
    (this.__data__ = new Le()), (this.size = 0);
  },
  Ci = function (e) {
    var t = this.__data__,
      n = t.delete(e);
    return (this.size = t.size), n;
  },
  Ti = function (e) {
    return this.__data__.get(e);
  },
  Dt,
  Oi = function (e) {
    return this.__data__.has(e);
  },
  We = D["__core-js_shared__"],
  Nt = (Dt = /[^.]+$/.exec((We && We.keys && We.keys.IE_PROTO) || ""))
    ? "Symbol(src)_1." + Dt
    : "",
  ji = function (e) {
    return !!Nt && Nt in e;
  },
  Pi = Function.prototype.toString,
  G = function (e) {
    if (e != null) {
      try {
        return Pi.call(e);
      } catch {}
      try {
        return e + "";
      } catch {}
    }
    return "";
  },
  Ai = /^\[object .+?Constructor\]$/,
  Ei = Function.prototype,
  Fi = Object.prototype,
  Li = Ei.toString,
  Ii = Fi.hasOwnProperty,
  xi = RegExp(
    "^" +
      Li.call(Ii)
        .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
        .replace(
          /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
          "$1.*?"
        ) +
      "$"
  ),
  Bi = function (e) {
    return !(!at(e) || ji(e)) && (Er(e) ? xi : Ai).test(G(e));
  },
  Di = function (e, t) {
    return e == null ? void 0 : e[t];
  },
  ne = function (e, t) {
    var n = Di(e, t);
    return Bi(n) ? n : void 0;
  },
  he = ne(D, "Map"),
  fe = ne(Object, "create"),
  Ni = function () {
    (this.__data__ = fe ? fe(null) : {}), (this.size = 0);
  },
  Ri = function (e) {
    var t = this.has(e) && delete this.__data__[e];
    return (this.size -= t ? 1 : 0), t;
  },
  Vi = "__lodash_hash_undefined__",
  Ui = Object.prototype.hasOwnProperty,
  Wi = function (e) {
    var t = this.__data__;
    if (fe) {
      var n = t[e];
      return n === Vi ? void 0 : n;
    }
    return Ui.call(t, e) ? t[e] : void 0;
  },
  zi = Object.prototype.hasOwnProperty,
  Ji = function (e) {
    var t = this.__data__;
    return fe ? t[e] !== void 0 : zi.call(t, e);
  },
  qi = "__lodash_hash_undefined__",
  Gi = function (e, t) {
    var n = this.__data__;
    return (
      (this.size += this.has(e) ? 0 : 1),
      (n[e] = fe && t === void 0 ? qi : t),
      this
    );
  };
function $(e) {
  var t = -1,
    n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
($.prototype.clear = Ni),
  ($.prototype.delete = Ri),
  ($.prototype.get = Wi),
  ($.prototype.has = Ji),
  ($.prototype.set = Gi);
var Rt = $,
  Hi = function () {
    (this.size = 0),
      (this.__data__ = {
        hash: new Rt(),
        map: new (he || Le)(),
        string: new Rt(),
      });
  },
  Ki = function (e) {
    var t = typeof e;
    return t == "string" || t == "number" || t == "symbol" || t == "boolean"
      ? e !== "__proto__"
      : e === null;
  },
  Ie = function (e, t) {
    var n = e.__data__;
    return Ki(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
  },
  Qi = function (e) {
    var t = Ie(this, e).delete(e);
    return (this.size -= t ? 1 : 0), t;
  },
  $i = function (e) {
    return Ie(this, e).get(e);
  },
  Zi = function (e) {
    return Ie(this, e).has(e);
  },
  Xi = function (e, t) {
    var n = Ie(this, e),
      r = n.size;
    return n.set(e, t), (this.size += n.size == r ? 0 : 1), this;
  };
function Z(e) {
  var t = -1,
    n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
(Z.prototype.clear = Hi),
  (Z.prototype.delete = Qi),
  (Z.prototype.get = $i),
  (Z.prototype.has = Zi),
  (Z.prototype.set = Xi);
var xe = Z,
  Yi = 200,
  ea = function (e, t) {
    var n = this.__data__;
    if (n instanceof Le) {
      var r = n.__data__;
      if (!he || r.length < Yi - 1)
        return r.push([e, t]), (this.size = ++n.size), this;
      n = this.__data__ = new xe(r);
    }
    return n.set(e, t), (this.size = n.size), this;
  };
function X(e) {
  var t = (this.__data__ = new Le(e));
  this.size = t.size;
}
(X.prototype.clear = Si),
  (X.prototype.delete = Ci),
  (X.prototype.get = Ti),
  (X.prototype.has = Oi),
  (X.prototype.set = ea);
var Se = X,
  ta = "__lodash_hash_undefined__",
  ra = function (e) {
    return this.__data__.set(e, ta), this;
  },
  na = function (e) {
    return this.__data__.has(e);
  };
function Ce(e) {
  var t = -1,
    n = e == null ? 0 : e.length;
  for (this.__data__ = new xe(); ++t < n; ) this.add(e[t]);
}
(Ce.prototype.add = Ce.prototype.push = ra), (Ce.prototype.has = na);
var ia = Ce,
  aa = function (e, t) {
    for (var n = -1, r = e == null ? 0 : e.length; ++n < r; )
      if (t(e[n], n, e)) return !0;
    return !1;
  },
  oa = function (e, t) {
    return e.has(t);
  },
  sa = 1,
  ca = 2,
  Ir = function (e, t, n, r, i, a) {
    var o = n & sa,
      s = e.length,
      c = t.length;
    if (s != c && !(o && c > s)) return !1;
    var u = a.get(e);
    if (u && a.get(t)) return u == t;
    var d = -1,
      h = !0,
      f = n & ca ? new ia() : void 0;
    for (a.set(e, t), a.set(t, e); ++d < s; ) {
      var g = e[d],
        w = t[d];
      if (r) var S = o ? r(w, g, d, t, e, a) : r(g, w, d, e, t, a);
      if (S !== void 0) {
        if (S) continue;
        h = !1;
        break;
      }
      if (f) {
        if (
          !aa(t, function (j, p) {
            if (!oa(f, p) && (g === j || i(g, j, n, r, a))) return f.push(p);
          })
        ) {
          h = !1;
          break;
        }
      } else if (g !== w && !i(g, w, n, r, a)) {
        h = !1;
        break;
      }
    }
    return a.delete(e), a.delete(t), h;
  },
  Vt = D.Uint8Array,
  ua = function (e) {
    var t = -1,
      n = Array(e.size);
    return (
      e.forEach(function (r, i) {
        n[++t] = [i, r];
      }),
      n
    );
  },
  la = function (e) {
    var t = -1,
      n = Array(e.size);
    return (
      e.forEach(function (r) {
        n[++t] = r;
      }),
      n
    );
  },
  da = 1,
  ha = 2,
  fa = "[object Boolean]",
  pa = "[object Date]",
  va = "[object Error]",
  ga = "[object Map]",
  ma = "[object Number]",
  ya = "[object RegExp]",
  ba = "[object Set]",
  _a = "[object String]",
  wa = "[object Symbol]",
  ka = "[object ArrayBuffer]",
  Ma = "[object DataView]",
  Ut = V ? V.prototype : void 0,
  ze = Ut ? Ut.valueOf : void 0,
  Sa = function (e, t, n, r, i, a, o) {
    switch (n) {
      case Ma:
        if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
          return !1;
        (e = e.buffer), (t = t.buffer);
      case ka:
        return !(e.byteLength != t.byteLength || !a(new Vt(e), new Vt(t)));
      case fa:
      case pa:
      case ma:
        return Lr(+e, +t);
      case va:
        return e.name == t.name && e.message == t.message;
      case ya:
      case _a:
        return e == t + "";
      case ga:
        var s = ua;
      case ba:
        var c = r & da;
        if ((s || (s = la), e.size != t.size && !c)) return !1;
        var u = o.get(e);
        if (u) return u == t;
        (r |= ha), o.set(e, t);
        var d = Ir(s(e), s(t), r, i, a, o);
        return o.delete(e), d;
      case wa:
        if (ze) return ze.call(e) == ze.call(t);
    }
    return !1;
  },
  Ca = function (e, t) {
    for (var n = -1, r = t.length, i = e.length; ++n < r; ) e[i + n] = t[n];
    return e;
  },
  Ta = function (e, t, n) {
    var r = t(e);
    return A(e) ? r : Ca(r, n(e));
  },
  Oa = function () {
    return [];
  },
  ja = Object.prototype.propertyIsEnumerable,
  Wt = Object.getOwnPropertySymbols,
  Pa = Wt
    ? function (e) {
        return e == null
          ? []
          : ((e = Object(e)),
            Mr(Wt(e), function (t) {
              return ja.call(e, t);
            }));
      }
    : Oa,
  zt = function (e) {
    return Ta(e, st, Pa);
  },
  Aa = 1,
  Ea = Object.prototype.hasOwnProperty,
  Fa = function (e, t, n, r, i, a) {
    var o = n & Aa,
      s = zt(e),
      c = s.length;
    if (c != zt(t).length && !o) return !1;
    for (var u = c; u--; ) {
      var d = s[u];
      if (!(o ? d in t : Ea.call(t, d))) return !1;
    }
    var h = a.get(e);
    if (h && a.get(t)) return h == t;
    var f = !0;
    a.set(e, t), a.set(t, e);
    for (var g = o; ++u < c; ) {
      var w = e[(d = s[u])],
        S = t[d];
      if (r) var j = o ? r(S, w, d, t, e, a) : r(w, S, d, e, t, a);
      if (!(j === void 0 ? w === S || i(w, S, n, r, a) : j)) {
        f = !1;
        break;
      }
      g || (g = d == "constructor");
    }
    if (f && !g) {
      var p = e.constructor,
        ve = t.constructor;
      p != ve &&
        "constructor" in e &&
        "constructor" in t &&
        !(
          typeof p == "function" &&
          p instanceof p &&
          typeof ve == "function" &&
          ve instanceof ve
        ) &&
        (f = !1);
    }
    return a.delete(e), a.delete(t), f;
  },
  $e = ne(D, "DataView"),
  Ze = ne(D, "Promise"),
  Xe = ne(D, "Set"),
  Ye = ne(D, "WeakMap"),
  La = G($e),
  Ia = G(he),
  xa = G(Ze),
  Ba = G(Xe),
  Da = G(Ye),
  J = re;
(($e && J(new $e(new ArrayBuffer(1))) != "[object DataView]") ||
  (he && J(new he()) != "[object Map]") ||
  (Ze && J(Ze.resolve()) != "[object Promise]") ||
  (Xe && J(new Xe()) != "[object Set]") ||
  (Ye && J(new Ye()) != "[object WeakMap]")) &&
  (J = function (e) {
    var t = re(e),
      n = t == "[object Object]" ? e.constructor : void 0,
      r = n ? G(n) : "";
    if (r)
      switch (r) {
        case La:
          return "[object DataView]";
        case Ia:
          return "[object Map]";
        case xa:
          return "[object Promise]";
        case Ba:
          return "[object Set]";
        case Da:
          return "[object WeakMap]";
      }
    return t;
  });
var Jt = J,
  Na = 1,
  qt = "[object Arguments]",
  Gt = "[object Array]",
  me = "[object Object]",
  Ht = Object.prototype.hasOwnProperty,
  Ra = function (e, t, n, r, i, a) {
    var o = A(e),
      s = A(t),
      c = o ? Gt : Jt(e),
      u = s ? Gt : Jt(t),
      d = (c = c == qt ? me : c) == me,
      h = (u = u == qt ? me : u) == me,
      f = c == u;
    if (f && Qe(e)) {
      if (!Qe(t)) return !1;
      (o = !0), (d = !1);
    }
    if (f && !d)
      return (
        a || (a = new Se()),
        o || Ar(e) ? Ir(e, t, n, r, i, a) : Sa(e, t, c, n, r, i, a)
      );
    if (!(n & Na)) {
      var g = d && Ht.call(e, "__wrapped__"),
        w = h && Ht.call(t, "__wrapped__");
      if (g || w) {
        var S = g ? e.value() : e,
          j = w ? t.value() : t;
        return a || (a = new Se()), i(S, j, n, r, a);
      }
    }
    return !!f && (a || (a = new Se()), Fa(e, t, n, r, i, a));
  },
  xr = function e(t, n, r, i, a) {
    return (
      t === n ||
      (t == null || n == null || (!te(t) && !te(n))
        ? t != t && n != n
        : Ra(t, n, r, i, e, a))
    );
  },
  Va = 1,
  Ua = 2,
  Wa = function (e, t, n, r) {
    var i = n.length,
      a = i,
      o = !r;
    if (e == null) return !a;
    for (e = Object(e); i--; ) {
      var s = n[i];
      if (o && s[2] ? s[1] !== e[s[0]] : !(s[0] in e)) return !1;
    }
    for (; ++i < a; ) {
      var c = (s = n[i])[0],
        u = e[c],
        d = s[1];
      if (o && s[2]) {
        if (u === void 0 && !(c in e)) return !1;
      } else {
        var h = new Se();
        if (r) var f = r(u, d, c, e, t, h);
        if (!(f === void 0 ? xr(d, u, Va | Ua, r, h) : f)) return !1;
      }
    }
    return !0;
  },
  Br = function (e) {
    return e == e && !at(e);
  },
  za = function (e) {
    for (var t = st(e), n = t.length; n--; ) {
      var r = t[n],
        i = e[r];
      t[n] = [r, i, Br(i)];
    }
    return t;
  },
  Dr = function (e, t) {
    return function (n) {
      return n != null && n[e] === t && (t !== void 0 || e in Object(n));
    };
  },
  Ja = function (e) {
    var t = za(e);
    return t.length == 1 && t[0][2]
      ? Dr(t[0][0], t[0][1])
      : function (n) {
          return n === e || Wa(n, e, t);
        };
  },
  qa = "[object Symbol]",
  pe = function (e) {
    return typeof e == "symbol" || (te(e) && re(e) == qa);
  },
  Ga = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
  Ha = /^\w*$/,
  ct = function (e, t) {
    if (A(e)) return !1;
    var n = typeof e;
    return (
      !(
        n != "number" &&
        n != "symbol" &&
        n != "boolean" &&
        e != null &&
        !pe(e)
      ) ||
      Ha.test(e) ||
      !Ga.test(e) ||
      (t != null && e in Object(t))
    );
  },
  Ka = "Expected a function";
function ut(e, t) {
  if (typeof e != "function" || (t != null && typeof t != "function"))
    throw new TypeError(Ka);
  var n = function () {
    var r = arguments,
      i = t ? t.apply(this, r) : r[0],
      a = n.cache;
    if (a.has(i)) return a.get(i);
    var o = e.apply(this, r);
    return (n.cache = a.set(i, o) || a), o;
  };
  return (n.cache = new (ut.Cache || xe)()), n;
}
ut.Cache = xe;
var Qa = ut,
  $a = 500,
  Za =
    /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
  Xa = /\\(\\)?/g,
  Ya = (function (e) {
    var t = Qa(e, function (r) {
        return n.size === $a && n.clear(), r;
      }),
      n = t.cache;
    return t;
  })(function (e) {
    var t = [];
    return (
      e.charCodeAt(0) === 46 && t.push(""),
      e.replace(Za, function (n, r, i, a) {
        t.push(i ? a.replace(Xa, "$1") : r || n);
      }),
      t
    );
  }),
  et = function (e, t) {
    for (var n = -1, r = e == null ? 0 : e.length, i = Array(r); ++n < r; )
      i[n] = t(e[n], n, e);
    return i;
  },
  eo = 1 / 0,
  Kt = V ? V.prototype : void 0,
  Qt = Kt ? Kt.toString : void 0,
  to = function e(t) {
    if (typeof t == "string") return t;
    if (A(t)) return et(t, e) + "";
    if (pe(t)) return Qt ? Qt.call(t) : "";
    var n = t + "";
    return n == "0" && 1 / t == -eo ? "-0" : n;
  },
  ro = function (e) {
    return e == null ? "" : to(e);
  },
  Nr = function (e, t) {
    return A(e) ? e : ct(e, t) ? [e] : Ya(ro(e));
  },
  no = 1 / 0,
  Be = function (e) {
    if (typeof e == "string" || pe(e)) return e;
    var t = e + "";
    return t == "0" && 1 / e == -no ? "-0" : t;
  },
  Rr = function (e, t) {
    for (var n = 0, r = (t = Nr(t, e)).length; e != null && n < r; )
      e = e[Be(t[n++])];
    return n && n == r ? e : void 0;
  },
  io = function (e, t, n) {
    var r = e == null ? void 0 : Rr(e, t);
    return r === void 0 ? n : r;
  },
  ao = function (e, t) {
    return e != null && t in Object(e);
  },
  oo = function (e, t, n) {
    for (var r = -1, i = (t = Nr(t, e)).length, a = !1; ++r < i; ) {
      var o = Be(t[r]);
      if (!(a = e != null && n(e, o))) break;
      e = e[o];
    }
    return a || ++r != i
      ? a
      : !!(i = e == null ? 0 : e.length) &&
          it(i) &&
          jr(o, i) &&
          (A(e) || Or(e));
  },
  so = function (e, t) {
    return e != null && oo(e, t, ao);
  },
  co = 1,
  uo = 2,
  lo = function (e, t) {
    return ct(e) && Br(t)
      ? Dr(Be(e), t)
      : function (n) {
          var r = io(n, e);
          return r === void 0 && r === t ? so(n, e) : xr(t, r, co | uo);
        };
  },
  Vr = function (e) {
    return e;
  },
  ho = function (e) {
    return function (t) {
      return t == null ? void 0 : t[e];
    };
  },
  fo = function (e) {
    return function (t) {
      return Rr(t, e);
    };
  },
  po = function (e) {
    return ct(e) ? ho(Be(e)) : fo(e);
  },
  Ur = function (e) {
    return typeof e == "function"
      ? e
      : e == null
      ? Vr
      : typeof e == "object"
      ? A(e)
        ? lo(e[0], e[1])
        : Ja(e)
      : po(e);
  },
  Wr = function (e, t) {
    return (A(e) ? Mr : mi)(e, Ur(t));
  },
  vo = function (e, t) {
    var n = -1,
      r = ot(e) ? Array(e.length) : [];
    return (
      Fr(e, function (i, a, o) {
        r[++n] = t(i, a, o);
      }),
      r
    );
  },
  go = function (e, t) {
    var n = e.length;
    for (e.sort(t); n--; ) e[n] = e[n].value;
    return e;
  },
  mo = function (e, t) {
    if (e !== t) {
      var n = e !== void 0,
        r = e === null,
        i = e == e,
        a = pe(e),
        o = t !== void 0,
        s = t === null,
        c = t == t,
        u = pe(t);
      if (
        (!s && !u && !a && e > t) ||
        (a && o && c && !s && !u) ||
        (r && o && c) ||
        (!n && c) ||
        !i
      )
        return 1;
      if (
        (!r && !a && !u && e < t) ||
        (u && n && i && !r && !a) ||
        (s && n && i) ||
        (!o && i) ||
        !c
      )
        return -1;
    }
    return 0;
  },
  yo = function (e, t, n) {
    for (
      var r = -1, i = e.criteria, a = t.criteria, o = i.length, s = n.length;
      ++r < o;

    ) {
      var c = mo(i[r], a[r]);
      if (c) return r >= s ? c : c * (n[r] == "desc" ? -1 : 1);
    }
    return e.index - t.index;
  },
  bo = function (e, t, n) {
    var r = -1;
    t = et(t.length ? t : [Vr], Pr(Ur));
    var i = vo(e, function (a, o, s) {
      return {
        criteria: et(t, function (c) {
          return c(a);
        }),
        index: ++r,
        value: a,
      };
    });
    return go(i, function (a, o) {
      return yo(a, o, n);
    });
  },
  zr = function (e, t, n, r) {
    return e == null
      ? []
      : (A(t) || (t = t == null ? [] : [t]),
        A((n = r ? void 0 : n)) || (n = n == null ? [] : [n]),
        bo(e, t, n));
  },
  ye = function (e, t, n) {
    return wo(e.local, t, n) === !0;
  },
  _o = function (e, t, n) {
    return (
      e.local.streams &&
      e.local.streams[t] &&
      e.local.streams[t].stream &&
      e.local.streams[t].stream[
        "get".concat(n === "video" ? "Video" : "Audio", "Tracks")
      ]()[0]
    );
  },
  le = function (e, t, n, r) {
    var i = ko(e, t, n, r);
    return i && i.pendingTrack;
  },
  wo = function (e, t, n) {
    if (!e) return !1;
    var r = function (a) {
        switch (a) {
          case "avatar":
            return !0;
          case "staged":
            return a;
          default:
            return !!a;
        }
      },
      i = e.public.subscribedTracks;
    return i && i[t]
      ? [
          "cam-audio",
          "cam-video",
          "screen-video",
          "screen-audio",
          "rmpAudio",
          "rmpVideo",
        ].indexOf(n) === -1 && i[t].custom
        ? [!0, "staged"].includes(i[t].custom)
          ? r(i[t].custom)
          : r(i[t].custom[n])
        : r(i[t][n])
      : !i || r(i.ALL);
  },
  ko = function (e, t, n, r) {
    var i = zr(
      Wr(e.streams, function (a) {
        return (
          a.participantId === t &&
          a.type === n &&
          a.pendingTrack &&
          a.pendingTrack.kind === r
        );
      }),
      "starttime",
      "desc"
    );
    return i && i[0];
  },
  Mo = function (e, t) {
    var n = e.local.public.customTracks;
    if (n && n[t]) return n[t].track;
  },
  So = function (e, t, n, r) {
    var i = "soup-" + n,
      a = zr(
        Wr(e.streams, function (o) {
          return (
            o.participantId === t &&
            o.streamId === i &&
            o.pendingTrack &&
            o.pendingTrack.kind === r
          );
        }),
        "starttime",
        "desc"
      );
    return a && a[0] && a[0].pendingTrack;
  };
function $t(e) {
  for (
    var t = store.getState(), n = 0, r = ["cam", "screen"];
    n < r.length;
    n++
  )
    for (var i = r[n], a = 0, o = ["video", "audio"]; a < o.length; a++) {
      var s = o[a],
        c =
          i === "cam"
            ? s
            : "screen".concat(s.charAt(0).toUpperCase() + s.slice(1)),
        u = e.tracks[c];
      if (u) {
        var d = e.local ? _o(t, i, s) : le(t, e.session_id, i, s);
        u.state === "playable" && (u.track = d), (u.persistentTrack = d);
      }
    }
}
function Zt(e) {
  try {
    var t = store.getState();
    for (var n in e.tracks)
      if (!tt(n)) {
        var r = e.tracks[n].kind;
        if (r) {
          var i = e.tracks[n];
          if (i) {
            var a = e.local ? Mo(t, n, r) : So(t, e.session_id, n, r);
            i.state === "playable" && (e.tracks[n].track = a),
              (i.persistentTrack = a);
          }
        } else console.error("unknown type for custom track");
      }
  } catch (o) {
    console.error(o);
  }
}
function tt(e) {
  return ["video", "audio", "screenVideo", "screenAudio"].includes(e);
}
function Xt(e, t) {
  var n = store.getState();
  if (e.local) {
    if (e.audio)
      try {
        (e.audioTrack = n.local.streams.cam.stream.getAudioTracks()[0]),
          e.audioTrack || (e.audio = !1);
      } catch {}
    if (e.video)
      try {
        (e.videoTrack = n.local.streams.cam.stream.getVideoTracks()[0]),
          e.videoTrack || (e.video = !1);
      } catch {}
    if (e.screen)
      try {
        (e.screenVideoTrack =
          n.local.streams.screen.stream.getVideoTracks()[0]),
          (e.screenAudioTrack =
            n.local.streams.screen.stream.getAudioTracks()[0]),
          e.screenVideoTrack || e.screenAudioTrack || (e.screen = !1);
      } catch {}
  } else {
    var r = !0;
    try {
      var i = n.participants[e.session_id];
      i &&
        i.public &&
        i.public.rtcType &&
        i.public.rtcType.impl === "peer-to-peer" &&
        i.private &&
        !["connected", "completed"].includes(i.private.peeringState) &&
        (r = !1);
    } catch (u) {
      console.error(u);
    }
    if (!r)
      return (
        (e.audio = !1),
        (e.audioTrack = !1),
        (e.video = !1),
        (e.videoTrack = !1),
        (e.screen = !1),
        void (e.screenTrack = !1)
      );
    try {
      if ((n.streams, e.audio && ye(n, e.session_id, "cam-audio"))) {
        var a = le(n, e.session_id, "cam", "audio");
        a &&
          (t && t.audioTrack && t.audioTrack.id === a.id
            ? (e.audioTrack = a)
            : a.muted || (e.audioTrack = a)),
          e.audioTrack || (e.audio = !1);
      }
      if (e.video && ye(n, e.session_id, "cam-video")) {
        var o = le(n, e.session_id, "cam", "video");
        o &&
          (t && t.videoTrack && t.videoTrack.id === o.id
            ? (e.videoTrack = o)
            : o.muted || (e.videoTrack = o)),
          e.videoTrack || (e.video = !1);
      }
      if (e.screen && ye(n, e.session_id, "screen-audio")) {
        var s = le(n, e.session_id, "screen", "audio");
        s &&
          (t && t.screenAudioTrack && t.screenAudioTrack.id === s.id
            ? (e.screenAudioTrack = s)
            : s.muted || (e.screenAudioTrack = s));
      }
      if (e.screen && ye(n, e.session_id, "screen-video")) {
        var c = le(n, e.session_id, "screen", "video");
        c &&
          (t && t.screenVideoTrack && t.screenVideoTrack.id === c.id
            ? (e.screenVideoTrack = c)
            : c.muted || (e.screenVideoTrack = c));
      }
      e.screenVideoTrack || e.screenAudioTrack || (e.screen = !1);
    } catch (u) {
      console.error("unexpected error matching up tracks", u);
    }
  }
}
function Yt(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function C(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Yt(Object(n), !0).forEach(function (r) {
          F(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : Yt(Object(n)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
        });
  }
  return e;
}
function Co(e) {
  var t = (function () {
    if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
      return !1;
    if (typeof Proxy == "function") return !0;
    try {
      return (
        Date.prototype.toString.call(
          Reflect.construct(Date, [], function () {})
        ),
        !0
      );
    } catch {
      return !1;
    }
  })();
  return function () {
    var n,
      r = B(e);
    if (t) {
      var i = B(this).constructor;
      n = Reflect.construct(r, arguments, i);
    } else n = r.apply(this, arguments);
    return Ae(this, n);
  };
}
var er = "video",
  To = "voice",
  Oo = 3,
  tr = { present: 0, hidden: 0 },
  Je = {
    maxBitrate: { min: 1e5, max: 25e5 },
    maxFramerate: { min: 1, max: 30 },
    scaleResolutionDownBy: { min: 1, max: 8 },
  },
  rr = ["state", "simulcastEncodings"],
  nr = {
    androidInCallNotification: {
      title: "string",
      subtitle: "string",
      iconName: "string",
      disableForCustomOverride: "boolean",
    },
    disableAutoDeviceManagement: { audio: "boolean", video: "boolean" },
  },
  Oe = {
    id: {
      iconPath: "string",
      iconPathDarkMode: "string",
      label: "string",
      tooltip: "string",
    },
  },
  z = {
    customTrayButtons: {
      validate: Hr,
      help: "customTrayButtons should be a dictionary of the type ".concat(
        JSON.stringify(Oe)
      ),
    },
    url: {
      validate: function (e) {
        return typeof e == "string";
      },
      help: "url should be a string",
    },
    baseUrl: {
      validate: function (e) {
        return typeof e == "string";
      },
      help: "baseUrl should be a string",
    },
    token: {
      validate: function (e) {
        return typeof e == "string";
      },
      help: "token should be a string",
      queryString: "t",
    },
    dailyConfig: {
      validate: function (e) {
        return (
          window._dailyConfig || (window._dailyConfig = {}),
          (window._dailyConfig.experimentalGetUserMediaConstraintsModify =
            e.experimentalGetUserMediaConstraintsModify),
          (window._dailyConfig.userMediaVideoConstraints =
            e.userMediaVideoConstraints),
          (window._dailyConfig.userMediaAudioConstraints =
            e.userMediaAudioConstraints),
          (window._dailyConfig.callObjectBundleUrlOverride =
            e.callObjectBundleUrlOverride),
          !0
        );
      },
    },
    reactNativeConfig: {
      validate: function (e) {
        return (function t(n, r) {
          if (r === void 0) return !1;
          switch (O(r)) {
            case "string":
              return O(n) === r;
            case "object":
              if (O(n) !== "object") return !1;
              for (var i in n) if (!t(n[i], r[i])) return !1;
              return !0;
            default:
              return !1;
          }
        })(e, nr);
      },
      help: "reactNativeConfig should look like ".concat(
        JSON.stringify(nr),
        ", all fields optional"
      ),
    },
    lang: {
      validate: function (e) {
        return [
          "de",
          "en-us",
          "en",
          "es",
          "fi",
          "fr",
          "it",
          "jp",
          "ka",
          "nl",
          "no",
          "pl",
          "pt",
          "ru",
          "sv",
          "tr",
          "user",
        ].includes(e);
      },
      help: "language not supported. Options are: de, en-us, en, es, fi, fr, it, jp, ka, nl, no, pl, pt, ru, sv, tr, user",
    },
    userName: !0,
    activeSpeakerMode: !0,
    showLeaveButton: !0,
    showLocalVideo: !0,
    showParticipantsBar: !0,
    showFullscreenButton: !0,
    iframeStyle: !0,
    customLayout: !0,
    cssFile: !0,
    cssText: !0,
    bodyClass: !0,
    videoSource: {
      validate: function (e, t) {
        return (t._preloadCache.videoDeviceId = e), !0;
      },
    },
    audioSource: {
      validate: function (e, t) {
        return (t._preloadCache.audioDeviceId = e), !0;
      },
    },
    subscribeToTracksAutomatically: {
      validate: function (e, t) {
        return (t._preloadCache.subscribeToTracksAutomatically = e), !0;
      },
    },
    theme: {
      validate: function (e) {
        var t = [
            "accent",
            "accentText",
            "background",
            "backgroundAccent",
            "baseText",
            "border",
            "mainAreaBg",
            "mainAreaBgAccent",
            "mainAreaText",
            "supportiveText",
          ],
          n = function (r) {
            for (var i = 0, a = Object.keys(r); i < a.length; i++) {
              var o = a[i];
              if (!t.includes(o))
                return (
                  console.error(
                    'unsupported color "'
                      .concat(o, '". Valid colors: ')
                      .concat(t.join(", "))
                  ),
                  !1
                );
              if (!r[o].match(/^#[0-9a-f]{6}|#[0-9a-f]{3}$/i))
                return (
                  console.error(
                    ""
                      .concat(
                        o,
                        ' theme color should be provided in valid hex color format. Received: "'
                      )
                      .concat(r[o], '"')
                  ),
                  !1
                );
            }
            return !0;
          };
        return O(e) === "object" &&
          (("light" in e && "dark" in e) || "colors" in e)
          ? "light" in e && "dark" in e
            ? "colors" in e.light
              ? "colors" in e.dark
                ? n(e.light.colors) && n(e.dark.colors)
                : (console.error('Dark theme is missing "colors" property.', e),
                  !1)
              : (console.error('Light theme is missing "colors" property.', e),
                !1)
            : n(e.colors)
          : (console.error(
              'Theme must contain either both "light" and "dark" properties, or "colors".',
              e
            ),
            !1);
      },
      help: "unsupported theme configuration. Check error logs for detailed info.",
    },
    layoutConfig: {
      validate: function (e) {
        if ("grid" in e) {
          var t = e.grid;
          if ("maxTilesPerPage" in t) {
            if (!Number.isInteger(t.maxTilesPerPage))
              return (
                console.error(
                  "grid.maxTilesPerPage should be an integer. You passed ".concat(
                    t.maxTilesPerPage,
                    "."
                  )
                ),
                !1
              );
            if (t.maxTilesPerPage > 49)
              return (
                console.error(
                  "grid.maxTilesPerPage can't be larger than 49 without sacrificing browser performance. Please contact us at https://www.daily.co/contact to talk about your use case."
                ),
                !1
              );
          }
          if ("minTilesPerPage" in t) {
            if (!Number.isInteger(t.minTilesPerPage))
              return (
                console.error(
                  "grid.minTilesPerPage should be an integer. You passed ".concat(
                    t.minTilesPerPage,
                    "."
                  )
                ),
                !1
              );
            if (t.minTilesPerPage < 1)
              return (
                console.error("grid.minTilesPerPage can't be lower than 1."), !1
              );
            if ("maxTilesPerPage" in t && t.minTilesPerPage > t.maxTilesPerPage)
              return (
                console.error(
                  "grid.minTilesPerPage can't be higher than grid.maxTilesPerPage."
                ),
                !1
              );
          }
        }
        return !0;
      },
      help: "unsupported layoutConfig. Check error logs for detailed info.",
    },
    receiveSettings: {
      validate: function (e) {
        return Jr(e, { allowAllParticipantsKey: !1 });
      },
      help: Gr({ allowAllParticipantsKey: !1 }),
    },
    inputSettings: {
      validate: function (e) {
        return qr(e);
      },
      help: rt(),
    },
    layout: {
      validate: function (e) {
        return e === "custom-v1" || e === "browser" || e === "none";
      },
      help: 'layout may only be set to "custom-v1"',
      queryString: "layout",
    },
    emb: { queryString: "emb" },
    embHref: { queryString: "embHref" },
    dailyJsVersion: { queryString: "dailyJsVersion" },
  },
  be = {
    styles: {
      validate: function (e) {
        for (var t in e) if (t !== "cam" && t !== "screen") return !1;
        if (e.cam) {
          for (var t in e.cam) if (t !== "div" && t !== "video") return !1;
        }
        if (e.screen) {
          for (var t in e.screen) if (t !== "div" && t !== "video") return !1;
        }
        return !0;
      },
      help: "styles format should be a subset of: { cam: {div: {}, video: {}}, screen: {div: {}, video: {}} }",
    },
    setSubscribedTracks: {
      validate: function (e, t, n) {
        if (t._preloadCache.subscribeToTracksAutomatically) return !1;
        var r = [!0, !1, "staged"];
        if (r.includes(e) || (!k() && e === "avatar")) return !0;
        var i = [
          "audio",
          "video",
          "screenAudio",
          "screenVideo",
          "rmpAudio",
          "rmpVideo",
        ];
        return (function a(o) {
          var s =
            arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
          for (var c in o)
            if (c === "custom") {
              if (!r.includes(o[c]) && !a(o[c], !0)) return !1;
            } else {
              var u = !s && !i.includes(c),
                d = !r.includes(o[c]);
              if (u || d) return !1;
            }
          return !0;
        })(e);
      },
      help:
        "setSubscribedTracks cannot be used when setSubscribeToTracksAutomatically is enabled, and should be of the form: " +
        "true".concat(
          k() ? "" : " | 'avatar'",
          " | false | 'staged' | { [audio: true|false|'staged'], [video: true|false|'staged'], [screenAudio: true|false|'staged'], [screenVideo: true|false|'staged'] }"
        ),
    },
    setAudio: !0,
    setVideo: !0,
    eject: !0,
  };
function ce(e) {
  var t = {};
  for (var n in e)
    e[n] instanceof MediaStreamTrack
      ? (t[n] = ke)
      : (n === "dailyConfig" &&
          (e[n].modifyLocalSdpHook &&
            (window._dailyConfig &&
              (window._dailyConfig.modifyLocalSdpHook =
                e[n].modifyLocalSdpHook),
            delete e[n].modifyLocalSdpHook),
          e[n].modifyRemoteSdpHook &&
            (window._dailyConfig &&
              (window._dailyConfig.modifyRemoteSdpHook =
                e[n].modifyRemoteSdpHook),
            delete e[n].modifyRemoteSdpHook)),
        (t[n] = e[n]));
  return t;
}
function m() {
  if (k())
    throw new Error(
      "This daily-js method is not currently supported in React Native"
    );
}
function ue() {
  if (!k())
    throw new Error("This daily-js method is only supported in React Native");
}
function Jr(e, t) {
  for (
    var n = t.allowAllParticipantsKey,
      r = function (h) {
        var f = ["local"];
        return n || f.push("*"), h && !f.includes(h);
      },
      i = function (h) {
        return !!(
          h.layer === void 0 ||
          (Number.isInteger(h.layer) && h.layer >= 0) ||
          h.layer === "inherit"
        );
      },
      a = function (h) {
        return (
          !!h &&
          !(h.video && !i(h.video)) &&
          !(h.screenVideo && !i(h.screenVideo))
        );
      },
      o = 0,
      s = Object.entries(e);
    o < s.length;
    o++
  ) {
    var c = qe(s[o], 2),
      u = c[0],
      d = c[1];
    if (!r(u) || !a(d)) return !1;
  }
  return !0;
}
function qr(e) {
  return (
    O(e) === "object" &&
    !(!e.video || O(e.video) !== "object") &&
    !!(function (t) {
      var n = ["type", "config", "publish"];
      return !t ||
        O(t) !== "object" ||
        Object.keys(t).length === 0 ||
        (t.type &&
          !(function (r) {
            return typeof r != "string"
              ? !1
              : Object.values(Me).includes(r)
              ? !0
              : (console.error("inputSettings video processor type invalid"),
                !1);
          })(t.type)) ||
        (t.publish !== void 0 && typeof t.publish != "boolean") ||
        (typeof t.publish == "boolean" &&
          console.warn(
            "inputSettings.video.processor: publish key has been deprecated; it will be ignored"
          ),
        t.config &&
          (O(t.config) !== "object" ||
            !(function (r, i) {
              var a = Object.keys(i);
              if (a.length === 0) return !0;
              var o =
                "invalid object in inputSettings -> video -> processor -> config";
              switch (r) {
                case Me.BGBLUR:
                  return a.length > 1 || a[0] !== "strength"
                    ? (console.error(o), !1)
                    : !(
                        typeof i.strength != "number" ||
                        i.strength <= 0 ||
                        i.strength > 1 ||
                        isNaN(i.strength)
                      ) ||
                        (console.error(
                          ""
                            .concat(o, "; expected: {0 < strength <= 1}, got: ")
                            .concat(i.strength)
                        ),
                        !1);
                case Me.BGIMAGE:
                  return !(
                    i.source !== void 0 &&
                    !(function (s) {
                      if (s.source === "default")
                        return (s.type = "default"), !0;
                      if (Ke(s.source))
                        return (
                          (s.type = "url"),
                          !!(function (d) {
                            var h = new URL(d),
                              f = h.pathname;
                            if (h.protocol === "data:")
                              try {
                                var g = f.substring(
                                    f.indexOf(":") + 1,
                                    f.indexOf(";")
                                  ),
                                  w = g.split("/")[1];
                                return Re.includes(w);
                              } catch (j) {
                                return (
                                  console.error(
                                    "failed to deduce blob content type",
                                    j
                                  ),
                                  !1
                                );
                              }
                            var S = f.split(".").at(-1).toLowerCase().trim();
                            return Re.includes(S);
                          })(s.source) ||
                            (console.error(
                              "invalid image type; supported types: [".concat(
                                Re.join(", "),
                                "]"
                              )
                            ),
                            !1)
                        );
                      return (
                        (c = s.source),
                        (u = Number(c)),
                        isNaN(u) || !Number.isInteger(u) || u <= 0 || u > Pt
                          ? (console.error(
                              "invalid image selection; must be an int, > 0, <= ".concat(
                                Pt
                              )
                            ),
                            !1)
                          : ((s.type = "daily-preselect"), !0)
                      );
                      var c, u;
                    })(i)
                  );
                default:
                  return !0;
              }
            })(t.type, t.config)))
        ? !1
        : (Object.keys(t)
            .filter(function (r) {
              return !n.includes(r);
            })
            .forEach(function (r) {
              console.warn(
                "invalid key inputSettings -> video -> processor : ".concat(r)
              ),
                delete t[r];
            }),
          !0);
    })(e.video.processor)
  );
}
function rt() {
  var e = Object.values(Me).join(" | ");
  return "inputSettings must be of the form: { video: { processor: [ ".concat(
    e,
    " ] }, config?: {} }"
  );
}
function Gr(e) {
  var t = e.allowAllParticipantsKey;
  return (
    "receiveSettings must be of the form { [<remote participant id> | "
      .concat(bn)
      .concat(t ? ' | "'.concat(_n, '"') : "", "]: ") +
    '{ [video: [{ layer: [<non-negative integer> | "inherit"] } | "inherit"]], [screenVideo: [{ layer: [<non-negative integer> | "inherit"] } | "inherit"]] }}}'
  );
}
function Hr(e) {
  if ((e && O(e) !== "object") || Array.isArray(e))
    return (
      console.error(
        "customTrayButtons should be an Object of the type ".concat(
          JSON.stringify(Oe),
          "."
        )
      ),
      !1
    );
  if (e)
    for (var t = 0, n = Object.entries(e); t < n.length; t++)
      for (
        var r = qe(n[t], 1)[0], i = 0, a = Object.entries(e[r]);
        i < a.length;
        i++
      ) {
        var o = qe(a[i], 2),
          s = o[0],
          c = o[1];
        if (
          (s === "iconPath" && !Ke(c)) ||
          (s === "iconPathDarkMode" && !Ke(c))
        )
          return (
            console.error("customTrayButton ".concat(s, " should be a url.")),
            !1
          );
        var u = Oe.id[s];
        if (!u)
          return (
            console.error("customTrayButton does not support key ".concat(s)),
            !1
          );
        if (O(c) !== u)
          return (
            console.error(
              "customTrayButton ".concat(s, " should be a ").concat(u, ".")
            ),
            !1
          );
      }
  return !0;
}
function ir(e) {
  if (O(e) !== "object")
    throw new Error('RemoteMediaPlayerSettings: must be "object" type');
  if (!e.state || !Object.values(He).includes(e.state))
    throw new Error(
      "Invalid value for RemoteMediaPlayerSettings.state, valid values are: " +
        JSON.stringify(He)
    );
}
function ar(e, t, n) {
  return !(typeof e != "number" || e < t || e > n);
}
const jo = (function (e) {
  Pe(n, R.exports);
  var t = Co(n);
  function n(r) {
    var i,
      a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (
      (x(this, n),
      (i = t.call(this)),
      F(E(i), "startListeningForDeviceChanges", function () {
        navigator.mediaDevices.ondevicechange !== void 0 || k()
          ? navigator.mediaDevices.addEventListener(
              "devicechange",
              i.deviceChangeListener
            )
          : i.startPollingForDeviceChanges();
      }),
      F(E(i), "stopListeningForDeviceChanges", function () {
        navigator.mediaDevices.ondevicechange !== void 0 || k()
          ? navigator.mediaDevices.removeEventListener(
              "devicechange",
              i.deviceChangeListener
            )
          : i.stopPollingForDeviceChanges();
      }),
      F(
        E(i),
        "deviceChangeListener",
        v(function* () {
          var s = yield i.enumerateDevices();
          i.handleDeviceChange(s.devices);
        })
      ),
      F(E(i), "handleDeviceChange", function (s) {
        i.emit(jt, { action: jt, availableDevices: s });
      }),
      F(E(i), "startPollingForDeviceChanges", function () {
        i._deviceChangeInterval ||
          (i._deviceChangeInterval = setInterval(
            v(function* () {
              var s = yield i.enumerateDevices(),
                c = JSON.stringify(s);
              i._lastDevicesJSON &&
                c !== i._lastDevicesJSON &&
                i.handleDeviceChange(s.devices),
                (i._lastDevicesJSON = c);
            }),
            3e3
          ));
      }),
      F(E(i), "stopPollingForDeviceChanges", function () {
        i._deviceChangeInterval &&
          (clearInterval(i._deviceChangeInterval),
          (i._deviceChangeInterval = null),
          (i._lastDevicesJSON = null));
      }),
      F(E(i), "handleNativeAppActiveStateChange", function (s) {
        i.disableReactNativeAutoDeviceManagement("video") ||
          (s
            ? i.camUnmutedBeforeLosingNativeActiveState && i.setLocalVideo(!0)
            : ((i.camUnmutedBeforeLosingNativeActiveState = i.localVideo()),
              i.camUnmutedBeforeLosingNativeActiveState &&
                i.setLocalVideo(!1)));
      }),
      F(E(i), "handleNativeAudioFocusChange", function (s) {
        i.disableReactNativeAutoDeviceManagement("audio") ||
          ((i._hasNativeAudioFocus = s),
          i.toggleParticipantAudioBasedOnNativeAudioFocus(),
          i._hasNativeAudioFocus
            ? i.micUnmutedBeforeLosingNativeAudioFocus && i.setLocalAudio(!0)
            : ((i.micUnmutedBeforeLosingNativeAudioFocus = i.localAudio()),
              i.setLocalAudio(!1)));
      }),
      (a.dailyJsVersion = n.version()),
      (i._iframe = r),
      (i._callObjectMode = a.layout === "none" && !i._iframe),
      (i._preloadCache = {
        subscribeToTracksAutomatically: !0,
        audioDeviceId: null,
        videoDeviceId: null,
        outputDeviceId: null,
      }),
      i._callObjectMode && (window._dailyPreloadCache = i._preloadCache),
      a.showLocalVideo !== void 0
        ? i._callObjectMode
          ? console.error("showLocalVideo is not available in call object mode")
          : (i._showLocalVideo = !!a.showLocalVideo)
        : (i._showLocalVideo = !0),
      a.showParticipantsBar !== void 0
        ? i._callObjectMode
          ? console.error(
              "showParticipantsBar is not available in call object mode"
            )
          : (i._showParticipantsBar = !!a.showParticipantsBar)
        : (i._showParticipantsBar = !0),
      a.customTrayButtons !== void 0
        ? i._callObjectMode
          ? console.error(
              "customTrayButtons is not available in call object mode"
            )
          : (i._customTrayButtons = a.customTrayButtons)
        : (i._customTrayButtons = {}),
      a.activeSpeakerMode !== void 0
        ? i._callObjectMode
          ? console.error(
              "activeSpeakerMode is not available in call object mode"
            )
          : (i._activeSpeakerMode = !!a.activeSpeakerMode)
        : (i._activeSpeakerMode = !1),
      a.receiveSettings
        ? i._callObjectMode
          ? (i._receiveSettings = a.receiveSettings)
          : console.error(
              "receiveSettings is only available in call object mode"
            )
        : (i._receiveSettings = {}),
      (i._inputSettings = {}),
      a.inputSettings && (i._inputSettings = a.inputSettings),
      i.validateProperties(a),
      (i.properties = C({}, a)),
      (i._callObjectLoader = i._callObjectMode ? new Dn() : null),
      (i._meetingState = Ot),
      (i._isPreparingToJoin = !1),
      (i._accessState = { access: Ne }),
      (i._nativeInCallAudioMode = er),
      (i._participants = {}),
      (i._participantCounts = tr),
      (i._rmpPlayerState = {}),
      (i._waitingParticipants = {}),
      (i._inputEventsOn = {}),
      (i._network = { threshold: "good", quality: 100 }),
      (i._activeSpeaker = {}),
      (i._callFrameId = Ee()),
      (i._messageChannel = k() ? new En() : new Pn()),
      i._iframe &&
        (i._iframe.requestFullscreen
          ? i._iframe.addEventListener("fullscreenchange", function (s) {
              document.fullscreenElement === i._iframe
                ? (i.emit(H, { action: H }),
                  i.sendMessageToCallMachine({ action: H }))
                : (i.emit(K, { action: K }),
                  i.sendMessageToCallMachine({ action: K }));
            })
          : i._iframe.webkitRequestFullscreen &&
            i._iframe.addEventListener("webkitfullscreenchange", function (s) {
              document.webkitFullscreenElement === i._iframe
                ? (i.emit(H, { action: H }),
                  i.sendMessageToCallMachine({ action: H }))
                : (i.emit(K, { action: K }),
                  i.sendMessageToCallMachine({ action: K }));
            })),
      k())
    ) {
      var o = i.nativeUtils();
      (o.addAudioFocusChangeListener &&
        o.removeAudioFocusChangeListener &&
        o.addAppActiveStateChangeListener &&
        o.removeAppActiveStateChangeListener) ||
        console.warn(
          "expected (add|remove)(AudioFocus|AppActiveState)ChangeListener to be available in React Native"
        ),
        (i._hasNativeAudioFocus = !0),
        o.addAudioFocusChangeListener(i.handleNativeAudioFocusChange),
        o.addAppActiveStateChangeListener(i.handleNativeAppActiveStateChange);
    }
    return (
      i._callObjectMode && i.startListeningForDeviceChanges(),
      i._messageChannel.addListenerForMessagesFromCallMachine(
        i.handleMessageFromCallMachine,
        i._callFrameId,
        E(i)
      ),
      i
    );
  }
  return (
    L(n, null, [
      {
        key: "supportedBrowser",
        value: function () {
          if (k())
            return {
              supported: !0,
              mobile: !0,
              name: "React Native",
              version: null,
              supportsScreenShare: !1,
              supportsSfu: !0,
              supportsVideoProcessing: !1,
            };
          var r = class {
            static getParser(i, a = !1) {
              if (typeof i != "string")
                throw new Error("UserAgent should be a string");
              return new Tt(i, a);
            }
            static parse(i) {
              return new Tt(i).getResult();
            }
            static get BROWSER_MAP() {
              return pr;
            }
            static get ENGINE_MAP() {
              return N;
            }
            static get OS_MAP() {
              return P;
            }
            static get PLATFORMS_MAP() {
              return M;
            }
          }.getParser(I());
          return {
            supported: !!mr(),
            mobile: r.getPlatformType() === "mobile",
            name: r.getBrowserName(),
            version: r.getBrowserVersion(),
            supportsFullscreen: !!At(),
            supportsScreenShare: !!Cn(),
            supportsSfu: !!gr(),
            supportsVideoProcessing: On(),
          };
        },
      },
      {
        key: "version",
        value: function () {
          return "0.29.0-alpha.1";
        },
      },
      {
        key: "createCallObject",
        value: function () {
          var r =
            arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          return (r.layout = "none"), new n(null, r);
        },
      },
      {
        key: "wrap",
        value: function (r) {
          var i =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          if ((m(), !r || !r.contentWindow || typeof r.src != "string"))
            throw new Error(
              "DailyIframe::Wrap needs an iframe-like first argument"
            );
          return (
            i.layout ||
              (i.customLayout
                ? (i.layout = "custom-v1")
                : (i.layout = "browser")),
            new n(r, i)
          );
        },
      },
      {
        key: "createFrame",
        value: function (r, i) {
          var a, o;
          m(),
            r && i
              ? ((a = r), (o = i))
              : r && r.append
              ? ((a = r), (o = {}))
              : ((a = document.body), (o = r || {}));
          var s = o.iframeStyle;
          s ||
            (s =
              a === document.body
                ? {
                    position: "fixed",
                    border: "1px solid black",
                    backgroundColor: "white",
                    width: "375px",
                    height: "450px",
                    right: "1em",
                    bottom: "1em",
                  }
                : { border: 0, width: "100%", height: "100%" });
          var c = document.createElement("iframe");
          window.navigator && window.navigator.userAgent.match(/Chrome\/61\./)
            ? (c.allow = "microphone, camera")
            : (c.allow = "microphone; camera; autoplay; display-capture"),
            (c.style.visibility = "hidden"),
            a.appendChild(c),
            (c.style.visibility = null),
            Object.keys(s).forEach(function (u) {
              return (c.style[u] = s[u]);
            }),
            o.layout ||
              (o.customLayout
                ? (o.layout = "custom-v1")
                : (o.layout = "browser"));
          try {
            return new n(c, o);
          } catch (u) {
            throw (a.removeChild(c), u);
          }
        },
      },
      {
        key: "createTransparentFrame",
        value: function () {
          var r =
            arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          m();
          var i = document.createElement("iframe");
          return (
            (i.allow = "microphone; camera; autoplay"),
            (i.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0;
      pointer-events: none;
    `),
            document.body.appendChild(i),
            r.layout || (r.layout = "custom-v1"),
            n.wrap(i, r)
          );
        },
      },
    ]),
    L(n, [
      {
        key: "destroy",
        value: (function () {
          var r = v(function* () {
            try {
              [T, De].includes(this._meetingState) && (yield this.leave());
            } catch {}
            var i = this._iframe;
            if (i) {
              var a = i.parentElement;
              a && a.removeChild(i);
            }
            if (
              (this._messageChannel.removeListener(
                this.handleMessageFromCallMachine
              ),
              k())
            ) {
              var o = this.nativeUtils();
              o.removeAudioFocusChangeListener(
                this.handleNativeAudioFocusChange
              ),
                o.removeAppActiveStateChangeListener(
                  this.handleNativeAppActiveStateChange
                );
            }
            this._callObjectMode && this.stopListeningForDeviceChanges(),
              this.resetMeetingDependentVars();
          });
          return function () {
            return r.apply(this, arguments);
          };
        })(),
      },
      {
        key: "loadCss",
        value: function (r) {
          var i = r.bodyClass,
            a = r.cssFile,
            o = r.cssText;
          return (
            m(),
            this.sendMessageToCallMachine({
              action: "load-css",
              cssFile: this.absoluteUrl(a),
              bodyClass: i,
              cssText: o,
            }),
            this
          );
        },
      },
      {
        key: "iframe",
        value: function () {
          return m(), this._iframe;
        },
      },
      {
        key: "meetingState",
        value: function () {
          return this._meetingState;
        },
      },
      {
        key: "accessState",
        value: function () {
          if (!this._callObjectMode)
            throw new Error(
              "accessState() currently only supported in call object mode"
            );
          return this._accessState;
        },
      },
      {
        key: "participants",
        value: function () {
          return this._participants;
        },
      },
      {
        key: "participantCounts",
        value: function () {
          return this._participantCounts;
        },
      },
      {
        key: "waitingParticipants",
        value: function () {
          if (!this._callObjectMode)
            throw new Error(
              "waitingParticipants() currently only supported in call object mode"
            );
          return this._waitingParticipants;
        },
      },
      {
        key: "validateParticipantProperties",
        value: function (r, i) {
          for (var a in i) {
            if (!be[a])
              throw new Error(
                "unrecognized updateParticipant property ".concat(a)
              );
            if (
              be[a].validate &&
              !be[a].validate(i[a], this, this._participants[r])
            )
              throw new Error(be[a].help);
          }
        },
      },
      {
        key: "updateParticipant",
        value: function (r, i) {
          return (
            this._participants.local &&
              this._participants.local.session_id === r &&
              (r = "local"),
            r &&
              i &&
              this._participants[r] &&
              (this.validateParticipantProperties(r, i),
              this.sendMessageToCallMachine({
                action: "update-participant",
                id: r,
                properties: i,
              })),
            this
          );
        },
      },
      {
        key: "updateParticipants",
        value: function (r) {
          var i =
            this._participants.local && this._participants.local.session_id;
          for (var a in r)
            a === i && (a = "local"),
              a && r[a] && (this._participants[a] || a === "*")
                ? this.validateParticipantProperties(a, r[a])
                : (console.warn(
                    "unrecognized participant in updateParticipants: ".concat(a)
                  ),
                  delete r[a]);
          return (
            this.sendMessageToCallMachine({
              action: "update-participants",
              participants: r,
            }),
            this
          );
        },
      },
      {
        key: "updateWaitingParticipant",
        value: (function () {
          var r = v(function* () {
            var i = this,
              a =
                arguments.length > 0 && arguments[0] !== void 0
                  ? arguments[0]
                  : "",
              o =
                arguments.length > 1 && arguments[1] !== void 0
                  ? arguments[1]
                  : {};
            if (!this._callObjectMode)
              throw new Error(
                "updateWaitingParticipant() currently only supported in call object mode"
              );
            if (this._meetingState !== T)
              throw new Error(
                "updateWaitingParticipant() only supported for joined meetings"
              );
            if (typeof a != "string" || O(o) !== "object")
              throw new Error(
                "updateWaitingParticipant() must take an id string and a updates object"
              );
            return new Promise(function (s, c) {
              i.sendMessageToCallMachine(
                {
                  action: "daily-method-update-waiting-participant",
                  id: a,
                  updates: o,
                },
                function (u) {
                  u.error && c(u.error),
                    u.id ||
                      c(
                        new Error("unknown error in updateWaitingParticipant()")
                      ),
                    s({ id: u.id });
                }
              );
            });
          });
          return function () {
            return r.apply(this, arguments);
          };
        })(),
      },
      {
        key: "updateWaitingParticipants",
        value: (function () {
          var r = v(function* () {
            var i = this,
              a =
                arguments.length > 0 && arguments[0] !== void 0
                  ? arguments[0]
                  : {};
            if (!this._callObjectMode)
              throw new Error(
                "updateWaitingParticipants() currently only supported in call object mode"
              );
            if (this._meetingState !== T)
              throw new Error(
                "updateWaitingParticipants() only supported for joined meetings"
              );
            if (O(a) !== "object")
              throw new Error(
                "updateWaitingParticipants() must take a mapping between ids and update objects"
              );
            return new Promise(function (o, s) {
              i.sendMessageToCallMachine(
                {
                  action: "daily-method-update-waiting-participants",
                  updatesById: a,
                },
                function (c) {
                  c.error && s(c.error),
                    c.ids ||
                      s(
                        new Error(
                          "unknown error in updateWaitingParticipants()"
                        )
                      ),
                    o({ ids: c.ids });
                }
              );
            });
          });
          return function () {
            return r.apply(this, arguments);
          };
        })(),
      },
      {
        key: "requestAccess",
        value: (function () {
          var r = v(function* () {
            var i = this,
              a =
                arguments.length > 0 && arguments[0] !== void 0
                  ? arguments[0]
                  : {},
              o = a.access,
              s = o === void 0 ? { level: "full" } : o,
              c = a.name,
              u = c === void 0 ? "" : c;
            if (!this._callObjectMode)
              throw new Error(
                "requestAccess() currently only supported in call object mode"
              );
            if (this._meetingState !== T)
              throw new Error(
                "requestAccess() only supported for joined meetings"
              );
            return new Promise(function (d, h) {
              i.sendMessageToCallMachine(
                { action: "daily-method-request-access", access: s, name: u },
                function (f) {
                  f.error && h(f.error),
                    f.access ||
                      h(new Error("unknown error in requestAccess()")),
                    d({ access: f.access, granted: f.granted });
                }
              );
            });
          });
          return function () {
            return r.apply(this, arguments);
          };
        })(),
      },
      {
        key: "localAudio",
        value: function () {
          return this._participants.local
            ? this._participants.local.audio
            : null;
        },
      },
      {
        key: "localVideo",
        value: function () {
          return this._participants.local
            ? this._participants.local.video
            : null;
        },
      },
      {
        key: "setLocalAudio",
        value: function (r) {
          return (
            this.sendMessageToCallMachine({ action: "local-audio", state: r }),
            this
          );
        },
      },
      {
        key: "setLocalVideo",
        value: function (r) {
          return (
            this.sendMessageToCallMachine({ action: "local-video", state: r }),
            this
          );
        },
      },
      {
        key: "getReceiveSettings",
        value: (function () {
          var r = v(function* (i) {
            var a = this,
              o = (
                arguments.length > 1 && arguments[1] !== void 0
                  ? arguments[1]
                  : {}
              ).showInheritedValues,
              s = o !== void 0 && o;
            if (!this._callObjectMode)
              throw new Error(
                "getReceiveSettings() only supported in call object mode"
              );
            switch (O(i)) {
              case "string":
                return new Promise(function (c) {
                  a.sendMessageToCallMachine(
                    {
                      action: "get-single-participant-receive-settings",
                      id: i,
                      showInheritedValues: s,
                    },
                    function (u) {
                      c(u.receiveSettings);
                    }
                  );
                });
              case "undefined":
                return this._receiveSettings;
              default:
                throw new Error(
                  'first argument to getReceiveSettings() must be a participant id (or "base"), or there should be no arguments'
                );
            }
          });
          return function (i) {
            return r.apply(this, arguments);
          };
        })(),
      },
      {
        key: "updateReceiveSettings",
        value: (function () {
          var r = v(function* (i) {
            var a = this;
            if (!this._callObjectMode)
              throw new Error(
                "updateReceiveSettings() only supported in call object mode"
              );
            if (!Jr(i, { allowAllParticipantsKey: !0 }))
              throw new Error(Gr({ allowAllParticipantsKey: !0 }));
            if (this._meetingState !== T)
              throw new Error(
                "updateReceiveSettings() is only allowed when joined. To specify receive settings earlier, use the receiveSettings config property."
              );
            return new Promise(function (o) {
              a.sendMessageToCallMachine(
                { action: "update-receive-settings", receiveSettings: i },
                function (s) {
                  o({ receiveSettings: s.receiveSettings });
                }
              );
            });
          });
          return function (i) {
            return r.apply(this, arguments);
          };
        })(),
      },
      {
        key: "getInputSettings",
        value: function () {
          var r = this;
          return new Promise(function (i) {
            i(r._inputSettings);
          });
        },
      },
      {
        key: "updateInputSettings",
        value: (function () {
          var r = v(function* (i) {
            var a = this;
            return new Promise(function (o, s) {
              if (!qr(i)) return console.error(rt()), void s(rt());
              a.sendMessageToCallMachine(
                { action: "update-input-settings", inputSettings: i },
                function (c) {
                  c.error ? s(c.error) : o({ inputSettings: c.inputSettings });
                }
              );
            });
          });
          return function (i) {
            return r.apply(this, arguments);
          };
        })(),
      },
      {
        key: "setBandwidth",
        value: function (r) {
          var i = r.kbs,
            a = r.trackConstraints;
          return (
            m(),
            this.sendMessageToCallMachine({
              action: "set-bandwidth",
              kbs: i,
              trackConstraints: a,
            }),
            this
          );
        },
      },
      {
        key: "getDailyLang",
        value: function () {
          var r = this;
          return (
            m(),
            new Promise(
              (function () {
                var i = v(function* (a) {
                  r.sendMessageToCallMachine(
                    { action: "get-daily-lang" },
                    function (o) {
                      delete o.action, delete o.callbackStamp, a(o);
                    }
                  );
                });
                return function (a) {
                  return i.apply(this, arguments);
                };
              })()
            )
          );
        },
      },
      {
        key: "setDailyLang",
        value: function (r) {
          return (
            m(),
            this.sendMessageToCallMachine({
              action: "set-daily-lang",
              lang: r,
            }),
            this
          );
        },
      },
      {
        key: "getMeetingSession",
        value: (function () {
          var r = v(function* () {
            var i = this;
            if (this._meetingState !== T)
              throw new Error(
                "getMeetingSession() is only allowed when joined"
              );
            return new Promise(
              (function () {
                var a = v(function* (o) {
                  i.sendMessageToCallMachine(
                    { action: "get-meeting-session" },
                    function (s) {
                      delete s.action,
                        delete s.callbackStamp,
                        delete s.callFrameId,
                        o(s);
                    }
                  );
                });
                return function (o) {
                  return a.apply(this, arguments);
                };
              })()
            );
          });
          return function () {
            return r.apply(this, arguments);
          };
        })(),
      },
      {
        key: "setUserName",
        value: function (r, i) {
          var a = this;
          return (
            (this.properties.userName = r),
            new Promise(
              (function () {
                var o = v(function* (s) {
                  a.sendMessageToCallMachine(
                    {
                      action: "set-user-name",
                      name: r != null ? r : "",
                      thisMeetingOnly: k() || (!!i && !!i.thisMeetingOnly),
                    },
                    function (c) {
                      delete c.action, delete c.callbackStamp, s(c);
                    }
                  );
                });
                return function (s) {
                  return o.apply(this, arguments);
                };
              })()
            )
          );
        },
      },
      {
        key: "startCamera",
        value: function () {
          var r = this,
            i =
              arguments.length > 0 && arguments[0] !== void 0
                ? arguments[0]
                : {};
          if (!this._callObjectMode)
            throw new Error(
              "startCamera() currently only supported in call object mode"
            );
          if ([ae, T].includes(this._meetingState))
            throw new Error(
              "startCamera() not supported after joining a meeting: did you mean to use setLocalAudio() and/or setLocalVideo() instead?"
            );
          return new Promise(
            (function () {
              var a = v(function* (o, s) {
                if (r.needsLoad())
                  try {
                    yield r.load(i);
                  } catch (c) {
                    s(c);
                  }
                else r.validateProperties(i);
                r.sendMessageToCallMachine(
                  {
                    action: "start-camera",
                    properties: ce(r.properties),
                    preloadCache: ce(r._preloadCache),
                  },
                  function (c) {
                    delete c.action, delete c.callbackStamp, o(c);
                  }
                );
              });
              return function (o, s) {
                return a.apply(this, arguments);
              };
            })()
          );
        },
      },
      {
        key: "setCamera",
        value: function (r) {
          var i = this;
          if ((ue(), this.needsLoad()))
            throw new Error(
              "Before you can invoke setCamera, first you need to invoke one of these methods: join, startCamera, or preAuth"
            );
          return new Promise(function (a, o) {
            i.sendMessageToCallMachine(
              { action: "set-camera", cameraDeviceId: r },
              function (s) {
                a({ device: s.device });
              }
            );
          });
        },
      },
      {
        key: "setAudioDevice",
        value: (function () {
          var r = v(function* (i) {
            return (
              ue(),
              this.nativeUtils().setAudioDevice(i),
              { deviceId: yield this.nativeUtils().getAudioDevice() }
            );
          });
          return function (i) {
            return r.apply(this, arguments);
          };
        })(),
      },
      {
        key: "cycleCamera",
        value: function () {
          var r = this;
          return new Promise(function (i, a) {
            r.sendMessageToCallMachine(
              { action: "cycle-camera" },
              function (o) {
                i({ device: o.device });
              }
            );
          });
        },
      },
      {
        key: "cycleMic",
        value: function () {
          var r = this;
          return (
            m(),
            new Promise(function (i, a) {
              r.sendMessageToCallMachine({ action: "cycle-mic" }, function (o) {
                i({ device: o.device });
              });
            })
          );
        },
      },
      {
        key: "getCameraFacingMode",
        value: function () {
          var r = this;
          return (
            ue(),
            new Promise(function (i, a) {
              r.sendMessageToCallMachine(
                { action: "get-camera-facing-mode" },
                function (o) {
                  i(o.facingMode);
                }
              );
            })
          );
        },
      },
      {
        key: "setInputDevices",
        value: function (r) {
          var i = r.audioDeviceId,
            a = r.videoDeviceId,
            o = r.audioSource,
            s = r.videoSource;
          return (
            console.warn(
              "setInputDevices() is deprecated: instead use setInputDevicesAsync(), which returns a Promise"
            ),
            this.setInputDevicesAsync({
              audioDeviceId: i,
              videoDeviceId: a,
              audioSource: o,
              videoSource: s,
            }),
            this
          );
        },
      },
      {
        key: "setInputDevicesAsync",
        value: (function () {
          var r = v(function* (i) {
            var a = this,
              o = i.audioDeviceId,
              s = i.videoDeviceId,
              c = i.audioSource,
              u = i.videoSource;
            return (
              m(),
              c !== void 0 && (o = c),
              u !== void 0 && (s = u),
              o && (this._preloadCache.audioDeviceId = o),
              s && (this._preloadCache.videoDeviceId = s),
              this._callObjectMode && this.needsLoad()
                ? {
                    camera: { deviceId: this._preloadCache.videoDeviceId },
                    mic: { deviceId: this._preloadCache.audioDeviceId },
                    speaker: { deviceId: this._preloadCache.outputDeviceId },
                  }
                : (o instanceof MediaStreamTrack && (o = ke),
                  s instanceof MediaStreamTrack && (s = ke),
                  new Promise(function (d) {
                    a.sendMessageToCallMachine(
                      {
                        action: "set-input-devices",
                        audioDeviceId: o,
                        videoDeviceId: s,
                      },
                      function (h) {
                        delete h.action,
                          delete h.callbackStamp,
                          h.returnPreloadCache
                            ? d({
                                camera: {
                                  deviceId: a._preloadCache.videoDeviceId,
                                },
                                mic: {
                                  deviceId: a._preloadCache.audioDeviceId,
                                },
                                speaker: {
                                  deviceId: a._preloadCache.outputDeviceId,
                                },
                              })
                            : d(h);
                      }
                    );
                  }))
            );
          });
          return function (i) {
            return r.apply(this, arguments);
          };
        })(),
      },
      {
        key: "setOutputDevice",
        value: function (r) {
          var i = r.outputDeviceId;
          return (
            console.warn(
              "setOutputDevice() is deprecated: instead use setOutputDeviceAsync(), which returns a Promise"
            ),
            this.setOutputDeviceAsync({ outputDeviceId: i }),
            this
          );
        },
      },
      {
        key: "setOutputDeviceAsync",
        value: (function () {
          var r = v(function* (i) {
            var a = this,
              o = i.outputDeviceId;
            return (
              m(),
              o && (this._preloadCache.outputDeviceId = o),
              this._callObjectMode && this.needsLoad()
                ? {
                    camera: { deviceId: this._preloadCache.videoDeviceId },
                    mic: { deviceId: this._preloadCache.audioDeviceId },
                    speaker: { deviceId: this._preloadCache.outputDeviceId },
                  }
                : new Promise(function (s) {
                    a.sendMessageToCallMachine(
                      { action: "set-output-device", outputDeviceId: o },
                      function (c) {
                        delete c.action,
                          delete c.callbackStamp,
                          c.returnPreloadCache
                            ? s({
                                camera: {
                                  deviceId: a._preloadCache.videoDeviceId,
                                },
                                mic: {
                                  deviceId: a._preloadCache.audioDeviceId,
                                },
                                speaker: {
                                  deviceId: a._preloadCache.outputDeviceId,
                                },
                              })
                            : s(c);
                      }
                    );
                  })
            );
          });
          return function (i) {
            return r.apply(this, arguments);
          };
        })(),
      },
      {
        key: "getInputDevices",
        value: (function () {
          var r = v(function* () {
            var i = this;
            return this._callObjectMode && this.needsLoad()
              ? {
                  camera: { deviceId: this._preloadCache.videoDeviceId },
                  mic: { deviceId: this._preloadCache.audioDeviceId },
                  speaker: { deviceId: this._preloadCache.outputDeviceId },
                }
              : new Promise(function (a, o) {
                  i.sendMessageToCallMachine(
                    { action: "get-input-devices" },
                    function (s) {
                      delete s.action,
                        delete s.callbackStamp,
                        s.returnPreloadCache
                          ? a({
                              camera: {
                                deviceId: i._preloadCache.videoDeviceId,
                              },
                              mic: { deviceId: i._preloadCache.audioDeviceId },
                              speaker: {
                                deviceId: i._preloadCache.outputDeviceId,
                              },
                            })
                          : a(s);
                    }
                  );
                });
          });
          return function () {
            return r.apply(this, arguments);
          };
        })(),
      },
      {
        key: "nativeInCallAudioMode",
        value: function () {
          return ue(), this._nativeInCallAudioMode;
        },
      },
      {
        key: "setNativeInCallAudioMode",
        value: function (r) {
          if ((ue(), [er, To].includes(r))) {
            if (r !== this._nativeInCallAudioMode)
              return (
                (this._nativeInCallAudioMode = r),
                !this.disableReactNativeAutoDeviceManagement("audio") &&
                  this.isMeetingPendingOrOngoing(
                    this._meetingState,
                    this._isPreparingToJoin
                  ) &&
                  this.nativeUtils().setAudioMode(this._nativeInCallAudioMode),
                this
              );
          } else console.error("invalid in-call audio mode specified: ", r);
        },
      },
      {
        key: "preAuth",
        value: (function () {
          var r = v(function* () {
            var i = this,
              a =
                arguments.length > 0 && arguments[0] !== void 0
                  ? arguments[0]
                  : {};
            if (!this._callObjectMode)
              throw new Error(
                "preAuth() currently only supported in call object mode"
              );
            if ([ae, T].includes(this._meetingState))
              throw new Error(
                "preAuth() not supported after joining a meeting"
              );
            if ((this.needsLoad() && (yield this.load(a)), !a.url))
              throw new Error(
                "preAuth() requires at least a url to be provided"
              );
            var o = Y(a.url),
              s = Y(this.properties.url || this.properties.baseUrl);
            if (o !== s)
              throw new Error(
                "url in preAuth() has a different bundle url than the one loaded ("
                  .concat(s, " -> ")
                  .concat(o, ")")
              );
            return (
              this.validateProperties(a),
              (this.properties = C(C({}, this.properties), a)),
              new Promise(function (c, u) {
                i.sendMessageToCallMachine(
                  {
                    action: "daily-method-preauth",
                    properties: ce(i.properties),
                  },
                  function (d) {
                    return d.error
                      ? u(d.error)
                      : d.access
                      ? ((i._didPreAuth = !0), void c({ access: d.access }))
                      : u(new Error("unknown error in preAuth()"));
                  }
                );
              })
            );
          });
          return function () {
            return r.apply(this, arguments);
          };
        })(),
      },
      {
        key: "load",
        value: (function () {
          var r = v(function* (i) {
            var a = this;
            if (this.needsLoad()) {
              if (
                (i &&
                  (this.validateProperties(i),
                  (this.properties = C(C({}, this.properties), i))),
                !this._callObjectMode && !this.properties.url)
              )
                throw new Error(
                  "can't load iframe meeting because url property isn't set"
                );
              this.updateMeetingState(De);
              try {
                this.emit("loading", { action: "loading" });
              } catch (o) {
                console.log("could not emit 'loading'", o);
              }
              return this._callObjectMode
                ? new Promise(function (o, s) {
                    a._callObjectLoader.cancel(),
                      a._callObjectLoader.load(
                        a.properties.url || a.properties.baseUrl,
                        a._callFrameId,
                        a.properties.dailyConfig &&
                          a.properties.dailyConfig.avoidEval,
                        function (c) {
                          a.updateMeetingState("loaded"),
                            c && a.emit("loaded", { action: "loaded" }),
                            o();
                        },
                        function (c, u) {
                          a.emit("load-attempt-failed", {
                            action: "load-attempt-failed",
                            errorMsg: c,
                          }),
                            u ||
                              (a.updateMeetingState(W),
                              a.resetMeetingDependentVars(),
                              a.emit("error", { action: "error", errorMsg: c }),
                              s(c));
                        }
                      );
                  })
                : ((this._iframe.src = this.assembleMeetingUrl()),
                  new Promise(function (o, s) {
                    a._loadedCallback = function (c) {
                      if (a._meetingState !== W) {
                        for (var u in (a.updateMeetingState("loaded"),
                        (a.properties.cssFile || a.properties.cssText) &&
                          a.loadCss(a.properties),
                        a._inputEventsOn))
                          a.sendMessageToCallMachine({
                            action: "register-input-handler",
                            on: u,
                          });
                        o();
                      } else s(c);
                    };
                  }));
            }
          });
          return function (i) {
            return r.apply(this, arguments);
          };
        })(),
      },
      {
        key: "join",
        value: (function () {
          var r = v(function* () {
            var i = this,
              a =
                arguments.length > 0 && arguments[0] !== void 0
                  ? arguments[0]
                  : {},
              o = !1;
            if (this.needsLoad()) {
              this.updateIsPreparingToJoin(!0);
              try {
                yield this.load(a);
              } catch (u) {
                return this.updateIsPreparingToJoin(!1), Promise.reject(u);
              }
            } else {
              if (
                ((o = !(!this.properties.cssFile && !this.properties.cssText)),
                this._didPreAuth)
              ) {
                if (a.url && a.url !== this.properties.url)
                  return (
                    console.error(
                      "url in join() is different than the one used in preAuth()"
                    ),
                    this.updateIsPreparingToJoin(!1),
                    Promise.reject()
                  );
                if (a.token && a.token !== this.properties.token)
                  return (
                    console.error(
                      "token in join() is different than the one used in preAuth()"
                    ),
                    this.updateIsPreparingToJoin(!1),
                    Promise.reject()
                  );
              }
              if (a.url) {
                if (this._callObjectMode) {
                  var s = Y(a.url),
                    c = Y(this.properties.url || this.properties.baseUrl);
                  if (s !== c)
                    return (
                      console.error(
                        "url in join() has a different bundle url than the one loaded ("
                          .concat(c, " -> ")
                          .concat(s, ")")
                      ),
                      this.updateIsPreparingToJoin(!1),
                      Promise.reject()
                    );
                  this.properties.url = a.url;
                } else if (a.url && a.url !== this.properties.url)
                  return (
                    console.error(
                      "url in join() is different than the one used in load() ("
                        .concat(this.properties.url, " -> ")
                        .concat(a.url, ")")
                    ),
                    this.updateIsPreparingToJoin(!1),
                    Promise.reject()
                  );
              }
              this.validateProperties(a),
                (this.properties = C(C({}, this.properties), a));
            }
            if (
              (a.showLocalVideo !== void 0 &&
                (this._callObjectMode
                  ? console.error(
                      "showLocalVideo is not available in callObject mode"
                    )
                  : (this._showLocalVideo = !!a.showLocalVideo)),
              a.showParticipantsBar !== void 0 &&
                (this._callObjectMode
                  ? console.error(
                      "showParticipantsBar is not available in callObject mode"
                    )
                  : (this._showParticipantsBar = !!a.showParticipantsBar)),
              this._meetingState === T || this._meetingState === ae)
            )
              return (
                console.warn(
                  "already joined meeting, call leave() before joining again"
                ),
                void this.updateIsPreparingToJoin(!1)
              );
            this.updateMeetingState(ae, !1);
            try {
              this.emit("joining-meeting", { action: "joining-meeting" });
            } catch (u) {
              console.log("could not emit 'joining-meeting'", u);
            }
            return (
              this.sendMessageToCallMachine({
                action: "join-meeting",
                properties: ce(this.properties),
                preloadCache: ce(this._preloadCache),
              }),
              new Promise(function (u, d) {
                i._joinedCallback = function (h, f) {
                  if (i._meetingState !== W) {
                    if ((i.updateMeetingState(T), h))
                      for (var g in h)
                        i._callObjectMode &&
                          ($t(h[g]), Zt(h[g]), Xt(h[g], i._participants[g])),
                          (i._participants[g] = C({}, h[g])),
                          i.toggleParticipantAudioBasedOnNativeAudioFocus();
                    o && i.loadCss(i.properties), u(h);
                  } else d(f);
                };
              })
            );
          });
          return function () {
            return r.apply(this, arguments);
          };
        })(),
      },
      {
        key: "leave",
        value: (function () {
          var r = v(function* () {
            var i = this;
            return new Promise(function (a, o) {
              if (i._callObjectLoader && !i._callObjectLoader.loaded) {
                i._callObjectLoader.cancel(),
                  i.updateMeetingState(U),
                  i.resetMeetingDependentVars();
                try {
                  i.emit(U, { action: U });
                } catch (s) {
                  console.log("could not emit 'left-meeting'", s);
                }
                a();
              } else
                i._meetingState === U || i._meetingState === W
                  ? a()
                  : ((i._leftCallback = function () {
                      i._meetingState !== W && i.updateMeetingState(U),
                        i.resetMeetingDependentVars(),
                        a();
                    }),
                    i.sendMessageToCallMachine({ action: "leave-meeting" }));
            });
          });
          return function () {
            return r.apply(this, arguments);
          };
        })(),
      },
      {
        key: "startScreenShare",
        value: function () {
          var r =
            arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          m(),
            r.mediaStream &&
              ((this._preloadCache.screenMediaStream = r.mediaStream),
              (r.mediaStream = ke)),
            this.sendMessageToCallMachine({
              action: "local-screen-start",
              captureOptions: r,
            });
        },
      },
      {
        key: "stopScreenShare",
        value: function () {
          m(), this.sendMessageToCallMachine({ action: "local-screen-stop" });
        },
      },
      {
        key: "startRecording",
        value: function () {
          var r =
            arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          this.sendMessageToCallMachine(
            C({ action: "local-recording-start" }, r)
          );
        },
      },
      {
        key: "updateRecording",
        value: function (r) {
          var i = r.layout,
            a = i === void 0 ? { preset: "default" } : i;
          this.sendMessageToCallMachine({
            action: "daily-method-update-recording",
            layout: a,
          });
        },
      },
      {
        key: "stopRecording",
        value: function () {
          this.sendMessageToCallMachine({ action: "local-recording-stop" });
        },
      },
      {
        key: "startLiveStreaming",
        value: function () {
          var r =
            arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          this.sendMessageToCallMachine(
            C({ action: "daily-method-start-live-streaming" }, r)
          );
        },
      },
      {
        key: "updateLiveStreaming",
        value: function (r) {
          var i = r.layout,
            a = i === void 0 ? { preset: "default" } : i;
          this.sendMessageToCallMachine({
            action: "daily-method-update-live-streaming",
            layout: a,
          });
        },
      },
      {
        key: "addLiveStreamingEndpoints",
        value: function (r) {
          var i = r.endpoints;
          this.sendMessageToCallMachine({
            action: "daily-method-update-live-streaming-endpoints",
            endpointsOp: Mn,
            endpoints: i,
          });
        },
      },
      {
        key: "removeLiveStreamingEndpoints",
        value: function (r) {
          var i = r.endpoints;
          this.sendMessageToCallMachine({
            action: "daily-method-update-live-streaming-endpoints",
            endpointsOp: Sn,
            endpoints: i,
          });
        },
      },
      {
        key: "stopLiveStreaming",
        value: function () {
          this.sendMessageToCallMachine({
            action: "daily-method-stop-live-streaming",
          });
        },
      },
      {
        key: "startRemoteMediaPlayer",
        value: (function () {
          var r = v(function* (i) {
            var a = this,
              o = i.url,
              s = i.settings,
              c = s === void 0 ? { state: He.PLAY } : s;
            try {
              (function (u) {
                if (typeof u != "string")
                  throw new Error('url parameter must be "string" type');
              })(o),
                ir(c),
                (function (u) {
                  for (var d in u)
                    if (!rr.includes(d))
                      throw new Error(
                        "Invalid key "
                          .concat(d, ", valid keys are: ")
                          .concat(rr)
                      );
                  if (u.simulcastEncodings) {
                    if (!(u.simulcastEncodings instanceof Array))
                      throw new Error('simulcastEncodings must be "Array"');
                    if (!ar(u.simulcastEncodings.length, 0, Oo))
                      throw new Error(
                        '"simulcastEncodings" not in range. valid range 1 to 3 layers'
                      );
                    u.simulcastEncodings.every(function (h) {
                      for (var f in h) {
                        if (!Je.hasOwnProperty(f))
                          throw new Error(
                            "Invalid key ".concat(f, ", valid keys are:") +
                              Object.keys(Je)
                          );
                        if (typeof h[f] != "number")
                          throw new Error(
                            "simulcastEncodings[].".concat(
                              f,
                              ' must be "number"'
                            )
                          );
                        var g = Je[f],
                          w = g.min,
                          S = g.max;
                        if (!ar(h[f], w, S))
                          throw new Error(
                            "simulcastEncodings[]."
                              .concat(
                                f,
                                " value not in range. valid range:        "
                              )
                              .concat(w, " to ")
                              .concat(S)
                          );
                      }
                      if (!h.hasOwnProperty("maxBitrate"))
                        throw new Error(
                          "simulcastEncodings[].maxBitrate is not specified"
                        );
                    });
                  }
                })(c);
            } catch (u) {
              throw (
                (console.error("invalid argument Error: ".concat(u)),
                console.error(`startRemoteMediaPlayer arguments must be of the form: 
  { url: "playback url", 
  settings?: 
  {state: "play"|"pause", simulcastEncodings?: [{}] } }`),
                u)
              );
            }
            return new Promise(
              (function () {
                var u = v(function* (d, h) {
                  a.sendMessageToCallMachine(
                    {
                      action: "daily-method-start-remote-media-player",
                      url: o,
                      settings: c,
                    },
                    function (f) {
                      f.error
                        ? h({ error: f.error, errorMsg: f.errorMsg })
                        : d({
                            session_id: f.session_id,
                            remoteMediaPlayerState: {
                              state: f.state,
                              settings: f.settings,
                            },
                          });
                    }
                  );
                });
                return function (d, h) {
                  return u.apply(this, arguments);
                };
              })()
            );
          });
          return function (i) {
            return r.apply(this, arguments);
          };
        })(),
      },
      {
        key: "stopRemoteMediaPlayer",
        value: (function () {
          var r = v(function* (i) {
            var a = this;
            if (typeof i != "string")
              throw new Error(" remotePlayerID must be of type string");
            return new Promise(
              (function () {
                var o = v(function* (s, c) {
                  a.sendMessageToCallMachine(
                    {
                      action: "daily-method-stop-remote-media-player",
                      session_id: i,
                    },
                    function (u) {
                      u.error
                        ? c({ error: u.error, errorMsg: u.errorMsg })
                        : s();
                    }
                  );
                });
                return function (s, c) {
                  return o.apply(this, arguments);
                };
              })()
            );
          });
          return function (i) {
            return r.apply(this, arguments);
          };
        })(),
      },
      {
        key: "updateRemoteMediaPlayer",
        value: (function () {
          var r = v(function* (i) {
            var a = this,
              o = i.session_id,
              s = i.settings;
            try {
              ir(s);
            } catch (c) {
              throw (
                (console.error("invalid argument Error: ".concat(c)),
                console.error(`updateRemoteMediaPlayer arguments must be of the form: 
  session_id: "participant session", 
  { settings?: {state: "play"|"pause"} }`),
                c)
              );
            }
            return new Promise(
              (function () {
                var c = v(function* (u, d) {
                  a.sendMessageToCallMachine(
                    {
                      action: "daily-method-update-remote-media-player",
                      session_id: o,
                      settings: s,
                    },
                    function (h) {
                      h.error
                        ? d({ error: h.error, errorMsg: h.errorMsg })
                        : u({
                            session_id: h.session_id,
                            remoteMediaPlayerState: {
                              state: h.state,
                              settings: h.settings,
                            },
                          });
                    }
                  );
                });
                return function (u, d) {
                  return c.apply(this, arguments);
                };
              })()
            );
          });
          return function (i) {
            return r.apply(this, arguments);
          };
        })(),
      },
      {
        key: "startTranscription",
        value: function (r) {
          this.sendMessageToCallMachine(
            C({ action: "daily-method-start-transcription" }, r)
          );
        },
      },
      {
        key: "stopTranscription",
        value: function () {
          this.sendMessageToCallMachine({
            action: "daily-method-stop-transcription",
          });
        },
      },
      {
        key: "getNetworkStats",
        value: function () {
          var r = this;
          return this._meetingState !== T
            ? { stats: { latest: {} } }
            : new Promise(function (i, a) {
                r.sendMessageToCallMachine(
                  { action: "get-calc-stats" },
                  function (o) {
                    i(C({ stats: o.stats }, r._network));
                  }
                );
              });
        },
      },
      {
        key: "getActiveSpeaker",
        value: function () {
          return m(), this._activeSpeaker;
        },
      },
      {
        key: "setActiveSpeakerMode",
        value: function (r) {
          return (
            m(),
            this.sendMessageToCallMachine({
              action: "set-active-speaker-mode",
              enabled: r,
            }),
            this
          );
        },
      },
      {
        key: "activeSpeakerMode",
        value: function () {
          return m(), this._activeSpeakerMode;
        },
      },
      {
        key: "subscribeToTracksAutomatically",
        value: function () {
          return this._preloadCache.subscribeToTracksAutomatically;
        },
      },
      {
        key: "setSubscribeToTracksAutomatically",
        value: function (r) {
          if (this._meetingState !== T)
            throw new Error(
              "setSubscribeToTracksAutomatically() is only allowed when joined"
            );
          return (
            (this._preloadCache.subscribeToTracksAutomatically = r),
            this.sendMessageToCallMachine({
              action: "daily-method-subscribe-to-tracks-automatically",
              enabled: r,
            }),
            this
          );
        },
      },
      {
        key: "enumerateDevices",
        value: (function () {
          var r = v(function* () {
            var i = this;
            return this._callObjectMode
              ? {
                  devices:
                    (yield navigator.mediaDevices.enumerateDevices()).map(
                      function (a) {
                        return JSON.parse(JSON.stringify(a));
                      }
                    ),
                }
              : new Promise(function (a, o) {
                  i.sendMessageToCallMachine(
                    { action: "enumerate-devices" },
                    function (s) {
                      a({ devices: s.devices });
                    }
                  );
                });
          });
          return function () {
            return r.apply(this, arguments);
          };
        })(),
      },
      {
        key: "sendAppMessage",
        value: function (r) {
          var i =
            arguments.length > 1 && arguments[1] !== void 0
              ? arguments[1]
              : "*";
          if (JSON.stringify(r).length > 4096)
            throw new Error("Message data too large. Max size is 4096");
          return (
            this.sendMessageToCallMachine({
              action: "app-msg",
              data: r,
              to: i,
            }),
            this
          );
        },
      },
      {
        key: "addFakeParticipant",
        value: function (r) {
          return (
            m(),
            this.sendMessageToCallMachine(
              C({ action: "add-fake-participant" }, r)
            ),
            this
          );
        },
      },
      {
        key: "setShowNamesMode",
        value: function (r) {
          return (
            m(),
            r && r !== "always" && r !== "never"
              ? (console.error(
                  'setShowNamesMode argument should be "always", "never", or false'
                ),
                this)
              : (this.sendMessageToCallMachine({
                  action: "set-show-names",
                  mode: r,
                }),
                this)
          );
        },
      },
      {
        key: "setShowLocalVideo",
        value: function () {
          var r =
            !(arguments.length > 0 && arguments[0] !== void 0) || arguments[0];
          return (
            m(),
            typeof r != "boolean"
              ? (console.error(
                  "setShowLocalVideo only accepts a boolean value"
                ),
                this)
              : this._callObjectMode
              ? (console.error(
                  "setShowLocalVideo is not available in callObject mode"
                ),
                this)
              : this._meetingState !== T
              ? (console.error(
                  "the meeting must be joined before calling setShowLocalVideo"
                ),
                this)
              : (this.sendMessageToCallMachine({
                  action: "set-show-local-video",
                  show: r,
                }),
                (this._showLocalVideo = r),
                this)
          );
        },
      },
      {
        key: "showLocalVideo",
        value: function () {
          return (
            m(),
            this._callObjectMode
              ? (console.error(
                  "showLocalVideo is not available in callObject mode"
                ),
                this)
              : this._showLocalVideo
          );
        },
      },
      {
        key: "setShowParticipantsBar",
        value: function () {
          var r =
            !(arguments.length > 0 && arguments[0] !== void 0) || arguments[0];
          return (
            m(),
            typeof r != "boolean"
              ? (console.error(
                  "setShowParticipantsBar only accepts a boolean value"
                ),
                this)
              : this._callObjectMode
              ? (console.error(
                  "setShowParticipantsBar is not available in callObject mode"
                ),
                this)
              : this._meetingState !== T
              ? (console.error(
                  "the meeting must be joined before calling setShowParticipantsBar"
                ),
                this)
              : (this.sendMessageToCallMachine({
                  action: "set-show-participants-bar",
                  show: r,
                }),
                (this._showParticipantsBar = r),
                this)
          );
        },
      },
      {
        key: "showParticipantsBar",
        value: function () {
          return (
            m(),
            this._callObjectMode
              ? (console.error(
                  "showParticipantsBar is not available in callObject mode"
                ),
                this)
              : this._showParticipantsBar
          );
        },
      },
      {
        key: "customTrayButtons",
        value: function () {
          return (
            m(),
            this._callObjectMode
              ? (console.error(
                  "customTrayButtons is not available in callObject mode"
                ),
                this)
              : this._customTrayButtons
          );
        },
      },
      {
        key: "updateCustomTrayButtons",
        value: function (r) {
          return (
            m(),
            this._callObjectMode
              ? (console.error(
                  "updateCustomTrayButtons is not available in callObject mode"
                ),
                this)
              : this._meetingState !== T
              ? (console.error(
                  "the meeting must be joined before calling updateCustomTrayButtons"
                ),
                this)
              : Hr(r)
              ? (this.sendMessageToCallMachine({
                  action: "update-custom-tray-buttons",
                  btns: r,
                }),
                (this._customTrayButtons = r),
                this)
              : (console.error(
                  "updateCustomTrayButtons only accepts a dictionary of the type ".concat(
                    JSON.stringify(Oe)
                  )
                ),
                this)
          );
        },
      },
      {
        key: "theme",
        value: function () {
          return this._callObjectMode
            ? (console.error("theme is not available in callObject mode"), this)
            : this.properties.theme;
        },
      },
      {
        key: "setTheme",
        value: function (r) {
          var i = this;
          return new Promise(function (a, o) {
            if (i._callObjectMode)
              o("setTheme is not available in callObject mode");
            else
              try {
                i.validateProperties({ theme: r }),
                  (i.properties.theme = C({}, r)),
                  i.sendMessageToCallMachine({
                    action: "set-theme",
                    theme: i.properties.theme,
                  });
                try {
                  i.emit("theme-updated", {
                    action: "theme-updated",
                    theme: i.properties.theme,
                  });
                } catch (s) {
                  console.log("could not emit 'theme-updated'", s);
                }
                a(i.properties.theme);
              } catch (s) {
                o(s);
              }
          });
        },
      },
      {
        key: "detectAllFaces",
        value: function () {
          var r = this;
          return (
            m(),
            new Promise(function (i, a) {
              r.sendMessageToCallMachine(
                { action: "detect-all-faces" },
                function (o) {
                  delete o.action, delete o.callbackStamp, i(o);
                }
              );
            })
          );
        },
      },
      {
        key: "requestFullscreen",
        value: (function () {
          var r = v(function* () {
            if ((m(), this._iframe && !document.fullscreenElement && At()))
              try {
                (yield this._iframe.requestFullscreen)
                  ? this._iframe.requestFullscreen()
                  : this._iframe.webkitRequestFullscreen();
              } catch (i) {
                console.log("could not make video call fullscreen", i);
              }
          });
          return function () {
            return r.apply(this, arguments);
          };
        })(),
      },
      {
        key: "exitFullscreen",
        value: function () {
          m(),
            document.fullscreenElement
              ? document.exitFullscreen()
              : document.webkitFullscreenElement &&
                document.webkitExitFullscreen();
        },
      },
      {
        key: "room",
        value: (function () {
          var r = v(function* () {
            var i = this,
              a = (
                arguments.length > 0 && arguments[0] !== void 0
                  ? arguments[0]
                  : {}
              ).includeRoomConfigDefaults,
              o = a === void 0 || a;
            return this._accessState.access === Ne || this.needsLoad()
              ? this.properties.url
                ? { roomUrlPendingJoin: this.properties.url }
                : null
              : new Promise(function (s, c) {
                  i.sendMessageToCallMachine(
                    { action: "lib-room-info", includeRoomConfigDefaults: o },
                    function (u) {
                      delete u.action, delete u.callbackStamp, s(u);
                    }
                  );
                });
          });
          return function () {
            return r.apply(this, arguments);
          };
        })(),
      },
      {
        key: "geo",
        value: (function () {
          var r = v(function* () {
            return new Promise(
              (function () {
                var i = v(function* (a, o) {
                  try {
                    var s = yield fetch("https://gs.daily.co/_ks_/x-swsl/:");
                    a({ current: (yield s.json()).geo });
                  } catch (c) {
                    console.error("geo lookup failed", c), a({ current: "" });
                  }
                });
                return function (a, o) {
                  return i.apply(this, arguments);
                };
              })()
            );
          });
          return function () {
            return r.apply(this, arguments);
          };
        })(),
      },
      {
        key: "setNetworkTopology",
        value: (function () {
          var r = v(function* (i) {
            var a = this;
            return (
              m(),
              new Promise(
                (function () {
                  var o = v(function* (s, c) {
                    a.sendMessageToCallMachine(
                      { action: "set-network-topology", opts: i },
                      function (u) {
                        u.error
                          ? c({ error: u.error })
                          : s({ workerId: u.workerId });
                      }
                    );
                  });
                  return function (s, c) {
                    return o.apply(this, arguments);
                  };
                })()
              )
            );
          });
          return function (i) {
            return r.apply(this, arguments);
          };
        })(),
      },
      {
        key: "getNetworkTopology",
        value: (function () {
          var r = v(function* () {
            var i = this;
            return new Promise(
              (function () {
                var a = v(function* (o, s) {
                  i.sendMessageToCallMachine(
                    { action: "get-network-topology" },
                    function (c) {
                      c.error
                        ? s({ error: c.error })
                        : o({ topology: c.topology });
                    }
                  );
                });
                return function (o, s) {
                  return a.apply(this, arguments);
                };
              })()
            );
          });
          return function () {
            return r.apply(this, arguments);
          };
        })(),
      },
      {
        key: "setPlayNewParticipantSound",
        value: function (r) {
          if ((m(), typeof r != "number" && r !== !0 && r !== !1))
            throw new Error(
              "argument to setShouldPlayNewParticipantSound should be true, false, or a number, but is ".concat(
                r
              )
            );
          this.sendMessageToCallMachine({
            action: "daily-method-set-play-ding",
            arg: r,
          });
        },
      },
      {
        key: "on",
        value: function (r, i) {
          return (
            (this._inputEventsOn[r] = {}),
            this.sendMessageToCallMachine({
              action: "register-input-handler",
              on: r,
            }),
            R.exports.prototype.on.call(this, r, i)
          );
        },
      },
      {
        key: "once",
        value: function (r, i) {
          return (
            (this._inputEventsOn[r] = {}),
            this.sendMessageToCallMachine({
              action: "register-input-handler",
              on: r,
            }),
            R.exports.prototype.once.call(this, r, i)
          );
        },
      },
      {
        key: "off",
        value: function (r, i) {
          return (
            delete this._inputEventsOn[r],
            this.sendMessageToCallMachine({
              action: "register-input-handler",
              off: r,
            }),
            R.exports.prototype.off.call(this, r, i)
          );
        },
      },
      {
        key: "validateProperties",
        value: function (r) {
          for (var i in r) {
            if (!z[i])
              throw new Error("unrecognized property '".concat(i, "'"));
            if (z[i].validate && !z[i].validate(r[i], this))
              throw new Error("property '".concat(i, "': ").concat(z[i].help));
          }
        },
      },
      {
        key: "assembleMeetingUrl",
        value: function () {
          var r = C(
              C({}, this.properties),
              {},
              {
                emb: this._callFrameId,
                embHref: encodeURIComponent(window.location.href),
              }
            ),
            i = r.url.match(/\?/) ? "&" : "?";
          return (
            r.url +
            i +
            Object.keys(z)
              .filter(function (a) {
                return z[a].queryString && r[a] !== void 0;
              })
              .map(function (a) {
                return "".concat(z[a].queryString, "=").concat(r[a]);
              })
              .join("&")
          );
        },
      },
      {
        key: "needsLoad",
        value: function () {
          return [Ot, De, U, W].includes(this._meetingState);
        },
      },
      {
        key: "sendMessageToCallMachine",
        value: function (r, i) {
          this._messageChannel.sendMessageToCallMachine(
            r,
            i,
            this._iframe,
            this._callFrameId
          );
        },
      },
      {
        key: "forwardPackagedMessageToCallMachine",
        value: function (r) {
          this._messageChannel.forwardPackagedMessageToCallMachine(
            r,
            this._iframe,
            this._callFrameId
          );
        },
      },
      {
        key: "addListenerForPackagedMessagesFromCallMachine",
        value: function (r) {
          return this._messageChannel.addListenerForPackagedMessagesFromCallMachine(
            r,
            this._callFrameId
          );
        },
      },
      {
        key: "removeListenerForPackagedMessagesFromCallMachine",
        value: function (r) {
          this._messageChannel.removeListenerForPackagedMessagesFromCallMachine(
            r
          );
        },
      },
      {
        key: "handleMessageFromCallMachine",
        value: function (r) {
          switch (r.action) {
            case "iframe-ready-for-launch-config":
              this.sendMessageToCallMachine(
                C({ action: "iframe-launch-config" }, this.properties)
              );
              break;
            case "loaded":
              this._loadedCallback &&
                (this._loadedCallback(), (this._loadedCallback = null));
              try {
                this.emit(r.action, r);
              } catch (p) {
                console.log("could not emit", r, p);
              }
              break;
            case "joined-meeting":
              this._joinedCallback &&
                (this._joinedCallback(r.participants),
                (this._joinedCallback = null));
              try {
                this.emit(r.action, r);
              } catch (p) {
                console.log("could not emit", r, p);
              }
              break;
            case "participant-joined":
            case "participant-updated":
              if (this._meetingState === U) return;
              if (r.participant && r.participant.session_id) {
                var i = r.participant.local
                  ? "local"
                  : r.participant.session_id;
                this._callObjectMode &&
                  ($t(r.participant),
                  Zt(r.participant),
                  Xt(r.participant, this._participants[i]));
                try {
                  this.maybeEventTrackStopped(
                    this._participants[i],
                    r.participant,
                    "audioTrack"
                  ),
                    this.maybeEventTrackStopped(
                      this._participants[i],
                      r.participant,
                      "videoTrack"
                    ),
                    this.maybeEventTrackStopped(
                      this._participants[i],
                      r.participant,
                      "screenVideoTrack"
                    ),
                    this.maybeEventTrackStopped(
                      this._participants[i],
                      r.participant,
                      "screenAudioTrack"
                    ),
                    this.maybeEventTrackStarted(
                      this._participants[i],
                      r.participant,
                      "audioTrack"
                    ),
                    this.maybeEventTrackStarted(
                      this._participants[i],
                      r.participant,
                      "videoTrack"
                    ),
                    this.maybeEventTrackStarted(
                      this._participants[i],
                      r.participant,
                      "screenVideoTrack"
                    ),
                    this.maybeEventTrackStarted(
                      this._participants[i],
                      r.participant,
                      "screenAudioTrack"
                    ),
                    this.maybeEventTrackStoppedForCustomTracks(
                      this._participants[i],
                      r.participant
                    ),
                    this.maybeEventTrackStartedForCustomTracks(
                      this._participants[i],
                      r.participant
                    ),
                    this.maybeEventRecordingStopped(
                      this._participants[i],
                      r.participant
                    ),
                    this.maybeEventRecordingStarted(
                      this._participants[i],
                      r.participant
                    );
                } catch (p) {
                  console.error("track events error", p);
                }
                if (
                  !this.compareEqualForParticipantUpdateEvent(
                    r.participant,
                    this._participants[i]
                  )
                ) {
                  (this._participants[i] = C({}, r.participant)),
                    this.toggleParticipantAudioBasedOnNativeAudioFocus();
                  try {
                    this.emit(r.action, r);
                  } catch (p) {
                    console.log("could not emit", r, p);
                  }
                }
              }
              break;
            case "participant-left":
              if (r.participant && r.participant.session_id) {
                var a = this._participants[r.participant.session_id];
                a &&
                  (this.maybeEventTrackStopped(a, null, "audioTrack"),
                  this.maybeEventTrackStopped(a, null, "videoTrack"),
                  this.maybeEventTrackStopped(a, null, "screenVideoTrack"),
                  this.maybeEventTrackStopped(a, null, "screenAudioTrack"),
                  this.maybeEventTrackStoppedForCustomTracks(a, null)),
                  delete this._participants[r.participant.session_id];
                try {
                  this.emit(r.action, r);
                } catch (p) {
                  console.log("could not emit", r, p);
                }
              }
              break;
            case "participant-counts-updated":
              if (!ie(this._participantCounts, r.participantCounts)) {
                this._participantCounts = r.participantCounts;
                try {
                  this.emit(r.action, r);
                } catch (p) {
                  console.log("could not emit", r, p);
                }
              }
              break;
            case "access-state-updated":
              var o = { access: r.access };
              if (
                (r.awaitingAccess && (o.awaitingAccess = r.awaitingAccess),
                !ie(this._accessState, o))
              ) {
                this._accessState = o;
                try {
                  this.emit(r.action, r);
                } catch (p) {
                  console.log("could not emit", r, p);
                }
              }
              break;
            case "meeting-session-updated":
              if (r.meetingSession)
                try {
                  delete r.callFrameId, this.emit(r.action, r);
                } catch (p) {
                  console.log("could not emit", r, p);
                }
              break;
            case "error":
              this._iframe && !r.preserveIframe && (this._iframe.src = ""),
                this.updateMeetingState(W),
                this.resetMeetingDependentVars(),
                this._loadedCallback &&
                  (this._loadedCallback(r.errorMsg),
                  (this._loadedCallback = null)),
                this._joinedCallback &&
                  (this._joinedCallback(null, r.errorMsg),
                  (this._joinedCallback = null));
              try {
                r.preserveIframe;
                var s = on(r, ["preserveIframe"]);
                this.emit(r.action, s);
              } catch (p) {
                console.log("could not emit", r, p);
              }
              break;
            case "left-meeting":
              this._leftCallback &&
                (this._leftCallback(), (this._leftCallback = null));
              try {
                this.emit(r.action, r);
              } catch (p) {
                console.log("could not emit", r, p);
              }
              break;
            case "input-event":
              var c = this._participants[r.session_id];
              c ||
                (c =
                  r.session_id === this._participants.local.session_id
                    ? this._participants.local
                    : {});
              try {
                this.emit(r.event.type, {
                  action: r.event.type,
                  event: r.event,
                  participant: C({}, c),
                });
              } catch (p) {
                console.log("could not emit", r, p);
              }
              break;
            case "network-quality-change":
              var u = r.threshold,
                d = r.quality;
              if (
                u !== this._network.threshold ||
                d !== this._network.quality
              ) {
                (this._network.quality = d), (this._network.threshold = u);
                try {
                  this.emit(r.action, r);
                } catch (p) {
                  console.log("could not emit", r, p);
                }
              }
              break;
            case "active-speaker-change":
              var h = r.activeSpeaker;
              if (this._activeSpeaker.peerId !== h.peerId) {
                this._activeSpeaker.peerId = h.peerId;
                try {
                  this.emit(r.action, {
                    action: r.action,
                    activeSpeaker: this._activeSpeaker,
                  });
                } catch (p) {
                  console.log("could not emit", r, p);
                }
              }
              break;
            case "show-local-video-changed":
              if (this._callObjectMode) return;
              var f = r.show;
              this._showLocalVideo = f;
              try {
                this.emit(r.action, { action: r.action, show: f });
              } catch (p) {
                console.log("could not emit", r, p);
              }
              break;
            case "active-speaker-mode-change":
              var g = r.enabled;
              if (this._activeSpeakerMode !== g) {
                this._activeSpeakerMode = g;
                try {
                  this.emit(r.action, {
                    action: r.action,
                    enabled: this._activeSpeakerMode,
                  });
                } catch (p) {
                  console.log("could not emit", r, p);
                }
              }
              break;
            case "waiting-participant-added":
            case "waiting-participant-updated":
            case "waiting-participant-removed":
              this._waitingParticipants = r.allWaitingParticipants;
              try {
                this.emit(r.action, {
                  action: r.action,
                  participant: r.participant,
                });
              } catch (p) {
                console.log("could not emit", r, p);
              }
              break;
            case "receive-settings-updated":
              if (!ie(this._receiveSettings, r.receiveSettings)) {
                this._receiveSettings = r.receiveSettings;
                try {
                  this.emit(r.action, {
                    action: r.action,
                    receiveSettings: r.receiveSettings,
                  });
                } catch (p) {
                  console.log("could not emit", r, p);
                }
              }
              break;
            case "input-settings-updated":
              if (!ie(this._inputSettings, r.inputSettings)) {
                this._inputSettings = r.inputSettings;
                try {
                  this.emit(r.action, {
                    action: r.action,
                    inputSettings: r.inputSettings,
                  });
                } catch (p) {
                  console.log("could not emit", r, p);
                }
              }
              break;
            case "remote-media-player-started":
              var w = r.session_id;
              (this._rmpPlayerState[w] = r.playerState),
                this.emitDailyJSEvent(r);
              break;
            case "remote-media-player-stopped":
              delete this._rmpPlayerState[r.session_id],
                this.emitDailyJSEvent(r);
              break;
            case "remote-media-player-updated":
              var S = r.session_id,
                j = this._rmpPlayerState[S];
              (j &&
                this.compareEqualForRMPUpdateEvent(
                  j,
                  r.remoteMediaPlayerState
                )) ||
                ((this._rmpPlayerState[S] = r.remoteMediaPlayerState),
                this.emitDailyJSEvent(r));
              break;
            case "custom-button-click":
              this.emitDailyJSEvent(r);
              break;
            case "recording-started":
            case "recording-stopped":
            case "recording-stats":
            case "recording-error":
            case "recording-upload-completed":
            case "transcription-started":
            case "transcription-stopped":
            case "transcription-error":
            case "started-camera":
            case "camera-error":
            case "app-message":
            case "local-screen-share-started":
            case "local-screen-share-stopped":
            case "network-connection":
            case "recording-data":
            case "live-streaming-started":
            case "live-streaming-stopped":
            case "live-streaming-error":
            case "nonfatal-error":
            case "lang-updated":
              try {
                this.emit(r.action, r);
              } catch (p) {
                console.log("could not emit", r, p);
              }
              break;
            case "request-fullscreen":
              this.requestFullscreen();
              break;
            case "request-exit-fullscreen":
              this.exitFullscreen();
          }
        },
      },
      {
        key: "maybeEventRecordingStopped",
        value: function (r, i) {
          var a = "record";
          if (r && !i.local && i[a] === !1 && r[a] !== i[a])
            try {
              this.emit("recording-stopped", { action: "recording-stopped" });
            } catch (o) {
              console.log("could not emit", o);
            }
        },
      },
      {
        key: "maybeEventRecordingStarted",
        value: function (r, i) {
          var a = "record";
          if (r && !i.local && i[a] === !0 && r[a] !== i[a])
            try {
              this.emit("recording-started", { action: "recording-started" });
            } catch (o) {
              console.log("could not emit", o);
            }
        },
      },
      {
        key: "maybeEventTrackStopped",
        value: function (r, i, a) {
          if (
            r &&
            ((r[a] && r[a].readyState === "ended") ||
              (r[a] && (!i || !i[a])) ||
              (r[a] && r[a].id !== i[a].id))
          )
            try {
              this.emit("track-stopped", {
                action: "track-stopped",
                track: r[a],
                participant: i,
              });
            } catch (o) {
              console.log("could not emit", o);
            }
        },
      },
      {
        key: "maybeEventCustomTrackStopped",
        value: function (r, i, a, o) {
          if (
            r &&
            (!o ||
              !o.remoteMediaPlayerState ||
              (o.remoteMediaPlayerState.state != wn &&
                o.remoteMediaPlayerState.state != kn)) &&
            ((r && r.readyState === "ended") ||
              (r && !i) ||
              (r && r.id !== i.id))
          )
            try {
              this.emit("track-stopped", {
                action: "track-stopped",
                track: r,
                participant: a,
              });
            } catch (s) {
              console.log("maybeEventCustomTrackStopped: could not emit", s);
            }
        },
      },
      {
        key: "maybeEventCustomTrackStarted",
        value: function (r, i, a) {
          if (
            (i && !r) ||
            (i && r.readyState === "ended") ||
            (i && i.id !== r.id)
          )
            try {
              this.emit("track-started", {
                action: "track-started",
                track: i,
                participant: a,
              });
            } catch (o) {
              console.log("maybeEventCustomTrackStarted: could not emit", o);
            }
        },
      },
      {
        key: "maybeEventTrackStarted",
        value: function (r, i, a) {
          if (
            (i[a] && (!r || !r[a])) ||
            (i[a] && r[a].readyState === "ended") ||
            (i[a] && i[a].id !== r[a].id)
          )
            try {
              this.emit("track-started", {
                action: "track-started",
                track: i[a],
                participant: i,
              });
            } catch (o) {
              console.log("could not emit", o);
            }
        },
      },
      {
        key: "maybeEventTrackStoppedForCustomTracks",
        value: function (r, i) {
          if (r)
            for (var a in r.tracks)
              tt(a) ||
                this.maybeEventCustomTrackStopped(
                  r.tracks[a].track,
                  i && i.tracks[a] ? i.tracks[a].track : null,
                  r,
                  i
                );
        },
      },
      {
        key: "maybeEventTrackStartedForCustomTracks",
        value: function (r, i) {
          if (i)
            for (var a in i.tracks)
              tt(a) ||
                this.maybeEventCustomTrackStarted(
                  r && r.tracks[a] ? r.tracks[a].track : null,
                  i.tracks[a].track,
                  i
                );
        },
      },
      {
        key: "compareEqualForRMPUpdateEvent",
        value: function (r, i) {
          return r.state === i.state;
        },
      },
      {
        key: "emitDailyJSEvent",
        value: function (r) {
          try {
            this.emit(r.action, r);
          } catch (i) {
            console.log("could not emit", r, i);
          }
        },
      },
      {
        key: "compareEqualForParticipantUpdateEvent",
        value: function (r, i) {
          return (
            !!ie(r, i) &&
            (!r.videoTrack ||
              !i.videoTrack ||
              (r.videoTrack.id === i.videoTrack.id &&
                r.videoTrack.muted === i.videoTrack.muted &&
                r.videoTrack.enabled === i.videoTrack.enabled)) &&
            (!r.audioTrack ||
              !i.audioTrack ||
              (r.audioTrack.id === i.audioTrack.id &&
                r.audioTrack.muted === i.audioTrack.muted &&
                r.audioTrack.enabled === i.audioTrack.enabled))
          );
        },
      },
      {
        key: "nativeUtils",
        value: function () {
          return k()
            ? typeof DailyNativeUtils > "u"
              ? (console.warn(
                  "in React Native, DailyNativeUtils is expected to be available"
                ),
                null)
              : DailyNativeUtils
            : null;
        },
      },
      {
        key: "updateIsPreparingToJoin",
        value: function (r) {
          this.updateMeetingState(this._meetingState, r);
        },
      },
      {
        key: "updateMeetingState",
        value: function (r) {
          var i =
            arguments.length > 1 && arguments[1] !== void 0
              ? arguments[1]
              : this._isPreparingToJoin;
          if (r !== this._meetingState || i !== this._isPreparingToJoin) {
            var a = this._meetingState,
              o = this._isPreparingToJoin;
            (this._meetingState = r), (this._isPreparingToJoin = i);
            var s = this.isMeetingPendingOrOngoing(a, o),
              c = this.isMeetingPendingOrOngoing(
                this._meetingState,
                this._isPreparingToJoin
              );
            s !== c &&
              (this.updateKeepDeviceAwake(c),
              this.updateDeviceAudioMode(c),
              this.updateShowAndroidOngoingMeetingNotification(c),
              this.updateNoOpRecordingEnsuringBackgroundContinuity(c));
          }
        },
      },
      {
        key: "resetMeetingDependentVars",
        value: function () {
          (this._participants = {}),
            (this._participantCounts = tr),
            (this._waitingParticipants = {}),
            (this._activeSpeaker = {}),
            (this._activeSpeakerMode = !1),
            (this._didPreAuth = !1),
            (this._accessState = { access: Ne }),
            (this._receiveSettings = {}),
            (this._inputSettings = {}),
            this._preloadCache;
        },
      },
      {
        key: "updateKeepDeviceAwake",
        value: function (r) {
          k() && this.nativeUtils().setKeepDeviceAwake(r, this._callFrameId);
        },
      },
      {
        key: "updateDeviceAudioMode",
        value: function (r) {
          if (k() && !this.disableReactNativeAutoDeviceManagement("audio")) {
            var i = r ? this._nativeInCallAudioMode : "idle";
            this.nativeUtils().setAudioMode(i);
          }
        },
      },
      {
        key: "updateShowAndroidOngoingMeetingNotification",
        value: function (r) {
          if (k() && this.nativeUtils().setShowOngoingMeetingNotification) {
            var i, a, o, s;
            if (
              this.properties.reactNativeConfig &&
              this.properties.reactNativeConfig.androidInCallNotification
            ) {
              var c =
                this.properties.reactNativeConfig.androidInCallNotification;
              (i = c.title),
                (a = c.subtitle),
                (o = c.iconName),
                (s = c.disableForCustomOverride);
            }
            s && (r = !1),
              this.nativeUtils().setShowOngoingMeetingNotification(
                r,
                i,
                a,
                o,
                this._callFrameId
              );
          }
        },
      },
      {
        key: "updateNoOpRecordingEnsuringBackgroundContinuity",
        value: function (r) {
          k() &&
            this.nativeUtils()
              .enableNoOpRecordingEnsuringBackgroundContinuity &&
            this.nativeUtils().enableNoOpRecordingEnsuringBackgroundContinuity(
              r
            );
        },
      },
      {
        key: "isMeetingPendingOrOngoing",
        value: function (r, i) {
          return [ae, T].includes(r) || i;
        },
      },
      {
        key: "toggleParticipantAudioBasedOnNativeAudioFocus",
        value: function () {
          if (k()) {
            var r = store.getState();
            for (var i in r.streams) {
              var a = r.streams[i];
              a &&
                a.pendingTrack &&
                a.pendingTrack.kind === "audio" &&
                (a.pendingTrack.enabled = this._hasNativeAudioFocus);
            }
          }
        },
      },
      {
        key: "disableReactNativeAutoDeviceManagement",
        value: function (r) {
          return (
            this.properties.reactNativeConfig &&
            this.properties.reactNativeConfig.disableAutoDeviceManagement &&
            this.properties.reactNativeConfig.disableAutoDeviceManagement[r]
          );
        },
      },
      {
        key: "absoluteUrl",
        value: function (r) {
          if (r !== void 0) {
            var i = document.createElement("a");
            return (i.href = r), i.href;
          }
        },
      },
      {
        key: "sayHello",
        value: function () {
          var r = "hello, world.";
          return console.log(r), r;
        },
      },
    ]),
    n
  );
})();
function Po(e, t) {
  var a;
  const { dailyConfig: n = {} } = t,
    r = Array.isArray(n.extensions) ? n.extensions : [];
  (a = t.dailyConfig) == null || delete a.extensions,
    console.log("extensions: ", r),
    r.forEach((o) => {
      console.log("beforeCreateFrame: ", o);
      const s = "extension" in o ? o.extension : o;
      "config" in o && s.configure && s.configure(o.config),
        s.beforeCreateFrame && ([e, t] = s.beforeCreateFrame(e, t));
    });
  const i = jo.createFrame(e, t);
  return (
    r.forEach((o) => {
      const s = "extension" in o ? o.extension : o;
      console.log("afterCreateFrame: ", s),
        s.afterCreateFrame && s.afterCreateFrame(i);
    }),
    i
  );
}
const Ao = {
  createFrame: Po,
};
export { Ao as default };
