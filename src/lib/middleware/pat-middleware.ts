import { IUnleashConfig } from '../types';
import { IAuthRequest } from '../routes/unleash-types';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const patMiddleware = (
    { getLogger }: Pick<IUnleashConfig, 'getLogger'>,
    { userService }: any,
): any => {
    const logger = getLogger('/middleware/pat-middleware.ts');
    logger.debug('Enabling PAT middleware');

    return async (req: IAuthRequest, res, next) => {
        try {
            const apiToken = req.header('authorization');
            if (apiToken?.startsWith('user:')) {
                const user = await userService.getUserByPersonalAccessToken(
                    apiToken,
                );
                req.user = user;
                userService.addPATSeen(apiToken);
            }
        } catch (error) {
            logger.error(error);
        }
        next();
    };
};

export default patMiddleware;
