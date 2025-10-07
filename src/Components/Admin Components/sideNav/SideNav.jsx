import { Link, NavLink } from "react-router-dom";
import "./sideNav.css";
import { useCreateFaqMutation, useGetFaqsQuery } from "../../../api/logo";
const SideNav = ({ isSidebarOpen }) => {
  const { data: logo, refetch } = useGetFaqsQuery();
  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <div>
      <nav
        className={isSidebarOpen ? "sidebar" : "hidden sidebar"}
        id="sidebar"
      >
        <ul className="nav">
          {/* Logo */}
          <li className="nav-item nav-profile mt-2">
            <NavLink className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
              <Link className="navbar-brand brand-logo" to="#">
                <img
                  src="/assets/images/logotaj.png"
                  alt="Company Logo"
                  style={{
                    width: "100%",
                    margin: "10px auto",
                    height: "100px",
                    objectFit: "contain",
                  }}
                />
              </Link>
            </NavLink>
          </li>

          {/* Dashboard */}
          <li className="nav-item">
            <Link
              className="nav-link justify-content-between"
              data-bs-toggle="collapse"
              to="#dashboard"
              aria-expanded="false"
              aria-controls="dashboard"
            >
              <div>
                <i
                  className="fa fa-globe"
                  aria-hidden="true"
                  // onClick={() => navigate("/admin/dashboard")}
                ></i>
                <span className="menu-title fw-bold">لوحة التحكم</span>
              </div>
              <i className="menu-arrow me-3" />
            </Link>
            <div className="collapse" id="dashboard">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/dashboard">
                    الإحصائيات
                  </NavLink>
                </li>
                {/* <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/orders">
                    آخر الطلبات
                  </NavLink>
                </li> */}
              </ul>
            </div>
          </li>

          {/* Users */}
          {/* <li className="nav-item">
            <Link
              className="nav-link justify-content-between"
              data-bs-toggle="collapse"
              to="#users"
              aria-expanded="false"
              aria-controls="users"
            >
              <div>
                <i className="fa fa-users" aria-hidden="true"></i>
                <span className="menu-title fw-bold">المستخدمين</span>
              </div>
              <i className="menu-arrow me-3" />
            </Link>
            <div className="collapse" id="users">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/all-users">
                    جميع المستخدمين
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/add-user">
                    إضافة مستخدم
                  </NavLink>
                </li>
              </ul>
            </div>
          </li> */}

          {/* Affiliate Marketing */}

          {/* Appearance */}
          {/* <li className="nav-item">
            <Link to="/admin/services" className="nav-link">
              <i className="fa fa-shopping-bag" aria-hidden="true"></i>
              <span className="menu-title fw-bold">المنتجات</span>
            </Link>
          </li> */}

          {/* Appearance */}

          <li className="nav-item">
            <Link
              className="nav-link justify-content-between"
              data-bs-toggle="collapse"
              to="#styles"
              aria-expanded="false"
              aria-controls="users"
            >
              <div>
                <i className="fa fa-paint-brush" aria-hidden="true"></i>
                <span className="menu-title fw-bold">مشروع جديد </span>
              </div>
              <i className="menu-arrow me-3" />
            </Link>
            <div className="collapse" id="styles">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/all_projects">
                    جميع المشاريع
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/all_Categories">
                    جميع التصنيفات
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>

          {/* Orders */}
          <li className="nav-item">
            <Link to="/admin/contact-form" className="nav-link">
              <i className="fa fa-envelope" aria-hidden="true"></i>
              <span className="menu-title fw-bold">طلبات التواصل </span>
            </Link>
          </li>

          {/* Logout */}
          <li className="nav-item" onClick={handleLogout}>
            <Link className="nav-link" to="/login">
              <i className="fa fa-sign-out" aria-hidden="true" />
              <span className="menu-title fw-bold">تسجيل الخروج</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideNav;
