import React, { useState, useEffect, useRef } from 'react'

interface VirtualListProps<T> {
  items: T[]
  itemHeight: number
  height: number
  renderItem: (item: T) => React.ReactNode
}

export function VirtualList<T>({ items, itemHeight, height, renderItem }: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollTop(containerRef.current.scrollTop)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const startIndex = Math.floor(scrollTop / itemHeight)
  const endIndex = Math.min(startIndex + Math.ceil(height / itemHeight) + 1, items.length)

  const visibleItems = items.slice(startIndex, endIndex)

  return (
    <div
      ref={containerRef}
      style={{ height: `${height}px`, overflowY: 'auto' }}
      className="virtual-list-container"
    >
      <div style={{ height: `${items.length * itemHeight}px`, position: 'relative' }}>
        {visibleItems.map((item, index) => (
          <div
            key={startIndex + index}
            style={{
              position: 'absolute',
              top: `${(startIndex + index) * itemHeight}px`,
              height: `${itemHeight}px`,
            }}
          >
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  )
}

