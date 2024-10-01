import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// login pages import
import Login from './pages/login/Login.tsx';
import Register from './pages/login/Register';
import Welcome from './pages/login/Welcome';
import PasswordForgotten from './pages/login/PasswordForgotten';
import AuthVerification from './pages/login/AuthVerification';
import CreateNewPassword from './pages/login/CreateNewPassword';
import PasswordChanged from './pages/login/PasswordChanged';

// other import pages
import Home from './pages/Home.tsx';
import NotFound from './pages/NotFound';
import BackendSettings from './pages/BackendSettings';
import UserManagement from './pages/UserManagement';
import Settings from './pages/Settings';
import NewWorkflow  from "./pages/NewWorkflow.tsx";

// profile pages import
import Integrations from "./pages/profil/Integrations.tsx";
import EditProfile from "./pages/profil/EditProfile.tsx";

// component layout import
import Layout from './components/Layout.tsx';

function AppRoutes() {
	return (
		<Router>
			<Routes>
				{/* Pages without navbar */}
				<Route path="/welcome" element={<Layout><Welcome /></Layout>} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/password_forgotten" element={<PasswordForgotten />} />
				<Route path="/auth_verification" element={<AuthVerification />} />
				<Route path="/create_new_password" element={<CreateNewPassword />} />
				<Route path="/password_changed" element={<PasswordChanged />} />

				{/* Pages with navbar */}
				<Route path="/" element={<Layout><Home /></Layout>} />
				<Route path="/NewWorkflow" element={<Layout><NewWorkflow /></Layout>} />
				<Route path="/backend-settings" element={<Layout><BackendSettings /></Layout>} />
				<Route path="/user-management" element={<Layout><UserManagement /></Layout>} />
				<Route path="/settings" element={<Layout><Settings /></Layout>} />

				{/* Profile */}
				<Route path={"/user/integrations"} element={<Layout><Integrations /></Layout>} />
				<Route path={"/user/edit-profile"} element={<Layout><EditProfile /></Layout>} />

				{/* Page 404 */}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
}

export default AppRoutes;