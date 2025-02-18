import { useState } from "react";

const Tweets = ({ tweets, shortAddress, contract, account, getTweets }) => {

  // Helper function to format timestamp to dd/mm/yyyy
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-GB"); // dd/mm/yyyy
  };

  // Handle like button click
  const handleLike = async (tweet) => {
    try {
      await contract.methods.likeTweet(tweet.author, tweet.id).send({ from: account });
      getTweets(); // Refresh tweets to show updated like count
    } catch (error) {
      console.error("Failed to like tweet:", error);
    }
  };

  return (
    <div id="tweetsContainer">
      {tweets.map((tweet, index) => (
        <div key={index} className="tweet" style={{ position: "relative", padding: "15px", border: "1px solid #ccc", margin: "10px 0", borderRadius: "10px" }}>
          {/* User Icon */}
          <img
            className="user-icon"
            src={`https://robohash.org/${tweet.author}.png`}
            alt="User Icon"
            style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px" }}
          />
          
          {/* Tweet Content */}
          <div className="tweet-inner">
            <div className="author" style={{ fontWeight: "bold", marginBottom: "5px" }}>
              {tweet.displayName} ({shortAddress(tweet.author)})
            </div>
            <div className="content" style={{ marginBottom: "10px" }}>{tweet.content}</div>
          </div>

          {/* Display Date in the Top Right Corner */}
          <div
            className="tweet-date"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              fontSize: "12px",
              color: "#555",
            }}
          >
            {formatDate(tweet.timestamp)}
          </div>

          {/* Like Button with Heart */}
          <div className="likes" style={{ marginTop: "10px", display: "flex", alignItems: "center" }}>
            <button
              onClick={() => handleLike(tweet)}
              style={{
                border: "none",
                background: "transparent",
                fontSize: "20px",
                cursor: "pointer",
                marginRight: "5px",
              }}
              title="Like this tweet"
            >
              ❤️
            </button>
            <span style={{ fontSize: "16px", color: "#333" }}>{tweet.likes}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tweets;
