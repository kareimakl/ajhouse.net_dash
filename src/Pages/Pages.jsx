import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Components/auth/Login";
import Dashboard from "./Dashboard Pages/dashboard/Dashboard";
import Protected from "../Components/Common/Protected";
import AddUser from "../Pages/Dashboard Pages/Add User/AddUser";
import AllUsers from "./Dashboard Pages/all users/AllUsers";
import AllStores from "./Dashboard Pages/all_stores/AllStores";
import AllOffers from "./Dashboard Pages/all_offers/AllOffers";
import AllSliders from "./Dashboard Pages/all_sliders/AllSliders";
import Services from "./Dashboard Pages/services/Services";
import AddService from "./Dashboard Pages/services/AddService";
import Messages from "./Dashboard Pages/messages/Messages";
import Orders from "./Dashboard Pages/orders/Orders";
import AddOrders from "./Dashboard Pages/orders/AddOrder";
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
import Transactions from "./Dashboard Pages/transactions/Transactions";
import ProtectedRoute from "../Components/protectedRoute/ProtectedRoute";
import EditService from "./Dashboard Pages/services/EditService";
import EditOrders from "./Dashboard Pages/orders/EditOrder";
import Faqs from "./Dashboard Pages/faqs/Faqs";
import AddFaq from "./Dashboard Pages/faqs/AddFaq";
import EditFaq from "./Dashboard Pages/faqs/EditFaq";
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

          {/* <Route
            path="/auth/verify"
            element={ 
              <ProtectedRoute>
                <Verify />
              </ProtectedRoute>
            }
          /> */}

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
            path="/admin/all-stores"
            element={
              <ProtectedRoute>
                <AllStores />
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
            path="/admin/all-sliders"
            element={
              <ProtectedRoute>
                <AllSliders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/services"
            element={
              <ProtectedRoute>
                <Services />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-service"
            element={
              <ProtectedRoute>
                <AddService />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/edit-service/:id"
            element={
              <ProtectedRoute>
                <EditService />
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
            path="/admin/orders"
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

          <Route
            path="/admin/add-order"
            element={
              <ProtectedRoute>
                <AddOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/edit-order/:id"
            element={
              <ProtectedRoute>
                <EditOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/transactions"
            element={
              <ProtectedRoute>
                <Transactions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/faqs"
            element={
              <ProtectedRoute>
                <Faqs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-faq"
            element={
              <ProtectedRoute>
                <AddFaq />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/edit-faq/:id"
            element={
              <ProtectedRoute>
                <EditFaq />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default pages;
