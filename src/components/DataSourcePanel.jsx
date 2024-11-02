import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, Switch, Divider } from '@mui/material';
import { Storage, Security, Shield, NetworkCheck, Assessment } from '@mui/icons-material';

const dataSources = [
  {
    category: 'Network Data',
    sources: [
      { name: 'PCAP Data', icon: NetworkCheck, enabled: true },
      { name: 'Firewall Logs', icon: Shield, enabled: true },
      { name: 'NetFlow Data', icon: NetworkCheck, enabled: true },
    ]
  },
  {
    category: 'Security Tools',
    sources: [
      { name: 'Splunk', icon: Assessment, enabled: true },
      { name: 'Tenable', icon: Security, enabled: true },
      { name: 'CrowdStrike', icon: Shield, enabled: true },
      { name: 'DataDog', icon: Assessment, enabled: false },
    ]
  },
  {
    category: 'Asset Management',
    sources: [
      { name: 'CMDB', icon: Storage, enabled: true },
      { name: 'Vulnerability Scanner', icon: Security, enabled: true },
    ]
  }
];

function DataSourcePanel() {
  return (
    <Box sx={{ width: 300, p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Data Sources</Typography>
      
      {dataSources.map((category, index) => (
        <Box key={category.category}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2, mb: 1 }}>
            {category.category}
          </Typography>
          <List dense>
            {category.sources.map((source) => (
              <ListItem key={source.name}>
                <ListItemIcon>
                  <source.icon />
                </ListItemIcon>
                <ListItemText primary={source.name} />
                <Switch
                  edge="end"
                  defaultChecked={source.enabled}
                />
              </ListItem>
            ))}
          </List>
          {index < dataSources.length - 1 && <Divider />}
        </Box>
      ))}
    </Box>
  );
}

export default DataSourcePanel;
