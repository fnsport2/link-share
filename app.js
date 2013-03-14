(function () {

    /*
        This app uses the google urlshortner api to, shorten urls, and display them in the Zendeks sidebar.
        Google Url shortner Reference: http://goo.gl/xwCNC

        Author: Felix Nance
    */

    /* Google API key
       This api key is currently for this project only, and restricted to my current domain. To use this app
       you will need to insert your own api key through google.
       See: https://developers.google.com/console/help/#generatingdevkeys
       As of writting this the courtesy limit is 1,000,000 requests/day
    */

    var goapiKey = '';

    // Debug mode: log console messages.
    var debug = true;

    // Use a list to store short urls.
    var urllist = [];

    // Found this wrapper method somewhere on the internet thank you.
    function log(msg){
        if (debug){
            console.log(msg);
        }
    }

    return {
        requests: {

            // Make a request to Google's short url api
            googleUrl: function(url){

                return {
                    url: 'https://www.googleapis.com/urlshortener/v1/url',
                    dataType: 'JSON',
                    type: 'POST',
                    data: {longUrl:url,key:goapiKey}
                };
            }

        },

        events: {
            // Once the app is activated do the init.
            'app.activated': 'init',

            // On the button click do shortenUrl.
            'click #short-it': 'shortenUrl',

            'googleUrl.done': function(msg){

                // Get the title if any.
                var title = this.$('#title').val();
                log('Succeded: '+ msg.id);

                // Add the url to the end of the list.
                urllist.push({
                    title: title,
                    shorturl: msg.id
                });

                // Update the template with the urls.
                this.switchTo('processed', {
                    urls: urllist
                })

            },

            'googleUrl.fail':function(msg){
                log('Request failed check params.');
                services.notify('Request has failed.');
            }
        },

        init: function () {

            // Load the url submit form.
            log("Loading the geturl template.");
        },

        shortenUrl: function (event) {

            // Get the long url from the input box.
            var lurl = this.$('#long-url').val();
            log("The url grabbed: " + lurl);
            
            // Need to encode the long url
            var elurl = encodeURIComponent(lurl);
            log("Safely encoded url: "+ elurl);

            // Make the request to Google shorturl api
            this.ajax('googleUrl',elurl);

        }
    };

}());