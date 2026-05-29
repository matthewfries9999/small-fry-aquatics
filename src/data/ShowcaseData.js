import thirtySixGallon from "../assets/thirtySixGallon.jpg";
import tenGallon1 from "../assets/tenGallon1.png";
import tenGallon2 from "../assets/tenGallon2.png";
import tankVideo from "../assets/tankVideo.mp4";
import babyShrimp from '../assets/babyShrimp.png'
import shrimpVideo from '../assets/shrimpVideo.mp4'

export const showcaseItems = [
    {
        src: thirtySixGallon,
        type: "image",
        title: "My 36 gallon community tank",
        description:
            "I am running CO2 and also using a high-tech light. " +
            "For a filter I am using a Fluval 207. The tank features Neon Tetras, Ember Tetras, Albino Corydoras," +
            " Guppies, several types of snails, and some Amano Shrimp.",
    },
    {
        src: tenGallon1,
        type: "image",
        title: "My 10 gallon snail tank",
        description:
            "My first tank! I use it now mainly to breed Bladder and Pond snails. There is also a dwarf sag carpet growing steadily.",
    },
    {
        src: tenGallon2,
        type: "image",
        title: "My 10 gallon caridina tank",
        description:
            "This tank houses my caridina shrimp. There are both Blue Bolt and Orange Sun caridina in the tank. I am excited to see" +
            " what their offspring looks like a few generations down the line! ",
    },
    {
        src: tankVideo,
        type: "video",
        title: "A video of my community tank",
        description:
            "My 36 gallon tank featured in the first image.",
    },
];

export const shrimpShowcase = [
    {
        src: babyShrimp,
        type: "image",
    },
    {
        src: shrimpVideo,
        type: "video",
    },
];