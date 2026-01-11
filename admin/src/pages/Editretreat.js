import Footer from "../inc/Footer";
import Sidebar from "../inc/Sidebar";
import Top from "../inc/Top";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Editretreat() {
  const param = useParams();
  const navi = useNavigate();

  let [date, setDate] = useState("");
  let [location, setLocation] = useState("");
  let [activities, setActivities] = useState("");
  let [cost, setCost] = useState("");

  async function getedit() {
    if (param.id != null) {
      var fd = new FormData();
      fd.append("id", param.id);
      var resp = await fetch("http://localhost:2000/retreat/edit", {
        method: "POST",
        body: fd,
      });
      var data = await resp.json();

      setDate(data.date);
      setLocation(data.location);
      setActivities(data.activities);
      setCost(data.cost);
    }
  }

  useEffect(() => {
    getedit();
  }, []);

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
                <h1 className="h3 mb-4 text-gray-800">Edit Retreat</h1>

                <Formik
                  enableReinitialize
                  initialValues={{
                    date: date,
                    location: location,
                    activities: activities,
                    cost: cost,
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(async () => {
                      var fd = new FormData();
                      fd.append("id", param.id);
                      fd.append("date", values.date);
                      fd.append("location", values.location);
                      fd.append("activities", values.activities);
                      fd.append("cost", values.cost);

                      var resp = await fetch(
                        "http://localhost:2000/retreat/upd",
                        {
                          method: "POST",
                          body: fd,
                        }
                      );
                      var data = await resp.json();
                      navi("/listretreat");
                      setSubmitting(false);
                    }, 400);
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <p>Date</p>
                      <p>
                        <input
                          className="form-control"
                          type="date"
                          name="date"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          defaultValue={date}
                        />
                      </p>

                      <p>Location</p>
                      <p>
                        <input
                          className="form-control"
                          type="text"
                          name="location"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          defaultValue={location}
                        />
                      </p>

                      <p>Activities</p>
                      <p>
                        <textarea
                          className="form-control"
                          name="activities"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          defaultValue={activities}
                        ></textarea>
                      </p>

                      <p>Cost</p>
                      <p>
                        <input
                          className="form-control"
                          type="number"
                          name="cost"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          defaultValue={cost}
                        />
                      </p>

                      <button
                        className="btn btn-success"
                        type="submit"
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

        {/* Scroll to Top Button*/}
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up" />
        </a>
      </div>
    </>
  );
}

export default Editretreat;
