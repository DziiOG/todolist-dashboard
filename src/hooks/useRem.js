import { ePv, pixelToRem } from 'helpers/misc'
import { useCallback } from 'react'
import { useMediaQuery } from 'react-responsive'

const useRem = () => {
  const md = useMediaQuery({ query: '(max-width: 768px)' })
  const lg = useMediaQuery({ query: '(max-width: 992px)' })
  const xl = useMediaQuery({ query: '(max-width: 1280px)' })
  const _2xl = useMediaQuery({ query: '(max-width: 1366px)' })
  const _3xl = useMediaQuery({ query: '(max-width: 1440px)' })
  const _4xl = useMediaQuery({ query: '(max-width: 1536px)' })
  const _5xl = useMediaQuery({ query: '(max-width: 1920px)' })

  const decision = useCallback(
    pixel => ({
      md: pixelToRem(ePv(pixel, 1440, 768)), // 768
      lg: pixelToRem(ePv(pixel, 1440, 992)), // 992
      xl: pixelToRem(ePv(pixel, 1440, 1280)), // 1280
      _2xl: pixelToRem(ePv(pixel, 1440, 1366)), // 1366
      _3xl: pixelToRem(pixel), // 1440
      _4xl: pixelToRem(ePv(pixel, 1440, 1536)), // 1536
      _5xl: pixelToRem(ePv(pixel)) // 1920
    }),
    []
  )

  return px => {
    let rem = 0
    const d = decision(px)
    if (md) {
      rem = d.md
    } else if (lg) {
      rem = d.lg
    } else if (xl) {
      rem = d.xl
    } else if (_2xl) {
      rem = d._2xl
    } else if (_3xl) {
      rem = d._3xl
    } else if (_4xl) {
      rem = d._4xl
    } else if (_5xl) {
      rem = d._5xl
    }

    return rem
  }
}

export default useRem
