# FotoGram Backend API

Instagram clone backend API built with Node.js, Express, and MongoDB.

## 🚀 Features

- User authentication (register/login)
- User profile management
- Post creation and management
- Like/Unlike posts
- Comment on posts
- Follow/Unfollow users
- Feed generation
- Trending posts
- Search functionality

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   ├── models/          # Mongoose schemas
│   ├── controllers/     # Request handlers
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── middleware/      # Custom middleware
│   ├── utils/           # Helper functions
│   ├── app.js           # Express app setup
│   └── server.js        # Server entry point
├── .env                 # Environment variables
├── package.json
└── README.md
```

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   - Copy `.env` and update the values
   - Set your MongoDB URI
   - Set a strong JWT secret

3. **Start MongoDB:**
   ```bash
   # Make sure MongoDB is running
   mongod
   ```

4. **Run the server:**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## 📡 API Endpoints

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user
- `POST /api/users/:id/follow` - Follow/Unfollow user

### Posts
- `POST /api/posts` - Create new post
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/like` - Like/Unlike post
- `POST /api/posts/:id/comment` - Add comment
- `DELETE /api/posts/:id/comment/:commentId` - Delete comment
- `GET /api/posts/user/:userId` - Get user's posts

### Health Check
- `GET /api/health` - Check API status

## 📦 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT authentication
- **dotenv** - Environment variables
- **cors** - CORS middleware

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation
- MongoDB injection protection
- CORS enabled

## 🧪 Testing

```bash
# Test with curl
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

## 📝 Notes

- Make sure to change the JWT_SECRET in production
- Add authentication middleware to protected routes
- Consider adding rate limiting for production
- Add file upload functionality for images
- Implement proper logging system

## 🤝 Contributing

Feel free to contribute to this project by opening issues or pull requests.

## 📄 License

MIT License
