/**
 * Prepares an element for the 'text-reveal' animation.
 * This animation works by wrapping the text content in nested spans,
 * allowing a 'sliding up from behind a mask' effect controlled by CSS.
 * @param {HTMLElement} element - The element to prepare.
 */
function prepareTextReveal(element) {
    
    if (element.querySelector('.text-reveal-mask')) return;

    const text = element.textContent.trim();
    element.innerHTML = ''; 

    // Create the outer mask element
    const mask = document.createElement('span');
    mask.className = 'text-reveal-mask';

    // Create the inner element that will be translated
    const inner = document.createElement('span');
    inner.className = 'text-reveal-inner';
    inner.textContent = text;

    // Assemble the structure
    mask.appendChild(inner);
    element.appendChild(mask);
}


export const textReveal = {
    prepare: prepareTextReveal,
};
