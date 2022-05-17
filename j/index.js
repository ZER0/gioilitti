/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { setMessage, button, label } from "./ui.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const once = (el, eventName) =>
  new Promise((resolve) =>
    el.addEventListener(eventName, resolve, { once: true })
  );

if (speechSynthesis.getVoices().length === 0) {
  await once(speechSynthesis, "voiceschanged");
}

const voice = speechSynthesis
  .getVoices()
  .find((voice) => voice.lang === "it-IT");

await delay(250);

document.querySelector("main").classList.add("fade-up-in");

const re =
  /Triste (lavorare|((lavorare|fare qualunque cosa) senza la prospettiva di un gelato di Giolitti (dopo|quando esco)))\./;
const randexp = new RandExp(re);

button.addEventListener("click", async () => {
  let line = randexp.gen();
  setMessage(line);
  button.disabled = true;
  let ssu = new SpeechSynthesisUtterance(line);
  ssu.voice = voice;
  await delay(300);
  speechSynthesis.speak(ssu);
  await once(ssu, "end");
  button.disabled = false;
});
