/**
 * Copyright (c) 2018-present The Palmer Group
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
    MATCH,
    RECORD,
} from './constants';

const screenshotsFolder = Cypress.config('screenshotsFolder');
const updateSnapshots = Cypress.env('updateSnapshots') || false;
const failOnSnapshotDiff = typeof Cypress.env('failOnSnapshotDiff') === 'undefined';

/**
 * @param {SnapshotOptions} defaultOptions
 */
export const matchImageSnapshotCommand = (defaultOptions = {}) => {
    /**
     * @param {Cypress.PrevSubject} subject
     * @param {string | SnapshotOptions} [maybeName]
     * @param {SnapshotOptions} [commandOptions]
     */
    const match = (subject, maybeName, commandOptions) => {
        const options = {
            ...defaultOptions,
            ...((typeof maybeName === 'string' ? commandOptions : maybeName) || {}),
        };

        cy.task(MATCH, {
            screenshotsFolder,
            updateSnapshots,
            options,
        });

        const name = typeof maybeName === 'string' ? maybeName : undefined;
        const target = subject ? cy.wrap(subject) : cy;
        target.screenshot(name, options);

        return cy
            .task(RECORD)
            .then(
                (/** @type {SnapshotResults} */ snapshotResults) => {
                    if (
                        snapshotResults.pass ||
                        snapshotResults.added ||
                        snapshotResults.updated
                    ) {
                        return;
                    }

                    let message;

                    if (snapshotResults.diffSize) {
                        const {
                            receivedHeight,
                            baselineWidth,
                            baselineHeight,
                            receivedWidth,
                        } = snapshotResults.imageDimensions;

                        message = `Image size (${baselineWidth}x${baselineHeight}) different than saved snapshot size (${receivedWidth}x${receivedHeight}).\\nSee diff for details: ${snapshotResults.diffOutputPath}`;
                    } else {
                        message = `Image was ${snapshotResults.diffRatio * 100}% different from saved snapshot with ${snapshotResults.diffPixelCount} different pixels.\nSee diff for details: ${snapshotResults.diffOutputPath}`;
                    }

                    if (failOnSnapshotDiff) {
                        throw new Error(message);
                    } else {
                        Cypress.log({message});
                    }
                },
            );
    };

    return match;
};

/**
 *  Snapshot comparison command
 *
 * @param {string | SnapshotOptions } [maybeName]
 * @param {SnapshotOptions} [maybeOptions]
 */
export const addMatchImageSnapshotCommand = (
    maybeName = 'matchImageSnapshot',
    maybeOptions,
) => {
    const options = typeof maybeName === 'string' ? maybeOptions : maybeName;
    const name = typeof maybeName === 'string' ? maybeName : 'matchImageSnapshot';
    Cypress.Commands.add(
        name,
        {
            prevSubject: ['optional', 'element', 'window', 'document'],
        },
        matchImageSnapshotCommand(options),
    );
};

/** @typedef {import('./interfaces').SnapshotOptions} SnapshotOptions */
/** @typedef {import('./interfaces').SnapshotResults} SnapshotResults */
