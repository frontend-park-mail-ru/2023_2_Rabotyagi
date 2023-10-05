(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['header.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = container.invokePartial(lookupProperty(partials,"profile"),depth0,{"name":"profile","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"auth-box\">\r\n        <button id='btn-signin'  class='btn-primary'>"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"signin") : depth0)) != null ? lookupProperty(stack1,"caption") : stack1), depth0))
    + "</button>\r\n        <button id='btn-signup'  class='btn-neutral'>"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"signup") : depth0)) != null ? lookupProperty(stack1,"caption") : stack1), depth0))
    + "</button>\r\n    </div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<nav>\r\n    <a href='' class='logo-box'>\r\n        "
    + ((stack1 = alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"logo") : depth0)) != null ? lookupProperty(stack1,"icon") : stack1), depth0)) != null ? stack1 : "")
    + "\r\n        <span class='logo-caption'>Супер Юла</span>\r\n    </a>\r\n    <button class='btn-primary'>Категории</button>\r\n    <div class='search-box'>\r\n        "
    + ((stack1 = alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"search") : depth0)) != null ? lookupProperty(stack1,"icon") : stack1), depth0)) != null ? stack1 : "")
    + "\r\n        <input class='search-input' placeholder='Поиск'>\r\n    </div>\r\n    <button class='btn-neutral'>Разместить объявление</button>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"authorized") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":12,"column":4},"end":{"line":19,"column":11}}})) != null ? stack1 : "")
    + "</nav>";
},"usePartial":true,"useData":true});
})();