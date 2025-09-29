
import { textReveal } from './animations/textReveal.js';
import { fadeInText } from './animations/fadeInText.js';
import { typewriter } from './animations/typewriter.js';
import { typewriterFade } from './animations/typewriterFade.js';
import { letterFade } from './animations/letterFade.js';

/**
 * The Animation Manager.
 * This object serves as a central registry for all JS-driven animation handlers.
 * The keys correspond to the `data-wavblock` attribute value on an HTML element.
 * Each value is an object that can contain a `prepare` function (for initial DOM setup)
 * and/or an `animate` function (to execute the animation).
 *
 * To add a new animation:
 * 1. Create a new file in the `animations/` directory (e.g., `newAnimation.js`).
 * 2. In that file, create and export a handler object (e.g., `export const newAnimation = { ... };`).
 * 3. Import the new handler here and add it to the `animationHandlers` object.
 *
 * To remove an animation:
 * 1. Simply remove its import and delete it from the `animationHandlers` object.
 */
export const animationHandlers = {
    'text-reveal': textReveal,
    'fade-in-text': fadeInText,
    'typewriter': typewriter,
    'typewriter-fade': typewriterFade,
    'letter-fade': letterFade,
    // Add new JS-based animation handlers here.
};
