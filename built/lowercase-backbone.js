//     lowercase-backbone
//     (c) simonfan
//     lowercase-backbone is licensed under the MIT terms.

define("lowercase-backbone",["require","exports","module","subject","backbone"],function(e,i,o){var t=e("subject"),n=e("backbone"),r=o.exports=function(e){var i=t(e.prototype);return i.proto("initialize",function(){this.initialize=e.prototype.initialize,e.apply(this,arguments)}),i};return r.model=r(n.Model),r.collection=r(n.Collection),r.view=r(n.View),r});