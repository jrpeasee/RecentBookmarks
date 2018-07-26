$(document).ready(function () {


	(function viewBookmarks(){


		(function init(){
			generateRecent();
		})();

		function generateRecent(){


			let deleteBookmark = function(link,id) {
		        //console.log(link);
            
		        chrome.bookmarks.remove(id, function() {
		         	link.parentsUntil("ul").slideUp(function() {
		              $(this).remove();
		             
		            });
		        });
		    };
          
		    let deleteBookmarks = function(){
                let listItem = $("#recentlist li");
                let links = $("#recentlist li a");
                let id = links.attr('id');
                
                for(let i = 0; i<=listItem.length-1; i++){
                    if(listItem.length == 0){
                        return
                    }else{
                        ids = links[i].id;
                        console.log(id);
                        chrome.bookmarks.remove(ids,function(){
                            links.parentsUntil("ul").slideUp(function() {
                                $(this).remove();
                            });
                        })
                    }
                }
                getBookmarks();
            }


           let bookmarkManagerLink = (function(){

                $('#bookmark-link').on('click', function(e) {
                            e.preventDefault();

                              chrome.tabs.create({
                                url: "chrome://bookmarks/"
                              });


                });
            })();

            

		    function getBookmarks(){
				chrome.bookmarks.getRecent( 15, function(tree){

                    tree.forEach(function(recent){
                        
                        let recentList = $("#recentlist");
                        let u = recent.url;
                        let title = recent.title.toString().slice(0, 35);
                        let date = new Date(recent.dateAdded);
                        let dateTrim = date.toString().slice(0, 15);
                        let favicon = 'https://www.google.com/s2/favicons?domain=' + u;
                        let favElement = '<img src="' + favicon + '"' + '>'
                        let li = $('<li></li>');
                        let $link = $('<a href="#" target="_blank" class="link"></a>');
                        let span = $('<span class="linkBlock"></span')
                        let $close = $('<i class="fa fa-times"></i>')
                        let p = $('<p class="date"></p>')
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
                        id = recent.id;

                        $close.on('click', function(e) {

                            e.preventDefault();
                            e.stopImmediatePropagation();
                            deleteBookmark($link,id);
                        });
                       /* const markup = `<li>
                                  <span class="linkBlock">
                                  <a id="${recent.id}" href="${recent.url}" target="_blank" class="link">${recent.title.toString().slice(0,35)}</a>
                                  <i class="fa fa-times"></i>
                                  </span>
                                  <p class="date"></p>
                                </li>`;*/
                       
					});
				   
				});/*end of getRecent */
			}; /*end of getBookmarks */

			getBookmarks();
           

            let deleteAllbutton = document.querySelector("#deleteAllBtn");

            deleteAllbutton.addEventListener('click', function(e){
                e.preventDefault();
                let listItem = document.getElementsByClassName('link');
                if(listItem.length === 0){
                   return;
                }else if (confirm('Are you sure you want to delete all bookmarks?')) {
                    deleteBookmarks();                  
                }else {
                    return;
                }
                
            });
		};/*end of generateRecent function*/
	   

	})();/*end of viewBookmarks*/
	 
});