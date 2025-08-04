import React, { useEffect} from "react";
import Header from "../../../Components/Admin Components/header/Header";
import SideNav from "../../../Components/Admin Components/sideNav/SideNav";
import PageHeader from "../../../Components/Common/page header/PageHeader";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../../../api/users"; // assuming path is correct
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
            <PageHeader name="كل المستخدمين" icon="fa fa-users" />
          </div>
          <div className="row content-wrapper">
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="p-3">
                  <h3 className="latest_users mt-2 mb-3 text-center">
                    <i className="fa fa-angle-double-left"></i>
                    كل المستخدمين
                    <i className="fa fa-angle-double-right"></i>
                    <hr />
                  </h3>

                  <div className="table-responsive">
                    {isLoading ? (
                      <div className="text-center">جارٍ التحميل...</div>
                    ) : error ? (
                      <div className="text-danger">فشل في تحميل المستخدمين</div>
                    ) : (
                      <table className="table text-center table-hover">
                        <thead className="table-dark">
                          <tr>
                            <th>#</th>
                            <th>الاسم</th>
                            <th>البريد الإلكتروني</th>
                            <th>الدور</th>
                            <th>الهاتف</th>
                            <th>الحالة</th>
                            <th>إجراء</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user, index) => (
                            <tr key={user.id}>
                              <td>{index + 1}</td>
                              <td>{user.fullName}</td>
                              <td>{user.email}</td>
                              <td>
                                <span
                                  className={`badge ${
                                    user.role === "admin"
                                      ? "badge-gradient-success"
                                      : user.role === "teacher"
                                      ? "badge-gradient-warning"
                                      : "badge-gradient-danger"
                                  }`}
                                >
                                  {user.role === "admin"
                                    ? "أدمن"
                                    : user.role === "teacher"
                                    ? "معلم"
                                    : "مستخدم"}
                                </span>
                              </td>
                              <td>{user.phone || "N/A"}</td>
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
                              <td>
                                <button
                                  onClick={() =>
                                    Swal.fire({
                                      title: "تفاصيل المستخدم",
                                      html: `
        <p><strong>الاسم:</strong> ${user.fullName}</p>
        <p><strong>البريد:</strong> ${user.email}</p>
        <p><strong>الدور:</strong> ${
          user.role === "admin"
            ? "أدمن"
            : user.role === "teacher"
            ? "معلم"
            : "مستخدم"
        }</p>
        <p><strong>الهاتف:</strong> ${user.phone || "غير متوفر"}</p>
        <p><strong>الحالة:</strong> ${user.isActive ? "نشط" : "غير نشط"}</p>
      `,
                                      confirmButtonText: "إغلاق",
                                    })
                                  }
                                  className="btn"
                                  title="عرض"
                                >
                                  <i className="fa fa-eye" />
                                </button>

                                <button
                                  onClick={() => {
                                    Swal.fire({
                                      title: "تعديل المستخدم",
                                      html: `
        <input type="text" id="name" class="swal2-input" value="${user.fullName}" placeholder="الاسم"/>
        <input type="email" id="email" class="swal2-input" value="${user.email}" placeholder="البريد"/>
      `,
                                      confirmButtonText: "حفظ",
                                      preConfirm: () => {
                                        const fullName =
                                          document.getElementById("name").value;
                                        const email =
                                          document.getElementById(
                                            "email"
                                          ).value;

                                        if (!fullName || !email) {
                                          Swal.showValidationMessage(
                                            "الرجاء إدخال الاسم والبريد الإلكتروني"
                                          );
                                          return false;
                                        }

                                        return { fullName, email };
                                      },
                                    }).then((result) => {
                                      if (result.isConfirmed && result.value) {
                                        const updatedData = {
                                          id: user.id,
                                          fullName: result.value.fullName,
                                          email: result.value.email,
                                        };

                                        updateUser(updatedData)
                                          .unwrap()
                                          .then(() => {
                                            Swal.fire(
                                              "تم التحديث!",
                                              "تم تعديل بيانات المستخدم.",
                                              "success"
                                            );
                                          })
                                          .catch((error) => {
                                            Swal.fire(
                                              "خطأ!",
                                              "حدث خطأ أثناء التعديل.",
                                              "error"
                                            );
                                            console.error(error);
                                          });
                                      }
                                    });
                                  }}
                                  className="btn text-success"
                                  title="تعديل"
                                >
                                  <i className="fa fa-edit" />
                                </button>

                                <button
                                  onClick={() => {
                                    Swal.fire({
                                      title: "هل أنت متأكد؟",
                                      text: "لن يمكنك التراجع عن هذا الإجراء!",
                                      icon: "warning",
                                      showCancelButton: true,
                                      confirmButtonColor: "#d33",
                                      cancelButtonColor: "#3085d6",
                                      confirmButtonText: "نعم، احذف!",
                                      cancelButtonText: "إلغاء",
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        deleteUser(user.id)
                                          .unwrap()
                                          .then(() => {
                                            Swal.fire(
                                              "تم الحذف!",
                                              "تم حذف المستخدم بنجاح.",
                                              "success"
                                            );
                                          })
                                          .catch((error) => {
                                            Swal.fire(
                                              "خطأ!",
                                              "حدث خطأ أثناء الحذف.",
                                              "error"
                                            );
                                            console.error(error);
                                          });
                                      }
                                    });
                                  }}
                                  className="btn text-danger"
                                  title="حذف"
                                >
                                  <i className="fa fa-trash" />
                                </button>
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
