const getURL = (asset) => {
	if (typeof chrome !== 'undefined') {
		return chrome.runtime.getURL(asset);
	}

	return browser.runtime.getURL(asset);
}

const getAudioElement = (asset) => {
	const url = getURL(asset);
	const audio = document.createElement("audio");
	const source = document.createElement("source");
	source.src = url;
	source.type = "audio/mpeg";
	audio.appendChild(source);
	return audio;
}

const trumpeter = getAudioElement("assets/elephant.mp3");
document.body.append(trumpeter);
const chitterer = getAudioElement("assets/eagle.mp3");
document.body.append(chitterer);

let logger = (records, observer) => {
	for (const record of records) {
		for (const added of record.addedNodes) {
			if (added.classList && added.classList.contains("ark-card") && added.classList.contains("animal-card")) {
				if (/resistance/i.test(added.innerText)) {
					trumpeter.play();
				} else if (/determination/i.test(added.innerText)) {
					chitterer.play();
				}
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
