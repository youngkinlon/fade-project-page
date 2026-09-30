document.querySelectorAll('[data-image-slot]').forEach((slot) => {
  const img = slot.querySelector('img');
  if (!img) return;
  const reveal = () => {
    if (img.naturalWidth > 0) {
      slot.classList.add('is-loaded');
    }
  };
  img.addEventListener('load', reveal);
  if (img.complete) reveal();
});

const copyButton = document.getElementById('copy-bibtex');
const bibtex = document.getElementById('bibtex-code');
if (copyButton && bibtex) {
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(bibtex.textContent);
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(bibtex);
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand('copy');
      selection.removeAllRanges();
    }
    copyButton.textContent = 'Copied!';
    copyButton.classList.add('copied');
    window.setTimeout(() => {
      copyButton.textContent = 'Copy citation ↗';
      copyButton.classList.remove('copied');
    }, 2200);
  });
}
