# ImageKit Setup for FotoGram

## Steps to Configure ImageKit:

### 1. Create ImageKit Account
1. Go to [ImageKit.io](https://imagekit.io/)
2. Sign up for a free account
3. Verify your email

### 2. Get Your Credentials
After logging in to your ImageKit dashboard:

1. Go to **Developer Options** in the left sidebar
2. You'll find three important values:
   - **URL Endpoint**: `https://ik.imagekit.io/your_imagekit_id`
   - **Public Key**: Your public API key
   - **Private Key**: Your private API key (keep this secret!)

### 3. Update Backend Configuration
Open `backend/.env` and replace the placeholder values:

```env
# ImageKit Configuration
IMAGEKIT_PUBLIC_KEY=your_actual_public_key_here
IMAGEKIT_PRIVATE_KEY=your_actual_private_key_here
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
```

### 4. Restart Backend Server
After updating .env, restart your backend server:
```bash
cd backend
npm run dev
```

### 5. Test Image Upload
1. Login to your FotoGram account
2. Click "Create New Post" button
3. Upload an image (max 5MB)
4. Add caption, tags, and location
5. Click "Post"

## Features:
- ✅ Image upload with preview
- ✅ File size validation (max 5MB)
- ✅ Image storage on ImageKit CDN
- ✅ Automatic URL generation
- ✅ Optimized image delivery
- ✅ Image transformation capabilities

## Troubleshooting:

**Error: "Image upload failed"**
- Check if ImageKit credentials are correct in .env
- Ensure IMAGEKIT_URL_ENDPOINT includes your imagekit_id
- Verify your ImageKit account is active

**Error: "Only image files are allowed"**
- Make sure you're uploading an image file (jpg, png, gif, etc.)
- File must be less than 5MB

**Images not showing in feed**
- Check if the image URL from ImageKit is accessible
- Verify CORS settings in ImageKit dashboard

## ImageKit Dashboard:
Access your uploaded images at: https://imagekit.io/dashboard/media-library

## Free Plan Limits:
- 20 GB Bandwidth/month
- 20 GB Storage
- Unlimited transformations
- Perfect for development and small projects!
