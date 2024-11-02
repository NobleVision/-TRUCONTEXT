import React, { useState, useRef, useEffect } from 'react';
import { Paper, Typography, IconButton, Box } from '@mui/material';
import { ZoomIn, ZoomOut, FilterList } from '@mui/icons-material';
import * as d3 from 'd3';
import { useTheme } from '@mui/material/styles';

function NetworkTopology() {
  const svgRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const theme = useTheme();

  useEffect(() => {
    const width = 1200;
    const height = 800;
    
    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();
    
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`);

    // Define colors
    const colors = {
      soar: "#0277bd",
      siem: "#0288d1",
      itsm: "#039be5",
      network: "#e3f2fd",
      border: "#90caf9",
      text: "#37474f"
    };

    // Draw top-level services
    const services = [
      { name: 'Security Orchestration, Automation and Response (SOAR)', y: 50 },
      { name: 'Security Information Event Management (SIEM)', y: 120 },
      { name: 'IT Service Management (ITSM)', y: 190 }
    ];

    // Draw service layers
    services.forEach(service => {
      svg.append('rect')
        .attr('x', 200)
        .attr('y', service.y)
        .attr('width', 800)
        .attr('height', 40)
        .attr('rx', 5)
        .attr('fill', colors.soar)
        .attr('opacity', 0.9);

      svg.append('text')
        .attr('x', 600)
        .attr('y', service.y + 25)
        .attr('text-anchor', 'middle')
        .attr('fill', 'white')
        .text(service.name);
    });

    // Draw OT Network
    const drawNetwork = (x, y, width, height, title) => {
      svg.append('rect')
        .attr('x', x)
        .attr('y', y)
        .attr('width', width)
        .attr('height', height)
        .attr('fill', colors.network)
        .attr('stroke', colors.border)
        .attr('stroke-width', 2);

      svg.append('text')
        .attr('x', x + width/2)
        .attr('y', y + 30)
        .attr('text-anchor', 'middle')
        .attr('fill', colors.text)
        .attr('font-weight', 'bold')
        .text(title);
    };

    // Draw OT and IoT Networks
    drawNetwork(50, 250, 500, 500, 'OT NETWORK');
    drawNetwork(650, 250, 500, 500, 'IoT NETWORK');

    // Draw Purdue Levels for OT
    const otLevels = [
      { name: 'LEVEL 4\nSOC/Cloud', y: 300 },
      { name: 'LEVEL 3\nOps Network', y: 400 },
      { name: 'LEVEL 2\nProcess Network', y: 500 },
      { name: 'LEVEL 1\nControl Network', y: 600 }
    ];

    otLevels.forEach(level => {
      svg.append('rect')
        .attr('x', 70)
        .attr('y', level.y)
        .attr('width', 460)
        .attr('height', 80)
        .attr('fill', '#f5f5f5')
        .attr('stroke', colors.border);

      svg.append('text')
        .attr('x', 100)
        .attr('y', level.y + 30)
        .attr('fill', colors.text)
        .attr('font-size', '12px')
        .text(level.name);
    });

    // Draw IoT Levels
    const iotLevels = [
      { name: 'IoT - SIEM/SOAR', y: 300 },
      { name: 'IoT - Service Management', y: 400 },
      { name: 'Smart Devices', y: 500 },
      { name: 'Connected Devices', y: 600 }
    ];

    iotLevels.forEach(level => {
      svg.append('rect')
        .attr('x', 670)
        .attr('y', level.y)
        .attr('width', 460)
        .attr('height', 80)
        .attr('fill', '#f5f5f5')
        .attr('stroke', colors.border);

      svg.append('text')
        .attr('x', 700)
        .attr('y', level.y + 30)
        .attr('fill', colors.text)
        .attr('font-size', '12px')
        .text(level.name);
    });

    // Draw Firewalls
    const drawFirewall = (x, y) => {
      svg.append('rect')
        .attr('x', x)
        .attr('y', y)
        .attr('width', 30)
        .attr('height', 30)
        .attr('fill', '#ff5722')
        .attr('rx', 5);

      svg.append('text')
        .attr('x', x + 15)
        .attr('y', y + 20)
        .attr('text-anchor', 'middle')
        .attr('fill', 'white')
        .attr('font-size', '8px')
        .text('FW');
    };

    // Add firewalls at network boundaries
    drawFirewall(285, 270);
    drawFirewall(285, 370);
    drawFirewall(885, 270);
    drawFirewall(885, 370);

    // Add visibility icons
    const drawVisibility = (x, y) => {
      svg.append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', 8)
        .attr('fill', '#4caf50');
    };

    // Add visibility points
    [350, 450, 550, 650].forEach(y => {
      drawVisibility(480, y);
      drawVisibility(1080, y);
    });

  }, [zoom]);

  return (
    <Paper sx={{ p: 2, height: '100%', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">E-IoT: Converged OT/IoT Managed Services Solution</Typography>
        <Box sx={{ ml: 'auto' }}>
          <IconButton size="small" onClick={() => setZoom(z => z * 1.1)}>
            <ZoomIn />
          </IconButton>
          <IconButton size="small" onClick={() => setZoom(z => z / 1.1)}>
            <ZoomOut />
          </IconButton>
          <IconButton size="small">
            <FilterList />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ 
        width: '100%', 
        height: 'calc(100% - 48px)', 
        overflow: 'auto',
        '& svg': { 
          transform: `scale(${zoom})`, 
          transformOrigin: 'top left',
          transition: 'transform 0.3s ease-in-out'
        }
      }}>
        <svg ref={svgRef}></svg>
      </Box>
    </Paper>
  );
}

export default NetworkTopology;
