# PlantPal - Smart Plant Care Management System

A complete, functional full-stack web application for managing plants, watering reminders, growth tracking, and health monitoring.

## Tech Stack

### Frontend
- HTML5, CSS3, JavaScript
- React.js 18
- React Router DOM
- Axios
- Vite

### Backend
- Node.js
- Express.js
- REST API
- JWT Authentication
- bcryptjs

### Database
- MongoDB
- Mongoose

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (local installation)
- [MongoDB Compass](https://www.mongodb.com/products/compass) (for viewing database)
- [Visual Studio Code](https://code.visualstudio.com/)

## Project Structure

```
PlantPal/
├── client/          # React frontend
├── server/          # Node/Express backend
└── README.md
```

## Installation & Setup

### 1. Install Dependencies

From the project root directory:

```powershell
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# Return to root
cd ..
```

### 2. Start MongoDB

Start your local MongoDB instance. On Windows:
```powershell
# If installed as service, it may already be running
# Or start manually: mongod --dbpath <your-db-path>
```

### 3. Configure Environment Variables

```powershell
# Copy example env file
Copy-Item server\.env.example server\.env
```

Edit `server/.env` with your values:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/plantpal
JWT_SECRET=your_very_long_random_secret_key_here
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### 4. Connect with MongoDB Compass (Optional but recommended)

Open MongoDB Compass and connect to:
```
mongodb://127.0.0.1:27017
```
Database name: `plantpal`

### 5. Start the Backend Server

From `server/` directory:
```powershell
npm run dev
```
Server will run on http://localhost:5000

### 6. Start the Frontend Development Server

From `client/` directory:
```powershell
npm run dev
```
Frontend will run on http://localhost:5173

## Usage

1. Open http://localhost:5173 in your browser
2. Click "Get Started" to register a new account
3. Fill in your details and create an account
4. Login and start managing your plants!

## Features

- **Authentication**: Secure registration and login with JWT
- **Dashboard**: Overview of all plants with statistics
- **Plant Management**: Add, view, edit, and delete plants
- **Watering Reminders**: Automatic reminders based on watering intervals
- **Growth Tracking**: Record plant growth observations over time
- **Health Score**: Calculated health score based on care factors
- **Species Suggestions**: Default watering intervals for common plants
- **Responsive Design**: Works on mobile, tablet, and desktop

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `server/.env`
- Verify MongoDB is listening on port 27017

### Port Already in Use
- Change `PORT` in `server/.env`
- Update Vite proxy in `client/vite.config.js` if needed

### CORS Issues
- Ensure `CLIENT_URL` in `server/.env` matches your frontend URL

## License

This project is for educational purposes.
