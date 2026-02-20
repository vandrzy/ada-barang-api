import { AccessTokenPayload, RefreshTokenPayload } from '../util/jwt';

declare global{
    namespace Express{
        interface Request{
            user?: AccessTokenPayload|RefreshTokenPayload;
        }
    }
}