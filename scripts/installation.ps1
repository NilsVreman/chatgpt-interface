Write-Host "Starting the installation process..."

# Check if Python is installed
if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Host "Python is not installed. Installing Python..."
    # Download Python Installer
    Invoke-WebRequest -Uri "https://www.python.org/ftp/python/3.12.1/python-3.12.1-amd64.exe" -OutFile "pythonInstaller.exe"
    # Run Installer
    Start-Process -FilePath .\pythonInstaller.exe -Args "/quiet InstallAllUsers=1 PrependPath=1" -Wait
    Remove-Item .\pythonInstaller.exe
}

# Check if Node.js is installed
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js is not installed. Installing Node.js..."
    # Download Node.js Installer
    Invoke-WebRequest -Uri "https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi" -OutFile "nodeInstaller.msi"
    # Run Installer
    Start-Process -FilePath .\nodeInstaller.msi -Args "/quiet" -Wait
    Remove-Item .\nodeInstaller.msi
}

# Auxiliary variables
$clientPath = "..\client"
$serverPath = "..\server"

Write-Host "Installing Python dependencies..."
cd $serverPath
pip install -r requirements.txt

Write-Host "Installing Node.js dependencies..."
cd $clientPath
npm install

Write-Host "Installation and setup complete!"