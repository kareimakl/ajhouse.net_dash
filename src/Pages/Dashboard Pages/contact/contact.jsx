import { useEffect } from "react";
import Swal from "sweetalert2";
import Header from "../../../Components/Admin Components/header/Header";
import SideNav from "../../../Components/Admin Components/sideNav/SideNav";
import PageHeader from "../../../Components/Common/page header/PageHeader";
import {
  useGetContactsQuery,
  useDeleteContactMutation,
  useUpdateContactStatusMutation,
} from "../../../api/transactionsSlice";

const Orders = () => {
  const { data, isLoading, error, refetch } = useGetContactsQuery();
  const contacts = data?.data || [];
  const [deleteContact] = useDeleteContactMutation();
  const [updateStatus] = useUpdateContactStatusMutation();

  useEffect(() => {
    document.body.classList.remove("sidebar-icon-only");
  }, []);

  const handleShowDetails = (contact) => {
    Swal.fire({
      title: `<strong>تفاصيل الطلب</strong>`,
      html: `
        <div style="text-align:right; direction:rtl;">
          <p><b>الاسم:</b> ${contact.name}</p>
          <p><b>البريد الإلكتروني:</b> ${contact.email}</p>
          <p><b>رقم الهاتف:</b> ${contact.phone}</p>
          <p><b>الخدمة المطلوبة:</b> ${contact.requestedService}</p>
          <p><b>الملاحظات:</b> ${contact.notes}</p>
          <p><b>الحالة:</b> ${contact.status}</p>
          <p><b>تاريخ الإنشاء:</b> ${new Date(contact.createdAt).toLocaleString(
            "ar-EG"
          )}</p>
        </div>
      `,
      confirmButtonText: "إغلاق",
      confirmButtonColor: "#3085d6",
      width: 600,
    });
  };

  const handleUpdateStatus = async (contact) => {
    const { value: status } = await Swal.fire({
      title: "تغيير حالة الطلب",
      input: "select",
      inputOptions: {
        pending: "قيد المراجعة",
        "in-progress": "جاري المعالجة",
        completed: "تم الرد",
        cancelled: "تم الإلغاء",
      },
      inputPlaceholder: "اختر الحالة الجديدة",
      showCancelButton: true,
      confirmButtonText: "تحديث",
      cancelButtonText: "إلغاء",
    });

    if (status) {
      try {
        await updateStatus({
          id: contact._id,
          body: { status, isRead: true },
        }).unwrap();

        Swal.fire({
          title: "تم التحديث!",
          text: "تم تغيير الحالة بنجاح.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        refetch();
      } catch (error) {
        Swal.fire({
          title: "خطأ!",
          text: "حدث خطأ أثناء تحديث الحالة.",
          icon: "error",
        });
      }
    }
  };

  // ✅ حذف الاتصال
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "هل أنت متأكد؟",
      text: "لن تتمكن من استعادة هذا السجل بعد الحذف!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "نعم، احذف",
      cancelButtonText: "إلغاء",
    });

    if (result.isConfirmed) {
      try {
        await deleteContact(id).unwrap();
        refetch();
        Swal.fire({
          title: "تم الحذف!",
          text: "تم حذف السجل بنجاح.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch {
        Swal.fire({
          title: "حدث خطأ!",
          text: "تعذر حذف السجل، حاول مرة أخرى.",
          icon: "error",
        });
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="page-body-wrapper">
        <SideNav />
        <div className="add_user_container">
          <div style={{ marginTop: "30px" }}>
            <PageHeader name="طلبات التواصل" icon="fa fa-address-book" />
          </div>

          <div className="row content-wrapper">
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="p-3">
                  <h3 className="latest_users mt-2 mb-3 text-center">
                    <i
                      className="fa fa-angle-double-left"
                      aria-hidden="true"
                    ></i>
                    جميع طلبات التواصل
                    <i
                      className="fa fa-angle-double-right"
                      aria-hidden="true"
                    ></i>
                    <hr />
                  </h3>

                  <div className="table-responsive">
                    {isLoading ? (
                      <div className="center-loader">
                        <div className="loader"></div>
                      </div>
                    ) : error ? (
                      <div>خطأ في تحميل البيانات</div>
                    ) : contacts.length === 0 ? (
                      <div className="text-center">لا توجد بيانات متاحة</div>
                    ) : (
                      <table className="table text-center table-hover">
                        <thead className="table-dark">
                          <tr style={{ fontWeight: "bold" }}>
                            <th>#</th>
                            <th>الاسم</th>
                            <th>البريد الإلكتروني</th>
                            <th>رقم الهاتف</th>
                            <th>الخدمة المطلوبة</th>
                            <th>الحالة</th>
                            <th>الإجراءات</th>
                          </tr>
                        </thead>
                        <tbody>
                          {contacts.map((contact, index) => (
                            <tr key={contact._id}>
                              <td>{index + 1}</td>
                              <td>{contact.name}</td>
                              <td>{contact.email}</td>
                              <td>{contact.phone}</td>
                              <td>{contact.requestedService}</td>
                              <td>
                                <span
                                  className={`badge ${
                                    contact.status === "completed"
                                      ? "bg-success"
                                      : contact.status === "in-progress"
                                      ? "bg-warning text-dark"
                                      : contact.status === "cancelled"
                                      ? "bg-danger"
                                      : "bg-secondary"
                                  }`}
                                >
                                  {contact.status}
                                </span>
                              </td>
                              <td>
                                <i
                                  className="fa fa-eye text-primary mx-2"
                                  style={{ cursor: "pointer" }}
                                  title="عرض التفاصيل"
                                  onClick={() => handleShowDetails(contact)}
                                ></i>
                                <i
                                  className="fa fa-edit text-success mx-2"
                                  style={{ cursor: "pointer" }}
                                  title="تحديث الحالة"
                                  onClick={() => handleUpdateStatus(contact)}
                                ></i>
                                <i
                                  className="fa fa-trash text-danger"
                                  style={{ cursor: "pointer" }}
                                  title="حذف"
                                  onClick={() => handleDelete(contact._id)}
                                ></i>
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

export default Orders;
