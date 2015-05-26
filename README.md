# YTInstantSearch

##Notes / Features:
- instant search!
- ability to toggle between regular and instant search
- Tint-inspired color scheme :)

##Additional Questions:
How could a search feature integrate with our existing product?

  A search feature could be used to allow users to search social media by selecting from a list of pre-determined search terms, (or simply choose the pre-determined search term that most closely matches the search term entered by the user), related to a company and it’s products. For instance, imagine a user thinking of buying a tablet from FutureShop. The user could use the search feature on an in-store display and search using several search terms, each perhaps corresponding to a specific tablet model, to view tweets, Facebook posts or even YouTube videos about the given product. This would give the user a true sense of what real people are saying about that particular tablet and would thus give them a real-time, social media-driven product review or sentiment analysis. The user could also be shown metrics related to the various search terms to add another dimension to their decision-making process, such as which tablets have been mentioned most positively in social media chatter.
The search terms entered by users would also provide clients like FutureShop with valuable insights into their customers, such as the tablets that are most and least searched for, and perhaps what features of tablets are searched for most, like batter-life, durability, etc.


What questions would you want to ask customers in order to improve this feature?

  One key question I would want to ask customers is in what ways they would like to view the search results. For instance, would they like the ability to view tweets and Facebook posts separately, and what kinds of metrics would they like to see about their search?
I would also want to ask customers whether they feel the pre-determined search terms they have to choose from are sufficient or whether they feel they are unable to get the true insight they are looking for with the search terms given. This is critical information, both for the customer, since they may not be able to fully get to the heart of what they want to find out about a given product, and for the company hosting the service, as they could be unaware of factors that affect their customers’ buying behaviour, simply because customers aren’t able to fully able to express themselves using the search terms given.


Notes on any issues you ran into and how you worked around them.

  When I first started working with the YouTube APIs, I was unaware that the code for the APIs was being loaded asynchronously, which led to strange sequences of events in my code. Thankfully though, after spending time understanding the asynchronous functions and modifying their callbacks, I was able to make the code execute the way I wanted it to.
Another issue I had to consider was highlighting a video in the playlist section on the right side when the player automatically finished a video and began playing the next, or if the user switched videos from within the player itself. However, after doing some further reading into the API documentation, I realized I could just use the onPlayerStateChange() callback function in conjunction with the getPlaylistIndex() method, to determine the index of the video in the playlist which just began playing, thus allowing me to easily update that video’s display.
