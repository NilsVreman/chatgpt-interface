Write-Host "Starting the install_tools.ps1 script..."
Start-Process -FilePath "install_tools.ps1" -Wait

Write-Host "Starting the update_dependencies.ps1 script..."
Start-Process -FilePath "update_dependencies.ps1" -Wait

Write-Host "Starting the start.ps1 script..."
Start-Process -FilePath "start.ps1" -Wait