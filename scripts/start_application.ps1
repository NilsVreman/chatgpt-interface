function Set-SeProxy {

    $proxyUrl = 'http://gateway.schneider.zscaler.net:9480'
 
    # # no_proxy needed for e.g. Selenium to start the ChromeDriver when proxy is set
    $noProxy = 'localhost,127.0.0.0/8,::1,schneider-electric.com,10.0.0.0/8' 
    setx NO_PROXY $noProxy

    # http_proxy needed for Cypress to run correctly, for some reason it's not picking up https_proxy
    setx HTTP_PROXY $proxyUrl

    # https_proxy set just for the sake of it, see http_proxy for Cypress specifics
    setx HTTPS_PROXY $proxyUrl

    # Not sure why yarn does not use https_proxy from the environment, it should
    setx YARN_HTTPS_PROXY $proxyUrl

    #$zscalerCertPath = "$env:userprofile\zscaler.cer"
    #if (!(test-path -path $zscalerCertPath)) {
    #    Write-Host -ForegroundColor Red "Warning, the '$zscalerCertPath' file does not exist." `
    #        "Search for the file name on the wiki to find out how to get a hold of it." 
    #  }
    ## I've tried to get this to work with both yarn's config for caFilePath and httpsCertFilePath but no luck
    ## Leaving like this for now, it works :)
    ## Looks to be an issue on yarn: https://github.com/yarnpkg/berry/issues/2250
    #setx NODE_EXTRA_CA_CERTS $zscalerCertPath

    write-host "Done!"
    write-host "Remember that some applications (eg the terminal) need a restart to use the updated environment variables."
}

# Auxiliary variables
$currentPath = $PSScriptroot
$clientPath = Join-Path $PSScriptroot "..\client"
$serverPath = Join-Path $PSScriptroot "..\server"
$apiKey = $env:OPENAI_API_KEY

# Command to start the Python server
$serverCommand = "python chat_gpt_communication_server.py --api-base https://openai-nonfunsbx-pprd-01.openai.azure.com/ --api-version 2023-07-01-preview --api-key $apiKey"
# Command to start the Node.js client
$clientCommand = "npm start"

Set-SeProxy

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
