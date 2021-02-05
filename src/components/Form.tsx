import React, {memo} from 'react';
import {useForm} from "react-hook-form";

import Input from './Input';
import InputsGroup from './InputsGroup';

const Form: React.FC<{formScheme: any}> = ({formScheme}) => {
    const {register, handleSubmit, watch} = useForm();
    function onSubmit(data: any): void {
        const newData = {
            DocumentName: formScheme.DocumentName,
            items: handleBeforeSubmit(data.items),
        };
        // отправляем обработанные данные. в данном случае, в консоль
        console.log('====================================');
        console.log('formData', newData);
        console.log('====================================');
    };

    function parsingScheme(data: any, parents: string[]): JSX.Element[]|null {
        const keys = Object.keys(data);

        if (!keys.length) return null;

        const components: JSX.Element[] = keys.map(key => {
            switch (data[key].type) {
                case 'object':
                    return (
                        <div key={key} className="inputs-group">
                            <p className="inputs-group__array-name">{data[key].description}</p>
                            {parsingScheme(data[key].items, [...parents, key])}
                        </div>
                    );
                case 'array':
                    return (
                        <InputsGroup
                            key={key}
                            parents={`${parents.join('.')}.${key}`}
                            register={register}
                            label={data[key].description}
                            watch={watch}
                        />
                    );
                default:
                    return (
                        <Input
                            key={key}
                            label={data[key].description}
                            name={`${parents.join('.')}.${key}`}
                            register={register}
                        />
                    );
            }
        });
        return components;
    }
    
    // заменяем пустые строки на null
    function handleBeforeSubmit(data: any): any {
        const keys = Object.keys(data);
        if (!keys.length) return;
        const newData: any = {}
        keys.forEach(key => {
            const currentItem = data[key];
            if (typeof currentItem === 'string') {
                newData[key] = currentItem.trim() === '' ? null : currentItem.trim();
            } else if (Array.isArray(currentItem)) {
                newData[key] = currentItem.filter(value => value.trim() !== '');
            } else {
                newData[key] = handleBeforeSubmit(data[key]);
            }
        });
        
        return newData;
    }

    return (
        <>
            <h2>{formScheme.DocumentName}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="form">
                {parsingScheme(formScheme.items, ['items'])}
                <button className='submit-btn btn' type="submit">Отправить</button>
            </form>
        </>
    );
}

export default memo(Form);
