# ESMPPS Mining Pool Payout System

## Overview
This is a commercial-grade implementation of the Equalized Shared Maximum Pay-Per-Share (ESMPPS) algorithm for cryptocurrency mining pools. The system provides a robust and fair payout mechanism while maintaining pool financial stability.

## Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Equalized Payments**: Ensures equal payments per share over time
- **Miner Balances**: Tracks individual miner balances and history
- **REST API**: Easy integration with mining pool software
- **Persistent Storage**: SQLite database for data persistence
- **Rate Limiting**: Protects against abuse
- **Comprehensive Logging**: Winston-based logging system
- **Input Validation**: Joi-based request validation
- **Unit Tests**: Comprehensive test coverage

## Technology Stack
- **Runtime**: Node.js
- **Web Framework**: Express.js
- **Database**: SQLite
- **Logging**: Winston
- **Validation**: Joi
- **Testing**: Jest + Supertest
- **Linting**: ESLint (Airbnb style)
- **Formatting**: Prettier

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/esmpps-pool.git
   cd esmpps-pool
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the application (see Configuration section)

4. Start the server:
   ```bash
   npm start
   ```

## Configuration
Configuration is managed through `config/default.json`:
```json
{
  "server": {
    "port": 3000,
    "rateLimit": {
      "windowMs": 900000,
      "max": 100
    }
  },
  "logging": {
    "level": "info",
    "file": "logs/application.log"
  },
  "database": {
    "file": "data/esmpps.db"
  }
}
```

## API Documentation

### POST /api/v1/payouts/calculate
Calculate payouts based on submitted shares

**Request Body:**
```json
{
  "poolEarnings": 100,
  "shares": [
    { "miner": "Alice", "shares": 50 },
    { "miner": "Bob", "shares": 30 }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalShares": 80,
    "maxPayoutPerShare": 1.25,
    "payouts": [
      {
        "miner": "Alice",
        "shares": 50,
        "payout": 62.5,
        "balance": 62.5
      },
      {
        "miner": "Bob",
        "shares": 30,
        "payout": 37.5,
        "balance": 37.5
      }
    ]
  }
}
```

## Testing
Run unit tests:
```bash
npm test
```

Run linting:
```bash
npm run lint
```

Run formatting:
```bash
npm run format
```

## Database Schema
### Miners Table
| Column        | Type    | Description               |
|---------------|---------|---------------------------|
| id            | TEXT    | Miner identifier (PK)     |
| balance       | REAL    | Current balance           |
| total_shares  | REAL    | Total shares submitted    |
| total_payouts | REAL    | Total payouts received    |

### Shares Table
| Column     | Type      | Description                     |
|------------|-----------|---------------------------------|
| id         | INTEGER   | Auto-incrementing ID (PK)      |
| miner_id   | TEXT      | Miner identifier (FK)          |
| shares     | REAL      | Number of shares submitted     |
| timestamp  | DATETIME  | When shares were recorded      |

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
Distributed under the MIT License. See `LICENSE` for more information.

## Contact
Chris Bunting - [your.email@example.com](mailto:your.email@example.com)

Project Link: [https://github.com/yourusername/esmpps-pool](https://github.com/yourusername/esmpps-pool)
