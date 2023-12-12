Write-Host "Starting the installation process..."

# Check if Python is installed
Write-Host "Installing Python in quiet mode locally..."
# Download Python Installer
Invoke-WebRequest -Uri "https://www.python.org/ftp/python/3.12.1/python-3.12.1-amd64.exe" -OutFile "python-3.12.1-amd64.exe"
# Run Installer
Start-Process -FilePath .\python-3.12.1-amd64.exe -Args "/quiet" -Wait
Remove-Item .\python-3.12.1-amd64.exe

Write-Host "Installing Node.js in quiet mode..."
# Download Node.js Installer
Invoke-WebRequest -Uri "https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi" -OutFile "node-v20.10.0-x64.msi"
# Run Installer
Start-Process -FilePath .\node-v20.10.0-x64.msi -Wait
Remove-Item .\node-v20.10.0-x64.msi