// custom scroll tracker for learning purposes. Sure we could use
// intersection observer but I want more control similar to GSAPs scrollTrigger :)

export function createScrollTracker(element, config) {
    const {
        trigger = element, // Default to the animated element
        start = .5,
        once = false,
        offset = 0,
        onEnter,
        onLeave,
        onProgress
    } = config

    let hasTriggered = false
    let rafId = null
    let isTracking = false

    function getProgress() {
        // gets rects for both trigger and animated elements
        const triggerRect = trigger.getBoundingClientRect()
        const windowHeight = window.innerHeight;

        // calculate trigger point in viewport
        const viewportTriggerPoint = windowHeight * start

        // get trigger element's position
        const elementTrigger = triggerRect.top + (triggerRect.height * start) - offset;

        // calculate progress
        const progress = 1 - (elementTrigger - viewportTriggerPoint) / windowHeight;

        return {
            progress: Math.min(Math.max(progress, 0), 1),
            isInView: progress > 0 && progress < 1
        }
    }

    function update() {
        if (!isTracking) return

        const { progress, isInView } = getProgress()

        if (isInView) {
            if (!hasTriggered) {
                onEnter();
                hasTriggered = true
            }

            onProgress(progress)
        } else if (hasTriggered && !once) {
            onLeave()
            hasTriggered = false
        }

        rafId = requestAnimationFrame(update)
    }

    function scrollTrackerStart() {
        if (isTracking) return
        isTracking = true;
        update()
    }

    function scrollTrackerStop() {
        isTracking = false
        if (rafId) {
            cancelAnimationFrame(rafId)
            rafId = null
        }
    }

    return {
        scrollTrackerStart,
        scrollTrackerStop
    }
}