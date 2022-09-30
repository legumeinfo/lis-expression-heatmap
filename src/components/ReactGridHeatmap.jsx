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
export function ReactGridHeatmap({ features, data, sampleData }) {
    // build sample mouseover descriptions
    const nums = sampleData.nums;
    const names = sampleData.names;
    const genotypes = sampleData.genotypes;
    const tissues = sampleData.tissues;
    const treatments = sampleData.treatments;
    const descriptions = [];
    for (var i=0; i<nums.length; i++) {
        var description = names[i];
        if (genotypes[i]) {
            description = description + ":" + genotypes[i];
        }
        if (tissues[i]) {
            description = description + ":" + tissues[i];
        }
        if (treatments[i]) {
            description = description + ":" + treatments[i];
        }
        descriptions.push(description);
    }
    return (
        <div>
            <div style={{ 'font-family':'sans-serif', 'font-size':'12px', 'font-style':'italic', 'padding-left':'80px' }}>
                Mouse over cell to see data.
            </div>
            <HeatMapGrid
                data={data}
                xLabels={nums}
                yLabels={features}
                square = {true}
                cellRender={(x, y, value) => (
                    <div title={`${descriptions[y]} | ${features[x]} = ${value} TPM`}>{value}</div>
                )}
                xLabelsStyle={() => ({
                    fontFamily: 'sans-serif',
                    fontSize: '10px',
                    color: 'black',
                    borderTop: '1px solid black',
                })}
                yLabelsStyle={() => ({
                    fontFamily: 'sans-serif',
                    fontSize: '12px',
                    color: 'black',
                    borderRight: '1px solid black',
                })}
                cellStyle={(_x, _y, ratio) => ({
                    background: `rgb(12, 160, 44, ${ratio})`,
                    color: 'transparent',
                    border: '1px solid black',
                    borderRadius: '0',
                })}
                cellHeight='15px'
                xLabelsPos='bottom'
                yLabelsPos='left'
            />
        </div>
    );
}
