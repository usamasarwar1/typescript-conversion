interface CategoryInfo {
  readonly CATEGORY_ID_NOT_VALID: string;
  readonly CREATE_CATEGORY: string;
  readonly UPDATE_CATEGORY: string;
  readonly GET_CATEGORY: string;
  readonly LIST_CATEGORY: string;
  readonly DELETE_CATEGORY: string;
  readonly DELETE_CATEGORY_Id: string;
  readonly DELETE_FOLLOWED_CATEGORY: string;
  readonly DELETE_USER_CATEGORY: string;
  readonly GET_ALL_CHILD_CATEGORY: string;
  readonly PARENT_CATEGORY_ID_NOT_VALID: string;
  readonly SOME_CATEGORY_ALREADY_FOLLOWED: string;
  readonly SOME_CATEGORY_ALREADY_UNFOLLOWED: string;
  readonly THIS_CATEGORY_ALREADY_FOLLOWED: string;
  readonly THIS_CATEGORY_ALREADY_UNFOLLOWED: string;
  readonly THIS_USER_CATEGORY_FOLLOWED: string;
  readonly THIS_USER_CATEGORY_UNFOLLOWED: string;
  readonly GET_LIST_CATEGORY_FOLLOWED: string;
  readonly GET_ALL_PARENT_AND_CHILD: string;
}

const categoryInfo: CategoryInfo = {
  CATEGORY_ID_NOT_VALID: "Category id is not valid",
  CREATE_CATEGORY: "Create Category",
  UPDATE_CATEGORY: "Update Category",
  GET_CATEGORY: "Category Details",
  LIST_CATEGORY: "List of Category",
  DELETE_CATEGORY: "Delete Category",
  DELETE_CATEGORY_Id: "Deleted Category",
  DELETE_FOLLOWED_CATEGORY: "Deleted Followed Category",
  DELETE_USER_CATEGORY: "Deleted User Category",
  GET_ALL_CHILD_CATEGORY: "Get all child Category",
  PARENT_CATEGORY_ID_NOT_VALID: "Parent category id is not valid",
  SOME_CATEGORY_ALREADY_FOLLOWED: "Some Categories already followed",
  SOME_CATEGORY_ALREADY_UNFOLLOWED: "Some Categories already unfollowed",
  THIS_CATEGORY_ALREADY_FOLLOWED: "This Categories already followed",
  THIS_CATEGORY_ALREADY_UNFOLLOWED: "This Categories already unfollowed",
  THIS_USER_CATEGORY_FOLLOWED: "Users Categories Followed Successfully",
  THIS_USER_CATEGORY_UNFOLLOWED: "This users unfollowed Categories",
  GET_LIST_CATEGORY_FOLLOWED: "Get followed categories list",
  GET_ALL_PARENT_AND_CHILD: "Get All Parent Categories And Child Categories",
};

export { categoryInfo };
