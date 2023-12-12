# Auxiliary variables
$currentPath = Get-Location
$clientPath = Join-Path $currentPath "..\client"
$serverPath = Join-Path $currentPath "..\server"

Start-Process -FilePath "set_env_variables_locally.ps1" -Wait

Write-Host "Installing Python dependencies..."
cd $serverPath
pip install -r requirements.txt

Write-Host "Installing Node.js dependencies..."
cd $clientPath
npm install

cd $currentPath
Write-Host "Installation and setup complete!"