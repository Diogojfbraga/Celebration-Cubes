// Confetti's
// Initialize arrays to store the location and rotation angle of each confetti
var confLocs = [];
var confLocs = [];  // array to store the location of each confetti
var confTheta = []; // array to store the location of each confetti

// Sliders
// Declare variables for each slider
var cubeHeightSlider;   // Slider that conntrolls the height of the cubes
var cameraSlider;       // Slider that controlls the camera movement of the cube
let cubeSpeedSlider;    // Slider that controlls the speed of the height change of the cubes    

var startTime = 0;  // Variable to store the starting time

function setup() {
    createCanvas(900, 800, WEBGL);
    
    // Populate confLocs and confTheta arrays with random values
    for (var i = 0; i < 200; i++) {
        confLocs.push(
            createVector(
                random(-500, 500), 
                random(-800, 0), 
                random(-500, 500)
                ));
        confTheta.push(random(0, 360));
    }

    // Step 7
    // Create slider for cube height and set its position
    cubeHeightSlider = createSlider(-100, 300, 100);
    cubeHeightSlider.position(10, 20); 

    // Create label for cube height slider and set its position
    cubeHeightLabel = createElement('label', 'Cube Height');
    cubeHeightLabel.position(cubeHeightSlider.x, cubeHeightSlider.y - 20); 

    // Create slider for cube speed and set its position
    cubeSpeedSlider = createSlider(0, 10, 5);
    cubeSpeedSlider.position(10, 60); 
   
    // Create label for cube speed slider and set its position
    cubeSpeedLabel = createElement('label', 'Cube Speed');
    cubeSpeedLabel.position(cubeSpeedSlider.x, cubeSpeedSlider.y - 20); 

    // Create slider for camera position and set its position
    cameraSlider = createSlider(-1000, 1000, 400);
    cameraSlider.position(10, 100);
   
    // Create label for camera position slider and set its position
    cameraLabel = createElement('label', 'Camera Position');
    cameraLabel.position(cameraSlider.x, cameraSlider.y - 20); 
}

function draw() {
    background(125);
    // Set angle mode to degrees
    angleMode(DEGREES);

    // Get the value of the slider for cube height, speed and camera position
    var cubeHeight = cubeHeightSlider.value();
    var cubeSpeed = cubeSpeedSlider.value();
    var cameraX = cameraSlider.value();

    // Calculate camera position
    // var xCam = height * cos(frameCount/2);  // Step 4 gradding code
    var zCam = height * sin(frameCount/2);
  
    // Set camera position and orientation
    // camera(xCam, -600, 800, 0, 0, 0, 0, 1, 0);    // Step 1 gradding code
    camera(cameraX, -600, zCam, 0, 0, 0, 0, 1, 0);  // Step 7

    // Set perspective to make objects appear more distant
    var fov = map(500, 0, width, 60, 120); // control fov with mouseX
    perspective(fov, width/height, 0.1, 5000);

    // Set material to normal and stroke to zero - Step 2
    normalMaterial();
    stroke(0);
    strokeWeight(2);

    // Set the directional light - Step 7
    directionalLight(255, 0, 0, 1, -1, 0);

    // Set the point light  - Step 7
    pointLight(0, 255, 255, 0, -100, 0);

    // Set the spotlight    - Step 7
    var spotlightX = sin(frameCount / 2) * 500;
    var spotlightZ = cos(frameCount / 2) * 500;
    spotLight(255, 255, 255, spotlightX, -300, spotlightZ, 0, -1, 0, PI / 4, 2);

  
    // Create grid of boxes - STEP 1
    for (var x = -400; x <= 400; x += 50) {
      for (var z = -400; z <= 400; z += 50) {
        var distance = dist(x, 0, z, 0, 0, 0) + (frameCount * cubeSpeed);   // Step 3 - Calculate the distance between the current x, z position and the origin, Add the frame count multiplied by the cube speed to create a time-based effect
        var length = map(sin(distance), -1, 1, 100, cubeHeight);            // Step 3 - Map the sine of the distance value to a range between 100 and the value of the cubeHeight variable
        push();                                 // Save the current transformation
        translate(x, 10, z);                    // Translate the origin of the coordinate system to the current x, z position with a y offset of 10
        // normalMaterial(255, 0, 0);            // Step 2 - gradding code
        specularMaterial(255, 0, 0);            // Set the material properties of the box to a red specular material
        box(50, length, 50);                    // Create a box with dimensions of 50 units on each side and the calculated length on the y-axis
        pop();                                  // Restore the transformation matrix to its previous state
      }
    }

    // Call confetti function
    confetti();

}

// Step 5 and 6
function confetti() {
    specularMaterial(random(255), random(255), random(255));    // Set the material color to a random RGB value
    noStroke();                                                 // Turn off stroke drawing
    for (var i = 0; i < confLocs.length; i++) {                 // Iterate through all confetti locations
        push();                                                 // Save the current transformation
    translate(confLocs[i].x, confLocs[i].y, confLocs[i].z);     // Translate to the position of the confetti
    rotateY(confTheta[i]);                                      // Rotate around the Y axis
    rotateX(frameCount/2);                                      // Rotate around the X axis based on the current frame count
    fill(random(255), random(255), random(255));                // Set the fill color to a random RGB value
    plane(15, 15);                                              // Draw a plane with a size of 15x15 at the current position
    pop();                                                      // Restore the previous transformation
    confLocs[i].y += 1;                                         // Adjust the falling speed
    confTheta[i] += 10;                                         // Adjust the spinning speed
    if (confLocs[i].y > 0) {
      confLocs[i].y = -800;                                     // Reset confetti when it reaches the bottom
        }
      }
  }