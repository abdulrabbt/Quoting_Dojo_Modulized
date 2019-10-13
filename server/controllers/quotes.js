var mongoose = require("mongoose");
var Quote = mongoose.model("Quote");
var moment = require("moment");

module.exports = {

    index: function(req, res){
        res.render("index");
    },

    quotePage: function(req, res){
        Quote.find({}, function(err, quotes) {
            if(err){
                console.log("Error DB request!");
            }
            else {
                res.render("quotes", {info: quotes, moment: moment});
            }
        }).sort({_id:-1});
    },

    addQuote: function(req, res){
        console.log("Request Data", req.body);
        var quote = new Quote({name: req.body.name, quote: req.body.quote});
        quote.save(function(error){
            if(error){
                console.log(error);
                for(var key in error.errors){
                    req.flash("quoteform", error.errors[key].message);
                }
                res.redirect("/");
            }
            else{
                console.log("Successfully added a quote");
                res.redirect("/quotes");
            }
        })
    }
}