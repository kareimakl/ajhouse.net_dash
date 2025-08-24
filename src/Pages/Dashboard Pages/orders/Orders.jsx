import { useEffect } from "react";
import Header from "../../../Components/Admin Components/header/Header";
import SideNav from "../../../Components/Admin Components/sideNav/SideNav";
import PageHeader from "../../../Components/Common/page header/PageHeader";
import { useGetTransactionsQuery } from "../../../api/transactionsSlice";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const { data: orders, isLoading, error, refetch } = useGetTransactionsQuery();

  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.remove("sidebar-icon-only");
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

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
              <div className="card">
                <div className="p-3">
                  <h3 className="latest_users mt-2 mb-3 text-center">
                    <i
                      className="fa fa-angle-double-left"
                      aria-hidden="true"
                    ></i>
                    كل الطلبات
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
                      <div>خطأ في تحميل الطلبات</div>
                    ) : (
                      <table className="table text-center table-hover">
                        <thead className="table-dark">
                          <tr style={{ fontWeight: "bold" }}>
                            <th>#</th>
                            <th>رقم الطلب</th>
                            <th>اسم العميل</th>
                            <th>عدد المنتجات</th>
                            <th>إجمالي السعر</th>
                            <th>حالة الدفع</th>
                            <th>حالة الطلب</th>
                            <th>تاريخ الإنشاء</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders?.map((order, index) => (
                            <tr key={order.id}>
                              <td>{index + 1}</td>
                              <td>{order.wcOrderId}</td>
                              <td>{order.customerName}</td>
                              <td>{order.itemsCount}</td>
                              <td>
                                {order.total} {order.currency}
                              </td>
                              <td>
                                {order.wcPaymentStatus === "paid" ? (
                                  <span className="badge badge-success">
                                    تم الدفع
                                  </span>
                                ) : (
                                  <span className="badge badge-warning">
                                    انتظار
                                  </span>
                                )}
                              </td>
                              <td>
                                {order.wcOrderStatus === "processing" ? (
                                  <span className="badge badge-info">
                                    قيد المعالجة
                                  </span>
                                ) : order.wcOrderStatus === "completed" ? (
                                  <span className="badge badge-success">
                                    مكتمل
                                  </span>
                                ) : (
                                  <span className="badge badge-warning">
                                    انتظار
                                  </span>
                                )}
                              </td>
                              <td>
                                {new Date(order.createdAt).toLocaleString(
                                  "ar-EG"
                                )}
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
