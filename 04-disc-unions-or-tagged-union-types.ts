/*
 * Lesson 4: Discriminating Unions or Tagged Union Types
 * 1. Tagged Union Types (Discriminating Unions)
 * 2. Discriminating Union Terminology
 * 3. Type Guards for Discriminating Unions
 */

// 1. Tagged Union Types
// what are they? => union types with a tag
interface Warning2 {
  text: string;
}
interface Debug {
  message: string;
}
interface Information {
  msg: string;
}
// aggregates three interfaces
type Log = Warning2 | Debug | Information;

// 2. Discriminating Unions Terminology

// to turn that into a tagged union, we need a common property
// that property serves a 'tag' for the type
// also called 'DISCRIMINATING UNION'
// subscribeToTheChannel is the 'DISCRIMINANT PROPERTY'

interface WarningTagged {
  text: string;
  subscribeToTheChannel: 'like';
}
interface DebugTagged {
  message: string;
  subscribeToTheChannel: 'comment';
}
interface InformationTagged {
  msg: string;
  subscribeToTheChannel: 'share';
}
type LogTagged = WarningTagged | DebugTagged | InformationTagged;

let value: InformationTagged = {
  msg: 'hi',
  subscribeToTheChannel: 'share',
};

// 3. Type Guard

function testLogType(value: LogTagged): string {
  switch (value.subscribeToTheChannel) {
    case 'like':
      return value.text;
    case 'comment':
      return value.message;
    case 'share':
      return value.msg;
  }

  // not necessary unless you might interact with vanilla js
  throw new Error('Invalid value passed');
}
