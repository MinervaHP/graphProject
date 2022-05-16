import { Modal, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { BsArrowRight } from "react-icons/bs";


const ModalWeight = ({ show, handleClose }) => {

    const [weight, setWeight] = useState(0);
    const [direct, setDirect] = useState(false);

    return (

        <Modal show={show}>
            <Modal.Body className="modal-content">
                <p style={{ textAlign: 'center' }}>הכנס משקל קשת (משקל 0 = אין משקל)</p>
                <input type="number" value={weight} onChange={event => setWeight(event.target.value)} ></input>
                <Button variant="warning" style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', margin: '3px' }} onClick={() => setDirect(true)} >עם כיוון <BsArrowRight /></Button>
                <Button variant="warning" style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', margin: '3px' }} onClick={() => setDirect(false)}>ללא כיוון</Button>

                <Modal.Footer>
                    <Button variant="primary" style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }} onClick={() => handleClose(weight, direct)}>שמור</Button>
                </Modal.Footer>
            </Modal.Body>
        </Modal>

    )
}

export default ModalWeight
