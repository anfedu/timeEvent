import React from "react";

function App() {
  const [array, setArray] = React.useState([
    { color: "red" },
    { color: "blue" },
    { color: "blue" },
    { color: "blue" },
    { color: "blue" },
  ]);
  let loading = true;

  // useOutsideClick(array, setArray);
  function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
  }

  let pressed;
  let lastPressed;
  let isDoublePress;
  const timeOut = () => {
    setTimeout(() => {
      isDoublePress = false;
    }, 15000);
  };

  const timeLoading = () => {
    setTimeout(() => {
      loading = false;
    }, 500);
  };

  const handleDoublePressNext = (key) => {
    const objIndex = [...array].findIndex((d) => d.color === "red");
    const next = objIndex + 1;
    const prev = objIndex - 1;

    if (key.altKey && key.keyCode === 88 && next < array.length) {
      const newArr = array_move(array, objIndex, next);
      return setArray([...newArr]);
      // const newArr = array_move(array, objIndex, prev);
      // return setArray([...newArr]);
    }
  };
  const handleDoublePressPrev = (key) => {
    const objIndex = [...array].findIndex((d) => d.color === "red");
    const prev = objIndex - 1;

    if (key.altKey && key.keyCode === 88 && prev > -1) {
      const newArr = array_move(array, objIndex, prev);
      return setArray([...newArr]);
    }
  };

  const keyPress = (key) => {
    pressed = key.keyCode;
    timeLoading();
    console.log(loading);
    if (isDoublePress && pressed === lastPressed) {
      isDoublePress = false;
      if (loading) {
        handleDoublePressNext(key);
      } else if (!loading) {
        handleDoublePressPrev(key);
      }
    } else {
      isDoublePress = true;
      loading = true;
      timeOut();
    }
    lastPressed = pressed;
  };

  window.onkeyup = (key) => keyPress(key);

  return (
    <div
      className="App-header"
      style={{
        padding: "50px 200px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {array.map((item, index) => (
        <div
          style={{
            backgroundColor: item.color,
            width: 100,
            height: 50,
          }}
        ></div>
      ))}
    </div>
  );
}

export default App;
