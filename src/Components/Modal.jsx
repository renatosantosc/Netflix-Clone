import { Modal, Box } from '@mui/material'

export default function Modal_Video(props){
    const handleClose = () =>{ props.setOpen(false) }

    return(
        <>
            <Modal
                open={props.open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
                sx={{
                    boder: 'none'
                }}
            >
                <Box
                sx={{
                    position: 'absolute',
                    top: '20%',
                    left: '30%',
                    trasnform: 'translate(-50%, -50%)',
                    width: '100%'
                }}>
                <iframe src={`https://www.youtube.com/embed/${props.id}?autoplay=1&mute=1`} title='Filme' width='600px' height='300px' />
                </Box>
            </Modal>
        </>
    )
}