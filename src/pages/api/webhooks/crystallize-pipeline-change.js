import Pusher from 'pusher';
import { getClient } from 'lib-api/payment-providers/vipps';
import { updateCrystallizeOrder } from 'lib-api/crystallize/order';

const channels = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: 'eu'
});

export default async (req, res) => {
  const {
    orders: { get: order }
  } = req.body;

  const inStages = order.pipelines.map(({ pipeline, stageId }) => ({
    pipeline: pipeline.name,
    stage: pipeline.stages?.find((s) => s.id === stageId)?.name
  }));

  console.log('Order pipeline update for', order.id);
  console.log('The order is in', inStages.length, 'pipeline(s)');
  console.log(inStages);

  const actions = [];

  const inStorePipeline = inStages.find(
    (p) => p.pipeline === 'In store pickup'
  );
  if (inStorePipeline) {
    switch (inStorePipeline.stage) {
      case 'New':
        actions.push('Notify staff of new order');
        break;
      case 'Packing':
        actions.push('Inform the user: packing begun');
        break;
      case 'Ready':
        actions.push('Inform the user: ready for pickup');
        break;
      case 'Delivered':
        // Vipps capture
        await getClient().capture({
          orderId: order.id,
          body: {
            merchantInfo: {
              merchantSerialNumber: process.env.VIPPS_MERCHANT_SERIAL
            },
            transaction: {
              amount: order.total.gross * 100,
              transactionText: 'Crystallize Boilerplate Test Transaction'
            }
          }
        });
        actions.push(`Captured ${order.total.gross} from customer`);

        await updateCrystallizeOrder({
          id: order.id,
          additionalInformation: JSON.stringify({
            status: 'CAPTURED'
          })
        });

        actions.push('Congratulate staff on completed sale');

        break;
    }
  }

  channels.trigger(
    'webhooks',
    'incoming-webhook',
    JSON.stringify({
      payload: req.body,
      actions
    })
  );

  res.send('received');
};
