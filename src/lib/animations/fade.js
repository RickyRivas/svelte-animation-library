
// default easing function (linear)
const defaultEasing = (t) => t

export function createFadeAnimation(node, options) {
    const {
        duration = 300,
        delay = 0,
        easing = defaultEasing,
        initialOpacity = 0,
        targetOpacity = 1
    } = options

    let start = null
    let rafId = null

    node.style.opacity = initialOpacity.toString()

    function animate(timeStamp) {
        if (!start) start = timeStamp

        const elapsed = timeStamp - start - delay

        if (elapsed < 0) {
            rafId = requestAnimationFrame(animate)
            return
        }

        const progress = Math.min(elapsed / duration, 1)
        const easedProgress = easing(progress)

        const currentOpacity = initialOpacity + (targetOpacity - initialOpacity) * easedProgress
        node.style.opacity = currentOpacity.toString()

        if (progress < 1) {
            rafId = requestAnimationFrame(animate)
        }
    }

    // Start animation
    rafId = requestAnimationFrame(animate)

    // cleanup function
    return {
        destroy() {
            cancelAnimationFrame(rafId)
        }
    }
}

export const easings = {
    linear: (t) => t,
    easeInCubic: (t) => t * t * t,
    easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
    easeInOutCubic: (t) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
}