import tensorflow as tf
import numpy as np
import random
# print("TensorFlow version:", tf.__version__)

# mnist = tf.keras.datasets.mnist

# (x_train, y_train), (x_test, y_test) = mnist.load_data()
# x_train, x_test = x_train / 255.0, x_test / 255.0

# for img in x_train:
#     cv2.imshow('main', cv2.resize(img*255.0, (500, 500)))
#     cv2.waitKey(1000)

model = tf.keras.models.Sequential([
    tf.keras.layers.Flatten(input_shape=(28, 28)),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(10)
])

loss_fn = tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True)

model.compile(optimizer='adam', loss=loss_fn, metrics=['accuracy'])

# model.fit(
#     x_train,
#     y_train,
#     epochs=5,
#     callbacks=[tf.keras.callbacks.ModelCheckpoint(filepath='checkpoint_path/cp.ckpt', save_weights_only=True, verbose=1)]
# )
model.load_weights('checkpoint_path/cp.ckpt').expect_partial()
# model.evaluate(x_test,  y_test, verbose=2)

# Load and preprocess the image from stdin
while True:
    # input_data = sys.stdin.read().strip()
    input_data = input()
    # For testing without input
    # if input_data == 'close':
    #     break
    if len(input_data) < 5:
        input
        input_data = ("25 " * 784).strip()
        input_data = ' '.join(str(random.randint(0, 255)) for _ in range(784))
    input_values = np.array(input_data.split(), dtype=float)
    input_values = input_values.reshape(28, 28)  # Reshape to match the expected input shape
    input_values = input_values / 255.0  # Normalize

    # Add a batch dimension to the input values
    input_values = np.expand_dims(input_values, axis=0)

    # Make a prediction
    predictions = model.predict(input_values)
    prediction = tf.nn.softmax(predictions).numpy()[0]

    # Print the prediction values to stdout
    print(f"out:", end=' ')
    for value in prediction:
        print("{:.8f}".format(value), end=" ")
    print()
