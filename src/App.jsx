import { Routes, Route } from "react-router-dom";
import SignUpLine from './components/site-interface/SignUpLine'
import NavigationBar from './components/site-interface/NavigationBar'
import Hero from './components/site-interface/Hero'
import HomeCatalog from './components/site-interface/HomeCatalog'
import AdminPanelEntrance from './components/admin-panel/AdminPanelEntrance'
import Adminpanel from './components/admin-panel/Adminpanel';
import ProductPage from "./components/site-interface/ProductPage";
import { useState } from "react";
import CartPage from "./components/site-interface/CartPage";


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
          <Route path="adminpanel" element={<Adminpanel />} />
          <Route path="/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
      </Routes>
    </>
  )
}

export default App
