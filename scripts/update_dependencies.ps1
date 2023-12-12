# Auxiliary variables
$currentPath = Get-Location
$clientPath = Join-Path $currentPath "..\client"
$serverPath = Join-Path $currentPath "..\server"

$env:Path = "C:\Program Files\nodejs;$env:Appdata\..\Local\Programs\Python\Python312\Scripts;$env:Appdata\..\Local\Programs\Python\Python312;$env:Path"

Write-Host "Installing Python dependencies..."
cd $serverPath
pip install -r requirements.txt

Write-Host "Installing Node.js dependencies..."
cd $clientPath
npm install

cd $currentPath
Write-Host "Installation and setup complete!"