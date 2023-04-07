import { DependencyList, useEffect, useRef, useState } from 'react'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { size } from 'lodash'

/**
 * A custom useEffect hook that only triggers on updates, not on initial mount
 * @param {Function} effect
 * @param {Array<any>} dependencies
 */
export function useUpdateEffect(effect: () => void, dependencies: any[] = []) {
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      effect()
    }
  }, dependencies)
}

type ScrollPosition = {
  x: number
  y: number
}
export const usePageScrollPosition = (
  callback: (props: { prevPos: ScrollPosition; currPos: ScrollPosition }) => void,
  deps: DependencyList = [],
  wait = 100,
) => {
  useScrollPosition(callback, deps, undefined, false, wait)
}

export function viewport() {
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

  return { width: vw, height: vh }
}

export const usePagination = ({ perPage }: { perPage: number }) => {
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const hasMore = useRef(true)
  const page = useRef(0)

  return {
    page,
    hasMore,
    isFetchingMore,
    canFetch: !isFetchingMore && hasMore.current,
    startFetch: () => {
      setIsFetchingMore(true)
      page.current += 1
      return {
        page: page.current,
        variables: {
          start: page.current * perPage,
          limit: perPage,
        },
      }
    },
    endFetch: () => {
      setIsFetchingMore(false)
    },
    updateHasMore: (list: undefined | Array<any>) => {
      if (size(list) < perPage) {
        hasMore.current = false
      }
    },
  }
}

export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}
