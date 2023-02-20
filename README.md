## Question 1 - Programming
_We're looking at your programming ability. It must not only work, it should be maintainable._

Let us assume you are a crypto investor. You have made transactions over a period of time which is logged in a CSV file at the [data directory](https://raw.githubusercontent.com/Propine/2b-boilerplate/master/data/transactions.csv). Write a command line program that returns the latest portfolio value per token in USD

The program should be ran like this

```
npm run start
```

On running, it should return the latest portfolio value per token in USD

The CSV file has the following columns
 - timestamp: Integer number of seconds since the Epoch
 - transaction_type: Either a DEPOSIT or a WITHDRAWAL
 - token: The token symbol
 - amount: The amount transacted

Portfolio means the balance of the token where you need to add deposits and subtract withdrawals. You may obtain the exchange rates from [cryptocompare](https://min-api.cryptocompare.com/documentation) where the API is free. You should write it in Node.js as our main stack is in Javascript/Typescript and we need to assess your proficiency.


## Submission

Please take no more than 2 hours to finish. We do not track time, hence you can start and end at your own time. Your answers should comprise of the following

  - Source code that you used for deriving the results
  - README that explains various design decisions that you took.

Commit your answers in a private Github repository(it's free), please do not fork as other candidates will see your answers. Add Zan(liangzan), Ben(BenPropine) as collaborators then inform us that it is done at zan@propine.com, ben.nguyen@propine.com.

## Explaination

1) Imports 'csv-parser' for parsing CSV files, 'fs' for working with files and directories, 'node-fetch' for making HTTP requests.

2) Declare:
CRYPTO_COMPARE_API_KEY - used to retrieve the exchange rates for tokens
portfolio - used to keep track the balance of each token

3) Reads in the 'transaction.csv' file and process each row of the file. The code extracts the 'timestamp', 'transaction_type', 'token', and 'amount' values and calculates the balance by adding or substracting the amount with the existing value stored in portfolio. 

4) We will need to retrieve the exchange rates from CryptoCompare and calculate the portfolio values. First, extract the unique token symbols stored in portfolio and store them in the 'tokens' array. Next, the program will make a request using the CryptoCompare API to fetch the current exchange rates for each token. It will loop over each token in the tokens to multiply the balance and USD value for each token. Finally, console.log(values) will then show the final results of the portfolio.
