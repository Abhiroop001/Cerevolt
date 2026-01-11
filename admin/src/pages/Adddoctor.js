import Footer from "../inc/Footer";
import Sidebar from "../inc/Sidebar";
import Top from "../inc/Top";
import { Formik } from "formik";
import { useState } from "react";

function Adddoctor() {
  let [dimg, setDimg] = useState(null);

  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Top />
          <div className="container-fluid">
            <h1 className="h3 mb-4 text-gray-800">Add Doctor</h1>

            <Formik
              initialValues={{
                dname: "",
                dqualification: "",
                ddescription: ""
              }}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                const fd = new FormData();
                if (dimg) fd.append("dimg", dimg);
                fd.append("dname", values.dname);
                fd.append("dqualification", values.dqualification);
                fd.append("ddescription", values.ddescription);

                const resp = await fetch("http://localhost:2000/doctor/add", {
                  method: "POST",
                  body: fd
                });

                const data = await resp.json();
                alert(data.msg);

                resetForm();
                setDimg(null);
                setSubmitting(false);
              }}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
              }) => (
                <form onSubmit={handleSubmit}>
                  <p>Doctor Name</p>
                  <p>
                    <input
                      className="form-control"
                      type="text"
                      name="dname"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.dname}
                    />
                  </p>

                  <p>Qualification</p>
                  <p>
                    <input
                      className="form-control"
                      type="text"
                      name="dqualification"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.dqualification}
                    />
                  </p>

                  <p>Doctor Image</p>
                  <p>
                    <input
                      type="file"
                      name="dimg"
                      accept="image/*"
                      onChange={(ev) => setDimg(ev.currentTarget.files[0])}
                    />
                  </p>

                  <p>Description</p>
                  <p>
                    <textarea
                      className="form-control"
                      name="ddescription"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.ddescription}
                    ></textarea>
                  </p>

                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Adddoctor;
