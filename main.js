let storyPage = document.querySelector("#stories");

let url = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";

async function apiCall() {
  let res = await fetch(url);
  let data = await res.json();

  for (let i = 0; i < 100; i++) {
    let id = data[i];
    let url3 = `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`;
    stories(url3);
  }
}

async function stories(url) {
  let res = await fetch(url);
  let data = await res.json();
  let title = data.title;
  let score = data.score;
  let storyUrl = data.url;
  let kids = data.kids
  let commentNumber = kids ? kids.length : 0;
  let author = data.by;
  let story = {
    title: title,
    score: score,
    storyUrl: storyUrl,
    comments: commentNumber,
    author: author
  };

  let storyContainer = document.createElement("div");
  storyContainer.classList.add("story");

  let titleElem = document.createElement("h2");
  titleElem.classList.add("title");
  titleElem.innerText= story.title;
  storyContainer.appendChild(titleElem);

  let itemsContainer = document.createElement("div");
  itemsContainer.classList.add("items");

  let scoreElem = document.createElement("div");
  scoreElem.classList.add("score1");
  scoreElem.innerText = `Score: ${story.score}`;
  itemsContainer.appendChild(scoreElem);

  let userElem = document.createElement("div");
  userElem.classList.add("user");
  userElem.innerText = `Author: ${story.author}`;
  itemsContainer.appendChild(userElem);

  let commentElem = document.createElement("div");
  commentElem.classList.add("comment");
  commentElem.innerText = `Total comments: ${story.comments}`;
  itemsContainer.appendChild(commentElem);

  storyContainer.appendChild(itemsContainer);

  let storyLink = document.createElement("a");
  storyLink.href = story.storyUrl;
  storyLink.classList.add("story-link");
  storyLink.innerText = "Read more";
  storyContainer.appendChild(storyLink);

  storyPage.appendChild(storyContainer);
}

apiCall();
