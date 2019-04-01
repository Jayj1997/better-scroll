import createAnimater from '@/animater/index'
import Translater from '@/translater'
import Behavior from '@/scroller/Behavior'
import ActionsHandler from '@/base/ActionsHandler'
import Actions from '@/Scroller/Actions'

jest.mock('@/animater/index')
jest.mock('@/translater')
jest.mock('@/scroller/Behavior')
jest.mock('@/base/ActionsHandler')
jest.mock('@/scroller/Actions')

import EventEmitter from '@/base/EventEmitter'
import EventRegister from '@/base/EventRegister'

const Scroller = jest.fn().mockImplementation((wrapper, bscrollOptions) => {
  const content = wrapper.children[0]
  const translater = new Translater(content)
  const animater = createAnimater(content, translater, bscrollOptions)
  const actionsHandler = new ActionsHandler(wrapper, bscrollOptions)
  const scrollBehaviorX = new Behavior(
    wrapper,
    Object.assign(bscrollOptions, { scrollable: bscrollOptions.scrollX })
  )
  const scrollBehaviorY = new Behavior(
    wrapper,
    Object.assign(bscrollOptions, { scrollable: bscrollOptions.scrollY })
  )
  const actions = new Actions(wrapper, bscrollOptions)
  return {
    wrapper,
    content,
    options: bscrollOptions,
    translater,
    animater,
    actionsHandler,
    actions,
    hooks: new EventEmitter([
      'beforeStart',
      'beforeMove',
      'beforeScrollStart',
      'scrollStart',
      'scroll',
      'beforeEnd',
      'scrollEnd',
      'refresh',
      'touchEnd',
      'flick',
      'scrollCancel',
      'momentum',
      'scrollTo',
      'scrollToElement',
      'transitionEnd'
    ]),
    scrollBehaviorX,
    scrollBehaviorY,
    resizeRegister: new EventRegister(wrapper, []),
    transitionEndRegister: new EventRegister(wrapper, [])
  }
})

export default Scroller
