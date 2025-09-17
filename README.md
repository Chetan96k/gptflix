# NetflixGPT
- Create react app using vite
- configure tailwindcss
- Routing
- Header
- Login Form
- Sign up form
- Form validation (learning useRef here)
- Firebase setup
- Deploying on firebase
- Create Signup user account
- Implemented signin signup api from firebase
- created redux store to store user details fetched from firebase after signin
- Implemented signout
- update profile api call
- use tmdb API (Now playing)
- create movie slice and add the nowPlayingmovies and movieTrailer to it
- make the main container
- make the secondary container
- build movie list
- build movie card
- make AI search feature
- gpt search page
- gpt search bar and movie cards
- make the api call to gemini
- fetch the response
- clean the response
- display the info in the movie cards
- memoization (preventing unnessory api calls by using stored data in the redux store)
- make responsive


# Features
- Login/Signup
    - Form 
    - Form validation
    - redirect to browse page after authentication
- Browse (only after authentication)
    - Header
    - Main Movie
        - Its trailer in the background
        - Title and description
        - Movie suggestion
            - Movie lists
- Netflix GPT
    - Search Bar
    - Movie Suggestions


# Description
- Developed this app using React.js and Tailwind CSS to create a responsive and secure movie browsing experience.
- Implemented Firebase Authentication for secure signup, signin, signout, and profile update functionality.
- Optimized API calls by reducing them by 50% using Redux Toolkit to store and reuse movie data (memoization).
- Integrated 5+ APIs including TMDB API and Gemini API to use Gemini 2.5 Flash model for movie data
and AI-powered search.
- Implemented responsive design and form validation using useRef Hook for a seamless user experience.
- Deployed the app on Vercel with secure environment variable management for fast and safe hosting.