Fraud Detection App.
A lightweight web application that helps detect potentially fraudulent transactions using rule-based checks and basic analytics. 
Users can upload transaction data, run fraud detection, view flagged items, and explore insights through a simple dashboard.
Features
Upload CSV files containing transaction data
Automatic parsing and display of transactions
Rule-based fraud detection (high amount, rapid transactions, new merchant, suspicious verification steps)
Real-time transaction simulator
Visual dashboard with charts
Investigation panel for adding case notes
Export flagged transactions as CSV
How It Works
The app uses simple fraud-detection heuristics such as:
1. High Amount Rule
Flags any transaction above a user-defined threshold.

2. Rapid Transaction Rule
Flags multiple quick transactions from the same user within a short time.

3. New Merchant Rule
Flags first-time merchants for a user.

4. Suspicious Verification Rule
Looks for words such as “screenshot”, “redirect”, “fake page”, etc.

These rules help simulate how real fraud detection systems identify risky behaviour.
