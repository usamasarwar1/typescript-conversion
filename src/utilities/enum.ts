const gender = ["MALE", "FEMALE", "OTHER"] as const;

const contact_type = ["ADVERTISEMENT", "PRIMARY", "SECONDARY", "USER"] as const;

const template_type = [
  "LOGIN",
  "2FA",
  "FORGOT",
  "ADVERTISEMENT",
  "ACCOUNT_LOCKED",
  "VERIFICATION",
  "LOCKED",
] as const;

const language = ["en-gb", "en-in"] as const;

const privacy_type = ["PUBLIC", "RESTRICTPUBLIC", "PRIVATE"] as const;

const social_media_type = ["FACEBOOK", "GOOGLE", "APPLE"] as const;

const user_type = {
  BUYER: "BUYER",
  SELLER: "SELLER",
} as const;

const image_entity_type = [
  "PROFILE",
  "COVER",
  "ADPROFILE",
  "ADSLIDERS",
  "ADCONTACTS",
  "ADGALLERYS",
  "ADDEALS",
  "ADPAGES",
  "ADEBANNERS",
  "ADDTODAYSPROMOTIONS",
  "SHORTCUTS",
  "ADVERTISEMENT",
  "MYDEALS",
  "DEALMESSAGEIMAGE",
  "ADPROMOTIONS",
] as const;

const menu_management_type = ["MOBILE", "WEB"] as const;

const stage_type = [
  "LOCATION_SLIDER",
  "CONTACT_CATEGORIES",
  "SERVICES",
  "PAGE_SECTION_GALLERY",
  "DEALS",
] as const;

const stage_detail = ["PUBLISH", "DRAFT"] as const;

const service_type = [
  "DAILY_SERVICE",
  "WEEKEND_SERVICE",
  "CUSTOM_SERVICE",
  "24BAR7",
] as const;

const validity_type = ["DAYS", "MONTH", "YEAR"] as const;

const advertisement_contact_type = [
  "PRIMARY",
  "SECONDARY",
  "ADVERTISEMENT",
  "USER",
] as const;

const service_day_type = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
] as const;

const page_content_type = ["TEXT", "IMAGE"] as const;

const advertisementDealsEnum = {
  type_of_deal: [
    "BUY_SELL_PRODUCT",
    "BOOK_A_SERVICE",
    "BOOK_AN_ORDER",
    "OTHERS",
  ] as const,
  type_of_field: [
    "DROP_DOWN",
    "MULTI_DROP_DOWN",
    "GRID",
    "TEXT_FIELD",
    "TIME_DATE_PICKER",
  ] as const,
  currency: ["INR", "EURO", "USD"] as const,
  payment_method: ["CARD", "CASH"] as const,
};

const feedEnum = {
  type: ["CATEGORY", "SLIDER"] as const,
  page: ["ADVERTISEMENT", "PROMOTION", "EBANNER"] as const,
};

const promotion = {
  type: ["IMAGE", "CONTENT"] as const,
  by: ["INSTANT", "DATE", "DAY"] as const,
  status: ["STARTED", "PAUSED", "FINISHED", "SCHEDULED", "CREATED"] as const,
  repeat: [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ] as const,
};

const commentType = {
  type: ["ADVERTISEMENT", "PROMOTION"] as const,
};

const socket = {
  type: ["TEXT", "LINK", "IMAGE"] as const,
};

const makeDeal = {
  status: [
    "INITIATE",
    "APPROVED",
    "ON_PROGRESS",
    "COMPLETED",
    "CANCELLED",
  ] as const,
  action_status: [
    "REQUEST",
    "WITHDRAW",
    "ACCEPT",
    "CANCEL",
    "REJECT",
    "DEFAULT",
  ] as const,
  payment_method: ["CARD", "CASH"] as const,
  payment_request_status: [
    "SENT",
    "REQUEST",
    "WITHDRAW",
    "CONFIRM",
    "CANCEL",
    "NOT_RECEIVED",
    "REQUEST_PROOF",
    "ISSUE_OCCURED",
    "RESEND",
  ] as const,
  messages: ["CONVERSATION", "CHANGE_STATE"] as const,
  messages_type: {
    CONVERSATION: "CONVERSATION",
    CHANGE_STATE_REQUEST: "CHANGE_STATE_REQUEST",
    CHANGE_STATE_RESPONSE: "CHANGE_STATE_RESPONSE",
  } as const,
};

const state_change_type = {
  EDITED: "EDITED",
  SEEN: "SEEN",
  DELETED: "DELETED",
} as const;

export {
  gender,
  contact_type,
  privacy_type,
  template_type,
  language,
  social_media_type,
  user_type,
  image_entity_type,
  menu_management_type,
  stage_type,
  stage_detail,
  service_type,
  validity_type,
  advertisement_contact_type,
  service_day_type,
  page_content_type,
  advertisementDealsEnum,
  feedEnum,
  promotion,
  commentType,
  makeDeal,
  socket,
  state_change_type,
};

export const get_enum_by_value = (enumJ: any, value: any) => {
  for (const k in enumJ) if (enumJ[k] === value) return k;
  return null;
};

export const get_enum_values = (enumJ: any) => {
  const enum_values: any[] = [];
  for (const k in enumJ) enum_values.push(enumJ[k]);

  if (enum_values && enum_values.length > 0) return enum_values;

  return null;
};
