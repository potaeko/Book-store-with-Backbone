//loaded when DOM is ready
$(function(){

//create from constructor in router/Router.js
app.data.router = new app.routers.Router();

Backbone.history.start();

});

