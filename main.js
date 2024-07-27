function setup() {
    canvas = createCanvas(300,300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    classifier = ml5.imageClassifier('MobileNet'.modelLoaded);
}
function modelLoaded() {
    console.log('Model Loaded!');
}
function draw() {
    image(video,0,0,300,300);
    classifier.classify(video,gotResults);
}
var previous_results = '';
function gotResults(error,results) {
    if(error) {
        console.log(error);
    } else {
        if((results[0].confidence > 0.5) && (previous_results != results[0].label)) {
            console.log(results);
            previous_results = results[0].label;
            var synth = window.speechSynthesis;
            speak_data = 'Object detected is - '+results[0].label;
            var utterThis = new SpeechSunthsisUtterance(speak_data);
            synth.speak(utterThis);
            document.getElementById("results_object_name").innerHTML = results[0].label;
            document.getElementById("results_object_accuracy").innerHTML = results[0].confidence.toFixed(3);
        }
    }
}