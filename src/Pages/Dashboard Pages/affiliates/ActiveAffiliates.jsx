import React, { useEffect } from "react";
import Header from "../../../Components/Admin Components/header/Header";
import SideNav from "../../../Components/Admin Components/sideNav/SideNav";
import PageHeader from "../../../Components/Common/page header/PageHeader";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../../../api/users";
import Swal from "sweetalert2";

const AllUsers = () => {
  const { data: users = [], error, isLoading } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  useEffect(() => {
    document.body.classList.remove("sidebar-icon-only");
  }, []);

  return (
    <div>
      <Header />
      <div className="page-body-wrapper">
        <SideNav />
        <div className="add_user_container">
          <div style={{ marginTop: "30px" }}>
            <PageHeader name="كل المسوقين " icon="fa fa-users" />
          </div>
          <div className="row content-wrapper">
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="p-3">
                  <h3 className="latest_users mt-2 mb-3 text-center">
                    <i className="fa fa-angle-double-left"></i>
                    كل المسوقين 
                    <i className="fa fa-angle-double-right"></i>
                    <hr />
                  </h3>

                  <div className="table-responsive">
                    {isLoading ? (
                      <div className="text-center">جارٍ التحميل...</div>
                    ) : error ? (
                      <div className="text-danger">فشل في تحميل المسوقين </div>
                    ) : (
                      <table className="table text-center table-hover">
                        <thead className="table-dark">
                          <tr>
                            <th>#</th>
                            <th>الاسم</th>
                            <th>البريد الإلكتروني</th>
                            <th>الهاتف</th>
                            <th>الدور</th>
                            <th>الحالة</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users
                            .filter((user) => user.role === "affiliate") // عرض المسوقين فقط
                            .map((user, index) => (
                              <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.fullName}</td>
                                <td>{user.email}</td>
                                <td>{user.phone || "N/A"}</td>
                                <td>
                                  <span
                                    className={`badge ${
                                      user.role === "admin"
                                        ? "badge-gradient-success"
                                        : user.role === "affiliate"
                                        ? "badge-gradient-warning"
                                        : "badge-gradient-danger"
                                    }`}
                                  >
                                    {user.role === "admin"
                                      ? "أدمن"
                                      : user.role === "affiliate"
                                      ? "مسوق"
                                      : "مستخدم"}
                                  </span>
                                </td>
                                <td>
                                  <span
                                    className={`badge ${
                                      user.isActive
                                        ? "badge-gradient-success"
                                        : "badge-gradient-danger"
                                    }`}
                                  >
                                    {user.isActive ? "نشط" : "غير نشط"}
                                  </span>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
