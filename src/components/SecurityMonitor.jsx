import { useState } from 'react';
import { 
  Paper, Box, Typography, List, ListItem, ListItemText, 
  ListItemIcon, Chip, IconButton, Tab, Tabs
} from '@mui/material';
import { Error, Warning, Info, MoreVert } from '@mui/icons-material';

const severityIcons = {
  high: <Error color="error" />,
  medium: <Warning color="warning" />,
  low: <Info color="info" />
};

const mockAlerts = [
  {
    id: 1,
    severity: 'high',
    title: 'Unauthorized Access Attempt',
    source: 'Firewall',
    timestamp: '2 mins ago',
    zone: 'OT Network'
  },
  {
    id: 2,
    severity: 'medium',
    title: 'Unusual Traffic Pattern',
    source: 'PCAP Analysis',
    timestamp: '5 mins ago',
    zone: 'IT Network'
  },
  {
    id: 3,
    severity: 'low',
    title: 'Configuration Change',
    source: 'Asset Management',
    timestamp: '10 mins ago',
    zone: 'OT Network'
  }
];

function SecurityMonitor() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={activeTab} 
          onChange={(_, newValue) => setActiveTab(newValue)}
          variant="fullWidth"
        >
          <Tab label="Active Alerts" />
          <Tab label="Recent Events" />
          <Tab label="Incidents" />
        </Tabs>
      </Box>

      <List sx={{ flex: 1, overflow: 'auto' }}>
        {mockAlerts.map((alert) => (
          <ListItem
            key={alert.id}
            secondaryAction={
              <IconButton edge="end">
                <MoreVert />
              </IconButton>
            }
          >
            <ListItemIcon>
              {severityIcons[alert.severity]}
            </ListItemIcon>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {alert.title}
                  <Chip 
                    label={alert.zone} 
                    size="small" 
                    color={alert.zone === 'OT Network' ? 'primary' : 'secondary'}
                  />
                </Box>
              }
              secondary={
                <Typography variant="body2" color="text.secondary">
                  {alert.source} • {alert.timestamp}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default SecurityMonitor; 