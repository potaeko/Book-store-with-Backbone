app.views.BookDetail = Backbone.View.extend({
    initialize: function(){
        //listenTo this model and run render when change
        this.listenTo(this.model, "change",  this.render);
    },

    render: function(){
        var info = this.model.get("volumeInfo");
        //json file properties 
        var images = info.imageLinks;
        //publisher might be Nan
        var publisher = "";

        if(info.publisher) {
            publisher = info.publisher + ' - Publisher';
        }

        this.$el.html(
            '<header class="book-header l-content l-content-constrained l-row">' +

                '<div class="l-column thumb-image">' +
                    '<img src=" ' + (images.small|| images.thumbnail) + ' ">' +
                '</div>'+

                '<div class="l-column l-pad">' +
                    '<div class="title">' + info.title + '</div>' +

                    '<div>' + 
                    (info.authors ? '<em>' + info.authors.join(" - ") + '</em> - ' : "" + info.publishedDate) + '<br>' +
                         publisher + ' - Publisher'+
                    '</div>'+
                '</div>' +
            '</header>' +
           
            '<div class="book-content l-content l-content-constrained standout">' +
                '<h1 class="title">Description</h1>' +
                '<p>' + info.description +'</p>' +
            '</div>'
        );

        return this;
    }
});