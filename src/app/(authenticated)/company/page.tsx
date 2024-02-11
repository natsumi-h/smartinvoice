
async function getData() {
  const res = await fetch("http://localhost:3000/api/company");

  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = res.json();
  return data;
}

const page = async () => {
  const data = await getData();

  return (
    <div>
      {/* <img src={data.data[0]?.logoUrl} alt="alt"></img> */}
    </div>
  );
};

export default page;
