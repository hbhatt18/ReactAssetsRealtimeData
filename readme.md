This project shows Realtime values of assets and have following functionality

* A table with all of the assets information
* The prices update every second
* Allow to sort for each one of the model fields
* Allow to filter for each one of the model fields

The Assets have following details:- ID, Asset Name, Price, Last Update, Type of Asset

There are total 400 random assets that has 200 currencies and 200 stocks and ID starts from 1.
In order to generate random asset name ID is appended with the asset name.

There is an update to asset price every second and table will be updated with the timestamp that the asset price changed.
Price is updated from -1 to 1 with the assumption that asset price can go in Negative.
Price update even upon sorting or filtering. 
For, example you can filter on your favorite asset and see the price being changed every second.

To run the project just run npm start, and it should open in a browser with Realtime Asset Data.

Areas to Improve
* Can add red or green color to negative or positive asset price
* Can show graph of asset price going up or down
* Add to favorites button
* favorites should be persist  to localstorage
* favorites should be pin to the top of the table

