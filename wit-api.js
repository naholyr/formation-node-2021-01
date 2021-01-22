const analyze = ({ intents, entities }) => {
  const isThrowDice = intents.some(({ name }) => name === "throw_dice");

  if (!isThrowDice) return console.log("nope");

  if (!entities["wit$number:count"]?.length) {
    // Failed finding a count: should have found two sides roles
    const [{ value: count }, { value: sides = 6 }] = entities[
      "wit$number:sides"
    ];
    console.log({ count, sides });
  } else {
    const count = entities["wit$number:count"]?.[0]?.value ?? 1;
    const sides = entities["wit$number:sides"]?.[0]?.value ?? 6;
    console.log({ count, sides });
  }
};

/*
curl \
 -H 'Authorization: Bearer JJDAZQIGNWULDUPMPMC7FFNFJGB43ANJ' \
 'https://api.wit.ai/message?v=20210120&q=Jette%20neuf%20dés%20à%2012%20faces'
*/
analyze({
  text: "Jette neuf d\u00e9s \u00e0 12 faces",
  intents: [{ id: "781574035902989", name: "throw_dice", confidence: 1 }],
  entities: {
    "wit$number:sides": [
      {
        id: "160935265554628",
        name: "wit$number",
        role: "sides",
        start: 17,
        end: 19,
        body: "12",
        confidence: 0.9444,
        entities: [],
        type: "value",
        value: 12,
      },
    ],
    "wit$number:count": [
      {
        id: "405173817239357",
        name: "wit$number",
        role: "count",
        start: 6,
        end: 10,
        body: "neuf",
        confidence: 0.9647,
        entities: [],
        type: "value",
        value: 9,
      },
    ],
    "throw_dice:throw_dice": [
      {
        id: "513625452947938",
        name: "throw_dice",
        role: "throw_dice",
        start: 0,
        end: 5,
        body: "Jette",
        confidence: 0.9914,
        entities: [],
        value: "true",
        type: "value",
      },
    ],
  },
  traits: {},
});

/*
curl \
 -H 'Authorization: Bearer JJDAZQIGNWULDUPMPMC7FFNFJGB43ANJ' \
 'https://api.wit.ai/message?v=20210120&q=Jette%209D12'
*/
analyze({
  text: "Jette 9D12",
  intents: [{ id: "781574035902989", name: "throw_dice", confidence: 1 }],
  entities: {
    "wit$number:sides": [
      {
        id: "160935265554628",
        name: "wit$number",
        role: "sides",
        start: 6,
        end: 7,
        body: "9",
        confidence: 1,
        entities: [],
        type: "value",
        value: 9,
      },
      {
        id: "160935265554628",
        name: "wit$number",
        role: "sides",
        start: 8,
        end: 10,
        body: "12",
        confidence: 0.95,
        entities: [],
        type: "value",
        value: 12,
      },
    ],
    "throw_dice:throw_dice": [
      {
        id: "513625452947938",
        name: "throw_dice",
        role: "throw_dice",
        start: 0,
        end: 5,
        body: "Jette",
        confidence: 0.9831,
        entities: [],
        value: "true",
        type: "value",
      },
    ],
  },
  traits: {},
});

/*
curl \
 -H 'Authorization: Bearer JJDAZQIGNWULDUPMPMC7FFNFJGB43ANJ' \
 'https://api.wit.ai/message?v=20210120&q=Jette%20quatre%20dés'
*/

analyze({
  text: "Jette quatre d\u00e9s",
  intents: [{ id: "781574035902989", name: "throw_dice", confidence: 1 }],
  entities: {
    "wit$number:count": [
      {
        id: "405173817239357",
        name: "wit$number",
        role: "count",
        start: 6,
        end: 12,
        body: "quatre",
        confidence: 0.8687,
        entities: [],
        type: "value",
        value: 4,
      },
    ],
    "throw_dice:throw_dice": [
      {
        id: "513625452947938",
        name: "throw_dice",
        role: "throw_dice",
        start: 0,
        end: 5,
        body: "Jette",
        confidence: 0.9851,
        entities: [],
        value: "true",
        type: "value",
      },
    ],
  },
  traits: {},
});
