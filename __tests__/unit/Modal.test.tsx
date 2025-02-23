import React from 'react'
import {
  render,
  screen,
  fireEvent,
} from '@testing-library/react'
import Modal from '../../src/components/Modal/Modal'

// jest.mock('../../src/hooks/useModal', () => {
//   return {
//     useModal: jest.fn(() => ({
//       onClickOpenBtn: jest.fn(),
//       onClickCloseBtn: jest.fn(),
//       dialogRef: {
//         current: {
//           showModal: jest.fn(),
//           close: jest.fn(),
//         },
//       },
//     })),
//   }
// })

describe('Modal', () => {
  beforeAll(() => {
    // ISSUE: https://github.com/jsdom/jsdom/issues/3294
    HTMLDialogElement.prototype.show = jest.fn()
    HTMLDialogElement.prototype.showModal = jest.fn()
    HTMLDialogElement.prototype.close = jest.fn()
  })

  it.skip('Click OpenButton', async () => {
    const { container } = render(<Modal />)

    // const spy = jest.spyOn(Modal.prototype, 'onClickOpenBtn')

    const dialog = container.querySelector('dialog')

    expect(dialog?.open).toBe(false)

    const openButton = screen.getByRole('button', {
      name: /Open Modal/i,
    })
    openButton.click()
    // fireEvent.click(openButton)

    const dialogAfter = container.querySelector('dialog')

    expect(dialogAfter?.open).toBe(true)
  })
})
