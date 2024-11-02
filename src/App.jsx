import { useState, useMemo } from 'react';
import { Box, Container, Typography, Grid, IconButton, ThemeProvider, CssBaseline, Drawer } from '@mui/material';
import { Refresh, DarkMode, LightMode, Menu } from '@mui/icons-material';
import SecurityMetrics from './components/SecurityMetrics';
import NetworkTopology from './components/NetworkTopology';
import SecurityMonitor from './components/SecurityMonitor';
import IntegrationStatus from './components/IntegrationStatus';
import DataSourcePanel from './components/DataSourcePanel';
import { getTheme } from './theme';

function App() {
  const [lastUpdated, setLastUpdated] = useState('2 mins ago');
  const [mode, setMode] = useState('light');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleMode = () => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh',
        maxHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: theme.palette.background.default,
      }}>
        <Container maxWidth={false} sx={{ py: 2, flex: 1 }}>
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={() => setDrawerOpen(true)} sx={{ mr: 2 }}>
              <Menu />
            </IconButton>
            <Typography variant="h5" component="h1" sx={{ flexGrow: 1 }}>
              TruContext Security Operations Center
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton onClick={toggleMode} color="inherit">
                {mode === 'light' ? <DarkMode /> : <LightMode />}
              </IconButton>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Refresh sx={{ mr: 1, fontSize: 20 }} />
                <Typography variant="body2" color="text.secondary">
                  Last updated: {lastUpdated}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ height: '120px' }}>
              <SecurityMetrics />
            </Box>

            <Box sx={{ flex: 1, display: 'flex', gap: 2 }}>
              <Box sx={{ flex: '0 0 65%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ flex: 2 }}>
                  <NetworkTopology />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <SecurityMonitor />
                </Box>
              </Box>
              
              <Box sx={{ flex: '0 0 35%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <IntegrationStatus />
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>

        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <DataSourcePanel />
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}

export default App; 