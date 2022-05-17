/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { when } from "./animation.js";

async function pulsing() {
  this.classList.add("pulse");

  await when(this).ends("button-pulse");

  this.classList.remove("pulse");
}

export const button = document.querySelector("button");
export const label = document.querySelector("section label");

button.addEventListener("click", pulsing);

async function hideMessage() {
  label.classList.remove("fade-up-out", "fade-up-in");
  label.classList.add("fade-up-out");

  return await when(label).ends("fade-up-out");
}

async function showMessage() {
  label.classList.add("fade-up-in");

  await when(label).starts("fade-up-in");
}

export async function setMessage(text) {
  await hideMessage();

  await showMessage();

  label.innerText = text;
}
