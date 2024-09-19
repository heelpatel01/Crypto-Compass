### **Updated Design Without Coin Data Schema**

---

### **Schemas**

We will remove the `Coin Schema` and focus on the others: `User`, `Transaction`, `Portfolio`, and `Holding`.

---

#### 1. **User Schema**
Same as before, storing user details and balances:

```js
const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  investableBalance: { type: Number, default: 0 },
  investedBalance: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});
```

#### 2. **Transaction Schema**
Tracking user transactions:

```js
const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['buy', 'sell'], required: true },
  coin: { type: String, required: true }, // Coin ID like 'bitcoin', 'ethereum' from CoinGecko
  amount: { type: Number, required: true },
  priceAtTransaction: { type: Number, required: true },
  totalValue: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});
```

#### 3. **Portfolio Schema**
User-specific portfolio linking to multiple holdings:

```js
const portfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  holdings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Holding' }]
});
```

#### 4. **Holding Schema**
Tracking the amount of each coin a user holds:

```js
const holdingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  coinId: { type: String, required: true }, // Coin ID from CoinGecko
  amount: { type: Number, required: true },
  value: { type: Number, required: true }, // Value of the holding (amount * live price)
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
```

---

### **API Routes**

We'll remove the coin routes (`GET /coins` and `GET /coins/:coinId`) since coin data will be fetched directly from CoinGecko.

#### **User Routes**

1. **`POST /signup`** and **`POST /login`** - Same as before.

2. **`GET /balance`** - Fetch user's investable and invested balances.

---

#### **Portfolio and Holdings Routes**

1. **`GET /portfolio`** - Fetch user's holdings (without stored coin price):
   - Response:
     ```json
     {
       "holdings": [
         { "coin": "bitcoin", "amount": 0.5 },
         { "coin": "ethereum", "amount": 2 }
       ]
     }
     ```

2. **`POST /buy`** - Buy a coin:
   - Request Body:
     ```json
     { "coinId": "bitcoin", "amount": 0.1 }
     ```
   - Logic:
     - Fetch the live price from CoinGecko.
     - Deduct investable balance.
     - Add to holdings and update invested balance.

   - Response:
     ```json
     { "message": "Coin purchased successfully", "newInvestableBalance": 9000, "newInvestedBalance": 16000 }
     ```

3. **`POST /sell`** - Sell a coin:
   - Request Body:
     ```json
     { "coinId": "bitcoin", "amount": 0.05 }
     ```
   - Logic:
     - Fetch the live price from CoinGecko.
     - Deduct from holdings and update invested balance.
     - Add back to investable balance.

   - Response:
     ```json
     { "message": "Coin sold successfully", "newInvestableBalance": 9500, "newInvestedBalance": 14000 }
     ```

---

#### **Transaction Routes**

1. **`GET /transactions`** - Same as before, fetch all buy/sell transactions.

---

### **CoinGecko API**

Instead of storing coin data, you'll dynamically fetch it using the CoinGecko API during transactions.

- **Get live price for a coin** (when buying/selling):
  ```js
  const axios = require('axios');
  
  async function fetchCoinPrice(coinId) {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`);
    return response.data[coinId].usd;
  }
  ```

### **Flow for Buy/Sell**

1. **Buy Flow**:
   - User initiates a buy.
   - Fetch live price from CoinGecko.
   - Deduct investable balance.
   - Add to holdings.
   - Create a new transaction.

2. **Sell Flow**:
   - User initiates a sell.
   - Fetch live price from CoinGecko.
   - Add to investable balance.
   - Deduct from holdings.
   - Create a new transaction.

---

### **Final Core Feature List**

1. **User Authentication**.
2. **Investable and Invested Balances**.
3. **Portfolio Management**.
4. **Buy/Sell Transactions** with real-time price fetching.
5. **Transaction History**.

---

This approach is more efficient because the coin data is directly fetched when needed, removing the need for persistence. Let me know if you need further adjustments!