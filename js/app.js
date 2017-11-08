  // When the page is done loading 
document.addEventListener('DOMContentLoaded', function() {
    "use strict";

    var searchInput = document.getElementById('searchBox'),
        results = document.getElementById('acResults'),
        saveList =  document.getElementById('results-list'),
        searchForm = document.getElementById('searchform'),
        searchHere = [],
        matches = [],
        oReq = new XMLHttpRequest(),
        resultsCursor = 0;

        
    // Call the data from the JASON file     
    oReq.onreadystatechange = function() {
        if (oReq.readyState == XMLHttpRequest.DONE) {
            if (oReq.status == 200) {
                // parse string to json on success
                var response = JSON.parse(oReq.responseText);
                response.results.forEach(function(element) {
                    searchHere.push(element.name.first);
                });
                // start searching in recieved json

            } else if ($this.xmlhttp.status == 400) {
                console.log('There was an error 400');
            } else {
                console.log('something else');
            }
        }
    }
    oReq.open("GET", "https://randomuser.me/api/?results=20&&nat=gb&&seed=emp");
    oReq.send();
    // Focus the input
    searchInput.focus();
    // Add event listener for the input keyup
    searchInput.addEventListener('keyup', function(event) {
        /*
         * Key codes
         *
         * Enter: 13
         * Arrow up: 38 
         * Arrow down: 40
         */

        results.innerHTML = '';
        toggleResults('hide');

        if (this.value.length > 0) {
            matches = getMatches(this.value);

            if (matches.length > 0) {
                displayMatches(matches);
            }
        }

        if (results.classList.contains('visible')) {
            var scrollMe = 0;
            switch (event.keyCode) {
                case 13:
                    searchInput.value = results.children[resultsCursor].innerHTML;
                    toggleResults('hide');
                    resultsCursor = 0;
                    submitForm();
                    break;
                case 38:
                    if (resultsCursor > 0) {
                        resultsCursor--;
                        moveCursor(resultsCursor);
                         scrollMe -= 350;
                         window.scrollTo(0, scrollMe);
                    }

                    break;
                case 40:
                    if (resultsCursor < (matches.length - 1)) {
                        resultsCursor++;
                        moveCursor(resultsCursor);
                         scrollMe += 350;
                         window.scrollTo(0, scrollMe);
                    }

                    break;
            }
        }

    });
     // Prevent the search form from submiting 
    searchForm.onsubmit = submitForm;
    searchForm.onkeydown = function(event) {
        if (event.keyCode == 13) {
            event.preventDefault();
        }
    };
    //  checking if the input value matches any of the names
    function getMatches(inputText) {
        var matchList = [];

        for (var i = 0; i < searchHere.length; i++) {
            if (searchHere[i].toLowerCase().indexOf(inputText.toLowerCase()) != -1) {
                matchList.push(searchHere[i]);
            }
        }

        return matchList;
    }
    // displaying autocomplete results list
    function displayMatches(matchList) {
        var j = 0;
        var resultItems = document.querySelectorAll('.result');
        if (resultItems) {
            for (var i = 0; i < resultItems.length; i++) {
                resultItems[i].removeEventListener('click')
                resultItems[i].removeEventListener('mouseover')
            }
        }
        while (j < matchList.length) {
            results.innerHTML += '<li class="result">' + matchList[j] + '</li>';
            j++;
        }
        resultItems = document.querySelectorAll('.result');
        if (resultItems) {
            for (var i = 0; i < resultItems.length; i++) {
                resultItems[i].addEventListener('click', selectItem)
                resultItems[i].addEventListener('mouseover', hoverItem)
            }
        }
        // The first child gets a class of "highlighted"
        moveCursor(resultsCursor);

        // Show the results
        toggleResults('show');
    }
    //select a result on mouse click 
    function selectItem(event) {
        var nodes = Array.prototype.slice.call(document.getElementById('acResults').children);
        resultsCursor = nodes.indexOf(event.target);
        searchInput.value = results.children[resultsCursor].innerHTML;
        toggleResults('hide');
        resultsCursor = 0;
        submitForm();
    }
    // Change the highlight class on hover 
    function hoverItem() {
        var resultItems = document.querySelectorAll('.result');
        for (var i = 0; i < resultItems.length; i++) {
            resultItems[i].classList.remove('highlighted');
        }
        event.target.classList.add('highlighted');
    }
    //  moving the cursor in the results list
    function moveCursor(pos) {
        for (var x = 0; x < results.children.length; x++) {
            results.children[x].classList.remove('highlighted');
        }
        results.children[pos].classList.add('highlighted');
    }
    // toggling the results list on and off based on action
    function toggleResults(action) {
        if (action == 'show') {
            results.classList.add('visible');
        } else if (action == 'hide') {
            results.classList.remove('visible');
        }
    }
    // Saving the searched result on submit with date and time 
    function submitForm() {
        var searchValue = searchInput.value,
            dt = new Date(),
            time = dt.getHours() + ":" + dt.getMinutes(),
            date = dt.getUTCFullYear() + "-" + ("0" + (dt.getUTCMonth()+1)).slice(-2) + "-" +("0" + dt.getUTCDate()).slice(-2);
        //var date = dt.toLocaleString().split(',')[0];
        //var item = document.getElementsByClassName('list-item')[0].cloneNode(true);
        if (!searchValue) {
            return false;
        } else {
          saveList.classList.remove('hidden');
          var listnode =  document.createElement('li');
          listnode.classList.add('list-item');
          listnode.innerHTML =  '<span class="name">'+ searchValue + '</span>'+ 
                                   '<div class="date-time-u">'+ '<span class="date">' + date + '</span>'+ '<time>' + time  + '</time>'+ '</div>' + 
                                   '<div class="btn-u">' +'<button aria-label="delete" class="delete">'+ '</button>' + '</div>';
          saveList.appendChild(listnode)
        }
        searchInput.value = '';
        removeParent ();
        return false;
    }
    // adding an event listner on the delete button 
    function  removeParent() {
        var delbtn =saveList.lastChild.lastChild.firstChild;
            delbtn.addEventListener('click', function(event){
                this.parentNode.parentNode.remove();
                if(saveList.childNodes.length == 0)
                saveList.classList.add('hidden');
            });
        
    }


  

});
