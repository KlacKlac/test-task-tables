import React, {useEffect, useState} from 'react';

import Form from './Form';

import data from '../sources/data';

const App = () => {
    const [formScheme, setFormSheme] = useState<any>(undefined);
    useEffect(() => {
        // каким-либо образом получаем данные, сохраняем их в стейт
        setFormSheme(data);
    }, []);

    return (
        <div className='app'>
            {!formScheme || !Object.keys(formScheme).length
                ? <p className="empty-data-message">Нет данных для отображения :(</p>
                : <Form formScheme={formScheme} />
            }
        </div>
    );
}

export default App
