import React from 'react'
import { Dimensions, Modal, Pressable, View } from 'react-native'

type DrawerAnchor = 'bottom' | 'top' | 'left' | 'right'
type DrawerSize = 'sm' | 'md' | 'lg' | 'full'

interface DrawerWrapperProps {
  isOpen: boolean
  onClose: () => void
  anchor?: DrawerAnchor
  size?: DrawerSize
  children: React.ReactNode
  className?: string
}

const DrawerWrapper: React.FC<DrawerWrapperProps> = ({
  isOpen,
  onClose,
  anchor = 'bottom',
  size = 'md',
  children,
  className = '',
}) => {
  const { height, width } = Dimensions.get('window')

  const getSizeValue = () => {
    const isVertical = anchor === 'bottom' || anchor === 'top'
    const dimension = isVertical ? height : width

    const sizes = {
      sm: dimension * 0.3,
      md: dimension * 0.5,
      lg: dimension * 0.7,
      full: dimension,
    }

    return sizes[size]
  }

  const getDrawerStyle = () => {
    const sizeValue = getSizeValue()

    const styles = {
      bottom: {
        position: 'absolute' as const,
        bottom: 0,
        left: 0,
        right: 0,
        height: sizeValue,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
      top: {
        position: 'absolute' as const,
        top: 0,
        left: 0,
        right: 0,
        height: sizeValue,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      },
      left: {
        position: 'absolute' as const,
        left: 0,
        top: 0,
        bottom: 0,
        width: sizeValue,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
      },
      right: {
        position: 'absolute' as const,
        right: 0,
        top: 0,
        bottom: 0,
        width: sizeValue,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
      },
    }

    return styles[anchor]
  }

  return (
    <Modal visible={isOpen} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 bg-black/50">
        <Pressable className="flex-1" onPress={onClose} />
        <View
          style={getDrawerStyle()}
          className={`bg-white dark:bg-neutral-900 ${className}`}
        >
          {children}
        </View>
      </View>
    </Modal>
  )
}

export default DrawerWrapper
