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

  const [affiliates, setAffiliates] = useState([]);
  const [formData, setFormData] = useState({
    affiliateId: "",
    marketerName: "",
    code: "",
    discountPercentage: "",
    commissionPercentage: "",
  });
  const [error, setError] = useState({});

  useEffect(() => {
    document.body.classList.remove("sidebar-icon-only");

    const fetchAffiliates = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "https://api-gateway.camion-app.com/affiliates/all",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, 
            },
          }
        );

        const data = await res.json();
        console.log("Affiliates API data:", data);

        if (Array.isArray(data)) {
          setAffiliates(data);
        } else {
          setAffiliates([]);
        }
      } catch (err) {
        console.error("Failed to load affiliates:", err);
        setAffiliates([]);
      }
    };

    fetchAffiliates();
  }, []);

  const generateCouponCode = (name) => {
    if (!name) return "";
    const initials = name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toLowerCase();
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    return `${initials}${randomNumber}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      if (name === "affiliateId") {
        const selectedAffiliate = affiliates.find((a) => a.id === value);
        if (selectedAffiliate) {
          updated.marketerName = selectedAffiliate.fullName;
          updated.code = generateCouponCode(selectedAffiliate.fullName);
        }
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCoupon({
        affiliateId: formData.affiliateId,
        code: formData.code,
        discountPercentage: Number(formData.discountPercentage),
        commissionPercentage: Number(formData.commissionPercentage),
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
                  <form className="forms-sample" onSubmit={handleSubmit}>
                    <div className="row">
                      {/* select affiliate */}
                      <div className="form-group col-md-6">
                        <label htmlFor="affiliateId">اختر المسوّق</label>
                        <select
                          className="form-control"
                          id="affiliateId"
                          name="affiliateId"
                          value={formData.affiliateId}
                          onChange={handleChange}
                        >
                          <option value="">-- اختر --</option>
                          {Array.isArray(affiliates) &&
                            affiliates.map((affiliate) => (
                              <option key={affiliate.id} value={affiliate.id}>
                                {affiliate.fullName}
                              </option>
                            ))}
                        </select>
                      </div>

                      {/* auto code */}
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

                      {/* discount */}
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

                      {/* commission */}
                      <div className="form-group col-md-6">
                        <label htmlFor="commissionPercentage">
                          نسبة العمولة
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="commissionPercentage"
                          name="commissionPercentage"
                          value={formData.commissionPercentage}
                          onChange={handleChange}
                          placeholder="أدخل نسبة العمولة"
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
