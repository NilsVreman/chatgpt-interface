# Auxiliary variables
$clientPath = "..\client"
$serverPath = "..\server"
$apiKey = $env:OPENAI_API_KEY

# Command to start the Python server
$serverCommand = "python chat_gpt_communication_server.py --api-base https://openai-nonfunsbx-pprd-01.openai.azure.com/ --api-version 2023-07-01-preview --api-key $apiKey"
# Command to start the Node.js client
$clientCommand = "npm start"

Write-Host "Installing Python dependencies..."
cd $serverPath
pip install -r requirements.txt
Write-Host " "

Write-Host "Installing Node.js dependencies..."
cd $clientPath
npm install
Write-Host " "

cd $currentPath
Write-Host "Setup complete!"
Write-Host " "

Write-Host "Note: This script requires the OpenAI API key to be set as an environment variable named OPENAI_API_KEY."
Write-Host "Note: This script uses the base URL https://openai-nonfunsbx-pprd-01.openai.azure.com/. If you want to use a different base URL, please edit the script."

# Start the server in a new Command Prompt window
Write-Host "Starting the server in a new Command Prompt window..."
Start-Process cmd -ArgumentList "/c cd $serverPath & $serverCommand & pause"

# Start the client in a new Command Prompt window
Write-Host "Starting the client in a new Command Prompt window..."
Start-Process cmd -ArgumentList "/c cd $clientPath & $clientCommand & pause"
