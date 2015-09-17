$(document).ready(function () {


	var viewTree = {
		init: function(){
			this.render();
		},

		getRecent: function(){

			var recentList = $("#recentlist");
			var tree = document.getElementById('tree');

			var deleteBookmark = function(link) {
		      var id;
		        id = link.attr('id');
		        chrome.bookmarks.remove(id, function() {
		         	link.parent().slideUp(function() {
		              $(this).remove();
		            });
		        });
		    };
		

			 var getBookmarks = function(){



			chrome.bookmarks.getRecent( 10, function(tree){

				this.children = tree;
				this.children.forEach(function(recent){
					console.log(recent);
					var u = recent.url;
					var date = new Date(recent.dateAdded);
					var dateTrim = date.toString().slice(0,15);
					var favicon = 'https://www.google.com/s2/favicons?domain=' + u;
					var favElement = '<img src="' + favicon + '"' + '>'
					var li = $('<li></li>');
					var $link = $('<a href="#" class="link"></a>');
					var date = document.createElement('span');
					$link.innerHTML = recent.title;
					$link.attr('id', recent.id);
          			$link.attr('href', recent.url);
          			$link.append(favElement);
          			$link.append(date);
					date.innerHTML = dateTrim;
					recentList.append(li);
					li.append($link);

					$link.on('click', function(e) {
			            e.preventDefault();
			            e.stopImmediatePropagation();
			             deleteBookmark($link);
			          });

					
				});
				
			});
			}; /*end of getBookmarks */
			getBookmarks();
		},


		

		

		render: function(){
			this.getRecent();
		}

	};

	viewTree.init();
	 
});