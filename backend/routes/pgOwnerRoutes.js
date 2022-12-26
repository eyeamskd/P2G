const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/pgOwner");
const Pg = require("../models/pg");
const jwt = require("jsonwebtoken");

router.post("/signup", (req, res) => {
    // console.log("called");
    bcrypt.hash(req.body.password, 10).then((hash) => {
        let userId;
        const user = new User({
            name: req.body.name,
            phoneNo: req.body.phoneNo,
            email: req.body.email,
            password: hash,
            address: req.body.address,
        });
        user.save()
            .then((result) => {
                userId = result._id.toString();
                const pg = new Pg({
                    ownerId: userId,
                    name: req.body.pgName,
                    gender: req.body.pgGender,
                    price: req.body.pgPrice,
                    roomType: req.body.pgRoomType,
                    fulladdress: req.body.pgFullAddress,
                    available: true,
                    location: req.body.pgLocation,
                });
                pg.save().then((result) => {
                    res.status(201).json({
                        message: "User Created!",
                        result: result,
                    });
                });
            })
            .catch((err) => {
                res.status(500).json({
                    error: err,
                });
            });
    });
});

router.post("/login", (req, res) => {
    let fetchedUser;

    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                // invalid credentials
                return res.status(401).json({
                    token: "error",
                    expiresIn: "error",
                    message: "Invalid Credentials",
                });
            }
            fetchedUser = user;

            return bcrypt.compare(req.body.password, user.password);
        })
        .then((result) => {
            if (!result) {
                // Invalid Credentials
                return res.status(401).json({
                    token: "error",
                    expiresIn: "error",
                    message: "Invalid Credentials",
                });
            }
            // console.log(result);
            const token = jwt.sign(
                {
                    email: fetchedUser.email,
                    userId: fetchedUser._id,
                },
                "this-is-the-secret-key",
                { expiresIn: "1h" }
            );
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                userId: fetchedUser._id,
                message: "Logged in Successfully",
            });
        })
        .catch((err) => {
            return res.status(401).json({
                message: "Auth failed",
            });
        });
});

router.get("/getUser/:id", (req, res, next) => {
    User.findById(req.params.id).then((user) => {
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(200).json({ message: "User not found!" });
        }
    });
});

router.put("/editUser/:id", (req, res) => {
    console.log(req.params.id);
    const user = new User({
        _id: req.body._id,
        name: req.body.name,
        phoneNo: req.body.phoneNo,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
    });
    User.updateOne({ _id: req.params.id }, user)
        .then((result) => {
            console.log(result);
            res.status(200).json({ message: "Update user Successful!" });
        })
        .catch((err) => {
            res.status(500).json({ err: err });
        });
});

module.exports = router;
