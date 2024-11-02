// Mock data generation for security events and network traffic
const ITOT_STRUCTURE = {
  'OT Network': {
    'Level 4': {
      type: 'Control',
      devices: ['CXO Dashboards', 'Control Engineer'],
    },
    'Level 3': {
      type: 'Operations',
      devices: ['USB Scanning', 'Workstations', 'Domain Controller', 'Historian'],
    },
    'Level 2': {
      type: 'Supervisory',
      devices: ['HMI', 'Engineering Workstation', 'DCS/SCADA Server'],
    },
    'Level 1': {
      type: 'Control',
      devices: ['PLC/RTU', 'PLC/RTU', 'PLC/RTU'],
    },
  },
  'IoT Network': {
    'Level 3': {
      type: 'Management',
      devices: ['Management Servers', 'Domain Controller', 'DB'],
    },
    'Level 2': {
      type: 'Network',
      devices: ['Workstations', 'Linux', 'Servers'],
    },
    'Level 1': {
      type: 'Devices',
      devices: ['Smart Cities & Connected Cars', 'Medical Devices', 'Smart Wearables'],
    },
  },
};

export const generateNetworkTraffic = () => {
  const sourceNetwork = Object.keys(ITOT_STRUCTURE)[Math.floor(Math.random() * 2)];
  const destinationNetwork = Object.keys(ITOT_STRUCTURE)[Math.floor(Math.random() * 2)];
  
  const sourceLevel = Object.keys(ITOT_STRUCTURE[sourceNetwork])[
    Math.floor(Math.random() * Object.keys(ITOT_STRUCTURE[sourceNetwork]).length)
  ];
  const destLevel = Object.keys(ITOT_STRUCTURE[destinationNetwork])[
    Math.floor(Math.random() * Object.keys(ITOT_STRUCTURE[destinationNetwork]).length)
  ];

  const sourceDevices = ITOT_STRUCTURE[sourceNetwork][sourceLevel].devices;
  const destDevices = ITOT_STRUCTURE[destinationNetwork][destLevel].devices;

  return {
    timestamp: new Date().toISOString(),
    sourceNetwork,
    sourceLevel,
    sourceDevice: sourceDevices[Math.floor(Math.random() * sourceDevices.length)],
    destinationNetwork,
    destinationLevel: destLevel,
    destinationDevice: destDevices[Math.floor(Math.random() * destDevices.length)],
    protocol: ['TCP', 'UDP', 'MODBUS', 'PROFINET'][Math.floor(Math.random() * 4)],
    bytes: Math.floor(Math.random() * 1000000),
    packets: Math.floor(Math.random() * 1000),
  };
};

export const generateSecurityEvent = () => {
  const eventTypes = ['unauthorized_access', 'data_exfiltration', 'policy_violation', 'unusual_traffic'];
  const networks = Object.keys(ITOT_STRUCTURE);
  const levels = ['Level 1', 'Level 2', 'Level 3', 'Level 4'];
  
  const sourceNetwork = networks[Math.floor(Math.random() * networks.length)];
  const sourceLevelKey = Object.keys(ITOT_STRUCTURE[sourceNetwork])[
    Math.floor(Math.random() * Object.keys(ITOT_STRUCTURE[sourceNetwork]).length)
  ];
  const sourceDevices = ITOT_STRUCTURE[sourceNetwork][sourceLevelKey].devices;
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date().toISOString(),
    type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
    sourceNetwork,
    sourceLevel: sourceLevelKey,
    sourceDevice: sourceDevices[Math.floor(Math.random() * sourceDevices.length)],
    severity: ['critical', 'high', 'medium', 'low'][Math.floor(Math.random() * 4)],
    description: generateEventDescription(),
  };
};

const generateEventDescription = () => {
  const descriptions = {
    unauthorized_access: 'Unauthorized access attempt detected between zones',
    data_exfiltration: 'Potential data exfiltration detected - unusual data transfer pattern',
    policy_violation: 'Security policy violation - unauthorized protocol usage',
    unusual_traffic: 'Anomalous traffic pattern detected in network segment',
  };
  const eventTypes = Object.keys(descriptions);
  return descriptions[eventTypes[Math.floor(Math.random() * eventTypes.length)]];
};

export const generateAsset = () => {
  const network = Object.keys(ITOT_STRUCTURE)[Math.floor(Math.random() * 2)];
  const level = Object.keys(ITOT_STRUCTURE[network])[
    Math.floor(Math.random() * Object.keys(ITOT_STRUCTURE[network]).length)
  ];
  const devices = ITOT_STRUCTURE[network][level].devices;
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    name: devices[Math.floor(Math.random() * devices.length)],
    type: ITOT_STRUCTURE[network][level].type,
    network,
    level,
    ip: generateIP(),
    lastSeen: new Date().toISOString(),
    vulnerabilities: generateVulnerabilities(),
    configuration: {
      firmware: `v${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`,
      patches: `KB${Math.floor(Math.random() * 1000000)}`,
      lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
    },
  };
};

const generateIP = () => {
  return Array(4).fill(0).map(() => Math.floor(Math.random() * 256)).join('.');
};

const generateVulnerabilities = () => {
  const vulnCount = Math.floor(Math.random() * 5);
  return Array(vulnCount).fill(0).map(() => ({
    id: `CVE-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`,
    severity: ['critical', 'high', 'medium', 'low'][Math.floor(Math.random() * 4)],
    description: 'Security vulnerability affecting system integrity',
    remediation: 'Apply latest security patches and updates',
  }));
};

export const getITOTStructure = () => ITOT_STRUCTURE;
