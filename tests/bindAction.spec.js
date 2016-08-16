import React from "react";
import Rx from "rxjs";
import bindAction from "../lib/bindAction";

describe("bindAction", () => {

  it("should validate wrapping subject.next", done => {
    const action$ = new Rx.Subject;
    const action = bindAction(action$);

    action$.toArray().subscribe(results => {
      expect(results).toEqual([ "a", "b" ]);
    }, () => { throw new Error() }, done);

    action("a");
    action("b");
    action$.complete();
  });
});
