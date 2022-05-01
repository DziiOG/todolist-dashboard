import { t } from 'typy'
import configs from '../utils/configs'

export const replaceURI = (APP, path) => {
  window.location.replace(configs()[`${APP}_SERVICE`] + path)
}
export const pixelToRem = (px, baseInput = 16) => {
  const getValue = input => parseFloat(input?.value?.replace(/,/g, '.')) || 0

  const base = () => getValue(baseInput) || 16

  const x = base() || 16
  const rem = `${(1 / x) * px}rem`

  return rem
}

export const ePv = (basePixelValue, basePixel = 1440, pixel = 1920) =>
  (basePixelValue * pixel) / basePixel

export const rem = pixel => ({
  md: pixelToRem(ePv(pixel, 1440, 768)), // 768
  lg: pixelToRem(ePv(pixel, 1440, 992)), // 992
  xl: pixelToRem(ePv(pixel, 1440, 1280)), // 1280
  '2xl': pixelToRem(ePv(pixel, 1440, 1366)), // 1366
  '3xl': pixelToRem(pixel), // 1440
  '4xl': pixelToRem(ePv(pixel, 1440, 1536)), // 1536
  '5xl': pixelToRem(ePv(pixel)) // 1920
})

export const reduceToGroups = (array, key, keysToPush = []) =>
  (array || []).reduce((categories, item) => {
    const category = categories[t(item, key).safeObject] || []
    if (keysToPush.length > 0) {
      const newObj = {}
      for (let index = 0; index < keysToPush.length; index++) {
        newObj[keysToPush[index]] = item[keysToPush[index]]
      }
      category.push(newObj)
    } else {
      category.push(item)
    }
    categories[t(item, key).safeObject] = category
    return categories
  }, {})

export const toastSuccess = (title, res, toast) => {
  toast({
    title,
    isClosable: true,
    description: res.message,
    status: 'success',
    duration: 5000,
    position: 'top-right'
  })
}

export const toastError = (error, toast, setSession) => {
  if (error) {
    if ([401, 403].includes(error.status)) {
      if (setSession) {
        setSession(false)
      }
    } else {
      toast({
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
        title: 'An error occurred.',
        description: `${
          error?.data?.message || error?.message || 'Unknown error occurred'
        }.`
      })
    }
  } else {
    toast({
      status: 'error',
      duration: 2000,
      isClosable: true,
      position: 'top-right',
      title: 'An error occurred.',
      description: 'Unexpected network error.'
    })
  }
}
