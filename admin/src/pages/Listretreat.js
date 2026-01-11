import Footer from "../inc/Footer";
import Sidebar from "../inc/Sidebar";
import Top from "../inc/Top";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Listretreat() {
  async function getdata() {
    var resp = await fetch("http://localhost:2000/retreat/sel");
    var data = await resp.json();
    setRetreats(data);
  }

  useEffect(() => {
    getdata();
  }, []);

  let [retreats, setRetreats] = useState([]);

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
                <h1 className="h3 mb-4 text-gray-800">List Retreats</h1>

                <table className="table">
                  <thead>
                    <tr>
                      <th>Retreat Name</th>
                      <th>Date</th>
                      <th>Location</th>
                      <th>Activities</th>
                      <th>Cost</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {retreats.map((r) => (
                      <tr key={r._id}>
                        <td>{r.rname}</td>
                        <td>{r.rdate}</td>
                        <td>{r.rlocation}</td>
                        <td>{r.ractivities}</td>
                        <td>{r.rcost}</td>

                        <td>
                          <button
                            onClick={async () => {
                              var fd = new FormData();
                              fd.append("id", r._id);
                              var resp = await fetch(
                                "http://localhost:2000/retreat/del",
                                {
                                  method: "POST",
                                  body: fd
                                }
                              );
                              var data = await resp.json();
                              console.log(data);
                              getdata();
                            }}
                            className="btn btn-danger me-2"
                          >
                            Delete
                          </button>

                          <Link
                            to={`/editretreat/${r._id}`}
                            className="btn btn-success"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

export default Listretreat;
