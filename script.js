// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Sentient API configuration
const SENTIENT_API_URL = 'http://localhost:8000'; // Your Sentient API URL

// Research airdrops endpoint
app.post('/api/research-airdrops', async (req, res) => {
    try {
        const { wallet_address, timeframe_days = 30 } = req.body;

        if (!wallet_address) {
            return res.status(400).json({ error: 'Wallet address is required' });
        }

        // Call Sentient Research Agent
        const researchGoal = `
        Comprehensive airdrop research for wallet ${wallet_address} from last ${timeframe_days} days.

        Find ALL potential airdrops this wallet might be eligible for including:
        - DeFi protocols (Uniswap, Aave, Compound, etc.)
        - NFT projects
        - Layer 2 solutions (Arbitrum, Optimism, zkSync, etc.)
        - New blockchain ecosystems
        - Gaming projects

        For each found airdrop, provide structured data with:
        - Protocol name
        - Eligibility status (true/false)
        - Estimated reward value in USD
        - Claiming deadline
        - Specific requirements
        - Official links if available

        Return comprehensive analysis with total estimated value.
        `;

        const sentientResponse = await axios.post(`${SENTIENT_API_URL}/research`, {
            goal: researchGoal,
            profile: "crypto_analytics_agent",
            max_steps: 35,
            save_state: false
        });

        // Process and structure the response
        const structuredData = processResearchResponse(sentientResponse.data, wallet_address);
        
        res.json(structuredData);

    } catch (error) {
        console.error('Research error:', error);
        res.status(500).json({ 
            error: 'Research failed',
            details: error.message 
        });
    }
});

// Check specific protocol eligibility
app.post('/api/check-eligibility', async (req, res) => {
    try {
        const { wallet_address, protocol } = req.body;

        const researchGoal = `
        Check airdrop eligibility for wallet ${walboard_address} on ${protocol} protocol.

        Provide detailed analysis including:
        1. Current eligibility status and exact criteria
        2. Estimated reward amount in USD if eligible
        3. Specific requirements and how to fulfill them
        4. Claiming deadline and process
        5. Official documentation links

        Focus on accurate, up-to-date information from official sources.
        `;

        const sentientResponse = await axios.post(`${SENTIENT_API_URL}/research`, {
            goal: researchGoal,
            profile: "crypto_analytics_agent", 
            max_steps: 20,
            save_state: false
        });

        const eligibilityData = processEligibilityResponse(sentientResponse.data, protocol);
        res.json(eligibilityData);

    } catch (error) {
        console.error('Eligibility check error:', error);
        res.status(500).json({ error: 'Eligibility check failed' });
    }
});

// Claim airdrop endpoint
app.post('/api/claim-airdrop', async (req, res) => {
    try {
        const { wallet_address, airdrop_id, claim_amount } = req.body;

        // Simulate claim process (in production, this would interact with blockchain)
        const claimResult = {
            success: true,
            transaction_hash: `0x${Math.random().toString(16).substr(2, 64)}`,
            claimed_amount: claim_amount || 100,
            airdrop_id: airdrop_id,
            timestamp: new Date().toISOString()
        };

        // Store claim in database (mock)
        console.log(`Airdrop claimed: ${airdrop_id} for ${wallet_address}`);

        res.json(claimResult);

    } catch (error) {
        console.error('Claim error:', error);
        res.status(500).json({ error: 'Claim failed' });
    }
});

// Get claim history
app.get('/api/claim-history/:wallet_address', (req, res) => {
    const { wallet_address } = req.params;
    
    // Mock claim history
    const mockHistory = [
        {
            airdrop_id: "uniswap_v4",
            protocol: "Uniswap V4",
            amount: 850.00,
            timestamp: new Date().toISOString(),
            transaction_hash: "0x1234567890abcdef..."
        }
    ];

    res.json({
        wallet_address,
        claims: mockHistory
    });
});

// Helper functions
function processResearchResponse(sentientData, walletAddress) {
    // This function would parse the Sentient AI response and structure it
    // For now, returning mock data structure
    
    return {
        wallet_address: walletAddress,
        found_airdrops: [
            {
                protocol: "Uniswap V4",
                eligible: true,
                estimated_value: 850.00,
                deadline: "2024-12-31",
                requirements: ["10+ swaps", "LP provider", "> $1000 volume"]
            },
            {
                protocol: "Arbitrum Odyssey", 
                eligible: true,
                estimated_value: 450.00,
                deadline: "2024-11-15", 
                requirements: ["Bridge > 0.1 ETH", "5+ transactions", "Use 3 dApps"]
            }
        ],
        research_summary: sentientData.result || "Comprehensive airdrop research completed successfully.",
        total_estimated_value: 1300.00,
        execution_id: sentientData.execution_id || `exec_${Date.now()}`
    };
}

function processEligibilityResponse(sentientData, protocol) {
    return {
        eligible: true, // This would be determined from research
        protocol: protocol,
        estimated_reward: 500.00,
        requirements: ["Active participation", "Minimum transactions"],
        research_findings: sentientData.result || "Eligibility research completed."
    };
}

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        service: 'Airdrop Claimer API'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Airdrop Claimer Server running on port ${PORT}`);
    console.log(`📚 API Documentation: http://localhost:${PORT}/health`);
});
