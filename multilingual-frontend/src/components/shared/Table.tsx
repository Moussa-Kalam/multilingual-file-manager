export default function Table() {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>File Name</th>
            <th>Size</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <th>1</th>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
            <td className="space-x-3">
              <button className="border border-gray-400 py-1 px-2 font-medium rounded-md">
                Delete
              </button>
              <button className="border border-gray-400 py-1 px-2 font-medium rounded-md">
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
