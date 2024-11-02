import { Paper, Box, Typography, List, ListItem, ListItemIcon, ListItemText, CircularProgress } from '@mui/material';
import { CheckCircle, Error, Sync } from '@mui/icons-material';

const integrations = [
  {
    name: 'Splunk',
    status: 'connected',
    lastSync: '1 min ago',
    metrics: { events: '1.2K/s', latency: '45ms' }
  },
  {
    name: 'Tenable',
    status: 'syncing',
    lastSync: '5 mins ago',
    metrics: { scans: '3 active', assets: '1.5K' }
  },
  {
    name: 'CrowdStrike',
    status: 'error',
    lastSync: '15 mins ago',
    metrics: { alerts: '12/hr', agents: '850' }
  },
  {
    name: 'DataDog',
    status: 'connected',
    lastSync: '2 mins ago',
    metrics: { monitors: '24 active', logs: '5K/s' }
  }
];

const statusIcons = {
  connected: <CheckCircle color="success" />,
  syncing: <Sync color="primary" />,
  error: <Error color="error" />
};

function IntegrationStatus() {
  return (
    <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6">Integration Status</Typography>
      </Box>

      <List sx={{ flex: 1, overflow: 'auto' }}>
        {integrations.map((integration) => (
          <ListItem key={integration.name}>
            <ListItemIcon>
              {statusIcons[integration.status]}
            </ListItemIcon>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {integration.name}
                  {integration.status === 'syncing' && (
                    <CircularProgress size={16} />
                  )}
                </Box>
              }
              secondary={
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Last sync: {integration.lastSync}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {Object.entries(integration.metrics).map(([key, value]) => 
                      `${key}: ${value}`
                    ).join(' • ')}
                  </Typography>
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default IntegrationStatus; 