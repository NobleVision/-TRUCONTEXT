import { getITOTStructure } from './mockDataService';

class NetworkService {
  constructor() {
    this.assets = new Map();
    this.connections = new Map();
    this.zones = new Set(['OT', 'IT', 'DMZ', 'SCADA']);
    this.ITOT_STRUCTURE = getITOTStructure();
  }

  addAsset(asset) {
    this.assets.set(asset.id, asset);
    this.updateConnections(asset);
  }

  updateConnections(asset) {
    const potentialConnections = Array.from(this.assets.values())
      .filter(a => a.id !== asset.id)
      .filter(a => this.canConnect(asset, a));

    potentialConnections.forEach(connectedAsset => {
      const connectionId = this.getConnectionId(asset.id, connectedAsset.id);
      this.connections.set(connectionId, {
        source: asset.id,
        target: connectedAsset.id,
        type: this.getConnectionType(asset, connectedAsset),
        status: 'active',
      });
    });
  }

  canConnect(asset1, asset2) {
    if (asset1.network === asset2.network) return true;
    
    const allowedCrossNetwork = {
      'OT Network': ['IP Network'],
      'IP Network': ['OT Network'],
    };

    return allowedCrossNetwork[asset1.network]?.includes(asset2.network) ||
           allowedCrossNetwork[asset2.network]?.includes(asset1.network);
  }

  getConnectionId(assetId1, assetId2) {
    return [assetId1, assetId2].sort().join('-');
  }

  getConnectionType(asset1, asset2) {
    if (asset1.network === asset2.network) return 'internal';
    return 'cross-network';
  }

  getAssetsByZone(zone) {
    return Array.from(this.assets.values())
      .filter(asset => asset.network.startsWith(zone));
  }

  getConnections() {
    return Array.from(this.connections.values());
  }

  getNetworkTopology() {
    return {
      nodes: Array.from(this.assets.values()),
      edges: this.getConnections(),
      zones: Array.from(this.zones),
    };
  }

  getITOTStructure() {
    return this.ITOT_STRUCTURE;
  }

  getAllZonesHealth() {
    return ['OT', 'IT', 'DMZ', 'SCADA'].map(zone => {
      const assets = this.getAssetsByZone(zone);
      const vulnerabilities = assets.flatMap(asset => asset.vulnerabilities || []);
      
      return {
        zone,
        assetCount: assets.length,
        criticalVulnerabilities: vulnerabilities.filter(v => v.severity === 'critical').length,
        highVulnerabilities: vulnerabilities.filter(v => v.severity === 'high').length,
        mediumVulnerabilities: vulnerabilities.filter(v => v.severity === 'medium').length,
        lowVulnerabilities: vulnerabilities.filter(v => v.severity === 'low').length,
      };
    });
  }
}

export const networkService = new NetworkService();
