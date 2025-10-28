import './App.css'
import { Providers } from './app/providers/Providers'
import { LoadingLayout } from './app/providers/LoadingProvider'
import { DialogLayout } from './app/providers/DialogProvider'
import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from './app/routes/ScrollToTop'
import AppRoutes from './app/routes/AppRoutes';
import AppTheme from './shared/components/ui/Theme';
import { CssBaseline } from "@mui/material";

function App() {

  return (
    <>
      <AppTheme>
        <CssBaseline />
        {/* Global UI layers */}
        <Providers>
          <LoadingLayout />
          <DialogLayout />
          {/* Routing */}
          <Router>
            <ScrollToTop />
            <AppRoutes />
          </Router>
        </Providers>
      </AppTheme>
    </>
  )
}

export default App
