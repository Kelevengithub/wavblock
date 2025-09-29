/**
 * Prepares an element for the 'fade-in-text' animation.
 * It splits the text content into individual words, wraps each word in a span,
 * and sets them up for a staggered 'fade-up' animation.
 * The parent element's data-wavblock attribute is changed to 'stagger-children'.
 * @param {HTMLElement} element - The element to prepare.
 */
function prepareFadeInText(element) {
   
    if (element.dataset.prepared) return;

    const text = element.textContent.trim();
    const words = text.split(/\s+/);

    element.innerHTML = '';

    // Create a span for each word and set it up for animation
    words.forEach(word => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'fade-in-word-wrapper';
        wordSpan.dataset.wavblock = 'fade-up';
        wordSpan.textContent = word;
        element.appendChild(wordSpan);
        
        element.appendChild(document.createTextNode(' '));
    });

    // Mark the element as prepared to prevent re-running this logic.
    element.dataset.prepared = 'true';
    
    // Convert the parent to handle staggering its new children.
    element.dataset.wavblock = 'stagger-children';
}


export const fadeInText = {
    prepare: prepareFadeInText,
};
