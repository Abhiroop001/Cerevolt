const express = require("express");
const router = express.Router();
const vc = require("../controller/video_controller");

// Admin routes
router.post("/add", vc.addVideo);
router.get("/list", vc.listVideos);
router.post("/delete", vc.deleteVideo);
router.post("/edit", vc.editVideo);
router.post("/update", vc.updateVideo);

module.exports = router;
