# Auxiliary variables
$currentPath = Get-Location
$clientPath = Join-Path $currentPath "..\client"
$serverPath = Join-Path $currentPath "..\server"

Write-Host "Installing Python dependencies..."
cd $serverPath
~\AppData\Local\Programs\Python\Python312\Scripts\pip install -r requirements.txt

Write-Host "Installing Node.js dependencies..."
cd $clientPath
& "C:\Program Files\nodejs\npm" install

cd $currentPath
Write-Host "Installation and setup complete!"