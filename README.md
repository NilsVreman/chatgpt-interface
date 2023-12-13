# ChatGPT Interface
## Download instructions via .zip
1. Press the Green `Code` button in the top right corner.
2. Press "Download Zip"
3. Unzip the downloaded file to your user directory:
    1. Open windows file explorer
    2. Enter `%userprofile%` in address bar
    3. Move the file (in downloads) to this directory
    4. Right-click and “extract here”

## Installation on Windows
**NOTE**: If you already have `Node.js` and `Python` installed, you can skip this part.

1. Download `WinPython` from [https://github.com/winpython/winpython/releases/download/7.0.20231126final/Winpython64-3.11.6.0.exe](https://github.com/winpython/winpython/releases/download/7.0.20231126final/Winpython64-3.11.6.0.exe)
2. Unzip to your user directory:
    1. Open windows file explorer
    2. Enter `%userprofile%` in address bar
    3. Move `Winpython-exe` to this directory
    4. Right-click `Winpython-exe` and “extract here”
3. In the extracted directory, open `WinPython Command Prompt.exe`
4. Type `node --version` and `python --version` to validate that the tools are available

## Execution for WinPython
1. Open a `WinPython Command Prompt`
2. Navigate to the downloaded directory
    1. write in the `WinPython Command Prompt`: `cd %USERPROFILE%\chatgpt-interface-main\scripts` 
3. Open the current folder by writing: `start .` 
4. Edit the `start_application.ps1` file by opening it in NotePad (or any text editor)
    1. Replace the text `$env:OPENAI_API_Key` with the provided API Key
    2. Save and close the text editor
5. Run the application, by writing: `powershell -ExecutionPolicy Bypass -file "start_application.ps1"`    

## Normal Execution 
1. Navigate to the `chatgpt-interface\scripts` directory
1. In CMD, run: `powershell -ExecutionPolicy Bypass -file "start_application.ps1"`
2. In Powershell: `.\start_application.ps1`

* **NOTE**: You have to either set the environment-variable `OPENAI_API_KEY` before running the startup script, or hardcode it into the script