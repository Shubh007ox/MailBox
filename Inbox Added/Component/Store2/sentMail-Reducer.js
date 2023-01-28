import { createSlice } from "@reduxjs/toolkit";

const initialEmailState = { sent: [], receive: [] };

const handleEmailSlice = createSlice({
  name: "email-manager",
  initialState: initialEmailState,
  reducers: {
    setSendMail(state, action) {
    //   state.sent = state.sent.push(action.payload);
    //   console.log(action.payload, "redux inside");
    },
    setReceiveMail(state, action) {
        // state.receive = action.payload
      state.receive = state.receive.push('hy');
      let arr = [];
      let obj = action.payload;
      for (let id in obj) {
        arr.push({
          id: id,
          message: obj[id].message,
          subject: obj[id].subject,
        });
      }
      console.log(arr, "==>INSIDE  MANAGER");
      state.receive = arr;
    },
  },
});

export const handleEmailActions = handleEmailSlice.actions;
export default handleEmailSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const initalEmailState = { sent: [], receive: [] };

// const handleEmailSlice = createSlice({
//   name: "email-manager",
//   initialState: initalEmailState,
//   reducers: {
//     setSendMail(state, action) {
//       // state.sent.push(action.payload);
//       // console.log(action.payload, "==>inside redux");
//     },
//     setReceiveMail(state, action) {
//       let arr = [];
//       let obj = action.payload;
//       for (let id in obj) {
//         arr.push({
//           id: id,
//           message: obj[id].message,
//           subject: obj[id].subject,
//           seen: obj[id].seen,
//         });
//       }
//       console.log(arr, "==>INSIDE  MANAGER");
//       state.receive = arr;
//     },
//     seenMessage(state, action) {
//       let message = state.receive.find((data) => data.id === action.payload);
//       message.seen = true;
//     },
//     deleteMail(state,action)
//     {
//       let arr=state.receive.filter((arr)=>arr.id!==action.payload)
//       state.receive=arr
//     },
//     setSentServerMail(state,action)
//     {
//       let arr = [];
//       let obj = action.payload;
//       for (let id in obj) {
//         arr.push({
//           id: id,
//           message: obj[id].message,
//           subject: obj[id].subject,
//           seen: obj[id].seen,
//         });
//       }
//        state.sent=(arr)
//     },
//     seenSentMessageHandler(state,action)
//     {
//       let message = state.sent.find((data) => data.id === action.payload);
//       message.seen = true;
//     }
//   },
// });

// console.log(initalEmailState.sent, "==> at last inside redux");

// export const handleEmailActions  = handleEmailSlice.actions;
// export default handleEmailSlice.reducer;
