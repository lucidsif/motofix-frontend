webpackJsonp([5],{"./app/components/H1/index.js":function(e,n,t){"use strict";function o(e,n){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}var r=t("./node_modules/styled-components/lib/index.js"),a=t.n(r),s=o(["\n  font-size: 2em;\n  margin-bottom: 0.25em;\n"],["\n  font-size: 2em;\n  margin-bottom: 0.25em;\n"]),i=a.a.h1(s);n.a=i},"./app/containers/NotFoundPage/index.js":function(e,n,t){"use strict";function o(){return l("article",{},void 0,l(d.a,{},void 0,a.a.createElement(i.FormattedMessage,s.a.header)))}var r=t("./node_modules/react/react.js"),a=t.n(r),s=t("./app/containers/NotFoundPage/messages.js"),i=t("./node_modules/react-intl/lib/index.js"),d=(t.n(i),t("./app/components/H1/index.js"));n.default=o;var l=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(n,t,o,r){var a=n&&n.defaultProps,s=arguments.length-3;if(t||0===s||(t={}),t&&a)for(var i in a)void 0===t[i]&&(t[i]=a[i]);else t||(t=a||{});if(1===s)t.children=r;else if(s>1){for(var d=Array(s),l=0;l<s;l++)d[l]=arguments[l+3];t.children=d}return{$$typeof:e,type:n,key:void 0===o?null:""+o,ref:null,props:t,_owner:null}}}()},"./app/containers/NotFoundPage/messages.js":function(e,n,t){"use strict";var o=t("./node_modules/react-intl/lib/index.js");t.n(o);n.a=t.i(o.defineMessages)({header:{id:"boilerplate.containers.NotFoundPage.header",defaultMessage:"Hi there! No page exists here :("}})}});