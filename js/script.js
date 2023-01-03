var root, env, octave, octaveStr, filterL, filterH, filterM;
var osc1, osc2m, osc2, osc3m, osc4, osc4a, osc5, osc6m, osc6, osc7m, osc7;
var colorOff, colorOn; //color de los botones
var recorder, soundFile, audio, recState, masterOutput;
var lfo, lfofreq, lfoamp, filterQ;
var sustainState;
var oscArray = [];

window.onload= function(){
var modalInfo = document.getElementById('modalInfo');
var btninfo = document.getElementById("btnInfo");
  btnInfo.onclick = function() {
    modalInfo.style.display = "block";
  }
  window.onclick = function(event) {
      if (event.target == modalInfo) {
          modalInfo.style.display = "none";
      }
  }
}
function setup() {
  octave = 0;
  octaveStr = "0"
  root = 864;
  colorOff = "#728ca6";
  colorOn = "#4a6b8a";
  recState = 0;
  sustainState = 0;
  filterQ = 12;
  document.getElementById("recBtn").innerHTML = "OFF";
  masterOutput = p5.soundOut.input;

  lfo = new p5.Oscillator('sine');
  lfofreq = 0.1;
  lfoamp = 150;
  lfo.freq(lfofreq);
  lfo.amp(lfoamp);
  lfo.start();
  lfo.disconnect();
}

function draw() {}
function keyPressed(){

  switch (key){
    case "C":
      if(sustainState == 1){
        document.getElementById("sustain").innerHTML = "Off";
        var i;
        for(i = 0; i < oscArray.length; i++){
          oscArray[i].env.triggerRelease();
        };
        document.getElementById("key_A").style.background = colorOff;
        document.getElementById("key_W").style.background = colorOff;
        document.getElementById("key_S").style.background = colorOff;
        document.getElementById("key_E").style.background = colorOff;
        document.getElementById("key_D").style.background = colorOff;
        document.getElementById("key_F").style.background = colorOff;
        document.getElementById("key_T").style.background = colorOff;
        document.getElementById("key_G").style.background = colorOff;
        document.getElementById("key_Y").style.background = colorOff;
        document.getElementById("key_H").style.background = colorOff;
        document.getElementById("key_U").style.background = colorOff;
        document.getElementById("key_J").style.background = colorOff;
      }else if (sustainState == 0) {
        document.getElementById("sustain").innerHTML = "On";
      }
      sustain();
      break;
    case "X":
      root=root*2;
      octave = octave + 1;
      octaveStr = octave.toString();
      document.getElementById("octave").innerHTML = octaveStr;
      break;
    case "Z":
      root=root/2;
      octave = octave - 1;
      octaveStr = octave.toString();
      document.getElementById("octave").innerHTML = octaveStr;
      break;

    case "A":  //ROOT
      osc1 = new NoiseOsc(root,0.3,filterQ);
      osc1.playNoise();
      document.getElementById("key_A").style.background = colorOn;
      break;
    case "W":  //2m
      osc2m = new NoiseOsc(root*16/15,0.3,filterQ);
      osc2m.playNoise();
      document.getElementById("key_W").style.background = colorOn;
      break;
    case "S":  //2M
      osc2 = new NoiseOsc(root*9/8,0.3,filterQ);
      osc2.playNoise();
      document.getElementById("key_S").style.background = colorOn;
      break;
    case "E":  //3m
      osc3m = new NoiseOsc(root*6/5,0.3,filterQ);
      osc3m.playNoise();
      document.getElementById("key_E").style.background = colorOn;
      break;
    case "D":  //3M
      osc3 = new NoiseOsc(root*5/4,0.3,filterQ);
      osc3.playNoise();
      document.getElementById("key_D").style.background = colorOn;
      break;
    case "F":  //4P
      osc4 = new NoiseOsc(root*4/3,0.3,filterQ);
      osc4.playNoise();
      document.getElementById("key_F").style.background = colorOn;
      break;
    case "T":  //4A
      osc4a = new NoiseOsc(root*(sqrt(2)),0.3,filterQ);
      osc4a.playNoise();
      document.getElementById("key_T").style.background = colorOn;
      break;
    case "G":  //5P
      osc5 = new NoiseOsc(root*3/2,0.3,filterQ);
      osc5.playNoise();
      document.getElementById("key_G").style.background = colorOn;
      break;
    case "Y":  //6m
      osc6m = new NoiseOsc(root*8/5,0.3,filterQ);
      osc6m.playNoise();
      document.getElementById("key_Y").style.background = colorOn;
      break;
    case "H":  //6M
      osc6 = new NoiseOsc(root*5/3,0.3,filterQ);
      osc6.playNoise();
      document.getElementById("key_H").style.background = colorOn;
      break;
    case "U":  //7m
      osc7m = new NoiseOsc(root*7/4,0.3,filterQ);
      osc7m.playNoise();
      document.getElementById("key_U").style.background = colorOn;
      break;
    case "J":  //7M
      osc7 = new NoiseOsc(root*15/8,0.3,filterQ);
      osc7.playNoise();
      document.getElementById("key_J").style.background = colorOn;
      break;
          }
}

function keyReleased(){
  if(sustainState == 1){}
  else if (sustainState == 0) {

    switch (key){
      case "A":  //ROOT
        osc1.env.triggerRelease();
        document.getElementById("key_A").style.background = colorOff;
        break;
      case "W":  //2m
        osc2m.env.triggerRelease();
        document.getElementById("key_W").style.background = colorOff;
        break;
      case "S":  //2M
        osc2.env.triggerRelease();
        document.getElementById("key_S").style.background = colorOff;
        break;
      case "E":  //3m
        osc3m.env.triggerRelease();
        document.getElementById("key_E").style.background = colorOff;
        break;
      case "D":  //3M
        osc3.env.triggerRelease();
        document.getElementById("key_D").style.background = colorOff;
        break;
      case "F":  //4P
        osc4.env.triggerRelease();
        document.getElementById("key_F").style.background = colorOff;
        break;
      case "T":  //4A
        osc4a.env.triggerRelease();
        document.getElementById("key_T").style.background = colorOff;
        break;
      case "G":  //5P
        osc5.env.triggerRelease();
        document.getElementById("key_G").style.background = colorOff;
        break;
      case "Y":  //6m
        osc6m.env.triggerRelease();
        document.getElementById("key_Y").style.background = colorOff;
        break;
      case "H":  //6M
        osc6.env.triggerRelease();
        document.getElementById("key_H").style.background = colorOff;
        break;
      case "U":  //7m
        osc7m.env.triggerRelease();
        document.getElementById("key_U").style.background = colorOff;
        break;
      case "J":  //7M
        osc7.env.triggerRelease();
        document.getElementById("key_J").style.background = colorOff;
        break;
            }
  }
}

class NoiseOsc {
  constructor(freq, ampl, q) {
    this.osc = new p5.Noise();
    this.ampl = ampl;
    this.env = new p5.Env();
    this.env.setADSR(5, 0.3, 0.3,2);
    this.env.setRange(0.7,0);
    this.osc.amp(this.env);


    this.filterL = new p5.LowPass();
    this.filterH = new p5.HighPass();
    this.filterM = new p5.BandPass();

    this.osc.disconnect();
    this.osc.connect(this.filterL);
    this.filterL.disconnect();
    this.filterL.connect(this.filterH);
    this.filterH.disconnect();
    this.filterH.connect(this.filterM);
    this.filterL.freq(1800);
    this.filterH.freq(1500);
    this.filterM.freq(freq);
    this.filterL.res(1);
    this.filterH.res(1);
    this.filterM.res(q);

    this.filterM.freq(lfo);
  }

  playNoise(){
    this.osc.start();
    this.env.triggerAttack(0);
    if(sustainState == 1){
        oscArray.push(this);
    }
  }

}
function lfoAmp(){
  //los sliders mandan un string como valor, hay que convertitlo
    var ampString = document.getElementById("ampSldr").value;
    lfoamp = Number(ampString);
    lfo.amp(lfoamp);
    console.log(lfoamp);
    document.getElementById("ampTxt").innerHTML = ampString;
}

function lfoFreq(){
    var freqString = document.getElementById("freqSldr").value;
    lfofreq = Number(freqString);
    lfo.freq(lfofreq);
    console.log(lfofreq);
    document.getElementById("freqTxt").innerHTML = freqString;
}

function noiseQ(){
  var qString = document.getElementById("qSldr").value;
  document.getElementById("qTxt").innerHTML = qString;
  filterQ = Number(qString);
}

function clickRec(){
  recState++;
  if(recState==1){
    document.getElementById("recBtn").innerHTML = "ON";
    document.getElementById("recBtn").style.color = "#041e37";
    recorder = new p5.SoundRecorder();
    recorder.setInput(masterOutput);
    soundFile = new p5.SoundFile();
    recorder.record(soundFile);
  }
  else if(recState==2){
      document.getElementById("recBtn").innerHTML = "OFF";
      document.getElementById("recBtn").style.color = "#041e37";
      recorder.stop();
      saveSound(soundFile, 'myWind.wav');
      recState = 0;
  }
}

function sustain(){
  if(sustainState ==0){
    sustainState =1}
    else if(sustainState ==1){
      sustainState =0
    }
}
