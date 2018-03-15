type JsConsole = Console; // Little hack - TS thinks that `Console` is a concrete constructor
const JsConsole = Symbol('JS Console API');

export { JsConsole };
