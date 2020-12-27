import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Modal} from "semantic-ui-react";
import {openModal} from "../../common/modals/modalReducer";

function UnauthModal({history, setModalOpen}) {
    const [open, setOpen] = useState(true)
    const dispatch = useDispatch()
    const {prevLocation} = useSelector(state => state.auth)

    const handleClose = () => {
        if (!history) {
            setOpen(false)
            setModalOpen(false)
            return
        }
        if (history&& prevLocation) {
            history.push(prevLocation.pathname)
        } else {
            history.push('/events')
        }
        setOpen(false)
    }

    const handleOpenLoginModal = (modalType) => {
        dispatch(openModal({modalType}))
        setOpen(false)
        setModalOpen(false)
    }

    return (
        <Modal open={open} size={'mini'} onClose={handleClose}>
            <Modal.Header content={'sign in'} />
            <Modal.Content >
                <p>please login or register</p>
                <Button.Group clearing>
                    <Button fluid color={'teal'} content={'login'} onClick={() => handleOpenLoginModal('LoginForm')}/>

                    <Button fluid color={'green'} content={'register'} onClick={() => dispatch(openModal({
                        modalType: 'RegisterForm'
                    }))}/>
                </Button.Group>
                <div style={{}} >
                    <p>cancel to continue</p>
                    <Button onClick={handleClose} content={'cancel'} />
                </div>
            </Modal.Content>

        </Modal>
    );
}

export default UnauthModal;