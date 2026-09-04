import '@testing-library/jest-dom/vitest'
import { afterEach, expect } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as axeMatchers from 'vitest-axe/matchers'

expect.extend(axeMatchers)

afterEach(() => {
  cleanup()
})

// axe's colour-contrast check reaches for a canvas, which jsdom cannot provide.
// Contrast can't be evaluated without layout anyway; stub it so the check is
// skipped quietly instead of logging "Not implemented" on every axe() call.
if (typeof HTMLCanvasElement !== 'undefined') {
  HTMLCanvasElement.prototype.getContext = (() => null) as never
}

// jsdom does not implement the native <dialog> modal methods. Provide just
// enough for Modal's open/close effect to run without throwing.
if (typeof HTMLDialogElement !== 'undefined') {
  if (!HTMLDialogElement.prototype.showModal) {
    HTMLDialogElement.prototype.showModal = function showModal() {
      this.open = true
    }
  }
  if (!HTMLDialogElement.prototype.close) {
    HTMLDialogElement.prototype.close = function close() {
      this.open = false
      this.dispatchEvent(new Event('close'))
    }
  }
}
