import { createSlice } from "@reduxjs/toolkit";

const initialState={
    value:{userName:'',animes:[]}
};

export const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        addUserName:(state,action)=>{
            state.value.userName=action.payload;
        },
        addAnime:(state,action)=>{
            state.value.animes.push(action.payload);
        },
        RemoveAnime: (state, action) => {
            state.value.animes = state.value.animes.filter(
                (anime) => anime.title !== action.payload.title
            );
        },
    },
});

export const {addUserName,addAnime,RemoveAnime} = userSlice.actions;
export default userSlice.reducer;