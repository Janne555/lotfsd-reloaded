import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Suspense, useEffect, useRef, useState } from 'react'
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
import { NotFoundPage } from './pages/NotFound.page'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Fab } from '@mui/material'
import { Navigation as NavigationIcon } from '@mui/icons-material'

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
  const [showScrollButton, setShowScrollButton] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setShowScrollButton(!entry.isIntersecting)
    })
    if (rootRef.current) {
      observer.observe(rootRef.current)
    }
    return () => {
      if (rootRef.current) {
        observer.unobserve(rootRef.current)
      }
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <WithPathMatch>
          <Suspense fallback={<CircularProgress />}>
            <div ref={rootRef} />
            <Routes>
              <Route path="/" element={<StartPage />} />
              <Route path="/character-sheet/new" element={<NotFoundPage />} />
              <Route path="/character-sheet/:id/*" element={
                <ErrorBoundary>
                  <Page>
                    <Navigation />
                    <Routes>
                      <Route path="/info/*" element={<InfoPage />} />
                      <Route path="/inventory/*" element={<InventoryPage />} />
                      <Route path="/spells/*" element={<SpellsPage />} />
                    </Routes>
                    <FloatingSaveButton />
                  </Page>
                </ErrorBoundary>
              } />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            {showScrollButton && (
              <>
                <div className="mt-24" />
                <div className="fixed bottom-4 right-4">
                  <Fab variant="extended" onClick={() => rootRef.current?.scrollIntoView()}>
                    <NavigationIcon />
                    Back to top
                  </Fab>
                </div>
              </>
            )}
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
