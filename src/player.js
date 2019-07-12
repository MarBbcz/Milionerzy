import {Howl, Howler} from 'howler';
import MainThemeAudio from "./audio/Main Theme.mp3";
import CorrectAnswerAudio from "./audio/correct answer.mp3";
import WrongAnswerAudio from "./audio/wrong answer.mp3";
import FinalAnswerAudio from "./audio/final answer.mp3";
import StartThemeAudio from "./audio/Start Theme.mp3";
import ClosingThemeAudio from "./audio/Closing Theme.mp3";
import FiftyFiftyThemeAudio from "./audio/5050.mp3";

export const StartThemePlay = () => {
    const StartThemeSong = new Howl({
        src: [StartThemeAudio],
        loop: true,
        volume: 0.5,
    });
    return StartThemeSong
};

let main;
export const MainThemePlay = () => {
    if (!main){
        main = new Howl({
            src: [MainThemeAudio],
            loop: true,
            volume: 0.3
        });
    }

    return main;
};

let closing;
export const ClosingThemePlay = () => {
    if (!closing){
        closing = new Howl({
            src: [ClosingThemeAudio],
            volume: 0.3
        });
    }

    return closing;
};

let fiftyFifty;
export const FiftyFiftyThemePlay = () => {
    if (!fiftyFifty){
        fiftyFifty = new Howl({
            src: [FiftyFiftyThemeAudio],
            volume: 0.7
        });
    }

    return fiftyFifty;
};


export const CorrectAnswerPlay = () => {
    const CorrectAnswerSong = new Howl({
        src: [CorrectAnswerAudio]
    });
    return CorrectAnswerSong
};

export const WrongAnswerPlay = () => {
    const WrongAnswerSong = new Howl({
        src: [WrongAnswerAudio]
    });
    return WrongAnswerSong
};

export const FinalAnswerPlay = () => {
    const FinalAnswerSong = new Howl({
        src: [FinalAnswerAudio]
    });
    return FinalAnswerSong
};

