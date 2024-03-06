import { useState, useEffect } from 'react'

interface Dimensions {
  width: number | undefined
}

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState<Dimensions>({ width: undefined })

  const handleResize = () => {
    setWindowWidth({ width: window.innerWidth })
  }

  useEffect(() => {
    if (typeof window !== "undefined") {

      window.addEventListener('resize', handleResize)

      handleResize()

      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])
  return windowWidth
}

export default useWindowWidth