# node-xboxapiv2

## Overview

A Node.js module for interfacing with v2 of the <a href="https://xboxapi.com/">Unofficial XBOX Api</a>

## Installation

`npm install node-xboxapiv2`

## Documentation

Please refer to the <a href="https://xboxapi.com/documentation">Unofficial XBOX Api Documentation</a>

## API Overview

Every api method is accessed via your `xboxapiv2` instance's `get` method:

```js
var xboxapiv2 = require('node-xboxapiv2')({XBOX API AUTH_KEY});
xboxapiv2.get({method name}, [{params}], [{callback}];
```

Every method accepts an optional callback as the last argument:

```js
xboxapiv2.get(
    'AccountXUID',
    function(err, response) {
        //handle response
    }
);
```

### Available methods

*To call a method, pass the method name as the first parameter to `get` and the method parameters as a plain old JavaScript object as the second parameter to `get`, e.g.*

`xboxapiv2.get('GameStats', { xuid: {XUID}, titleId: {TITLEID} })`

 * `AccountMessages()`
 * `AccountXUID()`
 * `Activity(xuid)`
 * `Followers(xuid)`
 * `Friends(xuid)`
 * `GameClips(xuid)`
 * `GameStats(xuid, titleId)`
 * `Gamercard(xuid)`
 * `GamertagXUID(gamertag)`
 * `Presence(xuid)`
 * `Profile(xuid)`
 * `RecentActivity(xuid)`
 * `RecentPlayers()`
 * `SavedGameClips(xuid)`
 * `XUIDGamertag(xuid)`
 * `Xbox360Games(xuid)`
 * `XboxGameAchievements(xuid, titleId)`
 * `XboxGameInformationHEX(game_id)`
 * `XboxGameInformation(product_id)`
 * `XboxONEGames(xuid)`

## Author

Trevon Romanuik