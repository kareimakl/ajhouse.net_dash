import React from "react";
import {
  useGetOrdersCompletedCountQuery,
  useGetOrdersPendingCountQuery,
  useGetAffiliateCouponsCountQuery,
  useGetUsersCountQuery,
  useGetOrdersCancelledCountQuery,
  useGetAffiliatesCountQuery,
  useGetAffiliatesPendingCountQuery,
  useGetAffiliatesRejectedCountQuery,
} from "../../../api/analysis";

const StatisticalCards = () => {
  const { data: ordersCompleted } = useGetOrdersCompletedCountQuery();
  const { data: ordersPending } = useGetOrdersPendingCountQuery();
  const { data: ordersCancle } = useGetOrdersCancelledCountQuery();
  const { data: affiliateCoupons } = useGetAffiliateCouponsCountQuery();
  const { data: usersCount } = useGetUsersCountQuery();
  const { data: affiliatesCount } = useGetAffiliatesCountQuery();
  const { data: affiliatesPending } = useGetAffiliatesPendingCountQuery();
  const { data: affiliatesRejected } = useGetAffiliatesRejectedCountQuery();

  const stats = [
    {
      title: "الطلبات المكتملة",
      value: ordersCompleted ?? "0",
      icon: "fa fa-check-circle",
      color: "bg-primary",
    },
    {
      title: "الطلبات المعلقة",
      value: ordersPending ?? "0",
      icon: "fa fa-hourglass-half",
      color: "bg-info",
    },
    {
      title: "الطلبات الملغاة",
      value: ordersCancle ?? "0",
      icon: "fa fa-times-circle",
      color: "bg-info",
    },
    {
      title: "كوبونات المسوقين",
      value: affiliateCoupons ?? "0",
      icon: "fa fa-ticket",
      color: "bg-success",
    },
    {
      title: "عدد المستخدمين",
      value: usersCount ?? "0",
      icon: "fa fa-users",
      color: "bg-warning",
    },
    {
      title: "عدد المسوقين",
      value: affiliatesCount ?? "0",
      icon: "fa fa-users",
      color: "bg-danger",
    },
    {
      title: "مسوقين معلقين",
      value: affiliatesPending ?? "0",
      icon: "fa fa-hourglass-half",
      color: "bg-secondary",
    },
    {
      title: "مسوقين مرفوضين",
      value: affiliatesRejected ?? "0",
      icon: "fa fa-times-circle",
      color: "bg-dark",
    },
  ];

  return (
    <div
      className="row"
      style={{
        marginTop: "5rem",
        height: "minContent",
        width: "90%",
        marginInline: "auto",
      }}
    >
      {stats.map((stat, idx) => (
        <div className="col-md-3 mb-4" key={idx}>
          <div className="card border-0 shadow">
            <div className="card-body text-center">
              <div
                className={`rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 ${stat.color}`}
                style={{ width: "60px", height: "60px" }}
              >
                <i className={`${stat.icon} text-white fs-4`}></i>
              </div>
              <h6 className="fw-bold text-secondary">{stat.title}</h6>
              <h3 className="fw-bold">{stat.value}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatisticalCards;
