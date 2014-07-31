//     lowercase-backbone
//     (c) simonfan
//     lowercase-backbone is licensed under the MIT terms.

define("lowercase-backbone",["require","exports","module","subject","backbone","lodash"],function(e,t,i){var o=e("subject"),s=e("backbone"),n=s.Model,r=e("lodash"),l=i.exports={},a=l.model=o(s.Model.prototype);l.model.proto({initialize:function(){this.initializeBackboneModel.apply(this,arguments)},initializeBackboneModel:function(e,t){var i=e||{};t||(t={}),this.cid=r.uniqueId("c"),this.attributes={},t.collection&&(this.collection=t.collection),t.parse&&(i=this.parse(i,t)||{}),i=r.defaults({},i,r.result(this,"defaults")),this.set(i,t),this.changed={}}});var h={add:!0,remove:!0,merge:!0};l.collection=o(s.Collection.prototype),l.collection.proto({initialize:function(){this.initializeBackboneCollection.apply(this,arguments)},initializeBackboneCollection:function(e,t){t||(t={}),t.model&&(this.model=t.model),void 0!==t.comparator&&(this.comparator=t.comparator),this._reset(),e&&this.reset(e,r.extend({silent:!0},t))},_prepareModel:function(e,t){if(e instanceof a||e instanceof n)return e;t=t?r.clone(t):{},t.collection=this;var i=new this.model(e,t);return i.validationError?(this.trigger("invalid",this,i.validationError,t),!1):i},set:function(e,t){t=r.defaults({},t,h),t.parse&&(e=this.parse(e,t));var i=!r.isArray(e);e=i?e?[e]:[]:r.clone(e);var o,s,l,c,d,u,p,f=t.at,m=this.model,g=this.comparator&&null==f&&t.sort!==!1,b=r.isString(this.comparator)?this.comparator:null,v=[],k=[],z={},y=t.add,w=t.merge,B=t.remove,M=!g&&y&&B?[]:!1;for(o=0,s=e.length;s>o;o++){if(d=e[o]||{},l=d instanceof a||d instanceof n?c=d:d[m.prototype.idAttribute||"id"],u=this.get(l))B&&(z[u.cid]=!0),w&&(d=d===c?c.attributes:d,t.parse&&(d=u.parse(d,t)),u.set(d,t),g&&!p&&u.hasChanged(b)&&(p=!0)),e[o]=u;else if(y){if(c=e[o]=this._prepareModel(d,t),!c)continue;v.push(c),this._addReference(c,t)}c=u||c,!M||!c.isNew()&&z[c.id]||M.push(c),z[c.id]=!0}if(B){for(o=0,s=this.length;s>o;++o)z[(c=this.models[o]).cid]||k.push(c);k.length&&this.remove(k,t)}if(v.length||M&&M.length)if(g&&(p=!0),this.length+=v.length,null!=f)for(o=0,s=v.length;s>o;o++)this.models.splice(f+o,0,v[o]);else{M&&(this.models.length=0);var _=M||v;for(o=0,s=_.length;s>o;o++)this.models.push(_[o])}if(p&&this.sort({silent:!0}),!t.silent){for(o=0,s=v.length;s>o;o++)(c=v[o]).trigger("add",c,this,t);(p||M&&M.length)&&this.trigger("sort",this,t)}return i?e[0]:e}});var c=["model","collection","el","id","attributes","className","tagName","events"];l.view=o(s.View.prototype),l.view.proto({initialize:function(e){this.initializeBackboneView(e)},initializeBackboneView:function(e){this.cid=r.uniqueId("view"),e||(e={}),r.extend(this,r.pick(e,c)),this._ensureElement(),this.delegateEvents()}}),l.router=o(s.Router.prototype),l.router.proto({initialize:function(){this.initializeBackboneRouter.apply(this,arguments)},initializeBackboneRouter:function(e){e||(e={}),e.routes&&(this.routes=e.routes),this._bindRoutes()}}),l.history=s.history});