import {
    Ocean
} from '@oceanprotocol/squid'

import {
    keeperScheme,
    keeperHost,
    keeperPort,
    providerScheme,
    providerHost,
    providerPort
} from '../../config/ocean'

export async function provideOcean() {
    const nodeUri = `${keeperScheme}://${keeperHost}:${keeperPort}`
    const providerUri = `${providerScheme}://${providerHost}:${providerPort}/api/v1/provider`

    const ocean = await new Ocean({
        // todo: change this when the new interface of metmask is released
        web3Provider: global.web3 ? global.web3.currentProvider : null,
        // this is just a fallback in case web3 is not injected
        nodeUri,
        providerUri
    })

    return { ocean }
}
