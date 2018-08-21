
        (function generateRecent() {


            const deleteBookmark = function(link, id) {
                //console.log(link);

                chrome.bookmarks.remove(id, function() {
                    link.parentsUntil("ul").slideUp(function() {
                        $(this).remove();

                    });
                });
            };

            const deleteBookmarks = function() {
                const listItem = $("#recentlist li");
                const links = $("#recentlist li a");
                const id = links.attr('id');
                let ids;
                for (let i = 0; i <= listItem.length - 1; i++) {
                    if (listItem.length === 0) {
                        return;
                    } else {
                        ids = links[i].id;
                        chrome.bookmarks.remove(ids, function() {
                            links.parentsUntil("ul").slideUp(function() {
                                $(this).remove();
                            });
                        });
                    }
                }
                getBookmarks();
            };


            const bookmarkManagerLink = function() {

                $('#bookmark-link').on('click', function(e) {
                    e.preventDefault();

                    chrome.tabs.create({
                        url: "chrome://bookmarks/"
                    });


                });
            };



            const getBookmarks = function() {
                chrome.bookmarks.getRecent(15, function(tree) {

                    tree.forEach(function(recent) {

                        const recentList = $("#recentlist");
                        const u = recent.url;
                        const title = recent.title.toString().slice(0, 35);
                        const date = new Date(recent.dateAdded);
                        const dateTrim = date.toString().slice(0, 15);
                        const favicon = 'https://www.google.com/s2/favicons?domain=' + u;
                        const favElement = '<img src="' + favicon + '"' + '>';
                        const li = $('<li></li>');
                        const $link = $('<a href="#" target="_blank" class="link"></a>');
                        const span = $('<span class="linkBlock"></span');
                        const $close = $('<i class="fa fa-times"></i>');
                        const p = $('<p class="date"></p>');
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
                        let id = recent.id;

                        $close.on('click', function(e) {

                            e.preventDefault();
                            e.stopImmediatePropagation();
                            deleteBookmark($link, id);
                        });
                        /* const markup = `<li>
                                   <span class="linkBlock">
                                   <a id="${recent.id}" href="${recent.url}" target="_blank" class="link">${recent.title.toString().slice(0,35)}</a>
                                   <i class="fa fa-times"></i>
                                   </span>
                                   <p class="date"></p>
                                 </li>`;*/

                    });

                }); /*end of getRecent */
            } /*end of getBookmarks */


            const deleteAllbutton = document.querySelector("#deleteAllBtn");

            deleteAllbutton.addEventListener('click', function(e) {
                e.preventDefault();
                let listItem = document.getElementsByClassName('link');
                if (listItem.length === 0) {
                    return;
                } else if (confirm('Are you sure you want to delete all bookmarks?')) {
                    deleteBookmarks();
                } else {
                    return;
                }

            });
            getBookmarks();
        })(); /*end of generateRecent function*/
