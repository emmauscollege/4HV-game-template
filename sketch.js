// This example is also available online in the p5.js web editor:
// https://editor.p5js.org/gohai/sketches/X0XD9xvIR

let port;
let connectButton;

let frames = 0;
let ledIsAan = false;

function setup() {
  createCanvas(300, 600);

  // any other ports can be opened via a dialog after
  // user interaction (see connectBtnClick below)

  connectButton = createButton('Connect');
  connectButton.position(80, 200);
  connectButton.mousePressed(connectArduino);

  ledButton = createButton('Led');
  ledButton.position(80, 250);
  ledButton.mousePressed(toggleLed);
}

function draw() {
  background(175, 144, 105);
  
  // doe zolang er berichten voor je klaarstaan
  while (messageAvailable()) {
    // haal nieuw bericht op
    let message = getMessage();
    
    // mag je weghalen: print dit bericht in de console:
    console.log("ik ga aan de slag met:" + message);

    // verwerk bericht
    executeMessage(message)
  }
}

function executeMessage(message) {
  // splits het bericht in twee delen
  let delen = message.split(":");
  if (delen.length === 2) {
    // bericht heeft twee delen: commando en waarde
    // we kunnen hiermee aan de slag
    let commando = delen[0];
    let waarde = delen[1];

    if (commando === "melding") {
      alert("Melding van Arduino: " + waarde);
    }

    // vul aan met je eigen commando's en waarden


  }
  else {
    console.log("Het bericht heeft geen twee onderdelen: " + message);
  }


}

function toggleLed() {
  // check eerst of er een seriële verbinding met de Arduino is
  if (port) {
    if (ledIsAan === true) {
      // stuur bericht om led uit te zetten
      sendMessage("lod:0");
      ledIsAan = false;
    }
    else {
      // stuur bericht om led aan te zetten
      sendMessage("led:1");
      ledIsAan = true;
    }
  }
}

function connectArduino() {
  if (port) {
    port.close();
    port = undefined;

    connectButton.html("Connect");
  }
  else {
    getReader();
    connectButton.html("Disconnect");
  }
}
