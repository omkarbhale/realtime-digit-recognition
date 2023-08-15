// Add string data in any order and read line by line
class DataReader {
    constructor() {
        this.buffer = '';
        this.lines = [];
        this.linePromiseResolver = null;
    }

    add(data) {
        this.buffer += data;
        const lines = this.buffer.split(/\r\n|\r|\n/);
        
        this.buffer = lines.pop()
        this.lines.push(...lines);
        
        if (this.linePromiseResolver && this.lines.length > 0) {
            const line = this.lines.shift();
            this.linePromiseResolver(line);
            this.linePromiseResolver = null;
        }
    }
  
    async readLine() {
        if (this.lines.length > 0) {
            return this.lines.shift();
        } else {
            return new Promise(resolve => {
                this.linePromiseResolver = resolve;
            });
        }
    }
}

// Example usage
async function simulateData() {
    const reader = new DataReader();

    // Simulating incoming data asynchronously
    setTimeout(() => reader.add("Line 1\n"), 1000);
    setTimeout(() => reader.add("Line"), 1500);
    setTimeout(() => reader.add(" 2\nLine 3\n"), 2500);
    setTimeout(() => reader.add("Line 4\n"), 10000);

    console.log(`\t${await reader.readLine()}`); // Output: "Line 1"
    console.log(`\t${await reader.readLine()}`); // Output: "Line 2"
    console.log(`\t${await reader.readLine()}`); // Output: "Line 3"
    console.log(`\t${await reader.readLine()}`);
}

module.exports = DataReader;