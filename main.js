song="";
leftWristX = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload() {
    song=loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('pose net is initialized');
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
scoreLeftWrist = results[0].pose.keypoints[9].score;
console.log("ScoreLeftWrist = " + scoreLeftWrist + "scorerightwrist = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +"left wrist y = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +"right wrist y = " + rightWristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#8B0000");

    circle(rightWristX,rightWristY,20);

if(scoreRightWrist > 0.2){
    if(rightWristY >0 && rightWristY <=100){
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }

    else if(rightWristY >100 && rightWristY <=200){
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }

    else if(rightWristY >200 && rightWristY <=300){
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }

    else if(rightWristY >300 && rightWristY <=400){
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }

    else if(rightWristY >400 && rightWristY <=500){
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }
}

if(scoreLeftWrist > 0.2)
    {
    circle(leftWristX,leftWristY,20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
}
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}