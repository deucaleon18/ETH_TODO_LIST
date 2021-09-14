import React, { useState, useEffect } from "react";
import "./Notes.css";
import Web3 from "web3";
import TodoList from "../../contracts/TodoList.json";
import getWeb3 from "../../../src/getWeb3";

const Notes = () => {
  const [account, setAccount] = useState("");
  const [todos, setTodos] = useState([]);
  const [newnote, setNewnote] = useState("");
  const [web3, setWeb3] = useState("");
  const [contract, setContract] = useState("");
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();
        setWeb3(web3);
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        console.log(accounts[0]);
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        console.log(networkId);
        const deployedNetwork = TodoList.networks[networkId];
        console.log(deployedNetwork);
        const instance = new web3.eth.Contract(
          TodoList.abi,
          deployedNetwork && deployedNetwork.address
        );
        console.log(instance);
        setContract(instance);

        getTodo({ instance, accounts });
      } catch (error) {
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    };
    getData();

    const getTodo = async ({ instance, accounts }) => {
      await instance.methods
        .taskCount()
        .call()
        .then(async (response) => {
          console.log(response);

          for (let i = 0; i <= response; i++) {
            await instance.methods
              .tasks(i)
              .call()
              .then((data) => {
                console.log(data);
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }, []);

  const handleToggle = async (id) => {
    // e.preventDefault()
    setChecked(!checked);
    console.log("basic toggle");

    // await contract.methods.toggleTask(id).send({from:account})
    // .then((res)=>{console.log(res)})
    // .catch((err)=>{console.log(err)})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(account);
    console.log(newnote);
    console.log("submit button");
    await contract.methods
      .createTask(newnote)
      .send({ from: account })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  } else {
    return (
      <div className="notes-section">
        <div className="pending">
          <div className="creation">
            <h1>CREATE A NEW NOTE:</h1>
            <form>
              <input
                type="text"
                className="form-bar"
                value={newnote}
                onChange={(e) => {
                  setNewnote(e.target.value);
                }}
              ></input>
            </form>
            <button
              type="submit"
              onClick={handleSubmit}
              className="notes-submit"
            >
              ADD
            </button>
          </div>

          <div className="your-notes">
            <h1>YOUR INCOMPLETE NOTES:</h1>

            <div className="display-notes">
              <div className="note">
                <div>#NOTE 1</div>{" "}
                <input
                  value={checked}
                  type="checkbox"
                  className="checkbox"
                  onChange={() => handleToggle()}
                ></input>
              </div>
            </div>
          </div>
        </div>

        <div className="completed">
          <div className="completed-notes-inner">
            <h1>YOUR COMPLETED NOTES:</h1>

            <div className="completed-notes-display">
              this is a default completed note
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Notes;
