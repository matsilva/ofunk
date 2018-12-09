const program = require('commander');

program
    .version('0.1.0')
    .command('create [videoType]', 'create a video with a given type, ie: slideshow')
    .parse(process.argv);
