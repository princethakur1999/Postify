export default function generateSignupEmail(firstname, userid, password) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Micropost</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    background-color: #f5f5f5;
                    margin: 0;
                    padding: 0;
                }

                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    text-align: center;
                }

                .company-name {
                    font-size: 24px;
                    font-weight: bold;
                    color: #3498db;
                    margin-bottom: 20px;
                }

                .success-message {
                    color: #2ecc71;
                    font-size: 18px;
                    margin-bottom: 30px;
                }

                .details {
                    background-color: #ecf0f1;
                    padding: 15px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                }

                p {
                    margin: 10px 0;
                }

                strong {
                    color: #e74c3c;
                }

                .footer {
                    color: #95a5a6;
                    font-size: 14px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="company-name">Micropost</div>

                <div class="success-message">
                    <p>Congratulations, ${firstname}!</p>
                    <p>You've successfully signed up.</p>
                </div>
                
                <div class="details">
                    <p>Your userid is <strong>${userid}</strong> and your password is <strong>${password}</strong>.</p>
                </div>
                
                <p>Thank you for joining our platform.</p>

                <div class="footer">
                    <p>© 2024 Micropost. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `;
}
