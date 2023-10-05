(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['card.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "";
},"3":function(container,depth0,helpers,partials,data) {
    return "                <div class=\"badge\">\r\n                </div> \r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"badge\">\r\n                        "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"badges") : depth0)) != null ? lookupProperty(stack1,"city") : stack1), depth0))
    + "\r\n                </div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<link rel=\"stylesheet\" href=\"card.css\">\r\n<div class=\"card\">\r\n        <div class=\"badges\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"badges") : depth0)) != null ? lookupProperty(stack1,"safeDeal") : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":16},"end":{"line":6,"column":23}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"badges") : depth0)) != null ? lookupProperty(stack1,"delivery") : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":16},"end":{"line":12,"column":23}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"badges") : depth0)) != null ? lookupProperty(stack1,"city") : stack1),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":14,"column":16},"end":{"line":18,"column":23}}})) != null ? stack1 : "")
    + "        </div>\r\n        <div class=\"card-body\">\r\n                <img class=\"card-image\" src=\""
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"cardImage") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\" alt=\""
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"cardImage") : depth0)) != null ? lookupProperty(stack1,"alt") : stack1), depth0))
    + "\">\r\n                <div class=\"card-info\">\r\n                        <span class=\"card-info-price\">"
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"cardInfo") : depth0)) != null ? lookupProperty(stack1,"price") : stack1), depth0))
    + " ₽</span>\r\n                        <span class=\"card-info-title\">"
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"cardInfo") : depth0)) != null ? lookupProperty(stack1,"title") : stack1), depth0))
    + " ₽</span>\r\n                </div>\r\n        </div>\r\n</div>";
},"useData":true});
})();