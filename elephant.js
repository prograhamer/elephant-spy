let getURL;
if (typeof chrome !== 'undefined') {
	getURL = chrome.runtime.getURL;
} else {
	getURL = browser.runtime.getURL;
}

const url = getURL("assets/elephant.mp3");
const trumpeter = document.createElement("audio");
const source = document.createElement("source");
source.src = url;
source.type = "audio/mpeg";
trumpeter.appendChild(source);

document.body.append(trumpeter);

let logger = (records, observer) => {
  for (const record of records) {
    for (const added of record.addedNodes) {
			if (added.classList && added.classList.contains("ark-card-title") && /(african bush|asian) elephant/i.test(added.innerHTML)) {
				trumpeter.play();
			}
    }
  }
};

const observerOptions = {
  childList: true,
  subtree: true,
};

const observer = new MutationObserver(logger);
observer.observe(document.querySelector("body"), observerOptions);
