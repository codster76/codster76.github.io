import style from '../css_modules/modalComponent.module.css';

export interface ModalComponentProps
{
    displayModal: boolean
    updateDisplayModal: Function
}

const ModalComponent = (props: ModalComponentProps) =>
{
    return (
        <div>
            <button onClick={() => props.updateDisplayModal(!props.displayModal)}>Open</button>

            <div id="myModal" className={style.modal} style={ props.displayModal ? {'display':'block'} : {'display':'none'} }>
                <div className={style.modalContent}>
                    <span className={style.close} onClick={() => props.updateDisplayModal(!props.displayModal)}>x</span>
                    <p>Some text in the Modal..</p>
                </div>
            </div>
        </div>
    );
}

export default ModalComponent;