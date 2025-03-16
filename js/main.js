document.addEventListener("DOMContentLoaded", () => {
  const writingLink = document.getElementById("writing-link");
  const profileImage = document.getElementById("profile-image");
  const aboutSection = document.getElementById("about-section");
  const writingSection = document.getElementById("writing-section");

  writingLink.addEventListener("click", (e) => {
    e.preventDefault();
    aboutSection.classList.add("hidden");
    writingSection.classList.remove("hidden");
  });

  profileImage.addEventListener("click", () => {
    writingSection.classList.add("hidden");
    aboutSection.classList.remove("hidden");
  });
});
