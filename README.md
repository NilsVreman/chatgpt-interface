# ChatGPT Interface
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

## Execution 
1. Open a Command prompt and navigate to the repository as such: `cd path\to\repository\`
2. Navigate into the `scripts\` folder
3. To run the application, run `start_application.ps1` by executing the command: `powershell -ExecutionPolicy Bypass -file "start.ps1"`
    * **NOTE**: You have to have set the environment-variable `OPENAI_API_KEY` before running the startup script.
    * This variable can be hardcoded into the execution script (as `$apiKey = <The API key you've been provided>`), or by writing `export OPENAI_API_KEY=<The API key you've been provided>` in the command prompt you have open.
