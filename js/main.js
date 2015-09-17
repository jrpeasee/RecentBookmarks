(function (window) {

	var viewTree = {
		init: function(){
			this.render();
		},

		getRecent: function(){

			var recentList = document.getElementById('recentlist');
			var tree = document.getElementById('tree');

		

			 if(recentList.childNodes.length === 0){

			chrome.bookmarks.getRecent( 10, function(tree){

				this.children = tree;
				this.children.forEach(function(recent){
					console.log(recent);
					var u = recent.url;
					var favicon = 'chrome://favicon/' + u;
					var recentUrl = '<img src="' + favicon + '"' + '>' + recent.url;
					var li = document.createElement('li');
					li.innerHTML = recentUrl;
					recentList.appendChild(li);
				});
				
			});

		   } else if(recentList.childNodes.length > 0){
		   		$('#recentlist').empty();
		   }
		},

		

		render: function(){
			this.getRecent();
		}

	};

	viewTree.init();
	 
})(window);