import App from '../../app';
import { pubsub } from '../helpers/subscriptionManager.js';
import * as Classes from '../classes';

App.on('createdLongRange', ({ simulatorId, name }) => {
  const system = new Classes.LongRangeComm({ simulatorId, name });
  App.systems.push(system);
  pubsub.publish('longRangeCommunicationsUpdate', App.systems.filter(s => s.type === 'LongRangeCommunications'));
});
App.on('removedLongRange', ({ id }) => {
  App.systems = App.systems.filter(s => s.id !== id);
  pubsub.publish('longRangeCommunicationsUpdate', App.systems.filter(s => s.type === 'LongRangeCommunications'));
});
App.on('sentLongRangeMessage', ({ id, message, crew, decoded, sender }) => {
  App.systems.find(s => s.id === id).createMessage(message, crew, decoded, sender);
  pubsub.publish('longRangeCommunicationsUpdate', App.systems.filter(s => s.type === 'LongRangeCommunications'));
});
App.on('updatedLongRangeDecodedMessage', ({ id, messageId, decodedMessage, a, f }) => {
  console.log(id, messageId, App.systems.find(s => s.id === id))
  App.systems.find(s => s.id === id).updateDecodedMessage(id, messageId, decodedMessage, a, f);
  pubsub.publish('longRangeCommunicationsUpdate', App.systems.filter(s => s.type === 'LongRangeCommunications'));
});