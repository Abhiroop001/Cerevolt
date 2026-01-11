import { NavLink } from "react-router-dom";
import CerevoltLogo from "./CerevoltLogo.jpg"; 

function Sidebar() {
  return (
    <ul className="navbar-nav bg-dark sidebar sidebar-dark accordion" id="accordionSidebar">
      {/* Sidebar - Brand */}
      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
        <div className="sidebar-brand-icon">
          <img 
            src={CerevoltLogo} 
            alt="Cerevolt Logo" 
            style={{ width: "40px", height: "40px", borderRadius: "50%" }} 
          />
        </div>
        <div className="sidebar-brand-text mx-3">Cerevolt Admin</div>
      </a>

      <hr className="sidebar-divider my-0" />

      {/* Nav Item - Dashboard */}
      <li className="nav-item">
        <NavLink className="nav-link" to="/">
          <i className="fas fa-fw fa-tachometer-alt" />
          <span>Dashboard</span>
        </NavLink>
      </li>

      <hr className="sidebar-divider" />

      {/* Components Collapse Menu */}
      <li className="nav-item">
        <a 
          className="nav-link collapsed" 
          href="#" 
          data-toggle="collapse" 
          data-target="#collapseTwo" 
          aria-expanded="true" 
          aria-controls="collapseTwo"
        >
          <i className="fas fa-fw fa-cog" />
          <span>Components</span>
        </a>
        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Custom Components:</h6>
            <NavLink className="collapse-item" to="/addproduct">Add Products</NavLink>
            <NavLink className="collapse-item" to="/listproduct">List Products</NavLink>
            <NavLink className="collapse-item" to="/addretreat">Add Retreats</NavLink>
            <NavLink className="collapse-item" to="/listretreat">List Retreats</NavLink>
            <NavLink className="collapse-item" to="/addvideos">Add Videos</NavLink>
            <NavLink className="collapse-item" to="/listvideos">List Videos</NavLink>
            <NavLink className="collapse-item" to="/adddoctor">Add Doctor</NavLink>
            <NavLink className="collapse-item" to="/listdoctor">List Doctor</NavLink>
          </div>
        </div>
      </li>

      <hr className="sidebar-divider d-none d-md-block" />

      {/* Sidebar Toggler */}
      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle" />
      </div>
    </ul>
  );
}

export default Sidebar;
