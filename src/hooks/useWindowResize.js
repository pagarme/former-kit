import { useEffect } from 'react'

function useWindowResize (callback) {
  useEffect(() => {
    window.addEventListener('resize', callback)

    return (() => window.removeEventListener('resize', callback))
  })
}

export default useWindowResize
