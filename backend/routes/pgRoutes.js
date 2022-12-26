const router = require("express").Router();
const PG = require("../models/pg");
const upload = require("../controller/multer");

router.get("/:location", (req, res) => {
    // console.log(req.query.gender);
    PG.find({
        location: req.params.location.toLowerCase(),
        available: true,
    })
        .then((result) => {
            console.log(result);
            if (result.length == 0) {
                return res
                    .status(200)
                    .json({ message: "No PG found right now" });
            } else {
                return res.status(200).json({ result: result });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: true,
                message: "Internal Server Error",
            });
        });
});

// Single room details
router.get("/getRoom/:id", (req, res) => {
    // console.log(req.params.id);
    PG.find({ _id: req.params.id }).then((result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(200).json({ message: "PG not find!" });
        }
    });
});

router.post("/uploadpgimage", upload.array("files", 5), (req, res) => {
    let fileNames = [];
    req.files.forEach((elements) => {
        fileNames.push(elements.filename);
    });
    PG.updateOne(
        { _id: req.body.roomId },
        {
            $set: {
                images: fileNames,
            },
        }
    ).then((result) => {
        if (result) {
            res.send("200");
        }
    });
});

router.post("/uploadpg", (req, res) => {
    const pg = new PG({
        ownerId: req.body.ownerId,
        name: req.body.name,
        gender: req.body.gender,
        price: req.body.price,
        roomType: req.body.roomType,
        available: true,
        fulladdress: req.body.fulladdress,
        location: req.body.location.toLowerCase(),
        image: [],
    });
    pg.save()
        .then((result) => {
            res.status(201).json({
                message: "PG Created",
                result: result,
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
            });
        });
});

router.put("/editpg/:id", (req, res) => {
    console.log(req.params.id);
    const pg = new PG({
        _id: req.body._id,
        ownerId: req.body.ownerId,
        name: req.body.name,
        gender: req.body.gender,
        price: req.body.price,
        roomType: req.body.roomType,
        location: req.body.location,
        available: req.body.available,
        fulladdress: req.body.fulladdress,
        images: req.body.images,
    });
    PG.updateOne({ _id: req.params.id }, pg)
        .then((result) => {
            console.log(result);
            res.status(200).json({
                message: "Update PG Successful!",
                resukt: result,
            });
        })
        .catch((err) => {
            res.status(500).json({ err: err });
        });
});

// get all rooms booked by a single user
router.get("/getRooms/:id", (req, res) => {
    // console.log(req.params.id);
    PG.find({ ownerId: req.params.id }).then((result) => {
        if (result) {
            res.status(200).json({ result, message: "PGs Found" });
        } else {
            res.status(200).json({ message: "No PGs registered!" });
        }
    });
});

module.exports = router;
