import { useEffect, useState } from 'react';
import { Paper, Box, Typography, Grid, Chip, LinearProgress } from '@mui/material';
import { integrationService } from '../services/integrationService';

function IntegrationStatus() {
  const [integrations, setIntegrations] = useState([]);
  const [latestData, setLatestData] = useState({
    splunk: null,
    tenable: null,
    crowdstrike: null,
  });

  useEffect(() => {
    setIntegrations(integrationService.getActiveIntegrations());

    const updateData = async () => {
      const splunkData = await integrationService.getSplunkData();
      const tenableData = await integrationService.getTenableVulnerabilities();
      const crowdstrikeData = await integrationService.getCrowdStrikeThreats();

      setLatestData({
        splunk: splunkData,
        tenable: tenableData,
        crowdstrike: crowdstrikeData,
      });
    };

    const interval = setInterval(updateData, 5000);
    updateData();

    return () => clearInterval(interval);
  }, []);

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
        <Typography variant="h6">Security Tool Integration Status</Typography>
      </Box>

      <Box sx={{ 
        p: 2,
        flex: 1,
        minHeight: 0,
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
        <Grid container spacing={2}>
          {integrations.map((integration) => (
            <Grid item xs={12} key={integration.name}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 1,
                  bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.02)',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {integration.name.toUpperCase()}
                  </Typography>
                  <Chip
                    label={integration.status}
                    size="small"
                    color={integration.status === 'active' ? 'success' : 'warning'}
                    sx={{ ml: 'auto' }}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="body2" color="text.secondary">
                      Last Sync: {new Date(integration.lastSync).toLocaleTimeString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
                      90%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={90}
                    sx={{
                      height: 6,
                      borderRadius: 1,
                      bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                    }}
                  />
                </Box>

                {latestData[integration.name.toLowerCase()] && (
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Latest Data:
                    </Typography>
                    <Typography variant="body2">
                      {integration.name === 'SPLUNK' && 
                        `${latestData.splunk.events.length} new events`}
                      {integration.name === 'TENABLE' && 
                        `${latestData.tenable.vulnerabilities.length} vulnerabilities detected`}
                      {integration.name === 'CROWDSTRIKE' && 
                        `${latestData.crowdstrike.threats.length} active threats`}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
}

export default IntegrationStatus;
