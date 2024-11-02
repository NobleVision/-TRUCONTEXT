import { useState, useMemo, useEffect } from 'react';
import { Box, Container, Typography, Grid, IconButton, ThemeProvider, CssBaseline } from '@mui/material';
import { Refresh, DarkMode, LightMode } from '@mui/icons-material';
import SecurityMetrics from './components/SecurityMetrics';
import NetworkTopology from './components/NetworkTopology';
import SecurityMonitor from './components/SecurityMonitor';
import IntegrationStatus from './components/IntegrationStatus';
import { getTheme } from './theme';
import { simulationController } from './controllers/simulationController';

function App() {
  const [lastUpdated, setLastUpdated] = useState('2 mins ago');
  const [mode, setMode] = useState('light');

  const theme = useMemo(() => getTheme(mode), [mode]);

  useEffect(() => {
    simulationController.start();

    const interval = setInterval(() => {
      const now = new Date();
      setLastUpdated(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`);
    }, 60000);

    return () => {
      simulationController.stop();
      clearInterval(interval);
    };
  }, []);

  const toggleMode = () => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  const handleRefresh = () => {
    const now = new Date();
    setLastUpdated(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: theme.palette.background.default,
      }}>
        <Container maxWidth={false} sx={{ py: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
              ‹ Back to Dashboards
            </Typography>
            <Typography variant="h5" component="h1" sx={{ flexGrow: 1 }}>
              TruContext Security Dashboard
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton onClick={toggleMode} color="inherit">
                {mode === 'light' ? <DarkMode /> : <LightMode />}
              </IconButton>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={handleRefresh} size="small">
                  <Refresh sx={{ fontSize: 20 }} />
                </IconButton>
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  Updated {lastUpdated}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Main Content */}
          <Box sx={{ 
            flex: 1,
            minHeight: 0, // Important for nested flex containers
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}>
            {/* Metrics Row */}
            <Box sx={{ flexShrink: 0 }}>
              <SecurityMetrics />
            </Box>

            {/* Main Dashboard Area */}
            <Box sx={{ 
              flex: 1,
              minHeight: 0, // Important for nested flex containers
              display: 'flex',
              gap: 2
            }}>
              {/* Left Side - Network Topology */}
              <Box sx={{ 
                flex: '0 0 65%',
                minHeight: 0, // Important for nested flex containers
                overflow: 'hidden'
              }}>
                <NetworkTopology />
              </Box>
              
              {/* Right Side - Monitoring and Integration */}
              <Box sx={{ 
                flex: '0 0 35%',
                minHeight: 0, // Important for nested flex containers
                display: 'flex',
                flexDirection: 'column',
                gap: 2
              }}>
                <Box sx={{ flex: 1, minHeight: 0 }}>
                  <SecurityMonitor />
                </Box>
                <Box sx={{ flex: 1, minHeight: 0 }}>
                  <IntegrationStatus />
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
