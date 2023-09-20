import FileSaver from 'file-saver';

import { surpriseMePrompts } from "../constants";


// Here we are trying to access the prompts created before in constants
// Since it is random we are fetching some random index and getting the prompt present in it
// if that is same as the entered one, we return it
export function getRandomPrompt(prompt) {
    const randomIndex = Math.floor(Math.random()*
    surpriseMePrompts.length);
    const randomPrompt = surpriseMePrompts[randomIndex];

    if(randomPrompt === prompt) return getRandomPrompt(prompt);

    return randomPrompt;
}

export async function downloadImage(_id, photo) {
    FileSaver.saveAs(photo, `download-${_id}.jpg`);
}