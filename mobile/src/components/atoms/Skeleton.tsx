import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native'

type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded'

interface SkeletonProps {
  variant?: SkeletonVariant
  width?: number | string
  height?: number | string
  className?: string
  animate?: boolean
}

const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  width = '100%',
  height = 20,
  className = '',
  animate = true,
}) => {
  const opacity = useRef(new Animated.Value(0.3)).current

  useEffect(() => {
    if (animate) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.3,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      ).start()
    }
  }, [animate, opacity])

  const getVariantStyles = () => {
    const styles = {
      text: 'rounded',
      circular: 'rounded-full',
      rectangular: 'rounded-none',
      rounded: 'rounded-lg',
    }
    return styles[variant]
  }

  return (
    <Animated.View
      style={{
        width,
        height,
        opacity: animate ? opacity : 0.3,
      }}
      className={`bg-neutral-300 dark:bg-neutral-700 ${getVariantStyles()} ${className}`}
    />
  )
}

export default Skeleton
