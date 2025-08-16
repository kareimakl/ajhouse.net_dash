import React, { useEffect, useState } from "react";
import Header from "../../../Components/Admin Components/header/Header";
import SideNav from "../../../Components/Admin Components/sideNav/SideNav";
import PageHeader from "../../../Components/Common/page header/PageHeader";
import { useNavigate } from "react-router-dom";
import { useCreateBookingMutation } from "../../../api/coupons";
import Swal from "sweetalert2";

const CreateBooking = () => {
  const navigate = useNavigate();
  const [createCoupon] = useCreateBookingMutation();

  const [formData, setFormData] = useState({
    marketerName: "", // الاسم فقط للتوليد
    code: "",
    discountPercentage: "",
  });
  const [error, setError] = useState({});

  useEffect(() => {
    document.body.classList.remove("sidebar-icon-only");
  }, []);

  // توليد كود كوبون تلقائي
  const generateCouponCode = (name) => {
    if (!name) return "";
    const initials = name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toLowerCase();
    const randomNumber = Math.floor(100000 + Math.random() * 900000); // رقم 6 خانات
    return `${initials}${randomNumber}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "marketerName") {
        // توليد الكود تلقائيًا عند كتابة الاسم
        updated.code = generateCouponCode(value);
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCoupon({
        code: formData.code,
        discountPercentage: Number(formData.discountPercentage),
      }).unwrap();

      Swal.fire("تم!", "تم اضافة الكوبون بنجاح.", "success");
      navigate("/admin/coupons");
    } catch (err) {
      console.error("Failed to create coupon:", err);
      setError(err);
      Swal.fire("خطأ!", "حدث خطأ أثناء محاولة اضافة الكوبون.", "error");
    }
  };

  return (
    <div>
      <Header />
      <div className="page-body-wrapper">
        <SideNav />
        <div className="add_user_container">
          <div style={{ marginTop: "30px" }}>
            <PageHeader name="إضافة كوبون جديد" icon="fa fa-ticket" />
          </div>
          <div className="row content-wrapper">
            <div className="col-12 stretch-card content-wrapper">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">نموذج إضافة كوبون جديد</h4>
                  <p className="card-description">
                    أدخل اسم المسوّق ليتم إنشاء الكوبون تلقائيًا.
                  </p>
                  <form className="forms-sample" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label htmlFor="marketerName">اسم المسوّق</label>
                        <input
                          type="text"
                          className="form-control"
                          id="marketerName"
                          name="marketerName"
                          value={formData.marketerName}
                          onChange={handleChange}
                          placeholder="أدخل اسم المسوّق"
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="code">الكوبون (تلقائي)</label>
                        <input
                          type="text"
                          className="form-control"
                          id="code"
                          name="code"
                          value={formData.code}
                          readOnly
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="discountPercentage">نسبة الخصم</label>
                        <input
                          type="number"
                          className="form-control"
                          id="discountPercentage"
                          name="discountPercentage"
                          value={formData.discountPercentage}
                          onChange={handleChange}
                          placeholder="أدخل نسبة الخصم"
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center gap-2">
                      <button
                        type="submit"
                        className="btn btn-gradient-primary"
                      >
                        حفظ
                      </button>
                      <button
                        type="reset"
                        onClick={() => navigate("/admin/coupons")}
                        className="btn btn-gradient-danger"
                      >
                        إلغاء
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBooking;
