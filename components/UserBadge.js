import { styled, Box, Typography } from '@mui/material'

const Badge = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: '18px',
    right: '0',
    backgroundColor: '#00ade3',
    borderTopLeftRadius: '50px',
    borderBottomLeftRadius: '50px', 
    [theme.breakpoints.down('md')]: {
        width: 'unset',
    },
    [theme.breakpoints.up('md')]: {
        width: '125px',
    },
    [theme.breakpoints.up('lg')]: {
        width: '150px',
    }
}))

export default function UserBadge(props) {
    const {children} = props

    return (
        <Badge>
            <Typography sx={{textAlign: 'center',p: 1, ml: 1, color: '#fff'}}>
            {
                `Hi, ${children}`
            }
            </Typography>
        </Badge>
    )
}
