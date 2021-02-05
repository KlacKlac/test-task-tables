import {memo} from "react";

interface IProps {
    label?: string;
    name: string;
    register: any;
    onDelete?(): void;
}

const Input: React.FC<IProps> = (props) => {
    const {name, label, register, onDelete} = props;

    return (
        <div className="input-wrapper">
            {label && <label className='input-label' htmlFor={name}>{label}</label>}
            <input id={name} name={name} type="text" className='input' ref={register} />
            {!!onDelete && <button type='button' onClick={onDelete} className="btn btn_delete">Удалить</button>}
        </div>
    );
}

export default memo(Input);