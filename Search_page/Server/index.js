const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const data = [
    { id: 1, title: 'Tech Trends 2024', category: 'tech', content: 'Latest in technology.' },
    { id: 2, title: 'Healthy Living Tips', category: 'health', content: 'How to stay healthy.' },
    { id: 3, title: 'Minimalist Lifestyle', category: 'lifestyle', content: 'Living with less.' }
];

app.get('/api/search', (req, res) => {
    const { query, category } = req.query;
    let results = data;

    if (query) {
        results = results.filter(
            item =>
                item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.content.toLowerCase().includes(query.toLowerCase())
        );
    }

    if (category) {
        results = results.filter(item => item.category === category);
    }

    res.json(results);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
