app.routers.Router = Backbone.Router.extend({
    routes:{
        'category/:id/book/:bookId':'book',  //#category/<something>/book/<something>
        'category/:id':'category',          //#category/<something>
        '': 'home',                         //Home page
        '*default':'unknown'               //other unknown routes
    },

    home: function(){
        console.log("Home");
    },
    category: function(id) {
        console.log("category " + id);

        //Create a model to fetch data
        //provide null for model , option object with  {catId: id}
        //initialize in Backbone.Collection will receive the same parameter
        app.data.books = new app.models.Books(null, {catId:id});

        //test call url() funcion in .Collection,Books.js 
        console.log(app.data.books.url());

        //Clean up View
        this._cleanupCurrentView();

        //Create a view object to display
        app.data.currentView = new app.views.BooksList({
            //provide property name to view
            collection: app.data.books
        });

        //call funciton to display book-list
        this._activateBookListPanel();

        //append $el of the view, it will be empty until view listenTo change "collection"
        //the moment we created the View, if we don't provide $el, Backbone create HTML element for us as <div>
        $('[data-id=books-list]').empty().append(app.data.currentView.$el);

        //fetch the data, fetch will trigger the loading data from the server, when the data ready and comeback
        //collection property provided in .View, will emit reset event and render
        //the moment we call fetch, the data is retrived and the View render inself into the HTML element

        //reset: true, notify only when after the entire collection has been fetched from the server 
        // include reset: true in the options and fetch will call reset to replace the collection's contents with the fetched models:
        app.data.books.fetch({reset:true});

    },
    book: function(id, bookId) {
        console.log("book " + bookId + " for categories " + id);
    },

    unknown: function() {
        console.log("Unknown route....");
    },


    //Function add class="is-visible" to display 

    _activateBookListPanel: function(selector){
        //remove class is-visible if presented in one of the children
        $('[data-id="books-wrapper"] .is-visible').removeClass('is-visible');
        $('[data-id=books-list]').addClass('is-visible');
    },

    _activateBookDetailPanel: function(selector){
        //remove class is-visible if presented in one of the children
        $('[data-id="books-wrapper"]' .is-visible).removeClass('is-visible');
        $('[data-id=book-detail]').addClass('is-visible');
    },

    //Clean up view
    _cleanupCurrentView: function(){
        if(app.data.currentView) {
            //remove $el from the view
            app.data.currentView.remove();
            //declare we are not using the property anymore
            app.data.currentView = null;
        }
    }

});
//==============================================
//              Boiler plate
//==============================================
// //constructor function
// app.routers.Router = Backbone.Router.extend({
//     routes:{
//         'category/:id/book/:bookId':'book',  //#category/<something>/book/<something>
//         'category/:id':'category',          //#category/<something>
//         '': 'home',                         //Home page
//         '*default':'unknown'               //other unknown routes
//     },

//     home: function(){
//         console.log("Home");
//     },
//     category: function(id) {
//         console.log("category " + id);
//     },
//     book: function(id, bookId) {
//         console.log("book " + bookId + " for categories " + id);
//     },

//     unknown: function() {
//         console.log("Unknown route....");
//     }
// });