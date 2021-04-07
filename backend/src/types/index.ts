import express from "express";

export interface IExpressReqWithUser extends express.Request {
  email: string;
  userId: number;
}

export interface IExpressReqAuthRoute extends express.Request {
  newRegistrations: boolean;
}

export interface IExpressReqNewRegistration extends express.Request {
  newRegistrations: boolean;
}

export interface IExpressReqToken extends express.Request {
  email: string;
  userId: number;
}

export interface IJWTToken {
  email: string;
  userId: number;
}

export interface IUser {
  id: number;
  email: string;
  password: string;
}

export interface IGroceryList {
  id: number;
  userId: number;
  name: string;
}

export interface IGroceryListItem {
  id: number;
  userId: number;
  groceryListId: number;
  name: string;
  checked?: string;
  oder?: number;
}

export interface IGroceryListItemChange {
  id: number;
  updatedField: string;
  newValue: string;
}

export interface IGetItemsLists {
  groceryListName: string;
  groceryListId: number;
  content: IGroceryListItem[];
}
