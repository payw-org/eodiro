import { Icon } from '@/components/ui/Icon'
import { Flex } from '@/components/ui/layouts/Flex'
import $ from './style.module.scss'

export function AppNavigation() {
  function back() {
    window.history.back()
  }

  function forward() {
    window.history.forward()
  }

  function reload() {
    window.location.reload()
  }

  return (
    <Flex className={$['app-navigation']} center>
      <Flex className={$['controllers-container']} center>
        <button type="button" className={$['back']} onClick={back}>
          <Icon name="chevron_left" />
        </button>
        <button type="button" className={$['reload']} onClick={reload}>
          <Icon name="arrow_clockwise" />
        </button>
        <button type="button" className={$['forward']} onClick={forward}>
          <Icon name="chevron_right" />
        </button>
      </Flex>
    </Flex>
  )
}
