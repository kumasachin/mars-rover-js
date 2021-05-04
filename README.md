# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run test:coverage`

Add coverage on code

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `How to Use app`

1. Select CSV file and upload using choose file button
2. A grid will render after uploading of successful file upload
3. Robot will start appearing with delay one by one and move accordingly to provided movements control
4. You can add an additional robot after completion of all robots movements completion.

### `CSV sample`

An CSV sample is in the folder at root (i.e. movements.csv)

Each line in the movements.csv file represents an independent rover, these lines are then split by a pipe, on the left of the pipe is the rover starting position and on the right of the pipe is the rover's movements.


### `Adding Robot on grid`

1. Add name of robot in name input
2. Add movement of robot in movement input
3. Click on submission.
4. Above combination of above input represents an independent rover, these lines are then split by a pipe, on the left of the pipe is the rover starting position and on the right of the pipe is the rover's movements. sample  as below:

1 2 N|LMLMLMLMM
3 3 E|MMRMMRMRRM


### `What is remaining`

1. Unit tests are not complete and code coverage is only around 78%
2. Code Optimzation: code can be optimize on utils, static copy and minimizing functions
3. Automation test coverage pending
4. There is huge scope in improving the user experience
5. There is a lag while adding new robot through form.

