var vikiFlashDetect = new function() {
    var r = this;
    r.installed = !1, r.raw = "", r.major = -1, r.minor = -1, r.revision = -1, r.revisionStr = "";
    var n = [{
            name: "ShockwaveFlash.ShockwaveFlash.7",
            version: function(r) {
                return e(r)
            }
        }, {
            name: "ShockwaveFlash.ShockwaveFlash.6",
            version: function(r) {
                var i = "6,0,21";
                try {
                    r.AllowScriptAccess = "always", i = e(r)
                } catch (n) {}
                return i
            }
        }, {
            name: "ShockwaveFlash.ShockwaveFlash",
            version: function(r) {
                return e(r)
            }
        }],
        e = function(r) {
            var i = -1;
            try {
                i = r.GetVariable("$version")
            } catch (n) {}
            return i
        },
        a = function(r) {
            var i = -1;
            try {
                i = new ActiveXObject(r)
            } catch (n) {
                i = {
                    activeXError: !0
                }
            }
            return i
        },
        t = function(r) {
            var i = r.split(",");
            return {
                raw: r,
                major: parseInt(i[0].split(" ")[1], 10),
                minor: parseInt(i[1], 10),
                revision: parseInt(i[2], 10),
                revisionStr: i[2]
            }
        },
        o = function(r) {
            var i = r.split(/ +/),
                n = i[2].split(/\./),
                e = i[3];
            return {
                raw: r,
                major: parseInt(n[0], 10),
                minor: parseInt(n[1], 10),
                revisionStr: e,
                revision: s(e)
            }
        },
        s = function(i) {
            return parseInt(i.replace(/[a-zA-Z]/g, ""), 10) || r.revision
        };
    r.majorAtLeast = function(i) {
        return r.major >= i
    }, r.minorAtLeast = function(i) {
        return r.minor >= i
    }, r.revisionAtLeast = function(i) {
        return r.revision >= i
    }, r.versionAtLeast = function() {
        var n = [r.major, r.minor, r.revision],
            e = Math.min(n.length, arguments.length);
        for (i = 0; i < e; i++) {
            if (n[i] >= arguments[i]) {
                if (i + 1 < e && n[i] == arguments[i]) continue;
                return !0
            }
            return !1
        }
    }, r.vikiFlashDetect = function() {
        if (navigator.plugins && navigator.plugins.length > 0) {
            var i = "application/x-shockwave-flash",
                e = navigator.mimeTypes;
            if (e && e[i] && e[i].enabledPlugin && e[i].enabledPlugin.description) {
                var s = e[i].enabledPlugin.description,
                    v = o(s);
                r.raw = v.raw, r.major = v.major, r.minor = v.minor, r.revisionStr = v.revisionStr, r.revision = v.revision, r.installed = !0
            }
        } else if (-1 == navigator.appVersion.indexOf("Mac") && window.execScript)
            for (var s = -1, c = 0; c < n.length && -1 == s; c++) {
                var l = a(n[c].name);
                if (!l.activeXError && (r.installed = !0, s = n[c].version(l), -1 != s)) {
                    var v = t(s);
                    r.raw = v.raw, r.major = v.major, r.minor = v.minor, r.revision = v.revision, r.revisionStr = v.revisionStr
                }
            }
    }()
};
vikiFlashDetect.JS_RELEASE = "1.0.4";