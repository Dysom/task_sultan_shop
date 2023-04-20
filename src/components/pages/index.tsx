import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { AdminPage } from "./admin";
import { NotFoundPage } from "./notFound";
import { CatalogPage } from "./catalog";
import { CartPage } from "./cart";
import { CardOfGoodsPage } from "./cardOfGoods";
import { setMobileMode } from "../../slices/pageSlice";

export const Pages = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResizeWindow = () => {
      dispatch(setMobileMode());
    };

    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/catalog/:barcode" element={<CardOfGoodsPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};
