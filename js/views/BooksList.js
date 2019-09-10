app.views.BooksList = Backbone.View.extend({
    initialize: function(options){
        this.options = options;
        //we want to wait when 
        //provide the name to listen, with change and reset event, and do render
        //https://backbonejs.org/#Events-catalog
        //"change" (model, options) — when a model's attributes have changed.
        //"reset" (collection, options) — when the collection's entire contents have been reset.
        this.listenTo(this.collection,"change reset", this.render);
    },

    render: function(){
        console.log("Bookslist:render");
        //cretae <ul>
        this.$el.html('<ul></ul>');
        //same as $('ul',this.$el) looking for ul in $el
        var $ul = this.$('ul');

        this.collection.each(function(model){
            $ul.append(
                '<li class="thumb">' +
                    '<a class="thumb-link" href="#">' +
                        '<span class="overlay"></span>'+
                            '<img src="' + model.get("volumeInfo").imageLinks.thumbnail+ '">' + 
                    '</a>'+ 
                '</li>'
            );
        });

        //convention return of Backbone
        return this;
    }
});