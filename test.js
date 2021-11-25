const fs = require("fs");
const readline = require("readline");
const PARTICIPANTS_FILE = "participants.txt";
const CONDITION_NAMES = {
    "1": "RapidStandard",
    "2": "RapidRandom",
    "3": "BlitzStandard",
    "4": "BlitzRandom"
};

let participants;

async function readIds() {
    const ids = [];
    const stream = fs.createReadStream(IDS_FILE);
    const rl = readline.createInterface({
        input: stream
    });

    for await (const line of rl) {
        ids.push(line);
    }
    return ids;
}

async function readParticipants() {
    const subjects = [];
    const stream = fs.createReadStream(PARTICIPANTS_FILE);
    const rl = readline.createInterface({
        input: stream
    });
    let items;

    for await (const line of rl) {
        items = line.split(",");
        subjects.push({
            id: items[0].trim(),
            conditionCode: parseInt(items[1], 10),
            conditionName: CONDITION_NAMES[items[1].trim()]
        });
    }
    return subjects;
}

function validId(id){
    return participants.some(participant => participant.id === id);
}

function getParticipantFromId(id){
    return participants.find(participant => participant.id === id);
}

async function run(){
    participants = await readParticipants();
    console.log(participants);
    console.log(validId("SApA"));
    console.log(validId("Jf7C"));
    console.log(validId("as12"));
    console.log(validId("clSo"));
    console.log(getParticipantFromId("SApA"));
    console.log(getParticipantFromId("clSo"));
    console.log(getParticipantFromId("abcd"));
}

run();