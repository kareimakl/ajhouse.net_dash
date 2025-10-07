import React from "react";
import { useGetProjectsQuery } from "../../../api/projectsApi";
import { useGetContactsQuery } from "../../../api/transactionsSlice"; // أو الملف اللي فيه الـ contacts
import { useGetCategoriesQuery } from "../../../api/categoriesApi"; // تأكد من اسم الملف الصحيح

const StatisticalCards = () => {
  // جلب البيانات من الـ APIs
  const { data: projectsData } = useGetProjectsQuery("ar");
  const { data: contactsData } = useGetContactsQuery();
  const { data: categoriesData } = useGetCategoriesQuery("ar");

  // استخراج الأرقام
  const projectsCount = projectsData?.data?.length ?? 0;
  const contactsCount = contactsData?.data?.length ?? 0;
  const categoriesCount = categoriesData?.data?.length ?? 0;

  // بيانات الكروت
  const stats = [
    {
      title: "عدد المشاريع",
      value: projectsCount,
      icon: "fa fa-briefcase",
      color: "bg-primary",
    },
    {
      title: "عدد العملاء",
      value: contactsCount,
      icon: "fa fa-user",
      color: "bg-success",
    },
    {
      title: "عدد الفئات",
      value: categoriesCount,
      icon: "fa fa-tags",
      color: "bg-warning",
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
        <div className="col-md-4 mb-4" key={idx}>
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
