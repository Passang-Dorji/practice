const Modal = ({children,onClose}) =>{
    return(
        <div className="fixed inset-0 flex items-center justify-center bg-green-500 bg-opacity-50"
            onClick={(e) => {
                if(e.currentTarget === e.target) onClose();
            }}
        >
            <button className="border-2 border-black "
            onClick={onClose}> 
            close  </button>
            <div className="text-black">
                <div className="bg-green-200 ">
                 {children}
                </div>
            </div>     
        </div>
    )
}
export default Modal


