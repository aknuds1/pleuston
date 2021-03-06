import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Empty from '../atoms/Empty'
import Order from './Order'
import './OrderList.scss'

const OrderList = ({
    orders,
    handleClick
}) => (
    orders.length ? (
        <Fragment>
            <div className="orders assets">
                {orders.map(order => (
                    <div
                        className="orders__tile assets__tile assets_count"
                        key={order._id}
                        onClick={() => handleClick(order)}
                        onKeyPress={() => handleClick(order)}
                        role="link"
                        tabIndex={0}>
                        <Order order={order} />
                    </div>
                ))}
            </div>
        </Fragment>
    ) : (
        <Empty title="No purchases so far :-(" text="Buy some datasets then you can see the order status here.?" />
    )
)

OrderList.propTypes = {
    orders: PropTypes.array.isRequired,
    handleClick: PropTypes.func.isRequired
}

export default OrderList
