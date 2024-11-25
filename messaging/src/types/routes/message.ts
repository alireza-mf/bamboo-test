import { RequestHandler } from "../index.js";

// *****************************************************

export type ICreateMessageBody = {
  receiverId: string;
  content: string;
};
export type ICreateMessageRes = {
};

/**
 * @method POST
 * @route /message/
 */
export type ICreateMessageApi = RequestHandler<{}, ICreateMessageRes, ICreateMessageBody>;

// *****************************************************

export type IGetMessagesParam = {
  senderId: string;
};
export type IGetMessagesRes = {
  messages: any;
};

/**
 * @method POST
 * @route /message/:senderId
 */
export type IGetMessagesApi = RequestHandler<IGetMessagesParam, IGetMessagesRes>;
