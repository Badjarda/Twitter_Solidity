const Tweets = ({ tweets, shortAddress }) => {
  return (
    <div id="tweetsContainer">
      {tweets.map((tweet, index) => (
        <div key={index} className="tweet">
          <img
            className="user-icon"
            src={`https://robohash.org/${tweet.author}.png?set=set4`}
            alt="User Icon"
          />
          <div className="tweet-inner">
            <div className="author">{shortAddress(tweet.author)}</div>
            <div className="content">{tweet.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tweets;
