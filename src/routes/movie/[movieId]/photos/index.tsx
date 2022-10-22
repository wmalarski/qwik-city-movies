import { component$, useContext } from "@builder.io/qwik";
import { MovieContext } from "../movieContext";

export default component$(() => {
  // const resource = useEndpoint<inferPromise<typeof onGet>>();
  const data = useContext(MovieContext);
  return (
    // <Resource
    //   value={resource}
    //   onPending={() => <div>Loading...</div>}
    //   onRejected={() => <div>Rejected</div>}
    //   onResolved={(data) => <pre>PHOTOS{JSON.stringify(data, null, 2)}</pre>}
    // />
    <>
      <span>PHOTOS</span>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
});
