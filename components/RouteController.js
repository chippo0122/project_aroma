import { styled } from "@mui/system"
import { useRouter } from "next/router"
import Icon from '../assets/Group 893.svg'

const RouteButton = styled('button')(() => ({
    position: 'absolute',
    top: '35px',
    left: '40px',
    width: '52px',
    height: '52px',
    borderRadius: '50%',
    border: 0,
    backgroundColor: '#fff',
    transition: '0.3s',
    ':hover' : {
        backgroundColor: '#ddd',
    }
}))

export default function RouteController() {
    const router = useRouter();

    return (
        <RouteButton onClick={() => {router.push('/')}}>
            <img src={Icon.src} alt="" />
        </RouteButton>
    )
}
