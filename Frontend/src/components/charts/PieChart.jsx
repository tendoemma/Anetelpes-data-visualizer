import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/system';
import { PieChart } from '@mui/x-charts';

const PieChartComponent = ({ data }) => {
    const chartRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setIsVisible(true), 300); // Delay for 500 milliseconds
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
                    <PieChart
                        series={[
                            {
                                data: data,
                                innerRadius: 20,
                                outerRadius: 130,
                                paddingAngle: 5,
                                cornerRadius: 5,
                                startAngle: -90,
                            }
                        ]}
                    />
                )}
            </Box>
        </div>
    );
};

export default PieChartComponent;
