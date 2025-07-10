import { createBrowserRouter } from "react-router-dom";
import MainRoute from "./MainRoute";
import ErrorPage from "../Pages/Error/Error";
import HomePage from "../Pages/Home/Home";
import NapaMedicines from "../Pages/Medicines/Napa";
import SecloMedicines from "../Pages/Medicines/Seclo";

import StethoscopePage from "../Pages/Equipments/Stethoscope";
import ThermomiterPage from "../Pages/Equipments/Thermomiter";
import OnlineDoctors from "../Pages/OnlineDoctor/OnlineDoctors";
import NapaDetailsPage from "../Pages/Medicines/NapaDetailsPage";
import SeclodetailsPage from "../Pages/Medicines/SeclodetailsPage";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import OtciMedicineDetails from "../Pages/OtcMedicine/OticiMedicineDetails";
import AllMedicineDetails from "../Pages/OtcMedicine/AllMedicineDetails";
import AllProducts from "../Pages/Products/AllProducts";
import AllProductDetails from "../Pages/Products/AllProductDetails";
import StethoscopeDetails from "../Pages/Equipments/StethoscopeDetails";
import ThermomiterDetails from "../Pages/Equipments/ThermomiterDetails";
// import ProtectedRoute from "../ProtectedRoute";
import AdminMainLayout from "../Pages/dashboard/AdminMainLayout";
import AdminDashboard from "../Pages/dashboard/AdminDashboard";
import ProductPage from "../Pages/dashboard/ProductPage";
import Createproduct from "../Pages/dashboard/Createproduct";
import AdminProtectedRoute from "../Pages/dashboard/AdminProtectedRoute";
import PhermacistRegister from "../Pages/Register/PhermacistRegister";
import PharmasistMainLayout from "../Pages/pharmasistDashboard/PharmasistMainLayout";
import PharmacistProtectedRoute from "../Pages/pharmasistDashboard/PharmacistProtectedRoute";
import PharmasistsDashboard from "../Pages/pharmasistDashboard/PharmasistsDashboard";
import AllUsers from "../Pages/dashboard/AllUsers";
import AllRegisterPhaemacist from "../Pages/dashboard/AllRegisterPhaemacist";
import PharmacistDocument from "../Pages/dashboard/PharmacistDocument";
import UpdateAllUser from "../Pages/dashboard/UpdateAllUser";
import UpdatePharmacist from "../Pages/dashboard/UpdatePharmacist";
import PharmacistProfile from "../Pages/pharmasistDashboard/PharmacistProfile";
import CreateMedicine from "../Pages/pharmasistDashboard/CreateMedicine";
import AllMedicinePage from "../Pages/pharmasistDashboard/AllMedicinePage";
import ExpireAllMedicine from "../Pages/pharmasistDashboard/ExpireAllMedicine";
import UpdateExpireMedicines from "../Pages/pharmasistDashboard/UpdateExpireMedicines";
import UpdateMedicine from "../Pages/pharmasistDashboard/UpdateMedicine";
import ContactPage from "../Pages/contactPage/ContactPage";
import AddToCard from "../Pages/AddToCart/AddToCard";
import Checkout from "../Pages/AddToCart/CheckOut";
import OrderedMedicine from "../Pages/pharmasistDashboard/OrderedMedicine";
import Invoice from "../Pages/pharmasistDashboard/Invoice";
import CreateEquipments from "../Pages/pharmasistDashboard/CreateEquipments";

import AllEquipmentPage from "../Pages/pharmasistDashboard/AllEquipmentPage";
import UpdateEquemment from "../Pages/pharmasistDashboard/UpdateEquemment";
import ProtectedRoute from "../ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/medicines/napa",
        element: (
          // <ProtectedRoute>
          <NapaMedicines />
          // </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/phermacist-register",
        element: <PhermacistRegister />,
      },
      {
        path: "/contact-page",
        element: <ContactPage />,
      },
      {
        path: "/medicines/napaDetails/:_id",
        element: <NapaDetailsPage />,
      },
      {
        path: "/medicines/seclo",
        element: <SecloMedicines />,
      },
      {
        path: "/medicines/secloDetails/:_id",
        element: <SeclodetailsPage />,
      },
      {
        path: "/medicines/add-to-cart",
        element: <AddToCard />,
      },
      {
        path: "/medicines/checkout",
        element: (
          <ProtectedRoute>
            {" "}
            <Checkout />
          </ProtectedRoute>
        ),
      },

      {
        path: "/products/all-products",
        element: <AllProducts />,
      },
      {
        path: "/products/:_id",
        element: <AllProductDetails />,
      },
      {
        path: "/equipments/stethoscope",
        element: <StethoscopePage />,
      },
      {
        path: "/equipments/:_id",
        element: <StethoscopeDetails />,
      },
      {
        path: "/equipments/thermometer",
        element: <ThermomiterPage />,
      },
      {
        path: "/equipments/:id",
        element: <ThermomiterDetails />,
      },
      {
        path: "/online-doctor",
        element: <OnlineDoctors />,
      },
      {
        path: "otcimedicineDetails/:category",
        element: <OtciMedicineDetails />,
      },
      {
        path: "allmedicineDetails/:id",
        element: <AllMedicineDetails />,
      },
    ],
  },
  {
    path: "/admin-dashboard",
    element: (
      <AdminProtectedRoute>
        {" "}
        <AdminMainLayout />
      </AdminProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <AdminDashboard />,
      },
      {
        path: "all-users",
        element: <AllUsers />,
      },
      {
        path: "all-pharmacist",
        element: <AllRegisterPhaemacist />,
      },
      {
        path: "all-document",
        element: <PharmacistDocument />,
      },
      {
        path: "all-users/:_id",
        element: <UpdateAllUser />,
      },
      {
        path: "all-pharmacist/:_id",
        element: <UpdatePharmacist />,
      },
      {
        path: "products",
        element: <ProductPage />,
      },
      {
        path: "create-product",
        element: <Createproduct />,
      },
    ],
  },
  {
    path: "/pharmacist-dashboard",
    element: (
      <PharmacistProtectedRoute>
        <PharmasistMainLayout />
      </PharmacistProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <PharmasistsDashboard />,
      },
      {
        path: "all-medicine",
        element: <AllMedicinePage />,
      },
      {
        path: "update-specific-medicine/:_id",
        element: <UpdateMedicine />,
      },
      {
        path: "create-medicine",
        element: <CreateMedicine />,
      },
      {
        path: "orderd-medicine",
        element: <OrderedMedicine />,
      },
      {
        path: "invoice-medicine/:_id",
        element: <Invoice />,
      },
      {
        path: "profile",
        element: <PharmacistProfile />,
      },
      {
        path: "expire-medicines",
        element: <ExpireAllMedicine />,
      },
      {
        path: "update-expire-medicines/:_id",
        element: <UpdateExpireMedicines />,
      },
      {
        path: "create-equipment",
        element: <CreateEquipments />,
      },
      {
        path: "all-equipment",
        element: <AllEquipmentPage />,
      },
      {
        path: "update-equipment/:_id",
        element: <UpdateEquemment />,
      },
    ],
  },
]);

export default router;
