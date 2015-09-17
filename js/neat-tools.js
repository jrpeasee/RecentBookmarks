/*
Neatools: a nano JavaScript framework made just for Neat Bookmarks and nothing else.
Heavily inspired by MooTools (http://mootools.net/).
Works for Chrome 8 and above.
*/

var $ = function(id){
	return document.getElementById(id);
};

function $extend(original, extended){
	for (var key in (extended || {})) original[key] = extended[key];
	return original;
};

function $each(obj, fn, bind){
	for (var key in obj){
		if (obj.hasOwnProperty(key)) fn.call(bind, obj[key], key, obj);
	}
}

var $slice = Array.prototype.slice;

$extend(String.prototype, {
	widont: function(){
		return this.replace(/\s([^\s]+)$/i, '&nbsp;$1');
	},
	toInt: function(base){
		return parseInt(this, base || 10);
	},
	hyphenate: function(){
		return this.replace(/[A-Z]/g, function(match){
			return ('-' + match.charAt(0).toLowerCase());
		});
	},
	htmlspecialchars: function(){
		return this.replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
	},
	escapeRegExp: function(){
		return this.replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1');
	}
});

$extend(Array.prototype, {
	contains: function(item, from){
		return this.indexOf(item, from) != -1;
	},
	clean: function(){
		return this.filter(function(obj){
			return (obj != undefined);
		});
	},
	getLast: function(){
		return (this.length) ? this[this.length - 1] : null;
	}
});

// Array generic
['map', 'filter', 'forEach'].forEach(function(method){
	if (!Array[method]) Array[method] = function(){
		var args = $slice.call(arguments);
		return Array.prototype[method].apply(args.pop(), args);
	};
});

$extend(Element.prototype, {
	getComputedStyle: function(property){
		return window.getComputedStyle(this, null).getPropertyValue(property.hyphenate());
	},
	destroy: function(){
		return (this.parentNode) ? this.parentNode.removeChild(this) : this;
	},
	hasClass: function(className){
		return this.classList.contains(className);
	},
	addClass: function(className){
		this.classList.add(className);
		return this;
	},
	removeClass: function(className){
		this.classList.remove(className);
		return this;
	},
	toggleClass: function(className){
		this.classList.toggle(className);
		return this;
	},
	getAllNext: function(){
		var elements = [];
		var node = this;
		while (node = node.nextElementSibling){
			elements.push(node);
		}
		return elements;
	},
	getAllPrevious: function(){
		var elements = [];
		var node = this;
		while (node = node.previousElementSibling){
			elements.push(node);
		}
		return elements;
	},
	getSiblings: function(){
		return this.getAllNext().concat(this.getAllPrevious());
	},
});

(function(){
	var inserters = {
		before: function(context, element){
			var parent = element.parentNode;
			if (parent) parent.insertBefore(context, element);
		},
		after: function(context, element){
			var parent = element.parentNode;
			if (parent) parent.insertBefore(context, element.nextSibling);
		},
		bottom: function(context, element){
			element.appendChild(context);
		},
		top: function(context, element){
			element.insertBefore(context, element.firstChild);
		}
	};
	Element.prototype.inject = function(el, where){
		inserters[where || 'bottom'](this, el);
		return this;
	};
})();