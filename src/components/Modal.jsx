// Modal as a separate component
import '../styles/Modal.css'
import { useEffect, useRef } from 'react'

export default function Modal({ openModal, closeModal, children, buttonText }) {
  const ref = useRef()

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal()
    } else {
      ref.current?.close()
    }
  }, [openModal])

  return (
    <dialog ref={ref} onCancel={closeModal}>
      {children}
      <button className='btn' onClick={closeModal}>
        {buttonText}
      </button>
    </dialog>
  )
}
