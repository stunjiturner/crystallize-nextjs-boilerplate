import Pusher from 'pusher';

const channels = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: 'eu'
});

export default (req, res) => {
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
        actions.push('Capture amount from customer');
        actions.push('Congratulate staff on completed sale');
        // Vipps capture
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
