import React, { useState } from 'react';
import { getLast84Days, toDateString, getDayOfYear } from '../../utils/dateUtils';

export const HeatMap = ({ heatmapData }) => {
  const [tooltip, setTooltip] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const days = getLast84Days();
  const weeks = [];

  // Group days into weeks (starting Sunday)
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const getColor = (count) => {
    if (count === 0) return 'rgba(128, 128, 128, 0.2)';
    if (count === 1) return 'rgba(124, 58, 237, 0.4)';
    if (count === 2) return 'rgba(124, 58, 237, 0.6)';
    if (count === 3) return 'rgba(124, 58, 237, 0.8)';
    if (count === 4) return 'rgba(124, 58, 237, 1)';
    return '#4c1d95';
  };

  const handleMouseEnter = (date, count, e) => {
    const dateStr = toDateString(date);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    
    setTooltip(`${month} ${day} — ${count} habit${count !== 1 ? 's' : ''} completed`);
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (tooltip) {
      setTooltipPos({ x: e.clientX, y: e.clientY });
    }
  };

  return (
    <div
      style={{
        overflowX: 'auto',
        paddingBottom: '20px',
        userSelect: 'none',
      }}
      onMouseMove={handleMouseMove}
    >
      <div style={{ display: 'inline-block', minWidth: 'fit-content' }}>
        {/* Labels and grid */}
        <svg
          width={weeks.length * 18 + 40}
          height={200}
          style={{ display: 'block' }}
        >
          {/* Row labels (day names) */}
          {['Mon', 'Wed', 'Fri'].map((day, idx) => (
            <text
              key={day}
              x="5"
              y={35 + idx * 42}
              style={{
                fontSize: '11px',
                fill: 'var(--text-secondary)',
                fontWeight: '500',
              }}
            >
              {day}
            </text>
          ))}

          {/* Month labels row */}
          {weeks.length > 0 && (
            <g>
              {weeks.map((week, weekIdx) => {
                const firstDay = week[0];
                const isNewMonth = weekIdx === 0 || firstDay.getDate() <= 7;
                if (isNewMonth || firstDay.getDate() === 1) {
                  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                  return (
                    <text
                      key={`month-${weekIdx}`}
                      x={40 + weekIdx * 18}
                      y="15"
                      style={{
                        fontSize: '10px',
                        fill: 'var(--text-secondary)',
                        fontWeight: '600',
                      }}
                    >
                      {monthNames[firstDay.getMonth()]}
                    </text>
                  );
                }
                return null;
              })}
            </g>
          )}

          {/* Heatmap cells */}
          {weeks.map((week, weekIdx) =>
            week.map((date, dayIdx) => {
              const dateStr = toDateString(date);
              const count = heatmapData[dateStr] || 0;
              const color = getColor(count);

              return (
                <rect
                  key={dateStr}
                  x={40 + weekIdx * 18}
                  y={30 + dayIdx * 18}
                  width="14"
                  height="14"
                  rx="2"
                  fill={color}
                  style={{
                    cursor: 'pointer',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={(e) => handleMouseEnter(date, count, e)}
                  onMouseLeave={() => setTooltip(null)}
                  opacity="0.8"
                  onMouseOver={(e) => (e.target.style.opacity = '1')}
                  onMouseOut={(e) => (e.target.style.opacity = '0.8')}
                />
              );
            })
          )}
        </svg>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          style={{
            position: 'fixed',
            left: tooltipPos.x + 10,
            top: tooltipPos.y + 10,
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '0.85rem',
            border: '1px solid var(--border)',
            pointerEvents: 'none',
            zIndex: 1000,
            whiteSpace: 'nowrap',
          }}
        >
          {tooltip}
        </div>
      )}

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          marginTop: '16px',
          fontSize: '0.8rem',
          color: 'var(--text-secondary)',
        }}
      >
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((count) => (
          <div
            key={count}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '2px',
              background: getColor(count),
            }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
};
