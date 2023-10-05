(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['dropdown.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"dropdown-search\">\r\n        "
    + ((stack1 = container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"search") : depth0)) != null ? lookupProperty(stack1,"icon") : stack1), depth0)) != null ? stack1 : "")
    + "\r\n        <input class='search-input' placeholder='Поиск'>\r\n    </div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <button id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"items") : depth0)) != null ? lookupProperty(stack1,"ref") : stack1), depth0))
    + "_"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"0") : depth0), depth0))
    + "\" class=\"dropdown-btn\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"1") : depth0), depth0))
    + "</button>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0))
    + "\" class=\"dropdown-container\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"search") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":7,"column":11}}})) != null ? stack1 : "")
    + "    <div class=\"dropdown-content\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"items") : depth0)) != null ? lookupProperty(stack1,"content") : stack1),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":8},"end":{"line":11,"column":17}}})) != null ? stack1 : "")
    + "    </div>\r\n</div>";
},"useData":true});
})();