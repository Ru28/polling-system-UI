import {useState,useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

const VotePoll = () =>{
    const {id} = useParams();
    const [poll,setPoll] = useState(null);
    const [selectedOption,setSelectedOption]= useState(null);

    useEffect(()=>{
        const fetchPoll = async()=>{
            const response = await axios.get(`/api/poll/${id}/`);
            setPoll(response.data);
        }
        fetchPoll();
    },[id]);

    const handleVote = async()=>{
        await axios.post(`/api/votes/`,{poll:id,option: selectedOption});
    };
    if(!poll) return <div>Loading...</div>
    return (
        <div>
            <h2>{poll.question}</h2>
            {poll.options.map(option => (
                <div key={option.id}>
                    <input
                        type="radio"
                        value={option.id}
                        checked={selectedOption === option.id}
                        onChange={() => setSelectedOption(option.id)}
                    />
                    {option.text}
                </div>
            ))}
            <button onClick={handleVote}>Vote</button>
        </div>
    );
}

export default VotePoll;
