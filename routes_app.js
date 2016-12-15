var express = require("express");
var Post = require("./models/post");
var router = express.Router();
var post_finder_middleware = require("./middlewares/find_post");
require('events').EventEmitter.defaultMaxListeners = Infinity;


router.get("/", function (req, res) {

    res.redirect("/app/posts")

});
router.get("/posts/new", function (req, res) {
    req.flash('err', 'no ahy problema');
    res.render("app/posts/new", {err: req.flash('err')})
});

router.all("/posts/:id*", post_finder_middleware);

router.get("/posts/:id/edit", function (req, res) {
    res.render("app/posts/edit");
});


router.route("/posts/:id")
    .get(function (req, res) {

        var fb = "div.fb-comments(data-href='http://peaceandvogue.com/?p=1764', data-numposts='10')";


        res.render("app/posts/show", {fb: fb});
    })
    .put(function (req, res) {




        res.locals.post.title = req.body.title;
        res.locals.post.description = req.body.description;
        res.locals.post.category = req.body.category;
        var fs = require('fs');
        var ext_1 = req.files.archivo.name.split(".").pop();
        var ext_2 = req.files.archivo_2.name.split(".").pop();
        var ext_3 = req.files.archivo_3.name.split(".").pop();
        var ext_4 = req.files.archivo_4.name.split(".").pop();
        var ext_5 = req.files.archivo_5.name.split(".").pop();
        var ext_6 = req.files.archivo_6.name.split(".").pop();
        res.locals.foto1= ext_1
        res.locals.foto2= ext_2
        res.locals.foto3= ext_3
        res.locals.foto4= ext_4
        res.locals.foto5= ext_5
        res.locals.foto6= ext_6
        var path = req.files.archivo.path
        var path_2 = req.files.archivo_2.path
        var path_3 = req.files.archivo_3.path
        var path_4 = req.files.archivo_4.path
        var path_5 = req.files.archivo_5.path
        var path_6 = req.files.archivo_6.path
        var newPath_1 = 'public/images/' + res.locals.post._id + '_1' + '.' + ext_1
        var newPath_2 = 'public/images/' + res.locals.post._id + '_2' + '.' + ext_2
        var newPath_3 = 'public/images/' + res.locals.post._id + '_3' + '.' + ext_3
        var newPath_4 = 'public/images/' + res.locals.post._id + '_4' + '.' + ext_4
        var newPath_5 = 'public/images/' + res.locals.post._id + '_5' + '.' + ext_5
        var newPath_6 = 'public/images/' + res.locals.post._id + '_6' + '.' + ext_6
        var is = fs.createReadStream(path)
        var is_2 = fs.createReadStream(path_2)
        var is_3 = fs.createReadStream(path_3)
        var is_4 = fs.createReadStream(path_4)
        var is_5 = fs.createReadStream(path_5)
        var is_6 = fs.createReadStream(path_6)

        var os = fs.createWriteStream(newPath_1)
        var os_2 = fs.createWriteStream(newPath_2)
        var os_3 = fs.createWriteStream(newPath_3)
        var os_4 = fs.createWriteStream(newPath_4)
        var os_5 = fs.createWriteStream(newPath_5)
        var os_6 = fs.createWriteStream(newPath_6)

        is.pipe(os)
        is.on('end', function () {
            //eliminamos el archivo temporal
            fs.unlinkSync(path)
        })
        is_2.pipe(os_2)
        is_2.on('end', function () {
            //eliminamos el archivo temporal
            fs.unlinkSync(path_2)
        })
        is_3.pipe(os_3)
        is_3.on('end', function () {
            //eliminamos el archivo temporal
            fs.unlinkSync(path_3)
        })
        is_4.pipe(os_4)
        is_4.on('end', function () {
            //eliminamos el archivo temporal
            fs.unlinkSync(path_4)
        })
        is_5.pipe(os_5)
        is_5.on('end', function () {
            //eliminamos el archivo temporal
            fs.unlinkSync(path_5)
        })
        is_6.pipe(os_6)
        is_6.on('end', function () {
            //eliminamos el archivo temporal
            fs.unlinkSync(path_6)
        })

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
        var flash = require('connect-flash');


        var fs = require('fs');
        var ext_1 = req.files.archivo.name.split(".").pop();
        var ext_2 = req.files.archivo_2.name.split(".").pop();
        var ext_3 = req.files.archivo_3.name.split(".").pop();
        var ext_4 = req.files.archivo_4.name.split(".").pop();
        var ext_5 = req.files.archivo_5.name.split(".").pop();
        var ext_6 = req.files.archivo_6.name.split(".").pop();


        var post = new Post({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            foto1: ext_1,
            foto2: ext_2,
            foto3: ext_3,
            foto4: ext_4,
            foto5: ext_5,
            foto6: ext_6

        })

        post.save(function (err, post) {
            var path = req.files.archivo.path
            var path_2 = req.files.archivo_2.path
            var path_3 = req.files.archivo_3.path
            var path_4 = req.files.archivo_4.path
            var path_5 = req.files.archivo_5.path
            var path_6 = req.files.archivo_6.path

            if (err) {
                res.redirect("/app/posts/new")
                console.log("error al guardar")
            }
            else {

                var newPath_1 = 'public/images/' + post._id + '_1' + '.' + ext_1
                var newPath_2 = 'public/images/' + post._id + '_2' + '.' + ext_2
                var newPath_3 = 'public/images/' + post._id + '_3' + '.' + ext_3
                var newPath_4 = 'public/images/' + post._id + '_4' + '.' + ext_4
                var newPath_5 = 'public/images/' + post._id + '_5' + '.' + ext_5
                var newPath_6 = 'public/images/' + post._id + '_6' + '.' + ext_6
                var is = fs.createReadStream(path)
                var is_2 = fs.createReadStream(path_2)
                var is_3 = fs.createReadStream(path_3)
                var is_4 = fs.createReadStream(path_4)
                var is_5 = fs.createReadStream(path_5)
                var is_6 = fs.createReadStream(path_6)

                var os = fs.createWriteStream(newPath_1)
                var os_2 = fs.createWriteStream(newPath_2)
                var os_3 = fs.createWriteStream(newPath_3)
                var os_4 = fs.createWriteStream(newPath_4)
                var os_5 = fs.createWriteStream(newPath_5)
                var os_6 = fs.createWriteStream(newPath_6)

                is.pipe(os)
                is.on('end', function () {
                    //eliminamos el archivo temporal
                    fs.unlinkSync(path)
                })
                is_2.pipe(os_2)
                is_2.on('end', function () {
                    //eliminamos el archivo temporal
                    fs.unlinkSync(path_2)
                })
                is_3.pipe(os_3)
                is_3.on('end', function () {
                    //eliminamos el archivo temporal
                    fs.unlinkSync(path_3)
                })
                is_4.pipe(os_4)
                is_4.on('end', function () {
                    //eliminamos el archivo temporal
                    fs.unlinkSync(path_4)
                })
                is_5.pipe(os_5)
                is_5.on('end', function () {
                    //eliminamos el archivo temporal
                    fs.unlinkSync(path_5)
                })
                is_6.pipe(os_6)
                is_6.on('end', function () {
                    //eliminamos el archivo temporal
                    fs.unlinkSync(path_6)
                })
                res.redirect("../posts/" + post._id)
                console.log(req.files.archivo.path)
            }


        })


    })


module.exports = router;
