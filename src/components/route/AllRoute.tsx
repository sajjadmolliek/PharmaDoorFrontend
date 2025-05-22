import { createBrowserRouter } from "react-router-dom";
import MainRoute from "./MainRoute";
import ErrorPage from "../Pages/Error/Error";
import HomePage from "../Pages/Home/Home";
import NapaMedicines from "../Pages/Medicines/Napa";
import SecloMedicines from "../Pages/Medicines/Seclo";
import MonusMedicines from "../Pages/Products/Monus";
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
import ProtectedRoute from "../ProtectedRoute";
import AdminMainLayout from "../Pages/dashboard/AdminMainLayout";
import AdminDashboard from "../Pages/dashboard/AdminDashboard";
import ProductPage from "../Pages/dashboard/ProductPage";
import Createproduct from "../Pages/dashboard/Createproduct";
import AdminProtectedRoute from "../Pages/dashboard/AdminProtectedRoute";
import PhermacistRegister from "../Pages/Register/PhermacistRegister";
// import AdminProtectedRoute from "../Pages/dashboard/AdminProtectedRoute";

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
          <ProtectedRoute>
            <NapaMedicines />
          </ProtectedRoute>
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
        path: "/medicines/napaDetails/:id",
        element: <NapaDetailsPage />,
      },
      {
        path: "/medicines/seclo",
        element: <SecloMedicines />,
      },
      {
        path: "/medicines/secloDetails/:id",
        element: <SeclodetailsPage />,
      },
      {
        path: "/products/monas",
        element: <MonusMedicines />,
      },
      {
        path: "/products/all-products",
        element: <AllProducts />,
      },
      {
        path: "/products/:id",
        element: <AllProductDetails />,
      },
      {
        path: "/equipments/stethoscope",
        element: <StethoscopePage />,
      },
      {
        path: "/equipments/:id",
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
    path: "/dashboard",
    element: (
      <AdminProtectedRoute>
        {" "}
        <AdminMainLayout />
      </AdminProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "admin-dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "admin-dashboard/products",
        element: <ProductPage />,
      },
      {
        path: "admin-dashboard/create-product",
        element: <Createproduct />,
      },
    ],
  },
]);

export default router;
