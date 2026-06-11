// js/theme.js
document.addEventListener("DOMContentLoaded", () => {
  // Set background image
  document.body.style.backgroundImage = "url('/images/background.png')";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundAttachment = "fixed";

  // Add logo to heading
  const heading = document.querySelector(".site-heading");
  if (heading) {
    const logo = document.createElement("img");
    logo.src = "/images/logo.png";
    logo.alt = "Site Logo";
    logo.style.maxWidth = "150px";
    logo.style.margin = "20px auto";
    logo.style.display = "block";
    heading.insertBefore(logo, heading.firstChild);
  }
});
