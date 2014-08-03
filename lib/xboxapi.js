XboxApi.DEFAULT_HOST = 'xboxapi.com';
XboxApi.DEFAULT_PORT = '443';

// Use node's default timeout:
XboxApi.DEFAULT_TIMEOUT = require('http').createServer().timeout;

var https = require('https');

var methods = {
    AccountMessages: "/v2/messages",
    AccountXUID: "/v2/accountXuid",
    Activity: "/v2/{xuid}/activity",
    Followers: "/v2/{xuid}/followers",
    Friends: "/v2/{xuid}/friends",
    GameClips: "/v2/{xuid}/game-clips",
    GameStats: "/v2/{xuid}/game-stats/{titleId}",
    Gamercard: "/v2/{xuid}/gamercard",
    GamertagXUID: "/v2/xuid/{gamertag}",
    Presence: "/v2/{xuid}/presence",
    Profile: "/v2/{xuid}/profile",
    RecentActivity: "/v2/{xuid}/activity/recent",
    RecentPlayers: "/v2/recent-players",
    SavedGameClips: "/v2/{xuid}/game-clips/saved",
    XUIDGamertag: "/v2/gamertag/{xuid}",
    Xbox360Games: "/v2/{xuid}/xbox360games",
    XboxGameAchievements: "/v2/{xuid}/achievements/{titleId}",
    XboxGameInformationHEX: "/v2/game-details-hex/{game_id}",
    XboxGameInformation: "/v2/game-details/{product_id}",
    XboxONEGames: "/v2/{xuid}/xboxonegames"
};

function XboxApi(key) {

    if (!(this instanceof XboxApi)) {
        return new XboxApi(key);
    }

    this.key = key;

}

XboxApi.prototype = {

    get: function(method, params, cb) {

        var path = methods[method];
        if (!path) {
            return cb(new Error('Unknown method: ' + method));
        }

        var keys = Object.keys(params);
        for (var i = 0; i < keys.length; i++) {
            path = path.replace('{' + keys[i] + '}', params[keys[i]]);
        }

        var req = https.request({
            hostname: XboxApi.DEFAULT_HOST,
            port: XboxApi.DEFAULT_PORT,
            path: path,
            headers: {
                'X-AUTH': this.key
            }
        }, function (res) {
            var data = '';

            res.on('data', function (chunk) {
                data += chunk;
            });

            res.on('end', function () {
                if (res.statusCode === 401) {
                    return cb(new Error('Invalid Credentials'));
                }

                try {
                    var json = JSON.parse(data);
                    return cb(null, json);
                } catch (e) {
                    return cb(new Error('Invalid JSON received'));
                }
            });

            res.on('error', function (err) {
                return cb(err);
            });
        });

        req.on('error', function (err) {
            return cb(err);
        });

        req.setTimeout(XboxApi.DEFAULT_TIMEOUT, function() {
            return cb(new Error('Request aborted due to timeout being reached'));
        });

        req.end();

    }

};

module.exports = XboxApi;