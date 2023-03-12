/* eslint-disable array-callback-return */
import { Button, Grid } from "@mui/material";
import "react-dropdown/style.css";
// import { useMediaQuery } from "react-responsive";
import { AiOutlinePlus } from "react-icons/ai";
import HelperDropdown from "./HelperDropdown";

const RewardStaking = ({
  setData,
  value,
  setFunction,
  saveData,
  id,
  setId,
}) => {
  //Add More Function

  const Addmore = () => {
    const data = [...setData, { amount: 0, address: "", type: value, id: id }];
    setFunction(data);
    setId(id + 1);
  };

  const setListData = (ind, amount, address) => {
    for (let item of setData) {
      if (item.id === ind) {
        break;
      }
    }
    setFunction(setData);
  };
  // const setListData = (ind, amount, address) => {
  //   for (let item of add) {
  //     if (item.id === ind) {
  //       item.amount = amount;
  //       item.address = address;
  //       break;
  //     }
  //   }
  // };
  // Remove Function
  const removeTodo = (ind) => {
    const remove = setData.filter((todo) => {
      return todo.id !== ind;
    });
    setFunction(remove);
    
    // setAdd(remove);
  };
  // const removeTodo = (ind) => {
  //   console.log("REMOVD");
  //   const remove = add.filter((todo) => {
  //     return todo.id !== ind;
  //   });
  //   setAdd(remove);
  // };
  return (
    <Grid
      item
      style={{
        width: "80%",
        display: "block",
        margin: "20px auto",
        background:
          "linear-gradient(90deg, rgba(70, 165, 255, 0.26) 0%, rgba(74, 176, 255, 0.1976) 0%, rgba(198, 40, 247, 0.2132) 104.87%)",
        borderRadius: "15px",
        padding: "10px 20px",
      }}
    >
      {setData.map((item, ind) => {
        if (item.type === value) {
          console.log("%#$%#%#");
          return (
            <HelperDropdown
              removeTodo={removeTodo}
              setData={setListData}
              key={ind}
              data={item}
            />
          );
        }
      })}
      <Grid
        item
        style={{
          display: "flex",
          justifyContent: "end",
          padding: "20px 0px",
        }}
      >
        <Button
          style={{
            color: "#fff",
            background: "rgba(255, 255, 255, 0.36)",
            borderRadius: "46px",
            padding: "8px 20px",
          }}
          onClick={saveData}
        >
          Save
        </Button>
        <Button
          style={{
            color: "#fff",
            background:
              "linear-gradient(90deg, #46A5FF 0%, rgba(74, 176, 255, 0.76) 0%, rgba(198, 40, 247, 0.82) 104.87%)",
            borderRadius: "46px",
            padding: "8px 20px",
            marginLeft: "10px",
          }}
          onClick={Addmore}
        >
          <AiOutlinePlus />
          Add More
        </Button>
      </Grid>
    </Grid>
  );
};

export default RewardStaking;
