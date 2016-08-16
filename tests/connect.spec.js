import React from "react";
import Rx from "rxjs";
import TestUtils from "react-addons-test-utils";
import connect from "../lib/connect";

describe("connect", () => {

  const Component = props => <h1 className="heading">{ props.text }</h1>;
  let state$;

  beforeEach(() => {
    state$ = new Rx.Subject();
  });

  it("should wrapped component update with state using selector", () => {
    const selector = state => ({ text: `HEADING: ${state.text}` });
    const WrappedComponent = connect(state$, selector)(Component);
    const tree = TestUtils.renderIntoDocument(<WrappedComponent />);
    const heading = TestUtils.findRenderedDOMComponentWithClass(tree, "heading");

    expect(heading.textContent).toEqual("");
    state$.next({ text: 'hello world' });
    expect(heading.textContent).toEqual("HEADING: hello world");
    state$.next({ text: 'what if i change' });
    expect(heading.textContent).toEqual("HEADING: what if i change");
  });

  it("should wrapped component update with state", () => {
    const WrappedComponent = connect(state$)(Component);
    const tree = TestUtils.renderIntoDocument(<WrappedComponent />);
    const heading = TestUtils.findRenderedDOMComponentWithClass(tree, "heading");

    expect(heading.textContent).toEqual("");
    state$.next({ text: 'hello world' });
    expect(heading.textContent).toEqual("hello world");
    state$.next({ text: 'what if i change' });
    expect(heading.textContent).toEqual("what if i change");
  });
});
