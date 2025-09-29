/**
 * Handles the 'letter-fade' animation.
 * This function clears the target element, splits text into words and letters,
 * and then fades in each letter individually with a configurable delay.
 * This creates a smooth, elegant text reveal without a typing effect.
 * @param {HTMLElement} element - The element to animate.
 */
function animateLetterFade(element) {
    
    const text = element.dataset.text || element.textContent;
    const speed = parseInt(element.dataset.speed, 10) || 50;
    
    element.classList.add('is-visible');
    element.innerHTML = ''; 

    
    const words = text.trim().split(/\s+/);

    words.forEach((word, wordIndex) => {
        const wordWrapper = document.createElement('span');
        wordWrapper.style.display = 'inline-block'; 

        word.split('').forEach(char => {
            const letterSpan = document.createElement('span');
            letterSpan.className = 'letter';
            letterSpan.textContent = char;
            wordWrapper.appendChild(letterSpan);
        });

        element.appendChild(wordWrapper);

        
        if (wordIndex < words.length - 1) {
            element.appendChild(document.createTextNode(' '));
        }
    });

    // Animate each letter with a staggered timeout
    const letters = element.querySelectorAll('.letter');
    letters.forEach((letter, index) => {
        setTimeout(() => {
            letter.classList.add('is-visible');
        }, index * speed);
    });
}


export const letterFade = {
    animate: animateLetterFade,
};
