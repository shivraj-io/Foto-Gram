import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Feed from './pages/feed/Feed'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Explore from './pages/explore/Explore'
import Profile from './pages/profile/Profile'
import EditProfile from './pages/profile/EditProfile'

function App() {
	return (
		<BrowserRouter>
			<div className="page">
				<Navbar />
				<main>
					<Routes>
						<Route path="/" element={<Feed />} />
						<Route path="/explore" element={<Explore />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/profile/edit" element={<EditProfile />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</BrowserRouter>
	)
}

export default App
