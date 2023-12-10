import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Suspense } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { StartPage } from './pages/Start.page'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useSyncPathToAtom } from './atoms'
import { InfoPage } from './pages/Info.page'
import { Page } from './components/Layouts'
import { Navigation } from './components/Navigation'
import { InventoryPage } from './pages/Inventory.page'
import { SpellsPage } from './pages/Spells.page'
import { FloatingSaveButton } from './components/FloatingSaveButton'

const theme = createTheme({
  typography: {
    h1: {
      fontSize: '2.5rem', // Set your desired size
    },
    h2: {
      fontSize: '2rem',
    },
    h3: {
      fontSize: '1.75rem',
    },
    h4: {
      fontSize: '1.5rem',
    },
    h5: {
      fontSize: '1.25rem',
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <WithPathMatch>
          <Suspense fallback={<CircularProgress />}>
            <Routes>
              <Route path="/" element={<StartPage />} />
              <Route path="/character-sheet/:id/*" element={
                <Page>
                  <Navigation />
                  <Routes>
                    <Route path="/info/*" element={<InfoPage />} />
                    <Route path="/inventory/*" element={<InventoryPage />} />
                    <Route path="/spells/*" element={<SpellsPage />} />
                  </Routes>
                  <FloatingSaveButton />
                </Page>
              } />
            </Routes>
          </Suspense>
        </WithPathMatch>
      </BrowserRouter>
    </ThemeProvider >
  )
}

function WithPathMatch({ children }: { children: React.ReactNode }) {
  useSyncPathToAtom()
  return (
    <div>
      {children}
    </div>
  )
}

export default App
