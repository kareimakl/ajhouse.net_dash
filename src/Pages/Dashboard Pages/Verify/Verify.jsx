"use client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyCodePage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load email and phone from localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPhone = localStorage.getItem("phone");

    if (!savedEmail || !savedPhone) {
      navigate("/login"); // redirect if missing
    } else {
      setEmail(savedEmail);
      setPhone(savedPhone);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      email,
      phone,
      code,
    };

    try {
      const res = await fetch(
        "http://api-gateway.camion-app.com/users/auth/verify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Verification failed");

      // On success: redirect to dashboard
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "450px", width: "100%" }}
      >
        {/* Logo */}
        <div className="text-center mb-4">
          <img
            src="/assets/images/apple-icon.png"
            alt="Logo"
            style={{ width: "160px" }}
            className="img-fluid"
          />
        </div>

        {/* Heading */}
        <h3 className="text-center fw-bold mb-2">تأكيد الرمز</h3>
        <p className="text-center text-muted mb-4">
          أدخل رمز التحقق المكون من 6 أرقام المُرسل إلى بريدك:
          <br />
          <span className="text-primary fw-semibold">{email}</span>
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="code" className="form-label text-end w-100">
              رمز التحقق
            </label>
            <input
              type="text"
              className="form-control text-center fs-4"
              id="code"
              maxLength={6}
              placeholder="123456"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="alert alert-danger text-center py-2">{error}</div>
          )}

          <button
            type="submit"
            className="btn main-btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "جارٍ التحقق..." : "تأكيد"}
          </button>
        </form>

        {/* Resend */}
        <div className="text-center mt-4">
          <small className="text-muted">
            لم يصلك الرمز؟{" "}
            <button
              type="button"
              className="btn  btn-link p-0 m-0 align-baseline"
              onClick={() => alert("سيتم إرسال الرمز مجددًا لاحقًا")}
            >
              إعادة الإرسال
            </button>
          </small>
        </div>
      </div>
    </div>
  );
}
