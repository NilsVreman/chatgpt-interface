Write-Host "Starting the installation process..."

# Check if Python is installed
Write-Host "Installing Python..."
# Download Python Installer
Invoke-WebRequest -Uri "https://www.python.org/ftp/python/3.12.1/python-3.12.1-amd64.exe" -OutFile "python-3.12.1-amd64.exe"
# Run Installer
Start-Process -FilePath .\python-3.12.1-amd64.exe -Args "/quiet InstallAllUsers=1 PrependPath=1" -Wait
Remove-Item .\python-3.12.1-amd64.exe

Write-Host "Installing Node.js..."
# Download Node.js Installer
Invoke-WebRequest -Uri "https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi" -OutFile "node-v20.10.0-x64.msi"
# Run Installer
Start-Process -FilePath .\node-v20.10.0-x64.msi -Args "/quiet" -Wait
Remove-Item .\node-v20.10.0-x64.msi

# Auxiliary variables
$currentPath = Get-Location
$clientPath = Join-Path $currentPath "..\client"
$serverPath = Join-Path $currentPath "..\server"

Write-Host "Installing Python dependencies..."
cd $serverPath
pip install -r requirements.txt

Write-Host "Installing Node.js dependencies..."
cd $clientPath
npm install

cd $currentPath
Write-Host "Installation and setup complete!"