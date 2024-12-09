import { createFadeAnimation } from "$lib/animations/fade";
export function fade(node, options) {
    return createFadeAnimation(node, options)
}