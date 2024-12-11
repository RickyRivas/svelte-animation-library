import { linear } from "svelte/easing"

export function createAnimation(config) {
    let startTime

    // requestAnimationFrame Id
    let rafId
    const defaultConfig = {
        easing: linear,
        ...config
    }

    // ensure 'to' has all properties from 'from' and vice versa
    const properties = new Set([
        ...Object.keys(defaultConfig.from),
        ...Object.keys(defaultConfig.to)
    ])

    // fill in missing properties with matching values
    properties.forEach(prop => {
        if (!(prop in defaultConfig.from)) {
            defaultConfig.from[ prop ] = defaultConfig.to[ prop ]
        }

        if (!(prop in defaultConfig.to)) {
            defaultConfig.to[ prop ] = defaultConfig.from[ prop ]
        }
    })

    function interpolate(from, to, progress) {
        return from + (to - from) * progress
    }

    function start() {
        startTime = null

        function animate(timestamp) {
            if (!startTime) startTime = timestamp;

            const elapsed = timestamp - startTime
            const progress = Math.min(elapsed / defaultConfig.duration, 1)

            const easedProgress = defaultConfig.easing(progress)

            // interpolate all properties
            const currentValues = {}
            properties.forEach(prop => {
                currentValues[ prop ] = interpolate(
                    defaultConfig.from[ prop ],
                    defaultConfig.to[ prop ],
                    easedProgress
                )
            })

            defaultConfig.onUpdate(currentValues)

            if (progress < 1) {
                rafId = requestAnimationFrame(animate)
            } else {
                defaultConfig.onComplete()
            }
        }

        rafId = requestAnimationFrame(animate)
    }

    function stop() {
        if (rafId) {
            cancelAnimationFrame(rafId)
            rafId = null
        }
    }

    return {
        start,
        stop
    }
}