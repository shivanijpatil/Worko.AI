# Worko.Ai
A full-stack application for managing candidate referrals.

## Deployed Application

You can view the deployed version of the application here:-  [Live Demo](https://workoai-khaki.vercel.app/)

## Features

- User authentication (login/register)
- Create new referrals with candidate details and resume upload
- View all referrals and their current status
- Update referral status (New, Evaluated, Hired, Rejected)

## Backend Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create a `.env` file in the backend directory 

3. Update the `.env` file with your configuration:
- Set `MONGODB_URI` to your MongoDB connection string
- Set `JWT_SECRET` to a secure random string
- Optionally change the `PORT` (defaults to 5000)


4. Run the development server:
```bash
npm run dev
```

## Frontend Setup 

The frontend will be built with React and will include:
- UI with a CSS framework
- Responsive design
- Form validation
- File upload functionality
- Real-time status updates
