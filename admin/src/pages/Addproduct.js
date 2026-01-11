import Footer from "../inc/Footer";
import Sidebar from "../inc/Sidebar";
import Top from "../inc/Top";
import { Formik } from 'formik';
import { useState } from "react";

function Addproduct() {
  let [pimg, setPimg] = useState(null);
  let [ppdf, setPpdf] = useState(null); // ✅ new state for PDF

  return (
    <>
      <div>
        <div id="wrapper">
          {/* Sidebar */}
          <Sidebar />
          {/* End of Sidebar */}
          {/* Content Wrapper */}
          <div id="content-wrapper" className="d-flex flex-column">
            {/* Main Content */}
            <div id="content">
              {/* Topbar */}
              <Top />
              {/* End of Topbar */}
              {/* Begin Page Content */}
              <div className="container-fluid">
                {/* Page Heading */}
                <h1 className="h3 mb-4 text-gray-800">Add Product</h1>

                <Formik
                  initialValues={{ pname: '', pprice: '', pdetails: '' }}
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(async () => {
                      // Create FormData
                      const fd = new FormData();
                      if (pimg) fd.append("pimg", pimg);
                      if (ppdf) fd.append("ppdf", ppdf); // ✅ append PDF
                      fd.append('pname', values.pname);
                      fd.append('pprice', values.pprice);
                      fd.append('pdetails', values.pdetails);

                      // Send POST request
                      const resp = await fetch("http://localhost:2000/product/add", {
                        method: 'POST',
                        body: fd
                      });

                      const data = await resp.json();
                      console.log(data);

                      setSubmitting(false);
                    }, 400);
                  }}
                >
                  {({
                    values,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <p>Product Name</p>
                      <p>
                        <input
                          className="form-control"
                          type="text"
                          name="pname"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.pname}
                        />
                      </p>

                      <p>Product Price</p>
                      <p>
                        <input
                          className="form-control"
                          type="text"
                          name="pprice"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.pprice}
                        />
                      </p>

                      <p>Product Image</p>
                      <p>
                        <input
                          type="file"
                          name="pimg"
                          accept="image/*"
                          onChange={(ev) => setPimg(ev.currentTarget.files[0])}
                        />
                      </p>

                      <p>Product PDF</p>
                      <p>
                        <input
                          type="file"
                          name="ppdf"
                          accept="application/pdf"
                          onChange={(ev) => setPpdf(ev.currentTarget.files[0])}
                        />
                      </p>

                      <p>Product Details</p>
                      <p>
                        <textarea
                          className="form-control"
                          name="pdetails"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.pdetails}
                        ></textarea>
                      </p>

                      <button type="submit" disabled={isSubmitting}>
                        Submit
                      </button>
                    </form>
                  )}
                </Formik>

              </div>
              {/* /.container-fluid */}
            </div>
            {/* End of Main Content */}
            {/* Footer */}
            <Footer />
            {/* End of Footer */}
          </div>
          {/* End of Content Wrapper */}
        </div>
        {/* End of Page Wrapper */}
        {/* Scroll to Top Button */}
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up" />
        </a>
        {/* Logout Modal */}
      </div>
    </>
  );
}

export default Addproduct;
