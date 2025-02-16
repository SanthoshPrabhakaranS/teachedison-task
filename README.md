# 🌦 Advanced Weather App

A modern and responsive weather application built with **Next.js, React, TypeScript**, **Tailwind CSS** and **React Query**. It provides real-time weather updates, forecasts, and other weather-related information using an external API.

---

## 🚀 Features

✅ **Real-time Weather Data** - Get current weather updates for any location.
✅ **5-Day Forecast** - View weather predictions for the next five days.
✅ **Interactive Map** - Display live weather data on an embedded map.
✅ **Favorites** - Save and manage favorite locations. ✅ **Dark Mode Support** - Toggle between light and dark themes.
✅ **Offline Handling** - Displays a fallback UI when offline. ✅ **Optimized Performance** - Uses server-side fetching with React Query.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **State Management**: React Query, Context API
- **API Handling**: Axios
- **UI Components**: shadcn/ui, Lucide React Icons
- **Testing**: Jest, React Testing Library
- **Map Integration**: Leaflet, react-leaflet

---

## 🔧 Installation & Setup

1️⃣ **Clone the repository**

```sh
 git clone https://github.com/SanthoshPrabhakaranS/teachedison-task
 cd teachedison-task
```

2️⃣ **Install dependencies**

```sh
yarn install
```

3️⃣ **Set up environment variables** Create a `.env.local` file in the root directory and add the following:

```env
NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
```

4️⃣ **Run the development server**

```sh
yarn dev  # or yarn dev
```

The app will be available at [**http://localhost:3000**](http://localhost:3000) 🚀

---

## 🧪 Running Tests

```sh
yarn test  # Runs Jest test suite
```

To check test coverage:

```sh
yarn test:coverage
```

---

## 📁 Project Structure

```plaintext
/weather-app
│── components/        # UI components
│── pages/             # Next.js pages
│── hooks/             # Custom React hooks
│── lib/               # Utility functions
│── public/            # Static assets
│── styles/            # Global styles
│── tests/             # Unit and integration tests
│── .env.local         # Environment variables
│── next.config.js     # Next.js configuration
│── package.json       # Project dependencies
```

---

## 🚀 Deployment

The app can be deployed on **Vercel** using the following command:

```sh
yarn build && vercel
```

Or manually through the Vercel dashboard.
