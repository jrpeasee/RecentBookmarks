$(document).ready(function () {


	var viewBookmarks= {


		init: function(){
			this.render();
		},

		getRecent: function(){


			var deleteBookmark = function(link) {
		        var id;
		        id = link.attr('id');
		        chrome.bookmarks.remove(id, function() {
		         	link.parentsUntil("ul").slideUp(function() {
		              $(this).remove();
		              console.log(link);
		            });
		        });
		    };
		

			var getBookmarks = function(){

				chrome.bookmarks.getRecent( 15, function(tree){

					this.children = tree;
					
					this.children.forEach(function(recent){

						console.log(recent);
						var recentList = $("#recentlist");
						var u = recent.url;
						var title = recent.title.toString().slice(0,35);
						var date = new Date(recent.dateAdded);
						var dateTrim = date.toString().slice(0,15);
						var favicon = 'https://www.google.com/s2/favicons?domain=' + u;
						var favElement = '<img src="' + favicon + '"' + '>'
						var li = $('<li></li>');
						var $link = $('<a href="#" target="_blank" class="link"></a>');
						var span = $('<span class="linkBlock"></span')
						var $close = $('<i class="fa fa-times"></i>')
						var p = $('<p class="date"></p>')
						$link.innerHTML = recent.title;
						$link.attr('id', recent.id);
	          			$link.attr('href', recent.url);
	          			$link.append(favElement);
	          			$link.append(title);
						date.innerHTML = dateTrim;
						recentList.append(li);
						li.append(span);
						li.append(p);
						p.append(dateTrim);
						span.append($link);
						span.append($close);

						$close.on('click', function(e) {
							
				         	e.preventDefault();
				            e.stopImmediatePropagation();
				             deleteBookmark($link);
				        });

					});
				
				});

			}; /*end of getBookmarks */

			getBookmarks();

		}, /*end of getRecent function*/
	

		render: function(){
			this.getRecent();
		}

	};/*end of viewBookmarks*/

	viewBookmarks.init();
	 
});