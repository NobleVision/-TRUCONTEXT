import { generateSecurityEvent, generateNetworkTraffic, generateAsset } from '../services/mockDataService';
import { alertService } from '../services/alertService';
import { networkService } from '../services/networkService';
import { integrationService } from '../services/integrationService';

export class SimulationController {
  constructor() {
    this.intervals = new Map();
    this.isRunning = false;
    
    // Initialize integrations
    this.setupIntegrations();
  }

  setupIntegrations() {
    // Register mock integrations
    integrationService.registerIntegration('splunk', {
      url: 'https://splunk.example.com',
      apiKey: 'mock-api-key',
      dataTypes: ['logs', 'events'],
    });

    integrationService.registerIntegration('tenable', {
      url: 'https://tenable.example.com',
      apiKey: 'mock-api-key',
      scanInterval: 3600,
    });

    integrationService.registerIntegration('crowdstrike', {
      url: 'https://crowdstrike.example.com',
      apiKey: 'mock-api-key',
      realTimeMonitoring: true,
    });
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;

    // Generate initial assets
    this.generateInitialAssets();

    // Start security event simulation
    this.intervals.set('securityEvents', setInterval(() => {
      const event = generateSecurityEvent();
      const alert = alertService.processSecurityEvent(event);
      if (alert) {
        console.log('New Alert:', alert);
      }
    }, 3000));

    // Start network traffic simulation
    this.intervals.set('networkTraffic', setInterval(() => {
      const traffic = generateNetworkTraffic();
      // Process network traffic for anomaly detection
      this.detectAnomalies(traffic);
    }, 1000));

    // Start integration data streams
    integrationService.startDataStream('splunk');
    integrationService.startDataStream('tenable');
    integrationService.startDataStream('crowdstrike');
  }

  stop() {
    this.isRunning = false;
    
    // Clear all simulation intervals
    this.intervals.forEach((interval) => clearInterval(interval));
    this.intervals.clear();

    // Stop integration data streams
    integrationService.stopDataStream('splunk');
    integrationService.stopDataStream('tenable');
    integrationService.stopDataStream('crowdstrike');
  }

  generateInitialAssets() {
    // Generate assets for each network and level
    ['OT Network', 'IoT Network'].forEach(network => {
      Object.keys(networkService.getITOTStructure()[network]).forEach(level => {
        const assetCount = Math.floor(Math.random() * 3) + 2; // 2-4 assets per level
        for (let i = 0; i < assetCount; i++) {
          const asset = generateAsset();
          asset.network = network;
          asset.level = level;
          networkService.addAsset(asset);
        }
      });
    });
  }

  detectAnomalies(traffic) {
    // Detect cross-network communication
    if (traffic.sourceNetwork !== traffic.destinationNetwork) {
      const event = {
        type: 'unusual_traffic',
        sourceNetwork: traffic.sourceNetwork,
        destinationNetwork: traffic.destinationNetwork,
        sourceDevice: traffic.sourceDevice,
        destinationDevice: traffic.destinationDevice,
        severity: 'high',
        description: `Cross-network communication detected between ${traffic.sourceNetwork} and ${traffic.destinationNetwork}`,
      };
      alertService.processSecurityEvent(event);
    }

    // Detect high volume traffic
    if (traffic.bytes > 900000) {
      const event = {
        type: 'unusual_traffic',
        sourceNetwork: traffic.sourceNetwork,
        destinationNetwork: traffic.destinationNetwork,
        sourceDevice: traffic.sourceDevice,
        destinationDevice: traffic.destinationDevice,
        severity: 'medium',
        description: 'High volume traffic detected',
      };
      alertService.processSecurityEvent(event);
    }
  }

  getSimulationStatus() {
    return {
      isRunning: this.isRunning,
      activeAlerts: alertService.getActiveAlerts().length,
      networkHealth: networkService.getAllZonesHealth(),
      activeIntegrations: integrationService.getActiveIntegrations().length,
    };
  }
}

export const simulationController = new SimulationController();
