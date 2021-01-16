/// <reference types="Cypress" />

import {SnapshotOptions} from './src/interfaces';

declare global {
    namespace Cypress {
        interface Chainable {
            matchImageSnapshot(name?: string, options?: SnapshotOptions): void;
        }
    }
}
