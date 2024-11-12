import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

// 특정 DOM 요소가 뷰포트(viewport) 안에 있는지를 감지하는 훅

const useIntersectionObserver = (targetRef: RefObject<HTMLDivElement>) => {
    const [isInViewport, setIsInViewport] = useState(false)
    const observer = useRef<IntersectionObserver>()

    useEffect(() => {
        if (!observer.current) {
            const observerCallback = (entries: IntersectionObserverEntry[]) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInViewport(true)
                    }
                })
            }

            observer.current = new window.IntersectionObserver(observerCallback, {
                threshold: 0
            })
        }

        if (targetRef.current) {
            observer.current.observe(targetRef.current)
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect()
            }
        }
    }, [targetRef])

    return isInViewport
}

export default useIntersectionObserver