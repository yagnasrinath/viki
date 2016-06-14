! function(e, r, n) {
    function t(e) {
        return e
    }

    function o(e) {
        return decodeURIComponent(e.replace(i, " "))
    }
    var i = /\+/g,
        a = e.cookie = function(i, s, u) {
            if (s !== n) {
                if (u = e.extend({}, a.defaults, u), null === s && (u.expires = -1), "number" == typeof u.expires) {
                    var c = u.expires,
                        l = u.expires = new Date;
                    l.setDate(l.getDate() + c)
                }
                return s = a.json ? JSON.stringify(s) : String(s), r.cookie = [encodeURIComponent(i), "=", a.raw ? s : encodeURIComponent(s), u.expires ? "; expires=" + u.expires.toUTCString() : "", u.path ? "; path=" + u.path : "", u.domain ? "; domain=" + u.domain : "", u.secure ? "; secure" : ""].join("")
            }
            for (var d = a.raw ? t : o, f = r.cookie.split("; "), g = 0, p = f.length; p > g; g++) {
                var m = f[g].split("=");
                if (d(m.shift()) === i) {
                    var h = d(m.join("="));
                    return a.json ? JSON.parse(h) : h
                }
            }
            return null
        };
    a.defaults = {}, e.removeCookie = function(r, n) {
        return null !== e.cookie(r) ? (e.cookie(r, null, n), !0) : !1
    }
}(jQuery, document),
function() {
    raynor.utility = {
        delay: function(e, r) {
            return setTimeout(r, e)
        },
        interval: function(e, r) {
            return setInterval(r, e)
        },
        redirectTo: function(e) {
            return document.location.href = e
        },
        cookiePath: "/",
        cookieDomain: "." + window.vikiCookieDomain,
        phPosterSmall: "//1.viki.io/a/ph/poster_small-ba4e85ad3dfd1ff5bbc65b366243c81d.png",
        phPosterRegular: "//1.viki.io/a/ph/poster_regular-94a47ab8a010de5d7acbd2cbbbddc7d3.png",
        protocol: window.location.protocol,
        setCookie: function(e, r, n) {
            return $.cookie(e, r, {
                path: raynor.utility.cookiePath,
                domain: raynor.utility.cookieDomain,
                expires: "session" === n ? null : n || 731
            })
        },
        removeCookie: function(e) {
            return this.setCookie(e, null)
        },
        getReferer: function() {
            return document.referrer
        },
        getUrlParts: function(e) {
            var r;
            return r = document.createElement("a"), r.href = e, {
                host: r.hostname,
                path: r.pathname,
                search: r.search
            }
        },
        scriptType: "get",
        scriptDataType: "script",
        getScript: function(e, r) {
            return $.ajax({
                type: raynor.utility.scriptType,
                url: e,
                success: r,
                dataType: raynor.utility.scriptDataType,
                cache: !0
            })
        },
        hashSize: function(e) {
            var r, n;
            n = 0;
            for (r in e) e.hasOwnProperty(r) && n++;
            return n
        },
        keyPress: function(e) {
            return $(document).keyup(function() {
                return function(r) {
                    return e(raynor.utility.codeForKeyEvent(r))
                }
            }(this))
        },
        codeForKeyEvent: function(e) {
            return e.keyCode ? e.keyCode : e.which
        },
        escape: function(e) {
            return raynor.utility.keyPress(function(r) {
                return 27 === r ? e() : void 0
            })
        },
        clickOutside: function(e, r) {
            return $(document).mouseup(function() {
                return function(n) {
                    return 0 === e.has(n.target).length && r(), !0
                }
            }(this))
        },
        randomInt: function(e, r) {
            var n, t, o;
            return null == r && (r = 0), n = Math.random(), null == e && (t = [0, e], e = t[0], r = t[1]), e > r && (o = [r, e], e = o[0], r = o[1]), Math.floor(n * (r - e + 1) + e)
        },
        isSignInPage: function() {
            return "sessions_new" === raynor.session.getCurrentPage()
        },
        isSignUpPage: function() {
            return "users_new" === raynor.session.getCurrentPage()
        },
        isForgetPasswordPage: function() {
            return "sessions_forgot_password" === raynor.session.getCurrentPage()
        },
        isPasswordResetPage: function() {
            return "sessions_reset_password" === raynor.session.getCurrentPage()
        },
        isVideoPage: function() {
            return "videos_show" === raynor.session.getCurrentPage()
        },
        isSearchPage: function() {
            return "search_index" === raynor.session.getCurrentPage()
        },
        isPlanIndexPage: function() {
            return "plans_index" === raynor.session.getCurrentPage()
        },
        isCommunityPage: function() {
            return "community_landing_index" === raynor.session.getCurrentPage()
        },
        isBillingsPage: function() {
            return "billings_index" === raynor.session.getCurrentPage() || "billings_show" === raynor.session.getCurrentPage()
        },
        isPlansShowPage: function() {
            return "plans_show" === raynor.session.getCurrentPage() || "plans_create" === raynor.session.getCurrentPage()
        },
        isGiftCardCheckoutPage: function() {
            return "gift_cards_checkout" === raynor.session.getCurrentPage() || "gift_cards_pay" === raynor.session.getCurrentPage()
        },
        isGiftCardIndexPage: function() {
            return "gift_cards_index" === raynor.session.getCurrentPage()
        },
        strReplace: function(e, r, n) {
            return -1 !== e.indexOf("#") && (e = e.substr(0, e.indexOf("#"))), e.replace(r, n)
        },
        userAgent: function() {
            return navigator.userAgent
        },
        detectUserAgent: function() {
            var e, r;
            return r = this.userAgent().toString(), e = {
                iOS: function() {
                    return r.match(/iPhone|iPad|iPod/i)
                },
                iOS_Safari: function() {
                    return r.match(r.match(/Safari/))
                },
                Android: function() {
                    return r.match(/Android/i)
                },
                Windows: function() {
                    return r.match(/IEMobile/i)
                },
                FireFox_OS: function() {
                    return r.match(/Mozilla\/5.0 \(Mobile;/) || r.match(/Mozilla\/5.0 \(Tablet;/)
                }
            }
        },
        getBrowser: function() {
            var e, r, n;
            return n = navigator.userAgent, r = void 0, e = n.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [], /trident/i.test(e[1]) ? (r = /\brv[ :]+(\d+)/g.exec(n) || [], "IE " + (r[1] || "")) : "Chrome" === e[1] && (r = n.match(/\bOPR\/(\d+)/), null != r) ? "Opera " + r[1] : (e = e[2] ? [e[1], e[2]] : [navigator.appName, navigator.appVersion, "-?"], null != (r = n.match(/version\/(\d+)/i)) && e.splice(1, 1, r[1]), e[0])
        },
        getBrowserVersion: function() {
            var e, r, n;
            return n = navigator.userAgent, r = void 0, e = n.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [], /trident/i.test(e[1]) ? (r = /\brv[ :]+(\d+)/g.exec(n) || [], "IE " + (r[1] || "")) : "Chrome" === e[1] && (r = n.match(/\bOPR\/(\d+)/), null != r) ? "Opera " + r[1] : (e = e[2] ? [e[1], e[2]] : [navigator.appName, navigator.appVersion, "-?"], null != (r = n.match(/version\/(\d+)/i)) && e.splice(1, 1, r[1]), e[1])
        },
        domain: function() {
            return document.domain
        },
        byteUnits: ["B", "KB", "MB", "GB"],
        formatBytes: function(e) {
            var r, n, t;
            for (r = raynor.utility.byteUnits, n = r.length, t = 0; e >= 1024 && n > t;) e /= 1024, t++;
            return e.toFixed() + " " + r[t]
        },
        truncate: function(e, r) {
            var n;
            return n = e.length, r || (r = 30), r >= n ? e : (e = e.slice(0, r - 1), e + "\u2026")
        },
        generateUuid: function() {
            var e, r, n, t, o, i, a, s, u;
            for (i = [], i[0] = 4294967296 * Math.random(), i[1] = 4294967296 * Math.random(), i[2] = 4294967296 * Math.random(), i[3] = 4294967296 * Math.random(), o = 0, e = [], e[o++] = 255 & i[0], e[o++] = i[0] >>> 8 & 255, e[o++] = i[0] >>> 16 & 255, e[o++] = i[0] >>> 24 & 255, e[o++] = 255 & i[1], e[o++] = i[1] >>> 8 & 255, e[o++] = i[1] >>> 16 & 15 | 64, e[o++] = i[1] >>> 24 & 255, e[o++] = 63 & i[2] | 128, e[o++] = i[2] >>> 8 & 255, e[o++] = i[2] >>> 16 & 255, e[o++] = i[2] >>> 24 & 255, e[o++] = 255 & i[3], e[o++] = i[3] >>> 8 & 255, e[o++] = i[3] >>> 16 & 255, e[o++] = i[3] >>> 24 & 255, a = function() {
                    var n, t, o;
                    for (o = [], n = 0, t = e.length; t > n; n++) r = e[n], o.push((r + 256).toString(16).substr(1));
                    return o
                }().join(""), t = [8, 13, 18, 23], s = 0, u = t.length; u > s; s++) n = t[s], a = "" + a.slice(0, n) + "-" + a.slice(n);
            return a
        },
        genUrlParams: function(e, r) {
            var n, t, o, i, a, s;
            for (null == r && (r = ""), e = "?" === e[0] ? e.slice(1) : e, o = {}, s = e.split("&"), i = 0, a = s.length; a > i; i++) t = s[i], n = t.split("="), n[0] && (o["" + r + n[0]] = n[1] || "");
            return o
        },
        getQueryValue: function(e) {
            return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(e).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"))
        },
        getHashOfQueryValue: function() {
            var e, r, n, t, o;
            for (r = {}, t = 0, o = arguments.length; o > t; t++) e = arguments[t], n = decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(e).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1")), r[e] = n;
            return r
        },
        hasTransform: function() {
            var e, r, n, t;
            e = document.createElement("p"), r = void 0, t = {
                webkitTransform: "-webkit-transform",
                OTransform: "-o-transform",
                msTransform: "-ms-transform",
                MozTransform: "-moz-transform",
                transform: "transform"
            }, document.body.insertBefore(e, null);
            for (n in t) void 0 !== e.style[n] && (e.style[n] = "translateX(1px)", r = window.getComputedStyle(e).getPropertyValue(t[n]));
            return document.body.removeChild(e), void 0 !== r && r.length > 0 && "none" !== r
        },
        supportCors: function() {
            return "withCredentials" in new XMLHttpRequest
        },
        getUserStatus: function() {
            return raynor.session.signed_in ? raynor.session.ps ? "vikipass_user" : "registered_user" : "anonymous user"
        },
        sanitize: function(e) {
            var r;
            return r = e.replace(/<script[^>]*?>.*?<\/script>/gi, "").replace(/<[\/\!]*?[^<>]*?>/gi, "").replace(/<style[^>]*?>.*?<\/style>/gi, "").replace(/<![\s\S]*?--[ \t\n\r]*>/gi, "")
        }
    }
}.call(this);