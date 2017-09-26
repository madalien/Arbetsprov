$(document).ready(function() {
    // initialising the easy auto complete plugin  
    var options = {
        url: function(phrase) {
            return "https://restcountries.eu/rest/v2/name/" + phrase;
        },
        getValue: "name"
    };
    $("#searchBox").easyAutocomplete(options);
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