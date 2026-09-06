import React, { useState, useEffect, useRef } from 'react';
import { useAppStore } from '../../store/useAppStore';

/**
 * Concentric 5-Tier Curved Arcs spanning the full height/width of the container.
 * Features a metallic-shine matte dot in dot blue (#5D7FC4) with no drop shadow.
 * The dot is attracted to the cursor position, constrains within safe bounds,
 * supports double-click theme toggling, and reveals a hover tooltip.
 */
export default function GraphicOverlay() {
  const { theme, toggleTheme } = useAppStore();
  const isDark = theme === 'dark';

  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 500 });
  const [currentAngle, setCurrentAngle] = useState(225); // 180 is left, 270 is up
  const [isHovered, setIsHovered] = useState(false);
  const targetAngleRef = useRef(225);
  const animationFrameRef = useRef(null);

  // Dynamically measure container dimensions to make arcs span edge-to-edge
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const { width, height } = dimensions;

  // Center of arcs is at the bottom-right corner of the container
  const cx = width;
  const cy = height;

  // Radii of the 5 arcs (spaced by 64px for clean, prominent hierarchy)
  const r1 = 300;
  const r2 = 364;
  const r3 = 428;
  const r4 = 492;
  const r5 = 556; // Outermost/top arc carrying the dot

  // Arc spans 180° (left) to 270° (top); only restrict ~8% from each end
  const ARC_MIN = 180;
  const ARC_MAX = 270;
  const EDGE_MARGIN = 0.08;
  const arcSpan = ARC_MAX - ARC_MIN;
  const MIN_ANGLE = ARC_MIN + arcSpan * EDGE_MARGIN;
  const MAX_ANGLE = ARC_MAX - arcSpan * EDGE_MARGIN;

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      
      // Calculate center coordinate in screen pixels
      const centerX = rect.left + rect.width;
      const centerY = rect.top + rect.height;
      
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      
      // Get angle in degrees (0 to 360)
      let angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
      if (angleDeg < 0) {
        angleDeg += 360;
      }

      // Constrain to arc range with small edge margin so dot stays visible
      let constrainedAngle = angleDeg;
      if (constrainedAngle < MIN_ANGLE) {
        constrainedAngle = MIN_ANGLE;
      } else if (constrainedAngle > MAX_ANGLE) {
        constrainedAngle = MAX_ANGLE;
      }

      targetAngleRef.current = constrainedAngle;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [MIN_ANGLE, MAX_ANGLE]);

  // Smooth LERP animation loop for magnetic lag
  useEffect(() => {
    const tick = () => {
      setCurrentAngle((prev) => {
        const diff = targetAngleRef.current - prev;
        const next = prev + diff * 0.12;
        return Math.abs(diff) < 0.01 ? targetAngleRef.current : next;
      });
      animationFrameRef.current = requestAnimationFrame(tick);
    };
    
    animationFrameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, []);

  // Compute current dot coordinates on the 5th arc
  const rad = (currentAngle * Math.PI) / 180;
  const dotX = cx + r5 * Math.cos(rad);
  const dotY = cy + r5 * Math.sin(rad);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0"
    >
      <svg 
        viewBox={`0 0 ${width} ${height}`}
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-full h-full overflow-hidden pointer-events-none"
      >
        <defs>
          {/* Radial Gradient for 3D metallic sphere body and matte finish shine */}
          <radialGradient id="matteMetallicDot" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFFFFF" />      {/* Specular metallic highlight */}
            <stop offset="25%" stopColor="#A8C1F4" />     {/* Shiny light blue transition */}
            <stop offset="65%" stopColor="#5D7FC4" />     {/* Core brand dot blue (#5D7FC4) */}
            <stop offset="100%" stopColor="#3F588F" />    {/* Shaded/diffuse side of sphere */}
          </radialGradient>
        </defs>

        {/* 5 Concentric Arcs spanning to the edges of the box */}
        <path d={`M ${cx - r1} ${cy} A ${r1} ${r1} 0 0 1 ${cx} ${cy - r1}`} stroke="#5D7FC4" strokeWidth="2.2" strokeOpacity={isDark ? "0.22" : "0.15"} strokeLinecap="round" className="transition-all duration-300" />
        <path d={`M ${cx - r2} ${cy} A ${r2} ${r2} 0 0 1 ${cx} ${cy - r2}`} stroke="#5D7FC4" strokeWidth="2.2" strokeOpacity={isDark ? "0.22" : "0.15"} strokeLinecap="round" className="transition-all duration-300" />
        <path d={`M ${cx - r3} ${cy} A ${r3} ${r3} 0 0 1 ${cx} ${cy - r3}`} stroke="#5D7FC4" strokeWidth="2.2" strokeOpacity={isDark ? "0.22" : "0.15"} strokeLinecap="round" className="transition-all duration-300" />
        <path d={`M ${cx - r4} ${cy} A ${r4} ${r4} 0 0 1 ${cx} ${cy - r4}`} stroke="#5D7FC4" strokeWidth="2.2" strokeOpacity={isDark ? "0.22" : "0.15"} strokeLinecap="round" className="transition-all duration-300" />
        <path d={`M ${cx - r5} ${cy} A ${r5} ${r5} 0 0 1 ${cx} ${cy - r5}`} stroke="#5D7FC4" strokeWidth="2.2" strokeOpacity={isDark ? "0.22" : "0.15"} strokeLinecap="round" className="transition-all duration-300" />

        {/* Interactive Tooltip showing 'double-tap' when hovering over the dot */}
        {isHovered && (
          <g className="pointer-events-none select-none transition-opacity duration-300">
            {/* Tooltip background pill */}
            <rect
              x={dotX - 45}
              y={dotY - 36}
              width="90"
              height="20"
              rx="10"
              fill={isDark ? "#272F45" : "#F5F5EB"}
              stroke={isDark ? "#5D7FC4" : "#272F45"}
              strokeWidth="1"
              fillOpacity="0.95"
            />
            {/* Tooltip text */}
            <text
              x={dotX}
              y={dotY - 23}
              textAnchor="middle"
              fill={isDark ? "#F5F5EB" : "#272F45"}
              fontFamily="Space Mono"
              fontSize="9"
              fontWeight="bold"
              letterSpacing="0.05em"
            >
              double-tap
            </text>
          </g>
        )}

        {/* Visual Metallic Dot */}
        <circle
          cx={dotX}
          cy={dotY}
          r="11"
          fill="url(#matteMetallicDot)"
          stroke="#405991"
          strokeWidth="0.5"
          className="transition-transform duration-300 pointer-events-none"
          style={{ transformOrigin: `${dotX}px ${dotY}px` }}
        />

        {/* Large Invisible Interaction target circle to facilitate double-clicking */}
        <circle
          cx={dotX}
          cy={dotY}
          r="32"
          fill="transparent"
          className="pointer-events-auto cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onDoubleClick={(e) => {
            e.stopPropagation();
            toggleTheme();
          }}
        />
      </svg>
    </div>
  );
}
