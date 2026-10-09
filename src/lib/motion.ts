'use client'

import { useSyncExternalStore } from 'react'

/** Dispatched on window whenever the in-page "pause motion" switch changes. */
export const CALM_EVENT = 'fx:calm'
export const CALM_STORAGE_KEY = 'motion'

const REDUCE_QUERY = '(prefers-reduced-motion: reduce)'

/** True when auto-moving content must stay still: OS setting OR the in-page switch (html[data-calm]). */
export function isCalm(): boolean {
  return window.matchMedia(REDUCE_QUERY).matches || document.documentElement.hasAttribute('data-calm')
}

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(REDUCE_QUERY)
  mq.addEventListener('change', onChange)
  window.addEventListener(CALM_EVENT, onChange)
  return () => {
    mq.removeEventListener('change', onChange)
    window.removeEventListener(CALM_EVENT, onChange)
  }
}

/** Reactive version of isCalm() for components. Server render = animated (false). */
export function useCalm(): boolean {
  return useSyncExternalStore(subscribe, isCalm, () => false)
}

function subscribeSwitch(onChange: () => void) {
  window.addEventListener(CALM_EVENT, onChange)
  return () => window.removeEventListener(CALM_EVENT, onChange)
}

/** State of the in-page switch only (ignores the OS preference). */
export function useCalmSwitch(): boolean {
  return useSyncExternalStore(subscribeSwitch, () => document.documentElement.hasAttribute('data-calm'), () => false)
}

export function setCalmSwitch(on: boolean) {
  const root = document.documentElement
  if (on) root.setAttribute('data-calm', '')
  else root.removeAttribute('data-calm')
  try {
    if (on) window.localStorage.setItem(CALM_STORAGE_KEY, 'calm')
    else window.localStorage.removeItem(CALM_STORAGE_KEY)
  } catch {
    /* the switch still works for this visit */
  }
  window.dispatchEvent(new Event(CALM_EVENT))
}
