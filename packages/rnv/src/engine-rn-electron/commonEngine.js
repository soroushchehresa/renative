import path from 'path';

import { getAppFolder, getTemplateDir } from '../core/common';
// import { logError } from '../core/systemManager/logger';
import { MACOS, WINDOWS, RNV_PROJECT_DIR_NAME } from '../core/constants';

export const getPlatformBuildDir = c => getAppFolder(c);

export const getPlatformOutputDir = (c) => {
    const dir = getPlatformBuildDir(c);
    return dir;
};

export const getTemplateProjectDir = (c) => {
    const dir = getTemplateDir(c);
    let output;
    switch (c.platform) {
        case MACOS:
        case WINDOWS:
            output = path.join(dir, RNV_PROJECT_DIR_NAME);
            break;
        default:
            output = dir;
    }
    return output;
};

export const getPlatformProjectDir = (c) => {
    const dir = getPlatformBuildDir(c);
    let output;
    switch (c.platform) {
        case MACOS:
        case WINDOWS:
            output = path.join(dir, RNV_PROJECT_DIR_NAME);
            break;
        default:
            output = dir;
    }
    return output;
};