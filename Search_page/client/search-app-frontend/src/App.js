import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('');
    const [results, setResults] = useState([]);

    const fetchResults = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/search', {
                params: { query, category }
            });
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching results:', error);
        }
    };
    
    useEffect(() => {
        fetchResults();
    }, [query, category]);
    return (
        <div className="app">
            <header>
                <h1>Search Blog</h1>
            </header>
            <main>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                    <select value={category} onChange={e => setCategory(e.target.value)}>
                        <option value="">All Categories</option>
                        <option value="tech">Technology</option>
                        <option value="health">Health</option>
                        <option value="lifestyle">Lifestyle</option>
                    </select>
                </div>
                <div className="results">
                    {results.map(item => (
                        <div key={item.id} className="result-item">
                            <h3>{item.title}</h3>
                            <p>{item.content}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default App;
