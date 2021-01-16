/// <reference types="Cypress" />

import {MatchImageSnapshotOptions} from 'jest-image-snapshot';

type Options = Partial<Cypress.ScreenshotOptions> & MatchImageSnapshotOptions;

export interface SnapshotOptions extends Options {
    customSnapshotsDir?: string;
    customDiffDir?: string;
}

interface ImageDimensions {
    receivedHeight: number;
    receivedWidth: number;
    baselineHeight: number;
    baselineWidth: number;
}

export interface SnapshotResults {
    pass?: boolean;
    added?: boolean;
    updated?: boolean;
    diffSize?: boolean;
    imageDimensions?: ImageDimensions;
    diffRatio?: number;
    diffPixelCount?: number;
    diffOutputPath?: string;
    updateSnapshot?: boolean;
    diffDir?: string;
    imgSrcString?: string;
}

export interface MatchOptions {
    screenshotsFolder?: string;
    updateSnapshots?: string;
    options?: Options;
}
