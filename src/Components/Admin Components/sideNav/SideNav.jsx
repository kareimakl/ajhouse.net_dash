import { Link, NavLink} from "react-router-dom";
import "./sideNav.css";

const SideNav = ({ isSidebarOpen }) => {

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
                  src="/assets/images/logo-camion.png"
                  alt="logo"
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
          <li className="nav-item">
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
          </li>

          {/* Affiliate Marketing */}
          <li className="nav-item">
            <Link
              className="nav-link justify-content-between"
              data-bs-toggle="collapse"
              to="#affiliate"
              aria-expanded="false"
              aria-controls="affiliate"
            >
              <div>
                <i className="fa fa-random" aria-hidden="true"></i>
                <span className="menu-title fw-bold">التسويق بالعمولة</span>
              </div>
              <i className="menu-arrow me-3" />
            </Link>

            <div className="collapse" id="affiliate">
              <ul className="nav flex-column sub-menu">
                {/* Coupons */}
                <li className="nav-item">
                  <span className="menu-sub-title px-3 mt-2 fw-bold text-muted">
                    الكوبونات
                  </span>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/admin/coupons"
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active text-danger" : ""}`
                    }
                  >
                    <span className="dot me-2">•</span> كل كوبون
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/admin/active-coupons"
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active text-danger" : ""}`
                    }
                  >
                    <span className="dot me-2">•</span> المفعلة
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/admin/pending-coupons"
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active text-danger" : ""}`
                    }
                  >
                    <span className="dot me-2">•</span> بانتظار الموافقة
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/admin/rejected-coupons"
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active text-danger" : ""}`
                    }
                  >
                    <span className="dot me-2">•</span> المرفوضة
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/admin/add-coupon"
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active text-danger" : ""}`
                    }
                  >
                    <span className="dot me-2">•</span> إضافة كوبون
                  </NavLink>
                </li>

                {/* Affiliates */}
                <li className="nav-item mt-3">
                  <span className="menu-sub-title px-3 mt-2 fw-bold text-muted">
                    المسوقين
                  </span>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/admin/active-affiliates"
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active text-danger" : ""}`
                    }
                  >
                    <span className="dot me-2">•</span> المسوقين الفعليين
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/admin/pending-affiliates"
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active text-danger" : ""}`
                    }
                  >
                    <span className="dot me-2">•</span> بانتظار الموافقة
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/admin/rejected-affiliates"
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active text-danger" : ""}`
                    }
                  >
                    <span className="dot me-2">•</span> المسوقين المرفوضين
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/admin/add-affiliate"
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active text-danger" : ""}`
                    }
                  >
                    <span className="dot me-2">•</span> إضافة مسوق
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>
          {/* Appearance */}
          <li className="nav-item">
            <Link to="/admin/services" className="nav-link">
              <i className="fa fa-shopping-bag" aria-hidden="true"></i>
              <span className="menu-title fw-bold">المنتجات</span>
            </Link>
          </li>

          {/* Appearance */}
          <li className="nav-item">
            <Link to="/admin/all-stores" className="nav-link">
              <i className="fa fa-paint-brush" aria-hidden="true"></i>
              <span className="menu-title fw-bold">المظهر</span>
            </Link>
          </li>

          {/* Orders */}
          <li className="nav-item">
            <Link to="/admin/orders" className="nav-link">
              <i className="fa fa-envelope" aria-hidden="true"></i>
              <span className="menu-title fw-bold">الطلبات</span>
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
