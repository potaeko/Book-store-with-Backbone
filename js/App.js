//loaded when DOM is ready
$(function(){

    //create from constructor in router/Router.js
    app.data.router = new app.routers.Router();

    //no varable signed since we use only once
    new app.views.TopBar({
        el:'[data-id=topbar]'
    });

    Backbone.history.start();

});

