
const generateOTPEmailTemplate = (otp) => `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Micropost - OTP Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #1c2a36; 
            color: #ffffff;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
            background-color: #ffffff; /* Container background color */
        }

        h2 {
            text-align: center;
            color: #3498db; /* Tailwind CSS text-blue-500 converted to hex */
        }

        p {
            margin-bottom: 15px;
        }

        .otp-box {
            background-color: #f5f5f5; /* Tailwind CSS bg-gray-100 converted to hex */
            padding: 10px;
            text-align: center;
            font-size: 24px;
            border-radius: 5px;
        }
    </style>
</head>

<body>

    <div class="container">

        <h2>OTP</h2>

        <div class="otp-box">
            <strong>${otp}</strong>
        </div>
    
        <p>Please use this OTP to complete the verification process.</p>
    
        <p>Best regards,<br><br>Micropost Team</p>

    </div>

</body>

</html>
`;

export default generateOTPEmailTemplate;
