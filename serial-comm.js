let lineBuffer = '';
let messages = [];
let latestValue = 0;

// if ('serial' in navigator) {
//   connectButton.enabled = true;
// }
// else {
//   const firstBubble = document.querySelector('p.bubble');
//   const noSerialSupportNotice = document.createElement('p');
//   noSerialSupportNotice.innerHTML = '<p class="notice bubble">You\'re on the right track! This browser is lacking support for Web Serial API, though, and thats a bummer.</p>';

//   firstBubble.parentNode.insertBefore(noSerialSupportNotice, firstBubble.nextSibling);
// }


async function getReader() {
  port = await navigator.serial.requestPort({});
  await port.open({ baudRate: 9600 });
  console.log(port);
  const appendStream = new WritableStream({
    write(chunk) {
      lineBuffer += chunk;

      let lines = lineBuffer.split('\r\n');


      if (lines.length > 1) {
        //let message = lines[0];
        //lines = lines.splice(1, lines.length - 1);
        lineBuffer = lines.pop();
        messages = messages.concat(lines);
        console.log(messages);
      }
    }
  });

  port.readable
    .pipeThrough(new TextDecoderStream())
    .pipeTo(appendStream);
}


function messageAvailable() {
  return messages.length > 0;
}


function getMessage() {
  let message = undefined;

  if (messages.length > 0) {
    message = messages[0];
    messages = messages.slice(1);
  }

  return message;
}

function sendMessage(message) {
  if (port != undefined && port.writable != undefined) {
    var enc = new TextEncoder();
    const writer = port.writable.getWriter();
  
    writer.write(enc.encode(message+"\n").buffer);
    writer.releaseLock();
  }
}




function simulateIncomingMessage(message) {
  messages.push(message);
}