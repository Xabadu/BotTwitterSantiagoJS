require('./config/config');

const Twitter = require('twit');

let client = new Twitter({
    consumer_key: TWITTER_CONSUMER_KEY,
    consumer_secret: TWITTER_CONSUMER_SECRET,
    access_token: TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: TWITTER_ACCESS_TOKEN_SECRET
});

let reTweetById = (tweetId) => {
    client.post('statuses/retweet/:id', {id: tweetId}, function (err, tweet, response) {
        if (err) {
            console.log('error: ', err.allErrors[0]);
        } else {
            console.log('id: ', tweet.id);
            console.log('text: ', tweet.text);
        }
    });
}

let stream = client.stream('statuses/filter', {track: '#apple'})

stream.on('tweet', function (tweet) {
    let tweetId = tweet.id_str;
    console.log(tweetId);
    reTweetById(tweetId);
});