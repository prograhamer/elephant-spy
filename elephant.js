let url = browser.runtime.getURL("assets/elephant.mp3");
let trumpeter = document.createElement("audio");
let source = document.createElement("source");
source.src = url;
source.type = "audio/mpeg";
trumpeter.appendChild(source);

document.body.append(trumpeter);

if (document.querySelector('[id*="lephant"]') !== null) {
	trumpeter.play();
}

let logger = (records, observer) => {
  for (const record of records) {
    for (const added of record.addedNodes) {
			if (added.id && /[Ee]lephant/.test(added.id)) {
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
