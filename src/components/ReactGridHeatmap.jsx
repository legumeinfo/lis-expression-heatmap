import React from 'react'
import { HeatMapGrid } from 'react-grid-heatmap'

/**
 * react-grid-heatmap div-based grid
 * CellStyle:
 * border: '1px solid #fff',
 * borderWidth: '1px 1px 0 0',
 * textAlign: 'center',
 * color: `rgb(0, 0, 0, ${ratio / 2 + 0.4})`,
 * overflow: 'hidden',
 * boxSizing: 'border-box',
 * flexGrow: square ? 0 : 1,
 * flexBasis: square ? height : 0,
 * flexShrink: 0,
 * height: height,
 * lineHeight: height,
 * borderRadius: '4px',
 * fontSize: '.8rem',
 * cursor: onClick ? 'pointer' : 'initial',
 * background: `rgb(12, 160, 44, ${ratio + 0.05})`,
 */
export function ReactGridHeatmap({ samples, features, data }) {
    return (
        <div style={{ width: '100%' }}>
            <HeatMapGrid
                data={data}
                xLabels={samples}
                yLabels={features}
                cellRender={(x, y, value) => (
                    <div title={`${features[x]}|${samples[y]} = ${value} TPM`}>{value}</div>
                )}
                xLabelsStyle={() => ({
                    fontFamily: 'sans-serif',
                    fontSize: '10px',
                    color: 'black',
                    borderTop: '1px solid black',
                })}
                yLabelsStyle={() => ({
                    fontFamily: 'sans-serif',
                    fontSize: '10px',
                    color: 'black',
                    borderRight: '1px solid black',
                })}
                cellStyle={(_x, _y, ratio) => ({
                    background: `rgb(12, 160, 44, ${ratio})`,
                    color: 'transparent',
                    border: '1px solid black',
                    borderRadius: '0',
                })}
                cellHeight='20px'
                xLabelsPos='bottom'
                yLabelsPos='left'
                square = {false}
            />
        </div>
    );
}


