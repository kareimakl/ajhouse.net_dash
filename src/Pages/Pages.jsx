import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Components/auth/Login";
import Dashboard from "./Dashboard Pages/dashboard/Dashboard";
import Protected from "../Components/Common/Protected";
import AddUser from "../Pages/Dashboard Pages/Add User/AddUser";
import AllUsers from "./Dashboard Pages/all users/AllUsers";
import AllStores from "./Dashboard Pages/all_projects/AllStores";
import AllCategories from "./Dashboard Pages/all_categories/AllSliders";
import AllOffers from "./Dashboard Pages/all_offers/AllOffers";
import Messages from "./Dashboard Pages/messages/Messages";
import Orders from "./Dashboard Pages/contact/contact";
import Coupons from "./Dashboard Pages/coupons/Coupons";
import ActiveCoupon from "./Dashboard Pages/coupons/ActiveCoupon";
import PendingCoupons from "./Dashboard Pages/coupons/PendingCoupons";
import RejectedCoupons from "./Dashboard Pages/coupons/RejectedCoupons";
import AddCoupon from "./Dashboard Pages/coupons/AddCoupon";
import EditCoupon from "./Dashboard Pages/coupons/EditCoupon";
import Affiliates from "./Dashboard Pages/affiliates/Affiliates";
import ActiveAffiliates from "./Dashboard Pages/affiliates/ActiveAffiliates";
import PendingAffiliates from "./Dashboard Pages/affiliates/PendingAffiliates";
import RejectedAffiliates from "./Dashboard Pages/affiliates/RejectedAffiliates";
import AddAffiliates from "./Dashboard Pages/affiliates/AddAffiliates";
import EditAffiliates from "./Dashboard Pages/affiliates/EditAffiliates";
import ProtectedRoute from "../Components/protectedRoute/ProtectedRoute";

import Logo from "./Dashboard Pages/logo/Logo";
const pages = () => {
  return (
    <div className="pages">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Protected Cmp={Login} />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-user"
            element={
              <ProtectedRoute>
                <AddUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/all-users"
            element={
              <ProtectedRoute>
                <AllUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/all_projects"
            element={
              <ProtectedRoute>
                <AllStores />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/all_categories"
            element={
              <ProtectedRoute>
                <AllCategories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/all-offers"
            element={
              <ProtectedRoute>
                <AllOffers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/logo"
            element={
              <ProtectedRoute>
                <Logo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/messages"
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/contact-form"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/coupons"
            element={
              <ProtectedRoute>
                <Coupons />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/edit-coupon/:id"
            element={
              <ProtectedRoute>
                <EditCoupon />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-coupon"
            element={
              <ProtectedRoute>
                <AddCoupon />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/active-coupons"
            element={
              <ProtectedRoute>
                <ActiveCoupon />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/pending-coupons"
            element={
              <ProtectedRoute>
                <PendingCoupons />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/rejected-coupons"
            element={
              <ProtectedRoute>
                <RejectedCoupons />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/affiliates"
            element={
              <ProtectedRoute>
                <Affiliates />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/edit-affiliates/:id"
            element={
              <ProtectedRoute>
                <EditAffiliates />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-affiliate"
            element={
              <ProtectedRoute>
                <AddAffiliates />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/active-affiliate"
            element={
              <ProtectedRoute>
                <ActiveAffiliates />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/pending-affiliates"
            element={
              <ProtectedRoute>
                <PendingAffiliates />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/rejected-affiliate"
            element={
              <ProtectedRoute>
                <RejectedAffiliates />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default pages;
