import { useSelector} from 'react-redux'
import { styled } from '@mui/material'
import SpreaderItem from './SpreaderItem'

const Wrap = styled('div')(({ theme }) => ({
    display: 'block',
    position: 'absolute',
    bottom: '15px',
    left: '15px',
    zIndex: 99,
    [theme.breakpoints.down('md')]: {
        width: '200px'
    }
}))

export default function Spreader() {
    const messages = useSelector(state => state.messages);

    return (
        <Wrap>
            {
                messages.length > 0 ?
                    (
                        messages.map((el, index) => (
                            <SpreaderItem key={index} item={el} index={index}/>
                        ))
                    ) :
                    ''
            }
        </Wrap>
    )
}