
# Realtime Digit Recognition

Show probabilities from pretrained neural network model in realtime as the user draws


## Architecture

- Actual predictions are performed in python
- Server is written in nodejs
- The server spawns the python script and uses stdin/stdout
- Frontend is served along with an API endpoint for prediction
## Screenshots

![App Screenshot](https://github.com/omkarbhale/realtime-digit-recognition/blob/main/demo/4.jpg.png?raw=true)


## Installation

Clone this repository, and run the following to set up.
Modify last line of index.js to change frontend port (default 3001).

```bash
  npm install
  pip install -r requirements.txt
```
Then to start the server, run
```bash
  npm start # uses nodemon
  # or
  node index.js
```
## 🚀 About Me
I'm a full stack developer... for now.

## Contributing

Contributions are always welcome!


