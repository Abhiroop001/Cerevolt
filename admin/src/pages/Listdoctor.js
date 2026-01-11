import Footer from "../inc/Footer";
import Sidebar from "../inc/Sidebar";
import Top from "../inc/Top";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Listdoctor() {
  let [doctors, setDoctors] = useState([]);

  async function getdata() {
    var resp = await fetch("http://localhost:2000/doctor/sel");
    var data = await resp.json();
    setDoctors(data);
  }

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Top />
          <div className="container-fluid">
            <h1 className="h3 mb-4 text-gray-800">List Doctors</h1>

            <table className="table">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Qualification</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((d) => (
                  <tr key={d._id}>
                    <td>
                      <img
                        src={"http://localhost:2000/doctor_img/" + d.dimg}
                        alt="doctor"
                        width="80"
                        height="80"
                        style={{ objectFit: "cover", borderRadius: "10px" }}
                      />
                    </td>
                    <td>{d.dname}</td>
                    <td>{d.dqualification}</td>
                    <td>{d.ddescription}</td>
                    <td>
                      <button
                        onClick={async () => {
                          var fd = new FormData();
                          fd.append("id", d._id);
                          var resp = await fetch(
                            "http://localhost:2000/doctor/del",
                            {
                              method: "POST",
                              body: fd
                            }
                          );
                          var data = await resp.json();
                          alert(data.msg);
                          getdata();
                        }}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                      &nbsp;
                      <Link
                        to={`/editdoctor/${d._id}`}
                        className="btn btn-success btn-sm"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Listdoctor;
