import {
    Ocean
} from '@oceanprotocol/squid'

import {
    keeperScheme,
    keeperHost,
    keeperPort,
    aquariusScheme,
    aquariusHost,
    aquariusPort
} from '../../config/ocean'

export async function provideOcean() {
    const nodeUri = `${keeperScheme}://${keeperHost}:${keeperPort}`
    const aquariusUri = `${aquariusScheme}://${aquariusHost}:${aquariusPort}`

    const config = {
        // todo: change this when the new interface of metmask is released
        web3Provider: global.web3 ? global.web3.currentProvider : null,
        // this is just a fallback in case web3 is not injected
        nodeUri,
        aquariusUri
    }

    const ocean = Ocean.getInstance ? await Ocean.getInstance(config) : await new Ocean(config)

    return { ocean }
}
