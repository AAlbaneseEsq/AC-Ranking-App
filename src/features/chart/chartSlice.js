import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Papa from 'papaparse'
import { current } from '@reduxjs/toolkit';

const initialState = {
  albumList: [],
  fetchStatus: 'idle',
  error: false,
  warning: false,
  dragging: null,
  user: null,
  userList: [],
  scores: [],
  renderResults: false,
  initialList: [],
  showCarousel: false,
};

function parseCSV(csvText) {
  const data = []

  Papa.parse(csvText, {
      header: false,
      skipEmptyLines: true,
      complete: function (results) {
        data.push(results.data)
        
      },
    });
    return data;
  };

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchCSV = createAsyncThunk(
  'csv/fetchCSV',
  () => {
    return axios.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vQAZ6i0v5dhRgzm8CUY0QbKbm20sZzrzcf77gMMRyqKog2Q74kNdTIu9HpoRDPYWYPkdN0fyKQKeHBg/pub?output=csv')
    .then((response) => parseCSV(response.data))
  }
);

export const chartSlice = createSlice({
  name: 'chart',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateRating: (state, action) => {      
      var newObj = [...current(state.albumList)]
      var NewEntry = {
        artist: action.payload.oldObj.artist,
        user: action.payload.oldObj.user,
        year: action.payload.oldObj.year,
        title: action.payload.oldObj.title,
        pickDate: action.payload.oldObj.pickDate,
        artLink: action.payload.oldObj.artLink,
        popularity: action.payload.oldObj.popularity,
        rating: action.payload.newRating,
      }
    
      var updatedArray = newObj.map(x => {
        if(x.title === action.payload.oldObj.title)
          return (    
        NewEntry)
      else return (x)
    })
     
      state.albumList = updatedArray


    },
    dragStart: (state, action) => {
      state.dragging = action.payload;
    },
    filterUser: (state, action) => {
      state.user = action.payload;
    },
    closeResults: (state) => {
      state.renderResults = false
    },
    submitData2: (state) => {
      var currentList = [...current(state.albumList)]
      var scoreList = []
      var values = []

      state.userList.forEach(x => {
        for (let i = 0; i < currentList.length; i++)
          if ((currentList[i].user === x) && (currentList[i].rating !== null))
            values.push(currentList[i].rating)
            var sum = values.reduce((accumulator, currentValue) => {
              return accumulator + currentValue
            },0);
            var totalPossible = values.length * 6
            var score = (sum / totalPossible) * 100
            var scoreObj = {user: x, userScore: score}
            scoreList.push(scoreObj)
            values = []
      });
      state.scores = scoreList
      state.renderResults = true


    },
    uploadData: (state, action) => {
      state.user = action.payload;
    },
    resetData: (state) => {
      state.albumList = state.initialList;
    },
    handleError: (state, action) => {
      state.error = action.payload;
    },
    getRandom: (state) => {
      var newObj = [...current(state.albumList)]
    
      var updatedArray = newObj.map(x => {
          return {
            artist: x.artist,
            user: x.user,
            year: x.year,
            title: x.title,
            pickDate: x.pickDate,
            artLink: x.artLink,
            popularity: x.popularity,
            rating: Math.floor(Math.random() * 6) + 1}
    })
     
      state.albumList = updatedArray
    },
    saveLocal: (state) => {
      localStorage.setItem("savedRanks", JSON.stringify(state.albumList));
      state.warning = false
    },
    getLocal: (state) => {
      const savedRanks = JSON.parse(localStorage.savedRanks)
      state.albumList = savedRanks
    },
    handleWarning: (state, action) => {
      state.warning = action.payload
    },
    changeView: (state) => {
    (state.showCarousel === false) ? (state.showCarousel = true) : (state.showCarousel = false)
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchCSV.pending, (state) => {
        state.fetchStatus = 'loading';
      })
      .addCase(fetchCSV.fulfilled, (state, action) => {
        state.status = 'success';
        state.albumList = action.payload;
        const obj = state.albumList[0].map(x => ({
          artist: x[0],
          user: x[1],
          year: x[2],
          title: x[3],
          pickDate: x[4],
          artLink: x[5],
          popularity: x[6],
          rating: null
        }
        ))
        state.albumList = obj
        state.initialList = obj
        var users = []

        for (let i = 0; i < state.albumList.length; i++)
          users.push(state.albumList[i].user)
        
        state.userList = [...new Set(users)]

      })
      .addCase(fetchCSV.rejected, (state, action) => {
        state.status = 'failed';
        state.albumList = [];
        state.error = 'Error importing CVS!'
      });
  },
});

export const { updateRating, dragStart, filterUser, submitData, uploadData, resetData, handleError, submitData2, closeResults, getRandom, saveLocal, getLocal, handleWarning, changeView } = chartSlice.actions;

export default chartSlice.reducer;
