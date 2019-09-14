
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
    it("it builds the REST endpoint with the categoryId passed in the constructor option 'catId'", function(){
        //For collection, we don't have any data (null), we only have option object
        var books = new app.models.Books(null, {catId:'categoryId' });

        expect(books.url()).to.equal("api/books_categoryId.json");
    });
});

//#3 Test View
describe("views/BookDetail",function(){
    describe("When initializing", function(){
        it("It re-renders when the model changes", function(){
            //we have two ways of testing 
            //we can test the result of rendering, this can be complex
            //or we can test that render function is being called
            var model = new app.models.Book({id:"id1"});
            //asking sinon to substitute the render function inside of the view with a new function that would be created by SInon,
            //this function will not do anything, will be empty function, so if we call this function nothing will happen but we know if this function has been called 
            //redefine, create a copy function of app.views.BookDetail, Because when we create constructor function, we are creating at prototype level
            var render = sinon.stub(app.views.BookDetail.prototype, "render");

            var view = new app.views.BookDetail({
                model:model
            });

            model.set("property", "value");
            //expect function to be called
            expect(render.called).to.be.true;
            //restore function is provided by sinon stub
            app.views.BookDetail.prototype.render.restore();

        });
    });

    describe("When rendering", function(){
        //create data to test for both cases
        var modelTemplate = {
            "volumeInfo": {
                "title": "Doing Sport Psychology",
                "authors": [
                 "Mark B. Andersen"
                ],
                //"publisher": "Human Kinetics",
                "publishedDate": "2000",
                "description": "\"\u003cp\u003eMany sport psychology texts focus on what to do — relaxation, imagery, etc. This is the first text to focus directly on the how of doing sport psychology.\u003c/p\u003e\u003cp\u003e\u003ci\u003eDoing Sport Psychology\u003c/i\u003einvolves much more than the standard techniques such as goal setting and positive self-talk. Counselors' personalities, the history of their relationships with athletes, the interaction of individual psychologists and athletes with entire teams—these factors are at least as important as the application of standard procedures. This book reveals in intimate detail the process of sport psychology at work.\u003c/p\u003e\u003cp\u003eThe text, edited by psychologist Mark B. Andersen, includes\u003cbr\u003e-details of sessions directed by professionals using a variety of models: cognitive-behavioral, rational-emotive, performance enhancement, developmental, and psychodynamic;\u003c/p\u003e\u003cp\u003e-transcripts of dialogue between counselors and athletes in many different sports, which clearly demonstrate what sport psychology sessions actually sound like; \u003c/p\u003e\u003cp\u003e-descriptive commentaries on why the psychologists chose the therapeutic path they did and what other options they might have chosen; and\u003c/p\u003e\u003cp\u003e-specifics on how a wide variety of people—including coaches, physical therapists, and other professionals who work with athletes and performers—administer sport psychology. \u003cbr\u003e\u003cb\u003ePart I,\u003c/b\u003e\"\"Getting Started,\"\" details first encounters, intake sessions, and establishment of working relationships. Removing psychological barriers to optimal performance and managing athletes' inevitable stressors are covered here. In every instance, actual session transcripts reveal how counselors related to people in specific situations.\u003c/p\u003e\u003cp\u003e\u003cb\u003ePart II,\u003c/b\u003e\"\"From the Applied Sport Psychology Canon,\"\" covers traditional topics such as goal setting, relaxation, imagery, and self-talk. But these interventions are not as easy to deliver as some texts imply. The focus here is on how such techniques are applied in real-life situations. \u003c/p\u003e\u003cp\u003e\u003cb\u003ePart III,\u003c/b\u003e\"\"Beyond Performance Enhancement: Working With and Working Through,\"\" reveals what clinical/counseling sessions with athletes really sound like. Performance-enhancing sessions often expose deeper clinical issues such as personal loss, depression, or eating disorders.\u003c/p\u003e\u003cp\u003e\u003cb\u003ePart IV,\u003c/b\u003e\"\"The Study of Service: From Supervision to Complex Delivery,\"\" deals with advanced topics. Some of the world's most experienced sport psychologists provide their insight regarding supervising others who deliver psychological services, dealing with interns, and developing long-term relationships with elite athletes. \u003c/p\u003e\u003cp\u003e\u003cb\u003ePart V,\u003c/b\u003e\"\"Branching Out: Other Practitioners, Other Settings,\"\" provides details of sessions with injured athletes, cross country runners, athletes who are retiring from professional sports, and even a musician (illustrating how sport psychology is broadly applicable to any endeavor where performance is important).\u003c/p\u003e\u003cp\u003eThis book provides powerful and revealing insights into how sport psychology is done by the people who do it best.\u003c/p\u003e\u003cp\u003eMark B. Andersen began this book for use with his own graduate students. It is the book he wishes he had when he was in graduate school. It is now available to all!\u003cbr\u003e\u003c/p\u003e\"",
                "imageLinks": {
                    "smallThumbnail": "http://books.google.co.uk/books?id=_tyFxRRpY6YC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE72awvDIIGNi6ebfjvVEDQz-yTyiFKXCkQHooJAbo8maRaPLMlXCpXWSzmxVZTyilr12edtI_6ZpTHm3dC-OVkNgM82Wo89kN_5dRzhMriEzI97iOVw&source=gbs_api",
                    "thumbnail": "http://books.google.co.uk/books?id=_tyFxRRpY6YC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72ebMqxjoxwWtUWxsbrxyqIkbjakDiT_PB3Rh40KO96BezU0av5_KnLcXWvwzIBSPXQxZX6BixdNR67V_R9TSQysX7zB_r2sZfNqEhGPLeL6bqHTSY&source=gbs_api",
                    "small": "http://books.google.co.uk/books?id=_tyFxRRpY6YC&printsec=frontcover&img=1&zoom=2&edge=curl&imgtk=AFLRE71jLXfZ52TbMhSu7ZWYx4RqR5DPBgqzanw3fVWN2TirVEdetr9xBp3KjuFQ5N3YJ1n_d7DB47YDPiHYSUXIGUTVQWkQPUiE9OyYcRWVZZSSwYqQUnc&source=gbs_api"
                }
            }    
        };
        
        it("it doesn't display the publisher if not present in the JSON data", function(){
            var model = new app.models.Book(modelTemplate);
            var view = new app.views.BookDetail({
                model:model
            });

            view.render();
            //target at <span data-id="publisher">, the return should be "empty" + - Publisher
            expect(view.$('[data-id=publisher]').html()).to.equal("- Publisher");

        });
        it("it renders the author and the publisher date", function(){
            var model = new app.models.Book(modelTemplate);
            var view = new app.views.BookDetail({
                model:model
            });

            view.render();
            //using .text since we have <em>
            expect(view.$('[data-id=published-authors]').text()).to.equal("Mark B. Andersen - 2000");

        });
    });
});

//#4 Test Router
describe("routers/Router", function(){

    var router;
    //Before each test, we can see the # URL
    beforeEach(function(){
        var MockRouter = app.routers.Router.extend({
            //return empty function
            home: sinon.spy(), 
            category: sinon.spy(),
            book: sinon.spy(),
            unknown: sinon.spy()
        });

        router = new MockRouter();
        //Backbone.history can called only once for one application
        if(Backbone.History.started !== true){
            Backbone.history.start();
        }
    });
    
    //After each test, reset # URL
    afterEach(function(){
        router.navigate(""), {trigger:true};
    });

    it('routes to home if no hash fragment is present', function(){
        router.navigate("", {trigger:true});
        expect(router.home.called).to.be.true;
    });
    it('routes to category if hash fragment contains "category/<catid>"',function(){
        router.navigate("category/categoryId", {trigger:true});
        expect(router.category.called).to.be.true;

    });
    it('routes to book if hash fragment contains "category/id/book/id"', function(){
        router.navigate("category/id/book/id", {trigger:true});
        expect(router.book.called).to.be.true;
    });
    it('routes to unkknown if has fragment is not recognized', function(){
        router.navigate("something/unknown",{trigger:true});
        expect(router.unknown.called).to.be.true;
    });
});

