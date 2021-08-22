import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { Children } from 'react';
function Modals({open,onCloseModal,onOpenModal,handleAddress,children,modalType}) {
    // const [open, setOpen] = useState(false);
    // const onOpenModal = () => setOpen(true);
    // const onCloseModal = () => setOpen(false);
    return (
        <div>
      <Modal open={open} onClose={onCloseModal} onOpenModal center>
        {children}
       
      </Modal>
    </div>
    )
}

export default Modals