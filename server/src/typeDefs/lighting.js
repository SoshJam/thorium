import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Lighting {
    intensity: Float
    action: LIGHTING_ACTION
    actionStrength: Float
    transitionDuration: Int
    useAlertColor: Boolean
    color: String
  }
  input LightingInput {
    intensity: Float
    action: LIGHTING_ACTION
    actionStrength: Float
    transitionDuration: Int
    useAlertColor: Boolean
    color: String
  }

  enum LIGHTING_ACTION {
    normal
    fade
    shake
    strobe
    oscillate
  }

  extend type Simulator {
    lighting: Lighting
  }
`;

// We define all of the resolvers necessary for
// the functionality in this file. These will be
// deep merged with the other resolvers.
const resolver = {
  Query: {},
  Mutation: {},
  Subscription: {
    templateUpdate: {
      resolve(rootQuery) {},
      subscribe: withFilter(
        () => pubsub.asyncIterator("templateUpdate"),
        (rootValue, args) => {
          return true;
        }
      )
    }
  }
};

export default { schema, resolver };
