import { CONFIGS, ERRORS } from 'app/lib'

import { SERVER } from 'app/core'
import { ROUTES } from 'app/routes'

SERVER
    .route(ROUTES)
    .start(CONFIGS.HTTP_SERVER.PORT)
