/* eslint-disable import/no-cycle */
// @todo fix cycle dep
import inquirer from 'inquirer';
import { SUPPORTED_PLATFORMS } from '../core/constants';
import { updateProjectPlatforms } from '../core/platformManager';
import { logTask } from '../core/systemManager/logger';


export const taskRnvPlatformSetup = async (c, parentTask, originTask) => {
    logTask('taskRnvPlatformSetup', `parent:${parentTask} origin:${originTask}`);

    const currentPlatforms = c.files.project.config.defaults?.supportedPlatforms || [];

    const { inputSupportedPlatforms } = await inquirer.prompt({
        name: 'inputSupportedPlatforms',
        type: 'checkbox',
        pageSize: 20,
        message: 'What platforms would you like to use?',
        validate: val => !!val.length || 'Please select at least a platform',
        default: currentPlatforms,
        choices: SUPPORTED_PLATFORMS
    });

    updateProjectPlatforms(c, inputSupportedPlatforms);
};

export default {
    description: '',
    fn: taskRnvPlatformSetup,
    task: 'platform setup',
    params: [],
    platforms: [],
    skipPlatforms: true,
};