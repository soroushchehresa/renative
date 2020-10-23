import { EngineManager, Constants, Logger, PlatformManager, SDKAndroid, SDKXcode } from 'rnv';

const { logErrorPlatform } = PlatformManager;
const { logTask } = Logger;
const {
    IOS,
    TVOS,
    ANDROID,
    ANDROID_TV,
    ANDROID_WEAR,
    TASK_PACKAGE,
    TASK_CONFIGURE,
    PARAMS
} = Constants;
const { packageBundleForXcode } = SDKXcode;
const { packageAndroid } = SDKAndroid;
const { executeOrSkipTask } = EngineManager;

export const taskRnvPackage = async (c, parentTask, originTask) => {
    logTask('taskRnvPackage', `parent:${parentTask}`);
    const { platform } = c;

    await executeOrSkipTask(c, TASK_CONFIGURE, TASK_PACKAGE, originTask);

    switch (platform) {
        case IOS:
        case TVOS:
            return packageBundleForXcode(c);
        case ANDROID:
        case ANDROID_TV:
        case ANDROID_WEAR:
            return packageAndroid(c);
        default:
            logErrorPlatform(c);
            return false;
    }
};

export default {
    description: 'Package source files into bundle',
    fn: taskRnvPackage,
    task: 'package',
    params: PARAMS.withBase(PARAMS.withConfigure()),
    platforms: [
        IOS,
        TVOS,
        ANDROID,
        ANDROID_TV,
        ANDROID_WEAR,
    ],
};