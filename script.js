//API is the acronym for Application Programming Interface, which is a software intermediary that allows two applications to talk to each other. Each time you use an app like Facebook, send an instant message, or check the weather on your phone, you're using an API.

//Pre defined applications in simple word 
//that u can directly use 
//Here i am using face api.js 

const video = document.getElementById('video');


Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
  ]).then(startVideo)

  //Here No error 

  //Promise all
  //This returned promise will resolve when all of the input's promises have resolved, or if the input iterable contains no promises

  //then in promise used to resolve 
  //i.e after going through all of these start video

//A JavaScript Promise object contains both the producing code and calls to the consuming code:
//let myPromise = new Promise(function(myResolve, myReject) {
// "Producing Code" (May take some time)

// myResolve(); // when successful
// myReject();  // when error
// });

// // "Consuming Code" (Must wait for a fulfilled Promise)
// myPromise.then(
// function(value) { /* code if successful */ },
// function(error) { /* code if some error */ }
// );



//The deprecated Navigator.getUserMedia() method prompts the user for permission to use up to one video input device (such as a camera or shared screen) and up to one audio input device (such as a microphone) as the source for a MediaStream.
function startVideo() {
    navigator.getUserMedia(
      { video: {} },
      stream => video.srcObject = stream,
      galti => console.error(galti)
    )
  }

  //These are all built in modules or we say functions of this face api
  
  video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas, displaySize)
    //async is used to do it asynchronusly 
    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
      const resizedDetections = faceapi.resizeResults(detections, displaySize)
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
      faceapi.draw.drawDetections(canvas, resizedDetections)
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    }, 150)
  })

  //For every 100 milisecond functions ko run kro
  //detect all faces inside camera 
  //using tiny face detector 
  //with face landmarks and face expressions
  
 

  //Face detection: get the boundaries of one or multiple faces. This is useful for determining where and how big the faces are in a picture.
// Face landmark detection: get the position and shape of the eyebrows, eyes, nose, mouth and lips, and chin. This can be used to determine facing direction or to project graphics on specific regions, like a mustache between the nose and lips.
// Face recognition: determine who’s in the picture.
// Face expression detection: get the expression from a face. Note that the mileage may vary for different cultures.
// Age and gender detection: get the age and gender from a face. Note that for “gender” classification, it classifies a face as feminine or masculine, which doesn’t necessarily reveal their gender.