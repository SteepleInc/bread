import { FC } from 'react'
import { View } from 'dripsy'
import { Button } from 'Components/Button'

export const Test: FC = () => {
  return (
    <View sx={{ padding: 16 }}>
      <Button sx={{ margin: '8px' }}>Hey</Button>
      <Button variant={'outlined'} sx={{ margin: '8px' }}>
        Hey
      </Button>
      <Button variant={'text'} sx={{ margin: '8px' }}>
        Hey
      </Button>
    </View>
  )
}
