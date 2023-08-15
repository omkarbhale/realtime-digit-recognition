const predict = async () => {
    const canvasData = canvas.canvas.toDataURL(); // Convert canvas to base64 image
    const requestData = { image: canvasData };

    try {
        const response = await fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        const data = await response.json()
        // console.log(data.message);
        // console.log(data.image);
        // console.log(data.probabilities);
        return data.probabilities;
    }
    catch(error)  {
        console.error('Error:', error);
    };
}