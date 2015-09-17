(function (window) {

	var viewTree = {
		init: function(){
			this.render();
		},

		getRecent: function(){

			var recentList = document.getElementById('recentlist');
			var tree = document.getElementById('tree');

		

			 

			chrome.bookmarks.getRecent( 10, function(tree){

				this.children = tree;
				this.children.forEach(function(recent){
					console.log(recent);
					var u = recent.url;
					var date = new Date(recent.dateAdded);
					var dateTrim = date.toString().slice(0,15);
					var favicon = 'https://www.google.com/s2/favicons?domain=' + u;
					var recentUrl = '<img src="' + favicon + '"' + '>' + recent.url;
					var li = document.createElement('li');
					var date = document.createElement('span');
					li.innerHTML = recentUrl;
					li.appendChild(date);
					date.innerHTML = dateTrim;
					recentList.appendChild(li);
				});
				
			});
		},

		

		render: function(){
			this.getRecent();
		}

	};

	viewTree.init();
	 
})(window);