const { spawn } = require('child_process');
const DataReader = require('./datareader');

class PythonProcess {
    constructor(scriptPath, venvActivateScript) {
        this.spawnPythonScript(scriptPath, venvActivateScript);
        this.dataReader = new DataReader();

        this.process.stdout.on('data', data => {
            this.dataReader.add(data);
        });
        
        // this.process.stderr.on('data', data => {
        //     console.error(data);
        // });
        
        this.process.on('close', code => {
            console.log('Exit complete:', code);
        });
    }

    spawnPythonScript(scriptPath, venvActivateScript) {
        this.process = spawn("cmd", [], { shell: true });
        this.process.stdout.setEncoding('utf-8');
        this.process.stderr.setEncoding('utf-8');
        this.process.stdin.write(`${venvActivateScript}\n`);
        this.process.stdin.write(`python -u ${scriptPath}\n`);
    }

    async readLine() {
        return await this.dataReader.readLine();
    }

    sendInput(input) {
        // console.log(input);
        this.process.stdin.write(`${input}\n`);
    }
}

let pythonProcess = null;

async function predict(inputValues) {
    if (!pythonProcess) {
        pythonProcess = new PythonProcess(
            '.\\main.py',
            '.\\venv\\Scripts\\activate.bat'
        );
    }

    pythonProcess.sendInput(inputValues);
    let line = null;
    while(true) {
        line = await pythonProcess.readLine();
        if (line.startsWith("out:")) break;
    }
    return line.replace("out:", "").trim().split(' ').map(num => parseFloat(num));
}

// Example usage
// (async () => {
//     try {
//         const prediction = await predict('')
//         console.log(prediction);
//     } catch (error) {
//         console.error('Error:', error);
//     } finally {
//         // Close the processes when done
//         // pythonProcess.close();
//     }
// })();

module.exports = predict;