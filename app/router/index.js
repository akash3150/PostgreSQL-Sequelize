const { createUserValidation } = require("../middleware");


module.exports = app => {
    const user = require("../controller/user/index");
    const userPics = require("../controller/userPics/index");
    var router = require("express").Router();

    router.post("/", createUserValidation, user.create);

    router.post("/user-pics", userPics.create);

    router.get("/", user.findAll);

    router.get("/:id", user.findOne);

    router.delete("/:id", user.delete);

    app.use('/api/user', router);
};  