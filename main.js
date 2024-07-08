scoreleftWrist = 0;
scoreRightWrist = 0;
song = "";

function preload() {
    song = loadSound('music.mp3')
    song2 = loadSound('music2.mp3')
}
leftWristX = 0;
leftWristY = 0;

RightWristX = 0;
RightWristY = 0;

function setup() {
    canvas = createCanvas(700, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)
}

function modelLoaded() {
    console.log('PoseNet Is Intialized');

}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("LeftWristX = " + leftWristX + "leftWristY = " + leftWristY);


        RightWristX = results[0].pose.rightWrist.x;
        RightWristY = results[0].pose.rightWrist.y;
        console.log("RightWristX = " + RightWristX + ", RightWristY = " + RightWristY);
        scoreleftWrist = results[0].pose.keypoints[9].score
        scoreRightWrist = results[0].pose.keypoints[10].score
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreleftWrist = " + scoreleftWrist);
    }
}

function draw() {
    image(video, 0, 0, 700, 500);

    fill("#ff0000");
    stroke("#ff0000");

    if (scoreRightWrist > 0.2)

        circle(RightWristX, RightWristY, 20);
        circle(leftWristY, leftWristX, 20);
    }

