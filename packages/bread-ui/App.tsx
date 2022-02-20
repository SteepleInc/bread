import { DripsyProvider } from 'dripsy'
import { breadTheme } from './src/Helpers/breadTheme'
import { Test } from './src/Components/Test'

export default function App() {
  return (
    <DripsyProvider theme={breadTheme}>
      <Test />
    </DripsyProvider>
  )
}
