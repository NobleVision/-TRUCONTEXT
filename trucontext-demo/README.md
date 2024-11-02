# TruContext Security Dashboard Demo

A React-based security dashboard that demonstrates TruContext's core capabilities for visualizing and analyzing network security data across OT/IT environments. This demo showcases real-time visualization, security monitoring, and integration capabilities.

## Features

### 1. Network Topology Visualization
- Interactive OT/IT network visualization
- Network segmentation and zone-based view
- Pan and zoom capabilities
- Real-time connection monitoring
- Device relationship mapping

### 2. Security Monitoring
- Real-time threat detection
- Active security alerts
- Zone health status
- Asset vulnerability tracking
- Cross-zone communication monitoring

### 3. Security Tool Integration
- Integration with common security tools:
  - Splunk data visualization
  - Tenable vulnerability data
  - CrowdStrike threat detection
- Real-time data synchronization
- Integration health monitoring

### 4. Key Metrics Dashboard
- Active threats monitoring
- Asset tracking
- Security score
- Network health status
- Real-time updates

## Technology Stack

- **Frontend Framework**: React
- **Visualization**: D3.js
- **UI Components**: Material-UI
- **Build Tool**: Vite
- **State Management**: React Hooks
- **Styling**: Emotion (MUI styled-components)

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd trucontext-demo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

## Usage

### Network Topology Controls
- **Pan**: Click the hand icon and drag to move the topology view
- **Zoom**: Use the +/- buttons to zoom in/out
- **Reset**: Click the reset button to return to the default view
- **Filter**: Use the filter button to show/hide different components

### Security Monitoring
- View real-time security alerts in the monitoring panel
- Track zone health status for different network segments
- Monitor integration status with security tools
- View asset vulnerabilities and security metrics

### Dark/Light Mode
- Toggle between dark and light themes using the theme switch button

## Project Structure

```
trucontext-demo/
├── src/
│   ├── components/          # React components
│   │   ├── NetworkTopology.jsx
│   │   ├── SecurityMonitor.jsx
│   │   ├── SecurityMetrics.jsx
│   │   └── IntegrationStatus.jsx
│   ├── services/           # Business logic and data services
│   │   ├── mockDataService.js
│   │   ├── alertService.js
│   │   ├── networkService.js
│   │   └── integrationService.js
│   ├── controllers/        # Application controllers
│   │   └── simulationController.js
│   ├── App.jsx            # Main application component
│   └── main.jsx           # Application entry point
├── public/                # Static assets
├── package.json          # Project dependencies and scripts
└── vite.config.js        # Vite configuration
```

## Features in Detail

### Network Topology
The network topology visualization provides a comprehensive view of your OT/IT infrastructure:
- Visualize network segmentation (OT Network, IP Network)
- Monitor cross-zone communications
- Track device relationships and connections
- View security status of network components

### Security Monitoring
Real-time security monitoring capabilities include:
- Active threat detection and alerting
- Zone-based health monitoring
- Asset vulnerability tracking
- Security event correlation
- Custom alert thresholds

### Integration Status
Monitor the health and status of security tool integrations:
- Real-time data synchronization status
- Integration health metrics
- Latest data updates from each tool
- Integration performance monitoring

## Development

### Adding New Features
1. Create new components in the `src/components` directory
2. Add services in the `src/services` directory
3. Update the simulation controller as needed
4. Modify the main App component to include new features

### Customization
- Theme customization in `src/theme.js`
- Component styling using MUI's styling system
- Data simulation parameters in mock services

## License

[License details here]

## Contributing

[Contribution guidelines here]
