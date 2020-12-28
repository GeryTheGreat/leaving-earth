(this["webpackJsonpleaving-earth"]=this["webpackJsonpleaving-earth"]||[]).push([[0],{23:function(e){e.exports=JSON.parse('[{"id":0,"name":"Earth","to":[{"id":1,"min":0,"max":0,"difficulty":3},{"id":2,"min":0,"max":0,"difficulty":8}]},{"id":1,"name":"Suborbital Space","to":[{"id":2,"min":0,"max":0,"difficulty":5}]},{"id":2,"name":"Earth Orbit","to":[{"id":0,"min":0,"max":0,"difficulty":0},{"id":3,"min":0,"max":1,"difficulty":1},{"id":4,"min":1,"max":1,"difficulty":3},{"id":5,"min":1,"max":1,"difficulty":6},{"id":6,"min":0,"max":1,"difficulty":3},{"id":7,"min":3,"max":3,"difficulty":3},{"id":8,"min":3,"max":3,"difficulty":5}]},{"id":3,"name":"Lunar Fly-by","to":[{"id":2,"min":0,"max":1,"difficulty":1},{"id":6,"min":0,"max":1,"difficulty":2},{"id":9,"min":0,"max":0,"difficulty":4}]},{"id":4,"name":"Inner Planets Transfer","to":[{"id":2,"min":1,"max":1,"difficulty":3},{"id":10,"min":1,"max":1,"difficulty":5},{"id":11,"min":1,"max":1,"difficulty":2},{"id":12,"min":1,"max":1,"difficulty":3},{"id":13,"min":1,"max":1,"difficulty":5},{"id":8,"min":2,"max":2,"difficulty":4}]},{"id":5,"name":"Outer Planets Transfer","to":[]},{"id":6,"name":"Lunar Orbit","to":[{"id":2,"min":0,"max":1,"difficulty":3},{"id":9,"min":0,"max":0,"difficulty":2}]},{"id":7,"name":"Mars Fly-by","to":[{"id":8,"min":0,"max":1,"difficulty":3,"aerobraking":{"min":0,"max":0,"difficulty":1}},{"id":14,"min":0,"max":0,"difficulty":3}]},{"id":8,"name":"Mars Orbit","to":[{"id":14,"min":0,"max":0,"difficulty":0},{"id":2,"min":3,"max":3,"difficulty":5},{"id":4,"min":2,"max":2,"difficulty":4},{"id":5,"min":1,"max":1,"difficulty":5},{"id":15,"min":0,"max":1,"difficulty":1}]},{"id":9,"name":"Moon","to":[{"id":6,"min":0,"max":0,"difficulty":2}]},{"id":10,"name":"Mercury Fly-by","to":[{"id":16,"min":0,"max":1,"difficulty":2},{"id":17,"min":0,"max":0,"difficulty":4}]},{"id":11,"name":"Venus Fly-by","to":[{"id":12,"min":0,"max":1,"difficulty":1},{"id":18,"min":0,"max":0,"difficulty":1}]},{"id":12,"name":"Venus Orbit","to":[{"id":18,"min":0,"max":0,"difficulty":0},{"id":4,"min":1,"max":1,"difficulty":3},{"id":5,"min":1,"max":1,"difficulty":9}]},{"id":13,"name":"Ceres","to":[{"id":4,"min":2,"max":2,"difficulty":5},{"id":5,"min":1,"max":1,"difficulty":3}]},{"id":14,"name":"Mars","to":[{"id":8,"min":0,"max":0,"difficulty":3}]},{"id":15,"name":"Phobos","to":[{"id":8,"min":0,"max":1,"difficulty":1}]},{"id":16,"name":"Mercury Orbit","to":[{"id":4,"min":1,"max":1,"difficulty":7},{"id":17,"min":0,"max":0,"difficulty":2}]},{"id":17,"name":"Mercury","to":[{"id":16,"min":0,"max":0,"difficulty":2}]},{"id":18,"name":"Venus","to":[{"id":12,"min":0,"max":0,"difficulty":6}]}]')},37:function(e,t,a){},38:function(e,t,a){},4:function(e){e.exports=JSON.parse('{"b":{"name":"juno","mass":1,"thrust":4},"a":{"name":"atlas","mass":4,"thrust":27},"e":{"name":"soyuz","mass":9,"thrust":90},"c":{"name":"proton","mass":6,"thrust":70},"d":{"name":"saturn","mass":20,"thrust":200}}')},55:function(e,t,a){"use strict";a.r(t);var n=a(1),i=a(0),r=a(5),c=a.n(r),s=a(9),o=a(7),u=a(20),d=a(8),l=a(3),m=a(15),f=function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{route:[],ion:0},a=arguments.length>1?arguments[1]:void 0,n=t.ion;switch(a.type){case"ADD_ROUTE":if(null===a.payload)return t;var i=t.route.slice(-1),r=t.route,c=0;if(0!==i.length){var s=t.route.slice(0,-1);c=i[0].mass;var o=a.payload.to.find((function(e){return e.id===i[0].id})),u=Math.min(o.min,o.max);r=[].concat(Object(m.a)(s),[Object.assign({},i[0],{maneuver:o,difficulty:o.difficulty,years:u,thrust:u*t.ion*5+i[0].thrust})])}return Object(l.a)(Object(l.a)({},t),{},{route:[].concat(Object(m.a)(r),[Object.assign({},a.payload,{mass:c,aerobraking:!1,extraMass:0,rocketMass:0,thrust:0,juno:0,atlas:0,soyuz:0,proton:0,saturn:0})])});case"REMOVE_ROUTE":return Object(l.a)(Object(l.a)({},t),{},{route:t.route.slice(0,a.payload).map((function(n,i){return e=n,a.payload===i+1&&((e=Object.assign({},n)).thrust-=5*t.ion*n.years,delete e.maneuver,delete e.years,delete e.difficulty),e}))});case"AEROBRAKE_TOGGLE":return Object(l.a)(Object(l.a)({},t),{},{route:t.route.map((function(n,i){if(e=n,a.payload===i){var r=n.years,c=n.maneuver.aerobraking&&!n.aerobraking?n.maneuver.aerobraking:n.maneuver,s=Math.min(c.min,c.max);e=Object.assign({},n,{aerobraking:!n.aerobraking,difficulty:c.difficulty,years:s,thrust:n.thrust+(s-r)*t.ion*5})}return e}))});case"CHANGE_MASS":n=t.ion;var f=t.route.map((function(e,t){var i=e.extraMass;return t===a.payload.i&&(i=a.payload.mass),n+=i+e.rocketMass,Object.assign({},e,{extraMass:i,mass:n})}));return Object(l.a)(Object(l.a)({},t),{},{route:f});case"CHANGE_YEARS":return Object(l.a)(Object(l.a)({},t),{},{route:t.route.map((function(n,i){if(i===a.payload.i){var r=n.maneuver.aerobraking&&n.aerobraking?n.maneuver.aerobraking:n.maneuver,c=n.difficulty;if(n.years>a.payload.years){if(r.min>a.payload.years)for(var s=0;s<n.years-a.payload.years;s++)c*=2}else if(r.min>=a.payload.years)for(s=0;s<a.payload.years-n.years;s++)c/=2;var o=n.thrust+(a.payload.years-n.years)*t.ion*5;return e=Object.assign({},n,{years:a.payload.years,thrust:o,difficulty:c})}return Object.assign({},n)}))});case"CHANGE_ROCKET":return n=t.ion,Object(l.a)(Object(l.a)({},t),{},{route:t.route.map((function(t,i){if(e=t,i===a.payload.i){var r,c=a.payload.count-t[a.payload.rocket.name];e=Object.assign({},e,(r={},Object(d.a)(r,a.payload.rocket.name,a.payload.count),Object(d.a)(r,"rocketMass",t.rocketMass+c*a.payload.rocket.mass),Object(d.a)(r,"mass",t.mass+c*a.payload.rocket.mass),Object(d.a)(r,"thrust",t.thrust+c*a.payload.rocket.thrust),r))}return n+=e.extraMass+e.rocketMass,Object.assign({},e,{mass:n})}))});case"CHANGE_ION":n=a.payload;var j=a.payload-t.ion;return Object(l.a)(Object(l.a)({},t),{},{ion:a.payload,route:t.route.map((function(e,t){n+=e.extraMass+e.rocketMass;var a=e.years?e.thrust+j*e.years*5:e.thrust;return Object.assign({},e,{mass:n,thrust:a})}))});default:return t}},j=Object(o.c)({routeReducer:f});a(37);var h=a(21),y=a(22),b=a(26),x=a(25),O=a(24),p=(a(38),a(23)),g=a(4),k=function(e){Object(b.a)(a,e);var t=Object(x.a)(a);function a(e){var n;return Object(h.a)(this,a),(n=t.call(this,e)).addRoute=function(e,t){return 0===t.length||n.state.route.to.find((function(e){return e.id===t[0].id}))?(n.props.addRoute(n.state.route),!0):(console.info("NO"),!1)},n.removeRoute=function(e){n.props.removeRoute(e)},n.aeroBrakeToggle=function(e){n.props.aeroBrakeToggle(e)},n.routes=function(e){n.setState({route:e.value})},n.changeMass=function(e,t){n.props.changeMass(e,t)},n.changeRocket=function(e,t,a){n.props.changeRocket(e,t,a)},n.changeIon=function(e){n.props.changeIon(e)},n.changeYears=function(e,t,a){if(!n.yearValidator(e,a))return!1;n.props.changeYears(e,t)},n.state={route:null},n}return Object(y.a)(a,[{key:"yearValidator",value:function(e,t){return 0!==t.max&&(!(0===t.min&&e>1)&&(!(e<0)&&(!(e>t.max+1)&&!(t.min>0&&0===e))))}},{key:"render",value:function(){var e=this,t=this.props.route.slice(-1);return Object(n.jsxs)("div",{className:"App",children:[Object(n.jsxs)("div",{style:{marginTop:"10px",marginLeft:"auto",marginRight:"auto",width:"80%"},children:[Object(n.jsx)(O.a,{onChange:this.routes,options:p.filter((function(e){return 0===t.length||e.to.find((function(e){return e.id===t[0].id}))})).map((function(e){return{value:e,label:e.name}}))}),Object(n.jsx)("button",{style:{marginTop:"10px"},className:"success",onClick:function(a){return e.addRoute(a,t)},children:"Add Route"})]}),Object(n.jsxs)("table",{children:[Object(n.jsxs)("thead",{children:[Object(n.jsxs)("tr",{children:[Object(n.jsx)("th",{children:"Region"}),Object(n.jsx)("th",{children:"Difficulty"}),Object(n.jsx)("th",{children:"Years"}),Object(n.jsx)("th",{children:"Mass"}),Object(n.jsx)("th",{children:"Total Mass"}),Object(n.jsx)("th",{children:"Thrust"}),Object(n.jsx)("th",{colSpan:"6",children:"Rockets"})]}),Object(n.jsxs)("tr",{children:[Object(n.jsx)("th",{colSpan:"6"}),Object(n.jsx)("th",{children:"Juno"}),Object(n.jsx)("th",{children:"Atlas"}),Object(n.jsx)("th",{children:"Soyuz"}),Object(n.jsx)("th",{children:"Proton"}),Object(n.jsx)("th",{children:"Saturn"}),Object(n.jsx)("th",{children:"Ion"})]})]}),Object(n.jsx)("tbody",{children:this.props.route.map((function(t,a){var i=t.maneuver?t.maneuver.aerobraking&&t.aerobraking?t.maneuver.aerobraking:t.maneuver:null;return Object(n.jsxs)("tr",{children:[Object(n.jsxs)("td",{children:[Object(n.jsx)("button",{className:"danger rounded small",onClick:function(){return window.confirm("Remove ".concat(t.name,"?"))&&e.removeRoute(a)},children:"X"}),t.name,i&&t.maneuver.aerobraking&&Object(n.jsx)("button",{className:"rounded small "+(t.aerobraking?"success":"danger strikethrough"),onClick:function(){return e.aeroBrakeToggle(a)},children:"Aero"})]}),Object(n.jsx)("td",{children:i?t.difficulty:"?"}),Object(n.jsx)("td",{children:i?Object(n.jsxs)("div",{children:[Object(n.jsx)("button",{className:"rounded small"+(e.yearValidator(t.years-1,i)?" danger":""),disabled:!e.yearValidator(t.years-1,i),onClick:function(){return e.changeYears(t.years-1,a,i)},children:"-"}),t.years,Object(n.jsx)("button",{className:"rounded small"+(e.yearValidator(t.years+1,i)?" success":""),disabled:!e.yearValidator(t.years+1,i),onClick:function(){return e.changeYears(t.years+1,a,i)},children:"+"})]}):"?"}),Object(n.jsxs)("td",{children:[Object(n.jsx)("button",{className:"danger rounded small",onClick:function(){return e.changeMass(Math.max(0,t.extraMass-1),a)},children:"-"}),t.extraMass,Object(n.jsx)("button",{className:"success rounded small",onClick:function(){return e.changeMass(t.extraMass+1,a)},children:"+"})]}),Object(n.jsxs)("td",{style:{color:i&&t.mass*t.difficulty>t.thrust?"red":"green"},children:[t.mass," ",i&&"("+t.mass*t.difficulty+")"]}),Object(n.jsx)("td",{children:t.thrust}),Object(n.jsxs)("td",{children:[Object(n.jsx)("button",{className:"danger rounded small",onClick:function(){return e.changeRocket(Math.max(0,t.juno-1),a,g.b)},children:"-"}),t.juno,Object(n.jsx)("button",{className:"success rounded small",onClick:function(){return e.changeRocket(t.juno+1,a,g.b)},children:"+"})]}),Object(n.jsxs)("td",{children:[Object(n.jsx)("button",{className:"danger rounded small",onClick:function(){return e.changeRocket(Math.max(0,t.atlas-1),a,g.a)},children:"-"}),t.atlas,Object(n.jsx)("button",{className:"success rounded small",onClick:function(){return e.changeRocket(t.atlas+1,a,g.a)},children:"+"})]}),Object(n.jsxs)("td",{children:[Object(n.jsx)("button",{className:"danger rounded small",onClick:function(){return e.changeRocket(Math.max(0,t.soyuz-1),a,g.e)},children:"-"}),t.soyuz,Object(n.jsx)("button",{className:"success rounded small",onClick:function(){return e.changeRocket(t.soyuz+1,a,g.e)},children:"+"})]}),Object(n.jsxs)("td",{children:[Object(n.jsx)("button",{className:"danger rounded small",onClick:function(){return e.changeRocket(Math.max(0,t.proton-1),a,g.c)},children:"-"}),t.proton,Object(n.jsx)("button",{className:"success rounded small",onClick:function(){return e.changeRocket(t.proton+1,a,g.c)},children:"+"})]}),Object(n.jsxs)("td",{children:[Object(n.jsx)("button",{className:"danger rounded small",onClick:function(){return e.changeRocket(Math.max(0,t.saturn-1),a,g.d)},children:"-"}),t.saturn,Object(n.jsx)("button",{className:"success rounded small",onClick:function(){return e.changeRocket(t.saturn+1,a,g.d)},children:"+"})]}),Object(n.jsxs)("td",{children:[Object(n.jsx)("button",{className:"danger rounded small",onClick:function(){return e.changeIon(Math.max(0,e.props.ion-1))},children:"-"}),e.props.ion,Object(n.jsx)("button",{className:"success rounded small",onClick:function(){return e.changeIon(e.props.ion+1)},children:"+"})]})]},a)}))})]})]})}}]),a}(i.Component),v=Object(s.b)((function(e){return{route:e.routeReducer.route,ion:e.routeReducer.ion}}),{addRoute:function(e){return{type:"ADD_ROUTE",payload:e}},removeRoute:function(e){return{type:"REMOVE_ROUTE",payload:e}},aeroBrakeToggle:function(e){return{type:"AEROBRAKE_TOGGLE",payload:e}},changeMass:function(e,t){return{type:"CHANGE_MASS",payload:{mass:e,i:t}}},changeYears:function(e,t){return{type:"CHANGE_YEARS",payload:{years:e,i:t}}},changeRocket:function(e,t,a){return{type:"CHANGE_ROCKET",payload:{count:e,i:t,rocket:a}}},changeIon:function(e){return{type:"CHANGE_ION",payload:e}}})(k),R=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,56)).then((function(t){var a=t.getCLS,n=t.getFID,i=t.getFCP,r=t.getLCP,c=t.getTTFB;a(e),n(e),i(e),r(e),c(e)}))};c.a.render(Object(n.jsx)(s.a,{store:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(o.d)(j,e,Object(o.a)(u.a))}(),children:Object(n.jsx)(v,{})}),document.getElementById("root")),R()}},[[55,1,2]]]);
//# sourceMappingURL=main.627cbacb.chunk.js.map