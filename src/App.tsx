import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Suspense, useRef } from 'react'
import { StartPage } from './pages/Start.page'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useSyncPathToAtom } from './atoms'
import { NotFoundPage } from './pages/NotFound.page'
import { ErrorBoundary } from './components/ErrorBoundary'
import { LoadingPage } from './pages/Loading.page'
import { CharacterSheetPage } from './pages/CharacterSheet.page'
import { Page } from './layouts/Page'

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
  const rootRef = useRef<HTMLDivElement>(null)

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <WithPathMatch>
          <Suspense fallback={<LoadingPage />}>
            <div ref={rootRef} />
            <Routes>
              <Route path="/" element={<StartPage />} />
              <Route path="/character-sheet/new" element={<NotFoundPage />} />
              <Route path="/character-sheet/:id/*" element={
                <ErrorBoundary>
                  <Suspense fallback={<LoadingPage />}>
                    <Page>
                      <CharacterSheetPage />
                    </Page>
                  </Suspense>
                </ErrorBoundary>
              } />
              <Route path="*" element={<NotFoundPage />} />
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
