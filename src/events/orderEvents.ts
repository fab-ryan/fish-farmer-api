import Events from 'events';

import Database, { Order } from '../database';
import { logger, SocketServer } from '../utils';

const orderEvents = new Events.EventEmitter();

const eventsState = {
  orderCreated: 'orderCreated',
  orderUpdated: 'orderUpdated',
  orderDeleted: 'orderDeleted',
};
const io = SocketServer.getInstance();

orderEvents.on(eventsState.orderCreated, async (order: Order) => {
  try {
    const payloadOfNotification = {
      order,
      message: 'Order created successfully',
    };
    const orderNotification = await Database.Notification.create({
      user_id: order.user_id,
      type: 'order',
      title: 'Order Created',
      message: payloadOfNotification.message,
      is_read: false,
      createdAt: new Date(),
    });

    io.emit('orderNotification', orderNotification);
  } catch (error) {
    io.emit('error', error);
    logger.error(error);
  }
});
