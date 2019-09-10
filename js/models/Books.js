app.models.Books = Backbone.Collection.extend({

    //receive options from .Router constructor function in Router.js
    initialize: function(models, options){
        //pass catId as from URL as :id, options from Router.js 
        this.options = options;

        //save the category:id
        this.catId = this.options.catId;
    },

    //we are using function() for local api data insteaed of API URL
    url: function(){
        //where to fecth the data from
        //use the catId to match same path in our api file
        return 'api/books_' + this.options.catId + '.json';
    }
});