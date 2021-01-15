import fs from 'fs-extra';
import termImage from 'term-img';
import chalk from 'chalk';

import {cachePath} from './plugin';

// eslint-disable-next-line func-style
function fallback() {
    // do nothing
}

// eslint-disable-next-line func-style
function reporter(runner) {
    fs.outputFileSync(cachePath, JSON.stringify([]), 'utf8');

    runner.on('end', () => {
        const cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
        if (cache.length) {
            console.log(chalk.red(`\n  (${chalk.underline.bold('Snapshot Diffs')})`));

            cache.forEach(({
                diffRatio, diffPixelCount, diffOutputPath,
            }) => {
                console.log(
                    `\n  - ${diffOutputPath}\n    Screenshot was ${diffRatio *
            100}% different from saved snapshot with ${diffPixelCount} different pixels.\n`,
                );
                termImage(diffOutputPath, {fallback});
            });
        }

        fs.removeSync(cachePath);
    });
}

module.exports = reporter;
