import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="button text-2xl">
      {children}
    </button>
  );
}

//  Main
//  Main
function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);

  function handleAddNewFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  return (
    <>
      <div className="app select-none ">
        <div className="sidebar">
          <FriendsList friends={friends} />
          {showAddFriend && <FormAddFriend onAddFriend={handleAddNewFriend} />}
          <Button onClick={() => setShowAddFriend((show) => !show)}>
            {showAddFriend ? "Close" : "Add friend"}
          </Button>
        </div>

        <FormSplitBill />
      </div>
    </>
  );
}

function FriendsList({ friends }) {
  return (
    <ul>
      {friends.map((e) => (
        <Friend e={e} key={e.id} />
      ))}
    </ul>
  );
}

function Friend({ e }) {
  return (
    <li>
      <img src={e.image} alt={e.name} />
      <h3>{e.name}</h3>

      {e.balance < 0 && (
        <p className="red">
          You owe {e.name} ${Math.abs(e.balance)}
        </p>
      )}

      {e.balance > 0 && (
        <p className="green">
          {e.name} owes you ${Math.abs(e.balance)}
        </p>
      )}

      {e.balance === 0 && <p>You and {e.name} are even</p>}

      <button className="button">Select</button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmitAddFriend(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name: name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmitAddFriend}>
      <label>👩🏾‍🤝‍👩🏾Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🚹Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>
      <label>💰Bill value</label>
      <input type="text" />

      <label>👩🏾‍🦱Your expense</label>
      <input type="text" />

      <label>👱🏾‍♀️X's expense</label>
      <input type="text" disabled />

      <label>🤑Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">Friend</option>
      </select>

      <Button>Add</Button>
    </form>
  );
}

export default App;
