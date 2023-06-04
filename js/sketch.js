// Dichiaro le variabili globali
let video;
let poseNet;
let pose;
let skeleton;
let leftAnkle ;
let leftEar ;
let leftElbow ;
let leftEye; 
let leftHip;
let leftKnee;
let leftShoulder; 
let leftWrist; 
let nose ;
let rightAnkle;
let rightEar;
let rightElbow;
let rightEye;
let rightHip;
let rightKnee ;
let rightShoulder;
let rightWrist;

// Creo un server WebSocket per OSC
var osc = new OSC();
  osc.open();

// Creo funzione di setup di p5
function setup() {
    
  //Creo un riquadro con l'immagine della WebCam
    createCanvas(640, 480);
    video = createCapture (VIDEO);
    video.hide();
    
  // Carico il modello di PoseNet
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses)
   

  //Quando il modello è caricato banga la funzione di classificazione della posa
  function modelReady(){
    console.log ('Modello caricato');
    grabInputs();
  }
}
//Prendi i dati che sta leggendo PoseNet

function grabInputs(){
 if(pose){
   let inputs = [];

    for (let i = 0; i < pose.keypoints.length; i++) {
          let person0 = poses[0].pose
          let x = pose.keypoints[i].position.x;
          let y = pose.keypoints[i].position.y;
          inputs.push(x);
          inputs.push(y);

          let leftAnkle = poses[0].pose.leftAnkle;
          let leftEar = poses[0].pose.leftEar;
          let leftElbow = poses[0].pose.leftElbow;
          let leftEye = poses[0].pose.leftEye;
          let leftHip = poses[0].pose.leftHip;
          let leftKnee = poses[0].pose.leftKnee;
          let leftShoulder = poses[0].pose.leftShoulder;
          let leftWrist = poses[0].pose.leftWrist;
          let nose = poses[0].pose.nose;

          let rightAnkle = poses[0].pose.rightAnkle;
          let rightEar = poses[0].pose.rightEar;
          let rightElbow = poses[0].pose.rightElbow;
          let rightEye = poses[0].pose.rightEye;
          let rightHip = poses[0].pose.rightHip;
          let rightKnee = poses[0].pose.rightKnee;
          let rightShoulder = poses[0].pose.rightShoulder;
          let rightWrist = poses[0].pose.rightWrist;


         }
  } else {
    //Se non trova nessuna posa, riprova ogni 100 msec
    setTimeout(grabInputs, 100);
  }
} 




// Funzione che viene attivata quando PoseNet trova una posa
function gotPoses(poses){
   //console.log(poses);
  if (poses.length > 0){
    
  // Crea una variabile con al suo interno i valori di x,y dei 17 keypoints e i valori dello scheletro

    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
    //console.log(poses[0].pose.leftEar.x);
    
    var leftAnkleX = new OSC.Message('/leftAnkleX', poses[0].pose.leftAnkle.x);
      osc.send(leftAnkleX);
    var leftAnkleY = new OSC.Message('/leftAnkleY', poses[0].pose.leftAnkle.y);
      osc.send(leftAnkleY);

    var leftEarX = new OSC.Message('/leftEarX', poses[0].pose.leftEar.x);
      osc.send(leftEarX);
    var leftEarY = new OSC.Message('/leftEarY', poses[0].pose.leftEar.y);
      osc.send(leftEarY);

    var leftElbowX = new OSC.Message('/leftElbowX', poses[0].pose.leftElbow.x);
      osc.send(leftElbowX);
    var leftElbowY = new OSC.Message('/leftElbowY', poses[0].pose.leftElbow.y);
      osc.send(leftElbowY);

    var leftEyeX = new OSC.Message('/leftEyeX', poses[0].pose.leftEye.x);
      osc.send(leftEyeX);
    var leftEyeY = new OSC.Message('/leftEyeY', poses[0].pose.leftEye.y);
      osc.send(leftEyeY);

    var leftHipX = new OSC.Message('/leftHipX', poses[0].pose.leftHip.x);
      osc.send(leftHipX);
    var leftHipY = new OSC.Message('/leftHipY', poses[0].pose.leftHip.y);
      osc.send(leftHipY);

    var leftKneeX = new OSC.Message('/leftKneeX', poses[0].pose.leftKnee.x);
      osc.send(leftKneeX);
    var leftKneeY = new OSC.Message('/leftKneeY', poses[0].pose.leftKnee.y);
      osc.send(leftKneeY);

    var leftShoulderX = new OSC.Message('/leftShoulderX', poses[0].pose.leftShoulder.x);
      osc.send(leftShoulderX);
    var leftShoulderY = new OSC.Message('/leftShoulderY', poses[0].pose.leftShoulder.y);
      osc.send(leftShoulderY);

    var leftWristX = new OSC.Message('/leftWristX', poses[0].pose.leftWrist.x);
      osc.send(leftWristX);
    var leftWristY = new OSC.Message('/leftWristY', poses[0].pose.leftWrist.y);
      osc.send(leftWristY);

    var NoseX = new OSC.Message('/NoseX', poses[0].pose.nose.x);
      osc.send(NoseX);
    var NoseY = new OSC.Message('/NoseY', poses[0].pose.nose.y);
      osc.send(NoseY);

    var rightAnkleX = new OSC.Message('/rightAnkleX', poses[0].pose.rightAnkle.x);
      osc.send(rightAnkleX);
    var rightAnkleY = new OSC.Message('/rightAnkleY', poses[0].pose.rightAnkle.y);
      osc.send(rightAnkleY);

    var rightEarX = new OSC.Message('/rightEarX', poses[0].pose.rightEar.x);
      osc.send(rightEarX);
    var rightEarY = new OSC.Message('/rightEarY', poses[0].pose.rightEar.y);
      osc.send(rightEarY);

    var rightElbowX = new OSC.Message('/rightElbowX', poses[0].pose.rightElbow.x);
      osc.send(rightElbowX);
    var rightElbowY = new OSC.Message('/rightElbowY', poses[0].pose.rightElbow.y);
      osc.send(rightElbowY);

    var rightEyeX = new OSC.Message('/rightEyeX', poses[0].pose.rightEye.x);
      osc.send(rightEyeX);
    var rightEyeY = new OSC.Message('/rightEyeY', poses[0].pose.rightEye.y);
      osc.send(rightEyeY);

    var rightHipX = new OSC.Message('/rightHipX', poses[0].pose.rightHip.x);
      osc.send(rightHipX);
    var rightHipY = new OSC.Message('/rightHipY', poses[0].pose.rightHip.y);
      osc.send(rightHipY);

    var rightKneeX = new OSC.Message('/rightKneeX', poses[0].pose.rightKnee.x);
      osc.send(rightKneeX);
    var rightKneeY = new OSC.Message('/rightKneeY', poses[0].pose.rightKnee.y);
      osc.send(rightKneeY);

    var rightShoulderX = new OSC.Message('/rightShoulderX', poses[0].pose.rightShoulder.x);
      osc.send(rightShoulderX);
    var rightShoulderY = new OSC.Message('/rightShoulderY', poses[0].pose.rightShoulder.y);
      osc.send(rightShoulderY);

    var rightWristX = new OSC.Message('/rightWristX', poses[0].pose.rightWrist.x);
      osc.send(rightWristX);
    var rightWristY = new OSC.Message('/rightWristY', poses[0].pose.rightWrist.y);
      osc.send(rightWristY);
    
  }
}

// Funzione di callback quando posenet è caricato
function modelLoaded(){
  console.log ('poseNet caricato')
}

//Funzione per disegnare il video e lo scheletro sulla pagina web (classica di p5)
function draw() {
  //Specchia il contenuto da qui
  push();
  
  //Specchia l'immagine video
  translate(video.width, 0);
  scale(-1,1);
  image (video, 0 , 0, video.width, video.height);
  
  // Crea dei tondi gialli in corrispondenza dei keypoints
  if(pose) {
    
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill (255,255,0);
      ellipse (x,y,10,10);
      
     }
    // Crea delle linee in funzione dello scheletro
    for (let i = 0; i < skeleton.length; i++){
      let a = skeleton[i][0];
      let b = skeleton [i][1];
      strokeWeight (2);
      stroke(255);
      line (a.position.x, a.position.y, b.position.x, b.position.y);
    }
   
  }
  //Specchia il contenuto fino a qui
  pop();
  
}

