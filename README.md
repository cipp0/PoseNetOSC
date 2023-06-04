```sh
cd PoseNetOSC
  ```

```sh
npm i osc-js
  ```

```sh
node ./app.js
  ```

- in another terminal window type 
```sh
cd PoseNetOsc && python3 -m http.server
```

- Go to localhost:8000

- open Main.maxpat\

You're now receiving all the OSC messages of the 17 keypoints through the port number 9129
