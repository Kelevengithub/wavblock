/**
 * Handles the 'typewriter-fade' animation.
 * This function clears the target element, splits text into words and characters,
 * and then reveals each character by fading it in with a slight upward translation.
 * It does not use a cursor, offering a smoother, more modern effect.
 * @param {HTMLElement} element - The element to animate.
 */
function animateTypewriterFade(element) {
    const text = element.dataset.text || '';
    const speed = parseInt(element.dataset.speed, 10) || 80;
    let charIndex = 0;

    element.classList.add('is-visible');
    element.innerHTML = ''; 

    
    const words = text.trim().split(/\s+/);

    words.forEach((word, wordIndex) => {
        const wordWrapper = document.createElement('span');
        wordWrapper.style.display = 'inline-block'; 

        word.split('').forEach(char => {
            const charSpan = document.createElement('span');
            charSpan.className = 'char'; 
            charSpan.textContent = char;
            wordWrapper.appendChild(charSpan);
        });

        element.appendChild(wordWrapper);

        
        if (wordIndex < words.length - 1) {
            element.appendChild(document.createTextNode(' '));
        }
    });

    const chars = element.querySelectorAll('.char');

    
    function revealChar() {
        if (charIndex < chars.length) {
            chars[charIndex].classList.add('is-visible');
            charIndex++;
            setTimeout(revealChar, speed);
        }
    }

    
    revealChar();
}


export const typewriterFade = {
    animate: animateTypewriterFade,
};
