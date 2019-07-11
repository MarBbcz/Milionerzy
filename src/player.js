import {Howl, Howler} from 'howler';
import MainThemeAudio from "./audio/Main Theme.mp3";
import CorrectAnswerAudio from "./audio/correct answer.mp3";
import WrongAnswerAudio from "./audio/wrong answer.mp3";
import FinalAnswerAudio from "./audio/final answer.mp3";


export const MainThemePlay = () => {
    const MainThemeSong = new Howl({
        src: [MainThemeAudio],
        loop: true
    });
    return MainThemeSong
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

