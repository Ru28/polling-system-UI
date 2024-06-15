import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';


const PollResults = () => {
    const { id } = useParams();
    const [poll, setPoll] = useState(null);

    useEffect(() => {
        const fetchPoll = async () => {
            const response = await axios.get(`/api/polls/${id}/`);
            setPoll(response.data);
        };
        fetchPoll();

        const socket = io('ws://localhost:8000', {
            path: `/ws/polls/${id}/`
        });

        socket.on('vote', (updatedPoll) => {
            if (updatedPoll.id === parseInt(id, 10)) {
                setPoll(updatedPoll);
            }
        });

        return () => {
            socket.off('vote');
        };
    }, [id]);

    if (!poll) return <div>Loading...</div>;

    return (
        <div>
            <h2>{poll.question}</h2>
            {poll.options.map(option => (
                <div key={option.id}>
                    {option.text}: {option.votes.length}
                </div>
            ))}
        </div>
    );
};

export default PollResults;
