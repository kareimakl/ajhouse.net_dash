import React, { useState } from "react";
import "./addUser.css";
import Header from "../../../Components/Admin Components/header/Header";
import SideNav from "../../../Components/Admin Components/sideNav/SideNav";
import PageHeader from "../../../Components/Common/page header/PageHeader";
import { useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../../../api/users";
const AddUser = () => {
  const navigate = useNavigate();
  const [createUser] = useCreateUserMutation();

  const [error] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    fullName: "",
    role: "",
    gender: "",
    nationality: "",
    country: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Header />
      <div className="page-body-wrapper">
        <SideNav />
        <div className="add_user_container">
          <div style={{ marginTop: "30px" }}>
            <PageHeader name="اضافة مستخدم" icon="fa fa-plus" />
          </div>
          <div className="col-12 grid-margin stretch-card content-wrapper">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">
                  <i className="mdi mdi-account-plus"></i> نموذج اضافة مستخدم
                  جديد
                </h4>
                <p className="card-description">
                  {" "}
                  الرجاء ملء الحقول التالية والتاكد من صحة البيانات قبل التاكيد{" "}
                </p>
                <form
                  className="forms-sample"
                  onSubmit={async (e) => {
                    e.preventDefault();

                    try {
                      const userToCreate = {
                        fullName: formData.fullName,
                        email: formData.email,
                        phone: formData.phone,
                        role: formData.role,
                        gender: formData.gender || "male", // أو اعملها dropdown لاحقًا
                        nationality: formData.nationality || "egypt",
                        country: formData.country || "egypt",
                      };

                      await createUser(userToCreate).unwrap();
                      navigate("/admin/all-users");
                    } catch (err) {
                      console.error("فشل في إنشاء المستخدم", err);
                    }
                  }}
                >
                  <div className="form-group col-sm-12">
                    <div className="row">
                      <div className="col-sm-6">
                        <label htmlFor="exampleInputName1">الاسم</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="ادخل الاسم"
                          value={formData.fullName}
                          onChange={handleChange}
                          name="fullName"
                        />
                        {error && <p className="text-danger">{error.name}</p>}
                      </div>
                      <div className="col-sm-6">
                        <label htmlFor="exampleInputName1">الهاتف</label>
                        <input
                          type="number"
                          className="form-control"
                          id="exampleInputName1"
                          placeholder="ادخل الهاتف"
                          value={formData.phone}
                          onChange={handleChange}
                          name="phone"
                        />
                        {error && <p className="text-danger">{error.phone}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="form-group col-sm-12">
                    <div className="row">
                      <div className="col-sm-6">
                        <label htmlFor="exampleInputEmail3">
                          البريد الالكتروني
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="exampleInputEmail3"
                          placeholder="ex: tech.minds@gmail.com"
                          value={formData.email}
                          onChange={handleChange}
                          name="email"
                          dir="ltr"
                        />

                        {error && <p className="text-danger">{error.email}</p>}
                      </div>
                      <div className="col-sm-6">
                        <label htmlFor="exampleInputName1"> اختر الدور </label>
                        <select
                          dir="rtl"
                          className="form-control form-select ps-4"
                          value={formData?.role}
                          onChange={handleChange}
                          name="role"
                        >
                          <option value="" disabled selected>
                            اختر الدور
                          </option>
                          <option value="admin">مدير</option>
                          <option value="Marketer">مسوق</option>
                          <option value="clinet">مشتري </option>
                        </select>
                        {error && <p className="text-danger">{error.role}</p>}
                      </div>
                    </div>
                  </div>
                  <div className="form-group col-sm-12">
                    <div className="row">
                      <div className="col-sm-6">
                        <label>الجنس</label>
                        <select
                          className="form-control"
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                        >
                          <option value="" disabled selected>
                            اختر الجنس
                          </option>
                          <option value="male">ذكر</option>
                          <option value="female">أنثى</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="form-group col-sm-12">
                    <div className="row">
                      <div className="col-sm-6">
                        <label>الجنسية</label>
                        <input
                          className="form-control"
                          name="nationality"
                          value={formData.nationality}
                          onChange={handleChange}
                          placeholder="مثال: Egypt"
                        />
                      </div>

                      <div className="col-sm-6">
                        <label>الدولة</label>
                        <input
                          className="form-control"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          placeholder="مثال: Egypt"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-center gap-2">
                    <button
                      type="submit"
                      className="btn btn-gradient-primary me-2"
                    >
                      {"انشاء"}
                    </button>
                    <button
                      onClick={() => navigate("/admin/all-users")}
                      className="btn btn-gradient-danger"
                      type="button"
                    >
                      الغاء
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddUser;
