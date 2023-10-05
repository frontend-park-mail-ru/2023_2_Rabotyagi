(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['profileBtn.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"profile-container\">\r\n    <button class=\"profile-btn\">\r\n        <img class=\"profile-btn\" src=\"https://w7.pngwing.com/pngs/263/201/png-transparent-computer-icons-avatar-admission-miscellaneous-logo-silhouette.png\">\r\n    </button>\r\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"dropdown"),depth0,{"name":"dropdown","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</div>";
},"usePartial":true,"useData":true});
})();