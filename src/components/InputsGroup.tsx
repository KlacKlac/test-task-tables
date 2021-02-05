import {memo, useEffect, useState} from 'react';

import Input from './Input';

interface IProps {
    label: string;
    register: any;
    watch(path?: string): string[];
    parents: string;
}

const InputsGroup: React.FC<IProps> = (props) => {
    const {label, register, watch, parents} = props;
    const [showAddBtn, setShowAddBtn] = useState(false);
    const [indexes, setIndexes] = useState<number[]>([0]);
    const [counter, setCounter] = useState(1);
    
    useEffect(() => {
        const values = watch(parents);
        // заполненность последнего значения в массиве влияет на активность кнопки
        // добавления инпута
        setShowAddBtn(!!values[values.length - 1]);
    }, [watch()]);
    
    return (
        <div className="inputs-group">
            <p className="inputs-group__name">{label}</p>
            {showAddBtn && (
                <div onClick={() => {
                    setIndexes([...indexes, indexes[indexes.length - 1] + 1]);
                    setCounter(counter + 1);
                }} className="btn btn_add">Добавить</div>
            )}
            {indexes.map(index => {
                return (
                        <Input
                            key={`${parents}[${index}]`}
                            name={`${parents}[${index}]`}
                            register={register}
                            onDelete={index > 0 
                                ? () => {
                                    setIndexes([...indexes.filter(item => item !== index)]);
                                    setCounter(counter - 1);
                                }
                                : undefined
                            }
                        />
                );
            })}
        </div>
    );
}

export default memo(InputsGroup);