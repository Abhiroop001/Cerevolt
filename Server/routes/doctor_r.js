const exp = require("express");
const router = exp.Router();

const dc = require("../controller/doctor_controller");

router.post("/add", dc.adddoctor);
router.get("/sel", dc.seldoctor);
router.post("/del", dc.deldoctor);
router.post("/edit", dc.editdoctor);
router.post("/upd", dc.upddoctor);

module.exports = router;
