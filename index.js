/* imports 'csv-parser' for parsing CSV files, 'fs' for working with files and directories, 'node-fetch' for making HTTP requests */
const csv = require('csv-parser');
const fs = require('fs');
const fetch = require('node-fetch');

const CRYPTO_COMPARE_API_KEY = API_KEY; // replace API_KEY with your own CryptoCompare API key

const portfolio = {}; // used to keep track of the balance of each token

/* 
Reads in the 'transaction.csv' file and process each row of the file.
The code extracts the 'timestamp', 'transaction_type', 'token', and 'amount' values and calculates the balance by adding or substracting
the amount with the existing value stored in portfolio. 
*/
fs.createReadStream('data/transactions.csv')
  .pipe(csv())
  .on('data', (row) => {
    const { timestamp, transaction_type, token, amount } = row;
    const balance = portfolio[token] || 0;

    if (transaction_type === 'DEPOSIT') {
      portfolio[token] = balance + parseFloat(amount);
    } else if (transaction_type === 'WITHDRAWAL') {
      portfolio[token] = balance - parseFloat(amount);
    }
  })

  /* 
  We will need to retrieve the exchange rates from CryptoCompare and calculate the portfolio values.
  First, extract the unique token symbols stored in portfolio and store them in the 'tokens' array.
  Next, the program will make a request using the CryptoCompare API to fetch the current exchange rates for each token.
  It will loop over each token in the tokens to multiply the balance and USD value for each token.
  Finally, console.log(values) will then show the final results of the portfolio.
  */
  .on('end', () => {
    const tokens = Object.keys(portfolio);
    const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${tokens.join(',')}&tsyms=USD&api_key=${CRYPTO_COMPARE_API_KEY}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const values = {};

        for (const token of tokens) {
          const rate = data[token]?.USD;
          const balance = portfolio[token];
          values[token] = balance * rate;
        }

        console.log(values);
      })
      .catch((err) => console.error(err)); //catch will be executed if there is an error thrown
  });
