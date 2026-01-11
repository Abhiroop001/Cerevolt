var Doctor = require("../db/doctordb");

module.exports = {
  async adddoctor(req, res) {
    try {
      const objimg = req.files?.dimg;

      const ins = {
        dname: req.body.dname,
        dqualification: req.body.dqualification,
        ddescription: req.body.ddescription
      };

      if (objimg) {
        objimg.mv("./public/doctor_img/" + objimg.name);
        ins.dimg = objimg.name;
      }

      await Doctor.create(ins);
      res.json({ msg: "Doctor Added Successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Error adding doctor" });
    }
  },

  async seldoctor(req, res) {
    const data = await Doctor.find();
    res.json(data);
  },

  async deldoctor(req, res) {
    const id = req.body.id;
    await Doctor.findByIdAndDelete(id);
    res.json({ msg: "Doctor Deleted" });
  },

  async editdoctor(req, res) {
    const id = req.body.id;
    const data = await Doctor.findById(id);
    res.json(data);
  },

  async upddoctor(req, res) {
    const id = req.body.id;
    const objimg = req.files?.dimg;

    const ins = {
      dname: req.body.dname,
      dqualification: req.body.dqualification,
      ddescription: req.body.ddescription
    };

    if (objimg) {
      objimg.mv("./public/doctor_img/" + objimg.name);
      ins.dimg = objimg.name;
    }

    await Doctor.findByIdAndUpdate(id, ins);
    res.json({ msg: "Doctor Updated Successfully" });
  }
};
