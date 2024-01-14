import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Suspense, useRef } from 'react'
import { StartPage } from './pages/Start.page'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { NotFoundPage } from './pages/NotFound.page'
import { ErrorBoundary } from './components/ErrorBoundary'
import { LoadingPage } from './pages/Loading.page'
import { CharacterSheetPage } from './pages/CharacterSheet.page'
import { Page } from './layouts/Page'
import { useAtom } from 'jotai'
import { initAtom } from './atoms'
import { DialogProvider } from './hooks/useDialog'

const theme = createTheme({
  typography: {
    h1: {
      fontSize: '2.5rem'
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
      <DialogProvider>
        <BrowserRouter>
          <Suspense fallback={<LoadingPage />}>
            <div ref={rootRef} />
            <InitContainer>
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
            </InitContainer>
          </Suspense>
        </BrowserRouter>
      </DialogProvider>
    </ThemeProvider >
  )
}

export default App

const InitContainer = ({ children }: { children: React.ReactNode }) => {
  useAtom(initAtom)
  return children
}
