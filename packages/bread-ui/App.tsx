import { StatusBar } from 'expo-status-bar'
import { View, Text, DripsyProvider } from 'dripsy'
import { theme } from 'Helpers/theme'
import { Button } from 'Components/Button'

export default function App() {
  return (
    <DripsyProvider theme={theme}>
      <View>
        <Button>hey</Button>
      </View>
    </DripsyProvider>
  )
}
