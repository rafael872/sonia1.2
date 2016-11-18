var express = require("express");
var Post = require("./models/post");
var router = express.Router();
var post_finder_middleware = require("./middlewares/find_post");
require('events').EventEmitter.defaultMaxListeners = Infinity;
var mv = require("mv");

router.get("/", function (req, res) {

    res.redirect("/app/posts")

});
router.get("/posts/new", function (req, res) {
    res.render("app/posts/new")
});

router.all("/posts/:id*", post_finder_middleware);

router.get("/posts/:id/edit", function (req, res) {
    res.render("app/posts/edit");
});


router.route("/posts/:id")
    .get(function (req, res) {
        res.render("app/posts/show");
    })
    .put(function (req, res) {
        res.locals.post.title = req.fields.title;
        res.locals.post.description = req.fields.description;
        res.locals.post.category = req.fields.category;
        res.locals.post.save(function (err) {
            if (!err) {
                res.render("app/posts/show");
            } else {
                res.render("app/posts/" + req.params.id + "/edit");
            }
        })
    })
    .delete(function (req, res) {

        Post.findOneAndRemove({_id: req.params.id}, function (err) {
            if (!err) {
                res.redirect("/app/posts");
            } else {
                console.log(err);
                res.redirect("/app/posts" + req.params.id)
            }
        })
    });

router.route("/posts")
    .get(function (req, res) {
        Post.find({}, function (err, posts) {
            if (err) {
                res.redirect("/app");
                return;
            }
            res.render("app/posts/posts", {post: posts})
        }).sort({date: "desc"})
    })
    .post(function (req, res) {
        var extension = req.files.archivo.name.split(".").pop();
        var data = {
            title: req.fields.title,
            description: req.fields.description,
            category: req.fields.category,
            foto1: extension
        };
        var post = new Post(data);

        post.save().then(function (us) {
            mv(req.files.archivo.path, "public/images/" + post._id + "_1." + extension, function (err) {
                if (err) {
                    throw err;
                }
                console.log("Fichero copiado correctamente...");
                res.redirect("/app/posts/" + post._id)
            }),
                function (err) {
                res.redirect("/app/posts/new", {err: err});
                console.log("falta un campo")
                console.log(req.fields.title)
                console.log(req.fields.description)
                console.log(req.fields.category)
            }

            /* user.save().then(function (us) {
             res.send("Guardamos exitosamente")

             }), function (err) {
             console.log(String(err));

             }*/

        });
    })


        module.exports = router;
