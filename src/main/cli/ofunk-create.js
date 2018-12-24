const program = require('commander');
const create = require('../create');

program.option('-c, --config <path>', 'set the video config json.');

program.on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('  $ ofunk create slideshow -c /path/to/file.json');
});

program.parse(process.argv);

const VIDEO_TYPES = {
    SLIDESHOW: 'slideshow',
    MEME: 'meme'
};

const videoType = program.args[0];

runCreate();

async function runCreate() {
    let err;
    switch (videoType) {
        case VIDEO_TYPES.SLIDESHOW:
            err = await create.slideShow(program.config);
            break;

        case VIDEO_TYPES.MEME:
            err = await create.meme(program.config);
            break;

        default:
            console.log('Please specify a video type, to see examples run:');
            console.log('$ ofunk help create');
            break;
    }

    if (err) {
        console.log(err);
        process.exit(1);
    }
}

// ofunk make slideshow
