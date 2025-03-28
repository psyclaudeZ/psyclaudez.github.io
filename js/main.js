const POST_TYPE = {
  BLOG: "Bloggy",
  TWEETY: "Tweety",
};

const VIEW_STATES = {
  ABOUT: "about",
  WRITING_LIST: "writing_list",
  POST: "post",
};

const posts = [
  {
    title: "Yet Another Yet Another Blog",
    date: "2025-03-17",
    type: POST_TYPE.TWEETY,
    content: `This is my <code>N</code>th blog and <code>N-1</code>th "Yet Another Blog" post, where <code>N >= 3</code>. Let's see how far I can go this time.`,
    url: "",
  },
  {
    title: "Write-to-learn Transformers",
    date: "2025-03-26",
    type: POST_TYPE.BLOG,
    content: "",
    url: "https://bz.bearblog.dev/write-to-learn-transformers/",
  },
];
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

document.addEventListener("DOMContentLoaded", () => {
  const writingLink = document.getElementById("writing-link");
  const profileImage = document.getElementById("profile-image");
  const aboutSection = document.getElementById("about-section");
  const writingSection = document.getElementById("writing-section");
  let currentView = VIEW_STATES.ABOUT;

  writingLink.addEventListener("click", (e) => {
    e.preventDefault();
    showWritingList();
  });

  profileImage.addEventListener("click", () => {
    if (currentView === VIEW_STATES.POST) {
      showWritingList();
    } else {
      showAbout();
    }
  });

  function showAbout() {
    writingSection.classList.add("hidden");
    aboutSection.classList.remove("hidden");
    profileImage.parentElement.classList.remove("show-back");
    currentView = VIEW_STATES.ABOUT;
  }

  function showWritingList() {
    aboutSection.classList.add("hidden");
    writingSection.innerHTML = generatePostLink(posts);
    writingSection.classList.remove("hidden");
    profileImage.parentElement.classList.add("show-back");
    currentView = VIEW_STATES.WRITING_LIST;
    registerPostLink();
  }

  function showPost(post) {
    writingSection.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p><span class="date">${post.date}</span>`;
    currentView = VIEW_STATES.POST;
  }

  function registerPostLink() {
    const postLinks = document.querySelectorAll(".post-link");
    postLinks.forEach((postLink) => {
      postLink.addEventListener("click", (e) => {
        const postId = e.target.dataset.postId;
        const post = posts[postId];

        if (!post || post.type !== POST_TYPE.TWEETY) {
          return;
        }

        showPost(post);
      });
    });
  }
});

function generatePostLink(posts) {
  const listItems = posts.map((post, idx) => {
    const isTweety = post.type === POST_TYPE.TWEETY;
    return `<li><span class="date">${
      post.date
    }</span><a class="post-link" href=${isTweety ? "#" : post.url} target=${
      isTweety ? "_self" : "_tab"
    } data-post-id=${idx}>[${post.type}] ${post.title}</a></li>`;
  });
  return `<ul class="writing-list">${listItems.join("")}</ul>`;
}
