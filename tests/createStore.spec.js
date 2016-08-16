import Rx from "rxjs";
import createStore from "../lib/createStore";

describe("createStore", () => {

  it("should validate the creation of state using initial state", done => {
    const reducer$ = new Rx.Subject();
    const initialState$ = Rx.Observable.of({ todos: -10 });
    const reducer = state => ({ ...state, todos: state.todos + 1 });
    const state$ = createStore(reducer$, initialState$);

    state$.toArray().subscribe(results => {
      expect(results).toEqual([
        { todos: -10 },
        { todos: -9 },
        { todos: -8 },
        { todos: -7 }
      ]);
    }, () => {}, done);

    reducer$.next(reducer);
    reducer$.next(reducer);
    reducer$.next(reducer);
    reducer$.complete();
  });

  it("should validate the creation of state", done => {
    const reducer$ = new Rx.Subject();
    const reducer = state => ({ ...state, todos: (state.todos || 0) + 1 });
    const state$ = createStore(reducer$);

    state$.toArray().subscribe(results => {
      expect(results).toEqual([
        {},
        { todos: 1 },
        { todos: 2 },
        { todos: 3 }
      ]);
    }, () => {}, done);

    reducer$.next(reducer);
    reducer$.next(reducer);
    reducer$.next(reducer);
    reducer$.complete();
  });
});
