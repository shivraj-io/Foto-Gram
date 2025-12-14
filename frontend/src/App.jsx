import './index.css'
import Navbar from './components/layout/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Login from './components/Login'
import Signup from './components/Signup'

function App() {
	return (
		<div className="page">
			<Navbar />
			<main>
				<Hero />
				<About />
				<Login />
				<Signup />
				<Contact />
			</main>
			<Footer />
		</div>
	)
}

export default App
