
//#1 Test URL create for book url
describe("models/Book", function(){

    //When
    describe("When building a new model", function(){
        //Then
        it("it builds the REST endpoint URL using the ID property", function(){
            //create by constructor function in our Book.js
            var book = new app.models.Book({id:'ID'});

            //the URL should now be :api/book_ID.json
            expect(book.url()).to.equal("api/book_ID.json");
        });
    });
    
});

//#2 Test URL create for books url
describe("models/Books", function(){
    it("it builds the REST endpoint with( the categoryId passed in the constructor option 'catId'", function(){
        //For collection, we don't have any data (null), we only have option object
        var books = new app.models.Books(null, {catId:'categoryId' });

        expect(books.url()).to.equal("api/books_categoryId.json");
    });
});


