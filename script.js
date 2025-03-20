const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("authorName");
const newQuoteButton = document.getElementById("newQuote");
const copyButton = document.getElementById("coppy");
const twitterButton = document.getElementById("share");
const exportButton = document.getElementById("download");
const quoteBox = document.getElementById("container");

const backgroundPictures = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80",
  "https://images.unsplash.com/photo-1474524955719-b1d202f99ad5?w=1920&q=80",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80",
  "https://images.unsplash.com/photo-1438786657495-640937046d18?w=1920&q=80",
  "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1920&q=80",
  "https://images.unsplash.com/photo-1501785886872-3a3517e4d092?w=1920&q=80",
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1920&q=80",
  "https://images.unsplash.com/photo-1511300636408-a63a89df6d46?w=1920&q=80",
];

function showNewQuote() {
  fetch("https://api.freeapi.app/api/v1/public/quotes/quote/random")
    .then((response) => response.json())
    .then((data) => {
      const quote = data.data;
      quoteText.textContent = `"${quote.content}"`;
      quoteAuthor.textContent = `- ${quote.author || "Unknown"}`;

  
      const picture =
        backgroundPictures[
          Math.floor(Math.random() * backgroundPictures.length)
        ];
      document.body.style.backgroundImage = `url(${picture})`;
    })
    .catch(() => {
      quoteText.textContent = '"Something went wrong!"';
      quoteAuthor.textContent = "- Oops";
    });
}


function copyQuote() {
  const fullText = `${quoteText.textContent}\n${quoteAuthor.textContent}`;
  navigator.clipboard.writeText(fullText);
  alert("Copied!");
}


function shareOnTwitter() {
  const fullText = `${quoteText.textContent} ${quoteAuthor.textContent}`;
  const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    fullText
  )}`;
  window.open(twitterLink, "_blank");
}


function saveAsPicture() {
  html2canvas(quoteBox).then((canvas) => {
    const downloadLink = document.createElement("a");
    downloadLink.download = "quote.png";
    downloadLink.href = canvas.toDataURL("image/png");
    downloadLink.click();
  });
}


newQuoteButton.addEventListener("click", showNewQuote);
copyButton.addEventListener("click", copyQuote);
twitterButton.addEventListener("click", shareOnTwitter);
exportButton.addEventListener("click", saveAsPicture);


showNewQuote();