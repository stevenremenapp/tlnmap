(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{44:function(e,t,n){e.exports=n(82)},49:function(e,t,n){},73:function(e,t,n){},77:function(e,t,n){},82:function(e,t,n){"use strict";n.r(t);var i=n(1),a=n.n(i),o=n(18),r=n.n(o),c=(n(49),n(43)),s=n(2),l=n(3),u=n(6),d=n(4),m=n(5),h=n(8),p=n(14),w=n(42),v=(n(73),function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return a.a.createElement(w.reveal,{right:!0,noOverlay:!0,disableOverlayClick:!0},a.a.createElement("a",{href:"/",id:"home",className:"menu-item"},"Home"),a.a.createElement("a",{href:"/",id:"about",className:"menu-item"},"About"),a.a.createElement("a",{href:"/",id:"contact",className:"menu-item"},"Contact"),a.a.createElement("a",{href:"/",id:"settings",className:"menu-item"},"Settings"))}}]),t}(a.a.Component));n(75),n(77);n(79).config();var b={position:"absolute",top:0,left:0,padding:"10px"},g={position:"absolute",padding:"5px",background:"blue",fontSize:"10px"},f=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).state={viewport:{width:window.innerWidth,height:window.innerHeight,longitude:-83.0458,latitude:42.3314,zoom:11,maxZoom:16}},n._resize=n._resize.bind(Object(h.a)(Object(h.a)(n))),n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){window.addEventListener("resize",this._resize),this._resize()}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this._resize)}},{key:"_onViewportChange",value:function(e){this.setState({viewport:Object(c.a)({},this.state.viewport,e)})}},{key:"_resize",value:function(){this._onViewportChange({width:window.innerWidth,height:window.innerHeight})}},{key:"render",value:function(){var e=this;return a.a.createElement("div",{id:"outer-container"},a.a.createElement(v,{pageWrapId:"page-wrap"}),a.a.createElement("div",{id:"page-wrap"},a.a.createElement(p.d,Object.assign({},this.state.viewport,{mapStyle:"mapbox://styles/mapbox/streets-v9",mapboxApiAccessToken:"pk.eyJ1Ijoic3RldmVucmVtZW5hcHAiLCJhIjoiY2pndm5sODNmMTBlZDJ3bnY2ZTBsdnl3NyJ9.e4iOvDiQjPMT9ebCzL6CKA",onViewportChange:function(t){return e._onViewportChange(t)}}),a.a.createElement("div",{style:b},a.a.createElement(p.b,{onViewportChange:function(t){return e._onViewportChange(t)}})),a.a.createElement(p.a,{latitude:42.414752,longitude:-83.289607,offsetTop:-30},a.a.createElement("div",{style:g},"You are here")),a.a.createElement(p.c,{latitude:42.414752,longitude:-83.289607,closeButton:!0,closeOnClick:!0,anchor:"top",tipSize:5},a.a.createElement("div",null,"This is the RTDL")))))}}]),t}(i.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(a.a.createElement(f,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[44,2,1]]]);
//# sourceMappingURL=main.9969cb0e.chunk.js.map