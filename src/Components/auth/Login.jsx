import { useState } from "react";
import "./auth.css";
import { useNavigate } from "react-router-dom";
import { useGetFaqsQuery } from "../../api/logo";

const Login = () => {
  const { data: logo } = useGetFaqsQuery();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.email === "info@tajhouse.net" &&
      formData.password === "tajhouse.net2025!@#$"
    ) {
      localStorage.setItem("token", "fake-token-for-dashboard");
      navigate("/");
    } else {
      setError("❌ البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }
  };

  return (
    <div className="login">
      <div className="container d-flex justify-content-center align-items-center">
        <div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="d-flex justify-content-center">
              <img
                src={logo?.path ? `${logo?.path}` : "/logo192.png"}
                alt="logo"
                style={{ width: "230px" }}
              />
            </div>

            <h3 className="text-center mt-3">مرحبًا بعودتك</h3>

            <div className="form-group mt-3">
              <label>البريد الإلكتروني</label>
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-control"
                style={{ textAlign: "left" }}
              />
            </div>

            <div className="form-group mt-3">
              <label>كلمة المرور</label>
              <input
                type="password"
                name="password"
                placeholder="أدخل كلمة المرور"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            <button className="main-btn mt-4 w-100" type="submit">
              تسجيل الدخول
            </button>

            {error && (
              <p className="text-danger text-center mt-3">{error}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
