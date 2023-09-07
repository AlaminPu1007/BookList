## This application is used to render list of images and download any of them

**Procedure of running this project :**<br/>

-   Clone this repo
-   copy `.env.example` and rename with `.env`, then put your `api-key`, `secret-key`, [set base url](https://api.unsplash.com)
-   Run `npm run android/ios`

**Key-Features :**<br/>

-   Image list with infinity scroll features
-   Download specific image at unlimited time
-   caching features of image

**Futures implemented features :**<br/>

-   Pull to refresh data
-   Handle server side error with all possible way, like worst case senario
-   Will be handle net-connection of user devices
-   will be optimse local-db after larger amount of data
-   will be optimise larger list render procedure by `VirtualizedList` property
