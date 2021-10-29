(this.webpackJsonpcliente=this.webpackJsonpcliente||[]).push([[0],{30:function(e,t,n){},39:function(e,t,n){},46:function(e,t,n){},48:function(e,t,n){"use strict";n.r(t);var c=n(1),o=n.n(c),i=n(25),s=n.n(i),r=(n(39),n(7)),a=n(47).connect("wss://tarea-3-websocket.2021-2.tallerdeintegracion.cl",{path:"/trucks"}),j=n(0),d=function(e){var t=e.username,n=Object(c.useState)(""),o=Object(r.a)(n,2),i=o[0],s=o[1],d=Object(c.useState)([]),u=Object(r.a)(d,2),l=u[0],b=u[1],O=Object(c.useState)([]),f=Object(r.a)(O,2),h=(f[0],f[1],Object(c.useState)([[]])),p=Object(r.a)(h,2);p[0],p[1];Object(c.useEffect)((function(){return a.on("CHAT",(function(e){var t=e.date,n=e.message,c=e.name;b(l.concat({date:t,message:n,name:c}))})),function(){a.off("CHAT")}}),[l]);return Object(j.jsxs)("div",{className:"chat_todo",children:[Object(j.jsx)("div",{children:Object(j.jsx)("h2",{children:"Chat"})}),Object(j.jsx)("div",{className:"chat",children:l.map((function(e,t){return Object(j.jsx)("div",{children:Object(j.jsxs)("div",{children:["[",Date(e.date),"] -- ",e.name,": ",e.message]})},t)}))}),Object(j.jsxs)("form",{className:"chat_form",onSubmit:function(e){e.preventDefault(),a.emit("CHAT",{message:i,name:t}),s("")},children:[Object(j.jsx)("label",{htmlFor:"",children:" Escriba su mensaje :"}),Object(j.jsx)("textarea",{name:"",id:"",cols:"30",value:i,onChange:function(e){return s(e.target.value)}}),Object(j.jsx)("button",{children:" Enviar mensaje"})]})]})},u=n(23),l=n(50),b=n(54),O=n(51),f=n(52),h=n(53),p=n(9),x=n.n(p),v=(n(46),n(30),n.p+"static/media/minetruck.9d33f62e.png"),m=function(){var e=Object(c.useState)([]),t=Object(r.a)(e,2),n=t[0],o=t[1],i=Object(c.useState)([[]]),s=Object(r.a)(i,2),d=s[0],p=s[1],m=new x.a.Icon({iconUrl:v,iconRetinaUrl:v,popupAnchor:[-0,-0],iconSize:[32,45]});Object(c.useEffect)((function(){return a.on("TRUCKS",(function(e){var t,c=Object(u.a)(e);try{for(c.s();!(t=c.n()).done;){var i=t.value;void 0==i.position&&(i.position=[0,0]),void 0==i.status&&(i.status="Unknown")}}catch(s){c.e(s)}finally{c.f()}o(n.concat(e))})),function(){a.off("TRUCKS")}}),[n]),Object(c.useEffect)((function(){return a.on("POSITION",(function(e){p(d.concat([{code:e.code,position:e.position}]));var t=n.find((function(t){return t.code===e.code}));void 0===t?(console.log("[POSITION] codigo camion buscado: "+e.code),console.log("[POSITION]  Truck not found")):t.position=e.position})),function(){a.off("POSITION")}})),Object(c.useEffect)((function(){return a.on("FAILURE",(function(e){var t=e.code,c=e.source,o=n.find((function(e){return e.code===t}));if(void 0==typeof o)return"Truck not found";o.status=c})),function(){a.off("FAILURE")}})),Object(c.useEffect)((function(){return a.on("FIX",(function(e){var t=n.find((function(t){return t.code===e.code}));if(void 0===typeof t)return console.log("[MAP] entrando a tooltip"),"Truck not found";t.status="Ok"})),function(){a.off("FIX")}}));var g=function(e){var t=n.find((function(t){return t.code===e}));return console.log("[truckInfo] entrando a la funcion con: "+t.code),void 0===t?"Truck not found":Object(j.jsxs)("div",{children:[Object(j.jsxs)("p",{children:["'Truck:' ",t.truck]}),Object(j.jsx)("br",{}),Object(j.jsxs)("p",{children:["'Code: '",t.code]}),Object(j.jsx)("br",{}),Object(j.jsxs)("p",{children:["'Origin: '",t.origin,"'"]}),Object(j.jsx)("br",{}),Object(j.jsxs)("p",{children:["Destination: '",t.destination]}),Object(j.jsx)("br",{}),Object(j.jsxs)("p",{children:["'Actual Position: '",t.position]}),Object(j.jsx)("br",{}),Object(j.jsxs)("p",{children:["'Status: '",t.status]})," ",Object(j.jsx)("br",{})]})};return Object(j.jsxs)("div",{children:[Object(j.jsx)("div",{className:"mapArea",children:Object(j.jsxs)(l.a,{center:[-21.976193,-68.79],zoom:11,scrollWheelZoom:!1,children:[Object(j.jsx)(b.a,{attribution:'\xa9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),n.map((function(e){return Object(j.jsx)("div",{children:Object(j.jsx)(O.a,{pathOptions:{color:"black"},positions:[e.origin,e.destination]})},e.code)})),n.map((function(e){return console.log("[MAP]: primer print posiciones"+e.code+"->"+e.position),void 0===e.position?(console.log("[MAP] error encontrando posiciones"),""):(console.log("[MAP] posiciones encontradas: "+e.code+"->"+e.position),console.log("[MAP] coordinadas a imprimir: lat: "+e.position[0]+"long: "+e.position[1]),Object(j.jsx)("div",{children:Object(j.jsx)(f.a,{position:[e.position[0],e.position[1]],icon:m,children:Object(j.jsx)(h.a,{children:g(e.code)})})}))}))]})}),Object(j.jsx)("div",{className:"infoArea",children:Object(j.jsxs)("div",{className:"info_titulo",children:[Object(j.jsx)("div",{children:Object(j.jsx)("h2",{children:"Trucks Information:"})}),Object(j.jsx)("div",{className:"solo_info",children:n.map((function(e,t){return Object(j.jsx)("div",{children:Object(j.jsx)("div",{children:Object(j.jsxs)("div",{className:"truckInfo_container",children:[Object(j.jsxs)("div",{children:["Truck: ",e.truck]}),Object(j.jsxs)("div",{children:["Code: ",e.code]}),Object(j.jsxs)("div",{children:["Origin: ",e.origin," "]}),Object(j.jsxs)("div",{children:["Destination: ",e.destination," "]}),Object(j.jsxs)("div",{children:["Status: ",e.status," "]}),Object(j.jsx)("div",{children:"Ok"!==e.status&&Object(j.jsx)("button",{value:e.code,onClick:function(e){return function(e){console.log("[fixTruck] Yo reparando el siguiente camion: "+e),a.emit("FIX",{code:e})}(e.target.value)},children:"Fix Truck"})})]})})},t)}))})]})})]})};var g=function(){var e=Object(c.useState)(""),t=Object(r.a)(e,2),n=t[0],o=t[1],i=Object(c.useState)(!1),s=Object(r.a)(i,2),u=s[0],l=s[1];return Object(j.jsx)("div",{className:"App",children:Object(j.jsxs)("div",{className:"titleArea",children:[Object(j.jsx)("h1",{align:"center",children:"Tarea 3"}),!u&&Object(j.jsxs)("form",{className:"logIn",onSubmit:function(e){a.emit("TRUCKS"),e.preventDefault(),""!==n&&l(!0)},children:[Object(j.jsx)("label",{children:" Escoja un nombre de usuario:"}),Object(j.jsx)("input",{value:n,onChange:function(e){return o(e.target.value)}}),Object(j.jsx)("button",{children:"Ingresar a la pagina"})]}),u&&Object(j.jsxs)("div",{className:"chatArea",children:[" ",Object(j.jsx)(d,{username:n})," "]}),u&&Object(j.jsx)(m,{})]})})};s.a.render(Object(j.jsx)(o.a.StrictMode,{children:Object(j.jsx)(g,{})}),document.getElementById("root"))}},[[48,1,2]]]);
//# sourceMappingURL=main.e260071a.chunk.js.map