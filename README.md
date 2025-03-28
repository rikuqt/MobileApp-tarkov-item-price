<img src="https://github.com/user-attachments/assets/d2f8e886-536e-4df7-9660-3484d8188b45" width="300">




# Tarkov Item Price Tracker

Tarkov Item Price Tracker is a React Native application that fetches item price data from the Escape from Tarkov game and provides recommendations on whether to sell them. Additionally, the app allows users to save and list their favorite items.

## Technologies
- **Frontend**: React Native (Expo)
- **Backend**: Node.js (Express)
- **Database**: MongoDB
- **API**: [Tarkov.dev GraphQL API](https://tarkov.dev/api/)

## Features
- Fetches item details from the Tarkov.dev API
- Displays the item's last low price and 24-hour average price
- Provides a recommendation on whether to sell based on price trends
- Allows users to add items to favorites and list them
- Data is stored in a MongoDB service

## Installation and Usage

### 1. Install Dependencies
```sh
npm install
```

### 2. Start the Expo Project
```sh
npx expo start
```

### 3. Start the Backend Service (Node.js)
Ensure the backend service is running before using the frontend.

```sh
node server.js
```

## Usage Guide
1. Enter an item name in the text field and press "Update Data."
2. Check the item's price and selling recommendation.
3. Add the item to favorites by clicking "Add to Favorites."
4. List favorite items by clicking "List Favorites."

## Download
[![Download Now](https://img.shields.io/badge/Download-Now-blue?style=for-the-badge)](https://expo.dev/accounts/rikuq/projects/mobiiliAppi/builds/dc6fccbb-d7a1-4192-95e4-589a4335ec66)

## API Requests
### Fetch Item Data
```graphql
{
    items(name: "m855a1") {
        id
        name
        avg24hPrice
        lastLowPrice
        historicalPrices { timestamp, price }
    }
}
```

### Favorite Items Management
- **Fetch Favorites:** `GET /suosikit`
- **Add Favorite:** `POST /suosikit` (Body: `{ itemName: "item name" }`)

