import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './app/store'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import theme from './themeUiConfig'
import CssBaseline from "@mui/material/CssBaseline";

const AppProvider = ({ children }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            {children}
          </BrowserRouter>
        </ThemeProvider>
    </PersistGate>
  </Provider>
)
export default AppProvider