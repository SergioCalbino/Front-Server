import React from "react";
import Modal from "./Modal";

function Dashboard() {
  return (
    <div>
      <h1>Holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h1>
      <Modal title="Create User">
        <form>
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <br />
          <label>
            Email:
            <input type="email" name="email" />
          </label>
          <br />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Create
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default Dashboard;
