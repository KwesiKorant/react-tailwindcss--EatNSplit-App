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

function App() {
  return (
    <>
      <div className="app select-none ">
        <div className="sidebar">
          <FriendsList />
        </div>
      </div>
    </>
  );
}

function FriendsList() {
  const friends = initialFriends;

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

export default App;
