app.models.Book = Backbone.Model.extend({
    url: function(){
        //where to fetch the data from
        return "api/book_" + this.get('id') + ".json";
    }
});