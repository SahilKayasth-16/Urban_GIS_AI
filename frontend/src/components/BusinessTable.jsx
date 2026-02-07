const BusinessTable = ({ businesses }) => {
  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:8000/admin/business/${id}/${status}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    window.location.reload();
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>City</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {businesses.map(b => (
          <tr key={b.id}>
            <td>{b.name}</td>
            <td>{b.category}</td>
            <td>{b.city}</td>
            <td>{b.status}</td>
            <td>
              {b.status === "pending" && (
                <>
                  <button onClick={() => updateStatus(b.id, "approved")}>✅</button>
                  <button onClick={() => updateStatus(b.id, "rejected")}>❌</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BusinessTable;
