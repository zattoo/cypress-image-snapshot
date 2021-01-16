import fse from 'fs-extra';
import {promises as fsp} from 'fs';

(async () => {
    await fsp.rmdir('lib', {recursive: true});
    await fse.copy('src', 'lib');
    console.log('Copied');
})().catch((err) => {
    console.log(err);
    process.exit(1);
});
