app.models.Books = Backbone.Collection.extend({
    //receive options from .Router constructor function in Router.js
    initialize: function(models, options){
        this.options = options;
    },

    //we are using function() for local api data insteaed of API URL
    url: function(){
        //same path in our api file
        return 'api/books_' + this.options.catId + '.json';
    }
});