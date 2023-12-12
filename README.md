# ChatGPT Interface
## Installation/Execution on Windows
1. Open a Command prompt and navigate to the repository as such: `cd path\to\repository\`
2. Navigate into the `scripts\` folder
3. Run the `install_tools.ps1` script by executing the command: `powershell -ExecutionPolicy Bypass -File "install_tools.ps1"`
    * **NOTE**: If you already have `Node.js` and `Python` installed, you can skip this step
4. Run the `update_dependencies.ps1` script by executing the command: `powershell -ExecutionPolicy Bypass -File "update_dependencies.ps1"`
    * **NOTE**: This script is currently hard-setting the `PATH` to the `python`, `pip`, and `npm` executables.
        Remove the line that starts with `$env:Path =` if you already have these tools installed.
5. To run the application, run `start.ps1` by executing the command: `powershell -ExecutionPolicy Bypass -file "start.ps1"`
    * **NOTE**: You have to have set the environment-variable `OPENAI_API_KEY` before running the startup script.
        This variable can be hardcoded into the execution script (as `$apiKey = <Hardcoded value is written here>`) or set from CLI.
        The variable has been provided by the AI Innovation Days representative of your location.

### Known Problems
* Unfortunately we ran out of time trying to fix some bugs
* If you're **not** in an "RnD" group in CyberArk, you'll have troubles running the `install_tools.ps1` script. This is because we require "elevated priveleges" to install `Node.js` on our machines.
    - We didn't have time to debug this further, but are happy to help out if some issues arise.