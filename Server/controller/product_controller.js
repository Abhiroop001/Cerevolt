var Product = require("../db/productdb");

module.exports = {
  async addproduct(req, res) {
    const objimg = req.files?.pimg;
    const objpdf = req.files?.ppdf;

    const ins = {
      pname: req.body.pname,
      pprice: req.body.pprice,
      pdetails: req.body.pdetails
    };

    if (objimg) {
      objimg.mv("./public/product_img/" + objimg.name);
      ins.pimg = objimg.name;
    }

    if (objpdf) {
      objpdf.mv("./public/product_pdf/" + objpdf.name);
      ins.ppdf = objpdf.name;
    }

    await Product.create(ins);
    res.json({ msg: "Product Added Successfully" });
  },

  async selproduct(req, res) {
    const data = await Product.find();
    res.json(data);
  },

  async delproduct(req, res) {
    const id = req.body.id;
    await Product.findByIdAndDelete(id);
    res.json({ msg: "Product Deleted" });
  },

  async editproduct(req, res) {
    const id = req.body.id;
    const data = await Product.findById(id);
    res.json(data);
  },

  async updproduct(req, res) {
    const id = req.body.id;
    const objimg = req.files?.pimg;
    const objpdf = req.files?.ppdf;

    const ins = {
      pname: req.body.pname,
      pprice: req.body.pprice,
      pdetails: req.body.pdetails
    };

    if (objimg) {
      objimg.mv("./public/product_img/" + objimg.name);
      ins.pimg = objimg.name;
    }

    if (objpdf) {
      objpdf.mv("./public/product_pdf/" + objpdf.name);
      ins.ppdf = objpdf.name;
    }

    await Product.findByIdAndUpdate(id, ins);
    res.json({ msg: "Product Updated Successfully" });
  }
};
