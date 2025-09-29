import { animationHandlers } from './animationManager.js';

/**
 * WavBlock.js | A lightweight, vanilla JS scroll-triggered animation library.
 * @version 1.0.0
 * @author Keleven
 * @license MIT
 */
const WavBlock = (() => {
    
    const config = {
        animationTriggerSelector: '[data-wavblock]',
        staggerContainerValue: 'stagger-children',
        visibleClass: 'is-visible',
        observerThreshold: 0.2,
    };

    /**
     * Applies static, non-delay-related styles from data attributes.
     * @param {HTMLElement} element The element to style.
     */
    const applyStaticStyles = (element) => {
        const { duration, easing, translateAmount } = element.dataset;
        if (duration) element.style.setProperty('--anim-duration', duration);
        if (easing) element.style.setProperty('--anim-easing', easing);
        if (translateAmount) element.style.setProperty('--translate-amount', translateAmount);
    };

    /**
     * The callback for the IntersectionObserver. This function contains the
     * core logic for calculating delays and triggering animations reliably.
     * @param {IntersectionObserverEntry[]} entries The observed entries.
     * @param {IntersectionObserver} observer The observer instance.
     */
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const element = entry.target;
            const animType = element.dataset.wavblock;

            // Stop observing the element to prevent re-animation.
            observer.unobserve(element);

            // --- 1. Calculate Animation Delay ---
            let delay = '0ms';
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

            // --- 2. Trigger JS or CSS Animation ---
            const handler = animationHandlers[animType];
            if (handler && typeof handler.animate === 'function') {
                // For JS-based animations, use setTimeout to respect the delay.
                const delayMs = parseInt(delay, 10);
                setTimeout(() => handler.animate(element), delayMs);
            } else {
                // For CSS-based animations, apply delay and trigger in separate frames.
                // Frame 1: Apply the delay.
                element.style.transitionDelay = delay;
                
                // Frame 2: Use requestAnimationFrame to add the trigger class on the next paint cycle.
                requestAnimationFrame(() => {
                    element.classList.add(config.visibleClass);
                });
            }
        });
    };

    /**
     * Initializes the WavBlock library. Finds all target elements,
     * runs preparations, and sets up the IntersectionObserver.
     */
    const init = () => {
        const elements = document.querySelectorAll(config.animationTriggerSelector);
        if (elements.length === 0) {
            console.warn("WavBlock.js: No elements found with 'data-wavblock' attribute.");
            return;
        }

        // --- Preparation Step ---
        elements.forEach(el => {
            const animType = el.dataset.wavblock;
            const handler = animationHandlers[animType];
            
            if (handler && typeof handler.prepare === 'function') {
                handler.prepare(el);
            }
        
            applyStaticStyles(el);
        });
        
        // Re-query elements in case the 'prepare' step created new animatable elements.
        const allElementsToAnimate = document.querySelectorAll(config.animationTriggerSelector);

        // --- Observation Step ---
        const observer = new IntersectionObserver(observerCallback, {
            root: null,
            threshold: config.observerThreshold,
        });

        allElementsToAnimate.forEach(el => observer.observe(el));
    };

    return { init };
})();

// --- Auto-initialize on DOMContentLoaded ---
document.addEventListener('DOMContentLoaded', () => {
    WavBlock.init();
});

