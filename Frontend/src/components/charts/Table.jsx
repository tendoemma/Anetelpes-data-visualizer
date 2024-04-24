import React, { useEffect, useRef, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';

const columns = [
    {
        field: 'picture',
        headerName: 'Species name',
        sortable: false,
        flex: 2,
        renderCell: (params) => (
            <Stack direction={"row"} spacing={2} sx={{ alignItems: "center", marginLeft: "auto", marginRight: "auto", marginY: 1 }}>
                <a href={params.value} target="_blank" rel="noopener noreferrer">
                    <Avatar alt="Species Image" src={params.value} sx={{ width: 60, height: 60 }} />
                </a>
                <Typography variant="subtitle1" gutterBottom>
                    {params.row.name}
                </Typography>
            </Stack>
        ),
    },
    {
        field: 'continent',
        headerName: 'Continent',
        flex: 1
    },
    {
        field: 'height',
        headerName: 'Height (in)',
        type: 'number',
        flex: 1
    },
    {
        field: 'weight',
        headerName: 'Weight (lbs)',
        type: 'number',
        flex: 1
    },
    {
        field: 'horns',
        headerName: 'Horn type',
        sortable: false,
        flex: 1
    },
];

const FadeInWrapper = styled('div')(({ theme }) => ({
  opacity: 0,
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.enteringScreen,
  }),
  '&.is-visible': {
    opacity: 1,
  },
}));

const Table = ({ data }) => {
    const tableRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(tableRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <FadeInWrapper ref={tableRef} className={`fade-in ${isVisible ? 'is-visible' : ''}`}>
            <Box>
                <DataGrid
                    sx={{ fontSize: 16, fontWeight: 500, padding: 2 }}
                    rowHeight={80}
                    getRowId={(row) => row.name}
                    rows={isVisible ? data : []}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    disableRowSelectionOnClick
                    disableColumnResize
                />
            </Box>
        </FadeInWrapper>
    );
};

export default Table;
