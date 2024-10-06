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
import Home from './pages/AreaPage.tsx';
import NotFound from './pages/NotFound';
import BackendSettings from './pages/BackendSettings';
import UserManagement from './pages/UserManagement';
import Settings from './pages/Settings';
import NewWorkflow  from "./pages/NewWorkflow.tsx";
import AreaPage from './pages/AreaPage.tsx';
// profile pages import
import Profile from "./pages/Profile.tsx";

// component layout import
import Layout from './components/Layout.tsx';

function AppRoutes() {
	return (
		<Router>
			<AuthProvider>
				<Routes>
					{/* <Route path="/welcome" element={<Layout><Welcome /></Layout>} /> */}
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/password_forgotten" element={<PasswordForgotten />} />
					<Route path="/auth_verification" element={<AuthVerification />} />
					<Route path="/password_changed" element={<PasswordChanged />} />
		
					<Route path="/" element={<Layout><Home /></Layout>} />
					<Route path="/home" element={<Layout><ProtectedRoute><AreaPage /></ProtectedRoute></Layout>} />
					<Route path="/NewWorkflow" element={<Layout><ProtectedRoute><NewWorkflow /></ProtectedRoute></Layout>} />
					<Route path="/backend-settings" element={<Layout><ProtectedRoute><BackendSettings /></ProtectedRoute></Layout>} />
					<Route path="/user-management" element={<Layout><ProtectedRoute><UserManagement /></ProtectedRoute></Layout>} />
					<Route path="/settings" element={<Layout><ProtectedRoute><Settings /></ProtectedRoute></Layout>} />
		
					{/* Profile */}
					<Route path={"/user/profile"} element={<Layout><ProtectedRoute><Profile /></ProtectedRoute></Layout>} />
		
					<Route path="*" element={<NotFound />} />
				</Routes>
			</AuthProvider>
		</Router>
	);
}

