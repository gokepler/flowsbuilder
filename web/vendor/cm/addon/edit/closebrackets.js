!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){function t(e,t){return"pairs"==t&&"string"==typeof e?e:"object"==typeof e&&null!=e[t]?e[t]:h[t]}function n(e){var t=e.state.closeBrackets;return!t||t.override?t:e.getModeAt(e.getCursor()).closeBrackets||t}function r(r){var i=n(r);if(!i||r.getOption("disableInput"))return e.Pass;for(var a=t(i,"pairs"),o=r.listSelections(),s=0;s<o.length;s++){if(!o[s].empty())return e.Pass;var l=c(r,o[s].head);if(!l||a.indexOf(l)%2!=0)return e.Pass}for(var s=o.length-1;s>=0;s--){var f=o[s].head;r.replaceRange("",u(f.line,f.ch-1),u(f.line,f.ch+1),"+delete")}}function i(r){var i=n(r),a=i&&t(i,"explode");if(!a||r.getOption("disableInput"))return e.Pass;for(var o=r.listSelections(),s=0;s<o.length;s++){if(!o[s].empty())return e.Pass;var l=c(r,o[s].head);if(!l||a.indexOf(l)%2!=0)return e.Pass}r.operation(function(){r.replaceSelection("\n\n",null),r.execCommand("goCharLeft"),o=r.listSelections();for(var e=0;e<o.length;e++){var t=o[e].head.line;r.indentLine(t,null,!0),r.indentLine(t+1,null,!0)}})}function a(t){var n=e.cmpPos(t.anchor,t.head)>0;return{anchor:new u(t.anchor.line,t.anchor.ch+(n?-1:1)),head:new u(t.head.line,t.head.ch+(n?1:-1))}}function o(r,i){var o=n(r);if(!o||r.getOption("disableInput"))return e.Pass;var c=t(o,"pairs"),h=c.indexOf(i);if(-1==h)return e.Pass;for(var d,g=t(o,"triples"),p=c.charAt(h+1)==i,v=r.listSelections(),m=h%2==0,b=0;b<v.length;b++){var x,C=v[b],k=C.head,P=r.getRange(k,u(k.line,k.ch+1));if(m&&!C.empty())x="surround";else if(!p&&m||P!=i)if(p&&k.ch>1&&g.indexOf(i)>=0&&r.getRange(u(k.line,k.ch-2),k)==i+i&&(k.ch<=2||r.getRange(u(k.line,k.ch-3),u(k.line,k.ch-2))!=i))x="addFour";else if(p){if(e.isWordChar(P)||!l(r,k,i))return e.Pass;x="both"}else{if(!m||r.getLine(k.line).length!=k.ch&&!s(P,c)&&!/\s/.test(P))return e.Pass;x="both"}else x=p&&f(r,k)?"both":g.indexOf(i)>=0&&r.getRange(k,u(k.line,k.ch+3))==i+i+i?"skipThree":"skip";if(d){if(d!=x)return e.Pass}else d=x}var S=h%2?c.charAt(h-1):i,y=h%2?i:c.charAt(h+1);r.operation(function(){if("skip"==d)r.execCommand("goCharRight");else if("skipThree"==d)for(var e=0;e<3;e++)r.execCommand("goCharRight");else if("surround"==d){for(var t=r.getSelections(),e=0;e<t.length;e++)t[e]=S+t[e]+y;r.replaceSelections(t,"around"),t=r.listSelections().slice();for(var e=0;e<t.length;e++)t[e]=a(t[e]);r.setSelections(t)}else"both"==d?(r.replaceSelection(S+y,null),r.triggerElectric(S+y),r.execCommand("goCharLeft")):"addFour"==d&&(r.replaceSelection(S+S+S+S,"before"),r.execCommand("goCharRight"))})}function s(e,t){var n=t.lastIndexOf(e);return n>-1&&n%2==1}function c(e,t){var n=e.getRange(u(t.line,t.ch-1),u(t.line,t.ch+1));return 2==n.length?n:null}function l(t,n,r){var i=t.getLine(n.line),a=t.getTokenAt(n);if(/\bstring2?\b/.test(a.type)||f(t,n))return!1;var o=new e.StringStream(i.slice(0,n.ch)+r+i.slice(n.ch),4);for(o.pos=o.start=a.start;;){var s=t.getMode().token(o,a.state);if(o.pos>=n.ch+1)return/\bstring2?\b/.test(s);o.start=o.pos}}function f(e,t){var n=e.getTokenAt(u(t.line,t.ch+1));return/\bstring/.test(n.type)&&n.start==t.ch}var h={pairs:"()[]{}''\"\"",triples:"",explode:"[]{}"},u=e.Pos;e.defineOption("autoCloseBrackets",!1,function(t,n,r){r&&r!=e.Init&&(t.removeKeyMap(g),t.state.closeBrackets=null),n&&(t.state.closeBrackets=n,t.addKeyMap(g))});for(var d=h.pairs+"`",g={Backspace:r,Enter:i},p=0;p<d.length;p++)g["'"+d.charAt(p)+"'"]=function(e){return function(t){return o(t,e)}}(d.charAt(p))});