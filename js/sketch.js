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

    var leftAnkle = poses[0].pose.leftAnkle;
    var msgLAnkle = new OSC.Message('/leftAnkle', leftAnkle.x, leftAnkle.y);
      osc.send(msgLAnkle);

    var rightAnkle = poses[0].pose.rightAnkle;
    var msgRAnkle = new OSC.Message('/rightAnkle', rightAnkle.x, rightAnkle.y);
      osc.send(msgRAnkle);

    var leftEar = poses[0].pose.leftEar;
    var msgLEar = new OSC.Message('/leftEar', leftEar.x, leftEar.y);
      osc.send(msgLEar);

    var rightEar = poses[0].pose.rightEar;
    var msgREar = new OSC.Message('/rightEar', rightEar.x, rightEar.y);
      osc.send(msgREar);

    var leftElbow = poses[0].pose.leftElbow;
    var msgLElbow = new OSC.Message('/leftElbow', leftElbow.x, leftElbow.y);
      osc.send(msgLElbow);

    var rightElbow = poses[0].pose.rightElbow;
    var msgRElbow = new OSC.Message('/rightElbow', rightElbow.x, rightElbow.y);
      osc.send(msgRElbow);

    var leftEye = poses[0].pose.leftEye;
    var msgLEye = new OSC.Message('/leftEye', leftEye.x, leftEye.y);
      osc.send(msgLEye);

    var rightEye = poses[0].pose.rightEye;
    var msgREye = new OSC.Message('/rightEye', rightEye.x, rightEye.y);
      osc.send(msgREye);

    var leftHip = poses[0].pose.leftHip;
    var msgLHip = new OSC.Message('/leftHip', leftHip.x, leftHip.y);
      osc.send(msgLHip);

    var rightHip = poses[0].pose.rightHip;
    var msgRHip = new OSC.Message('/rightHip', rightHip.x, rightHip.y);
      osc.send(msgRHip);

    var leftKnee = poses[0].pose.leftKnee;
    var msgLKnee = new OSC.Message('/leftKnee', leftKnee.x, leftKnee.y);
      osc.send(msgLKnee);

    var rightKnee = poses[0].pose.rightKnee;
    var msgRKnee = new OSC.Message('/rightKnee', rightKnee.x, rightKnee.y);
      osc.send(msgRKnee);

    var leftShoulder = poses[0].pose.leftShoulder;
    var msgLShoulder = new OSC.Message('/leftShoulder', leftShoulder.x, leftShoulder.y);
      osc.send(msgLShoulder);

    var rightShoulder = poses[0].pose.rightShoulder;
    var msgRShoulder = new OSC.Message('/rightShoulder', rightShoulder.x, rightShoulder.y);
      osc.send(msgRShoulder);

    var leftWrist = poses[0].pose.leftWrist;
    var msgLWrist = new OSC.Message('/leftWrist', leftWrist.x, leftWrist.y);
      osc.send(msgLWrist);

    var rightWrist = poses[0].pose.rightWrist;
    var msgRWrist = new OSC.Message('/rightWrist', rightWrist.x, rightWrist.y);
      osc.send(msgRWrist);

    var nose = poses[0].pose.nose;
    var msgNose = new OSC.Message('/nose', nose.x, nose.y);
      osc.send(msgNose);
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

