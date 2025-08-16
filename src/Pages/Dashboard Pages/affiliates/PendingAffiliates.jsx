import { useEffect } from "react";
import Header from "../../../Components/Admin Components/header/Header";
import SideNav from "../../../Components/Admin Components/sideNav/SideNav";
import PageHeader from "../../../Components/Common/page header/PageHeader";
import {
  useGetBookingsQuery,
  useDeleteBookingMutation,
  useCreateBookingMutation,
} from "../../../api/bookingSlice";
import Swal from "sweetalert2";

const PendingCoupons = () => {
  const { data: users = [], isLoading, error, refetch } = useGetBookingsQuery();
  const [deleteBooking] = useDeleteBookingMutation();
  const [updateStatus] = useCreateBookingMutation();

  useEffect(() => {
    document.body.classList.remove("sidebar-icon-only");
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "لن تتمكن من التراجع عن هذا!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم، احذفها!",
      cancelButtonText: "إلغاء",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteBooking(id).unwrap();
          refetch();
          Swal.fire("تم الحذف!", "تم حذف الحجز بنجاح.", "success");
        } catch (error) {
          Swal.fire("خطأ!", "حدث خطأ أثناء محاولة حذف الحجز.", "error");
        }
      }
    });
  };

  const handleApprove = async (user) => {
    const { value: status } = await Swal.fire({
      title: "تغيير الحالة",
      input: "select",
      inputOptions: {
        pending: "انتظار",
        approved: "مفعل",
      },
      inputValue: user.status,
      showCancelButton: true,
      confirmButtonText: "تحديث",
      cancelButtonText: "إلغاء",
    });

    if (status) {
      try {
        await updateStatus({
          affiliateId: user.id,
          status: status,
        }).unwrap();
        Swal.fire("تم التحديث!", "تم تغيير حالة المسوق.", "success");
        refetch();
      } catch (err) {
        Swal.fire("خطأ!", "حدث خطأ أثناء التحديث.", "error");
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
            <PageHeader name="الطلبات" icon="fa fa-cogs" />
          </div>
          <div className="row content-wrapper">
            <div className="col-12 grid-margin">
              <div className="card p-3">
                {isLoading ? (
                  <div className="text-center">جارٍ التحميل...</div>
                ) : error ? (
                  <div className="text-danger">فشل في تحميل طلبات </div>
                ) : (
                  <table className="table text-center table-hover">
                    <thead className="table-dark">
                      <tr style={{ fontWeight: "bold" }}>
                        <th>#</th>
                        <th>الاسم الكامل</th>
                        <th>الجنس</th>
                        <th>الجنسية</th>
                        <th>الحالة</th>
                        <th>إجراء</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="text-center text-muted">
                            لا يوجد بيانات
                          </td>
                        </tr>
                      ) : (
                        users.map((user, index) => (
                          <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.fullName}</td>
                            <td>{user.gender}</td>
                            <td>{user.nationality}</td>
                            <td>
                              <span
                                className={`badge ${
                                  user.status === "approved"
                                    ? "badge-gradient-success"
                                    : user.status === "pending"
                                    ? "badge-gradient-warning"
                                    : "badge-gradient-danger"
                                }`}
                              >
                                {user.status === "approved"
                                  ? "مفعل"
                                  : user.status === "pending"
                                  ? "انتظار"
                                  : "مرفوض"}
                              </span>
                            </td>
                            <td>
                              <button
                                className="btn text-success"
                                onClick={() => handleApprove(user)}
                                title="تغيير الحالة"
                              >
                                <i className="fa fa-edit"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingCoupons;
