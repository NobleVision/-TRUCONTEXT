import { Grid, Paper, Box, Typography } from '@mui/material';
import { Warning, Security, Shield, NetworkCheck } from '@mui/icons-material';

const metrics = [
  {
    title: 'Active Threats',
    value: '12',
    change: { value: '3', positive: false },
    icon: Warning,
    color: '#f44336',
    iconBg: '#ffebee',
  },
  {
    title: 'Assets Monitored',
    value: '156',
    change: { value: '5', positive: true },
    icon: Security,
    color: '#2196f3',
    iconBg: '#e3f2fd',
  },
  {
    title: 'Security Score',
    value: '85%',
    status: { text: 'Good', color: '#4caf50' },
    icon: Shield,
    color: '#4caf50',
    iconBg: '#e8f5e9',
  },
  {
    title: 'Network Health',
    value: '92%',
    status: { text: 'Optimal', color: '#2196f3' },
    icon: NetworkCheck,
    color: '#2196f3',
    iconBg: '#e3f2fd',
  },
];

function SecurityMetrics() {
  return (
    <Grid container spacing={2}>
      {metrics.map((metric, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 2.5,
              height: '100%',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: metric.iconBg,
                  color: metric.color,
                  mr: 2,
                }}
              >
                <metric.icon sx={{ fontSize: 24 }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {metric.title}
                </Typography>
                <Typography variant="h4" component="div" sx={{ color: metric.color, fontWeight: 500 }}>
                  {metric.value}
                </Typography>
              </Box>
            </Box>
            {metric.change && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: metric.change.positive ? 'success.main' : 'error.main',
                    fontWeight: 500,
                  }}
                >
                  {metric.change.positive ? '+' : '-'} {metric.change.value} in last hour
                </Typography>
              </Box>
            )}
            {metric.status && (
              <Box
                sx={{
                  mt: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: metric.status.color,
                    fontWeight: 500,
                  }}
                >
                  {metric.status.text}
                </Typography>
                <Box
                  sx={{
                    flex: 1,
                    ml: 2,
                    height: 4,
                    borderRadius: 2,
                    bgcolor: `${metric.status.color}20`,
                  }}
                >
                  <Box
                    sx={{
                      width: metric.value,
                      height: '100%',
                      borderRadius: 2,
                      bgcolor: metric.status.color,
                      transition: 'width 1s ease-in-out',
                    }}
                  />
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default SecurityMetrics;
