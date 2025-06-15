import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
//import './index.css';

import BrandLogin from './pages/brandlogin';
import BrindSignup from './pages/brandsignup';
import VerifyUI from './pages/verify_otp';
import ForgotUI from './pages/brand_forgot_pass';
import ResetUI from './pages/brand_reset_pass';
import OnboardingUI from './pages/Onboarding';
import Resend_Otp from './pages/Resend_oto';
import Templates from './pages/Templates';
import StorePreference from './pages/StorePreference';
import ProductInstructionVideo from './pages/ProductInstructionVideo';
import ThreeDProduct from './pages/3DProduct';



import BrandInformation from './pages/BrandInformation';







import AdminDashboard from './pages/AdminDashboard';
import UserTable from './components/UserTable';
import AdminSettings from './components/AdminSettings';
import StoreManager from './components/StoreManager';
import AdminAnalytics from './components/AdminAnalytics';
import ProductManager from './components/ProductManager';

import Navigation from './pages/Navigation';
import RefrshHandler from './RefrshHandler';
import { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/brandlogin" />
  }

  return (
    <div className="App">
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to="/navigation" />} />
        <Route path='/navigation' element={<Navigation />} />

        {/* Brand Auth Routes */}
        <Route path='/brandlogin' element={<BrandLogin setIsAuthenticated={setIsAuthenticated} />} />
        <Route path='/brandsignup' element={<BrindSignup />} />
        <Route path='/verify_otp' element={<VerifyUI />} />
        <Route path='/Forgot_pass' element={<ForgotUI />} />
        <Route path='/reset-password' element={<ResetUI />} />
        <Route path='/resend_otp' element={<Resend_Otp />} />
        <Route path='/OnboardingUI' element={<OnboardingUI />} />
        



        <Route path='/Brandinfo' element={<BrandInformation />} />
        <Route path='/templates' element={<Templates />}/>
        <Route path="/StorePreference" element={<StorePreference />} />
        <Route path="/ProductInstructionVideo" element={<ProductInstructionVideo />} />
        <Route path="/3DProduct" element={<ThreeDProduct />} /> 


        {/* Brand Dashboard (Private) */}
        <Route path='/admin-dashboard/*' element={<PrivateRoute element={<AdminDashboard />} />}>
            <Route index element={<h3>📊 Dashboard Overview</h3>} />
            <Route path="User-Detaied" element={<UserTable />} />
            <Route path="product-manager" element={<ProductManager />}/>
            <Route path="store-manager" element={<StoreManager />}/>
            {/* other nested routes */}
        </Route>

      </Routes>
    </div>
  );
}

export default App;
