import { Routes, Route } from "react-router-dom";
import SignUpLine from './components/SignUpLine'
import NavigationBar from './components/NavigationBar'
import Hero from './components/Hero'
import HomeCatalog from './components/HomeCatalog'
import AdminPanelEntrance from './components/AdminPanelEntrance'
import AdminPanel from './components/Adminpanel';
import ProductPage from "./components/ProductPage";
import { useState } from "react";
import CartPage from "./components/CartPage";


function App() {
  const [isSeen, setSeen] = useState(true)
  const [isSignUpActive, setSignupActive] = useState(false)
  return (
    <>
      <Routes>
        <Route path="/" element={
        <div>
          {isSignUpActive === true ? undefined: <SignUpLine isSeen={isSeen} setSeen={setSeen} get={setSignupActive} />}
          <NavigationBar />
          <Hero />
          <HomeCatalog />
          <AdminPanelEntrance  dest="/adminpanel" text="Go to Admin panel" />
        </div>} />
          <Route path="adminpanel" element={<AdminPanel />} />
          <Route path="/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
      </Routes>
    </>
  )
}

export default App
