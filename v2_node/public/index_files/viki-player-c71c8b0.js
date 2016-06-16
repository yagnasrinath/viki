! function t(e, n, o) {
    function r(s, a) {
        if (!n[s]) {
            if (!e[s]) {
                var l = "function" == typeof require && require;
                if (!a && l) return l(s, !0);
                if (i) return i(s, !0);
                var u = new Error("Cannot find module '" + s + "'");
                throw u.code = "MODULE_NOT_FOUND", u
            }
            var c = n[s] = {
                exports: {}
            };
            e[s][0].call(c.exports, function(t) {
                var n = e[s][1][t];
                return r(n ? n : t)
            }, c, c.exports, t, e, n, o)
        }
        return n[s].exports
    }
    for (var i = "function" == typeof require && require, s = 0; s < o.length; s++) r(o[s]);
    return r
}({
    1: [function(t, e, n) {
        "use strict";

        function o(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e["default"] = t, e
        }

        function r(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function i(t) {
            var e = p.context();
            return t.secondaryAppId && (e.secondary_app_id = t.secondaryAppId), document.referrer && (e.referrer = document.referrer), e
        }

        function s(t) {
            return function(e, n) {
                var o = t.player,
                    r = o.getVideo(),
                    s = o.getStreamQuality();
                return (0, u["default"])({
                    video_id: r.id,
                    stream_quality: s,
                    vs_id: t.vsId
                }, i(e, n))
            }
        }

        function a(t) {
            return function(e, n) {
                var o = t.player;
                return (0, u["default"])({}, p.base(e), p.video(t, o), i(e, n))
            }
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.videoPlayerEvent = i, n.eventWithID = s, n.eventWithAd = a;
        var l = t("lodash/assign"),
            u = r(l),
            c = t("./parameters"),
            p = o(c)
    }, {
        "./parameters": 3,
        "lodash/assign": 74
    }],
    2: [function(t, e, n) {
        "use strict";

        function o(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e["default"] = t, e
        }

        function r(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.Analytics = void 0;
        var s = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            a = t("lodash/assign"),
            l = r(a),
            u = t("./events"),
            c = o(u),
            p = t("./parameters"),
            f = o(p),
            d = t("../utils"),
            h = o(d),
            y = t("../logger"),
            v = r(y),
            g = t("../events"),
            m = o(g);
        n.Analytics = function() {
            function t(e, n, o, r) {
                var s = this;
                i(this, t), this.ctx = e, this.vikilitics = n, this.player = o, this.ctx.secondaryAppId = r, v["default"].log("binds all events"), this.adOrder = 0, this.viewDuration = 0, this.frequency = 60, n.addEvent("player_loaded", c.videoPlayerEvent), n.addEvent("video_load", c.eventWithID(this)), n.addEvent("video_play", c.eventWithID(this)), n.addEvent("video_view", c.eventWithID(this)), n.addEvent("subtitle_change", c.eventWithID(this)), [m.AD_REQUEST, m.AD_ERROR, m.AD_LOADED, m.AD_STARTED, m.AD_FIRST_QUARTILE, m.AD_MIDPOINT, m.AD_THIRD_QUARTILE, m.AD_COMPLETE, m.AD_CLICKED, m.AD_SKIPPED, m.AD_PAUSED, m.AD_TIMEOUT, m.AD_UNAVAILABLE, m.AD_BLANK_ERROR, m.AD_IMPRESSION].forEach(function(t) {
                    n.addEvent(t, c.eventWithAd(s))
                }), o.addListener(m.READY, function() {
                    s.sendPlayerLoaded()
                }), o.addListener(m.VIDEO_LOADED, function() {
                    s.sendVideoLoad()
                }), o.addListener(m.SUBTITLE_CHANGED, function(t) {
                    s.sendSubtitleChanged(t)
                }), o.addListener(m.PLAYING, function() {
                    0 === s.viewDuration && (v["default"].log("video start"), s.sendVideoStart()), s.viewDuration++, s.viewDuration % s.frequency === 0 && (v["default"].log("video view", s.viewDuration), s.sendVideoView())
                }), o.addListener(m.AD_REQUEST, function(t) {
                    s.sendAdRequest(t)
                }), o.addListener(m.AD_ERROR, function(t) {
                    s.sendAdError(t)
                }), o.addListener(m.AD_STARTED, function(t) {
                    s.sendAdStarted(t)
                }), [m.AD_FIRST_QUARTILE, m.AD_MIDPOINT, m.AD_THIRD_QUARTILE, m.AD_COMPLETE, m.AD_CLICKED, m.AD_SKIPPED, m.AD_PAUSED, m.AD_TIMEOUT, m.AD_UNAVAILABLE, m.AD_BLANK_ERROR, m.AD_IMPRESSION, m.AD_LOADED].forEach(function(t) {
                    o.addListener(t, s.sendAdEventWithLog.bind(s, t))
                })
            }
            return s(t, null, [{
                key: "create",
                value: function() {
                    return new(Function.prototype.bind.apply(t, [null].concat(Array.prototype.slice.call(arguments))))
                }
            }]), s(t, [{
                key: "sendPlayerLoaded",
                value: function() {
                    v["default"].log("player loaded"), this.vikilitics.sendEvent("player_loaded")
                }
            }, {
                key: "sendVideoLoad",
                value: function() {
                    v["default"].log("video loaded");
                    var t = this.player,
                        e = t.getVideo();
                    this.vsId = e.id + "-" + h.timestamp() + "-" + Math.round(1e4 * Math.random()), this.videoLoadTime = h.timestamp(), this.vikilitics.sendEvent("video_load", (0, l["default"])({}, f.base(this.ctx), f.video(this, this.player)))
                }
            }, {
                key: "sendVideoStart",
                value: function() {
                    this.t0 = h.timestamp(!0), this.vikilitics.sendEvent("video_play", (0, l["default"])({}, f.base(this.ctx), f.video(this, this.player), f.caption(this.player), {
                        video_load_duration_ms: h.timestamp() - this.videoLoadTime
                    }))
                }
            }, {
                key: "sendVideoView",
                value: function() {
                    var t = this.player,
                        e = t.player;
                    v["default"].log("videojs currentTime", e.currentTime()), this.vikilitics.sendEvent("video_view", (0, l["default"])({}, f.base(this.ctx), f.video(this, this.player), f.caption(this.player), {
                        completed_content_percent: Math.round(100 * e.bufferedPercent()),
                        frequency: this.frequency,
                        total_video_time: h.timestamp(!0) - this.t0,
                        video_position_percent: Math.round(e.currentTime() / e.duration() * 100),
                        video_watch_time: e.currentTime()
                    }))
                }
            }, {
                key: "sendAdRequest",
                value: function(t) {
                    v["default"].log("send vikilitics event: " + m.AD_REQUEST), this.adProvider = t, this.vikilitics.sendEvent(m.AD_REQUEST, {
                        ad_provider: t
                    })
                }
            }, {
                key: "sendAdError",
                value: function(t) {
                    v["default"].log("send vikilitics event: " + m.AD_REQUEST), this.vikilitics.sendEvent(m.AD_ERROR, {
                        error_code: t.getErrorCode()
                    })
                }
            }, {
                key: "sendAdStarted",
                value: function(t) {
                    var e = this.player,
                        n = e.player;
                    v["default"].log("send vikilitics event: " + m.AD_STARTED), this.vikilitics.sendEvent(m.AD_STARTED, (0, l["default"])({}, f.ad(this, this.player, t), {
                        completed_content_percent: Math.round(100 * n.bufferedPercent()),
                        total_video_time: h.timestamp(!0) - this.t0,
                        video_position_percent: Math.round(n.currentTime() / n.duration() * 100),
                        video_watch_time: n.currentTime()
                    })), this.adOrder++
                }
            }, {
                key: "sendSubtitleChanged",
                value: function(t) {
                    v["default"].log("send vikilitics event: " + m.SUBTITLE_CHANGED), this.vikilitics.sendEvent(m.SUBTITLE_CHANGED, {
                        from_lang: t.fromLang,
                        to_lang: t.toLang
                    })
                }
            }, {
                key: "sendAdEventWithLog",
                value: function(t, e) {
                    v["default"].log("send vikilitics event: " + t), this.vikilitics.sendEvent(t, (0, l["default"])({}, f.ad(this, this.player, e)))
                }
            }]), t
        }()
    }, {
        "../events": 44,
        "../logger": 45,
        "../utils": 53,
        "./events": 1,
        "./parameters": 3,
        "lodash/assign": 74
    }],
    3: [function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e, n) {
            var o = n.getAd(),
                r = o.getAdPodInfo(),
                i = r.getPodIndex(),
                s = "pre-roll",
                a = r.getPodIndex() + 1;
            i > 0 ? s = "mid-roll" : 0 > i && (s = "post-roll");
            var l = e.player;
            return 0 > i && (a = l.ima.getAdsManager().getCuePoints().length), {
                ad_id: o.getAdId(),
                ad_pod_ad_position: r.getAdPosition(),
                ad_pod_position: r.getPodIndex(),
                ad_pod_total_ads: r.getTotalAds(),
                ad_pod_type: s,
                ad_pod_view_order: a,
                ad_provider: "IMA",
                ad_view_order: t.adOrder
            }
        }

        function i(t) {
            var e = {
                uuid: t.uuid()
            };
            return t.session && t.session.user_id && (e.user_id = t.session.user_id), e
        }

        function s(t, e) {
            if (!t.vsId) return {};
            var n = e.player,
                o = n.currentSrc();
            return {
                stream_name: p["default"].parse(o).pathname,
                stream_quality: e.getStreamQuality() || "360p",
                video_id: e.options.video.id,
                vs_id: t.vsId
            }
        }

        function a(t) {
            var e = t.getCurrentSubtitle();
            return e ? {
                subtitle_completion_percent: e.percentage,
                subtitle_lang: e.srclang,
                subtitle_visible: !0
            } : {
                subtitle_visible: !1
            }
        }

        function l() {
            return {
                app_id: "100107a",
                app_ver: h.VERSION_NUMBER,
                site: window.location.href
            }
        }

        function u(t) {
            return (0, d["default"])({}, {
                as_id: t.session.id
            }, l(), i(t))
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.ad = r, n.user = i, n.video = s, n.caption = a, n.context = l, n.base = u;
        var c = t("url"),
            p = o(c),
            f = t("lodash/assign"),
            d = o(f),
            h = t("../player")
    }, {
        "../player": 46,
        "lodash/assign": 74,
        url: 95
    }],
    4: [function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            l = function d(t, e, n) {
                null === t && (t = Function.prototype);
                var o = Object.getOwnPropertyDescriptor(t, e);
                if (void 0 === o) {
                    var r = Object.getPrototypeOf(t);
                    return null === r ? void 0 : d(r, e, n)
                }
                if ("value" in o) return o.value;
                var i = o.get;
                if (void 0 !== i) return i.call(n)
            },
            u = t("video.js"),
            c = o(u),
            p = c["default"].getComponent("Component"),
            f = function(t) {
                function e(t, n, o) {
                    r(this, e);
                    var s = i(this, Object.getPrototypeOf(e).call(this, t, n, o));
                    return s.position = n.position, s
                }
                return s(e, t), a(e, [{
                    key: "createEl",
                    value: function() {
                        var t = l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "div", {
                            className: "ad-cue-point"
                        });
                        return t.style.left = this.position + "%", t
                    }
                }]), e
            }(p);
        p.registerComponent("AdCuePoint", f), n["default"] = f
    }, {
        "video.js": 97
    }],
    5: [function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            l = function _(t, e, n) {
                null === t && (t = Function.prototype);
                var o = Object.getOwnPropertyDescriptor(t, e);
                if (void 0 === o) {
                    var r = Object.getPrototypeOf(t);
                    return null === r ? void 0 : _(r, e, n)
                }
                if ("value" in o) return o.value;
                var i = o.get;
                if (void 0 !== i) return i.call(n)
            },
            u = t("video.js"),
            c = o(u),
            p = t("lodash/assign"),
            f = o(p),
            d = t("./menu-button"),
            h = o(d),
            y = t("../../events"),
            v = t("../../raynor"),
            g = o(v),
            m = c["default"].getComponent("Component"),
            b = function(t) {
                function e(t, n) {
                    r(this, e);
                    var o = i(this, Object.getPrototypeOf(e).call(this, t, (0, f["default"])({}, n, {
                            name: "cinemaModeMenuButton"
                        }))),
                        s = g["default"].instance();
                    return o.raynor = s, o.ready(function() {
                        o.el_.setAttribute("aria-label", "Cinema Mode Menu")
                    }), t.on("fullscreenchange", function() {
                        t.isFullscreen() ? o.hide() : o.show()
                    }), n && n.playerOptions && n.playerOptions.cinemaMode === !1 && o.hide(), t.isFullscreen() && o.hide(), o.timer = new y.Timer(250), o.on("mouseover", function() {
                        o.timer.setHandler(function() {
                            return t.reportUserActivity()
                        })
                    }), o.on("mouseout", function() {
                        o.timer.stop()
                    }), o
                }
                return s(e, t), a(e, [{
                    key: "buildCSSClass",
                    value: function() {
                        var t = this.isCinematicModeEnabled() ? "vkp-icon-cinematic" : "vkp-icon-non-cinematic";
                        return t + " " + l(Object.getPrototypeOf(e.prototype), "buildCSSClass", this).call(this)
                    }
                }, {
                    key: "handleClick",
                    value: function() {
                        var t = this.player_;
                        this.raynor.setCinematicMode(!this.isCinematicModeEnabled()), t.trigger("togglecinematicmode"), t.trigger({
                            type: y.DIALOG_HIDE_ALL,
                            data: {
                                component: this
                            }
                        }), this.el().className = this.buildCSSClass()
                    }
                }, {
                    key: "isCinematicModeEnabled",
                    value: function() {
                        return g["default"].instance().isCinematicModeEnabled()
                    }
                }]), e
            }(h["default"]);
        m.registerComponent("CinemaModeMenuButton", b), n["default"] = b
    }, {
        "../../events": 44,
        "../../raynor": 51,
        "./menu-button": 8,
        "lodash/assign": 74,
        "video.js": 97
    }],
    6: [function(t, e, n) {
        "use strict";

        function o(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e["default"] = t, e
        }

        function r(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function s(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function a(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var l = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            u = function m(t, e, n) {
                null === t && (t = Function.prototype);
                var o = Object.getOwnPropertyDescriptor(t, e);
                if (void 0 === o) {
                    var r = Object.getPrototypeOf(t);
                    return null === r ? void 0 : m(r, e, n)
                }
                if ("value" in o) return o.value;
                var i = o.get;
                if (void 0 !== i) return i.call(n)
            },
            c = t("video.js"),
            p = r(c),
            f = t("../../utils"),
            d = o(f),
            h = t("../../events"),
            y = p["default"].getComponent("Component"),
            v = p["default"].getComponent("FullscreenToggle"),
            g = function(t) {
                function e(t, n, o) {
                    i(this, e);
                    var r = s(this, Object.getPrototypeOf(e).call(this, t, n, o));
                    return r.timer = new h.Timer(250), r.on("mouseover", function() {
                        r.timer.setHandler(function() {
                            return t.reportUserActivity()
                        })
                    }), r.on("mouseout", function() {
                        r.timer.stop()
                    }), r
                }
                return a(e, t), l(e, [{
                    key: "buildCSSClass",
                    value: function() {
                        var t = d.browser.isTouchEnabled() ? "vkp-touch-screen" : "";
                        return t + " " + u(Object.getPrototypeOf(e.prototype), "buildCSSClass", this).call(this)
                    }
                }, {
                    key: "handleClick",
                    value: function() {
                        d.screen.isTinyScreen(this.player_) && !this.player_.paused() && this.player_.pause(), this.player_.trigger({
                            type: h.DIALOG_HIDE_ALL,
                            data: {
                                component: this
                            }
                        }), u(Object.getPrototypeOf(e.prototype), "handleClick", this).call(this)
                    }
                }]), e
            }(v);
        y.registerComponent("FullscreenMenuButton", g), n["default"] = g
    }, {
        "../../events": 44,
        "../../utils": 53,
        "video.js": 97
    }],
    7: [function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            l = function y(t, e, n) {
                null === t && (t = Function.prototype);
                var o = Object.getOwnPropertyDescriptor(t, e);
                if (void 0 === o) {
                    var r = Object.getPrototypeOf(t);
                    return null === r ? void 0 : y(r, e, n)
                }
                if ("value" in o) return o.value;
                var i = o.get;
                if (void 0 !== i) return i.call(n)
            },
            u = t("video.js"),
            c = o(u),
            p = t("lodash/assign"),
            f = o(p),
            d = c["default"].getComponent("Component"),
            h = function(t) {
                function e(t, n, o) {
                    return r(this, e), i(this, Object.getPrototypeOf(e).call(this, t, (0, f["default"])({}, n, {
                        name: "leftControlBar"
                    }), o))
                }
                return s(e, t), a(e, [{
                    key: "createEl",
                    value: function() {
                        var t = "vkp-control-bar vkp-left-control",
                            n = "group";
                        return l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "div", {
                            className: t
                        }, {
                            role: n
                        })
                    }
                }]), e
            }(d);
        h.prototype.options_ = {
            children: ["vikiPassAdsLabel"]
        }, d.registerComponent("LeftControlBar", h), n["default"] = h
    }, {
        "lodash/assign": 74,
        "video.js": 97
    }],
    8: [function(t, e, n) {
        "use strict";

        function o(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e["default"] = t, e
        }

        function r(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function s(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function a(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var l = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            u = function m(t, e, n) {
                null === t && (t = Function.prototype);
                var o = Object.getOwnPropertyDescriptor(t, e);
                if (void 0 === o) {
                    var r = Object.getPrototypeOf(t);
                    return null === r ? void 0 : m(r, e, n)
                }
                if ("value" in o) return o.value;
                var i = o.get;
                if (void 0 !== i) return i.call(n)
            },
            c = t("video.js"),
            p = r(c),
            f = t("../../utils"),
            d = o(f),
            h = t("../../events"),
            y = p["default"].getComponent("Component"),
            v = p["default"].getComponent("MenuButton"),
            g = function(t) {
                function e(t, n, o) {
                    i(this, e);
                    var r = s(this, Object.getPrototypeOf(e).call(this, t, n, o));
                    return t.on(h.DIALOG_HIDE_ALL, function(t) {
                        t.data.component !== r && r.unpressButton()
                    }), r.timer = new h.Timer(250), r.on("mouseover", function() {
                        r.timer.setHandler(function() {
                            return t.reportUserActivity()
                        })
                    }), r.on("mouseout", function() {
                        r.timer.stop()
                    }), r
                }
                return a(e, t), l(e, [{
                    key: "buildCSSClass",
                    value: function() {
                        var t = d.browser.isTouchEnabled() ? "vkp-touch-screen" : "";
                        return t + " " + u(Object.getPrototypeOf(e.prototype), "buildCSSClass", this).call(this)
                    }
                }, {
                    key: "pressButton",
                    value: function() {
                        u(Object.getPrototypeOf(e.prototype), "pressButton", this).call(this), this.player_.trigger({
                            type: h.DIALOG_HIDE_ALL,
                            data: {
                                component: this
                            }
                        }), this.player_.trigger({
                            type: h.DIALOG_SHOW,
                            data: {
                                component: this
                            }
                        })
                    }
                }, {
                    key: "unpressButton",
                    value: function() {
                        u(Object.getPrototypeOf(e.prototype), "unpressButton", this).call(this), this.player_.trigger({
                            type: h.DIALOG_HIDE,
                            data: {
                                component: this
                            }
                        })
                    }
                }]), e
            }(v);
        y.registerComponent("ControlBarMenuButton", g), n["default"] = g
    }, {
        "../../events": 44,
        "../../utils": 53,
        "video.js": 97
    }],
    9: [function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            l = function y(t, e, n) {
                null === t && (t = Function.prototype);
                var o = Object.getOwnPropertyDescriptor(t, e);
                if (void 0 === o) {
                    var r = Object.getPrototypeOf(t);
                    return null === r ? void 0 : y(r, e, n)
                }
                if ("value" in o) return o.value;
                var i = o.get;
                if (void 0 !== i) return i.call(n)
            },
            u = t("video.js"),
            c = o(u),
            p = t("lodash/assign"),
            f = o(p);
        t("./viki-play-toggle");
        var d = c["default"].getComponent("Component"),
            h = function(t) {
                function e(t, n, o) {
                    return r(this, e), i(this, Object.getPrototypeOf(e).call(this, t, (0, f["default"])({}, n, {
                        name: "middleControlBar"
                    }), o))
                }
                return s(e, t), a(e, [{
                    key: "createEl",
                    value: function() {
                        var t = "vkp-control-bar vkp-middle-control",
                            n = "group";
                        return l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "div", {
                            className: t
                        }, {
                            role: n
                        })
                    }
                }]), e
            }(d);
        h.prototype.options_ = {
            children: ["vikiPlayToggle"]
        }, d.registerComponent("MiddleControlBar", h), n["default"] = h
    }, {
        "./viki-play-toggle": 13,
        "lodash/assign": 74,
        "video.js": 97
    }],
    10: [function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            l = function y(t, e, n) {
                null === t && (t = Function.prototype);
                var o = Object.getOwnPropertyDescriptor(t, e);
                if (void 0 === o) {
                    var r = Object.getPrototypeOf(t);
                    return null === r ? void 0 : y(r, e, n)
                }
                if ("value" in o) return o.value;
                var i = o.get;
                if (void 0 !== i) return i.call(n)
            },
            u = t("video.js"),
            c = o(u),
            p = t("lodash/assign"),
            f = o(p);
        t("./fullscreen-menu-button"), t("./cinema-mode-menu-button"), t("./viki-volume-menu-button"), t("../setting/info-pane"), t("../settings/menu-button");
        var d = c["default"].getComponent("Component"),
            h = function(t) {
                function e(t, n, o) {
                    return r(this, e), i(this, Object.getPrototypeOf(e).call(this, t, (0, f["default"])({}, n, {
                        name: "rightControlBar",
                        vikiVolumeMenuButton: {
                            inline: !1
                        }
                    }), o))
                }
                return s(e, t), a(e, [{
                    key: "createEl",
                    value: function() {
                        var t = "vkp-control-bar vkp-right-control",
                            n = "group";
                        return l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "div", {
                            className: t
                        }, {
                            role: n
                        })
                    }
                }]), e
            }(d);
        h.prototype.options_ = {
            children: ["settingInfoPane", "settingsMenuButton", "vikiVolumeMenuButton", "cinemaModeMenuButton", "fullscreenMenuButton"]
        }, d.registerComponent("RightControlBar", h), n["default"] = h
    }, {
        "../setting/info-pane": 25,
        "../settings/menu-button": 33,
        "./cinema-mode-menu-button": 5,
        "./fullscreen-menu-button": 6,
        "./viki-volume-menu-button": 15,
        "lodash/assign": 74,
        "video.js": 97
    }],
    11: [function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            l = function v(t, e, n) {
                null === t && (t = Function.prototype);
                var o = Object.getOwnPropertyDescriptor(t, e);
                if (void 0 === o) {
                    var r = Object.getPrototypeOf(t);
                    return null === r ? void 0 : v(r, e, n)
                }
                if ("value" in o) return o.value;
                var i = o.get;
                if (void 0 !== i) return i.call(n)
            },
            u = t("video.js"),
            c = o(u),
            p = t("lodash/assign"),
            f = o(p),
            d = t("../../events"),
            h = c["default"].getComponent("Component"),
            y = function(t) {
                function e(t, n, o) {
                    return r(this, e), i(this, Object.getPrototypeOf(e).call(this, t, (0, f["default"])({}, n, {
                        name: "subControlBar"
                    }), o))
                }
                return s(e, t), a(e, [{
                    key: "createEl",
                    value: function() {
                        var t = this,
                            n = "vkp-control-bar vkp-sub-control",
                            o = "group",
                            r = l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "div", {
                                className: "vkp-control-bar-background"
                            }),
                            i = l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "div", {
                                className: "vkp-dialog-background"
                            }),
                            s = l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "div", {
                                className: n
                            }, {
                                role: o
                            });
                        s.appendChild(r), s.appendChild(i);
                        var a = this.player_.el(),
                            u = a.getBoundingClientRect();
                        return (0, f["default"])(i.style, {
                            height: u.height + "px"
                        }), i.addEventListener("click", function(e) {
                            e.stopPropagation(), t.player_.trigger({
                                type: d.DIALOG_HIDE_ALL,
                                data: {
                                    component: t
                                }
                            })
                        }), i.addEventListener("touchstart", function(e) {
                            e.stopPropagation(), t.player_.trigger({
                                type: d.DIALOG_HIDE_ALL,
                                data: {
                                    component: t
                                }
                            })
                        }), window.addEventListener("resize", function() {
                            t.player_.isFullscreen() || (0, f["default"])(i.style, {
                                height: a.getBoundingClientRect().height + "px"
                            })
                        }), s
                    }
                }]), e
            }(h);
        y.prototype.options_ = {
            children: ["leftControlBar", "middleControlBar", "rightControlBar"]
        }, h.registerComponent("SubControlBar", y), n["default"] = y
    }, {
        "../../events": 44,
        "lodash/assign": 74,
        "video.js": 97
    }],
    12: [function(t, e, n) {
        "use strict";

        function o(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e["default"] = t, e
        }

        function r(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function s(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function a(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var l = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            u = function g(t, e, n) {
                null === t && (t = Function.prototype);
                var o = Object.getOwnPropertyDescriptor(t, e);
                if (void 0 === o) {
                    var r = Object.getPrototypeOf(t);
                    return null === r ? void 0 : g(r, e, n)
                }
                if ("value" in o) return o.value;
                var i = o.get;
                if (void 0 !== i) return i.call(n)
            },
            c = t("video.js"),
            p = r(c),
            f = t("../../utils"),
            d = o(f),
            h = p["default"].getComponent("Component"),
            y = p["default"].getComponent("BigPlayButton"),
            v = function(t) {
                function e() {
                    return i(this, e), s(this, Object.getPrototypeOf(e).apply(this, arguments))
                }
                return a(e, t), l(e, [{
                    key: "handleClick",
                    value: function() {
                        d.screen.isTinyScreen(this.player_) && this.player_.requestFullscreen(), u(Object.getPrototypeOf(e.prototype), "handleClick", this).call(this)
                    }
                }]), e
            }(y);
        h.registerComponent("VikiBigPlayButton", v), n["default"] = v
    }, {
        "../../utils": 53,
        "video.js": 97
    }],
    13: [function(t, e, n) {
        "use strict";

        function o(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e["default"] = t, e
        }

        function r(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function s(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function a(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var l = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            u = function m(t, e, n) {
                null === t && (t = Function.prototype);
                var o = Object.getOwnPropertyDescriptor(t, e);
                if (void 0 === o) {
                    var r = Object.getPrototypeOf(t);
                    return null === r ? void 0 : m(r, e, n)
                }
                if ("value" in o) return o.value;
                var i = o.get;
                if (void 0 !== i) return i.call(n)
            },
            c = t("video.js"),
            p = r(c),
            f = t("../../events"),
            d = t("../../utils"),
            h = o(d),
            y = p["default"].getComponent("Component"),
            v = p["default"].getComponent("PlayToggle"),
            g = function(t) {
                function e(t, n, o) {
                    i(this, e);
                    var r = s(this, Object.getPrototypeOf(e).call(this, t, n, o));
                    return r.timer = new f.Timer(250), r.on("mouseover", function() {
                        r.timer.setHandler(function() {
                            return t.reportUserActivity()
                        })
                    }), r.on("mouseout", function() {
                        r.timer.stop()
                    }), r
                }
                return a(e, t), l(e, [{
                    key: "handleClick",
                    value: function() {
                        h.screen.isTinyScreen(this.player_) && this.player_.paused() && this.player_.requestFullscreen(), this.player_.trigger({
                            type: f.DIALOG_HIDE_ALL,
                            data: {
                                component: this
                            }
                        }), u(Object.getPrototypeOf(e.prototype), "handleClick", this).call(this)
                    }
                }]), e
            }(v);
        y.registerComponent("VikiPlayToggle", g), n["default"] = g
    }, {
        "../../events": 44,
        "../../utils": 53,
        "video.js": 97
    }],
    14: [function(t, e, n) {
        "use strict";

        function o(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e["default"] = t, e
        }

        function r(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function s(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function a(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var l = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            u = function g(t, e, n) {
                null === t && (t = Function.prototype);
                var o = Object.getOwnPropertyDescriptor(t, e);
                if (void 0 === o) {
                    var r = Object.getPrototypeOf(t);
                    return null === r ? void 0 : g(r, e, n)
                }
                if ("value" in o) return o.value;
                var i = o.get;
                if (void 0 !== i) return i.call(n)
            },
            c = t("video.js"),
            p = r(c),
            f = t("../../utils"),
            d = o(f),
            h = p["default"].getComponent("Component"),
            y = p["default"].getComponent("PosterImage"),
            v = function(t) {
                function e() {
                    return i(this, e), s(this, Object.getPrototypeOf(e).apply(this, arguments))
                }
                return a(e, t), l(e, [{
                    key: "handleClick",
                    value: function() {
                        d.screen.isTinyScreen(this.player_) && this.player_.paused() && this.player_.requestFullscreen(), u(Object.getPrototypeOf(e.prototype), "handleClick", this).call(this)
                    }
                }]), e
            }(y);
        h.registerComponent("VikiPosterImage", v), n["default"] = v
    }, {
        "../../utils": 53,
        "video.js": 97
    }],
    15: [function(t, e, n) {
        "use strict";

        function o(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e["default"] = t, e
        }

        function r(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function s(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function a(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var l = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            u = function m(t, e, n) {
                null === t && (t = Function.prototype);
                var o = Object.getOwnPropertyDescriptor(t, e);
                if (void 0 === o) {
                    var r = Object.getPrototypeOf(t);
                    return null === r ? void 0 : m(r, e, n)
                }
                if ("value" in o) return o.value;
                var i = o.get;
                if (void 0 !== i) return i.call(n)
            },
            c = t("video.js"),
            p = r(c),
            f = t("../../events"),
            d = t("../../utils"),
            h = o(d),
            y = p["default"].getComponent("Component"),
            v = p["default"].getComponent("VolumeMenuButton"),
            g = function(t) {
                function e(t, n, o) {
                    i(this, e);
                    var r = s(this, Object.getPrototypeOf(e).call(this, t, n, o));
                    return r.on(t, "loadstart", function() {
                        h.browser.isAndroid() && r.hide()
                    }), r.timer = new f.Timer(250), r.on("mouseover", function() {
                        r.timer.setHandler(function() {
                            return t.reportUserActivity()
                        })
                    }), r.on("mouseout", function() {
                        r.timer.stop()
                    }), r
                }
                return a(e, t), l(e, [{
                    key: "handleClick",
                    value: function() {
                        u(Object.getPrototypeOf(e.prototype), "handleClick", this).call(this), this.player_.trigger({
                            type: f.DIALOG_HIDE_ALL,
                            data: {
                                component: this
                            }
                        })
                    }
                }]), e
            }(v);
        y.registerComponent("VikiVolumeMenuButton", g), n["default"] = g
    }, {
        "../../events": 44,
        "../../utils": 53,
        "video.js": 97
    }],
    16: [function(t, e, n) {
        "use strict";

        function o(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            i = function() {
                function t() {
                    var e = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0];
                    o(this, t), this._items = e
                }
                return r(t, [{
                    key: "add",
                    value: function(t) {
                        return this._items.push(t), this
                    }
                }, {
                    key: "remove",
                    value: function(t) {
                        return this._items = this._items.filter(function(e) {
                            return e !== t
                        }), this
                    }
                }, {
                    key: "items",
                    value: function() {
                        return this._items
                    }
                }, {
                    key: "clear",
                    value: function() {
                        return this._items = [], this
                    }
                }, {
                    key: "size",
                    value: function() {
                        return this._items.length
                    }
                }]), t
            }();
        n["default"] = i
    }, {}],
    17: [function(t, e, n) {
        "use strict";

        function o(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e["default"] = t, e
        }

        function r(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function s(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function a(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var l = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            u = function b(t, e, n) {
                null === t && (t = Function.prototype);
                var o = Object.getOwnPropertyDescriptor(t, e);
                if (void 0 === o) {
                    var r = Object.getPrototypeOf(t);
                    return null === r ? void 0 : b(r, e, n)
                }
                if ("value" in o) return o.value;
                var i = o.get;
                if (void 0 !== i) return i.call(n)
            },
            c = t("video.js"),
            p = r(c),
            f = t("../../utils"),
            d = o(f),
            h = t("./time-label"),
            y = r(h),
            v = p["default"].getComponent("Component"),
            g = p["default"].formatTime,
            m = function(t) {
                function e() {
                    return i(this, e), s(this, Object.getPrototypeOf(e).apply(this, arguments))
                }
                return a(e, t), l(e, [{
                    key: "buildCSSClass",
                    value: function() {
                        return "vkp-current-time " + u(Object.getPrototypeOf(e.prototype), "buildCSSClass", this).call(this)
                    }
                }, {
                    key: "updateLabel",
                    value: function() {
                        var t = this.getTime();
                        this.el().textContent = g(d.math.trunc(t))
                    }
                }]), e
            }(y["default"]);
        v.registerComponent("CurrentTimeLabel", m), n["default"] = m
    }, {
        "../../utils": 53,
        "./time-label": 20,
        "video.js": 97
    }],
    18: [function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = t("video.js"),
            l = o(a),
            u = t("../../events");
        t("./current-time-label"), t("./remaining-time-label");
        var c = l["default"].getComponent("Component"),
            p = l["default"].getComponent("ProgressControl"),
            f = function(t) {
                function e(t, n, o) {
                    r(this, e);
                    var s = i(this, Object.getPrototypeOf(e).call(this, t, n, o));
                    return s.timer = new u.Timer(250), s.on("mouseover", function() {
                        s.timer.setHandler(function() {
                            return t.reportUserActivity()
                        })
                    }), s.on("mouseout", function() {
                        s.timer.stop()
                    }), s
                }
                return s(e, t), e
            }(p);
        f.prototype.options_ = {
            children: ["currentTimeLabel", "seekBar", "remainingTimeLabel"]
        }, c.registerComponent("ProgressControl", f), n["default"] = f
    }, {
        "../../events": 44,
        "./current-time-label": 17,
        "./remaining-time-label": 19,
        "video.js": 97
    }],
    19: [function(t, e, n) {
        "use strict";

        function o(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e["default"] = t, e
        }

        function r(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function s(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function a(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var l = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            u = function b(t, e, n) {
                null === t && (t = Function.prototype);
                var o = Object.getOwnPropertyDescriptor(t, e);
                if (void 0 === o) {
                    var r = Object.getPrototypeOf(t);
                    return null === r ? void 0 : b(r, e, n)
                }
                if ("value" in o) return o.value;
                var i = o.get;
                if (void 0 !== i) return i.call(n)
            },
            c = t("video.js"),
            p = r(c),
            f = t("../../utils"),
            d = o(f),
            h = t("./time-label"),
            y = r(h),
            v = p["default"].getComponent("Component"),
            g = p["default"].formatTime,
            m = function(t) {
                function e() {
                    return i(this, e), s(this, Object.getPrototypeOf(e).apply(this, arguments))
                }
                return a(e, t), l(e, [{
                    key: "buildCSSClass",
                    value: function() {
                        return "vkp-remaining-time " + u(Object.getPrototypeOf(e.prototype), "buildCSSClass", this).call(this)
                    }
                }, {
                    key: "updateLabel",
                    value: function() {
                        var t = this.getTime();
                        this.el().textContent = "-" + g(d.math.trunc(this.player_.duration()) - d.math.trunc(t))
                    }
                }]), e
            }(y["default"]);
        v.registerComponent("RemainingTimeLabel", m), n["default"] = m
    }, {
        "../../utils": 53,
        "./time-label": 20,
        "video.js": 97
    }],
    20: [function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            l = function d(t, e, n) {
                null === t && (t = Function.prototype);
                var o = Object.getOwnPropertyDescriptor(t, e);
                if (void 0 === o) {
                    var r = Object.getPrototypeOf(t);
                    return null === r ? void 0 : d(r, e, n)
                }
                if ("value" in o) return o.value;
                var i = o.get;
                if (void 0 !== i) return i.call(n)
            },
            u = t("video.js"),
            c = o(u),
            p = c["default"].getComponent("Component"),
            f = function(t) {
                function e(t, n, o) {
                    r(this, e);
                    var s = i(this, Object.getPrototypeOf(e).call(this, t, n, o));
                    return s.on(t, "timeupdate", s.updateLabel), t.ready(s.updateLabel.bind(s)), s
                }
                return s(e, t), a(e, [{
                    key: "getTime",
                    value: function() {
                        return this.player_.scrubbing() ? this.player_.getCache().currentTime : this.player_.currentTime()
                    }
                }, {
                    key: "buildCSSClass",
                    value: function() {
                        return "vkp-label vkp-time-label " + l(Object.getPrototypeOf(e.prototype), "buildCSSClass", this).call(this)
                    }
                }, {
                    key: "createEl",
                    value: function() {
                        var t = this.buildCSSClass(),
                            n = l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "div", {
                                className: t
                            });
                        return n.textContent = "--:--", n
                    }
                }, {
                    key: "updateLabel",
                    value: function() {}
                }]), e
            }(p);
        p.registerComponent("TimeLabel", f), n["default"] = f
    }, {
        "video.js": 97
    }],
    21: [function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            l = t("video.js"),
            u = o(l),
            c = u["default"].getComponent("Component"),
            p = u["default"].getComponent("MouseTimeDisplay"),
            f = function(t) {
                function e() {
                    return r(this, e), i(this, Object.getPrototypeOf(e).apply(this, arguments))
                }
                return s(e, t), a(e, [{
                    key: "handleMouseMove",
                    value: function(t) {
                        var e = this.el().parentNode.getBoundingClientRect(),
                            n = t.pageX - e.left;
                        if (t.pageX < e.left || t.pageX > e.left + e.width) return void this.update("", n);
                        var o = this.player_.duration(),
                            r = this.calculateDistance(t) * o;
                        this.update(r, n)
                    }
                }, {
                    key: "update",
                    value: function(t, e) {
                        var n = t;
                        t && (n = u["default"].formatTime(t, this.player_.duration())), this.el().style.left = e + "px", this.el().setAttribute("data-current-time", n)
                    }
                }]), e
            }(p);
        c.registerComponent("VikiMouseTimeDisplay", f), n["default"] = f
    }, {
        "video.js": 97
    }],
    22: [function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            l = t("video.js"),
            u = o(l),
            c = u["default"].getComponent("Component"),
            p = u["default"].getComponent("PlayProgressBar"),
            f = function(t) {
                function e() {
                    return r(this, e), i(this, Object.getPrototypeOf(e).apply(this, arguments))
                }
                return s(e, t), a(e, [{
                    key: "createEl",
                    value: function() {
                        var t = u["default"].createEl("div", {
                            className: "vjs-play-progress vjs-slider-bar vkp-play-progress"
                        });
                        return t.appendChild(this.getControlText()), t
                    }
                }, {
                    key: "getControlText",
                    value: function() {
                        return this.controlText || (this.controlText = u["default"].createEl("span", {
                            className: "vjs-control-text",
                            innerHTML: "<span>" + this.localize("Progress") + "</span>: 0%"
                        })), this.controlText
                    }
                }]), e
            }(p);
        c.registerComponent("VikiPlayProgressBar", f), n["default"] = f
    }, {
        "video.js": 97
    }],
    23: [function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.SCROLL_EVENT = void 0;
        var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol ? "symbol" : typeof t
            },
            l = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            u = function y(t, e, n) {
                null === t && (t = Function.prototype);
                var o = Object.getOwnPropertyDescriptor(t, e);
                if (void 0 === o) {
                    var r = Object.getPrototypeOf(t);
                    return null === r ? void 0 : y(r, e, n)
                }
                if ("value" in o) return o.value;
                var i = o.get;
                if (void 0 !== i) return i.call(n)
            },
            c = t("video.js"),
            p = o(c),
            f = p["default"].getComponent("Component"),
            d = n.SCROLL_EVENT = "scroll",
            h = function(t) {
                function e() {
                    return r(this, e), i(this, Object.getPrototypeOf(e).apply(this, arguments))
                }
                return s(e, t), l(e, [{
                    key: "getButton",
                    value: function() {
                        if (!this.button) {
                            var t = u(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "div", {
                                name: "scrollBar",
                                className: "vkp-scrollbar-button"
                            });
                            this.handleMouseDown = this.handleMouseDown.bind(this), this.handleMouseMove = this.handleMouseMove.bind(this), this.handleMouseUp = this.handleMouseUp.bind(this), t.addEventListener("mousedown", this.handleMouseDown), window.addEventListener("mousemove", this.handleMouseMove), window.addEventListener("mouseup", this.handleMouseUp, !0), this.button = t
                        }
                        return this.button
                    }
                }, {
                    key: "getTrack",
                    value: function() {
                        return this.track || (this.track = u(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "div", {
                            className: "vkp-scrollbar-track"
                        }), this.track.appendChild(this.getButton())), this.track
                    }
                }, {
                    key: "getPosition",
                    value: function() {
                        var t = this.getButton(),
                            e = this.getTrack().clientHeight,
                            n = t.style.top;
                        return n = n && parseInt(n.substring(0, n.length - 2), 10) || 0, n / e
                    }
                }, {
                    key: "setPosition",
                    value: function(t) {
                        var e = this.getTrack().clientHeight,
                            n = this.getButton();
                        n.style.top = t * e + "px"
                    }
                }, {
                    key: "createEl",
                    value: function() {
                        var t = u(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "div", {
                            className: "vkp-scrollbar"
                        });
                        return t.appendChild(this.getTrack()), t
                    }
                }, {
                    key: "calculateSize",
                    value: function() {
                        var t = this;
                        if (!this.isCalculated) {
                            var e = this.el(),
                                n = e.parentNode;
                            if (n) {
                                var o = function() {
                                    if (t.calculated = !0, n.clientHeight === n.scrollHeight) return t.hide(), {
                                        v: void 0
                                    };
                                    var e = n.clientHeight / n.scrollHeight * 100,
                                        o = t.getTrack().clientHeight;
                                    t.getButton().style.height = e + "%", t.contentHeight = n.scrollHeight, n.addEventListener("wheel", function(e) {
                                        return t.scrollParent(e.deltaY * o / t.contentHeight, e)
                                    }, !0), t.parentTouch = null, n.addEventListener("touchstart", function() {
                                        t.parentTouch = null
                                    }), n.addEventListener("touchend", function() {
                                        t.parentTouch = null
                                    }), n.addEventListener("touchmove", function(e) {
                                        if (1 === e.touches.length) {
                                            if (t.parentTouch) {
                                                var n = t.parentTouch,
                                                    r = e.pageY || e.touches[0].pageY,
                                                    i = n.pageY || n.touches[0].pageY,
                                                    s = (r - i) * o / t.contentHeight;
                                                t.scrollParent(-s, e)
                                            }
                                            t.parentTouch = e
                                        }
                                    }, !0)
                                }();
                                if ("object" === ("undefined" == typeof o ? "undefined" : a(o))) return o.v
                            }
                        }
                    }
                }, {
                    key: "scrollParent",
                    value: function(t, e) {
                        e && e.preventDefault();
                        var n = this.getButton(),
                            o = this.getTrack().clientHeight,
                            r = n.style.top;
                        r = (r && parseInt(r.substring(0, r.length - 2), 10) || 0) + t, 0 > r ? r = 0 : r + n.clientHeight > o && (r = o - n.clientHeight), n.style.top = r + "px";
                        var i = r / o;
                        this.trigger({
                            type: d,
                            data: {
                                position: i
                            }
                        })
                    }
                }, {
                    key: "handleMouseDown",
                    value: function() {
                        this.previousMouseMove = null, this.holdScroll || (this.holdScroll = !0)
                    }
                }, {
                    key: "handleMouseMove",
                    value: function(t) {
                        if (this.holdScroll && (1 === t.button || 1 === t.buttons)) {
                            if (this.previousMouseMove) {
                                var e = t.screenY - this.previousMouseMove.screenY;
                                this.scrollParent(e, t)
                            }
                            this.previousMouseMove = t
                        }
                    }
                }, {
                    key: "handleMouseUp",
                    value: function() {
                        this.previousMouseMove = null, this.holdScroll && (this.holdScroll = !1)
                    }
                }]), e
            }(f);
        f.registerComponent("ScrollBar", h), n["default"] = h
    }, {
        "video.js": 97
    }],
    24: [function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            l = function g(t, e, n) {
                null === t && (t = Function.prototype);
                var o = Object.getOwnPropertyDescriptor(t, e);
                if (void 0 === o) {
                    var r = Object.getPrototypeOf(t);
                    return null === r ? void 0 : g(r, e, n)
                }
                if ("value" in o) return o.value;
                var i = o.get;
                if (void 0 !== i) return i.call(n)
            },
            u = t("video.js"),
            c = o(u),
            p = t("lodash/assign"),
            f = o(p),
            d = t("./submenu-component"),
            h = o(d),
            y = c["default"].getComponent("Component"),
            v = function(t) {
                function e(t, n, o) {
                    r(this, e);
                    var s = i(this, Object.getPrototypeOf(e).call(this, t, (0, f["default"])({}, n, {
                        name: "settingBackItem"
                    }), o));
                    return n.hide && s.hide(), s.on("click", s.handleClick), s.on("tap", s.handleClick), s
                }
                return s(e, t), a(e, [{
                    key: "createEl",
                    value: function() {
                        var t = c["default"].createEl("li", {
                                className: "vkp-menu-item vjs-menu-item vkp-back-item"
                            }),
                            n = l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "span", {
                                className: "vkp-action vkp-icon-arrow-left"
                            });
                        t.appendChild(n);
                        var o = l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "span", {
                            className: "vkp-title"
                        });
                        if (o.textContent = this.options_.title, t.appendChild(o), this.options_.badge) {
                            var r = l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "span", {
                                className: "vkp-badge"
                            });
                            r.textContent = this.options_.badge, t.appendChild(r)
                        }
                        return t
                    }
                }, {
                    key: "handleClick",
                    value: function() {
                        var t = this.options_.menu,
                            e = this.options_.parentMenu;
                        t && e && (t.items().forEach(function(t) {
                            t.hide()
                        }), e.forEach(function(t) {
                            t.show()
                        }))
                    }
                }]), e
            }(h["default"]);
        y.registerComponent("SettingBackItem", v), n["default"] = v
    }, {
        "./submenu-component": 28,
        "lodash/assign": 74,
        "video.js": 97
    }],
    25: [function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            l = function m(t, e, n) {
                null === t && (t = Function.prototype);
                var o = Object.getOwnPropertyDescriptor(t, e);
                if (void 0 === o) {
                    var r = Object.getPrototypeOf(t);
                    return null === r ? void 0 : m(r, e, n)
                }
                if ("value" in o) return o.value;
                var i = o.get;
                if (void 0 !== i) return i.call(n)
            },
            u = t("video.js"),
            c = o(u),
            p = t("lodash/assign"),
            f = o(p),
            d = t("../../subtitle"),
            h = o(d),
            y = t("../../events"),
            v = c["default"].getComponent("Component"),
            g = function(t) {
                function e(t, n, o) {
                    r(this, e);
                    var s = i(this, Object.getPrototypeOf(e).call(this, t, (0, f["default"])({}, n, {
                        name: "settingInfoPane"
                    }), o));
                    return s.getCurrentSubtitle() || s.hide(), t.on(y.SUBTITLE_CHANGED, function() {
                        var t = s.getCurrentSubtitle() || {
                                srclang: "",
                                percentage: ""
                            },
                            e = s.el();
                        e.querySelector(".vkp-language").textContent = t.srclang, e.querySelector(".vkp-percentage").textContent = t.percentage ? t.percentage + "%" : "", t.srclang ? s.show() : s.hide()
                    }), s
                }
                return s(e, t), a(e, [{
                    key: "getSubtitleElement",
                    value: function() {
                        var t = this.getCurrentSubtitle() || {
                                srclang: "",
                                percentage: ""
                            },
                            n = l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "span", {
                                className: "vkp-language"
                            });
                        n.textContent = t.srclang;
                        var o = l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "span", {
                            className: "vkp-percentage"
                        });
                        o.textContent = t.percentage ? t.percentage + "%" : "";
                        var r = l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "div", {
                            className: "vkp-subtitle"
                        });
                        return r.appendChild(n), r.appendChild(o), r
                    }
                }, {
                    key: "getCurrentSubtitle",
                    value: function() {
                        var t = h["default"].get();
                        return t ? t && t.currentSubtitle() : null
                    }
                }, {
                    key: "createEl",
                    value: function() {
                        var t = l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "div", {
                            className: "vkp-setting-info-pane"
                        });
                        return t.appendChild(this.getSubtitleElement()), t
                    }
                }]), e
            }(v);
        v.registerComponent("SettingInfoPane", g), n["default"] = g
    }, {
        "../../events": 44,
        "../../subtitle": 52,
        "lodash/assign": 74,
        "video.js": 97
    }],
    26: [function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            l = function y(t, e, n) {
                null === t && (t = Function.prototype);
                var o = Object.getOwnPropertyDescriptor(t, e);
                if (void 0 === o) {
                    var r = Object.getPrototypeOf(t);
                    return null === r ? void 0 : y(r, e, n)
                }
                if ("value" in o) return o.value;
                var i = o.get;
                if (void 0 !== i) return i.call(n)
            },
            u = t("video.js"),
            c = o(u),
            p = t("lodash/assign"),
            f = o(p),
            d = c["default"].getComponent("Component"),
            h = function(t) {
                function e(t, n, o) {
                    return r(this, e), i(this, Object.getPrototypeOf(e).call(this, t, (0, f["default"])({}, n, {
                        name: "settingMenuLabel"
                    }), o))
                }
                return s(e, t), a(e, [{
                    key: "createTitle",
                    value: function() {
                        var t = l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "div", {
                            className: "vkp-menu-title"
                        });
                        return t.textContent = this.options_.title, t
                    }
                }, {
                    key: "createSubtitle",
                    value: function() {
                        var t = l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "div", {
                            className: "vkp-menu-subtitle"
                        });
                        return t.textContent = this.options_.subtitle, t
                    }
                }, {
                    key: "createEl",
                    value: function(t, n, o) {
                        var r = l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "div", (0, f["default"])({
                            className: "vkp-menu-label"
                        }, n), o);
                        return r.appendChild(this.createTitle()), this.options_.subtitle && r.appendChild(this.createSubtitle()), r
                    }
                }]), e
            }(d);
        d.registerComponent("SettingMenuLabel", h), n["default"] = h
    }, {
        "lodash/assign": 74,
        "video.js": 97
    }],
    27: [function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            l = function g(t, e, n) {
                null === t && (t = Function.prototype);
                var o = Object.getOwnPropertyDescriptor(t, e);
                if (void 0 === o) {
                    var r = Object.getPrototypeOf(t);
                    return null === r ? void 0 : g(r, e, n)
                }
                if ("value" in o) return o.value;
                var i = o.get;
                if (void 0 !== i) return i.call(n)
            },
            u = t("video.js"),
            c = o(u),
            p = t("lodash/assign"),
            f = o(p),
            d = t("./submenu-component"),
            h = o(d),
            y = c["default"].getComponent("Component"),
            v = function(t) {
                function e(t, n, o) {
                    r(this, e);
                    var s = i(this, Object.getPrototypeOf(e).call(this, t, (0, f["default"])({}, n, {
                        name: "settingSeparatorItem"
                    }), o));
                    return n.hide && s.hide(), s
                }
                return s(e, t), a(e, [{
                    key: "createEl",
                    value: function(t, n, o) {
                        return l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "li", (0, f["default"])({
                            className: "vkp-menu-item vjs-menu-item vkp-menu-separator"
                        }, n), o)
                    }
                }]), e
            }(h["default"]);
        y.registerComponent("SettingSeparatorItem", v), n["default"] = v
    }, {
        "./submenu-component": 28,
        "lodash/assign": 74,
        "video.js": 97
    }],
    28: [function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = t("video.js"),
            l = o(a),
            u = l["default"].getComponent("Component"),
            c = function(t) {
                function e(t, n, o) {
                    r(this, e);
                    var s = i(this, Object.getPrototypeOf(e).call(this, t, n, o));
                    return s.el().addEventListener("touchstart", function(t) {
                        t.stopPropagation()
                    }), s.emitTapEvents(), s
                }
                return s(e, t), e
            }(u);
        u.registerComponent("SettingSubmenuComponent", c), n["default"] = c
    }, {
        "video.js": 97
    }],
    29: [function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            l = function b(t, e, n) {
                null === t && (t = Function.prototype);
                var o = Object.getOwnPropertyDescriptor(t, e);
                if (void 0 === o) {
                    var r = Object.getPrototypeOf(t);
                    return null === r ? void 0 : b(r, e, n)
                }
                if ("value" in o) return o.value;
                var i = o.get;
                if (void 0 !== i) return i.call(n)
            },
            u = t("video.js"),
            c = o(u),
            p = t("lodash/assign"),
            f = o(p),
            d = t("../list"),
            h = o(d),
            y = t("./submenu-component"),
            v = o(y),
            g = c["default"].getComponent("Component"),
            m = function(t) {
                function e(t, n, o) {
                    r(this, e);
                    var s = i(this, Object.getPrototypeOf(e).call(this, t, (0, f["default"])({}, n, {
                        name: "settingSubmenuMenuItem",
                        settingMenuLabel: {
                            title: n.title
                        }
                    }), o));
                    return n.hide && s.hide(), s.menu = n.menu || new h["default"], s._disable = !1, s.on("tap", s.handleClick), s.on("click", s.handleClick), s
                }
                return s(e, t), a(e, [{
                    key: "createEl",
                    value: function(t, n, o) {
                        return l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "li", (0, f["default"])({
                            className: "vkp-menu-item vjs-menu-item"
                        }, n), o)
                    }
                }, {
                    key: "subItems",
                    value: function() {
                        var t = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0];
                        return t.concat(this.options_.items || [])
                    }
                }, {
                    key: "handleClick",
                    value: function() {
                        this._disable || (this.menu.items().forEach(function(t) {
                            t.hide()
                        }), this.subItems().forEach(function(t) {
                            t.show()
                        }))
                    }
                }, {
                    key: "enable",
                    value: function() {
                        this._disable = !1
                    }
                }, {
                    key: "disable",
                    value: function() {
                        this._disable = !0
                    }
                }]), e
            }(v["default"]);
        m.prototype.options_ = {
            children: ["settingMenuLabel", "settingSubmenuLabel"]
        }, g.registerComponent("SettingSubmenuItem", m), n["default"] = m
    }, {
        "../list": 16,
        "./submenu-component": 28,
        "lodash/assign": 74,
        "video.js": 97
    }],
    30: [function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            l = function y(t, e, n) {
                null === t && (t = Function.prototype);
                var o = Object.getOwnPropertyDescriptor(t, e);
                if (void 0 === o) {
                    var r = Object.getPrototypeOf(t);
                    return null === r ? void 0 : y(r, e, n)
                }
                if ("value" in o) return o.value;
                var i = o.get;
                if (void 0 !== i) return i.call(n)
            },
            u = t("video.js"),
            c = o(u),
            p = t("lodash/assign"),
            f = o(p),
            d = c["default"].getComponent("Component"),
            h = function(t) {
                function e(t, n, o) {
                    return r(this, e), i(this, Object.getPrototypeOf(e).call(this, t, (0, f["default"])({}, n, {
                        name: "settingMenuLabel"
                    }), o))
                }
                return s(e, t), a(e, [{
                    key: "setTitle",
                    value: function(t) {
                        this.el().querySelector(".vkp-submenu-title").textContent = t
                    }
                }, {
                    key: "createTitle",
                    value: function() {
                        var t = l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "span", {
                            className: "vkp-submenu-title"
                        });
                        return t.textContent = this.options_.title || "", t
                    }
                }, {
                    key: "createArrow",
                    value: function() {
                        var t = l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "i", {
                            className: "vkp-menu-arrow vkp-icon-arrow-right"
                        });
                        return t
                    }
                }, {
                    key: "createEl",
                    value: function() {
                        var t = l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "div", {
                            className: "vkp-submenu-label"
                        });
                        return t.appendChild(this.createTitle()), t.appendChild(this.createArrow()), t
                    }
                }]), e
            }(d);
        d.registerComponent("SettingSubmenuLabel", h), n["default"] = h
    }, {
        "lodash/assign": 74,
        "video.js": 97
    }],
    31: [function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            l = function m(t, e, n) {
                null === t && (t = Function.prototype);
                var o = Object.getOwnPropertyDescriptor(t, e);
                if (void 0 === o) {
                    var r = Object.getPrototypeOf(t);
                    return null === r ? void 0 : m(r, e, n)
                }
                if ("value" in o) return o.value;
                var i = o.get;
                if (void 0 !== i) return i.call(n)
            },
            u = t("video.js"),
            c = o(u),
            p = t("lodash/assign"),
            f = o(p),
            d = t("./submenu-component"),
            h = o(d),
            y = t("./toggle"),
            v = c["default"].getComponent("Component"),
            g = function(t) {
                function e(t, n, o) {
                    r(this, e);
                    var s = i(this, Object.getPrototypeOf(e).call(this, t, (0, f["default"])({}, n, {
                        name: "settingToggleMenuItem"
                    }), o));
                    return s.settingToggle.on(y.TOGGLE_EVENT, s.handleToggle), s
                }
                return s(e, t), a(e, [{
                    key: "createEl",
                    value: function(t, n, o) {
                        return l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "li", (0, f["default"])({
                            className: "vkp-menu-item vjs-menu-item",
                            tabIndex: -1
                        }, n), o)
                    }
                }, {
                    key: "handleToggle",
                    value: function() {}
                }]), e
            }(h["default"]);
        g.prototype.options_ = {
            children: ["settingMenuLabel", "settingToggle"]
        }, v.registerComponent("SettingToggleMenuItem", g), n["default"] = g
    }, {
        "./submenu-component": 28,
        "./toggle": 32,
        "lodash/assign": 74,
        "video.js": 97
    }],
    32: [function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.TOGGLE_EVENT = void 0;
        var a = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            l = function m(t, e, n) {
                null === t && (t = Function.prototype);
                var o = Object.getOwnPropertyDescriptor(t, e);
                if (void 0 === o) {
                    var r = Object.getPrototypeOf(t);
                    return null === r ? void 0 : m(r, e, n)
                }
                if ("value" in o) return o.value;
                var i = o.get;
                if (void 0 !== i) return i.call(n)
            },
            u = t("video.js"),
            c = o(u),
            p = t("lodash/assign"),
            f = o(p),
            d = t("./submenu-component"),
            h = o(d),
            y = n.TOGGLE_EVENT = "toggle",
            v = c["default"].getComponent("Component"),
            g = function(t) {
                function e(t, n, o) {
                    r(this, e);
                    var s = i(this, Object.getPrototypeOf(e).call(this, t, (0, f["default"])({}, n, {
                        name: "settingToggle"
                    }), o));
                    return s.on("tap", s.handleClick), s.on("click", s.handleClick), s
                }
                return s(e, t), a(e, [{
                    key: "setToggleValue",
                    value: function(t) {
                        this.options_.toggle = t, this.el().className = this.buildCSSClass()
                    }
                }, {
                    key: "buildCSSClass",
                    value: function() {
                        var t = this.options_.toggle ? "vkp-toggle-on" : "";
                        return "vkp-toggle " + t + " " + l(Object.getPrototypeOf(e.prototype), "buildCSSClass", this).call(this)
                    }
                }, {
                    key: "createEl",
                    value: function() {
                        var t = l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "div", {
                                className: "vkp-toggle-bar"
                            }),
                            n = l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "div", {
                                className: "vkp-toggle-knob"
                            }),
                            o = l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "div", {
                                className: "vkp-toggle-box"
                            });
                        o.appendChild(t), o.appendChild(n);
                        var r = l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "div", {
                            className: this.buildCSSClass()
                        });
                        return r.appendChild(o), r
                    }
                }, {
                    key: "handleClick",
                    value: function() {
                        this.trigger(y)
                    }
                }]), e
            }(h["default"]);
        v.registerComponent("SettingToggle", g), n["default"] = g
    }, {
        "./submenu-component": 28,
        "lodash/assign": 74,
        "video.js": 97
    }],
    33: [function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            l = function E(t, e, n) {
                null === t && (t = Function.prototype);
                var o = Object.getOwnPropertyDescriptor(t, e);
                if (void 0 === o) {
                    var r = Object.getPrototypeOf(t);
                    return null === r ? void 0 : E(r, e, n)
                }
                if ("value" in o) return o.value;
                var i = o.get;
                if (void 0 !== i) return i.call(n)
            },
            u = t("video.js"),
            c = o(u),
            p = t("lodash/assign"),
            f = o(p),
            d = t("../list"),
            h = o(d),
            y = t("./menu"),
            v = o(y),
            g = t("../subtitle/toggle-menu-item"),
            m = o(g),
            b = t("../subtitle/submenu-item"),
            _ = o(b),
            j = t("../control-bar/menu-button"),
            w = o(j),
            O = c["default"].getComponent("Component"),
            T = function(t) {
                function e(t, n, o) {
                    r(this, e);
                    var s = i(this, Object.getPrototypeOf(e).call(this, t, n, o));
                    return s.el_.setAttribute("aria-label", "Settings Menu"), s
                }
                return s(e, t), a(e, [{
                    key: "buildCSSClass",
                    value: function() {
                        return "vkp-settings-button vkp-icon-settings " + l(Object.getPrototypeOf(e.prototype), "buildCSSClass", this).call(this)
                    }
                }, {
                    key: "handleClick",
                    value: function() {
                        this.buttonPressed_ ? this.unpressButton() : this.pressButton()
                    }
                }, {
                    key: "createMenu",
                    value: function() {
                        var t = new v["default"](this.player_);
                        if (this.items = this.createItems(), this.items)
                            for (var e = 0; e < this.items.length; e++) t.addItem(this.items[e]);
                        return t
                    }
                }, {
                    key: "createItems",
                    value: function() {
                        var t = this;
                        if (!this.currentMenuItems) {
                            this.currentMenuItems = new h["default"];
                            var e = [];
                            e.push(new _["default"](this.player_, (0, f["default"])({
                                menu: this.currentMenuItems,
                                parentMenu: e
                            }, this.options_))), e.push(new m["default"](this.player_, this.options_)), e.forEach(function(e) {
                                t.currentMenuItems.add(e)
                            }), this.mainItems = e
                        }
                        return this.currentMenuItems.items()
                    }
                }, {
                    key: "pressButton",
                    value: function() {
                        l(Object.getPrototypeOf(e.prototype), "pressButton", this).call(this), this.toggleClass("vkp-menu-lock-showing", !0), this.currentMenuItems.items().forEach(function(t) {
                            t.hide()
                        }), this.mainItems.forEach(function(t) {
                            t.show()
                        })
                    }
                }, {
                    key: "unpressButton",
                    value: function() {
                        l(Object.getPrototypeOf(e.prototype), "unpressButton", this).call(this), this.toggleClass("vkp-menu-lock-showing", !1)
                    }
                }]), e
            }(w["default"]);
        O.registerComponent("SettingsMenuButton", T), n["default"] = T
    }, {
        "../control-bar/menu-button": 8,
        "../list": 16,
        "../subtitle/submenu-item": 39,
        "../subtitle/toggle-menu-item": 40,
        "./menu": 34,
        "lodash/assign": 74,
        "video.js": 97
    }],
    34: [function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            l = t("video.js"),
            u = o(l),
            c = u["default"].getComponent("Component"),
            p = c.getComponent("Menu"),
            f = function(t) {
                function e() {
                    return r(this, e), i(this, Object.getPrototypeOf(e).apply(this, arguments))
                }
                return s(e, t), a(e, [{
                    key: "addItem",
                    value: function(t) {
                        this.addChild(t)
                    }
                }]), e
            }(p);
        c.registerComponent("SettingsMenu", f), n["default"] = f
    }, {
        "video.js": 97
    }],
    35: [function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            l = function m(t, e, n) {
                null === t && (t = Function.prototype);
                var o = Object.getOwnPropertyDescriptor(t, e);
                if (void 0 === o) {
                    var r = Object.getPrototypeOf(t);
                    return null === r ? void 0 : m(r, e, n)
                }
                if ("value" in o) return o.value;
                var i = o.get;
                if (void 0 !== i) return i.call(n)
            },
            u = t("video.js"),
            c = o(u),
            p = t("lodash/assign"),
            f = o(p),
            d = t("./stream-quality-menu-item"),
            h = o(d),
            y = c["default"].getComponent("Component"),
            v = c["default"].getComponent("MenuButton"),
            g = function(t) {
                function e(t, n) {
                    r(this, e);
                    var o = i(this, Object.getPrototypeOf(e).call(this, t, n));
                    return o.ready(function() {
                        o.el_.setAttribute("aria-label", "Stream Quality Menu")
                    }), o
                }
                return s(e, t), a(e, [{
                    key: "buildCSSClass",
                    value: function() {
                        return "vjs-icon-cog " + l(Object.getPrototypeOf(e.prototype), "buildCSSClass", this).call(this)
                    }
                }, {
                    key: "createItems",
                    value: function() {
                        var t = this,
                            e = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0],
                            n = this.options().playerOptions;
                        return n.streams && e.push.apply(e, Object.keys(n.streams).map(function(e) {
                            return new h["default"](t.player_, {
                                stream: (0, f["default"])({
                                    quality: e
                                }, n.streams[e])
                            })
                        })), e
                    }
                }]), e
            }(v);
        y.registerComponent("StreamQualityMenuButton", g), n["default"] = g
    }, {
        "./stream-quality-menu-item": 36,
        "lodash/assign": 74,
        "video.js": 97
    }],
    36: [function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            l = t("video.js"),
            u = o(l),
            c = u["default"].getComponent("MenuItem"),
            p = u["default"].getComponent("Component"),
            f = function(t) {
                function e(t, n) {
                    r(this, e);
                    var o = n.stream;
                    n.label = o.quality;
                    var s = i(this, Object.getPrototypeOf(e).call(this, t, n));
                    return s.stream = o, s
                }
                return s(e, t), a(e, [{
                    key: "handleClick",
                    value: function() {
                        var t = this.stream;
                        this.player_.changeStreamQuality(t.quality)
                    }
                }]), e
            }(c);
        p.registerComponent("StreamQualityMenuItem", f), n["default"] = f
    }, {
        "video.js": 97
    }],
    37: [function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            l = function _(t, e, n) {
                null === t && (t = Function.prototype);
                var o = Object.getOwnPropertyDescriptor(t, e);
                if (void 0 === o) {
                    var r = Object.getPrototypeOf(t);
                    return null === r ? void 0 : _(r, e, n)
                }
                if ("value" in o) return o.value;
                var i = o.get;
                if (void 0 !== i) return i.call(n)
            },
            u = t("video.js"),
            c = o(u),
            p = t("lodash/assign"),
            f = o(p),
            d = t("../setting/submenu-component"),
            h = o(d),
            y = t("../../events"),
            v = t("../../subtitle"),
            g = o(v),
            m = c["default"].getComponent("Component"),
            b = function(t) {
                function e(t, n, o) {
                    r(this, e);
                    var s = i(this, Object.getPrototypeOf(e).call(this, t, (0, f["default"])({}, n, {
                        name: "subtitleListItme"
                    }), o));
                    return s.on("click", s.handleClick), s.on("tap", s.handleClick), t.on(y.SUBTITLE_CHANGED, function() {
                        var t = g["default"].get(),
                            e = t.currentLanguage() || t.previousLanguage(),
                            o = e === n.subtitle.language ? "vkp-icon-tick" : "";
                        s.checkedElement.className = "vkp-action " + o
                    }), s
                }
                return s(e, t), a(e, [{
                    key: "createEl",
                    value: function() {
                        var t = this.options_.subtitle,
                            n = l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "span", {
                                className: "vkp-action"
                            }),
                            o = l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "span", {
                                className: "vkp-title"
                            });
                        o.textContent = t.title;
                        var r = l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "span", {
                            className: "vkp-percentage"
                        });
                        r.textContent = t.percentage + "%";
                        var i = l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "li", {
                            className: "vkp-subtitle-item vkp-menu-item"
                        });
                        return i.appendChild(n), i.appendChild(o), i.appendChild(r), this.checkedElement = n, i
                    }
                }, {
                    key: "handleClick",
                    value: function() {
                        var t = g["default"].get();
                        t.setLanguage(this.options_.subtitle.language)
                    }
                }]), e
            }(h["default"]);
        m.registerComponent("SubtitleListItem", b), n["default"] = b
    }, {
        "../../events": 44,
        "../../subtitle": 52,
        "../setting/submenu-component": 28,
        "lodash/assign": 74,
        "video.js": 97
    }],
    38: [function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            l = function b(t, e, n) {
                null === t && (t = Function.prototype);
                var o = Object.getOwnPropertyDescriptor(t, e);
                if (void 0 === o) {
                    var r = Object.getPrototypeOf(t);
                    return null === r ? void 0 : b(r, e, n)
                }
                if ("value" in o) return o.value;
                var i = o.get;
                if (void 0 !== i) return i.call(n)
            },
            u = t("video.js"),
            c = o(u),
            p = t("lodash/assign"),
            f = o(p),
            d = t("./list-item"),
            h = o(d),
            y = t("../scrollbar"),
            v = o(y),
            g = c["default"].getComponent("Component"),
            m = function(t) {
                function e(t, n, o) {
                    r(this, e);
                    var s = i(this, Object.getPrototypeOf(e).call(this, t, (0, f["default"])({}, n, {
                        name: "subtitleList"
                    }), o));
                    return n.hide && s.hide(), s
                }
                return s(e, t), a(e, [{
                    key: "getList",
                    value: function() {
                        var t = this;
                        return this.list || ! function() {
                            var n = l(Object.getPrototypeOf(e.prototype), "createEl", t).call(t, "ul", {
                                    className: "vkp-list"
                                }),
                                o = t.getSubtitles();
                            o.forEach(function(t) {
                                n.appendChild(t.el())
                            }), t.list = n
                        }(), this.list
                    }
                }, {
                    key: "getScrollbar",
                    value: function() {
                        var t = this;
                        return this.scrollbar || (this.scrollbar = new v["default"](this.player_), this.scrollbar.on(y.SCROLL_EVENT, function(e) {
                            var n = e.data,
                                o = n.position,
                                r = t.getList();
                            r.style.marginTop = "-" + o * r.scrollHeight + "px"
                        })), this.scrollbar
                    }
                }, {
                    key: "getSubtitles",
                    value: function() {
                        var t = this,
                            e = this.options_.subtitles;
                        return e.map(function(e) {
                            return new h["default"](t.player_, {
                                subtitle: {
                                    title: e.label.split(" ")[0],
                                    percentage: e.percentage,
                                    language: e.srclang
                                }
                            })
                        })
                    }
                }, {
                    key: "createEl",
                    value: function() {
                        var t = this.getList(),
                            n = l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "div", {
                                className: "vkp-subtitle-list"
                            });
                        return n.appendChild(this.getScrollbar().el()), n.appendChild(t), n
                    }
                }, {
                    key: "show",
                    value: function() {
                        l(Object.getPrototypeOf(e.prototype), "show", this).call(this), this.getScrollbar().calculateSize()
                    }
                }]), e
            }(g);
        g.registerComponent("SubtitleList", m), n["default"] = m
    }, {
        "../scrollbar": 23,
        "./list-item": 37,
        "lodash/assign": 74,
        "video.js": 97
    }],
    39: [function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            l = t("video.js"),
            u = o(l),
            c = t("lodash/assign"),
            p = o(c),
            f = t("../../subtitle"),
            d = o(f),
            h = t("../../events"),
            y = t("../setting/submenu-item"),
            v = o(y),
            g = t("../setting/back-item"),
            m = o(g),
            b = t("../setting/separator-item"),
            _ = o(b),
            j = t("./list"),
            w = o(j),
            O = u["default"].getComponent("Component"),
            T = function(t) {
                function e(t, n, o) {
                    r(this, e);
                    var s = i(this, Object.getPrototypeOf(e).call(this, t, (0, p["default"])({}, n, {
                        name: "settingToggleMenuItem",
                        title: "subtitles"
                    }), o));
                    t.on(h.SUBTITLE_CHANGED, function() {
                        var t = s.getCurrentSubtitle() || s.getPreviousSubtitle() || {
                                srclang: "",
                                percentage: ""
                            },
                            e = t.percentage ? t.percentage + "%" : "",
                            o = (t.srclang.toUpperCase() + " " + e).trim();
                        s.settingSubmenuLabel.setTitle(o), s.showParentMenu(n.parentMenu)
                    });
                    var a = n.playerOptions.sortedSubtitles || [],
                        l = !0,
                        u = s.menu;
                    return s.items = [new m["default"](s.player_, {
                        title: "Subtitle Languages",
                        badge: a.length,
                        parentMenu: n.parentMenu,
                        menu: u,
                        hide: l
                    }), new _["default"](s.player_, {
                        hide: l
                    }), new w["default"](s.player_, {
                        subtitles: a,
                        hide: l
                    })], s.subItems().forEach(function(t) {
                        u.add(t)
                    }), 0 === a.length && (s.settingSubmenuLabel.setTitle("Not available yet"), s.toggleClass("vkp-disable-menu-item"), s.disable()), s
                }
                return s(e, t), a(e, [{
                    key: "getCurrentSubtitle",
                    value: function() {
                        var t = d["default"].get();
                        return t && t.currentSubtitle()
                    }
                }, {
                    key: "getPreviousSubtitle",
                    value: function() {
                        var t = d["default"].get();
                        return t && t.previousSubtitle
                    }
                }, {
                    key: "subItems",
                    value: function() {
                        return this.items || []
                    }
                }, {
                    key: "showParentMenu",
                    value: function(t) {
                        this.subItems().forEach(function(t) {
                            return t.hide()
                        }), t.forEach(function(t) {
                            return t.show()
                        })
                    }
                }]), e
            }(v["default"]);
        O.registerComponent("SubtitleSubmenuItem", T), n["default"] = T
    }, {
        "../../events": 44,
        "../../subtitle": 52,
        "../setting/back-item": 24,
        "../setting/separator-item": 27,
        "../setting/submenu-item": 29,
        "./list": 38,
        "lodash/assign": 74,
        "video.js": 97
    }],
    40: [function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            l = t("video.js"),
            u = o(l),
            c = t("lodash/assign"),
            p = o(c),
            f = t("../../subtitle"),
            d = o(f),
            h = t("../../events"),
            y = t("../setting/toggle-menu-item"),
            v = o(y),
            g = u["default"].getComponent("Component"),
            m = function(t) {
                function e(t, n, o) {
                    r(this, e);
                    var s = i(this, Object.getPrototypeOf(e).call(this, t, (0, p["default"])({}, n, {
                        name: "settingToggleMenuItem",
                        settingMenuLabel: {
                            title: "show subtitles"
                        }
                    }), o));
                    return t.on(h.SUBTITLE_CHANGED, function() {
                        var t = s.getCurrentSubtitle() || {
                            srclang: "",
                            percentage: ""
                        };
                        s.settingToggle.setToggleValue("" !== t.srclang)
                    }), n && 0 === n.playerOptions.sortedSubtitles.length && s.toggleClass("vkp-disable-menu-item", !0), s
                }
                return s(e, t), a(e, [{
                    key: "getCurrentSubtitle",
                    value: function() {
                        var t = d["default"].get();
                        return t && t.currentSubtitle()
                    }
                }, {
                    key: "handleToggle",
                    value: function() {
                        var t = d["default"].get(),
                            e = t && t.currentLanguage() || "";
                        e ? d["default"].get().setLanguage("") : d["default"].get().setLanguage(t.previousLanguage())
                    }
                }]), e
            }(v["default"]);
        g.registerComponent("SubtitleToggleMenuItem", m), n["default"] = m
    }, {
        "../../events": 44,
        "../../subtitle": 52,
        "../setting/toggle-menu-item": 31,
        "lodash/assign": 74,
        "video.js": 97
    }],
    41: [function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            l = function m(t, e, n) {
                null === t && (t = Function.prototype);
                var o = Object.getOwnPropertyDescriptor(t, e);
                if (void 0 === o) {
                    var r = Object.getPrototypeOf(t);
                    return null === r ? void 0 : m(r, e, n)
                }
                if ("value" in o) return o.value;
                var i = o.get;
                if (void 0 !== i) return i.call(n)
            },
            u = t("video.js"),
            c = o(u),
            p = t("lodash/assign"),
            f = o(p),
            d = t("./dialog"),
            h = o(d),
            y = t("../../events"),
            v = c["default"].getComponent("Component"),
            g = function(t) {
                function e(t, n, o) {
                    r(this, e);
                    var s = i(this, Object.getPrototypeOf(e).call(this, t, (0, f["default"])({}, n, {
                        name: "vikiPassAdsLabel"
                    }), o));
                    return n && n.playerOptions && n.playerOptions.disableAds && s.hide(), s.on("click", s.handleClick), s.on("tap", s.handleClick), t.on(y.DIALOG_HIDE_ALL, function(t) {
                        t.data.component !== s && s.unpressButton()
                    }), s.timer = new y.Timer(250), s.on("mouseover", function() {
                        s.timer.setHandler(function() {
                            return t.reportUserActivity()
                        })
                    }), s.on("mouseout", function() {
                        s.timer.stop()
                    }), s
                }
                return s(e, t), a(e, [{
                    key: "getLabel",
                    value: function() {
                        var t = l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "label", {
                            className: "vkp-label"
                        });
                        return t.textContent = "ads", t
                    }
                }, {
                    key: "getToggle",
                    value: function() {
                        var t = l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "div", {
                                className: "vkp-toggle-knob"
                            }),
                            n = l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "div", {
                                className: "vkp-toggle-bar"
                            }),
                            o = l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "div", {
                                className: "vkp-toggle-box"
                            });
                        o.appendChild(n), o.appendChild(t);
                        var r = l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "div", {
                            className: "vkp-ads-toggle vkp-toggle vkp-toggle-on"
                        });
                        return r.appendChild(o), r
                    }
                }, {
                    key: "getDialog",
                    value: function() {
                        var t = this.dialog;
                        return t || (t = new h["default"](this.player_), this.dialog = t), t
                    }
                }, {
                    key: "createEl",
                    value: function() {
                        var t = l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "div", {
                            className: "vkp-vikipass-ads-label"
                        });
                        return [this.getLabel(), this.getToggle(), this.getDialog().el()].forEach(function(e) {
                            t.appendChild(e)
                        }), t
                    }
                }, {
                    key: "handleClick",
                    value: function() {
                        var t = this.getDialog();
                        t.hasClass("vjs-hidden") ? this.pressButton() : this.unpressButton()
                    }
                }, {
                    key: "pressButton",
                    value: function() {
                        var t = this.getDialog();
                        t.removeClass("vjs-hidden"), this.player_.trigger({
                            type: y.DIALOG_HIDE_ALL,
                            data: {
                                component: this
                            }
                        }), this.player_.trigger({
                            type: y.DIALOG_SHOW,
                            data: {
                                component: this
                            }
                        })
                    }
                }, {
                    key: "unpressButton",
                    value: function() {
                        var t = this.getDialog();
                        t.addClass("vjs-hidden"), this.player_.trigger({
                            type: y.DIALOG_HIDE,
                            data: {
                                component: this
                            }
                        })
                    }
                }]), e
            }(v);
        v.registerComponent("VikiPassAdsLabel", g), n["default"] = g
    }, {
        "../../events": 44,
        "./dialog": 42,
        "lodash/assign": 74,
        "video.js": 97
    }],
    42: [function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            l = function d(t, e, n) {
                null === t && (t = Function.prototype);
                var o = Object.getOwnPropertyDescriptor(t, e);
                if (void 0 === o) {
                    var r = Object.getPrototypeOf(t);
                    return null === r ? void 0 : d(r, e, n)
                }
                if ("value" in o) return o.value;
                var i = o.get;
                if (void 0 !== i) return i.call(n)
            },
            u = t("video.js"),
            c = o(u),
            p = c["default"].getComponent("Component"),
            f = function(t) {
                function e(t, n, o) {
                    r(this, e);
                    var s = i(this, Object.getPrototypeOf(e).call(this, t, n, o));
                    return s.hide(), s
                }
                return s(e, t), a(e, [{
                    key: "createDialogMessage",
                    value: function() {
                        var t = c["default"].createEl("div", {
                            className: "vkp-message",
                            innerHTML: '\n<div class="vkp-label">\n  Get Viki Pass now to watch without ads!\n</div>\n<a href="//www.viki.com/pass?origin=html5_player_overlay"\n  class="vkp-vikipass-button"\n  target="_blank">\n  Start your free trial\n</a>\n      '
                        });
                        return t
                    }
                }, {
                    key: "createCloseButton",
                    value: function() {
                        var t = l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "button", {
                            className: "vkp-vikipass-close vkp-icon-close"
                        });
                        return t.addEventListener("click", this.handleClose.bind(this), !0), t.addEventListener("touchend", this.handleClose.bind(this)), t
                    }
                }, {
                    key: "createEl",
                    value: function() {
                        var t = l(Object.getPrototypeOf(e.prototype), "createEl", this).call(this, "div", {
                            className: "vkp-vikipass-dialog"
                        });
                        return t.appendChild(this.createDialogMessage()), t.appendChild(this.createCloseButton()), t
                    }
                }, {
                    key: "handleClose",
                    value: function(t) {
                        t.stopPropagation(), this.hide()
                    }
                }]), e
            }(p);
        p.registerComponent("VikiPassDialog", f), n["default"] = f
    }, {
        "video.js": 97
    }],
    43: [function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = t("url"),
            i = o(r),
            s = t("querystring"),
            a = o(s),
            l = t("video.js"),
            u = o(l),
            c = t("lodash/assign"),
            p = o(c),
            f = "http://pubads.g.doubleclick.net/gampad/ads",
            d = {
                env: "vp",
                gdfp_req: 1,
                impl: "s",
                unviewed_position_start: 1,
                output: "vast",
                sz: "640x360",
                cmsid: "893"
            };
        n["default"] = {
            isMobile: function() {
                var t = u["default"].browser;
                return !(!t.IS_IOS && !t.IS_ANDROID)
            },
            getAdTagUrl: function() {
                var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
                    e = 38,
                    n = "/50449293/Video.HTML5.Desktop",
                    o = window.location.toString();
                this.isMobile() && (n = "/50449293/Video.HTML5.Mobile");
                var r = (0, p["default"])({}, d, {
                    iu: n,
                    correlator: +new Date,
                    url: o,
                    description_url: o,
                    cust_params: "site=" + i["default"].parse(o).host + "&ad_settings_web=" + e
                });
                return t.video && (r.vid = t.video.id), f + "?" + a["default"].stringify(r)
            }
        }
    }, {
        "lodash/assign": 74,
        querystring: 94,
        url: 95,
        "video.js": 97
    }],
    44: [function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e["default"] = t, e
        }

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function s(t, e) {
            var n = t.player;
            e.isAdsRequested || (d["default"].instance().log("request ads", e.isAdsRequested), e.isAdsRequested = !0, n.ima.requestAds(), t.emit(k, g))
        }

        function a(t, e) {
            var n = t.player;
            n.on("ready", function() {
                t.emit(G)
            }), n.on("timeupdate", function(e) {
                t.emit(X, e)
            }), n.on("loadedmetadata", function(e) {
                t.emit(Q, e)
            }), n.tech_.on("durationchange", function(e) {
                t.emit(J, e)
            }), n.on("touchstart", function() {
                n.ima && "function" == typeof n.ima.initializeAdDisplayContainer && n.ima.initializeAdDisplayContainer()
            }), n.on("play", function() {
                t.emit(b);
                var o = n.contentEl().querySelector("#ima-ad-container");
                o && delete o.style.display, e.setHandler(function() {
                    t.emit(w, t)
                })
            }), n.on("pause", function() {
                t.emit(_);
                var o = n.contentEl().querySelector("#ima-ad-container");
                o && (o.style.display = "none"), e.stop()
            }), n.on("waiting", function(e) {
                t.emit(z, e);
            }), n.on("seeked", function(e) {
                t.emit(K, e)
            }), n.on("ended", function(e) {
                t.emit(Y, e)
            }), n.on("mouseout", function(t) {
                var e = n.el().getBoundingClientRect();
                (t.pageY > e.bottom || t.pageY < e.top || t.pageX < e.left || t.pageX > e.right) && n.userActive(!1)
            }), n.on("fullscreenchange", function(e) {
                if (n.ima && "function" == typeof n.ima.getAdsManager) {
                    var o = n.ima.getAdsManager(),
                        r = n.isFullscreen() ? google.ima.ViewMode.NORMAL : google.ima.ViewMode.FULLSCREEN;
                    o && o.resize(t.width(), t.height(), r)
                }
                return n.isFullscreen() ? t.emit(O, e) : (p.screen.isTinyScreen(n) && n.pause(), t.emit(T, e))
            }), n.on("adsready", function() {
                n.contentEl().querySelector("#ima-ad-container").style.display = "none", t.emit(C)
            }), n.on("canplay", function(e) {
                t.emit(W, e)
            }), n.on("togglecinematicmode", function() {
                if (t.emit(E, y["default"].instance().isCinematicModeEnabled()), n.ima && "function" == typeof n.ima.getAdsManager) {
                    var e = n.ima.getAdsManager(),
                        o = n.isFullscreen() ? google.ima.ViewMode.FULLSCREEN : google.ima.ViewMode.NORMAL;
                    e && e.resize(t.width(), t.height(), o)
                }
            }), n.on(tt, function() {
                n.addClass("vkp-locking-control")
            }), n.on(et, function() {
                n.removeClass("vkp-locking-control")
            });
            var o = n.textTracks();
            o.on("change", function() {
                for (var e = null, r = 0; r < o.length; r++) {
                    var i = o[r];
                    if ("showing" === i.mode && t.currentSubtitleLanguage !== i.language) {
                        var s = {
                            toLang: i.language
                        };
                        t.currentSubtitleLanguage && (s.fromLang = t.currentSubtitleLanguage), t.currentSubtitleLanguage = i.language, t.emit(Z, new v(Z, s)), n.trigger(Z)
                    } else i.language === t.currentSubtitleLanguage && "showing" !== i.mode && (e = i.language)
                }
                if (e) {
                    var a = {
                        fromLang: e,
                        toLang: ""
                    };
                    t.currentSubtitleLanguage = "", t.emit(Z, new v(Z, a)), n.trigger(Z)
                }
            }), d["default"].instance().log("player is ready"), t.emit(m), window.addEventListener("resize", function() {
                if (!n.isFullscreen()) {
                    var e = t.width(),
                        o = t.height();
                    if (n.width(e), n.height(o), n.ima && "function" == typeof n.ima.getAdsManager) {
                        var r = n.ima.getAdsManager(),
                            i = n.isFullscreen() ? google.ima.ViewMode.FULLSCREEN : google.ima.ViewMode.NORMAL;
                        r && r.resize(e, o, i)
                    }
                }
            })
        }

        function l(t, e, n, o) {
            var r = t.player;
            r.on("adstart", function() {
                o.beforeAdSubtitle = t.getSubtitleLanguage(), t.setSubtitleLanguage("")
            }), e.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, function(e) {
                if (!e.getError) return d["default"].instance().log("Ad Error", e), void t.emit(j, e);
                var n = e.getError(),
                    o = n.getErrorCode();
                switch (t.emit(x, n), t.emit(j, n), o) {
                    case google.ima.AdError.ErrorCode.FAILED_TO_REQUEST_ADS:
                        t.emit(S, n);
                        break;
                    case google.ima.AdError.ErrorCode.VAST_LOAD_TIMEOUT:
                    case google.ima.AdError.ErrorCode.VAST_MEDIA_LOAD_TIMEOUT:
                        t.emit(P, n);
                        break;
                    case google.ima.AdError.ErrorCode.VAST_EMPTY_RESPONSE:
                    case google.ima.AdError.ErrorCode.VAST_ASSET_NOT_FOUND:
                        t.emit(A, n)
                }
            }), e.addEventListener(google.ima.AdEvent.Type.LOADED, function(e) {
                return t.emit(M, e)
            }), e.addEventListener(google.ima.AdEvent.Type.IMPRESSION, function(e) {
                return t.emit(L, e)
            }), e.addEventListener(google.ima.AdEvent.Type.STARTED, function(e) {
                n.stop(), t.emit(I, e);
                var o = r.contentEl().querySelector("#ima-ad-container");
                o && (o.style.display = "block", o.children && o.children.length > 0 && (o.children[0].style.height = "100%"))
            }), e.addEventListener(google.ima.AdEvent.Type.PAUSED, function(e) {
                return t.emit(D, e)
            }), e.addEventListener(google.ima.AdEvent.Type.CLICKED, function(e) {
                return t.emit(R, e)
            }), e.addEventListener(google.ima.AdEvent.Type.SKIPPED, function(e) {
                return t.emit(N, e)
            }), e.addEventListener(google.ima.AdEvent.Type.RESUMED, function(e) {
                return t.emit(F, e)
            }), e.addEventListener(google.ima.AdEvent.Type.FIRST_QUARTILE, function(e) {
                return t.emit(B, e)
            }), e.addEventListener(google.ima.AdEvent.Type.MIDPOINT, function(e) {
                return t.emit(H, e)
            }), e.addEventListener(google.ima.AdEvent.Type.THIRD_QUARTILE, function(e) {
                return t.emit(U, e)
            }), e.addEventListener(google.ima.AdEvent.Type.COMPLETE, function(e) {
                return t.emit(V, e)
            }), e.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, function(e) {
                o.beforeAdSubtitle && (t.setSubtitleLanguage(o.beforeAdSubtitle), o.beforeAdSubtitle = ""), t.emit(q, e)
            }), e.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, function(e) {
                return t.emit($, e)
            })
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.DIALOG_HIDE_ALL = n.DIALOG_HIDE = n.DIALOG_SHOW = n.HICCUP_RECOVERY_FAILED = n.HICCUP_RECOVERY = n.HICCUP = n.STREAM_QUALITY_CHANGED = n.SUBTITLE_CHANGED = n.VIDEO_DURATION_CHANGED = n.VIDEO_METADATA_LOADED = n.VIDEO_TIME_UPDATE = n.VIDEO_ENDED = n.VIDEO_SEEKED = n.VIDEO_WAITING = n.VIDEO_LOADED = n.VIDEO_CAN_PLAY = n.AD_CONTENT_PAUSE_REQUESTED = n.AD_CONTENT_RESUME_REQUESTED = n.AD_COMPLETE = n.AD_THIRD_QUARTILE = n.AD_MIDPOINT = n.AD_FIRST_QUARTILE = n.AD_RESUMED = n.AD_SKIPPED = n.AD_CLICKED = n.AD_PAUSED = n.AD_STARTED = n.AD_IMPRESSION = n.AD_LOADED = n.AD_BLANK_ERROR = n.AD_ERROR = n.AD_TIMEOUT = n.AD_UNAVAILABLE = n.AD_REQUEST = n.AD_READY = n.TOGGLE_CINEMATIC_MODE = n.EXIT_FULLSCREEN = n.ENTER_FULLSCREEN = n.PLAYING = n.ERROR = n.PAUSE = n.PLAY = n.READY = n.AD_PROVIDER = n.Timer = n.Event = void 0;
        var u = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var o = e[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                }
            }
            return function(e, n, o) {
                return n && t(e.prototype, n), o && t(e, o), e
            }
        }();
        n.requestAds = s, n.handlePlayerEvents = a, n.handleAdsEvents = l;
        var c = t("./utils"),
            p = r(c),
            f = t("./logger"),
            d = o(f),
            h = t("./raynor"),
            y = o(h),
            v = n.Event = function nt(t, e) {
                i(this, nt), this.name = t, this.options = e
            },
            g = (n.Timer = function() {
                function t() {
                    var e = arguments.length <= 0 || void 0 === arguments[0] ? 1e3 : arguments[0];
                    i(this, t), this.handler = function() {}, this.interval = e
                }
                return u(t, [{
                    key: "setHandler",
                    value: function(t) {
                        this.handler = t, this.start()
                    }
                }, {
                    key: "start",
                    value: function() {
                        this.timer && this.stop(), this.timer = setInterval(this.handler, this.interval)
                    }
                }, {
                    key: "stop",
                    value: function() {
                        this.timer && (clearInterval(this.timer), this.timer = null)
                    }
                }]), t
            }(), n.AD_PROVIDER = "IMA"),
            m = n.READY = "ready",
            b = n.PLAY = "play",
            _ = n.PAUSE = "pause",
            j = n.ERROR = "player_error",
            w = n.PLAYING = "playing",
            O = n.ENTER_FULLSCREEN = "enter_fullscreen",
            T = n.EXIT_FULLSCREEN = "exit_fullscreen",
            E = n.TOGGLE_CINEMATIC_MODE = "toggle_cinemmatic_mode",
            C = n.AD_READY = "ad_ready",
            k = n.AD_REQUEST = "ad_request",
            S = n.AD_UNAVAILABLE = "ads_unavailable",
            P = n.AD_TIMEOUT = "ad_timeout",
            x = n.AD_ERROR = "ad_error",
            A = n.AD_BLANK_ERROR = "ad_blank_error",
            M = n.AD_LOADED = "ad_loaded",
            L = n.AD_IMPRESSION = "ad_impression",
            I = n.AD_STARTED = "ad_started",
            D = n.AD_PAUSED = "ad_paused",
            R = n.AD_CLICKED = "ad_click",
            N = n.AD_SKIPPED = "ad_skip",
            F = n.AD_RESUMED = "ad_resumed",
            B = n.AD_FIRST_QUARTILE = "ad_first_quarter",
            H = n.AD_MIDPOINT = "ad_mid_point",
            U = n.AD_THIRD_QUARTILE = "ad_third_quarter",
            V = n.AD_COMPLETE = "ad_completed",
            q = n.AD_CONTENT_RESUME_REQUESTED = "ad_content_resume_requested",
            $ = n.AD_CONTENT_PAUSE_REQUESTED = "ad_content_pause_requested",
            W = n.VIDEO_CAN_PLAY = "video_can_play",
            G = n.VIDEO_LOADED = "video_loaded",
            z = n.VIDEO_WAITING = "video_waiting",
            K = n.VIDEO_SEEKED = "video_seeked",
            Y = n.VIDEO_ENDED = "video_end",
            X = n.VIDEO_TIME_UPDATE = "timeupdate",
            Q = n.VIDEO_METADATA_LOADED = "loadedmetadata",
            J = n.VIDEO_DURATION_CHANGED = "durationchange",
            Z = n.SUBTITLE_CHANGED = "subtitle_change",
            tt = (n.STREAM_QUALITY_CHANGED = "stream_quality_changed", n.HICCUP = "hiccup", n.HICCUP_RECOVERY = "hiccup_recovery", n.HICCUP_RECOVERY_FAILED = "hiccup_recovery_failed", n.DIALOG_SHOW = "dialog_show"),
            et = n.DIALOG_HIDE = "dialog_hide";
        n.DIALOG_HIDE_ALL = "dialog_hide_all";
        n["default"] = v
    }, {
        "./logger": 45,
        "./raynor": 51,
        "./utils": 53
    }],
    45: [function(t, e, n) {
        "use strict";

        function o(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e["default"] = t, e
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol ? "symbol" : typeof t
            },
            s = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            a = t("./utils"),
            l = o(a),
            u = null,
            c = function() {
                function t() {
                    r(this, t)
                }
                return s(t, [{
                    key: "log",
                    value: function() {
                        if (l.debugModeEnabled())
                            if ("object" === i(console.log)) console.log("player> ", JSON.stringify(arguments));
                            else {
                                var t, e, n = (t = ["%cplayer>", "color: #A00; font-weight: bolder"]).concat.apply(t, arguments);
                                (e = console).log.apply(e, n)
                            }
                    }
                }], [{
                    key: "instance",
                    value: function() {
                        return u || (u = new t), u
                    }
                }, {
                    key: "log",
                    value: function() {
                        t.instance().log(arguments)
                    }
                }]), t
            }();
        n["default"] = c
    }, {
        "./utils": 53
    }],
    46: [function(t, e, n) {
        "use strict";

        function o(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e["default"] = t, e
        }

        function r(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function s(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function a(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.VERSION_NUMBER = n.VERSION_HASH = void 0;
        var l = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            u = t("events"),
            c = t("video.js"),
            p = r(c),
            f = t("videojs-ima"),
            d = r(f);
        t("videojs-contrib-ads");
        var h = t("./config"),
            y = r(h),
            v = t("./analytics/index"),
            g = t("./utils"),
            m = o(g),
            b = t("./events"),
            _ = o(b),
            j = t("./logger"),
            w = r(j),
            O = t("./presets"),
            T = r(O),
            E = t("./subtitle"),
            C = r(E),
            k = t("./raynor"),
            S = r(k),
            P = t("lodash/assign"),
            x = r(P);
        t("./components/ad-cue-point"), t("./components/stream-quality-menu-button"), t("./components/vikipass/ads-label"), t("./components/control-bar/left"), t("./components/control-bar/right"), t("./components/control-bar/middle"), t("./components/control-bar/sub"), t("./components/control-bar/viki-big-play-button"), t("./components/control-bar/viki-poster-image"), t("./components/setting/toggle-menu-item"), t("./components/setting/submenu-label"), t("./components/setting/submenu-item"), t("./components/setting/toggle"), t("./components/setting/menu-label"), t("./components/progress-control/viki-mouse-time-display"), t("./components/progress-control/viki-play-progress-bar"), t("./components/progress-control");
        var A = n.VERSION_HASH = "c71c8b0",
            M = n.VERSION_NUMBER = "3.0." + A;
        (0, d["default"])(p["default"]);
        var L = function(t) {
            function e(t) {
                var n = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                i(this, e);
                var o = s(this, Object.getPrototypeOf(e).call(this)),
                    r = (0, x["default"])({}, T["default"].get(n.preset), n);
                return o.options = r, o.currentSubtitleLanguage = null, o.logger = w["default"].instance(r), o.logger.log("is ads disabled?", r.disableAds), o.addListener(_.AD_READY, o.onAdReady), o.addListener(_.READY, o.onReady), o.timer = new _.Timer, o.store = {
                    isAdsRequested: !1
                }, o.loadWebVtt(function() {
                    r.disableAds ? (o.initialize(t, r), _.handlePlayerEvents(o, o.timer)) : o.loadIMA(t)
                }), o.loadCss(), o
            }
            return a(e, t), l(e, null, [{
                key: "create",
                value: function(t) {
                    var n = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                    return new e(t, n)
                }
            }, {
                key: "createVideoJS",
                value: function(t, e) {
                    return (0, p["default"])(t, e)
                }
            }]), l(e, [{
                key: "loadCss",
                value: function() {
                    var t = document.getElementById("vk-player-css");
                    if (!t) {
                        var e = "//0.viki.io/a/player/html5/viki-player";
                        m.debugModeEnabled() && (e += "-debug"), m.loadingHashResourceEnabled() && (e += "-" + A), e += ".css";
                        var n = document.querySelector("head"),
                            o = document.createElement("link");
                        (0, x["default"])(o, {
                            href: e,
                            id: "vk-player-css",
                            rel: "stylesheet"
                        }), n.appendChild(o)
                    }
                }
            }, {
                key: "loadWebVtt",
                value: function(t) {
                    if (!m.browser.isAmazonSilk()) return t();
                    var e = document.querySelector("head"),
                        n = document.createElement("script");
                    (0, x["default"])(n, {
                        id: "player-webvtt",
                        type: "text/javascript",
                        src: "//cdn.rawgit.com/gkatsev/vtt.js/vjs-v0.12.1/dist/vtt.min.js",
                        onload: t
                    }), e.appendChild(n)
                }
            }, {
                key: "loadIMA",
                value: function(t) {
                    var e = this,
                        n = "ima3.js";
                    m.debugModeEnabled() && (n = "ima3_debug.js");
                    var o = document.querySelector("head"),
                        r = document.createElement("script");
                    r.id = "player-ima", r.type = "text/javascript", r.src = "//imasdk.googleapis.com/js/sdkloader/" + n, r.onload = function() {
                        e.logger.log("ima3 is loaded"), e.initialize(t, e.options), e.logger.log("initialized");
                        try {
                            var n = y["default"].getAdTagUrl(e.options);
                            e.logger.log("adTagUrl: " + n), e.player.ima((0, x["default"])({
                                id: t,
                                adTagUrl: n,
                                vpaidMode: google.ima.ImaSdkSettings.VpaidMode.ENABLED,
                                contribAdsSettings: {
                                    debug: m.debugModeEnabled(),
                                    prerollTimeout: e.options.prerollTimeout || 100
                                }
                            }, e.options)), e.player.ima.setAdBreakReadyListener(function(t) {
                                e.logger.log("adBreakReady", t)
                            }), _.requestAds(e, e.store);
                            var o = document.querySelector("#ima-ad-container");
                            o && (o.style.display = "none"), _.handlePlayerEvents(e, e.timer)
                        } catch (r) {
                            e.logger.log("Something wrong when init ima", r)
                        }
                    }, r.onerror = function(n) {
                        e.logger.log("Cannot load ima3.js", n), e.initialize(t, e.options), _.handlePlayerEvents(e, e.timer)
                    }, this.logger.log("append ima script"), o.appendChild(r)
                }
            }, {
                key: "initialize",
                value: function(t, n) {
                    var o = this;
                    this.logger.log("Init player", n), n.children = ["mediaLoader", "vikiPosterImage", "textTrackDisplay", "loadingSpinner", "vikiBigPlayButton", "controlBar", "errorDisplay", "textTrackSettings"], n.controlBar = {
                        children: ["progressControl", "subControlBar"],
                        progressControl: {
                            seekBar: {
                                children: ["loadProgressBar", "vikiMouseTimeDisplay", "vikiPlayProgressBar"],
                                barName: "vikiPlayProgressBar"
                            }
                        }
                    }, m.browser.isAmazonSilk() && (n.html5 = n.html5 || {}, n.html5.nativeTextTracks = !1);
                    var r = [];
                    n.subtitles && (r = this.options.subtitles.sort(function(t, e) {
                        var n = e.percentage - t.percentage;
                        return 0 !== n ? n : t.srclang.localeCompare(e.srclang)
                    })), n.sortedSubtitles = r, this.player = e.createVideoJS(t, n), this.player.changeStreamQuality = this.setStreamQuality.bind(this), this.subtitle = C["default"].get(this, this.player), this.logger.log("Add subtitles");
                    for (var i = this.player.remoteTextTracks(), s = 0; s < i.length; s++) this.player.removeRemoteTextTrack(i[s]);
                    r.forEach(function(t) {
                        m.browser.isiOS() && (t.label = t.label.replace(/<[\/\w\s"=]+>/gi, "")), o.player.addRemoteTextTrack(t)
                    }), n.muted && this.player.muted(n.muted), m.browser.isIE() && this.player.addClass("vkp-ie")
                }
            }, {
                key: "getVideo",
                value: function() {
                    return this.options.video
                }
            }, {
                key: "getStreamQuality",
                value: function() {
                    return this.currentStreamQuality
                }
            }, {
                key: "setStreamQuality",
                value: function(t) {
                    if (this.getStreamQuality() !== t)
                        if (this.options.streams && this.options.streams[t]) {
                            var e = this.options.streams[t],
                                n = this.player.currentTime(),
                                o = this.player.paused(),
                                r = this.player;
                            r.src(""), r.src(e.https.url), r.currentTime(n), o || (r.addClass("vjs-waiting"), r.play()), this.currentStreamQuality = t, this.emit(_.STREAM_QUALITY_CHANGED, e)
                        } else this.emit(_.ERROR, new Error(t + " is not supported"))
                }
            }, {
                key: "getAdPosition",
                value: function(t) {
                    return 0 > t ? 100 : 0 === this.player.duration() ? 0 : t / this.player.duration() * 100
                }
            }, {
                key: "getCurrentSubtitle",
                value: function() {
                    return this.subtitle.currentSubtitle()
                }
            }, {
                key: "onAdReady",
                value: function() {
                    var t = this,
                        e = this.player.ima.getAdsManager(),
                        n = function() {
                            e.getCuePoints().forEach(function(e) {
                                var n = m.queryChild(t.player, "controlBar.progressControl.seekBar"),
                                    o = t.getAdPosition(e);
                                t.logger.log("Render ad cue points", o), 100 > o && n.addChild("AdCuePoint", {
                                    position: o
                                })
                            })
                        };
                    this.logger.log("Player duration", this.player.duration()), 0 === this.player.duration() ? this.once(_.VIDEO_DURATION_CHANGED, n) : n(), _.handleAdsEvents(this, e, this.timer, this.store), this.logger.log("Ads ready", this.width(), this.height());
                    var o = this.player.isFullscreen() ? google.ima.ViewMode.FULLSCREEN : google.ima.ViewMode.NORMAL;
                    e.resize(this.width(), this.height(), o)
                }
            }, {
                key: "onReady",
                value: function() {
                    var t = this;
                    if (this.logger.log("ready"), m.debugModeEnabled() || this.player.on("contextmenu", function(t) {
                            return t.preventDefault(), !1
                        }), this.logger.log("qualities", this.options.streams), this.options.streams) {
                        var e = Object.keys(this.options.streams).map(function(t) {
                            return parseInt(t.substring(0, t.length - 1), 10)
                        }).sort()[0];
                        this.setStreamQuality(e + "p")
                    }
                    setTimeout(function() {
                        var e = t.options.defaultSubtitle || "en";
                        t.logger.log("Change subtitle to " + e), t.setSubtitleLanguage(e)
                    }, 1e3)
                }
            }, {
                key: "width",
                value: function() {
                    return this.player && this.player.el().clientWidth || this.options.width
                }
            }, {
                key: "height",
                value: function() {
                    var t = this.width() / this.options.width;
                    return Math.ceil(t * this.options.height)
                }
            }, {
                key: "currentTime",
                value: function() {
                    return this.player.currentTime()
                }
            }, {
                key: "duration",
                value: function() {
                    return this.player.duration()
                }
            }, {
                key: "getCurrentTime",
                value: function() {
                    return this.currentTime()
                }
            }, {
                key: "playVideo",
                value: function() {
                    this.loaded && this.player.play()
                }
            }, {
                key: "pause",
                value: function() {
                    this.player.pause()
                }
            }, {
                key: "getSubtitleLanguage",
                value: function() {
                    return this.subtitle.currentLanguage()
                }
            }, {
                key: "setSubtitleLanguage",
                value: function(t) {
                    this.subtitle.setLanguage(t)
                }
            }]), e
        }(u.EventEmitter);
        window.VikiPlayer = L, L.Events = _, L.Analytics = v.Analytics, L.Raynor = S["default"], L.VERSION = M, n["default"] = L
    }, {
        "./analytics/index": 2,
        "./components/ad-cue-point": 4,
        "./components/control-bar/left": 7,
        "./components/control-bar/middle": 9,
        "./components/control-bar/right": 10,
        "./components/control-bar/sub": 11,
        "./components/control-bar/viki-big-play-button": 12,
        "./components/control-bar/viki-poster-image": 14,
        "./components/progress-control": 18,
        "./components/progress-control/viki-mouse-time-display": 21,
        "./components/progress-control/viki-play-progress-bar": 22,
        "./components/setting/menu-label": 26,
        "./components/setting/submenu-item": 29,
        "./components/setting/submenu-label": 30,
        "./components/setting/toggle": 32,
        "./components/setting/toggle-menu-item": 31,
        "./components/stream-quality-menu-button": 35,
        "./components/vikipass/ads-label": 41,
        "./config": 43,
        "./events": 44,
        "./logger": 45,
        "./presets": 49,
        "./raynor": 51,
        "./subtitle": 52,
        "./utils": 53,
        events: 54,
        "lodash/assign": 74,
        "video.js": 97,
        "videojs-contrib-ads": 98,
        "videojs-ima": 99
    }],
    47: [function(t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n["default"] = {
            cinemaMode: !0,
            fullscreenMode: !0,
            disableAds: !1
        }
    }, {}],
    48: [function(t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n["default"] = {
            cinemaMode: !1,
            fullscreenMode: !1,
            disableAds: !0,
            nativeControlsForTouch: !0
        }
    }, {}],
    49: [function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = t("./default"),
            i = o(r),
            s = t("./firefoxos"),
            a = o(s),
            l = t("./noads"),
            u = o(l),
            c = {
                firefoxos: a["default"],
                vikipass: u["default"],
                qc: u["default"],
                "default": i["default"]
            };
        n["default"] = {
            get: function(t) {
                return c[t] ? c[t] : c["default"]
            }
        }
    }, {
        "./default": 47,
        "./firefoxos": 48,
        "./noads": 50
    }],
    50: [function(t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n["default"] = {
            disableAds: !0
        }
    }, {}],
    51: [function(t, e, n) {
        "use strict";

        function o(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            i = function() {
                function t(e) {
                    o(this, t), this.raynor = e
                }
                return r(t, null, [{
                    key: "instance",
                    value: function(e) {
                        if (!t._instance || e) {
                            var n = e || window.raynor;
                            t._instance = new t(n)
                        }
                        return t._instance
                    }
                }]), r(t, [{
                    key: "setCinematicMode",
                    value: function(t) {
                        if (this.isModuleAvailabled(["cookieStorage", "cinematicMode"])) {
                            var e = this.raynor.cookieStorage,
                                n = this.raynor.cinematicMode;
                            e.save(n.storageKey, String(t))
                        }
                    }
                }, {
                    key: "isCinematicModeEnabled",
                    value: function() {
                        if (!this.isModuleAvailabled(["cookieStorage", "cinematicMode"])) return !1;
                        var t = this.raynor.cookieStorage,
                            e = this.raynor.cinematicMode;
                        return "true" === t.get(e.storageKey) || null === t.get(e.storageKey)
                    }
                }, {
                    key: "isModuleAvailabled",
                    value: function() {
                        var t = this,
                            e = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0];
                        return this.raynor ? e.reduce(function(e, n) {
                            return e && !!t.raynor[n]
                        }, !0) : !1
                    }
                }]), t
            }();
        n["default"] = i
    }, {}],
    52: [function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            s = t("lodash/pick"),
            a = o(s),
            l = t("./logger"),
            u = o(l),
            c = function() {
                function t(e, n) {
                    r(this, t), this.player = e, this.videojs = n
                }
                return i(t, null, [{
                    key: "get",
                    value: function(e, n) {
                        return e && n && (t._instance = new t(e, n)), t._instance
                    }
                }]), i(t, [{
                    key: "currentSubtitle",
                    value: function() {
                        var t = this.player;
                        if (!t.options.subtitles) return null;
                        if (!t.currentSubtitleLanguage) return null;
                        for (var e in t.options.subtitles)
                            if (t.options.subtitles[e]) {
                                var n = t.options.subtitles[e];
                                if (n.srclang === t.currentSubtitleLanguage) return (0, a["default"])(n, ["kind", "label", "percentage", "srclang", "default"])
                            }
                        return null
                    }
                }, {
                    key: "list",
                    value: function() {
                        return this.player.options.sortedSubtitles
                    }
                }, {
                    key: "currentLanguage",
                    value: function() {
                        var t = this.currentSubtitle() || {
                            srclang: ""
                        };
                        return t.srclang
                    }
                }, {
                    key: "previousLanguage",
                    value: function() {
                        var t = this.previousSubtitle || {
                            srclang: ""
                        };
                        return t.srclang
                    }
                }, {
                    key: "setLanguage",
                    value: function(t) {
                        u["default"].log("set subtitle to " + t), this.previousSubtitle = this.currentSubtitle();
                        for (var e = this.videojs.textTracks(), n = 0; n < e.length; n++) e[n].mode = "hidden", e[n].language === t && (e[n].mode = "showing")
                    }
                }]), t
            }();
        n["default"] = c
    }, {
        "./logger": 45,
        "lodash/pick": 87
    }],
    53: [function(t, e, n) {
        "use strict";

        function o(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            var n = e.split("."),
                o = t;
            for (var r in n)
                if (n[r]) {
                    var i = n[r];
                    o = o.getChild(i)
                }
            return o
        }

        function i(t) {
            return (new Date).getTime() / (t ? 1e3 : 1)
        }

        function s() {
            return !1
        }

        function a() {
            return !0
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.screen = n.browser = n.math = void 0, n.queryChild = r, n.timestamp = i, n.debugModeEnabled = s, n.loadingHashResourceEnabled = a;
        var l = t("video.js"),
            u = o(l);
        n.math = {
            trunc: function(t) {
                var e = Math.trunc || function(t) {
                    return 0 > t ? Math.ceil(t) : Math.floor(t)
                };
                return e(t)
            }
        }, n.browser = {
            getUserAgent: function() {
                return navigator.userAgent
            },
            isAmazonSilk: function() {
                var t = this.getUserAgent();
                return t.toLowerCase().indexOf("silk") >= 0
            },
            isIE: function() {
                var t = this.getUserAgent();
                return t.toLowerCase().indexOf("trident") >= 0
            },
            isiOS: function() {
                return u["default"].browser.IS_IOS
            },
            isAndroid: function() {
                return u["default"].browser.IS_ANDROID
            },
            isTouchEnabled: function() {
                return u["default"].browser.TOUCH_ENABLED
            }
        }, n.screen = {
            isTinyScreen: function(t) {
                return t.el().clientWidth <= 360
            },
            isSmallScreen: function(t) {
                return t.el().clientWidth <= 400
            }
        }
    }, {
        "video.js": 97
    }],
    54: [function(t, e, n) {
        function o() {
            this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
        }

        function r(t) {
            return "function" == typeof t
        }

        function i(t) {
            return "number" == typeof t
        }

        function s(t) {
            return "object" == typeof t && null !== t
        }

        function a(t) {
            return void 0 === t
        }
        e.exports = o, o.EventEmitter = o, o.prototype._events = void 0, o.prototype._maxListeners = void 0, o.defaultMaxListeners = 10, o.prototype.setMaxListeners = function(t) {
            if (!i(t) || 0 > t || isNaN(t)) throw TypeError("n must be a positive number");
            return this._maxListeners = t, this
        }, o.prototype.emit = function(t) {
            var e, n, o, i, l, u;
            if (this._events || (this._events = {}), "error" === t && (!this._events.error || s(this._events.error) && !this._events.error.length)) {
                if (e = arguments[1], e instanceof Error) throw e;
                throw TypeError('Uncaught, unspecified "error" event.')
            }
            if (n = this._events[t], a(n)) return !1;
            if (r(n)) switch (arguments.length) {
                case 1:
                    n.call(this);
                    break;
                case 2:
                    n.call(this, arguments[1]);
                    break;
                case 3:
                    n.call(this, arguments[1], arguments[2]);
                    break;
                default:
                    i = Array.prototype.slice.call(arguments, 1), n.apply(this, i)
            } else if (s(n))
                for (i = Array.prototype.slice.call(arguments, 1), u = n.slice(), o = u.length, l = 0; o > l; l++) u[l].apply(this, i);
            return !0
        }, o.prototype.addListener = function(t, e) {
            var n;
            if (!r(e)) throw TypeError("listener must be a function");
            return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", t, r(e.listener) ? e.listener : e), this._events[t] ? s(this._events[t]) ? this._events[t].push(e) : this._events[t] = [this._events[t], e] : this._events[t] = e, s(this._events[t]) && !this._events[t].warned && (n = a(this._maxListeners) ? o.defaultMaxListeners : this._maxListeners, n && n > 0 && this._events[t].length > n && (this._events[t].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[t].length), "function" == typeof console.trace && console.trace())), this
        }, o.prototype.on = o.prototype.addListener, o.prototype.once = function(t, e) {
            function n() {
                this.removeListener(t, n), o || (o = !0, e.apply(this, arguments))
            }
            if (!r(e)) throw TypeError("listener must be a function");
            var o = !1;
            return n.listener = e, this.on(t, n), this
        }, o.prototype.removeListener = function(t, e) {
            var n, o, i, a;
            if (!r(e)) throw TypeError("listener must be a function");
            if (!this._events || !this._events[t]) return this;
            if (n = this._events[t], i = n.length, o = -1, n === e || r(n.listener) && n.listener === e) delete this._events[t], this._events.removeListener && this.emit("removeListener", t, e);
            else if (s(n)) {
                for (a = i; a-- > 0;)
                    if (n[a] === e || n[a].listener && n[a].listener === e) {
                        o = a;
                        break
                    }
                if (0 > o) return this;
                1 === n.length ? (n.length = 0, delete this._events[t]) : n.splice(o, 1), this._events.removeListener && this.emit("removeListener", t, e)
            }
            return this
        }, o.prototype.removeAllListeners = function(t) {
            var e, n;
            if (!this._events) return this;
            if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[t] && delete this._events[t], this;
            if (0 === arguments.length) {
                for (e in this._events) "removeListener" !== e && this.removeAllListeners(e);
                return this.removeAllListeners("removeListener"), this._events = {}, this
            }
            if (n = this._events[t], r(n)) this.removeListener(t, n);
            else if (n)
                for (; n.length;) this.removeListener(t, n[n.length - 1]);
            return delete this._events[t], this
        }, o.prototype.listeners = function(t) {
            var e;
            return e = this._events && this._events[t] ? r(this._events[t]) ? [this._events[t]] : this._events[t].slice() : []
        }, o.prototype.listenerCount = function(t) {
            if (this._events) {
                var e = this._events[t];
                if (r(e)) return 1;
                if (e) return e.length
            }
            return 0
        }, o.listenerCount = function(t, e) {
            return t.listenerCount(e)
        }
    }, {}],
    55: [function(t, e, n) {
        function o(t, e, n) {
            var o = n.length;
            switch (o) {
                case 0:
                    return t.call(e);
                case 1:
                    return t.call(e, n[0]);
                case 2:
                    return t.call(e, n[0], n[1]);
                case 3:
                    return t.call(e, n[0], n[1], n[2])
            }
            return t.apply(e, n)
        }
        e.exports = o
    }, {}],
    56: [function(t, e, n) {
        function o(t, e) {
            for (var n = -1, o = e.length, r = t.length; ++n < o;) t[r + n] = e[n];
            return t
        }
        e.exports = o
    }, {}],
    57: [function(t, e, n) {
        function o(t, e, n, o) {
            var r = -1,
                i = t.length;
            for (o && i && (n = t[++r]); ++r < i;) n = e(n, t[r], r, t);
            return n
        }
        e.exports = o
    }, {}],
    58: [function(t, e, n) {
        function o(t, e, n) {
            var o = t[e];
            s.call(t, e) && r(o, n) && (void 0 !== n || e in t) || (t[e] = n)
        }
        var r = t("./eq"),
            i = Object.prototype,
            s = i.hasOwnProperty;
        e.exports = o
    }, {
        "./eq": 75
    }],
    59: [function(t, e, n) {
        function o(t, e, n, l) {
            l || (l = []);
            for (var u = -1, c = t.length; ++u < c;) {
                var p = t[u];
                e > 0 && a(p) && (n || s(p) || i(p)) ? e > 1 ? o(p, e - 1, n, l) : r(l, p) : n || (l[l.length] = p)
            }
            return l
        }
        var r = t("./_arrayPush"),
            i = t("./isArguments"),
            s = t("./isArray"),
            a = t("./isArrayLikeObject");
        e.exports = o
    }, {
        "./_arrayPush": 56,
        "./isArguments": 76,
        "./isArray": 77,
        "./isArrayLikeObject": 79
    }],
    60: [function(t, e, n) {
        function o(t, e) {
            return s.call(t, e) || "object" == typeof t && e in t && null === r(t)
        }
        var r = t("./_getPrototype"),
            i = Object.prototype,
            s = i.hasOwnProperty;
        e.exports = o
    }, {
        "./_getPrototype": 69
    }],
    61: [function(t, e, n) {
        function o(t) {
            return r(Object(t))
        }
        var r = Object.keys;
        e.exports = o
    }, {}],
    62: [function(t, e, n) {
        function o(t, e) {
            return t = Object(t), r(e, function(e, n) {
                return n in t && (e[n] = t[n]), e
            }, {})
        }
        var r = t("./_arrayReduce");
        e.exports = o
    }, {
        "./_arrayReduce": 57
    }],
    63: [function(t, e, n) {
        function o(t) {
            return function(e) {
                return null == e ? void 0 : e[t]
            }
        }
        e.exports = o
    }, {}],
    64: [function(t, e, n) {
        function o(t, e) {
            for (var n = -1, o = Array(t); ++n < t;) o[n] = e(n);
            return o
        }
        e.exports = o
    }, {}],
    65: [function(t, e, n) {
        function o(t, e, n) {
            return r(t, e, n)
        }
        var r = t("./_copyObjectWith");
        e.exports = o
    }, {
        "./_copyObjectWith": 66
    }],
    66: [function(t, e, n) {
        function o(t, e, n, o) {
            n || (n = {});
            for (var i = -1, s = e.length; ++i < s;) {
                var a = e[i],
                    l = o ? o(n[a], t[a], a, n, t) : t[a];
                r(n, a, l)
            }
            return n
        }
        var r = t("./_assignValue");
        e.exports = o
    }, {
        "./_assignValue": 58
    }],
    67: [function(t, e, n) {
        function o(t) {
            return i(function(e, n) {
                var o = -1,
                    i = n.length,
                    s = i > 1 ? n[i - 1] : void 0,
                    a = i > 2 ? n[2] : void 0;
                for (s = "function" == typeof s ? (i--, s) : void 0, a && r(n[0], n[1], a) && (s = 3 > i ? void 0 : s, i = 1), e = Object(e); ++o < i;) {
                    var l = n[o];
                    l && t(e, l, o, s)
                }
                return e
            })
        }
        var r = t("./_isIterateeCall"),
            i = t("./rest");
        e.exports = o
    }, {
        "./_isIterateeCall": 72,
        "./rest": 88
    }],
    68: [function(t, e, n) {
        var o = t("./_baseProperty"),
            r = o("length");
        e.exports = r
    }, {
        "./_baseProperty": 63
    }],
    69: [function(t, e, n) {
        function o(t) {
            return r(Object(t))
        }
        var r = Object.getPrototypeOf;
        e.exports = o
    }, {}],
    70: [function(t, e, n) {
        function o(t) {
            var e = t ? t.length : void 0;
            return a(e) && (s(t) || l(t) || i(t)) ? r(e, String) : null
        }
        var r = t("./_baseTimes"),
            i = t("./isArguments"),
            s = t("./isArray"),
            a = t("./isLength"),
            l = t("./isString");
        e.exports = o
    }, {
        "./_baseTimes": 64,
        "./isArguments": 76,
        "./isArray": 77,
        "./isLength": 81,
        "./isString": 84
    }],
    71: [function(t, e, n) {
        function o(t, e) {
            return t = "number" == typeof t || i.test(t) ? +t : -1, e = null == e ? r : e, t > -1 && t % 1 == 0 && e > t
        }
        var r = 9007199254740991,
            i = /^(?:0|[1-9]\d*)$/;
        e.exports = o
    }, {}],
    72: [function(t, e, n) {
        function o(t, e, n) {
            if (!a(n)) return !1;
            var o = typeof e;
            return ("number" == o ? i(n) && s(e, n.length) : "string" == o && e in n) ? r(n[e], t) : !1
        }
        var r = t("./eq"),
            i = t("./isArrayLike"),
            s = t("./_isIndex"),
            a = t("./isObject");
        e.exports = o
    }, {
        "./_isIndex": 71,
        "./eq": 75,
        "./isArrayLike": 78,
        "./isObject": 82
    }],
    73: [function(t, e, n) {
        function o(t) {
            var e = t && t.constructor,
                n = "function" == typeof e && e.prototype || r;
            return t === n
        }
        var r = Object.prototype;
        e.exports = o
    }, {}],
    74: [function(t, e, n) {
        var o = t("./_assignValue"),
            r = t("./_copyObject"),
            i = t("./_createAssigner"),
            s = t("./isArrayLike"),
            a = t("./_isPrototype"),
            l = t("./keys"),
            u = Object.prototype,
            c = u.hasOwnProperty,
            p = u.propertyIsEnumerable,
            f = !p.call({
                valueOf: 1
            }, "valueOf"),
            d = i(function(t, e) {
                if (f || a(e) || s(e)) return void r(e, l(e), t);
                for (var n in e) c.call(e, n) && o(t, n, e[n])
            });
        e.exports = d
    }, {
        "./_assignValue": 58,
        "./_copyObject": 65,
        "./_createAssigner": 67,
        "./_isPrototype": 73,
        "./isArrayLike": 78,
        "./keys": 86
    }],
    75: [function(t, e, n) {
        function o(t, e) {
            return t === e || t !== t && e !== e
        }
        e.exports = o
    }, {}],
    76: [function(t, e, n) {
        function o(t) {
            return r(t) && a.call(t, "callee") && (!u.call(t, "callee") || l.call(t) == i)
        }
        var r = t("./isArrayLikeObject"),
            i = "[object Arguments]",
            s = Object.prototype,
            a = s.hasOwnProperty,
            l = s.toString,
            u = s.propertyIsEnumerable;
        e.exports = o
    }, {
        "./isArrayLikeObject": 79
    }],
    77: [function(t, e, n) {
        var o = Array.isArray;
        e.exports = o
    }, {}],
    78: [function(t, e, n) {
        function o(t) {
            return null != t && s(r(t)) && !i(t)
        }
        var r = t("./_getLength"),
            i = t("./isFunction"),
            s = t("./isLength");
        e.exports = o
    }, {
        "./_getLength": 68,
        "./isFunction": 80,
        "./isLength": 81
    }],
    79: [function(t, e, n) {
        function o(t) {
            return i(t) && r(t)
        }
        var r = t("./isArrayLike"),
            i = t("./isObjectLike");
        e.exports = o
    }, {
        "./isArrayLike": 78,
        "./isObjectLike": 83
    }],
    80: [function(t, e, n) {
        function o(t) {
            var e = r(t) ? l.call(t) : "";
            return e == i || e == s
        }
        var r = t("./isObject"),
            i = "[object Function]",
            s = "[object GeneratorFunction]",
            a = Object.prototype,
            l = a.toString;
        e.exports = o
    }, {
        "./isObject": 82
    }],
    81: [function(t, e, n) {
        function o(t) {
            return "number" == typeof t && t > -1 && t % 1 == 0 && r >= t
        }
        var r = 9007199254740991;
        e.exports = o
    }, {}],
    82: [function(t, e, n) {
        function o(t) {
            var e = typeof t;
            return !!t && ("object" == e || "function" == e)
        }
        e.exports = o
    }, {}],
    83: [function(t, e, n) {
        function o(t) {
            return !!t && "object" == typeof t
        }
        e.exports = o
    }, {}],
    84: [function(t, e, n) {
        function o(t) {
            return "string" == typeof t || !r(t) && i(t) && l.call(t) == s
        }
        var r = t("./isArray"),
            i = t("./isObjectLike"),
            s = "[object String]",
            a = Object.prototype,
            l = a.toString;
        e.exports = o
    }, {
        "./isArray": 77,
        "./isObjectLike": 83
    }],
    85: [function(t, e, n) {
        function o(t) {
            return "symbol" == typeof t || r(t) && a.call(t) == i
        }
        var r = t("./isObjectLike"),
            i = "[object Symbol]",
            s = Object.prototype,
            a = s.toString;
        e.exports = o
    }, {
        "./isObjectLike": 83
    }],
    86: [function(t, e, n) {
        function o(t) {
            var e = u(t);
            if (!e && !a(t)) return i(t);
            var n = s(t),
                o = !!n,
                c = n || [],
                p = c.length;
            for (var f in t) !r(t, f) || o && ("length" == f || l(f, p)) || e && "constructor" == f || c.push(f);
            return c
        }
        var r = t("./_baseHas"),
            i = t("./_baseKeys"),
            s = t("./_indexKeys"),
            a = t("./isArrayLike"),
            l = t("./_isIndex"),
            u = t("./_isPrototype");
        e.exports = o
    }, {
        "./_baseHas": 60,
        "./_baseKeys": 61,
        "./_indexKeys": 70,
        "./_isIndex": 71,
        "./_isPrototype": 73,
        "./isArrayLike": 78
    }],
    87: [function(t, e, n) {
        var o = t("./_baseFlatten"),
            r = t("./_basePick"),
            i = t("./rest"),
            s = i(function(t, e) {
                return null == t ? {} : r(t, o(e, 1))
            });
        e.exports = s
    }, {
        "./_baseFlatten": 59,
        "./_basePick": 62,
        "./rest": 88
    }],
    88: [function(t, e, n) {
        function o(t, e) {
            if ("function" != typeof t) throw new TypeError(s);
            return e = a(void 0 === e ? t.length - 1 : i(e), 0),
                function() {
                    for (var n = arguments, o = -1, i = a(n.length - e, 0), s = Array(i); ++o < i;) s[o] = n[e + o];
                    switch (e) {
                        case 0:
                            return t.call(this, s);
                        case 1:
                            return t.call(this, n[0], s);
                        case 2:
                            return t.call(this, n[0], n[1], s)
                    }
                    var l = Array(e + 1);
                    for (o = -1; ++o < e;) l[o] = n[o];
                    return l[e] = s, r(t, this, l)
                }
        }
        var r = t("./_apply"),
            i = t("./toInteger"),
            s = "Expected a function",
            a = Math.max;
        e.exports = o
    }, {
        "./_apply": 55,
        "./toInteger": 89
    }],
    89: [function(t, e, n) {
        function o(t) {
            if (!t) return 0 === t ? t : 0;
            if (t = r(t), t === i || t === -i) {
                var e = 0 > t ? -1 : 1;
                return e * s
            }
            var n = t % 1;
            return t === t ? n ? t - n : t : 0
        }
        var r = t("./toNumber"),
            i = 1 / 0,
            s = 1.7976931348623157e308;
        e.exports = o
    }, {
        "./toNumber": 90
    }],
    90: [function(t, e, n) {
        function o(t) {
            if ("number" == typeof t) return t;
            if (s(t)) return a;
            if (i(t)) {
                var e = r(t.valueOf) ? t.valueOf() : t;
                t = i(e) ? e + "" : e
            }
            if ("string" != typeof t) return 0 === t ? t : +t;
            t = t.replace(l, "");
            var n = c.test(t);
            return n || p.test(t) ? f(t.slice(2), n ? 2 : 8) : u.test(t) ? a : +t
        }
        var r = t("./isFunction"),
            i = t("./isObject"),
            s = t("./isSymbol"),
            a = NaN,
            l = /^\s+|\s+$/g,
            u = /^[-+]0x[0-9a-f]+$/i,
            c = /^0b[01]+$/i,
            p = /^0o[0-7]+$/i,
            f = parseInt;
        e.exports = o
    }, {
        "./isFunction": 80,
        "./isObject": 82,
        "./isSymbol": 85
    }],
    91: [function(t, e, n) {
        (function(t) {
            ! function(o) {
                function r(t) {
                    throw new RangeError(L[t])
                }

                function i(t, e) {
                    for (var n = t.length, o = []; n--;) o[n] = e(t[n]);
                    return o
                }

                function s(t, e) {
                    var n = t.split("@"),
                        o = "";
                    n.length > 1 && (o = n[0] + "@", t = n[1]), t = t.replace(M, ".");
                    var r = t.split("."),
                        s = i(r, e).join(".");
                    return o + s
                }

                function a(t) {
                    for (var e, n, o = [], r = 0, i = t.length; i > r;) e = t.charCodeAt(r++), e >= 55296 && 56319 >= e && i > r ? (n = t.charCodeAt(r++), 56320 == (64512 & n) ? o.push(((1023 & e) << 10) + (1023 & n) + 65536) : (o.push(e), r--)) : o.push(e);
                    return o
                }

                function l(t) {
                    return i(t, function(t) {
                        var e = "";
                        return t > 65535 && (t -= 65536, e += R(t >>> 10 & 1023 | 55296), t = 56320 | 1023 & t), e += R(t)
                    }).join("")
                }

                function u(t) {
                    return 10 > t - 48 ? t - 22 : 26 > t - 65 ? t - 65 : 26 > t - 97 ? t - 97 : w
                }

                function c(t, e) {
                    return t + 22 + 75 * (26 > t) - ((0 != e) << 5)
                }

                function p(t, e, n) {
                    var o = 0;
                    for (t = n ? D(t / C) : t >> 1, t += D(t / e); t > I * T >> 1; o += w) t = D(t / I);
                    return D(o + (I + 1) * t / (t + E))
                }

                function f(t) {
                    var e, n, o, i, s, a, c, f, d, h, y = [],
                        v = t.length,
                        g = 0,
                        m = S,
                        b = k;
                    for (n = t.lastIndexOf(P), 0 > n && (n = 0), o = 0; n > o; ++o) t.charCodeAt(o) >= 128 && r("not-basic"), y.push(t.charCodeAt(o));
                    for (i = n > 0 ? n + 1 : 0; v > i;) {
                        for (s = g, a = 1, c = w; i >= v && r("invalid-input"), f = u(t.charCodeAt(i++)), (f >= w || f > D((j - g) / a)) && r("overflow"), g += f * a, d = b >= c ? O : c >= b + T ? T : c - b, !(d > f); c += w) h = w - d, a > D(j / h) && r("overflow"), a *= h;
                        e = y.length + 1, b = p(g - s, e, 0 == s), D(g / e) > j - m && r("overflow"), m += D(g / e), g %= e, y.splice(g++, 0, m)
                    }
                    return l(y)
                }

                function d(t) {
                    var e, n, o, i, s, l, u, f, d, h, y, v, g, m, b, _ = [];
                    for (t = a(t), v = t.length, e = S, n = 0, s = k, l = 0; v > l; ++l) y = t[l], 128 > y && _.push(R(y));
                    for (o = i = _.length, i && _.push(P); v > o;) {
                        for (u = j, l = 0; v > l; ++l) y = t[l], y >= e && u > y && (u = y);
                        for (g = o + 1, u - e > D((j - n) / g) && r("overflow"), n += (u - e) * g, e = u, l = 0; v > l; ++l)
                            if (y = t[l], e > y && ++n > j && r("overflow"), y == e) {
                                for (f = n, d = w; h = s >= d ? O : d >= s + T ? T : d - s, !(h > f); d += w) b = f - h, m = w - h, _.push(R(c(h + b % m, 0))), f = D(b / m);
                                _.push(R(c(f, 0))), s = p(n, g, o == i), n = 0, ++o
                            }++n, ++e
                    }
                    return _.join("")
                }

                function h(t) {
                    return s(t, function(t) {
                        return x.test(t) ? f(t.slice(4).toLowerCase()) : t
                    })
                }

                function y(t) {
                    return s(t, function(t) {
                        return A.test(t) ? "xn--" + d(t) : t
                    })
                }
                var v = "object" == typeof n && n && !n.nodeType && n,
                    g = "object" == typeof e && e && !e.nodeType && e,
                    m = "object" == typeof t && t;
                m.global !== m && m.window !== m && m.self !== m || (o = m);
                var b, _, j = 2147483647,
                    w = 36,
                    O = 1,
                    T = 26,
                    E = 38,
                    C = 700,
                    k = 72,
                    S = 128,
                    P = "-",
                    x = /^xn--/,
                    A = /[^\x20-\x7E]/,
                    M = /[\x2E\u3002\uFF0E\uFF61]/g,
                    L = {
                        overflow: "Overflow: input needs wider integers to process",
                        "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                        "invalid-input": "Invalid input"
                    },
                    I = w - O,
                    D = Math.floor,
                    R = String.fromCharCode;
                if (b = {
                        version: "1.4.1",
                        ucs2: {
                            decode: a,
                            encode: l
                        },
                        decode: f,
                        encode: d,
                        toASCII: y,
                        toUnicode: h
                    }, "function" == typeof define && "object" == typeof define.amd && define.amd) define("punycode", function() {
                    return b
                });
                else if (v && g)
                    if (e.exports == v) g.exports = b;
                    else
                        for (_ in b) b.hasOwnProperty(_) && (v[_] = b[_]);
                else o.punycode = b
            }(this)
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    92: [function(t, e, n) {
        "use strict";

        function o(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }
        e.exports = function(t, e, n, i) {
            e = e || "&", n = n || "=";
            var s = {};
            if ("string" != typeof t || 0 === t.length) return s;
            var a = /\+/g;
            t = t.split(e);
            var l = 1e3;
            i && "number" == typeof i.maxKeys && (l = i.maxKeys);
            var u = t.length;
            l > 0 && u > l && (u = l);
            for (var c = 0; u > c; ++c) {
                var p, f, d, h, y = t[c].replace(a, "%20"),
                    v = y.indexOf(n);
                v >= 0 ? (p = y.substr(0, v), f = y.substr(v + 1)) : (p = y, f = ""), d = decodeURIComponent(p), h = decodeURIComponent(f), o(s, d) ? r(s[d]) ? s[d].push(h) : s[d] = [s[d], h] : s[d] = h
            }
            return s
        };
        var r = Array.isArray || function(t) {
            return "[object Array]" === Object.prototype.toString.call(t)
        }
    }, {}],
    93: [function(t, e, n) {
        "use strict";

        function o(t, e) {
            if (t.map) return t.map(e);
            for (var n = [], o = 0; o < t.length; o++) n.push(e(t[o], o));
            return n
        }
        var r = function(t) {
            switch (typeof t) {
                case "string":
                    return t;
                case "boolean":
                    return t ? "true" : "false";
                case "number":
                    return isFinite(t) ? t : "";
                default:
                    return ""
            }
        };
        e.exports = function(t, e, n, a) {
            return e = e || "&", n = n || "=", null === t && (t = void 0), "object" == typeof t ? o(s(t), function(s) {
                var a = encodeURIComponent(r(s)) + n;
                return i(t[s]) ? o(t[s], function(t) {
                    return a + encodeURIComponent(r(t))
                }).join(e) : a + encodeURIComponent(r(t[s]))
            }).join(e) : a ? encodeURIComponent(r(a)) + n + encodeURIComponent(r(t)) : ""
        };
        var i = Array.isArray || function(t) {
                return "[object Array]" === Object.prototype.toString.call(t)
            },
            s = Object.keys || function(t) {
                var e = [];
                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e.push(n);
                return e
            }
    }, {}],
    94: [function(t, e, n) {
        "use strict";
        n.decode = n.parse = t("./decode"), n.encode = n.stringify = t("./encode")
    }, {
        "./decode": 92,
        "./encode": 93
    }],
    95: [function(t, e, n) {
        "use strict";

        function o() {
            this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null
        }

        function r(t, e, n) {
            if (t && u.isObject(t) && t instanceof o) return t;
            var r = new o;
            return r.parse(t, e, n), r
        }

        function i(t) {
            return u.isString(t) && (t = r(t)), t instanceof o ? t.format() : o.prototype.format.call(t)
        }

        function s(t, e) {
            return r(t, !1, !0).resolve(e)
        }

        function a(t, e) {
            return t ? r(t, !1, !0).resolveObject(e) : e
        }
        var l = t("punycode"),
            u = t("./util");
        n.parse = r, n.resolve = s, n.resolveObject = a, n.format = i, n.Url = o;
        var c = /^([a-z0-9.+-]+:)/i,
            p = /:[0-9]*$/,
            f = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
            d = ["<", ">", '"', "`", " ", "\r", "\n", "	"],
            h = ["{", "}", "|", "\\", "^", "`"].concat(d),
            y = ["'"].concat(h),
            v = ["%", "/", "?", ";", "#"].concat(y),
            g = ["/", "?", "#"],
            m = 255,
            b = /^[+a-z0-9A-Z_-]{0,63}$/,
            _ = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
            j = {
                javascript: !0,
                "javascript:": !0
            },
            w = {
                javascript: !0,
                "javascript:": !0
            },
            O = {
                http: !0,
                https: !0,
                ftp: !0,
                gopher: !0,
                file: !0,
                "http:": !0,
                "https:": !0,
                "ftp:": !0,
                "gopher:": !0,
                "file:": !0
            },
            T = t("querystring");
        o.prototype.parse = function(t, e, n) {
            if (!u.isString(t)) throw new TypeError("Parameter 'url' must be a string, not " + typeof t);
            var o = t.indexOf("?"),
                r = -1 !== o && o < t.indexOf("#") ? "?" : "#",
                i = t.split(r),
                s = /\\/g;
            i[0] = i[0].replace(s, "/"), t = i.join(r);
            var a = t;
            if (a = a.trim(), !n && 1 === t.split("#").length) {
                var p = f.exec(a);
                if (p) return this.path = a, this.href = a, this.pathname = p[1], p[2] ? (this.search = p[2], e ? this.query = T.parse(this.search.substr(1)) : this.query = this.search.substr(1)) : e && (this.search = "", this.query = {}), this
            }
            var d = c.exec(a);
            if (d) {
                d = d[0];
                var h = d.toLowerCase();
                this.protocol = h, a = a.substr(d.length)
            }
            if (n || d || a.match(/^\/\/[^@\/]+@[^@\/]+/)) {
                var E = "//" === a.substr(0, 2);
                !E || d && w[d] || (a = a.substr(2), this.slashes = !0)
            }
            if (!w[d] && (E || d && !O[d])) {
                for (var C = -1, k = 0; k < g.length; k++) {
                    var S = a.indexOf(g[k]); - 1 !== S && (-1 === C || C > S) && (C = S)
                }
                var P, x;
                x = -1 === C ? a.lastIndexOf("@") : a.lastIndexOf("@", C), -1 !== x && (P = a.slice(0, x), a = a.slice(x + 1), this.auth = decodeURIComponent(P)), C = -1;
                for (var k = 0; k < v.length; k++) {
                    var S = a.indexOf(v[k]); - 1 !== S && (-1 === C || C > S) && (C = S)
                } - 1 === C && (C = a.length), this.host = a.slice(0, C), a = a.slice(C), this.parseHost(), this.hostname = this.hostname || "";
                var A = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
                if (!A)
                    for (var M = this.hostname.split(/\./), k = 0, L = M.length; L > k; k++) {
                        var I = M[k];
                        if (I && !I.match(b)) {
                            for (var D = "", R = 0, N = I.length; N > R; R++) D += I.charCodeAt(R) > 127 ? "x" : I[R];
                            if (!D.match(b)) {
                                var F = M.slice(0, k),
                                    B = M.slice(k + 1),
                                    H = I.match(_);
                                H && (F.push(H[1]), B.unshift(H[2])), B.length && (a = "/" + B.join(".") + a), this.hostname = F.join(".");
                                break
                            }
                        }
                    }
                this.hostname.length > m ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), A || (this.hostname = l.toASCII(this.hostname));
                var U = this.port ? ":" + this.port : "",
                    V = this.hostname || "";
                this.host = V + U, this.href += this.host, A && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), "/" !== a[0] && (a = "/" + a))
            }
            if (!j[h])
                for (var k = 0, L = y.length; L > k; k++) {
                    var q = y[k];
                    if (-1 !== a.indexOf(q)) {
                        var $ = encodeURIComponent(q);
                        $ === q && ($ = escape(q)), a = a.split(q).join($)
                    }
                }
            var W = a.indexOf("#"); - 1 !== W && (this.hash = a.substr(W), a = a.slice(0, W));
            var G = a.indexOf("?");
            if (-1 !== G ? (this.search = a.substr(G), this.query = a.substr(G + 1), e && (this.query = T.parse(this.query)), a = a.slice(0, G)) : e && (this.search = "", this.query = {}), a && (this.pathname = a), O[h] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
                var U = this.pathname || "",
                    z = this.search || "";
                this.path = U + z
            }
            return this.href = this.format(), this
        }, o.prototype.format = function() {
            var t = this.auth || "";
            t && (t = encodeURIComponent(t), t = t.replace(/%3A/i, ":"), t += "@");
            var e = this.protocol || "",
                n = this.pathname || "",
                o = this.hash || "",
                r = !1,
                i = "";
            this.host ? r = t + this.host : this.hostname && (r = t + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"), this.port && (r += ":" + this.port)), this.query && u.isObject(this.query) && Object.keys(this.query).length && (i = T.stringify(this.query));
            var s = this.search || i && "?" + i || "";
            return e && ":" !== e.substr(-1) && (e += ":"), this.slashes || (!e || O[e]) && r !== !1 ? (r = "//" + (r || ""), n && "/" !== n.charAt(0) && (n = "/" + n)) : r || (r = ""), o && "#" !== o.charAt(0) && (o = "#" + o), s && "?" !== s.charAt(0) && (s = "?" + s), n = n.replace(/[?#]/g, function(t) {
                return encodeURIComponent(t)
            }), s = s.replace("#", "%23"), e + r + n + s + o
        }, o.prototype.resolve = function(t) {
            return this.resolveObject(r(t, !1, !0)).format()
        }, o.prototype.resolveObject = function(t) {
            if (u.isString(t)) {
                var e = new o;
                e.parse(t, !1, !0), t = e
            }
            for (var n = new o, r = Object.keys(this), i = 0; i < r.length; i++) {
                var s = r[i];
                n[s] = this[s]
            }
            if (n.hash = t.hash, "" === t.href) return n.href = n.format(), n;
            if (t.slashes && !t.protocol) {
                for (var a = Object.keys(t), l = 0; l < a.length; l++) {
                    var c = a[l];
                    "protocol" !== c && (n[c] = t[c])
                }
                return O[n.protocol] && n.hostname && !n.pathname && (n.path = n.pathname = "/"), n.href = n.format(), n
            }
            if (t.protocol && t.protocol !== n.protocol) {
                if (!O[t.protocol]) {
                    for (var p = Object.keys(t), f = 0; f < p.length; f++) {
                        var d = p[f];
                        n[d] = t[d]
                    }
                    return n.href = n.format(), n
                }
                if (n.protocol = t.protocol, t.host || w[t.protocol]) n.pathname = t.pathname;
                else {
                    for (var h = (t.pathname || "").split("/"); h.length && !(t.host = h.shift()););
                    t.host || (t.host = ""), t.hostname || (t.hostname = ""), "" !== h[0] && h.unshift(""), h.length < 2 && h.unshift(""), n.pathname = h.join("/")
                }
                if (n.search = t.search, n.query = t.query, n.host = t.host || "", n.auth = t.auth, n.hostname = t.hostname || t.host, n.port = t.port, n.pathname || n.search) {
                    var y = n.pathname || "",
                        v = n.search || "";
                    n.path = y + v
                }
                return n.slashes = n.slashes || t.slashes, n.href = n.format(), n
            }
            var g = n.pathname && "/" === n.pathname.charAt(0),
                m = t.host || t.pathname && "/" === t.pathname.charAt(0),
                b = m || g || n.host && t.pathname,
                _ = b,
                j = n.pathname && n.pathname.split("/") || [],
                h = t.pathname && t.pathname.split("/") || [],
                T = n.protocol && !O[n.protocol];
            if (T && (n.hostname = "", n.port = null, n.host && ("" === j[0] ? j[0] = n.host : j.unshift(n.host)), n.host = "", t.protocol && (t.hostname = null, t.port = null, t.host && ("" === h[0] ? h[0] = t.host : h.unshift(t.host)), t.host = null), b = b && ("" === h[0] || "" === j[0])), m) n.host = t.host || "" === t.host ? t.host : n.host, n.hostname = t.hostname || "" === t.hostname ? t.hostname : n.hostname, n.search = t.search, n.query = t.query, j = h;
            else if (h.length) j || (j = []), j.pop(), j = j.concat(h), n.search = t.search, n.query = t.query;
            else if (!u.isNullOrUndefined(t.search)) {
                if (T) {
                    n.hostname = n.host = j.shift();
                    var E = n.host && n.host.indexOf("@") > 0 ? n.host.split("@") : !1;
                    E && (n.auth = E.shift(), n.host = n.hostname = E.shift())
                }
                return n.search = t.search, n.query = t.query, u.isNull(n.pathname) && u.isNull(n.search) || (n.path = (n.pathname ? n.pathname : "") + (n.search ? n.search : "")), n.href = n.format(), n
            }
            if (!j.length) return n.pathname = null, n.search ? n.path = "/" + n.search : n.path = null, n.href = n.format(), n;
            for (var C = j.slice(-1)[0], k = (n.host || t.host || j.length > 1) && ("." === C || ".." === C) || "" === C, S = 0, P = j.length; P >= 0; P--) C = j[P], "." === C ? j.splice(P, 1) : ".." === C ? (j.splice(P, 1), S++) : S && (j.splice(P, 1), S--);
            if (!b && !_)
                for (; S--; S) j.unshift("..");
            !b || "" === j[0] || j[0] && "/" === j[0].charAt(0) || j.unshift(""), k && "/" !== j.join("/").substr(-1) && j.push("");
            var x = "" === j[0] || j[0] && "/" === j[0].charAt(0);
            if (T) {
                n.hostname = n.host = x ? "" : j.length ? j.shift() : "";
                var E = n.host && n.host.indexOf("@") > 0 ? n.host.split("@") : !1;
                E && (n.auth = E.shift(), n.host = n.hostname = E.shift())
            }
            return b = b || n.host && j.length, b && !x && j.unshift(""), j.length ? n.pathname = j.join("/") : (n.pathname = null, n.path = null), u.isNull(n.pathname) && u.isNull(n.search) || (n.path = (n.pathname ? n.pathname : "") + (n.search ? n.search : "")), n.auth = t.auth || n.auth, n.slashes = n.slashes || t.slashes, n.href = n.format(), n
        }, o.prototype.parseHost = function() {
            var t = this.host,
                e = p.exec(t);
            e && (e = e[0], ":" !== e && (this.port = e.substr(1)), t = t.substr(0, t.length - e.length)), t && (this.hostname = t)
        }
    }, {
        "./util": 96,
        punycode: 91,
        querystring: 94
    }],
    96: [function(t, e, n) {
        "use strict";
        e.exports = {
            isString: function(t) {
                return "string" == typeof t
            },
            isObject: function(t) {
                return "object" == typeof t && null !== t
            },
            isNull: function(t) {
                return null === t
            },
            isNullOrUndefined: function(t) {
                return null == t
            }
        }
    }, {}],
    97: [function(t, e, n) {
        (function(o) {
            ! function(t) {
                if ("object" == typeof n && "undefined" != typeof e) e.exports = t();
                else if ("function" == typeof define && define.amd) define([], t);
                else {
                    var r;
                    r = "undefined" != typeof window ? window : "undefined" != typeof o ? o : "undefined" != typeof self ? self : this, r.videojs = t()
                }
            }(function() {
                var e;
                return function n(e, o, r) {
                    function i(a, l) {
                        if (!o[a]) {
                            if (!e[a]) {
                                var u = "function" == typeof t && t;
                                if (!l && u) return u(a, !0);
                                if (s) return s(a, !0);
                                var c = new Error("Cannot find module '" + a + "'");
                                throw c.code = "MODULE_NOT_FOUND", c
                            }
                            var p = o[a] = {
                                exports: {}
                            };
                            e[a][0].call(p.exports, function(t) {
                                var n = e[a][1][t];
                                return i(n ? n : t)
                            }, p, p.exports, n, e, o, r)
                        }
                        return o[a].exports
                    }
                    for (var s = "function" == typeof t && t, a = 0; a < r.length; a++) i(r[a]);
                    return i
                }({
                    1: [function(t, e, n) {
                        (function(n) {
                            var o = "undefined" != typeof n ? n : "undefined" != typeof window ? window : {},
                                r = t("min-document");
                            if ("undefined" != typeof document) e.exports = document;
                            else {
                                var i = o["__GLOBAL_DOCUMENT_CACHE@4"];
                                i || (i = o["__GLOBAL_DOCUMENT_CACHE@4"] = r), e.exports = i
                            }
                        }).call(this, "undefined" != typeof o ? o : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
                    }, {
                        "min-document": 3
                    }],
                    2: [function(t, e, n) {
                        (function(t) {
                            "undefined" != typeof window ? e.exports = window : "undefined" != typeof t ? e.exports = t : "undefined" != typeof self ? e.exports = self : e.exports = {}
                        }).call(this, "undefined" != typeof o ? o : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
                    }, {}],
                    3: [function(t, e, n) {}, {}],
                    4: [function(t, e, n) {
                        var o = t("../internal/getNative"),
                            r = o(Date, "now"),
                            i = r || function() {
                                return (new Date).getTime()
                            };
                        e.exports = i
                    }, {
                        "../internal/getNative": 20
                    }],
                    5: [function(t, e, n) {
                        function o(t, e, n) {
                            function o() {
                                g && clearTimeout(g), d && clearTimeout(d), b = 0, d = g = m = void 0
                            }

                            function l(e, n) {
                                n && clearTimeout(n), d = g = m = void 0, e && (b = i(), h = t.apply(v, f), g || d || (f = v = void 0))
                            }

                            function u() {
                                var t = e - (i() - y);
                                0 >= t || t > e ? l(m, d) : g = setTimeout(u, t)
                            }

                            function c() {
                                l(j, g)
                            }

                            function p() {
                                if (f = arguments, y = i(), v = this, m = j && (g || !w), _ === !1) var n = w && !g;
                                else {
                                    d || w || (b = y);
                                    var o = _ - (y - b),
                                        r = 0 >= o || o > _;
                                    r ? (d && (d = clearTimeout(d)), b = y, h = t.apply(v, f)) : d || (d = setTimeout(c, o))
                                }
                                return r && g ? g = clearTimeout(g) : g || e === _ || (g = setTimeout(u, e)), n && (r = !0, h = t.apply(v, f)), !r || g || d || (f = v = void 0), h
                            }
                            var f, d, h, y, v, g, m, b = 0,
                                _ = !1,
                                j = !0;
                            if ("function" != typeof t) throw new TypeError(s);
                            if (e = 0 > e ? 0 : +e || 0, n === !0) {
                                var w = !0;
                                j = !1
                            } else r(n) && (w = !!n.leading, _ = "maxWait" in n && a(+n.maxWait || 0, e), j = "trailing" in n ? !!n.trailing : j);
                            return p.cancel = o, p
                        }
                        var r = t("../lang/isObject"),
                            i = t("../date/now"),
                            s = "Expected a function",
                            a = Math.max;
                        e.exports = o
                    }, {
                        "../date/now": 4,
                        "../lang/isObject": 33
                    }],
                    6: [function(t, e, n) {
                        function o(t, e) {
                            if ("function" != typeof t) throw new TypeError(r);
                            return e = i(void 0 === e ? t.length - 1 : +e || 0, 0),
                                function() {
                                    for (var n = arguments, o = -1, r = i(n.length - e, 0), s = Array(r); ++o < r;) s[o] = n[e + o];
                                    switch (e) {
                                        case 0:
                                            return t.call(this, s);
                                        case 1:
                                            return t.call(this, n[0], s);
                                        case 2:
                                            return t.call(this, n[0], n[1], s)
                                    }
                                    var a = Array(e + 1);
                                    for (o = -1; ++o < e;) a[o] = n[o];
                                    return a[e] = s, t.apply(this, a)
                                }
                        }
                        var r = "Expected a function",
                            i = Math.max;
                        e.exports = o
                    }, {}],
                    7: [function(t, e, n) {
                        function o(t, e, n) {
                            var o = !0,
                                a = !0;
                            if ("function" != typeof t) throw new TypeError(s);
                            return n === !1 ? o = !1 : i(n) && (o = "leading" in n ? !!n.leading : o, a = "trailing" in n ? !!n.trailing : a), r(t, e, {
                                leading: o,
                                maxWait: +e,
                                trailing: a
                            })
                        }
                        var r = t("./debounce"),
                            i = t("../lang/isObject"),
                            s = "Expected a function";
                        e.exports = o
                    }, {
                        "../lang/isObject": 33,
                        "./debounce": 5
                    }],
                    8: [function(t, e, n) {
                        function o(t, e) {
                            var n = -1,
                                o = t.length;
                            for (e || (e = Array(o)); ++n < o;) e[n] = t[n];
                            return e
                        }
                        e.exports = o
                    }, {}],
                    9: [function(t, e, n) {
                        function o(t, e) {
                            for (var n = -1, o = t.length; ++n < o && e(t[n], n, t) !== !1;);
                            return t
                        }
                        e.exports = o
                    }, {}],
                    10: [function(t, e, n) {
                        function o(t, e, n) {
                            n || (n = {});
                            for (var o = -1, r = e.length; ++o < r;) {
                                var i = e[o];
                                n[i] = t[i]
                            }
                            return n
                        }
                        e.exports = o
                    }, {}],
                    11: [function(t, e, n) {
                        var o = t("./createBaseFor"),
                            r = o();
                        e.exports = r
                    }, {
                        "./createBaseFor": 18
                    }],
                    12: [function(t, e, n) {
                        function o(t, e) {
                            return r(t, e, i)
                        }
                        var r = t("./baseFor"),
                            i = t("../object/keysIn");
                        e.exports = o
                    }, {
                        "../object/keysIn": 39,
                        "./baseFor": 11
                    }],
                    13: [function(t, e, n) {
                        function o(t, e, n, f, d) {
                            if (!l(t)) return t;
                            var h = a(e) && (s(e) || c(e)),
                                y = h ? void 0 : p(e);
                            return r(y || e, function(r, s) {
                                if (y && (s = r, r = e[s]), u(r)) f || (f = []), d || (d = []), i(t, e, s, o, n, f, d);
                                else {
                                    var a = t[s],
                                        l = n ? n(a, r, s, t, e) : void 0,
                                        c = void 0 === l;
                                    c && (l = r), void 0 === l && (!h || s in t) || !c && (l === l ? l === a : a !== a) || (t[s] = l)
                                }
                            }), t
                        }
                        var r = t("./arrayEach"),
                            i = t("./baseMergeDeep"),
                            s = t("../lang/isArray"),
                            a = t("./isArrayLike"),
                            l = t("../lang/isObject"),
                            u = t("./isObjectLike"),
                            c = t("../lang/isTypedArray"),
                            p = t("../object/keys");
                        e.exports = o
                    }, {
                        "../lang/isArray": 30,
                        "../lang/isObject": 33,
                        "../lang/isTypedArray": 36,
                        "../object/keys": 38,
                        "./arrayEach": 9,
                        "./baseMergeDeep": 14,
                        "./isArrayLike": 21,
                        "./isObjectLike": 26
                    }],
                    14: [function(t, e, n) {
                        function o(t, e, n, o, p, f, d) {
                            for (var h = f.length, y = e[n]; h--;)
                                if (f[h] == y) return void(t[n] = d[h]);
                            var v = t[n],
                                g = p ? p(v, y, n, t, e) : void 0,
                                m = void 0 === g;
                            m && (g = y, a(y) && (s(y) || u(y)) ? g = s(v) ? v : a(v) ? r(v) : [] : l(y) || i(y) ? g = i(v) ? c(v) : l(v) ? v : {} : m = !1), f.push(y), d.push(g), m ? t[n] = o(g, y, p, f, d) : (g === g ? g !== v : v === v) && (t[n] = g)
                        }
                        var r = t("./arrayCopy"),
                            i = t("../lang/isArguments"),
                            s = t("../lang/isArray"),
                            a = t("./isArrayLike"),
                            l = t("../lang/isPlainObject"),
                            u = t("../lang/isTypedArray"),
                            c = t("../lang/toPlainObject");
                        e.exports = o
                    }, {
                        "../lang/isArguments": 29,
                        "../lang/isArray": 30,
                        "../lang/isPlainObject": 34,
                        "../lang/isTypedArray": 36,
                        "../lang/toPlainObject": 37,
                        "./arrayCopy": 8,
                        "./isArrayLike": 21
                    }],
                    15: [function(t, e, n) {
                        function o(t) {
                            return function(e) {
                                return null == e ? void 0 : r(e)[t]
                            }
                        }
                        var r = t("./toObject");
                        e.exports = o
                    }, {
                        "./toObject": 28
                    }],
                    16: [function(t, e, n) {
                        function o(t, e, n) {
                            if ("function" != typeof t) return r;
                            if (void 0 === e) return t;
                            switch (n) {
                                case 1:
                                    return function(n) {
                                        return t.call(e, n)
                                    };
                                case 3:
                                    return function(n, o, r) {
                                        return t.call(e, n, o, r)
                                    };
                                case 4:
                                    return function(n, o, r, i) {
                                        return t.call(e, n, o, r, i)
                                    };
                                case 5:
                                    return function(n, o, r, i, s) {
                                        return t.call(e, n, o, r, i, s)
                                    }
                            }
                            return function() {
                                return t.apply(e, arguments)
                            }
                        }
                        var r = t("../utility/identity");
                        e.exports = o
                    }, {
                        "../utility/identity": 42
                    }],
                    17: [function(t, e, n) {
                        function o(t) {
                            return s(function(e, n) {
                                var o = -1,
                                    s = null == e ? 0 : n.length,
                                    a = s > 2 ? n[s - 2] : void 0,
                                    l = s > 2 ? n[2] : void 0,
                                    u = s > 1 ? n[s - 1] : void 0;
                                for ("function" == typeof a ? (a = r(a, u, 5), s -= 2) : (a = "function" == typeof u ? u : void 0, s -= a ? 1 : 0), l && i(n[0], n[1], l) && (a = 3 > s ? void 0 : a, s = 1); ++o < s;) {
                                    var c = n[o];
                                    c && t(e, c, a)
                                }
                                return e
                            })
                        }
                        var r = t("./bindCallback"),
                            i = t("./isIterateeCall"),
                            s = t("../function/restParam");
                        e.exports = o
                    }, {
                        "../function/restParam": 6,
                        "./bindCallback": 16,
                        "./isIterateeCall": 24
                    }],
                    18: [function(t, e, n) {
                        function o(t) {
                            return function(e, n, o) {
                                for (var i = r(e), s = o(e), a = s.length, l = t ? a : -1; t ? l-- : ++l < a;) {
                                    var u = s[l];
                                    if (n(i[u], u, i) === !1) break
                                }
                                return e
                            }
                        }
                        var r = t("./toObject");
                        e.exports = o
                    }, {
                        "./toObject": 28
                    }],
                    19: [function(t, e, n) {
                        var o = t("./baseProperty"),
                            r = o("length");
                        e.exports = r
                    }, {
                        "./baseProperty": 15
                    }],
                    20: [function(t, e, n) {
                        function o(t, e) {
                            var n = null == t ? void 0 : t[e];
                            return r(n) ? n : void 0
                        }
                        var r = t("../lang/isNative");
                        e.exports = o
                    }, {
                        "../lang/isNative": 32
                    }],
                    21: [function(t, e, n) {
                        function o(t) {
                            return null != t && i(r(t))
                        }
                        var r = t("./getLength"),
                            i = t("./isLength");
                        e.exports = o
                    }, {
                        "./getLength": 19,
                        "./isLength": 25
                    }],
                    22: [function(t, e, n) {
                        var o = function() {
                            try {
                                Object({
                                    toString: 0
                                } + "")
                            } catch (t) {
                                return function() {
                                    return !1
                                }
                            }
                            return function(t) {
                                return "function" != typeof t.toString && "string" == typeof(t + "")
                            }
                        }();
                        e.exports = o
                    }, {}],
                    23: [function(t, e, n) {
                        function o(t, e) {
                            return t = "number" == typeof t || r.test(t) ? +t : -1, e = null == e ? i : e, t > -1 && t % 1 == 0 && e > t
                        }
                        var r = /^\d+$/,
                            i = 9007199254740991;
                        e.exports = o
                    }, {}],
                    24: [function(t, e, n) {
                        function o(t, e, n) {
                            if (!s(n)) return !1;
                            var o = typeof e;
                            if ("number" == o ? r(n) && i(e, n.length) : "string" == o && e in n) {
                                var a = n[e];
                                return t === t ? t === a : a !== a
                            }
                            return !1
                        }
                        var r = t("./isArrayLike"),
                            i = t("./isIndex"),
                            s = t("../lang/isObject");
                        e.exports = o
                    }, {
                        "../lang/isObject": 33,
                        "./isArrayLike": 21,
                        "./isIndex": 23
                    }],
                    25: [function(t, e, n) {
                        function o(t) {
                            return "number" == typeof t && t > -1 && t % 1 == 0 && r >= t
                        }
                        var r = 9007199254740991;
                        e.exports = o
                    }, {}],
                    26: [function(t, e, n) {
                        function o(t) {
                            return !!t && "object" == typeof t
                        }
                        e.exports = o
                    }, {}],
                    27: [function(t, e, n) {
                        function o(t) {
                            for (var e = u(t), n = e.length, o = n && t.length, c = !!o && a(o) && (i(t) || r(t) || l(t)), f = -1, d = []; ++f < n;) {
                                var h = e[f];
                                (c && s(h, o) || p.call(t, h)) && d.push(h)
                            }
                            return d
                        }
                        var r = t("../lang/isArguments"),
                            i = t("../lang/isArray"),
                            s = t("./isIndex"),
                            a = t("./isLength"),
                            l = t("../lang/isString"),
                            u = t("../object/keysIn"),
                            c = Object.prototype,
                            p = c.hasOwnProperty;
                        e.exports = o
                    }, {
                        "../lang/isArguments": 29,
                        "../lang/isArray": 30,
                        "../lang/isString": 35,
                        "../object/keysIn": 39,
                        "./isIndex": 23,
                        "./isLength": 25
                    }],
                    28: [function(t, e, n) {
                        function o(t) {
                            if (s.unindexedChars && i(t)) {
                                for (var e = -1, n = t.length, o = Object(t); ++e < n;) o[e] = t.charAt(e);
                                return o
                            }
                            return r(t) ? t : Object(t)
                        }
                        var r = t("../lang/isObject"),
                            i = t("../lang/isString"),
                            s = t("../support");
                        e.exports = o
                    }, {
                        "../lang/isObject": 33,
                        "../lang/isString": 35,
                        "../support": 41
                    }],
                    29: [function(t, e, n) {
                        function o(t) {
                            return i(t) && r(t) && a.call(t, "callee") && !l.call(t, "callee")
                        }
                        var r = t("../internal/isArrayLike"),
                            i = t("../internal/isObjectLike"),
                            s = Object.prototype,
                            a = s.hasOwnProperty,
                            l = s.propertyIsEnumerable;
                        e.exports = o
                    }, {
                        "../internal/isArrayLike": 21,
                        "../internal/isObjectLike": 26
                    }],
                    30: [function(t, e, n) {
                        var o = t("../internal/getNative"),
                            r = t("../internal/isLength"),
                            i = t("../internal/isObjectLike"),
                            s = "[object Array]",
                            a = Object.prototype,
                            l = a.toString,
                            u = o(Array, "isArray"),
                            c = u || function(t) {
                                return i(t) && r(t.length) && l.call(t) == s
                            };
                        e.exports = c
                    }, {
                        "../internal/getNative": 20,
                        "../internal/isLength": 25,
                        "../internal/isObjectLike": 26
                    }],
                    31: [function(t, e, n) {
                        function o(t) {
                            return r(t) && a.call(t) == i
                        }
                        var r = t("./isObject"),
                            i = "[object Function]",
                            s = Object.prototype,
                            a = s.toString;
                        e.exports = o
                    }, {
                        "./isObject": 33
                    }],
                    32: [function(t, e, n) {
                        function o(t) {
                            return null == t ? !1 : r(t) ? p.test(u.call(t)) : s(t) && (i(t) ? p : a).test(t)
                        }
                        var r = t("./isFunction"),
                            i = t("../internal/isHostObject"),
                            s = t("../internal/isObjectLike"),
                            a = /^\[object .+?Constructor\]$/,
                            l = Object.prototype,
                            u = Function.prototype.toString,
                            c = l.hasOwnProperty,
                            p = RegExp("^" + u.call(c).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
                        e.exports = o
                    }, {
                        "../internal/isHostObject": 22,
                        "../internal/isObjectLike": 26,
                        "./isFunction": 31
                    }],
                    33: [function(t, e, n) {
                        function o(t) {
                            var e = typeof t;
                            return !!t && ("object" == e || "function" == e)
                        }
                        e.exports = o
                    }, {}],
                    34: [function(t, e, n) {
                        function o(t) {
                            var e;
                            if (!a(t) || f.call(t) != u || s(t) || i(t) || !p.call(t, "constructor") && (e = t.constructor, "function" == typeof e && !(e instanceof e))) return !1;
                            var n;
                            return l.ownLast ? (r(t, function(t, e, o) {
                                return n = p.call(o, e), !1
                            }), n !== !1) : (r(t, function(t, e) {
                                n = e
                            }), void 0 === n || p.call(t, n))
                        }
                        var r = t("../internal/baseForIn"),
                            i = t("./isArguments"),
                            s = t("../internal/isHostObject"),
                            a = t("../internal/isObjectLike"),
                            l = t("../support"),
                            u = "[object Object]",
                            c = Object.prototype,
                            p = c.hasOwnProperty,
                            f = c.toString;
                        e.exports = o
                    }, {
                        "../internal/baseForIn": 12,
                        "../internal/isHostObject": 22,
                        "../internal/isObjectLike": 26,
                        "../support": 41,
                        "./isArguments": 29
                    }],
                    35: [function(t, e, n) {
                        function o(t) {
                            return "string" == typeof t || r(t) && a.call(t) == i
                        }
                        var r = t("../internal/isObjectLike"),
                            i = "[object String]",
                            s = Object.prototype,
                            a = s.toString;
                        e.exports = o
                    }, {
                        "../internal/isObjectLike": 26
                    }],
                    36: [function(t, e, n) {
                        function o(t) {
                            return i(t) && r(t.length) && !!P[A.call(t)]
                        }
                        var r = t("../internal/isLength"),
                            i = t("../internal/isObjectLike"),
                            s = "[object Arguments]",
                            a = "[object Array]",
                            l = "[object Boolean]",
                            u = "[object Date]",
                            c = "[object Error]",
                            p = "[object Function]",
                            f = "[object Map]",
                            d = "[object Number]",
                            h = "[object Object]",
                            y = "[object RegExp]",
                            v = "[object Set]",
                            g = "[object String]",
                            m = "[object WeakMap]",
                            b = "[object ArrayBuffer]",
                            _ = "[object Float32Array]",
                            j = "[object Float64Array]",
                            w = "[object Int8Array]",
                            O = "[object Int16Array]",
                            T = "[object Int32Array]",
                            E = "[object Uint8Array]",
                            C = "[object Uint8ClampedArray]",
                            k = "[object Uint16Array]",
                            S = "[object Uint32Array]",
                            P = {};
                        P[_] = P[j] = P[w] = P[O] = P[T] = P[E] = P[C] = P[k] = P[S] = !0, P[s] = P[a] = P[b] = P[l] = P[u] = P[c] = P[p] = P[f] = P[d] = P[h] = P[y] = P[v] = P[g] = P[m] = !1;
                        var x = Object.prototype,
                            A = x.toString;
                        e.exports = o
                    }, {
                        "../internal/isLength": 25,
                        "../internal/isObjectLike": 26
                    }],
                    37: [function(t, e, n) {
                        function o(t) {
                            return r(t, i(t))
                        }
                        var r = t("../internal/baseCopy"),
                            i = t("../object/keysIn");
                        e.exports = o
                    }, {
                        "../internal/baseCopy": 10,
                        "../object/keysIn": 39
                    }],
                    38: [function(t, e, n) {
                        var o = t("../internal/getNative"),
                            r = t("../internal/isArrayLike"),
                            i = t("../lang/isObject"),
                            s = t("../internal/shimKeys"),
                            a = t("../support"),
                            l = o(Object, "keys"),
                            u = l ? function(t) {
                                var e = null == t ? void 0 : t.constructor;
                                return "function" == typeof e && e.prototype === t || ("function" == typeof t ? a.enumPrototypes : r(t)) ? s(t) : i(t) ? l(t) : []
                            } : s;
                        e.exports = u
                    }, {
                        "../internal/getNative": 20,
                        "../internal/isArrayLike": 21,
                        "../internal/shimKeys": 27,
                        "../lang/isObject": 33,
                        "../support": 41
                    }],
                    39: [function(t, e, n) {
                        function o(t) {
                            if (null == t) return [];
                            c(t) || (t = Object(t));
                            var e = t.length;
                            e = e && u(e) && (s(t) || i(t) || p(t)) && e || 0;
                            for (var n = t.constructor, o = -1, r = a(n) && n.prototype || T, d = r === t, h = Array(e), y = e > 0, g = f.enumErrorProps && (t === O || t instanceof Error), m = f.enumPrototypes && a(t); ++o < e;) h[o] = o + "";
                            for (var _ in t) m && "prototype" == _ || g && ("message" == _ || "name" == _) || y && l(_, e) || "constructor" == _ && (d || !C.call(t, _)) || h.push(_);
                            if (f.nonEnumShadows && t !== T) {
                                var P = t === E ? j : t === O ? v : k.call(t),
                                    x = S[P] || S[b];
                                for (P == b && (r = T), e = w.length; e--;) {
                                    _ = w[e];
                                    var A = x[_];
                                    d && A || (A ? !C.call(t, _) : t[_] === r[_]) || h.push(_)
                                }
                            }
                            return h
                        }
                        var r = t("../internal/arrayEach"),
                            i = t("../lang/isArguments"),
                            s = t("../lang/isArray"),
                            a = t("../lang/isFunction"),
                            l = t("../internal/isIndex"),
                            u = t("../internal/isLength"),
                            c = t("../lang/isObject"),
                            p = t("../lang/isString"),
                            f = t("../support"),
                            d = "[object Array]",
                            h = "[object Boolean]",
                            y = "[object Date]",
                            v = "[object Error]",
                            g = "[object Function]",
                            m = "[object Number]",
                            b = "[object Object]",
                            _ = "[object RegExp]",
                            j = "[object String]",
                            w = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"],
                            O = Error.prototype,
                            T = Object.prototype,
                            E = String.prototype,
                            C = T.hasOwnProperty,
                            k = T.toString,
                            S = {};
                        S[d] = S[y] = S[m] = {
                            constructor: !0,
                            toLocaleString: !0,
                            toString: !0,
                            valueOf: !0
                        }, S[h] = S[j] = {
                            constructor: !0,
                            toString: !0,
                            valueOf: !0
                        }, S[v] = S[g] = S[_] = {
                            constructor: !0,
                            toString: !0
                        }, S[b] = {
                            constructor: !0
                        }, r(w, function(t) {
                            for (var e in S)
                                if (C.call(S, e)) {
                                    var n = S[e];
                                    n[t] = C.call(n, t)
                                }
                        }), e.exports = o
                    }, {
                        "../internal/arrayEach": 9,
                        "../internal/isIndex": 23,
                        "../internal/isLength": 25,
                        "../lang/isArguments": 29,
                        "../lang/isArray": 30,
                        "../lang/isFunction": 31,
                        "../lang/isObject": 33,
                        "../lang/isString": 35,
                        "../support": 41
                    }],
                    40: [function(t, e, n) {
                        var o = t("../internal/baseMerge"),
                            r = t("../internal/createAssigner"),
                            i = r(o);
                        e.exports = i
                    }, {
                        "../internal/baseMerge": 13,
                        "../internal/createAssigner": 17
                    }],
                    41: [function(t, e, n) {
                        var o = Array.prototype,
                            r = Error.prototype,
                            i = Object.prototype,
                            s = i.propertyIsEnumerable,
                            a = o.splice,
                            l = {};
                        ! function(t) {
                            var e = function() {
                                    this.x = t
                                },
                                n = {
                                    0: t,
                                    length: t
                                },
                                o = [];
                            e.prototype = {
                                valueOf: t,
                                y: t
                            };
                            for (var i in new e) o.push(i);
                            l.enumErrorProps = s.call(r, "message") || s.call(r, "name"), l.enumPrototypes = s.call(e, "prototype"), l.nonEnumShadows = !/valueOf/.test(o), l.ownLast = "x" != o[0], l.spliceObjects = (a.call(n, 0, 1), !n[0]), l.unindexedChars = "x" [0] + Object("x")[0] != "xx"
                        }(1, 0), e.exports = l
                    }, {}],
                    42: [function(t, e, n) {
                        function o(t) {
                            return t
                        }
                        e.exports = o
                    }, {}],
                    43: [function(t, e, n) {
                        "use strict";
                        var o = t("object-keys");
                        e.exports = function() {
                            if ("function" != typeof Symbol || "function" != typeof Object.getOwnPropertySymbols) return !1;
                            if ("symbol" == typeof Symbol.iterator) return !0;
                            var t = {},
                                e = Symbol("test");
                            if ("string" == typeof e) return !1;
                            var n = 42;
                            t[e] = n;
                            for (e in t) return !1;
                            if (0 !== o(t).length) return !1;
                            if ("function" == typeof Object.keys && 0 !== Object.keys(t).length) return !1;
                            if ("function" == typeof Object.getOwnPropertyNames && 0 !== Object.getOwnPropertyNames(t).length) return !1;
                            var r = Object.getOwnPropertySymbols(t);
                            if (1 !== r.length || r[0] !== e) return !1;
                            if (!Object.prototype.propertyIsEnumerable.call(t, e)) return !1;
                            if ("function" == typeof Object.getOwnPropertyDescriptor) {
                                var i = Object.getOwnPropertyDescriptor(t, e);
                                if (i.value !== n || i.enumerable !== !0) return !1
                            }
                            return !0
                        }
                    }, {
                        "object-keys": 50
                    }],
                    44: [function(t, e, n) {
                        "use strict";
                        var o = t("object-keys"),
                            r = t("function-bind"),
                            i = function(t) {
                                return "undefined" != typeof t && null !== t
                            },
                            s = t("./hasSymbols")(),
                            a = Object,
                            l = r.call(Function.call, Array.prototype.push),
                            u = r.call(Function.call, Object.prototype.propertyIsEnumerable);
                        e.exports = function(t, e) {
                            if (!i(t)) throw new TypeError("target must be an object");
                            var n, r, c, p, f, d, h, y = a(t);
                            for (n = 1; n < arguments.length; ++n) {
                                if (r = a(arguments[n]), p = o(r), s && Object.getOwnPropertySymbols)
                                    for (f = Object.getOwnPropertySymbols(r), c = 0; c < f.length; ++c) h = f[c], u(r, h) && l(p, h);
                                for (c = 0; c < p.length; ++c) h = p[c], d = r[h], u(r, h) && (y[h] = d)
                            }
                            return y
                        }
                    }, {
                        "./hasSymbols": 43,
                        "function-bind": 49,
                        "object-keys": 50
                    }],
                    45: [function(t, e, n) {
                        "use strict";
                        var o = t("define-properties"),
                            r = t("./implementation"),
                            i = t("./polyfill"),
                            s = t("./shim");
                        o(r, {
                            implementation: r,
                            getPolyfill: i,
                            shim: s
                        }), e.exports = r
                    }, {
                        "./implementation": 44,
                        "./polyfill": 52,
                        "./shim": 53,
                        "define-properties": 46
                    }],
                    46: [function(t, e, n) {
                        "use strict";
                        var o = t("object-keys"),
                            r = t("foreach"),
                            i = "function" == typeof Symbol && "symbol" == typeof Symbol(),
                            s = Object.prototype.toString,
                            a = function(t) {
                                return "function" == typeof t && "[object Function]" === s.call(t)
                            },
                            l = function() {
                                var t = {};
                                try {
                                    Object.defineProperty(t, "x", {
                                        enumerable: !1,
                                        value: t
                                    });
                                    for (var e in t) return !1;
                                    return t.x === t
                                } catch (n) {
                                    return !1
                                }
                            },
                            u = Object.defineProperty && l(),
                            c = function(t, e, n, o) {
                                (!(e in t) || a(o) && o()) && (u ? Object.defineProperty(t, e, {
                                    configurable: !0,
                                    enumerable: !1,
                                    value: n,
                                    writable: !0
                                }) : t[e] = n)
                            },
                            p = function(t, e) {
                                var n = arguments.length > 2 ? arguments[2] : {},
                                    s = o(e);
                                i && (s = s.concat(Object.getOwnPropertySymbols(e))), r(s, function(o) {
                                    c(t, o, e[o], n[o])
                                })
                            };
                        p.supportsDescriptors = !!u, e.exports = p
                    }, {
                        foreach: 47,
                        "object-keys": 50
                    }],
                    47: [function(t, e, n) {
                        var o = Object.prototype.hasOwnProperty,
                            r = Object.prototype.toString;
                        e.exports = function(t, e, n) {
                            if ("[object Function]" !== r.call(e)) throw new TypeError("iterator must be a function");
                            var i = t.length;
                            if (i === +i)
                                for (var s = 0; i > s; s++) e.call(n, t[s], s, t);
                            else
                                for (var a in t) o.call(t, a) && e.call(n, t[a], a, t)
                        }
                    }, {}],
                    48: [function(t, e, n) {
                        var o = "Function.prototype.bind called on incompatible ",
                            r = Array.prototype.slice,
                            i = Object.prototype.toString,
                            s = "[object Function]";
                        e.exports = function(t) {
                            var e = this;
                            if ("function" != typeof e || i.call(e) !== s) throw new TypeError(o + e);
                            for (var n, a = r.call(arguments, 1), l = function() {
                                    if (this instanceof n) {
                                        var o = e.apply(this, a.concat(r.call(arguments)));
                                        return Object(o) === o ? o : this
                                    }
                                    return e.apply(t, a.concat(r.call(arguments)))
                                }, u = Math.max(0, e.length - a.length), c = [], p = 0; u > p; p++) c.push("$" + p);
                            if (n = Function("binder", "return function (" + c.join(",") + "){ return binder.apply(this,arguments); }")(l), e.prototype) {
                                var f = function() {};
                                f.prototype = e.prototype, n.prototype = new f, f.prototype = null
                            }
                            return n
                        }
                    }, {}],
                    49: [function(t, e, n) {
                        var o = t("./implementation");
                        e.exports = Function.prototype.bind || o
                    }, {
                        "./implementation": 48
                    }],
                    50: [function(t, e, n) {
                        "use strict";
                        var o = Object.prototype.hasOwnProperty,
                            r = Object.prototype.toString,
                            i = Array.prototype.slice,
                            s = t("./isArguments"),
                            a = !{
                                toString: null
                            }.propertyIsEnumerable("toString"),
                            l = function() {}.propertyIsEnumerable("prototype"),
                            u = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
                            c = function(t) {
                                var e = t.constructor;
                                return e && e.prototype === t
                            },
                            p = {
                                $console: !0,
                                $frame: !0,
                                $frameElement: !0,
                                $frames: !0,
                                $parent: !0,
                                $self: !0,
                                $webkitIndexedDB: !0,
                                $webkitStorageInfo: !0,
                                $window: !0
                            },
                            f = function() {
                                if ("undefined" == typeof window) return !1;
                                for (var t in window) try {
                                    if (!p["$" + t] && o.call(window, t) && null !== window[t] && "object" == typeof window[t]) try {
                                        c(window[t])
                                    } catch (e) {
                                        return !0
                                    }
                                } catch (e) {
                                    return !0
                                }
                                return !1
                            }(),
                            d = function(t) {
                                if ("undefined" == typeof window || !f) return c(t);
                                try {
                                    return c(t)
                                } catch (e) {
                                    return !1
                                }
                            },
                            h = function(t) {
                                var e = null !== t && "object" == typeof t,
                                    n = "[object Function]" === r.call(t),
                                    i = s(t),
                                    c = e && "[object String]" === r.call(t),
                                    p = [];
                                if (!e && !n && !i) throw new TypeError("Object.keys called on a non-object");
                                var f = l && n;
                                if (c && t.length > 0 && !o.call(t, 0))
                                    for (var h = 0; h < t.length; ++h) p.push(String(h));
                                if (i && t.length > 0)
                                    for (var y = 0; y < t.length; ++y) p.push(String(y));
                                else
                                    for (var v in t) f && "prototype" === v || !o.call(t, v) || p.push(String(v));
                                if (a)
                                    for (var g = d(t), m = 0; m < u.length; ++m) g && "constructor" === u[m] || !o.call(t, u[m]) || p.push(u[m]);
                                return p
                            };
                        h.shim = function() {
                            if (Object.keys) {
                                var t = function() {
                                    return 2 === (Object.keys(arguments) || "").length
                                }(1, 2);
                                if (!t) {
                                    var e = Object.keys;
                                    Object.keys = function(t) {
                                        return e(s(t) ? i.call(t) : t)
                                    }
                                }
                            } else Object.keys = h;
                            return Object.keys || h
                        }, e.exports = h
                    }, {
                        "./isArguments": 51
                    }],
                    51: [function(t, e, n) {
                        "use strict";
                        var o = Object.prototype.toString;
                        e.exports = function(t) {
                            var e = o.call(t),
                                n = "[object Arguments]" === e;
                            return n || (n = "[object Array]" !== e && null !== t && "object" == typeof t && "number" == typeof t.length && t.length >= 0 && "[object Function]" === o.call(t.callee)), n
                        }
                    }, {}],
                    52: [function(t, e, n) {
                        "use strict";
                        var o = t("./implementation"),
                            r = function() {
                                if (!Object.assign) return !1;
                                for (var t = "abcdefghijklmnopqrst", e = t.split(""), n = {}, o = 0; o < e.length; ++o) n[e[o]] = e[o];
                                var r = Object.assign({}, n),
                                    i = "";
                                for (var s in r) i += s;
                                return t !== i
                            },
                            i = function() {
                                if (!Object.assign || !Object.preventExtensions) return !1;
                                var t = Object.preventExtensions({
                                    1: 2
                                });
                                try {
                                    Object.assign(t, "xy")
                                } catch (e) {
                                    return "y" === t[1]
                                }
                            };
                        e.exports = function() {
                            return Object.assign ? r() ? o : i() ? o : Object.assign : o
                        }
                    }, {
                        "./implementation": 44
                    }],
                    53: [function(t, e, n) {
                        "use strict";
                        var o = t("define-properties"),
                            r = t("./polyfill");
                        e.exports = function() {
                            var t = r();
                            return o(Object, {
                                assign: t
                            }, {
                                assign: function() {
                                    return Object.assign !== t
                                }
                            }), t
                        }
                    }, {
                        "./polyfill": 52,
                        "define-properties": 46
                    }],
                    54: [function(t, e, n) {
                        function o(t, e) {
                            var n, o = null;
                            try {
                                n = JSON.parse(t, e)
                            } catch (r) {
                                o = r
                            }
                            return [o, n]
                        }
                        e.exports = o
                    }, {}],
                    55: [function(t, e, n) {
                        function o(t) {
                            return t.replace(/\n\r?\s*/g, "")
                        }
                        e.exports = function(t) {
                            for (var e = "", n = 0; n < arguments.length; n++) e += o(t[n]) + (arguments[n + 1] || "");
                            return e
                        }
                    }, {}],
                    56: [function(t, e, n) {
                        "use strict";

                        function o(t, e) {
                            for (var n = 0; n < t.length; n++) e(t[n])
                        }

                        function r(t) {
                            for (var e in t)
                                if (t.hasOwnProperty(e)) return !1;
                            return !0
                        }

                        function i(t, e, n) {
                            var o = t;
                            return p(e) ? (n = e, "string" == typeof t && (o = {
                                uri: t
                            })) : o = d(e, {
                                uri: t
                            }), o.callback = n, o
                        }

                        function s(t, e, n) {
                            return e = i(t, e, n), a(e)
                        }

                        function a(t) {
                            function e() {
                                4 === u.readyState && i()
                            }

                            function n() {
                                var t = void 0;
                                if (u.response ? t = u.response : "text" !== u.responseType && u.responseType || (t = u.responseText || u.responseXML), _) try {
                                    t = JSON.parse(t)
                                } catch (e) {}
                                return t
                            }

                            function o(t) {
                                clearTimeout(h), t instanceof Error || (t = new Error("" + (t || "Unknown XMLHttpRequest Error"))), t.statusCode = 0, a(t, l)
                            }

                            function i() {
                                if (!d) {
                                    var e;
                                    clearTimeout(h), e = t.useXDR && void 0 === u.status ? 200 : 1223 === u.status ? 204 : u.status;
                                    var o = l,
                                        r = null;
                                    0 !== e ? (o = {
                                        body: n(),
                                        statusCode: e,
                                        method: v,
                                        headers: {},
                                        url: y,
                                        rawRequest: u
                                    }, u.getAllResponseHeaders && (o.headers = f(u.getAllResponseHeaders()))) : r = new Error("Internal XMLHttpRequest Error"), a(r, o, o.body)
                                }
                            }
                            var a = t.callback;
                            if ("undefined" == typeof a) throw new Error("callback argument missing");
                            a = c(a);
                            var l = {
                                    body: void 0,
                                    headers: {},
                                    statusCode: 0,
                                    method: v,
                                    url: y,
                                    rawRequest: u
                                },
                                u = t.xhr || null;
                            u || (u = t.cors || t.useXDR ? new s.XDomainRequest : new s.XMLHttpRequest);
                            var p, d, h, y = u.url = t.uri || t.url,
                                v = u.method = t.method || "GET",
                                g = t.body || t.data || null,
                                m = u.headers = t.headers || {},
                                b = !!t.sync,
                                _ = !1;
                            if ("json" in t && (_ = !0, m.accept || m.Accept || (m.Accept = "application/json"), "GET" !== v && "HEAD" !== v && (m["content-type"] || m["Content-Type"] || (m["Content-Type"] = "application/json"), g = JSON.stringify(t.json))), u.onreadystatechange = e, u.onload = i, u.onerror = o, u.onprogress = function() {}, u.ontimeout = o, u.open(v, y, !b, t.username, t.password), b || (u.withCredentials = !!t.withCredentials), !b && t.timeout > 0 && (h = setTimeout(function() {
                                    d = !0, u.abort("timeout");
                                    var t = new Error("XMLHttpRequest timeout");
                                    t.code = "ETIMEDOUT", o(t)
                                }, t.timeout)), u.setRequestHeader)
                                for (p in m) m.hasOwnProperty(p) && u.setRequestHeader(p, m[p]);
                            else if (t.headers && !r(t.headers)) throw new Error("Headers cannot be set on an XDomainRequest object");
                            return "responseType" in t && (u.responseType = t.responseType), "beforeSend" in t && "function" == typeof t.beforeSend && t.beforeSend(u), u.send(g), u
                        }

                        function l() {}
                        var u = t("global/window"),
                            c = t("once"),
                            p = t("is-function"),
                            f = t("parse-headers"),
                            d = t("xtend");
                        e.exports = s, s.XMLHttpRequest = u.XMLHttpRequest || l, s.XDomainRequest = "withCredentials" in new s.XMLHttpRequest ? s.XMLHttpRequest : u.XDomainRequest, o(["get", "put", "post", "patch", "head", "delete"], function(t) {
                            s["delete" === t ? "del" : t] = function(e, n, o) {
                                return n = i(e, n, o), n.method = t.toUpperCase(), a(n)
                            }
                        })
                    }, {
                        "global/window": 2,
                        "is-function": 57,
                        once: 58,
                        "parse-headers": 61,
                        xtend: 62
                    }],
                    57: [function(t, e, n) {
                        function o(t) {
                            var e = r.call(t);
                            return "[object Function]" === e || "function" == typeof t && "[object RegExp]" !== e || "undefined" != typeof window && (t === window.setTimeout || t === window.alert || t === window.confirm || t === window.prompt)
                        }
                        e.exports = o;
                        var r = Object.prototype.toString
                    }, {}],
                    58: [function(t, e, n) {
                        function o(t) {
                            var e = !1;
                            return function() {
                                return e ? void 0 : (e = !0, t.apply(this, arguments))
                            }
                        }
                        e.exports = o, o.proto = o(function() {
                            Object.defineProperty(Function.prototype, "once", {
                                value: function() {
                                    return o(this)
                                },
                                configurable: !0
                            })
                        })
                    }, {}],
                    59: [function(t, e, n) {
                        function o(t, e, n) {
                            if (!a(e)) throw new TypeError("iterator must be a function");
                            arguments.length < 3 && (n = this), "[object Array]" === l.call(t) ? r(t, e, n) : "string" == typeof t ? i(t, e, n) : s(t, e, n)
                        }

                        function r(t, e, n) {
                            for (var o = 0, r = t.length; r > o; o++) u.call(t, o) && e.call(n, t[o], o, t)
                        }

                        function i(t, e, n) {
                            for (var o = 0, r = t.length; r > o; o++) e.call(n, t.charAt(o), o, t)
                        }

                        function s(t, e, n) {
                            for (var o in t) u.call(t, o) && e.call(n, t[o], o, t)
                        }
                        var a = t("is-function");
                        e.exports = o;
                        var l = Object.prototype.toString,
                            u = Object.prototype.hasOwnProperty
                    }, {
                        "is-function": 57
                    }],
                    60: [function(t, e, n) {
                        function o(t) {
                            return t.replace(/^\s*|\s*$/g, "")
                        }
                        n = e.exports = o, n.left = function(t) {
                            return t.replace(/^\s*/, "")
                        }, n.right = function(t) {
                            return t.replace(/\s*$/, "")
                        }
                    }, {}],
                    61: [function(t, e, n) {
                        var o = t("trim"),
                            r = t("for-each"),
                            i = function(t) {
                                return "[object Array]" === Object.prototype.toString.call(t)
                            };
                        e.exports = function(t) {
                            if (!t) return {};
                            var e = {};
                            return r(o(t).split("\n"), function(t) {
                                var n = t.indexOf(":"),
                                    r = o(t.slice(0, n)).toLowerCase(),
                                    s = o(t.slice(n + 1));
                                "undefined" == typeof e[r] ? e[r] = s : i(e[r]) ? e[r].push(s) : e[r] = [e[r], s]
                            }), e
                        }
                    }, {
                        "for-each": 59,
                        trim: 60
                    }],
                    62: [function(t, e, n) {
                        function o() {
                            for (var t = {}, e = 0; e < arguments.length; e++) {
                                var n = arguments[e];
                                for (var o in n) r.call(n, o) && (t[o] = n[o])
                            }
                            return t
                        }
                        e.exports = o;
                        var r = Object.prototype.hasOwnProperty
                    }, {}],
                    63: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function r(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function i(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var s = t("./button.js"),
                            a = o(s),
                            l = t("./component.js"),
                            u = o(l),
                            c = function(t) {
                                function e(n, o) {
                                    r(this, e), t.call(this, n, o)
                                }
                                return i(e, t), e.prototype.buildCSSClass = function() {
                                    return "vjs-big-play-button"
                                }, e.prototype.handleClick = function() {
                                    this.player_.play()
                                }, e
                            }(a["default"]);
                        c.prototype.controlText_ = "Play Video", u["default"].registerComponent("BigPlayButton", c), n["default"] = c, e.exports = n["default"]
                    }, {
                        "./button.js": 64,
                        "./component.js": 67
                    }],
                    64: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function r(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function i(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function s(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var a = t("./clickable-component.js"),
                            l = r(a),
                            u = t("./component"),
                            c = r(u),
                            p = t("./utils/events.js"),
                            f = (o(p), t("./utils/fn.js")),
                            d = (o(f), t("./utils/log.js")),
                            h = r(d),
                            y = t("global/document"),
                            v = (r(y), t("object.assign")),
                            g = r(v),
                            m = function(t) {
                                function e(n, o) {
                                    i(this, e), t.call(this, n, o)
                                }
                                return s(e, t), e.prototype.createEl = function() {
                                    var t = arguments.length <= 0 || void 0 === arguments[0] ? "button" : arguments[0],
                                        e = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                                        n = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2];
                                    e = g["default"]({
                                        className: this.buildCSSClass()
                                    }, e), "button" !== t && h["default"].warn("Creating a Button with an HTML element of " + t + " is deprecated; use ClickableComponent instead."), n = g["default"]({
                                        type: "button",
                                        "aria-live": "polite"
                                    }, n);
                                    var o = c["default"].prototype.createEl.call(this, t, e, n);
                                    return this.createControlTextEl(o), o
                                }, e.prototype.addChild = function(t) {
                                    var e = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                                        n = this.constructor.name;
                                    return h["default"].warn("Adding an actionable (user controllable) child to a Button (" + n + ") is not supported; use a ClickableComponent instead."), c["default"].prototype.addChild.call(this, t, e)
                                }, e.prototype.handleKeyPress = function(e) {
                                    32 === e.which || 13 === e.which || t.prototype.handleKeyPress.call(this, e)
                                }, e
                            }(l["default"]);
                        c["default"].registerComponent("Button", m), n["default"] = m, e.exports = n["default"]
                    }, {
                        "./clickable-component.js": 65,
                        "./component": 67,
                        "./utils/events.js": 133,
                        "./utils/fn.js": 134,
                        "./utils/log.js": 137,
                        "global/document": 1,
                        "object.assign": 45
                    }],
                    65: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function r(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function i(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function s(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var a = t("./component"),
                            l = r(a),
                            u = t("./utils/dom.js"),
                            c = o(u),
                            p = t("./utils/events.js"),
                            f = o(p),
                            d = t("./utils/fn.js"),
                            h = o(d),
                            y = t("./utils/log.js"),
                            v = r(y),
                            g = t("global/document"),
                            m = r(g),
                            b = t("object.assign"),
                            _ = r(b),
                            j = function(t) {
                                function e(n, o) {
                                    i(this, e), t.call(this, n, o), this.emitTapEvents(), this.on("tap", this.handleClick), this.on("click", this.handleClick), this.on("focus", this.handleFocus), this.on("blur", this.handleBlur)
                                }
                                return s(e, t), e.prototype.createEl = function() {
                                    var e = arguments.length <= 0 || void 0 === arguments[0] ? "div" : arguments[0],
                                        n = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                                        o = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2];
                                    n = _["default"]({
                                        className: this.buildCSSClass(),
                                        tabIndex: 0
                                    }, n), "button" === e && v["default"].error("Creating a ClickableComponent with an HTML element of " + e + " is not supported; use a Button instead."), o = _["default"]({
                                        role: "button",
                                        "aria-live": "polite"
                                    }, o);
                                    var r = t.prototype.createEl.call(this, e, n, o);
                                    return this.createControlTextEl(r), r
                                }, e.prototype.createControlTextEl = function(t) {
                                    return this.controlTextEl_ = c.createEl("span", {
                                        className: "vjs-control-text"
                                    }), t && t.appendChild(this.controlTextEl_), this.controlText(this.controlText_), this.controlTextEl_
                                }, e.prototype.controlText = function(t) {
                                    return t ? (this.controlText_ = t, this.controlTextEl_.innerHTML = this.localize(this.controlText_), this) : this.controlText_ || "Need Text"
                                }, e.prototype.buildCSSClass = function() {
                                    return "vjs-control vjs-button " + t.prototype.buildCSSClass.call(this)
                                }, e.prototype.addChild = function(e) {
                                    var n = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                                    return t.prototype.addChild.call(this, e, n)
                                }, e.prototype.handleClick = function() {}, e.prototype.handleFocus = function() {
                                    f.on(m["default"], "keydown", h.bind(this, this.handleKeyPress))
                                }, e.prototype.handleKeyPress = function(e) {
                                    32 === e.which || 13 === e.which ? (e.preventDefault(), this.handleClick(e)) : t.prototype.handleKeyPress && t.prototype.handleKeyPress.call(this, e)
                                }, e.prototype.handleBlur = function() {
                                    f.off(m["default"], "keydown", h.bind(this, this.handleKeyPress))
                                }, e
                            }(l["default"]);
                        l["default"].registerComponent("ClickableComponent", j), n["default"] = j, e.exports = n["default"]
                    }, {
                        "./component": 67,
                        "./utils/dom.js": 132,
                        "./utils/events.js": 133,
                        "./utils/fn.js": 134,
                        "./utils/log.js": 137,
                        "global/document": 1,
                        "object.assign": 45
                    }],
                    66: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function r(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function i(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var s = t("./button"),
                            a = o(s),
                            l = t("./component"),
                            u = o(l),
                            c = function(t) {
                                function e(n, o) {
                                    r(this, e), t.call(this, n, o), this.controlText(o && o.controlText || this.localize("Close"))
                                }
                                return i(e, t), e.prototype.buildCSSClass = function() {
                                    return "vjs-close-button " + t.prototype.buildCSSClass.call(this)
                                }, e.prototype.handleClick = function() {
                                    this.trigger({
                                        type: "close",
                                        bubbles: !1
                                    })
                                }, e
                            }(a["default"]);
                        u["default"].registerComponent("CloseButton", c), n["default"] = c, e.exports = n["default"]
                    }, {
                        "./button": 64,
                        "./component": 67
                    }],
                    67: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function r(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function i(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }
                        n.__esModule = !0;
                        var s = t("global/window"),
                            a = r(s),
                            l = t("./utils/dom.js"),
                            u = o(l),
                            c = t("./utils/fn.js"),
                            p = o(c),
                            f = t("./utils/guid.js"),
                            d = o(f),
                            h = t("./utils/events.js"),
                            y = o(h),
                            v = t("./utils/log.js"),
                            g = r(v),
                            m = t("./utils/to-title-case.js"),
                            b = r(m),
                            _ = t("object.assign"),
                            j = r(_),
                            w = t("./utils/merge-options.js"),
                            O = r(w),
                            T = function() {
                                function t(e, n, o) {
                                    if (i(this, t), !e && this.play ? this.player_ = e = this : this.player_ = e, this.options_ = O["default"]({}, this.options_), n = this.options_ = O["default"](this.options_, n), this.id_ = n.id || n.el && n.el.id, !this.id_) {
                                        var r = e && e.id && e.id() || "no_player";
                                        this.id_ = r + "_component_" + d.newGUID()
                                    }
                                    this.name_ = n.name || null, n.el ? this.el_ = n.el : n.createEl !== !1 && (this.el_ = this.createEl()), this.children_ = [], this.childIndex_ = {}, this.childNameIndex_ = {}, n.initChildren !== !1 && this.initChildren(), this.ready(o), n.reportTouchActivity !== !1 && this.enableTouchActivity()
                                }
                                return t.prototype.dispose = function() {
                                    if (this.trigger({
                                            type: "dispose",
                                            bubbles: !1
                                        }), this.children_)
                                        for (var t = this.children_.length - 1; t >= 0; t--) this.children_[t].dispose && this.children_[t].dispose();
                                    this.children_ = null, this.childIndex_ = null, this.childNameIndex_ = null, this.off(), this.el_.parentNode && this.el_.parentNode.removeChild(this.el_), u.removeElData(this.el_), this.el_ = null
                                }, t.prototype.player = function() {
                                    return this.player_
                                }, t.prototype.options = function(t) {
                                    return g["default"].warn("this.options() has been deprecated and will be moved to the constructor in 6.0"), t ? (this.options_ = O["default"](this.options_, t), this.options_) : this.options_
                                }, t.prototype.el = function() {
                                    return this.el_
                                }, t.prototype.createEl = function(t, e, n) {
                                    return u.createEl(t, e, n)
                                }, t.prototype.localize = function(t) {
                                    var e = this.player_.language && this.player_.language(),
                                        n = this.player_.languages && this.player_.languages();
                                    if (!e || !n) return t;
                                    var o = n[e];
                                    if (o && o[t]) return o[t];
                                    var r = e.split("-")[0],
                                        i = n[r];
                                    return i && i[t] ? i[t] : t
                                }, t.prototype.contentEl = function() {
                                    return this.contentEl_ || this.el_
                                }, t.prototype.id = function() {
                                    return this.id_
                                }, t.prototype.name = function() {
                                    return this.name_
                                }, t.prototype.children = function() {
                                    return this.children_
                                }, t.prototype.getChildById = function(t) {
                                    return this.childIndex_[t]
                                }, t.prototype.getChild = function(t) {
                                    return this.childNameIndex_[t]
                                }, t.prototype.addChild = function(e) {
                                    var n = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                                        o = arguments.length <= 2 || void 0 === arguments[2] ? this.children_.length : arguments[2],
                                        r = void 0,
                                        i = void 0;
                                    if ("string" == typeof e) {
                                        i = e, n || (n = {}), n === !0 && (g["default"].warn("Initializing a child component with `true` is deprecated. Children should be defined in an array when possible, but if necessary use an object instead of `true`."), n = {});
                                        var s = n.componentClass || b["default"](i);
                                        n.name = i;
                                        var a = t.getComponent(s);
                                        if (!a) throw new Error("Component " + s + " does not exist");
                                        if ("function" != typeof a) return null;
                                        r = new a(this.player_ || this, n)
                                    } else r = e;
                                    if (this.children_.splice(o, 0, r), "function" == typeof r.id && (this.childIndex_[r.id()] = r), i = i || r.name && r.name(), i && (this.childNameIndex_[i] = r), "function" == typeof r.el && r.el()) {
                                        var l = this.contentEl().children,
                                            u = l[o] || null;
                                        this.contentEl().insertBefore(r.el(), u)
                                    }
                                    return r
                                }, t.prototype.removeChild = function(t) {
                                    if ("string" == typeof t && (t = this.getChild(t)), t && this.children_) {
                                        for (var e = !1, n = this.children_.length - 1; n >= 0; n--)
                                            if (this.children_[n] === t) {
                                                e = !0, this.children_.splice(n, 1);
                                                break
                                            }
                                        if (e) {
                                            this.childIndex_[t.id()] = null, this.childNameIndex_[t.name()] = null;
                                            var o = t.el();
                                            o && o.parentNode === this.contentEl() && this.contentEl().removeChild(t.el())
                                        }
                                    }
                                }, t.prototype.initChildren = function() {
                                    var e = this,
                                        n = this.options_.children;
                                    n && ! function() {
                                        var o = e.options_,
                                            r = function(t) {
                                                var n = t.name,
                                                    r = t.opts;
                                                if (void 0 !== o[n] && (r = o[n]), r !== !1) {
                                                    r === !0 && (r = {}), r.playerOptions = e.options_.playerOptions;
                                                    var i = e.addChild(n, r);
                                                    i && (e[n] = i)
                                                }
                                            },
                                            i = void 0,
                                            s = t.getComponent("Tech");
                                        i = Array.isArray(n) ? n : Object.keys(n), i.concat(Object.keys(e.options_).filter(function(t) {
                                            return !i.some(function(e) {
                                                return "string" == typeof e ? t === e : t === e.name
                                            })
                                        })).map(function(t) {
                                            var o = void 0,
                                                r = void 0;
                                            return "string" == typeof t ? (o = t, r = n[o] || e.options_[o] || {}) : (o = t.name, r = t), {
                                                name: o,
                                                opts: r
                                            }
                                        }).filter(function(e) {
                                            var n = t.getComponent(e.opts.componentClass || b["default"](e.name));
                                            return n && !s.isTech(n)
                                        }).forEach(r)
                                    }()
                                }, t.prototype.buildCSSClass = function() {
                                    return ""
                                }, t.prototype.on = function(t, e, n) {
                                    var o = this;
                                    return "string" == typeof t || Array.isArray(t) ? y.on(this.el_, t, p.bind(this, e)) : ! function() {
                                        var r = t,
                                            i = e,
                                            s = p.bind(o, n),
                                            a = function() {
                                                return o.off(r, i, s)
                                            };
                                        a.guid = s.guid, o.on("dispose", a);
                                        var l = function() {
                                            return o.off("dispose", a)
                                        };
                                        l.guid = s.guid, t.nodeName ? (y.on(r, i, s), y.on(r, "dispose", l)) : "function" == typeof t.on && (r.on(i, s), r.on("dispose", l))
                                    }(), this
                                }, t.prototype.off = function(t, e, n) {
                                    if (!t || "string" == typeof t || Array.isArray(t)) y.off(this.el_, t, e);
                                    else {
                                        var o = t,
                                            r = e,
                                            i = p.bind(this, n);
                                        this.off("dispose", i), t.nodeName ? (y.off(o, r, i), y.off(o, "dispose", i)) : (o.off(r, i), o.off("dispose", i))
                                    }
                                    return this
                                }, t.prototype.one = function(t, e, n) {
                                    var o = this,
                                        r = arguments;
                                    return "string" == typeof t || Array.isArray(t) ? y.one(this.el_, t, p.bind(this, e)) : ! function() {
                                        var i = t,
                                            s = e,
                                            a = p.bind(o, n),
                                            l = function u() {
                                                o.off(i, s, u), a.apply(null, r)
                                            };
                                        l.guid = a.guid, o.on(i, s, l)
                                    }(), this
                                }, t.prototype.trigger = function(t, e) {
                                    return y.trigger(this.el_, t, e), this
                                }, t.prototype.ready = function(t) {
                                    var e = arguments.length <= 1 || void 0 === arguments[1] ? !1 : arguments[1];
                                    return t && (this.isReady_ ? e ? t.call(this) : this.setTimeout(t, 1) : (this.readyQueue_ = this.readyQueue_ || [], this.readyQueue_.push(t))), this
                                }, t.prototype.triggerReady = function() {
                                    this.isReady_ = !0, this.setTimeout(function() {
                                        var t = this.readyQueue_;
                                        this.readyQueue_ = [], t && t.length > 0 && t.forEach(function(t) {
                                            t.call(this)
                                        }, this), this.trigger("ready")
                                    }, 1)
                                }, t.prototype.$ = function(t, e) {
                                    return u.$(t, e || this.contentEl())
                                }, t.prototype.$$ = function(t, e) {
                                    return u.$$(t, e || this.contentEl())
                                }, t.prototype.hasClass = function(t) {
                                    return u.hasElClass(this.el_, t)
                                }, t.prototype.addClass = function(t) {
                                    return u.addElClass(this.el_, t), this
                                }, t.prototype.removeClass = function(t) {
                                    return u.removeElClass(this.el_, t), this
                                }, t.prototype.toggleClass = function(t, e) {
                                    return u.toggleElClass(this.el_, t, e), this
                                }, t.prototype.show = function() {
                                    return this.removeClass("vjs-hidden"), this
                                }, t.prototype.hide = function() {
                                    return this.addClass("vjs-hidden"), this
                                }, t.prototype.lockShowing = function() {
                                    return this.addClass("vjs-lock-showing"), this
                                }, t.prototype.unlockShowing = function() {
                                    return this.removeClass("vjs-lock-showing"), this
                                }, t.prototype.width = function(t, e) {
                                    return this.dimension("width", t, e)
                                }, t.prototype.height = function(t, e) {
                                    return this.dimension("height", t, e)
                                }, t.prototype.dimensions = function(t, e) {
                                    return this.width(t, !0).height(e)
                                }, t.prototype.dimension = function(t, e, n) {
                                    if (void 0 !== e) return null !== e && e === e || (e = 0), -1 !== ("" + e).indexOf("%") || -1 !== ("" + e).indexOf("px") ? this.el_.style[t] = e : "auto" === e ? this.el_.style[t] = "" : this.el_.style[t] = e + "px", n || this.trigger("resize"), this;
                                    if (!this.el_) return 0;
                                    var o = this.el_.style[t],
                                        r = o.indexOf("px");
                                    return -1 !== r ? parseInt(o.slice(0, r), 10) : parseInt(this.el_["offset" + b["default"](t)], 10)
                                }, t.prototype.emitTapEvents = function() {
                                    var t = 0,
                                        e = null,
                                        n = 10,
                                        o = 200,
                                        r = void 0;
                                    this.on("touchstart", function(n) {
                                        1 === n.touches.length && (e = j["default"]({}, n.touches[0]), t = (new Date).getTime(), r = !0)
                                    }), this.on("touchmove", function(t) {
                                        if (t.touches.length > 1) r = !1;
                                        else if (e) {
                                            var o = t.touches[0].pageX - e.pageX,
                                                i = t.touches[0].pageY - e.pageY,
                                                s = Math.sqrt(o * o + i * i);
                                            s > n && (r = !1)
                                        }
                                    });
                                    var i = function() {
                                        r = !1
                                    };
                                    this.on("touchleave", i), this.on("touchcancel", i), this.on("touchend", function(n) {
                                        if (e = null, r === !0) {
                                            var i = (new Date).getTime() - t;
                                            o > i && (n.preventDefault(), this.trigger("tap"))
                                        }
                                    })
                                }, t.prototype.enableTouchActivity = function() {
                                    if (this.player() && this.player().reportUserActivity) {
                                        var t = p.bind(this.player(), this.player().reportUserActivity),
                                            e = void 0;
                                        this.on("touchstart", function() {
                                            t(), this.clearInterval(e), e = this.setInterval(t, 250)
                                        });
                                        var n = function(n) {
                                            t(), this.clearInterval(e)
                                        };
                                        this.on("touchmove", t), this.on("touchend", n), this.on("touchcancel", n)
                                    }
                                }, t.prototype.setTimeout = function(t, e) {
                                    t = p.bind(this, t);
                                    var n = a["default"].setTimeout(t, e),
                                        o = function() {
                                            this.clearTimeout(n)
                                        };
                                    return o.guid = "vjs-timeout-" + n, this.on("dispose", o), n
                                }, t.prototype.clearTimeout = function(t) {
                                    a["default"].clearTimeout(t);
                                    var e = function() {};
                                    return e.guid = "vjs-timeout-" + t, this.off("dispose", e), t
                                }, t.prototype.setInterval = function(t, e) {
                                    t = p.bind(this, t);
                                    var n = a["default"].setInterval(t, e),
                                        o = function() {
                                            this.clearInterval(n)
                                        };
                                    return o.guid = "vjs-interval-" + n, this.on("dispose", o), n
                                }, t.prototype.clearInterval = function(t) {
                                    a["default"].clearInterval(t);
                                    var e = function() {};
                                    return e.guid = "vjs-interval-" + t, this.off("dispose", e), t
                                }, t.registerComponent = function(e, n) {
                                    return t.components_ || (t.components_ = {}), t.components_[e] = n, n
                                }, t.getComponent = function(e) {
                                    return t.components_ && t.components_[e] ? t.components_[e] : a["default"] && a["default"].videojs && a["default"].videojs[e] ? (g["default"].warn("The " + e + " component was added to the videojs object when it should be registered using videojs.registerComponent(name, component)"), a["default"].videojs[e]) : void 0
                                }, t.extend = function(e) {
                                    e = e || {}, g["default"].warn("Component.extend({}) has been deprecated, use videojs.extend(Component, {}) instead");
                                    var n = e.init || e.init || this.prototype.init || this.prototype.init || function() {},
                                        o = function() {
                                            n.apply(this, arguments)
                                        };
                                    o.prototype = Object.create(this.prototype), o.prototype.constructor = o, o.extend = t.extend;
                                    for (var r in e) e.hasOwnProperty(r) && (o.prototype[r] = e[r]);
                                    return o
                                }, t
                            }();
                        T.registerComponent("Component", T), n["default"] = T, e.exports = n["default"]
                    }, {
                        "./utils/dom.js": 132,
                        "./utils/events.js": 133,
                        "./utils/fn.js": 134,
                        "./utils/guid.js": 136,
                        "./utils/log.js": 137,
                        "./utils/merge-options.js": 138,
                        "./utils/to-title-case.js": 141,
                        "global/window": 2,
                        "object.assign": 45
                    }],
                    68: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function r(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function i(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var s = t("../component.js"),
                            a = o(s),
                            l = t("./play-toggle.js"),
                            u = (o(l), t("./time-controls/current-time-display.js")),
                            c = (o(u), t("./time-controls/duration-display.js")),
                            p = (o(c), t("./time-controls/time-divider.js")),
                            f = (o(p), t("./time-controls/remaining-time-display.js")),
                            d = (o(f), t("./live-display.js")),
                            h = (o(d), t("./progress-control/progress-control.js")),
                            y = (o(h), t("./fullscreen-toggle.js")),
                            v = (o(y), t("./volume-control/volume-control.js")),
                            g = (o(v), t("./volume-menu-button.js")),
                            m = (o(g), t("./mute-toggle.js")),
                            b = (o(m), t("./text-track-controls/chapters-button.js")),
                            _ = (o(b), t("./text-track-controls/subtitles-button.js")),
                            j = (o(_), t("./text-track-controls/captions-button.js")),
                            w = (o(j), t("./playback-rate-menu/playback-rate-menu-button.js")),
                            O = (o(w), t("./spacer-controls/custom-control-spacer.js")),
                            T = (o(O), function(t) {
                                function e() {
                                    r(this, e), t.apply(this, arguments)
                                }
                                return i(e, t), e.prototype.createEl = function() {
                                    return t.prototype.createEl.call(this, "div", {
                                        className: "vjs-control-bar",
                                        dir: "ltr"
                                    }, {
                                        role: "group"
                                    })
                                }, e
                            }(a["default"]));
                        T.prototype.options_ = {
                            loadEvent: "play",
                            children: ["playToggle", "volumeMenuButton", "currentTimeDisplay", "timeDivider", "durationDisplay", "progressControl", "liveDisplay", "remainingTimeDisplay", "customControlSpacer", "playbackRateMenuButton", "chaptersButton", "subtitlesButton", "captionsButton", "fullscreenToggle"]
                        }, a["default"].registerComponent("ControlBar", T), n["default"] = T, e.exports = n["default"]
                    }, {
                        "../component.js": 67,
                        "./fullscreen-toggle.js": 69,
                        "./live-display.js": 70,
                        "./mute-toggle.js": 71,
                        "./play-toggle.js": 72,
                        "./playback-rate-menu/playback-rate-menu-button.js": 73,
                        "./progress-control/progress-control.js": 78,
                        "./spacer-controls/custom-control-spacer.js": 80,
                        "./text-track-controls/captions-button.js": 83,
                        "./text-track-controls/chapters-button.js": 84,
                        "./text-track-controls/subtitles-button.js": 87,
                        "./time-controls/current-time-display.js": 90,
                        "./time-controls/duration-display.js": 91,
                        "./time-controls/remaining-time-display.js": 92,
                        "./time-controls/time-divider.js": 93,
                        "./volume-control/volume-control.js": 95,
                        "./volume-menu-button.js": 97
                    }],
                    69: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function r(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function i(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var s = t("../button.js"),
                            a = o(s),
                            l = t("../component.js"),
                            u = o(l),
                            c = function(t) {
                                function e() {
                                    r(this, e), t.apply(this, arguments)
                                }
                                return i(e, t), e.prototype.buildCSSClass = function() {
                                    return "vjs-fullscreen-control " + t.prototype.buildCSSClass.call(this)
                                }, e.prototype.handleClick = function() {
                                    this.player_.isFullscreen() ? (this.player_.exitFullscreen(), this.controlText("Fullscreen")) : (this.player_.requestFullscreen(), this.controlText("Non-Fullscreen"))
                                }, e
                            }(a["default"]);
                        c.prototype.controlText_ = "Fullscreen", u["default"].registerComponent("FullscreenToggle", c), n["default"] = c, e.exports = n["default"]
                    }, {
                        "../button.js": 64,
                        "../component.js": 67
                    }],
                    70: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function r(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function i(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function s(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var a = t("../component"),
                            l = r(a),
                            u = t("../utils/dom.js"),
                            c = o(u),
                            p = function(t) {
                                function e(n, o) {
                                    i(this, e), t.call(this, n, o), this.updateShowing(), this.on(this.player(), "durationchange", this.updateShowing)
                                }
                                return s(e, t), e.prototype.createEl = function() {
                                    var e = t.prototype.createEl.call(this, "div", {
                                        className: "vjs-live-control vjs-control"
                                    });
                                    return this.contentEl_ = c.createEl("div", {
                                        className: "vjs-live-display",
                                        innerHTML: '<span class="vjs-control-text">' + this.localize("Stream Type") + "</span>" + this.localize("LIVE")
                                    }, {
                                        "aria-live": "off"
                                    }), e.appendChild(this.contentEl_), e
                                }, e.prototype.updateShowing = function() {
                                    this.player().duration() === 1 / 0 ? this.show() : this.hide()
                                }, e
                            }(l["default"]);
                        l["default"].registerComponent("LiveDisplay", p), n["default"] = p, e.exports = n["default"]
                    }, {
                        "../component": 67,
                        "../utils/dom.js": 132
                    }],
                    71: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function r(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function i(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function s(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var a = t("../button"),
                            l = r(a),
                            u = t("../component"),
                            c = r(u),
                            p = t("../utils/dom.js"),
                            f = o(p),
                            d = function(t) {
                                function e(n, o) {
                                    i(this, e), t.call(this, n, o), this.on(n, "volumechange", this.update), n.tech_ && n.tech_.featuresVolumeControl === !1 && this.addClass("vjs-hidden"), this.on(n, "loadstart", function() {
                                        this.update(), n.tech_.featuresVolumeControl === !1 ? this.addClass("vjs-hidden") : this.removeClass("vjs-hidden")
                                    })
                                }
                                return s(e, t), e.prototype.buildCSSClass = function() {
                                    return "vjs-mute-control " + t.prototype.buildCSSClass.call(this)
                                }, e.prototype.handleClick = function() {
                                    this.player_.muted(!this.player_.muted())
                                }, e.prototype.update = function() {
                                    var t = this.player_.volume(),
                                        e = 3;
                                    0 === t || this.player_.muted() ? e = 0 : .33 > t ? e = 1 : .67 > t && (e = 2);
                                    var n = this.player_.muted() ? "Unmute" : "Mute";
                                    this.controlText() !== n && this.controlText(n);
                                    for (var o = 0; 4 > o; o++) f.removeElClass(this.el_, "vjs-vol-" + o);
                                    f.addElClass(this.el_, "vjs-vol-" + e)
                                }, e
                            }(l["default"]);
                        d.prototype.controlText_ = "Mute", c["default"].registerComponent("MuteToggle", d), n["default"] = d,
                            e.exports = n["default"]
                    }, {
                        "../button": 64,
                        "../component": 67,
                        "../utils/dom.js": 132
                    }],
                    72: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function r(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function i(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var s = t("../button.js"),
                            a = o(s),
                            l = t("../component.js"),
                            u = o(l),
                            c = function(t) {
                                function e(n, o) {
                                    r(this, e), t.call(this, n, o), this.on(n, "play", this.handlePlay), this.on(n, "pause", this.handlePause)
                                }
                                return i(e, t), e.prototype.buildCSSClass = function() {
                                    return "vjs-play-control " + t.prototype.buildCSSClass.call(this)
                                }, e.prototype.handleClick = function() {
                                    this.player_.paused() ? this.player_.play() : this.player_.pause()
                                }, e.prototype.handlePlay = function() {
                                    this.removeClass("vjs-paused"), this.addClass("vjs-playing"), this.controlText("Pause")
                                }, e.prototype.handlePause = function() {
                                    this.removeClass("vjs-playing"), this.addClass("vjs-paused"), this.controlText("Play")
                                }, e
                            }(a["default"]);
                        c.prototype.controlText_ = "Play", u["default"].registerComponent("PlayToggle", c), n["default"] = c, e.exports = n["default"]
                    }, {
                        "../button.js": 64,
                        "../component.js": 67
                    }],
                    73: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function r(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function i(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function s(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var a = t("../../menu/menu-button.js"),
                            l = r(a),
                            u = t("../../menu/menu.js"),
                            c = r(u),
                            p = t("./playback-rate-menu-item.js"),
                            f = r(p),
                            d = t("../../component.js"),
                            h = r(d),
                            y = t("../../utils/dom.js"),
                            v = o(y),
                            g = function(t) {
                                function e(n, o) {
                                    i(this, e), t.call(this, n, o), this.updateVisibility(), this.updateLabel(), this.on(n, "loadstart", this.updateVisibility), this.on(n, "ratechange", this.updateLabel)
                                }
                                return s(e, t), e.prototype.createEl = function() {
                                    var e = t.prototype.createEl.call(this);
                                    return this.labelEl_ = v.createEl("div", {
                                        className: "vjs-playback-rate-value",
                                        innerHTML: 1
                                    }), e.appendChild(this.labelEl_), e
                                }, e.prototype.buildCSSClass = function() {
                                    return "vjs-playback-rate " + t.prototype.buildCSSClass.call(this)
                                }, e.prototype.createMenu = function() {
                                    var t = new c["default"](this.player()),
                                        e = this.playbackRates();
                                    if (e)
                                        for (var n = e.length - 1; n >= 0; n--) t.addChild(new f["default"](this.player(), {
                                            rate: e[n] + "x"
                                        }));
                                    return t
                                }, e.prototype.updateARIAAttributes = function() {
                                    this.el().setAttribute("aria-valuenow", this.player().playbackRate())
                                }, e.prototype.handleClick = function() {
                                    for (var t = this.player().playbackRate(), e = this.playbackRates(), n = e[0], o = 0; o < e.length; o++)
                                        if (e[o] > t) {
                                            n = e[o];
                                            break
                                        }
                                    this.player().playbackRate(n)
                                }, e.prototype.playbackRates = function() {
                                    return this.options_.playbackRates || this.options_.playerOptions && this.options_.playerOptions.playbackRates
                                }, e.prototype.playbackRateSupported = function() {
                                    return this.player().tech_ && this.player().tech_.featuresPlaybackRate && this.playbackRates() && this.playbackRates().length > 0
                                }, e.prototype.updateVisibility = function() {
                                    this.playbackRateSupported() ? this.removeClass("vjs-hidden") : this.addClass("vjs-hidden")
                                }, e.prototype.updateLabel = function() {
                                    this.playbackRateSupported() && (this.labelEl_.innerHTML = this.player().playbackRate() + "x")
                                }, e
                            }(l["default"]);
                        g.prototype.controlText_ = "Playback Rate", h["default"].registerComponent("PlaybackRateMenuButton", g), n["default"] = g, e.exports = n["default"]
                    }, {
                        "../../component.js": 67,
                        "../../menu/menu-button.js": 104,
                        "../../menu/menu.js": 106,
                        "../../utils/dom.js": 132,
                        "./playback-rate-menu-item.js": 74
                    }],
                    74: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function r(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function i(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var s = t("../../menu/menu-item.js"),
                            a = o(s),
                            l = t("../../component.js"),
                            u = o(l),
                            c = function(t) {
                                function e(n, o) {
                                    r(this, e);
                                    var i = o.rate,
                                        s = parseFloat(i, 10);
                                    o.label = i, o.selected = 1 === s, t.call(this, n, o), this.label = i, this.rate = s, this.on(n, "ratechange", this.update)
                                }
                                return i(e, t), e.prototype.handleClick = function() {
                                    t.prototype.handleClick.call(this), this.player().playbackRate(this.rate)
                                }, e.prototype.update = function() {
                                    this.selected(this.player().playbackRate() === this.rate)
                                }, e
                            }(a["default"]);
                        c.prototype.contentElType = "button", u["default"].registerComponent("PlaybackRateMenuItem", c), n["default"] = c, e.exports = n["default"]
                    }, {
                        "../../component.js": 67,
                        "../../menu/menu-item.js": 105
                    }],
                    75: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function r(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function i(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function s(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var a = t("../../component.js"),
                            l = r(a),
                            u = t("../../utils/dom.js"),
                            c = o(u),
                            p = function(t) {
                                function e(n, o) {
                                    i(this, e), t.call(this, n, o), this.on(n, "progress", this.update)
                                }
                                return s(e, t), e.prototype.createEl = function() {
                                    return t.prototype.createEl.call(this, "div", {
                                        className: "vjs-load-progress",
                                        innerHTML: '<span class="vjs-control-text"><span>' + this.localize("Loaded") + "</span>: 0%</span>"
                                    })
                                }, e.prototype.update = function() {
                                    var t = this.player_.buffered(),
                                        e = this.player_.duration(),
                                        n = this.player_.bufferedEnd(),
                                        o = this.el_.children,
                                        r = function(t, e) {
                                            var n = t / e || 0;
                                            return 100 * (n >= 1 ? 1 : n) + "%"
                                        };
                                    this.el_.style.width = r(n, e);
                                    for (var i = 0; i < t.length; i++) {
                                        var s = t.start(i),
                                            a = t.end(i),
                                            l = o[i];
                                        l || (l = this.el_.appendChild(c.createEl())), l.style.left = r(s, n), l.style.width = r(a - s, n)
                                    }
                                    for (var i = o.length; i > t.length; i--) this.el_.removeChild(o[i - 1])
                                }, e
                            }(l["default"]);
                        l["default"].registerComponent("LoadProgressBar", p), n["default"] = p, e.exports = n["default"]
                    }, {
                        "../../component.js": 67,
                        "../../utils/dom.js": 132
                    }],
                    76: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function r(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function i(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function s(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var a = t("../../component.js"),
                            l = r(a),
                            u = t("../../utils/dom.js"),
                            c = o(u),
                            p = t("../../utils/fn.js"),
                            f = o(p),
                            d = t("../../utils/format-time.js"),
                            h = r(d),
                            y = t("lodash-compat/function/throttle"),
                            v = r(y),
                            g = function(t) {
                                function e(n, o) {
                                    var r = this;
                                    i(this, e), t.call(this, n, o), this.update(0, 0), n.on("ready", function() {
                                        r.on(n.controlBar.progressControl.el(), "mousemove", v["default"](f.bind(r, r.handleMouseMove), 25))
                                    })
                                }
                                return s(e, t), e.prototype.createEl = function() {
                                    return t.prototype.createEl.call(this, "div", {
                                        className: "vjs-mouse-display"
                                    })
                                }, e.prototype.handleMouseMove = function(t) {
                                    var e = this.player_.duration(),
                                        n = this.calculateDistance(t) * e,
                                        o = t.pageX - c.findElPosition(this.el().parentNode).left;
                                    this.update(n, o)
                                }, e.prototype.update = function(t, e) {
                                    var n = h["default"](t, this.player_.duration());
                                    this.el().style.left = e + "px", this.el().setAttribute("data-current-time", n)
                                }, e.prototype.calculateDistance = function(t) {
                                    return c.getPointerPosition(this.el().parentNode, t).x
                                }, e
                            }(l["default"]);
                        l["default"].registerComponent("MouseTimeDisplay", g), n["default"] = g, e.exports = n["default"]
                    }, {
                        "../../component.js": 67,
                        "../../utils/dom.js": 132,
                        "../../utils/fn.js": 134,
                        "../../utils/format-time.js": 135,
                        "lodash-compat/function/throttle": 7
                    }],
                    77: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function r(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function i(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function s(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var a = t("../../component.js"),
                            l = r(a),
                            u = t("../../utils/fn.js"),
                            c = o(u),
                            p = t("../../utils/format-time.js"),
                            f = r(p),
                            d = function(t) {
                                function e(n, o) {
                                    i(this, e), t.call(this, n, o), this.updateDataAttr(), this.on(n, "timeupdate", this.updateDataAttr), n.ready(c.bind(this, this.updateDataAttr))
                                }
                                return s(e, t), e.prototype.createEl = function() {
                                    return t.prototype.createEl.call(this, "div", {
                                        className: "vjs-play-progress vjs-slider-bar",
                                        innerHTML: '<span class="vjs-control-text"><span>' + this.localize("Progress") + "</span>: 0%</span>"
                                    })
                                }, e.prototype.updateDataAttr = function() {
                                    var t = this.player_.scrubbing() ? this.player_.getCache().currentTime : this.player_.currentTime();
                                    this.el_.setAttribute("data-current-time", f["default"](t, this.player_.duration()))
                                }, e
                            }(l["default"]);
                        l["default"].registerComponent("PlayProgressBar", d), n["default"] = d, e.exports = n["default"]
                    }, {
                        "../../component.js": 67,
                        "../../utils/fn.js": 134,
                        "../../utils/format-time.js": 135
                    }],
                    78: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function r(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function i(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var s = t("../../component.js"),
                            a = o(s),
                            l = t("./seek-bar.js"),
                            u = (o(l), t("./mouse-time-display.js")),
                            c = (o(u), function(t) {
                                function e() {
                                    r(this, e), t.apply(this, arguments)
                                }
                                return i(e, t), e.prototype.createEl = function() {
                                    return t.prototype.createEl.call(this, "div", {
                                        className: "vjs-progress-control vjs-control"
                                    })
                                }, e
                            }(a["default"]));
                        c.prototype.options_ = {
                            children: ["seekBar"]
                        }, a["default"].registerComponent("ProgressControl", c), n["default"] = c, e.exports = n["default"]
                    }, {
                        "../../component.js": 67,
                        "./mouse-time-display.js": 76,
                        "./seek-bar.js": 79
                    }],
                    79: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function r(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function i(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function s(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var a = t("../../slider/slider.js"),
                            l = r(a),
                            u = t("../../component.js"),
                            c = r(u),
                            p = t("./load-progress-bar.js"),
                            f = (r(p), t("./play-progress-bar.js")),
                            d = (r(f), t("../../utils/fn.js")),
                            h = o(d),
                            y = t("../../utils/format-time.js"),
                            v = r(y),
                            g = t("object.assign"),
                            m = (r(g), function(t) {
                                function e(n, o) {
                                    i(this, e), t.call(this, n, o), this.on(n, "timeupdate", this.updateARIAAttributes), n.ready(h.bind(this, this.updateARIAAttributes))
                                }
                                return s(e, t), e.prototype.createEl = function() {
                                    return t.prototype.createEl.call(this, "div", {
                                        className: "vjs-progress-holder"
                                    }, {
                                        "aria-label": "video progress bar"
                                    })
                                }, e.prototype.updateARIAAttributes = function() {
                                    var t = this.player_.scrubbing() ? this.player_.getCache().currentTime : this.player_.currentTime();
                                    this.el_.setAttribute("aria-valuenow", (100 * this.getPercent()).toFixed(2)), this.el_.setAttribute("aria-valuetext", v["default"](t, this.player_.duration()))
                                }, e.prototype.getPercent = function() {
                                    var t = this.player_.currentTime() / this.player_.duration();
                                    return t >= 1 ? 1 : t
                                }, e.prototype.handleMouseDown = function(e) {
                                    t.prototype.handleMouseDown.call(this, e), this.player_.scrubbing(!0), this.videoWasPlaying = !this.player_.paused(), this.player_.pause()
                                }, e.prototype.handleMouseMove = function(t) {
                                    var e = this.calculateDistance(t) * this.player_.duration();
                                    e === this.player_.duration() && (e -= .1), this.player_.currentTime(e)
                                }, e.prototype.handleMouseUp = function(e) {
                                    t.prototype.handleMouseUp.call(this, e), this.player_.scrubbing(!1), this.videoWasPlaying && this.player_.play()
                                }, e.prototype.stepForward = function() {
                                    this.player_.currentTime(this.player_.currentTime() + 5)
                                }, e.prototype.stepBack = function() {
                                    this.player_.currentTime(this.player_.currentTime() - 5)
                                }, e
                            }(l["default"]));
                        m.prototype.options_ = {
                            children: ["loadProgressBar", "mouseTimeDisplay", "playProgressBar"],
                            barName: "playProgressBar"
                        }, m.prototype.playerEvent = "timeupdate", c["default"].registerComponent("SeekBar", m), n["default"] = m, e.exports = n["default"]
                    }, {
                        "../../component.js": 67,
                        "../../slider/slider.js": 114,
                        "../../utils/fn.js": 134,
                        "../../utils/format-time.js": 135,
                        "./load-progress-bar.js": 75,
                        "./play-progress-bar.js": 77,
                        "object.assign": 45
                    }],
                    80: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function r(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function i(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var s = t("./spacer.js"),
                            a = o(s),
                            l = t("../../component.js"),
                            u = o(l),
                            c = function(t) {
                                function e() {
                                    r(this, e), t.apply(this, arguments)
                                }
                                return i(e, t), e.prototype.buildCSSClass = function() {
                                    return "vjs-custom-control-spacer " + t.prototype.buildCSSClass.call(this)
                                }, e.prototype.createEl = function() {
                                    var e = t.prototype.createEl.call(this, {
                                        className: this.buildCSSClass()
                                    });
                                    return e.innerHTML = "&nbsp;", e
                                }, e
                            }(a["default"]);
                        u["default"].registerComponent("CustomControlSpacer", c), n["default"] = c, e.exports = n["default"]
                    }, {
                        "../../component.js": 67,
                        "./spacer.js": 81
                    }],
                    81: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function r(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function i(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var s = t("../../component.js"),
                            a = o(s),
                            l = function(t) {
                                function e() {
                                    r(this, e), t.apply(this, arguments)
                                }
                                return i(e, t), e.prototype.buildCSSClass = function() {
                                    return "vjs-spacer " + t.prototype.buildCSSClass.call(this)
                                }, e.prototype.createEl = function() {
                                    return t.prototype.createEl.call(this, "div", {
                                        className: this.buildCSSClass()
                                    })
                                }, e
                            }(a["default"]);
                        a["default"].registerComponent("Spacer", l), n["default"] = l, e.exports = n["default"]
                    }, {
                        "../../component.js": 67
                    }],
                    82: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function r(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function i(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var s = t("./text-track-menu-item.js"),
                            a = o(s),
                            l = t("../../component.js"),
                            u = o(l),
                            c = function(t) {
                                function e(n, o) {
                                    r(this, e), o.track = {
                                        kind: o.kind,
                                        player: n,
                                        label: o.kind + " settings",
                                        selectable: !1,
                                        "default": !1,
                                        mode: "disabled"
                                    }, o.selectable = !1, t.call(this, n, o), this.addClass("vjs-texttrack-settings"), this.controlText(", opens " + o.kind + " settings dialog")
                                }
                                return i(e, t), e.prototype.handleClick = function() {
                                    this.player().getChild("textTrackSettings").show(), this.player().getChild("textTrackSettings").el_.focus()
                                }, e
                            }(a["default"]);
                        u["default"].registerComponent("CaptionSettingsMenuItem", c), n["default"] = c, e.exports = n["default"]
                    }, {
                        "../../component.js": 67,
                        "./text-track-menu-item.js": 89
                    }],
                    83: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function r(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function i(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var s = t("./text-track-button.js"),
                            a = o(s),
                            l = t("../../component.js"),
                            u = o(l),
                            c = t("./caption-settings-menu-item.js"),
                            p = o(c),
                            f = function(t) {
                                function e(n, o, i) {
                                    r(this, e), t.call(this, n, o, i), this.el_.setAttribute("aria-label", "Captions Menu")
                                }
                                return i(e, t), e.prototype.buildCSSClass = function() {
                                    return "vjs-captions-button " + t.prototype.buildCSSClass.call(this)
                                }, e.prototype.update = function() {
                                    var e = 2;
                                    t.prototype.update.call(this), this.player().tech_ && this.player().tech_.featuresNativeTextTracks && (e = 1), this.items && this.items.length > e ? this.show() : this.hide()
                                }, e.prototype.createItems = function() {
                                    var e = [];
                                    return this.player().tech_ && this.player().tech_.featuresNativeTextTracks || e.push(new p["default"](this.player_, {
                                        kind: this.kind_
                                    })), t.prototype.createItems.call(this, e)
                                }, e
                            }(a["default"]);
                        f.prototype.kind_ = "captions", f.prototype.controlText_ = "Captions", u["default"].registerComponent("CaptionsButton", f), n["default"] = f, e.exports = n["default"]
                    }, {
                        "../../component.js": 67,
                        "./caption-settings-menu-item.js": 82,
                        "./text-track-button.js": 88
                    }],
                    84: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function r(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function i(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function s(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var a = t("./text-track-button.js"),
                            l = r(a),
                            u = t("../../component.js"),
                            c = r(u),
                            p = t("./text-track-menu-item.js"),
                            f = r(p),
                            d = t("./chapters-track-menu-item.js"),
                            h = r(d),
                            y = t("../../menu/menu.js"),
                            v = r(y),
                            g = t("../../utils/dom.js"),
                            m = o(g),
                            b = t("../../utils/fn.js"),
                            _ = (o(b), t("../../utils/to-title-case.js")),
                            j = r(_),
                            w = t("global/window"),
                            O = (r(w), function(t) {
                                function e(n, o, r) {
                                    i(this, e), t.call(this, n, o, r), this.el_.setAttribute("aria-label", "Chapters Menu")
                                }
                                return s(e, t), e.prototype.buildCSSClass = function() {
                                    return "vjs-chapters-button " + t.prototype.buildCSSClass.call(this)
                                }, e.prototype.createItems = function() {
                                    var t = [],
                                        e = this.player_.textTracks();
                                    if (!e) return t;
                                    for (var n = 0; n < e.length; n++) {
                                        var o = e[n];
                                        o.kind === this.kind_ && t.push(new f["default"](this.player_, {
                                            track: o
                                        }))
                                    }
                                    return t
                                }, e.prototype.createMenu = function() {
                                    for (var t = this, e = this.player_.textTracks() || [], n = void 0, o = this.items = [], r = 0, i = e.length; i > r; r++) {
                                        var s = e[r];
                                        if (s.kind === this.kind_) {
                                            n = s;
                                            break
                                        }
                                    }
                                    var a = this.menu;
                                    if (void 0 === a) {
                                        a = new v["default"](this.player_);
                                        var l = m.createEl("li", {
                                            className: "vjs-menu-title",
                                            innerHTML: j["default"](this.kind_),
                                            tabIndex: -1
                                        });
                                        a.children_.unshift(l), m.insertElFirst(l, a.contentEl())
                                    }
                                    if (n && null == n.cues) {
                                        n.mode = "hidden";
                                        var u = this.player_.remoteTextTrackEls().getTrackElementByTrack_(n);
                                        u && u.addEventListener("load", function(e) {
                                            return t.update()
                                        })
                                    }
                                    if (n && n.cues && n.cues.length > 0) {
                                        for (var c = n.cues, p = void 0, r = 0, f = c.length; f > r; r++) {
                                            p = c[r];
                                            var d = new h["default"](this.player_, {
                                                track: n,
                                                cue: p
                                            });
                                            o.push(d), a.addChild(d)
                                        }
                                        this.addChild(a)
                                    }
                                    return this.items.length > 0 && this.show(), a
                                }, e
                            }(l["default"]));
                        O.prototype.kind_ = "chapters", O.prototype.controlText_ = "Chapters", c["default"].registerComponent("ChaptersButton", O), n["default"] = O, e.exports = n["default"]
                    }, {
                        "../../component.js": 67,
                        "../../menu/menu.js": 106,
                        "../../utils/dom.js": 132,
                        "../../utils/fn.js": 134,
                        "../../utils/to-title-case.js": 141,
                        "./chapters-track-menu-item.js": 85,
                        "./text-track-button.js": 88,
                        "./text-track-menu-item.js": 89,
                        "global/window": 2
                    }],
                    85: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function r(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function i(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function s(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var a = t("../../menu/menu-item.js"),
                            l = r(a),
                            u = t("../../component.js"),
                            c = r(u),
                            p = t("../../utils/fn.js"),
                            f = o(p),
                            d = function(t) {
                                function e(n, o) {
                                    i(this, e);
                                    var r = o.track,
                                        s = o.cue,
                                        a = n.currentTime();
                                    o.label = s.text, o.selected = s.startTime <= a && a < s.endTime, t.call(this, n, o), this.track = r, this.cue = s, r.addEventListener("cuechange", f.bind(this, this.update))
                                }
                                return s(e, t), e.prototype.handleClick = function() {
                                    t.prototype.handleClick.call(this), this.player_.currentTime(this.cue.startTime), this.update(this.cue.startTime)
                                }, e.prototype.update = function() {
                                    var t = this.cue,
                                        e = this.player_.currentTime();
                                    this.selected(t.startTime <= e && e < t.endTime)
                                }, e
                            }(l["default"]);
                        c["default"].registerComponent("ChaptersTrackMenuItem", d), n["default"] = d, e.exports = n["default"]
                    }, {
                        "../../component.js": 67,
                        "../../menu/menu-item.js": 105,
                        "../../utils/fn.js": 134
                    }],
                    86: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function r(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function i(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var s = t("./text-track-menu-item.js"),
                            a = o(s),
                            l = t("../../component.js"),
                            u = o(l),
                            c = function(t) {
                                function e(n, o) {
                                    r(this, e), o.track = {
                                        kind: o.kind,
                                        player: n,
                                        label: o.kind + " off",
                                        "default": !1,
                                        mode: "disabled"
                                    }, o.selectable = !0, t.call(this, n, o), this.selected(!0)
                                }
                                return i(e, t), e.prototype.handleTracksChange = function(t) {
                                    for (var e = this.player().textTracks(), n = !0, o = 0, r = e.length; r > o; o++) {
                                        var i = e[o];
                                        if (i.kind === this.track.kind && "showing" === i.mode) {
                                            n = !1;
                                            break
                                        }
                                    }
                                    this.selected(n)
                                }, e
                            }(a["default"]);
                        u["default"].registerComponent("OffTextTrackMenuItem", c), n["default"] = c, e.exports = n["default"]
                    }, {
                        "../../component.js": 67,
                        "./text-track-menu-item.js": 89
                    }],
                    87: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function r(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function i(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var s = t("./text-track-button.js"),
                            a = o(s),
                            l = t("../../component.js"),
                            u = o(l),
                            c = function(t) {
                                function e(n, o, i) {
                                    r(this, e), t.call(this, n, o, i), this.el_.setAttribute("aria-label", "Subtitles Menu")
                                }
                                return i(e, t), e.prototype.buildCSSClass = function() {
                                    return "vjs-subtitles-button " + t.prototype.buildCSSClass.call(this)
                                }, e
                            }(a["default"]);
                        c.prototype.kind_ = "subtitles", c.prototype.controlText_ = "Subtitles", u["default"].registerComponent("SubtitlesButton", c), n["default"] = c, e.exports = n["default"]
                    }, {
                        "../../component.js": 67,
                        "./text-track-button.js": 88
                    }],
                    88: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function r(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function i(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function s(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var a = t("../../menu/menu-button.js"),
                            l = r(a),
                            u = t("../../component.js"),
                            c = r(u),
                            p = t("../../utils/fn.js"),
                            f = o(p),
                            d = t("./text-track-menu-item.js"),
                            h = r(d),
                            y = t("./off-text-track-menu-item.js"),
                            v = r(y),
                            g = function(t) {
                                function e(n, o) {
                                    i(this, e), t.call(this, n, o);
                                    var r = this.player_.textTracks();
                                    if (this.items.length <= 1 && this.hide(), r) {
                                        var s = f.bind(this, this.update);
                                        r.addEventListener("removetrack", s), r.addEventListener("addtrack", s), this.player_.on("dispose", function() {
                                            r.removeEventListener("removetrack", s), r.removeEventListener("addtrack", s)
                                        })
                                    }
                                }
                                return s(e, t), e.prototype.createItems = function() {
                                    var t = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0];
                                    t.push(new v["default"](this.player_, {
                                        kind: this.kind_
                                    }));
                                    var e = this.player_.textTracks();
                                    if (!e) return t;
                                    for (var n = 0; n < e.length; n++) {
                                        var o = e[n];
                                        o.kind === this.kind_ && t.push(new h["default"](this.player_, {
                                            selectable: !0,
                                            track: o
                                        }))
                                    }
                                    return t
                                }, e
                            }(l["default"]);
                        c["default"].registerComponent("TextTrackButton", g), n["default"] = g, e.exports = n["default"]
                    }, {
                        "../../component.js": 67,
                        "../../menu/menu-button.js": 104,
                        "../../utils/fn.js": 134,
                        "./off-text-track-menu-item.js": 86,
                        "./text-track-menu-item.js": 89
                    }],
                    89: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function r(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function i(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function s(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var a = t("../../menu/menu-item.js"),
                            l = r(a),
                            u = t("../../component.js"),
                            c = r(u),
                            p = t("../../utils/fn.js"),
                            f = o(p),
                            d = t("global/window"),
                            h = r(d),
                            y = t("global/document"),
                            v = r(y),
                            g = function(t) {
                                function e(n, o) {
                                    var r = this;
                                    i(this, e);
                                    var s = o.track,
                                        a = n.textTracks();
                                    o.label = s.label || s.language || "Unknown", o.selected = s["default"] || "showing" === s.mode, t.call(this, n, o), this.track = s, a && ! function() {
                                        var t = f.bind(r, r.handleTracksChange);
                                        a.addEventListener("change", t), r.on("dispose", function() {
                                            a.removeEventListener("change", t)
                                        })
                                    }(), a && void 0 === a.onchange && ! function() {
                                        var t = void 0;
                                        r.on(["tap", "click"], function() {
                                            if ("object" != typeof h["default"].Event) try {
                                                t = new h["default"].Event("change")
                                            } catch (e) {}
                                            t || (t = v["default"].createEvent("Event"), t.initEvent("change", !0, !0)), a.dispatchEvent(t)
                                        })
                                    }()
                                }
                                return s(e, t), e.prototype.handleClick = function(e) {
                                    var n = this.track.kind,
                                        o = this.player_.textTracks();
                                    if (t.prototype.handleClick.call(this, e), o)
                                        for (var r = 0; r < o.length; r++) {
                                            var i = o[r];
                                            i.kind === n && (i === this.track ? i.mode = "showing" : i.mode = "disabled")
                                        }
                                }, e.prototype.handleTracksChange = function(t) {
                                    this.selected("showing" === this.track.mode)
                                }, e
                            }(l["default"]);
                        c["default"].registerComponent("TextTrackMenuItem", g), n["default"] = g, e.exports = n["default"]
                    }, {
                        "../../component.js": 67,
                        "../../menu/menu-item.js": 105,
                        "../../utils/fn.js": 134,
                        "global/document": 1,
                        "global/window": 2
                    }],
                    90: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function r(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function i(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function s(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var a = t("../../component.js"),
                            l = r(a),
                            u = t("../../utils/dom.js"),
                            c = o(u),
                            p = t("../../utils/format-time.js"),
                            f = r(p),
                            d = function(t) {
                                function e(n, o) {
                                    i(this, e), t.call(this, n, o), this.on(n, "timeupdate", this.updateContent)
                                }
                                return s(e, t), e.prototype.createEl = function() {
                                    var e = t.prototype.createEl.call(this, "div", {
                                        className: "vjs-current-time vjs-time-control vjs-control"
                                    });
                                    return this.contentEl_ = c.createEl("div", {
                                        className: "vjs-current-time-display",
                                        innerHTML: '<span class="vjs-control-text">Current Time </span>0:00'
                                    }, {
                                        "aria-live": "off"
                                    }), e.appendChild(this.contentEl_), e
                                }, e.prototype.updateContent = function() {
                                    var t = this.player_.scrubbing() ? this.player_.getCache().currentTime : this.player_.currentTime(),
                                        e = this.localize("Current Time"),
                                        n = f["default"](t, this.player_.duration());
                                    n !== this.formattedTime_ && (this.formattedTime_ = n, this.contentEl_.innerHTML = '<span class="vjs-control-text">' + e + "</span> " + n)
                                }, e
                            }(l["default"]);
                        l["default"].registerComponent("CurrentTimeDisplay", d), n["default"] = d, e.exports = n["default"]
                    }, {
                        "../../component.js": 67,
                        "../../utils/dom.js": 132,
                        "../../utils/format-time.js": 135
                    }],
                    91: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function r(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function i(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function s(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var a = t("../../component.js"),
                            l = r(a),
                            u = t("../../utils/dom.js"),
                            c = o(u),
                            p = t("../../utils/format-time.js"),
                            f = r(p),
                            d = function(t) {
                                function e(n, o) {
                                    i(this, e), t.call(this, n, o), this.on(n, "timeupdate", this.updateContent), this.on(n, "loadedmetadata", this.updateContent)
                                }
                                return s(e, t), e.prototype.createEl = function() {
                                    var e = t.prototype.createEl.call(this, "div", {
                                        className: "vjs-duration vjs-time-control vjs-control"
                                    });
                                    return this.contentEl_ = c.createEl("div", {
                                        className: "vjs-duration-display",
                                        innerHTML: '<span class="vjs-control-text">' + this.localize("Duration Time") + "</span> 0:00"
                                    }, {
                                        "aria-live": "off"
                                    }), e.appendChild(this.contentEl_), e
                                }, e.prototype.updateContent = function() {
                                    var t = this.player_.duration();
                                    if (t && this.duration_ !== t) {
                                        this.duration_ = t;
                                        var e = this.localize("Duration Time"),
                                            n = f["default"](t);
                                        this.contentEl_.innerHTML = '<span class="vjs-control-text">' + e + "</span> " + n
                                    }
                                }, e
                            }(l["default"]);
                        l["default"].registerComponent("DurationDisplay", d), n["default"] = d, e.exports = n["default"]
                    }, {
                        "../../component.js": 67,
                        "../../utils/dom.js": 132,
                        "../../utils/format-time.js": 135
                    }],
                    92: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function r(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function i(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function s(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var a = t("../../component.js"),
                            l = r(a),
                            u = t("../../utils/dom.js"),
                            c = o(u),
                            p = t("../../utils/format-time.js"),
                            f = r(p),
                            d = function(t) {
                                function e(n, o) {
                                    i(this, e), t.call(this, n, o), this.on(n, "timeupdate", this.updateContent)
                                }
                                return s(e, t), e.prototype.createEl = function() {
                                    var e = t.prototype.createEl.call(this, "div", {
                                        className: "vjs-remaining-time vjs-time-control vjs-control"
                                    });
                                    return this.contentEl_ = c.createEl("div", {
                                        className: "vjs-remaining-time-display",
                                        innerHTML: '<span class="vjs-control-text">' + this.localize("Remaining Time") + "</span> -0:00"
                                    }, {
                                        "aria-live": "off"
                                    }), e.appendChild(this.contentEl_), e
                                }, e.prototype.updateContent = function() {
                                    if (this.player_.duration()) {
                                        var t = this.localize("Remaining Time"),
                                            e = f["default"](this.player_.remainingTime());
                                        e !== this.formattedTime_ && (this.formattedTime_ = e, this.contentEl_.innerHTML = '<span class="vjs-control-text">' + t + "</span> -" + e)
                                    }
                                }, e
                            }(l["default"]);
                        l["default"].registerComponent("RemainingTimeDisplay", d), n["default"] = d, e.exports = n["default"]
                    }, {
                        "../../component.js": 67,
                        "../../utils/dom.js": 132,
                        "../../utils/format-time.js": 135
                    }],
                    93: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function r(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function i(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var s = t("../../component.js"),
                            a = o(s),
                            l = function(t) {
                                function e() {
                                    r(this, e), t.apply(this, arguments)
                                }
                                return i(e, t), e.prototype.createEl = function() {
                                    return t.prototype.createEl.call(this, "div", {
                                        className: "vjs-time-control vjs-time-divider",
                                        innerHTML: "<div><span>/</span></div>"
                                    })
                                }, e
                            }(a["default"]);
                        a["default"].registerComponent("TimeDivider", l), n["default"] = l, e.exports = n["default"]
                    }, {
                        "../../component.js": 67
                    }],
                    94: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function r(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function i(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function s(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var a = t("../../slider/slider.js"),
                            l = r(a),
                            u = t("../../component.js"),
                            c = r(u),
                            p = t("../../utils/fn.js"),
                            f = o(p),
                            d = t("./volume-level.js"),
                            h = (r(d), function(t) {
                                function e(n, o) {
                                    i(this, e), t.call(this, n, o), this.on(n, "volumechange", this.updateARIAAttributes), n.ready(f.bind(this, this.updateARIAAttributes))
                                }
                                return s(e, t), e.prototype.createEl = function() {
                                    return t.prototype.createEl.call(this, "div", {
                                        className: "vjs-volume-bar vjs-slider-bar"
                                    }, {
                                        "aria-label": "volume level"
                                    })
                                }, e.prototype.handleMouseMove = function(t) {
                                    this.checkMuted(), this.player_.volume(this.calculateDistance(t))
                                }, e.prototype.checkMuted = function() {
                                    this.player_.muted() && this.player_.muted(!1)
                                }, e.prototype.getPercent = function() {
                                    return this.player_.muted() ? 0 : this.player_.volume()
                                }, e.prototype.stepForward = function() {
                                    this.checkMuted(), this.player_.volume(this.player_.volume() + .1)
                                }, e.prototype.stepBack = function() {
                                    this.checkMuted(), this.player_.volume(this.player_.volume() - .1)
                                }, e.prototype.updateARIAAttributes = function() {
                                    var t = (100 * this.player_.volume()).toFixed(2);
                                    this.el_.setAttribute("aria-valuenow", t), this.el_.setAttribute("aria-valuetext", t + "%")
                                }, e
                            }(l["default"]));
                        h.prototype.options_ = {
                            children: ["volumeLevel"],
                            barName: "volumeLevel"
                        }, h.prototype.playerEvent = "volumechange", c["default"].registerComponent("VolumeBar", h), n["default"] = h, e.exports = n["default"]
                    }, {
                        "../../component.js": 67,
                        "../../slider/slider.js": 114,
                        "../../utils/fn.js": 134,
                        "./volume-level.js": 96
                    }],
                    95: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function r(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function i(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var s = t("../../component.js"),
                            a = o(s),
                            l = t("./volume-bar.js"),
                            u = (o(l), function(t) {
                                function e(n, o) {
                                    r(this, e), t.call(this, n, o), n.tech_ && n.tech_.featuresVolumeControl === !1 && this.addClass("vjs-hidden"), this.on(n, "loadstart", function() {
                                        n.tech_.featuresVolumeControl === !1 ? this.addClass("vjs-hidden") : this.removeClass("vjs-hidden")
                                    })
                                }
                                return i(e, t), e.prototype.createEl = function() {
                                    return t.prototype.createEl.call(this, "div", {
                                        className: "vjs-volume-control vjs-control"
                                    })
                                }, e
                            }(a["default"]));
                        u.prototype.options_ = {
                            children: ["volumeBar"]
                        }, a["default"].registerComponent("VolumeControl", u), n["default"] = u, e.exports = n["default"]
                    }, {
                        "../../component.js": 67,
                        "./volume-bar.js": 94
                    }],
                    96: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function r(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function i(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var s = t("../../component.js"),
                            a = o(s),
                            l = function(t) {
                                function e() {
                                    r(this, e), t.apply(this, arguments)
                                }
                                return i(e, t), e.prototype.createEl = function() {
                                    return t.prototype.createEl.call(this, "div", {
                                        className: "vjs-volume-level",
                                        innerHTML: '<span class="vjs-control-text"></span>'
                                    })
                                }, e
                            }(a["default"]);
                        a["default"].registerComponent("VolumeLevel", l), n["default"] = l, e.exports = n["default"]
                    }, {
                        "../../component.js": 67
                    }],
                    97: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function r(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function i(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function s(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var a = t("../utils/fn.js"),
                            l = r(a),
                            u = t("../component.js"),
                            c = o(u),
                            p = t("../popup/popup.js"),
                            f = o(p),
                            d = t("../popup/popup-button.js"),
                            h = o(d),
                            y = t("./mute-toggle.js"),
                            v = o(y),
                            g = t("./volume-control/volume-bar.js"),
                            m = o(g),
                            b = t("global/document"),
                            _ = o(b),
                            j = function(t) {
                                function e(n) {
                                    function o() {
                                        n.tech_ && n.tech_.featuresVolumeControl === !1 ? this.addClass("vjs-hidden") : this.removeClass("vjs-hidden")
                                    }
                                    var r = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                                    i(this, e), void 0 === r.inline && (r.inline = !0), void 0 === r.vertical && (r.inline ? r.vertical = !1 : r.vertical = !0), r.volumeBar = r.volumeBar || {}, r.volumeBar.vertical = !!r.vertical, t.call(this, n, r), this.on(n, "volumechange", this.volumeUpdate), this.on(n, "loadstart", this.volumeUpdate), o.call(this), this.on(n, "loadstart", o), this.on(this.volumeBar, ["slideractive", "focus"], function() {
                                        this.addClass("vjs-slider-active")
                                    }), this.on(this.volumeBar, ["sliderinactive", "blur"], function() {
                                        this.removeClass("vjs-slider-active")
                                    }), this.on(this.volumeBar, ["focus"], function() {
                                        this.addClass("vjs-lock-showing")
                                    }), this.on(this.volumeBar, ["blur"], function() {
                                        this.removeClass("vjs-lock-showing")
                                    })
                                }
                                return s(e, t), e.prototype.buildCSSClass = function() {
                                    var e = "";
                                    return e = this.options_.vertical ? "vjs-volume-menu-button-vertical" : "vjs-volume-menu-button-horizontal", "vjs-volume-menu-button " + t.prototype.buildCSSClass.call(this) + " " + e
                                }, e.prototype.createPopup = function() {
                                    var t = new f["default"](this.player_, {
                                            contentElType: "div"
                                        }),
                                        e = new m["default"](this.player_, this.options_.volumeBar);
                                    return t.addChild(e), this.menuContent = t, this.volumeBar = e, this.attachVolumeBarEvents(), t
                                }, e.prototype.handleClick = function() {
                                    v["default"].prototype.handleClick.call(this), t.prototype.handleClick.call(this)
                                }, e.prototype.attachVolumeBarEvents = function() {
                                    this.menuContent.on(["mousedown", "touchdown"], l.bind(this, this.handleMouseDown))
                                }, e.prototype.handleMouseDown = function(t) {
                                    this.on(["mousemove", "touchmove"], l.bind(this.volumeBar, this.volumeBar.handleMouseMove)), this.on(_["default"], ["mouseup", "touchend"], this.handleMouseUp)
                                }, e.prototype.handleMouseUp = function(t) {
                                    this.off(["mousemove", "touchmove"], l.bind(this.volumeBar, this.volumeBar.handleMouseMove))
                                }, e
                            }(h["default"]);
                        j.prototype.volumeUpdate = v["default"].prototype.update, j.prototype.controlText_ = "Mute", c["default"].registerComponent("VolumeMenuButton", j), n["default"] = j, e.exports = n["default"]
                    }, {
                        "../component.js": 67,
                        "../popup/popup-button.js": 110,
                        "../popup/popup.js": 111,
                        "../utils/fn.js": 134,
                        "./mute-toggle.js": 71,
                        "./volume-control/volume-bar.js": 94,
                        "global/document": 1
                    }],
                    98: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function r(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function i(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function s(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var a = t("./component"),
                            l = r(a),
                            u = t("./modal-dialog"),
                            c = r(u),
                            p = t("./utils/dom"),
                            f = (o(p), t("./utils/merge-options")),
                            d = r(f),
                            h = function(t) {
                                function e(n, o) {
                                    i(this, e), t.call(this, n, o), this.on(n, "error", this.open)
                                }
                                return s(e, t), e.prototype.buildCSSClass = function() {
                                    return "vjs-error-display " + t.prototype.buildCSSClass.call(this)
                                }, e.prototype.content = function() {
                                    var t = this.player().error();
                                    return t ? this.localize(t.message) : ""
                                }, e
                            }(c["default"]);
                        h.prototype.options_ = d["default"](c["default"].prototype.options_, {
                            fillAlways: !0,
                            temporary: !1,
                            uncloseable: !0
                        }), l["default"].registerComponent("ErrorDisplay", h), n["default"] = h, e.exports = n["default"]
                    }, {
                        "./component": 67,
                        "./modal-dialog": 107,
                        "./utils/dom": 132,
                        "./utils/merge-options": 138
                    }],
                    99: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }
                        n.__esModule = !0;
                        var r = t("./utils/events.js"),
                            i = o(r),
                            s = function() {};
                        s.prototype.allowedEvents_ = {}, s.prototype.on = function(t, e) {
                            var n = this.addEventListener;
                            this.addEventListener = Function.prototype, i.on(this, t, e), this.addEventListener = n
                        }, s.prototype.addEventListener = s.prototype.on, s.prototype.off = function(t, e) {
                            i.off(this, t, e)
                        }, s.prototype.removeEventListener = s.prototype.off, s.prototype.one = function(t, e) {
                            i.one(this, t, e)
                        }, s.prototype.trigger = function(t) {
                            var e = t.type || t;
                            "string" == typeof t && (t = {
                                type: e
                            }), t = i.fixEvent(t), this.allowedEvents_[e] && this["on" + e] && this["on" + e](t), i.trigger(this, t)
                        }, s.prototype.dispatchEvent = s.prototype.trigger, n["default"] = s, e.exports = n["default"]
                    }, {
                        "./utils/events.js": 133
                    }],
                    100: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }
                        n.__esModule = !0;
                        var r = t("./utils/log"),
                            i = o(r),
                            s = function(t, e) {
                                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                                t.prototype = Object.create(e && e.prototype, {
                                    constructor: {
                                        value: t,
                                        enumerable: !1,
                                        writable: !0,
                                        configurable: !0
                                    }
                                }), e && (t.super_ = e)
                            },
                            a = function(t) {
                                var e = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                                    n = function() {
                                        t.apply(this, arguments)
                                    },
                                    o = {};
                                "object" == typeof e ? ("function" == typeof e.init && (i["default"].warn("Constructor logic via init() is deprecated; please use constructor() instead."), e.constructor = e.init), e.constructor !== Object.prototype.constructor && (n = e.constructor), o = e) : "function" == typeof e && (n = e), s(n, t);
                                for (var r in o) o.hasOwnProperty(r) && (n.prototype[r] = o[r]);
                                return n
                            };
                        n["default"] = a, e.exports = n["default"]
                    }, {
                        "./utils/log": 137
                    }],
                    101: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }
                        n.__esModule = !0;
                        for (var r = t("global/document"), i = o(r), s = {}, a = [
                                ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
                                ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
                                ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
                                ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
                                ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
                            ], l = a[0], u = void 0, c = 0; c < a.length; c++)
                            if (a[c][1] in i["default"]) {
                                u = a[c];
                                break
                            }
                        if (u)
                            for (var c = 0; c < u.length; c++) s[l[c]] = u[c];
                        n["default"] = s, e.exports = n["default"]
                    }, {
                        "global/document": 1
                    }],
                    102: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function r(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function i(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var s = t("./component"),
                            a = o(s),
                            l = function(t) {
                                function e() {
                                    r(this, e), t.apply(this, arguments)
                                }
                                return i(e, t), e.prototype.createEl = function() {
                                    return t.prototype.createEl.call(this, "div", {
                                        className: "vjs-loading-spinner",
                                        dir: "ltr"
                                    })
                                }, e
                            }(a["default"]);
                        a["default"].registerComponent("LoadingSpinner", l), n["default"] = l, e.exports = n["default"]
                    }, {
                        "./component": 67
                    }],
                    103: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }
                        n.__esModule = !0;
                        var r = t("object.assign"),
                            i = o(r),
                            s = function l(t) {
                                "number" == typeof t ? this.code = t : "string" == typeof t ? this.message = t : "object" == typeof t && i["default"](this, t), this.message || (this.message = l.defaultMessages[this.code] || "")
                            };
                        s.prototype.code = 0, s.prototype.message = "", s.prototype.status = null, s.errorTypes = ["MEDIA_ERR_CUSTOM", "MEDIA_ERR_ABORTED", "MEDIA_ERR_NETWORK", "MEDIA_ERR_DECODE", "MEDIA_ERR_SRC_NOT_SUPPORTED", "MEDIA_ERR_ENCRYPTED"], s.defaultMessages = {
                            1: "You aborted the media playback",
                            2: "A network error caused the media download to fail part-way.",
                            3: "The media playback was aborted due to a corruption problem or because the media used features your browser did not support.",
                            4: "The media could not be loaded, either because the server or network failed or because the format is not supported.",
                            5: "The media is encrypted and we do not have the keys to decrypt it."
                        };
                        for (var a = 0; a < s.errorTypes.length; a++) s[s.errorTypes[a]] = a, s.prototype[s.errorTypes[a]] = a;
                        n["default"] = s, e.exports = n["default"]
                    }, {
                        "object.assign": 45
                    }],
                    104: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function r(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function i(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function s(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var a = t("../clickable-component.js"),
                            l = r(a),
                            u = t("../component.js"),
                            c = r(u),
                            p = t("./menu.js"),
                            f = r(p),
                            d = t("../utils/dom.js"),
                            h = o(d),
                            y = t("../utils/fn.js"),
                            v = o(y),
                            g = t("../utils/to-title-case.js"),
                            m = r(g),
                            b = function(t) {
                                function e(n) {
                                    var o = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                                    i(this, e), t.call(this, n, o), this.update(), this.el_.setAttribute("aria-haspopup", !0), this.el_.setAttribute("role", "menuitem"), this.on("keydown", this.handleSubmenuKeyPress)
                                }
                                return s(e, t), e.prototype.update = function() {
                                    var t = this.createMenu();
                                    this.menu && this.removeChild(this.menu), this.menu = t, this.addChild(t), this.buttonPressed_ = !1, this.el_.setAttribute("aria-expanded", !1), this.items && 0 === this.items.length ? this.hide() : this.items && this.items.length > 1 && this.show()
                                }, e.prototype.createMenu = function() {
                                    var t = new f["default"](this.player_);
                                    if (this.options_.title) {
                                        var e = h.createEl("li", {
                                            className: "vjs-menu-title",
                                            innerHTML: m["default"](this.options_.title),
                                            tabIndex: -1
                                        });
                                        t.children_.unshift(e), h.insertElFirst(e, t.contentEl())
                                    }
                                    if (this.items = this.createItems(), this.items)
                                        for (var n = 0; n < this.items.length; n++) t.addItem(this.items[n]);
                                    return t
                                }, e.prototype.createItems = function() {}, e.prototype.createEl = function() {
                                    return t.prototype.createEl.call(this, "div", {
                                        className: this.buildCSSClass()
                                    })
                                }, e.prototype.buildCSSClass = function() {
                                    var e = "vjs-menu-button";
                                    return e += this.options_.inline === !0 ? "-inline" : "-popup", "vjs-menu-button " + e + " " + t.prototype.buildCSSClass.call(this)
                                }, e.prototype.handleClick = function() {
                                    this.one("mouseout", v.bind(this, function() {
                                        this.menu.unlockShowing(), this.el_.blur()
                                    })), this.buttonPressed_ ? this.unpressButton() : this.pressButton()
                                }, e.prototype.handleKeyPress = function(e) {
                                    27 === e.which || 9 === e.which ? (this.buttonPressed_ && this.unpressButton(), 9 !== e.which && e.preventDefault()) : 38 === e.which || 40 === e.which ? this.buttonPressed_ || (this.pressButton(), e.preventDefault()) : t.prototype.handleKeyPress.call(this, e)
                                }, e.prototype.handleSubmenuKeyPress = function(t) {
                                    27 !== t.which && 9 !== t.which || (this.buttonPressed_ && this.unpressButton(), 9 !== t.which && t.preventDefault())
                                }, e.prototype.pressButton = function() {
                                    this.buttonPressed_ = !0, this.menu.lockShowing(), this.el_.setAttribute("aria-expanded", !0), this.menu.focus()
                                }, e.prototype.unpressButton = function() {
                                    this.buttonPressed_ = !1, this.menu.unlockShowing(), this.el_.setAttribute("aria-expanded", !1), this.el_.focus()
                                }, e
                            }(l["default"]);
                        c["default"].registerComponent("MenuButton", b), n["default"] = b, e.exports = n["default"]
                    }, {
                        "../clickable-component.js": 65,
                        "../component.js": 67,
                        "../utils/dom.js": 132,
                        "../utils/fn.js": 134,
                        "../utils/to-title-case.js": 141,
                        "./menu.js": 106
                    }],
                    105: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function r(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function i(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var s = t("../clickable-component.js"),
                            a = o(s),
                            l = t("../component.js"),
                            u = o(l),
                            c = t("object.assign"),
                            p = o(c),
                            f = function(t) {
                                function e(n, o) {
                                    r(this, e), t.call(this, n, o), this.selectable = o.selectable, this.selected(o.selected), this.selectable ? this.el_.setAttribute("role", "menuitemcheckbox") : this.el_.setAttribute("role", "menuitem")
                                }
                                return i(e, t), e.prototype.createEl = function(e, n, o) {
                                    return t.prototype.createEl.call(this, "li", p["default"]({
                                        className: "vjs-menu-item",
                                        innerHTML: this.localize(this.options_.label),
                                        tabIndex: -1
                                    }, n), o)
                                }, e.prototype.handleClick = function() {
                                    this.selected(!0)
                                }, e.prototype.selected = function(t) {
                                    this.selectable && (t ? (this.addClass("vjs-selected"), this.el_.setAttribute("aria-checked", !0), this.controlText(", selected")) : (this.removeClass("vjs-selected"), this.el_.setAttribute("aria-checked", !1), this.controlText(" ")))
                                }, e
                            }(a["default"]);
                        u["default"].registerComponent("MenuItem", f), n["default"] = f, e.exports = n["default"]
                    }, {
                        "../clickable-component.js": 65,
                        "../component.js": 67,
                        "object.assign": 45
                    }],
                    106: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function r(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function i(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function s(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var a = t("../component.js"),
                            l = r(a),
                            u = t("../utils/dom.js"),
                            c = o(u),
                            p = t("../utils/fn.js"),
                            f = o(p),
                            d = t("../utils/events.js"),
                            h = o(d),
                            y = function(t) {
                                function e(n, o) {
                                    i(this, e), t.call(this, n, o), this.focusedChild_ = -1, this.on("keydown", this.handleKeyPress)
                                }
                                return s(e, t), e.prototype.addItem = function(t) {
                                    this.addChild(t), t.on("click", f.bind(this, function() {
                                        this.unlockShowing()
                                    }))
                                }, e.prototype.createEl = function() {
                                    var e = this.options_.contentElType || "ul";
                                    this.contentEl_ = c.createEl(e, {
                                        className: "vjs-menu-content"
                                    }), this.contentEl_.setAttribute("role", "menu");
                                    var n = t.prototype.createEl.call(this, "div", {
                                        append: this.contentEl_,
                                        className: "vjs-menu"
                                    });
                                    return n.setAttribute("role", "presentation"), n.appendChild(this.contentEl_), h.on(n, "click", function(t) {
                                        t.preventDefault(), t.stopImmediatePropagation()
                                    }), n
                                }, e.prototype.handleKeyPress = function(t) {
                                    37 === t.which || 40 === t.which ? (t.preventDefault(), this.stepForward()) : 38 !== t.which && 39 !== t.which || (t.preventDefault(), this.stepBack())
                                }, e.prototype.stepForward = function() {
                                    var t = 0;
                                    void 0 !== this.focusedChild_ && (t = this.focusedChild_ + 1), this.focus(t)
                                }, e.prototype.stepBack = function() {
                                    var t = 0;
                                    void 0 !== this.focusedChild_ && (t = this.focusedChild_ - 1), this.focus(t)
                                }, e.prototype.focus = function() {
                                    var t = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0],
                                        e = this.children().slice(),
                                        n = e.length && e[0].className && /vjs-menu-title/.test(e[0].className);
                                    n && e.shift(), e.length > 0 && (0 > t ? t = 0 : t >= e.length && (t = e.length - 1), this.focusedChild_ = t, e[t].el_.focus())
                                }, e
                            }(l["default"]);
                        l["default"].registerComponent("Menu", y), n["default"] = y, e.exports = n["default"]
                    }, {
                        "../component.js": 67,
                        "../utils/dom.js": 132,
                        "../utils/events.js": 133,
                        "../utils/fn.js": 134
                    }],
                    107: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function r(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function i(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function s(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var a = t("global/document"),
                            l = r(a),
                            u = t("./utils/dom"),
                            c = o(u),
                            p = t("./utils/fn"),
                            f = o(p),
                            d = t("./utils/log"),
                            h = (r(d), t("./component")),
                            y = r(h),
                            v = t("./close-button"),
                            g = (r(v), "vjs-modal-dialog"),
                            m = 27,
                            b = function(t) {
                                function e(n, o) {
                                    i(this, e), t.call(this, n, o), this.opened_ = this.hasBeenOpened_ = this.hasBeenFilled_ = !1, this.closeable(!this.options_.uncloseable), this.content(this.options_.content), this.contentEl_ = c.createEl("div", {
                                        className: g + "-content"
                                    }, {
                                        role: "document"
                                    }), this.descEl_ = c.createEl("p", {
                                        className: g + "-description vjs-offscreen",
                                        id: this.el().getAttribute("aria-describedby")
                                    }), c.textContent(this.descEl_, this.description()), this.el_.appendChild(this.descEl_), this.el_.appendChild(this.contentEl_)
                                }
                                return s(e, t), e.prototype.createEl = function() {
                                    return t.prototype.createEl.call(this, "div", {
                                        className: this.buildCSSClass(),
                                        tabIndex: -1
                                    }, {
                                        "aria-describedby": this.id() + "_description",
                                        "aria-hidden": "true",
                                        "aria-label": this.label(),
                                        role: "dialog"
                                    })
                                }, e.prototype.buildCSSClass = function() {
                                    return g + " vjs-hidden " + t.prototype.buildCSSClass.call(this)
                                }, e.prototype.handleKeyPress = function(t) {
                                    t.which === m && this.closeable() && this.close()
                                }, e.prototype.label = function() {
                                    return this.options_.label || this.localize("Modal Window")
                                }, e.prototype.description = function() {
                                    var t = this.options_.description || this.localize("This is a modal window.");
                                    return this.closeable() && (t += " " + this.localize("This modal can be closed by pressing the Escape key or activating the close button.")), t
                                }, e.prototype.open = function() {
                                    if (!this.opened_) {
                                        var t = this.player();
                                        this.trigger("beforemodalopen"), this.opened_ = !0, (this.options_.fillAlways || !this.hasBeenOpened_ && !this.hasBeenFilled_) && this.fill(), this.wasPlaying_ = !t.paused(), this.wasPlaying_ && t.pause(), this.closeable() && this.on(l["default"], "keydown", f.bind(this, this.handleKeyPress)), t.controls(!1), this.show(), this.el().setAttribute("aria-hidden", "false"), this.trigger("modalopen"), this.hasBeenOpened_ = !0
                                    }
                                    return this
                                }, e.prototype.opened = function(t) {
                                    return "boolean" == typeof t && this[t ? "open" : "close"](), this.opened_
                                }, e.prototype.close = function() {
                                    if (this.opened_) {
                                        var t = this.player();
                                        this.trigger("beforemodalclose"), this.opened_ = !1, this.wasPlaying_ && t.play(), this.closeable() && this.off(l["default"], "keydown", f.bind(this, this.handleKeyPress)), t.controls(!0), this.hide(), this.el().setAttribute("aria-hidden", "true"), this.trigger("modalclose"), this.options_.temporary && this.dispose()
                                    }
                                    return this
                                }, e.prototype.closeable = function n(t) {
                                    if ("boolean" == typeof t) {
                                        var n = this.closeable_ = !!t,
                                            e = this.getChild("closeButton");
                                        if (n && !e) {
                                            var o = this.contentEl_;
                                            this.contentEl_ = this.el_, e = this.addChild("closeButton"), this.contentEl_ = o, this.on(e, "close", this.close)
                                        }!n && e && (this.off(e, "close", this.close), this.removeChild(e), e.dispose())
                                    }
                                    return this.closeable_
                                }, e.prototype.fill = function() {
                                    return this.fillWith(this.content())
                                }, e.prototype.fillWith = function(t) {
                                    var e = this.contentEl(),
                                        n = e.parentNode,
                                        o = e.nextSibling;
                                    return this.trigger("beforemodalfill"), this.hasBeenFilled_ = !0, n.removeChild(e), this.empty(), c.insertContent(e, t), this.trigger("modalfill"), o ? n.insertBefore(e, o) : n.appendChild(e), this
                                }, e.prototype.empty = function() {
                                    return this.trigger("beforemodalempty"), c.emptyEl(this.contentEl()), this.trigger("modalempty"), this
                                }, e.prototype.content = function(t) {
                                    return "undefined" != typeof t && (this.content_ = t), this.content_
                                }, e
                            }(y["default"]);
                        b.prototype.options_ = {
                            temporary: !0
                        }, y["default"].registerComponent("ModalDialog", b), n["default"] = b, e.exports = n["default"]
                    }, {
                        "./close-button": 66,
                        "./component": 67,
                        "./utils/dom": 132,
                        "./utils/fn": 134,
                        "./utils/log": 137,
                        "global/document": 1
                    }],
                    108: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function r(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function i(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function s(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var a = t("./component.js"),
                            l = r(a),
                            u = t("global/document"),
                            c = r(u),
                            p = t("global/window"),
                            f = r(p),
                            d = t("./utils/events.js"),
                            h = o(d),
                            y = t("./utils/dom.js"),
                            v = o(y),
                            g = t("./utils/fn.js"),
                            m = o(g),
                            b = t("./utils/guid.js"),
                            _ = o(b),
                            j = t("./utils/browser.js"),
                            w = o(j),
                            O = t("./utils/log.js"),
                            T = r(O),
                            E = t("./utils/to-title-case.js"),
                            C = r(E),
                            k = t("./utils/time-ranges.js"),
                            S = t("./utils/buffer.js"),
                            P = t("./utils/stylesheet.js"),
                            x = o(P),
                            A = t("./fullscreen-api.js"),
                            M = r(A),
                            L = t("./media-error.js"),
                            I = r(L),
                            D = t("safe-json-parse/tuple"),
                            R = r(D),
                            N = t("object.assign"),
                            F = r(N),
                            B = t("./utils/merge-options.js"),
                            H = r(B),
                            U = t("./tracks/text-track-list-converter.js"),
                            V = r(U),
                            q = t("./tech/loader.js"),
                            $ = (r(q), t("./poster-image.js")),
                            W = (r($), t("./tracks/text-track-display.js")),
                            G = (r(W), t("./loading-spinner.js")),
                            z = (r(G), t("./big-play-button.js")),
                            K = (r(z), t("./control-bar/control-bar.js")),
                            Y = (r(K), t("./error-display.js")),
                            X = (r(Y), t("./tracks/text-track-settings.js")),
                            Q = (r(X), t("./modal-dialog")),
                            J = r(Q),
                            Z = t("./tech/tech.js"),
                            tt = r(Z),
                            et = t("./tech/html5.js"),
                            nt = (r(et), function(t) {
                                function e(n, o, r) {
                                    var s = this;
                                    if (i(this, e), n.id = n.id || "vjs_video_" + _.newGUID(), o = F["default"](e.getTagSettings(n), o), o.initChildren = !1, o.createEl = !1, o.reportTouchActivity = !1, t.call(this, null, o, r), !this.options_ || !this.options_.techOrder || !this.options_.techOrder.length) throw new Error("No techOrder specified. Did you overwrite videojs.options instead of just changing the properties you want to override?");
                                    this.tag = n, this.tagAttributes = n && v.getElAttributes(n), this.language(this.options_.language), o.languages ? ! function() {
                                        var t = {};
                                        Object.getOwnPropertyNames(o.languages).forEach(function(e) {
                                            t[e.toLowerCase()] = o.languages[e]
                                        }), s.languages_ = t
                                    }() : this.languages_ = e.prototype.options_.languages, this.cache_ = {}, this.poster_ = o.poster || "", this.controls_ = !!o.controls, n.controls = !1, this.scrubbing_ = !1, this.el_ = this.createEl();
                                    var a = H["default"](this.options_);
                                    o.plugins && ! function() {
                                        var t = o.plugins;
                                        Object.getOwnPropertyNames(t).forEach(function(e) {
                                            "function" == typeof this[e] ? this[e](t[e]) : T["default"].error("Unable to find plugin:", e)
                                        }, s)
                                    }(), this.options_.playerOptions = a, this.initChildren(), this.isAudio("audio" === n.nodeName.toLowerCase()), this.controls() ? this.addClass("vjs-controls-enabled") : this.addClass("vjs-controls-disabled"), this.isAudio() && this.addClass("vjs-audio"), this.flexNotSupported_() && this.addClass("vjs-no-flex"), w.IS_IOS || this.addClass("vjs-workinghover"), e.players[this.id_] = this, this.userActive(!0), this.reportUserActivity(), this.listenForUserActivity_(), this.on("fullscreenchange", this.handleFullscreenChange_), this.on("stageclick", this.handleStageClick_)
                                }
                                return s(e, t), e.prototype.dispose = function() {
                                    this.trigger("dispose"), this.off("dispose"), this.styleEl_ && this.styleEl_.parentNode && this.styleEl_.parentNode.removeChild(this.styleEl_), e.players[this.id_] = null, this.tag && this.tag.player && (this.tag.player = null), this.el_ && this.el_.player && (this.el_.player = null), this.tech_ && this.tech_.dispose(), t.prototype.dispose.call(this)
                                }, e.prototype.createEl = function() {
                                    var e = this.el_ = t.prototype.createEl.call(this, "div"),
                                        n = this.tag;
                                    n.removeAttribute("width"), n.removeAttribute("height");
                                    var o = v.getElAttributes(n);
                                    Object.getOwnPropertyNames(o).forEach(function(t) {
                                            "class" === t ? e.className = o[t] : e.setAttribute(t, o[t])
                                        }), n.playerId = n.id,
                                        n.id += "_html5_api", n.className = "vjs-tech", n.player = e.player = this, this.addClass("vjs-paused"), this.styleEl_ = x.createStyleElement("vjs-styles-dimensions");
                                    var r = v.$(".vjs-styles-defaults"),
                                        i = v.$("head");
                                    return i.insertBefore(this.styleEl_, r ? r.nextSibling : i.firstChild), this.width(this.options_.width), this.height(this.options_.height), this.fluid(this.options_.fluid), this.aspectRatio(this.options_.aspectRatio), n.initNetworkState_ = n.networkState, n.parentNode && n.parentNode.insertBefore(e, n), v.insertElFirst(n, e), this.children_.unshift(n), this.el_ = e, e
                                }, e.prototype.width = function(t) {
                                    return this.dimension("width", t)
                                }, e.prototype.height = function(t) {
                                    return this.dimension("height", t)
                                }, e.prototype.dimension = function(t, e) {
                                    var n = t + "_";
                                    if (void 0 === e) return this[n] || 0;
                                    if ("" === e) this[n] = void 0;
                                    else {
                                        var o = parseFloat(e);
                                        if (isNaN(o)) return T["default"].error('Improper value "' + e + '" supplied for for ' + t), this;
                                        this[n] = o
                                    }
                                    return this.updateStyleEl_(), this
                                }, e.prototype.fluid = function(t) {
                                    return void 0 === t ? !!this.fluid_ : (this.fluid_ = !!t, void(t ? this.addClass("vjs-fluid") : this.removeClass("vjs-fluid")))
                                }, e.prototype.aspectRatio = function(t) {
                                    if (void 0 === t) return this.aspectRatio_;
                                    if (!/^\d+\:\d+$/.test(t)) throw new Error("Improper value supplied for aspect ratio. The format should be width:height, for example 16:9.");
                                    this.aspectRatio_ = t, this.fluid(!0), this.updateStyleEl_()
                                }, e.prototype.updateStyleEl_ = function() {
                                    var t = void 0,
                                        e = void 0,
                                        n = void 0,
                                        o = void 0;
                                    n = void 0 !== this.aspectRatio_ && "auto" !== this.aspectRatio_ ? this.aspectRatio_ : this.videoWidth() ? this.videoWidth() + ":" + this.videoHeight() : "16:9";
                                    var r = n.split(":"),
                                        i = r[1] / r[0];
                                    t = void 0 !== this.width_ ? this.width_ : void 0 !== this.height_ ? this.height_ / i : this.videoWidth() || 300, e = void 0 !== this.height_ ? this.height_ : t * i, o = /^[^a-zA-Z]/.test(this.id()) ? "dimensions-" + this.id() : this.id() + "-dimensions", this.addClass(o), x.setTextContent(this.styleEl_, "\n      ." + o + " {\n        width: " + t + "px;\n        height: " + e + "px;\n      }\n\n      ." + o + ".vjs-fluid {\n        padding-top: " + 100 * i + "%;\n      }\n    ")
                                }, e.prototype.loadTech_ = function(t, e) {
                                    this.tech_ && this.unloadTech_(), "Html5" !== t && this.tag && (tt["default"].getTech("Html5").disposeMediaElement(this.tag), this.tag.player = null, this.tag = null), this.techName_ = t, this.isReady_ = !1;
                                    var n = F["default"]({
                                        nativeControlsForTouch: this.options_.nativeControlsForTouch,
                                        source: e,
                                        playerId: this.id(),
                                        techId: this.id() + "_" + t + "_api",
                                        textTracks: this.textTracks_,
                                        autoplay: this.options_.autoplay,
                                        preload: this.options_.preload,
                                        loop: this.options_.loop,
                                        muted: this.options_.muted,
                                        poster: this.poster(),
                                        language: this.language(),
                                        "vtt.js": this.options_["vtt.js"]
                                    }, this.options_[t.toLowerCase()]);
                                    this.tag && (n.tag = this.tag), e && (this.currentType_ = e.type, e.src === this.cache_.src && this.cache_.currentTime > 0 && (n.startTime = this.cache_.currentTime), this.cache_.src = e.src);
                                    var o = tt["default"].getTech(t);
                                    o || (o = l["default"].getComponent(t)), this.tech_ = new o(n), this.tech_.ready(m.bind(this, this.handleTechReady_), !0), V["default"].jsonToTextTracks(this.textTracksJson_ || [], this.tech_), this.on(this.tech_, "loadstart", this.handleTechLoadStart_), this.on(this.tech_, "waiting", this.handleTechWaiting_), this.on(this.tech_, "canplay", this.handleTechCanPlay_), this.on(this.tech_, "canplaythrough", this.handleTechCanPlayThrough_), this.on(this.tech_, "playing", this.handleTechPlaying_), this.on(this.tech_, "ended", this.handleTechEnded_), this.on(this.tech_, "seeking", this.handleTechSeeking_), this.on(this.tech_, "seeked", this.handleTechSeeked_), this.on(this.tech_, "play", this.handleTechPlay_), this.on(this.tech_, "firstplay", this.handleTechFirstPlay_), this.on(this.tech_, "pause", this.handleTechPause_), this.on(this.tech_, "progress", this.handleTechProgress_), this.on(this.tech_, "durationchange", this.handleTechDurationChange_), this.on(this.tech_, "fullscreenchange", this.handleTechFullscreenChange_), this.on(this.tech_, "error", this.handleTechError_), this.on(this.tech_, "suspend", this.handleTechSuspend_), this.on(this.tech_, "abort", this.handleTechAbort_), this.on(this.tech_, "emptied", this.handleTechEmptied_), this.on(this.tech_, "stalled", this.handleTechStalled_), this.on(this.tech_, "loadedmetadata", this.handleTechLoadedMetaData_), this.on(this.tech_, "loadeddata", this.handleTechLoadedData_), this.on(this.tech_, "timeupdate", this.handleTechTimeUpdate_), this.on(this.tech_, "ratechange", this.handleTechRateChange_), this.on(this.tech_, "volumechange", this.handleTechVolumeChange_), this.on(this.tech_, "texttrackchange", this.handleTechTextTrackChange_), this.on(this.tech_, "loadedmetadata", this.updateStyleEl_), this.on(this.tech_, "posterchange", this.handleTechPosterChange_), this.usingNativeControls(this.techGet_("controls")), this.controls() && !this.usingNativeControls() && this.addTechControlsListeners_(), this.tech_.el().parentNode === this.el() || "Html5" === t && this.tag || v.insertElFirst(this.tech_.el(), this.el()), this.tag && (this.tag.player = null, this.tag = null)
                                }, e.prototype.unloadTech_ = function() {
                                    this.textTracks_ = this.textTracks(), this.textTracksJson_ = V["default"].textTracksToJson(this.tech_), this.isReady_ = !1, this.tech_.dispose(), this.tech_ = !1
                                }, e.prototype.tech = function(t) {
                                    if (t && t.IWillNotUseThisInPlugins) return this.tech_;
                                    var e = "\n      Please make sure that you are not using this inside of a plugin.\n      To disable this alert and error, please pass in an object with\n      `IWillNotUseThisInPlugins` to the `tech` method. See\n      https://github.com/videojs/video.js/issues/2617 for more info.\n    ";
                                    throw f["default"].alert(e), new Error(e)
                                }, e.prototype.addTechControlsListeners_ = function() {
                                    this.removeTechControlsListeners_(), this.on(this.tech_, "mousedown", this.handleTechClick_), this.on(this.tech_, "touchstart", this.handleTechTouchStart_), this.on(this.tech_, "touchmove", this.handleTechTouchMove_), this.on(this.tech_, "touchend", this.handleTechTouchEnd_), this.on(this.tech_, "tap", this.handleTechTap_)
                                }, e.prototype.removeTechControlsListeners_ = function() {
                                    this.off(this.tech_, "tap", this.handleTechTap_), this.off(this.tech_, "touchstart", this.handleTechTouchStart_), this.off(this.tech_, "touchmove", this.handleTechTouchMove_), this.off(this.tech_, "touchend", this.handleTechTouchEnd_), this.off(this.tech_, "mousedown", this.handleTechClick_)
                                }, e.prototype.handleTechReady_ = function() {
                                    this.triggerReady(), this.cache_.volume && this.techCall_("setVolume", this.cache_.volume), this.handleTechPosterChange_(), this.handleTechDurationChange_(), this.src() && this.tag && this.options_.autoplay && this.paused() && (delete this.tag.poster, this.play())
                                }, e.prototype.handleTechLoadStart_ = function() {
                                    this.removeClass("vjs-ended"), this.error(null), this.paused() ? (this.hasStarted(!1), this.trigger("loadstart")) : (this.trigger("loadstart"), this.trigger("firstplay"))
                                }, e.prototype.hasStarted = function(t) {
                                    return void 0 !== t ? (this.hasStarted_ !== t && (this.hasStarted_ = t, t ? (this.addClass("vjs-has-started"), this.trigger("firstplay")) : this.removeClass("vjs-has-started")), this) : !!this.hasStarted_
                                }, e.prototype.handleTechPlay_ = function() {
                                    this.removeClass("vjs-ended"), this.removeClass("vjs-paused"), this.addClass("vjs-playing"), this.hasStarted(!0), this.trigger("play")
                                }, e.prototype.handleTechWaiting_ = function() {
                                    var t = this;
                                    this.addClass("vjs-waiting"), this.trigger("waiting"), this.one("timeupdate", function() {
                                        return t.removeClass("vjs-waiting")
                                    })
                                }, e.prototype.handleTechCanPlay_ = function() {
                                    this.removeClass("vjs-waiting"), this.trigger("canplay")
                                }, e.prototype.handleTechCanPlayThrough_ = function() {
                                    this.removeClass("vjs-waiting"), this.trigger("canplaythrough")
                                }, e.prototype.handleTechPlaying_ = function() {
                                    this.removeClass("vjs-waiting"), this.trigger("playing")
                                }, e.prototype.handleTechSeeking_ = function() {
                                    this.addClass("vjs-seeking"), this.trigger("seeking")
                                }, e.prototype.handleTechSeeked_ = function() {
                                    this.removeClass("vjs-seeking"), this.trigger("seeked")
                                }, e.prototype.handleTechFirstPlay_ = function() {
                                    this.options_.starttime && this.currentTime(this.options_.starttime), this.addClass("vjs-has-started"), this.trigger("firstplay")
                                }, e.prototype.handleTechPause_ = function() {
                                    this.removeClass("vjs-playing"), this.addClass("vjs-paused"), this.trigger("pause")
                                }, e.prototype.handleTechProgress_ = function() {
                                    this.trigger("progress")
                                }, e.prototype.handleTechEnded_ = function() {
                                    this.addClass("vjs-ended"), this.options_.loop ? (this.currentTime(0), this.play()) : this.paused() || this.pause(), this.trigger("ended")
                                }, e.prototype.handleTechDurationChange_ = function() {
                                    this.duration(this.techGet_("duration"))
                                }, e.prototype.handleTechClick_ = function(t) {
                                    0 === t.button && this.controls() && (this.paused() ? this.play() : this.pause())
                                }, e.prototype.handleTechTap_ = function() {
                                    this.userActive(!this.userActive())
                                }, e.prototype.handleTechTouchStart_ = function() {
                                    this.userWasActive = this.userActive()
                                }, e.prototype.handleTechTouchMove_ = function() {
                                    this.userWasActive && this.reportUserActivity()
                                }, e.prototype.handleTechTouchEnd_ = function(t) {
                                    t.preventDefault()
                                }, e.prototype.handleFullscreenChange_ = function() {
                                    this.isFullscreen() ? this.addClass("vjs-fullscreen") : this.removeClass("vjs-fullscreen")
                                }, e.prototype.handleStageClick_ = function() {
                                    this.reportUserActivity()
                                }, e.prototype.handleTechFullscreenChange_ = function(t, e) {
                                    e && this.isFullscreen(e.isFullscreen), this.trigger("fullscreenchange")
                                }, e.prototype.handleTechError_ = function() {
                                    var t = this.tech_.error();
                                    this.error(t && t.code)
                                }, e.prototype.handleTechSuspend_ = function() {
                                    this.trigger("suspend")
                                }, e.prototype.handleTechAbort_ = function() {
                                    this.trigger("abort")
                                }, e.prototype.handleTechEmptied_ = function() {
                                    this.trigger("emptied")
                                }, e.prototype.handleTechStalled_ = function() {
                                    this.trigger("stalled")
                                }, e.prototype.handleTechLoadedMetaData_ = function() {
                                    this.trigger("loadedmetadata")
                                }, e.prototype.handleTechLoadedData_ = function() {
                                    this.trigger("loadeddata")
                                }, e.prototype.handleTechTimeUpdate_ = function() {
                                    this.trigger("timeupdate")
                                }, e.prototype.handleTechRateChange_ = function() {
                                    this.trigger("ratechange")
                                }, e.prototype.handleTechVolumeChange_ = function() {
                                    this.trigger("volumechange")
                                }, e.prototype.handleTechTextTrackChange_ = function() {
                                    this.trigger("texttrackchange")
                                }, e.prototype.getCache = function() {
                                    return this.cache_
                                }, e.prototype.techCall_ = function(t, e) {
                                    if (this.tech_ && !this.tech_.isReady_) this.tech_.ready(function() {
                                        this[t](e)
                                    }, !0);
                                    else try {
                                        this.tech_[t](e)
                                    } catch (n) {
                                        throw T["default"](n), n
                                    }
                                }, e.prototype.techGet_ = function(t) {
                                    if (this.tech_ && this.tech_.isReady_) try {
                                        return this.tech_[t]()
                                    } catch (e) {
                                        throw void 0 === this.tech_[t] ? T["default"]("Video.js: " + t + " method not defined for " + this.techName_ + " playback technology.", e) : "TypeError" === e.name ? (T["default"]("Video.js: " + t + " unavailable on " + this.techName_ + " playback technology element.", e), this.tech_.isReady_ = !1) : T["default"](e), e
                                    }
                                }, e.prototype.play = function() {
                                    return this.techCall_("play"), this
                                }, e.prototype.pause = function() {
                                    return this.techCall_("pause"), this
                                }, e.prototype.paused = function() {
                                    return this.techGet_("paused") !== !1
                                }, e.prototype.scrubbing = function(t) {
                                    return void 0 !== t ? (this.scrubbing_ = !!t, t ? this.addClass("vjs-scrubbing") : this.removeClass("vjs-scrubbing"), this) : this.scrubbing_
                                }, e.prototype.currentTime = function(t) {
                                    return void 0 !== t ? (this.techCall_("setCurrentTime", t), this) : this.cache_.currentTime = this.techGet_("currentTime") || 0
                                }, e.prototype.duration = function(t) {
                                    return void 0 === t ? this.cache_.duration || 0 : (t = parseFloat(t) || 0, 0 > t && (t = 1 / 0), t !== this.cache_.duration && (this.cache_.duration = t, t === 1 / 0 ? this.addClass("vjs-live") : this.removeClass("vjs-live"), this.trigger("durationchange")), this)
                                }, e.prototype.remainingTime = function() {
                                    return this.duration() - this.currentTime()
                                }, e.prototype.buffered = function n() {
                                    var n = this.techGet_("buffered");
                                    return n && n.length || (n = k.createTimeRange(0, 0)), n
                                }, e.prototype.bufferedPercent = function() {
                                    return S.bufferedPercent(this.buffered(), this.duration())
                                }, e.prototype.bufferedEnd = function() {
                                    var t = this.buffered(),
                                        e = this.duration(),
                                        n = t.end(t.length - 1);
                                    return n > e && (n = e), n
                                }, e.prototype.volume = function(t) {
                                    var e = void 0;
                                    return void 0 !== t ? (e = Math.max(0, Math.min(1, parseFloat(t))), this.cache_.volume = e, this.techCall_("setVolume", e), this) : (e = parseFloat(this.techGet_("volume")), isNaN(e) ? 1 : e)
                                }, e.prototype.muted = function(t) {
                                    return void 0 !== t ? (this.techCall_("setMuted", t), this) : this.techGet_("muted") || !1
                                }, e.prototype.supportsFullScreen = function() {
                                    return this.techGet_("supportsFullScreen") || !1
                                }, e.prototype.isFullscreen = function(t) {
                                    return void 0 !== t ? (this.isFullscreen_ = !!t, this) : !!this.isFullscreen_
                                }, e.prototype.requestFullscreen = function() {
                                    var t = M["default"];
                                    return this.isFullscreen(!0), t.requestFullscreen ? (h.on(c["default"], t.fullscreenchange, m.bind(this, function e(n) {
                                        this.isFullscreen(c["default"][t.fullscreenElement]), this.isFullscreen() === !1 && h.off(c["default"], t.fullscreenchange, e), this.trigger("fullscreenchange")
                                    })), this.el_[t.requestFullscreen]()) : this.tech_.supportsFullScreen() ? this.techCall_("enterFullScreen") : (this.enterFullWindow(), this.trigger("fullscreenchange")), this
                                }, e.prototype.exitFullscreen = function() {
                                    var t = M["default"];
                                    return this.isFullscreen(!1), t.requestFullscreen ? c["default"][t.exitFullscreen]() : this.tech_.supportsFullScreen() ? this.techCall_("exitFullScreen") : (this.exitFullWindow(), this.trigger("fullscreenchange")), this
                                }, e.prototype.enterFullWindow = function() {
                                    this.isFullWindow = !0, this.docOrigOverflow = c["default"].documentElement.style.overflow, h.on(c["default"], "keydown", m.bind(this, this.fullWindowOnEscKey)), c["default"].documentElement.style.overflow = "hidden", v.addElClass(c["default"].body, "vjs-full-window"), this.trigger("enterFullWindow")
                                }, e.prototype.fullWindowOnEscKey = function(t) {
                                    27 === t.keyCode && (this.isFullscreen() === !0 ? this.exitFullscreen() : this.exitFullWindow())
                                }, e.prototype.exitFullWindow = function() {
                                    this.isFullWindow = !1, h.off(c["default"], "keydown", this.fullWindowOnEscKey), c["default"].documentElement.style.overflow = this.docOrigOverflow, v.removeElClass(c["default"].body, "vjs-full-window"), this.trigger("exitFullWindow")
                                }, e.prototype.canPlayType = function(t) {
                                    for (var e = void 0, n = 0, o = this.options_.techOrder; n < o.length; n++) {
                                        var r = C["default"](o[n]),
                                            i = tt["default"].getTech(r);
                                        if (i || (i = l["default"].getComponent(r)), i) {
                                            if (i.isSupported() && (e = i.canPlayType(t))) return e
                                        } else T["default"].error('The "' + r + '" tech is undefined. Skipped browser support check for that tech.')
                                    }
                                    return ""
                                }, e.prototype.selectSource = function(t) {
                                    var e = this.options_.techOrder.map(C["default"]).map(function(t) {
                                            return [t, tt["default"].getTech(t) || l["default"].getComponent(t)]
                                        }).filter(function(t) {
                                            var e = t[0],
                                                n = t[1];
                                            return n ? n.isSupported() : (T["default"].error('The "' + e + '" tech is undefined. Skipped browser support check for that tech.'), !1)
                                        }),
                                        n = function(t, e, n) {
                                            var o = void 0;
                                            return t.some(function(t) {
                                                return e.some(function(e) {
                                                    return o = n(t, e), o ? !0 : void 0
                                                })
                                            }), o
                                        },
                                        o = void 0,
                                        r = function(t) {
                                            return function(e, n) {
                                                return t(n, e)
                                            }
                                        },
                                        i = function(t, e) {
                                            var n = t[0],
                                                o = t[1];
                                            return o.canPlaySource(e) ? {
                                                source: e,
                                                tech: n
                                            } : void 0
                                        };
                                    return o = this.options_.sourceOrder ? n(t, e, r(i)) : n(e, t, i), o || !1
                                }, e.prototype.src = function(t) {
                                    if (void 0 === t) return this.techGet_("src");
                                    var e = tt["default"].getTech(this.techName_);
                                    return e || (e = l["default"].getComponent(this.techName_)), Array.isArray(t) ? this.sourceList_(t) : "string" == typeof t ? this.src({
                                        src: t
                                    }) : t instanceof Object && (t.type && !e.canPlaySource(t) ? this.sourceList_([t]) : (this.cache_.src = t.src, this.currentType_ = t.type || "", this.ready(function() {
                                        e.prototype.hasOwnProperty("setSource") ? this.techCall_("setSource", t) : this.techCall_("src", t.src), "auto" === this.options_.preload && this.load(), this.options_.autoplay && this.play()
                                    }, !0))), this
                                }, e.prototype.sourceList_ = function(t) {
                                    var e = this.selectSource(t);
                                    e ? e.tech === this.techName_ ? this.src(e.source) : this.loadTech_(e.tech, e.source) : (this.setTimeout(function() {
                                        this.error({
                                            code: 4,
                                            message: this.localize(this.options_.notSupportedMessage)
                                        })
                                    }, 0), this.triggerReady())
                                }, e.prototype.load = function() {
                                    return this.techCall_("load"), this
                                }, e.prototype.reset = function() {
                                    return this.loadTech_(C["default"](this.options_.techOrder[0]), null), this.techCall_("reset"), this
                                }, e.prototype.currentSrc = function() {
                                    return this.techGet_("currentSrc") || this.cache_.src || ""
                                }, e.prototype.currentType = function() {
                                    return this.currentType_ || ""
                                }, e.prototype.preload = function(t) {
                                    return void 0 !== t ? (this.techCall_("setPreload", t), this.options_.preload = t, this) : this.techGet_("preload")
                                }, e.prototype.autoplay = function(t) {
                                    return void 0 !== t ? (this.techCall_("setAutoplay", t), this.options_.autoplay = t, this) : this.techGet_("autoplay", t)
                                }, e.prototype.loop = function(t) {
                                    return void 0 !== t ? (this.techCall_("setLoop", t), this.options_.loop = t, this) : this.techGet_("loop")
                                }, e.prototype.poster = function(t) {
                                    return void 0 === t ? this.poster_ : (t || (t = ""), this.poster_ = t, this.techCall_("setPoster", t), this.trigger("posterchange"), this)
                                }, e.prototype.handleTechPosterChange_ = function() {
                                    !this.poster_ && this.tech_ && this.tech_.poster && (this.poster_ = this.tech_.poster() || "", this.trigger("posterchange"))
                                }, e.prototype.controls = function(t) {
                                    return void 0 !== t ? (t = !!t, this.controls_ !== t && (this.controls_ = t, this.usingNativeControls() && this.techCall_("setControls", t), t ? (this.removeClass("vjs-controls-disabled"), this.addClass("vjs-controls-enabled"), this.trigger("controlsenabled"), this.usingNativeControls() || this.addTechControlsListeners_()) : (this.removeClass("vjs-controls-enabled"), this.addClass("vjs-controls-disabled"), this.trigger("controlsdisabled"), this.usingNativeControls() || this.removeTechControlsListeners_())), this) : !!this.controls_
                                }, e.prototype.usingNativeControls = function(t) {
                                    return void 0 !== t ? (t = !!t, this.usingNativeControls_ !== t && (this.usingNativeControls_ = t, t ? (this.addClass("vjs-using-native-controls"), this.trigger("usingnativecontrols")) : (this.removeClass("vjs-using-native-controls"), this.trigger("usingcustomcontrols"))), this) : !!this.usingNativeControls_
                                }, e.prototype.error = function(t) {
                                    return void 0 === t ? this.error_ || null : null === t ? (this.error_ = t, this.removeClass("vjs-error"), this.errorDisplay.close(), this) : (t instanceof I["default"] ? this.error_ = t : this.error_ = new I["default"](t), this.addClass("vjs-error"), T["default"].error("(CODE:" + this.error_.code + " " + I["default"].errorTypes[this.error_.code] + ")", this.error_.message, this.error_), this.trigger("error"), this)
                                }, e.prototype.ended = function() {
                                    return this.techGet_("ended")
                                }, e.prototype.seeking = function() {
                                    return this.techGet_("seeking")
                                }, e.prototype.seekable = function() {
                                    return this.techGet_("seekable")
                                }, e.prototype.reportUserActivity = function(t) {
                                    this.userActivity_ = !0
                                }, e.prototype.userActive = function(t) {
                                    return void 0 !== t ? (t = !!t, t !== this.userActive_ && (this.userActive_ = t, t ? (this.userActivity_ = !0, this.removeClass("vjs-user-inactive"), this.addClass("vjs-user-active"), this.trigger("useractive")) : (this.userActivity_ = !1, this.tech_ && this.tech_.one("mousemove", function(t) {
                                        t.stopPropagation(), t.preventDefault()
                                    }), this.removeClass("vjs-user-active"), this.addClass("vjs-user-inactive"), this.trigger("userinactive"))), this) : this.userActive_
                                }, e.prototype.listenForUserActivity_ = function() {
                                    var t = void 0,
                                        e = void 0,
                                        n = void 0,
                                        o = m.bind(this, this.reportUserActivity),
                                        r = function(t) {
                                            t.screenX === e && t.screenY === n || (e = t.screenX, n = t.screenY, o())
                                        },
                                        i = function() {
                                            o(), this.clearInterval(t), t = this.setInterval(o, 250)
                                        },
                                        s = function(e) {
                                            o(), this.clearInterval(t)
                                        };
                                    this.on("mousedown", i), this.on("mousemove", r), this.on("mouseup", s), this.on("keydown", o), this.on("keyup", o);
                                    var a = void 0;
                                    this.setInterval(function() {
                                        if (this.userActivity_) {
                                            this.userActivity_ = !1, this.userActive(!0), this.clearTimeout(a);
                                            var t = this.options_.inactivityTimeout;
                                            t > 0 && (a = this.setTimeout(function() {
                                                this.userActivity_ || this.userActive(!1)
                                            }, t))
                                        }
                                    }, 250)
                                }, e.prototype.playbackRate = function(t) {
                                    return void 0 !== t ? (this.techCall_("setPlaybackRate", t), this) : this.tech_ && this.tech_.featuresPlaybackRate ? this.techGet_("playbackRate") : 1
                                }, e.prototype.isAudio = function(t) {
                                    return void 0 !== t ? (this.isAudio_ = !!t, this) : !!this.isAudio_
                                }, e.prototype.networkState = function() {
                                    return this.techGet_("networkState")
                                }, e.prototype.readyState = function() {
                                    return this.techGet_("readyState")
                                }, e.prototype.textTracks = function() {
                                    return this.tech_ && this.tech_.textTracks()
                                }, e.prototype.remoteTextTracks = function() {
                                    return this.tech_ && this.tech_.remoteTextTracks()
                                }, e.prototype.remoteTextTrackEls = function() {
                                    return this.tech_ && this.tech_.remoteTextTrackEls()
                                }, e.prototype.addTextTrack = function(t, e, n) {
                                    return this.tech_ && this.tech_.addTextTrack(t, e, n)
                                }, e.prototype.addRemoteTextTrack = function(t) {
                                    return this.tech_ && this.tech_.addRemoteTextTrack(t)
                                }, e.prototype.removeRemoteTextTrack = function(t) {
                                    this.tech_ && this.tech_.removeRemoteTextTrack(t)
                                }, e.prototype.videoWidth = function() {
                                    return this.tech_ && this.tech_.videoWidth && this.tech_.videoWidth() || 0
                                }, e.prototype.videoHeight = function() {
                                    return this.tech_ && this.tech_.videoHeight && this.tech_.videoHeight() || 0
                                }, e.prototype.language = function(t) {
                                    return void 0 === t ? this.language_ : (this.language_ = ("" + t).toLowerCase(), this)
                                }, e.prototype.languages = function() {
                                    return H["default"](e.prototype.options_.languages, this.languages_)
                                }, e.prototype.toJSON = function() {
                                    var t = H["default"](this.options_),
                                        e = t.tracks;
                                    t.tracks = [];
                                    for (var n = 0; n < e.length; n++) {
                                        var o = e[n];
                                        o = H["default"](o), o.player = void 0, t.tracks[n] = o
                                    }
                                    return t
                                }, e.prototype.createModal = function(t, e) {
                                    var n = this;
                                    e = e || {}, e.content = t || "";
                                    var o = new J["default"](n, e);
                                    return n.addChild(o), o.on("dispose", function() {
                                        n.removeChild(o)
                                    }), o.open()
                                }, e.getTagSettings = function(t) {
                                    var e = {
                                            sources: [],
                                            tracks: []
                                        },
                                        n = v.getElAttributes(t),
                                        o = n["data-setup"];
                                    if (null !== o) {
                                        var r = R["default"](o || "{}"),
                                            i = r[0],
                                            s = r[1];
                                        i && T["default"].error(i), F["default"](n, s)
                                    }
                                    if (F["default"](e, n), t.hasChildNodes())
                                        for (var a = t.childNodes, l = 0, u = a.length; u > l; l++) {
                                            var c = a[l],
                                                p = c.nodeName.toLowerCase();
                                            "source" === p ? e.sources.push(v.getElAttributes(c)) : "track" === p && e.tracks.push(v.getElAttributes(c))
                                        }
                                    return e
                                }, e
                            }(l["default"]));
                        nt.players = {};
                        var ot = f["default"].navigator;
                        nt.prototype.options_ = {
                            techOrder: ["html5", "flash"],
                            html5: {},
                            flash: {},
                            defaultVolume: 0,
                            inactivityTimeout: 2e3,
                            playbackRates: [],
                            children: ["mediaLoader", "posterImage", "textTrackDisplay", "loadingSpinner", "bigPlayButton", "controlBar", "errorDisplay", "textTrackSettings"],
                            language: c["default"].getElementsByTagName("html")[0].getAttribute("lang") || ot.languages && ot.languages[0] || ot.userLanguage || ot.language || "en",
                            languages: {},
                            notSupportedMessage: "No compatible source was found for this media."
                        }, nt.prototype.handleLoadedMetaData_, nt.prototype.handleLoadedData_, nt.prototype.handleUserActive_, nt.prototype.handleUserInactive_, nt.prototype.handleTimeUpdate_, nt.prototype.handleTechEnded_, nt.prototype.handleVolumeChange_, nt.prototype.handleError_, nt.prototype.flexNotSupported_ = function() {
                            var t = c["default"].createElement("i");
                            return !("flexBasis" in t.style || "webkitFlexBasis" in t.style || "mozFlexBasis" in t.style || "msFlexBasis" in t.style || "msFlexOrder" in t.style)
                        }, l["default"].registerComponent("Player", nt), n["default"] = nt, e.exports = n["default"]
                    }, {
                        "./big-play-button.js": 63,
                        "./component.js": 67,
                        "./control-bar/control-bar.js": 68,
                        "./error-display.js": 98,
                        "./fullscreen-api.js": 101,
                        "./loading-spinner.js": 102,
                        "./media-error.js": 103,
                        "./modal-dialog": 107,
                        "./poster-image.js": 112,
                        "./tech/html5.js": 117,
                        "./tech/loader.js": 118,
                        "./tech/tech.js": 119,
                        "./tracks/text-track-display.js": 123,
                        "./tracks/text-track-list-converter.js": 125,
                        "./tracks/text-track-settings.js": 127,
                        "./utils/browser.js": 129,
                        "./utils/buffer.js": 130,
                        "./utils/dom.js": 132,
                        "./utils/events.js": 133,
                        "./utils/fn.js": 134,
                        "./utils/guid.js": 136,
                        "./utils/log.js": 137,
                        "./utils/merge-options.js": 138,
                        "./utils/stylesheet.js": 139,
                        "./utils/time-ranges.js": 140,
                        "./utils/to-title-case.js": 141,
                        "global/document": 1,
                        "global/window": 2,
                        "object.assign": 45,
                        "safe-json-parse/tuple": 54
                    }],
                    109: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }
                        n.__esModule = !0;
                        var r = t("./player.js"),
                            i = o(r),
                            s = function(t, e) {
                                i["default"].prototype[t] = e
                            };
                        n["default"] = s, e.exports = n["default"]
                    }, {
                        "./player.js": 108
                    }],
                    110: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function r(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function i(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function s(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var a = t("../clickable-component.js"),
                            l = r(a),
                            u = t("../component.js"),
                            c = r(u),
                            p = t("./popup.js"),
                            f = (r(p), t("../utils/dom.js")),
                            d = (o(f), t("../utils/fn.js")),
                            h = (o(d), t("../utils/to-title-case.js")),
                            y = (r(h), function(t) {
                                function e(n) {
                                    var o = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                                    i(this, e), t.call(this, n, o), this.update()
                                }
                                return s(e, t), e.prototype.update = function() {
                                    var t = this.createPopup();
                                    this.popup && this.removeChild(this.popup), this.popup = t, this.addChild(t), this.items && 0 === this.items.length ? this.hide() : this.items && this.items.length > 1 && this.show()
                                }, e.prototype.createPopup = function() {}, e.prototype.createEl = function() {
                                    return t.prototype.createEl.call(this, "div", {
                                        className: this.buildCSSClass()
                                    })
                                }, e.prototype.buildCSSClass = function() {
                                    var e = "vjs-menu-button";
                                    return e += this.options_.inline === !0 ? "-inline" : "-popup", "vjs-menu-button " + e + " " + t.prototype.buildCSSClass.call(this)
                                }, e
                            }(l["default"]));
                        c["default"].registerComponent("PopupButton", y), n["default"] = y, e.exports = n["default"]
                    }, {
                        "../clickable-component.js": 65,
                        "../component.js": 67,
                        "../utils/dom.js": 132,
                        "../utils/fn.js": 134,
                        "../utils/to-title-case.js": 141,
                        "./popup.js": 111
                    }],
                    111: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function r(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function i(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function s(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var a = t("../component.js"),
                            l = r(a),
                            u = t("../utils/dom.js"),
                            c = o(u),
                            p = t("../utils/fn.js"),
                            f = o(p),
                            d = t("../utils/events.js"),
                            h = o(d),
                            y = function(t) {
                                function e() {
                                    i(this, e), t.apply(this, arguments)
                                }
                                return s(e, t), e.prototype.addItem = function(t) {
                                    this.addChild(t), t.on("click", f.bind(this, function() {
                                        this.unlockShowing()
                                    }))
                                }, e.prototype.createEl = function() {
                                    var e = this.options_.contentElType || "ul";
                                    this.contentEl_ = c.createEl(e, {
                                        className: "vjs-menu-content"
                                    });
                                    var n = t.prototype.createEl.call(this, "div", {
                                        append: this.contentEl_,
                                        className: "vjs-menu"
                                    });
                                    return n.appendChild(this.contentEl_), h.on(n, "click", function(t) {
                                        t.preventDefault(), t.stopImmediatePropagation()
                                    }), n
                                }, e
                            }(l["default"]);
                        l["default"].registerComponent("Popup", y), n["default"] = y, e.exports = n["default"]
                    }, {
                        "../component.js": 67,
                        "../utils/dom.js": 132,
                        "../utils/events.js": 133,
                        "../utils/fn.js": 134
                    }],
                    112: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function r(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function i(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function s(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var a = t("./clickable-component.js"),
                            l = r(a),
                            u = t("./component.js"),
                            c = r(u),
                            p = t("./utils/fn.js"),
                            f = o(p),
                            d = t("./utils/dom.js"),
                            h = o(d),
                            y = t("./utils/browser.js"),
                            v = o(y),
                            g = function(t) {
                                function e(n, o) {
                                    i(this, e), t.call(this, n, o), this.update(), n.on("posterchange", f.bind(this, this.update))
                                }
                                return s(e, t), e.prototype.dispose = function() {
                                    this.player().off("posterchange", this.update), t.prototype.dispose.call(this)
                                }, e.prototype.createEl = function() {
                                    var t = h.createEl("div", {
                                        className: "vjs-poster",
                                        tabIndex: -1
                                    });
                                    return v.BACKGROUND_SIZE_SUPPORTED || (this.fallbackImg_ = h.createEl("img"), t.appendChild(this.fallbackImg_)), t
                                }, e.prototype.update = function() {
                                    var t = this.player().poster();
                                    this.setSrc(t), t ? this.show() : this.hide()
                                }, e.prototype.setSrc = function(t) {
                                    if (this.fallbackImg_) this.fallbackImg_.src = t;
                                    else {
                                        var e = "";
                                        t && (e = 'url("' + t + '")'), this.el_.style.backgroundImage = e
                                    }
                                }, e.prototype.handleClick = function() {
                                    this.player_.paused() ? this.player_.play() : this.player_.pause()
                                }, e
                            }(l["default"]);
                        c["default"].registerComponent("PosterImage", g), n["default"] = g, e.exports = n["default"]
                    }, {
                        "./clickable-component.js": 65,
                        "./component.js": 67,
                        "./utils/browser.js": 129,
                        "./utils/dom.js": 132,
                        "./utils/fn.js": 134
                    }],
                    113: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function r(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }
                        n.__esModule = !0;
                        var i = t("./utils/events.js"),
                            s = r(i),
                            a = t("global/document"),
                            l = o(a),
                            u = t("global/window"),
                            c = o(u),
                            p = !1,
                            f = void 0,
                            d = function() {
                                var t = l["default"].getElementsByTagName("video"),
                                    e = l["default"].getElementsByTagName("audio"),
                                    n = [];
                                if (t && t.length > 0)
                                    for (var o = 0, r = t.length; r > o; o++) n.push(t[o]);
                                if (e && e.length > 0)
                                    for (var o = 0, r = e.length; r > o; o++) n.push(e[o]);
                                if (n && n.length > 0)
                                    for (var o = 0, r = n.length; r > o; o++) {
                                        var i = n[o];
                                        if (!i || !i.getAttribute) {
                                            h(1);
                                            break
                                        }
                                        if (void 0 === i.player) {
                                            var s = i.getAttribute("data-setup");
                                            if (null !== s) {
                                                f(i)
                                            }
                                        }
                                    } else p || h(1)
                            },
                            h = function(t, e) {
                                e && (f = e), setTimeout(d, t)
                            };
                        "complete" === l["default"].readyState ? p = !0 : s.one(c["default"], "load", function() {
                            p = !0
                        });
                        var y = function() {
                            return p
                        };
                        n.autoSetup = d, n.autoSetupTimeout = h, n.hasLoaded = y
                    }, {
                        "./utils/events.js": 133,
                        "global/document": 1,
                        "global/window": 2
                    }],
                    114: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function r(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function i(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function s(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var a = t("../component.js"),
                            l = r(a),
                            u = t("../utils/dom.js"),
                            c = o(u),
                            p = t("global/document"),
                            f = r(p),
                            d = t("object.assign"),
                            h = r(d),
                            y = function(t) {
                                function e(n, o) {
                                    i(this, e), t.call(this, n, o), this.bar = this.getChild(this.options_.barName), this.vertical(!!this.options_.vertical), this.on("mousedown", this.handleMouseDown), this.on("touchstart", this.handleMouseDown), this.on("focus", this.handleFocus), this.on("blur", this.handleBlur), this.on("click", this.handleClick), this.on(n, "controlsvisible", this.update), this.on(n, this.playerEvent, this.update)
                                }
                                return s(e, t), e.prototype.createEl = function(e) {
                                    var n = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                                        o = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2];
                                    return n.className = n.className + " vjs-slider", n = h["default"]({
                                        tabIndex: 0
                                    }, n), o = h["default"]({
                                        role: "slider",
                                        "aria-valuenow": 0,
                                        "aria-valuemin": 0,
                                        "aria-valuemax": 100,
                                        tabIndex: 0
                                    }, o), t.prototype.createEl.call(this, e, n, o)
                                }, e.prototype.handleMouseDown = function(t) {
                                    t.preventDefault(), c.blockTextSelection(), this.addClass("vjs-sliding"), this.trigger("slideractive"), this.on(f["default"], "mousemove", this.handleMouseMove), this.on(f["default"], "mouseup", this.handleMouseUp), this.on(f["default"], "touchmove", this.handleMouseMove), this.on(f["default"], "touchend", this.handleMouseUp), this.handleMouseMove(t)
                                }, e.prototype.handleMouseMove = function() {}, e.prototype.handleMouseUp = function() {
                                    c.unblockTextSelection(), this.removeClass("vjs-sliding"), this.trigger("sliderinactive"), this.off(f["default"], "mousemove", this.handleMouseMove),
                                        this.off(f["default"], "mouseup", this.handleMouseUp), this.off(f["default"], "touchmove", this.handleMouseMove), this.off(f["default"], "touchend", this.handleMouseUp), this.update()
                                }, e.prototype.update = function() {
                                    if (this.el_) {
                                        var t = this.getPercent(),
                                            e = this.bar;
                                        if (e) {
                                            ("number" != typeof t || t !== t || 0 > t || t === 1 / 0) && (t = 0);
                                            var n = (100 * t).toFixed(2) + "%";
                                            this.vertical() ? e.el().style.height = n : e.el().style.width = n
                                        }
                                    }
                                }, e.prototype.calculateDistance = function(t) {
                                    var e = c.getPointerPosition(this.el_, t);
                                    return this.vertical() ? e.y : e.x
                                }, e.prototype.handleFocus = function() {
                                    this.on(f["default"], "keydown", this.handleKeyPress)
                                }, e.prototype.handleKeyPress = function(t) {
                                    37 === t.which || 40 === t.which ? (t.preventDefault(), this.stepBack()) : 38 !== t.which && 39 !== t.which || (t.preventDefault(), this.stepForward())
                                }, e.prototype.handleBlur = function() {
                                    this.off(f["default"], "keydown", this.handleKeyPress)
                                }, e.prototype.handleClick = function(t) {
                                    t.stopImmediatePropagation(), t.preventDefault()
                                }, e.prototype.vertical = function(t) {
                                    return void 0 === t ? this.vertical_ || !1 : (this.vertical_ = !!t, this.vertical_ ? this.addClass("vjs-slider-vertical") : this.addClass("vjs-slider-horizontal"), this)
                                }, e
                            }(l["default"]);
                        l["default"].registerComponent("Slider", y), n["default"] = y, e.exports = n["default"]
                    }, {
                        "../component.js": 67,
                        "../utils/dom.js": 132,
                        "global/document": 1,
                        "object.assign": 45
                    }],
                    115: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            return t.streamingFormats = {
                                "rtmp/mp4": "MP4",
                                "rtmp/flv": "FLV"
                            }, t.streamFromParts = function(t, e) {
                                return t + "&" + e
                            }, t.streamToParts = function(t) {
                                var e = {
                                    connection: "",
                                    stream: ""
                                };
                                if (!t) return e;
                                var n = t.search(/&(?!\w+=)/),
                                    o = void 0;
                                return -1 !== n ? o = n + 1 : (n = o = t.lastIndexOf("/") + 1, 0 === n && (n = o = t.length)), e.connection = t.substring(0, n), e.stream = t.substring(o, t.length), e
                            }, t.isStreamingType = function(e) {
                                return e in t.streamingFormats
                            }, t.RTMP_RE = /^rtmp[set]?:\/\//i, t.isStreamingSrc = function(e) {
                                return t.RTMP_RE.test(e)
                            }, t.rtmpSourceHandler = {}, t.rtmpSourceHandler.canPlayType = function(e) {
                                return t.isStreamingType(e) ? "maybe" : ""
                            }, t.rtmpSourceHandler.canHandleSource = function(e) {
                                var n = t.rtmpSourceHandler.canPlayType(e.type);
                                return n ? n : t.isStreamingSrc(e.src) ? "maybe" : ""
                            }, t.rtmpSourceHandler.handleSource = function(e, n) {
                                var o = t.streamToParts(e.src);
                                n.setRtmpConnection(o.connection), n.setRtmpStream(o.stream)
                            }, t.registerSourceHandler(t.rtmpSourceHandler), t
                        }
                        n.__esModule = !0, n["default"] = o, e.exports = n["default"]
                    }, {}],
                    116: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function r(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function i(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function s(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }

                        function a(t) {
                            var e = t.charAt(0).toUpperCase() + t.slice(1);
                            C["set" + e] = function(e) {
                                return this.el_.vjs_setProperty(t, e)
                            }
                        }

                        function l(t) {
                            C[t] = function() {
                                return this.el_.vjs_getProperty(t)
                            }
                        }
                        n.__esModule = !0;
                        for (var u = t("./tech"), c = r(u), p = t("../utils/dom.js"), f = o(p), d = t("../utils/url.js"), h = o(d), y = t("../utils/time-ranges.js"), v = t("./flash-rtmp"), g = r(v), m = t("../component"), b = r(m), _ = t("global/window"), j = r(_), w = t("object.assign"), O = r(w), T = j["default"].navigator, E = function(t) {
                                function e(n, o) {
                                    i(this, e), t.call(this, n, o), n.source && this.ready(function() {
                                        this.setSource(n.source)
                                    }, !0), n.startTime && this.ready(function() {
                                        this.load(), this.play(), this.currentTime(n.startTime)
                                    }, !0), j["default"].videojs = j["default"].videojs || {}, j["default"].videojs.Flash = j["default"].videojs.Flash || {}, j["default"].videojs.Flash.onReady = e.onReady, j["default"].videojs.Flash.onEvent = e.onEvent, j["default"].videojs.Flash.onError = e.onError, this.on("seeked", function() {
                                        this.lastSeekTarget_ = void 0
                                    })
                                }
                                return s(e, t), e.prototype.createEl = function() {
                                    var t = this.options_;
                                    t.swf || (t.swf = "//vjs.zencdn.net/swf/5.0.1/video-js.swf");
                                    var n = t.techId,
                                        o = O["default"]({
                                            readyFunction: "videojs.Flash.onReady",
                                            eventProxyFunction: "videojs.Flash.onEvent",
                                            errorEventProxyFunction: "videojs.Flash.onError",
                                            autoplay: t.autoplay,
                                            preload: t.preload,
                                            loop: t.loop,
                                            muted: t.muted
                                        }, t.flashVars),
                                        r = O["default"]({
                                            wmode: "opaque",
                                            bgcolor: "#000000"
                                        }, t.params),
                                        i = O["default"]({
                                            id: n,
                                            name: n,
                                            "class": "vjs-tech"
                                        }, t.attributes);
                                    return this.el_ = e.embed(t.swf, o, r, i), this.el_.tech = this, this.el_
                                }, e.prototype.play = function() {
                                    this.ended() && this.setCurrentTime(0), this.el_.vjs_play()
                                }, e.prototype.pause = function() {
                                    this.el_.vjs_pause()
                                }, e.prototype.src = function(t) {
                                    return void 0 === t ? this.currentSrc() : this.setSrc(t)
                                }, e.prototype.setSrc = function(t) {
                                    if (t = h.getAbsoluteURL(t), this.el_.vjs_src(t), this.autoplay()) {
                                        var e = this;
                                        this.setTimeout(function() {
                                            e.play()
                                        }, 0)
                                    }
                                }, e.prototype.seeking = function() {
                                    return void 0 !== this.lastSeekTarget_
                                }, e.prototype.setCurrentTime = function(e) {
                                    var n = this.seekable();
                                    n.length && (e = e > n.start(0) ? e : n.start(0), e = e < n.end(n.length - 1) ? e : n.end(n.length - 1), this.lastSeekTarget_ = e, this.trigger("seeking"), this.el_.vjs_setProperty("currentTime", e), t.prototype.setCurrentTime.call(this))
                                }, e.prototype.currentTime = function(t) {
                                    return this.seeking() ? this.lastSeekTarget_ || 0 : this.el_.vjs_getProperty("currentTime")
                                }, e.prototype.currentSrc = function() {
                                    return this.currentSource_ ? this.currentSource_.src : this.el_.vjs_getProperty("currentSrc")
                                }, e.prototype.load = function() {
                                    this.el_.vjs_load()
                                }, e.prototype.poster = function() {
                                    this.el_.vjs_getProperty("poster")
                                }, e.prototype.setPoster = function() {}, e.prototype.seekable = function() {
                                    var t = this.duration();
                                    return 0 === t ? y.createTimeRange() : y.createTimeRange(0, t)
                                }, e.prototype.buffered = function() {
                                    var t = this.el_.vjs_getProperty("buffered");
                                    return 0 === t.length ? y.createTimeRange() : y.createTimeRange(t[0][0], t[0][1])
                                }, e.prototype.supportsFullScreen = function() {
                                    return !1
                                }, e.prototype.enterFullScreen = function() {
                                    return !1
                                }, e
                            }(c["default"]), C = E.prototype, k = "rtmpConnection,rtmpStream,preload,defaultPlaybackRate,playbackRate,autoplay,loop,mediaGroup,controller,controls,volume,muted,defaultMuted".split(","), S = "networkState,readyState,initialTime,duration,startOffsetTime,paused,ended,videoTracks,audioTracks,videoWidth,videoHeight".split(","), P = 0; P < k.length; P++) l(k[P]), a(k[P]);
                        for (var P = 0; P < S.length; P++) l(S[P]);
                        E.isSupported = function() {
                            return E.version()[0] >= 10
                        }, c["default"].withSourceHandlers(E), E.nativeSourceHandler = {}, E.nativeSourceHandler.canPlayType = function(t) {
                            return t in E.formats ? "maybe" : ""
                        }, E.nativeSourceHandler.canHandleSource = function(t) {
                            function e(t) {
                                var e = h.getFileExtension(t);
                                return e ? "video/" + e : ""
                            }
                            var n;
                            return n = t.type ? t.type.replace(/;.*/, "").toLowerCase() : e(t.src), E.nativeSourceHandler.canPlayType(n)
                        }, E.nativeSourceHandler.handleSource = function(t, e) {
                            e.setSrc(t.src)
                        }, E.nativeSourceHandler.dispose = function() {}, E.registerSourceHandler(E.nativeSourceHandler), E.formats = {
                            "video/flv": "FLV",
                            "video/x-flv": "FLV",
                            "video/mp4": "MP4",
                            "video/m4v": "MP4"
                        }, E.onReady = function(t) {
                            var e = f.getEl(t),
                                n = e && e.tech;
                            n && n.el() && E.checkReady(n)
                        }, E.checkReady = function(t) {
                            t.el() && (t.el().vjs_getProperty ? t.triggerReady() : this.setTimeout(function() {
                                E.checkReady(t)
                            }, 50))
                        }, E.onEvent = function(t, e) {
                            var n = f.getEl(t).tech;
                            n.trigger(e)
                        }, E.onError = function(t, e) {
                            var n = f.getEl(t).tech;
                            return "srcnotfound" === e ? n.error(4) : void n.error("FLASH: " + e)
                        }, E.version = function() {
                            var t = "0,0,0";
                            try {
                                t = new j["default"].ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version").replace(/\D+/g, ",").match(/^,?(.+),?$/)[1]
                            } catch (e) {
                                try {
                                    T.mimeTypes["application/x-shockwave-flash"].enabledPlugin && (t = (T.plugins["Shockwave Flash 2.0"] || T.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1])
                                } catch (n) {}
                            }
                            return t.split(",")
                        }, E.embed = function(t, e, n, o) {
                            var r = E.getEmbedCode(t, e, n, o),
                                i = f.createEl("div", {
                                    innerHTML: r
                                }).childNodes[0];
                            return i
                        }, E.getEmbedCode = function(t, e, n, o) {
                            var r = '<object type="application/x-shockwave-flash" ',
                                i = "",
                                s = "",
                                a = "";
                            return e && Object.getOwnPropertyNames(e).forEach(function(t) {
                                i += t + "=" + e[t] + "&amp;"
                            }), n = O["default"]({
                                movie: t,
                                flashvars: i,
                                allowScriptAccess: "always",
                                allowNetworking: "all"
                            }, n), Object.getOwnPropertyNames(n).forEach(function(t) {
                                s += '<param name="' + t + '" value="' + n[t] + '" />'
                            }), o = O["default"]({
                                data: t,
                                width: "100%",
                                height: "100%"
                            }, o), Object.getOwnPropertyNames(o).forEach(function(t) {
                                a += t + '="' + o[t] + '" '
                            }), "" + r + a + ">" + s + "</object>"
                        }, g["default"](E), b["default"].registerComponent("Flash", E), c["default"].registerTech("Flash", E), n["default"] = E, e.exports = n["default"]
                    }, {
                        "../component": 67,
                        "../utils/dom.js": 132,
                        "../utils/time-ranges.js": 140,
                        "../utils/url.js": 142,
                        "./flash-rtmp": 115,
                        "./tech": 119,
                        "global/window": 2,
                        "object.assign": 45
                    }],
                    117: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function r(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function i(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function s(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var a = t("./tech.js"),
                            l = r(a),
                            u = t("../component"),
                            c = r(u),
                            p = t("../utils/dom.js"),
                            f = o(p),
                            d = t("../utils/url.js"),
                            h = o(d),
                            y = t("../utils/fn.js"),
                            v = o(y),
                            g = t("../utils/log.js"),
                            m = r(g),
                            b = t("../utils/browser.js"),
                            _ = o(b),
                            j = t("global/document"),
                            w = r(j),
                            O = t("global/window"),
                            T = r(O),
                            E = t("object.assign"),
                            C = r(E),
                            k = t("../utils/merge-options.js"),
                            S = r(k),
                            P = function(t) {
                                function e(n, o) {
                                    i(this, e), t.call(this, n, o);
                                    var r = n.source;
                                    if (r && (this.el_.currentSrc !== r.src || n.tag && 3 === n.tag.initNetworkState_) ? this.setSource(r) : this.handleLateInit_(this.el_), this.el_.hasChildNodes()) {
                                        for (var s = this.el_.childNodes, a = s.length, l = []; a--;) {
                                            var u = s[a],
                                                c = u.nodeName.toLowerCase();
                                            "track" === c && (this.featuresNativeTextTracks ? (this.remoteTextTrackEls().addTrackElement_(u), this.remoteTextTracks().addTrack_(u.track)) : l.push(u))
                                        }
                                        for (var p = 0; p < l.length; p++) this.el_.removeChild(l[p])
                                    }
                                    this.featuresNativeTextTracks && (this.handleTextTrackChange_ = v.bind(this, this.handleTextTrackChange), this.handleTextTrackAdd_ = v.bind(this, this.handleTextTrackAdd), this.handleTextTrackRemove_ = v.bind(this, this.handleTextTrackRemove), this.proxyNativeTextTracks_()), (_.TOUCH_ENABLED && n.nativeControlsForTouch === !0 || _.IS_IPHONE || _.IS_NATIVE_ANDROID) && this.setControls(!0), this.triggerReady()
                                }
                                return s(e, t), e.prototype.dispose = function() {
                                    var n = this.el().textTracks,
                                        o = this.textTracks();
                                    n && n.removeEventListener && (n.removeEventListener("change", this.handleTextTrackChange_), n.removeEventListener("addtrack", this.handleTextTrackAdd_), n.removeEventListener("removetrack", this.handleTextTrackRemove_));
                                    for (var r = o.length; r--;) o.removeTrack_(o[r]);
                                    e.disposeMediaElement(this.el_), t.prototype.dispose.call(this)
                                }, e.prototype.createEl = function() {
                                    var t = this.options_.tag;
                                    if (!t || this.movingMediaElementInDOM === !1)
                                        if (t) {
                                            var n = t.cloneNode(!0);
                                            t.parentNode.insertBefore(n, t), e.disposeMediaElement(t), t = n
                                        } else {
                                            t = w["default"].createElement("video");
                                            var o = this.options_.tag && f.getElAttributes(this.options_.tag),
                                                r = S["default"]({}, o);
                                            _.TOUCH_ENABLED && this.options_.nativeControlsForTouch === !0 || delete r.controls, f.setElAttributes(t, C["default"](r, {
                                                id: this.options_.techId,
                                                "class": "vjs-tech"
                                            }))
                                        }
                                    for (var i = ["autoplay", "preload", "loop", "muted"], s = i.length - 1; s >= 0; s--) {
                                        var a = i[s],
                                            l = {};
                                        "undefined" != typeof this.options_[a] && (l[a] = this.options_[a]), f.setElAttributes(t, l)
                                    }
                                    return t
                                }, e.prototype.handleLateInit_ = function(t) {
                                    var e = this;
                                    if (0 !== t.networkState && 3 !== t.networkState) {
                                        if (0 === t.readyState) {
                                            var n = function() {
                                                var t = !1,
                                                    n = function() {
                                                        t = !0
                                                    };
                                                e.on("loadstart", n);
                                                var o = function() {
                                                    t || this.trigger("loadstart")
                                                };
                                                return e.on("loadedmetadata", o), e.ready(function() {
                                                    this.off("loadstart", n), this.off("loadedmetadata", o), t || this.trigger("loadstart")
                                                }), {
                                                    v: void 0
                                                }
                                            }();
                                            if ("object" == typeof n) return n.v
                                        }
                                        var o = ["loadstart"];
                                        o.push("loadedmetadata"), t.readyState >= 2 && o.push("loadeddata"), t.readyState >= 3 && o.push("canplay"), t.readyState >= 4 && o.push("canplaythrough"), this.ready(function() {
                                            o.forEach(function(t) {
                                                this.trigger(t)
                                            }, this)
                                        })
                                    }
                                }, e.prototype.proxyNativeTextTracks_ = function() {
                                    var t = this.el().textTracks;
                                    if (t) {
                                        for (var e = 0; e < t.length; e++) this.textTracks().addTrack_(t[e]);
                                        t.addEventListener && (t.addEventListener("change", this.handleTextTrackChange_), t.addEventListener("addtrack", this.handleTextTrackAdd_), t.addEventListener("removetrack", this.handleTextTrackRemove_))
                                    }
                                }, e.prototype.handleTextTrackChange = function(t) {
                                    var e = this.textTracks();
                                    this.textTracks().trigger({
                                        type: "change",
                                        target: e,
                                        currentTarget: e,
                                        srcElement: e
                                    })
                                }, e.prototype.handleTextTrackAdd = function(t) {
                                    this.textTracks().addTrack_(t.track)
                                }, e.prototype.handleTextTrackRemove = function(t) {
                                    this.textTracks().removeTrack_(t.track)
                                }, e.prototype.play = function() {
                                    this.el_.play()
                                }, e.prototype.pause = function() {
                                    this.el_.pause()
                                }, e.prototype.paused = function() {
                                    return this.el_.paused
                                }, e.prototype.currentTime = function() {
                                    return this.el_.currentTime
                                }, e.prototype.setCurrentTime = function(t) {
                                    try {
                                        this.el_.currentTime = t
                                    } catch (e) {
                                        m["default"](e, "Video is not ready. (Video.js)")
                                    }
                                }, e.prototype.duration = function() {
                                    return this.el_.duration || 0
                                }, e.prototype.buffered = function() {
                                    return this.el_.buffered
                                }, e.prototype.volume = function() {
                                    return this.el_.volume
                                }, e.prototype.setVolume = function(t) {
                                    this.el_.volume = t
                                }, e.prototype.muted = function() {
                                    return this.el_.muted
                                }, e.prototype.setMuted = function(t) {
                                    this.el_.muted = t
                                }, e.prototype.width = function() {
                                    return this.el_.offsetWidth
                                }, e.prototype.height = function() {
                                    return this.el_.offsetHeight
                                }, e.prototype.supportsFullScreen = function() {
                                    if ("function" == typeof this.el_.webkitEnterFullScreen) {
                                        var t = T["default"].navigator.userAgent;
                                        if (/Android/.test(t) || !/Chrome|Mac OS X 10.5/.test(t)) return !0
                                    }
                                    return !1
                                }, e.prototype.enterFullScreen = function() {
                                    var t = this.el_;
                                    "webkitDisplayingFullscreen" in t && this.one("webkitbeginfullscreen", function() {
                                        this.one("webkitendfullscreen", function() {
                                            this.trigger("fullscreenchange", {
                                                isFullscreen: !1
                                            })
                                        }), this.trigger("fullscreenchange", {
                                            isFullscreen: !0
                                        })
                                    }), t.paused && t.networkState <= t.HAVE_METADATA ? (this.el_.play(), this.setTimeout(function() {
                                        t.pause(), t.webkitEnterFullScreen()
                                    }, 0)) : t.webkitEnterFullScreen()
                                }, e.prototype.exitFullScreen = function() {
                                    this.el_.webkitExitFullScreen()
                                }, e.prototype.src = function(t) {
                                    return void 0 === t ? this.el_.src : void this.setSrc(t)
                                }, e.prototype.setSrc = function(t) {
                                    this.el_.src = t
                                }, e.prototype.load = function() {
                                    this.el_.load()
                                }, e.prototype.reset = function() {
                                    e.resetMediaElement(this.el_)
                                }, e.prototype.currentSrc = function() {
                                    return this.currentSource_ ? this.currentSource_.src : this.el_.currentSrc
                                }, e.prototype.poster = function() {
                                    return this.el_.poster
                                }, e.prototype.setPoster = function(t) {
                                    this.el_.poster = t
                                }, e.prototype.preload = function() {
                                    return this.el_.preload
                                }, e.prototype.setPreload = function(t) {
                                    this.el_.preload = t
                                }, e.prototype.autoplay = function() {
                                    return this.el_.autoplay
                                }, e.prototype.setAutoplay = function(t) {
                                    this.el_.autoplay = t
                                }, e.prototype.controls = function() {
                                    return this.el_.controls
                                }, e.prototype.setControls = function(t) {
                                    this.el_.controls = !!t
                                }, e.prototype.loop = function() {
                                    return this.el_.loop
                                }, e.prototype.setLoop = function(t) {
                                    this.el_.loop = t
                                }, e.prototype.error = function() {
                                    return this.el_.error
                                }, e.prototype.seeking = function() {
                                    return this.el_.seeking
                                }, e.prototype.seekable = function() {
                                    return this.el_.seekable
                                }, e.prototype.ended = function() {
                                    return this.el_.ended
                                }, e.prototype.defaultMuted = function() {
                                    return this.el_.defaultMuted
                                }, e.prototype.playbackRate = function() {
                                    return this.el_.playbackRate
                                }, e.prototype.played = function() {
                                    return this.el_.played
                                }, e.prototype.setPlaybackRate = function(t) {
                                    this.el_.playbackRate = t
                                }, e.prototype.networkState = function() {
                                    return this.el_.networkState
                                }, e.prototype.readyState = function() {
                                    return this.el_.readyState
                                }, e.prototype.videoWidth = function() {
                                    return this.el_.videoWidth
                                }, e.prototype.videoHeight = function() {
                                    return this.el_.videoHeight
                                }, e.prototype.textTracks = function() {
                                    return t.prototype.textTracks.call(this)
                                }, e.prototype.addTextTrack = function(e, n, o) {
                                    return this.featuresNativeTextTracks ? this.el_.addTextTrack(e, n, o) : t.prototype.addTextTrack.call(this, e, n, o)
                                }, e.prototype.addRemoteTextTrack = function() {
                                    var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                                    if (!this.featuresNativeTextTracks) return t.prototype.addRemoteTextTrack.call(this, e);
                                    var n = w["default"].createElement("track");
                                    return e.kind && (n.kind = e.kind), e.label && (n.label = e.label), (e.language || e.srclang) && (n.srclang = e.language || e.srclang), e["default"] && (n["default"] = e["default"]), e.id && (n.id = e.id), e.src && (n.src = e.src), this.el().appendChild(n), this.remoteTextTrackEls().addTrackElement_(n), this.remoteTextTracks().addTrack_(n.track), n
                                }, e.prototype.removeRemoteTextTrack = function(e) {
                                    if (!this.featuresNativeTextTracks) return t.prototype.removeRemoteTextTrack.call(this, e);
                                    var n = void 0,
                                        o = void 0,
                                        r = this.remoteTextTrackEls().getTrackElementByTrack_(e);
                                    for (this.remoteTextTrackEls().removeTrackElement_(r), this.remoteTextTracks().removeTrack_(e), n = this.$$("track"), o = n.length; o--;) e !== n[o] && e !== n[o].track || this.el().removeChild(n[o])
                                }, e
                            }(l["default"]);
                        P.TEST_VID = w["default"].createElement("video");
                        var x = w["default"].createElement("track");
                        x.kind = "captions", x.srclang = "en", x.label = "English", P.TEST_VID.appendChild(x), P.isSupported = function() {
                            try {
                                P.TEST_VID.volume = .5
                            } catch (t) {
                                return !1
                            }
                            return !!P.TEST_VID.canPlayType
                        }, l["default"].withSourceHandlers(P), P.nativeSourceHandler = {}, P.nativeSourceHandler.canPlayType = function(t) {
                            try {
                                return P.TEST_VID.canPlayType(t)
                            } catch (e) {
                                return ""
                            }
                        }, P.nativeSourceHandler.canHandleSource = function(t) {
                            var e;
                            return t.type ? P.nativeSourceHandler.canPlayType(t.type) : t.src ? (e = h.getFileExtension(t.src), P.nativeSourceHandler.canPlayType("video/" + e)) : ""
                        }, P.nativeSourceHandler.handleSource = function(t, e) {
                            e.setSrc(t.src)
                        }, P.nativeSourceHandler.dispose = function() {}, P.registerSourceHandler(P.nativeSourceHandler), P.canControlVolume = function() {
                            var t = P.TEST_VID.volume;
                            return P.TEST_VID.volume = t / 2 + .1, t !== P.TEST_VID.volume
                        }, P.canControlPlaybackRate = function() {
                            var t = P.TEST_VID.playbackRate;
                            return P.TEST_VID.playbackRate = t / 2 + .1, t !== P.TEST_VID.playbackRate
                        }, P.supportsNativeTextTracks = function() {
                            var t;
                            return t = !!P.TEST_VID.textTracks, t && P.TEST_VID.textTracks.length > 0 && (t = "number" != typeof P.TEST_VID.textTracks[0].mode), t && _.IS_FIREFOX && (t = !1), !t || "onremovetrack" in P.TEST_VID.textTracks || (t = !1), t
                        }, P.Events = ["loadstart", "suspend", "abort", "error", "emptied", "stalled", "loadedmetadata", "loadeddata", "canplay", "canplaythrough", "playing", "waiting", "seeking", "seeked", "ended", "durationchange", "timeupdate", "progress", "play", "pause", "ratechange", "volumechange"], P.prototype.featuresVolumeControl = P.canControlVolume(), P.prototype.featuresPlaybackRate = P.canControlPlaybackRate(), P.prototype.movingMediaElementInDOM = !_.IS_IOS, P.prototype.featuresFullscreenResize = !0, P.prototype.featuresProgressEvents = !0, P.prototype.featuresNativeTextTracks = P.supportsNativeTextTracks();
                        var A = void 0,
                            M = /^application\/(?:x-|vnd\.apple\.)mpegurl/i,
                            L = /^video\/mp4/i;
                        P.patchCanPlayType = function() {
                            _.ANDROID_VERSION >= 4 && (A || (A = P.TEST_VID.constructor.prototype.canPlayType), P.TEST_VID.constructor.prototype.canPlayType = function(t) {
                                return t && M.test(t) ? "maybe" : A.call(this, t)
                            }), _.IS_OLD_ANDROID && (A || (A = P.TEST_VID.constructor.prototype.canPlayType), P.TEST_VID.constructor.prototype.canPlayType = function(t) {
                                return t && L.test(t) ? "maybe" : A.call(this, t)
                            })
                        }, P.unpatchCanPlayType = function() {
                            var t = P.TEST_VID.constructor.prototype.canPlayType;
                            return P.TEST_VID.constructor.prototype.canPlayType = A, A = null, t
                        }, P.patchCanPlayType(), P.disposeMediaElement = function(t) {
                            if (t) {
                                for (t.parentNode && t.parentNode.removeChild(t); t.hasChildNodes();) t.removeChild(t.firstChild);
                                t.removeAttribute("src"), "function" == typeof t.load && ! function() {
                                    try {
                                        t.load()
                                    } catch (e) {}
                                }()
                            }
                        }, P.resetMediaElement = function(t) {
                            if (t) {
                                for (var e = t.querySelectorAll("source"), n = e.length; n--;) t.removeChild(e[n]);
                                t.removeAttribute("src"), "function" == typeof t.load && ! function() {
                                    try {
                                        t.load()
                                    } catch (e) {}
                                }()
                            }
                        }, c["default"].registerComponent("Html5", P), l["default"].registerTech("Html5", P), n["default"] = P, e.exports = n["default"]
                    }, {
                        "../component": 67,
                        "../utils/browser.js": 129,
                        "../utils/dom.js": 132,
                        "../utils/fn.js": 134,
                        "../utils/log.js": 137,
                        "../utils/merge-options.js": 138,
                        "../utils/url.js": 142,
                        "./tech.js": 119,
                        "global/document": 1,
                        "global/window": 2,
                        "object.assign": 45
                    }],
                    118: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function r(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function i(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var s = t("../component.js"),
                            a = o(s),
                            l = t("./tech.js"),
                            u = o(l),
                            c = t("global/window"),
                            p = (o(c), t("../utils/to-title-case.js")),
                            f = o(p),
                            d = function(t) {
                                function e(n, o, i) {
                                    if (r(this, e), t.call(this, n, o, i), o.playerOptions.sources && 0 !== o.playerOptions.sources.length) n.src(o.playerOptions.sources);
                                    else
                                        for (var s = 0, l = o.playerOptions.techOrder; s < l.length; s++) {
                                            var c = f["default"](l[s]),
                                                p = u["default"].getTech(c);
                                            if (c || (p = a["default"].getComponent(c)), p && p.isSupported()) {
                                                n.loadTech_(c);
                                                break
                                            }
                                        }
                                }
                                return i(e, t), e
                            }(a["default"]);
                        a["default"].registerComponent("MediaLoader", d), n["default"] = d, e.exports = n["default"]
                    }, {
                        "../component.js": 67,
                        "../utils/to-title-case.js": 141,
                        "./tech.js": 119,
                        "global/window": 2
                    }],
                    119: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function r(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function i(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function s(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var a = t("../component"),
                            l = r(a),
                            u = t("../tracks/html-track-element"),
                            c = r(u),
                            p = t("../tracks/html-track-element-list"),
                            f = r(p),
                            d = t("../utils/merge-options.js"),
                            h = r(d),
                            y = t("../tracks/text-track"),
                            v = r(y),
                            g = t("../tracks/text-track-list"),
                            m = r(g),
                            b = t("../utils/fn.js"),
                            _ = o(b),
                            j = t("../utils/log.js"),
                            w = r(j),
                            O = t("../utils/time-ranges.js"),
                            T = t("../utils/buffer.js"),
                            E = t("../media-error.js"),
                            C = r(E),
                            k = t("global/window"),
                            S = r(k),
                            P = t("global/document"),
                            x = r(P),
                            A = function(t) {
                                function e() {
                                    var n = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
                                        o = arguments.length <= 1 || void 0 === arguments[1] ? function() {} : arguments[1];
                                    i(this, e), n.reportTouchActivity = !1, t.call(this, null, n, o), this.hasStarted_ = !1, this.on("playing", function() {
                                        this.hasStarted_ = !0
                                    }), this.on("loadstart", function() {
                                        this.hasStarted_ = !1
                                    }), this.textTracks_ = n.textTracks, this.featuresProgressEvents || this.manualProgressOn(), this.featuresTimeupdateEvents || this.manualTimeUpdatesOn(), n.nativeCaptions !== !1 && n.nativeTextTracks !== !1 || (this.featuresNativeTextTracks = !1), this.featuresNativeTextTracks || this.on("ready", this.emulateTextTracks), this.initTextTrackListeners(), this.emitTapEvents()
                                }
                                return s(e, t), e.prototype.manualProgressOn = function() {
                                    this.on("durationchange", this.onDurationChange), this.manualProgress = !0, this.one("ready", this.trackProgress)
                                }, e.prototype.manualProgressOff = function() {
                                    this.manualProgress = !1, this.stopTrackingProgress(), this.off("durationchange", this.onDurationChange)
                                }, e.prototype.trackProgress = function() {
                                    this.stopTrackingProgress(), this.progressInterval = this.setInterval(_.bind(this, function() {
                                        var t = this.bufferedPercent();
                                        this.bufferedPercent_ !== t && this.trigger("progress"), this.bufferedPercent_ = t, 1 === t && this.stopTrackingProgress()
                                    }), 500)
                                }, e.prototype.onDurationChange = function() {
                                    this.duration_ = this.duration()
                                }, e.prototype.buffered = function() {
                                    return O.createTimeRange(0, 0)
                                }, e.prototype.bufferedPercent = function() {
                                    return T.bufferedPercent(this.buffered(), this.duration_)
                                }, e.prototype.stopTrackingProgress = function() {
                                    this.clearInterval(this.progressInterval)
                                }, e.prototype.manualTimeUpdatesOn = function() {
                                    this.manualTimeUpdates = !0, this.on("play", this.trackCurrentTime), this.on("pause", this.stopTrackingCurrentTime)
                                }, e.prototype.manualTimeUpdatesOff = function() {
                                    this.manualTimeUpdates = !1, this.stopTrackingCurrentTime(), this.off("play", this.trackCurrentTime), this.off("pause", this.stopTrackingCurrentTime)
                                }, e.prototype.trackCurrentTime = function() {
                                    this.currentTimeInterval && this.stopTrackingCurrentTime(), this.currentTimeInterval = this.setInterval(function() {
                                        this.trigger({
                                            type: "timeupdate",
                                            target: this,
                                            manuallyTriggered: !0
                                        })
                                    }, 250)
                                }, e.prototype.stopTrackingCurrentTime = function() {
                                    this.clearInterval(this.currentTimeInterval), this.trigger({
                                        type: "timeupdate",
                                        target: this,
                                        manuallyTriggered: !0
                                    })
                                }, e.prototype.dispose = function() {
                                    var e = this.textTracks();
                                    if (e)
                                        for (var n = e.length; n--;) this.removeRemoteTextTrack(e[n]);
                                    this.manualProgress && this.manualProgressOff(), this.manualTimeUpdates && this.manualTimeUpdatesOff(), t.prototype.dispose.call(this)
                                }, e.prototype.reset = function() {}, e.prototype.error = function(t) {
                                    return void 0 !== t && (t instanceof C["default"] ? this.error_ = t : this.error_ = new C["default"](t), this.trigger("error")), this.error_
                                }, e.prototype.played = function() {
                                    return this.hasStarted_ ? O.createTimeRange(0, 0) : O.createTimeRange()
                                }, e.prototype.setCurrentTime = function() {
                                    this.manualTimeUpdates && this.trigger({
                                        type: "timeupdate",
                                        target: this,
                                        manuallyTriggered: !0
                                    })
                                }, e.prototype.initTextTrackListeners = function() {
                                    var t = _.bind(this, function() {
                                            this.trigger("texttrackchange")
                                        }),
                                        e = this.textTracks();
                                    e && (e.addEventListener("removetrack", t), e.addEventListener("addtrack", t), this.on("dispose", _.bind(this, function() {
                                        e.removeEventListener("removetrack", t), e.removeEventListener("addtrack", t)
                                    })))
                                }, e.prototype.emulateTextTracks = function() {
                                    var t = this,
                                        e = this.textTracks();
                                    if (e) {
                                        S["default"].WebVTT || null == this.el().parentNode || ! function() {
                                            var e = x["default"].createElement("script");
                                            e.src = t.options_["vtt.js"] || "https://cdn.rawgit.com/gkatsev/vtt.js/vjs-v0.12.1/dist/vtt.min.js", e.onload = function() {
                                                t.trigger("vttjsloaded")
                                            }, e.onerror = function() {
                                                t.trigger("vttjserror")
                                            }, t.on("dispose", function() {
                                                e.onload = null, e.onerror = null
                                            }), t.el().parentNode.appendChild(e), S["default"].WebVTT = !0
                                        }();
                                        var n = function() {
                                                return t.trigger("texttrackchange")
                                            },
                                            o = function() {
                                                n();
                                                for (var t = 0; t < e.length; t++) {
                                                    var o = e[t];
                                                    o.removeEventListener("cuechange", n), "showing" === o.mode && o.addEventListener("cuechange", n)
                                                }
                                            };
                                        o(), e.addEventListener("change", o), this.on("dispose", function() {
                                            e.removeEventListener("change", o)
                                        })
                                    }
                                }, e.prototype.textTracks = function() {
                                    return this.textTracks_ = this.textTracks_ || new m["default"], this.textTracks_
                                }, e.prototype.remoteTextTracks = function() {
                                    return this.remoteTextTracks_ = this.remoteTextTracks_ || new m["default"], this.remoteTextTracks_
                                }, e.prototype.remoteTextTrackEls = function() {
                                    return this.remoteTextTrackEls_ = this.remoteTextTrackEls_ || new f["default"], this.remoteTextTrackEls_
                                }, e.prototype.addTextTrack = function(t, e, n) {
                                    if (!t) throw new Error("TextTrack kind is required but was not provided");
                                    return M(this, t, e, n)
                                }, e.prototype.addRemoteTextTrack = function(t) {
                                    var e = h["default"](t, {
                                            tech: this
                                        }),
                                        n = new c["default"](e);
                                    return this.remoteTextTrackEls().addTrackElement_(n), this.remoteTextTracks().addTrack_(n.track), this.textTracks().addTrack_(n.track), n
                                }, e.prototype.removeRemoteTextTrack = function(t) {
                                    this.textTracks().removeTrack_(t);
                                    var e = this.remoteTextTrackEls().getTrackElementByTrack_(t);
                                    this.remoteTextTrackEls().removeTrackElement_(e), this.remoteTextTracks().removeTrack_(t)
                                }, e.prototype.setPoster = function() {}, e.prototype.canPlayType = function() {
                                    return ""
                                }, e.isTech = function(t) {
                                    return t.prototype instanceof e || t instanceof e || t === e
                                }, e.registerTech = function(t, n) {
                                    if (e.techs_ || (e.techs_ = {}), !e.isTech(n)) throw new Error("Tech " + t + " must be a Tech");
                                    return e.techs_[t] = n, n
                                }, e.getTech = function(t) {
                                    return e.techs_ && e.techs_[t] ? e.techs_[t] : S["default"] && S["default"].videojs && S["default"].videojs[t] ? (w["default"].warn("The " + t + " tech was added to the videojs object when it should be registered using videojs.registerTech(name, tech)"), S["default"].videojs[t]) : void 0
                                }, e
                            }(l["default"]);
                        A.prototype.textTracks_;
                        var M = function(t, e, n, o) {
                            var r = arguments.length <= 4 || void 0 === arguments[4] ? {} : arguments[4],
                                i = t.textTracks();
                            r.kind = e, n && (r.label = n), o && (r.language = o), r.tech = t;
                            var s = new v["default"](r);
                            return i.addTrack_(s), s
                        };
                        A.prototype.featuresVolumeControl = !0, A.prototype.featuresFullscreenResize = !1, A.prototype.featuresPlaybackRate = !1, A.prototype.featuresProgressEvents = !1, A.prototype.featuresTimeupdateEvents = !1, A.prototype.featuresNativeTextTracks = !1, A.withSourceHandlers = function(t) {
                            t.registerSourceHandler = function(e, n) {
                                var o = t.sourceHandlers;
                                o || (o = t.sourceHandlers = []), void 0 === n && (n = o.length), o.splice(n, 0, e)
                            }, t.canPlayType = function(e) {
                                for (var n = t.sourceHandlers || [], o = void 0, r = 0; r < n.length; r++)
                                    if (o = n[r].canPlayType(e)) return o;
                                return ""
                            }, t.selectSourceHandler = function(e) {
                                for (var n = t.sourceHandlers || [], o = void 0, r = 0; r < n.length; r++)
                                    if (o = n[r].canHandleSource(e)) return n[r];
                                return null
                            }, t.canPlaySource = function(e) {
                                var n = t.selectSourceHandler(e);
                                return n ? n.canHandleSource(e) : ""
                            };
                            var e = ["seekable", "duration"];
                            e.forEach(function(t) {
                                var e = this[t];
                                "function" == typeof e && (this[t] = function() {
                                    return this.sourceHandler_ && this.sourceHandler_[t] ? this.sourceHandler_[t].apply(this.sourceHandler_, arguments) : e.apply(this, arguments)
                                })
                            }, t.prototype), t.prototype.setSource = function(e) {
                                var n = t.selectSourceHandler(e);
                                return n || (t.nativeSourceHandler ? n = t.nativeSourceHandler : w["default"].error("No source hander found for the current source.")), this.disposeSourceHandler(), this.off("dispose", this.disposeSourceHandler), this.currentSource_ = e, this.sourceHandler_ = n.handleSource(e, this), this.on("dispose", this.disposeSourceHandler), this
                            }, t.prototype.disposeSourceHandler = function() {
                                this.sourceHandler_ && this.sourceHandler_.dispose && this.sourceHandler_.dispose()
                            }
                        }, l["default"].registerComponent("Tech", A), l["default"].registerComponent("MediaTechController", A), A.registerTech("Tech", A), n["default"] = A, e.exports = n["default"]
                    }, {
                        "../component": 67,
                        "../media-error.js": 103,
                        "../tracks/html-track-element": 121,
                        "../tracks/html-track-element-list": 120,
                        "../tracks/text-track": 128,
                        "../tracks/text-track-list": 126,
                        "../utils/buffer.js": 130,
                        "../utils/fn.js": 134,
                        "../utils/log.js": 137,
                        "../utils/merge-options.js": 138,
                        "../utils/time-ranges.js": 140,
                        "global/document": 1,
                        "global/window": 2
                    }],
                    120: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function r(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function i(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }
                        n.__esModule = !0;
                        var s = t("../utils/browser.js"),
                            a = r(s),
                            l = t("global/document"),
                            u = o(l),
                            c = function() {
                                function t() {
                                    var e = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0];
                                    i(this, t);
                                    var n = this;
                                    if (a.IS_IE8) {
                                        n = u["default"].createElement("custom");
                                        for (var o in t.prototype) "constructor" !== o && (n[o] = t.prototype[o])
                                    }
                                    n.trackElements_ = [], Object.defineProperty(n, "length", {
                                        get: function() {
                                            return this.trackElements_.length
                                        }
                                    });
                                    for (var r = 0, s = e.length; s > r; r++) n.addTrackElement_(e[r]);
                                    return a.IS_IE8 ? n : void 0
                                }
                                return t.prototype.addTrackElement_ = function(t) {
                                    this.trackElements_.push(t)
                                }, t.prototype.getTrackElementByTrack_ = function(t) {
                                    for (var e = void 0, n = 0, o = this.trackElements_.length; o > n; n++)
                                        if (t === this.trackElements_[n].track) {
                                            e = this.trackElements_[n];
                                            break
                                        }
                                    return e
                                }, t.prototype.removeTrackElement_ = function(t) {
                                    for (var e = 0, n = this.trackElements_.length; n > e; e++)
                                        if (t === this.trackElements_[e]) {
                                            this.trackElements_.splice(e, 1);
                                            break
                                        }
                                }, t
                            }();
                        n["default"] = c, e.exports = n["default"]
                    }, {
                        "../utils/browser.js": 129,
                        "global/document": 1
                    }],
                    121: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function r(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function i(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function s(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var a = t("../utils/browser.js"),
                            l = r(a),
                            u = t("global/document"),
                            c = o(u),
                            p = t("../event-target"),
                            f = o(p),
                            d = t("../tracks/text-track"),
                            h = o(d),
                            y = 0,
                            v = 1,
                            g = 2,
                            m = 3,
                            b = function(t) {
                                function e() {
                                    var n = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                                    i(this, e), t.call(this);
                                    var o = void 0,
                                        r = this;
                                    if (l.IS_IE8) {
                                        r = c["default"].createElement("custom");
                                        for (var s in e.prototype) "constructor" !== s && (r[s] = e.prototype[s])
                                    }
                                    var a = new h["default"](n);
                                    return r.kind = a.kind, r.src = a.src, r.srclang = a.language, r.label = a.label, r["default"] = a["default"], Object.defineProperty(r, "readyState", {
                                        get: function() {
                                            return o
                                        }
                                    }), Object.defineProperty(r, "track", {
                                        get: function() {
                                            return a
                                        }
                                    }), o = y, a.addEventListener("loadeddata", function() {
                                        o = g, r.trigger({
                                            type: "load",
                                            target: r
                                        })
                                    }), l.IS_IE8 ? r : void 0
                                }
                                return s(e, t), e
                            }(f["default"]);
                        b.prototype.allowedEvents_ = {
                            load: "load"
                        }, b.NONE = y, b.LOADING = v, b.LOADED = g, b.ERROR = m, n["default"] = b, e.exports = n["default"]
                    }, {
                        "../event-target": 99,
                        "../tracks/text-track": 128,
                        "../utils/browser.js": 129,
                        "global/document": 1
                    }],
                    122: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function r(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function i(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }
                        n.__esModule = !0;
                        var s = t("../utils/browser.js"),
                            a = r(s),
                            l = t("global/document"),
                            u = o(l),
                            c = function() {
                                function t(e) {
                                    i(this, t);
                                    var n = this;
                                    if (a.IS_IE8) {
                                        n = u["default"].createElement("custom");
                                        for (var o in t.prototype) "constructor" !== o && (n[o] = t.prototype[o])
                                    }
                                    return t.prototype.setCues_.call(n, e), Object.defineProperty(n, "length", {
                                        get: function() {
                                            return this.length_
                                        }
                                    }), a.IS_IE8 ? n : void 0
                                }
                                return t.prototype.setCues_ = function(t) {
                                    var e = this.length || 0,
                                        n = 0,
                                        o = t.length;
                                    this.cues_ = t, this.length_ = t.length;
                                    var r = function(t) {
                                        "" + t in this || Object.defineProperty(this, "" + t, {
                                            get: function() {
                                                return this.cues_[t]
                                            }
                                        })
                                    };
                                    if (o > e)
                                        for (n = e; o > n; n++) r.call(this, n)
                                }, t.prototype.getCueById = function(t) {
                                    for (var e = null, n = 0, o = this.length; o > n; n++) {
                                        var r = this[n];
                                        if (r.id === t) {
                                            e = r;
                                            break
                                        }
                                    }
                                    return e
                                }, t
                            }();
                        n["default"] = c, e.exports = n["default"]
                    }, {
                        "../utils/browser.js": 129,
                        "global/document": 1
                    }],
                    123: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function r(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function i(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function s(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }

                        function a(t, e) {
                            return "rgba(" + parseInt(t[1] + t[1], 16) + "," + parseInt(t[2] + t[2], 16) + "," + parseInt(t[3] + t[3], 16) + "," + e + ")"
                        }

                        function l(t, e, n) {
                            try {
                                t.style[e] = n
                            } catch (o) {}
                        }
                        n.__esModule = !0;
                        var u = t("../component"),
                            c = r(u),
                            p = t("../menu/menu.js"),
                            f = (r(p), t("../menu/menu-item.js")),
                            d = (r(f), t("../menu/menu-button.js")),
                            h = (r(d), t("../utils/fn.js")),
                            y = o(h),
                            v = t("global/document"),
                            g = (r(v), t("global/window")),
                            m = r(g),
                            b = "#222",
                            _ = "#ccc",
                            j = {
                                monospace: "monospace",
                                sansSerif: "sans-serif",
                                serif: "serif",
                                monospaceSansSerif: '"Andale Mono", "Lucida Console", monospace',
                                monospaceSerif: '"Courier New", monospace',
                                proportionalSansSerif: "sans-serif",
                                proportionalSerif: "serif",
                                casual: '"Comic Sans MS", Impact, fantasy',
                                script: '"Monotype Corsiva", cursive',
                                smallcaps: '"Andale Mono", "Lucida Console", monospace, sans-serif'
                            },
                            w = function(t) {
                                function e(n, o, r) {
                                    i(this, e), t.call(this, n, o, r), n.on("loadstart", y.bind(this, this.toggleDisplay)), n.on("texttrackchange", y.bind(this, this.updateDisplay)), n.ready(y.bind(this, function() {
                                        if (n.tech_ && n.tech_.featuresNativeTextTracks) return void this.hide();
                                        n.on("fullscreenchange", y.bind(this, this.updateDisplay));
                                        for (var t = this.options_.playerOptions.tracks || [], e = 0; e < t.length; e++) {
                                            var o = t[e];
                                            this.player_.addRemoteTextTrack(o)
                                        }
                                    }))
                                }
                                return s(e, t), e.prototype.toggleDisplay = function() {
                                    this.player_.tech_ && this.player_.tech_.featuresNativeTextTracks ? this.hide() : this.show()
                                }, e.prototype.createEl = function() {
                                    return t.prototype.createEl.call(this, "div", {
                                        className: "vjs-text-track-display"
                                    })
                                }, e.prototype.clearDisplay = function() {
                                    "function" == typeof m["default"].WebVTT && m["default"].WebVTT.processCues(m["default"], [], this.el_)
                                }, e.prototype.updateDisplay = function() {
                                    var t = this.player_.textTracks();
                                    if (this.clearDisplay(), t)
                                        for (var e = 0; e < t.length; e++) {
                                            var n = t[e];
                                            "showing" === n.mode && this.updateForTrack(n)
                                        }
                                }, e.prototype.updateForTrack = function(t) {
                                    if ("function" == typeof m["default"].WebVTT && t.activeCues) {
                                        for (var e = this.player_.textTrackSettings.getValues(), n = [], o = 0; o < t.activeCues.length; o++) n.push(t.activeCues[o]);
                                        m["default"].WebVTT.processCues(m["default"], t.activeCues, this.el_);
                                        for (var r = n.length; r--;) {
                                            var i = n[r];
                                            if (i) {
                                                var s = i.displayState;
                                                if (e.color && (s.firstChild.style.color = e.color), e.textOpacity && l(s.firstChild, "color", a(e.color || "#fff", e.textOpacity)), e.backgroundColor && (s.firstChild.style.backgroundColor = e.backgroundColor), e.backgroundOpacity && l(s.firstChild, "backgroundColor", a(e.backgroundColor || "#000", e.backgroundOpacity)), e.windowColor && (e.windowOpacity ? l(s, "backgroundColor", a(e.windowColor, e.windowOpacity)) : s.style.backgroundColor = e.windowColor), e.edgeStyle && ("dropshadow" === e.edgeStyle ? s.firstChild.style.textShadow = "2px 2px 3px " + b + ", 2px 2px 4px " + b + ", 2px 2px 5px " + b : "raised" === e.edgeStyle ? s.firstChild.style.textShadow = "1px 1px " + b + ", 2px 2px " + b + ", 3px 3px " + b : "depressed" === e.edgeStyle ? s.firstChild.style.textShadow = "1px 1px " + _ + ", 0 1px " + _ + ", -1px -1px " + b + ", 0 -1px " + b : "uniform" === e.edgeStyle && (s.firstChild.style.textShadow = "0 0 4px " + b + ", 0 0 4px " + b + ", 0 0 4px " + b + ", 0 0 4px " + b)), e.fontPercent && 1 !== e.fontPercent) {
                                                    var u = m["default"].parseFloat(s.style.fontSize);
                                                    s.style.fontSize = u * e.fontPercent + "px", s.style.height = "auto", s.style.top = "auto", s.style.bottom = "2px"
                                                }
                                                e.fontFamily && "default" !== e.fontFamily && ("small-caps" === e.fontFamily ? s.firstChild.style.fontVariant = "small-caps" : s.firstChild.style.fontFamily = j[e.fontFamily])
                                            }
                                        }
                                    }
                                }, e
                            }(c["default"]);
                        c["default"].registerComponent("TextTrackDisplay", w), n["default"] = w, e.exports = n["default"]
                    }, {
                        "../component": 67,
                        "../menu/menu-button.js": 104,
                        "../menu/menu-item.js": 105,
                        "../menu/menu.js": 106,
                        "../utils/fn.js": 134,
                        "global/document": 1,
                        "global/window": 2
                    }],
                    124: [function(t, e, n) {
                        "use strict";
                        n.__esModule = !0;
                        var o = {
                                disabled: "disabled",
                                hidden: "hidden",
                                showing: "showing"
                            },
                            r = {
                                subtitles: "subtitles",
                                captions: "captions",
                                descriptions: "descriptions",
                                chapters: "chapters",
                                metadata: "metadata"
                            };
                        n.TextTrackMode = o, n.TextTrackKind = r
                    }, {}],
                    125: [function(t, e, n) {
                        "use strict";
                        n.__esModule = !0;
                        var o = function(t) {
                                var e = ["kind", "label", "language", "id", "inBandMetadataTrackDispatchType", "mode", "src"].reduce(function(e, n, o) {
                                    return t[n] && (e[n] = t[n]), e
                                }, {
                                    cues: t.cues && Array.prototype.map.call(t.cues, function(t) {
                                        return {
                                            startTime: t.startTime,
                                            endTime: t.endTime,
                                            text: t.text,
                                            id: t.id
                                        }
                                    })
                                });
                                return e
                            },
                            r = function(t) {
                                var e = t.$$("track"),
                                    n = Array.prototype.map.call(e, function(t) {
                                        return t.track
                                    }),
                                    r = Array.prototype.map.call(e, function(t) {
                                        var e = o(t.track);
                                        return t.src && (e.src = t.src), e
                                    });
                                return r.concat(Array.prototype.filter.call(t.textTracks(), function(t) {
                                    return -1 === n.indexOf(t)
                                }).map(o))
                            },
                            i = function(t, e) {
                                return t.forEach(function(t) {
                                    var n = e.addRemoteTextTrack(t).track;
                                    !t.src && t.cues && t.cues.forEach(function(t) {
                                        return n.addCue(t)
                                    })
                                }), e.textTracks()
                            };
                        n["default"] = {
                            textTracksToJson: r,
                            jsonToTextTracks: i,
                            trackToJson_: o
                        }, e.exports = n["default"]
                    }, {}],
                    126: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function r(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function i(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function s(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var a = t("../event-target"),
                            l = r(a),
                            u = t("../utils/fn.js"),
                            c = o(u),
                            p = t("../utils/browser.js"),
                            f = o(p),
                            d = t("global/document"),
                            h = r(d),
                            y = function(t) {
                                function e() {
                                    var n = arguments.length <= 0 || void 0 === arguments[0] ? [] : arguments[0];
                                    i(this, e), t.call(this);
                                    var o = this;
                                    if (f.IS_IE8) {
                                        o = h["default"].createElement("custom");
                                        for (var r in e.prototype) "constructor" !== r && (o[r] = e.prototype[r])
                                    }
                                    o.tracks_ = [], Object.defineProperty(o, "length", {
                                        get: function() {
                                            return this.tracks_.length
                                        }
                                    });
                                    for (var s = 0; s < n.length; s++) o.addTrack_(n[s]);
                                    return f.IS_IE8 ? o : void 0
                                }
                                return s(e, t), e.prototype.addTrack_ = function(t) {
                                    var e = this.tracks_.length;
                                    "" + e in this || Object.defineProperty(this, e, {
                                        get: function() {
                                            return this.tracks_[e]
                                        }
                                    }), t.addEventListener("modechange", c.bind(this, function() {
                                        this.trigger("change")
                                    })), -1 === this.tracks_.indexOf(t) && (this.tracks_.push(t), this.trigger({
                                        track: t,
                                        type: "addtrack"
                                    }))
                                }, e.prototype.removeTrack_ = function(t) {
                                    for (var e = void 0, n = 0, o = this.length; o > n; n++)
                                        if (this[n] === t) {
                                            e = this[n], e.off && e.off(), this.tracks_.splice(n, 1);
                                            break
                                        }
                                    e && this.trigger({
                                        track: e,
                                        type: "removetrack"
                                    })
                                }, e.prototype.getTrackById = function(t) {
                                    for (var e = null, n = 0, o = this.length; o > n; n++) {
                                        var r = this[n];
                                        if (r.id === t) {
                                            e = r;
                                            break
                                        }
                                    }
                                    return e
                                }, e
                            }(l["default"]);
                        y.prototype.allowedEvents_ = {
                            change: "change",
                            addtrack: "addtrack",
                            removetrack: "removetrack"
                        };
                        for (var v in y.prototype.allowedEvents_) y.prototype["on" + v] = null;
                        n["default"] = y, e.exports = n["default"]
                    }, {
                        "../event-target": 99,
                        "../utils/browser.js": 129,
                        "../utils/fn.js": 134,
                        "global/document": 1
                    }],
                    127: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function r(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function i(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function s(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }

                        function a(t) {
                            var e = void 0;
                            return t.selectedOptions ? e = t.selectedOptions[0] : t.options && (e = t.options[t.options.selectedIndex]), e.value
                        }

                        function l(t, e) {
                            if (e) {
                                var n = void 0;
                                for (n = 0; n < t.options.length; n++) {
                                    var o = t.options[n];
                                    if (o.value === e) break
                                }
                                t.selectedIndex = n
                            }
                        }

                        function u() {
                            var t = '<div class="vjs-tracksettings">\n      <div class="vjs-tracksettings-colors">\n        <div class="vjs-fg-color vjs-tracksetting">\n            <label class="vjs-label">Foreground</label>\n            <select>\n              <option value="">---</option>\n              <option value="#FFF">White</option>\n              <option value="#000">Black</option>\n              <option value="#F00">Red</option>\n              <option value="#0F0">Green</option>\n              <option value="#00F">Blue</option>\n              <option value="#FF0">Yellow</option>\n              <option value="#F0F">Magenta</option>\n              <option value="#0FF">Cyan</option>\n            </select>\n            <span class="vjs-text-opacity vjs-opacity">\n              <select>\n                <option value="">---</option>\n                <option value="1">Opaque</option>\n                <option value="0.5">Semi-Opaque</option>\n              </select>\n            </span>\n        </div> <!-- vjs-fg-color -->\n        <div class="vjs-bg-color vjs-tracksetting">\n            <label class="vjs-label">Background</label>\n            <select>\n              <option value="">---</option>\n              <option value="#FFF">White</option>\n              <option value="#000">Black</option>\n              <option value="#F00">Red</option>\n              <option value="#0F0">Green</option>\n              <option value="#00F">Blue</option>\n              <option value="#FF0">Yellow</option>\n              <option value="#F0F">Magenta</option>\n              <option value="#0FF">Cyan</option>\n            </select>\n            <span class="vjs-bg-opacity vjs-opacity">\n                <select>\n                  <option value="">---</option>\n                  <option value="1">Opaque</option>\n                  <option value="0.5">Semi-Transparent</option>\n                  <option value="0">Transparent</option>\n                </select>\n            </span>\n        </div> <!-- vjs-bg-color -->\n        <div class="window-color vjs-tracksetting">\n            <label class="vjs-label">Window</label>\n            <select>\n              <option value="">---</option>\n              <option value="#FFF">White</option>\n              <option value="#000">Black</option>\n              <option value="#F00">Red</option>\n              <option value="#0F0">Green</option>\n              <option value="#00F">Blue</option>\n              <option value="#FF0">Yellow</option>\n              <option value="#F0F">Magenta</option>\n              <option value="#0FF">Cyan</option>\n            </select>\n            <span class="vjs-window-opacity vjs-opacity">\n                <select>\n                  <option value="">---</option>\n                  <option value="1">Opaque</option>\n                  <option value="0.5">Semi-Transparent</option>\n                  <option value="0">Transparent</option>\n                </select>\n            </span>\n        </div> <!-- vjs-window-color -->\n      </div> <!-- vjs-tracksettings -->\n      <div class="vjs-tracksettings-font">\n        <div class="vjs-font-percent vjs-tracksetting">\n          <label class="vjs-label">Font Size</label>\n          <select>\n            <option value="0.50">50%</option>\n            <option value="0.75">75%</option>\n            <option value="1.00" selected>100%</option>\n            <option value="1.25">125%</option>\n            <option value="1.50">150%</option>\n            <option value="1.75">175%</option>\n            <option value="2.00">200%</option>\n            <option value="3.00">300%</option>\n            <option value="4.00">400%</option>\n          </select>\n        </div> <!-- vjs-font-percent -->\n        <div class="vjs-edge-style vjs-tracksetting">\n          <label class="vjs-label">Text Edge Style</label>\n          <select>\n            <option value="none">None</option>\n            <option value="raised">Raised</option>\n            <option value="depressed">Depressed</option>\n            <option value="uniform">Uniform</option>\n            <option value="dropshadow">Dropshadow</option>\n          </select>\n        </div> <!-- vjs-edge-style -->\n        <div class="vjs-font-family vjs-tracksetting">\n          <label class="vjs-label">Font Family</label>\n          <select>\n            <option value="">Default</option>\n            <option value="monospaceSerif">Monospace Serif</option>\n            <option value="proportionalSerif">Proportional Serif</option>\n            <option value="monospaceSansSerif">Monospace Sans-Serif</option>\n            <option value="proportionalSansSerif">Proportional Sans-Serif</option>\n            <option value="casual">Casual</option>\n            <option value="script">Script</option>\n            <option value="small-caps">Small Caps</option>\n          </select>\n        </div> <!-- vjs-font-family -->\n      </div>\n    </div>\n    <div class="vjs-tracksettings-controls">\n      <button class="vjs-default-button">Defaults</button>\n      <button class="vjs-done-button">Done</button>\n    </div>';
                            return t
                        }
                        n.__esModule = !0;
                        var c = t("../component"),
                            p = r(c),
                            f = t("../utils/events.js"),
                            d = o(f),
                            h = t("../utils/fn.js"),
                            y = o(h),
                            v = t("../utils/log.js"),
                            g = r(v),
                            m = t("safe-json-parse/tuple"),
                            b = r(m),
                            _ = t("global/window"),
                            j = r(_),
                            w = function(t) {
                                function e(n, o) {
                                    i(this, e), t.call(this, n, o), this.hide(), void 0 === o.persistTextTrackSettings && (this.options_.persistTextTrackSettings = this.options_.playerOptions.persistTextTrackSettings), d.on(this.$(".vjs-done-button"), "click", y.bind(this, function() {
                                        this.saveSettings(), this.hide()
                                    })), d.on(this.$(".vjs-default-button"), "click", y.bind(this, function() {
                                        this.$(".vjs-fg-color > select").selectedIndex = 0, this.$(".vjs-bg-color > select").selectedIndex = 0, this.$(".window-color > select").selectedIndex = 0, this.$(".vjs-text-opacity > select").selectedIndex = 0, this.$(".vjs-bg-opacity > select").selectedIndex = 0, this.$(".vjs-window-opacity > select").selectedIndex = 0, this.$(".vjs-edge-style select").selectedIndex = 0, this.$(".vjs-font-family select").selectedIndex = 0, this.$(".vjs-font-percent select").selectedIndex = 2, this.updateDisplay()
                                    })), d.on(this.$(".vjs-fg-color > select"), "change", y.bind(this, this.updateDisplay)), d.on(this.$(".vjs-bg-color > select"), "change", y.bind(this, this.updateDisplay)), d.on(this.$(".window-color > select"), "change", y.bind(this, this.updateDisplay)), d.on(this.$(".vjs-text-opacity > select"), "change", y.bind(this, this.updateDisplay)), d.on(this.$(".vjs-bg-opacity > select"), "change", y.bind(this, this.updateDisplay)), d.on(this.$(".vjs-window-opacity > select"), "change", y.bind(this, this.updateDisplay)), d.on(this.$(".vjs-font-percent select"), "change", y.bind(this, this.updateDisplay)), d.on(this.$(".vjs-edge-style select"), "change", y.bind(this, this.updateDisplay)), d.on(this.$(".vjs-font-family select"), "change", y.bind(this, this.updateDisplay)), this.options_.persistTextTrackSettings && this.restoreSettings()
                                }
                                return s(e, t), e.prototype.createEl = function() {
                                    return t.prototype.createEl.call(this, "div", {
                                        className: "vjs-caption-settings vjs-modal-overlay",
                                        innerHTML: u()
                                    })
                                }, e.prototype.getValues = function() {
                                    var t = a(this.$(".vjs-edge-style select")),
                                        e = a(this.$(".vjs-font-family select")),
                                        n = a(this.$(".vjs-fg-color > select")),
                                        o = a(this.$(".vjs-text-opacity > select")),
                                        r = a(this.$(".vjs-bg-color > select")),
                                        i = a(this.$(".vjs-bg-opacity > select")),
                                        s = a(this.$(".window-color > select")),
                                        l = a(this.$(".vjs-window-opacity > select")),
                                        u = j["default"].parseFloat(a(this.$(".vjs-font-percent > select"))),
                                        c = {
                                            backgroundOpacity: i,
                                            textOpacity: o,
                                            windowOpacity: l,
                                            edgeStyle: t,
                                            fontFamily: e,
                                            color: n,
                                            backgroundColor: r,
                                            windowColor: s,
                                            fontPercent: u
                                        };
                                    for (var p in c)("" === c[p] || "none" === c[p] || "fontPercent" === p && 1 === c[p]) && delete c[p];
                                    return c
                                }, e.prototype.setValues = function(t) {
                                    l(this.$(".vjs-edge-style select"), t.edgeStyle), l(this.$(".vjs-font-family select"), t.fontFamily), l(this.$(".vjs-fg-color > select"), t.color), l(this.$(".vjs-text-opacity > select"), t.textOpacity), l(this.$(".vjs-bg-color > select"), t.backgroundColor), l(this.$(".vjs-bg-opacity > select"), t.backgroundOpacity), l(this.$(".window-color > select"), t.windowColor), l(this.$(".vjs-window-opacity > select"), t.windowOpacity);
                                    var e = t.fontPercent;
                                    e && (e = e.toFixed(2)), l(this.$(".vjs-font-percent > select"), e)
                                }, e.prototype.restoreSettings = function() {
                                    var t = void 0,
                                        e = void 0;
                                    try {
                                        var n = b["default"](j["default"].localStorage.getItem("vjs-text-track-settings"));
                                        t = n[0], e = n[1], t && g["default"].error(t)
                                    } catch (o) {
                                        g["default"].warn(o)
                                    }
                                    e && this.setValues(e)
                                }, e.prototype.saveSettings = function() {
                                    if (this.options_.persistTextTrackSettings) {
                                        var t = this.getValues();
                                        try {
                                            Object.getOwnPropertyNames(t).length > 0 ? j["default"].localStorage.setItem("vjs-text-track-settings", JSON.stringify(t)) : j["default"].localStorage.removeItem("vjs-text-track-settings")
                                        } catch (e) {
                                            g["default"].warn(e)
                                        }
                                    }
                                }, e.prototype.updateDisplay = function() {
                                    var t = this.player_.getChild("textTrackDisplay");
                                    t && t.updateDisplay()
                                }, e
                            }(p["default"]);
                        p["default"].registerComponent("TextTrackSettings", w), n["default"] = w, e.exports = n["default"]
                    }, {
                        "../component": 67,
                        "../utils/events.js": 133,
                        "../utils/fn.js": 134,
                        "../utils/log.js": 137,
                        "global/window": 2,
                        "safe-json-parse/tuple": 54
                    }],
                    128: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function r(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function i(t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }

                        function s(t, e) {
                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                            t.prototype = Object.create(e && e.prototype, {
                                constructor: {
                                    value: t,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                        }
                        n.__esModule = !0;
                        var a = t("./text-track-cue-list"),
                            l = r(a),
                            u = t("../utils/fn.js"),
                            c = o(u),
                            p = t("../utils/guid.js"),
                            f = o(p),
                            d = t("../utils/browser.js"),
                            h = o(d),
                            y = t("./text-track-enums"),
                            v = o(y),
                            g = t("../utils/log.js"),
                            m = r(g),
                            b = t("../event-target"),
                            _ = r(b),
                            j = t("global/document"),
                            w = r(j),
                            O = t("global/window"),
                            T = r(O),
                            E = t("../utils/url.js"),
                            C = t("xhr"),
                            k = r(C),
                            S = function(t, e) {
                                var n = new T["default"].WebVTT.Parser(T["default"], T["default"].vttjs, T["default"].WebVTT.StringDecoder());
                                n.oncue = function(t) {
                                    e.addCue(t)
                                }, n.onparsingerror = function(t) {
                                    m["default"].error(t)
                                }, n.onflush = function() {
                                    e.trigger({
                                        type: "loadeddata",
                                        target: e
                                    })
                                }, n.parse(t), n.flush()
                            },
                            P = function(t, e) {
                                var n = {
                                        uri: t
                                    },
                                    o = E.isCrossOrigin(t);
                                o && (n.cors = o), k["default"](n, c.bind(this, function(t, n, o) {
                                    return t ? m["default"].error(t, n) : (e.loaded_ = !0, void("function" != typeof T["default"].WebVTT ? e.tech_ && ! function() {
                                        var t = function() {
                                            return S(o, e)
                                        };
                                        e.tech_.on("vttjsloaded", t), e.tech_.on("vttjserror", function() {
                                            m["default"].error("vttjs failed to load, stopping trying to process " + e.src), e.tech_.off("vttjsloaded", t)
                                        })
                                    }() : S(o, e)))
                                }))
                            },
                            x = function(t) {
                                function e() {
                                    var n = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                                    if (i(this, e), t.call(this), !n.tech) throw new Error("A tech was not provided.");
                                    var o = this;
                                    if (h.IS_IE8) {
                                        o = w["default"].createElement("custom");
                                        for (var r in e.prototype) "constructor" !== r && (o[r] = e.prototype[r])
                                    }
                                    o.tech_ = n.tech;
                                    var s = v.TextTrackMode[n.mode] || "disabled",
                                        a = v.TextTrackKind[n.kind] || "subtitles",
                                        u = n.label || "",
                                        p = n.language || n.srclang || "",
                                        d = n.id || "vjs_text_track_" + f.newGUID();
                                    "metadata" !== a && "chapters" !== a || (s = "hidden"), o.cues_ = [], o.activeCues_ = [];
                                    var y = new l["default"](o.cues_),
                                        g = new l["default"](o.activeCues_),
                                        m = !1,
                                        b = c.bind(o, function() {
                                            this.activeCues, m && (this.trigger("cuechange"), m = !1)
                                        });
                                    return "disabled" !== s && o.tech_.on("timeupdate", b), Object.defineProperty(o, "kind", {
                                        get: function() {
                                            return a
                                        },
                                        set: function() {}
                                    }), Object.defineProperty(o, "label", {
                                        get: function() {
                                            return u
                                        },
                                        set: function() {}
                                    }), Object.defineProperty(o, "language", {
                                        get: function() {
                                            return p
                                        },
                                        set: function() {}
                                    }), Object.defineProperty(o, "id", {
                                        get: function() {
                                            return d
                                        },
                                        set: function() {}
                                    }), Object.defineProperty(o, "mode", {
                                        get: function() {
                                            return s
                                        },
                                        set: function(t) {
                                            v.TextTrackMode[t] && (s = t, "showing" === s && this.tech_.on("timeupdate", b), this.trigger("modechange"))
                                        }
                                    }), Object.defineProperty(o, "cues", {
                                        get: function() {
                                            return this.loaded_ ? y : null
                                        },
                                        set: function() {}
                                    }), Object.defineProperty(o, "activeCues", {
                                        get: function() {
                                            if (!this.loaded_) return null;
                                            if (0 === this.cues.length) return g;
                                            for (var t = this.tech_.currentTime(), e = [], n = 0, o = this.cues.length; o > n; n++) {
                                                var r = this.cues[n];
                                                r.startTime <= t && r.endTime >= t ? e.push(r) : r.startTime === r.endTime && r.startTime <= t && r.startTime + .5 >= t && e.push(r)
                                            }
                                            if (m = !1, e.length !== this.activeCues_.length) m = !0;
                                            else
                                                for (var n = 0; n < e.length; n++) - 1 === this.activeCues_.indexOf(e[n]) && (m = !0);
                                            return this.activeCues_ = e, g.setCues_(this.activeCues_), g
                                        },
                                        set: function() {}
                                    }), n.src ? (o.src = n.src, P(n.src, o)) : o.loaded_ = !0, h.IS_IE8 ? o : void 0
                                }
                                return s(e, t), e.prototype.addCue = function(t) {
                                    var e = this.tech_.textTracks();
                                    if (e)
                                        for (var n = 0; n < e.length; n++) e[n] !== this && e[n].removeCue(t);
                                    this.cues_.push(t), this.cues.setCues_(this.cues_)
                                }, e.prototype.removeCue = function(t) {
                                    for (var e = !1, n = 0, o = this.cues_.length; o > n; n++) {
                                        var r = this.cues_[n];
                                        r === t && (this.cues_.splice(n, 1), e = !0)
                                    }
                                    e && this.cues.setCues_(this.cues_)
                                }, e
                            }(_["default"]);
                        x.prototype.allowedEvents_ = {
                            cuechange: "cuechange"
                        }, n["default"] = x, e.exports = n["default"]
                    }, {
                        "../event-target": 99,
                        "../utils/browser.js": 129,
                        "../utils/fn.js": 134,
                        "../utils/guid.js": 136,
                        "../utils/log.js": 137,
                        "../utils/url.js": 142,
                        "./text-track-cue-list": 122,
                        "./text-track-enums": 124,
                        "global/document": 1,
                        "global/window": 2,
                        xhr: 56
                    }],
                    129: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }
                        n.__esModule = !0;
                        var r = t("global/document"),
                            i = o(r),
                            s = t("global/window"),
                            a = o(s),
                            l = a["default"].navigator.userAgent,
                            u = /AppleWebKit\/([\d.]+)/i.exec(l),
                            c = u ? parseFloat(u.pop()) : null,
                            p = /iPad/i.test(l);
                        n.IS_IPAD = p;
                        var f = /iPhone/i.test(l) && !p;
                        n.IS_IPHONE = f;
                        var d = /iPod/i.test(l);
                        n.IS_IPOD = d;
                        var h = f || p || d;
                        n.IS_IOS = h;
                        var y = function() {
                            var t = l.match(/OS (\d+)_/i);
                            return t && t[1] ? t[1] : void 0
                        }();
                        n.IOS_VERSION = y;
                        var v = /Android/i.test(l);
                        n.IS_ANDROID = v;
                        var g = function() {
                            var t, e, n = l.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);
                            return n ? (t = n[1] && parseFloat(n[1]), e = n[2] && parseFloat(n[2]), t && e ? parseFloat(n[1] + "." + n[2]) : t ? t : null) : null
                        }();
                        n.ANDROID_VERSION = g;
                        var m = v && /webkit/i.test(l) && 2.3 > g;
                        n.IS_OLD_ANDROID = m;
                        var b = v && 5 > g && 537 > c;
                        n.IS_NATIVE_ANDROID = b;
                        var _ = /Firefox/i.test(l);
                        n.IS_FIREFOX = _;
                        var j = /Chrome/i.test(l);
                        n.IS_CHROME = j;
                        var w = /MSIE\s8\.0/.test(l);
                        n.IS_IE8 = w;
                        var O = !!("ontouchstart" in a["default"] || a["default"].DocumentTouch && i["default"] instanceof a["default"].DocumentTouch);
                        n.TOUCH_ENABLED = O;
                        var T = "backgroundSize" in i["default"].createElement("video").style;
                        n.BACKGROUND_SIZE_SUPPORTED = T
                    }, {
                        "global/document": 1,
                        "global/window": 2
                    }],
                    130: [function(t, e, n) {
                        "use strict";

                        function o(t, e) {
                            var n, o, i = 0;
                            if (!e) return 0;
                            t && t.length || (t = r.createTimeRange(0, 0));
                            for (var s = 0; s < t.length; s++) n = t.start(s), o = t.end(s), o > e && (o = e), i += o - n;
                            return i / e
                        }
                        n.__esModule = !0, n.bufferedPercent = o;
                        var r = t("./time-ranges.js")
                    }, {
                        "./time-ranges.js": 140
                    }],
                    131: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }
                        n.__esModule = !0;
                        var r = t("./log.js"),
                            i = o(r),
                            s = {
                                get: function(t, e) {
                                    return t[e]
                                },
                                set: function(t, e, n) {
                                    return t[e] = n, !0
                                }
                            };
                        n["default"] = function(t) {
                            var e = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                            if ("function" == typeof Proxy) {
                                var n = function() {
                                    var n = {};
                                    return Object.keys(e).forEach(function(t) {
                                        s.hasOwnProperty(t) && (n[t] = function() {
                                            return i["default"].warn(e[t]), s[t].apply(this, arguments)
                                        })
                                    }), {
                                        v: new Proxy(t, n)
                                    }
                                }();
                                if ("object" == typeof n) return n.v
                            }
                            return t
                        }, e.exports = n["default"]
                    }, {
                        "./log.js": 137
                    }],
                    132: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function r(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function i(t, e) {
                            return t.raw = e, t
                        }

                        function s(t) {
                            return "string" == typeof t && /\S/.test(t)
                        }

                        function a(t) {
                            if (/\s/.test(t)) throw new Error("class has illegal whitespace characters")
                        }

                        function l(t) {
                            return new RegExp("(^|\\s)" + t + "($|\\s)")
                        }

                        function u(t) {
                            return function(e, n) {
                                return s(e) ? (s(n) && (n = D["default"].querySelector(n)), (k(n) ? n : D["default"])[t](e)) : D["default"][t](null)
                            }
                        }

                        function c(t) {
                            return 0 === t.indexOf("#") && (t = t.slice(1)), D["default"].getElementById(t)
                        }

                        function p() {
                            var t = arguments.length <= 0 || void 0 === arguments[0] ? "div" : arguments[0],
                                e = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                                n = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2],
                                o = D["default"].createElement(t);
                            return Object.getOwnPropertyNames(e).forEach(function(t) {
                                var n = e[t]; - 1 !== t.indexOf("aria-") || "role" === t || "type" === t ? (U["default"].warn(q["default"](L, t, n)), o.setAttribute(t, n)) : o[t] = n
                            }), Object.getOwnPropertyNames(n).forEach(function(t) {
                                n[t];
                                o.setAttribute(t, n[t])
                            }), o
                        }

                        function f(t, e) {
                            "undefined" == typeof t.textContent ? t.innerText = e : t.textContent = e
                        }

                        function d(t, e) {
                            e.firstChild ? e.insertBefore(t, e.firstChild) : e.appendChild(t)
                        }

                        function h(t) {
                            var e = t[W];
                            return e || (e = t[W] = B.newGUID()), $[e] || ($[e] = {}), $[e]
                        }

                        function y(t) {
                            var e = t[W];
                            return e ? !!Object.getOwnPropertyNames($[e]).length : !1
                        }

                        function v(t) {
                            var e = t[W];
                            if (e) {
                                delete $[e];
                                try {
                                    delete t[W]
                                } catch (n) {
                                    t.removeAttribute ? t.removeAttribute(W) : t[W] = null
                                }
                            }
                        }

                        function g(t, e) {
                            return t.classList ? t.classList.contains(e) : (a(e), l(e).test(t.className))
                        }

                        function m(t, e) {
                            return t.classList ? t.classList.add(e) : g(t, e) || (t.className = (t.className + " " + e).trim()), t
                        }

                        function b(t, e) {
                            return t.classList ? t.classList.remove(e) : (a(e), t.className = t.className.split(/\s+/).filter(function(t) {
                                return t !== e
                            }).join(" ")), t
                        }

                        function _(t, e, n) {
                            var o = g(t, e);
                            return "function" == typeof n && (n = n(t, e)), "boolean" != typeof n && (n = !o), n !== o ? (n ? m(t, e) : b(t, e), t) : void 0
                        }

                        function j(t, e) {
                            Object.getOwnPropertyNames(e).forEach(function(n) {
                                var o = e[n];
                                null === o || "undefined" == typeof o || o === !1 ? t.removeAttribute(n) : t.setAttribute(n, o === !0 ? "" : o)
                            })
                        }

                        function w(t) {
                            var e, n, o, r, i;
                            if (e = {}, n = ",autoplay,controls,loop,muted,default,", t && t.attributes && t.attributes.length > 0) {
                                o = t.attributes;
                                for (var s = o.length - 1; s >= 0; s--) r = o[s].name, i = o[s].value, "boolean" != typeof t[r] && -1 === n.indexOf("," + r + ",") || (i = null !== i), e[r] = i
                            }
                            return e
                        }

                        function O() {
                            D["default"].body.focus(), D["default"].onselectstart = function() {
                                return !1
                            }
                        }

                        function T() {
                            D["default"].onselectstart = function() {
                                return !0
                            }
                        }

                        function E(t) {
                            var e = void 0;
                            if (t.getBoundingClientRect && t.parentNode && (e = t.getBoundingClientRect()), !e) return {
                                left: 0,
                                top: 0
                            };
                            var n = D["default"].documentElement,
                                o = D["default"].body,
                                r = n.clientLeft || o.clientLeft || 0,
                                i = N["default"].pageXOffset || o.scrollLeft,
                                s = e.left + i - r,
                                a = n.clientTop || o.clientTop || 0,
                                l = N["default"].pageYOffset || o.scrollTop,
                                u = e.top + l - a;
                            return {
                                left: Math.round(s),
                                top: Math.round(u)
                            }
                        }

                        function C(t, e) {
                            var n = {},
                                o = E(t),
                                r = t.offsetWidth,
                                i = t.offsetHeight,
                                s = o.top,
                                a = o.left,
                                l = e.pageY,
                                u = e.pageX;
                            return e.changedTouches && (u = e.changedTouches[0].pageX, l = e.changedTouches[0].pageY), n.y = Math.max(0, Math.min(1, (s - l + i) / i)), n.x = Math.max(0, Math.min(1, (u - a) / r)), n
                        }

                        function k(t) {
                            return !!t && "object" == typeof t && 1 === t.nodeType
                        }

                        function S(t) {
                            return !!t && "object" == typeof t && 3 === t.nodeType
                        }

                        function P(t) {
                            for (; t.firstChild;) t.removeChild(t.firstChild);
                            return t
                        }

                        function x(t) {
                            return "function" == typeof t && (t = t()), (Array.isArray(t) ? t : [t]).map(function(t) {
                                return "function" == typeof t && (t = t()), k(t) || S(t) ? t : "string" == typeof t && /\S/.test(t) ? D["default"].createTextNode(t) : void 0
                            }).filter(function(t) {
                                return t
                            })
                        }

                        function A(t, e) {
                            return x(e).forEach(function(e) {
                                return t.appendChild(e)
                            }), t
                        }

                        function M(t, e) {
                            return A(P(t), e)
                        }
                        n.__esModule = !0, n.getEl = c, n.createEl = p, n.textContent = f, n.insertElFirst = d, n.getElData = h, n.hasElData = y, n.removeElData = v, n.hasElClass = g, n.addElClass = m, n.removeElClass = b, n.toggleElClass = _, n.setElAttributes = j, n.getElAttributes = w, n.blockTextSelection = O, n.unblockTextSelection = T, n.findElPosition = E, n.getPointerPosition = C, n.isEl = k, n.isTextNode = S, n.emptyEl = P, n.normalizeContent = x, n.appendContent = A, n.insertContent = M;
                        var L = i(["Setting attributes in the second argument of createEl()\n                has been deprecated. Use the third argument instead.\n                createEl(type, properties, attributes). Attempting to set ", " to ", "."], ["Setting attributes in the second argument of createEl()\n                has been deprecated. Use the third argument instead.\n                createEl(type, properties, attributes). Attempting to set ", " to ", "."]),
                            I = t("global/document"),
                            D = r(I),
                            R = t("global/window"),
                            N = r(R),
                            F = t("./guid.js"),
                            B = o(F),
                            H = t("./log.js"),
                            U = r(H),
                            V = t("tsml"),
                            q = r(V),
                            $ = {},
                            W = "vdata" + (new Date).getTime(),
                            G = u("querySelector");
                        n.$ = G;
                        var z = u("querySelectorAll");
                        n.$$ = z
                    }, {
                        "./guid.js": 136,
                        "./log.js": 137,
                        "global/document": 1,
                        "global/window": 2,
                        tsml: 55
                    }],
                    133: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function r(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function i(t, e, n) {
                            if (Array.isArray(e)) return p(i, t, e, n);
                            var o = d.getElData(t);
                            o.handlers || (o.handlers = {}), o.handlers[e] || (o.handlers[e] = []), n.guid || (n.guid = y.newGUID()), o.handlers[e].push(n), o.dispatcher || (o.disabled = !1, o.dispatcher = function(e, n) {
                                if (!o.disabled) {
                                    e = u(e);
                                    var r = o.handlers[e.type];
                                    if (r)
                                        for (var i = r.slice(0), s = 0, a = i.length; a > s && !e.isImmediatePropagationStopped(); s++) i[s].call(t, e, n)
                                }
                            }), 1 === o.handlers[e].length && (t.addEventListener ? t.addEventListener(e, o.dispatcher, !1) : t.attachEvent && t.attachEvent("on" + e, o.dispatcher))
                        }

                        function s(t, e, n) {
                            if (d.hasElData(t)) {
                                var o = d.getElData(t);
                                if (o.handlers) {
                                    if (Array.isArray(e)) return p(s, t, e, n);
                                    var r = function(e) {
                                        o.handlers[e] = [], c(t, e)
                                    };
                                    if (e) {
                                        var i = o.handlers[e];
                                        if (i) {
                                            if (!n) return void r(e);
                                            if (n.guid)
                                                for (var a = 0; a < i.length; a++) i[a].guid === n.guid && i.splice(a--, 1);
                                            c(t, e)
                                        }
                                    } else
                                        for (var l in o.handlers) r(l)
                                }
                            }
                        }

                        function a(t, e, n) {
                            var o = d.hasElData(t) ? d.getElData(t) : {},
                                r = t.parentNode || t.ownerDocument;
                            if ("string" == typeof e && (e = {
                                    type: e,
                                    target: t
                                }), e = u(e), o.dispatcher && o.dispatcher.call(t, e, n), r && !e.isPropagationStopped() && e.bubbles === !0) a.call(null, r, e, n);
                            else if (!r && !e.defaultPrevented) {
                                var i = d.getElData(e.target);
                                e.target[e.type] && (i.disabled = !0, "function" == typeof e.target[e.type] && e.target[e.type](), i.disabled = !1)
                            }
                            return !e.defaultPrevented
                        }

                        function l(t, e, n) {
                            if (Array.isArray(e)) return p(l, t, e, n);
                            var o = function r() {
                                s(t, e, r), n.apply(this, arguments)
                            };
                            o.guid = n.guid = n.guid || y.newGUID(), i(t, e, o)
                        }

                        function u(t) {
                            function e() {
                                return !0
                            }

                            function n() {
                                return !1
                            }
                            if (!t || !t.isPropagationStopped) {
                                var o = t || g["default"].event;
                                t = {};
                                for (var r in o) "layerX" !== r && "layerY" !== r && "keyLocation" !== r && "webkitMovementX" !== r && "webkitMovementY" !== r && ("returnValue" === r && o.preventDefault || (t[r] = o[r]));
                                if (t.target || (t.target = t.srcElement || b["default"]), t.relatedTarget || (t.relatedTarget = t.fromElement === t.target ? t.toElement : t.fromElement), t.preventDefault = function() {
                                        o.preventDefault && o.preventDefault(), t.returnValue = !1, o.returnValue = !1, t.defaultPrevented = !0
                                    }, t.defaultPrevented = !1, t.stopPropagation = function() {
                                        o.stopPropagation && o.stopPropagation(), t.cancelBubble = !0, o.cancelBubble = !0, t.isPropagationStopped = e
                                    }, t.isPropagationStopped = n, t.stopImmediatePropagation = function() {
                                        o.stopImmediatePropagation && o.stopImmediatePropagation(), t.isImmediatePropagationStopped = e, t.stopPropagation()
                                    }, t.isImmediatePropagationStopped = n, null != t.clientX) {
                                    var i = b["default"].documentElement,
                                        s = b["default"].body;
                                    t.pageX = t.clientX + (i && i.scrollLeft || s && s.scrollLeft || 0) - (i && i.clientLeft || s && s.clientLeft || 0), t.pageY = t.clientY + (i && i.scrollTop || s && s.scrollTop || 0) - (i && i.clientTop || s && s.clientTop || 0)
                                }
                                t.which = t.charCode || t.keyCode, null != t.button && (t.button = 1 & t.button ? 0 : 4 & t.button ? 1 : 2 & t.button ? 2 : 0)
                            }
                            return t
                        }

                        function c(t, e) {
                            var n = d.getElData(t);
                            0 === n.handlers[e].length && (delete n.handlers[e], t.removeEventListener ? t.removeEventListener(e, n.dispatcher, !1) : t.detachEvent && t.detachEvent("on" + e, n.dispatcher)), Object.getOwnPropertyNames(n.handlers).length <= 0 && (delete n.handlers, delete n.dispatcher, delete n.disabled), 0 === Object.getOwnPropertyNames(n).length && d.removeElData(t)
                        }

                        function p(t, e, n, o) {
                            n.forEach(function(n) {
                                t(e, n, o)
                            })
                        }
                        n.__esModule = !0, n.on = i, n.off = s, n.trigger = a, n.one = l, n.fixEvent = u;
                        var f = t("./dom.js"),
                            d = r(f),
                            h = t("./guid.js"),
                            y = r(h),
                            v = t("global/window"),
                            g = o(v),
                            m = t("global/document"),
                            b = o(m)
                    }, {
                        "./dom.js": 132,
                        "./guid.js": 136,
                        "global/document": 1,
                        "global/window": 2
                    }],
                    134: [function(t, e, n) {
                        "use strict";
                        n.__esModule = !0;
                        var o = t("./guid.js"),
                            r = function(t, e, n) {
                                e.guid || (e.guid = o.newGUID());
                                var r = function() {
                                    return e.apply(t, arguments)
                                };
                                return r.guid = n ? n + "_" + e.guid : e.guid, r
                            };
                        n.bind = r
                    }, {
                        "./guid.js": 136
                    }],
                    135: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            var e = arguments.length <= 1 || void 0 === arguments[1] ? t : arguments[1];
                            return function() {
                                t = 0 > t ? 0 : t;
                                var n = Math.floor(t % 60),
                                    o = Math.floor(t / 60 % 60),
                                    r = Math.floor(t / 3600),
                                    i = Math.floor(e / 60 % 60),
                                    s = Math.floor(e / 3600);
                                return (isNaN(t) || t === 1 / 0) && (r = o = n = "-"), r = r > 0 || s > 0 ? r + ":" : "", o = ((r || i >= 10) && 10 > o ? "0" + o : o) + ":", n = 10 > n ? "0" + n : n, r + o + n
                            }()
                        }
                        n.__esModule = !0, n["default"] = o, e.exports = n["default"]
                    }, {}],
                    136: [function(t, e, n) {
                        "use strict";

                        function o() {
                            return r++
                        }
                        n.__esModule = !0, n.newGUID = o;
                        var r = 1
                    }, {}],
                    137: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function r(t, e) {
                            var n = Array.prototype.slice.call(e),
                                o = function() {},
                                r = s["default"].console || {
                                    log: o,
                                    warn: o,
                                    error: o
                                };
                            t ? n.unshift(t.toUpperCase() + ":") : t = "log", a.history.push(n), n.unshift("VIDEOJS:"), r[t].apply ? r[t].apply(r, n) : r[t](n.join(" "))
                        }
                        n.__esModule = !0;
                        var i = t("global/window"),
                            s = o(i),
                            a = function() {
                                r(null, arguments)
                            };
                        a.history = [], a.error = function() {
                            r("error", arguments)
                        }, a.warn = function() {
                            r("warn", arguments)
                        }, n["default"] = a, e.exports = n["default"]
                    }, {
                        "global/window": 2
                    }],
                    138: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function r(t) {
                            return !!t && "object" == typeof t && "[object Object]" === t.toString() && t.constructor === Object
                        }

                        function i() {
                            var t = Array.prototype.slice.call(arguments);
                            return t.unshift({}), t.push(l), a["default"].apply(null, t), t[0]
                        }
                        n.__esModule = !0, n["default"] = i;
                        var s = t("lodash-compat/object/merge"),
                            a = o(s),
                            l = function(t, e) {
                                return r(e) ? r(t) ? void 0 : i(e) : e
                            };
                        e.exports = n["default"]
                    }, {
                        "lodash-compat/object/merge": 40
                    }],
                    139: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }
                        n.__esModule = !0;
                        var r = t("global/document"),
                            i = o(r),
                            s = function(t) {
                                var e = i["default"].createElement("style");
                                return e.className = t, e
                            };
                        n.createStyleElement = s;
                        var a = function(t, e) {
                            t.styleSheet ? t.styleSheet.cssText = e : t.textContent = e
                        };
                        n.setTextContent = a
                    }, {
                        "global/document": 1
                    }],
                    140: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }

                        function r(t, e) {
                            return Array.isArray(t) ? i(t) : void 0 === t || void 0 === e ? i() : i([
                                [t, e]
                            ])
                        }

                        function i(t) {
                            return void 0 === t || 0 === t.length ? {
                                length: 0,
                                start: function() {
                                    throw new Error("This TimeRanges object is empty")
                                },
                                end: function() {
                                    throw new Error("This TimeRanges object is empty")
                                }
                            } : {
                                length: t.length,
                                start: s.bind(null, "start", 0, t),
                                end: s.bind(null, "end", 1, t)
                            }
                        }

                        function s(t, e, n, o) {
                            return void 0 === o && (u["default"].warn("DEPRECATED: Function '" + t + "' on 'TimeRanges' called without an index argument."), o = 0), a(t, o, n.length - 1), n[o][e]
                        }

                        function a(t, e, n) {
                            if (0 > e || e > n) throw new Error("Failed to execute '" + t + "' on 'TimeRanges': The index provided (" + e + ") is greater than or equal to the maximum bound (" + n + ").")
                        }
                        n.__esModule = !0, n.createTimeRanges = r;
                        var l = t("./log.js"),
                            u = o(l);
                        n.createTimeRange = r
                    }, {
                        "./log.js": 137
                    }],
                    141: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            return t.charAt(0).toUpperCase() + t.slice(1)
                        }
                        n.__esModule = !0, n["default"] = o, e.exports = n["default"]
                    }, {}],
                    142: [function(t, e, n) {
                        "use strict";

                        function o(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }
                        n.__esModule = !0;
                        var r = t("global/document"),
                            i = o(r),
                            s = t("global/window"),
                            a = o(s),
                            l = function(t) {
                                var e = ["protocol", "hostname", "port", "pathname", "search", "hash", "host"],
                                    n = i["default"].createElement("a");
                                n.href = t;
                                var o = "" === n.host && "file:" !== n.protocol,
                                    r = void 0;
                                o && (r = i["default"].createElement("div"), r.innerHTML = '<a href="' + t + '"></a>', n = r.firstChild, r.setAttribute("style", "display:none; position:absolute;"), i["default"].body.appendChild(r));
                                for (var s = {}, a = 0; a < e.length; a++) s[e[a]] = n[e[a]];
                                return "http:" === s.protocol && (s.host = s.host.replace(/:80$/, "")), "https:" === s.protocol && (s.host = s.host.replace(/:443$/, "")), o && i["default"].body.removeChild(r), s
                            };
                        n.parseUrl = l;
                        var u = function(t) {
                            if (!t.match(/^https?:\/\//)) {
                                var e = i["default"].createElement("div");
                                e.innerHTML = '<a href="' + t + '">x</a>', t = e.firstChild.href
                            }
                            return t
                        };
                        n.getAbsoluteURL = u;
                        var c = function(t) {
                            if ("string" == typeof t) {
                                var e = /^(\/?)([\s\S]*?)((?:\.{1,2}|[^\/]+?)(\.([^\.\/\?]+)))(?:[\/]*|[\?].*)$/i,
                                    n = e.exec(t);
                                if (n) return n.pop().toLowerCase()
                            }
                            return ""
                        };
                        n.getFileExtension = c;
                        var p = function(t) {
                            var e = a["default"].location,
                                n = l(t),
                                o = ":" === n.protocol ? e.protocol : n.protocol,
                                r = o + n.host !== e.protocol + e.host;
                            return r
                        };
                        n.isCrossOrigin = p
                    }, {
                        "global/document": 1,
                        "global/window": 2
                    }],
                    143: [function(t, n, o) {
                        "use strict";

                        function r(t) {
                            if (t && t.__esModule) return t;
                            var e = {};
                            if (null != t)
                                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                            return e["default"] = t, e
                        }

                        function i(t) {
                            return t && t.__esModule ? t : {
                                "default": t
                            }
                        }
                        o.__esModule = !0;
                        var s = t("global/document"),
                            a = i(s),
                            l = t("./setup"),
                            u = r(l),
                            c = t("./utils/stylesheet.js"),
                            p = r(c),
                            f = t("./component"),
                            d = i(f),
                            h = t("./event-target"),
                            y = i(h),
                            v = t("./utils/events.js"),
                            g = r(v),
                            m = t("./player"),
                            b = i(m),
                            _ = t("./plugins.js"),
                            j = i(_),
                            w = t("../../src/js/utils/merge-options.js"),
                            O = i(w),
                            T = t("./utils/fn.js"),
                            E = r(T),
                            C = t("./tracks/text-track.js"),
                            k = i(C),
                            S = t("object.assign"),
                            P = (i(S), t("./utils/time-ranges.js")),
                            x = t("./utils/format-time.js"),
                            A = i(x),
                            M = t("./utils/log.js"),
                            L = i(M),
                            I = t("./utils/dom.js"),
                            D = r(I),
                            R = t("./utils/browser.js"),
                            N = r(R),
                            F = t("./utils/url.js"),
                            B = r(F),
                            H = t("./extend.js"),
                            U = i(H),
                            V = t("lodash-compat/object/merge"),
                            q = i(V),
                            $ = t("./utils/create-deprecation-proxy.js"),
                            W = i($),
                            G = t("xhr"),
                            z = i(G),
                            K = t("./tech/tech.js"),
                            Y = i(K),
                            X = t("./tech/html5.js"),
                            Q = (i(X), t("./tech/flash.js"));
                        i(Q);
                        "undefined" == typeof HTMLVideoElement && (a["default"].createElement("video"), a["default"].createElement("audio"), a["default"].createElement("track"));
                        var J = function et(t, e, n) {
                                var o = void 0;
                                if ("string" == typeof t) {
                                    if (0 === t.indexOf("#") && (t = t.slice(1)), et.getPlayers()[t]) return e && L["default"].warn('Player "' + t + '" is already initialised. Options will not be applied.'), n && et.getPlayers()[t].ready(n), et.getPlayers()[t];
                                    o = D.getEl(t)
                                } else o = t;
                                if (!o || !o.nodeName) throw new TypeError("The element or ID supplied is not valid. (videojs)");
                                return o.player || b["default"].players[o.playerId] || new b["default"](o, e, n)
                            },
                            Z = D.$(".vjs-styles-defaults");
                        if (!Z) {
                            Z = p.createStyleElement("vjs-styles-defaults");
                            var tt = D.$("head");
                            tt.insertBefore(Z, tt.firstChild), p.setTextContent(Z, "\n    .video-js {\n      width: 300px;\n      height: 150px;\n    }\n\n    .vjs-fluid {\n      padding-top: 56.25%\n    }\n  ")
                        }
                        u.autoSetupTimeout(1, J), J.VERSION = "5.8.8", J.options = b["default"].prototype.options_, J.getPlayers = function() {
                            return b["default"].players
                        }, J.players = W["default"](b["default"].players, {
                            get: "Access to videojs.players is deprecated; use videojs.getPlayers instead",
                            set: "Modification of videojs.players is deprecated"
                        }), J.getComponent = d["default"].getComponent, J.registerComponent = function(t, e) {
                            Y["default"].isTech(e) && L["default"].warn("The " + t + " tech was registered as a component. It should instead be registered using videojs.registerTech(name, tech)"), d["default"].registerComponent.call(d["default"], t, e)
                        }, J.getTech = Y["default"].getTech, J.registerTech = Y["default"].registerTech, J.browser = N, J.TOUCH_ENABLED = N.TOUCH_ENABLED, J.extend = U["default"], J.mergeOptions = O["default"], J.bind = E.bind, J.plugin = j["default"], J.addLanguage = function(t, e) {
                            var n;
                            return t = ("" + t).toLowerCase(), q["default"](J.options.languages, (n = {}, n[t] = e, n))[t]
                        }, J.log = L["default"], J.createTimeRange = J.createTimeRanges = P.createTimeRanges, J.formatTime = A["default"], J.parseUrl = B.parseUrl, J.isCrossOrigin = B.isCrossOrigin, J.EventTarget = y["default"], J.on = g.on, J.one = g.one, J.off = g.off, J.trigger = g.trigger, J.xhr = z["default"], J.TextTrack = k["default"], J.isEl = D.isEl, J.isTextNode = D.isTextNode, J.createEl = D.createEl, J.hasClass = D.hasElClass, J.addClass = D.addElClass, J.removeClass = D.removeElClass, J.toggleClass = D.toggleElClass, J.setAttributes = D.setElAttributes, J.getAttributes = D.getElAttributes, J.emptyEl = D.emptyEl, J.appendContent = D.appendContent, J.insertContent = D.insertContent, "function" == typeof e && e.amd ? e("videojs", [], function() {
                            return J
                        }) : "object" == typeof o && "object" == typeof n && (n.exports = J), o["default"] = J, n.exports = o["default"]
                    }, {
                        "../../src/js/utils/merge-options.js": 138,
                        "./component": 67,
                        "./event-target": 99,
                        "./extend.js": 100,
                        "./player": 108,
                        "./plugins.js": 109,
                        "./setup": 113,
                        "./tech/flash.js": 116,
                        "./tech/html5.js": 117,
                        "./tech/tech.js": 119,
                        "./tracks/text-track.js": 128,
                        "./utils/browser.js": 129,
                        "./utils/create-deprecation-proxy.js": 131,
                        "./utils/dom.js": 132,
                        "./utils/events.js": 133,
                        "./utils/fn.js": 134,
                        "./utils/format-time.js": 135,
                        "./utils/log.js": 137,
                        "./utils/stylesheet.js": 139,
                        "./utils/time-ranges.js": 140,
                        "./utils/url.js": 142,
                        "global/document": 1,
                        "lodash-compat/object/merge": 40,
                        "object.assign": 45,
                        xhr: 56
                    }]
                }, {}, [143])(143)
            }),
            function(t) {
                var e = t.vttjs = {},
                    n = e.VTTCue,
                    o = e.VTTRegion,
                    r = t.VTTCue,
                    i = t.VTTRegion;
                e.shim = function() {
                    e.VTTCue = n, e.VTTRegion = o
                }, e.restore = function() {
                    e.VTTCue = r, e.VTTRegion = i
                }
            }(this),
            function(t, e) {
                function n(t) {
                    if ("string" != typeof t) return !1;
                    var e = a[t.toLowerCase()];
                    return e ? t.toLowerCase() : !1
                }

                function o(t) {
                    if ("string" != typeof t) return !1;
                    var e = l[t.toLowerCase()];
                    return e ? t.toLowerCase() : !1
                }

                function r(t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var n = arguments[e];
                        for (var o in n) t[o] = n[o]
                    }
                    return t
                }

                function i(t, e, i) {
                    var a = this,
                        l = /MSIE\s8\.0/.test(navigator.userAgent),
                        u = {};
                    l ? a = document.createElement("custom") : u.enumerable = !0, a.hasBeenReset = !1;
                    var c = "",
                        p = !1,
                        f = t,
                        d = e,
                        h = i,
                        y = null,
                        v = "",
                        g = !0,
                        m = "auto",
                        b = "start",
                        _ = 50,
                        j = "middle",
                        w = 50,
                        O = "middle";
                    return Object.defineProperty(a, "id", r({}, u, {
                        get: function() {
                            return c
                        },
                        set: function(t) {
                            c = "" + t
                        }
                    })), Object.defineProperty(a, "pauseOnExit", r({}, u, {
                        get: function() {
                            return p
                        },
                        set: function(t) {
                            p = !!t
                        }
                    })), Object.defineProperty(a, "startTime", r({}, u, {
                        get: function() {
                            return f
                        },
                        set: function(t) {
                            if ("number" != typeof t) throw new TypeError("Start time must be set to a number.");
                            f = t, this.hasBeenReset = !0
                        }
                    })), Object.defineProperty(a, "endTime", r({}, u, {
                        get: function() {
                            return d
                        },
                        set: function(t) {
                            if ("number" != typeof t) throw new TypeError("End time must be set to a number.");
                            d = t, this.hasBeenReset = !0
                        }
                    })), Object.defineProperty(a, "text", r({}, u, {
                        get: function() {
                            return h
                        },
                        set: function(t) {
                            h = "" + t, this.hasBeenReset = !0
                        }
                    })), Object.defineProperty(a, "region", r({}, u, {
                        get: function() {
                            return y
                        },
                        set: function(t) {
                            y = t, this.hasBeenReset = !0
                        }
                    })), Object.defineProperty(a, "vertical", r({}, u, {
                        get: function() {
                            return v
                        },
                        set: function(t) {
                            var e = n(t);
                            if (e === !1) throw new SyntaxError("An invalid or illegal string was specified.");
                            v = e, this.hasBeenReset = !0
                        }
                    })), Object.defineProperty(a, "snapToLines", r({}, u, {
                        get: function() {
                            return g
                        },
                        set: function(t) {
                            g = !!t, this.hasBeenReset = !0
                        }
                    })), Object.defineProperty(a, "line", r({}, u, {
                        get: function() {
                            return m
                        },
                        set: function(t) {
                            if ("number" != typeof t && t !== s) throw new SyntaxError("An invalid number or illegal string was specified.");
                            m = t, this.hasBeenReset = !0
                        }
                    })), Object.defineProperty(a, "lineAlign", r({}, u, {
                        get: function() {
                            return b
                        },
                        set: function(t) {
                            var e = o(t);
                            if (!e) throw new SyntaxError("An invalid or illegal string was specified.");
                            b = e, this.hasBeenReset = !0
                        }
                    })), Object.defineProperty(a, "position", r({}, u, {
                        get: function() {
                            return _
                        },
                        set: function(t) {
                            if (0 > t || t > 100) throw new Error("Position must be between 0 and 100.");
                            _ = t, this.hasBeenReset = !0
                        }
                    })), Object.defineProperty(a, "positionAlign", r({}, u, {
                        get: function() {
                            return j
                        },
                        set: function(t) {
                            var e = o(t);
                            if (!e) throw new SyntaxError("An invalid or illegal string was specified.");
                            j = e, this.hasBeenReset = !0
                        }
                    })), Object.defineProperty(a, "size", r({}, u, {
                        get: function() {
                            return w
                        },
                        set: function(t) {
                            if (0 > t || t > 100) throw new Error("Size must be between 0 and 100.");
                            w = t, this.hasBeenReset = !0
                        }
                    })), Object.defineProperty(a, "align", r({}, u, {
                        get: function() {
                            return O
                        },
                        set: function(t) {
                            var e = o(t);
                            if (!e) throw new SyntaxError("An invalid or illegal string was specified.");
                            O = e, this.hasBeenReset = !0
                        }
                    })), a.displayState = void 0, l ? a : void 0
                }
                var s = "auto",
                    a = {
                        "": !0,
                        lr: !0,
                        rl: !0
                    },
                    l = {
                        start: !0,
                        middle: !0,
                        end: !0,
                        left: !0,
                        right: !0
                    };
                i.prototype.getCueAsHTML = function() {
                    return WebVTT.convertCueToDOMTree(window, this.text)
                }, t.VTTCue = t.VTTCue || i, e.VTTCue = i
            }(this, this.vttjs || {}),
            function(t, e) {
                function n(t) {
                    if ("string" != typeof t) return !1;
                    var e = i[t.toLowerCase()];
                    return e ? t.toLowerCase() : !1
                }

                function o(t) {
                    return "number" == typeof t && t >= 0 && 100 >= t
                }

                function r() {
                    var t = 100,
                        e = 3,
                        r = 0,
                        i = 100,
                        s = 0,
                        a = 100,
                        l = "";
                    Object.defineProperties(this, {
                        width: {
                            enumerable: !0,
                            get: function() {
                                return t
                            },
                            set: function(e) {
                                if (!o(e)) throw new Error("Width must be between 0 and 100.");
                                t = e
                            }
                        },
                        lines: {
                            enumerable: !0,
                            get: function() {
                                return e
                            },
                            set: function(t) {
                                if ("number" != typeof t) throw new TypeError("Lines must be set to a number.");
                                e = t
                            }
                        },
                        regionAnchorY: {
                            enumerable: !0,
                            get: function() {
                                return i
                            },
                            set: function(t) {
                                if (!o(t)) throw new Error("RegionAnchorX must be between 0 and 100.");
                                i = t
                            }
                        },
                        regionAnchorX: {
                            enumerable: !0,
                            get: function() {
                                return r
                            },
                            set: function(t) {
                                if (!o(t)) throw new Error("RegionAnchorY must be between 0 and 100.");
                                r = t
                            }
                        },
                        viewportAnchorY: {
                            enumerable: !0,
                            get: function() {
                                return a
                            },
                            set: function(t) {
                                if (!o(t)) throw new Error("ViewportAnchorY must be between 0 and 100.");
                                a = t
                            }
                        },
                        viewportAnchorX: {
                            enumerable: !0,
                            get: function() {
                                return s
                            },
                            set: function(t) {
                                if (!o(t)) throw new Error("ViewportAnchorX must be between 0 and 100.");
                                s = t
                            }
                        },
                        scroll: {
                            enumerable: !0,
                            get: function() {
                                return l
                            },
                            set: function(t) {
                                var e = n(t);
                                if (e === !1) throw new SyntaxError("An invalid or illegal string was specified.");
                                l = e
                            }
                        }
                    })
                }
                var i = {
                    "": !0,
                    up: !0
                };
                t.VTTRegion = t.VTTRegion || r, e.VTTRegion = r
            }(this, this.vttjs || {}),
            function(t) {
                function e(t, e) {
                    this.name = "ParsingError", this.code = t.code, this.message = e || t.message
                }

                function n(t) {
                    function e(t, e, n, o) {
                        return 3600 * (0 | t) + 60 * (0 | e) + (0 | n) + (0 | o) / 1e3
                    }
                    var n = t.match(/^(\d+):(\d{2})(:\d{2})?\.(\d{3})/);
                    return n ? n[3] ? e(n[1], n[2], n[3].replace(":", ""), n[4]) : n[1] > 59 ? e(n[1], n[2], 0, n[4]) : e(0, n[1], n[2], n[4]) : null
                }

                function o() {
                    this.values = h(null)
                }

                function r(t, e, n, o) {
                    var r = o ? t.split(o) : [t];
                    for (var i in r)
                        if ("string" == typeof r[i]) {
                            var s = r[i].split(n);
                            if (2 === s.length) {
                                var a = s[0],
                                    l = s[1];
                                e(a, l)
                            }
                        }
                }

                function i(t, i, s) {
                    function a() {
                        var o = n(t);
                        if (null === o) throw new e(e.Errors.BadTimeStamp, "Malformed timestamp: " + c);
                        return t = t.replace(/^[^\sa-zA-Z-]+/, ""), o
                    }

                    function l(t, e) {
                        var n = new o;
                        r(t, function(t, e) {
                            switch (t) {
                                case "region":
                                    for (var o = s.length - 1; o >= 0; o--)
                                        if (s[o].id === e) {
                                            n.set(t, s[o].region);
                                            break
                                        }
                                    break;
                                case "vertical":
                                    n.alt(t, e, ["rl", "lr"]);
                                    break;
                                case "line":
                                    var r = e.split(","),
                                        i = r[0];
                                    n.integer(t, i), n.percent(t, i) ? n.set("snapToLines", !1) : null, n.alt(t, i, ["auto"]), 2 === r.length && n.alt("lineAlign", r[1], ["start", "middle", "end"]);
                                    break;
                                case "position":
                                    r = e.split(","), n.percent(t, r[0]), 2 === r.length && n.alt("positionAlign", r[1], ["start", "middle", "end"]);
                                    break;
                                case "size":
                                    n.percent(t, e);
                                    break;
                                case "align":
                                    n.alt(t, e, ["start", "middle", "end", "left", "right"])
                            }
                        }, /:/, /\s/), e.region = n.get("region", null), e.vertical = n.get("vertical", ""), e.line = n.get("line", "auto"), e.lineAlign = n.get("lineAlign", "start"), e.snapToLines = n.get("snapToLines", !0), e.size = n.get("size", 100), e.align = n.get("align", "middle"), e.position = n.get("position", {
                            start: 0,
                            left: 0,
                            middle: 50,
                            end: 100,
                            right: 100
                        }, e.align), e.positionAlign = n.get("positionAlign", {
                            start: "start",
                            left: "start",
                            middle: "middle",
                            end: "end",
                            right: "end"
                        }, e.align)
                    }

                    function u() {
                        t = t.replace(/^\s+/, "")
                    }
                    var c = t;
                    if (u(), i.startTime = a(), u(), "-->" !== t.substr(0, 3)) throw new e(e.Errors.BadTimeStamp, "Malformed time stamp (time stamps must be separated by '-->'): " + c);
                    t = t.substr(3), u(), i.endTime = a(), u(), l(t, i)
                }

                function s(t, e) {
                    function o() {
                        function t(t) {
                            return e = e.substr(t.length), t
                        }
                        if (!e) return null;
                        var n = e.match(/^([^<]*)(<[^>]+>?)?/);
                        return t(n[1] ? n[1] : n[2])
                    }

                    function r(t) {
                        return y[t]
                    }

                    function i(t) {
                        for (; h = t.match(/&(amp|lt|gt|lrm|rlm|nbsp);/);) t = t.replace(h[0], r);
                        return t
                    }

                    function s(t, e) {
                        return !m[e.localName] || m[e.localName] === t.localName
                    }

                    function a(e, n) {
                        var o = v[e];
                        if (!o) return null;
                        var r = t.document.createElement(o);
                        r.localName = o;
                        var i = g[e];
                        return i && n && (r[i] = n.trim()), r
                    }
                    for (var l, u = t.document.createElement("div"), c = u, p = []; null !== (l = o());)
                        if ("<" !== l[0]) c.appendChild(t.document.createTextNode(i(l)));
                        else {
                            if ("/" === l[1]) {
                                p.length && p[p.length - 1] === l.substr(2).replace(">", "") && (p.pop(), c = c.parentNode);
                                continue
                            }
                            var f, d = n(l.substr(1, l.length - 2));
                            if (d) {
                                f = t.document.createProcessingInstruction("timestamp", d), c.appendChild(f);
                                continue
                            }
                            var h = l.match(/^<([^.\s\/0-9>]+)(\.[^\s\\>]+)?([^>\\]+)?(\\?)>?$/);
                            if (!h) continue;
                            if (f = a(h[1], h[3]), !f) continue;
                            if (!s(c, f)) continue;
                            h[2] && (f.className = h[2].substr(1).replace(".", " ")), p.push(h[1]), c.appendChild(f), c = f
                        }
                    return u
                }

                function a(t) {
                    function e(t, e) {
                        for (var n = e.childNodes.length - 1; n >= 0; n--) t.push(e.childNodes[n])
                    }

                    function n(t) {
                        if (!t || !t.length) return null;
                        var o = t.pop(),
                            r = o.textContent || o.innerText;
                        if (r) {
                            var i = r.match(/^.*(\n|\r)/);
                            return i ? (t.length = 0, i[0]) : r
                        }
                        return "ruby" === o.tagName ? n(t) : o.childNodes ? (e(t, o), n(t)) : void 0
                    }
                    var o, r = [],
                        i = "";
                    if (!t || !t.childNodes) return "ltr";
                    for (e(r, t); i = n(r);)
                        for (var s = 0; s < i.length; s++) {
                            o = i.charCodeAt(s);
                            for (var a = 0; a < b.length; a++)
                                if (b[a] === o) return "rtl"
                        }
                    return "ltr"
                }

                function l(t) {
                    if ("number" == typeof t.line && (t.snapToLines || t.line >= 0 && t.line <= 100)) return t.line;
                    if (!t.track || !t.track.textTrackList || !t.track.textTrackList.mediaElement) return -1;
                    for (var e = t.track, n = e.textTrackList, o = 0, r = 0; r < n.length && n[r] !== e; r++) "showing" === n[r].mode && o++;
                    return -1 * ++o
                }

                function u() {}

                function c(t, e, n) {
                    var o = /MSIE\s8\.0/.test(navigator.userAgent),
                        r = "rgba(255, 255, 255, 1)",
                        i = "rgba(0, 0, 0, 0.8)";
                    o && (r = "rgb(255, 255, 255)", i = "rgb(0, 0, 0)"), u.call(this), this.cue = e, this.cueDiv = s(t, e.text);
                    var l = {
                        color: r,
                        backgroundColor: i,
                        position: "relative",
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        display: "inline"
                    };
                    o || (l.writingMode = "" === e.vertical ? "horizontal-tb" : "lr" === e.vertical ? "vertical-lr" : "vertical-rl", l.unicodeBidi = "plaintext"), this.applyStyles(l, this.cueDiv), this.div = t.document.createElement("div"), l = {
                        textAlign: "middle" === e.align ? "center" : e.align,
                        font: n.font,
                        whiteSpace: "pre-line",
                        position: "absolute"
                    }, o || (l.direction = a(this.cueDiv), l.writingMode = "" === e.vertical ? "horizontal-tb" : "lr" === e.vertical ? "vertical-lr" : "vertical-rl".stylesunicodeBidi = "plaintext"), this.applyStyles(l), this.div.appendChild(this.cueDiv);
                    var c = 0;
                    switch (e.positionAlign) {
                        case "start":
                            c = e.position;
                            break;
                        case "middle":
                            c = e.position - e.size / 2;
                            break;
                        case "end":
                            c = e.position - e.size
                    }
                    "" === e.vertical ? this.applyStyles({
                        left: this.formatStyle(c, "%"),
                        width: this.formatStyle(e.size, "%")
                    }) : this.applyStyles({
                        top: this.formatStyle(c, "%"),
                        height: this.formatStyle(e.size, "%")
                    }), this.move = function(t) {
                        this.applyStyles({
                            top: this.formatStyle(t.top, "px"),
                            bottom: this.formatStyle(t.bottom, "px"),
                            left: this.formatStyle(t.left, "px"),
                            right: this.formatStyle(t.right, "px"),
                            height: this.formatStyle(t.height, "px"),
                            width: this.formatStyle(t.width, "px")
                        })
                    }
                }

                function p(t) {
                    var e, n, o, r, i = /MSIE\s8\.0/.test(navigator.userAgent);
                    if (t.div) {
                        n = t.div.offsetHeight, o = t.div.offsetWidth, r = t.div.offsetTop;
                        var s = (s = t.div.childNodes) && (s = s[0]) && s.getClientRects && s.getClientRects();
                        t = t.div.getBoundingClientRect(), e = s ? Math.max(s[0] && s[0].height || 0, t.height / s.length) : 0
                    }
                    this.left = t.left, this.right = t.right, this.top = t.top || r, this.height = t.height || n, this.bottom = t.bottom || r + (t.height || n), this.width = t.width || o, this.lineHeight = void 0 !== e ? e : t.lineHeight, i && !this.lineHeight && (this.lineHeight = 13)
                }

                function f(t, e, n, o) {
                    function r(t, e) {
                        for (var r, i = new p(t), s = 1, a = 0; a < e.length; a++) {
                            for (; t.overlapsOppositeAxis(n, e[a]) || t.within(n) && t.overlapsAny(o);) t.move(e[a]);
                            if (t.within(n)) return t;
                            var l = t.intersectPercentage(n);
                            s > l && (r = new p(t), s = l), t = new p(i)
                        }
                        return r || i
                    }
                    var i = new p(e),
                        s = e.cue,
                        a = l(s),
                        u = [];
                    if (s.snapToLines) {
                        var c;
                        switch (s.vertical) {
                            case "":
                                u = ["+y", "-y"], c = "height";
                                break;
                            case "rl":
                                u = ["+x", "-x"], c = "width";
                                break;
                            case "lr":
                                u = ["-x", "+x"], c = "width"
                        }
                        var f = i.lineHeight,
                            d = f * Math.round(a),
                            h = n[c] + f,
                            y = u[0];
                        Math.abs(d) > h && (d = 0 > d ? -1 : 1, d *= Math.ceil(h / f) * f), 0 > a && (d += "" === s.vertical ? n.height : n.width, u = u.reverse()), i.move(y, d)
                    } else {
                        var v = i.lineHeight / n.height * 100;
                        switch (s.lineAlign) {
                            case "middle":
                                a -= v / 2;
                                break;
                            case "end":
                                a -= v
                        }
                        switch (s.vertical) {
                            case "":
                                e.applyStyles({
                                    top: e.formatStyle(a, "%")
                                });
                                break;
                            case "rl":
                                e.applyStyles({
                                    left: e.formatStyle(a, "%")
                                });
                                break;
                            case "lr":
                                e.applyStyles({
                                    right: e.formatStyle(a, "%")
                                })
                        }
                        u = ["+y", "-x", "+x", "-y"], i = new p(e)
                    }
                    var g = r(i, u);
                    e.move(g.toCSSCompatValues(n))
                }

                function d() {}
                var h = Object.create || function() {
                    function t() {}
                    return function(e) {
                        if (1 !== arguments.length) throw new Error("Object.create shim only accepts one parameter.");
                        return t.prototype = e, new t
                    }
                }();
                e.prototype = h(Error.prototype), e.prototype.constructor = e, e.Errors = {
                    BadSignature: {
                        code: 0,
                        message: "Malformed WebVTT signature."
                    },
                    BadTimeStamp: {
                        code: 1,
                        message: "Malformed time stamp."
                    }
                }, o.prototype = {
                    set: function(t, e) {
                        this.get(t) || "" === e || (this.values[t] = e)
                    },
                    get: function(t, e, n) {
                        return n ? this.has(t) ? this.values[t] : e[n] : this.has(t) ? this.values[t] : e
                    },
                    has: function(t) {
                        return t in this.values
                    },
                    alt: function(t, e, n) {
                        for (var o = 0; o < n.length; ++o)
                            if (e === n[o]) {
                                this.set(t, e);
                                break
                            }
                    },
                    integer: function(t, e) {
                        /^-?\d+$/.test(e) && this.set(t, parseInt(e, 10))
                    },
                    percent: function(t, e) {
                        var n;
                        return (n = e.match(/^([\d]{1,3})(\.[\d]*)?%$/)) && (e = parseFloat(e), e >= 0 && 100 >= e) ? (this.set(t, e), !0) : !1
                    }
                };
                var y = {
                        "&amp;": "&",
                        "&lt;": "<",
                        "&gt;": ">",
                        "&lrm;": "‎",
                        "&rlm;": "‏",
                        "&nbsp;": " "
                    },
                    v = {
                        c: "span",
                        i: "i",
                        b: "b",
                        u: "u",
                        ruby: "ruby",
                        rt: "rt",
                        v: "span",
                        lang: "span"
                    },
                    g = {
                        v: "title",
                        lang: "lang"
                    },
                    m = {
                        rt: "ruby"
                    },
                    b = [1470, 1472, 1475, 1478, 1488, 1489, 1490, 1491, 1492, 1493, 1494, 1495, 1496, 1497, 1498, 1499, 1500, 1501, 1502, 1503, 1504, 1505, 1506, 1507, 1508, 1509, 1510, 1511, 1512, 1513, 1514, 1520, 1521, 1522, 1523, 1524, 1544, 1547, 1549, 1563, 1566, 1567, 1568, 1569, 1570, 1571, 1572, 1573, 1574, 1575, 1576, 1577, 1578, 1579, 1580, 1581, 1582, 1583, 1584, 1585, 1586, 1587, 1588, 1589, 1590, 1591, 1592, 1593, 1594, 1595, 1596, 1597, 1598, 1599, 1600, 1601, 1602, 1603, 1604, 1605, 1606, 1607, 1608, 1609, 1610, 1645, 1646, 1647, 1649, 1650, 1651, 1652, 1653, 1654, 1655, 1656, 1657, 1658, 1659, 1660, 1661, 1662, 1663, 1664, 1665, 1666, 1667, 1668, 1669, 1670, 1671, 1672, 1673, 1674, 1675, 1676, 1677, 1678, 1679, 1680, 1681, 1682, 1683, 1684, 1685, 1686, 1687, 1688, 1689, 1690, 1691, 1692, 1693, 1694, 1695, 1696, 1697, 1698, 1699, 1700, 1701, 1702, 1703, 1704, 1705, 1706, 1707, 1708, 1709, 1710, 1711, 1712, 1713, 1714, 1715, 1716, 1717, 1718, 1719, 1720, 1721, 1722, 1723, 1724, 1725, 1726, 1727, 1728, 1729, 1730, 1731, 1732, 1733, 1734, 1735, 1736, 1737, 1738, 1739, 1740, 1741, 1742, 1743, 1744, 1745, 1746, 1747, 1748, 1749, 1765, 1766, 1774, 1775, 1786, 1787, 1788, 1789, 1790, 1791, 1792, 1793, 1794, 1795, 1796, 1797, 1798, 1799, 1800, 1801, 1802, 1803, 1804, 1805, 1807, 1808, 1810, 1811, 1812, 1813, 1814, 1815, 1816, 1817, 1818, 1819, 1820, 1821, 1822, 1823, 1824, 1825, 1826, 1827, 1828, 1829, 1830, 1831, 1832, 1833, 1834, 1835, 1836, 1837, 1838, 1839, 1869, 1870, 1871, 1872, 1873, 1874, 1875, 1876, 1877, 1878, 1879, 1880, 1881, 1882, 1883, 1884, 1885, 1886, 1887, 1888, 1889, 1890, 1891, 1892, 1893, 1894, 1895, 1896, 1897, 1898, 1899, 1900, 1901, 1902, 1903, 1904, 1905, 1906, 1907, 1908, 1909, 1910, 1911, 1912, 1913, 1914, 1915, 1916, 1917, 1918, 1919, 1920, 1921, 1922, 1923, 1924, 1925, 1926, 1927, 1928, 1929, 1930, 1931, 1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939, 1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949, 1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1969, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2e3, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2036, 2037, 2042, 2048, 2049, 2050, 2051, 2052, 2053, 2054, 2055, 2056, 2057, 2058, 2059, 2060, 2061, 2062, 2063, 2064, 2065, 2066, 2067, 2068, 2069, 2074, 2084, 2088, 2096, 2097, 2098, 2099, 2100, 2101, 2102, 2103, 2104, 2105, 2106, 2107, 2108, 2109, 2110, 2112, 2113, 2114, 2115, 2116, 2117, 2118, 2119, 2120, 2121, 2122, 2123, 2124, 2125, 2126, 2127, 2128, 2129, 2130, 2131, 2132, 2133, 2134, 2135, 2136, 2142, 2208, 2210, 2211, 2212, 2213, 2214, 2215, 2216, 2217, 2218, 2219, 2220, 8207, 64285, 64287, 64288, 64289, 64290, 64291, 64292, 64293, 64294, 64295, 64296, 64298, 64299, 64300, 64301, 64302, 64303, 64304, 64305, 64306, 64307, 64308, 64309, 64310, 64312, 64313, 64314, 64315, 64316, 64318, 64320, 64321, 64323, 64324, 64326, 64327, 64328, 64329, 64330, 64331, 64332, 64333, 64334, 64335, 64336, 64337, 64338, 64339, 64340, 64341, 64342, 64343, 64344, 64345, 64346, 64347, 64348, 64349, 64350, 64351, 64352, 64353, 64354, 64355, 64356, 64357, 64358, 64359, 64360, 64361, 64362, 64363, 64364, 64365, 64366, 64367, 64368, 64369, 64370, 64371, 64372, 64373, 64374, 64375, 64376, 64377, 64378, 64379, 64380, 64381, 64382, 64383, 64384, 64385, 64386, 64387, 64388, 64389, 64390, 64391, 64392, 64393, 64394, 64395, 64396, 64397, 64398, 64399, 64400, 64401, 64402, 64403, 64404, 64405, 64406, 64407, 64408, 64409, 64410, 64411, 64412, 64413, 64414, 64415, 64416, 64417, 64418, 64419, 64420, 64421, 64422, 64423, 64424, 64425, 64426, 64427, 64428, 64429, 64430, 64431, 64432, 64433, 64434, 64435, 64436, 64437, 64438, 64439, 64440, 64441, 64442, 64443, 64444, 64445, 64446, 64447, 64448, 64449, 64467, 64468, 64469, 64470, 64471, 64472, 64473, 64474, 64475, 64476, 64477, 64478, 64479, 64480, 64481, 64482, 64483, 64484, 64485, 64486, 64487, 64488, 64489, 64490, 64491, 64492, 64493, 64494, 64495, 64496, 64497, 64498, 64499, 64500, 64501, 64502, 64503, 64504, 64505, 64506, 64507, 64508, 64509, 64510, 64511, 64512, 64513, 64514, 64515, 64516, 64517, 64518, 64519, 64520, 64521, 64522, 64523, 64524, 64525, 64526, 64527, 64528, 64529, 64530, 64531, 64532, 64533, 64534, 64535, 64536, 64537, 64538, 64539, 64540, 64541, 64542, 64543, 64544, 64545, 64546, 64547, 64548, 64549, 64550, 64551, 64552, 64553, 64554, 64555, 64556, 64557, 64558, 64559, 64560, 64561, 64562, 64563, 64564, 64565, 64566, 64567, 64568, 64569, 64570, 64571, 64572, 64573, 64574, 64575, 64576, 64577, 64578, 64579, 64580, 64581, 64582, 64583, 64584, 64585, 64586, 64587, 64588, 64589, 64590, 64591, 64592, 64593, 64594, 64595, 64596, 64597, 64598, 64599, 64600, 64601, 64602, 64603, 64604, 64605, 64606, 64607, 64608, 64609, 64610, 64611, 64612, 64613, 64614, 64615, 64616, 64617, 64618, 64619, 64620, 64621, 64622, 64623, 64624, 64625, 64626, 64627, 64628, 64629, 64630, 64631, 64632, 64633, 64634, 64635, 64636, 64637, 64638, 64639, 64640, 64641, 64642, 64643, 64644, 64645, 64646, 64647, 64648, 64649, 64650, 64651, 64652, 64653, 64654, 64655, 64656, 64657, 64658, 64659, 64660, 64661, 64662, 64663, 64664, 64665, 64666, 64667, 64668, 64669, 64670, 64671, 64672, 64673, 64674, 64675, 64676, 64677, 64678, 64679, 64680, 64681, 64682, 64683, 64684, 64685, 64686, 64687, 64688, 64689, 64690, 64691, 64692, 64693, 64694, 64695, 64696, 64697, 64698, 64699, 64700, 64701, 64702, 64703, 64704, 64705, 64706, 64707, 64708, 64709, 64710, 64711, 64712, 64713, 64714, 64715, 64716, 64717, 64718, 64719, 64720, 64721, 64722, 64723, 64724, 64725, 64726, 64727, 64728, 64729, 64730, 64731, 64732, 64733, 64734, 64735, 64736, 64737, 64738, 64739, 64740, 64741, 64742, 64743, 64744, 64745, 64746, 64747, 64748, 64749, 64750, 64751, 64752, 64753, 64754, 64755, 64756, 64757, 64758, 64759, 64760, 64761, 64762, 64763, 64764, 64765, 64766, 64767, 64768, 64769, 64770, 64771, 64772, 64773, 64774, 64775, 64776, 64777, 64778, 64779, 64780, 64781, 64782, 64783, 64784, 64785, 64786, 64787, 64788, 64789, 64790, 64791, 64792, 64793, 64794, 64795, 64796, 64797, 64798, 64799, 64800, 64801, 64802, 64803, 64804, 64805, 64806, 64807, 64808, 64809, 64810, 64811, 64812, 64813, 64814, 64815, 64816, 64817, 64818, 64819, 64820, 64821, 64822, 64823, 64824, 64825, 64826, 64827, 64828, 64829, 64848, 64849, 64850, 64851, 64852, 64853, 64854, 64855, 64856, 64857, 64858, 64859, 64860, 64861, 64862, 64863, 64864, 64865, 64866, 64867, 64868, 64869, 64870, 64871, 64872, 64873, 64874, 64875, 64876, 64877, 64878, 64879, 64880, 64881, 64882, 64883, 64884, 64885, 64886, 64887, 64888, 64889, 64890, 64891, 64892, 64893, 64894, 64895, 64896, 64897, 64898, 64899, 64900, 64901, 64902, 64903, 64904, 64905, 64906, 64907, 64908, 64909, 64910, 64911, 64914, 64915, 64916, 64917, 64918, 64919, 64920, 64921, 64922, 64923, 64924, 64925, 64926, 64927, 64928, 64929, 64930, 64931, 64932, 64933, 64934, 64935, 64936, 64937, 64938, 64939, 64940, 64941, 64942, 64943, 64944, 64945, 64946, 64947, 64948, 64949, 64950, 64951, 64952, 64953, 64954, 64955, 64956, 64957, 64958, 64959, 64960, 64961, 64962, 64963, 64964, 64965, 64966, 64967, 65008, 65009, 65010, 65011, 65012, 65013, 65014, 65015, 65016, 65017, 65018, 65019, 65020, 65136, 65137, 65138, 65139, 65140, 65142, 65143, 65144, 65145, 65146, 65147, 65148, 65149, 65150, 65151, 65152, 65153, 65154, 65155, 65156, 65157, 65158, 65159, 65160, 65161, 65162, 65163, 65164, 65165, 65166, 65167, 65168, 65169, 65170, 65171, 65172, 65173, 65174, 65175, 65176, 65177, 65178, 65179, 65180, 65181, 65182, 65183, 65184, 65185, 65186, 65187, 65188, 65189, 65190, 65191, 65192, 65193, 65194, 65195, 65196, 65197, 65198, 65199, 65200, 65201, 65202, 65203, 65204, 65205, 65206, 65207, 65208, 65209, 65210, 65211, 65212, 65213, 65214, 65215, 65216, 65217, 65218, 65219, 65220, 65221, 65222, 65223, 65224, 65225, 65226, 65227, 65228, 65229, 65230, 65231, 65232, 65233, 65234, 65235, 65236, 65237, 65238, 65239, 65240, 65241, 65242, 65243, 65244, 65245, 65246, 65247, 65248, 65249, 65250, 65251, 65252, 65253, 65254, 65255, 65256, 65257, 65258, 65259, 65260, 65261, 65262, 65263, 65264, 65265, 65266, 65267, 65268, 65269, 65270, 65271, 65272, 65273, 65274, 65275, 65276, 67584, 67585, 67586, 67587, 67588, 67589, 67592, 67594, 67595, 67596, 67597, 67598, 67599, 67600, 67601, 67602, 67603, 67604, 67605, 67606, 67607, 67608, 67609, 67610, 67611, 67612, 67613, 67614, 67615, 67616, 67617, 67618, 67619, 67620, 67621, 67622, 67623, 67624, 67625, 67626, 67627, 67628, 67629, 67630, 67631, 67632, 67633, 67634, 67635, 67636, 67637, 67639, 67640, 67644, 67647, 67648, 67649, 67650, 67651, 67652, 67653, 67654, 67655, 67656, 67657, 67658, 67659, 67660, 67661, 67662, 67663, 67664, 67665, 67666, 67667, 67668, 67669, 67671, 67672, 67673, 67674, 67675, 67676, 67677, 67678, 67679, 67840, 67841, 67842, 67843, 67844, 67845, 67846, 67847, 67848, 67849, 67850, 67851, 67852, 67853, 67854, 67855, 67856, 67857, 67858, 67859, 67860, 67861, 67862, 67863, 67864, 67865, 67866, 67867, 67872, 67873, 67874, 67875, 67876, 67877, 67878, 67879, 67880, 67881, 67882, 67883, 67884, 67885, 67886, 67887, 67888, 67889, 67890, 67891, 67892, 67893, 67894, 67895, 67896, 67897, 67903, 67968, 67969, 67970, 67971, 67972, 67973, 67974, 67975, 67976, 67977, 67978, 67979, 67980, 67981, 67982, 67983, 67984, 67985, 67986, 67987, 67988, 67989, 67990, 67991, 67992, 67993, 67994, 67995, 67996, 67997, 67998, 67999, 68e3, 68001, 68002, 68003, 68004, 68005, 68006, 68007, 68008, 68009, 68010, 68011, 68012, 68013, 68014, 68015, 68016, 68017, 68018, 68019, 68020, 68021, 68022, 68023, 68030, 68031, 68096, 68112, 68113, 68114, 68115, 68117, 68118, 68119, 68121, 68122, 68123, 68124, 68125, 68126, 68127, 68128, 68129, 68130, 68131, 68132, 68133, 68134, 68135, 68136, 68137, 68138, 68139, 68140, 68141, 68142, 68143, 68144, 68145, 68146, 68147, 68160, 68161, 68162, 68163, 68164, 68165, 68166, 68167, 68176, 68177, 68178, 68179, 68180, 68181, 68182, 68183, 68184, 68192, 68193, 68194, 68195, 68196, 68197, 68198, 68199, 68200, 68201, 68202, 68203, 68204, 68205, 68206, 68207, 68208, 68209, 68210, 68211, 68212, 68213, 68214, 68215, 68216, 68217, 68218, 68219, 68220, 68221, 68222, 68223, 68352, 68353, 68354, 68355, 68356, 68357, 68358, 68359, 68360, 68361, 68362, 68363, 68364, 68365, 68366, 68367, 68368, 68369, 68370, 68371, 68372, 68373, 68374, 68375, 68376, 68377, 68378, 68379, 68380, 68381, 68382, 68383, 68384, 68385, 68386, 68387, 68388, 68389, 68390, 68391, 68392, 68393, 68394, 68395, 68396, 68397, 68398, 68399, 68400, 68401, 68402, 68403, 68404, 68405, 68416, 68417, 68418, 68419, 68420, 68421, 68422, 68423, 68424, 68425, 68426, 68427, 68428, 68429, 68430, 68431, 68432, 68433, 68434, 68435, 68436, 68437, 68440, 68441, 68442, 68443, 68444, 68445, 68446, 68447, 68448, 68449, 68450, 68451, 68452, 68453, 68454, 68455, 68456, 68457, 68458, 68459, 68460, 68461, 68462, 68463, 68464, 68465, 68466, 68472, 68473, 68474, 68475, 68476, 68477, 68478, 68479, 68608, 68609, 68610, 68611, 68612, 68613, 68614, 68615, 68616, 68617, 68618, 68619, 68620, 68621, 68622, 68623, 68624, 68625, 68626, 68627, 68628, 68629, 68630, 68631, 68632, 68633, 68634, 68635, 68636, 68637, 68638, 68639, 68640, 68641, 68642, 68643, 68644, 68645, 68646, 68647, 68648, 68649, 68650, 68651, 68652, 68653, 68654, 68655, 68656, 68657, 68658, 68659, 68660, 68661, 68662, 68663, 68664, 68665, 68666, 68667, 68668, 68669, 68670, 68671, 68672, 68673, 68674, 68675, 68676, 68677, 68678, 68679, 68680, 126464, 126465, 126466, 126467, 126469, 126470, 126471, 126472, 126473, 126474, 126475, 126476, 126477, 126478, 126479, 126480, 126481, 126482, 126483, 126484, 126485, 126486, 126487, 126488, 126489, 126490, 126491, 126492, 126493, 126494, 126495, 126497, 126498, 126500, 126503, 126505, 126506, 126507, 126508, 126509, 126510, 126511, 126512, 126513, 126514, 126516, 126517, 126518, 126519, 126521, 126523, 126530, 126535, 126537, 126539, 126541, 126542, 126543, 126545, 126546, 126548, 126551, 126553, 126555, 126557, 126559, 126561, 126562, 126564, 126567, 126568, 126569, 126570, 126572, 126573, 126574, 126575, 126576, 126577, 126578, 126580, 126581, 126582, 126583, 126585, 126586, 126587, 126588, 126590, 126592, 126593, 126594, 126595, 126596, 126597, 126598, 126599, 126600, 126601, 126603, 126604, 126605, 126606, 126607, 126608, 126609, 126610, 126611, 126612, 126613, 126614, 126615, 126616, 126617, 126618, 126619, 126625, 126626, 126627, 126629, 126630, 126631, 126632, 126633, 126635, 126636, 126637, 126638, 126639, 126640, 126641, 126642, 126643, 126644, 126645, 126646, 126647, 126648, 126649, 126650, 126651, 1114109];
                u.prototype.applyStyles = function(t, e) {
                    e = e || this.div;
                    for (var n in t) t.hasOwnProperty(n) && (e.style[n] = t[n])
                }, u.prototype.formatStyle = function(t, e) {
                    return 0 === t ? 0 : t + e
                }, c.prototype = h(u.prototype), c.prototype.constructor = c, p.prototype.move = function(t, e) {
                    switch (e = void 0 !== e ? e : this.lineHeight, t) {
                        case "+x":
                            this.left += e, this.right += e;
                            break;
                        case "-x":
                            this.left -= e, this.right -= e;
                            break;
                        case "+y":
                            this.top += e, this.bottom += e;
                            break;
                        case "-y":
                            this.top -= e, this.bottom -= e
                    }
                }, p.prototype.overlaps = function(t) {
                    return this.left < t.right && this.right > t.left && this.top < t.bottom && this.bottom > t.top
                }, p.prototype.overlapsAny = function(t) {
                    for (var e = 0; e < t.length; e++)
                        if (this.overlaps(t[e])) return !0;
                    return !1
                }, p.prototype.within = function(t) {
                    return this.top >= t.top && this.bottom <= t.bottom && this.left >= t.left && this.right <= t.right
                }, p.prototype.overlapsOppositeAxis = function(t, e) {
                    switch (e) {
                        case "+x":
                            return this.left < t.left;
                        case "-x":
                            return this.right > t.right;
                        case "+y":
                            return this.top < t.top;
                        case "-y":
                            return this.bottom > t.bottom
                    }
                }, p.prototype.intersectPercentage = function(t) {
                    var e = Math.max(0, Math.min(this.right, t.right) - Math.max(this.left, t.left)),
                        n = Math.max(0, Math.min(this.bottom, t.bottom) - Math.max(this.top, t.top)),
                        o = e * n;
                    return o / (this.height * this.width)
                }, p.prototype.toCSSCompatValues = function(t) {
                    return {
                        top: this.top - t.top,
                        bottom: t.bottom - this.bottom,
                        left: this.left - t.left,
                        right: t.right - this.right,
                        height: this.height,
                        width: this.width
                    }
                }, p.getSimpleBoxPosition = function(t) {
                    var e = t.div ? t.div.offsetHeight : t.tagName ? t.offsetHeight : 0,
                        n = t.div ? t.div.offsetWidth : t.tagName ? t.offsetWidth : 0,
                        o = t.div ? t.div.offsetTop : t.tagName ? t.offsetTop : 0;
                    t = t.div ? t.div.getBoundingClientRect() : t.tagName ? t.getBoundingClientRect() : t;
                    var r = {
                        left: t.left,
                        right: t.right,
                        top: t.top || o,
                        height: t.height || e,
                        bottom: t.bottom || o + (t.height || e),
                        width: t.width || n
                    };
                    return r
                }, d.StringDecoder = function() {
                    return {
                        decode: function(t) {
                            if (!t) return "";
                            if ("string" != typeof t) throw new Error("Error - expected string data.");
                            return decodeURIComponent(encodeURIComponent(t))
                        }
                    }
                }, d.convertCueToDOMTree = function(t, e) {
                    return t && e ? s(t, e) : null
                };
                var _ = .05,
                    j = "sans-serif",
                    w = "1.5%";
                d.processCues = function(t, e, n) {
                    function o(t) {
                        for (var e = 0; e < t.length; e++)
                            if (t[e].hasBeenReset || !t[e].displayState) return !0;
                        return !1
                    }
                    if (!t || !e || !n) return null;
                    for (; n.firstChild;) n.removeChild(n.firstChild);
                    var r = t.document.createElement("div");
                    if (r.style.position = "absolute", r.style.left = "0", r.style.right = "0", r.style.top = "0", r.style.bottom = "0", r.style.margin = w, n.appendChild(r), o(e)) {
                        var i = [],
                            s = p.getSimpleBoxPosition(r),
                            a = Math.round(s.height * _ * 100) / 100,
                            l = {
                                font: a + "px " + j
                            };
                        ! function() {
                            for (var n, o, a = 0; a < e.length; a++) o = e[a], n = new c(t, o, l), r.appendChild(n.div), f(t, n, s, i), o.displayState = n.div, i.push(p.getSimpleBoxPosition(n))
                        }()
                    } else
                        for (var u = 0; u < e.length; u++) r.appendChild(e[u].displayState)
                }, d.Parser = function(t, e, n) {
                    n || (n = e, e = {}), e || (e = {}), this.window = t, this.vttjs = e, this.state = "INITIAL", this.buffer = "", this.decoder = n || new TextDecoder("utf8"), this.regionList = []
                }, d.Parser.prototype = {
                    reportOrThrowError: function(t) {
                        if (!(t instanceof e)) throw t;
                        this.onparsingerror && this.onparsingerror(t)
                    },
                    parse: function(t) {
                        function n() {
                            for (var t = l.buffer, e = 0; e < t.length && "\r" !== t[e] && "\n" !== t[e];) ++e;
                            var n = t.substr(0, e);
                            return "\r" === t[e] && ++e, "\n" === t[e] && ++e, l.buffer = t.substr(e), n
                        }

                        function s(t) {
                            var e = new o;
                            if (r(t, function(t, n) {
                                    switch (t) {
                                        case "id":
                                            e.set(t, n);
                                            break;
                                        case "width":
                                            e.percent(t, n);
                                            break;
                                        case "lines":
                                            e.integer(t, n);
                                            break;
                                        case "regionanchor":
                                        case "viewportanchor":
                                            var r = n.split(",");
                                            if (2 !== r.length) break;
                                            var i = new o;
                                            if (i.percent("x", r[0]), i.percent("y", r[1]), !i.has("x") || !i.has("y")) break;
                                            e.set(t + "X", i.get("x")), e.set(t + "Y", i.get("y"));
                                            break;
                                        case "scroll":
                                            e.alt(t, n, ["up"])
                                    }
                                }, /=/, /\s/), e.has("id")) {
                                var n = new(l.vttjs.VTTRegion || l.window.VTTRegion);
                                n.width = e.get("width", 100), n.lines = e.get("lines", 3), n.regionAnchorX = e.get("regionanchorX", 0), n.regionAnchorY = e.get("regionanchorY", 100), n.viewportAnchorX = e.get("viewportanchorX", 0), n.viewportAnchorY = e.get("viewportanchorY", 100), n.scroll = e.get("scroll", ""), l.onregion && l.onregion(n), l.regionList.push({
                                    id: e.get("id"),
                                    region: n
                                })
                            }
                        }

                        function a(t) {
                            r(t, function(t, e) {
                                switch (t) {
                                    case "Region":
                                        s(e)
                                }
                            }, /:/)
                        }
                        var l = this;
                        t && (l.buffer += l.decoder.decode(t, {
                            stream: !0
                        }));
                        try {
                            var u;
                            if ("INITIAL" === l.state) {
                                if (!/\r\n|\n/.test(l.buffer)) return this;
                                u = n();
                                var c = u.match(/^WEBVTT([ \t].*)?$/);
                                if (!c || !c[0]) throw new e(e.Errors.BadSignature);
                                l.state = "HEADER"
                            }
                            for (var p = !1; l.buffer;) {
                                if (!/\r\n|\n/.test(l.buffer)) return this;
                                switch (p ? p = !1 : u = n(), l.state) {
                                    case "HEADER":
                                        /:/.test(u) ? a(u) : u || (l.state = "ID");
                                        continue;
                                    case "NOTE":
                                        u || (l.state = "ID");
                                        continue;
                                    case "ID":
                                        if (/^NOTE($|[ \t])/.test(u)) {
                                            l.state = "NOTE";
                                            break
                                        }
                                        if (!u) continue;
                                        if (l.cue = new(l.vttjs.VTTCue || l.window.VTTCue)(0, 0, ""), l.state = "CUE", -1 === u.indexOf("-->")) {
                                            l.cue.id = u;
                                            continue
                                        }
                                    case "CUE":
                                        try {
                                            i(u, l.cue, l.regionList)
                                        } catch (f) {
                                            l.reportOrThrowError(f), l.cue = null, l.state = "BADCUE";
                                            continue
                                        }
                                        l.state = "CUETEXT";
                                        continue;
                                    case "CUETEXT":
                                        var d = -1 !== u.indexOf("-->");
                                        if (!u || d && (p = !0)) {
                                            l.oncue && l.oncue(l.cue), l.cue = null, l.state = "ID";
                                            continue
                                        }
                                        l.cue.text && (l.cue.text += "\n"), l.cue.text += u;
                                        continue;
                                    case "BADCUE":
                                        u || (l.state = "ID");
                                        continue
                                }
                            }
                        } catch (f) {
                            l.reportOrThrowError(f), "CUETEXT" === l.state && l.cue && l.oncue && l.oncue(l.cue), l.cue = null, l.state = "INITIAL" === l.state ? "BADWEBVTT" : "BADCUE"
                        }
                        return this
                    },
                    flush: function() {
                        var t = this;
                        try {
                            if (t.buffer += t.decoder.decode(), (t.cue || "HEADER" === t.state) && (t.buffer += "\n\n", t.parse()), "INITIAL" === t.state) throw new e(e.Errors.BadSignature)
                        } catch (n) {
                            t.reportOrThrowError(n)
                        }
                        return t.onflush && t.onflush(), this
                    }
                }, t.WebVTT = d
            }(this, this.vttjs || {})
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    98: [function(t, e, n) {
        ! function(o, r) {
            "function" == typeof define && define.amd ? define("videojs-contrib-ads", ["videojs"], function(t) {
                return r(t)
            }) : "object" == typeof n ? e.exports = r(t("video.js")) : o["videojs-contrib-ads"] = r(videojs)
        }(this, function(t) {
            ! function(t, e, n) {
                "use strict";
                var o = e.getComponent("Html5").Events,
                    r = function(e) {
                        e.ads.cancelPlayTimeout || (e.ads.cancelPlayTimeout = t.setTimeout(function() {
                            e.ads.cancelPlayTimeout = null, e.paused() || e.pause(), e.one("contentplayback", function() {
                                e.paused() && e.play()
                            })
                        }, 1))
                    },
                    i = function(t) {
                        var e, n, o = t.$(".vjs-tech"),
                            r = t.remoteTextTracks ? t.remoteTextTracks() : [],
                            i = [],
                            s = {
                                ended: t.ended(),
                                currentSrc: t.currentSrc(),
                                src: t.src(),
                                currentTime: t.currentTime(),
                                type: t.currentType()
                            };
                        for (o && (s.nativePoster = o.poster, s.style = o.getAttribute("style")), n = r.length; n--;) e = r[n], i.push({
                            track: e,
                            mode: e.mode
                        }), e.mode = "disabled";
                        return s.suppressedTracks = i, s
                    },
                    s = function(o, r) {
                        var i, s, a = o.$(".vjs-tech"),
                            l = 20,
                            u = r.suppressedTracks,
                            c = function() {
                                for (var t = u.length; t--;) i = u[t], i.track.mode = i.mode
                            },
                            p = function() {
                                var e = !1,
                                    n = function() {
                                        e = !0
                                    };
                                o.currentTime(r.currentTime), r.ended ? (o.ads.resumeEndedTimeout = t.setTimeout(function() {
                                    e || o.play(), o.off("ended", n), o.ads.resumeEndedTimeout = null
                                }, 250), o.on("ended", n), o.on("dispose", function() {
                                    t.clearTimeout(o.ads.resumeEndedTimeout)
                                })) : o.play()
                            },
                            f = function() {
                                return o.off("contentcanplay", f), o.ads.tryToResumeTimeout_ && (o.clearTimeout(o.ads.tryToResumeTimeout_), o.ads.tryToResumeTimeout_ = null), a = o.el().querySelector(".vjs-tech"), a.readyState > 1 ? p() : a.seekable === n ? p() : a.seekable.length > 0 ? p() : void(l-- ? t.setTimeout(f, 50) : ! function() {
                                    try {
                                        p()
                                    } catch (t) {
                                        e.log.warn("Failed to resume the content after an advertisement", t)
                                    }
                                }())
                            };
                        r.nativePoster && (a.poster = r.nativePoster), "style" in r && a.setAttribute("style", r.style || ""), s = o.src() !== r.src || o.currentSrc() !== r.currentSrc, s ? (o.one("contentloadedmetadata", c), o.src({
                            src: r.currentSrc,
                            type: r.type
                        }), o.load(), o.one("contentcanplay", f), o.ads.tryToResumeTimeout_ = o.setTimeout(f, 2e3)) : o.ended() && r.ended || (c(), o.play())
                    },
                    a = function(t) {
                        var e = t.$(".vjs-tech");
                        e && e.removeAttribute("poster")
                    },
                    l = {
                        timeout: 5e3,
                        prerollTimeout: 100,
                        postrollTimeout: 100,
                        debug: !1
                    },
                    u = function(n) {
                        var u, c = this,
                            p = e.mergeOptions(l, n);
                        ! function() {
                            var t = o.concat(["firstplay", "loadedalldata"]),
                                e = function() {
                                    return !0
                                },
                                n = function(t, n) {
                                    n.isImmediatePropagationStopped = e, n.cancelBubble = !0, n.isPropagationStopped = e, c.trigger({
                                        type: t + n.type,
                                        state: c.ads.state,
                                        originalEvent: n
                                    })
                                };
                            c.on(t, function(t) {
                                if ("ad-playback" === c.ads.state) n("ad", t);
                                else if ("content-playback" === c.ads.state && "ended" === t.type) n("content", t);
                                else if ("content-resuming" === c.ads.state) {
                                    if (c.ads.snapshot) {
                                        if (c.currentSrc() !== c.ads.snapshot.currentSrc) {
                                            if ("loadstart" === t.type) return;
                                            return n("content", t)
                                        }
                                        if (c.ads.snapshot.ended) return "pause" === t.type || "ended" === t.type ? void c.addClass("vjs-has-started") : n("content", t)
                                    }
                                    "playing" !== t.type && n("content", t)
                                }
                            })
                        }(), c.on(["addurationchange", "adcanplay"], function() {
                                c.currentSrc() !== c.ads.snapshot.currentSrc && c.play()
                            }), c.ads = {
                                state: "content-set",
                                startLinearAdMode: function() {
                                    "preroll?" !== c.ads.state && "content-playback" !== c.ads.state && "postroll?" !== c.ads.state || c.trigger("adstart")
                                },
                                endLinearAdMode: function() {
                                    "ad-playback" === c.ads.state && c.trigger("adend")
                                },
                                skipLinearAdMode: function() {
                                    "ad-playback" !== c.ads.state && c.trigger("adskip")
                                }
                            }, u = function(n) {
                                var o = {
                                    "content-set": {
                                        events: {
                                            adscanceled: function() {
                                                this.state = "content-playback"
                                            },
                                            adsready: function() {
                                                this.state = "ads-ready"
                                            },
                                            play: function() {
                                                this.state = "ads-ready?", r(c), a(c)
                                            },
                                            adserror: function() {
                                                this.state = "content-playback"
                                            },
                                            adskip: function() {
                                                this.state = "content-playback"
                                            }
                                        }
                                    },
                                    "ads-ready": {
                                        events: {
                                            play: function() {
                                                this.state = "preroll?", r(c)
                                            },
                                            adskip: function() {
                                                this.state = "content-playback"
                                            },
                                            adserror: function() {
                                                this.state = "content-playback"
                                            }
                                        }
                                    },
                                    "preroll?": {
                                        enter: function() {
                                            c.addClass("vjs-ad-loading"), c.ads.adTimeoutTimeout = t.setTimeout(function() {
                                                c.trigger("adtimeout")
                                            }, p.prerollTimeout), c.trigger("readyforpreroll")
                                        },
                                        leave: function() {
                                            t.clearTimeout(c.ads.adTimeoutTimeout), c.removeClass("vjs-ad-loading")
                                        },
                                        events: {
                                            play: function() {
                                                r(c)
                                            },
                                            adstart: function() {
                                                this.state = "ad-playback"
                                            },
                                            adskip: function() {
                                                this.state = "content-playback"
                                            },
                                            adtimeout: function() {
                                                this.state = "content-playback"
                                            },
                                            adserror: function() {
                                                this.state = "content-playback"
                                            }
                                        }
                                    },
                                    "ads-ready?": {
                                        enter: function() {
                                            c.addClass("vjs-ad-loading"), c.ads.adTimeoutTimeout = t.setTimeout(function() {
                                                c.trigger("adtimeout")
                                            }, p.timeout)
                                        },
                                        leave: function() {
                                            t.clearTimeout(c.ads.adTimeoutTimeout), c.removeClass("vjs-ad-loading")
                                        },
                                        events: {
                                            play: function() {
                                                r(c)
                                            },
                                            adscanceled: function() {
                                                this.state = "content-playback"
                                            },
                                            adsready: function() {
                                                this.state = "preroll?"
                                            },
                                            adskip: function() {
                                                this.state = "content-playback"
                                            },
                                            adtimeout: function() {
                                                this.state = "content-playback"
                                            },
                                            adserror: function() {
                                                this.state = "content-playback"
                                            }
                                        }
                                    },
                                    "ad-playback": {
                                        enter: function() {
                                            this.snapshot = i(c), c.addClass("vjs-ad-playing"), a(c), c.ads.cancelPlayTimeout && (t.clearTimeout(c.ads.cancelPlayTimeout), c.ads.cancelPlayTimeout = null)
                                        },
                                        leave: function() {
                                            c.removeClass("vjs-ad-playing"), s(c, this.snapshot), "adend" !== c.ads.triggerevent && c.trigger("adend")
                                        },
                                        events: {
                                            adend: function() {
                                                this.state = "content-resuming"
                                            },
                                            adserror: function() {
                                                this.state = "content-resuming"
                                            }
                                        }
                                    },
                                    "content-resuming": {
                                        enter: function() {
                                            this.snapshot.ended && (t.clearTimeout(c.ads._fireEndedTimeout), c.ads._fireEndedTimeout = t.setTimeout(function() {
                                                c.trigger("ended")
                                            }, 1e3))
                                        },
                                        leave: function() {
                                            t.clearTimeout(c.ads._fireEndedTimeout)
                                        },
                                        events: {
                                            contentupdate: function() {
                                                this.state = "content-set"
                                            },
                                            contentresumed: function() {
                                                this.state = "content-playback"
                                            },
                                            playing: function() {
                                                this.state = "content-playback"
                                            },
                                            ended: function() {
                                                this.state = "content-playback"
                                            }
                                        }
                                    },
                                    "postroll?": {
                                        enter: function() {
                                            this.snapshot = i(c), c.addClass("vjs-ad-loading"), c.ads.adTimeoutTimeout = t.setTimeout(function() {
                                                c.trigger("adtimeout")
                                            }, p.postrollTimeout)
                                        },
                                        leave: function() {
                                            t.clearTimeout(c.ads.adTimeoutTimeout), c.removeClass("vjs-ad-loading")
                                        },
                                        events: {
                                            adstart: function() {
                                                this.state = "ad-playback"
                                            },
                                            adskip: function() {
                                                this.state = "content-resuming", t.setTimeout(function() {
                                                    c.trigger("ended")
                                                }, 1)
                                            },
                                            adtimeout: function() {
                                                this.state = "content-resuming", t.setTimeout(function() {
                                                    c.trigger("ended")
                                                }, 1)
                                            },
                                            adserror: function() {
                                                this.state = "content-resuming", t.setTimeout(function() {
                                                    c.trigger("ended")
                                                }, 1)
                                            }
                                        }
                                    },
                                    "content-playback": {
                                        enter: function() {
                                            c.ads.cancelPlayTimeout && (t.clearTimeout(c.ads.cancelPlayTimeout), c.ads.cancelPlayTimeout = null), c.trigger({
                                                type: "contentplayback",
                                                triggerevent: c.ads.triggerevent
                                            })
                                        },
                                        events: {
                                            adsready: function() {
                                                c.trigger("readyforpreroll")
                                            },
                                            adstart: function() {
                                                this.state = "ad-playback"
                                            },
                                            contentupdate: function() {
                                                c.paused() ? this.state = "content-set" : this.state = "ads-ready?"
                                            },
                                            contentended: function() {
                                                this.state = "postroll?"
                                            }
                                        }
                                    }
                                };
                                ! function(t) {
                                    var r = function() {};
                                    ((o[t].events || {})[n.type] || r).apply(c.ads), t !== c.ads.state && (c.ads.triggerevent = n.type, (o[t].leave || r).apply(c.ads), (o[c.ads.state].enter || r).apply(c.ads), p.debug && e.log("ads", c.ads.triggerevent + " triggered: " + t + " -> " + c.ads.state))
                                }(c.ads.state)
                            }, c.on(o.concat(["adtimeout", "contentupdate", "contentplaying", "contentended", "contentresumed", "adsready", "adserror", "adscanceled", "adstart", "adend", "adskip"]), u), c.ads.contentSrc = c.currentSrc(),
                            function() {
                                var e = function() {
                                    var t;
                                    "ad-playback" !== c.ads.state && (t = c.currentSrc(), t !== c.ads.contentSrc && (c.trigger({
                                        type: "contentupdate",
                                        oldValue: c.ads.contentSrc,
                                        newValue: t
                                    }), c.ads.contentSrc = t))
                                };
                                c.on("loadstart", e), t.setTimeout(e, 1)
                            }(), c.paused() || u({
                                type: "play"
                            })
                    };
                e.plugin("ads", u)
            }(window, t)
        })
    }, {
        "video.js": 97
    }],
    99: [function(t, e, n) {
        function o(t) {
            "use strict";
            var e = function(t) {
                    var e, n, o;
                    for (n = 1; n < arguments.length; n++) {
                        e = arguments[n];
                        for (o in e) e.hasOwnProperty(o) && (t[o] = e[o])
                    }
                    return t
                },
                n = {
                    debug: !1,
                    timeout: 5e3,
                    prerollTimeout: 100
                },
                o = function(t, o) {
                    var r = this;
                    r.ima.createAdContainer_ = function() {
                        u = r.getChild("controlBar"), c = u.el().parentNode.appendChild(document.createElement("div")), c.id = "ima-ad-container", c.addEventListener("mouseover", r.ima.showAdControls_, !1), c.addEventListener("mouseout", r.ima.hideAdControls_, !1), r.ima.createControls_(), _ = new google.ima.AdDisplayContainer(c, s)
                    }, r.ima.createControls_ = function() {
                        p = document.createElement("div"), p.id = "ima-controls-div", p.style.width = "100%", f = document.createElement("div"), f.id = "ima-countdown-div", f.innerHTML = "Advertisement", f.style.display = a ? "block" : "none", d = document.createElement("div"), d.id = "ima-seek-bar-div", d.style.width = "100%", h = document.createElement("div"), h.id = "ima-progress-div", y = document.createElement("div"), y.id = "ima-play-pause-div", y.className = "ima-playing", y.addEventListener("click", r.ima.onAdPlayPauseClick_, !1), v = document.createElement("div"), v.id = "ima-mute-div", v.className = "ima-non-muted", v.addEventListener("click", r.ima.onAdMuteClick_, !1), g = document.createElement("div"), g.id = "ima-slider-div", g.addEventListener("mousedown", r.ima.onAdVolumeSliderMouseDown_, !1), m = document.createElement("div"), m.id = "ima-slider-level-div", b = document.createElement("div"), b.id = "ima-fullscreen-div", b.className = "ima-non-fullscreen", b.addEventListener("click", r.ima.onAdFullscreenClick_, !1), c.appendChild(p), p.appendChild(f), p.appendChild(d), p.appendChild(y), p.appendChild(v), p.appendChild(g), p.appendChild(b), d.appendChild(h), g.appendChild(m)
                    }, r.ima.initializeAdDisplayContainer = function() {
                        P = !0, _.initialize()
                    }, r.ima.requestAds = function() {
                        P || _.initialize();
                        var t = new google.ima.AdsRequest;
                        t.adTagUrl = i.adTagUrl, i.forceNonLinearFullSlot && (t.forceNonLinearFullSlot = !0), t.linearAdSlotWidth = r.ima.getPlayerWidth(), t.linearAdSlotHeight = r.ima.getPlayerHeight(), t.nonLinearAdSlotWidth = i.nonLinearWidth || r.ima.getPlayerWidth(), t.nonLinearAdSlotHeight = i.nonLinearHeight || r.ima.getPlayerHeight() / 3, j.requestAds(t)
                    }, r.ima.onAdsManagerLoaded_ = function(t) {
                        if (w = t.getAdsManager(B, x), w.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, r.ima.onAdError_), w.addEventListener(google.ima.AdEvent.Type.AD_BREAK_READY, r.ima.onAdBreakReady_), w.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, r.ima.onContentPauseRequested_), w.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, r.ima.onContentResumeRequested_), w.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, r.ima.onAllAdsCompleted_), w.addEventListener(google.ima.AdEvent.Type.LOADED, r.ima.onAdLoaded_), w.addEventListener(google.ima.AdEvent.Type.STARTED, r.ima.onAdStarted_), w.addEventListener(google.ima.AdEvent.Type.CLICK, r.ima.onAdPlayPauseClick_), w.addEventListener(google.ima.AdEvent.Type.COMPLETE, r.ima.onAdComplete_), w.addEventListener(google.ima.AdEvent.Type.SKIPPED, r.ima.onAdComplete_), !l) try {
                            var e = r.ima.getPlayerWidth(),
                                n = r.ima.getPlayerHeight();
                            H.width = e, H.height = n, w.init(e, n, google.ima.ViewMode.NORMAL), w.setVolume(r.muted() ? 0 : r.volume())
                        } catch (o) {
                            r.ima.onAdError_(o)
                        }
                        r.trigger("adsready")
                    }, r.ima.start = function() {
                        if (l) try {
                            w.init(r.ima.getPlayerWidth(), r.ima.getPlayerHeight(), google.ima.ViewMode.NORMAL), w.setVolume(r.muted() ? 0 : r.volume()), w.start()
                        } catch (t) {
                            r.ima.onAdError_(t)
                        }
                    }, r.ima.onAdsLoaderError_ = function(t) {
                        var e = t;
                        t.getError && (e = t.getError()), window.console.log("AdsLoader error: " + e), w && w.destroy(), r.trigger("adserror")
                    }, r.ima.onAdError_ = function(t) {
                        var e = t;
                        e.getError && (e = AdErrorEvent.getError()), window.console.log("Ad error: " + e), u.show(), w.destroy(), c.style.display = "none", r.trigger("adserror")
                    }, r.ima.onAdBreakReady_ = function(t) {
                        q(t)
                    }, r.ima.playAdBreak = function() {
                        l || w.start()
                    }, r.ima.onContentPauseRequested_ = function(t) {
                        A = !0, M = !0, r.off("ended", $), -1 != t.getAd().getAdPodInfo().getPodIndex() && r.ads.startLinearAdMode(), c.style.display = "block", p.style.display = "block", u.hide(), r.pause()
                    }, r.ima.onContentResumeRequested_ = function(t) {
                        if (A = !1, M = !1, r.on("ended", $), "none" !== c.style.display && (c.style.display = "none"), u.show(), O) I || -1 == O.getAdPodInfo().getPodIndex() || r.ads.endLinearAdMode();
                        else {
                            t.b.B;
                            r.ads.endLinearAdMode()
                        }
                        f.innerHTML = ""
                    }, r.ima.onAllAdsCompleted_ = function(t) {
                        if (D = !0, 1 == I)
                            for (var e in V) V[e]()
                    }, r.ima.onAdLoaded_ = function(t) {
                        t.getAd().isLinear() || r.play()
                    }, r.ima.onAdStarted_ = function(t) {
                        O = t.getAd(), O.isLinear() ? (T = setInterval(r.ima.onAdPlayheadTrackerInterval_, 250), c.className = "") : c.className = "bumpable-ima-ad-container"
                    }, r.ima.onAdComplete_ = function(t) {
                        O.isLinear() && clearInterval(T)
                    }, r.ima.onAdPlayheadTrackerInterval_ = function() {
                        var t = w.getRemainingTime(),
                            e = O.getDuration(),
                            n = e - t;
                        n = n > 0 ? n : 0;
                        var o, r, i = !1;
                        O.getAdPodInfo() && (i = !0, o = O.getAdPodInfo().getAdPosition(), r = O.getAdPodInfo().getTotalAds());
                        var s = Math.floor(t / 60),
                            a = Math.floor(t % 60);
                        a.toString().length < 2 && (a = "0" + a);
                        var l = ": ";
                        i && (l = " (" + o + " of " + r + "): "), f.innerHTML = "Advertisement" + l + s + ":" + a;
                        var u = n / e,
                            c = 100 * u;
                        h.style.width = c + "%"
                    }, r.ima.getPlayerWidth = function() {
                        var t = parseInt(getComputedStyle(r.el()).width, 10) || r.width();
                        return t
                    }, r.ima.getPlayerHeight = function() {
                        var t = parseInt(getComputedStyle(r.el()).height, 10) || r.height();
                        return t
                    }, r.ima.hideAdControls_ = function() {
                        y.style.display = "none", v.style.display = "none", b.style.display = "none", p.style.height = "14px"
                    }, r.ima.showAdControls_ = function() {
                        p.style.height = "37px", y.style.display = "block", v.style.display = "block", g.style.display = "block", b.style.display = "block"
                    }, r.ima.onAdPlayPauseClick_ = function() {
                        M ? (y.className = "ima-paused", w.pause(), M = !1) : (y.className = "ima-playing", w.resume(), M = !0)
                    }, r.ima.onAdMuteClick_ = function() {
                        L ? (v.className = "ima-non-muted", w.setVolume(1), r.muted(!1), L = !1, m.style.width = 100 * r.volume() + "%") : (v.className = "ima-muted", w.setVolume(0), r.muted(!0), L = !0, m.style.width = "0%")
                    }, r.ima.onAdVolumeSliderMouseDown_ = function() {
                        document.addEventListener("mouseup", r.ima.onMouseUp_, !1), document.addEventListener("mousemove", r.ima.onMouseMove_, !1)
                    }, r.ima.onMouseMove_ = function(t) {
                        r.ima.setVolumeSlider_(t)
                    }, r.ima.onMouseUp_ = function(t) {
                        r.ima.setVolumeSlider_(t), document.removeEventListener("mousemove", r.ima.onMouseMove_), document.removeEventListener("mouseup", r.ima.onMouseUp_)
                    }, r.ima.setVolumeSlider_ = function(t) {
                        var e = (t.clientX - g.getBoundingClientRect().left) / g.offsetWidth;
                        e *= 100, e = Math.min(Math.max(e, 0), 100), m.style.width = e + "%", r.volume(e / 100), w.setVolume(e / 100), 0 == r.volume() ? (v.className = "ima-muted", r.muted(!0), L = !0) : (v.className = "ima-non-muted", r.muted(!1), L = !1)
                    }, r.ima.onAdFullscreenClick_ = function() {
                        r.isFullscreen() ? r.exitFullscreen() : r.requestFullscreen()
                    }, r.ima.onFullscreenChange_ = function() {
                        r.isFullscreen() ? (b.className = "ima-fullscreen", w && w.resize(window.screen.width, window.screen.height, google.ima.ViewMode.FULLSCREEN)) : (b.className = "ima-non-fullscreen", w && w.resize(r.ima.getPlayerWidth(), r.ima.getPlayerHeight(), google.ima.ViewMode.NORMAL))
                    }, r.ima.onVolumeChange_ = function() {
                        var t = r.muted() ? 0 : r.volume();
                        w && w.setVolume(t), 0 == t ? (L = !0, v.className = "ima-muted", m.style.width = "0%") : (L = !1, v.className = "ima-non-muted", m.style.width = 100 * t + "%")
                    }, r.ima.seekContentToZero_ = function() {
                        r.off("loadedmetadata", r.ima.seekContentToZero_), r.currentTime(0)
                    }, r.ima.playContentFromZero_ = function() {
                        r.off("loadedmetadata", r.ima.playContentFromZero_), r.currentTime(0), r.play()
                    }, r.ima.resetIMA_ = function() {
                        A = !1, M = !1, r.on("ended", $), O && O.isLinear() && (c.style.display = "none"), u.show(), r.ads.endLinearAdMode(), T && clearInterval(T), w && (w.destroy(), w = null), j && !I && j.contentComplete(), I = !1, D = !1
                    }, r.ima.addEventListener = function(t, e) {
                        w && w.addEventListener(t, e)
                    }, r.ima.getAdsManager = function() {
                        return w
                    }, r.ima.getAdsLoader = function() {
                        return j
                    }, r.ima.setContent = function(t, e, n) {
                        r.ima.resetIMA_(), i.adTagUrl = e ? e : i.adTagUrl, r.currentSrc() && (r.currentTime(0), r.pause()), t && r.src(t), n ? r.on("loadedmetadata", r.ima.playContentFromZero_) : r.on("loadedmetadata", r.ima.seekContentToZero_)
                    }, r.ima.addContentEndedListener = function(t) {
                        U.push(t)
                    }, r.ima.addContentAndAdsEndedListener = function(t) {
                        V.push(t)
                    }, r.ima.setAdBreakReadyListener = function(t) {
                        q = t
                    }, r.ima.pauseAd = function() {
                        A && M && (y.className = "ima-paused", w.pause(), M = !1)
                    }, r.ima.resumeAd = function() {
                        A && !M && (y.className = "ima-playing", w.resume(), M = !0)
                    }, r.ima.setUpPlayerIntervals_ = function() {
                        E = setInterval(r.ima.updateCurrentTime_, R), C = setInterval(r.ima.checkForSeeking_, R), k = setInterval(r.ima.checkForResize_, N)
                    }, r.ima.updateCurrentTime_ = function() {
                        B.seeking || (B.currentTime = r.currentTime())
                    }, r.ima.checkForSeeking_ = function() {
                        var t = r.currentTime(),
                            e = 1e3 * (t - B.previousTime);
                        Math.abs(e) > R + F ? B.seeking = !0 : B.seeking = !1, B.previousTime = r.currentTime()
                    }, r.ima.checkForResize_ = function() {
                        var t = r.ima.getPlayerWidth(),
                            e = r.ima.getPlayerHeight();
                        !w || t == H.width && e == H.height || (H.width = t, H.height = e, w.resize(t, e, google.ima.ViewMode.NORMAL))
                    }, r.ima.setShowCountdown = function(t) {
                        a = t, f.style.display = a ? "block" : "none"
                    };
                    var i, s, a, l, u, c, p, f, d, h, y, v, g, m, b, _, j, w, O, T, E, C, k, S = "0.2.0",
                        P = !1,
                        x = null,
                        A = !1,
                        M = !1,
                        L = !1,
                        I = !1,
                        D = !1,
                        R = 1e3,
                        N = 250,
                        F = 100,
                        B = {
                            currentTime: 0,
                            previousTime: 0,
                            seeking: !1,
                            duration: 0
                        },
                        H = {
                            width: 0,
                            height: 0
                        },
                        U = [],
                        V = [],
                        q = void 0,
                        $ = function() {
                            j && !I && (j.contentComplete(), I = !0);
                            for (var t in U) U[t]();
                            if (D)
                                for (var t in V) V[t]();
                            clearInterval(E), clearInterval(C), clearInterval(k), r.one("play", r.ima.setUpPlayerIntervals_)
                        };
                    if (i = e({}, n, t || {}), !i.id) return void window.console.log("Error: must provide id of video.js div");
                    s = document.getElementById(i.id + "_html5_api"), a = !0, 0 == i.showCountdown && (a = !1), l = !0, 0 == i.autoPlayAdBreaks && (l = !1), r.one("play", r.ima.setUpPlayerIntervals_), r.on("ended", $);
                    var W = {
                            debug: i.debug,
                            timeout: i.timeout,
                            prerollTimeout: i.prerollTimeout
                        },
                        G = e({}, W, t.contribAdsSettings || {});
                    if (r.ads(G), x = new google.ima.AdsRenderingSettings, x.restoreCustomPlaybackStateOnAdBreakComplete = !0, i.adsRenderingSettings)
                        for (var z in i.adsRenderingSettings) x[z] = i.adsRenderingSettings[z];
                    i.locale && google.ima.settings.setLocale(i.locale), r.ima.createAdContainer_(), j = new google.ima.AdsLoader(_), j.getSettings().setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED), 0 == i.vpaidAllowed && j.getSettings().setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.DISABLED), i.vpaidMode && j.getSettings().setVpaidMode(i.vpaidMode), i.locale && j.getSettings().setLocale(i.locale), i.numRedirects && j.getSettings().setNumRedirects(i.numRedirects), j.getSettings().setPlayerType("videojs-ima"), j.getSettings().setPlayerVersion(S), j.getSettings().setAutoPlayAdBreaks(l), j.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, r.ima.onAdsManagerLoaded_, !1), j.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, r.ima.onAdsLoaderError_, !1), o || (o = r.ima.start), r.on("readyforpreroll", o), r.ready(function() {
                        r.on("fullscreenchange", r.ima.onFullscreenChange_), r.on("volumechange", r.ima.onVolumeChange_)
                    })
                };
            t.plugin("ima", o)
        }
        "undefined" != typeof videojs && o(window.videojs), "undefined" != typeof e && (e.exports = o)
    }, {}]
}, {}, [46]);