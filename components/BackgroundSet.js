import { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setViewWidth } from '../redux/viewSice'
import { Container, styled, Box } from '@mui/material'
import Spreader from './Spreader'
import LoginL from '../assets/shutterstock_323534993@3x.jpg'
import LoginM from '../assets/shutterstock_323534993@2x.jpg'
import LoginS from '../assets/shutterstock_323534993.jpg'
import SuccessL from '../assets/shutterstock_256537057@3x.jpg'
import SuccessM from '../assets/shutterstock_256537057@2x.jpg'
import SuccessS from '../assets/shutterstock_256537057.jpg'

const OutterBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
}))

const BgImg = styled('img')(({ theme }) => ({
    position: 'absolute',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: '-1'
}))

const CustomContainer = styled(Container)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        width: '90%',
    },
    [theme.breakpoints.up('md')]: {
        width: '70%',
    },
    [theme.breakpoints.up('lg')]: {
        width: '640px',
    }
}))

export default function BackgroundSet(props) {
    const { children, loginSuccess } = props;
    const Outter = useRef();
    const dispatch = useDispatch();
    const viewWidth = useSelector(state => state.view.viewWidth);

    const LoginPath = viewWidth > 900 ? LoginL.src : (viewWidth > 600 ? LoginM.src : LoginS.src);
    const SuccessPath = viewWidth > 900 ? SuccessL.src : (viewWidth > 600 ? SuccessM.src : SuccessS.src);
    const ImgPath = loginSuccess ? SuccessPath : LoginPath;

    useEffect(() => {
        const { offsetWidth } = Outter.current;
        dispatch(setViewWidth(offsetWidth));
    }, [])

    return (
        <OutterBox ref={Outter}>
            <Spreader />
            <BgImg src={ImgPath} alt="background-img" />
            <CustomContainer>
                {children}
            </CustomContainer>
        </OutterBox>
    )
}
