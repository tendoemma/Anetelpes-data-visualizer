import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/system';
import { BarChart } from '@mui/x-charts';

const BarChartComponent = ({ data }) => {
    const chartRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setIsVisible(true), 300); 
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(chartRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={chartRef}>
            <Box sx={{ height: 400, width: '100%' }}>
                {isVisible && (
                    <BarChart
                        dataset={data}
                        xAxis={[{ scaleType: 'band', dataKey: 'continent' }]}
                        series={[
                            { dataKey: 'avgWeight', label: 'Weight (lbs)' },
                            { dataKey: 'avgHeight', label: 'Height (in)' },
                        ]}
                    />
                )}
            </Box>
        </div>
    );
};

export default BarChartComponent;
