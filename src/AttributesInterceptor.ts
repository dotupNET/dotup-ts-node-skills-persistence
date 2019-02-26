import { HandlerInput, RequestInterceptor } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { ResponseInterceptor } from 'ask-sdk-runtime';
import { IRequestAttributes } from 'dotup-ts-node-skills';

/**
 * This interceptor laods on each request data into IRequestAttributes.persistentAttributes
 */
export class LoadAttributesInterceptor implements RequestInterceptor {

  async process(handlerInput: HandlerInput): Promise<void> {
    if (handlerInput.requestEnvelope.session.new) {
      const r = <IRequestAttributes>handlerInput.attributesManager.getRequestAttributes();
      const fromDb = await handlerInput.attributesManager.getPersistentAttributes();
      r.persistentAttributes = fromDb === undefined ? {} : fromDb;
    }
  }

}

/**
 * If IRequestAttributes.persistentAttributes not is undefined, the data ist stored
 * with the configured persistence adapter
 */
export class SaveAttributesInterceptor implements ResponseInterceptor<HandlerInput, Response> {

  async process(input: HandlerInput, response?: Response): Promise<void> {

    // Presistent session attributes
    const r = <IRequestAttributes>input.attributesManager.getRequestAttributes();

    if (r.savePersistentAttributes && r.persistentAttributes !== undefined) {
      Object.keys(r.persistentAttributes)
        .forEach(item => {
          input.attributesManager.setPersistentAttributes({ [item]: r.persistentAttributes[item] });
        });
      await input.attributesManager.savePersistentAttributes();
    }
  }

}
