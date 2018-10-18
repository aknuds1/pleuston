import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { OauthSender } from 'react-oauth-flow'
import Button from '../atoms/Button'
import CloudStorageModal from './CloudStorageModal'
import { ReactComponent as IconAzure } from '../../svg/azure.svg'
import { appId, tenantId, redirectHost, scope } from '../../../config/cloudStorage'

import styles from './CloudStorageActions.module.scss'

const authorizeUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize`

export default class CloudStorageActions extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this)
    }

    toggleModal() {
        this.setState({ isModalOpen: !this.state.isModalOpen })
    }

    toggleOauthPopup(url) {
        const windowObjectReference = window.open( // eslint-disable-line
            url,
            'Connect to Azure',
            'resizable,scrollbars,status,width=400,height=500'
        )
        return windowObjectReference
    }

    toggleAzure(e, url) {
        if (e !== undefined) {
            e.preventDefault()
        }
        const isConnected = window.localStorage.getItem('oauthAccounts') !== null

        if (isConnected) {
            this.toggleModal()
        } else {
            this.toggleOauthPopup(url)
        }
    }

    render() {
        const { linkSetter } = this.props

        return (
            <>
                <div className={styles.cloudstorage}>
                    <OauthSender
                        authorizeUrl={authorizeUrl}
                        clientId={appId}
                        redirectUri={`${redirectHost}/oauth/azure`}
                        args={{ response_type: 'token', scope }}
                        state={{ from: '/new' }}
                        render={({ url }) => (
                            <Button
                                link="true"
                                icon={IconAzure}
                                onClick={(e) => this.toggleAzure(e, url)}
                            >
                                Azure
                            </Button>
                        )}
                    />
                </div>

                <CloudStorageModal
                    isOpen={this.state.isModalOpen}
                    handleCloseModal={this.toggleModal}
                    linkSetter={linkSetter}
                />
            </>
        )
    }
}

CloudStorageActions.propTypes = {
    linkSetter: PropTypes.func.isRequired
}
