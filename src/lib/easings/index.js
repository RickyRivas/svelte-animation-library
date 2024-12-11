// src/lib/easings/index.ts

// Basic easings
export const linear = (t) => t;

// Quad easings
export const easeInQuad = (t) => t * t;
export const easeOutQuad = (t) => t * (2 - t);
export const easeInOutQuad = (t) =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

// Cubic easings
export const easeInCubic = (t) => t * t * t;
export const easeOutCubic = (t) => --t * t * t + 1;
export const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

// Bouncy/elastic easings
export const easeOutBack = (t) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

// categories
export const quad = {
    in: easeInQuad,
    out: easeOutQuad,
    inOut: easeInOutQuad
};

export const cubic = {
    in: easeInCubic,
    out: easeOutCubic,
    inOut: easeInOutCubic
};