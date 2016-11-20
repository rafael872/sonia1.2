var express = require("express");
var Post = require("./models/post");
var router = express.Router();
var post_finder_middleware = require("./middlewares/find_post");
require('events').EventEmitter.defaultMaxListeners = Infinity;


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
        res.locals.post.title = req.body.title;
        res.locals.post.description = req.body.description;
        res.locals.post.category = req.body.category;
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
        var fs = require('fs');
        var ext = req.files.archivo.name.split(".").pop();

        var post = new Post({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            foto1: ext
        })

        post.save(function (err, post) {
            var path = req.files.archivo.path
            if (err) {
                res.redirect("/app/post/new")
                console.log("error al guardar")
            }
            else {

                var newPath = 'public/images/' + post._id +'_1' +'.' + ext
                var is = fs.createReadStream(path)
                var os = fs.createWriteStream(newPath)
            }

            console.log(req.body.title)
            console.log(req.body.category)
            console.log(req.body.description)
            console.log(path)
            console.log(newPath)
            is.pipe(os)

            is.on('end', function () {
                //eliminamos el archivo temporal
                fs.unlinkSync(path)
            })

        })




    })


module.exports = router;
