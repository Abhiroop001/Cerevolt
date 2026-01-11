import Footer from "../inc/Footer";
import Sidebar from "../inc/Sidebar";
import Top from "../inc/Top";
import { Formik } from "formik";

function Addretreat() {
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
                <h1 className="h3 mb-4 text-gray-800">Add Retreat</h1>

                <Formik
                  initialValues={{
                    rname: "",
                    rdate: "",
                    rlocation: "",
                    ractivities: "",
                    rcost: ""
                  }}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    setTimeout(async () => {
                      var fd = new FormData();
                      fd.append("rname", values.rname);
                      fd.append("rdate", values.rdate);
                      fd.append("rlocation", values.rlocation);
                      fd.append("ractivities", values.ractivities);
                      fd.append("rcost", values.rcost);

                      var resp = await fetch(
                        "http://localhost:2000/retreat/add",
                        {
                          method: "POST",
                          body: fd
                        }
                      );

                      var data = await resp.json();
                      console.log(data);

                      resetForm();
                      setSubmitting(false);
                      alert("Retreat Added Successfully ✅");
                    }, 400);
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
                      <p>Retreat Name</p>
                      <p>
                        <input
                          className="form-control"
                          type="text"
                          name="rname"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.rname}
                        />
                      </p>

                      <p>Retreat Date</p>
                      <p>
                        <input
                          className="form-control"
                          type="text"
                          name="rdate"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.rdate}
                        />
                      </p>

                      <p>Retreat Location</p>
                      <p>
                        <input
                          className="form-control"
                          type="text"
                          name="rlocation"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.rlocation}
                        />
                      </p>

                      <p>Retreat Activities</p>
                      <p>
                        <textarea
                          className="form-control"
                          name="ractivities"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.ractivities}
                        ></textarea>
                      </p>

                      <p>Retreat Cost</p>
                      <p>
                        <input
                          className="form-control"
                          type="text"
                          name="rcost"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.rcost}
                        />
                      </p>

                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                      >
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
      </div>
    </>
  );
}

export default Addretreat;
