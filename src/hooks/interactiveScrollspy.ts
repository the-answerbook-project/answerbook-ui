import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const useActiveIdOnScroll = (relevantIds: string[]) => {
  const { hash } = useLocation()
  const [activeId, setActiveId] = useState<string>()

  useEffect(() => {
    // Update activeId based on the hash in the URL
    const currentHash = hash ? hash.substring(1) : undefined
    setActiveId(currentHash)
  }, [hash])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            setActiveId(id)
            window.history.pushState(null, '', `#${id}`)
          }
        })
      },
      {
        rootMargin: '-10% 0px -80% 0px', // Adjusting to trigger around 3/4 up the viewport
        threshold: 0.15, // Trigger when the element is fully visible in the viewport
      }
    )

    // Observe each relevant element by ID
    relevantIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    // Cleanup on component unmount
    return () => {
      relevantIds.forEach((id) => {
        const element = document.getElementById(id)
        if (element) observer.unobserve(element)
      })
    }
  }, [relevantIds])

  return activeId
}

export default useActiveIdOnScroll
