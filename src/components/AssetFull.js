import React from 'react'
import PropTypes from 'prop-types'

import Button from '../components/Button'
import './AssetFull.css'

const AssetFull = ({
    abstract,
    datePeriod,
    stats,
    date,
    publisher,
    tools,
    url,
}) => {
    const urlHostname = new URL(url).hostname
    const changeClasses = stats.change.includes('-') ? 'asset__change negative' : 'asset__change positive'

    return (
        <div className="asset-full">
            <div className="asset-grid">
                <div className="asset-grid__col">
                    <div className="asset__stats">
                        <p><strong>{stats.accepted}</strong> of curators accepted</p>
                        <p><strong>{stats.rejected}</strong> of curators rejected</p>
                        <p><strong>{stats.challenged}</strong> times challenged</p>
                        <p><strong>{stats.purchased}</strong> times purchased</p>
                    </div>

                    <div className="asset__actions">
                        <Button>View data structure</Button>
                    </div>

                    <p>
                        <span className="asset__label">Publisher</span> { publisher }
                    </p>

                    <p>
                        <span className="asset__label">Published</span> { date }
                    </p>

                    {abstract && (
                        <p className="asset__abstract">
                            <span className="asset__label">Abstract</span> { abstract }
                        </p>
                    )}

                    {tools && (
                        <p className="asset__tools">
                            <span className="asset__label">Methods or Tools</span> { tools }
                        </p>
                    )}

                    {datePeriod && (
                        <p className="asset__date_period">
                            <span className="asset__label">Period of data gathering</span> { datePeriod }
                        </p>
                    )}

                    {url && (
                        <p className="asset__url">
                            <span className="asset__label">Url</span> <a href={url}>{ urlHostname }</a>
                        </p>
                    )}

                    <div className="asset__actions">
                        <Button primary>Purchase</Button>
                        <Button primary>Curate</Button>
                    </div>
                </div>
                <div className="asset-grid__col">
                    <div className="asset__graph__label">
                        <div className="asset__symbol">XYZ</div>
                        <div className="asset__graph__description">Supply & cost</div>
                    </div>

                    <p className="asset__graph">Look at me, I am a bonding curve</p>

                    <div className="asset__graph__label">
                        <div className={changeClasses}>{stats.change}</div>
                        <div className="asset__graph__description">Exchange rate history</div>
                    </div>

                    <p className="asset__graph">Look at me, I am a price graph</p>
                </div>
            </div>
        </div>
    )
}


AssetFull.propTypes = {
    abstract: PropTypes.string,
    date: PropTypes.string,
    datePeriod: PropTypes.string,
    publisher: PropTypes.string,
    stats: PropTypes.object, // eslint-disable-line
    tools: PropTypes.string,
    url: PropTypes.string,
}

AssetFull.defaultProps = {
    abstract: null,
    date: null,
    datePeriod: null,
    publisher: null,
    stats: null,
    tools: null,
    url: null,
}

export default AssetFull