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
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleAddNewFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelection(e) {
    // setSelectedFriend(e);
    setSelectedFriend((cur) => (cur?.id === e.id ? null : e));
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend,
      ),
    );
    setSelectedFriend(null);
  }

  return (
    <>
      <div className="app select-none ">
        <div className="sidebar">
          <FriendsList
            friends={friends}
            selectedFriend={selectedFriend}
            onSelected={handleSelection}
          />
          {showAddFriend && <FormAddFriend onAddFriend={handleAddNewFriend} />}

          <Button onClick={() => setShowAddFriend((show) => !show)}>
            {showAddFriend ? "Close" : "Add friend"}
          </Button>
        </div>

        {selectedFriend && (
          <FormSplitBill key={crypto.randomUUID()}
            selectedFriend={selectedFriend}
            onSplitBill={handleSplitBill}
          />
        )}
      </div>
    </>
  );
}

function FriendsList({ friends, selectedFriend, onSelected }) {
  return (
    <ul>
      {friends.map((e) => (
        <Friend
          selectedFriend={selectedFriend}
          onSelected={onSelected}
          e={e}
          key={e.id}
        />
      ))}
    </ul>
  );
}

function Friend({ e, selectedFriend, onSelected }) {
  const isSelected = selectedFriend?.id === e.id;

  return (
    <li className={isSelected ? "selected" : ""}>
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

      <button className="button" onClick={() => onSelected(e)}>
        {isSelected ? "Close" : "Select"}
      </button>
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

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [myExpense, setMyExpense] = useState("");
  const friendExpense = bill ? bill - myExpense : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !myExpense) return;
    onSplitBill(whoIsPaying === "user" ? friendExpense : -myExpense);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label>💰Bill value</label>
      <input
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
        type="number"
        min={0}
        className="bg-white"
      />

      <label>👩🏾‍🦱Your expense</label>
      <input
        value={myExpense}
        onChange={(e) =>
          setMyExpense(
            Number(e.target.value) > bill ? myExpense : Number(e.target.value),
          )
        }
        type="number"
        min={0}
        max={bill}
        className="bg-white"
      />

      <label>👱🏾‍♀️{selectedFriend.name}'s expense</label>
      <input value={friendExpense} type="number" min={0} disabled />

      <label>🤑Who is paying the bill</label>
      <select
        value={whoIsPaying}
        className="bg-white"
        onChange={(e) => setWhoIsPaying(Number(e.target.value))}
      >
        <option value="user">You</option>
        <option value={selectedFriend.name}>{selectedFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}

export default App;
