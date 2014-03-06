//     lowercase-backbone
//     (c) simonfan
//     lowercase-backbone is licensed under the MIT terms.

define("lowercase-backbone",["require","exports","module","subject","backbone"],function(e,o,t){var i=e("subject"),n=e("backbone"),r=t.exports=function(e){var o=i(e.prototype);return o.proto("initialize",function(){this.initialize=e.prototype.initialize,e.apply(this,arguments)}),o};return r.model=r(n.Model),r.collection=r(n.Collection),r.view=r(n.View),r.router=r(n.Router),r});