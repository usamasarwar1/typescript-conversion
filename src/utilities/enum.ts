const Gender = {
  MALE: "MALE",
  FEMALE: "FEMALE",
  OTHER: "OTHER",
} as const;

const ContactType = {
  ADVERTISEMENT: "ADVERTISEMENT",
  PRIMARY: "PRIMARY",
  SECONDARY: "SECONDARY",
  USER: "USER",
} as const;

const TemplateType = {
  LOGIN: "LOGIN",
  FA: "2FA",
  FORGOT: "FORGOT",
  ADVERTISEMENT: "ADVERTISEMENT",
  ACCOUNT_LOCKED: "ACCOUNT_LOCKED",
  VERIFICATION: "VERIFICATION",
  LOCKED: "LOCKED",
} as const;

const Language = {
  EN_GB: "en-gb",
  EN_IN: "en-in",
} as const;

const PrivacyType = {
  PUBLIC: "PUBLIC",
  RESTRICTPUBLIC: "RESTRICTPUBLIC",
  PRIVATE: "PRIVATE",
} as const;

const SocialMediaType = {
  FACEBOOK: "FACEBOOK",
  GOOGLE: "GOOGLE",
  APPLE: "APPLE",
} as const;

const UserType = {
  BUYER: "BUYER",
  SELLER: "SELLER",
} as const;

const ImageEntityType = {
  PROFILE: "PROFILE",
  COVER: "COVER",
  ADPROFILE: "ADPROFILE",
  ADSLIDERS: "ADSLIDERS",
  ADCONTACTS: "ADCONTACTS",
  ADGALLERYS: "ADGALLERYS",
  ADDEALS: "ADDEALS",
  ADPAGES: "ADPAGES",
  ADEBANNERS: "ADEBANNERS",
  ADDTODAYSPROMOTIONS: "ADDTODAYSPROMOTIONS",
  SHORTCUTS: "SHORTCUTS",
  ADVERTISEMENT: "ADVERTISEMENT",
  MYDEALS: "MYDEALS",
  DEALMESSAGEIMAGE: "DEALMESSAGEIMAGE",
  ADPROMOTIONS: "ADPROMOTIONS",
} as const;

const MenuManagementType = {
  MOBILE: "MOBILE",
  WEB: "WEB",
} as const;

const StageType = {
  LOCATION_SLIDER: "LOCATION_SLIDER",
  CONTACT_CATEGORIES: "CONTACT_CATEGORIES",
  SERVICES: "SERVICES",
  PAGE_SECTION_GALLERY: "PAGE_SECTION_GALLERY",
  DEALS: "DEALS",
} as const;

const StageDetail = {
  PUBLISH: "PUBLISH",
  DRAFT: "DRAFT",
} as const;

const ServiceType = {
  DAILY_SERVICE: "DAILY_SERVICE",
  WEEKEND_SERVICE: "WEEKEND_SERVICE",
  CUSTOM_SERVICE: "CUSTOM_SERVICE",
  _24BAR7: "24BAR7",
} as const;

const ValidityType = {
  DAYS: "DAYS",
  MONTH: "MONTH",
  YEAR: "YEAR",
} as const;

const AdvertisementContactType = {
  PRIMARY: "PRIMARY",
  SECONDARY: "SECONDARY",
  ADVERTISEMENT: "ADVERTISEMENT",
  USER: "USER",
} as const;

const ServiceDayType = {
  SUNDAY: "SUNDAY",
  MONDAY: "MONDAY",
  TUESDAY: "TUESDAY",
  WEDNESDAY: "WEDNESDAY",
  THURSDAY: "THURSDAY",
  FRIDAY: "FRIDAY",
  SATURDAY: "SATURDAY",
} as const;

const PageContentType = {
  TEXT: "TEXT",
  IMAGE: "IMAGE",
} as const;

const TypeOfDeal = {
  BUY_SELL_PRODUCT: "BUY_SELL_PRODUCT",
  BOOK_A_SERVICE: "BOOK_A_SERVICE",
  BOOK_AN_ORDER: "BOOK_AN_ORDER",
  OTHERS: "OTHERS",
} as const;

const TypeOfField = {
  DROP_DOWN: "DROP_DOWN",
  MULTI_DROP_DOWN: "MULTI_DROP_DOWN",
  GRID: "GRID",
  TEXT_FIELD: "TEXT_FIELD",
  TIME_DATE_PICKER: "TIME_DATE_PICKER",
} as const;

const Currency = {
  INR: "INR",
  EURO: "EURO",
  USD: "USD",
} as const;

const PaymentMethod = {
  CARD: "CARD",
  CASH: "CASH",
} as const;

const FeedType = {
  CATEGORY: "CATEGORY",
  SLIDER: "SLIDER",
} as const;

const PageType = {
  ADVERTISEMENT: "ADVERTISEMENT",
  PROMOTION: "PROMOTION",
  EBANNER: "EBANNER",
} as const;

const PromotionType = {
  IMAGE: "IMAGE",
  CONTENT: "CONTENT",
} as const;

const PromotionBy = {
  INSTANT: "INSTANT",
  DATE: "DATE",
  DAY: "DAY",
} as const;

const PromotionStatus = {
  STARTED: "STARTED",
  PAUSED: "PAUSED",
  FINISHED: "FINISHED",
  SCHEDULED: "SCHEDULED",
  CREATED: "CREATED",
} as const;

const CommentType = {
  ADVERTISEMENT: "ADVERTISEMENT",
  PROMOTION: "PROMOTION",
} as const;

const SocketType = {
  TEXT: "TEXT",
  LINK: "LINK",
  IMAGE: "IMAGE",
} as const;

const MakeDealStatus = {
  INITIATE: "INITIATE",
  APPROVED: "APPROVED",
  ON_PROGRESS: "ON_PROGRESS",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

const MakeDealActionStatus = {
  REQUEST: "REQUEST",
  WITHDRAW: "WITHDRAW",
  ACCEPT: "ACCEPT",
  CANCEL: "CANCEL",
  REJECT: "REJECT",
  DEFAULT: "DEFAULT",
} as const;

const MakeDealPaymentMethod = {
  CARD: "CARD",
  CASH: "CASH",
} as const;

const MakeDealPaymentRequestStatus = {
  SENT: "SENT",
  REQUEST: "REQUEST",
  WITHDRAW: "WITHDRAW",
  CONFIRM: "CONFIRM",
  CANCEL: "CANCEL",
  NOT_RECEIVED: "NOT_RECEIVED",
  REQUEST_PROOF: "REQUEST_PROOF",
  ISSUE_OCCURED: "ISSUE_OCCURED",
  RESEND: "RESEND",
} as const;

const MakeDealMessageType = {
  CONVERSATION: "CONVERSATION",
  CHANGE_STATE_REQUEST: "CHANGE_STATE_REQUEST",
  CHANGE_STATE_RESPONSE: "CHANGE_STATE_RESPONSE",
} as const;

const StateChangeType = {
  EDITED: "EDITED",
  SEEN: "SEEN",
  DELETED: "DELETED",
} as const;

export {
  Gender,
  ContactType,
  PrivacyType,
  TemplateType,
  Language,
  SocialMediaType,
  UserType,
  ImageEntityType,
  MenuManagementType,
  StageType,
  StageDetail,
  ServiceType,
  ValidityType,
  AdvertisementContactType,
  ServiceDayType,
  PageContentType,
  TypeOfDeal,
  TypeOfField,
  Currency,
  PaymentMethod,
  FeedType,
  PageType,
  PromotionType,
  PromotionBy,
  PromotionStatus,
  CommentType,
  SocketType,
  MakeDealStatus,
  MakeDealActionStatus,
  MakeDealPaymentMethod,
  MakeDealPaymentRequestStatus,
  MakeDealMessageType,
  StateChangeType,
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
