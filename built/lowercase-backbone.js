//     lowercase-backbone
//     (c) simonfan
//     lowercase-backbone is licensed under the MIT terms.

define("lowercase-backbone",["require","exports","module","subject","backbone"],function(e,o,t){var i=e("subject"),r=e("backbone"),n=t.exports=function(e){var o=i(e.prototype);return o.proto("initialize",function(){this.initialize=e.prototype.initialize,e.apply(this,arguments)}),o};return n.model=n(r.Model),n.collection=n(r.Collection),n.view=n(r.View),n.router=n(r.Router),n.history=r.history,n});