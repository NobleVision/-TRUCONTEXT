import { Grid, Paper, Box, Typography } from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

const metrics = [
  {
    title: 'Revenue',
    value: '$17.3M',
    change: { value: '12%', positive: true },
  },
  {
    title: 'CAC',
    value: '$730',
    change: { value: '4.3%', positive: false, prefix: '$30' },
  },
  {
    title: 'Gross Profit Margin (%)',
    value: '50%',
    status: { text: 'On Track', color: '#3f51b5' },
  },
  {
    title: 'Net Profit Margin (%)',
    value: '5%',
    status: { text: 'At Risk', color: '#f44336' },
  },
];

function KeyMetrics() {
  return (
    <Grid container spacing={3}>
      {metrics.map((metric, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              {metric.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
              <Typography variant="h4" component="div">
                {metric.value}
              </Typography>
            </Box>
            {metric.change && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {metric.change.prefix && (
                  <Typography
                    variant="body2"
                    color={metric.change.positive ? 'success.main' : 'error.main'}
                    sx={{ mr: 0.5 }}
                  >
                    {metric.change.prefix}
                  </Typography>
                )}
                {metric.change.positive ? (
                  <ArrowUpward
                    sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }}
                  />
                ) : (
                  <ArrowDownward
                    sx={{ color: 'error.main', fontSize: 16, mr: 0.5 }}
                  />
                )}
                <Typography
                  variant="body2"
                  color={metric.change.positive ? 'success.main' : 'error.main'}
                >
                  {metric.change.value}
                </Typography>
              </Box>
            )}
            {metric.status && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mt: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: metric.status.color,
                  }}
                >
                  {metric.status.text}
                </Typography>
                <Box
                  sx={{
                    ml: 1,
                    width: '50%',
                    height: 4,
                    borderRadius: 2,
                    bgcolor: metric.status.color,
                    opacity: 0.2,
                  }}
                >
                  <Box
                    sx={{
                      width: metric.status.text === 'On Track' ? '100%' : '30%',
                      height: '100%',
                      borderRadius: 2,
                      bgcolor: metric.status.color,
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

export default KeyMetrics;
