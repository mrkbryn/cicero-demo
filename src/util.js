const monthDisplays = [
  "Jan", "Feb", "March", "Apr", "May",
  "Jun", "Jul", "Aug", "Sept", "Oct",
  "Nov", "Dec"
];

export const getMonthDisplayForIndex = (index) => {
  return monthDisplays[index];
}

export const getDateStringFromRangeValue = (value) => {
  // Note: the conversion is hardcoded for the specific Bitcoin scenario. To make
  // this dynamic, the earliest data (i.e. the time for range value 0) should be
  // passed to this function
  let month = (value % 12) + 1;
  let formattedMonth = ("0" + month).slice(-2);
  let year = 2011 + Math.trunc(value / 12);
  return `${year}-${formattedMonth}-01`; // yyyy-MM-dd
}

export const playVocalization = (msg) => {
  var synth = window.speechSynthesis;
  var voices = synth.getVoices();
  var voiceOutput = new SpeechSynthesisUtterance(msg);
  for (var i = 0; i < voices.length; i++) {
    if (voices[i].voiceURI === 'Google UK English Female') {
      voiceOutput.voice = voices[i];
      break;
    }
  }
  synth.speak(voiceOutput);
}

export const playSonification = (values) => {
  if (values.length === 0) {
    return;
  }
  console.log('Playing sonification for values ' + values);

  var minVal = Math.min(...values);
  var maxVal = Math.max(...values);
  var range = maxVal - minVal;

  var minimumFrequency = 220;
  var maximumFrequency = 780;

  console.log('Min Value: ', minVal);
  console.log('Max Value: ', maxVal);

  let audioCtx = new AudioContext();
  let oscillator = audioCtx.createOscillator();
  let millisecondsBetweenPitches = 500;

  // set timeouts to change frequency every 0.5 seconds
  for (var i = 0; i < values.length; i++) {
    let scaledFrequency = minimumFrequency + (maximumFrequency - minimumFrequency) * ((values[i] - minVal) / range);
    setTimeout(() => {
      oscillator.frequency.value = scaledFrequency
    }, millisecondsBetweenPitches * i);
  }

  oscillator.connect(audioCtx.destination);
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + (values.length / 2));
}
