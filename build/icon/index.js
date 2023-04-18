import { defineComponent as h, toRefs as g, computed as z, createVNode as m, mergeProps as p } from "vue";
const y = {
  name: {
    // icon-vue中的vue
    type: String,
    default: ""
  },
  prefix: {
    // 前缀
    type: String,
    default: "icon"
  },
  size: {
    // type: String || Number, --- 错误用法,认为是 String
    // type: [String, Number], --- ts报错
    type: [String, Number],
    default: "inherit"
  },
  color: {
    type: String,
    default: "inherit"
  },
  element: {
    type: String,
    default: null
  }
};
window._iconfont_svg_string_3961810 = '<svg><symbol id="icon-vue" viewBox="0 0 1024 1024"><path d="M615.6 123.6h165.5L512 589.7 242.9 123.6H63.5L512 900.4l448.5-776.9z" fill="#41B883" ></path><path d="M781.1 123.6H615.6L512 303 408.4 123.6H242.9L512 589.7z" fill="#34495E" ></path></symbol><symbol id="icon-react" viewBox="0 0 1024 1024"><path d="M512 511.8m-80 0a80 80 0 1 0 160 0 80 80 0 1 0-160 0Z" fill="#61DAFB" ></path><path d="M960.5 511.8c0-62.8-73.8-117.2-188.5-150.1 28.9-115.8 18.7-206.9-35.7-238.3-54.5-31.4-138.5 5.3-224.3 88.2-85.8-82.9-169.8-119.6-224.3-88.2-54.4 31.4-64.6 122.6-35.7 238.3C137.3 394.6 63.5 449 63.5 511.8S137.3 629 252 661.9c-28.9 115.7-18.7 206.9 35.7 238.3 13.4 7.8 28.6 11.6 45.2 11.6 39.7 0 87.8-21.8 140-64.2 13-10.6 26.1-22.6 39.1-35.2 13 12.6 26.1 24.6 39.1 35.2 52.2 42.4 100.2 64.2 140 64.2 16.6 0 31.8-3.8 45.2-11.6 54.4-31.4 64.6-122.5 35.7-238.3 114.7-32.9 188.5-87.3 188.5-150.1zM716.8 157.2c35.3 20.4 42.7 94.3 17.6 194.8-36.7-8.4-76.7-14.7-119.3-18.6-24.7-34.9-50.2-66.4-75.8-94 59.2-57.3 114.2-88.4 152-88.4 9.6-0.1 18.2 2 25.5 6.2zM637 584c-13.8 24-28.4 47-43.3 69-26.1 2-53.3 3.1-81.7 3.1-28.3 0-55.5-1.1-81.6-3.1-15-22-29.5-45.1-43.3-69-14.1-24.5-26.7-48.6-38.1-72.2 11.4-23.6 24-47.7 38.1-72.2 14.1-24.5 28.7-47.4 43.4-69.1 26.1-2 53.3-3.1 81.6-3.1 28.3 0 55.5 1.1 81.6 3.1 14.7 21.6 29.3 44.6 43.4 69 14.1 24.5 26.7 48.6 38.1 72.2-11.5 23.7-24.1 47.8-38.2 72.3z m58.8-26.4c11.2 26.6 20.4 52.1 28 76.5-24.9 5.6-51.7 10.4-80.3 14 9.3-14.5 18.4-29.3 27.3-44.6 8.8-15.4 17.1-30.7 25-45.9zM512 756.5c-17.7-19.2-35.1-40.1-52.2-62.6 17.1 0.8 34.5 1.3 52.2 1.3 17.7 0 35.1-0.5 52.2-1.3-17.1 22.5-34.5 43.4-52.2 62.6zM380.5 648.1c-28.6-3.6-55.3-8.4-80.3-14 7.6-24.4 16.8-49.9 28-76.5 7.9 15.2 16.1 30.5 25 45.9 8.9 15.2 18 30 27.3 44.6zM328.2 466c-11.2-26.6-20.4-52.1-28-76.5 24.9-5.6 51.6-10.4 80.2-14-9.2 14.4-18.4 29.2-27.2 44.6-8.8 15.4-17.1 30.7-25 45.9zM512 267.1c17.3 18.7 34.8 39.8 52.1 62.7-17.1-0.8-34.4-1.3-52.1-1.3-17.7 0-35 0.5-52.1 1.3 17.3-22.9 34.8-44 52.1-62.7z m158.7 153c-8.9-15.3-18-30.1-27.2-44.6 28.6 3.6 55.3 8.4 80.2 14-7.6 24.4-16.8 49.9-28 76.5-7.8-15.2-16.1-30.5-25-45.9zM307.2 157.2c7.2-4.2 15.8-6.2 25.6-6.2 37.8 0 92.7 31.1 151.9 88.4-25.6 27.6-51.1 59.2-75.8 94-42.5 3.9-82.6 10.2-119.3 18.6-25.1-100.6-17.6-174.5 17.6-194.8zM102.5 511.8c0-40.8 60.3-84.2 160-112.6 11.1 36 25.6 73.8 43.5 112.6-17.8 38.8-32.4 76.6-43.5 112.6-99.7-28.4-160-71.9-160-112.6z m345.8 305.5c-59.7 48.5-111.1 66.4-141.1 49.2-35.3-20.4-42.7-94.3-17.6-194.8 36.7 8.4 76.7 14.7 119.3 18.6 24.4 34.5 49.9 66.1 75.8 94.2-12.1 11.7-24.2 22.9-36.4 32.8z m268.5 49.2c-29.9 17.3-81.4-0.6-141.1-49.2-12.1-9.9-24.3-21.1-36.5-32.8 26-28.1 51.4-59.7 75.8-94.2 42.5-3.9 82.6-10.2 119.3-18.7 25.2 100.6 17.7 174.5-17.5 194.9z m44.8-242.1c-11.1-36-25.6-73.8-43.5-112.6 17.8-38.8 32.4-76.6 43.5-112.6 99.7 28.5 160 71.9 160 112.6-0.1 40.7-60.4 84.2-160 112.6z" fill="#61DAFB" ></path></symbol><symbol id="icon-webpack" viewBox="0 0 1024 1024"><path d="M826.709333 682.154667l-328.874666 189.866666-328.917334-189.866666v-379.733334l328.917334-189.909333 328.874666 189.866667z" fill="#FFFFFF" fill-opacity=".785" ></path><path d="M524.202667 84.48c-8.96 0-17.493333 2.517333-24.32 7.637333l-337.066667 189.44c-13.653333 7.253333-22.613333 21.333333-22.613333 37.546667v384c0 16.213333 8.96 30.336 22.613333 37.589333l337.066667 189.44c6.826667 5.12 15.36 7.68 24.32 7.68s17.493333-2.56 24.32-7.68l337.066666-189.44c13.653333-7.253333 22.613333-21.333333 22.613334-37.546666v-384c0-16.213333-8.96-30.378667-22.613334-37.632l-337.066666-189.44a40.32 40.32 0 0 0-24.32-7.637334z m0 91.733333l298.666666 168.106667v89.728h-0.682666v220.885333h0.682666v23.04l-298.666666 168.064-298.666667-168.106666V344.32l298.666667-168.106667z m0 88.746667l-209.066667 120.746667 209.066667 120.746666 209.066666-120.746666-209.066666-120.746667z m-213.333334 216.746667v152.746666l170.666667 98.517334v-152.746667l-170.666667-98.56z m426.666667 0l-170.666667 98.474666v152.746667l170.666667-98.474667v-152.746666z" fill="#8ED6FB" ></path><path d="M524.202667 264.96l-209.066667 120.746667 209.066667 120.746666 209.066666-120.746666-209.066666-120.746667z m-213.333334 216.746667v152.746666l170.666667 98.517334v-152.746667l-170.666667-98.56z m426.666667 0l-170.666667 98.474666v152.746667l170.666667-98.474667v-152.746666z" fill="#1C78C0" ></path></symbol></svg>', function(e) {
  var n = (n = document.getElementsByTagName("script"))[n.length - 1], u = n.getAttribute("data-injectcss"), n = n.getAttribute("data-disable-injectsvg");
  if (!n) {
    var o, c, a, i, s, v = function(l, t) {
      t.parentNode.insertBefore(l, t);
    };
    if (u && !e.__iconfont__svg__cssinject__) {
      e.__iconfont__svg__cssinject__ = !0;
      try {
        document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
      } catch (l) {
        console && console.log(l);
      }
    }
    o = function() {
      var l, t = document.createElement("div");
      t.innerHTML = e._iconfont_svg_string_3961810, (t = t.getElementsByTagName("svg")[0]) && (t.setAttribute("aria-hidden", "true"), t.style.position = "absolute", t.style.width = 0, t.style.height = 0, t.style.overflow = "hidden", t = t, (l = document.body).firstChild ? v(t, l.firstChild) : l.appendChild(t));
    }, document.addEventListener ? ~["complete", "loaded", "interactive"].indexOf(document.readyState) ? setTimeout(o, 0) : (c = function() {
      document.removeEventListener("DOMContentLoaded", c, !1), o();
    }, document.addEventListener("DOMContentLoaded", c, !1)) : document.attachEvent && (a = o, i = e.document, s = !1, r(), i.onreadystatechange = function() {
      i.readyState == "complete" && (i.onreadystatechange = null, d());
    });
  }
  function d() {
    s || (s = !0, a());
  }
  function r() {
    try {
      i.documentElement.doScroll("left");
    } catch {
      return void setTimeout(r, 50);
    }
    d();
  }
}(window);
const f = h({
  name: "GIcon",
  props: y,
  setup(e, {
    attrs: u
  }) {
    const {
      prefix: n,
      name: o,
      color: c,
      element: a
    } = g(e), i = z(() => {
      if (typeof e.size == "string" && e.size !== "inherit") {
        if (!e.size.endsWith("px"))
          return e.size + "px";
      } else if (typeof e.size == "number")
        return e.size + "px";
      return e.size;
    }), s = m("svg", {
      class: "icon",
      style: {
        width: i.value,
        height: i.value
      }
    }, [m("use", {
      "xlink:href": `#${n.value}-${a.value}`,
      fill: c.value
    }, null)]), v = m("img", p({
      src: e.name,
      style: {
        width: i.value,
        height: "auto",
        objectFit: "contain",
        verticalAlign: "middle"
      }
    }, u), null), d = m("span", {
      class: [n.value + "font", n.value + "-" + o.value],
      style: {
        fontSize: i.value,
        color: c.value
      }
    }, null), r = /http|https/.test(o.value) ? v : d;
    return () => a.value ? s : r;
  }
}), M = {
  install(e) {
    e.component(f.name, f);
  }
};
export {
  f as Icon,
  M as default
};
