import { Ionicons } from '@expo/vector-icons'

import type { ComponentProps } from 'react'

type IconProps = ComponentProps<typeof Ionicons>

export const Icon = (props: IconProps) => <Ionicons {...props} />
