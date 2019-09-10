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

    //Book-list
    category: function(id) {
        console.log("category " + id);

        //Create a model from Booklist.js
        //provide null for model , option object with  {catId:id}, we want to save category id as catId
        //initialize in Backbone.Collection will receive the same parameter
        //tell the model to catch catId from URL and pass as :id for category route
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

    //Book-detail
    book: function(id, bookId) {
        //check if we get the right URL path from .View
        console.log("book " + bookId + " for categories " + id);
        //create new model from Book.js
        // //tell the model to catch id from URL and pass as :bookId for book route
        app.data.book = new app.models.Book({ id: bookId});
        //clean up the area
        this._cleanupCurrentView();
        //create new view fo rendering
        app.data.currentView = new app.views.BookDetail({
            //Provide the model to View
            model: app.data.book
        });
        //make the book-detail visible
        this._activateBookDetailPanel();
        $('[data-id=book-detail]').empty().append(app.data.currentView.$el);

        app.data.book.fetch();
    },

    unknown: function() {
        console.log("Unknown route....");
    },


    //Function add class="is-visible" to display 

    _activateBookListPanel: function(){
        //remove class is-visible if presented in one of the children
        $('[data-id="books-wrapper"] .is-visible').removeClass('is-visible');
        $('[data-id=books-list]').addClass('is-visible');
    },

    _activateBookDetailPanel: function(){
        //remove class is-visible if presented in one of the children
        $('[data-id="books-wrapper"] .is-visible').removeClass('is-visible');
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