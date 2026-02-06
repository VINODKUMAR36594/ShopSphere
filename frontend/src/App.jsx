import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import ProductDetails from "./components/Products/ProductDetails";
import CheckOut from "./components/Cart/CheckOut";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import MyOrders from "./pages/MyOrders";
import AdminLayout from "./Admin/AdminLayout";
import AdminHomePage from "./pages/AdminHomePage";
import UserManagement from "./Admin/UserManagement";
import ProductManagement from "./Admin/ProductManagement";
import EditProductPage from "./Admin/EditProductPage";
import OrderManagement from "./Admin/OrderManagement";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
            {/* User Layout */}
            <Route index element={<Home />} />
          </Route>
          <Route path="collections/:collection" element={<CollectionPage />}></Route>
          <Route path="product/:id" element={<ProductDetails />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="/checkout" element={<CheckOut />}></Route>
          <Route path="order-confirmation" element={<OrderConfirmationPage />}></Route>
          <Route path="order/:id" element={<OrderDetailPage />}></Route>
          <Route path="my-orders" element={<MyOrders />}></Route>
          <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminHomePage />} />
            <Route path="users" element={<UserManagement />}></Route>
            <Route path="products" element={<ProductManagement />}></Route>
            <Route path="products/:id/edit" element={<EditProductPage />}></Route>
            <Route path="orders" element={<OrderManagement />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
