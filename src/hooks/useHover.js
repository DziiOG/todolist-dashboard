import { useState, useRef, useEffect } from 'react'

/** Hook that manipulates hovering. Tells if a component as been hover on or not
 * @author Whitson Dzimah
 */

export const useHover = () => {
  const [value, setValue] = useState(false)
  const ref = useRef(null)
  const handleMouseOver = () => setValue(true)
  const handleMouseOut = () => setValue(false)
  useEffect(() => {
    const node = ref.current
    if (node) {
      node.addEventListener('mouseover', handleMouseOver)
      node.addEventListener('mouseout', handleMouseOut)
      return () => {
        node.removeEventListener('mouseover', handleMouseOver)
        node.removeEventListener('mouseout', handleMouseOut)
      }
    }
  }, [])
  return [ref, value]
}
