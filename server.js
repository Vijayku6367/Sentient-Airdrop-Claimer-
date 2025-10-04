import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        service: 'Sentient Airdrop Backend'
    });
});

// Research airdrops endpoint
app.post('/api/research-airdrops', async (req, res) => {
    try {
        const { wallet_address, timeframe_days = 30 } = req.body;

        if (!wallet_address) {
            return res.status(400).json({ error: 'Wallet address is required' });
        }

        // Simulate AI research
        const researchData = {
            wallet_address: wallet_address,
            found_airdrops: [
                {
                    protocol: "Uniswap V4",
                    eligible: true,
                    estimated_value: 1250,
                    deadline: "2024-12-31",
                    requirements: ["10+ swaps", "LP provider", "> $1000 volume"]
                },
                {
                    protocol: "Arbitrum Odyssey", 
                    eligible: true,
                    estimated_value: 750,
                    deadline: "2024-11-15",
                    requirements: ["Bridge > 0.1 ETH", "5+ transactions", "Use 3 dApps"]
                }
            ],
            research_summary: "AI analysis complete. Found multiple airdrop opportunities based on your wallet activity.",
            total_estimated_value: 2000,
            execution_id: `exec_${Date.now()}`
        };

        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 2000));

        res.json(researchData);

    } catch (error) {
        console.error('Research error:', error);
        res.status(500).json({ error: 'Research failed' });
    }
});

// Claim airdrop endpoint
app.post('/api/claim-airdrop', async (req, res) => {
    try {
        const { wallet_address, airdrop_id, claim_amount } = req.body;

        const claimResult = {
            success: true,
            transaction_hash: `0x${Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`,
            claimed_amount: claim_amount,
            airdrop_id: airdrop_id,
            timestamp: new Date().toISOString()
        };

        res.json(claimResult);

    } catch (error) {
        res.status(500).json({ error: 'Claim failed' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Backend Server running on port ${PORT}`);
    console.log(`📍 Health Check: http://localhost:${PORT}/health`);
});
