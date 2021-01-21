"use strict";

function incr() {
  const x = 1;
  this.value += x;
}

const o1 = {
  value: 1,
  incr,
};

const o2 = {
  value: 42,
};

/*
o2.incr = o1.incr.bind(o2);

const incr2 = o2.incr.bind(o1);

incr2();

/*
o2.incr.call(o1);
o2.incr.apply(o1);
o1.incr.call(o1);
incr.call(o1);
*/

// console.log(o1.value, o2.value);

const object = {
  name: "Toto",
  getName: function () {
    return this.name;
  },
  // shorthand properties "prop()" === "prop: function()"
  sayHiLater() {
    // fonction 1
    // Ici, this sera (a priori) = object
    setTimeout(() => {
      // fonction 2
      // Mais là, c'est le this de la fonction 2, qui est défini…
      // … en fonction de la façon dont la fonction est appelée
      // c'est-à-dire loin, très loin, dans le code de setTimeout !
      console.log("Hi", this.getName()); // Plantera probablement
    });
  },
};

object.sayHiLater();
