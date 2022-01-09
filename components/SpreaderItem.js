import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { deleteMsg } from '../redux/message'

import { Alert, Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

export default function SpreaderItem(props) {
    const dispatch = useDispatch();
    const {index, item} = props;
    const {value, success} = item;

    //close specific item manually
    const deleteTarget = (index) => {
        return () => {
            dispatch(deleteMsg(index));
        }
    }

    //item will vanish 5 secs later automatically
    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(deleteMsg(index));
        }, 5000)

        return () => {
            clearTimeout(timer)
        }
    }, [])

    return (
        <Alert key={index} sx={{ my: 1 }} severity={success ? 'success' : 'error'}>
            {value}
            <Button onClick={deleteTarget(index)} size="small" sx={{ ml: 'auto', color: success ? '#27ae60' : "#e74c3c" }}>
                <DeleteIcon />
            </Button>
        </Alert>
    )
}
