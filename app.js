(function () {
var debug = true;

function log(msg){
    if (debug){
        console.log(msg);
    }
}
    return {
        requests: {
            googleUrl: function(url){

                return {
                url: 'https://www.googleapis.com/urlshortener/v1/url',
                //contenttype: "application/json",
                dataType: 'JSON',
                type: 'POST',
                data: {longUrl:url}

            };
        }
        },
        events: {
            'app.activated': 'init',
                'click #short-it': 'shortenUrl'
        },

        init: function () {

            // Load the url form
            this.switchTo('geturl');
        },
        shortenUrl: function (event) {

            // Get the long url
            var lurl = this.$('#long-url').val();
            log(lurl);
          
            var temp = this.ajax('googleUrl',lurl);

            temp.done(function (msg) {
                
                log(msg.id)
                this.switchTo('processed', {
                  longurl: msg.longUrl,
                  shorturl: msg.id
                })

            });
            //services.notify(temp);
        }
    };

}());