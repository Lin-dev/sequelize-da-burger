var express = require("express");

var router = express.Router();

var db = require("../models/burger.js");

router.get("/", function(req, res) {
    res.redirect("/burgers");
});

router.get("/burgers", function(req, res) {
    db.Burger.findAll({}).then(function(allBurgers) {
        var hbsObject = {
            burgers: allBurgers
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/burgers/create", function(req, res) {
    db.Burger.create({
        burger_name: req.body.burgerName
    }).then(function() {
        res.redirect("/burgers");
    });
});

router.put("/burgers/update/:id", function(req, res) {
    db.Burger.update({
        devoured: req.body.devoured
    }, {
        where: {
            id: req.params.id
        }
    }).then(function() {
        res.redirect("/burgers");
    });
});

router.delete("/burgers/delete/:id", function(req, res) {
    db.Burger.destroy({
        where: {
            id: req.params.id
        }
    }).then(function() {
        res.redirect("/burgers");
    });
});

module.exports = router;

