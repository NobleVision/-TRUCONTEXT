import { useEffect, useState } from 'react';
import { Box, Paper, Typography, Grid, Chip, IconButton } from '@mui/material';
import { MoreVert, Circle } from '@mui/icons-material';
import { alertService } from '../services/alertService';
import { networkService } from '../services/networkService';

function SecurityMonitor() {
  const [alerts, setAlerts] = useState([]);
  const [networkHealth, setNetworkHealth] = useState([]);

  useEffect(() => {
    const unsubscribe = alertService.subscribe((alert) => {
      setAlerts(current => [alert, ...current].slice(0, 5));
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkHealth(networkService.getAllZonesHealth());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'error.main';
      case 'high':
        return 'warning.main';
      default:
        return 'info.main';
    }
  };

  return (
    <Paper 
      elevation={0}
      sx={{ 
        height: '100%',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', flexShrink: 0 }}>
        <Typography variant="h6">Security Monitoring</Typography>
      </Box>

      <Box sx={{ 
        p: 2,
        flex: 1,
        minHeight: 0,
        display: 'flex',
        gap: 2,
        overflow: 'hidden'
      }}>
        {/* Alerts Section */}
        <Box sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          <Typography variant="subtitle2" gutterBottom sx={{ flexShrink: 0 }}>
            Latest Alerts
          </Typography>
          <Box sx={{ 
            flex: 1,
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: theme => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
              borderRadius: '4px',
            },
          }}>
            {alerts.map((alert) => (
              <Box
                key={alert.id}
                sx={{
                  p: 2,
                  mb: 1,
                  borderRadius: 1,
                  bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.02)',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Circle 
                    sx={{ 
                      fontSize: 12, 
                      mr: 1,
                      color: getSeverityColor(alert.severity)
                    }}
                  />
                  <Typography variant="subtitle2" sx={{ flex: 1 }}>
                    {alert.type.replace(/_/g, ' ').toUpperCase()}
                  </Typography>
                  <Chip
                    label={alert.severity}
                    size="small"
                    color={
                      alert.severity === 'critical' ? 'error' :
                      alert.severity === 'high' ? 'warning' : 'info'
                    }
                    sx={{ ml: 1 }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {alert.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Zone Health Section */}
        <Box sx={{ 
          width: '40%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          <Typography variant="subtitle2" gutterBottom sx={{ flexShrink: 0 }}>
            Zone Health Status
          </Typography>
          <Box sx={{ 
            flex: 1,
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: theme => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
              borderRadius: '4px',
            },
          }}>
            <Grid container spacing={1}>
              {['OT', 'IT', 'DMZ', 'SCADA'].map((zone) => (
                <Grid item xs={12} key={zone}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 1,
                      bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.02)',
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="subtitle2">{zone}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
                        Assets: {networkHealth.find(h => h.zone === zone)?.assetCount || 0}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {networkHealth.find(h => h.zone === zone)?.criticalVulnerabilities > 0 && (
                        <Chip
                          label={`${networkHealth.find(h => h.zone === zone)?.criticalVulnerabilities} Critical`}
                          size="small"
                          color="error"
                        />
                      )}
                      {networkHealth.find(h => h.zone === zone)?.highVulnerabilities > 0 && (
                        <Chip
                          label={`${networkHealth.find(h => h.zone === zone)?.highVulnerabilities} High`}
                          size="small"
                          color="warning"
                        />
                      )}
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

export default SecurityMonitor;
