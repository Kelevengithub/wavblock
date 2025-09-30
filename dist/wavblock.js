/*!
 * WavBlock.js v1.0.1
 * Author: Kaustav M. Bhuyan
 * (c) 2025 Keleven
 * Released under the MIT License
 * https://github.com/Kelevengithub/wavblock
 */
(function() {
    "use strict";
    function prepareTextReveal(element) {
        if (element.querySelector(".text-reveal-mask")) return;
        const text = element.textContent.trim();
        element.innerHTML = "";
        const mask = document.createElement("span");
        mask.className = "text-reveal-mask";
        const inner = document.createElement("span");
        inner.className = "text-reveal-inner";
        inner.textContent = text;
        mask.appendChild(inner);
        element.appendChild(mask);
    }
    const textReveal = {
        prepare: prepareTextReveal
    };
    function prepareFadeInText(element) {
        if (element.dataset.prepared) return;
        const text = element.textContent.trim();
        const words = text.split(/\s+/);
        element.innerHTML = "";
        words.forEach(word => {
            const wordSpan = document.createElement("span");
            wordSpan.className = "fade-in-word-wrapper";
            wordSpan.dataset.wavblock = "fade-up";
            wordSpan.textContent = word;
            element.appendChild(wordSpan);
            element.appendChild(document.createTextNode(" "));
        });
        element.dataset.prepared = "true";
        element.dataset.wavblock = "stagger-children";
    }
    const fadeInText = {
        prepare: prepareFadeInText
    };
    function animateTypewriter(element) {
        const text = element.dataset.text || "";
        const speed = parseInt(element.dataset.speed, 10) || 100;
        let charIndex = 0;
        element.classList.add("is-visible", "typewriter-cursor");
        element.innerHTML = "";
        const words = text.trim().split(/\s+/);
        words.forEach((word, wordIndex) => {
            const wordWrapper = document.createElement("span");
            wordWrapper.style.display = "inline-block";
            word.split("").forEach(char => {
                const charSpan = document.createElement("span");
                charSpan.className = "char-type";
                charSpan.textContent = char;
                wordWrapper.appendChild(charSpan);
            });
            element.appendChild(wordWrapper);
            if (wordIndex < words.length - 1) {
                element.appendChild(document.createTextNode(" "));
            }
        });
        const charsToType = element.querySelectorAll(".char-type");
        function type() {
            if (charIndex < charsToType.length) {
                charsToType[charIndex].style.visibility = "visible";
                charIndex++;
                setTimeout(type, speed);
            } else {
                element.classList.remove("typewriter-cursor");
            }
        }
        type();
    }
    const typewriter = {
        animate: animateTypewriter
    };
    function animateTypewriterFade(element) {
        const text = element.dataset.text || "";
        const speed = parseInt(element.dataset.speed, 10) || 80;
        let charIndex = 0;
        element.classList.add("is-visible");
        element.innerHTML = "";
        const words = text.trim().split(/\s+/);
        words.forEach((word, wordIndex) => {
            const wordWrapper = document.createElement("span");
            wordWrapper.style.display = "inline-block";
            word.split("").forEach(char => {
                const charSpan = document.createElement("span");
                charSpan.className = "char";
                charSpan.textContent = char;
                wordWrapper.appendChild(charSpan);
            });
            element.appendChild(wordWrapper);
            if (wordIndex < words.length - 1) {
                element.appendChild(document.createTextNode(" "));
            }
        });
        const chars = element.querySelectorAll(".char");
        function revealChar() {
            if (charIndex < chars.length) {
                chars[charIndex].classList.add("is-visible");
                charIndex++;
                setTimeout(revealChar, speed);
            }
        }
        revealChar();
    }
    const typewriterFade = {
        animate: animateTypewriterFade
    };
    function animateLetterFade(element) {
        const text = element.dataset.text || element.textContent;
        const speed = parseInt(element.dataset.speed, 10) || 50;
        element.classList.add("is-visible");
        element.innerHTML = "";
        const words = text.trim().split(/\s+/);
        words.forEach((word, wordIndex) => {
            const wordWrapper = document.createElement("span");
            wordWrapper.style.display = "inline-block";
            word.split("").forEach(char => {
                const letterSpan = document.createElement("span");
                letterSpan.className = "letter";
                letterSpan.textContent = char;
                wordWrapper.appendChild(letterSpan);
            });
            element.appendChild(wordWrapper);
            if (wordIndex < words.length - 1) {
                element.appendChild(document.createTextNode(" "));
            }
        });
        const letters = element.querySelectorAll(".letter");
        letters.forEach((letter, index) => {
            setTimeout(() => {
                letter.classList.add("is-visible");
            }, index * speed);
        });
    }
    const letterFade = {
        animate: animateLetterFade
    };
    const animationHandlers = {
        "text-reveal": textReveal,
        "fade-in-text": fadeInText,
        typewriter: typewriter,
        "typewriter-fade": typewriterFade,
        "letter-fade": letterFade
    };
    const WavBlock = (() => {
        const config = {
            animationTriggerSelector: "[data-wavblock]",
            staggerContainerValue: "stagger-children",
            visibleClass: "is-visible",
            observerThreshold: .2
        };
        const applyStaticStyles = element => {
            const {duration: duration, easing: easing, translateAmount: translateAmount} = element.dataset;
            if (duration) element.style.setProperty("--anim-duration", duration);
            if (easing) element.style.setProperty("--anim-easing", easing);
            if (translateAmount) element.style.setProperty("--translate-amount", translateAmount);
        };
        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const element = entry.target;
                const animType = element.dataset.wavblock;
                observer.unobserve(element);
                let delay = "0ms";
                const parent = element.parentElement;
                if (parent && parent.dataset.wavblock === config.staggerContainerValue) {
                    const staggerDelay = parseInt(parent.dataset.staggerDelay, 10) || 100;
                    const childrenToAnimate = Array.from(parent.children).filter(child => child.matches(config.animationTriggerSelector));
                    const index = childrenToAnimate.indexOf(element);
                    if (index > -1) {
                        delay = `${index * staggerDelay}ms`;
                    }
                } else if (element.dataset.delay) {
                    const dataDelay = element.dataset.delay;
                    delay = /^\d+$/.test(dataDelay) ? `${dataDelay}ms` : dataDelay;
                }
                const handler = animationHandlers[animType];
                if (handler && typeof handler.animate === "function") {
                    const delayMs = parseInt(delay, 10);
                    setTimeout(() => handler.animate(element), delayMs);
                } else {
                    element.style.transitionDelay = delay;
                    requestAnimationFrame(() => {
                        element.classList.add(config.visibleClass);
                    });
                }
            });
        };
        const init = () => {
            const elements = document.querySelectorAll(config.animationTriggerSelector);
            if (elements.length === 0) {
                console.warn("WavBlock.js: No elements found with 'data-wavblock' attribute.");
                return;
            }
            elements.forEach(el => {
                const animType = el.dataset.wavblock;
                const handler = animationHandlers[animType];
                if (handler && typeof handler.prepare === "function") {
                    handler.prepare(el);
                }
                applyStaticStyles(el);
            });
            const allElementsToAnimate = document.querySelectorAll(config.animationTriggerSelector);
            const observer = new IntersectionObserver(observerCallback, {
                root: null,
                threshold: config.observerThreshold
            });
            allElementsToAnimate.forEach(el => observer.observe(el));
        };
        return {
            init: init
        };
    })();
    document.addEventListener("DOMContentLoaded", () => {
        WavBlock.init();
    });
})();
