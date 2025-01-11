function sendHeightToParent() {
  const height = document.documentElement.scrollHeight;
  window.parent.postMessage({ type: 'resize', height }, '*');
}

// Send height on page load and whenever the content changes
window.onload = sendHeightToParent;
window.onresize = sendHeightToParent;
