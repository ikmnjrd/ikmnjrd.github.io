import { useEffect } from 'react'
import MicroModal from 'micromodal'

export const useModalInit = () => {
  useEffect(() => {
    MicroModal.init({
      onShow: () => console.log('Micromodal open'),
      onClose: () => console.log('Micromodal close'),
      openTrigger: 'data-custom-open',
      closeTrigger: 'data-custom-close',
      openClass: 'is-open',
      disableScroll: true,
      disableFocus: false,
      awaitOpenAnimation: false,
      awaitCloseAnimation: false,
      debugMode: false,
    })
  }, [])
}
