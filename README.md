# 📚 LMS System - Learning Management System

Complete Learning Management System built with Node.js, Express, MongoDB, and vanilla JavaScript.

## ✨ Features

### Core Features
- ✅ **User Authentication** - Register, Login, JWT tokens
- ✅ **Role-based Access** - Student, Teacher, Admin roles
- ✅ **Course Management** - Create, edit, delete courses
- ✅ **Enrollment System** - Students can enroll in courses
- ✅ **Assignments** - Create and submit assignments
- ✅ **Grading System** - Automatic grade calculation
- ✅ **Quizzes** - MCQ based quizzes
- ✅ **Progress Tracking** - Track student progress
- ✅ **Dashboard** - Personalized dashboards for students and teachers

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/abdulghaffark2425/LMS_SYSTEM.git
cd LMS_SYSTEM
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
Create a `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/lms_system
JWT_SECRET=your_super_secret_key_here
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
NODE_ENV=development
```

4. **Start MongoDB** (if running locally)
```bash
mongod
```

5. **Run the server**
```bash
npm run dev
```

Server will start at `http://localhost:5000`

## 📁 Project Structure

```
LMS_SYSTEM/
├── models/               # Database models
│   ├── User.js
│   ├── Course.js
│   ├── Assignment.js
│   ├── Quiz.js
│   ├── Grade.js
│   └── Notice.js
├── routes/               # API routes
│   ├── authRoutes.js
│   ├── courseRoutes.js
│   ├── assignmentRoutes.js
│   ├── gradeRoutes.js
│   ├── studentRoutes.js
│   └── teacherRoutes.js
├── middleware/           # Custom middleware
│   └── auth.js
├── public/               # Frontend files
│   └── index.html
├── server.js             # Main server file
├── package.json          # Dependencies
└── .env                  # Environment variables
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses` - Create course (Teacher/Admin)
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course
- `POST /api/courses/:id/enroll` - Enroll in course

### Assignments
- `GET /api/assignments/course/:courseId` - Get course assignments
- `GET /api/assignments/:id` - Get assignment details
- `POST /api/assignments` - Create assignment
- `POST /api/assignments/:id/submit` - Submit assignment
- `PUT /api/assignments/:id/grade/:submissionId` - Grade submission

### Grades
- `GET /api/grades/student/:studentId` - Get student grades
- `GET /api/grades/course/:courseId` - Get course grades
- `POST /api/grades` - Create grade

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student details
- `GET /api/students/:id/courses` - Get student courses
- `GET /api/students/:id/dashboard` - Get student dashboard

### Teachers
- `GET /api/teachers` - Get all teachers
- `GET /api/teachers/:id` - Get teacher details
- `GET /api/teachers/:id/courses` - Get teacher courses
- `GET /api/teachers/:id/dashboard` - Get teacher dashboard

## 🔐 Authentication

The system uses JWT (JSON Web Token) for authentication.

**To authenticate requests:**
```
Header: Authorization: Bearer <token>
```

## 🎯 User Roles

### Student
- View and enroll in courses
- Submit assignments
- Take quizzes
- View grades and progress

### Teacher
- Create and manage courses
- Create assignments and quizzes
- Grade submissions
- View class analytics

### Admin
- Manage all users
- Manage all courses
- Access system reports

## 💾 Database Models

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: ['student', 'teacher', 'admin'],
  enrolledCourses: [ObjectId],
  avatar: String,
  phone: String,
  bio: String,
  isActive: Boolean
}
```

### Course
```javascript
{
  title: String,
  description: String,
  instructor: ObjectId (ref: User),
  code: String (unique),
  students: [ObjectId],
  modules: [Module],
  assignments: [ObjectId],
  quizzes: [ObjectId],
  startDate: Date,
  endDate: Date,
  capacity: Number,
  credits: Number
}
```

### Assignment
```javascript
{
  title: String,
  description: String,
  course: ObjectId,
  instructor: ObjectId,
  dueDate: Date,
  totalMarks: Number,
  submissions: [Submission]
}
```

## 🧪 Testing

Run tests:
```bash
npm test
```

## 🛠️ Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT, bcryptjs
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Email:** Nodemailer
- **File Upload:** Multer

## 📦 Dependencies

```json
{
  "express": "^4.18.2",
  "mongoose": "^7.0.0",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.0",
  "cors": "^2.8.5",
  "dotenv": "^16.0.3",
  "multer": "^1.4.5-lts.1",
  "nodemailer": "^6.9.1"
}
```

## 🚀 Deployment

### Deploy to Heroku
```bash
heroku create lms-system
git push heroku main
```

### Deploy to Vercel (Frontend)
```bash
vercel --prod
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`

### JWT Errors
- Verify `JWT_SECRET` is set in `.env`
- Check token format in Authorization header

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

## 📝 Future Enhancements

- [ ] Video streaming for lectures
- [ ] Real-time notifications
- [ ] Advanced reporting and analytics
- [ ] Mobile app
- [ ] Payment integration
- [ ] AI-powered recommendations

## 👨‍💻 Author

**Abdul Ghaffar**
- GitHub: [@abdulghaffark2425](https://github.com/abdulghaffark2425)

## 📄 License

This project is licensed under the ISC License

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💬 Support

For support, email abdulghaffar@example.com or create an issue in the repository.

---

**Made with ❤️ by Abdul Ghaffar**
