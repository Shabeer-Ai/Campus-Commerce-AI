import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";

// Pages
import { HomePage } from "./pages/HomePage";
import { MarketplacePage } from "./pages/MarketplacePage";
import { ProductDetailsPage } from "./pages/ProductDetailsPage";
import { SellPage } from "./pages/SellPage";
import { ChatPage } from "./pages/ChatPage";
import { ProfilePage } from "./pages/ProfilePage";
import { AdminPage } from "./pages/AdminPage";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="relative flex min-h-screen flex-col bg-[#050816]">
          {/* Global Sticky Header Nav */}
          <Navbar />

          {/* Main Routing Stage */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/marketplace/:id" element={<ProductDetailsPage />} />
              <Route path="/sell" element={<SellPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/admin" element={<AdminPage />} />
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Global Footing Nav */}
          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
