import { Paper, Box, Typography, Grid, LinearProgress, Tooltip, IconButton } from '@mui/material';
import { 
  Warning, 
  Security, 
  Shield, 
  NetworkCheck, 
  DataUsage,
  Hub,
  MonitorHeart,
  Info
} from '@mui/icons-material';

const MetricCard = ({ title, value, icon: Icon, color, progress, details }) => (
  <Box sx={{ p: 2, height: '100%', position: 'relative' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
      <Icon sx={{ color, mr: 1 }} />
      <Typography variant="subtitle2" color="text.secondary">
        {title}
      </Typography>
      <Tooltip title={details} placement="top">
        <IconButton size="small" sx={{ ml: 'auto' }}>
          <Info fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
    <Typography variant="h4" sx={{ mb: 1 }}>
      {value}
    </Typography>
    <LinearProgress 
      variant="determinate" 
      value={progress} 
      sx={{ 
        height: 6, 
        borderRadius: 1,
        backgroundColor: `${color}20`,
        '& .MuiLinearProgress-bar': {
          backgroundColor: color,
        }
      }} 
    />
  </Box>
);

function SecurityMetrics() {
  const metrics = [
    {
      title: 'Data Integration',
      value: '8/10',
      icon: DataUsage,
      color: '#2196F3',
      progress: 80,
      details: 'Active data sources: PCAP, Firewall, NetFlow, Asset Management, Vulnerability Scanners'
    },
    {
      title: 'Threat Detection',
      value: '97%',
      icon: Security,
      color: '#00C853',
      progress: 97,
      details: 'AI-powered analysis detecting unauthorized access, cross-zone violations, and policy breaches'
    },
    {
      title: 'System Integration',
      value: '5/6',
      icon: Hub,
      color: '#FF9800',
      progress: 83,
      details: 'Connected systems: Splunk, Tenable, CrowdStrike, DataDog, SIEM'
    },
    {
      title: 'OT/IT Visibility',
      value: '94%',
      icon: MonitorHeart,
      color: '#673AB7',
      progress: 94,
      details: 'Real-time monitoring of OT/IT environments, asset relationships, and communication flows'
    }
  ];

  return (
    <Paper sx={{ height: '100%' }}>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        {metrics.map((metric) => (
          <Grid item xs={3} key={metric.title}>
            <MetricCard {...metric} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export default SecurityMetrics;