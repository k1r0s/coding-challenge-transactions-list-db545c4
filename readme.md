## README

### Done

I've done these tasks in less than 2 hours: 
- Fix the query responsible for fetching the transactions list on the main page
- Debug and fix the wallet library (web3-onboard) issue preventing proper Metamask connection
- Investigate and fix the SEND_TRANSACTION saga, so that transactions reach the chain and receipts are saved in the database.
- Connect the Send transaction form inputs with the form and pass along the required values to the saga.

Other tasks are doable, and imho not relevant, but I can't dedicate more time to this test. There is plenty of work online that demonstrates what I'm capable of.

### Not done and how may be done

Redirect to the new transaction's location after a successful send
> Emit an action using redux after the transaction has been completed, that action uses navigation service provided by the router to accomplish this.

Bonus points for introducing basic form validation and closing the modal after a successful send.
> This can be accomplish in many ways. Form validation just requires validating every user input and store that within the component state. If the form is invalid we simply disable the submit button

Fix the styling issue causing the "Connect Wallet" button to disappear under certain screen widths.
> Didn't check but with the developer tools is dead ez to check css props or media queries involved on the button behavior.

Convert the transaction values to a human-readable format (from WEI to ETH), dealing with the respective decimals, and applying the conversion to both the list, the single page transaction views and accounting for this when submitting the form.
> Google wei to ETH. Actually the information is in the original readme..

### below there is relevant info of some commits:

`ac2ab27656a5d12cd5984d70661d53e275abf589`
Remove nodemon, fix server container was not starting. This solution may be argued but since we're using docker, I believe we can use docker's restart policy to handle downtimes, etc. (Also use docker service health to handle all intricacies of microservice development.) Hence there is no reason to choose nodemon. Since I knew how to make it work without it I got rid of it.

`a8b533e64b2959382b48210a566133e1c66eb78d`
Attr "receipt" was causing the query to fail since it was not included in the schema.

`0edbf18e7e489ae995fd55c9f2b197d5f2d260ef`
There was an issue regarding the hardcoded amount to be used for the transaction. Also, the libraries were outdated. And the proper functions needed to be called in order to connect metamask extension.

`17e98e387743e9ac36783b3b3cee8a8fc5f4e640`
I've moved all logic related to the wallet provider to a separate file in order to separate concerns.

`1ae14dc1dea32e676075650a6f7bb6ae62e801e5`
Here I've tied the service wallet in order to retrieve the actual wallet values to prefill the form.

`d91f389dc8f16e91dcfe3033d91a6804b28755f4`
Finally the transaction is working with actual values from the UI.
