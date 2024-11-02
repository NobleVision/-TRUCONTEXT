// Mock integration with security tools
export class IntegrationService {
  constructor() {
    this.integrations = new Map();
    this.dataStreams = new Map();
  }

  // Simulate Splunk integration
  async getSplunkData() {
    return {
      timestamp: new Date().toISOString(),
      events: Array(5).fill(0).map(() => ({
        id: Math.random().toString(36).substr(2, 9),
        source: 'splunk',
        type: ['authentication', 'network', 'system', 'security', 'compliance'][Math.floor(Math.random() * 5)],
        severity: ['critical', 'high', 'medium', 'low'][Math.floor(Math.random() * 4)],
        message: [
          'Unauthorized access attempt detected',
          'Suspicious process execution observed',
          'Network policy violation detected',
          'Configuration change detected',
          'System resource exhaustion warning'
        ][Math.floor(Math.random() * 5)],
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 3600000)).toISOString(),
        zone: ['OT Network', 'IoT Network', 'IT Network'][Math.floor(Math.random() * 3)]
      })),
      metrics: {
        eventsPerSecond: Math.floor(Math.random() * 1000) + 500,
        avgLatency: Math.floor(Math.random() * 100) + 20,
        indexedData: `${(Math.random() * 10).toFixed(1)}TB`
      }
    };
  }

  // Simulate Tenable integration
  async getTenableVulnerabilities() {
    return {
      timestamp: new Date().toISOString(),
      vulnerabilities: Array(3).fill(0).map(() => ({
        id: `vuln-${Math.random().toString(36).substr(2, 9)}`,
        cve: `CVE-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`,
        severity: ['critical', 'high', 'medium', 'low'][Math.floor(Math.random() * 4)],
        description: [
          'Remote Code Execution vulnerability in industrial controller',
          'Authentication bypass in IoT device firmware',
          'Privilege escalation in network management interface',
          'Buffer overflow in SCADA component',
          'Denial of Service vulnerability in PLC communication'
        ][Math.floor(Math.random() * 5)],
        affectedAssets: Math.floor(Math.random() * 50) + 1,
        remediation: 'Apply security patches and updates',
        discoveryDate: new Date(Date.now() - Math.floor(Math.random() * 86400000)).toISOString()
      })),
      metrics: {
        scannedAssets: Math.floor(Math.random() * 1000) + 500,
        activeScans: Math.floor(Math.random() * 5) + 1,
        criticalVulns: Math.floor(Math.random() * 20)
      }
    };
  }

  // Simulate CrowdStrike integration
  async getCrowdStrikeThreats() {
    return {
      timestamp: new Date().toISOString(),
      threats: Array(2).fill(0).map(() => ({
        id: `threat-${Math.random().toString(36).substr(2, 9)}`,
        type: ['malware', 'ransomware', 'exploit', 'backdoor', 'cryptominer'][Math.floor(Math.random() * 5)],
        severity: ['critical', 'high', 'medium'][Math.floor(Math.random() * 3)],
        status: ['active', 'contained', 'investigating', 'remediated'][Math.floor(Math.random() * 4)],
        description: [
          'Advanced persistent threat detected in OT network',
          'Ransomware activity detected in IT segment',
          'Zero-day exploit attempt blocked',
          'Suspicious lateral movement detected',
          'Data exfiltration attempt prevented'
        ][Math.floor(Math.random() * 5)],
        detectionEngine: ['ML', 'Behavioral', 'Signature', 'Cloud'][Math.floor(Math.random() * 4)],
        affectedSystems: Math.floor(Math.random() * 10) + 1
      })),
      metrics: {
        activeThreats: Math.floor(Math.random() * 15),
        preventedAttacks: Math.floor(Math.random() * 1000) + 200,
        quarantinedFiles: Math.floor(Math.random() * 50)
      }
    };
  }

  // Register new integration
  registerIntegration(name, config) {
    this.integrations.set(name, {
      name,
      config,
      status: 'active',
      lastSync: new Date().toISOString(),
    });
  }

  // Get integration status
  getIntegrationStatus(name) {
    return this.integrations.get(name);
  }

  // Simulate data stream from integration
  startDataStream(integration) {
    if (this.dataStreams.has(integration)) {
      return;
    }

    const streamId = setInterval(async () => {
      let data;
      switch (integration) {
        case 'splunk':
          data = await this.getSplunkData();
          break;
        case 'tenable':
          data = await this.getTenableVulnerabilities();
          break;
        case 'crowdstrike':
          data = await this.getCrowdStrikeThreats();
          break;
        default:
          return;
      }

      // Update integration status
      const integrationConfig = this.integrations.get(integration);
      if (integrationConfig) {
        integrationConfig.lastSync = new Date().toISOString();
        this.integrations.set(integration, integrationConfig);
      }

      // Notify subscribers if implemented
    }, 5000); // Update every 5 seconds

    this.dataStreams.set(integration, streamId);
  }

  // Stop data stream
  stopDataStream(integration) {
    const streamId = this.dataStreams.get(integration);
    if (streamId) {
      clearInterval(streamId);
      this.dataStreams.delete(integration);
    }
  }

  // Get all active integrations
  getActiveIntegrations() {
    return Array.from(this.integrations.values())
      .filter(integration => integration.status === 'active');
  }
}

export const integrationService = new IntegrationService();
