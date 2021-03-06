/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

class AnimationHandler {
  constructor(element) {
    this.element = element;
  }

  starts(name) {
    return new Promise((resolve) =>
      this.element.addEventListener(
        "animationstart",
        (e) => {
          if (e.animationName === name) {
            resolve();
          }
        },
        { once: true }
      )
    );
  }

  ends(name) {
    return new Promise((resolve) =>
      this.element.addEventListener(
        "animationend",
        (e) => {
          if (e.animationName === name) {
            resolve();
          }
        },
        { once: true }
      )
    );
  }
}

export const when = (el) => new AnimationHandler(el);
