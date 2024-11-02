import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Box, Paper, Typography, IconButton, useTheme, Tabs, Tab } from '@mui/material';
import { ZoomIn, ZoomOut, FilterList, PanTool, RestartAlt } from '@mui/icons-material';

function NetworkTopology() {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const resetView = () => {
    setZoom(1);
    setTransform({ x: 0, y: 0 });
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    resetView();
  };

  const drawAttackScenario = (svg, width, height, colors) => {
    const padding = 20;
    const mainGroup = svg.append("g");

    // Draw title
    mainGroup.append("text")
      .attr("x", width / 2)
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .attr("fill", colors.text)
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .text("Scenario Overview - TRISIS++ (with Ransomware, Wannacry)");

    // Draw kill chain steps
    const steps = [
      "Reconnaissance", "Weaponization", "Delivery", "Exploitation",
      "Installation", "C&C", "Actions on Objective"
    ];

    const stepWidth = (width - padding * 2) / steps.length;
    const arrowY = 80;

    // Draw arrow line
    mainGroup.append("line")
      .attr("x1", padding)
      .attr("y1", arrowY)
      .attr("x2", width - padding)
      .attr("y2", arrowY)
      .attr("stroke", colors.border)
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrow)");

    // Add arrow marker
    svg.append("defs").append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 8)
      .attr("refY", 0)
      .attr("markerWidth", 8)
      .attr("markerHeight", 8)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", colors.border);

    // Draw steps
    steps.forEach((step, i) => {
      mainGroup.append("text")
        .attr("x", padding + i * stepWidth + stepWidth/2)
        .attr("y", arrowY - 15)
        .attr("text-anchor", "middle")
        .attr("fill", colors.text)
        .style("font-size", "12px")
        .text(step);
    });

    // Draw network zones
    const zones = [
      { name: "Corp DMZ", x: padding + 50, width: 100, height: 300 },
      { name: "IT", x: padding + 200, width: 200, height: 300 },
      { name: "IT/OT DMZ", x: padding + 450, width: 100, height: 300 },
      { name: "OT", x: padding + 600, width: 200, height: 300 },
      { name: "Safety System", x: padding + 850, width: 150, height: 300 }
    ];

    zones.forEach(zone => {
      // Zone container
      mainGroup.append("rect")
        .attr("x", zone.x)
        .attr("y", arrowY + 50)
        .attr("width", zone.width)
        .attr("height", zone.height)
        .attr("fill", colors.background)
        .attr("stroke", colors.border)
        .attr("rx", 8)
        .style("filter", "url(#drop-shadow)");

      // Zone label
      mainGroup.append("text")
        .attr("x", zone.x + zone.width/2)
        .attr("y", arrowY + 80)
        .attr("text-anchor", "middle")
        .attr("fill", colors.text)
        .style("font-size", "14px")
        .text(zone.name);
    });

    // Draw attack path
    const attackPath = mainGroup.append("path")
      .attr("d", `M${padding + 50},${arrowY + 200} 
                  L${padding + 300},${arrowY + 200}
                  L${padding + 500},${arrowY + 200}
                  L${padding + 700},${arrowY + 200}
                  L${padding + 900},${arrowY + 200}`)
      .attr("stroke", "#ff4444")
      .attr("stroke-width", 3)
      .attr("fill", "none")
      .attr("stroke-dasharray", "10,5")
      .attr("opacity", 0.8);

    // Animate attack path
    function repeat() {
      attackPath
        .attr("stroke-dashoffset", 0)
        .transition()
        .duration(5000)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 30)
        .on("end", repeat);
    }
    repeat();

    // Add attack steps text
    const attackSteps = [
      { text: "Attacker probes the IT environment", x: padding + 200, y: arrowY + 250 },
      { text: "Discovers open OT RDP access", x: padding + 450, y: arrowY + 250 },
      { text: "Pivots to OT environment", x: padding + 600, y: arrowY + 250 },
      { text: "Discovers and compromises SIS", x: padding + 850, y: arrowY + 250 }
    ];

    attackSteps.forEach(step => {
      mainGroup.append("text")
        .attr("x", step.x)
        .attr("y", step.y)
        .attr("text-anchor", "middle")
        .attr("fill", colors.text)
        .style("font-size", "12px")
        .text(step.text);
    });
  };

  const drawNetworkView = (svg, width, height, colors) => {
    const padding = 20;
    const mainGroup = svg.append("g");

    // Create gradients
    const serviceGradient = svg.append("defs")
      .append("linearGradient")
      .attr("id", "serviceGradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");

    serviceGradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", colors.primary)
      .attr("stop-opacity", 0.9);

    serviceGradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", colors.primary)
      .attr("stop-opacity", 0.7);

    // Draw top-level services
    const services = [
      { name: 'Security Orchestration, Automation and Response (SOAR)', y: 40 },
      { name: 'Security Information Event Management (SIEM)', y: 110 },
      { name: 'IT Service Management (ITSM)', y: 180 }
    ];

    services.forEach(service => {
      const serviceGroup = mainGroup.append("g")
        .attr("class", "service");

      serviceGroup.append('rect')
        .attr('x', padding + 50)
        .attr('y', service.y)
        .attr('width', width - (padding + 100))
        .attr('height', 45)
        .attr('rx', 8)
        .attr('fill', 'url(#serviceGradient)')
        .style("filter", "url(#drop-shadow)")
        .attr('opacity', 0.9);

      serviceGroup.append('text')
        .attr('x', width / 2)
        .attr('y', service.y + 28)
        .attr('text-anchor', 'middle')
        .attr('fill', 'white')
        .style('font-size', '14px')
        .style('font-weight', '500')
        .text(service.name);
    });

    // Calculate network container dimensions
    const networkWidth = (width - (padding * 3)) / 2;
    const networkStartY = 250;
    const networkHeight = 300;

    // Draw networks
    const networks = [
      { name: 'OT NETWORK', x: padding, y: networkStartY },
      { name: 'IP NETWORK', x: padding * 2 + networkWidth, y: networkStartY }
    ];

    networks.forEach(network => {
      const networkGroup = mainGroup.append("g")
        .attr("class", "network");

      // Network container
      networkGroup.append('rect')
        .attr('x', network.x)
        .attr('y', network.y)
        .attr('width', networkWidth)
        .attr('height', networkHeight)
        .attr('fill', colors.background)
        .attr('stroke', colors.border)
        .attr('stroke-width', 1.5)
        .attr('rx', 8)
        .style("filter", "url(#drop-shadow)");

      // Network label
      networkGroup.append('text')
        .attr('x', network.x + networkWidth / 2)
        .attr('y', network.y + 30)
        .attr('text-anchor', 'middle')
        .attr('fill', colors.text)
        .style('font-size', '16px')
        .style('font-weight', '500')
        .text(network.name);

      // Network components
      const components = network.name === 'OT NETWORK' 
        ? [
            { name: 'OT - SIEM/SOAR', y: networkStartY + 70 },
            { name: 'OT - Service Management (ITSM)', y: networkStartY + 130 }
          ]
        : [
            { name: 'IoT - SIEM/SOAR', y: networkStartY + 70 },
            { name: 'IoT - Service Management (ITSM)', y: networkStartY + 130 }
          ];

      const componentWidth = networkWidth - padding * 2;

      components.forEach(comp => {
        const componentGroup = networkGroup.append("g")
          .attr("class", "component");

        componentGroup.append('rect')
          .attr('x', network.x + padding)
          .attr('y', comp.y)
          .attr('width', componentWidth)
          .attr('height', 35)
          .attr('rx', 6)
          .attr('fill', 'url(#serviceGradient)')
          .style("filter", "url(#drop-shadow)");

        componentGroup.append('text')
          .attr('x', network.x + padding + componentWidth / 2)
          .attr('y', comp.y + 22)
          .attr('text-anchor', 'middle')
          .attr('fill', 'white')
          .style('font-size', '12px')
          .text(comp.name);
      });

      // Add devices
      const devices = network.name === 'OT NETWORK'
        ? [
            { name: 'Workstations', x: 0 },
            { name: 'Domain Controller', x: 1 },
            { name: 'Historian', x: 2 }
          ]
        : [
            { name: 'Smart Devices', x: 0 },
            { name: 'Medical Devices', x: 1 },
            { name: 'Connected Cars', x: 2 }
          ];

      const deviceContainerWidth = networkWidth - padding * 2;
      const deviceWidth = (deviceContainerWidth - padding * 2) / 3;
      const deviceStartY = networkStartY + 200;

      devices.forEach((device, i) => {
        const deviceGroup = networkGroup.append("g")
          .attr("class", "device");

        const deviceX = network.x + padding + (i * (deviceWidth + padding/2));

        deviceGroup.append('rect')
          .attr('x', deviceX)
          .attr('y', deviceStartY)
          .attr('width', deviceWidth)
          .attr('height', 50)
          .attr('rx', 6)
          .attr('fill', colors.background)
          .attr('stroke', colors.border)
          .style("filter", "url(#drop-shadow)");

        const deviceText = deviceGroup.append('text')
          .attr('x', deviceX + deviceWidth/2)
          .attr('y', deviceStartY + 30)
          .attr('text-anchor', 'middle')
          .attr('fill', colors.text)
          .style('font-size', '11px');

        const words = device.name.split(' ');
        if (words.length > 1) {
          deviceText.append('tspan')
            .attr('x', deviceX + deviceWidth/2)
            .attr('dy', '-0.6em')
            .text(words[0]);
          deviceText.append('tspan')
            .attr('x', deviceX + deviceWidth/2)
            .attr('dy', '1.2em')
            .text(words.slice(1).join(' '));
        } else {
          deviceText.text(device.name);
        }
      });
    });
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const width = 800;
    const height = 600;

    // Clear previous SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`);

    // Add clip path
    svg.append("defs")
      .append("clipPath")
      .attr("id", "topology-clip")
      .append("rect")
      .attr("width", width)
      .attr("height", height);

    // Define colors
    const colors = {
      background: theme.palette.mode === 'dark' ? '#1e1e1e' : '#ffffff',
      text: theme.palette.text.primary,
      primary: theme.palette.primary.main,
      secondary: theme.palette.secondary.main,
      border: theme.palette.divider,
      shadow: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.2)',
    };

    // Add drop shadow filter
    const filter = svg.append("defs")
      .append("filter")
      .attr("id", "drop-shadow")
      .attr("height", "130%");

    filter.append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 3)
      .attr("result", "blur");

    filter.append("feOffset")
      .attr("in", "blur")
      .attr("dx", 2)
      .attr("dy", 2)
      .attr("result", "offsetBlur");

    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode")
      .attr("in", "offsetBlur");
    feMerge.append("feMergeNode")
      .attr("in", "SourceGraphic");

    // Draw based on active tab
    if (activeTab === 0) {
      drawNetworkView(svg, width, height, colors);
    } else {
      drawAttackScenario(svg, width, height, colors);
    }

    // Add pan functionality with boundaries
    if (isPanning) {
      const drag = d3.drag()
        .on('drag', (event) => {
          const newX = transform.x + event.dx;
          const newY = transform.y + event.dy;

          const maxX = width * 0.2;
          const maxY = height * 0.2;

          const constrainedX = Math.min(Math.max(newX, -maxX), maxX);
          const constrainedY = Math.min(Math.max(newY, -maxY), maxY);

          setTransform({
            x: constrainedX,
            y: constrainedY
          });
        });

      svg.call(drag);
    }

    const interval = setInterval(() => {
      setLastUpdate(Date.now());
    }, 5000);

    return () => clearInterval(interval);
  }, [zoom, theme.palette.mode, lastUpdate, transform, isPanning, activeTab]);

  return (
    <Paper sx={{ p: 3, height: '100%', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Network Topology</Typography>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          sx={{ ml: 3, minHeight: 0 }}
        >
          <Tab 
            label="Network View" 
            sx={{ 
              minHeight: 0,
              py: 1,
              px: 2,
              fontSize: '0.875rem',
            }} 
          />
          <Tab 
            label="Attack Scenario" 
            sx={{ 
              minHeight: 0,
              py: 1,
              px: 2,
              fontSize: '0.875rem',
            }} 
          />
        </Tabs>
        <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
          <IconButton 
            size="small" 
            onClick={() => setIsPanning(!isPanning)}
            color={isPanning ? 'primary' : 'default'}
            sx={{ 
              bgcolor: isPanning ? 'action.selected' : 'transparent',
              '&:hover': { bgcolor: isPanning ? 'action.selected' : 'action.hover' }
            }}
          >
            <PanTool />
          </IconButton>
          <IconButton size="small" onClick={() => setZoom(z => z * 1.2)}>
            <ZoomIn />
          </IconButton>
          <IconButton size="small" onClick={() => setZoom(z => z / 1.2)}>
            <ZoomOut />
          </IconButton>
          <IconButton size="small" onClick={resetView}>
            <RestartAlt />
          </IconButton>
          <IconButton size="small">
            <FilterList />
          </IconButton>
        </Box>
      </Box>
      <Box 
        ref={containerRef}
        sx={{ 
          width: '100%', 
          height: 'calc(100% - 48px)', 
          overflow: 'hidden',
          cursor: isPanning ? 'move' : 'default',
          position: 'relative',
          '& svg': { 
            transform: `scale(${zoom})`, 
            transformOrigin: 'center',
            transition: 'transform 0.2s ease-in-out',
            maxWidth: '100%',
            maxHeight: '100%',
          }
        }}
      >
        <svg 
          ref={svgRef}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) scale(${zoom})`,
          }}
        />
      </Box>
    </Paper>
  );
}

export default NetworkTopology;
