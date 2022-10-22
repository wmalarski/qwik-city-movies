import { component$, useContext } from "@builder.io/qwik";
import { MovieContext } from "../movieContext";

export default component$(() => {
  const data = useContext(MovieContext);

  // const resource = useEndpoint<inferPromise<typeof onGet>>();

  return (
    // <Resource
    //   value={resource}
    //   onPending={() => <div>Loading...</div>}
    //   onRejected={() => <div>Rejected</div>}
    //   onResolved={(data) => <pre>{JSON.stringify(data, null, 2)}</pre>}
    // />
    <>
      <span>OVERVIEW</span>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
});
