document.addEventListener('DOMContentLoaded', function() {
    const industryForm = document.getElementById('industry-form');
    const industryTitle = document.getElementById('industry-title');
    const resultsDiv = document.getElementById('results');
    const totalCostP = document.getElementById('total-cost');
    const costBreakdownUl = document.getElementById('cost-breakdown');
    const recommendationsBtn = document.getElementById('recommendations-btn');
    const recommendationsDiv = document.getElementById('recommendations');
    const recommendationsList = document.getElementById('recommendations-list');

    // Set the industry title based on the selected industry
    const selectedIndustry = localStorage.getItem('selectedIndustry');
    if (selectedIndustry && industryTitle) {
        industryTitle.textContent = `${selectedIndustry.replace('-', ' ')} Setup Calculator`;
    }

    if (industryForm) {
        industryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const numWorkers = parseInt(document.getElementById('num-workers').value);
            const landArea = parseInt(document.getElementById('land-area').value);
            const numMachines = parseInt(document.getElementById('num-machines').value);
            const projectDuration = parseInt(document.getElementById('project-duration').value);

            // Perform calculations
            const laborCost = numWorkers * 5000 * (projectDuration / 12); // Assuming 5000 per month per worker
            const landCost = landArea * 100; // Assuming 100 per sq ft
            const machineryCost = numMachines * 500000; // Assuming 500,000 per machine
            const totalCost = laborCost + landCost + machineryCost;

            // Display results
            totalCostP.textContent = `Total Estimated Cost: $${totalCost.toLocaleString()}`;
            costBreakdownUl.innerHTML = `
                <li>Labor Cost: $${laborCost.toLocaleString()}</li>
                <li>Land Cost: $${landCost.toLocaleString()}</li>
                <li>Machinery Cost: $${machineryCost.toLocaleString()}</li>
            `;
            resultsDiv.classList.remove('hidden');
        });
    }

    if (recommendationsBtn) {
        recommendationsBtn.addEventListener('click', function() {
            // Generate recommendations based on the selected industry
            const recommendations = getRecommendations(selectedIndustry);
            recommendationsList.innerHTML = recommendations.map(rec => `<li>${rec}</li>`).join('');
            recommendationsDiv.classList.remove('hidden');
        });
    }
});

function selectIndustry(industry) {
    localStorage.setItem('selectedIndustry', industry);
    window.location.href = 'industry-form.html';
}

function getRecommendations(industry) {
    // You can customize these recommendations based on each industry
    const generalRecommendations = [
        "Optimize your workforce by balancing skilled and unskilled labor",
        "Consider energy-efficient machinery to reduce long-term costs",
        "Implement a robust quality control system",
        "Explore government incentives and subsidies for your industry",
        "Invest in employee training programs to increase productivity"
    ];

    const industrySpecificRecommendations = {
        'heavy-machinery': [
            "Prioritize safety measures and equipment",
            "Implement predictive maintenance for machinery",
            "Consider modular manufacturing techniques"
        ],
        'electronics': [
            "Invest in clean room facilities",
            "Stay updated with the latest miniaturization technologies",
            "Implement strict ESD (Electrostatic Discharge) controls"
        ],
        'textile': [
            "Explore sustainable and eco-friendly fabric options",
            "Implement water recycling systems in dyeing processes",
            "Consider automation for repetitive tasks"
        ],
        'food-processing': [
            "Prioritize food safety certifications",
            "Implement strict hygiene and sanitation protocols",
            "Consider cold chain logistics for perishable products"
        ],
        'pharmaceutical': [
            "Invest in state-of-the-art laboratory equipment",
            "Implement stringent quality control and assurance processes",
            "Stay compliant with regulatory requirements (e.g., FDA, EMA)"
        ],
        'automotive': [
            "Implement just-in-time (JIT) inventory management",
            "Invest in robotics and automation for assembly lines",
            "Focus on lightweight materials for improved fuel efficiency"
        ],
        'chemical-processing': [
            "Implement robust safety protocols and emergency response systems",
            "Invest in corrosion-resistant equipment and materials",
            "Consider green chemistry principles for sustainable production"
        ]
    };

    return [...generalRecommendations, ...(industrySpecificRecommendations[industry] || [])];
}