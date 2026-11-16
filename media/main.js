document.getElementById("yellow").style.color = "yellow";

// Webview URL of the extension's media/ folder, injected by extension.ts
const mediaUri = document.body.dataset.mediaUri;

function setBackground(name) {
    document.body.style.backgroundImage = `url("${mediaUri}/backgrounds/${name}.png")`;
}

setBackground("forest");
