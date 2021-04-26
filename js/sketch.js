
// signal 
let x = []
let y = [];
let fourierX; 
let fourierY; 
let time = 0;
let path = [];

function setup() {
    createCanvas(1920, 1080);
    
    // Replace this with a path 
    // for (let i = 0; i < 200; i++) {
    //     let angle = map(i, 0, 100, 0, TWO_PI);
    //     // x[i] = 100 * cos(angle);
    //     // y[i] = 100 * sin(angle);
    //     x[i] = i + noise(angle);
    //     y[i] = i + noise(angle);
    // }

    let skip = 1
    for (let i = 0;  i < coords.length; i += skip) {
        x.push(coords[i][0]);
        y.push(coords[i][1]);

    }

    
    // Discrete Fourier Transform
    fourierX = dft(x);  
    fourierY = dft(y);

    fourierX.sort((a,b) => b.ampl - a.ampl);
    fourierY.sort((a,b) => b.ampl - a.ampl);
}

function epicycles(x, y, rot, fourier) {
    for (let i = 0; i < fourier.length; i++) {
        let prevX = x;
        let prevY = y; 
        
        let freq   = fourier[i].freq;
        let radius = fourier[i].ampl;
        let phase  = fourier[i].phase;

        x += radius * cos(freq * time + phase + rot);
        y += radius * sin(freq * time + phase + rot);

        stroke(255, 100);
        noFill();
        ellipse(prevX, prevY, radius * 2);
        stroke(255);
        line(prevX, prevY, x, y);
    }

    return createVector(x,y);
}
  
function draw() {
    background(0);

    let vx = epicycles(3 * width / 4, 100, 0, fourierX);
    let vy = epicycles(100, 3 * height / 4, HALF_PI, fourierY);
    
    let v = createVector(vx.x, vy.y);

    path.unshift(v);

    line(vx.x, vx.y, v.x, v.y);
    line(vy.x, vy.y, v.x, v.y);
    
    beginShape();
    noFill();
    for (let i = 0; i < path.length; i++) {
        vertex(path[i].x, path[i].y);
    
    }
    endShape();

    const dt = TWO_PI / fourierY.length;
    time += dt;
    if (time > TWO_PI) {
        time = 0;
        path = [];
        // NOLOOP
    }
}