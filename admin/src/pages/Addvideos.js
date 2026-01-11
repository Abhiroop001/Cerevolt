import { useState } from "react";
import { Formik } from "formik";
import Footer from "../inc/Footer";
import Sidebar from "../inc/Sidebar";
import Top from "../inc/Top";

export default function AddVideos() {
  const [msg, setMsg] = useState("");

  return (
    <div id="wrapper">
      {/* Sidebar */}
      <Sidebar />
      {/* End Sidebar */}

      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          {/* Topbar */}
          <Top />
          {/* End Topbar */}

          {/* Begin Page Content */}
          <div className="container-fluid p-6">
            <h1 className="text-3xl font-bold mb-6">Add Video</h1>

            <Formik
              initialValues={{ title: "", description: "", youtubeLink: "" }}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                try {
                  const res = await fetch("http://localhost:2000/video/add", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values)
                  });
                  const data = await res.json();
                  setMsg(data.msg);
                  resetForm();
                } catch (err) {
                  console.error(err);
                  setMsg("Failed to add video");
                }
                setSubmitting(false);
              }}
            >
              {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input
                    className="form-control"
                    type="text"
                    name="title"
                    placeholder="Video Title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  <input
                    className="form-control"
                    type="text"
                    name="youtubeLink"
                    placeholder="YouTube Link"
                    value={values.youtubeLink}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  <textarea
                    className="form-control"
                    name="description"
                    placeholder="Video Description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-indigo-500 text-white px-4 py-2 rounded"
                  >
                    Add Video
                  </button>
                  {msg && <p className="text-green-600">{msg}</p>}
                </form>
              )}
            </Formik>
          </div>
          {/* End Page Content */}
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
