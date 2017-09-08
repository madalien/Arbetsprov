$(document).ready(function() {
    // initializing  the auto complete plugin and calling the animal.json file. 
    var xhr;
    new autoComplete({
        selector: 'input[name="searchBox"]',
        minChars: 2,
        source: function(term, response) {
            try { xhr.abort(); } catch (e) {}
            xhr = $.getJSON('https://gist.githubusercontent.com/madalien/404e604f3bb1075d6421264bcbd71248/raw/ef4ec19854c3d6cd72c5468d745fa9adfe1ecd95/states_hash.json', { q: term }, function(data) { response(data); });
        }
    });

    // Saving the search box results.

    $('#save').click(

        function() {
            // Date and time formating. 
            var dt = new Date();
            var time = dt.getHours() + ":" + dt.getMinutes();
            var date = dt.toLocaleString().split(',')[0];
            var toSave = $('#searchBox').val();
            if (toSave != 0) {
                $('.o-results').append('<li>' + '<span class="item-title">' + toSave + '</span>' + '<span class="item-date">' + time + "  " + date + '</span>' + '<button class="del-btn"><svg><use xlink:href="#delete"></svg></button>' + '</li>');
                $('.del-btn').click(function() {
                    $(this).parent().remove();
                });
                $('#searchBox').val('');
            };
        });







});