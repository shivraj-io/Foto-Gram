# 📸 FotoGram - Instagram Clone

A full-stack Instagram clone built with the MERN stack (MongoDB, Express, React, Node.js) featuring real-time posts, image uploads, user authentication, and a responsive design.

![FotoGram](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

### 🔐 Authentication
- User registration and login
- JWT-based authentication
- Secure password hashing with bcrypt
- Persistent login sessions

### 📱 Instagram-like Feed
- Real-time posts display
- Like and comment on posts
- Story bar (UI ready)
- Create new posts with images
- User profiles with follow/unfollow

### 🖼️ Image Management
- Image upload integration with ImageKit CDN
- Image preview before posting
- Optimized image delivery
- 5MB upload limit

### 🎨 Modern UI/UX
- Responsive design (Mobile & Desktop)
- Dark theme with gradient accents
- Instagram-inspired interface
- Smooth animations and transitions
- Component-based architecture

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - UI library
- **Vite 6.3.5** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management
- **CSS3** - Styling with modular CSS files

### Backend
- **Node.js** - Runtime environment
- **Express 5.2.1** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 9.0.1** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcrypt 6.0.0** - Password hashing
- **ImageKit** - Image CDN and management
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
insta-clone/
├── frontend/                # React frontend application
│   ├── src/
│   │   ├── assets/         # Images and styles
│   │   ├── components/     # Reusable components
│   │   │   ├── common/     # Common UI components
│   │   │   ├── footer/     # Footer components
│   │   │   ├── layout/     # Layout components (Navbar, Sidebar)
│   │   │   ├── post/       # Post-related components
│   │   │   └── story/      # Story components
│   │   ├── context/        # React Context (AuthContext, PostContext)
│   │   ├── hooks/          # Custom hooks
│   │   ├── pages/          # Page components
│   │   │   ├── auth/       # Login and Signup pages
│   │   │   ├── explore/    # Explore page
│   │   │   ├── feed/       # Main feed page
│   │   │   ├── post/       # Create post page
│   │   │   └── profile/    # Profile pages
│   │   ├── services/       # API services
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── public/             # Static assets
│   ├── package.json
│   └── vite.config.js
│
├── backend/                # Express backend API
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   │   ├── db.js       # MongoDB connection
│   │   │   ├── env.js      # Environment variables
│   │   │   └── imagekit.js # ImageKit configuration
│   │   ├── controllers/    # Route controllers
│   │   │   ├── postController.js
│   │   │   ├── uploadController.js
│   │   │   └── userController.js
│   │   ├── middleware/     # Express middleware
│   │   │   ├── errorMiddleware.js
│   │   │   ├── upload.js   # Multer configuration
│   │   │   └── validateRequest.js
│   │   ├── models/         # Mongoose models
│   │   │   ├── Post.js
│   │   │   └── User.js
│   │   ├── routes/         # API routes
│   │   │   ├── postRoutes.js
│   │   │   └── userRoutes.js
│   │   ├── services/       # Business logic
│   │   │   ├── imageService.js
│   │   │   └── postService.js
│   │   ├── utils/          # Utility functions
│   │   ├── app.js          # Express app setup
│   │   └── server.js       # Server entry point
│   ├── package.json
│   └── .env                # Environment variables
│
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- ImageKit account (for image uploads)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shivraj-io/Foto-Gram.git
   cd insta-clone
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Configure Environment Variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/fotogram
   JWT_SECRET=your_jwt_secret_key_here
   
   # ImageKit Configuration
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
   ```

   **📝 Getting ImageKit Credentials:**
   - Sign up at [imagekit.io](https://imagekit.io)
   - Go to [Dashboard → Developer → API Keys](https://imagekit.io/dashboard/developer/api-keys)
   - Copy your Public Key, Private Key, and URL Endpoint
   - See [IMAGEKIT_SETUP.md](./IMAGEKIT_SETUP.md) for detailed instructions

4. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

5. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

6. **Run the Application**

   **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm run dev
   ```
   Backend will run on `http://localhost:5000`

   **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

7. **Open in Browser**
   
   Navigate to `http://localhost:5173`

## 🔑 API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update profile (protected)

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get post by ID
- `POST /api/posts` - Create new post (protected)
- `POST /api/posts/upload` - Upload post with image (protected)
- `PUT /api/posts/:id` - Update post (protected)
- `DELETE /api/posts/:id` - Delete post (protected)
- `POST /api/posts/:id/like` - Like/unlike post (protected)
- `POST /api/posts/:id/comments` - Add comment (protected)

### User Interactions
- `POST /api/users/:id/follow` - Follow user (protected)
- `POST /api/users/:id/unfollow` - Unfollow user (protected)

## 🎯 Usage

### Creating an Account
1. Click "Sign Up" in the navbar
2. Fill in username, email, and password
3. Submit the form
4. You'll be automatically logged in

### Posting Images
1. Click "Create" button in the navbar (or + icon on mobile)
2. Click to select an image or drag & drop
3. Add caption, tags, and location (optional)
4. Click "Share" to post

### Interacting with Posts
- **Like**: Click the heart icon
- **Comment**: Click the comment icon and type
- **View Profile**: Click on username or avatar

## 🔧 Configuration

### Frontend Configuration
- **API Base URL**: Configure in `frontend/src/services/api.js`
- **Routes**: Defined in `frontend/src/App.jsx`

### Backend Configuration
- **Port**: Default 5000 (change in `.env`)
- **Database**: MongoDB connection string in `.env`
- **JWT**: Secret key in `.env`
- **CORS**: Configured in `backend/src/app.js`

## 🐛 Known Issues & Troubleshooting

### ImageKit Authentication Error
If you see "Your account cannot be authenticated":
1. Verify credentials in `.env` are correct
2. Check that your ImageKit account is active
3. Ensure no extra spaces in environment variables
4. Restart the backend server after updating `.env`

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check the connection string in `.env`
- For MongoDB Atlas, whitelist your IP address

### Port Already in Use
```bash
# Find and kill the process using the port
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

## 📝 Development

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Building for Production
```bash
# Frontend build
cd frontend
npm run build

# Backend (runs as-is with node)
cd backend
node src/server.js
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Shivraj**
- GitHub: [@shivraj-io](https://github.com/shivraj-io)

## 🙏 Acknowledgments

- Inspired by Instagram's design and functionality
- Built with modern web technologies
- ImageKit for image CDN services
- MongoDB for database solutions

## 📞 Support

If you have any questions or need help, please:
1. Check the [Issues](https://github.com/shivraj-io/Foto-Gram/issues) page
2. Create a new issue with detailed information
3. Contact the maintainer

---

**⭐ Star this repository if you found it helpful!**
