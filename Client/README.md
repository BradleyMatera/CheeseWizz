# CheeseWizz — Client

React frontend for the CheeseWizz Cheese Finder application.

## Stack
- React 18
- Vite
- Tailwind CSS

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the `Client/` directory:
   ```
   VITE_GIPHY_API_KEY=your_key_here
   VITE_UNSPLASH_ACCESS_KEY=your_key_here
   VITE_GOOGLE_CLOUD_API_KEY=your_key_here
   ```

3. Start the dev server:
   ```bash
   npm run dev
   ```

## Notes
- The app fetches cheese data from the CheeseWizz API (see `../Server/`)
- External API keys (Giphy, Unsplash, Google Translate) are optional — the app gracefully handles missing keys
