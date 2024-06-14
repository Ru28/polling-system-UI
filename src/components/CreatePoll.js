import  { useState } from 'react';
import axios from 'axios';

const CreatePoll = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const addOption = () => setOptions([...options, '']);

    const handleSubmit = async () => {
        const response = await axios.post('/api/polls/', { question, options });
        console.log(response.data);
    };

    return (
        <div>
            <h2>Create Poll</h2>
            <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Poll question"
            />
            {options.map((option, index) => (
                <input
                    key={index}
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                />
            ))}
            <button onClick={addOption}>Add Option</button>
            <button onClick={handleSubmit}>Create Poll</button>
        </div>
    );
};

export default CreatePoll;
