// Alert management and detection system
export class AlertService {
  constructor() {
    this.alerts = [];
    this.subscribers = [];
    this.thresholds = {
      unauthorized_access: 3,
      data_exfiltration: 1,
      policy_violation: 5,
      unusual_traffic: 4,
    };
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  notify(alert) {
    this.subscribers.forEach(callback => callback(alert));
  }

  processSecurityEvent(event) {
    const alert = this.analyzeEvent(event);
    if (alert) {
      this.alerts.push(alert);
      this.notify(alert);
      return alert;
    }
    return null;
  }

  analyzeEvent(event) {
    // Pattern recognition logic
    if (this.isUnauthorizedZoneCommunication(event)) {
      return this.createAlert('unauthorized_zone_access', 'high', event);
    }

    if (this.isDataExfiltration(event)) {
      return this.createAlert('data_exfiltration', 'critical', event);
    }

    if (this.isPolicyViolation(event)) {
      return this.createAlert('policy_violation', 'medium', event);
    }

    return null;
  }

  isUnauthorizedZoneCommunication(event) {
    const restrictedCombos = [
      ['OT', 'IT'],
      ['SCADA', 'DMZ'],
    ];
    return restrictedCombos.some(([zone1, zone2]) => 
      (event.sourceZone === zone1 && event.destinationZone === zone2) ||
      (event.sourceZone === zone2 && event.destinationZone === zone1)
    );
  }

  isDataExfiltration(event) {
    return event.type === 'data_exfiltration';
  }

  isPolicyViolation(event) {
    return event.type === 'policy_violation';
  }

  createAlert(type, severity, event) {
    return {
      id: Math.random().toString(36).substr(2, 9),
      type,
      severity,
      timestamp: new Date().toISOString(),
      source: event,
      status: 'new',
      description: this.getAlertDescription(type, event),
    };
  }

  getAlertDescription(type, event) {
    const descriptions = {
      unauthorized_zone_access: `Unauthorized communication detected between ${event.sourceZone} and ${event.destinationZone} zones`,
      data_exfiltration: 'Potential data exfiltration detected - investigating data transfer patterns',
      policy_violation: 'Security policy violation detected - unauthorized system access or protocol usage',
    };
    return descriptions[type] || 'Unknown security event detected';
  }

  updateAlertStatus(alertId, status) {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.status = status;
      this.notify(alert);
    }
  }

  getActiveAlerts() {
    return this.alerts.filter(alert => alert.status === 'new');
  }

  getPrioritizedAlerts() {
    return [...this.alerts].sort((a, b) => {
      const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return severityOrder[a.severity] - severityOrder[b.severity];
    });
  }
}

export const alertService = new AlertService();
