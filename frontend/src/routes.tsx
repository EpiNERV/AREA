import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Protected route import
import { AuthProvider } from './lib/auth/AuthContext';
import ProtectedRoute from './lib/auth/ProtectedRoute';

// login pages import
import Login from './pages/login/Login.tsx';
import Register from './pages/login/Register';
import PasswordForgotten from './pages/login/PasswordForgotten';
import AuthVerification from './pages/login/AuthVerification';
import PasswordChanged from './pages/login/PasswordChanged';

// other import pages
import NotFound from './pages/NotFound';
import BackendSettings from './pages/admin/BackendSettings.tsx';
import UsersManagement from './pages/admin/UsersManagement.tsx';
import Accessibility from './pages/Accessibility.tsx';
import NewWorkflow  from "./pages/NewWorkflow";

// profile pages import
import ProfileInfos from "@/pages/profile/ProfileInfos.tsx";
import ProfileServices from "@/pages/profile/ProfileServices.tsx";

// component layout import
import Layout from './components/Layout';
import Welcome from './pages/Welcome.tsx';
import Home from './pages/Home.tsx';

function AppRoutes() {
	return (
		<Router>
			<AuthProvider>
				<Layout>
					<Routes>
						{/* <Route path="/welcome" element={<Layout><Welcome /></Layout>} /> */}
						<Route path="/" element={<Welcome />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/password_forgotten" element={<PasswordForgotten />} />
						<Route path="/auth_verification" element={<AuthVerification />} />
						<Route path="/password_changed" element={<PasswordChanged />} />
			
						<Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
						<Route path="/NewWorkflow" element={<ProtectedRoute><NewWorkflow /></ProtectedRoute>} />
						<Route path="/backend-settings" element={<ProtectedRoute><BackendSettings /></ProtectedRoute>} />
						<Route path="/users-management" element={<ProtectedRoute><UsersManagement /></ProtectedRoute>} />
						<Route path="/accessibility" element={<ProtectedRoute><Accessibility /></ProtectedRoute>} />
			
						{/* Profile */}
						<Route path={"/user/profile_informations"} element={<ProtectedRoute><ProfileInfos /></ProtectedRoute>} />
						<Route path={"/user/profile_services"} element={<ProtectedRoute><ProfileServices /></ProtectedRoute>} />
			
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Layout>
			</AuthProvider>
		</Router>
	);
}

export default AppRoutes;