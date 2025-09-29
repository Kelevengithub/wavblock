/**
 * Handles the 'typewriter' animation.
 * This function clears the target element, splits the desired text into words and characters,
 * and then reveals each character one by one with a configurable speed, simulating a typewriter.
 * A blinking cursor is shown during the animation.
 * @param {HTMLElement} element - The element to animate.
 */
function animateTypewriter(element) {
    const text = element.dataset.text || '';
    const speed = parseInt(element.dataset.speed, 10) || 100;
    let charIndex = 0;

   
    element.classList.add('is-visible', 'typewriter-cursor');
    element.innerHTML = ''; 

    
    const words = text.trim().split(/\s+/);
    
    words.forEach((word, wordIndex) => {
        const wordWrapper = document.createElement('span');
        wordWrapper.style.display = 'inline-block'; 

        word.split('').forEach(char => {
            const charSpan = document.createElement('span');
            charSpan.className = 'char-type'; 
            charSpan.textContent = char;
            wordWrapper.appendChild(charSpan);
        });

        element.appendChild(wordWrapper);

       
        if (wordIndex < words.length - 1) {
            element.appendChild(document.createTextNode(' '));
        }
    });

    const charsToType = element.querySelectorAll('.char-type');

    
    function type() {
        if (charIndex < charsToType.length) {
            charsToType[charIndex].style.visibility = 'visible';
            charIndex++;
            setTimeout(type, speed);
        } else {
            
            element.classList.remove('typewriter-cursor');
        }
    }

    
    type();
}


export const typewriter = {
    animate: animateTypewriter,
};
